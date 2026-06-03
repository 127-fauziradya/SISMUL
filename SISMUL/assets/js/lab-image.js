/* ==========================================================================
   FUNLISH STUDIO - Image Processing Module
   Contains convolution filters, LSB steganography, watermarking, & JPEG compression
   ========================================================================== */

let originalImage = null;
let currentImageState = null;
let originalFileSize = 0; // Bytes
let compressedImageURL = null;
let splitRatio = 0.5;
let isDraggingSplit = false;

function initImageModule() {
  const fileInput = document.getElementById("image-file-input");
  const dropzone = document.getElementById("image-dropzone");
  const sampleBtn = document.getElementById("btn-use-sample-image");
  const splitCompare = document.getElementById("split-compare-chk");
  
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
      loadImage(e.dataTransfer.files[0]);
    }
  });

  fileInput.addEventListener("change", (e) => {
    if (e.target.files && e.target.files[0]) {
      loadImage(e.target.files[0]);
    }
  });

  sampleBtn.addEventListener("click", () => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "assets/images/sample.png"; // Loads our generated premium cyber school image
    img.onload = () => {
      originalImage = img;
      originalFileSize = 240000;
      setupImageCanvases();
    };
    img.onerror = () => {
      alert("Gagal memuat gambar sampel. Pastikan berkas 'assets/images/sample.png' ada di direktori.");
    };
  });

  // Slider adjustments
  document.getElementById("slide-brightness").addEventListener("input", (e) => {
    document.getElementById("val-brightness").textContent = e.target.value;
    applyRealtimeBrightnessContrast();
  });

  document.getElementById("slide-contrast").addEventListener("input", (e) => {
    document.getElementById("val-contrast").textContent = e.target.value;
    applyRealtimeBrightnessContrast();
  });

  document.getElementById("wm-opacity").addEventListener("input", (e) => {
    document.getElementById("val-wm-opacity").textContent = e.target.value;
  });
  document.getElementById("wm-size").addEventListener("input", (e) => {
    document.getElementById("val-wm-size").textContent = `${e.target.value}px`;
  });
  document.getElementById("wm-rotation").addEventListener("input", (e) => {
    document.getElementById("val-wm-rotation").textContent = `${e.target.value}°`;
  });

  document.getElementById("comp-quality").addEventListener("input", (e) => {
    document.getElementById("val-comp-quality").textContent = `${e.target.value}%`;
  });
  document.getElementById("comp-scale").addEventListener("input", (e) => {
    document.getElementById("val-comp-scale").textContent = `${e.target.value}%`;
  });

  // Split slide bar
  const splitSliderBar = document.getElementById("split-slider-bar");
  const displayCanvas = document.getElementById("image-canvas-display");

  splitCompare.addEventListener("change", () => {
    if (splitCompare.checked) {
      splitSliderBar.classList.remove("hide");
      drawWithSplitCompare();
    } else {
      splitSliderBar.classList.add("hide");
      drawProcessedImageToDisplay();
    }
  });

  splitSliderBar.addEventListener("mousedown", () => { isDraggingSplit = true; });
  window.addEventListener("mouseup", () => { isDraggingSplit = false; });
  
  displayCanvas.parentElement.addEventListener("mousemove", (e) => {
    if (!isDraggingSplit && !splitCompare.checked) return;
    const rect = displayCanvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;
    
    splitRatio = x / rect.width;
    
    if (splitCompare.checked) {
      splitSliderBar.style.left = `${(splitRatio * 100)}%`;
      drawWithSplitCompare();
    }
  });
}

