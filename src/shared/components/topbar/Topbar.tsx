import Link from "next/link";
import { AiOutlineMessage } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { TextInput } from "../text-input/TextInput";
import { LuShoppingBasket } from "react-icons/lu";
import { Button } from "../button/Button";
import { cookieShoppingCart } from "@/app/shopping-cart";
import styles from "./Topbar.module.css";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

const shoppingBasketIcon = <LuShoppingBasket />;
const messagesIcon = <AiOutlineMessage />;
const searchInpuConfig = {
  placeholder: "Search",
  icon: <CiSearch />,
};


export interface TopbarProps {
  cookieStore: ReadonlyRequestCookies;
}

export const Topbar = ({ cookieStore }: TopbarProps) => {
  const shoppingCart: cookieShoppingCart = JSON.parse(
    cookieStore.get("shopping-cart")?.value || "{}"
  );
  const cartItemCount = Object.values(shoppingCart).reduce(
    (prev, next) => (prev || 0) + next,
    0
  );

  return (
    <div className={styles.topbar}>
      <span className={styles.title}>Dashboard</span>
      <div className={styles["end-items"]}>
        <TextInput {...searchInpuConfig} />
        <Button icon={messagesIcon} />
        <Link href="/dashboard/shopping-cart">
          <Button icon={shoppingBasketIcon} text={cartItemCount.toString()} />
        </Link>
      </div>
    </div>
  );
};
