import { ReactElement } from 'react';
import { IconType } from 'react-icons';
import styles from './Button.module.css';


export interface ButtonProps {
  text?: string;
  icon?: ReactElement<IconType>;
  onClick?: () => void;
}

export const Button = ({ text, icon, onClick }: ButtonProps) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {text && <span className={styles.text}>{text}</span>}
    </button>
  );
};