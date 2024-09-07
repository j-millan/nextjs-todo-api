import { Sidebar, Topbar } from "@/shared";
import styles from "./layout.module.css";
import { cookies } from "next/headers";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AuthProvider } from "../auth";


const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = cookies();
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  return (
    <AuthProvider>
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.content}>
          <Topbar cookieStore={cookieStore} />
          <div className={styles["\children"]}>
            {children}
          </div>
        </div>
      </div>
    </AuthProvider>
  );
};

export default DashboardLayout;