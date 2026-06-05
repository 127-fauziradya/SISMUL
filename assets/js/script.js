
/* ==========================================================================
   FILE: translations.js
   ========================================================================== */

/* ==========================================================================
   FUNLISH - Language Translation Database
   Provides bilingual dictionary mapping (Indonesian & English) for static
   landing page content.
   ========================================================================== */

window.translations = {
  id: {
    // Hero Banner
    hero_eyebrow: "Let's Learn English!",
    hero_title: "Belajar Bahasa Inggris Jadi Lebih Seru!",
    hero_desc: "Selamat datang di FUNLISH! Media interaktif gratis untuk membantu siswa SD kelas 3 sampai 6 belajar kosakata, percakapan dasar, mendengarkan pelafalan, dan latihan kuis seru.",
    hero_btn: "Mulai Belajar Sekarang",
    
    // Choose Grade Section
    grade_sub: "PILIH LEVEL BELAJAR KAMU",
    grade_title: "Pilih Kelas Belajar",
    grade_desc: "Pilih kelas kamu untuk memulai petualangan kosakata bahasa Inggris baru!",
    grade_enter: "Masuk Kelas",
    
    // Grade Cards details
    grade_3_desc: "Greetings, Numbers, and Colors (Salam, Angka, dan Warna dasar).",
    grade_4_desc: "Daily routines, animals, and common places (Aktivitas harian & hewan sekitar).",
    grade_5_desc: "Introduce yourself, describe people, and hobbies (Perkenalan & hobi).",
    grade_6_desc: "Reading short texts and Mini Exam practice (Teks pendek & Latihan Soal Ujian).",

    // Learning Method Info
    method_sub: "TENTANG MEDIA BELAJAR",
    method_title: "Metode Belajar FUNLISH",
    method_desc: "Materi interaktif dan menyenangkan agar anak mudah mengingat.",
    method_vocab_desc: "Hafalkan kata baru lewat contoh benda, gambar, dan latihan pengulangan.",
    method_spelling_desc: "Latih ejaan huruf demi huruf dengan mendengarkan pelafalan bahasa Inggris.",
    method_grammar_desc: "Pelajari tata bahasa dasar, kata ganti, kata kerja, dan susunan kalimat pendek.",
    method_quiz_desc: "Kerjakan latihan ringan untuk mengukur pemahaman setiap selesai belajar.",
    
    // About Us
    about_eyebrow: "Siapa Kami?",
    about_title: "Tentang FUNLISH",
    about_desc: "FUNLISH adalah sebuah platform media edukasi bahasa Inggris interaktif yang dirancang khusus untuk siswa Sekolah Dasar kelas 3 hingga kelas 6. Kami menggabungkan metode belajar visual (flashcards) dan auditori (Web Speech pelafalan vokal) untuk memberikan pengalaman belajar yang tak terlupakan bagi anak-anak.",
    about_stat_vocab: "Kosakata Aktif",
    about_stat_free: "Gratis & Aman",
    about_stat_major: "Informatika UMS",
    
    // Contact Section
    contact_eyebrow: "Hubungi Kami",
    contact_title: "Ada Pertanyaan?",
    contact_desc: "Jika Anda memiliki masukan, saran, atau ingin bekerjasama dalam pengembangan media pembelajaran SISMUL lainnya, jangan ragu untuk menghubungi kami melalui kontak resmi Kelompok 7, 8, 9 Informatika UMS di bawah ini:",
    contact_form_title: "Kirim Pesan Seru Kamu!",
    contact_form_name: "Tulis namamu...",
    contact_form_msg: "Tulis pesanmu ke guru bahasa Inggris di sini...",
    contact_form_btn: "Kirim Pesan"
  },
  en: {
    // Hero Banner
    hero_eyebrow: "Let's Learn English!",
    hero_title: "Learning English is Now More Fun!",
    hero_desc: "Welcome to FUNLISH! A free interactive learning media to help elementary school students (Grades 3-6) learn basic vocabulary, greetings, pronunciation, and practice fun quizzes.",
    hero_btn: "Start Learning Now",
    
    // Choose Grade Section
    grade_sub: "CHOOSE YOUR LEARNING LEVEL",
    grade_title: "Select Grade Level",
    grade_desc: "Select your school grade to start a brand new English vocabulary adventure!",
    grade_enter: "Enter Class",
    
    // Grade Cards details
    grade_3_desc: "Greetings, Numbers, and Colors (Greetings, basic numbers, and colors).",
    grade_4_desc: "Daily routines, animals, and common places (Daily routines & animals around us).",
    grade_5_desc: "Introduce yourself, describe people, and hobbies (Self-introduction & hobbies).",
    grade_6_desc: "Reading short texts and Mini Exam practice (Short reading texts & exam preparation).",

    // Learning Method Info
    method_sub: "ABOUT LEARNING MEDIA",
    method_title: "FUNLISH Learning Method",
    method_desc: "Interactive and fun materials designed to help children learn easily.",
    method_vocab_desc: "Memorize new words using objects, images, and repeating exercises.",
    method_spelling_desc: "Practice spelling letter-by-letter by listening to correct English pronunciation.",
    method_grammar_desc: "Learn basic grammar, pronouns, verbs, and simple sentence structures.",
    method_quiz_desc: "Take light exercises to measure your understanding after every lesson.",
    
    // About Us
    about_eyebrow: "Who Are We?",
    about_title: "About FUNLISH",
    about_desc: "FUNLISH is an interactive English educational platform designed specifically for elementary school students in grades 3 to 6. We combine visual (flashcards) and auditory (Web Speech voice pronunciation) learning methods to provide an unforgettable learning experience for children.",
    about_stat_vocab: "Active Vocabulary",
    about_stat_free: "Free & Safe",
    about_stat_major: "UMS Informatics",
    
    // Contact Section
    contact_eyebrow: "Contact Us",
    contact_title: "Have Questions?",
    contact_desc: "If you have feedback, suggestions, or wish to collaborate on other multimedia educational systems, please feel free to reach out to our official Informatics UMS Group 7, 8, 9 team:",
    contact_form_title: "Send Us a Fun Message!",
    contact_form_name: "Type your name...",
    contact_form_msg: "Type your message to the English teacher here...",
    contact_form_btn: "Send Message"
  }
};


