import { FaReact } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Sidebar.module.css';
import { CiLogout } from 'react-icons/ci';
import { SidebarItem, SidebarItemProps } from '../sidebar-item/SidebarItem';
import { RxDashboard } from 'react-icons/rx';
import { LuServerCrash } from 'react-icons/lu';
import { IoMdCheckboxOutline } from 'react-icons/io';

const items: SidebarItemProps[] = [
  {
    title: "Dashboard",
    icon: <RxDashboard />,
    route: "/dashboard",
  },
  {
    title: "Todo Items",
    icon: <IoMdCheckboxOutline />,
    route: "/dashboard/todo-items",
  },
  {
    title: "Server Actions",
    icon: <LuServerCrash />,
    route: "/dashboard/server-actions",
  },
];

export const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <span className={styles.title}>
        <FaReact />
        <span className={styles.title}>tailus</span>
      </span>

      <div className={styles.separator}></div>

      <div className={styles.user}>
        <Image
          src="/image/professional-profile-picture.jpg"
          alt="User's profile picture"
          width={130}
          height={130}
        ></Image>
        <span className={styles.name}>John Doe</span>
        <span className={styles.role}>Admin</span>
      </div>

      <div className={styles.separator}></div>

      <div className={styles.items}>
        {
          items.map((item, index) => 
            <SidebarItem {...item} key={index} />
          )
        }
      </div>

      <div className={styles.logout}>
        <Link href="">
          <CiLogout />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};

