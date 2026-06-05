/* ==========================================================================
   FUNLISH STUDIO - Audio DSP Module
   Contains Web Audio Graph, biquad filters, downsampler (bitcrusher), watermark osc, and canvas FFT
   ========================================================================== */

let audioContext = null;
let audioBuffer = null;
let audioSourceNode = null;
let audioVolumeNode = null;
let audioFilterNode = null;
let audioCrushNode = null;
let watermarkOscNode = null;
let audioAnalyserNode = null;

let isAudioPlaying = false;
let audioStartTime = 0;
let audioElapsedOffset = 0;
let synthMelodyInterval = null;
let audioVisualRequest = null;

function initAudioModule() {
  const fileInput = document.getElementById("audio-file-input");
  const dropzone = document.getElementById("audio-dropzone");
  const synthBtn = document.getElementById("btn-use-synth-audio");
  
  const playBtn = document.getElementById("btn-audio-play");
  const pauseBtn = document.getElementById("btn-audio-pause");
  const stopBtn = document.getElementById("btn-audio-stop");
  const volumeSlider = document.getElementById("audio-volume");
  const speedSlider = document.getElementById("audio-speed");

  const filterTypeSelect = document.getElementById("audio-filter-type");
  const filterFreqSlider = document.getElementById("audio-filter-freq");
  const filterQSlider = document.getElementById("audio-filter-q");

  const crushChk = document.getElementById("chk-audio-crush");
  const watermarkChk = document.getElementById("chk-audio-watermark");

  document.getElementById("btn-activate-audio").addEventListener("click", () => {
    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContext = new AudioContext();
      document.getElementById("audio-auth-overlay").classList.remove("active");
      document.getElementById("audio-context-status").textContent = "Running";
      document.getElementById("audio-context-status").className = "text-green";
    } catch (e) {
      alert("Browser Anda tidak mendukung Web Audio API.");
    }
  });

  setTimeout(() => {
    if (!audioContext || audioContext.state === "suspended") {
      document.getElementById("audio-auth-overlay").classList.add("active");
    }
  }, 100);

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
      loadAudioFile(e.dataTransfer.files[0]);
    }
  });

  fileInput.addEventListener("change", (e) => {
    if (e.target.files && e.target.files[0]) {
      loadAudioFile(e.target.files[0]);
    }
  });

  synthBtn.addEventListener("click", () => {
    stopAudio();
    audioBuffer = "synth";
    document.getElementById("audio-meta-info").classList.remove("hide");
    document.getElementById("audio-meta-name").textContent = "File: (Sintetis) Pelafalan Kosakata Loop";
    document.getElementById("audio-meta-duration").textContent = "Durasi: ∞ Arpeggio";
    
    playBtn.disabled = false;
    stopBtn.disabled = false;
    document.getElementById("audio-time-display").textContent = "--:-- / --:--";
  });

  playBtn.addEventListener("click", () => {
    if (audioContext && audioContext.state === "suspended") {
      audioContext.resume();
    }
    playAudio();
  });
  
  pauseBtn.addEventListener("click", pauseAudio);
  stopBtn.addEventListener("click", stopAudio);

  volumeSlider.addEventListener("input", (e) => {
    const val = parseFloat(e.target.value);
    document.getElementById("val-audio-volume").textContent = `${Math.round(val * 100)}%`;
    if (audioVolumeNode) {
      audioVolumeNode.gain.setValueAtTime(val, audioContext.currentTime);
    }
  });

  speedSlider.addEventListener("input", (e) => {
    const val = parseFloat(e.target.value);
    document.getElementById("val-audio-speed").textContent = `${val.toFixed(1)}x`;
    if (audioSourceNode && audioBuffer !== "synth") {
      audioSourceNode.playbackRate.setValueAtTime(val, audioContext.currentTime);
    }
  });

  filterTypeSelect.addEventListener("change", (e) => {
    const type = e.target.value;
    const els = document.querySelectorAll(".filter-control-el");
    
    if (type === "none") {
      els.forEach(el => el.classList.add("hide"));
      if (audioFilterNode) audioFilterNode.type = "allpass";
    } else {
      els.forEach(el => el.classList.remove("hide"));
      if (audioFilterNode) {
        audioFilterNode.type = type;
        updateAudioFilterParameters();
      }
    }
  });

  filterFreqSlider.addEventListener("input", (e) => {
    document.getElementById("val-audio-filter-freq").textContent = `${e.target.value} Hz`;
    updateAudioFilterParameters();
  });

  filterQSlider.addEventListener("input", (e) => {
    document.getElementById("val-audio-filter-q").textContent = parseFloat(e.target.value).toFixed(1);
    updateAudioFilterParameters();
  });

  crushChk.addEventListener("change", () => {
    const els = document.querySelector(".crush-controls");
    if (crushChk.checked) {
      els.classList.add("active");
    } else {
      els.classList.remove("active");
    }
    updateAudioCrusherParameters();
  });

  document.getElementById("audio-crush-rate").addEventListener("input", (e) => {
    const val = parseFloat(e.target.value);
    document.getElementById("val-audio-crush-rate").textContent = `${(val / 1000).toFixed(1)} kHz`;
    updateAudioCrusherParameters();
  });

  document.getElementById("audio-crush-bits").addEventListener("input", (e) => {
    const val = parseInt(e.target.value);
    document.getElementById("val-audio-crush-bits").textContent = `${val}-bit`;
    updateAudioCrusherParameters();
  });

  watermarkChk.addEventListener("change", () => {
    const els = document.querySelector(".watermark-controls");
    if (watermarkChk.checked) {
      els.classList.add("active");
      injectWatermarkTone();
    } else {
      els.classList.remove("active");
      removeWatermarkTone();
    }
  });
}

