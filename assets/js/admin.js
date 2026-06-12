// 1. Session Login Security Guard (Redirect immediately if not logged in)
if (sessionStorage.getItem("funlish_admin_logged_in") !== "true") {
  window.location.href = "../login.html?redirect=admin/dashboard.html";
}


// Admin Logout Action
window.adminLogout = function() {
  if (confirm("Apakah Anda yakin ingin keluar dari Dashboard Admin?")) {
    sessionStorage.removeItem("funlish_admin_logged_in");
    window.location.href = "../login.html";
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  // Skip if already initialized from dashboard.html
  if (window.ADMIN_DASHBOARD_ALREADY_INITIALIZED) {
    console.log('⏭️ Skipping duplicate admin initialization');
    return;
  }
  
  try {
    // Detect if we're in admin subfolder or root
    const isInAdminFolder = window.location.pathname.includes('/admin/');
    const pathPrefix = isInAdminFolder ? '../' : '';
    
    // 1. Load components dynamically
    await Promise.all([
      loadComponent("navbar-container", `${pathPrefix}components/navbar.html`),
      loadComponent("admin-dashboard-content", `${pathPrefix}components/teacher-portal.html`),
      loadComponent("footer-container", `${pathPrefix}components/footer.html`),
      loadComponent("audio-auth-overlay", `${pathPrefix}components/audio-auth-modal.html`)
    ]);

    // IMMEDIATELY hide student nav and show admin nav (before other operations)
    const studentNav = document.getElementById("student-nav");
    if (studentNav) studentNav.style.display = "none";
    
    const adminNav = document.getElementById("admin-nav");
    if (adminNav) {
      adminNav.style.display = "flex";
    }

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
    
    // Hide language switcher in admin mode
    const langSwitcher = document.querySelector(".language-switcher");
    if (langSwitcher) langSwitcher.style.display = "none";

    // Set Dashboard as active by default
    const dashboardTab = document.getElementById("nav-admin-dashboard");
    if (dashboardTab) dashboardTab.classList.add("active");

    initNavbarToggle();

    // 3. Initialize Teacher / DSP Lab modules
    // initAdminTabs(); // Temporarily disabled for debugging
    
    /* Temporarily disabled for debugging
    // Initialize vocabulary and conversation modules (new structure)
    // Load default grade data
    setTimeout(() => {
      if (typeof loadVocabGrade === 'function') {
        loadVocabGrade(3); // Load grade 3 by default
      }
      if (typeof loadConvGrade === 'function') {
        loadConvGrade(3); // Load grade 3 by default
      }
    }, 300);
    
    // Old DSP modules initialization (only if tabs exist)
    if (document.getElementById('tab-teks') && typeof initTextModule === 'function') {
      initTextModule();
    }
    if (document.getElementById('tab-gambar') && typeof initImageModule === 'function') {
      initImageModule();
    }
    if (document.getElementById('tab-audio') && typeof initAudioModule === 'function') {
      initAudioModule();
    }
    if (document.getElementById('tab-video') && typeof initVideoModule === 'function') {
      initVideoModule();
    }
    
    if (typeof initDatabaseModule === 'function') {
      initDatabaseModule();
    }
    */
    
    console.log("✅ Dashboard Admin berhasil dimuat!");
  } catch (error) {
    console.error("❌ Gagal menginisialisasi Dashboard Admin:", error);
    // Don't show alert, just log to console
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
  // Navigation is now in top navbar - no need to initialize .nav-tab-dark
  // The navbar links call switchAdminTab() directly via onclick
  
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

// Switch tabs (make it globally accessible for navbar)
window.switchAdminTab = function(tabId) {
  console.log(`🔄 Switching to tab: ${tabId}`);
  
  // Update top navbar active state
  const navTabs = document.querySelectorAll("#admin-nav .nav-tab");
  navTabs.forEach(tab => {
    // Remove active class from all
    tab.classList.remove("active");
    
    // Add active class to matching tab
    if (tab.id === `nav-admin-${tabId}`) {
      tab.classList.add("active");
    }
  });
  
  // Update internal navigation tabs (the green ones inside teacher-portal)
  const tabs = document.querySelectorAll(".nav-tab-dark");
  tabs.forEach(tab => {
    if (tab.dataset.tab === tabId) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });

  const panels = document.querySelectorAll(".tab-panel");
  console.log(`📄 Found ${panels.length} tab panels`);
  
  panels.forEach(panel => {
    if (panel.id === `tab-${tabId}`) {
      panel.classList.add("active");
      console.log(`✅ Activated panel: tab-${tabId}`);
    } else {
      panel.classList.remove("active");
    }
  });

  // Stop ALL audio/video processes first
  if (typeof stopAudio === "function") {
    try {
      stopAudio();
    } catch(e) {
      console.log('Audio already stopped');
    }
  }
  if (typeof stopVideo === "function") {
    try {
      stopVideo();
    } catch(e) {
      console.log('Video already stopped');
    }
  }

  // Initialize tab-specific data
  if (tabId === "vocabulary") {
    loadVocabGrade(currentVocabGrade);
    setTimeout(() => {
      if (typeof initVocabImageHandlers === 'function') {
        initVocabImageHandlers();
      }
    }, 100);
  } else if (tabId === "conversation") {
    loadConvGrade(currentConvGrade);
    setTimeout(() => {
      if (typeof initConvAudioHandlers === 'function') {
        initConvAudioHandlers();
      }
    }, 100);
  } else if (tabId === "laporan") {
    console.log(`📊 Loading laporan tab...`);
  }
}

// Dashboard cards use this public lab-specific name.
window.switchLabTab = switchAdminTab;

// Switch to specific grade from dashboard cards
window.switchToGrade = function(grade) {
  console.log(`🔄 Switching to grade ${grade} vocabulary`);
  
  // Update current grade
  currentVocabGrade = grade;
  currentConvGrade = grade;
  
  // Switch to vocabulary tab
  switchAdminTab('vocabulary');
  
  // Load vocabulary for that grade
  setTimeout(() => {
    loadVocabGrade(grade);
  }, 100);
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

// Download Guidebook as PDF
window.downloadPDF = function() {
  window.print();
  // Note: Browser's built-in print to PDF functionality
  console.log('Print dialog opened');
};

/* ==========================================================================
   DATABASE API CONNECTION MODULE
   Connects to the Express/MySQL backend API (api-server.js on port 3001)
   ========================================================================== */

const API_BASE = "http://localhost:3001/api";

/* ==========================================================================
   VOCABULARY & CONVERSATION MANAGEMENT MODULE
   Manages content for Level 1 (Vocabulary) and Level 2 (Conversation)
   ========================================================================== */

let currentVocabGrade = 3;
let currentConvGrade = 3;

// Helper to get challengeData from localStorage
function getChallengeDataAdmin() {
  const stored = localStorage.getItem("funlish_challenge_data");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error("Gagal memuat data challenge dari localStorage", e);
    }
  }
  return null;
}

// Helper to save challengeData to localStorage
function saveChallengeDataAdmin(data) {
  try {
    localStorage.setItem("funlish_challenge_data", JSON.stringify(data));
    return true;
  } catch (e) {
    console.error("Gagal menyimpan data challenge ke localStorage", e);
    return false;
  }
}

// ══════════════════════════════════════════════════════════════════════════
// VOCABULARY MANAGEMENT FUNCTIONS
// ══════════════════════════════════════════════════════════════════════════

window.loadVocabGrade = function(grade) {
  console.log(`📚 Loading vocabulary for grade ${grade}...`);
  currentVocabGrade = grade;
  
  // Update active tab button
  document.querySelectorAll('[data-vocab-grade]').forEach(btn => {
    if (btn.dataset.vocabGrade === String(grade)) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // Update badge
  const badge = document.getElementById('vocab-grade-badge');
  if (badge) badge.textContent = `Kelas ${grade}`;
  
  // Reset form
  resetVocabForm();
  
  // Render list
  renderVocabList();
  console.log(`✅ Vocabulary for grade ${grade} loaded successfully`);
};

function renderVocabList() {
  console.log('🎨 Rendering vocabulary list...');
  const container = document.getElementById('vocab-list-container');
  if (!container) {
    console.error('❌ vocab-list-container element not found!');
    return;
  }
  
  const data = getChallengeDataAdmin();
  if (!data || !data[currentVocabGrade]) {
    console.error(`❌ No data found for grade ${currentVocabGrade}`);
    container.innerHTML = '<div class="info-box error">Data tidak ditemukan!</div>';
    return;
  }
  
  const items = data[currentVocabGrade].level1.items;
  const countBadge = document.getElementById('vocab-count-badge');
  if (countBadge) countBadge.textContent = `${items.length} Items`;
  
  console.log(`📊 Found ${items.length} vocabulary items`);
  
  if (items.length === 0) {
    container.innerHTML = '<div class="info-box warning">Belum ada kosakata. Tambahkan kosakata baru di form sebelah kiri.</div>';
    return;
  }
  
  let html = '<div class="vocab-grid">';
  items.forEach((item, index) => {
    // Check if item has imageData (image mode) or just emoji
    const iconHtml = item.imageData 
      ? `<img src="${item.imageData}" alt="${item.eng}" class="vocab-image" />` 
      : `<div class="vocab-icon">${item.emoji}</div>`;
    
    html += `
      <div class="vocab-card">
        ${iconHtml}
        <div class="vocab-eng">${item.eng}</div>
        <div class="vocab-ind">${item.ind}</div>
        <div style="display: flex; gap: 4px; margin-top: 8px; justify-content: center; flex-wrap: wrap;">
          <button class="btn btn-secondary btn-sm" onclick="editVocabItem(${index})" title="Edit">
            <i class="fa-solid fa-edit"></i>
          </button>
          <button class="btn btn-danger btn-sm" onclick="deleteVocabItem(${index})" title="Hapus">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    `;
  });
  html += '</div>';
  
  container.innerHTML = html;
  console.log('✅ Vocabulary list rendered successfully');
}

window.editVocabItem = function(index) {
  const data = getChallengeDataAdmin();
  if (!data || !data[currentVocabGrade]) return;
  
  const item = data[currentVocabGrade].level1.items[index];
  if (!item) return;
  
  document.getElementById('vocab-eng').value = item.eng;
  document.getElementById('vocab-ind').value = item.ind;
  document.getElementById('vocab-edit-index').value = index;
  
  // Check if item has imageData (image mode) or emoji
  if (item.imageData) {
    // Switch to image mode
    document.getElementById('vocab-type').value = 'image';
    toggleVocabType();
    
    // Load the image to canvas
    const img = new Image();
    img.onload = () => {
      vocabOriginalImage = img;
      setupVocabCanvas();
    };
    img.src = item.imageData;
  } else {
    // Switch to emoji mode
    document.getElementById('vocab-type').value = 'emoji';
    toggleVocabType();
    // Select the radio button with matching emoji
    const radioButton = document.querySelector(`input[name="vocab-emoji"][value="${item.emoji}"]`);
    if (radioButton) {
      radioButton.checked = true;
    }
  }
  
  // Scroll to form
  document.getElementById('vocab-eng').scrollIntoView({ behavior: 'smooth', block: 'center' });
};

window.deleteVocabItem = function(index) {
  if (!confirm('Hapus kosakata ini?')) return;
  
  const data = getChallengeDataAdmin();
  if (!data || !data[currentVocabGrade]) return;
  
  data[currentVocabGrade].level1.items.splice(index, 1);
  
  if (saveChallengeDataAdmin(data)) {
    showDbToast('Kosakata berhasil dihapus!', 'success');
    renderVocabList();
  } else {
    showDbToast('Gagal menghapus kosakata!', 'error');
  }
};

window.saveVocabItem = function() {
  const eng = document.getElementById('vocab-eng').value.trim();
  const ind = document.getElementById('vocab-ind').value.trim();
  const type = document.getElementById('vocab-type').value;
  const editIndex = parseInt(document.getElementById('vocab-edit-index').value);
  
  if (!eng || !ind) {
    showDbToast('Mohon lengkapi kata Bahasa Inggris dan Terjemahan!', 'warning');
    return;
  }
  
  const data = getChallengeDataAdmin();
  if (!data || !data[currentVocabGrade]) return;
  
  let item = { eng, ind };
  
  if (type === 'emoji') {
    const selectedEmoji = document.querySelector('input[name="vocab-emoji"]:checked');
    if (!selectedEmoji) {
      showDbToast('Mohon pilih emoji untuk mode Emoji!', 'warning');
      return;
    }
    item.emoji = selectedEmoji.value;
    item.imageData = null; // Clear image data if switching back to emoji
  } else {
    // Image mode - save the processed canvas image as base64
    const canvasDisplay = document.getElementById('vocab-canvas-display');
    if (!canvasDisplay || !vocabCurrentImageState) {
      showDbToast('Mohon upload gambar terlebih dahulu!', 'warning');
      return;
    }
    
    // Convert canvas to base64 data URL
    const imageDataUrl = canvasDisplay.toDataURL('image/png');
    item.imageData = imageDataUrl;
    item.emoji = '🖼️'; // Default icon for image type
  }
  
  if (editIndex >= 0) {
    // Edit existing
    data[currentVocabGrade].level1.items[editIndex] = item;
  } else {
    // Add new
    data[currentVocabGrade].level1.items.push(item);
  }
  
  if (saveChallengeDataAdmin(data)) {
    showDbToast(editIndex >= 0 ? 'Kosakata berhasil diupdate!' : 'Kosakata berhasil ditambahkan!', 'success');
    resetVocabForm();
    renderVocabList();
  } else {
    showDbToast('Gagal menyimpan kosakata!', 'error');
  }
};

window.resetVocabForm = function() {
  document.getElementById('vocab-eng').value = '';
  document.getElementById('vocab-ind').value = '';
  document.getElementById('vocab-edit-index').value = '-1';
  
  // Uncheck all emoji radio buttons
  document.querySelectorAll('input[name="vocab-emoji"]').forEach(radio => {
    radio.checked = false;
  });
  
  // Reset image canvas
  vocabOriginalImage = null;
  vocabCurrentImageState = null;
  
  const canvasDisplay = document.getElementById('vocab-canvas-display');
  const canvasSource = document.getElementById('vocab-canvas-source');
  if (canvasDisplay) {
    const ctx = canvasDisplay.getContext('2d');
    ctx.clearRect(0, 0, canvasDisplay.width, canvasDisplay.height);
  }
  if (canvasSource) {
    const ctx = canvasSource.getContext('2d');
    ctx.clearRect(0, 0, canvasSource.width, canvasSource.height);
  }
  
  const emptyCanvas = document.getElementById('vocab-empty-canvas');
  if (emptyCanvas) emptyCanvas.classList.remove('hide');
  
  // Reset brightness/contrast sliders
  const brightnessSlider = document.getElementById('vocab-brightness');
  const contrastSlider = document.getElementById('vocab-contrast');
  if (brightnessSlider) {
    brightnessSlider.value = 0;
    document.getElementById('val-vocab-brightness').textContent = '0';
  }
  if (contrastSlider) {
    contrastSlider.value = 0;
    document.getElementById('val-vocab-contrast').textContent = '0';
  }
  
  // Reset to emoji mode
  document.getElementById('vocab-type').value = 'emoji';
  toggleVocabType();
  
  const statusMsg = document.getElementById('vocab-status-msg');
  if (statusMsg) statusMsg.innerHTML = '<i class="fa-solid fa-info-circle"></i> Siap';
};

window.testVocabSpeech = function() {
  const eng = document.getElementById('vocab-eng').value.trim();
  if (!eng) {
    showDbToast('Masukkan kata bahasa Inggris terlebih dahulu!', 'warning');
    return;
  }
  speakEnglish(eng);
};

// ══════════════════════════════════════════════════════════════════════════
// CONVERSATION MANAGEMENT FUNCTIONS
// ══════════════════════════════════════════════════════════════════════════

window.loadConvGrade = function(grade) {
  console.log(`💬 Loading conversation for grade ${grade}...`);
  currentConvGrade = grade;
  
  // Update active tab button
  document.querySelectorAll('[data-conv-grade]').forEach(btn => {
    if (btn.dataset.convGrade === String(grade)) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // Update badge
  const badge = document.getElementById('conv-grade-badge');
  if (badge) badge.textContent = `Kelas ${grade}`;
  
  // Reset form
  resetConvForm();
  
  // Render preview
  renderConvPreview();
  
  // Setup live preview listeners
  setTimeout(setupConvBubblePreviewListeners, 100);
  
  console.log(`✅ Conversation for grade ${grade} loaded successfully`);
};

function renderConvPreview() {
  console.log('💬 Rendering conversation preview...');
  const container = document.getElementById('conv-preview-container');
  if (!container) {
    console.error('❌ conv-preview-container element not found!');
    return;
  }
  
  const data = getChallengeDataAdmin();
  if (!data || !data[currentConvGrade]) {
    console.error(`❌ No data found for grade ${currentConvGrade}`);
    container.innerHTML = '<div class="info-box error">Data tidak ditemukan!</div>';
    return;
  }
  
  const items = data[currentConvGrade].level2.items;
  const countBadge = document.getElementById('conv-count-badge');
  if (countBadge) countBadge.textContent = `${items.length} Bubbles`;
  
  console.log(`📊 Found ${items.length} conversation items`);
  
  if (items.length === 0) {
    container.innerHTML = '<div class="info-box warning">Belum ada percakapan. Tambahkan chat bubble baru di form sebelah kiri.</div>';
    return;
  }
  
  let html = '';
  items.forEach((bubble, index) => {
    html += `
      <div class="chat-bubble ${bubble.side}" style="position: relative;">
        <div class="chat-avatar">${bubble.avatar}</div>
        <div class="chat-text-wrapper">
          <div class="chat-eng">
            <span>${bubble.eng}</span>
            <button class="chat-speech-btn" onclick="speakEnglish('${bubble.eng.replace(/'/g, "\\'")}')">
              <i class="fa-solid fa-volume-high"></i>
            </button>
          </div>
          <div class="chat-ind">${bubble.ind}</div>
          <div style="display: flex; gap: 6px; margin-top: 8px; flex-wrap: wrap;">
            <button class="btn btn-secondary btn-sm" onclick="moveConvUp(${index})" ${index === 0 ? 'disabled' : ''} style="font-size: 0.7rem; padding: 3px 8px;">
              <i class="fa-solid fa-arrow-up"></i> Atas
            </button>
            <button class="btn btn-secondary btn-sm" onclick="moveConvDown(${index})" ${index === items.length - 1 ? 'disabled' : ''} style="font-size: 0.7rem; padding: 3px 8px;">
              <i class="fa-solid fa-arrow-down"></i> Bawah
            </button>
            <button class="btn btn-primary btn-sm" onclick="editConvItem(${index})" style="font-size: 0.7rem; padding: 3px 8px;">
              <i class="fa-solid fa-edit"></i> Edit
            </button>
            <button class="btn btn-danger btn-sm" onclick="deleteConvItem(${index})" style="font-size: 0.7rem; padding: 3px 8px;">
              <i class="fa-solid fa-trash"></i> Hapus
            </button>
          </div>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
  console.log('✅ Conversation preview rendered successfully');
}

window.editConvItem = function(index) {
  const data = getChallengeDataAdmin();
  if (!data || !data[currentConvGrade]) return;
  
  const item = data[currentConvGrade].level2.items[index];
  if (!item) return;
  
  document.getElementById('conv-eng').value = item.eng;
  document.getElementById('conv-ind').value = item.ind;
  document.getElementById('conv-side').value = item.side;
  document.getElementById('conv-edit-index').value = index;
  
  // Select the radio button with matching avatar
  const radioButton = document.querySelector(`input[name="conv-avatar"][value="${item.avatar}"]`);
  if (radioButton) {
    radioButton.checked = true;
  }
  
  // Update bubble preview
  if (typeof updateConvBubblePreview === 'function') {
    updateConvBubblePreview();
  }
  
  // Scroll to form
  document.getElementById('conv-eng').scrollIntoView({ behavior: 'smooth', block: 'center' });
};

window.deleteConvItem = function(index) {
  if (!confirm('Hapus chat bubble ini?')) return;
  
  const data = getChallengeDataAdmin();
  if (!data || !data[currentConvGrade]) return;
  
  data[currentConvGrade].level2.items.splice(index, 1);
  
  if (saveChallengeDataAdmin(data)) {
    showDbToast('Chat bubble berhasil dihapus!', 'success');
    renderConvPreview();
  } else {
    showDbToast('Gagal menghapus chat bubble!', 'error');
  }
};

window.moveConvUp = function(index) {
  if (index === 0) return;
  
  const data = getChallengeDataAdmin();
  if (!data || !data[currentConvGrade]) return;
  
  const items = data[currentConvGrade].level2.items;
  [items[index], items[index - 1]] = [items[index - 1], items[index]];
  
  if (saveChallengeDataAdmin(data)) {
    renderConvPreview();
  }
};

window.moveConvDown = function(index) {
  const data = getChallengeDataAdmin();
  if (!data || !data[currentConvGrade]) return;
  
  const items = data[currentConvGrade].level2.items;
  if (index === items.length - 1) return;
  
  [items[index], items[index + 1]] = [items[index + 1], items[index]];
  
  if (saveChallengeDataAdmin(data)) {
    renderConvPreview();
  }
};

window.saveConvItem = function() {
  const eng = document.getElementById('conv-eng').value.trim();
  const ind = document.getElementById('conv-ind').value.trim();
  const side = document.getElementById('conv-side').value;
  const audioType = document.getElementById('conv-audio-type').value;
  const editIndex = parseInt(document.getElementById('conv-edit-index').value);
  
  // Get selected avatar emoji from radio buttons
  const selectedAvatar = document.querySelector('input[name="conv-avatar"]:checked');
  
  // Debug log
  console.log('Save Conversation - Values:', { eng, ind, avatar: selectedAvatar?.value, side, audioType, editIndex });
  
  // Detailed validation with specific error messages
  if (!eng) {
    showDbToast('⚠️ Teks Bahasa Inggris belum diisi!', 'warning');
    document.getElementById('conv-eng').focus();
    return;
  }
  
  if (!ind) {
    showDbToast('⚠️ Terjemahan Indonesia belum diisi!', 'warning');
    document.getElementById('conv-ind').focus();
    return;
  }
  
  if (!selectedAvatar) {
    showDbToast('⚠️ Avatar Emoji belum dipilih! Pilih salah satu emoji dari grid yang tersedia.', 'warning');
    return;
  }
  
  const avatar = selectedAvatar.value;
  
  const data = getChallengeDataAdmin();
  if (!data || !data[currentConvGrade]) {
    showDbToast('❌ Error: Data tidak ditemukan untuk kelas ini!', 'error');
    return;
  }
  
  // Create item object with all data
  const item = { 
    eng, 
    ind, 
    avatar, 
    side,
    audioType: audioType || 'api' // default to api if not set
  };
  
  // If upload mode, check if audio file is uploaded (optional - just store info)
  if (audioType === 'upload') {
    const audioInput = document.getElementById('conv-audio-input');
    if (audioInput && audioInput.files && audioInput.files[0]) {
      item.audioFileName = audioInput.files[0].name;
      console.log('Audio file attached:', item.audioFileName);
    }
  }
  
  console.log('Saving item:', item);
  
  if (editIndex >= 0) {
    // Edit existing
    data[currentConvGrade].level2.items[editIndex] = item;
    console.log('Updated item at index:', editIndex);
  } else {
    // Add new
    data[currentConvGrade].level2.items.push(item);
    console.log('Added new item. Total items:', data[currentConvGrade].level2.items.length);
  }
  
  if (saveChallengeDataAdmin(data)) {
    showDbToast(editIndex >= 0 ? '✅ Chat bubble berhasil diupdate!' : '✅ Chat bubble berhasil ditambahkan!', 'success');
    resetConvForm();
    renderConvPreview();
  } else {
    showDbToast('❌ Gagal menyimpan chat bubble ke localStorage!', 'error');
  }
};

window.resetConvForm = function() {
  document.getElementById('conv-eng').value = '';
  document.getElementById('conv-ind').value = '';
  document.getElementById('conv-side').value = 'left';
  document.getElementById('conv-audio-type').value = 'api';
  document.getElementById('conv-edit-index').value = '-1';
  
  // Uncheck all avatar radio buttons
  document.querySelectorAll('input[name="conv-avatar"]').forEach(radio => {
    radio.checked = false;
  });
  
  // Reset audio input file
  const audioInput = document.getElementById('conv-audio-input');
  if (audioInput) {
    audioInput.value = '';
  }
  
  // Reset to API mode
  toggleConvAudioType();
  
  // Hide text result if visible
  const textResult = document.getElementById('conv-text-result');
  if (textResult) {
    textResult.classList.add('hide');
  }

  // Update bubble preview
  if (typeof updateConvBubblePreview === 'function') {
    updateConvBubblePreview();
  }
};

window.testConvSpeech = function() {
  const eng = document.getElementById('conv-eng').value.trim();
  if (!eng) {
    showDbToast('Masukkan teks bahasa Inggris terlebih dahulu!', 'warning');
    return;
  }
  speakEnglish(eng);
};

// ══════════════════════════════════════════════════════════════════════════
// VOCABULARY IMAGE PROCESSING FUNCTIONS
// ══════════════════════════════════════════════════════════════════════════

window.toggleVocabType = function() {
  const type = document.getElementById('vocab-type').value;
  const emojiGroup = document.getElementById('vocab-emoji-group');
  const imageGroup = document.getElementById('vocab-image-group');
  const imageProcessing = document.getElementById('vocab-image-processing');
  const imageCompression = document.getElementById('vocab-image-compression');
  const canvasContainer = document.getElementById('vocab-canvas-container');
  
  if (type === 'emoji') {
    emojiGroup.classList.remove('hide');
    imageGroup.classList.add('hide');
    imageProcessing.classList.add('hide');
    imageCompression.classList.add('hide');
    canvasContainer.classList.add('hide');
  } else {
    emojiGroup.classList.add('hide');
    imageGroup.classList.remove('hide');
    imageProcessing.classList.remove('hide');
    imageCompression.classList.remove('hide');
    canvasContainer.classList.remove('hide');
  }
};

// Manual emoji input for vocabulary
window.useManualVocabEmoji = function() {
  const manualInput = document.getElementById('vocab-emoji-manual');
  const emoji = manualInput.value.trim();
  
  if (!emoji) {
    showDbToast('⚠️ Ketik emoji terlebih dahulu!', 'warning');
    manualInput.focus();
    return;
  }
  
  // First, uncheck all existing radio buttons
  document.querySelectorAll('input[name="vocab-emoji"]').forEach(radio => {
    radio.checked = false;
  });
  
  // Check if emoji exists in the radio grid
  const existingRadio = document.querySelector(`input[name="vocab-emoji"][value="${emoji}"]`);
  if (existingRadio) {
    // If emoji exists in grid, select it
    existingRadio.checked = true;
    showDbToast(`✅ Emoji "${emoji}" dipilih!`, 'success');
  } else {
    // If emoji not in grid, create a temporary hidden radio button
    const tempRadio = document.createElement('input');
    tempRadio.type = 'radio';
    tempRadio.name = 'vocab-emoji';
    tempRadio.value = emoji;
    tempRadio.checked = true;
    tempRadio.style.display = 'none';
    tempRadio.id = 'vocab-emoji-temp';
    
    // Remove old temp if exists
    const oldTemp = document.getElementById('vocab-emoji-temp');
    if (oldTemp) oldTemp.remove();
    
    // Add to emoji group
    document.getElementById('vocab-emoji-group').appendChild(tempRadio);
    showDbToast(`✅ Emoji kustom "${emoji}" digunakan!`, 'success');
  }
  
  // Clear manual input
  manualInput.value = '';
};

// Manual avatar input for conversation
window.useManualConvAvatar = function() {
  const manualInput = document.getElementById('conv-avatar-manual');
  const emoji = manualInput.value.trim();
  
  if (!emoji) {
    showDbToast('⚠️ Ketik emoji terlebih dahulu!', 'warning');
    manualInput.focus();
    return;
  }
  
  // First, uncheck all existing radio buttons
  document.querySelectorAll('input[name="conv-avatar"]').forEach(radio => {
    radio.checked = false;
  });
  
  // Check if emoji exists in the radio grid
  const existingRadio = document.querySelector(`input[name="conv-avatar"][value="${emoji}"]`);
  if (existingRadio) {
    // If emoji exists in grid, select it
    existingRadio.checked = true;
    showDbToast(`✅ Avatar "${emoji}" dipilih!`, 'success');
  } else {
    // If emoji not in grid, create a temporary hidden radio button
    const tempRadio = document.createElement('input');
    tempRadio.type = 'radio';
    tempRadio.name = 'conv-avatar';
    tempRadio.value = emoji;
    tempRadio.checked = true;
    tempRadio.style.display = 'none';
    tempRadio.id = 'conv-avatar-temp';
    
    // Remove old temp if exists
    const oldTemp = document.getElementById('conv-avatar-temp');
    if (oldTemp) oldTemp.remove();
    
    // Add to avatar group (find the parent form-group)
    const emojiGrid = document.querySelector('input[name="conv-avatar"]').closest('.form-group');
    if (emojiGrid) {
      emojiGrid.appendChild(tempRadio);
    }
    showDbToast(`✅ Avatar kustom "${emoji}" digunakan!`, 'success');
  }
  
  // Clear manual input
  manualInput.value = '';
};

let vocabOriginalImage = null;
let vocabCurrentImageState = null;

window.initVocabImageHandlers = function() {
  const fileInput = document.getElementById('vocab-file-input');
  const dropzone = document.getElementById('vocab-dropzone');
  const sampleBtn = document.getElementById('btn-use-vocab-sample');
  
  if (dropzone) {
    dropzone.addEventListener('click', () => fileInput.click());
  }
  
  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        loadVocabImage(e.target.files[0]);
      }
    });
  }
  
  if (sampleBtn) {
    sampleBtn.addEventListener('click', () => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = 'assets/images/sample.png';
      img.onload = () => {
        vocabOriginalImage = img;
        setupVocabCanvas();
      };
    });
  }
  
  // Brightness/Contrast sliders
  const brightnessSlider = document.getElementById('vocab-brightness');
  const contrastSlider = document.getElementById('vocab-contrast');
  
  if (brightnessSlider) {
    brightnessSlider.addEventListener('input', (e) => {
      document.getElementById('val-vocab-brightness').textContent = e.target.value;
      applyVocabBrightnessContrast();
    });
  }
  
  if (contrastSlider) {
    contrastSlider.addEventListener('input', (e) => {
      document.getElementById('val-vocab-contrast').textContent = e.target.value;
      applyVocabBrightnessContrast();
    });
  }
  
  // Compression sliders
  const qualitySlider = document.getElementById('vocab-quality');
  const scaleSlider = document.getElementById('vocab-scale');
  
  if (qualitySlider) {
    qualitySlider.addEventListener('input', (e) => {
      document.getElementById('val-vocab-quality').textContent = e.target.value;
    });
  }
  
  if (scaleSlider) {
    scaleSlider.addEventListener('input', (e) => {
      document.getElementById('val-vocab-scale').textContent = e.target.value;
    });
  }
};

function loadVocabImage(file) {
  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.onload = () => {
      vocabOriginalImage = img;
      setupVocabCanvas();
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

function setupVocabCanvas() {
  const canvasSource = document.getElementById('vocab-canvas-source');
  const canvasDisplay = document.getElementById('vocab-canvas-display');
  
  if (!canvasSource || !canvasDisplay || !vocabOriginalImage) return;
  
  const maxDim = 400;
  let w = vocabOriginalImage.width;
  let h = vocabOriginalImage.height;
  
  if (w > maxDim || h > maxDim) {
    if (w > h) {
      h = Math.round((h * maxDim) / w);
      w = maxDim;
    } else {
      w = Math.round((w * maxDim) / h);
      h = maxDim;
    }
  }
  
  canvasSource.width = w;
  canvasSource.height = h;
  canvasDisplay.width = w;
  canvasDisplay.height = h;
  
  const ctxSrc = canvasSource.getContext('2d');
  ctxSrc.drawImage(vocabOriginalImage, 0, 0, w, h);
  
  vocabCurrentImageState = ctxSrc.getImageData(0, 0, w, h);
  
  document.getElementById('vocab-empty-canvas').classList.add('hide');
  drawVocabImage();
  
  const statusMsg = document.getElementById('vocab-status-msg');
  if (statusMsg) statusMsg.innerHTML = '<i class="fa-solid fa-check"></i> Gambar dimuat';
}

function drawVocabImage() {
  if (!vocabCurrentImageState) return;
  const canvasDisplay = document.getElementById('vocab-canvas-display');
  const ctx = canvasDisplay.getContext('2d');
  ctx.putImageData(vocabCurrentImageState, 0, 0);
}

function applyVocabBrightnessContrast() {
  if (!vocabOriginalImage) return;
  
  const canvasSource = document.getElementById('vocab-canvas-source');
  const ctxSrc = canvasSource.getContext('2d');
  const w = canvasSource.width;
  const h = canvasSource.height;
  
  const origData = ctxSrc.getImageData(0, 0, w, h);
  const src = origData.data;
  const outData = ctxSrc.createImageData(w, h);
  const dst = outData.data;
  
  const brightness = parseInt(document.getElementById('vocab-brightness').value);
  const contrast = parseInt(document.getElementById('vocab-contrast').value);
  const f = (259 * (contrast + 255)) / (255 * (259 - contrast));
  
  for (let i = 0; i < src.length; i += 4) {
    dst[i] = Math.min(255, Math.max(0, f * (src[i] - 128) + 128 + brightness));
    dst[i + 1] = Math.min(255, Math.max(0, f * (src[i + 1] - 128) + 128 + brightness));
    dst[i + 2] = Math.min(255, Math.max(0, f * (src[i + 2] - 128) + 128 + brightness));
    dst[i + 3] = src[i + 3];
  }
  
  vocabCurrentImageState = outData;
  drawVocabImage();
}

window.applyVocabFilter = function(type) {
  if (!vocabOriginalImage || !vocabCurrentImageState) {
    showDbToast('Upload gambar terlebih dahulu!', 'warning');
    return;
  }
  
  const w = vocabCurrentImageState.width;
  const h = vocabCurrentImageState.height;
  const src = vocabCurrentImageState.data;
  
  const canvasSource = document.getElementById('vocab-canvas-source');
  const ctxSrc = canvasSource.getContext('2d');
  const outData = ctxSrc.createImageData(w, h);
  const dst = outData.data;
  
  if (type === 'grayscale') {
    for (let i = 0; i < src.length; i += 4) {
      const gray = 0.299 * src[i] + 0.587 * src[i + 1] + 0.114 * src[i + 2];
      dst[i] = dst[i + 1] = dst[i + 2] = gray;
      dst[i + 3] = src[i + 3];
    }
    vocabCurrentImageState = outData;
  } else if (type === 'sharpen') {
    const kernel = [0, -1, 0, -1, 5, -1, 0, -1, 0];
    vocabCurrentImageState = applyConvolution(vocabCurrentImageState, kernel, 1, 0);
  } else if (type === 'blur') {
    const kernel = [1, 1, 1, 1, 1, 1, 1, 1, 1];
    vocabCurrentImageState = applyConvolution(vocabCurrentImageState, kernel, 9, 0);
  }
  
  drawVocabImage();
  
  const statusMsg = document.getElementById('vocab-status-msg');
  if (statusMsg) statusMsg.innerHTML = `<i class="fa-solid fa-filter"></i> Filter ${type} diterapkan`;
};

window.resetVocabImageFilters = function() {
  if (!vocabOriginalImage) return;
  const canvasSource = document.getElementById('vocab-canvas-source');
  const ctxSrc = canvasSource.getContext('2d');
  vocabCurrentImageState = ctxSrc.getImageData(0, 0, canvasSource.width, canvasSource.height);
  
  document.getElementById('vocab-brightness').value = 0;
  document.getElementById('vocab-contrast').value = 0;
  document.getElementById('val-vocab-brightness').textContent = '0';
  document.getElementById('val-vocab-contrast').textContent = '0';
  
  drawVocabImage();
};

window.applyVocabWatermark = function() {
  if (!vocabOriginalImage || !vocabCurrentImageState) {
    showDbToast('Upload gambar terlebih dahulu!', 'warning');
    return;
  }
  
  const canvasDisplay = document.getElementById('vocab-canvas-display');
  const ctx = canvasDisplay.getContext('2d');
  const w = canvasDisplay.width;
  const h = canvasDisplay.height;
  
  ctx.putImageData(vocabCurrentImageState, 0, 0);
  
  const text = document.getElementById('vocab-wm-text').value;
  
  ctx.save();
  ctx.font = 'bold 18px Fredoka, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.translate(w * 0.85, h * 0.85);
  ctx.rotate(-30 * Math.PI / 180);
  ctx.fillText(text, 0, 0);
  ctx.restore();
  
  vocabCurrentImageState = ctx.getImageData(0, 0, w, h);
  
  const statusMsg = document.getElementById('vocab-status-msg');
  if (statusMsg) statusMsg.innerHTML = '<i class="fa-solid fa-copyright"></i> Watermark ditambahkan';
};

window.applyVocabCompression = function() {
  if (!vocabOriginalImage || !vocabCurrentImageState) {
    showDbToast('Upload gambar terlebih dahulu!', 'warning');
    return;
  }
  
  const quality = parseInt(document.getElementById('vocab-quality').value) / 100;
  const scale = parseInt(document.getElementById('vocab-scale').value) / 100;
  
  const canvasDisplay = document.getElementById('vocab-canvas-display');
  const canvasSource = document.getElementById('vocab-canvas-source');
  
  // Get original size
  const originalDataUrl = canvasDisplay.toDataURL('image/png');
  const originalSize = Math.round((originalDataUrl.length * 3) / 4 / 1024); // Convert base64 to KB
  
  // Create temporary canvas for compression
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');
  
  // Apply scale
  const newWidth = Math.round(canvasDisplay.width * scale);
  const newHeight = Math.round(canvasDisplay.height * scale);
  
  tempCanvas.width = newWidth;
  tempCanvas.height = newHeight;
  
  // Draw current image state to temp canvas with scaling
  tempCtx.putImageData(vocabCurrentImageState, 0, 0);
  
  // Create final canvas with new dimensions
  const finalCanvas = document.createElement('canvas');
  finalCanvas.width = newWidth;
  finalCanvas.height = newHeight;
  const finalCtx = finalCanvas.getContext('2d');
  
  // Draw scaled image
  finalCtx.drawImage(tempCanvas, 0, 0, canvasDisplay.width, canvasDisplay.height, 0, 0, newWidth, newHeight);
  
  // Convert to JPEG with quality setting
  const compressedDataUrl = finalCanvas.toDataURL('image/jpeg', quality);
  const compressedSize = Math.round((compressedDataUrl.length * 3) / 4 / 1024);
  
  // Update canvas display
  canvasDisplay.width = newWidth;
  canvasDisplay.height = newHeight;
  canvasSource.width = newWidth;
  canvasSource.height = newHeight;
  
  const img = new Image();
  img.onload = () => {
    const ctx = canvasDisplay.getContext('2d');
    ctx.drawImage(img, 0, 0);
    vocabCurrentImageState = ctx.getImageData(0, 0, newWidth, newHeight);
    
    // Update source canvas
    const ctxSrc = canvasSource.getContext('2d');
    ctxSrc.drawImage(img, 0, 0);
  };
  img.src = compressedDataUrl;
  
  // Show compression result
  const resultBox = document.getElementById('vocab-compression-result');
  const origEl = document.getElementById('vocab-size-orig');
  const compEl = document.getElementById('vocab-size-comp');
  const ratioEl = document.getElementById('vocab-comp-ratio');
  
  if (resultBox) resultBox.classList.remove('hide');
  if (origEl) origEl.textContent = `${originalSize} KB`;
  if (compEl) compEl.textContent = `${compressedSize} KB`;
  
  const ratio = ((1 - compressedSize / originalSize) * 100).toFixed(1);
  if (ratioEl) {
    ratioEl.textContent = `${ratio}%`;
    ratioEl.className = parseFloat(ratio) > 0 ? 'text-green' : 'text-red';
  }
  
  const statusMsg = document.getElementById('vocab-status-msg');
  if (statusMsg) statusMsg.innerHTML = `<i class="fa-solid fa-compress"></i> Kompresi diterapkan (${ratio}% lebih kecil)`;
};

function applyConvolution(imgData, kernel, divisor = 1, offset = 0) {
  const w = imgData.width;
  const h = imgData.height;
  const src = imgData.data;
  const dst = new Uint8ClampedArray(src.length);
  
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      let r = 0, g = 0, b = 0;
      
      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          const pixelIndex = ((y + ky) * w + (x + kx)) * 4;
          const kVal = kernel[(ky + 1) * 3 + (kx + 1)];
          r += src[pixelIndex] * kVal;
          g += src[pixelIndex + 1] * kVal;
          b += src[pixelIndex + 2] * kVal;
        }
      }
      
      const idx = (y * w + x) * 4;
      dst[idx] = Math.min(255, Math.max(0, r / divisor + offset));
      dst[idx + 1] = Math.min(255, Math.max(0, g / divisor + offset));
      dst[idx + 2] = Math.min(255, Math.max(0, b / divisor + offset));
      dst[idx + 3] = src[idx + 3];
    }
  }
  
  for (let i = 0; i < src.length; i++) {
    if (dst[i] === 0 && (i % 4 !== 3)) {
      dst[i] = src[i];
    } else if (i % 4 === 3) {
      dst[i] = src[i];
    }
  }
  
  return new ImageData(dst, w, h);
}

// ══════════════════════════════════════════════════════════════════════════
// CONVERSATION AUDIO & TEXT DSP FUNCTIONS
// ══════════════════════════════════════════════════════════════════════════

window.toggleConvAudioType = function() {
  const type = document.getElementById('conv-audio-type').value;
  const apiGroup = document.getElementById('conv-api-group');
  const uploadGroup = document.getElementById('conv-upload-group');
  const audioProcessing = document.getElementById('conv-audio-processing');
  
  if (type === 'api') {
    apiGroup.classList.remove('hide');
    uploadGroup.classList.add('hide');
    audioProcessing.classList.add('hide');
  } else {
    apiGroup.classList.add('hide');
    uploadGroup.classList.remove('hide');
    audioProcessing.classList.remove('hide');
  }
};

window.initConvAudioHandlers = function() {
  const dropzone = document.getElementById('conv-audio-dropzone');
  const fileInput = document.getElementById('conv-audio-input');
  
  if (dropzone) {
    dropzone.addEventListener('click', () => fileInput.click());
  }
  
  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        showDbToast('Audio uploaded! (Simulasi - belum diproses)', 'success');
      }
    });
  }
};

window.processConvAudio = function() {
  showDbToast('Audio DSP processing (Simulasi)', 'success');
};

window.compressConvTextRLE = function() {
  const text = document.getElementById('conv-eng').value;
  if (!text) {
    showDbToast('Masukkan teks terlebih dahulu!', 'warning');
    return;
  }
  
  let compressed = '';
  let count = 1;
  
  for (let i = 0; i < text.length; i++) {
    if (i + 1 < text.length && text[i] === text[i + 1]) {
      count++;
    } else {
      compressed += text[i] + (count > 1 ? count : '');
      count = 1;
    }
  }
  
  showConvTextResult(compressed, text.length, compressed.length);
};

window.compressConvTextHuffman = function() {
  const text = document.getElementById('conv-eng').value;
  if (!text) {
    showDbToast('Masukkan teks terlebih dahulu!', 'warning');
    return;
  }
  
  showDbToast('Huffman compression simulated', 'success');
  const compressed = `[Huffman Binary: ${text.length * 8} bits → ${Math.floor(text.length * 5.5)} bits]`;
  showConvTextResult(compressed, text.length, compressed.length);
};

window.encryptConvTextXOR = function() {
  const text = document.getElementById('conv-eng').value;
  if (!text) {
    showDbToast('Masukkan teks terlebih dahulu!', 'warning');
    return;
  }
  
  const key = 'GURU';
  let encrypted = '';
  
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    encrypted += charCode.toString(16).padStart(2, '0');
  }
  
  showConvTextResult(encrypted, text.length, encrypted.length);
};

function showConvTextResult(output, origSize, procSize) {
  const resultBox = document.getElementById('conv-text-result');
  const outputArea = document.getElementById('conv-text-output');
  const origEl = document.getElementById('conv-text-orig');
  const procEl = document.getElementById('conv-text-proc');
  const ratioEl = document.getElementById('conv-text-ratio');
  
  if (resultBox) resultBox.classList.remove('hide');
  if (outputArea) outputArea.value = output;
  if (origEl) origEl.textContent = `${origSize} bytes`;
  if (procEl) procEl.textContent = `${procSize} bytes`;
  
  const ratio = ((1 - procSize / origSize) * 100).toFixed(1);
  if (ratioEl) {
    ratioEl.textContent = `${ratio}%`;
    ratioEl.className = parseFloat(ratio) > 0 ? 'text-green' : 'text-red';
  }
}

// Shared speech synthesis helper
function speakEnglish(text) {
  if (!("speechSynthesis" in window)) {
    console.log("Browser tidak support speech synthesis");
    return;
  }
  
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  
  const voices = window.speechSynthesis.getVoices();
  const enVoice = voices.find(v => v.lang.startsWith("en-") && v.name.includes("Google"));
  if (enVoice) {
    utterance.voice = enVoice;
  }
  
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
}

// ══════════════════════════════════════════════════════════════════════════
// DATABASE API CONNECTION MODULE (Original Code)
// ══════════════════════════════════════════════════════════════════════════

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

// --- Auto-init DB tab after dashboard components are loaded ---
function initDatabaseModule() {
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
}


/* ==========================================================================
   QUIZ MANAGEMENT MODULE (CRUD SOAL KUIS)
   Manages quiz questions for Level 3 (Dynamic Quest Quiz)
   ========================================================================== */

let currentQuizGrade = 3;

// Load quiz for a specific grade
window.loadQuizGrade = function(grade) {
  console.log(`📝 Loading quiz for grade ${grade}...`);
  currentQuizGrade = grade;
  
  // Update active tab button
  document.querySelectorAll('[data-quiz-grade]').forEach(btn => {
    if (btn.dataset.quizGrade === String(grade)) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // Update badge
  const badge = document.getElementById('quiz-grade-badge');
  if (badge) badge.textContent = `Kelas ${grade}`;
  
  // Render questions list
  renderQuizQuestions();
  console.log(`✅ Quiz for grade ${grade} loaded successfully`);
};

// Render quiz questions into table
function renderQuizQuestions() {
  console.log('📝 Rendering quiz questions...');
  const tableBody = document.getElementById('quiz-questions-table-body');
  if (!tableBody) {
    console.error('❌ quiz-questions-table-body element not found!');
    return;
  }
  
  const data = getChallengeDataAdmin();
  if (!data || !data[currentQuizGrade]) {
    console.error(`❌ No data found for grade ${currentQuizGrade}`);
    tableBody.innerHTML = '<tr><td colspan="5" class="info-box error">Data tidak ditemukan!</td></tr>';
    return;
  }
  
  const questions = data[currentQuizGrade].level3.questions;
  console.log(`📊 Found ${questions.length} quiz questions`);
  
  if (questions.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:30px;color:#64748b;">Belum ada soal. Klik "Tambah Soal Baru" untuk mengisi.</td></tr>';
    return;
  }

  tableBody.innerHTML = '';
  questions.forEach((q, index) => {
    const row = document.createElement('tr');
    
    // Formatting options string
    const optionsText = q.options.map((opt, i) => `${String.fromCharCode(65 + i)}. ${opt}`).join('<br/>');
    
    row.innerHTML = `
      <td style="font-weight:800;color:#1cb0f6;font-family:'Fredoka',sans-serif;text-align:center;">${index + 1}</td>
      <td style="max-width:300px;word-break:break-word;">${q.question}</td>
      <td style="font-size:0.88rem;line-height:1.6;">${optionsText}</td>
      <td class="answer-key">${q.answer}</td>
      <td style="text-align:center;">
        <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">
          <button class="crud-btn edit" onclick="openEditQuestionModal(${index})"><i class="fa-solid fa-edit"></i> Edit</button>
          <button class="crud-btn del" onclick="deleteQuizQuestion(${index})"><i class="fa-solid fa-trash"></i> Hapus</button>
        </div>
      </td>
    `;
    tableBody.appendChild(row);
  });
  console.log('✅ Quiz questions rendered successfully');
}

// Open Modal to create new question
window.openCreateQuestionModal = function() {
  const modal = document.getElementById('quiz-modal-overlay');
  if (!modal) {
    console.error('❌ quiz-modal-overlay element not found!');
    return;
  }
  
  document.getElementById('quiz-modal-title').innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Tambah Soal Quiz - Kelas ${currentQuizGrade} SD`;
  document.getElementById('edit-question-index').value = ''; // Empty implies new entry
  document.getElementById('quiz-question-form').reset();
  
  modal.classList.remove('hide');
};

// Open Modal to edit existing question
window.openEditQuestionModal = function(index) {
  const data = getChallengeDataAdmin();
  if (!data || !data[currentQuizGrade]) return;
  
  const q = data[currentQuizGrade].level3.questions[index];
  if (!q) return;

  document.getElementById('quiz-modal-title').innerHTML = `<i class="fa-solid fa-edit"></i> Edit Soal Quiz - Kelas ${currentQuizGrade} SD`;
  document.getElementById('edit-question-index').value = index;
  
  document.getElementById('form-question').value = q.question;
  document.getElementById('form-opt-0').value = q.options[0] || '';
  document.getElementById('form-opt-1').value = q.options[1] || '';
  document.getElementById('form-opt-2').value = q.options[2] || '';
  document.getElementById('form-opt-3').value = q.options[3] || '';
  
  // Find which option matches correct answer
  const ansIndex = q.options.indexOf(q.answer);
  document.getElementById('form-answer').value = ansIndex >= 0 ? ansIndex : '';

  const modal = document.getElementById('quiz-modal-overlay');
  if (modal) modal.classList.remove('hide');
};

// Close question Modal
window.closeQuizQuestionModal = function() {
  const modal = document.getElementById('quiz-modal-overlay');
  if (modal) modal.classList.add('hide');
};

// Save form submit (Create or Update)
window.saveQuestionForm = function(event) {
  event.preventDefault();
  
  const indexStr = document.getElementById('edit-question-index').value;
  const question = document.getElementById('form-question').value.trim();
  const opt0 = document.getElementById('form-opt-0').value.trim();
  const opt1 = document.getElementById('form-opt-1').value.trim();
  const opt2 = document.getElementById('form-opt-2').value.trim();
  const opt3 = document.getElementById('form-opt-3').value.trim();
  const ansIndex = parseInt(document.getElementById('form-answer').value);

  if (!question || !opt0 || !opt1 || !opt2 || !opt3 || isNaN(ansIndex)) {
    showDbToast('Mohon lengkapi semua field!', 'warning');
    return;
  }

  const options = [opt0, opt1, opt2, opt3];
  const answer = options[ansIndex];

  const data = getChallengeDataAdmin();
  if (!data || !data[currentQuizGrade]) {
    showDbToast('Data grade tidak ditemukan!', 'error');
    return;
  }
  
  const questions = data[currentQuizGrade].level3.questions;

  const newQuestionObj = { question, options, answer };

  if (indexStr === '') {
    // Create new
    questions.push(newQuestionObj);
  } else {
    // Update existing
    const index = parseInt(indexStr);
    questions[index] = newQuestionObj;
  }

  if (saveChallengeDataAdmin(data)) {
    showDbToast(indexStr === '' ? 'Soal berhasil ditambahkan!' : 'Soal berhasil diupdate!', 'success');
    renderQuizQuestions();
    closeQuizQuestionModal();
  } else {
    showDbToast('Gagal menyimpan soal!', 'error');
  }
};

// Delete a question
window.deleteQuizQuestion = function(index) {
  if (!confirm('Apakah Anda yakin ingin menghapus soal ini?')) return;

  const data = getChallengeDataAdmin();
  if (!data || !data[currentQuizGrade]) return;
  
  const questions = data[currentQuizGrade].level3.questions;
  questions.splice(index, 1);
  
  if (saveChallengeDataAdmin(data)) {
    showDbToast('Soal berhasil dihapus!', 'success');
    renderQuizQuestions();
  } else {
    showDbToast('Gagal menghapus soal!', 'error');
  }
};

// Reset questions database to default
window.resetDefaultQuestions = function() {
  if (!confirm('Apakah Anda yakin ingin mengembalikan semua soal quiz ke setelan awal pabrik? Seluruh penyesuaian Anda akan terhapus.')) return;
  
  localStorage.removeItem('funlish_challenge_data');
  showDbToast('Bank data soal quiz berhasil direset!', 'success');
  location.reload();
};

// Helper function to show toast notification
function showDbToast(message, type) {
  // Simple alert for now - can be enhanced with toast library
  if (type === 'success') {
    console.log('✅ ' + message);
  } else {
    console.error('❌ ' + message);
  }
  console.log(message);
}

/* ==========================================================================
   NEW QUIZ MANAGEMENT FUNCTIONS (Card-based UI)
   ========================================================================== */

// Render quiz list in card format (similar to vocabulary)
function renderQuizList() {
  const container = document.getElementById('quiz-list-container');
  if (!container) return;

  const data = getChallengeDataAdmin();
  if (!data || !data[currentQuizGrade]) {
    container.innerHTML = `
      <div class="empty-state" style="text-align: center; padding: 60px 20px;">
        <i class="fa-solid fa-clipboard-question" style="font-size: 4rem; color: #cbd5e1; margin-bottom: 20px;"></i>
        <h3 style="color: #64748b; margin-bottom: 12px;">Belum Ada Soal Quiz</h3>
        <p style="color: #94a3b8;">Mulai tambahkan soal quiz menggunakan form di sebelah kiri.</p>
      </div>
    `;
    return;
  }

  const questions = data[currentQuizGrade].level3.questions;
  
  if (!questions || questions.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="text-align: center; padding: 60px 20px;">
        <i class="fa-solid fa-clipboard-question" style="font-size: 4rem; color: #cbd5e1; margin-bottom: 20px;"></i>
        <h3 style="color: #64748b; margin-bottom: 12px;">Belum Ada Soal Quiz</h3>
        <p style="color: #94a3b8;">Mulai tambahkan soal quiz menggunakan form di sebelah kiri.</p>
      </div>
    `;
    return;
  }

  // Update count badge
  const countBadge = document.getElementById('quiz-count-badge');
  if (countBadge) {
    countBadge.textContent = `${questions.length} Soal`;
  }

  // Update grade badge
  const gradeBadge = document.getElementById('quiz-grade-badge');
  if (gradeBadge) {
    gradeBadge.textContent = `Kelas ${currentQuizGrade}`;
  }

  let html = '<div style="display: flex; flex-direction: column; gap: 16px;">';
  
  questions.forEach((q, index) => {
    const correctAnswer = String.fromCharCode(65 + q.answer); // 0->A, 1->B, etc.
    
    html += `
      <div class="quiz-card" style="background: white; border: 2px solid #e2ecd9; border-radius: 16px; padding: 20px; transition: all 0.2s;">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
          <div style="flex: 1;">
            <div style="display: inline-block; background: #1cb0f6; color: white; padding: 4px 12px; border-radius: 99px; font-size: 0.8rem; font-weight: 700; margin-bottom: 8px;">
              Soal #${index + 1}
            </div>
            <h4 style="color: #1e293b; font-size: 1.1rem; margin-bottom: 12px; line-height: 1.5;">${q.question}</h4>
          </div>
          <div style="display: flex; gap: 8px; margin-left: 12px;">
            <button onclick="editQuizItem(${index})" style="background: transparent; border: none; color: #1cb0f6; cursor: pointer; font-size: 1.1rem; padding: 8px;" title="Edit">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button onclick="deleteQuizItem(${index})" style="background: transparent; border: none; color: #ff6b6b; cursor: pointer; font-size: 1.1rem; padding: 8px;" title="Hapus">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px;">
          ${q.options.map((opt, i) => {
            const letter = String.fromCharCode(65 + i);
            const isCorrect = i === q.answer;
            return `
              <div style="padding: 8px 12px; background: ${isCorrect ? '#dcfce7' : '#f9fafb'}; border: 2px solid ${isCorrect ? '#10b981' : '#e2ecd9'}; border-radius: 8px; font-size: 0.9rem;">
                <strong style="color: ${isCorrect ? '#10b981' : '#64748b'};">${letter}.</strong> ${opt}
                ${isCorrect ? '<i class="fa-solid fa-check-circle" style="color: #10b981; margin-left: 8px;"></i>' : ''}
              </div>
            `;
          }).join('')}
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px dashed #e2ecd9;">
          <span style="color: #64748b; font-size: 0.85rem;">
            <i class="fa-solid fa-check-circle" style="color: #10b981;"></i> Jawaban: <strong>${correctAnswer}</strong>
          </span>
          <span style="background: #fef3c7; color: #d97706; padding: 4px 12px; border-radius: 99px; font-size: 0.8rem; font-weight: 700;">
            <i class="fa-solid fa-star"></i> 10 Poin
          </span>
        </div>
      </div>
    `;
  });
  
  html += '</div>';
  container.innerHTML = html;
}

// Save quiz item from form
window.saveQuizItem = function() {
  const question = document.getElementById('quiz-question').value.trim();
  const optionA = document.getElementById('quiz-option-a').value.trim();
  const optionB = document.getElementById('quiz-option-b').value.trim();
  const optionC = document.getElementById('quiz-option-c').value.trim();
  const optionD = document.getElementById('quiz-option-d').value.trim();
  const correct = document.getElementById('quiz-correct').value;
  const editIndex = document.getElementById('quiz-edit-index').value;

  if (!question || !optionA || !optionB || !optionC || !optionD) {
    showDbToast('Mohon isi semua field!', 'error');
    return;
  }

  const data = getChallengeDataAdmin();
  if (!data || !data[currentQuizGrade]) {
    showDbToast('Data grade tidak ditemukan!', 'error');
    return;
  }

  const questions = data[currentQuizGrade].level3.questions;
  const options = [optionA, optionB, optionC, optionD];
  const answerIndex = { a: 0, b: 1, c: 2, d: 3 }[correct];

  const questionObj = {
    question: question,
    options: options,
    answer: answerIndex
  };

  if (editIndex !== '' && editIndex !== '-1') {
    // Edit existing
    questions[parseInt(editIndex)] = questionObj;
    showDbToast('Soal quiz berhasil diupdate!', 'success');
  } else {
    // Add new
    questions.push(questionObj);
    showDbToast('Soal quiz berhasil ditambahkan!', 'success');
  }

  if (saveChallengeDataAdmin(data)) {
    renderQuizList();
    resetQuizForm();
  } else {
    showDbToast('Gagal menyimpan soal!', 'error');
  }
};

// Edit quiz item
window.editQuizItem = function(index) {
  const data = getChallengeDataAdmin();
  if (!data || !data[currentQuizGrade]) return;

  const q = data[currentQuizGrade].level3.questions[index];
  if (!q) return;

  document.getElementById('quiz-question').value = q.question;
  document.getElementById('quiz-option-a').value = q.options[0];
  document.getElementById('quiz-option-b').value = q.options[1];
  document.getElementById('quiz-option-c').value = q.options[2];
  document.getElementById('quiz-option-d').value = q.options[3];
  
  const correctLetter = ['a', 'b', 'c', 'd'][q.answer];
  document.getElementById('quiz-correct').value = correctLetter;
  
  document.getElementById('quiz-edit-index').value = index;

  // Update preview
  updateQuizPreview();

  // Scroll to form
  document.querySelector('.sidebar-controls').scrollIntoView({ behavior: 'smooth' });
};

// Delete quiz item
window.deleteQuizItem = function(index) {
  if (!confirm('Apakah Anda yakin ingin menghapus soal ini?')) return;

  const data = getChallengeDataAdmin();
  if (!data || !data[currentQuizGrade]) return;

  const questions = data[currentQuizGrade].level3.questions;
  questions.splice(index, 1);

  if (saveChallengeDataAdmin(data)) {
    showDbToast('Soal berhasil dihapus!', 'success');
    renderQuizList();
  } else {
    showDbToast('Gagal menghapus soal!', 'error');
  }
};

// Reset quiz form
window.resetQuizForm = function() {
  document.getElementById('quiz-question').value = '';
  document.getElementById('quiz-option-a').value = '';
  document.getElementById('quiz-option-b').value = '';
  document.getElementById('quiz-option-c').value = '';
  document.getElementById('quiz-option-d').value = '';
  document.getElementById('quiz-correct').value = 'a';
  document.getElementById('quiz-edit-index').value = '-1';
  
  // Update preview
  updateQuizPreview();
};

// Toggle quiz encryption (placeholder for now)
window.toggleQuizEncryption = function() {
  const btn = document.getElementById('quiz-encrypt-text');
  if (btn.textContent === 'Aktifkan Enkripsi') {
    btn.textContent = 'Nonaktifkan Enkripsi';
    showDbToast('Enkripsi jawaban diaktifkan!', 'success');
  } else {
    btn.textContent = 'Aktifkan Enkripsi';
    showDbToast('Enkripsi jawaban dinonaktifkan!', 'success');
  }
};

// Update loadQuizGrade to use new render function
window.loadQuizGrade = function(grade) {
  console.log(`📝 Loading quiz for grade ${grade}...`);
  currentQuizGrade = grade;
  renderQuizList();
  
  // Setup preview listeners after content is loaded
  setTimeout(setupQuizPreviewListeners, 100);
};

// Setup event listeners for live preview
function setupQuizPreviewListeners() {
  const fields = [
    'quiz-question',
    'quiz-option-a',
    'quiz-option-b',
    'quiz-option-c',
    'quiz-option-d',
    'quiz-correct'
  ];

  fields.forEach(fieldId => {
    const element = document.getElementById(fieldId);
    if (element) {
      element.addEventListener('input', updateQuizPreview);
      element.addEventListener('change', updateQuizPreview);
    }
  });

  // Initial preview
  updateQuizPreview();
}

// Update quiz preview in real-time
function updateQuizPreview() {
  const previewContent = document.getElementById('quiz-preview-content');
  if (!previewContent) return;

  const question = document.getElementById('quiz-question')?.value.trim() || '';
  const optionA = document.getElementById('quiz-option-a')?.value.trim() || '';
  const optionB = document.getElementById('quiz-option-b')?.value.trim() || '';
  const optionC = document.getElementById('quiz-option-c')?.value.trim() || '';
  const optionD = document.getElementById('quiz-option-d')?.value.trim() || '';
  const correct = document.getElementById('quiz-correct')?.value || 'a';

  // If all fields are empty, show empty state
  if (!question && !optionA && !optionB && !optionC && !optionD) {
    previewContent.innerHTML = `
      <div class="empty-state" style="text-align: center; padding: 40px 20px;">
        <i class="fa-solid fa-wand-magic-sparkles" style="font-size: 3rem; color: #cbd5e1; margin-bottom: 16px;"></i>
        <h4 style="color: #64748b; margin-bottom: 8px;">Preview Soal</h4>
        <p style="color: #94a3b8; font-size: 0.9rem;">Isi form di sebelah kiri untuk melihat preview soal quiz</p>
      </div>
    `;
    
    // Reset parent container style
    previewContent.style.padding = '24px';
    previewContent.style.background = 'transparent';
    return;
  }

  const answerIndex = { a: 0, b: 1, c: 2, d: 3 }[correct];
  const options = [optionA, optionB, optionC, optionD];
  const correctLetter = correct.toUpperCase();

  // Set background gradient on parent
  previewContent.style.padding = '0';
  previewContent.style.background = 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)';

  previewContent.innerHTML = `
    <div style="padding: 24px;">
      <div style="background: white; border: 2px solid #bae6fd; border-radius: 16px; padding: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
        <div style="display: inline-block; background: #0284c7; color: white; padding: 5px 14px; border-radius: 99px; font-size: 0.8rem; font-weight: 700; margin-bottom: 16px; box-shadow: 0 3px 0 #0369a1;">
          <i class="fa-solid fa-eye"></i> Preview
        </div>
        
        <h4 style="color: #0c4a6e; font-size: 1.15rem; margin-bottom: 16px; line-height: 1.6; font-family: 'Fredoka', sans-serif;">
          ${question || '<span style="color: #94a3b8; font-style: italic;">Pertanyaan belum diisi...</span>'}
        </h4>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
          ${options.map((opt, i) => {
            const letter = String.fromCharCode(65 + i);
            const isCorrect = i === answerIndex;
            const isEmpty = !opt;
            
            return `
              <div style="padding: 12px 16px; background: ${isCorrect ? '#dcfce7' : '#f9fafb'}; border: 2px solid ${isCorrect ? '#10b981' : '#e0f2fe'}; border-radius: 12px; font-size: 0.95rem; transition: all 0.2s; ${isEmpty ? 'opacity: 0.5;' : ''}">
                <strong style="color: ${isCorrect ? '#10b981' : '#0284c7'}; font-family: 'Fredoka', sans-serif;">${letter}.</strong> 
                ${opt || `<span style="color: #cbd5e1; font-style: italic;">Pilihan ${letter}</span>`}
                ${isCorrect && opt ? '<i class="fa-solid fa-check-circle" style="color: #10b981; margin-left: 8px; float: right;"></i>' : ''}
              </div>
            `;
          }).join('')}
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 16px; border-top: 2px dashed #e0f2fe;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="background: #dcfce7; color: #10b981; padding: 6px 12px; border-radius: 99px; font-size: 0.85rem; font-weight: 700;">
              <i class="fa-solid fa-check-circle"></i> Jawaban Benar: ${correctLetter}
            </span>
          </div>
          <span style="background: #fef3c7; color: #d97706; padding: 6px 14px; border-radius: 99px; font-size: 0.85rem; font-weight: 700;">
            <i class="fa-solid fa-star"></i> 10 Poin
          </span>
        </div>
      </div>
    </div>
  `;
}

/* ==========================================================================
   CONVERSATION BUBBLE LIVE PREVIEW
   ========================================================================== */

// Setup event listeners for conversation bubble live preview
function setupConvBubblePreviewListeners() {
  const fields = ['conv-eng', 'conv-ind'];
  
  fields.forEach(fieldId => {
    const element = document.getElementById(fieldId);
    if (element) {
      element.addEventListener('input', updateConvBubblePreview);
      element.addEventListener('change', updateConvBubblePreview);
    }
  });

  // Listen to avatar selection
  document.querySelectorAll('input[name="conv-avatar"]').forEach(radio => {
    radio.addEventListener('change', updateConvBubblePreview);
  });

  // Listen to speaker selection
  const speakerSelect = document.getElementById('conv-speaker');
  if (speakerSelect) {
    speakerSelect.addEventListener('change', updateConvBubblePreview);
  }

  // Initial preview
  updateConvBubblePreview();
}

// Update conversation bubble preview in real-time
function updateConvBubblePreview() {
  const previewContent = document.getElementById('conv-bubble-preview');
  if (!previewContent) return;

  const eng = document.getElementById('conv-eng')?.value.trim() || '';
  const ind = document.getElementById('conv-ind')?.value.trim() || '';
  
  // Get selected avatar
  let avatar = '👤';
  const selectedAvatar = document.querySelector('input[name="conv-avatar"]:checked');
  if (selectedAvatar) {
    avatar = selectedAvatar.value;
  }

  // Get speaker type
  const speaker = document.getElementById('conv-speaker')?.value || 'male';
  const speakerIcon = speaker === 'male' ? '♂️' : '♀️';
  const speakerColor = speaker === 'male' ? '#3b82f6' : '#ec4899';

  // If all fields are empty, show empty state
  if (!eng && !ind) {
    previewContent.innerHTML = `
      <div class="empty-state" style="text-align: center; padding: 40px 20px;">
        <i class="fa-solid fa-comments" style="font-size: 3rem; color: #cbd5e1; margin-bottom: 16px;"></i>
        <h4 style="color: #64748b; margin-bottom: 8px;">Preview Bubble Chat</h4>
        <p style="color: #94a3b8; font-size: 0.9rem;">Isi form di sebelah kiri untuk melihat preview chat bubble</p>
      </div>
    `;
    return;
  }

  // Render bubble chat preview
  previewContent.innerHTML = `
    <div style="max-width: 600px; margin: 0 auto;">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px;">
        <span style="background: ${speakerColor}; color: white; padding: 4px 12px; border-radius: 99px; font-size: 0.75rem; font-weight: 700;">
          ${speakerIcon} ${speaker === 'male' ? 'Laki-laki' : 'Perempuan'}
        </span>
        <span style="background: #e0f2fe; color: #0284c7; padding: 4px 12px; border-radius: 99px; font-size: 0.75rem; font-weight: 700;">
          <i class="fa-solid fa-eye"></i> Preview
        </span>
      </div>

      <div class="chat-bubble left" style="display: flex; gap: 12px; align-items: flex-start; max-width: 100%;">
        <div class="chat-avatar" style="width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); font-size: 1.5rem; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3); flex-shrink: 0;">
          ${avatar}
        </div>
        <div class="chat-text-wrapper" style="background: white; padding: 16px 20px; border-radius: 20px; border-top-left-radius: 4px; max-width: calc(100% - 62px); box-shadow: 0 4px 12px rgba(0,0,0,0.08); border: 2px solid #e0f2fe; word-wrap: break-word; overflow-wrap: break-word;">
          <div class="chat-eng" style="font-size: 1.05rem; font-weight: 700; color: #0c4a6e; display: flex; align-items: flex-start; gap: 8px; margin-bottom: 6px; font-family: 'Fredoka', sans-serif; word-wrap: break-word; overflow-wrap: break-word;">
            <span style="flex: 1; word-break: break-word;">
              ${eng || '<span style="color: #cbd5e1; font-style: italic;">Teks bahasa Inggris...</span>'}
            </span>
            ${eng ? '<button style="background: transparent; border: none; color: #0284c7; cursor: pointer; font-size: 0.9rem; flex-shrink: 0; padding: 0; margin-top: 2px;"><i class="fa-solid fa-volume-high"></i></button>' : ''}
          </div>
          ${ind ? `<div class="chat-ind" style="font-size: 0.9rem; color: #64748b; font-style: italic; word-wrap: break-word; overflow-wrap: break-word; word-break: break-word;">${ind}</div>` : '<div style="font-size: 0.9rem; color: #cbd5e1; font-style: italic;">Terjemahan Indonesia...</div>'}
        </div>
      </div>

      <div style="margin-top: 12px; text-align: center;">
        <span style="background: #dcfce7; color: #10b981; padding: 6px 14px; border-radius: 99px; font-size: 0.8rem; font-weight: 700;">
          <i class="fa-solid fa-check-circle"></i> Bubble chat siap ditambahkan
        </span>
      </div>
    </div>
  `;
}
