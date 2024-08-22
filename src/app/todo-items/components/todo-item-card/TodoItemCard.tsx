"use client";

import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { IoMdCheckboxOutline } from "react-icons/io";
import { TodoItem } from "@prisma/client";
import styles from "./TodoItemCard.module.css";
import { startTransition, useOptimistic, useState } from "react";
import { toggleTodoItem } from "../..";

export interface TodoItemCardProps {
  item: TodoItem;
  toggleItem: (id: string, completed: boolean) => Promise<TodoItem | void>;
}

const toggleOptimisticTodoItem = (todo: TodoItem, newCompleted: boolean) => ({
  ...todo,
  completed: newCompleted,
});

export const TodoItemCard = ({
  item: initialItem,
  toggleItem,
}: TodoItemCardProps) => {
  const [item, setItem] = useState(initialItem);
  const [optimisticItem, toggleOptimisticItem] = useOptimistic(
    item,
    toggleOptimisticTodoItem
  );

  const onToggleTodoItem = async () => {
    try {
      startTransition(() => toggleOptimisticItem(!optimisticItem.completed));
      const toggledItem = await toggleTodoItem(optimisticItem.id, !optimisticItem.completed);
      setItem(toggledItem);
    } catch {
      startTransition(() => toggleOptimisticItem(optimisticItem.completed));
    }
  };

  return (
    <div
      className={optimisticItem.completed ? styles.complete : styles.pending}
    >
      <span className={styles.description}>{optimisticItem.description}</span>
      <span className={styles.checkbox} onClick={onToggleTodoItem}>
        {optimisticItem.completed ? (
          <IoMdCheckboxOutline></IoMdCheckboxOutline>
        ) : (
          <MdCheckBoxOutlineBlank></MdCheckBoxOutlineBlank>
        )}
      </span>
    </div>
  );
};
