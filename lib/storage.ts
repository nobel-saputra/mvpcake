import { Order, OrderStatus } from "@/types";

const ORDERS_KEY = "sweetcake_orders";

export function getOrders(): Order[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(ORDERS_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data) as Order[];
  } catch {
    return [];
  }
}

export function saveOrder(order: Order): void {
  const orders = getOrders();
  orders.push(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function getOrderById(orderId: string): Order | null {
  const orders = getOrders();
  return orders.find((o) => o.id === orderId) ?? null;
}

export function updateOrderStatus(
  orderId: string,
  status: OrderStatus
): Order | null {
  const orders = getOrders();
  const index = orders.findIndex((o) => o.id === orderId);
  if (index === -1) return null;
  orders[index].status = status;
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  return orders[index];
}

export function generateOrderId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}
