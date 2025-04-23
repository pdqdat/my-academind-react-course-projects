import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

const db = sql("meals.db");

export const getMeals = async () => {
    // Simulate a delay to mimic a real-world scenario where data fetching might take time
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulate an error condition for demonstration purposes
    // throw new Error("Error fetching meals");

    return db.prepare("SELECT * FROM meals").all();
};

export const getMeal = (slug) => {
    // Use the get() method from "better-sqlite3" to fetch a single meal by slug
    // and avoid SQL injection as the library handles it internally
    return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
};

export const saveMeal = async (meal) => {
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);

    const imageExtension = meal.image.name.split(".").pop();
    const imageName = `${meal.slug}.${imageExtension}`;

    const stream = fs.createWriteStream(`public/images/${imageName}`);
    const bufferedImage = await meal.image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) {
            console.error("Error writing image to file:", error);
            throw new Error("Failed to save image!");
        }
    });

    meal.image = `/images/${imageName}`;

    db.prepare(
        `
        INSERT INTO meals (
            title,
            summary,
            instructions,
            image,
            slug,
            creator,
            creator_email
        )
        VALUES (
            @title,
            @summary,
            @instructions,
            @image,
            @slug,
            @creator,
            @creator_email
        )
    `
    ).run(meal);
};
