/* ==========================================================================
   FUNLISH STUDIO - Video Chroma Keying Module
   Contains webcam streaming, requestAnimationFrame render loop, chroma key algorithms, and realtime filter overlays
   ========================================================================== */

let videoStream = null;
let isVideoProcessing = false;
let videoFrameRequest = null;
let videoBackgroundImage = null;
let videoWidth = 640;
let videoHeight = 480;
let lastFrameTime = 0;
let frameCount = 0;

function initVideoModule() {
  const fileInput = document.getElementById("video-file-input");
  const dropzone = document.getElementById("video-dropzone");
  const webcamBtn = document.getElementById("btn-video-webcam");
  const videoEl = document.getElementById("video-source-el");

  const chromaChk = document.getElementById("chk-chromakey");
  const bgSelect = document.getElementById("chroma-bg-select");
  const bgFileInput = document.getElementById("bg-image-input");
  const bgDropzone = document.getElementById("bg-image-dropzone");

  dropzone.addEventListener("click", () => fileInput.click());
  
  dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropzone.style.borderColor = "var(--color-primary)";
  });
  
  dropzone.addEventListener("dragleave", () => {
    dropzone.style.borderColor = "var(--border-color)";
  });
  
  dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropzone.style.borderColor = "var(--border-color)";
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      loadVideoFile(e.dataTransfer.files[0]);
    }
  });

  fileInput.addEventListener("change", (e) => {
    if (e.target.files && e.target.files[0]) {
      loadVideoFile(e.target.files[0]);
    }
  });

  webcamBtn.addEventListener("click", () => {
    stopVideo();
    navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 }, audio: false })
      .then((stream) => {
        videoStream = stream;
        videoEl.srcObject = stream;
        videoEl.play();
        
        document.getElementById("video-empty-message").classList.add("hide");
        document.getElementById("video-status-display").textContent = "Kamera Web Aktif";
        document.getElementById("video-status-display").className = "text-green";
        
        isVideoProcessing = true;
        videoFrameRequest = requestAnimationFrame(processVideoFrame);
      })
      .catch((err) => {
        alert("Gagal membuka webcam. Periksa izin kamera pada browser Anda.");
      });
  });

  chromaChk.addEventListener("change", () => {
    const group = document.querySelector(".chromakey-controls-group");
    if (chromaChk.checked) {
      group.classList.add("active");
      loadSelectedBackground();
    } else {
      group.classList.remove("active");
    }
  });

  bgSelect.addEventListener("change", () => {
    if (bgSelect.value === "custom") {
      bgDropzone.classList.remove("hide");
    } else {
      bgDropzone.classList.add("hide");
      loadSelectedBackground();
    }
  });

  bgDropzone.addEventListener("click", () => bgFileInput.click());
  bgFileInput.addEventListener("change", (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          videoBackgroundImage = img;
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  });

  document.getElementById("chroma-color-picker").addEventListener("input", (e) => {
    document.querySelector(".color-text-display").textContent = `${e.target.value.toUpperCase()}`;
  });
  document.getElementById("chroma-tolerance").addEventListener("input", (e) => {
    document.getElementById("val-chroma-tolerance").textContent = e.target.value;
  });
  document.getElementById("chroma-smoothness").addEventListener("input", (e) => {
    document.getElementById("val-chroma-smoothness").textContent = e.target.value;
  });
}

function loadVideoFile(file) {
  stopVideo();
  const videoEl = document.getElementById("video-source-el");
  const fileURL = URL.createObjectURL(file);
  videoEl.srcObject = null;
  videoEl.src = fileURL;
  videoEl.play();

  document.getElementById("video-empty-message").classList.add("hide");
  document.getElementById("video-status-display").textContent = "File Video Dimuat";
  document.getElementById("video-status-display").className = "text-green";
  
  isVideoProcessing = true;
  videoFrameRequest = requestAnimationFrame(processVideoFrame);
}

function loadSelectedBackground() {
  const bgType = document.getElementById("chroma-bg-select").value;
  if (bgType === "gradient") {
    videoBackgroundImage = "gradient";
  } 
  else if (bgType === "lab") {
    const img = new Image();
    img.src = "assets/images/sample.png"; // Loads sample image as background
    img.onload = () => {
      videoBackgroundImage = img;
    };
  }
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 57, g: 181, b: 74 };
}

