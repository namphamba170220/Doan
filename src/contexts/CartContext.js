import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
  cartItems: [],
  addToCart(newItem) {},
  removeFromCart(index) {},
});

export function CartProvider({ children }) {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(newItem) {
    const existingItem = cart.find(
      (cartItem) =>
        cartItem.id === newItem.id &&
        cartItem.color === newItem.color &&
        cartItem.version === newItem.version
    );
    if (existingItem) {
      setCart((currentCart) => {
        const newCart = [...currentCart];
        const existingItemIndex = newCart.findIndex(
          (cartItem) =>
            cartItem.id === newItem.id &&
            cartItem.color === newItem.color &&
            cartItem.version === newItem.version
        );
        newCart[existingItemIndex].quantity += newItem.quantity;
        return newCart;
      });
    } else {
      setCart((currentCart) => {
        const newCart = [...currentCart];
        newCart.push(newItem);
        return newCart;
      });
    }
  }

  function updateItem(meth, indexEdit) {
    setCart((currentCart) => {
      currentCart.map((item, index) => {
        if (index === indexEdit) {
          if (meth === "+") {
            item.quantity += 1;
          } else if (meth === "-") {
            if (item.quantity === 1) {
              removeFromCart(index);
            } else if (item.quantity > 1) {
              item.quantity -= 1;
            }
          }
        }
        return item;
      });
      const newCart = [...currentCart];
      return newCart;
    });
  }

  function removeFromCart(index) {
    setCart((currentCart) => {
      currentCart.splice(index, 1);
      const newCart = [...currentCart];
      return newCart;
    });
  }

  const value = { cartItems: cart, addToCart, removeFromCart, updateItem };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
