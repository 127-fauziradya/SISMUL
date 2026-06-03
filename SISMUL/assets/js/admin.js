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
    
    // Replace Admin button with Logout button in Admin mode navbar
    const portalSwitcher = document.querySelector(".portal-switcher");
    if (portalSwitcher) {
      portalSwitcher.innerHTML = `
        <button class="btn-switch teacher" onclick="adminLogout()" style="background-color: #ef4444; color: white; border: none; display: inline-flex; align-items: center; gap: 6px; cursor: pointer; text-decoration: none; font-size: 0.9rem; padding: 10px 18px; border-radius: 99px; font-family: inherit; font-weight: 700;">
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
