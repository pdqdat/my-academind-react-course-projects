import { Link, useParams } from "react-router";

const ProductDetailPage = () => {
    const params = useParams();
    const { productID } = params;

    return (
        <div>
            <h1>Details for product "{productID}"</h1>
            <p>
                <Link to=".." relative="path">
                    Back (with relative="path")
                </Link>
                <br />
                <Link to=".." relative="route">
                    Back (with relative="route")
                </Link>
            </p>
        </div>
    );
};

export default ProductDetailPage;
