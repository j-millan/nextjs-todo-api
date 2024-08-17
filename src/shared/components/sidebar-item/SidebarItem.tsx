'use client';

import { ReactElement } from "react";
import { IconType } from "react-icons";
import Link from "next/link";
import styles from './SidebarItem.module.css';
import { usePathname } from "next/navigation";

export interface SidebarItemProps {
  icon: ReactElement<IconType>;
  title: string;
  route: string;
}

export const SidebarItem = ({title, icon, route}: SidebarItemProps) => {
  const pathname = usePathname();
  return (
    <Link href={route} className={`${styles.item} ${route === pathname && styles.active}`}>
      <span className={styles.icon}>
        { icon }
      </span>
      <span className={styles.title}>
        { title }
      </span>
    </Link>
  );
};