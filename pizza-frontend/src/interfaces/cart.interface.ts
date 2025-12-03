import { CartItem, Pizza } from "../interfaces/order.interface";

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (pizza: Pizza, size: string, quantity: number) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
}