function loadAudioFile(file) {
  stopAudio();
  document.getElementById("audio-meta-info").classList.remove("hide");
  document.getElementById("audio-meta-name").textContent = "Mengurai berkas vokal...";
  document.getElementById("audio-meta-duration").textContent = "";

  const reader = new FileReader();
  reader.onload = (e) => {
    audioContext.decodeAudioData(e.target.result, (decoded) => {
      audioBuffer = decoded;
      const durationMin = Math.floor(audioBuffer.duration / 60);
      const durationSec = Math.floor(audioBuffer.duration % 60).toString().padStart(2, "0");
      
      document.getElementById("audio-meta-name").textContent = `File: ${file.name}`;
      document.getElementById("audio-meta-duration").textContent = `Durasi: ${durationMin}:${durationSec} | Sampel: ${audioBuffer.sampleRate} Hz`;
      
      document.getElementById("btn-audio-play").disabled = false;
      document.getElementById("btn-audio-stop").disabled = false;
      document.getElementById("audio-time-display").textContent = `00:00 / ${durationMin}:${durationSec}`;
    }, (err) => {
      alert("Gagal membaca vokal audio. Gunakan format MP3/WAV.");
    });
  };
  reader.readAsArrayBuffer(file);
}

function updateAudioFilterParameters() {
  if (!audioFilterNode) return;
  const freq = parseFloat(document.getElementById("audio-filter-freq").value);
  const q = parseFloat(document.getElementById("audio-filter-q").value);
  audioFilterNode.frequency.setValueAtTime(freq, audioContext.currentTime);
  audioFilterNode.Q.setValueAtTime(q, audioContext.currentTime);
}

function updateAudioCrusherParameters() {
  if (!audioContext) return;
  const rate = parseFloat(document.getElementById("audio-crush-rate").value);
  const bits = parseInt(document.getElementById("audio-crush-bits").value);
  const compRatio = ((1 - (rate * bits) / (44100 * 16)) * 100).toFixed(1);
  document.getElementById("audio-compress-ratio").textContent = `${compRatio}%`;
}

function injectWatermarkTone() {
  if (!audioContext || !isAudioPlaying) return;
  watermarkOscNode = audioContext.createOscillator();
  const watermarkGain = audioContext.createGain();
  
  watermarkOscNode.type = "sine";
  watermarkOscNode.frequency.setValueAtTime(15000, audioContext.currentTime); // 15 kHz high watermark
  watermarkGain.gain.setValueAtTime(0.015, audioContext.currentTime);
  
  watermarkOscNode.connect(watermarkGain);
  watermarkGain.connect(audioAnalyserNode);
  watermarkOscNode.start(audioContext.currentTime);
}

function removeWatermarkTone() {
  if (watermarkOscNode) {
    try {
      watermarkOscNode.stop();
      watermarkOscNode.disconnect();
    } catch(e) {}
    watermarkOscNode = null;
  }
}

