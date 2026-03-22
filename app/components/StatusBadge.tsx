import { OrderStatus } from "@/app/types";

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  pending_payment: {
    label: "Menunggu Pembayaran",
    className: "badge-pending",
  },
  paid: {
    label: "Sudah Dibayar",
    className: "badge-paid",
  },
  processing: {
    label: "Diproses",
    className: "badge-processing",
  },
  ready_for_pickup: {
    label: "Siap Diambil",
    className: "badge-ready",
  },
  completed: {
    label: "Selesai",
    className: "badge-completed",
  },
};

export default function StatusBadge({ status }: { status: OrderStatus }) {
  const config = statusConfig[status];
  return <span className={`badge ${config.className}`}>{config.label}</span>;
}
