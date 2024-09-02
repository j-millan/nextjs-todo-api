import { Metadata } from "next";
import styles from "./page.module.css";
import { cookies } from "next/headers";
import { cookieShoppingCart, ShoppingCartCard } from "@/app/shopping-cart";
import prisma from "@/lib/prisma";
import { Widget } from "@/shared";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Manage your cart",
};

const ShoppingCartPage = async () => {
  const cookieStore = cookies();
  const cookieCart: cookieShoppingCart = JSON.parse(
    cookieStore.get("shopping-cart")?.value || "{}"
  );
  const cartProductIds = Object.entries(cookieCart).map(([id]) => id);

  const products = await prisma.product.findMany({
    where: {
      id: { in: cartProductIds },
    },
  });

  const productsTotal = products
    .map((product) => product.price * cookieCart[product.id])
    .reduce((prev, next) => (prev || 0) + next, 0);
  const tax = productsTotal * (15 / 100);

  return (
    <div className={styles.container}>
      <h1>Shopping Cart</h1>
      <div className={styles.content}>
        <div className={styles.grid}>
          {products.map((product) => {
            const quantity = cookieCart[product.id];
            return (
              <ShoppingCartCard
                product={product}
                quantity={quantity}
                key={product.id}
              ></ShoppingCartCard>
            );
          })}
        </div>

        <Widget title="Order Amount:">
          <div className={styles["widget-content"]}>
            <div className={styles["widget-details"]}>
              <span>Products: ${productsTotal.toFixed(2)}</span>
              <span>Tax (15%): ${tax.toFixed(2)}</span>
              <span>Coupon discount: $0.00</span>
            </div>
            <span className={styles["widget-total"]}>
              Total: ${(productsTotal + tax).toFixed(2)}
            </span>
          </div>
        </Widget>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