function buildAudioGraph() {
  audioVolumeNode = audioContext.createGain();
  audioFilterNode = audioContext.createBiquadFilter();
  audioAnalyserNode = audioContext.createAnalyser();
  audioAnalyserNode.fftSize = 512;

  const vol = parseFloat(document.getElementById("audio-volume").value);
  audioVolumeNode.gain.setValueAtTime(vol, audioContext.currentTime);

  const filterType = document.getElementById("audio-filter-type").value;
  audioFilterNode.type = filterType === "none" ? "allpass" : filterType;
  if (filterType !== "none") updateAudioFilterParameters();

  audioCrushNode = audioContext.createScriptProcessor(4096, 1, 1);
  audioCrushNode.onaudioprocess = function(e) {
    const input = e.inputBuffer.getChannelData(0);
    const output = e.outputBuffer.getChannelData(0);
    const active = document.getElementById("chk-audio-crush").checked;
    
    if (!active) {
      for (let i = 0; i < input.length; i++) output[i] = input[i];
      return;
    }

    const rate = parseFloat(document.getElementById("audio-crush-rate").value);
    const bits = parseInt(document.getElementById("audio-crush-bits").value);
    
    const step = 44100 / rate;
    const levels = Math.pow(2, bits);
    
    let phaser = 0;
    let lastVal = 0;

    for (let i = 0; i < input.length; i++) {
      phaser += 1;
      if (phaser >= step) {
        phaser -= step;
        lastVal = Math.round(input[i] * (levels / 2)) / (levels / 2);
      }
      output[i] = lastVal;
    }
  };

  audioFilterNode.connect(audioCrushNode);
  audioCrushNode.connect(audioVolumeNode);
  audioVolumeNode.connect(audioAnalyserNode);
  audioAnalyserNode.connect(audioContext.destination);
}

function playAudio() {
  if (!audioBuffer) {
    alert("Unggah file vokal pelajaran atau klik Audio Sintetis!");
    return;
  }
  if (isAudioPlaying) return;

  buildAudioGraph();

  if (audioBuffer === "synth") {
    isAudioPlaying = true;
    playSyntheticSequence();
    document.getElementById("btn-audio-play").disabled = true;
    document.getElementById("btn-audio-pause").disabled = true;
  } else {
    audioSourceNode = audioContext.createBufferSource();
    audioSourceNode.buffer = audioBuffer;
    audioSourceNode.connect(audioFilterNode);
    
    const speed = parseFloat(document.getElementById("audio-speed").value);
    audioSourceNode.playbackRate.setValueAtTime(speed, audioContext.currentTime);

    const startOffset = audioElapsedOffset;
    audioSourceNode.start(0, startOffset);
    audioStartTime = audioContext.currentTime;
    isAudioPlaying = true;

    document.getElementById("btn-audio-play").disabled = true;
    document.getElementById("btn-audio-pause").disabled = false;

    audioSourceNode.onended = () => {
      if (isAudioPlaying && audioContext.currentTime - audioStartTime >= (audioBuffer.duration - startOffset) / speed) {
        stopAudio();
      }
    };
  }

  if (document.getElementById("chk-audio-watermark").checked) {
    injectWatermarkTone();
  }
  drawAudioVisualizer();
}

function pauseAudio() {
  if (!isAudioPlaying || audioBuffer === "synth") return;
  isAudioPlaying = false;
  removeWatermarkTone();
  
  const speed = parseFloat(document.getElementById("audio-speed").value);
  audioElapsedOffset += (audioContext.currentTime - audioStartTime) * speed;
  
  if (audioSourceNode) {
    audioSourceNode.stop();
    audioSourceNode.disconnect();
  }
  document.getElementById("btn-audio-play").disabled = false;
  document.getElementById("btn-audio-pause").disabled = true;
}

function stopAudio() {
  isAudioPlaying = false;
  audioElapsedOffset = 0;
  removeWatermarkTone();

  if (audioSourceNode) {
    try { audioSourceNode.stop(); } catch(e) {}
    audioSourceNode.disconnect();
    audioSourceNode = null;
  }
  if (synthMelodyInterval) {
    clearInterval(synthMelodyInterval);
    synthMelodyInterval = null;
  }
  if (audioVisualRequest) {
    cancelAnimationFrame(audioVisualRequest);
    audioVisualRequest = null;
  }
  clearAudioCanvases();

  document.getElementById("btn-audio-play").disabled = false;
  document.getElementById("btn-audio-pause").disabled = true;
  document.getElementById("audio-time-display").textContent = 
    audioBuffer === "synth" ? "--:--" : `00:00 / ${audioBuffer ? Math.floor(audioBuffer.duration / 60) : 0}:${audioBuffer ? Math.floor(audioBuffer.duration % 60).toString().padStart(2, "0") : "00"}`;
}

