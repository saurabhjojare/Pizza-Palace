import { getUserIdFromToken } from "./Auth";

export const getCartStorageKey = (): string | null => {
  const userId = getUserIdFromToken();
  return userId ? `cart-${userId}` : null;
};
