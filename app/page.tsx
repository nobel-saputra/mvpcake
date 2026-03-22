"use client";

import Image from "next/image";
import Link from "next/link";
import { cakes } from "@/app/data/cakes";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <h1>Kue Terbaik untuk Momen Spesial Anda</h1>
        <p>Pilih kue favorit Anda dan pesan sekarang untuk diambil di toko.</p>
      </section>

      <section className="cake-grid">
        {cakes.map((cake) => (
          <div key={cake.id} className="cake-card">
            <div className="cake-image-wrapper">
              <Image src={cake.image} alt={cake.name} width={600} height={400} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div className="cake-info">
              <h3 className="cake-name">{cake.name}</h3>
              <p className="cake-desc">{cake.description}</p>
              <div className="cake-bottom">
                <span className="cake-price">{formatPrice(cake.price)}</span>
                <Link href={`/order/${cake.id}`} className="btn btn-primary">
                  Pesan
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
