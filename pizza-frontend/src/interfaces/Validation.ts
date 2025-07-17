export interface ValidationFormValues {
  name: string;
  type: "Vegetarian" | "Non-Vegetarian";
  imageUrl?: string;
  description?: string;
  regularPrice: number;
  mediumPrice: number;
  largePrice: number;
}