/* ==========================================================================
   FILE: challenge-data.js
   ========================================================================== */

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



/* ==========================================================================
   FILE: student-challenges.js
   ========================================================================== */

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



/* ==========================================================================
   FILE: student.js
   ========================================================================== */

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


/* ==========================================================================
   FILE: app.js
   ========================================================================== */

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


/* ==========================================================================
   FILE: lab-text.js
   ========================================================================== */

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


/* ==========================================================================
   FILE: lab-image.js
   ========================================================================== */

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


/* ==========================================================================
   FILE: lab-audio.js
   ========================================================================== */

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


/* ==========================================================================
   FILE: lab-video.js
   ========================================================================== */

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


/* ==========================================================================
   FILE: admin.js
   ========================================================================== */

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


/* ==========================================================================
   FILE: crud.js
   ========================================================================== */

// 1. Session Login Security Guard (Redirect immediately if not logged in)
if (sessionStorage.getItem("funlish_admin_logged_in") !== "true") {
  window.location.href = "login.html";
}

window.currentCrudGrade = 3;

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
      loadComponent("admin-crud-content", "components/crud-portal.html"),
      loadComponent("footer-container", "components/footer.html")
    ]);

    // 2. Adjust Navbar visual style for Admin Mode
    const logo = document.getElementById("app-logo");
    if (logo) {
      logo.innerHTML = `<i class="fa-solid fa-microchip logo-icon"></i> <span>FUNLISH<span class="highlight">STUDIO</span></span>`;
    }
    
    // Hide student nav, show admin nav, and mark CRUD tab active
    const studentNav = document.getElementById("student-nav");
    if (studentNav) studentNav.style.display = "none";
    
    const adminNav = document.getElementById("admin-nav");
    if (adminNav) {
      adminNav.style.display = "flex";
      const crudTab = document.getElementById("nav-admin-crud");
      if (crudTab) crudTab.classList.add("active");
      const labTab = document.getElementById("nav-admin-lab");
      if (labTab) labTab.classList.remove("active");
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
    
    // Hide language switcher in admin mode as it is only for students landing page
    const langSwitcher = document.querySelector(".language-switcher");
    if (langSwitcher) langSwitcher.style.display = "none";

    initNavbarToggle();

    // 3. Initialize CRUD question list
    renderCrudQuestions();
  } catch (error) {
    console.error("Gagal menginisialisasi Dashboard CRUD:", error);
  }
});

