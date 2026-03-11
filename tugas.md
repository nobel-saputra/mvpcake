Buatkan sebuah website MVP sistem pemesanan kue dengan dua tampilan utama yaitu tampilan user (customer) dan tampilan admin (penjual). Sistem ini adalah website toko kue mandiri yang memungkinkan pelanggan melakukan pemesanan kue secara online lalu mengambilnya di toko (pickup).

Gunakan stack sederhana seperti Next.js (React) dan buat sistem yang mudah dijalankan secara lokal. Fokus pada UI dan alur sistem, tidak perlu autentikasi kompleks dan tidak perlu payment gateway asli.

Fitur utama yang harus dibuat:

CUSTOMER SIDE

1. Halaman Homepage
   Menampilkan daftar menu kue dengan:

* gambar kue
* nama kue
* harga
* tombol "Pesan"

2. Halaman Form Pemesanan
   Saat user klik pesan, tampilkan form yang berisi:

* nama pelanggan
* nomor HP
* email
* jumlah kue
* tanggal pengambilan
* catatan tambahan

Setelah submit, sistem membuat order dengan:

* order id otomatis
* status: pending_payment

3. Halaman Pembayaran (Dummy QR Payment)
   Tampilkan:

* Order ID
* Total harga
* QR Code dummy
* tombol "Simulasi Pembayaran"

Ketika tombol ditekan:
status order berubah menjadi "paid"
user diarahkan ke halaman sukses.

4. Halaman Payment Success
   Tampilkan:

* pesan pembayaran berhasil
* order ID
* tanggal pengambilan
* instruksi untuk datang ke toko mengambil pesanan

ADMIN SIDE

5. Halaman Admin Dashboard (/admin)
   Menampilkan tabel pesanan dengan kolom:

* Order ID
* Nama pelanggan
* Nomor HP
* Produk
* Jumlah
* Tanggal ambil
* Status pesanan

6. Halaman Detail Order
   Ketika admin klik order, tampilkan detail lengkap:

* order id
* nama
* phone
* email
* produk
* jumlah
* tanggal ambil
* status

Admin dapat mengubah status order dengan tombol:

* Processing
* Ready for Pickup
* Completed

STATUS ORDER YANG DIGUNAKAN

* pending_payment
* paid
* processing
* ready_for_pickup
* completed

ALUR SISTEM

User:

1. membuka website
2. memilih kue
3. mengisi form pemesanan
4. melakukan pembayaran dummy
5. melihat halaman pembayaran berhasil

Admin:

1. membuka dashboard admin
2. melihat pesanan yang sudah dibayar
3. memproses pesanan
4. menandai pesanan siap diambil
5. menandai pesanan selesai

Tambahkan juga:

* desain UI sederhana dan modern
* komponen React terpisah
* dummy data untuk menu kue
* QR code dummy pada halaman pembayaran
* sistem penyimpanan order sederhana (state atau JSON mock)

Buat struktur folder project yang rapi dan mudah dikembangkan menjadi sistem production di masa depan.
