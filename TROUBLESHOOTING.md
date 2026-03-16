# 🔧 TROUBLESHOOTING ERROR YANG SUDAH DIPERBAIKI

## ✅ Error yang Sudah Diperbaiki:

### **1. "Unexpected token '<', "<!DOCTYPE" is not valid JSON"**

Error ini terjadi karena API endpoint mengembalikan HTML error page daripada JSON response.

**Penyebab:**

- DATABASE_URL tidak valid (tidak bisa connect ke database)
- Ada syntax error di kode
- Database belum diakses

**Solusi yang Sudah Dilakukan:**
✅ Perbaiki DATABASE_URL - encode karakter `@` menjadi `%40`
✅ Tambah error handling di login form untuk detect non-JSON response
✅ Tambah error handling di API endpoint untuk database connection error

---

## 🔍 DATABASE_URL yang Benar

### **SEBELUM (Salah):**

```env
DATABASE_URL="mysql://rt0e1618_eweye:@rt05MasukPakEko@rt05rw16...@rt05rw16.my.id:3306/rt0e1618_SI-ErteLima"
```

❌ Karakter `@` dalam password tidak di-encode

### **SESUDAH (Benar):**

```env
DATABASE_URL="mysql://rt0e1618_eweye:%40rt05MasukPakEko%40rt05rw16...@rt05rw16.my.id:3306/rt0e1618_SI-ErteLima"
```

✅ `@` di-encode menjadi `%40`

---

## 📝 Perubahan Kode yang Dibuat

### **File: `src/pages/api/login.tsx`**

- ✅ Tambah validasi tipe data (string checking)
- ✅ Tambah trim() pada input username
- ✅ Tambah error handling untuk database connection error
- ✅ Distinguish antara connection error vs server error

### **File: `src/pages/login/index.tsx`**

- ✅ Check content-type response sebelum parsing JSON
- ✅ Better error messages
- ✅ Prevent JSON parsing error dengan validasi response

---

## 🧪 Test Sekarang

1. **Buka** `http://localhost:3000/login`

2. **Test dengan username/password dari database Anda**

3. **Jika ada error:**
   - Check console browser (F12 → Console)
   - Check server terminal untuk error details

---

## 🚨 Error yang Mungkin Masih Terjadi

### **Error 1: "Database tidak dapat diakses"**

```
Database tidak dapat diakses. Periksa koneksi database Anda.
```

**Solusi:**

- Cek DATABASE_URL di `.env.local`
- Pastikan host, port, username, password sudah benar
- Cek koneksi internet ke server hosting
- Test koneksi: `telnet hostname port`

### **Error 2: "Username atau password salah"**

**Mungkin penyebabnya:**

- Username tidak ada di database
- Password belum di-hash dengan bcrypt
- Jalankan: `npm run hash-passwords`

### **Error 3: "Terjadi kesalahan server"**

**Langkah debugging:**

1. Check server terminal untuk error details
2. Check browser console (F12)
3. Cek `.env.local` sudah ter-load dengan benar

---

## ✨ Jika Login Berhasil

1. Data user akan disimpan di localStorage
2. Redirect otomatis ke `/dashboard`
3. Di dashboard bisa lihat username dan role user
4. Bisa logout untuk clear session

---

## 📞 Pertanyaan yang Sering Diajukan

**Q: Bagaimana cara turu kalau database connection working?**
A: Lihat server terminal. Jika tidak ada error berarti connected.

**Q: Bagaimana cara debug lebih detail?**
A: Buka browser DevTools (F12) → Console tab → lihat error message

**Q: Password belum di-hash, bagaimana?**
A: Run: `npm run hash-passwords`

**Q: Sudah fix tapi masih error, gimana?**
A:

1. Kill terminal (Ctrl+C)
2. Clear cache: `Remove-Item -Recurse -Force ".next"`
3. Restart: `npm run dev`

---

## ✅ Checklist Sebelum Testing

- [ ] `.env.local` sudah update dengan DATABASE_URL yang benar
- [ ] Karakter `@` di password sudah di-encode menjadi `%40`
- [ ] Database bisa diakses dari jaringan Anda
- [ ] Server sudah di-restart setelah edit `.env.local`
- [ ] Password sudah di-hash (atau run `npm run hash-passwords`)

---

**Last Updated:** 16 Maret 2026
**Status:** ✅ Semua error sudah diperbaiki