// Helper component loader
async function loadComponent(elementId, filePath) {
  const response = await fetch(filePath);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const html = await response.text();
  document.getElementById(elementId).innerHTML = html;
}

// ==========================================================================
// CRUD Question Management Logics
// ==========================================================================

// Helper to retrieve data from localStorage
function getChallengeData() {
  const stored = localStorage.getItem("funlish_challenge_data");
  return stored ? JSON.parse(stored) : window.challengeData;
}

// Helper to save data back to localStorage
function saveChallengeData(data) {
  localStorage.setItem("funlish_challenge_data", JSON.stringify(data));
  // Keep the active in-memory object synced
  window.challengeData = data;
}

// Switch active grade in CRUD view
window.selectCrudGrade = function(grade) {
  window.currentCrudGrade = grade;
  
  // Update vertical tabs classes
  for (let g = 3; g <= 6; g++) {
    const btn = document.getElementById(`btn-crud-g${g}`);
    if (btn) {
      if (g === grade) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    }
  }

  // Update header title
  const titleEl = document.getElementById("crud-grade-header-title");
  if (titleEl) {
    titleEl.textContent = `Daftar Soal - Kelas ${grade} SD`;
  }

  renderCrudQuestions();
};

// Render questions list into table
window.renderCrudQuestions = function() {
  const tableBody = document.getElementById("crud-questions-table-body");
  if (!tableBody) return;
  
  tableBody.innerHTML = "";
  const data = getChallengeData();
  const grade = window.currentCrudGrade;
  
  if (!data || !data[grade] || !data[grade].level3 || !data[grade].level3.questions) {
    tableBody.innerHTML = `<tr><td colspan="5" style="padding:20px; text-align:center; color:#94a3b8;">Tidak ada data soal untuk kelas ini.</td></tr>`;
    return;
  }
  
  const questions = data[grade].level3.questions;
  
  if (questions.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5" style="padding:20px; text-align:center; color:#94a3b8;">Belum ada soal. Klik 'Tambah Soal Baru' untuk mengisi.</td></tr>`;
    return;
  }

  questions.forEach((q, index) => {
    const row = document.createElement("tr");
    row.style.borderBottom = "1px solid #24344d";
    
    // Formatting options string
    const optionsText = q.options.map((opt, i) => `${String.fromCharCode(65 + i)}. ${opt}`).join("<br/>");
    
    row.innerHTML = `
      <td style="padding: 12px 16px; font-weight:700; color:#1cb0f6;">${index + 1}</td>
      <td style="padding: 12px 16px; max-width: 300px; word-break: break-word;">${q.question}</td>
      <td style="padding: 12px 16px; font-size: 0.9rem; color: #94a3b8; line-height: 1.5;">${optionsText}</td>
      <td style="padding: 12px 16px; font-weight: 600; color: #58cc02;">${q.answer}</td>
      <td style="padding: 12px 16px; text-align: center;">
        <div style="display: flex; gap: 8px; justify-content: center;">
          <button class="btn btn-secondary" onclick="openEditQuestionModal(${index})" style="padding: 6px 12px; font-size: 0.8rem; border-radius: 6px; border: 1px solid #24344d; background: transparent; color: #94a3b8; cursor: pointer;"><i class="fa-solid fa-edit"></i> Edit</button>
          <button class="btn" onclick="deleteQuestion(${index})" style="padding: 6px 12px; font-size: 0.8rem; background-color: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer;"><i class="fa-solid fa-trash"></i> Hapus</button>
        </div>
      </td>
    `;
    tableBody.appendChild(row);
  });
};

