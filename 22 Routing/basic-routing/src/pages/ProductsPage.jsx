import { Link } from "react-router";

const PRODUCTS = [
    { id: "prod-1", title: "Product 1" },
    { id: "prod-2", title: "Product 2" },
    { id: "prod-3", title: "Product 3" },
];

const ProductsPage = () => {
    return (
        <div>
            <h1>ProductsPage</h1>
            <ul>
                {PRODUCTS.map((product) => (
                    <li>
                        <Link to={`/products/${product.id}`}>{product.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductsPage;
