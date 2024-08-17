'use client';

import { ChangeEvent, ReactElement } from "react";
import { IconType } from "react-icons";
import styles from "./TextInput.module.css";

export interface TextInputProps {
  placeholder: string;
  icon?: ReactElement<IconType>;
  value?: string;
  onValueChanges?: (value: string) => void;
}

export const TextInput = ({ placeholder, onValueChanges, icon, value='' }: TextInputProps) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onValueChanges) {
      onValueChanges(e.target.value);
    }
  };

  return (
    <div className={`${styles.container} ${icon ? styles["has-icon"] : ""}`}>
      <input
        className={styles.input}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {icon && <span className={styles.icon}>{icon}</span>}
    </div>
  );
};
