"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getOrders } from "@/lib/storage";
import StatusBadge from "@/components/StatusBadge";
import type { Order } from "@/types";


function formatDate(dateStr: string): string {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function AdminDashboard() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrders(getOrders().reverse());
    setLoading(false);
  }, []);

  if (loading) return <div className="loading">Memuat...</div>;

  const totalOrders = orders.length;
  const paidOrders = orders.filter(
    (o) => o.status !== "pending_payment"
  ).length;
  const readyOrders = orders.filter(
    (o) => o.status === "ready_for_pickup"
  ).length;
  const completedOrders = orders.filter(
    (o) => o.status === "completed"
  ).length;

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      <p className="subtitle">Kelola pesanan pelanggan dari sini</p>

      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-number">{totalOrders}</div>
          <div className="stat-label">Total Pesanan</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{paidOrders}</div>
          <div className="stat-label">Sudah Dibayar</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{readyOrders}</div>
          <div className="stat-label">Siap Diambil</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{completedOrders}</div>
          <div className="stat-label">Selesai</div>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="no-orders">
          <div className="icon">📋</div>
          <p>Belum ada pesanan masuk.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Nama</th>
                <th>Nomor HP</th>
                <th>Produk</th>
                <th>Jumlah</th>
                <th>Tgl Ambil</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  onClick={() => router.push(`/admin/order/${order.id}`)}
                >
                  <td style={{ fontWeight: 600, fontSize: 13 }}>{order.id}</td>
                  <td>{order.customerName}</td>
                  <td>{order.customerPhone}</td>
                  <td>{order.cakeName}</td>
                  <td>{order.quantity}x</td>
                  <td>{formatDate(order.pickupDate)}</td>
                  <td>
                    <StatusBadge status={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
