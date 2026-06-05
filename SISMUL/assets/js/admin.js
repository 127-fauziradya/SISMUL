// 1. Session Login Security Guard (Redirect immediately if not logged in)
if (sessionStorage.getItem("funlish_admin_logged_in") !== "true") {
  window.location.href = "login.html";
}


// Admin Logout Action
window.adminLogout = function() {
  if (confirm("Apakah Anda yakin ingin keluar dari Dashboard Admin?")) {
    sessionStorage.removeItem("funlish_admin_logged_in");
    window.location.href = "login.html";
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // 1. Load components dynamically
    await Promise.all([
      loadComponent("navbar-container", "components/navbar.html"),
      loadComponent("admin-dashboard-content", "components/teacher-portal.html"),
      loadComponent("footer-container", "components/footer.html")
    ]);

    // 2. Adjust Navbar visual style for Admin Mode
    const logo = document.getElementById("app-logo");
    if (logo) {
      logo.innerHTML = `<i class="fa-solid fa-microchip logo-icon"></i> <span>FUNLISH<span class="highlight">STUDIO</span></span>`;
    }
    
    // Replace Admin button with Logout button — playful student style
    const portalSwitcher = document.querySelector(".portal-switcher");
    if (portalSwitcher) {
      portalSwitcher.innerHTML = `
        <button class="btn-switch student" onclick="adminLogout()" style="background-color:#ff6b6b;color:white;border:none;box-shadow:0 4px 0 #e65252;display:inline-flex;align-items:center;gap:6px;cursor:pointer;font-size:0.9rem;padding:10px 20px;border-radius:99px;font-family:'Fredoka',sans-serif;font-weight:700;transition:all 0.2s ease;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 0 #e65252'" onmouseout="this.style.transform='';this.style.boxShadow='0 4px 0 #e65252'">
          <i class="fa-solid fa-right-from-bracket"></i> Keluar
        </button>
      `;
    }
    
    // Hide language switcher and student nav in admin mode as it is only for students landing page
    const langSwitcher = document.querySelector(".language-switcher");
    if (langSwitcher) langSwitcher.style.display = "none";
    
    const studentNav = document.getElementById("student-nav");
    if (studentNav) studentNav.style.display = "none";

    const adminNav = document.getElementById("admin-nav");
    if (adminNav) {
      adminNav.style.display = "flex";
      const crudTab = document.getElementById("nav-admin-crud");
      if (crudTab) crudTab.classList.remove("active");
      const labTab = document.getElementById("nav-admin-lab");
      if (labTab) labTab.classList.add("active");
    }

    initNavbarToggle();

    // 3. Initialize Teacher / DSP Lab modules
    initAdminTabs();
    initTextModule();
    initImageModule();
    initAudioModule();
    initVideoModule();
  } catch (error) {
    console.error("Gagal menginisialisasi Dashboard Admin:", error);
  }
});

// Helper component loader
async function loadComponent(elementId, filePath) {
  const response = await fetch(filePath);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const html = await response.text();
  document.getElementById(elementId).innerHTML = html;
}

// Initialize Tabs inside Admin Portal
function initAdminTabs() {
  const tabsDark = document.querySelectorAll(".nav-tab-dark");
  tabsDark.forEach(tab => {
    tab.addEventListener("click", () => {
      const tabId = tab.dataset.tab;
      switchAdminTab(tabId);
    });
  });

  // Text Module Sub-tabs
  const textSubTabs = document.querySelectorAll("#tab-teks .sub-tab");
  textSubTabs.forEach(sub => {
    sub.addEventListener("click", () => {
      textSubTabs.forEach(s => s.classList.remove("active"));
      sub.classList.add("active");
      
      const targetPanel = sub.dataset.sub;
      document.querySelectorAll("#tab-teks .sub-panel").forEach(p => p.classList.remove("active"));
      document.getElementById(`sub-panel-${targetPanel}`).classList.add("active");
    });
  });

  // Image Module Sub-tabs (Vertical)
  const imgSubTabs = document.querySelectorAll(".v-sub-tab");
  imgSubTabs.forEach(sub => {
    sub.addEventListener("click", () => {
      imgSubTabs.forEach(s => s.classList.remove("active"));
      sub.classList.add("active");
      
      const targetPanel = sub.dataset.imgSub;
      document.querySelectorAll(".img-sub-panel").forEach(p => p.classList.remove("active"));
      document.getElementById(`img-panel-${targetPanel}`).classList.add("active");
    });
  });

  // Image Stego mini tabs
  const stegoMiniTabs = document.querySelectorAll(".mini-tab");
  stegoMiniTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      stegoMiniTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      
      const targetPanel = tab.dataset.mini;
      document.querySelectorAll(".mini-panel").forEach(p => p.classList.remove("active"));
      document.getElementById(`mini-panel-${targetPanel}`).classList.add("active");
    });
  });
}

