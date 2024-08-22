"use client";

import { TextInput } from "@/shared";
import { FormEvent, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { deleteCompletedTodoItems } from "../..";
import styles from "./NewTodoItem.module.css";
import { useRouter } from "next/navigation";

export interface NewTodoItemProps {
  onSubmit: (description: string) => Promise<void>;
}

export const NewTodoItem = ({ onSubmit }: NewTodoItemProps) => {
  const router = useRouter();
  const [description, setDescription] = useState("");

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSubmit(description);
    setDescription('');
  };

  const onDelete = async () => {
    await deleteCompletedTodoItems();
  };

  return (
    <form className={styles.form} onSubmit={onFormSubmit}>
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
