"use client";

import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { IoMdCheckboxOutline } from "react-icons/io";
import { TodoItem } from "@prisma/client";
import styles from "./TodoItemCard.module.css";

export interface TodoItemCardProps {
  item: TodoItem;
  toggleItem: (id: string, completed: boolean) => Promise<TodoItem | void>;
}

export const TodoItemCard = ({ item, toggleItem }: TodoItemCardProps) => {
  return (
    <div className={item.completed ? styles.complete : styles.pending}>
      <span className={styles.description}>{item.description}</span>
      <span
        className={styles.checkbox}
        onClick={() => toggleItem(item.id, !item.completed)}
      >
        {item.completed ? (
          <IoMdCheckboxOutline></IoMdCheckboxOutline>
        ) : (
          <MdCheckBoxOutlineBlank></MdCheckBoxOutlineBlank>
        )}
      </span>
    </div>
  );
};