// Switch tabs
function switchAdminTab(tabId) {
  const tabs = document.querySelectorAll(".nav-tab-dark");
  tabs.forEach(tab => {
    if (tab.dataset.tab === tabId) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });

  const panels = document.querySelectorAll(".tab-panel");
  panels.forEach(panel => {
    if (panel.id === `tab-${tabId}`) {
      panel.classList.add("active");
    } else {
      panel.classList.remove("active");
    }
  });

  // Stop video/audio processes if navigating away
  if (tabId !== "audio" && typeof stopAudio === "function") stopAudio();
  if (tabId !== "video" && typeof stopVideo === "function") stopVideo();
}

// Mobile Navbar Hamburger Toggle Logic
function initNavbarToggle() {
  const toggleBtn = document.getElementById("nav-toggle");
  const menuWrapper = document.getElementById("nav-menu-wrapper");
  if (toggleBtn && menuWrapper) {
    toggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleBtn.classList.toggle("open");
      menuWrapper.classList.toggle("open");
    });

    // Close menu when clicking outside the menu
    document.addEventListener("click", (e) => {
      if (!menuWrapper.contains(e.target) && !toggleBtn.contains(e.target)) {
        toggleBtn.classList.remove("open");
        menuWrapper.classList.remove("open");
      }
    });
  }
}

/* ==========================================================================
   DATABASE API CONNECTION MODULE
   Connects to the Express/MySQL backend API (api-server.js on port 3001)
   ========================================================================== */

const API_BASE = "http://localhost:3001/api";

// --- DB Status Indicator ---
async function checkDbStatus() {
  const indicator = document.getElementById("db-status-dot");
  const label = document.getElementById("db-status-label");
  if (!indicator || !label) return;

  try {
    const res = await fetch(`${API_BASE}/status`, { signal: AbortSignal.timeout(3000) });
    const data = await res.json();
    if (data.ok) {
      indicator.className = "db-dot online";
      label.textContent = "Database Terhubung";
    } else {
      throw new Error("Not OK");
    }
  } catch {
    indicator.className = "db-dot offline";
    label.textContent = "Database Offline";
  }
}

// --- Kelas ---
window.loadKelasData = async function() {
  const tbody = document.getElementById("tbl-kelas-body");
  if (!tbody) return;
  tbody.innerHTML = `<tr><td colspan="3" class="tbl-loading"><i class="fa-solid fa-spinner fa-spin"></i> Memuat...</td></tr>`;
  try {
    const res = await fetch(`${API_BASE}/kelas`);
    const data = await res.json();
    if (!data.length) {
      tbody.innerHTML = `<tr><td colspan="3" class="tbl-empty">Belum ada data kelas.</td></tr>`;
      return;
    }
    tbody.innerHTML = data.map(k => `
      <tr>
        <td>${k.id_kelas}</td>
        <td>${k.nama_kelas}</td>
        <td>
          <button class="db-btn-sm danger" onclick="deleteKelas(${k.id_kelas})"><i class="fa-solid fa-trash"></i> Hapus</button>
        </td>
      </tr>
    `).join("");
  } catch {
    tbody.innerHTML = `<tr><td colspan="3" class="tbl-error"><i class="fa-solid fa-triangle-exclamation"></i> Gagal memuat. Pastikan api-server.js berjalan.</td></tr>`;
  }
};

