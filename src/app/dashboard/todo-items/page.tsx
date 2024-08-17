import { NewTodoItem, TodoItemsGrid } from "@/app/todo-items";
import prisma from "@/lib/prisma";
import styles from "./page.module.css";

const TodoItemsPage = async () => {
  const todoItems = await prisma.todoItem.findMany({ orderBy: { description: 'asc' } });

  return (
    <div className={styles.container}>
      <h1>Todo Items</h1>
      <NewTodoItem />
      <TodoItemsGrid items={todoItems} />
    </div>
  );
};

export default TodoItemsPage;