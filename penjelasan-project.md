# Dokumentasi Teknis Lengkap: SweetCake (MVP Cake)

Dokumen ini dirancang untuk pengembang yang ingin melakukan **modifikasi total** pada project ini. Di bawah ini adalah penjelasan mendalam mengenai arsitektur, logika kode, dan sistem data.

---

## 🏗️ 1. Arsitektur Data & Type System

Aplikasi ini menggunakan TypeScript secara ketat untuk memastikan konsistensi data. Definisi utama berada di `types/index.ts`.

### **Interfaces Utama:**

- **`Cake`**: Struktur data produk (id, nama, deskripsi, harga, image).
- **`Order`**: Struktur data pesanan lengkap. Menyimpan snapshot informasi kue saat dipesan (nama dan harga) agar jika harga di master data berubah, data pesanan lama tetap konsisten.
- **`OrderStatus`**: Tipe Union yang membatasi status hanya pada nilai tertentu:
  - `pending_payment`: User baru mengisi form.
  - `paid`: User sudah menekan tombol bayar.
  - `processing`: Admin sedang menyiapkan kue.
  - `ready_for_pickup`: Kue siap diambil.
  - `completed`: Transaksi selesai.

---

## 💾 2. Sistem Penyimpanan (`lib/storage.ts`)

Karena tidak menggunakan database SQL/NoSQL, aplikasi ini mengandalkan `localStorage` browser.

- **Serialisasi**: Data disimpan sebagai JSON string dengan key `sweetcake_orders`.
- **Error Handling**: Fungsi `getOrders()` dilengkapi `try-catch` untuk menangani kasus jika data di local storage rusak/bukan JSON valid.
- **Update Logic**: Fungsi `updateOrderStatus()` mencari index pesanan, mengubah properti status, lalu menyimpan kembali seluruh array ke local storage.
- **ID Generation**: `generateOrderId()` menggabungkan timestamp (Base36) dan string random 4 karakter untuk meminimalkan kemungkinan ID tabrakan (collision).

---

## 🛣️ 3. Mekanisme Routing & Dynamic Routes

Next.js App Router mengelola navigasi menggunakan struktur folder:

- **`app/order/[id]`**: Parameter `[id]` merujuk pada `id` kue (misal: `red-velvet`). Digunakan untuk menarik data kue dari `data/cakes.ts`.
- **`app/payment/[orderId]`**: Parameter `[orderId]` merujuk pada ID unik pesanan (misal: `ORD-LZ123-ABCD`). Digunakan untuk mencari data pesanan di Local Storage.
- **Client-Side Navigation**: Menggunakan `useParams()` dari `next/navigation` untuk menangkap ID dari URL di dalam komponen bertipe `"use client"`.

---

## 🎨 4. Logika UI & Komponen

### **StatusBadge (`components/StatusBadge.tsx`)**

Menggunakan pola **Configuration Object**. Alih-alih menggunakan banyak `if-else`, komponen ini menggunakan objek `statusConfig` yang memetakan status ke label teks dan class CSS. Jika Anda ingin menambah status baru, cukup tambahkan di objek ini.

### **Simulasi Pembayaran (`app/payment/[orderId]/page.tsx`)**

Terdapat fungsi `handlePayment()` yang menggunakan `setTimeout` selama 1500ms. Ini sengaja dibuat untuk memberikan pengalaman "menunggu proses" kepada user sebelum status diubah menjadi `paid` dan diarahkan ke halaman sukses.

### **Theming (`app/globals.css`)**

Sistem warna menggunakan CSS Variables di root. Jika ingin mengubah warna brand (misal dari pink ke biru), Anda hanya perlu mengubah `--primary` dan `--secondary` di baris awal file CSS.

---

## 🛠️ 5. Panduan Modifikasi Total

### **Jika ingin mengganti ke Database (Supabase/Firebase/Prisma):**

1.  Ubah semua fungsi di `lib/storage.ts` menjadi fungsi `async`.
2.  Ganti isi fungsi tersebut dengan query database.
3.  Ubah pemanggilan di halaman (misal `saveOrder`) menjadi `await saveOrder`.

### **Jika ingin menambah fitur Keranjang Belanja:**

1.  Buat type baru `CartItem` di `types/index.ts`.
2.  Buat `storage.ts` baru khusus untuk mengelola array keranjang di local storage.
3.  Ubah halaman utama agar tombol "Pesan" memasukkan data ke keranjang terlebih dahulu.

### **Jika ingin mengubah Tampilan (UI):**

- Project ini menggunakan **Tailwind CSS v4** yang diintegrasikan via `@import "tailwindcss"` di `globals.css`.
- Anda bisa menggunakan utility class Tailwind langsung di file `.tsx` atau membuat class custom di `globals.css` menggunakan variabel yang sudah ada.

---

## 📋 6. Daftar File Penting untuk Modifikasi

- `data/cakes.ts`: Edit ini untuk mengubah menu kue.
- `app/globals.css`: Edit ini untuk mengubah desain visual global.
- `app/page.tsx`: Edit ini untuk mengubah tata letak halaman depan (landing page).
- `app/admin/page.tsx`: Edit ini untuk mengubah apa saja yang dilihat admin di dashboard.
