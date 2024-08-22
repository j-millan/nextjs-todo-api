import prisma from "@/lib/prisma";
import styles from "./page.module.css";
import { TodoItemsGrid } from "@/app/todo-items";

export const dynamic = 'force-dynamic';
// export const revalidate = 0;

const ServerActionsPage = async () => {
  const todoItems = await prisma.todoItem.findMany({
    orderBy: { createdAt: 'asc' },
  });
  console.debug("lol");

  return (
    <div className={styles.container}>
      <h1>Server Actions</h1>
      <TodoItemsGrid initialTodoItems={todoItems} />
    </div>
  );
};

export default ServerActionsPage;