function playSyntheticSequence() {
  let noteIndex = 0;
  const notes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25]; // C-Major scale

  synthMelodyInterval = setInterval(() => {
    if (!isAudioPlaying || !audioContext) return;
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(notes[noteIndex], audioContext.currentTime);
    
    const speedVal = parseFloat(document.getElementById("audio-speed").value);
    const duration = 0.22 / speedVal;
    const vol = parseFloat(document.getElementById("audio-volume").value);
    
    gain.gain.setValueAtTime(vol * 0.18, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioFilterNode);
    
    osc.start(audioContext.currentTime);
    osc.stop(audioContext.currentTime + duration + 0.05);

    noteIndex = (noteIndex + 1) % notes.length;
  }, 280);
}

function drawAudioVisualizer() {
  if (!isAudioPlaying) return;

  const canvasWave = document.getElementById("audio-canvas-waveform");
  const canvasFreq = document.getElementById("audio-canvas-frequency");
  const ctxW = canvasWave.getContext("2d");
  const ctxF = canvasFreq.getContext("2d");

  const w = canvasWave.width;
  const hW = canvasWave.height;
  const hF = canvasFreq.height;

  const bufferLength = audioAnalyserNode.frequencyBinCount;
  const dataArrayTime = new Uint8Array(bufferLength);
  const dataArrayFreq = new Uint8Array(bufferLength);

  // Oscilloscope Waveform
  audioAnalyserNode.getByteTimeDomainData(dataArrayTime);
  ctxW.fillStyle = "#050811";
  ctxW.fillRect(0, 0, w, hW);

  ctxW.lineWidth = 1;
  ctxW.strokeStyle = "rgba(6, 182, 212, 0.08)";
  ctxW.beginPath();
  ctxW.moveTo(0, hW / 2);
  ctxW.lineTo(w, hW / 2);
  ctxW.stroke();

  ctxW.lineWidth = 2;
  ctxW.strokeStyle = "var(--color-primary)";
  ctxW.beginPath();
  const sliceWidth = w / bufferLength;
  let x = 0;
  for (let i = 0; i < bufferLength; i++) {
    const v = dataArrayTime[i] / 128.0;
    const y = (v * hW) / 2;
    if (i === 0) ctxW.moveTo(x, y);
    else ctxW.lineTo(x, y);
    x += sliceWidth;
  }
  ctxW.lineTo(w, hW / 2);
  ctxW.stroke();

  // Spectrogram Frequency Bars
  audioAnalyserNode.getByteFrequencyData(dataArrayFreq);
  ctxF.fillStyle = "#050811";
  ctxF.fillRect(0, 0, w, hF);

  const barWidth = (w / bufferLength) * 2.5;
  let xF = 0;
  for (let i = 0; i < bufferLength; i++) {
    const barHeight = dataArrayFreq[i] / 2;
    const grad = ctxF.createLinearGradient(0, hF - barHeight, 0, hF);
    grad.addColorStop(0, "var(--color-accent)");
    grad.addColorStop(0.5, "var(--color-primary)");
    grad.addColorStop(1, "var(--color-secondary)");

    ctxF.fillStyle = grad;
    ctxF.fillRect(xF, hF - barHeight, barWidth - 1, barHeight);
    xF += barWidth + 1;
  }

  if (audioBuffer !== "synth" && audioBuffer) {
    const speed = parseFloat(document.getElementById("audio-speed").value);
    const elapsed = audioElapsedOffset + (audioContext.currentTime - audioStartTime) * speed;
    const currMin = Math.floor(elapsed / 60).toString().padStart(2, "0");
    const currSec = Math.floor(elapsed % 60).toString().padStart(2, "0");
    const durMin = Math.floor(audioBuffer.duration / 60).toString().padStart(2, "0");
    const durSec = Math.floor(audioBuffer.duration % 60).toString().padStart(2, "0");
    document.getElementById("audio-time-display").textContent = `${currMin}:${currSec} / ${durMin}:${durSec}`;
  }

  audioVisualRequest = requestAnimationFrame(drawAudioVisualizer);
}

function clearAudioCanvases() {
  const canvasWave = document.getElementById("audio-canvas-waveform");
  const canvasFreq = document.getElementById("audio-canvas-frequency");
  const ctxW = canvasWave.getContext("2d");
  const ctxF = canvasFreq.getContext("2d");
  ctxW.fillStyle = "#050811";
  ctxW.fillRect(0, 0, canvasWave.width, canvasWave.height);
  ctxF.fillStyle = "#050811";
  ctxF.fillRect(0, 0, canvasFreq.width, canvasFreq.height);
}
