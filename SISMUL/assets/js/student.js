/* ==========================================================================
   FUNLISH - Student Portal Entry Point
   Legacy static data has been migrated to challenge-data.js and the dynamic
   rendering engine has been modularized in student-challenges.js.
   ========================================================================== */

// Student Portal Initialization & Hook Setup
document.addEventListener("DOMContentLoaded", () => {
  console.log("FUNLISH Student Portal initialized.");
  
  // Create or resume AudioContext on user interaction to satisfy browser policies
  const startAudioButton = document.getElementById("btn-audio-start");
  if (startAudioButton) {
    startAudioButton.addEventListener("click", () => {
      try {
        if (!window.audioContext) {
          window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (window.audioContext.state === "suspended") {
          window.audioContext.resume();
        }
        console.log("AudioContext activated successfully.");
        const overlay = document.getElementById("audio-auth-overlay");
        if (overlay) overlay.classList.add("hide");
      } catch (e) {
        console.error("Gagal mengaktifkan AudioContext:", e);
      }
    });
  }
});
