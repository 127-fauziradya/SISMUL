/* ==========================================================================
   FUNLISH - Level-Based Challenge Engine
   Manages Level 1 (Vocab Cards), Level 2 (Dialogues), and Level 3 (Dynamic Quiz)
   ========================================================================== */

// Global state variables
window.currentSelectedGrade = null;
window.currentSelectedLevel = null;
window.currentLevelQuestions = [];

// Fallback HTML Templates for Offline / Local file:/// CORS blockages
const LEVEL_SELECT_TEMPLATE = `
<div class="level-select-container">
  <div class="level-select-header">
    <button class="btn-back-grade" onclick="goBackToGrades()">
      <i class="fa-solid fa-arrow-left"></i> Kembali ke Pilihan Kelas
    </button>
    <div class="grade-title-banner">
      <span class="level-badge-main" id="selected-grade-badge">Kelas 3 SD</span>
      <h2 id="selected-grade-title">Pilih Petualangan Belajar Kamu</h2>
      <p>Setiap level memiliki tantangan seru yang berbeda. Selesaikan semuanya untuk menguji kemampuanmu!</p>
    </div>
  </div>

  <div class="level-cards-grid">
    <!-- Level 1 Card -->
    <article class="level-card level-easy" onclick="startLevel(1)">
      <div class="level-card-icon"><i class="fa-solid fa-star"></i></div>
      <div class="level-info">
        <span class="level-tag">LEVEL 1 - MUDAH</span>
        <h3>Vocabulary Explorer</h3>
        <p>Pelajari kosakata dasar menggunakan kartu bergambar interaktif dan dengarkan pelafalan bahasa Inggris yang benar!</p>
      </div>
      <span class="btn-level-action">Mulai Eksplorasi <i class="fa-solid fa-play"></i></span>
    </article>

    <!-- Level 2 Card -->
    <article class="level-card level-medium" onclick="startLevel(2)">
      <div class="level-card-icon"><i class="fa-solid fa-star-half-stroke"></i></div>
      <div class="level-info">
        <span class="level-tag">LEVEL 2 - SEDANG</span>
        <h3>Conversation Builder</h3>
        <p>Latih pemahaman kalimat percakapan sehari-hari melalui dialog gelembung bersuara interaktif!</p>
      </div>
      <span class="btn-level-action">Mulai Dialog <i class="fa-solid fa-play"></i></span>
    </article>

    <!-- Level 3 Card -->
    <article class="level-card level-hard" onclick="startLevel(3)">
      <div class="level-card-icon"><i class="fa-solid fa-trophy"></i></div>
      <div class="level-info">
        <span class="level-tag">LEVEL 3 - SUSAH</span>
        <h3>Dynamic Quest Quiz</h3>
        <p>Tantangan Kuis Pilihan Ganda! Soal-soal kuis diacak otomatis dari bank soal sehingga kuis selalu diperbarui.</p>
      </div>
      <span class="btn-level-action">Mulai Kuis <i class="fa-solid fa-gamepad"></i></span>
    </article>
  </div>
</div>
`;

