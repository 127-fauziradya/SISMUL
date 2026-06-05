/* ==========================================================================
   FUNLISH - Core Application Launcher (Student Portal & Translations)
   Manages component loading, bilingual translation state, and main navigation.
   ========================================================================== */

// Translation State Management (Default to Indonesian 'id')
window.currentLanguage = localStorage.getItem("funlish_app_lang") || "id";

document.addEventListener("DOMContentLoaded", async () => {
  // Load necessary HTML components asynchronously
  try {
    await Promise.all([
      loadComponent("navbar-container", "components/navbar.html"),
      loadComponent("portal-siswa-content", "components/student-portal.html"),
      loadComponent("footer-container", "components/footer.html"),
      loadComponent("audio-auth-overlay", "components/audio-auth-modal.html")
    ]);

    // Apply translations on load
    applyLanguageTranslations();
    setupStudentNavHighlighting();
    initNavbarToggle();

    // Hide the Admin portal switcher link from standard student landing page
    const switcher = document.querySelector(".portal-switcher");
    if (switcher) {
      switcher.style.display = "none";
    }
  } catch (error) {
    console.error("Critical error during application component initialization:", error);
  }
});

// Helper function to fetch and load HTML component partials
async function loadComponent(elementId, filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();
    const container = document.getElementById(elementId);
    if (container) {
      container.innerHTML = html;
    } else {
      console.warn(`Element target #${elementId} tidak ditemukan.`);
    }
  } catch (error) {
    console.error(`Gagal memuat komponen dari ${filePath}:`, error);
    throw error;
  }
}

// Translates all DOM elements containing [data-i18n]
function applyLanguageTranslations() {
  const lang = window.currentLanguage;
  const elements = document.querySelectorAll("[data-i18n]");
  
  elements.forEach(el => {
    const key = el.dataset.i18n;
    if (window.translations && window.translations[lang] && window.translations[lang][key]) {
      // If it has inputs or textareas, update placeholders
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.placeholder = window.translations[lang][key];
      } else {
        // Safe text replacement
        el.textContent = window.translations[lang][key];
      }
    }
  });

  // Highlight active language button in navbar
  const btnId = document.getElementById("btn-lang-id");
  const btnEn = document.getElementById("btn-lang-en");
  if (btnId && btnEn) {
    if (lang === "id") {
      btnId.classList.add("active");
      btnEn.classList.remove("active");
    } else {
      btnEn.classList.add("active");
      btnId.classList.remove("active");
    }
  }
}

// Public function exposed globally to switch language
window.setAppLanguage = function(lang) {
  window.currentLanguage = lang;
  localStorage.setItem("funlish_app_lang", lang);
  applyLanguageTranslations();
};

// Student Tab Scroll Highlight Setup
function setupStudentNavHighlighting() {
  const studentTabs = document.querySelectorAll("#student-nav .nav-tab");
  studentTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      studentTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
    });
  });
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

    // Close menu when clicking a navigation link
    const navLinks = menuWrapper.querySelectorAll(".nav-links a");
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        toggleBtn.classList.remove("open");
        menuWrapper.classList.remove("open");
      });
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
