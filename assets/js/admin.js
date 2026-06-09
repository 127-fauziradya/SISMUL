// 1. Session Login Security Guard (Redirect immediately if not logged in)
if (sessionStorage.getItem("funlish_admin_logged_in") !== "true") {
  window.location.href = "login.html?redirect=admin.html";
}


// Admin Logout Action
window.adminLogout = function() {
  if (confirm("Apakah Anda yakin ingin keluar dari Dashboard Admin?")) {
    sessionStorage.removeItem("funlish_admin_logged_in");
    window.location.href = "login.html";
  }
};

.6document.addEventListener("DOMContentLoaded", async () => {
  try {
    // 1. Load components dynamically
    await Promise.all([
      loadComponent("navbar-container", "components/navbar.html"),
      loadComponent("admin-dashboard-content", "components/teacher-portal.html"),
      loadComponent("footer-container", "components/footer.html"),
      loadComponent("audio-auth-overlay", "components/audio-auth-modal.html")
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
    initDatabaseModule();
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
  }

  // Stop video/audio processes if navigating away
  if (tabId !== "audio" && typeof stopAudio === "function") stopAudio();
  if (tabId !== "video" && typeof stopVideo === "function") stopVideo();
}

// Dashboard cards use this public lab-specific name.
window.switchLabTab = switchAdminTab;

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
};

function renderVocabList() {
  const container = document.getElementById('vocab-list-container');
  if (!container) return;
  
  const data = getChallengeDataAdmin();
  if (!data || !data[currentVocabGrade]) {
    container.innerHTML = '<div class="info-box error">Data tidak ditemukan!</div>';
    return;
  }
  
  const items = data[currentVocabGrade].level1.items;
  const countBadge = document.getElementById('vocab-count-badge');
  if (countBadge) countBadge.textContent = `${items.length} Items`;
  
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
        <div style="display: flex; gap: 6px; margin-top: 12px; justify-content: center; flex-wrap: wrap;">
          <button class="btn btn-secondary btn-sm" onclick="editVocabItem(${index})">
            <i class="fa-solid fa-edit"></i>
          </button>
          <button class="btn btn-danger btn-sm" onclick="deleteVocabItem(${index})">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    `;
  });
  html += '</div>';
  
  container.innerHTML = html;
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
    alert('Mohon lengkapi kata Bahasa Inggris dan Terjemahan!');
    return;
  }
  
  const data = getChallengeDataAdmin();
  if (!data || !data[currentVocabGrade]) return;
  
  let item = { eng, ind };
  
  if (type === 'emoji') {
    const selectedEmoji = document.querySelector('input[name="vocab-emoji"]:checked');
    if (!selectedEmoji) {
      alert('Mohon pilih emoji untuk mode Emoji!');
      return;
    }
    item.emoji = selectedEmoji.value;
    item.imageData = null; // Clear image data if switching back to emoji
  } else {
    // Image mode - save the processed canvas image as base64
    const canvasDisplay = document.getElementById('vocab-canvas-display');
    if (!canvasDisplay || !vocabCurrentImageState) {
      alert('Mohon upload gambar terlebih dahulu!');
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
    alert('Masukkan kata bahasa Inggris terlebih dahulu!');
    return;
  }
  speakEnglish(eng);
};

// ══════════════════════════════════════════════════════════════════════════
// CONVERSATION MANAGEMENT FUNCTIONS
// ══════════════════════════════════════════════════════════════════════════

window.loadConvGrade = function(grade) {
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
};

function renderConvPreview() {
  const container = document.getElementById('conv-preview-container');
  if (!container) return;
  
  const data = getChallengeDataAdmin();
  if (!data || !data[currentConvGrade]) {
    container.innerHTML = '<div class="info-box error">Data tidak ditemukan!</div>';
    return;
  }
  
  const items = data[currentConvGrade].level2.items;
  const countBadge = document.getElementById('conv-count-badge');
  if (countBadge) countBadge.textContent = `${items.length} Bubbles`;
  
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
    alert('⚠️ Teks Bahasa Inggris belum diisi!');
    document.getElementById('conv-eng').focus();
    return;
  }
  
  if (!ind) {
    alert('⚠️ Terjemahan Indonesia belum diisi!');
    document.getElementById('conv-ind').focus();
    return;
  }
  
  if (!selectedAvatar) {
    alert('⚠️ Avatar Emoji belum dipilih!\n\nPilih salah satu emoji dari grid yang tersedia.');
    return;
  }
  
  const avatar = selectedAvatar.value;
  
  const data = getChallengeDataAdmin();
  if (!data || !data[currentConvGrade]) {
    alert('❌ Error: Data tidak ditemukan untuk kelas ini!');
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
};

window.testConvSpeech = function() {
  const eng = document.getElementById('conv-eng').value.trim();
  if (!eng) {
    alert('Masukkan teks bahasa Inggris terlebih dahulu!');
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
    alert('Upload gambar terlebih dahulu!');
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
    alert('Upload gambar terlebih dahulu!');
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
    alert('Upload gambar terlebih dahulu!');
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
    alert('Masukkan teks terlebih dahulu!');
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
    alert('Masukkan teks terlebih dahulu!');
    return;
  }
  
  showDbToast('Huffman compression simulated', 'success');
  const compressed = `[Huffman Binary: ${text.length * 8} bits → ${Math.floor(text.length * 5.5)} bits]`;
  showConvTextResult(compressed, text.length, compressed.length);
};

window.encryptConvTextXOR = function() {
  const text = document.getElementById('conv-eng').value;
  if (!text) {
    alert('Masukkan teks terlebih dahulu!');
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
    alert("Browser Anda tidak mendukung sintesis suara pelafalan.");
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
