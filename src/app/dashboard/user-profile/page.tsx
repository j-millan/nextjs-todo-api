"use client";

import { useSession } from "next-auth/react";
import styles from "./page.module.css";
import { Widget } from "@/shared";

const UserProfilePage = () => {
  const { data } = useSession();
  const username = data?.user?.name ?? "Unauthenticated";
  const roles = data?.user?.roles?.join(", ");

  return (
    <div className={styles.container}>
      <h1>User Profile</h1>
      <Widget title={username}>
        <div className={styles.widget}>
          <ul className={styles["user-details"]}>
            <li>Email: {data?.user?.email}</li>
            <li>Avatar URL: {data?.user?.image}</li>
            <li>Roles: {roles}.</li>
          </ul>
        </div>
      </Widget>
    </div>
  );
};

export default UserProfilePage;
