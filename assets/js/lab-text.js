/* ==========================================================================
   FUNLISH STUDIO - Text Processing Module
   Contains Run-Length Encoding (RLE), Huffman Coding Tree, and XOR Cipher
   ========================================================================== */

function initTextModule() {
  // Tie event handlers or initial states if necessary
}

// Load pre-defined sample texts
function loadSampleText(type) {
  const textInput = document.getElementById("text-input");
  if (type === 1) {
    textInput.value = "Kunci Ujian Kelas 6 Bahasa Inggris FUNLISH: Soal 1 = Elephant, Soal 2 = Good morning, Soal 3 = Three, Soal 4 = reading. Kunci password kelas: ADMIN123. AAAAAAAABBBBBBBB";
  } else if (type === 2) {
    textInput.value = "AAAAAABBBBBBBBBCCCCDDDDDDDDDDDDDEEEEEEEEEEFFFGGGGGGGGGGHHHHHIIIIII";
  }
}

// Run-Length Encoding (RLE) Compression
function processRLE() {
  const input = document.getElementById("text-input").value;
  const container = document.getElementById("rle-result-container");
  const output = document.getElementById("rle-output");
  
  if (!input) {
    alert("Masukkan teks terlebih dahulu!");
    return;
  }

  let compressed = "";
  let i = 0;
  while (i < input.length) {
    let count = 1;
    while (i + 1 < input.length && input[i] === input[i + 1]) {
      count++;
      i++;
    }
    compressed += input[i] + count;
    i++;
  }

  output.textContent = compressed;
  
  const origSize = input.length;
  const compSize = compressed.length;
  const ratio = ((1 - compSize / origSize) * 100).toFixed(1);

  document.getElementById("rle-size-orig").textContent = `${origSize} Bytes`;
  document.getElementById("rle-size-comp").textContent = `${compSize} Bytes`;
  
  const ratioEl = document.getElementById("rle-ratio");
  ratioEl.textContent = `${ratio}%`;
  
  if (parseFloat(ratio) < 0) {
    ratioEl.className = "text-red";
    ratioEl.textContent = `${ratio}% (Ukuran Membesar)`;
  } else {
    ratioEl.className = "text-green";
  }
  
  container.classList.remove("hide");
}

// Huffman Coding tree builder
function processHuffman() {
  const input = document.getElementById("text-input").value;
  const container = document.getElementById("huffman-result-container");
  const tableBody = document.getElementById("huffman-table-body");
  
  if (!input) {
    alert("Masukkan teks terlebih dahulu!");
    return;
  }

  const freqs = {};
  for (let char of input) {
    freqs[char] = (freqs[char] || 0) + 1;
  }

  const leaves = Object.keys(freqs).map(char => ({
    char: char,
    freq: freqs[char],
    left: null,
    right: null
  }));

  if (leaves.length === 0) return;

  const queue = [...leaves];
  while (queue.length > 1) {
    queue.sort((a, b) => a.freq - b.freq);
    const left = queue.shift();
    const right = queue.shift();
    
    const parent = {
      char: null,
      freq: left.freq + right.freq,
      left: left,
      right: right
    };
    
    queue.push(parent);
  }

  const root = queue[0];
  const codes = {};

  function buildCodes(node, path) {
    if (!node) return;
    if (node.char !== null) {
      codes[node.char] = path || "0";
      return;
    }
    buildCodes(node.left, path + "0");
    buildCodes(node.right, path + "1");
  }
  buildCodes(root, "");

  let totalBitsOriginal = input.length * 8;
  let totalBitsCompressed = 0;
  for (let char of input) {
    totalBitsCompressed += codes[char].length;
  }
  const ratio = ((1 - totalBitsCompressed / totalBitsOriginal) * 100).toFixed(1);

  document.getElementById("huff-size-orig").textContent = `${totalBitsOriginal} bits`;
  document.getElementById("huff-size-comp").textContent = `${totalBitsCompressed} bits`;
  document.getElementById("huff-ratio").textContent = `${ratio}%`;

  tableBody.innerHTML = "";
  const sortedChars = Object.keys(freqs).sort((a,b) => freqs[b] - freqs[a]);
  sortedChars.forEach(char => {
    const row = document.createElement("tr");
    const displayChar = char === "\n" ? "\\n" : (char === " " ? "Spasi" : char);
    const code = codes[char];
    
    row.innerHTML = `
      <td><strong>${displayChar}</strong></td>
      <td>${freqs[char]}</td>
      <td>${code}</td>
      <td>${code.length} bits</td>
    `;
    tableBody.appendChild(row);
  });

  container.classList.remove("hide");
}

// XOR Encryption for quiz answers
function encryptXOR() {
  const input = document.getElementById("text-input").value;
  const key = document.getElementById("xor-key").value;
  const container = document.getElementById("xor-result-container");
  const output = document.getElementById("xor-output");
  
  if (!input || !key) {
    alert("Masukkan teks dan kunci terlebih dahulu!");
    return;
  }

  let hexCipher = "";
  for (let i = 0; i < input.length; i++) {
    const charCode = input.charCodeAt(i);
    const keyIndex = i % key.length;
    const keyCode = key.charCodeAt(keyIndex);
    
    const xorVal = charCode ^ keyCode;
    
    let hex = xorVal.toString(16);
    if (hex.length < 2) hex = "0" + hex;
    hexCipher += hex;
  }

  document.getElementById("xor-status-title").textContent = "Hasil Enkripsi Kunci (Ciphertext Hex):";
  output.value = hexCipher;
  document.getElementById("xor-info-format").textContent = "Ciphertext dienkode ke dalam format Heksadesimal.";
  container.classList.remove("hide");
}

// XOR Decryption
function decryptXOR() {
  const input = document.getElementById("text-input").value.trim();
  const key = document.getElementById("xor-key").value;
  const container = document.getElementById("xor-result-container");
  const output = document.getElementById("xor-output");
  
  if (!input || !key) {
    alert("Masukkan ciphertext heksadesimal pada kolom input utama dan kunci sandi guru!");
    return;
  }

  if (!/^[0-9a-fA-F]+$/.test(input) || input.length % 2 !== 0) {
    alert("Ciphertext harus berupa format heksadesimal genap!");
    return;
  }

  let plaintext = "";
  for (let i = 0; i < input.length; i += 2) {
    const hex = input.substr(i, 2);
    const xorVal = parseInt(hex, 16);
    
    const charIndex = i / 2;
    const keyIndex = charIndex % key.length;
    const keyCode = key.charCodeAt(keyIndex);
    
    const decVal = xorVal ^ keyCode;
    plaintext += String.fromCharCode(decVal);
  }

  document.getElementById("xor-status-title").textContent = "Hasil Dekripsi Kunci (Plaintext):";
  output.value = plaintext;
  document.getElementById("xor-info-format").textContent = "Ciphertext didekripsi kembali menjadi teks kunci jawaban asli.";
  container.classList.remove("hide");
}