function loadImage(file) {
  originalFileSize = file.size;
  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.onload = () => {
      originalImage = img;
      setupImageCanvases();
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

function setupImageCanvases() {
  const canvasSource = document.getElementById("image-canvas-source");
  const canvasDisplay = document.getElementById("image-canvas-display");
  
  const maxDim = 800;
  let w = originalImage.width;
  let h = originalImage.height;
  
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

  const ctxSrc = canvasSource.getContext("2d");
  ctxSrc.drawImage(originalImage, 0, 0, w, h);

  currentImageState = ctxSrc.getImageData(0, 0, w, h);
  
  document.getElementById("img-empty-message").classList.add("hide");
  document.getElementById("image-meta-info").classList.remove("hide");
  document.getElementById("img-meta-dims").textContent = `Dimensi: ${originalImage.width}x${originalImage.height} px`;
  document.getElementById("img-meta-size").textContent = `Ukuran: ${(originalFileSize / 1024).toFixed(1)} KB`;
  document.getElementById("canvas-status-msg").textContent = "Gambar dimuat";
  
  drawProcessedImageToDisplay();
  resetImageSlidersAndUI();
}

function resetImageSlidersAndUI() {
  document.getElementById("slide-brightness").value = 0;
  document.getElementById("slide-contrast").value = 0;
  document.getElementById("val-brightness").textContent = "0";
  document.getElementById("val-contrast").textContent = "0";
  document.getElementById("split-compare-chk").checked = false;
  document.getElementById("split-slider-bar").classList.add("hide");
  document.getElementById("btn-download-stego").classList.add("hide");
  document.getElementById("stego-decode-result-box").classList.add("hide");
  document.getElementById("img-compress-result").classList.add("hide");
}

function drawProcessedImageToDisplay() {
  if (!currentImageState) return;
  const canvasDisplay = document.getElementById("image-canvas-display");
  const ctxDisp = canvasDisplay.getContext("2d");
  ctxDisp.putImageData(currentImageState, 0, 0);
}

function drawWithSplitCompare() {
  if (!originalImage || !currentImageState) return;
  const canvasSource = document.getElementById("image-canvas-source");
  const canvasDisplay = document.getElementById("image-canvas-display");
  
  const ctxDisp = canvasDisplay.getContext("2d");
  const w = canvasDisplay.width;
  const h = canvasDisplay.height;
  
  const splitX = Math.round(w * splitRatio);
  ctxDisp.putImageData(currentImageState, 0, 0);
  
  ctxDisp.save();
  ctxDisp.beginPath();
  ctxDisp.rect(0, 0, splitX, h);
  ctxDisp.clip();
  ctxDisp.drawImage(canvasSource, 0, 0);
  ctxDisp.restore();
}

function resetImageFilters() {
  if (!originalImage) return;
  const canvasSource = document.getElementById("image-canvas-source");
  const ctxSrc = canvasSource.getContext("2d");
  currentImageState = ctxSrc.getImageData(0, 0, canvasSource.width, canvasSource.height);
  
  document.getElementById("slide-brightness").value = 0;
  document.getElementById("slide-contrast").value = 0;
  document.getElementById("val-brightness").textContent = "0";
  document.getElementById("val-contrast").textContent = "0";

  if (document.getElementById("split-compare-chk").checked) {
    drawWithSplitCompare();
  } else {
    drawProcessedImageToDisplay();
  }
  document.getElementById("canvas-status-msg").textContent = "Filter direset";
}

function applyRealtimeBrightnessContrast() {
  if (!originalImage) return;
  const canvasSource = document.getElementById("image-canvas-source");
  const ctxSrc = canvasSource.getContext("2d");
  const w = canvasSource.width;
  const h = canvasSource.height;
  
  const origData = ctxSrc.getImageData(0, 0, w, h);
  const src = origData.data;
  
  const outData = ctxSrc.createImageData(w, h);
  const dst = outData.data;
  
  const brightness = parseInt(document.getElementById("slide-brightness").value);
  const contrast = parseInt(document.getElementById("slide-contrast").value);
  
  const f = (259 * (contrast + 255)) / (255 * (259 - contrast));
  
  for (let i = 0; i < src.length; i += 4) {
    dst[i]     = Math.min(255, Math.max(0, f * (src[i] - 128) + 128 + brightness));
    dst[i + 1] = Math.min(255, Math.max(0, f * (src[i + 1] - 128) + 128 + brightness));
    dst[i + 2] = Math.min(255, Math.max(0, f * (src[i + 2] - 128) + 128 + brightness));
    dst[i + 3] = src[i + 3];
  }
  
  currentImageState = outData;
  if (document.getElementById("split-compare-chk").checked) {
    drawWithSplitCompare();
  } else {
    drawProcessedImageToDisplay();
  }
}

function applyPresetFilter(type) {
  if (!originalImage) {
    alert("Muat gambar flashcard terlebih dahulu!");
    return;
  }

  const w = currentImageState.width;
  const h = currentImageState.height;
  const src = currentImageState.data;
  
  const canvasSource = document.getElementById("image-canvas-source");
  const ctxSrc = canvasSource.getContext("2d");
  const outData = ctxSrc.createImageData(w, h);
  const dst = outData.data;

  if (type === "grayscale") {
    for (let i = 0; i < src.length; i += 4) {
      const gray = 0.299 * src[i] + 0.587 * src[i+1] + 0.114 * src[i+2];
      dst[i] = dst[i+1] = dst[i+2] = gray;
      dst[i+3] = src[i+3];
    }
    currentImageState = outData;
  } 
  else if (type === "sepia") {
    for (let i = 0; i < src.length; i += 4) {
      const r = src[i], g = src[i+1], b = src[i+2];
      dst[i]     = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
      dst[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
      dst[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
      dst[i + 3] = src[i+3];
    }
    currentImageState = outData;
  } 
  else if (type === "invert") {
    for (let i = 0; i < src.length; i += 4) {
      dst[i]   = 255 - src[i];
      dst[i+1] = 255 - src[i+1];
      dst[i+2] = 255 - src[i+2];
      dst[i+3] = src[i+3];
    }
    currentImageState = outData;
  }
  else if (type === "blur") {
    const kernel = [
      1, 1, 1,
      1, 1, 1,
      1, 1, 1
    ];
    currentImageState = applyConvolution(currentImageState, kernel, 9, 0);
  }
  else if (type === "sharpen") {
    const kernel = [
       0, -1,  0,
      -1,  5, -1,
       0, -1,  0
    ];
    currentImageState = applyConvolution(currentImageState, kernel, 1, 0);
  }
  else if (type === "sobel") {
    currentImageState = applySobelFilter(currentImageState);
  }

  if (document.getElementById("split-compare-chk").checked) {
    drawWithSplitCompare();
  } else {
    drawProcessedImageToDisplay();
  }
  document.getElementById("canvas-status-msg").textContent = `Filter ${type} aktif`;
}

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
      dst[idx]     = Math.min(255, Math.max(0, r / divisor + offset));
      dst[idx + 1] = Math.min(255, Math.max(0, g / divisor + offset));
      dst[idx + 2] = Math.min(255, Math.max(0, b / divisor + offset));
      dst[idx + 3] = src[idx + 3];
    }
  }

  for (let i = 0; i < src.length; i++) {
    if (dst[i] === 0 && (i % 4 !== 3)) {
      const pixelIdx = Math.floor(i / 4) * 4;
      const x = (pixelIdx / 4) % w;
      const y = Math.floor((pixelIdx / 4) / w);
      if (x === 0 || x === w - 1 || y === 0 || y === h - 1) {
        dst[i] = src[i];
      }
    } else if (i % 4 === 3) {
      dst[i] = src[i];
    }
  }
  return new ImageData(dst, w, h);
}

function applySobelFilter(imgData) {
  const w = imgData.width;
  const h = imgData.height;
  const src = imgData.data;
  const dst = new Uint8ClampedArray(src.length);
  
  const kx = [
    -1, 0, 1,
    -2, 0, 2,
    -1, 0, 1
  ];
  const ky = [
    -1, -2, -1,
     0,  0,  0,
     1,  2,  1
  ];
  
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      let rx = 0, gx = 0, bx = 0;
      let ry = 0, gy = 0, by = 0;
      
      for (let kyOffset = -1; kyOffset <= 1; kyOffset++) {
        for (let kxOffset = -1; kxOffset <= 1; kxOffset++) {
          const pxIdx = ((y + kyOffset) * w + (x + kxOffset)) * 4;
          const kIdx = (kyOffset + 1) * 3 + (kxOffset + 1);
          
          rx += src[pxIdx] * kx[kIdx];
          gx += src[pxIdx + 1] * kx[kIdx];
          bx += src[pxIdx + 2] * kx[kIdx];
          
          ry += src[pxIdx] * ky[kIdx];
          gy += src[pxIdx + 1] * ky[kIdx];
          by += src[pxIdx + 2] * ky[kIdx];
        }
      }
      
      const rVal = Math.sqrt(rx * rx + ry * ry);
      const gVal = Math.sqrt(gx * gx + gy * gy);
      const bVal = Math.sqrt(bx * bx + by * by);
      
      const idx = (y * w + x) * 4;
      dst[idx]     = Math.min(255, rVal);
      dst[idx + 1] = Math.min(255, gVal);
      dst[idx + 2] = Math.min(255, bVal);
      dst[idx + 3] = 255;
    }
  }
  return new ImageData(dst, w, h);
}

