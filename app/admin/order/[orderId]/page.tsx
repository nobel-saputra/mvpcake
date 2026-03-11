"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getOrderById, updateOrderStatus } from "@/lib/storage";
import StatusBadge from "@/components/StatusBadge";
import type { Order, OrderStatus } from "@/types";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function AdminOrderDetail() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const found = getOrderById(params.orderId as string);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrder(found);
    setLoading(false);
  }, [params.orderId]);

  function handleStatusChange(newStatus: OrderStatus) {
    const updated = updateOrderStatus(order!.id, newStatus);
    if (updated) setOrder({ ...updated });
  }

  if (loading) return <div className="loading">Memuat...</div>;

  if (!order) {
    return (
      <div className="not-found">
        <h2>Pesanan tidak ditemukan</h2>
        <p>Order ID yang Anda cari tidak valid.</p>
        <button
          className="btn btn-primary"
          onClick={() => router.push("/admin")}
        >
          Kembali ke Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <Link href="/admin" className="back-link">
        ← Kembali ke Dashboard
      </Link>

      <h1>Detail Pesanan</h1>
      <p className="subtitle">{order.id}</p>

      <div className="detail-card">
        <h3>Informasi Pelanggan</h3>
        <div className="detail-grid">
          <div className="detail-item">
            <label>Nama</label>
            <span>{order.customerName}</span>
          </div>
          <div className="detail-item">
            <label>Nomor HP</label>
            <span>{order.customerPhone}</span>
          </div>
          <div className="detail-item">
            <label>Email</label>
            <span>{order.customerEmail}</span>
          </div>
        </div>
      </div>

      <div className="detail-card">
        <h3>Detail Produk</h3>
        <div className="detail-grid">
          <div className="detail-item">
            <label>Produk</label>
            <span>{order.cakeName}</span>
          </div>
          <div className="detail-item">
            <label>Jumlah</label>
            <span>{order.quantity}x</span>
          </div>
          <div className="detail-item">
            <label>Harga Satuan</label>
            <span>{formatPrice(order.cakePrice)}</span>
          </div>
          <div className="detail-item">
            <label>Total</label>
            <span style={{ color: "var(--primary)", fontWeight: 700 }}>
              {formatPrice(order.totalPrice)}
            </span>
          </div>
          <div className="detail-item">
            <label>Tanggal Ambil</label>
            <span>{formatDate(order.pickupDate)}</span>
          </div>
          <div className="detail-item">
            <label>Catatan</label>
            <span>{order.notes || "-"}</span>
          </div>
        </div>
      </div>

      <div className="detail-card">
        <h3>Status Pesanan</h3>
        <div style={{ marginBottom: 16 }}>
          <StatusBadge status={order.status} />
        </div>

        <div className="status-actions">
          <button
            className="btn btn-info"
            disabled={order.status === "processing"}
            onClick={() => handleStatusChange("processing")}
          >
            🔄 Processing
          </button>
          <button
            className="btn btn-warning"
            disabled={order.status === "ready_for_pickup"}
            onClick={() => handleStatusChange("ready_for_pickup")}
          >
            📦 Ready for Pickup
          </button>
          <button
            className="btn btn-success"
            disabled={order.status === "completed"}
            onClick={() => handleStatusChange("completed")}
          >
            ✅ Completed
          </button>
        </div>
      </div>
    </div>
  );
}