const CHALLENGE_AREA_TEMPLATE = `
<div class="challenge-area-container">
  <div class="challenge-area-header">
    <button class="btn-back-level" onclick="goBackToLevels()">
      <i class="fa-solid fa-arrow-left"></i> Kembali ke Menu Level
    </button>
    <div class="challenge-title-banner">
      <span class="challenge-level-badge" id="challenge-level-badge">Level 1 - Easy</span>
      <h2 id="challenge-title">Petualangan Kosakata</h2>
      <p id="challenge-desc">Klik kartu kosakata untuk melatih ejaan kata dan mendengarkan cara pengucapannya!</p>
    </div>
  </div>

  <div class="challenge-body card">
    <!-- Vocab Explorer Panel (Level 1) -->
    <div id="vocab-view" class="challenge-view-panel hide">
      <div class="vocab-grid-header">
        <h3><i class="fa-solid fa-volume-high"></i> Klik Kartu Untuk Pengucapan Audio (Web Speech Pronunciation):</h3>
      </div>
      <div class="vocab-grid" id="challenge-vocab-grid">
        <!-- Filled by student-challenges.js -->
      </div>
    </div>

    <!-- Dialog / Conversation Panel (Level 2) -->
    <div id="dialog-view" class="challenge-view-panel hide">
      <div class="dialog-header-info">
        <h3><i class="fa-solid fa-comments"></i> Klik Tombol Volume Untuk Mendengarkan Suara Karakter:</h3>
      </div>
      <div class="dialog-chat-container" id="challenge-dialog-container">
        <!-- Filled by student-challenges.js -->
      </div>
    </div>

    <!-- Dynamic Quest Quiz Panel (Level 3) -->
    <div id="quiz-view" class="challenge-view-panel hide">
      <div class="quiz-header-info">
        <h3><i class="fa-solid fa-gamepad"></i> Jawab 5 Soal Pilihan Ganda Berikut:</h3>
      </div>
      
      <div class="quiz-question-box" id="challenge-quiz-container">
        <!-- Filled dynamically by student-challenges.js with 5 randomized questions -->
      </div>
      
      <div class="quiz-actions">
        <button class="btn-playful primary-playful" id="btn-challenge-submit-quiz" onclick="submitLevelQuiz()">
          Kirim Jawaban <i class="fa-solid fa-paper-plane"></i>
        </button>
        <button class="btn-playful accent-playful" id="btn-challenge-reshuffle-quiz" onclick="reshuffleLevelQuiz()">
          Acak Soal Baru <i class="fa-solid fa-shuffle"></i>
        </button>
      </div>

      <!-- Quiz Result Alert Box -->
      <div class="quiz-result-alert hide" id="challenge-quiz-result">
        <div class="result-icon-wrapper">
          <i class="fa-solid fa-trophy result-icon"></i>
        </div>
        <div class="result-text-block">
          <h4 id="challenge-quiz-result-score">Skor Kamu: 100 / 100</h4>
          <p id="challenge-quiz-result-feedback">Luar biasa! Semua jawabanmu benar. Kamu hebat sekali!</p>
        </div>
        <div class="result-actions">
          <button class="btn-playful btn-retry" onclick="retryLevelQuiz()">
            Ulangi Kuis <i class="fa-solid fa-arrows-rotate"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
`;

// Helper to safely get challengeData from either localStorage, window, or global scope
function getChallengeData() {
  const stored = localStorage.getItem("funlish_challenge_data");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error("Gagal memuat kuis dari localStorage", e);
    }
  }
  return window.challengeData || (typeof challengeData !== 'undefined' ? challengeData : null);
}

// Called when a student clicks on a Grade Card in the portal
async function loadStudentGrade(grade) {
  window.currentSelectedGrade = grade;
  
  const panel = document.getElementById("lesson-panel-siswa");
  if (!panel) return;

  // Make the panel visible and scroll to it
  panel.classList.remove("hide");
  panel.scrollIntoView({ behavior: "smooth", block: "start" });

  // Load the level-select.html component dynamically (with local fallback)
  try {
    let html;
    try {
      const response = await fetch("components/challenges/level-select.html");
      if (!response.ok) throw new Error("Fetch failed");
      html = await response.text();
    } catch (e) {
      console.warn("Menggunakan template level-select bawaan (Offline/CORS Mode)");
      html = LEVEL_SELECT_TEMPLATE;
    }

    panel.innerHTML = html;

    // Populate Grade Titles
    const badgeText = `Kelas ${grade} SD`;
    const gradeBadge = document.getElementById("selected-grade-badge");
    const gradeTitle = document.getElementById("selected-grade-title");
    
    const db = getChallengeData();
    if (gradeBadge) gradeBadge.textContent = badgeText;
    if (gradeTitle) {
      if (db && db[grade]) {
        gradeTitle.textContent = `Pilih Petualangan Belajar - ${db[grade].gradeLabel}`;
      } else {
        gradeTitle.textContent = `Pilih Petualangan Belajar - ${badgeText}`;
      }
    }
  } catch (error) {
    console.error("Error loading level selection:", error);
    panel.innerHTML = `<div class="error-box">Gagal memuat pilihan level. Silakan coba lagi.</div>`;
  }
}

