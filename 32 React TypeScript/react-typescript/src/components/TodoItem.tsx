import React from "react";

import Todo from "../models/todo";
import styles from "./TodoItem.module.css";

const TodoItem: React.FC<{
    todo: Todo;
    onRemoveTodo: (event: React.MouseEvent) => void;
}> = ({ todo, onRemoveTodo }) => {
    return (
        <li className={styles.item} onClick={onRemoveTodo}>
            {todo.text}
        </li>
    );
};

export default TodoItem;
