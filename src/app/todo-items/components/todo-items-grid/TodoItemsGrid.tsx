"use client";

import { useRouter } from "next/navigation";
import { TodoItem } from "@prisma/client";
import { TodoItemCard } from "../todo-item-card/TodoItemCard";
import styles from "./TodoItemsGrid.module.css";
import { toggleTodoItem } from "../../actions/toggle";
import { createTodoItem, NewTodoItem } from "../..";
import { startTransition, useOptimistic, useState } from "react";

export interface TodoItemsGridProps {
  initialTodoItems: TodoItem[];
}

const updateOptimisticTodoItems = (
  items: TodoItem[],
  description: string,
): TodoItem[] => {
  const optimisticItem: TodoItem = {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
    completed: false,
    description: description,
  };

  return [...items, optimisticItem];
};

export const TodoItemsGrid = ({
  initialTodoItems: items = [],
}: TodoItemsGridProps) => {
  const router = useRouter();
  
  const [todoItems, setTodoItems] = useState(items);
  const [optimisticTodoItems, setOptimisticTodoItems] = useOptimistic(
    todoItems,
    updateOptimisticTodoItems
  );

  const onNewTodoItemSumbit = async (description: string): Promise<void> => {
    startTransition(() => {
      setOptimisticTodoItems(description);
    });

    try {
      const newTodoItem = await createTodoItem({ description });
      setTodoItems([...todoItems, newTodoItem]);
    } catch {
      router.refresh();
    }
  };

  return (
    <div className={styles.container}>
      <NewTodoItem onSubmit={onNewTodoItemSumbit} />
      <div className={styles.grid}>
        {optimisticTodoItems.map((item) => (
          <TodoItemCard key={item.id} item={item} toggleItem={toggleTodoItem} />
        ))}
      </div>
    </div>
  );
};
