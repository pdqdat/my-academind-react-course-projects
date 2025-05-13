import { Link } from "react-router";

import styles from "./Post.module.css";

const Post = ({ id, author, body }) => {
    return (
        <div className={styles.post}>
            <Link to={id}>
                <p className={styles.author}>{author}</p>
                <p className={styles.text}>{body}</p>
            </Link>
        </div>
    );
};

export default Post;
