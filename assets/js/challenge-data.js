/* ==========================================================================
   FUNLISH - Challenge & Lesson Data Bank
   Contains comprehensive vocabularies (Level 1), conversation dialogues (Level 2),
   and a large bank of quiz questions (Level 3) for Grades 3 to 6.
   ========================================================================== */

const defaultChallengeData = {
  3: {
    gradeLabel: "Kelas 3 SD",
    level1: {
      title: "Greetings, Numbers & Colors (Kosakata Dasar)",
      desc: "Klik kartu di bawah untuk mendengarkan pelafalan bahasa Inggris yang benar!",
      items: [
        { eng: "Good Morning", ind: "Selamat Pagi", emoji: "🌅" },
        { eng: "Good Afternoon", ind: "Selamat Siang", emoji: "☀️" },
        { eng: "Good Evening", ind: "Selamat Sore/Malam", emoji: "🌇" },
        { eng: "Thank You", ind: "Terima Kasih", emoji: "🙏" },
        { eng: "Welcome", ind: "Selamat Datang", emoji: "🤝" },
        { eng: "Goodbye", ind: "Selamat Tinggal", emoji: "👋" },
        { eng: "One", ind: "Satu", emoji: "1️⃣" },
        { eng: "Two", ind: "Dua", emoji: "2️⃣" },
        { eng: "Three", ind: "Tiga", emoji: "3️⃣" },
        { eng: "Four", ind: "Empat", emoji: "4️⃣" },
        { eng: "Five", ind: "Lima", emoji: "5️⃣" },
        { eng: "Six", ind: "Enam", emoji: "6️⃣" },
        { eng: "Red Color", ind: "Warna Merah", emoji: "🔴" },
        { eng: "Blue Color", ind: "Warna Biru", emoji: "🔵" },
        { eng: "Green Color", ind: "Warna Hijau", emoji: "🟢" },
        { eng: "Yellow Color", ind: "Warna Kuning", emoji: "🟡" },
        { eng: "Purple Color", ind: "Warna Ungu", emoji: "🟣" }
      ]
    },
    level2: {
      title: "Simple Greetings (Percakapan Sederhana)",
      desc: "Klik tombol volume pada gelembung percakapan untuk mendengarkan suara!",
      items: [
        { eng: "Hello, good morning! My name is Alex.", ind: "Halo, selamat pagi! Nama saya Alex.", avatar: "👦", side: "left" },
        { eng: "Hi Alex, good morning! I am Bella.", ind: "Hai Alex, selamat pagi! Saya Bella.", avatar: "👧", side: "right" },
        { eng: "How are you today, Bella?", ind: "Bagaimana kabarmu hari ini, Bella?", avatar: "👦", side: "left" },
        { eng: "I am fine, thank you! How about you, Alex?", ind: "Saya baik-baik saja, terima kasih! Bagaimana denganmu, Alex?", avatar: "👧", side: "right" },
        { eng: "I am very good! Nice to meet you, Bella.", ind: "Kabar saya sangat baik! Senang bertemu denganmu, Bella.", avatar: "👦", side: "left" },
        { eng: "Nice to meet you too, Alex. Goodbye!", ind: "Senang bertemu denganmu juga, Alex. Selamat tinggal!", avatar: "👧", side: "right" },
        { eng: "Goodbye!", ind: "Selamat tinggal!", avatar: "👦", side: "left" }
      ]
    },
    level3: {
      title: "Mini Quiz Kelas 3 (Tantangan Kuis Acak)",
      desc: "Jawablah 5 soal acak di bawah ini dengan memilih jawaban yang paling tepat!",
      // 15 Questions Bank for Grade 3
      questions: [
        { question: "What is the English word for 'Merah'?", options: ["Blue", "Red", "Green", "Yellow"], answer: "Red" },
        { question: "How do you say 'Terima Kasih' in English?", options: ["Goodbye", "Please", "Thank you", "Good morning"], answer: "Thank you" },
        { question: "Which number is 'Tiga'?", options: ["One", "Two", "Three", "Four"], answer: "Three" },
        { question: "What is the translation of 'Good Morning'?", options: ["Selamat Pagi", "Selamat Siang", "Selamat Malam", "Selamat Tinggal"], answer: "Selamat Pagi" },
        { question: "Which color represents 'Biru'?", options: ["Red", "Green", "Blue", "Purple"], answer: "Blue" },
        { question: "How do you say 'Selamat Tinggal' in English?", options: ["Welcome", "Goodbye", "Thank you", "Hello"], answer: "Goodbye" },
        { question: "What number comes after 'Four'?", options: ["Two", "Three", "Five", "Six"], answer: "Five" },
        { question: "What is the English word for 'Kuning'?", options: ["Yellow", "Red", "Blue", "Green"], answer: "Yellow" },
        { question: "If you want to say hello in the afternoon, you say...", options: ["Good evening", "Good afternoon", "Good morning", "Goodbye"], answer: "Good afternoon" },
        { question: "Translate 'Five Color Balloons' into Indonesian:", options: ["Dua balon merah", "Lima balon berwarna", "Tiga balon biru", "Empat balon hijau"], answer: "Lima balon berwarna" },
        { question: "Which number is 'Satu'?", options: ["One", "Two", "Three", "Four"], answer: "One" },
        { question: "What is the English word for 'Hijau'?", options: ["Red", "Blue", "Green", "Purple"], answer: "Green" },
        { question: "Complete the sentence: 'Good ... , Mom!' (at 7:00 PM)", options: ["morning", "afternoon", "evening", "bye"], answer: "evening" },
        { question: "Which color matches the leaf?", options: ["Red Color", "Blue Color", "Green Color", "Yellow Color"], answer: "Green Color" },
        { question: "How do you spell the number 2 in English?", options: ["One", "Tow", "Two", "Too"], answer: "Two" }
      ]
    }
  },
  4: {
    gradeLabel: "Kelas 4 SD",
    level1: {
      title: "Daily Activities & Animals (Aktivitas Harian & Hewan)",
      desc: "Klik kartu di bawah untuk melatih ejaan kata (spelling) dan mendengarkan pelafalan!",
      items: [
        { eng: "Cat", ind: "Kucing", emoji: "🐱" },
        { eng: "Dog", ind: "Anjing", emoji: "🐶" },
        { eng: "Elephant", ind: "Gajah", emoji: "🐘" },
        { eng: "Lion", ind: "Singa", emoji: "🦁" },
        { eng: "Monkey", ind: "Monyet", emoji: "🐵" },
        { eng: "Butterfly", ind: "Kupu-kupu", emoji: "🦋" },
        { eng: "Rabbit", ind: "Kelinci", emoji: "🐰" },
        { eng: "Fish", ind: "Ikan", emoji: "🐟" },
        { eng: "Study English", ind: "Belajar B. Inggris", emoji: "📚" },
        { eng: "Play Football", ind: "Bermain Bola", emoji: "⚽" },
        { eng: "Eat Breakfast", ind: "Sarapan Pagi", emoji: "🍳" },
        { eng: "Sleep", ind: "Tidur", emoji: "😴" },
        { eng: "Ride a Bicycle", ind: "Naik Sepeda", emoji: "🚲" },
        { eng: "Wash Hands", ind: "Cuci Tangan", emoji: "🧼" },
        { eng: "Take a Bath", ind: "Mandi", emoji: "🚿" },
        { eng: "Drink Milk", ind: "Minum Susu", emoji: "🥛" }
      ]
    },
    level2: {
      title: "Talking About Hobbies (Membahas Hobi)",
      desc: "Simak percakapan harian seputar hewan peliharaan dan aktivitas di bawah ini!",
      items: [
        { eng: "Bella, do you have any pets at home?", ind: "Bella, apakah kamu punya hewan peliharaan di rumah?", avatar: "👦", side: "left" },
        { eng: "Yes, I do! I have a cute rabbit and a small fish.", ind: "Ya, saya punya! Saya punya kelinci yang lucu dan ikan yang kecil.", avatar: "👧", side: "right" },
        { eng: "What does your rabbit eat, Bella?", ind: "Apa yang dimakan kelinci kamu, Bella?", avatar: "👦", side: "left" },
        { eng: "It likes to eat carrots! It is very active.", ind: "Ia suka makan wortel! Ia sangat lincah.", avatar: "👧", side: "right" },
        { eng: "That is awesome! I love rabbits too.", ind: "Itu luar biasa! Saya juga menyukai kelinci.", avatar: "👦", side: "left" },
        { eng: "How about you? Do you play football every day?", ind: "Bagaimana denganmu? Apakah kamu bermain sepak bola setiap hari?", avatar: "👧", side: "right" },
        { eng: "Yes, I play football with my friends in the afternoon.", ind: "Ya, saya bermain sepak bola dengan teman-teman di sore hari.", avatar: "👦", side: "left" }
      ]
    },
    level3: {
      title: "Mini Quiz Kelas 4 (Tantangan Kuis Acak)",
      desc: "Jawablah 5 soal acak di bawah ini dengan memilih jawaban yang paling tepat!",
      // 15 Questions Bank for Grade 4
      questions: [
        { question: "What is the English word for 'Gajah'?", options: ["Lion", "Monkey", "Elephant", "Cat"], answer: "Elephant" },
        { question: "Complete the sentence: 'A rabbit likes to eat ...'", options: ["fish", "meat", "carrots", "milk"], answer: "carrots" },
        { question: "What is Budi doing? (Budi sedang tidur)", options: ["Budi is playing football", "Budi is sleeping", "Budi is studying", "Budi is washing hands"], answer: "Budi is sleeping" },
        { question: "What animal hops and has long ears?", options: ["Rabbit", "Lion", "Fish", "Cat"], answer: "Rabbit" },
        { question: "Translate 'Study English' into Indonesian:", options: ["Belajar Matematika", "Belajar B. Inggris", "Membaca Buku", "Bermain Game"], answer: "Belajar B. Inggris" },
        { question: "What activity do you do with a toothbrush?", options: ["Wash hands", "Brush teeth", "Sleep", "Play football"], answer: "Brush teeth" },
        { question: "Which animal is known as the King of the Jungle?", options: ["Monkey", "Rabbit", "Cat", "Lion"], answer: "Lion" },
        { question: "What is the Indonesian translation of 'Ride a Bicycle'?", options: ["Naik Motor", "Naik Sepeda", "Mencuci Sepeda", "Bermain Bola"], answer: "Naik Sepeda" },
        { question: "We eat ... in the morning.", options: ["dinner", "breakfast", "lunch", "snacks"], answer: "breakfast" },
        { question: "Which animal lives in water and swims?", options: ["Dog", "Rabbit", "Fish", "Cat"], answer: "Fish" },
        { question: "What do you do before eating to keep clean?", options: ["Sleep", "Play football", "Wash hands", "Ride a bicycle"], answer: "Wash hands" },
        { question: "What is the English word for 'Kupu-kupu'?", options: ["Butterfly", "Bird", "Bee", "Ant"], answer: "Butterfly" },
        { question: "Complete: 'My father likes to ... coffee in the morning.'", options: ["eat", "sleep", "drink", "wash"], answer: "drink" },
        { question: "What animal is 'Monyet' in English?", options: ["Lion", "Elephant", "Monkey", "Rabbit"], answer: "Monkey" },
        { question: "Choose the correct sentence: 'Budi ... football in the yard.'", options: ["plays", "play", "sleeping", "studies"], answer: "plays" }
      ]
    }
  },
  5: {
    gradeLabel: "Kelas 5 SD",
    level1: {
      title: "Introducing Yourself, Hobbies & Common Places",
      desc: "Klik kartu kosakata tempat umum dan perkenalan berikut untuk melafalkan!",
      items: [
        { eng: "School", ind: "Sekolah", emoji: "🏫" },
        { eng: "Hospital", ind: "Rumah Sakit", emoji: "🏥" },
        { eng: "Library", ind: "Perpustakaan", emoji: "📚" },
        { eng: "Market", ind: "Pasar", emoji: "🛒" },
        { eng: "Park", ind: "Taman", emoji: "🛝" },
        { eng: "Cinema", ind: "Bioskop", emoji: "🎬" },
        { eng: "Introduce Yourself", ind: "Perkenalkan Diri", emoji: "🤝" },
        { eng: "Reading Books", ind: "Membaca Buku", emoji: "📖" },
        { eng: "Singing", ind: "Bernyanyi", emoji: "🎤" },
        { eng: "Drawing", ind: "Menggambar", emoji: "🎨" },
        { eng: "Cooking", ind: "Memasak", emoji: "🍳" },
        { eng: "Swimming", ind: "Berenang", emoji: "🏊" },
        { eng: "Teacher", ind: "Guru", emoji: "🧑‍🏫" },
        { eng: "Doctor", ind: "Dokter", emoji: "🧑‍⚕️" },
        { eng: "Student", ind: "Siswa", emoji: "🧑‍🎓" },
        { eng: "Police Officer", ind: "Polisi", emoji: "👮" }
      ]
    },
    level2: {
      title: "Introducing Hobbies (Memperkenalkan Kegemaran)",
      desc: "Perhatikan percakapan perkenalan dan hobi antarteman di bawah ini!",
      items: [
        { eng: "Hi Bella! What are you doing in the park?", ind: "Hai Bella! Apa yang sedang kamu lakukan di taman?", avatar: "👦", side: "left" },
        { eng: "Hi Alex! I am drawing some beautiful flowers here. It is my hobby.", ind: "Hai Alex! Saya sedang menggambar bunga yang indah di sini. Ini hobi saya.", avatar: "👧", side: "right" },
        { eng: "Wow, you are very good at drawing! What else do you like?", ind: "Wah, kamu sangat pandai menggambar! Apa lagi yang kamu sukai?", avatar: "👦", side: "left" },
        { eng: "I also like reading books in the library on weekends. How about you?", ind: "Saya juga suka membaca buku di perpustakaan pada akhir pekan. Bagaimana denganmu?", avatar: "👧", side: "right" },
        { eng: "My hobbies are swimming and cooking with my mother in the kitchen.", ind: "Hobi saya adalah berenang dan memasak bersama ibu saya di dapur.", avatar: "👦", side: "left" },
        { eng: "That sounds delicious! We should swim together sometime.", ind: "Kedengarannya lezat! Kita harus berenang bersama kapan-kapan.", avatar: "👧", side: "right" }
      ]
    },
    level3: {
      title: "Mini Quiz Kelas 5 (Tantangan Kuis Acak)",
      desc: "Jawablah 5 soal acak di bawah ini dengan memilih jawaban yang paling tepat!",
      // 15 Questions Bank for Grade 5
      questions: [
        { question: "Where do we go when we are sick?", options: ["Cinema", "Library", "Hospital", "School"], answer: "Hospital" },
        { question: "What is Budi's hobby? (Budi suka bernyanyi)", options: ["Drawing", "Singing", "Cooking", "Swimming"], answer: "Singing" },
        { question: "Who teaches students in a school?", options: ["Doctor", "Police Officer", "Teacher", "Chef"], answer: "Teacher" },
        { question: "What is the English word for 'Perpustakaan'?", options: ["School", "Market", "Library", "Park"], answer: "Library" },
        { question: "Translate 'My hobby is drawing' into Indonesian:", options: ["Hobi saya membaca", "Hobi saya menyanyi", "Hobi saya menggambar", "Hobi saya berenang"], answer: "Hobi saya menggambar" },
        { question: "Where do people buy vegetables and fruits?", options: ["Cinema", "Hospital", "Library", "Market"], answer: "Market" },
        { question: "Who protects the city and catches thieves?", options: ["Doctor", "Police Officer", "Teacher", "Student"], answer: "Police Officer" },
        { question: "Translate 'Swimming' into Indonesian:", options: ["Berenang", "Memasak", "Menggambar", "Berlari"], answer: "Berenang" },
        { question: "If you want to read quiet books, you go to...", options: ["Cinema", "Hospital", "Library", "Market"], answer: "Library" },
        { question: "Budi: 'I like to ... cookies in the kitchen.'", options: ["swim", "cook", "draw", "sing"], answer: "cook" },
        { question: "Which place is 'Bioskop' in English?", options: ["Park", "Cinema", "Hospital", "School"], answer: "Cinema" },
        { question: "Complete: 'A ... treats patients and works in a hospital.'", options: ["teacher", "doctor", "police officer", "student"], answer: "doctor" },
        { question: "Translate 'Siswa' into English:", options: ["Teacher", "Student", "Doctor", "Police"], answer: "Student" },
        { question: "Where do kids play on slides and swings?", options: ["Cinema", "Hospital", "Market", "Park"], answer: "Park" },
        { question: "Choose the correct spelling: 'I like ...'", options: ["read book", "reading books", "readed book", "reads books"], answer: "reading books" }
      ]
    }
  },
  6: {
    gradeLabel: "Kelas 6 SD",
    level1: {
      title: "Reading Comprehension, Directions & Occupations",
      desc: "Klik kartu kosakata tingkat lanjut berikut untuk mendengarkan lafal ejaannya!",
      items: [
        { eng: "Direction Map", ind: "Peta Petunjuk Arah", emoji: "🗺️" },
        { eng: "Turn Left", ind: "Belok Kiri", emoji: "⬅️" },
        { eng: "Turn Right", ind: "Belok Kanan", emoji: "➡️" },
        { eng: "Go Straight", ind: "Jalan Lurus", emoji: "⬆️" },
        { eng: "Scientist", ind: "Ilmuwan", emoji: "🧑‍🔬" },
        { eng: "Astronaut", ind: "Astronot", emoji: "🧑‍🚀" },
        { eng: "Firefighter", ind: "Pemadam Kebakaran", emoji: "🧑‍🚒" },
        { eng: "Pilot", ind: "Pilot", emoji: "🧑‍✈️" },
        { eng: "Bus Stop", ind: "Halte Bus", emoji: "🚏" },
        { eng: "Train Station", ind: "Stasiun Kereta", emoji: "🚉" },
        { eng: "Airport", ind: "Bandara", emoji: "✈️" },
        { eng: "Post Office", ind: "Kantor Pos", emoji: "🖃" },
        { eng: "Museum", ind: "Museum", emoji: "🏛️" },
        { eng: "Restaurant", ind: "Restoran", emoji: "🍴" },
        { eng: "Supermarket", ind: "Supermarket", emoji: "🏬" },
        { eng: "Bank", ind: "Bank", emoji: "🏦" }
      ]
    },
    level2: {
      title: "Asking for Directions (Menanyakan Jalan/Arah)",
      desc: "Simak percakapan tingkat lanjut cara menanyakan alamat berikut ini!",
      items: [
        { eng: "Excuse me, sir. Could you tell me where the post office is?", ind: "Permisi, pak. Bisakah Anda memberi tahu saya di mana kantor pos berada?", avatar: "👦", side: "left" },
        { eng: "Sure! Go straight for two blocks, then turn left at the corner.", ind: "Tentu! Jalan lurus selama dua blok, lalu belok kiri di pojokan jalan.", avatar: "👮", side: "right" },
        { eng: "Is the post office far from here?", ind: "Apakah kantor pos jauh dari sini?", avatar: "👦", side: "left" },
        { eng: "No, it is near. It is next to the bank and opposite the museum.", ind: "Tidak, itu dekat. Letaknya di sebelah bank dan berseberangan dengan museum.", avatar: "👮", side: "right" },
        { eng: "I see. Thank you very much for your help!", ind: "Saya mengerti. Terima kasih banyak atas bantuan Anda!", avatar: "👦", side: "left" },
        { eng: "You are welcome. Have a nice day!", ind: "Sama-sama. Semoga hari Anda menyenangkan!", avatar: "👮", side: "right" }
      ]
    },
    level3: {
      title: "Mini Exam Kelas 6 (Ujian Akhir Dinamis)",
      desc: "Jawablah 5 soal acak di bawah ini dengan memilih jawaban yang paling tepat!",
      // 15 Questions Bank for Grade 6
      questions: [
        { question: "If you want to travel by plane, you must go to the...", options: ["Bus Stop", "Train Station", "Airport", "Bank"], answer: "Airport" },
        { question: "Complete the direction instruction: 'To go to the market, go straight and then ... right.'", options: ["make", "take", "turn", "go"], answer: "turn" },
        { question: "Who flies airplanes and travels across countries?", options: ["Firefighter", "Pilot", "Astronaut", "Scientist"], answer: "Pilot" },
        { question: "What is 'Turn Left' in Indonesian?", options: ["Belok Kanan", "Belok Kiri", "Jalan Lurus", "Berputar"], answer: "Belok Kiri" },
        { question: "Where is the post office? (Next to the bank)", options: ["Di atas bank", "Di belakang bank", "Di sebelah bank", "Di depan bank"], answer: "Di sebelah bank" },
        { question: "A ... puts out fires and saves people from burning buildings.", options: ["Scientist", "Firefighter", "Pilot", "Astronaut"], answer: "Firefighter" },
        { question: "What is 'Museum' in Indonesian?", options: ["Museum", "Halte Bus", "Stasiun Kereta", "Restoran"], answer: "Museum" },
        { question: "Where can we save money or deposit checks?", options: ["Post Office", "Restaurant", "Supermarket", "Bank"], answer: "Bank" },
        { question: "Complete: 'The library is ... the hospital.' (Berseberangan)", options: ["next to", "opposite", "behind", "near"], answer: "opposite" },
        { question: "Who travels to outer space in a rocket?", options: ["Scientist", "Pilot", "Astronaut", "Firefighter"], answer: "Astronaut" },
        { question: "What is the English word for 'Jalan Lurus'?", options: ["Turn Left", "Turn Right", "Go Straight", "Stop"], answer: "Go Straight" },
        { question: "Where do we wait for a bus?", options: ["Airport", "Bus Stop", "Train Station", "Post Office"], answer: "Bus Stop" },
        { question: "Choose the correct sentence: 'Alex: Excuse me, ... the bank?'", options: ["where is", "what is", "who is", "when is"], answer: "where is" },
        { question: "What is the meaning of 'Restaurant'?", options: ["Rumah Makan/Restoran", "Halte Bus", "Rumah Sakit", "Bank"], answer: "Rumah Makan/Restoran" },
        { question: "A ... works in a lab and conducts experiments to discover new things.", options: ["Pilot", "Firefighter", "Scientist", "Astronaut"], answer: "Scientist" }
      ]
    }
  }
};

// Helper to initialize and retrieve database from localStorage
function initLocalStorageData() {
  const stored = localStorage.getItem("funlish_challenge_data");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error("Gagal memuat data kuis dari localStorage. Menggunakan default.", e);
    }
  }
  // Initialize with default
  localStorage.setItem("funlish_challenge_data", JSON.stringify(defaultChallengeData));
  return defaultChallengeData;
}

// Active challengeData instance
const challengeData = initLocalStorageData();

// Export to window object for global sharing across components
window.challengeData = challengeData;

