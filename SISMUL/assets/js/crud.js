// 1. Session Login Security Guard (Redirect immediately if not logged in)
if (sessionStorage.getItem("funlish_admin_logged_in") !== "true") {
  window.location.href = "login.html";
}

window.currentCrudGrade = 3;

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
      loadComponent("admin-crud-content", "components/crud-portal.html"),
      loadComponent("footer-container", "components/footer.html")
    ]);

    // 2. Adjust Navbar visual style for Admin Mode
    const logo = document.getElementById("app-logo");
    if (logo) {
      logo.innerHTML = `<i class="fa-solid fa-microchip logo-icon"></i> <span>FUNLISH<span class="highlight">STUDIO</span></span>`;
    }
    
    // Hide student nav, show admin nav, and mark CRUD tab active
    const studentNav = document.getElementById("student-nav");
    if (studentNav) studentNav.style.display = "none";
    
    const adminNav = document.getElementById("admin-nav");
    if (adminNav) {
      adminNav.style.display = "flex";
      const crudTab = document.getElementById("nav-admin-crud");
      if (crudTab) crudTab.classList.add("active");
      const labTab = document.getElementById("nav-admin-lab");
      if (labTab) labTab.classList.remove("active");
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
    
    // Hide language switcher in admin mode as it is only for students landing page
    const langSwitcher = document.querySelector(".language-switcher");
    if (langSwitcher) langSwitcher.style.display = "none";

    initNavbarToggle();

    // 3. Initialize CRUD question list
    renderCrudQuestions();
  } catch (error) {
    console.error("Gagal menginisialisasi Dashboard CRUD:", error);
  }
});

// Helper component loader
async function loadComponent(elementId, filePath) {
  const response = await fetch(filePath);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const html = await response.text();
  document.getElementById(elementId).innerHTML = html;
}

// ==========================================================================
// CRUD Question Management Logics
// ==========================================================================

// Helper to retrieve data from localStorage
function getChallengeData() {
  const stored = localStorage.getItem("funlish_challenge_data");
  return stored ? JSON.parse(stored) : window.challengeData;
}

// Helper to save data back to localStorage
function saveChallengeData(data) {
  localStorage.setItem("funlish_challenge_data", JSON.stringify(data));
  // Keep the active in-memory object synced
  window.challengeData = data;
}

// Switch active grade in CRUD view
window.selectCrudGrade = function(grade) {
  window.currentCrudGrade = grade;
  
  // Update vertical tabs classes
  for (let g = 3; g <= 6; g++) {
    const btn = document.getElementById(`btn-crud-g${g}`);
    if (btn) {
      if (g === grade) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    }
  }

  // Update header title
  const titleEl = document.getElementById("crud-grade-header-title");
  if (titleEl) {
    titleEl.textContent = `Daftar Soal - Kelas ${grade} SD`;
  }

  renderCrudQuestions();
};

// Render questions list into table
window.renderCrudQuestions = function() {
  const tableBody = document.getElementById("crud-questions-table-body");
  if (!tableBody) return;
  
  tableBody.innerHTML = "";
  const data = getChallengeData();
  const grade = window.currentCrudGrade;
  
  if (!data || !data[grade] || !data[grade].level3 || !data[grade].level3.questions) {
    tableBody.innerHTML = `<tr><td colspan="5" class="tbl-empty">Tidak ada data soal untuk kelas ini.</td></tr>`;
    return;
  }
  
  const questions = data[grade].level3.questions;
  
  if (questions.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5" class="tbl-empty">Belum ada soal. Klik 'Tambah Soal Baru' untuk mengisi.</td></tr>`;
    return;
  }

  questions.forEach((q, index) => {
    const row = document.createElement("tr");
    
    // Formatting options string
    const optionsText = q.options.map((opt, i) => `${String.fromCharCode(65 + i)}. ${opt}`).join("<br/>");
    
    row.innerHTML = `
      <td style="font-weight:800;color:#1cb0f6;font-family:'Fredoka',sans-serif;">${index + 1}</td>
      <td style="max-width:300px;word-break:break-word;">${q.question}</td>
      <td style="font-size:0.88rem;line-height:1.6;">${optionsText}</td>
      <td class="answer-key">${q.answer}</td>
      <td style="text-align:center;">
        <div style="display:flex;gap:8px;justify-content:center;">
          <button class="crud-btn edit" onclick="openEditQuestionModal(${index})"><i class="fa-solid fa-edit"></i> Edit</button>
          <button class="crud-btn del" onclick="deleteQuestion(${index})"><i class="fa-solid fa-trash"></i> Hapus</button>
        </div>
      </td>
    `;
    tableBody.appendChild(row);
  });
};

