"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getOrderById } from "@/lib/storage";
import type { Order } from "@/types";
import Link from "next/link";

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
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function SuccessPage() {
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

  if (loading) return <div className="loading">Memuat...</div>;

  if (!order) {
    return (
      <div className="not-found">
        <h2>Pesanan tidak ditemukan</h2>
        <p>Order ID yang Anda cari tidak valid.</p>
        <button className="btn btn-primary" onClick={() => router.push("/")}>
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  return (
    <div className="success-page">
      <div className="success-icon">✓</div>
      <h1>Pembayaran Berhasil!</h1>
      <p>Terima kasih, pembayaran Anda telah kami terima.</p>

      <div className="success-card">
        <h3>Detail Pesanan</h3>
        <div className="success-row">
          <span className="label">Order ID</span>
          <span className="value">{order.id}</span>
        </div>
        <div className="success-row">
          <span className="label">Produk</span>
          <span className="value">{order.cakeName}</span>
        </div>
        <div className="success-row">
          <span className="label">Jumlah</span>
          <span className="value">{order.quantity}x</span>
        </div>
        <div className="success-row">
          <span className="label">Total</span>
          <span className="value">{formatPrice(order.totalPrice)}</span>
        </div>
        <div className="success-row">
          <span className="label">Tanggal Ambil</span>
          <span className="value">{formatDate(order.pickupDate)}</span>
        </div>
      </div>

      <div className="instruction-box">
        <h4>📍 Instruksi Pengambilan</h4>
        <p>
          Silakan datang ke toko kami pada tanggal{" "}
          <strong>{formatDate(order.pickupDate)}</strong> untuk mengambil pesanan
          Anda. Tunjukkan Order ID <strong>{order.id}</strong> kepada kasir saat
          pengambilan. Pastikan untuk datang pada jam operasional toko (09.00 -
          20.00 WIB).
        </p>
      </div>

      <Link href="/" className="btn btn-primary btn-lg">
        Kembali ke Beranda
      </Link>
    </div>
  );
}