// Steganography LSB
function encodeStego() {
  if (!originalImage) {
    alert("Unggah atau pilih gambar flashcard terlebih dahulu!");
    return;
  }
  
  const msgInput = document.getElementById("stego-message-input").value;
  if (!msgInput) {
    alert("Masukkan pesan kunci kuis terlebih dahulu!");
    return;
  }

  const canvasDisplay = document.getElementById("image-canvas-display");
  const ctx = canvasDisplay.getContext("2d");
  const imgData = ctx.getImageData(0, 0, canvasDisplay.width, canvasDisplay.height);
  const data = imgData.data;

  const msg = msgInput + "\0";
  
  const bits = [];
  for (let i = 0; i < msg.length; i++) {
    const code = msg.charCodeAt(i);
    for (let bit = 7; bit >= 0; bit--) {
      bits.push((code >> bit) & 1);
    }
  }

  if (bits.length > data.length / 4) {
    alert("Pesan terlalu panjang! Resolusi gambar tidak cukup.");
    return;
  }

  for (let i = 0; i < bits.length; i++) {
    const pixelIdx = i * 4; // Hide in Red Channel LSB
    data[pixelIdx] = (data[pixelIdx] & 0xFE) | bits[i];
  }

  ctx.putImageData(imgData, 0, 0);
  currentImageState = imgData;
  
  document.getElementById("btn-download-stego").classList.remove("hide");
  document.getElementById("canvas-status-msg").textContent = "Pesan disisipkan";
  alert("Pesan kunci berhasil disisipkan secara stego LSB! Klik 'Unduh Hasil (.PNG)' untuk mendownload gambar tanpa distorsi kompresi.");
}

