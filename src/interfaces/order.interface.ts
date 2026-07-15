import { OrderLine } from "./order-line.interface";

export interface Order {
  order_id: number;
  status: boolean;
  total_amount: string;
  order_time: string;
  customer_id: number;
  delivery_address: string;
  orderLines: OrderLine[];
}

export interface OrderTableProps {
  orders: Order[];
  pizzas: Map<number, string>;
  handleCancel: (orderId: number) => void;
  formatDate: (dateString: string) => { date: string; time: string };
}

export interface AddToCartProps {
  pizza: Pizza;
  addToCart: (pizza: Pizza, size: string, quantity: number) => void;
}

export interface CartItemPayload {
  pizza_id: number;
  size: string;
  quantity: number;
}

export interface BuyProps {
  customerId: number;
  deliveryAddress: string;
  cartItems: CartItemPayload[];
  clearCart: () => void;
  totalAmount: number;
}

export interface CartItem {
  pizza: Pizza;
  size: string;
  quantity: number;
}

export interface CartProps {
  cartItems: CartItem[];
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, newQuantity: number) => void;
  clearCart: () => void;
  customerId: number;
}

export interface Pizza {
  pizza_id: number;
  name: string;
  type: "Vegetarian" | "Non-Vegetarian";
  imageUrl: string;
  description: string;
  regularPrice: string;
  mediumPrice: string;
  largePrice: string;
}

export interface QuantityProps {
  quantity: number;
  incrementQuantity: () => void;
  decrementQuantity: () => void;
}

export interface SizeProps {
  size: string;
  setSize: (size: string) => void;
  pizza: Pizza;
}
