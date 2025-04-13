import { useContext } from "react";

// Context
import CartContext from "../store/CartContext.jsx";

// Components
import Button from "./ui/Button.jsx";

// Utils
import { currencyFormatter } from "../utils/formatting.js";

export default function MealItem({ meal }) {
    const cartContext = useContext(CartContext);

    function handleAddMealToCart() {
        cartContext.addItem(meal);
    }

    const { image, name, price, description } = meal;

    return (
        <li className="meal-item">
            <article>
                <img src={`http://localhost:3000/${image}`} alt={name} />

                <div>
                    <h3>{name}</h3>
                    <p className="meal-item-price">{currencyFormatter.format(price)}</p>
                    <p className="meal-item-description">{description}</p>
                </div>

                <p className="meal-item-actions">
                    <Button onClick={handleAddMealToCart}>Add to Cart</Button>
                </p>
            </article>
        </li>
    );
}
