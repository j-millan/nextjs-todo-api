import React from 'react';
import styles from './Widget.module.css';

export interface WidgetProps {
  title: string;
  children: React.ReactNode;
}

export const Widget = ({ title, children }: WidgetProps) => {
  return (
    <div className={styles.widget}>
      <span className={styles.title}>{title}</span>
      { children }
    </div>
  );
};