import { Sidebar, Topbar } from "@/shared";
import styles from "./layout.module.css";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>
    
      <Sidebar />
      <div className={styles.content}>
        <Topbar />
        <div className={styles["\children"]}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;