// Open Modal to create new question
window.openCreateQuestionModal = function() {
  document.getElementById("crud-modal-title").textContent = `Tambah Soal Kuis - Kelas ${window.currentCrudGrade} SD`;
  document.getElementById("edit-question-index").value = ""; // Empty implies new entry
  document.getElementById("crud-question-form").reset();
  
  const modal = document.getElementById("crud-modal-overlay");
  if (modal) modal.classList.remove("hide");
};

// Open Modal to edit existing question
window.openEditQuestionModal = function(index) {
  const data = getChallengeData();
  const grade = window.currentCrudGrade;
  const q = data[grade].level3.questions[index];
  
  if (!q) return;

  document.getElementById("crud-modal-title").textContent = `Edit Soal Kuis - Kelas ${grade} SD`;
  document.getElementById("edit-question-index").value = index;
  
  document.getElementById("form-question").value = q.question;
  document.getElementById("form-opt-0").value = q.options[0] || "";
  document.getElementById("form-opt-1").value = q.options[1] || "";
  document.getElementById("form-opt-2").value = q.options[2] || "";
  document.getElementById("form-opt-3").value = q.options[3] || "";
  
  // Find which option matches correct answer
  const ansIndex = q.options.indexOf(q.answer);
  document.getElementById("form-answer").value = ansIndex >= 0 ? ansIndex : "";

  const modal = document.getElementById("crud-modal-overlay");
  if (modal) modal.classList.remove("hide");
};

// Close question Modal
window.closeCrudQuestionModal = function() {
  const modal = document.getElementById("crud-modal-overlay");
  if (modal) modal.classList.add("hide");
};

// Save form submit (Create or Update)
window.saveQuestionForm = function(event) {
  event.preventDefault();
  
  const indexStr = document.getElementById("edit-question-index").value;
  const question = document.getElementById("form-question").value.trim();
  const opt0 = document.getElementById("form-opt-0").value.trim();
  const opt1 = document.getElementById("form-opt-1").value.trim();
  const opt2 = document.getElementById("form-opt-2").value.trim();
  const opt3 = document.getElementById("form-opt-3").value.trim();
  const ansIndex = parseInt(document.getElementById("form-answer").value);

  const options = [opt0, opt1, opt2, opt3];
  const answer = options[ansIndex];

  const data = getChallengeData();
  const grade = window.currentCrudGrade;
  const questions = data[grade].level3.questions;

  const newQuestionObj = { question, options, answer };

  if (indexStr === "") {
    // Create new
    questions.push(newQuestionObj);
  } else {
    // Update existing
    const index = parseInt(indexStr);
    questions[index] = newQuestionObj;
  }

  saveChallengeData(data);
  renderCrudQuestions();
  closeCrudQuestionModal();
};

// Delete a question
window.deleteQuestion = function(index) {
  if (!confirm("Apakah Anda yakin ingin menghapus soal ini?")) return;

  const data = getChallengeData();
  const grade = window.currentCrudGrade;
  const questions = data[grade].level3.questions;

  questions.splice(index, 1);
  
  saveChallengeData(data);
  renderCrudQuestions();
};

// Reset questions database to default pabrik
window.resetDefaultQuestions = function() {
  if (!confirm("Apakah Anda yakin ingin mengembalikan semua soal kuis ke setelan awal pabrik? Seluruh penyesuaian Anda akan terhapus.")) return;
  
  localStorage.removeItem("funlish_challenge_data");
  alert("Bank data soal kuis berhasil direset!");
  location.reload();
};

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