function downloadStegoImage() {
  const canvasDisplay = document.getElementById("image-canvas-display");
  const link = document.createElement("a");
  link.download = "flashcard_stego.png";
  link.href = canvasDisplay.toDataURL("image/png");
  link.click();
}

function decodeStego() {
  if (!originalImage) {
    alert("Unggah gambar flashcard terlebih dahulu!");
    return;
  }

  const canvasDisplay = document.getElementById("image-canvas-display");
  const ctx = canvasDisplay.getContext("2d");
  const imgData = ctx.getImageData(0, 0, canvasDisplay.width, canvasDisplay.height);
  const data = imgData.data;

  let bitCounter = 0;
  let charVal = 0;
  let decodedString = "";
  const maxPixels = data.length / 4;

  for (let i = 0; i < maxPixels; i++) {
    const pixelIdx = i * 4;
    const lsb = data[pixelIdx] & 1;

    charVal = (charVal << 1) | lsb;
    bitCounter++;

    if (bitCounter === 8) {
      if (charVal === 0) break; // Null character reached
      decodedString += String.fromCharCode(charVal);
      charVal = 0;
      bitCounter = 0;
    }
  }

  const resultBox = document.getElementById("stego-decode-result-box");
  const resultDisplay = document.getElementById("stego-decoded-message");
  
  if (decodedString.length === 0) {
    resultDisplay.textContent = "(Tidak ditemukan data stego tersembunyi)";
    resultDisplay.className = "code-output text-red";
  } else {
    resultDisplay.textContent = decodedString;
    resultDisplay.className = "code-output text-green";
  }

  resultBox.classList.remove("hide");
  document.getElementById("canvas-status-msg").textContent = "LSB dekode selesai";
}

