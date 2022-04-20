import React, { useContext,useState } from "react";

const CartContext = React.createContext({
    cartItems:[],
    addToCart(item) {},
    removeFromCart(id) {},

});

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    function addToCart(newItem){
        const existingItem = cart.find((cartItem) => cartItem.item.id === newItem.id);
        if (existingItem) {
            existingItem.quantity++;
        }
        else{
            cart.push({
                item:newItem,
                quantity:1
            })
        }
    }
    function removeFromCart(id){};
    const value = {cartItems:cart,addToCart,removeFromCart}
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useAuthValue() {
  return useContext(CartContext);
}