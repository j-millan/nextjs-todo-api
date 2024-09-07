import { FaReact, FaRegUser } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Sidebar.module.css';
import { CiLogout } from 'react-icons/ci';
import { SidebarItem, SidebarItemProps } from '../sidebar-item/SidebarItem';
import { RxDashboard } from 'react-icons/rx';
import { LuCookie, LuServerCrash } from 'react-icons/lu';
import { IoMdCheckboxOutline } from 'react-icons/io';
import { BsShop } from 'react-icons/bs';
import { auth } from '@/auth';

const items: SidebarItemProps[] = [
  {
    title: "User Profile",
    icon: <FaRegUser />,
    route: "/dashboard/user-profile",
  },
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
  {
    title: "Cookies",
    icon: <LuCookie />,
    route: "/dashboard/cookies",
  },
  {
    title: "Products",
    icon: <BsShop />,
    route: "/dashboard/products",
  },
];

export const Sidebar = async () => {
  const session = await auth();

  const avatarUrl =
    session?.user?.image ?? "/images/professional-profile-picture.jpg";
  const username = session?.user?.name ?? 'Unauthenticated';
  const roles =
    session?.user?.roles?.join(', ');
  
  return (
    <div className={styles.sidebar}>
      <span className={styles.title}>
        <FaReact />
        <span className={styles.title}>tailus</span>
      </span>

      <div className={styles.separator}></div>

      <div className={styles.user}>
        <Image
          src={avatarUrl}
          alt="User's profile picture"
          width={100}
          height={100}
        ></Image>
        <span className={styles.name}>{username}</span>
        <span className={styles.role}>{roles}</span>
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
        <Link href="/api/auth/signout">
          <CiLogout />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};

