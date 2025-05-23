import Link from "next/link";
import { Suspense } from "react";

import styles from "@/app/meals/page.module.css";
import MealsGrid from "@/components/meals-grid";
import { getMeals } from "@/lib/meals";

export const metadata = {
    title: "All Meals",
    description: "Browse the delicious meals shared by our vibrant community.",
};

const Meals = async () => {
    const meals = await getMeals();
    return <MealsGrid meals={meals} />;
};

const MealsPage = () => {
    return (
        <>
            <header className={styles.header}>
                <h1>
                    Delicious meals, created <span className={styles.highlight}>by you</span>
                </h1>
                <p>Choose your favorite recipe and cook it yourself. It is easy and fun.</p>
                <p className={styles.cta}>
                    <Link href="/meals/share">Share your favorite recipe</Link>
                </p>
            </header>
            <main className={styles.main}>
                <Suspense fallback={<p className={styles.loading}>Fetching meals...</p>}>
                    <Meals />
                </Suspense>
            </main>
        </>
    );
};

export default MealsPage;