// Watermark Card
function applyWatermark() {
  if (!originalImage) {
    alert("Unggah gambar flashcard terlebih dahulu!");
    return;
  }

  const canvasDisplay = document.getElementById("image-canvas-display");
  const ctx = canvasDisplay.getContext("2d");
  const w = canvasDisplay.width;
  const h = canvasDisplay.height;

  ctx.putImageData(currentImageState, 0, 0);

  const text = document.getElementById("wm-text").value;
  const opacity = parseFloat(document.getElementById("wm-opacity").value);
  const size = parseInt(document.getElementById("wm-size").value);
  const rotation = parseInt(document.getElementById("wm-rotation").value);
  const position = document.getElementById("wm-position").value;

  ctx.save();
  ctx.font = `bold ${size}px 'Fredoka', sans-serif`;
  ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";

  if (position === "center") {
    ctx.translate(w / 2, h / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.fillText(text, 0, 0);
  } 
  else if (position === "top-left") {
    ctx.translate(w * 0.15, h * 0.15);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.fillText(text, 0, 0);
  } 
  else if (position === "top-right") {
    ctx.translate(w * 0.85, h * 0.15);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.fillText(text, 0, 0);
  } 
  else if (position === "bottom-left") {
    ctx.translate(w * 0.15, h * 0.85);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.fillText(text, 0, 0);
  } 
  else if (position === "bottom-right") {
    ctx.translate(w * 0.85, h * 0.85);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.fillText(text, 0, 0);
  } 
  else if (position === "repeat") {
    ctx.rotate((rotation * Math.PI) / 180);
    const spacing = Math.max(150, text.length * size * 0.5);
    for (let x = -w; x < w * 2; x += spacing) {
      for (let y = -h; y < h * 2; y += spacing) {
        ctx.fillText(text, x, y);
      }
    }
  }

  ctx.restore();
  currentImageState = ctx.getImageData(0, 0, w, h);
  document.getElementById("canvas-status-msg").textContent = "Watermark ditempel";
}

// JPEG Quality Compression
function compressImage() {
  if (!originalImage) {
    alert("Unggah gambar terlebih dahulu!");
    return;
  }

  const canvasDisplay = document.getElementById("image-canvas-display");
  const scale = parseInt(document.getElementById("comp-scale").value) / 100;
  const quality = parseInt(document.getElementById("comp-quality").value) / 100;

  const compCanvas = document.createElement("canvas");
  compCanvas.width = canvasDisplay.width * scale;
  compCanvas.height = canvasDisplay.height * scale;
  
  const ctx = compCanvas.getContext("2d");
  ctx.fillStyle = "#ffffff"; // Flashcards have white bg
  ctx.fillRect(0, 0, compCanvas.width, compCanvas.height);
  ctx.drawImage(canvasDisplay, 0, 0, compCanvas.width, compCanvas.height);

  compressedImageURL = compCanvas.toDataURL("image/jpeg", quality);

  const base64Len = compressedImageURL.length - 23;
  const compBytes = Math.round(base64Len * 0.75);

  const sizeOrigKB = originalFileSize / 1024;
  const sizeCompKB = compBytes / 1024;
  const ratio = ((1 - sizeCompKB / sizeOrigKB) * 100).toFixed(1);

  document.getElementById("img-orig-size-display").textContent = `${sizeOrigKB.toFixed(1)} KB`;
  document.getElementById("img-comp-size-display").textContent = `${sizeCompKB.toFixed(1)} KB`;
  
  const ratioEl = document.getElementById("img-compress-ratio");
  ratioEl.textContent = `${ratio}%`;
  ratioEl.className = parseFloat(ratio) < 0 ? "text-red" : "text-green";

  document.getElementById("img-compress-result").classList.remove("hide");
  document.getElementById("canvas-status-msg").textContent = "Kompresi JPEG selesai";
}

function downloadCompressedImage() {
  if (!compressedImageURL) return;
  const link = document.createElement("a");
  link.download = "compressed_flashcard.jpg";
  link.href = compressedImageURL;
  link.click();
}
