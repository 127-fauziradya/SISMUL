# Fitur Dalam Rencana

Folder ini berisi fitur-fitur yang sedang dalam tahap pengembangan atau direncanakan untuk implementasi di masa depan.

## Daftar Fitur

### 1. Kelola Admin (kelola-admin.html)
**Status**: Belum diimplementasikan

**Deskripsi**:
Halaman untuk mengelola data administrator sistem FUNLISH Studio.

**Fitur yang sudah dibuat**:
- ✅ Form tambah/edit admin
- ✅ Daftar admin dengan detail lengkap
- ✅ Proteksi admin utama (username: admin, password: admin123)
- ✅ Validasi input (username min 3, password min 6)
- ✅ CRUD lengkap (Create, Read, Update, Delete)
- ✅ Integrasi dengan sistem login
- ✅ Data storage di localStorage

**Fungsi JavaScript terkait** (di admin.js):
- `initializeAdmins()`
- `getAdmins()`
- `saveAdmins()`
- `renderAdminList()`
- `saveAdmin()`
- `editAdmin()`
- `deleteAdmin()`
- `resetAdminForm()`
- `loadKelolaAdminTab()`

**Catatan**:
Fitur ini sudah lengkap dan siap digunakan. Untuk mengaktifkan:
1. Tambahkan link di navbar ke `kelola-admin.html`
2. Fitur sudah terintegrasi dengan sistem login yang ada

**Alasan ditunda**:
Mempertimbangkan kebutuhan manajemen multi-admin dalam scope aplikasi saat ini.

---

## Cara Menggunakan File di Folder Ini

File-file dalam folder ini dapat diaktifkan kapan saja dengan:
1. Memindahkan file HTML ke folder `admin/`
2. Menambahkan link di navbar
3. Memastikan fungsi JavaScript sudah ada di `admin.js`

## Update Terakhir
12 Juni 2026
