# Panduan Setup Login dengan MySQL Database

## 📋 Langkah-langkah Implementasi

### 1. **Konfigurasi Database Connection**

Buka file `.env.local` dan sesuaikan dengan kredensial database Anda di phpMyAdmin:

```env
DATABASE_URL="mysql://username:password@hostname:port/database_name"
```

**Contoh:**

```env
DATABASE_URL="mysql://root:password123@192.168.1.100:3306/rt05db"
```

Atau jika di hosting:

```env
DATABASE_URL="mysql://user_rt05:pass123@hosting.com:3306/rt05_database"
```

### 2. **Install Dependencies & Setup Prisma**

Pastikan semua dependencies sudah ter-install:

```bash
npm install
```

Generate Prisma Client:

```bash
npx prisma generate
```

### 3. **Update Database Schema (Optional)**

Jika password pada database belum di-hash dengan bcrypt, Anda bisa update secara manual atau menggunakan script. Untuk login berfungsi dengan baik, password harus disimpan dalam format bcrypt.

### 4. **Testing Login**

1. Jalankan dev server:

```bash
npm run dev
```

2. Buka browser: `http://localhost:3000/login`

3. Login dengan credentials yang sudah ada di database

## 📁 File-File yang Telah Dibuat/Diupdate

1. **`prisma/schema.prisma`** - Schema untuk tabel user dengan MySQL
2. **`src/pages/api/login.tsx`** - API endpoint untuk validasi login
3. **`src/pages/login/index.tsx`** - Form login dengan state management
4. **`src/pages/dashboard.tsx`** - Dashboard setelah login
5. **`.env.local`** - File konfigurasi database

## 🔑 Cara Kerja Login System

### Flow Login:

```
User Input (username, password)
        ↓
Form Submit (POST to /api/login)
        ↓
API Endpoint (/api/login)
        ↓
Query User by Username
        ↓
Compare Password dengan bcrypt
        ↓
Success: Return User Data & Redirect to Dashboard
Fail: Return Error Message
```

### Keamanan:

- ✅ Password di-compare dengan bcrypt (hashed comparison)
- ✅ Password tidak pernah dikirim kembali ke client
- ✅ Error messages generic (tidak memberitahu apakah username atau password yang salah)

## 🔐 Password Hashing untuk Data Lama

Jika database sudah ada dan password belum di-hash, Anda bisa hash manual menggunakan bcrypt online generator atau script Node.js:

```bash
npx ts-node scripts/hash-passwords.ts
```

Script for `scripts/hash-passwords.ts`:

```typescript
import bcrypt from 'bcrypt-ts';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });
    console.log(`Hashed password for user: ${user.username}`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

## 📝 Contoh Test Data

Untuk test, Anda bisa menambah user ke database:

```bash
npx prisma studio
```

Atau via phpMyAdmin dengan password yang sudah di-hash menggunakan bcrypt.

## 🐛 Troubleshooting

**Error: "connect ECONNREFUSED"**

- Cek DATABASE_URL di `.env.local`
- Pastikan host, port, dan username/password sudah benar
- Cek koneksi internet jika hosting remote

**Error: "Unknown database"**

- Pastikan database sudah dibuat di phpMyAdmin
- Nama database harus sesuai dengan di env file

**Login ga work tapi tidak ada error**

- Check browser console untuk error message
- Pastikan bcrypt tersedia dengan: `npm ls bcrypt-ts`

## 🚀 Deployment Tips

1. Jangan commit `.env.local` ke git
2. Tambahkan ke `.gitignore`: `.env.local`
3. Di server hosting, set environment variables melalui hosting panel

---

**Status**: ✅ Setup Selesai
Lokasi File Config: `.env.local`
API Endpoint: `POST /api/login`
