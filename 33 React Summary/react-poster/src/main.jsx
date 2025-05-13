import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";

import "./index.css";
import Posts, { loader as postsLoader } from "./routes/Posts";
import NewPost, { action as newPostAction } from "./routes/NewPost";
import RootLayout from "./routes/RootLayout";
import PostDetails, { loader as postDetailLoader } from "./routes/PostDetails";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <Posts />,
                loader: postsLoader,
                children: [
                    {
                        path: "/create-post",
                        element: <NewPost />,
                        action: newPostAction,
                    },
                    {
                        path: "/:id",
                        element: <PostDetails />,
                        loader: postDetailLoader,
                    },
                ],
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
