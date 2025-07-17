import { getUserIdFromToken } from "./auth.utils";

export const getCartStorageKey = (): string | null => {
  const userId = getUserIdFromToken();
  return userId ? `cart-${userId}` : null;
};
