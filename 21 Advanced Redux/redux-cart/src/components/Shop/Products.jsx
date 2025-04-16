import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const PRODUCTS = [
    {
        id: "1",
        title: "Test",
        price: 6,
        description: "This is a first product - amazing!",
    },
    {
        id: "2",
        title: "Test 2",
        price: 7,
        description: "This is a second product - amazing!",
    },
    {
        id: "3",
        title: "Test 3",
        price: 8,
        description: "This is a third product - amazing!",
    },
    {
        id: "4",
        title: "Test 4",
        price: 9,
        description: "This is a fourth product - amazing!",
    },
    {
        id: "5",
        title: "Test 5",
        price: 10,
        description: "This is a fifth product - amazing!",
    },
];

const Products = (props) => {
    return (
        <section className={classes.products}>
            <h2>Buy your favorite products</h2>
            <ul>
                {PRODUCTS.map(({ id, title, price, description }) => (
                    <ProductItem key={id} id={id} title={title} price={price} description={description} />
                ))}
            </ul>
        </section>
    );
};

export default Products;
