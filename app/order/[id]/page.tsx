"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { getCakeById } from "@/data/cakes";
import { saveOrder, generateOrderId } from "@/lib/storage";
import type { Order } from "@/types";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export default function OrderPage() {
  const params = useParams();
  const router = useRouter();
  const cake = getCakeById(params.id as string);

  const [form, setForm] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    quantity: 1 as number | string,
    pickupDate: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);

  if (!cake) {
    return (
      <div className="not-found">
        <h2>Kue tidak ditemukan</h2>
        <p>Maaf, kue yang Anda cari tidak tersedia.</p>
        <button className="btn btn-primary" onClick={() => router.push("/")}>
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  const totalPrice = cake.price * (Number(form.quantity) || 1);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "quantity" ? (value === "" ? "" : Math.max(1, parseInt(value) || 1)) : value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!cake) return;
    setSubmitting(true);

    const order: Order = {
      id: generateOrderId(),
      cakeId: cake.id,
      cakeName: cake.name,
      cakePrice: cake.price,
      cakeImage: cake.image,
      customerName: form.customerName,
      customerPhone: form.customerPhone,
      customerEmail: form.customerEmail,
      quantity: Number(form.quantity) || 1,
      pickupDate: form.pickupDate,
      notes: form.notes,
      totalPrice,
      status: "pending_payment",
      createdAt: new Date().toISOString(),
    };

    saveOrder(order);
    router.push(`/payment/${order.id}`);
  }

  // Get tomorrow's date as min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <div className="form-page">
      <h1>Form Pemesanan</h1>
      <p className="subtitle">Lengkapi data berikut untuk memesan kue</p>

      <div className="form-card">
        <div className="selected-cake">
          <Image
            src={cake.image}
            alt={cake.name}
            width={80}
            height={80}
            style={{ borderRadius: 10, objectFit: "cover" }}
          />
          <div className="selected-cake-info">
            <h3>{cake.name}</h3>
            <p>{formatPrice(cake.price)}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="customerName">Nama Lengkap</label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              placeholder="Masukkan nama lengkap"
              value={form.customerName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="customerPhone">Nomor HP</label>
              <input
                type="tel"
                id="customerPhone"
                name="customerPhone"
                placeholder="08xxxxxxxxxx"
                value={form.customerPhone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="customerEmail">Email</label>
              <input
                type="email"
                id="customerEmail"
                name="customerEmail"
                placeholder="email@contoh.com"
                value={form.customerEmail}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="quantity">Jumlah</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                value={form.quantity}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="pickupDate">Tanggal Pengambilan</label>
              <input
                type="date"
                id="pickupDate"
                name="pickupDate"
                min={minDate}
                value={form.pickupDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="notes">Catatan Tambahan (opsional)</label>
            <textarea
              id="notes"
              name="notes"
              placeholder="Contoh: Tulis nama di kue, tanpa kacang, dsb."
              value={form.notes}
              onChange={handleChange}
            />
          </div>

          <div style={{ textAlign: "right", marginTop: 8 }}>
            <p style={{ fontSize: 14, color: "var(--text-muted)", margin: "0 0 4px" }}>Total Harga</p>
            <p style={{ fontSize: 22, fontWeight: 700, color: "var(--primary)", margin: "0 0 16px" }}>
              {formatPrice(totalPrice)}
            </p>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg btn-block"
            disabled={submitting}
          >
            {submitting ? "Memproses..." : "Lanjut ke Pembayaran"}
          </button>
        </form>
      </div>
    </div>
  );
}
