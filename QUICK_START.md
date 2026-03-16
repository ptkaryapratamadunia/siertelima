# 🚀 QUICK START

Ingin langsung coba? Ikuti 3 langkah ini:

## 1️⃣ Setup Database Connection

Buka `.env.local` dan ganti dengan database Anda:

```env
DATABASE_URL="mysql://username:password@hostname:port/database_name"
```

Contoh:

```env
DATABASE_URL="mysql://admin:pass123@192.168.1.5:3306/rt05"
```

## 2️⃣ Hash Password yang Sudah Ada (Jika Belum Hash)

```bash
npm run hash-passwords
```

## 3️⃣ Jalankan Server

```bash
npm run dev
```

Buka browser: **http://localhost:3000/login**

---

## ✅ Selesai!

Login dengan username dan password dari database Anda.

Jika berhasil → redirect ke dashboard ✨

---

## 📞 Ada Masalah?

- **Login ga work?** → Cek `.env.local` DATABASE_URL
- **Password error?** → Jalankan `npm run hash-passwords`
- **Connection error?** → Cek host, port, database name

---

## 📚 Dokumentasi Lengkap

Lihat `SETUP_COMPLETE.md` untuk dokumentasi detail.
