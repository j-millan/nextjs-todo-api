import { getCookie, hasCookie, setCookie } from "cookies-next";

export type cookieShoppingCart = { [id: string]: number }

export const getShoppingCart = (): cookieShoppingCart => {
  if (hasCookie('shopping-cart')) {
    const cookieCart = getCookie('shopping-cart') || '{}';
    return JSON.parse(cookieCart);
  }

  return {};
};

export const addShoppingCartProduct = (id: string, quantity: number = 1): void => {
  const cookieCart = getShoppingCart();

  if (cookieCart[id]) {
    cookieCart[id] += quantity;
  } else {
    cookieCart[id] = quantity;
  }

  setCookie('shopping-cart', JSON.stringify(cookieCart));
};

export const removeSingleShoppingCartProduct = (id: string): void => {
  const cookieCart = getShoppingCart();

  if (!cookieCart[id]) {
    return;
  }
  
  const newQty = cookieCart[id] - 1;
  if (newQty <= 0) {
    delete cookieCart[id];
  } else {
    cookieCart[id] = newQty;
  }

  setCookie("shopping-cart", JSON.stringify(cookieCart));
}

export const removeShoppingCartProduct = (id: string): void => { 
  const cookieCart = getShoppingCart();
  delete cookieCart[id];

  setCookie('shopping-cart', JSON.stringify(cookieCart));
}