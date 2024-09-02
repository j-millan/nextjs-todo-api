import { Product } from '@prisma/client';
import styles from './ProductsGrid.module.css';
import { ProductCard } from '../product-card/ProductCard';

export interface ProductsGridProps {
  products: Product[];
}

export const ProductsGrid = ({ products }: ProductsGridProps) => {
  
  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard product={product} key={product.id}></ProductCard>
      ))}
    </div>
  );
};