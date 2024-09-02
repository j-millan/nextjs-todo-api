/* eslint-disable @next/next/no-img-element */
'use client';

import { Product } from "@prisma/client";
import styles from "./ProductCard.module.css";
import { MdAddCircleOutline } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { addShoppingCartProduct, removeShoppingCartProduct } from "@/app/shopping-cart";
import { useRouter } from "next/navigation";

export interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  
  const addProductToCart = () => {
    addShoppingCartProduct(product.id);
    router.refresh();
  };

  const removeProductFromCart = () => {
    removeShoppingCartProduct(product.id);
    router.refresh();
  };
  
  return (
    <div className={styles.card}>
      <img
        className={styles.image}
        src={product.image}
        alt="Product image"
        width={150}
        height={150}
      ></img>
      <div className={styles.details}>
        <span className={styles.description}>{product.name}</span>
        <div className={styles.footer}>
          <span className={styles.price}>${product.price.toFixed(2)}</span>
          <div className={styles.buttons}>
            <button className={styles["add-button"]} onClick={addProductToCart}>
              <MdAddCircleOutline size={16} />
            </button>
            <button
              className={styles["remove-button"]}
              onClick={removeProductFromCart}
            >
              <FaRegTrashAlt />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
