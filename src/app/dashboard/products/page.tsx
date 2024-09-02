import { ProductsGrid } from "@/app/products";
import styles from "./page.module.css";
import prisma from "@/lib/prisma";

const ProductsPage = async () => {
  const products = await prisma.product.findMany();
  
  return (
    <div className={styles.container}>
      <h1>Products</h1>
      <ProductsGrid products={products}></ProductsGrid>
    </div>
  );
};

export default ProductsPage;
