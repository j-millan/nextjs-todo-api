import { TabBar, TabInterface } from "@/shared";
import styles from "./page.module.css";
import { cookies } from "next/headers";

export const metadata = {
  title: 'Cookies',
  description: 'Cookies demonstration',
};

const tabs: TabInterface[] = [
  { id: 0, label: "Tab 1" },
  { id: 1, label: "Tab 2" },
  { id: 2, label: "Tab 3" },
  { id: 3, label: "Tab 4" },
  { id: 4, label: "Tab 5" },
];

const CookiesPage = () => {
  const cookiesStore = cookies();
  const cookieSelectedTab = parseInt(cookiesStore.get('selected-tab')?.value || '0');

  return (
    <div className={styles.container}>
      <h1>Cookies Page</h1>
      <TabBar initialTab={cookieSelectedTab} tabs={tabs}></TabBar>
    </div>
  );
};

export default CookiesPage;
