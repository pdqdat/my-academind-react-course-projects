import { createBrowserRouter, RouterProvider } from "react-router";

import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import Layout from "./components/Layout";
import Error from "./pages/Error";
import ProductDetailPage from "./pages/ProductDetailPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <Error />,
        children: [
            {
                // path: "/",
                index: true,
                element: <Home />,
            },
            {
                path: "/products",
                element: <ProductsPage />,
            },
            {
                path: "/products/:productID",
                element: <ProductDetailPage />,
            },
        ],
    },
]);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