// Open Modal to create new question
window.openCreateQuestionModal = function() {
  document.getElementById("crud-modal-title").textContent = `Tambah Soal Kuis - Kelas ${window.currentCrudGrade} SD`;
  document.getElementById("edit-question-index").value = ""; // Empty implies new entry
  document.getElementById("crud-question-form").reset();
  
  const modal = document.getElementById("crud-modal-overlay");
  if (modal) modal.classList.remove("hide");
};

// Open Modal to edit existing question
window.openEditQuestionModal = function(index) {
  const data = getChallengeData();
  const grade = window.currentCrudGrade;
  const q = data[grade].level3.questions[index];
  
  if (!q) return;

  document.getElementById("crud-modal-title").textContent = `Edit Soal Kuis - Kelas ${grade} SD`;
  document.getElementById("edit-question-index").value = index;
  
  document.getElementById("form-question").value = q.question;
  document.getElementById("form-opt-0").value = q.options[0] || "";
  document.getElementById("form-opt-1").value = q.options[1] || "";
  document.getElementById("form-opt-2").value = q.options[2] || "";
  document.getElementById("form-opt-3").value = q.options[3] || "";
  
  // Find which option matches correct answer
  const ansIndex = q.options.indexOf(q.answer);
  document.getElementById("form-answer").value = ansIndex >= 0 ? ansIndex : "";

  const modal = document.getElementById("crud-modal-overlay");
  if (modal) modal.classList.remove("hide");
};

// Close question Modal
window.closeCrudQuestionModal = function() {
  const modal = document.getElementById("crud-modal-overlay");
  if (modal) modal.classList.add("hide");
};

// Save form submit (Create or Update)
window.saveQuestionForm = function(event) {
  event.preventDefault();
  
  const indexStr = document.getElementById("edit-question-index").value;
  const question = document.getElementById("form-question").value.trim();
  const opt0 = document.getElementById("form-opt-0").value.trim();
  const opt1 = document.getElementById("form-opt-1").value.trim();
  const opt2 = document.getElementById("form-opt-2").value.trim();
  const opt3 = document.getElementById("form-opt-3").value.trim();
  const ansIndex = parseInt(document.getElementById("form-answer").value);

  const options = [opt0, opt1, opt2, opt3];
  const answer = options[ansIndex];

  const data = getChallengeData();
  const grade = window.currentCrudGrade;
  const questions = data[grade].level3.questions;

  const newQuestionObj = { question, options, answer };

  if (indexStr === "") {
    // Create new
    questions.push(newQuestionObj);
  } else {
    // Update existing
    const index = parseInt(indexStr);
    questions[index] = newQuestionObj;
  }

  saveChallengeData(data);
  renderCrudQuestions();
  closeCrudQuestionModal();
};

// Delete a question
window.deleteQuestion = function(index) {
  if (!confirm("Apakah Anda yakin ingin menghapus soal ini?")) return;

  const data = getChallengeData();
  const grade = window.currentCrudGrade;
  const questions = data[grade].level3.questions;

  questions.splice(index, 1);
  
  saveChallengeData(data);
  renderCrudQuestions();
};

// Reset questions database to default pabrik
window.resetDefaultQuestions = function() {
  if (!confirm("Apakah Anda yakin ingin mengembalikan semua soal kuis ke setelan awal pabrik? Seluruh penyesuaian Anda akan terhapus.")) return;
  
  localStorage.removeItem("funlish_challenge_data");
  alert("Bank data soal kuis berhasil direset!");
  location.reload();
};

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

