/* eslint-disable @next/next/no-img-element */
"use client";

import { Product } from "@prisma/client";
import styles from "./ShoppingCartCard.module.css";
import { useState } from "react";
import { MdAdd } from "react-icons/md";
import { FiMinus } from "react-icons/fi";
import { addShoppingCartProduct, removeSingleShoppingCartProduct } from "../..";
import { useRouter } from "next/navigation";

export interface ShoppingCartCardProps {
  product: Product;
  quantity: number;
}

export const ShoppingCartCard = ({
  product,
  quantity,
}: ShoppingCartCardProps) => {
  const router = useRouter();

  const onAddClick = () => {
    addShoppingCartProduct(product.id, 1);
    router.refresh();
  };

  const onRemoveClick = () => {
    removeSingleShoppingCartProduct(product.id);
    router.refresh();
  };

  return (
    <div className={styles.card}>
      <img
        className={styles.image}
        src={product.image}
        alt="Product image"
      ></img>

      <div className={styles.details}>
        <span className={styles.name}>
          {product.name}
          <span className={styles.price}> - ${product.price.toFixed(2)}</span>
        </span>
        <span>Quantity: {quantity}</span>
        <span>
          Total:
          <strong> ${(quantity * product.price).toFixed(2)}</strong>
        </span>
      </div>

      <div className={styles.spacer}></div>

      <div className={styles.quantity}>
        <button className={styles["add-button"]} onClick={onAddClick}>
          <MdAdd />
        </button>
        <span>{quantity}</span>
        <button className={styles["remove-button"]} onClick={onRemoveClick}>
          <FiMinus />
        </button>
      </div>
    </div>
  );
};
