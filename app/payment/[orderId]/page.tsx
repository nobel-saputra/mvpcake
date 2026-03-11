"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getOrderById, updateOrderStatus } from "@/lib/storage";
import QRCode from "@/components/QRCode";
import type { Order } from "@/types";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export default function PaymentPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

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

  function handlePayment() {
    setProcessing(true);
    // Simulate payment delay
    setTimeout(() => {
      updateOrderStatus(order!.id, "paid");
      router.push(`/success/${order!.id}`);
    }, 1500);
  }

  return (
    <div className="payment-page">
      <h1>Pembayaran</h1>
      <p className="subtitle">Selesaikan pembayaran untuk melanjutkan pesanan</p>

      <div className="payment-card">
        <div className="payment-details">
          <div className="payment-row">
            <span className="label">Order ID</span>
            <span className="value">{order.id}</span>
          </div>
          <div className="payment-row">
            <span className="label">Produk</span>
            <span className="value">{order.cakeName}</span>
          </div>
          <div className="payment-row">
            <span className="label">Jumlah</span>
            <span className="value">{order.quantity}x</span>
          </div>
          <div className="payment-row">
            <span className="label">Harga Satuan</span>
            <span className="value">{formatPrice(order.cakePrice)}</span>
          </div>
          <div className="payment-row payment-total">
            <span className="label">Total Pembayaran</span>
            <span className="value">{formatPrice(order.totalPrice)}</span>
          </div>
        </div>

        <QRCode />

        <div style={{ marginTop: 28 }}>
          <button
            className="btn btn-primary btn-lg btn-block"
            onClick={handlePayment}
            disabled={processing}
          >
            {processing ? "Memproses Pembayaran..." : "💳 Simulasi Pembayaran"}
          </button>
        </div>
      </div>
    </div>
  );
}
