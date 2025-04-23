import styles from "@comp/meals-grid.module.css";
import MealItem from "@comp/meal-item";

const MealsGrid = ({ meals }) => {
    return (
        <ul className={styles.meals}>
            {meals.map((meal) => (
                <li key={meal.id}>
                    <MealItem {...meal} />
                </li>
            ))}
        </ul>
    );
};

export default MealsGrid;