// Return from Level Selection back to Grade Grid
function goBackToGrades() {
  const panel = document.getElementById("lesson-panel-siswa");
  if (panel) {
    panel.classList.add("hide");
  }
  const gradeSection = document.getElementById("kelas");
  if (gradeSection) {
    gradeSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// Return from Challenge Area back to Level Selection
function goBackToLevels() {
  if (window.currentSelectedGrade) {
    loadStudentGrade(window.currentSelectedGrade);
  }
}

// Load and start a specific level challenge
async function startLevel(level) {
  window.currentSelectedLevel = level;
  const grade = window.currentSelectedGrade;
  const panel = document.getElementById("lesson-panel-siswa");
  if (!panel || !grade) return;

  try {
    let html;
    try {
      const response = await fetch("components/challenges/challenge-area.html");
      if (!response.ok) throw new Error("Fetch failed");
      html = await response.text();
    } catch (e) {
      console.warn("Menggunakan template challenge-area bawaan (Offline/CORS Mode)");
      html = CHALLENGE_AREA_TEMPLATE;
    }

    panel.innerHTML = html;

    const db = getChallengeData();
    if (!db) {
      throw new Error("Data pelajaran (challengeData) tidak ditemukan!");
    }
    const data = db[grade];
    if (!data) return;

    // Get DOM elements in challenge-area
    const levelBadge = document.getElementById("challenge-level-badge");
    const levelTitle = document.getElementById("challenge-title");
    const levelDesc = document.getElementById("challenge-desc");
    
    const vocabView = document.getElementById("vocab-view");
    const dialogView = document.getElementById("dialog-view");
    const quizView = document.getElementById("quiz-view");

    // Clear and hide all panels first
    vocabView.classList.add("hide");
    dialogView.classList.add("hide");
    quizView.classList.add("hide");

    if (level === 1) {
      // Level 1: Vocabulary Explorer
      levelBadge.textContent = "Level 1 - Easy (Mudah)";
      levelBadge.className = "challenge-level-badge badge-easy";
      levelTitle.textContent = data.level1.title;
      levelDesc.textContent = data.level1.desc;

      const vocabGrid = document.getElementById("challenge-vocab-grid");
      vocabGrid.innerHTML = "";
      
      data.level1.items.forEach(item => {
        const card = document.createElement("div");
        card.className = "vocab-card";
        card.onclick = () => speakEnglish(item.eng);
        card.innerHTML = `
          <span class="vocab-sound-icon"><i class="fa-solid fa-volume-high"></i></span>
          <div class="vocab-icon">${item.emoji}</div>
          <div class="vocab-eng">${item.eng}</div>
          <div class="vocab-ind">${item.ind}</div>
        `;
        vocabGrid.appendChild(card);
      });

      vocabView.classList.remove("hide");
    } else if (level === 2) {
      // Level 2: Conversation Builder
      levelBadge.textContent = "Level 2 - Medium (Sedang)";
      levelBadge.className = "challenge-level-badge badge-medium";
      levelTitle.textContent = data.level2.title;
      levelDesc.textContent = data.level2.desc;

      const dialogContainer = document.getElementById("challenge-dialog-container");
      dialogContainer.innerHTML = "";

      data.level2.items.forEach(bubble => {
        const chat = document.createElement("div");
        chat.className = `chat-bubble ${bubble.side}`;
        chat.innerHTML = `
          <div class="chat-avatar">${bubble.avatar}</div>
          <div class="chat-text-wrapper">
            <div class="chat-eng">
              <span>${bubble.eng}</span>
              <button class="chat-speech-btn" onclick="speakEnglish('${bubble.eng.replace(/'/g, "\\'")}')" title="Dengarkan Suara">
                <i class="fa-solid fa-volume-high"></i>
              </button>
            </div>
            <div class="chat-ind">${bubble.ind}</div>
          </div>
        `;
        dialogContainer.appendChild(chat);
      });

      dialogView.classList.remove("hide");
    } else if (level === 3) {
      // Level 3: Dynamic Quest Quiz
      levelBadge.textContent = "Level 3 - Hard (Susah)";
      levelBadge.className = "challenge-level-badge badge-hard";
      levelTitle.textContent = data.level3.title;
      levelDesc.textContent = data.level3.desc;

      // Draw 5 dynamic random questions
      window.currentLevelQuestions = getRandomQuestions(grade);
      renderQuizQuestions();

      quizView.classList.remove("hide");
    }

    panel.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    console.error("Error starting level:", error);
    panel.innerHTML = `<div class="error-box">Gagal memuat materi level. Silakan coba lagi.</div>`;
  }
}

// Fisher-Yates Shuffling to select 5 random questions from the 15 questions bank
function getRandomQuestions(grade) {
  const db = getChallengeData();
  if (!db || !db[grade] || !db[grade].level3) return [];
  const bank = db[grade].level3.questions;
  const shuffled = [...bank];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, 5);
}

// Renders the chosen 5 questions into the container
function renderQuizQuestions() {
  const container = document.getElementById("challenge-quiz-container");
  if (!container) return;
  container.innerHTML = "";

  window.currentLevelQuestions.forEach((q, index) => {
    const quizItem = document.createElement("div");
    quizItem.className = "quiz-item";

    let optionsHTML = "";
    q.options.forEach(opt => {
      optionsHTML += `
        <label class="quiz-option-label">
          <input type="radio" name="challenge-q-${index}" value="${opt}" />
          <span>${opt}</span>
        </label>
      `;
    });

    quizItem.innerHTML = `
      <h4>${index + 1}. ${q.question}</h4>
      <div class="quiz-options">
        ${optionsHTML}
      </div>
    `;
    container.appendChild(quizItem);
  });

  // Reset submit button and overlay visibility
  const submitBtn = document.getElementById("btn-challenge-submit-quiz");
  const reshuffleBtn = document.getElementById("btn-challenge-reshuffle-quiz");
  const resultAlert = document.getElementById("challenge-quiz-result");

  if (submitBtn) submitBtn.classList.remove("hide");
  if (reshuffleBtn) reshuffleBtn.classList.remove("hide");
  if (resultAlert) resultAlert.classList.add("hide");
}

// Submits quiz and calculates score
function submitLevelQuiz() {
  let score = 0;
  let allAnswered = true;

  window.currentLevelQuestions.forEach((q, index) => {
    const selected = document.querySelector(`input[name="challenge-q-${index}"]:checked`);
    if (!selected) {
      allAnswered = false;
      return;
    }
    if (selected.value === q.answer) {
      score += 20; // 5 questions, 20 points each = 100 points
    }
  });

  if (!allAnswered) {
    alert("Mohon jawab semua pertanyaan kuis terlebih dahulu!");
    return;
  }

  // Display results
  const resultAlert = document.getElementById("challenge-quiz-result");
  const scoreText = document.getElementById("challenge-quiz-result-score");
  const feedbackText = document.getElementById("challenge-quiz-result-feedback");
  const submitBtn = document.getElementById("btn-challenge-submit-quiz");
  const reshuffleBtn = document.getElementById("btn-challenge-reshuffle-quiz");

  if (scoreText) scoreText.textContent = `Skor Kamu: ${score} / 100`;

  if (feedbackText) {
    if (score === 100) {
      feedbackText.textContent = "Hebat sekali! Semua jawabanmu benar. Kamu telah menguasai tantangan ini!";
      playQuizWinSound();
    } else if (score >= 60) {
      feedbackText.textContent = "Bagus! Kamu sudah memahami sebagian besar materi. Pelajari lagi untuk nilai sempurna!";
    } else {
      feedbackText.textContent = "Ayo belajar lagi! Kamu bisa mengulangi level 1 & 2 untuk menguasai materinya.";
    }
  }

  if (submitBtn) submitBtn.classList.add("hide");
  if (reshuffleBtn) reshuffleBtn.classList.add("hide");
  if (resultAlert) {
    resultAlert.classList.remove("hide");
    resultAlert.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

// Reshuffle / randomise quiz questions and start fresh
function reshuffleLevelQuiz() {
  const grade = window.currentSelectedGrade;
  if (!grade) return;
  window.currentLevelQuestions = getRandomQuestions(grade);
  renderQuizQuestions();
}

// Retry quiz with the current level setup
function retryLevelQuiz() {
  reshuffleLevelQuiz();
}

// Shared browser speech synthesizer helper
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

// Retro chime arpeggio audio chord generator
function playQuizWinSound() {
  if (typeof audioContext === "undefined" || !audioContext) {
    try {
      window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      return;
    }
  }
  
  const ctx = window.audioContext;
  if (ctx.state === "suspended") {
    ctx.resume();
  }
  
  const now = ctx.currentTime;
  const melody = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5 (C Major Chord)
  
  melody.forEach((freq, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now + index * 0.08);
    
    gain.gain.setValueAtTime(0.1, now + index * 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.5);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now + index * 0.08);
    osc.stop(now + index * 0.08 + 0.6);
  });
}

// ==========================================================================
// Method Card Grade Selector Modal Logics
// ==========================================================================

window.targetMethodLevel = null;

// Opens grade selection overlay
window.openMethodGradeSelector = function(targetLevel) {
  window.targetMethodLevel = targetLevel;
  const modal = document.getElementById("method-grade-modal-overlay");
  if (modal) modal.classList.remove("hide");
};

// Closes grade selection overlay
window.closeMethodGradeModal = function() {
  const modal = document.getElementById("method-grade-modal-overlay");
  if (modal) modal.classList.add("hide");
};

// Selection of grade inside overlay -> loads grade challenges and immediately launches the target level
window.selectMethodGrade = async function(grade) {
  closeMethodGradeModal();
  
  // 1. Render and scroll to the level-select.html view
  await loadStudentGrade(grade);
  
  // 2. Immediately start the requested level (1 = Vocab, 2 = Conversation, 3 = Quiz)
  if (window.targetMethodLevel) {
    await startLevel(window.targetMethodLevel);
  }
};