window.addKelas = async function() {
  const input = document.getElementById("input-nama-kelas");
  if (!input || !input.value.trim()) return showDbToast("Nama kelas tidak boleh kosong!", "error");
  try {
    const res = await fetch(`${API_BASE}/kelas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama_kelas: input.value.trim() })
    });
    const data = await res.json();
    if (data.id) {
      input.value = "";
      showDbToast("Kelas berhasil ditambahkan!", "success");
      loadKelasData();
    }
  } catch {
    showDbToast("Gagal menambahkan kelas. Cek koneksi.", "error");
  }
};

window.deleteKelas = async function(id) {
  if (!confirm("Hapus kelas ini?")) return;
  try {
    await fetch(`${API_BASE}/kelas/${id}`, { method: "DELETE" });
    showDbToast("Kelas dihapus.", "success");
    loadKelasData();
  } catch {
    showDbToast("Gagal menghapus.", "error");
  }
};

// --- Quiz ---
window.loadQuizData = async function() {
  const tbody = document.getElementById("tbl-quiz-body");
  if (!tbody) return;
  tbody.innerHTML = `<tr><td colspan="5" class="tbl-loading"><i class="fa-solid fa-spinner fa-spin"></i> Memuat...</td></tr>`;
  try {
    const res = await fetch(`${API_BASE}/quiz`);
    const data = await res.json();
    if (!data.length) {
      tbody.innerHTML = `<tr><td colspan="5" class="tbl-empty">Belum ada data quiz.</td></tr>`;
      return;
    }
    tbody.innerHTML = data.map(q => `
      <tr>
        <td>${q.id_quiz}</td>
        <td>${q.judul_quiz}</td>
        <td>${q.nama_kelas || "-"}</td>
        <td>${q.nama_level || "-"}</td>
        <td>
          <button class="db-btn-sm danger" onclick="deleteQuiz(${q.id_quiz})"><i class="fa-solid fa-trash"></i> Hapus</button>
        </td>
      </tr>
    `).join("");
  } catch {
    tbody.innerHTML = `<tr><td colspan="5" class="tbl-error"><i class="fa-solid fa-triangle-exclamation"></i> Gagal memuat. Pastikan api-server.js berjalan.</td></tr>`;
  }
};

window.deleteQuiz = async function(id) {
  if (!confirm("Hapus quiz ini?")) return;
  try {
    await fetch(`${API_BASE}/quiz/${id}`, { method: "DELETE" });
    showDbToast("Quiz dihapus.", "success");
    loadQuizData();
  } catch {
    showDbToast("Gagal menghapus.", "error");
  }
};

// --- Materi ---
window.loadMateriData = async function() {
  const tbody = document.getElementById("tbl-materi-body");
  if (!tbody) return;
  tbody.innerHTML = `<tr><td colspan="5" class="tbl-loading"><i class="fa-solid fa-spinner fa-spin"></i> Memuat...</td></tr>`;
  try {
    const res = await fetch(`${API_BASE}/materi`);
    const data = await res.json();
    if (!data.length) {
      tbody.innerHTML = `<tr><td colspan="5" class="tbl-empty">Belum ada data materi.</td></tr>`;
      return;
    }
    tbody.innerHTML = data.map(m => `
      <tr>
        <td>${m.id_materi}</td>
        <td>${m.judul}</td>
        <td>${m.nama_kelas || "-"}</td>
        <td><span class="db-badge">${m.kategori}</span></td>
        <td>
          <button class="db-btn-sm danger" onclick="deleteMateri(${m.id_materi})"><i class="fa-solid fa-trash"></i> Hapus</button>
        </td>
      </tr>
    `).join("");
  } catch {
    tbody.innerHTML = `<tr><td colspan="5" class="tbl-error"><i class="fa-solid fa-triangle-exclamation"></i> Gagal memuat. Pastikan api-server.js berjalan.</td></tr>`;
  }
};

window.deleteMateri = async function(id) {
  if (!confirm("Hapus materi ini?")) return;
  try {
    await fetch(`${API_BASE}/materi/${id}`, { method: "DELETE" });
    showDbToast("Materi dihapus.", "success");
    loadMateriData();
  } catch {
    showDbToast("Gagal menghapus.", "error");
  }
};

// --- Toast Notification ---
function showDbToast(message, type = "success") {
  let container = document.getElementById("db-toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "db-toast-container";
    document.body.appendChild(container);
  }
  const toast = document.createElement("div");
  toast.className = `db-toast ${type}`;
  toast.innerHTML = `<i class="fa-solid fa-${type === "success" ? "check-circle" : "circle-exclamation"}"></i> ${message}`;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("show"));
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// --- Auto-init DB tab on load ---
document.addEventListener("DOMContentLoaded", () => {
  // Check DB status when the DB tab becomes visible
  const dbTabBtn = document.querySelector('[data-tab="database"]');
  if (dbTabBtn) {
    dbTabBtn.addEventListener("click", () => {
      checkDbStatus();
      loadKelasData();
      loadQuizData();
      loadMateriData();
    });
  }
  // Initial status check
  setTimeout(checkDbStatus, 1500);
});
