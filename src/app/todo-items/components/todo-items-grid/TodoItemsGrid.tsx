'use client';

import { useRouter } from "next/navigation";
import { TodoItem } from "@prisma/client";
import { TodoItemCard } from "../todo-item-card/TodoItemCard";
import { updateTodo } from "../..";
import styles from './TodoItemsGrid.module.css';


export interface TodoItemsGridProps {
  items: TodoItem[];
}

export const TodoItemsGrid = ({items = []}: TodoItemsGridProps) => {
  const router = useRouter();
  
  const toggleItem = async (id: string, completed: boolean): Promise<void> => {
    await updateTodo(id, { completed });
    router.refresh();
  };

  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <TodoItemCard key={item.id} item={item} toggleItem={toggleItem} />
      ))}
    </div>
  );  
};
