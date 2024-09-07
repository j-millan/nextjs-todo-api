import { TodoItemsGrid } from "@/app/todo-items";
import prisma from "@/lib/prisma";
import styles from "./page.module.css";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const TodoItemsPage = async () => {
  const session = await auth();

  const todoItems = await prisma.todoItem.findMany({
    orderBy: { createdAt: "asc" },
    where: { userId: session?.user?.id },
  });
  
  return (
    <div className={styles.container}>
      <h1>Todo Items</h1>
      <TodoItemsGrid initialTodoItems={todoItems} />
    </div>
  );
};

export default TodoItemsPage;