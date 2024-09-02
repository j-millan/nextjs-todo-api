"use client";

import { useState } from "react";
import styles from "./TabBar.module.css";
import { setCookie } from "cookies-next";

export interface TabBarProps {
  initialTab: number;
  tabs: TabInterface[];
}

export interface TabInterface {
  id: number;
  label: string;
}

export const TabBar = ({ initialTab = 0, tabs }: TabBarProps) => {
  const [currentTab, setCurrentTab] = useState(initialTab);
  
  const onTabClick = (id: number) => {
    setCurrentTab(id);
    setCookie('selected-tab', id.toString());
  };
  
  return (
    <div className={styles.container}>
      {tabs.map(({ label, id }) => (
        <span
          className={`${styles.tab} ${currentTab === id && styles.selected}`}
          key={id}
          onClick={() => onTabClick(id)}
        >
          {label}
        </span>
      ))}
    </div>
  );
};
