import React, { createContext, useContext, useEffect, useState } from "react";
import { CartItem, Pizza } from "../interfaces/order.interface";
import { getCartStorageKey } from "../utils/cart-storage.utils";
import { CartContextType } from "../interfaces/cart.interface";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const key = getCartStorageKey();
    if (!key) return [];
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed;
      } catch (error) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    const key = getCartStorageKey();
    if (key) {
      localStorage.setItem(key, JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = (pizza: Pizza, size: string, quantity: number) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.pizza.pizza_id === pizza.pizza_id && item.size === size
      );

      if (existingIndex !== -1) {
        const updatedItems = [...prevItems];
        const existingItem = updatedItems[existingIndex];

        updatedItems[existingIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + quantity,
        };

        return updatedItems;
      }

      return [...prevItems, { pizza, size, quantity }];
    });
  };

  const removeFromCart = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
    const key = getCartStorageKey();
    if (key) {
      localStorage.removeItem(key);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
