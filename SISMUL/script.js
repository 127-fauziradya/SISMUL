// MENU TOGGLE

const menuBtn = document.querySelector(".menu-btn");
const menuOverlay = document.querySelector(".menu-overlay");
const closeMenu = document.querySelector(".close-menu");

menuBtn.addEventListener("click", () => {
  menuOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
});

closeMenu.addEventListener("click", () => {
  menuOverlay.classList.remove("active");
  document.body.style.overflow = "auto";
});


// CLASS MODAL TOGGLE

const bookIcon = document.querySelector(".nav-right i");
const classModal = document.querySelector(".class-modal");
const closeModal = document.querySelector(".close-modal");

bookIcon.addEventListener("click", () => {
  classModal.classList.add("active");
  document.body.style.overflow = "hidden";
});

closeModal.addEventListener("click", () => {
  classModal.classList.remove("active");
  document.body.style.overflow = "auto";
});

// Close modal when clicking outside
classModal.addEventListener("click", (e) => {
  if(e.target === classModal){
    classModal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// Class option click
const classOptions = document.querySelectorAll(".class-option");

classOptions.forEach((option) => {
  option.addEventListener("click", () => {
    const classNumber = option.getAttribute("data-class");
    alert(`Opening Grade ${classNumber} class 🚀`);
    classModal.classList.remove("active");
    document.body.style.overflow = "auto";
  });
});


// ANIMASI SAAT SCROLL

const cards = document.querySelectorAll(
  ".kelas-card, .materi-card"
);

window.addEventListener("scroll", () => {

  cards.forEach((card) => {

    const cardTop = card.getBoundingClientRect().top;

    if(cardTop < window.innerHeight - 100){
      card.classList.add("show");
    }

  });

});


// EFFECT BUTTON

const buttons = document.querySelectorAll(".kelas-btn");

buttons.forEach((btn) => {

  btn.addEventListener("click", () => {

    alert("Halaman kelas akan dibuka 🚀");

  });

});