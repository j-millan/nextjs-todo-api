"use client";

import { Button, TextInput } from "@/shared";
import styles from "./NewTodoItem.module.css";
import { useRouter } from "next/navigation";
import { createTodo, deleteTodo } from "../../services/todo-items-service";
import { FormEvent, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";

export const NewTodoItem = () => {
  const router = useRouter();
  const [description, setDescription] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await createTodo({ description });
    setDescription('');
    router.refresh();
  };

  const onDelete = async () => {
    await deleteTodo();
    router.refresh();
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <TextInput
        placeholder="What needs to be done?"
        value={description}
        onValueChanges={setDescription}
      />
      <button className={styles.create} type="submit">
        Create
      </button>

      <span className={styles.separator}></span>

      <button className={styles.delete} type="button" onClick={onDelete}>
        <IoTrashOutline size={20} />
        <span>Delete completed</span>
      </button>
    </form>
  );
};
