export type OrderStatus =
  | "pending_payment"
  | "paid"
  | "processing"
  | "ready_for_pickup"
  | "completed";

export interface Cake {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  cakeId: string;
  cakeName: string;
  cakePrice: number;
  cakeImage: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  quantity: number;
  pickupDate: string;
  notes: string;
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
}