function processVideoFrame(timestamp) {
  if (!isVideoProcessing) return;

  const videoEl = document.getElementById("video-source-el");
  const canvasProc = document.getElementById("video-canvas-processing");
  const canvasDisp = document.getElementById("video-canvas-display");
  
  if (videoEl.paused || videoEl.ended) {
    videoFrameRequest = requestAnimationFrame(processVideoFrame);
    return;
  }

  if (videoEl.videoWidth > 0 && canvasDisp.width !== videoEl.videoWidth) {
    videoWidth = videoEl.videoWidth;
    videoHeight = videoEl.videoHeight;
    canvasProc.width = videoWidth;
    canvasProc.height = videoHeight;
    canvasDisp.width = videoWidth;
    canvasDisp.height = videoHeight;
  }

  const ctxProc = canvasProc.getContext("2d");
  const ctxDisp = canvasDisp.getContext("2d");

  ctxProc.drawImage(videoEl, 0, 0, videoWidth, videoHeight);
  let frameData = ctxProc.getImageData(0, 0, videoWidth, videoHeight);
  
  const chromaActive = document.getElementById("chk-chromakey").checked;
  if (chromaActive) {
    frameData = applyVideoChromaKey(frameData);
  }

  const filterType = document.getElementById("video-filter-select").value;
  if (filterType !== "none") {
    frameData = applyVideoFilters(frameData, filterType);
  }

  if (chromaActive) {
    drawChromaBackground(ctxDisp);
    ctxProc.putImageData(frameData, 0, 0);
    ctxDisp.drawImage(canvasProc, 0, 0);
  } else {
    ctxDisp.putImageData(frameData, 0, 0);
  }

  calculateFPS(timestamp);
  videoFrameRequest = requestAnimationFrame(processVideoFrame);
}

function calculateFPS(timestamp) {
  if (!lastFrameTime) {
    lastFrameTime = timestamp;
    return;
  }
  frameCount++;
  const delta = timestamp - lastFrameTime;
  if (delta >= 1000) {
    const fps = Math.round((frameCount * 1000) / delta);
    document.getElementById("video-fps-display").textContent = `${fps} FPS`;
    frameCount = 0;
    lastFrameTime = timestamp;
  }
}

function applyVideoChromaKey(imgData) {
  const data = imgData.data;
  const len = data.length;

  const targetHex = document.getElementById("chroma-color-picker").value;
  const targetRGB = hexToRgb(targetHex);
  const tolerance = parseInt(document.getElementById("chroma-tolerance").value);
  const smoothness = parseInt(document.getElementById("chroma-smoothness").value);

  for (let i = 0; i < len; i += 4) {
    const rDiff = data[i] - targetRGB.r;
    const gDiff = data[i+1] - targetRGB.g;
    const bDiff = data[i+2] - targetRGB.b;
    const distance = Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);

    if (distance < tolerance) {
      data[i+3] = 0;
    } 
    else if (distance < tolerance + smoothness) {
      const alphaVal = ((distance - tolerance) / smoothness) * 255;
      data[i+3] = Math.min(data[i+3], alphaVal);
    }
  }
  return imgData;
}

function drawChromaBackground(ctx) {
  if (videoBackgroundImage === "gradient" || !videoBackgroundImage) {
    const grad = ctx.createLinearGradient(0, 0, videoWidth, videoHeight);
    grad.addColorStop(0, "#111827");
    grad.addColorStop(1, "#311042");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, videoWidth, videoHeight);
    
    ctx.fillStyle = "rgba(6, 182, 212, 0.04)";
    ctx.beginPath();
    ctx.arc(videoWidth * 0.2, videoHeight * 0.3, 120, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(videoWidth * 0.8, videoHeight * 0.7, 180, 0, Math.PI * 2);
    ctx.fill();
  } 
  else {
    ctx.drawImage(videoBackgroundImage, 0, 0, videoWidth, videoHeight);
  }
}

function applyVideoFilters(imgData, type) {
  const data = imgData.data;
  const len = data.length;

  if (type === "grayscale") {
    for (let i = 0; i < len; i += 4) {
      if (data[i+3] === 0) continue;
      const gray = 0.299 * data[i] + 0.587 * data[i+1] + 0.114 * data[i+2];
      data[i] = data[i+1] = data[i+2] = gray;
    }
  } 
  else if (type === "sepia") {
    for (let i = 0; i < len; i += 4) {
      if (data[i+3] === 0) continue;
      const r = data[i], g = data[i+1], b = data[i+2];
      data[i]     = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
      data[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
      data[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
    }
  } 
  else if (type === "invert") {
    for (let i = 0; i < len; i += 4) {
      if (data[i+3] === 0) continue;
      data[i]   = 255 - data[i];
      data[i+1] = 255 - data[i+1];
      data[i+2] = 255 - data[i+2];
    }
  } 
  else if (type === "sobel") {
    // Uses global applySobelFilter function defined in lab-image.js
    if (typeof applySobelFilter !== "undefined") {
      return applySobelFilter(imgData);
    }
  }
  return imgData;
}

function stopVideo() {
  isVideoProcessing = false;
  if (videoFrameRequest) {
    cancelAnimationFrame(videoFrameRequest);
    videoFrameRequest = null;
  }
  if (videoStream) {
    videoStream.getTracks().forEach(track => track.stop());
    videoStream = null;
  }
  const videoEl = document.getElementById("video-source-el");
  videoEl.pause();
  videoEl.srcObject = null;
  videoEl.src = "";
  
  document.getElementById("video-empty-message").classList.remove("hide");
  document.getElementById("video-status-display").textContent = "Kamera Nonaktif";
  document.getElementById("video-status-display").className = "text-secondary";
  document.getElementById("video-fps-display").textContent = "0 FPS";
  
  const canvasDisp = document.getElementById("video-canvas-display");
  const ctx = canvasDisp.getContext("2d");
  ctx.clearRect(0, 0, canvasDisp.width, canvasDisp.height);
}
