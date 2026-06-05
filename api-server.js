/* ==========================================================================
   FUNLISH - REST API Server (Express + MySQL)
   Jalankan: node api-server.js
   Pastikan MySQL aktif dengan database db_funlish (lihat db_funlish.sql)

   Port: 3001  (Frontend: 3000, API: 3001)
   ========================================================================== */

const http = require("http");
const url = require("url");

// --- MySQL2 Connection ---
// Instal dependensi: npm install mysql2
let mysql;
try {
  mysql = require("mysql2/promise");
} catch {
  console.error("[ERROR] Module 'mysql2' tidak ditemukan. Jalankan: npm install mysql2");
  process.exit(1);
}

const DB_CONFIG = {
  host: "127.0.0.1",
  port: 3306,
  user: "root",      // Sesuaikan username MySQL Anda
  password: "",      // Sesuaikan password MySQL Anda
  database: "db_funlish",
  waitForConnections: true,
  connectionLimit: 10,
};

const pool = mysql.createPool(DB_CONFIG);

const PORT = 3001;

// --- CORS Headers ---
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json; charset=utf-8",
};

// --- Helper: parse JSON body ---
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => (body += chunk.toString()));
    req.on("end", () => {
      try { resolve(body ? JSON.parse(body) : {}); }
      catch { reject(new Error("Invalid JSON")); }
    });
    req.on("error", reject);
  });
}

// --- Helper: send JSON ---
function send(res, status, data) {
  res.writeHead(status, CORS_HEADERS);
  res.end(JSON.stringify(data));
}

// --- Router ---
const server = http.createServer(async (req, res) => {
  const { pathname } = url.parse(req.url, true);
  const method = req.method.toUpperCase();

  // Preflight CORS
  if (method === "OPTIONS") {
    res.writeHead(204, CORS_HEADERS);
    res.end();
    return;
  }

  try {
    // ── /api/status ──────────────────────────────────────────────────────────
    if (pathname === "/api/status" && method === "GET") {
      await pool.query("SELECT 1");
      return send(res, 200, { ok: true, message: "Database terhubung." });
    }

    // ── /api/kelas ───────────────────────────────────────────────────────────
    if (pathname === "/api/kelas") {
      if (method === "GET") {
        const [rows] = await pool.query("SELECT * FROM kelas ORDER BY id_kelas");
        return send(res, 200, rows);
      }
      if (method === "POST") {
        const { nama_kelas } = await parseBody(req);
        if (!nama_kelas) return send(res, 400, { error: "nama_kelas diperlukan" });
        const [result] = await pool.query(
          "INSERT INTO kelas (nama_kelas) VALUES (?)", [nama_kelas]
        );
        return send(res, 201, { id: result.insertId, nama_kelas });
      }
    }

    // /api/kelas/:id
    const kelasMatch = pathname.match(/^\/api\/kelas\/(\d+)$/);
    if (kelasMatch) {
      const id = parseInt(kelasMatch[1]);
      if (method === "DELETE") {
        await pool.query("DELETE FROM kelas WHERE id_kelas = ?", [id]);
        return send(res, 200, { deleted: id });
      }
    }

    // ── /api/quiz ────────────────────────────────────────────────────────────
    if (pathname === "/api/quiz") {
      if (method === "GET") {
        const [rows] = await pool.query(`
          SELECT q.*, k.nama_kelas, l.nama_level
          FROM quiz q
          LEFT JOIN kelas k ON q.id_kelas = k.id_kelas
          LEFT JOIN level_quiz l ON q.id_level = l.id_level
          ORDER BY q.id_quiz DESC
        `);
        return send(res, 200, rows);
      }
      if (method === "POST") {
        const { judul_quiz, id_kelas, id_level } = await parseBody(req);
        if (!judul_quiz || !id_kelas || !id_level)
          return send(res, 400, { error: "judul_quiz, id_kelas, id_level diperlukan" });
        const [result] = await pool.query(
          "INSERT INTO quiz (judul_quiz, id_kelas, id_level) VALUES (?, ?, ?)",
          [judul_quiz, id_kelas, id_level]
        );
        return send(res, 201, { id: result.insertId });
      }
    }

    const quizMatch = pathname.match(/^\/api\/quiz\/(\d+)$/);
    if (quizMatch) {
      const id = parseInt(quizMatch[1]);
      if (method === "DELETE") {
        await pool.query("DELETE FROM quiz WHERE id_quiz = ?", [id]);
        return send(res, 200, { deleted: id });
      }
    }

    // ── /api/materi ──────────────────────────────────────────────────────────
    if (pathname === "/api/materi") {
      if (method === "GET") {
        const [rows] = await pool.query(`
          SELECT m.*, k.nama_kelas
          FROM materi m
          LEFT JOIN kelas k ON m.id_kelas = k.id_kelas
          ORDER BY m.id_materi DESC
        `);
        return send(res, 200, rows);
      }
      if (method === "POST") {
        const { id_kelas, judul, kategori, deskripsi } = await parseBody(req);
        if (!id_kelas || !judul || !kategori)
          return send(res, 400, { error: "id_kelas, judul, kategori diperlukan" });
        const [result] = await pool.query(
          "INSERT INTO materi (id_kelas, judul, kategori, deskripsi) VALUES (?, ?, ?, ?)",
          [id_kelas, judul, kategori, deskripsi || null]
        );
        return send(res, 201, { id: result.insertId });
      }
    }

    const materiMatch = pathname.match(/^\/api\/materi\/(\d+)$/);
    if (materiMatch) {
      const id = parseInt(materiMatch[1]);
      if (method === "DELETE") {
        await pool.query("DELETE FROM materi WHERE id_materi = ?", [id]);
        return send(res, 200, { deleted: id });
      }
    }

    // ── /api/admin/login ─────────────────────────────────────────────────────
    if (pathname === "/api/admin/login" && method === "POST") {
      const { username, password } = await parseBody(req);
      const [rows] = await pool.query(
        "SELECT * FROM admin WHERE username = ? AND password = ? LIMIT 1",
        [username, password]
      );
      if (rows.length) {
        return send(res, 200, { ok: true, admin: { id: rows[0].id_admin, nama: rows[0].nama_admin } });
      }
      return send(res, 401, { ok: false, error: "Username atau password salah" });
    }

    // 404 fallback
    send(res, 404, { error: "Endpoint tidak ditemukan" });

  } catch (err) {
    console.error("[API ERROR]", err.message);
    if (err.code === "ECONNREFUSED" || err.code === "ER_ACCESS_DENIED_ERROR") {
      return send(res, 503, { error: "Tidak dapat terhubung ke database. Cek konfigurasi MySQL." });
    }
    send(res, 500, { error: "Server error: " + err.message });
  }
});

server.listen(PORT, () => {
  console.log("======================================================");
  console.log(`FUNLISH API Server berjalan pada port ${PORT}!`);
  console.log(`Endpoint: http://localhost:${PORT}/api/`);
  console.log("Pastikan MySQL aktif & db_funlish sudah diimport.");
  console.log("Tekan Ctrl + C untuk menghentikan server.");
  console.log("======================================================");
});
