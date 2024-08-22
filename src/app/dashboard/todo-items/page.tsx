import { NewTodoItem, TodoItemsGrid } from "@/app/todo-items";
import prisma from "@/lib/prisma";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const TodoItemsPage = async () => {
  const todoItems = await prisma.todoItem.findMany({ orderBy: { description: 'asc' } });

  return (
    <div className={styles.container}>
      <h1>Todo Items</h1>
      <TodoItemsGrid initialTodoItems={todoItems} />
    </div>
  );
};

export default TodoItemsPage;