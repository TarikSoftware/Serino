/* ==========================================================================
   Serino - içerik şablonu
   ==========================================================================
   Bu dosya üç katmandan oluşur:

   1) SERINO_LEVELS      - zorluk seviyeleri (A1, A2, B1, B2, C1)
   2) SERINO_CATEGORIES  - konu/tema kategorileri (Aile, Yiyecek, ...)
   3) SERINO_UNITS        - her biri BİR kategori + BİR seviye kombinasyonu.
                            Kelimeleri (words) ve isteğe bağlı örnek
                            cümleleri (sentences) burada tutulur.

   DİLLER: Her kelime ve cümle objesi desteklenen tüm diller için bir alan
   içerir:  { en: "...", tr: "...", fr: "...", es: "..." }
   Şu an desteklenenler: en (İngilizce), tr (Türkçe), fr (Fransızca),
   es (İspanyolca). Bkz. dosyanın sonundaki SERINO_LANGUAGES.

   YENİ İÇERİK EKLEMEK İÇİN:
   - Yeni bir KATEGORİ eklemek istiyorsan SERINO_CATEGORIES dizisine yeni
     bir obje ekle (id benzersiz olmalı).
   - Yeni bir SEVİYE eklemek istiyorsan SERINO_LEVELS dizisine yeni bir
     obje ekle.
   - Sonra SERINO_UNITS dizisinin SONUNA, o kategori+seviye için bir ünite
     ekle:

       {
         id: "seyahat-b1",        // benzersiz, öneri: "kategori-seviye"
         categoryId: "seyahat",   // SERINO_CATEGORIES içindeki bir id
         levelId: "b1",           // SERINO_LEVELS içindeki bir id
         words: [
           { en: "airport", tr: "havalimanı", fr: "aéroport", es: "aeropuerto" },
           { en: "ticket", tr: "bilet", fr: "billet", es: "billete" },
           // ... en az birkaç kelime çifti daha
         ],
         sentences: [ // opsiyonel - cümle kurma alıştırması üretir
           { en: "Where is the airport?", tr: "Havalimanı nerede?",
             fr: "Où est l'aéroport ?", es: "¿Dónde está el aeropuerto?" },
         ],
       }

   - Yeni bir DİL eklemek istiyorsan: SERINO_LANGUAGES'e bir giriş ekle ve
     her kelimeye/cümleye o dilin alanını ekle (örn. de: "...").

   ÖNEMLİ: SERINO_UNITS dizisindeki SIRA, ders yolundaki ilerleme sırasını
   belirler - bir önceki ünite tamamlanmadan bir sonraki açılmaz. Yeni
   seviye eklerken üniteleri dizinin SONUNA eklemen yeterli.
   ========================================================================== */

const SERINO_LEVELS = [
  { id: "a1", code: "A1", label: { tr: "Başlangıç", en: "Beginner", fr: "Débutant", es: "Principiante" } },
  { id: "a2", code: "A2", label: { tr: "Temel", en: "Elementary", fr: "Élémentaire", es: "Elemental" } },
  { id: "b1", code: "B1", label: { tr: "Orta Seviye", en: "Intermediate", fr: "Intermédiaire", es: "Intermedio" } },
  { id: "b2", code: "B2", label: { tr: "İleri Orta Seviye", en: "Upper Intermediate", fr: "Intermédiaire avancé", es: "Intermedio alto" } },
  { id: "c1", code: "C1", label: { tr: "İleri Seviye", en: "Advanced", fr: "Avancé", es: "Avanzado" } },
];

const SERINO_CATEGORIES = [
  // --- temel / günlük ---
  { id: "temel", icon: "👋", accent: "#fde2ea", label: { tr: "Temel Kelimeler", en: "Basics", fr: "Bases", es: "Básicos" } },
  { id: "aile", icon: "👨‍👩‍👧", accent: "#e2f3e7", label: { tr: "Aile", en: "Family", fr: "Famille", es: "Familia" } },
  { id: "yiyecek", icon: "🍎", accent: "#eae2f7", label: { tr: "Yiyecekler", en: "Food", fr: "Nourriture", es: "Comida" } },
  { id: "sayilar", icon: "🔢", accent: "#fdecd9", label: { tr: "Sayılar", en: "Numbers", fr: "Nombres", es: "Números" } },
  { id: "gunluk", icon: "🏡", accent: "#e2eef7", label: { tr: "Günlük Hayat", en: "Daily Life", fr: "Vie quotidienne", es: "Vida diaria" } },
  { id: "renkler", icon: "🎨", accent: "#fde2ea", label: { tr: "Renkler", en: "Colors", fr: "Couleurs", es: "Colores" } },
  { id: "hayvanlar", icon: "🐾", accent: "#e2f3e7", label: { tr: "Hayvanlar", en: "Animals", fr: "Animaux", es: "Animales" } },
  { id: "zaman", icon: "⏰", accent: "#eae2f7", label: { tr: "Zaman", en: "Time", fr: "Temps", es: "Tiempo" } },
  { id: "vucut", icon: "🖐️", accent: "#fdecd9", label: { tr: "Vücut", en: "Body", fr: "Corps", es: "Cuerpo" } },
  { id: "giysiler", icon: "👕", accent: "#e2eef7", label: { tr: "Giysiler", en: "Clothing", fr: "Vêtements", es: "Ropa" } },
  { id: "ev", icon: "🛋️", accent: "#fde2ea", label: { tr: "Ev ve Eşyalar", en: "Home", fr: "Maison", es: "Casa" } },
  { id: "fiiller", icon: "🏃", accent: "#e2f3e7", label: { tr: "Fiiller", en: "Verbs", fr: "Verbes", es: "Verbos" } },
  { id: "sifatlar", icon: "✨", accent: "#eae2f7", label: { tr: "Sıfatlar", en: "Adjectives", fr: "Adjectifs", es: "Adjetivos" } },

  // --- çevre / toplum ---
  { id: "meslekler", icon: "💼", accent: "#fde2ea", label: { tr: "Meslekler", en: "Professions", fr: "Métiers", es: "Profesiones" } },
  { id: "duygular", icon: "😊", accent: "#e2f3e7", label: { tr: "Duygular", en: "Emotions", fr: "Émotions", es: "Emociones" } },
  { id: "okul", icon: "🎒", accent: "#fdecd9", label: { tr: "Okul", en: "School", fr: "École", es: "Escuela" } },
  { id: "ulasim", icon: "🚌", accent: "#e2eef7", label: { tr: "Ulaşım", en: "Transport", fr: "Transport", es: "Transporte" } },
  { id: "doga", icon: "🌳", accent: "#e2f3e7", label: { tr: "Doğa", en: "Nature", fr: "Nature", es: "Naturaleza" } },
  { id: "sehir", icon: "🏙️", accent: "#eae2f7", label: { tr: "Şehir", en: "City", fr: "Ville", es: "Ciudad" } },
  { id: "seyahat", icon: "✈️", accent: "#fde2ea", label: { tr: "Seyahat", en: "Travel", fr: "Voyage", es: "Viajes" } },
  { id: "alisveris", icon: "🛍️", accent: "#e2f3e7", label: { tr: "Alışveriş", en: "Shopping", fr: "Achats", es: "Compras" } },
  { id: "hava", icon: "🌦️", accent: "#eae2f7", label: { tr: "Hava Durumu", en: "Weather", fr: "Météo", es: "Clima" } },
  { id: "spor", icon: "⚽", accent: "#fdecd9", label: { tr: "Spor", en: "Sports", fr: "Sport", es: "Deportes" } },
  { id: "teknoloji", icon: "💻", accent: "#e2eef7", label: { tr: "Teknoloji", en: "Technology", fr: "Technologie", es: "Tecnología" } },
  { id: "saglik", icon: "🩺", accent: "#fde2ea", label: { tr: "Sağlık", en: "Health", fr: "Santé", es: "Salud" } },
  { id: "is", icon: "🏢", accent: "#e2f3e7", label: { tr: "İş Hayatı", en: "Business", fr: "Travail", es: "Negocios" } },
  { id: "muzik", icon: "🎵", accent: "#eae2f7", label: { tr: "Müzik", en: "Music", fr: "Musique", es: "Música" } },
  { id: "iletisim", icon: "💬", accent: "#fdecd9", label: { tr: "İletişim", en: "Communication", fr: "Communication", es: "Comunicación" } },
  { id: "egitim", icon: "📚", accent: "#e2eef7", label: { tr: "Eğitim", en: "Education", fr: "Éducation", es: "Educación" } },

  // --- ileri seviye temaları ---
  { id: "cevre", icon: "🌍", accent: "#e2f3e7", label: { tr: "Çevre", en: "Environment", fr: "Environnement", es: "Medio ambiente" } },
  { id: "ekonomi", icon: "📈", accent: "#fdecd9", label: { tr: "Ekonomi", en: "Economy", fr: "Économie", es: "Economía" } },
  { id: "medya", icon: "📰", accent: "#e2eef7", label: { tr: "Medya", en: "Media", fr: "Médias", es: "Medios" } },
  { id: "bilim", icon: "🔬", accent: "#eae2f7", label: { tr: "Bilim", en: "Science", fr: "Science", es: "Ciencia" } },
  { id: "sanat", icon: "🖼️", accent: "#fde2ea", label: { tr: "Sanat", en: "Art", fr: "Art", es: "Arte" } },
  { id: "hukuk", icon: "⚖️", accent: "#e2eef7", label: { tr: "Hukuk", en: "Law", fr: "Droit", es: "Derecho" } },
  { id: "toplum", icon: "🏛️", accent: "#e2f3e7", label: { tr: "Toplum", en: "Society", fr: "Société", es: "Sociedad" } },
  { id: "psikoloji", icon: "🧠", accent: "#eae2f7", label: { tr: "Psikoloji", en: "Psychology", fr: "Psychologie", es: "Psicología" } },
  { id: "felsefe", icon: "💭", accent: "#fdecd9", label: { tr: "Felsefe", en: "Philosophy", fr: "Philosophie", es: "Filosofía" } },
  { id: "politika", icon: "🗳️", accent: "#fde2ea", label: { tr: "Politika", en: "Politics", fr: "Politique", es: "Política" } },
  { id: "edebiyat", icon: "📖", accent: "#e2eef7", label: { tr: "Edebiyat", en: "Literature", fr: "Littérature", es: "Literatura" } },
  { id: "akademik", icon: "🎓", accent: "#e2f3e7", label: { tr: "Akademik Dil", en: "Academic", fr: "Langue académique", es: "Lenguaje académico" } },
  { id: "soyut", icon: "🌀", accent: "#eae2f7", label: { tr: "Soyut Kavramlar", en: "Abstract Concepts", fr: "Concepts abstraits", es: "Conceptos abstractos" } },
  { id: "diplomasi", icon: "🕊️", accent: "#fdecd9", label: { tr: "Diplomasi", en: "Diplomacy", fr: "Diplomatie", es: "Diplomacia" } },
];

const SERINO_UNITS = [
  // ---------- A1 · Başlangıç ----------
  {
    id: "temel-a1",
    categoryId: "temel",
    levelId: "a1",
    words: [
      { en: "hello", tr: "merhaba", fr: "bonjour", es: "hola" },
      { en: "goodbye", tr: "hoşça kal", fr: "au revoir", es: "adiós" },
      { en: "yes", tr: "evet", fr: "oui", es: "sí" },
      { en: "no", tr: "hayır", fr: "non", es: "no" },
      { en: "please", tr: "lütfen", fr: "s'il vous plaît", es: "por favor" },
      { en: "thank you", tr: "teşekkür ederim", fr: "merci", es: "gracias" },
      { en: "sorry", tr: "özür dilerim", fr: "pardon", es: "perdón" },
      { en: "friend", tr: "arkadaş", fr: "ami", es: "amigo" },
    ],
    sentences: [
      { en: "Thank you very much.", tr: "Çok teşekkür ederim.", fr: "Merci beaucoup.", es: "Muchas gracias." },
      { en: "I am sorry.", tr: "Özür dilerim.", fr: "Je suis désolé.", es: "Lo siento." },
      { en: "Hello, how are you?", tr: "Merhaba, nasılsın?", fr: "Bonjour, comment vas-tu ?", es: "Hola, ¿cómo estás?" },
    ],
  },
  {
    id: "aile-a1",
    categoryId: "aile",
    levelId: "a1",
    words: [
      { en: "mother", tr: "anne", fr: "mère", es: "madre" },
      { en: "father", tr: "baba", fr: "père", es: "padre" },
      { en: "sister", tr: "kız kardeş", fr: "sœur", es: "hermana" },
      { en: "brother", tr: "erkek kardeş", fr: "frère", es: "hermano" },
      { en: "child", tr: "çocuk", fr: "enfant", es: "niño" },
      { en: "family", tr: "aile", fr: "famille", es: "familia" },
      { en: "grandmother", tr: "büyükanne", fr: "grand-mère", es: "abuela" },
      { en: "grandfather", tr: "büyükbaba", fr: "grand-père", es: "abuelo" },
    ],
    sentences: [
      { en: "This is my family.", tr: "Bu benim ailem.", fr: "C'est ma famille.", es: "Esta es mi familia." },
      { en: "My mother and father are here.", tr: "Annem ve babam burada.", fr: "Ma mère et mon père sont ici.", es: "Mi madre y mi padre están aquí." },
    ],
  },
  {
    id: "yiyecek-a1",
    categoryId: "yiyecek",
    levelId: "a1",
    words: [
      { en: "bread", tr: "ekmek", fr: "pain", es: "pan" },
      { en: "water", tr: "su", fr: "eau", es: "agua" },
      { en: "apple", tr: "elma", fr: "pomme", es: "manzana" },
      { en: "milk", tr: "süt", fr: "lait", es: "leche" },
      { en: "coffee", tr: "kahve", fr: "café", es: "café" },
      { en: "tea", tr: "çay", fr: "thé", es: "té" },
      { en: "egg", tr: "yumurta", fr: "œuf", es: "huevo" },
      { en: "cheese", tr: "peynir", fr: "fromage", es: "queso" },
    ],
    sentences: [
      { en: "I drink coffee every morning.", tr: "Her sabah kahve içerim.", fr: "Je bois du café chaque matin.", es: "Bebo café cada mañana." },
      { en: "She likes apples and cheese.", tr: "O elma ve peyniri sever.", fr: "Elle aime les pommes et le fromage.", es: "A ella le gustan las manzanas y el queso." },
    ],
  },
  {
    id: "sayilar-a1",
    categoryId: "sayilar",
    levelId: "a1",
    words: [
      { en: "one", tr: "bir", fr: "un", es: "uno" },
      { en: "two", tr: "iki", fr: "deux", es: "dos" },
      { en: "three", tr: "üç", fr: "trois", es: "tres" },
      { en: "four", tr: "dört", fr: "quatre", es: "cuatro" },
      { en: "five", tr: "beş", fr: "cinq", es: "cinco" },
      { en: "six", tr: "altı", fr: "six", es: "seis" },
      { en: "seven", tr: "yedi", fr: "sept", es: "siete" },
      { en: "eight", tr: "sekiz", fr: "huit", es: "ocho" },
    ],
    sentences: [
      { en: "I have two brothers.", tr: "İki erkek kardeşim var.", fr: "J'ai deux frères.", es: "Tengo dos hermanos." },
      { en: "She is eight years old.", tr: "O sekiz yaşında.", fr: "Elle a huit ans.", es: "Ella tiene ocho años." },
    ],
  },
  {
    id: "gunluk-a1",
    categoryId: "gunluk",
    levelId: "a1",
    words: [
      { en: "house", tr: "ev", fr: "maison", es: "casa" },
      { en: "work", tr: "iş", fr: "travail", es: "trabajo" },
      { en: "school", tr: "okul", fr: "école", es: "escuela" },
      { en: "book", tr: "kitap", fr: "livre", es: "libro" },
      { en: "time", tr: "zaman", fr: "temps", es: "tiempo" },
      { en: "day", tr: "gün", fr: "jour", es: "día" },
      { en: "night", tr: "gece", fr: "nuit", es: "noche" },
      { en: "city", tr: "şehir", fr: "ville", es: "ciudad" },
    ],
    sentences: [
      { en: "I go to school every day.", tr: "Her gün okula giderim.", fr: "Je vais à l'école tous les jours.", es: "Voy a la escuela todos los días." },
      { en: "This city is very big.", tr: "Bu şehir çok büyük.", fr: "Cette ville est très grande.", es: "Esta ciudad es muy grande." },
    ],
  },
  {
    id: "renkler-a1",
    categoryId: "renkler",
    levelId: "a1",
    words: [
      { en: "red", tr: "kırmızı", fr: "rouge", es: "rojo" },
      { en: "blue", tr: "mavi", fr: "bleu", es: "azul" },
      { en: "green", tr: "yeşil", fr: "vert", es: "verde" },
      { en: "yellow", tr: "sarı", fr: "jaune", es: "amarillo" },
      { en: "black", tr: "siyah", fr: "noir", es: "negro" },
      { en: "white", tr: "beyaz", fr: "blanc", es: "blanco" },
      { en: "orange", tr: "turuncu", fr: "orange", es: "naranja" },
      { en: "purple", tr: "mor", fr: "violet", es: "morado" },
    ],
    sentences: [
      { en: "The sky is blue.", tr: "Gökyüzü mavidir.", fr: "Le ciel est bleu.", es: "El cielo es azul." },
      { en: "I like the color red.", tr: "Kırmızı rengi severim.", fr: "J'aime la couleur rouge.", es: "Me gusta el color rojo." },
    ],
  },
  {
    id: "hayvanlar-a1",
    categoryId: "hayvanlar",
    levelId: "a1",
    words: [
      { en: "dog", tr: "köpek", fr: "chien", es: "perro" },
      { en: "cat", tr: "kedi", fr: "chat", es: "gato" },
      { en: "bird", tr: "kuş", fr: "oiseau", es: "pájaro" },
      { en: "fish", tr: "balık", fr: "poisson", es: "pez" },
      { en: "horse", tr: "at", fr: "cheval", es: "caballo" },
      { en: "cow", tr: "inek", fr: "vache", es: "vaca" },
      { en: "lion", tr: "aslan", fr: "lion", es: "león" },
      { en: "rabbit", tr: "tavşan", fr: "lapin", es: "conejo" },
    ],
    sentences: [
      { en: "The dog is very friendly.", tr: "Köpek çok arkadaş canlısı.", fr: "Le chien est très gentil.", es: "El perro es muy amistoso." },
      { en: "I have a small cat.", tr: "Küçük bir kedim var.", fr: "J'ai un petit chat.", es: "Tengo un gato pequeño." },
    ],
  },
  {
    id: "zaman-a1",
    categoryId: "zaman",
    levelId: "a1",
    words: [
      { en: "today", tr: "bugün", fr: "aujourd'hui", es: "hoy" },
      { en: "tomorrow", tr: "yarın", fr: "demain", es: "mañana" },
      { en: "yesterday", tr: "dün", fr: "hier", es: "ayer" },
      { en: "week", tr: "hafta", fr: "semaine", es: "semana" },
      { en: "month", tr: "ay", fr: "mois", es: "mes" },
      { en: "year", tr: "yıl", fr: "année", es: "año" },
      { en: "hour", tr: "saat", fr: "heure", es: "hora" },
      { en: "minute", tr: "dakika", fr: "minute", es: "minuto" },
    ],
    sentences: [
      { en: "See you tomorrow.", tr: "Yarın görüşürüz.", fr: "À demain.", es: "Hasta mañana." },
      { en: "I am busy this week.", tr: "Bu hafta meşgulüm.", fr: "Je suis occupé cette semaine.", es: "Estoy ocupado esta semana." },
    ],
  },
  {
    id: "vucut-a1",
    categoryId: "vucut",
    levelId: "a1",
    words: [
      { en: "head", tr: "baş", fr: "tête", es: "cabeza" },
      { en: "hand", tr: "el", fr: "main", es: "mano" },
      { en: "eye", tr: "göz", fr: "œil", es: "ojo" },
      { en: "ear", tr: "kulak", fr: "oreille", es: "oreja" },
      { en: "foot", tr: "ayak", fr: "pied", es: "pie" },
      { en: "nose", tr: "burun", fr: "nez", es: "nariz" },
      { en: "mouth", tr: "ağız", fr: "bouche", es: "boca" },
      { en: "hair", tr: "saç", fr: "cheveux", es: "pelo" },
    ],
    sentences: [
      { en: "Close your eyes.", tr: "Gözlerini kapat.", fr: "Ferme les yeux.", es: "Cierra los ojos." },
      { en: "My hands are cold.", tr: "Ellerim soğuk.", fr: "J'ai les mains froides.", es: "Tengo las manos frías." },
    ],
  },
  {
    id: "giysiler-a1",
    categoryId: "giysiler",
    levelId: "a1",
    words: [
      { en: "shirt", tr: "gömlek", fr: "chemise", es: "camisa" },
      { en: "shoes", tr: "ayakkabı", fr: "chaussures", es: "zapatos" },
      { en: "hat", tr: "şapka", fr: "chapeau", es: "sombrero" },
      { en: "dress", tr: "elbise", fr: "robe", es: "vestido" },
      { en: "jacket", tr: "ceket", fr: "veste", es: "chaqueta" },
      { en: "socks", tr: "çorap", fr: "chaussettes", es: "calcetines" },
      { en: "pants", tr: "pantolon", fr: "pantalon", es: "pantalones" },
      { en: "scarf", tr: "atkı", fr: "écharpe", es: "bufanda" },
    ],
    sentences: [
      { en: "I need new shoes.", tr: "Yeni ayakkabıya ihtiyacım var.", fr: "J'ai besoin de nouvelles chaussures.", es: "Necesito zapatos nuevos." },
      { en: "She is wearing a red dress.", tr: "O kırmızı bir elbise giyiyor.", fr: "Elle porte une robe rouge.", es: "Ella lleva un vestido rojo." },
    ],
  },
  {
    id: "ev-a1",
    categoryId: "ev",
    levelId: "a1",
    words: [
      { en: "door", tr: "kapı", fr: "porte", es: "puerta" },
      { en: "window", tr: "pencere", fr: "fenêtre", es: "ventana" },
      { en: "table", tr: "masa", fr: "table", es: "mesa" },
      { en: "chair", tr: "sandalye", fr: "chaise", es: "silla" },
      { en: "bed", tr: "yatak", fr: "lit", es: "cama" },
      { en: "kitchen", tr: "mutfak", fr: "cuisine", es: "cocina" },
      { en: "room", tr: "oda", fr: "chambre", es: "habitación" },
      { en: "key", tr: "anahtar", fr: "clé", es: "llave" },
    ],
    sentences: [
      { en: "The key is on the table.", tr: "Anahtar masanın üstünde.", fr: "La clé est sur la table.", es: "La llave está sobre la mesa." },
      { en: "Please close the door.", tr: "Lütfen kapıyı kapat.", fr: "Ferme la porte, s'il te plaît.", es: "Cierra la puerta, por favor." },
    ],
  },
  {
    id: "fiiller-a1",
    categoryId: "fiiller",
    levelId: "a1",
    words: [
      { en: "to go", tr: "gitmek", fr: "aller", es: "ir" },
      { en: "to come", tr: "gelmek", fr: "venir", es: "venir" },
      { en: "to eat", tr: "yemek", fr: "manger", es: "comer" },
      { en: "to drink", tr: "içmek", fr: "boire", es: "beber" },
      { en: "to see", tr: "görmek", fr: "voir", es: "ver" },
      { en: "to speak", tr: "konuşmak", fr: "parler", es: "hablar" },
      { en: "to read", tr: "okumak", fr: "lire", es: "leer" },
      { en: "to write", tr: "yazmak", fr: "écrire", es: "escribir" },
    ],
    sentences: [
      { en: "I want to eat something.", tr: "Bir şey yemek istiyorum.", fr: "Je veux manger quelque chose.", es: "Quiero comer algo." },
      { en: "Can you speak slowly?", tr: "Yavaş konuşabilir misin?", fr: "Peux-tu parler lentement ?", es: "¿Puedes hablar despacio?" },
    ],
  },

  // ---------- A2 · Temel ----------
  {
    id: "meslekler-a2",
    categoryId: "meslekler",
    levelId: "a2",
    words: [
      { en: "teacher", tr: "öğretmen", fr: "professeur", es: "profesor" },
      { en: "doctor", tr: "doktor", fr: "médecin", es: "médico" },
      { en: "engineer", tr: "mühendis", fr: "ingénieur", es: "ingeniero" },
      { en: "driver", tr: "şoför", fr: "chauffeur", es: "conductor" },
      { en: "farmer", tr: "çiftçi", fr: "agriculteur", es: "agricultor" },
      { en: "nurse", tr: "hemşire", fr: "infirmier", es: "enfermero" },
      { en: "lawyer", tr: "avukat", fr: "avocat", es: "abogado" },
      { en: "artist", tr: "sanatçı", fr: "artiste", es: "artista" },
    ],
    sentences: [
      { en: "My father is a doctor.", tr: "Babam bir doktor.", fr: "Mon père est médecin.", es: "Mi padre es médico." },
      { en: "She wants to be a teacher.", tr: "O bir öğretmen olmak istiyor.", fr: "Elle veut devenir professeur.", es: "Ella quiere ser profesora." },
    ],
  },
  {
    id: "duygular-a2",
    categoryId: "duygular",
    levelId: "a2",
    words: [
      { en: "happy", tr: "mutlu", fr: "heureux", es: "feliz" },
      { en: "sad", tr: "üzgün", fr: "triste", es: "triste" },
      { en: "angry", tr: "kızgın", fr: "en colère", es: "enfadado" },
      { en: "tired", tr: "yorgun", fr: "fatigué", es: "cansado" },
      { en: "excited", tr: "heyecanlı", fr: "enthousiaste", es: "emocionado" },
      { en: "afraid", tr: "korkmuş", fr: "effrayé", es: "asustado" },
      { en: "surprised", tr: "şaşırmış", fr: "surpris", es: "sorprendido" },
      { en: "calm", tr: "sakin", fr: "calme", es: "tranquilo" },
    ],
    sentences: [
      { en: "I am very happy today.", tr: "Bugün çok mutluyum.", fr: "Je suis très heureux aujourd'hui.", es: "Hoy estoy muy feliz." },
      { en: "Don't be afraid.", tr: "Korkma.", fr: "N'aie pas peur.", es: "No tengas miedo." },
    ],
  },
  {
    id: "okul-a2",
    categoryId: "okul",
    levelId: "a2",
    words: [
      { en: "student", tr: "öğrenci", fr: "étudiant", es: "estudiante" },
      { en: "lesson", tr: "ders", fr: "leçon", es: "lección" },
      { en: "homework", tr: "ödev", fr: "devoir", es: "deberes" },
      { en: "exam", tr: "sınav", fr: "examen", es: "examen" },
      { en: "notebook", tr: "defter", fr: "cahier", es: "cuaderno" },
      { en: "pencil", tr: "kalem", fr: "crayon", es: "lápiz" },
      { en: "classroom", tr: "sınıf", fr: "salle de classe", es: "aula" },
      { en: "library", tr: "kütüphane", fr: "bibliothèque", es: "biblioteca" },
    ],
    sentences: [
      { en: "I have an exam tomorrow.", tr: "Yarın sınavım var.", fr: "J'ai un examen demain.", es: "Tengo un examen mañana." },
      { en: "The library is next to the school.", tr: "Kütüphane okulun yanında.", fr: "La bibliothèque est à côté de l'école.", es: "La biblioteca está al lado de la escuela." },
    ],
  },
  {
    id: "ulasim-a2",
    categoryId: "ulasim",
    levelId: "a2",
    words: [
      { en: "bus", tr: "otobüs", fr: "bus", es: "autobús" },
      { en: "train", tr: "tren", fr: "train", es: "tren" },
      { en: "car", tr: "araba", fr: "voiture", es: "coche" },
      { en: "plane", tr: "uçak", fr: "avion", es: "avión" },
      { en: "bicycle", tr: "bisiklet", fr: "vélo", es: "bicicleta" },
      { en: "station", tr: "istasyon", fr: "gare", es: "estación" },
      { en: "road", tr: "yol", fr: "route", es: "carretera" },
      { en: "traffic", tr: "trafik", fr: "circulation", es: "tráfico" },
    ],
    sentences: [
      { en: "I take the bus to work.", tr: "İşe otobüsle giderim.", fr: "Je prends le bus pour aller au travail.", es: "Voy al trabajo en autobús." },
      { en: "The train is late.", tr: "Tren geç kaldı.", fr: "Le train est en retard.", es: "El tren llega tarde." },
    ],
  },
  {
    id: "yiyecek-a2",
    categoryId: "yiyecek",
    levelId: "a2",
    words: [
      { en: "meat", tr: "et", fr: "viande", es: "carne" },
      { en: "rice", tr: "pirinç", fr: "riz", es: "arroz" },
      { en: "soup", tr: "çorba", fr: "soupe", es: "sopa" },
      { en: "salt", tr: "tuz", fr: "sel", es: "sal" },
      { en: "sugar", tr: "şeker", fr: "sucre", es: "azúcar" },
      { en: "vegetable", tr: "sebze", fr: "légume", es: "verdura" },
      { en: "fruit", tr: "meyve", fr: "fruit", es: "fruta" },
      { en: "breakfast", tr: "kahvaltı", fr: "petit-déjeuner", es: "desayuno" },
    ],
    sentences: [
      { en: "Breakfast is ready.", tr: "Kahvaltı hazır.", fr: "Le petit-déjeuner est prêt.", es: "El desayuno está listo." },
      { en: "There is too much salt in the soup.", tr: "Çorbada çok fazla tuz var.", fr: "Il y a trop de sel dans la soupe.", es: "Hay demasiada sal en la sopa." },
    ],
  },
  {
    id: "doga-a2",
    categoryId: "doga",
    levelId: "a2",
    words: [
      { en: "tree", tr: "ağaç", fr: "arbre", es: "árbol" },
      { en: "flower", tr: "çiçek", fr: "fleur", es: "flor" },
      { en: "mountain", tr: "dağ", fr: "montagne", es: "montaña" },
      { en: "sea", tr: "deniz", fr: "mer", es: "mar" },
      { en: "river", tr: "nehir", fr: "rivière", es: "río" },
      { en: "forest", tr: "orman", fr: "forêt", es: "bosque" },
      { en: "sky", tr: "gökyüzü", fr: "ciel", es: "cielo" },
      { en: "stone", tr: "taş", fr: "pierre", es: "piedra" },
    ],
    sentences: [
      { en: "We walked in the forest.", tr: "Ormanda yürüdük.", fr: "Nous avons marché dans la forêt.", es: "Caminamos por el bosque." },
      { en: "The mountain is very high.", tr: "Dağ çok yüksek.", fr: "La montagne est très haute.", es: "La montaña es muy alta." },
    ],
  },
  {
    id: "sehir-a2",
    categoryId: "sehir",
    levelId: "a2",
    words: [
      { en: "street", tr: "sokak", fr: "rue", es: "calle" },
      { en: "park", tr: "park", fr: "parc", es: "parque" },
      { en: "hospital", tr: "hastane", fr: "hôpital", es: "hospital" },
      { en: "bank", tr: "banka", fr: "banque", es: "banco" },
      { en: "restaurant", tr: "restoran", fr: "restaurant", es: "restaurante" },
      { en: "museum", tr: "müze", fr: "musée", es: "museo" },
      { en: "bridge", tr: "köprü", fr: "pont", es: "puente" },
      { en: "square", tr: "meydan", fr: "place", es: "plaza" },
    ],
    sentences: [
      { en: "The museum is near the square.", tr: "Müze meydanın yakınında.", fr: "Le musée est près de la place.", es: "El museo está cerca de la plaza." },
      { en: "Is there a bank on this street?", tr: "Bu sokakta banka var mı?", fr: "Y a-t-il une banque dans cette rue ?", es: "¿Hay un banco en esta calle?" },
    ],
  },
  {
    id: "sifatlar-a2",
    categoryId: "sifatlar",
    levelId: "a2",
    words: [
      { en: "big", tr: "büyük", fr: "grand", es: "grande" },
      { en: "small", tr: "küçük", fr: "petit", es: "pequeño" },
      { en: "new", tr: "yeni", fr: "nouveau", es: "nuevo" },
      { en: "old", tr: "eski", fr: "vieux", es: "viejo" },
      { en: "easy", tr: "kolay", fr: "facile", es: "fácil" },
      { en: "difficult", tr: "zor", fr: "difficile", es: "difícil" },
      { en: "fast", tr: "hızlı", fr: "rapide", es: "rápido" },
      { en: "slow", tr: "yavaş", fr: "lent", es: "lento" },
    ],
    sentences: [
      { en: "This exercise is very easy.", tr: "Bu alıştırma çok kolay.", fr: "Cet exercice est très facile.", es: "Este ejercicio es muy fácil." },
      { en: "He has an old car.", tr: "Onun eski bir arabası var.", fr: "Il a une vieille voiture.", es: "Él tiene un coche viejo." },
    ],
  },
  {
    id: "gunluk-a2",
    categoryId: "gunluk",
    levelId: "a2",
    words: [
      { en: "to wake up", tr: "uyanmak", fr: "se réveiller", es: "despertarse" },
      { en: "to sleep", tr: "uyumak", fr: "dormir", es: "dormir" },
      { en: "to wash", tr: "yıkamak", fr: "laver", es: "lavar" },
      { en: "to cook", tr: "yemek pişirmek", fr: "cuisiner", es: "cocinar" },
      { en: "to clean", tr: "temizlemek", fr: "nettoyer", es: "limpiar" },
      { en: "to rest", tr: "dinlenmek", fr: "se reposer", es: "descansar" },
      { en: "to wait", tr: "beklemek", fr: "attendre", es: "esperar" },
      { en: "to forget", tr: "unutmak", fr: "oublier", es: "olvidar" },
    ],
    sentences: [
      { en: "I wake up at seven o'clock.", tr: "Saat yedide uyanırım.", fr: "Je me réveille à sept heures.", es: "Me despierto a las siete." },
      { en: "Don't forget to call me.", tr: "Beni aramayı unutma.", fr: "N'oublie pas de m'appeler.", es: "No olvides llamarme." },
    ],
  },
  {
    id: "aile-a2",
    categoryId: "aile",
    levelId: "a2",
    words: [
      { en: "wife", tr: "eş (kadın)", fr: "épouse", es: "esposa" },
      { en: "husband", tr: "koca", fr: "mari", es: "marido" },
      { en: "son", tr: "oğul", fr: "fils", es: "hijo" },
      { en: "daughter", tr: "kız evlat", fr: "fille", es: "hija" },
      { en: "uncle", tr: "amca", fr: "oncle", es: "tío" },
      { en: "aunt", tr: "teyze", fr: "tante", es: "tía" },
      { en: "cousin", tr: "kuzen", fr: "cousin", es: "primo" },
      { en: "neighbour", tr: "komşu", fr: "voisin", es: "vecino" },
    ],
    sentences: [
      { en: "My cousin lives in another city.", tr: "Kuzenim başka bir şehirde yaşıyor.", fr: "Mon cousin habite dans une autre ville.", es: "Mi primo vive en otra ciudad." },
      { en: "Our neighbours are very kind.", tr: "Komşularımız çok kibar.", fr: "Nos voisins sont très gentils.", es: "Nuestros vecinos son muy amables." },
    ],
  },

  // ---------- B1 · Orta Seviye ----------
  {
    id: "seyahat-b1",
    categoryId: "seyahat",
    levelId: "b1",
    words: [
      { en: "airport", tr: "havalimanı", fr: "aéroport", es: "aeropuerto" },
      { en: "ticket", tr: "bilet", fr: "billet", es: "billete" },
      { en: "passport", tr: "pasaport", fr: "passeport", es: "pasaporte" },
      { en: "hotel", tr: "otel", fr: "hôtel", es: "hotel" },
      { en: "suitcase", tr: "bavul", fr: "valise", es: "maleta" },
      { en: "map", tr: "harita", fr: "carte", es: "mapa" },
      { en: "journey", tr: "yolculuk", fr: "voyage", es: "viaje" },
      { en: "border", tr: "sınır", fr: "frontière", es: "frontera" },
    ],
    sentences: [
      { en: "Where is the airport?", tr: "Havalimanı nerede?", fr: "Où est l'aéroport ?", es: "¿Dónde está el aeropuerto?" },
      { en: "I lost my passport.", tr: "Pasaportumu kaybettim.", fr: "J'ai perdu mon passeport.", es: "He perdido mi pasaporte." },
    ],
  },
  {
    id: "alisveris-b1",
    categoryId: "alisveris",
    levelId: "b1",
    words: [
      { en: "price", tr: "fiyat", fr: "prix", es: "precio" },
      { en: "discount", tr: "indirim", fr: "réduction", es: "descuento" },
      { en: "receipt", tr: "fiş", fr: "reçu", es: "recibo" },
      { en: "cash", tr: "nakit", fr: "espèces", es: "efectivo" },
      { en: "market", tr: "pazar", fr: "marché", es: "mercado" },
      { en: "cashier", tr: "kasiyer", fr: "caissier", es: "cajero" },
      { en: "expensive", tr: "pahalı", fr: "cher", es: "caro" },
      { en: "cheap", tr: "ucuz", fr: "bon marché", es: "barato" },
    ],
    sentences: [
      { en: "This shirt is too expensive.", tr: "Bu gömlek çok pahalı.", fr: "Cette chemise est trop chère.", es: "Esta camisa es demasiado cara." },
      { en: "Can I pay by cash?", tr: "Nakit ödeyebilir miyim?", fr: "Puis-je payer en espèces ?", es: "¿Puedo pagar en efectivo?" },
    ],
  },
  {
    id: "hava-b1",
    categoryId: "hava",
    levelId: "b1",
    words: [
      { en: "rain", tr: "yağmur", fr: "pluie", es: "lluvia" },
      { en: "snow", tr: "kar", fr: "neige", es: "nieve" },
      { en: "sun", tr: "güneş", fr: "soleil", es: "sol" },
      { en: "wind", tr: "rüzgar", fr: "vent", es: "viento" },
      { en: "cloud", tr: "bulut", fr: "nuage", es: "nube" },
      { en: "storm", tr: "fırtına", fr: "tempête", es: "tormenta" },
      { en: "temperature", tr: "sıcaklık", fr: "température", es: "temperatura" },
      { en: "season", tr: "mevsim", fr: "saison", es: "estación" },
    ],
    sentences: [
      { en: "It is raining outside.", tr: "Dışarıda yağmur yağıyor.", fr: "Il pleut dehors.", es: "Está lloviendo fuera." },
      { en: "I love the summer season.", tr: "Yaz mevsimini çok severim.", fr: "J'adore la saison d'été.", es: "Me encanta la estación de verano." },
    ],
  },
  {
    id: "spor-b1",
    categoryId: "spor",
    levelId: "b1",
    words: [
      { en: "football", tr: "futbol", fr: "football", es: "fútbol" },
      { en: "basketball", tr: "basketbol", fr: "basket-ball", es: "baloncesto" },
      { en: "swimming", tr: "yüzme", fr: "natation", es: "natación" },
      { en: "running", tr: "koşu", fr: "course à pied", es: "carrera" },
      { en: "team", tr: "takım", fr: "équipe", es: "equipo" },
      { en: "match", tr: "maç", fr: "match", es: "partido" },
      { en: "champion", tr: "şampiyon", fr: "champion", es: "campeón" },
      { en: "referee", tr: "hakem", fr: "arbitre", es: "árbitro" },
    ],
    sentences: [
      { en: "Our team won the match.", tr: "Takımımız maçı kazandı.", fr: "Notre équipe a gagné le match.", es: "Nuestro equipo ganó el partido." },
      { en: "He goes swimming every week.", tr: "O her hafta yüzmeye gider.", fr: "Il va nager chaque semaine.", es: "Él va a nadar cada semana." },
    ],
  },
  {
    id: "teknoloji-b1",
    categoryId: "teknoloji",
    levelId: "b1",
    words: [
      { en: "computer", tr: "bilgisayar", fr: "ordinateur", es: "ordenador" },
      { en: "phone", tr: "telefon", fr: "téléphone", es: "teléfono" },
      { en: "internet", tr: "internet", fr: "internet", es: "internet" },
      { en: "screen", tr: "ekran", fr: "écran", es: "pantalla" },
      { en: "password", tr: "şifre", fr: "mot de passe", es: "contraseña" },
      { en: "application", tr: "uygulama", fr: "application", es: "aplicación" },
      { en: "battery", tr: "batarya", fr: "batterie", es: "batería" },
      { en: "keyboard", tr: "klavye", fr: "clavier", es: "teclado" },
    ],
    sentences: [
      { en: "I forgot my password.", tr: "Şifremi unuttum.", fr: "J'ai oublié mon mot de passe.", es: "He olvidado mi contraseña." },
      { en: "My phone battery is low.", tr: "Telefonumun bataryası az.", fr: "La batterie de mon téléphone est faible.", es: "La batería de mi teléfono está baja." },
    ],
  },
  {
    id: "saglik-b1",
    categoryId: "saglik",
    levelId: "b1",
    words: [
      { en: "illness", tr: "hastalık", fr: "maladie", es: "enfermedad" },
      { en: "medicine", tr: "ilaç", fr: "médicament", es: "medicamento" },
      { en: "pain", tr: "ağrı", fr: "douleur", es: "dolor" },
      { en: "fever", tr: "ateş", fr: "fièvre", es: "fiebre" },
      { en: "treatment", tr: "tedavi", fr: "traitement", es: "tratamiento" },
      { en: "appointment", tr: "randevu", fr: "rendez-vous", es: "cita" },
      { en: "pharmacy", tr: "eczane", fr: "pharmacie", es: "farmacia" },
      { en: "health", tr: "sağlık", fr: "santé", es: "salud" },
    ],
    sentences: [
      { en: "I have an appointment with the doctor.", tr: "Doktorla randevum var.", fr: "J'ai un rendez-vous chez le médecin.", es: "Tengo una cita con el médico." },
      { en: "Take this medicine twice a day.", tr: "Bu ilacı günde iki kez al.", fr: "Prenez ce médicament deux fois par jour.", es: "Tome este medicamento dos veces al día." },
    ],
  },
  {
    id: "is-b1",
    categoryId: "is",
    levelId: "b1",
    words: [
      { en: "office", tr: "ofis", fr: "bureau", es: "oficina" },
      { en: "meeting", tr: "toplantı", fr: "réunion", es: "reunión" },
      { en: "salary", tr: "maaş", fr: "salaire", es: "salario" },
      { en: "colleague", tr: "iş arkadaşı", fr: "collègue", es: "compañero de trabajo" },
      { en: "manager", tr: "yönetici", fr: "responsable", es: "jefe" },
      { en: "project", tr: "proje", fr: "projet", es: "proyecto" },
      { en: "deadline", tr: "son tarih", fr: "date limite", es: "fecha límite" },
      { en: "contract", tr: "sözleşme", fr: "contrat", es: "contrato" },
    ],
    sentences: [
      { en: "The meeting starts at nine.", tr: "Toplantı dokuzda başlıyor.", fr: "La réunion commence à neuf heures.", es: "La reunión empieza a las nueve." },
      { en: "We must finish the project before the deadline.", tr: "Projeyi son tarihten önce bitirmeliyiz.", fr: "Nous devons finir le projet avant la date limite.", es: "Debemos terminar el proyecto antes de la fecha límite." },
    ],
  },
  {
    id: "muzik-b1",
    categoryId: "muzik",
    levelId: "b1",
    words: [
      { en: "song", tr: "şarkı", fr: "chanson", es: "canción" },
      { en: "singer", tr: "şarkıcı", fr: "chanteur", es: "cantante" },
      { en: "guitar", tr: "gitar", fr: "guitare", es: "guitarra" },
      { en: "piano", tr: "piyano", fr: "piano", es: "piano" },
      { en: "concert", tr: "konser", fr: "concert", es: "concierto" },
      { en: "rhythm", tr: "ritim", fr: "rythme", es: "ritmo" },
      { en: "voice", tr: "ses", fr: "voix", es: "voz" },
      { en: "audience", tr: "seyirci", fr: "public", es: "público" },
    ],
    sentences: [
      { en: "She sings with a beautiful voice.", tr: "O güzel bir sesle şarkı söylüyor.", fr: "Elle chante avec une belle voix.", es: "Ella canta con una voz hermosa." },
      { en: "We went to a concert last night.", tr: "Dün gece bir konsere gittik.", fr: "Nous sommes allés à un concert hier soir.", es: "Anoche fuimos a un concierto." },
    ],
  },
  {
    id: "iletisim-b1",
    categoryId: "iletisim",
    levelId: "b1",
    words: [
      { en: "message", tr: "mesaj", fr: "message", es: "mensaje" },
      { en: "letter", tr: "mektup", fr: "lettre", es: "carta" },
      { en: "call", tr: "arama", fr: "appel", es: "llamada" },
      { en: "answer", tr: "cevap", fr: "réponse", es: "respuesta" },
      { en: "question", tr: "soru", fr: "question", es: "pregunta" },
      { en: "news", tr: "haber", fr: "nouvelle", es: "noticia" },
      { en: "advice", tr: "tavsiye", fr: "conseil", es: "consejo" },
      { en: "opinion", tr: "fikir", fr: "avis", es: "opinión" },
    ],
    sentences: [
      { en: "Can I ask you a question?", tr: "Sana bir soru sorabilir miyim?", fr: "Puis-je te poser une question ?", es: "¿Puedo hacerte una pregunta?" },
      { en: "I need your advice.", tr: "Tavsiyene ihtiyacım var.", fr: "J'ai besoin de ton conseil.", es: "Necesito tu consejo." },
    ],
  },
  {
    id: "egitim-b1",
    categoryId: "egitim",
    levelId: "b1",
    words: [
      { en: "university", tr: "üniversite", fr: "université", es: "universidad" },
      { en: "degree", tr: "diploma", fr: "diplôme", es: "título" },
      { en: "research", tr: "araştırma", fr: "recherche", es: "investigación" },
      { en: "knowledge", tr: "bilgi", fr: "connaissance", es: "conocimiento" },
      { en: "subject", tr: "konu", fr: "matière", es: "asignatura" },
      { en: "scholarship", tr: "burs", fr: "bourse", es: "beca" },
      { en: "success", tr: "başarı", fr: "réussite", es: "éxito" },
      { en: "effort", tr: "çaba", fr: "effort", es: "esfuerzo" },
    ],
    sentences: [
      { en: "He studies at a university in Paris.", tr: "Paris'te bir üniversitede okuyor.", fr: "Il étudie dans une université à Paris.", es: "Él estudia en una universidad en París." },
      { en: "Success requires a lot of effort.", tr: "Başarı çok çaba gerektirir.", fr: "La réussite demande beaucoup d'efforts.", es: "El éxito requiere mucho esfuerzo." },
    ],
  },

  // ---------- B2 · İleri Orta Seviye ----------
  {
    id: "cevre-b2",
    categoryId: "cevre",
    levelId: "b2",
    words: [
      { en: "pollution", tr: "kirlilik", fr: "pollution", es: "contaminación" },
      { en: "climate", tr: "iklim", fr: "climat", es: "clima" },
      { en: "recycling", tr: "geri dönüşüm", fr: "recyclage", es: "reciclaje" },
      { en: "waste", tr: "atık", fr: "déchets", es: "residuos" },
      { en: "energy", tr: "enerji", fr: "énergie", es: "energía" },
      { en: "sustainable", tr: "sürdürülebilir", fr: "durable", es: "sostenible" },
      { en: "species", tr: "tür", fr: "espèce", es: "especie" },
      { en: "drought", tr: "kuraklık", fr: "sécheresse", es: "sequía" },
    ],
    sentences: [
      { en: "Air pollution affects public health.", tr: "Hava kirliliği halk sağlığını etkiliyor.", fr: "La pollution de l'air affecte la santé publique.", es: "La contaminación del aire afecta a la salud pública." },
      { en: "We should use renewable energy sources.", tr: "Yenilenebilir enerji kaynakları kullanmalıyız.", fr: "Nous devrions utiliser des sources d'énergie renouvelables.", es: "Deberíamos usar fuentes de energía renovables." },
    ],
  },
  {
    id: "ekonomi-b2",
    categoryId: "ekonomi",
    levelId: "b2",
    words: [
      { en: "inflation", tr: "enflasyon", fr: "inflation", es: "inflación" },
      { en: "investment", tr: "yatırım", fr: "investissement", es: "inversión" },
      { en: "budget", tr: "bütçe", fr: "budget", es: "presupuesto" },
      { en: "tax", tr: "vergi", fr: "impôt", es: "impuesto" },
      { en: "supply", tr: "arz", fr: "offre", es: "oferta" },
      { en: "demand", tr: "talep", fr: "demande", es: "demanda" },
      { en: "profit", tr: "kâr", fr: "bénéfice", es: "beneficio" },
      { en: "debt", tr: "borç", fr: "dette", es: "deuda" },
    ],
    sentences: [
      { en: "Inflation reduces purchasing power.", tr: "Enflasyon alım gücünü azaltır.", fr: "L'inflation réduit le pouvoir d'achat.", es: "La inflación reduce el poder adquisitivo." },
      { en: "The company increased its profit last year.", tr: "Şirket geçen yıl kârını artırdı.", fr: "L'entreprise a augmenté son bénéfice l'an dernier.", es: "La empresa aumentó su beneficio el año pasado." },
    ],
  },
  {
    id: "medya-b2",
    categoryId: "medya",
    levelId: "b2",
    words: [
      { en: "journalist", tr: "gazeteci", fr: "journaliste", es: "periodista" },
      { en: "headline", tr: "manşet", fr: "titre", es: "titular" },
      { en: "source", tr: "kaynak", fr: "source", es: "fuente" },
      { en: "interview", tr: "röportaj", fr: "entretien", es: "entrevista" },
      { en: "broadcast", tr: "yayın", fr: "diffusion", es: "emisión" },
      { en: "advertisement", tr: "reklam", fr: "publicité", es: "anuncio" },
      { en: "censorship", tr: "sansür", fr: "censure", es: "censura" },
      { en: "bias", tr: "önyargı", fr: "parti pris", es: "sesgo" },
    ],
    sentences: [
      { en: "The journalist did not reveal her source.", tr: "Gazeteci kaynağını açıklamadı.", fr: "La journaliste n'a pas révélé sa source.", es: "La periodista no reveló su fuente." },
      { en: "Social media shapes public opinion.", tr: "Sosyal medya kamuoyunu şekillendirir.", fr: "Les réseaux sociaux façonnent l'opinion publique.", es: "Las redes sociales moldean la opinión pública." },
    ],
  },
  {
    id: "bilim-b2",
    categoryId: "bilim",
    levelId: "b2",
    words: [
      { en: "experiment", tr: "deney", fr: "expérience", es: "experimento" },
      { en: "theory", tr: "kuram", fr: "théorie", es: "teoría" },
      { en: "evidence", tr: "kanıt", fr: "preuve", es: "prueba" },
      { en: "hypothesis", tr: "hipotez", fr: "hypothèse", es: "hipótesis" },
      { en: "laboratory", tr: "laboratuvar", fr: "laboratoire", es: "laboratorio" },
      { en: "measurement", tr: "ölçüm", fr: "mesure", es: "medición" },
      { en: "discovery", tr: "keşif", fr: "découverte", es: "descubrimiento" },
      { en: "data", tr: "veri", fr: "données", es: "datos" },
    ],
    sentences: [
      { en: "The results confirm the hypothesis.", tr: "Sonuçlar hipotezi doğruluyor.", fr: "Les résultats confirment l'hypothèse.", es: "Los resultados confirman la hipótesis." },
      { en: "There is not enough evidence yet.", tr: "Henüz yeterli kanıt yok.", fr: "Il n'y a pas encore assez de preuves.", es: "Todavía no hay pruebas suficientes." },
    ],
  },
  {
    id: "sanat-b2",
    categoryId: "sanat",
    levelId: "b2",
    words: [
      { en: "painting", tr: "resim", fr: "peinture", es: "pintura" },
      { en: "sculpture", tr: "heykel", fr: "sculpture", es: "escultura" },
      { en: "exhibition", tr: "sergi", fr: "exposition", es: "exposición" },
      { en: "masterpiece", tr: "başyapıt", fr: "chef-d'œuvre", es: "obra maestra" },
      { en: "style", tr: "üslup", fr: "style", es: "estilo" },
      { en: "critic", tr: "eleştirmen", fr: "critique", es: "crítico" },
      { en: "inspiration", tr: "ilham", fr: "inspiration", es: "inspiración" },
      { en: "gallery", tr: "galeri", fr: "galerie", es: "galería" },
    ],
    sentences: [
      { en: "The exhibition opens next week.", tr: "Sergi gelecek hafta açılıyor.", fr: "L'exposition ouvre la semaine prochaine.", es: "La exposición abre la semana que viene." },
      { en: "This painting is considered a masterpiece.", tr: "Bu resim bir başyapıt olarak kabul edilir.", fr: "Ce tableau est considéré comme un chef-d'œuvre.", es: "Este cuadro se considera una obra maestra." },
    ],
  },
  {
    id: "saglik-b2",
    categoryId: "saglik",
    levelId: "b2",
    words: [
      { en: "surgery", tr: "ameliyat", fr: "chirurgie", es: "cirugía" },
      { en: "diagnosis", tr: "teşhis", fr: "diagnostic", es: "diagnóstico" },
      { en: "symptom", tr: "belirti", fr: "symptôme", es: "síntoma" },
      { en: "vaccine", tr: "aşı", fr: "vaccin", es: "vacuna" },
      { en: "recovery", tr: "iyileşme", fr: "guérison", es: "recuperación" },
      { en: "prevention", tr: "önleme", fr: "prévention", es: "prevención" },
      { en: "nutrition", tr: "beslenme", fr: "nutrition", es: "nutrición" },
      { en: "immune system", tr: "bağışıklık sistemi", fr: "système immunitaire", es: "sistema inmunitario" },
    ],
    sentences: [
      { en: "Early diagnosis saves lives.", tr: "Erken teşhis hayat kurtarır.", fr: "Un diagnostic précoce sauve des vies.", es: "Un diagnóstico temprano salva vidas." },
      { en: "Prevention is better than treatment.", tr: "Önleme tedaviden daha iyidir.", fr: "La prévention vaut mieux que le traitement.", es: "Prevenir es mejor que curar." },
    ],
  },
  {
    id: "hukuk-b2",
    categoryId: "hukuk",
    levelId: "b2",
    words: [
      { en: "law", tr: "yasa", fr: "loi", es: "ley" },
      { en: "court", tr: "mahkeme", fr: "tribunal", es: "tribunal" },
      { en: "judge", tr: "hâkim", fr: "juge", es: "juez" },
      { en: "witness", tr: "tanık", fr: "témoin", es: "testigo" },
      { en: "trial", tr: "duruşma", fr: "procès", es: "juicio" },
      { en: "right", tr: "hak", fr: "droit", es: "derecho" },
      { en: "punishment", tr: "ceza", fr: "punition", es: "castigo" },
      { en: "justice", tr: "adalet", fr: "justice", es: "justicia" },
    ],
    sentences: [
      { en: "Everyone is equal before the law.", tr: "Herkes yasa önünde eşittir.", fr: "Tout le monde est égal devant la loi.", es: "Todos son iguales ante la ley." },
      { en: "The witness testified in court.", tr: "Tanık mahkemede ifade verdi.", fr: "Le témoin a témoigné au tribunal.", es: "El testigo declaró en el tribunal." },
    ],
  },
  {
    id: "is-b2",
    categoryId: "is",
    levelId: "b2",
    words: [
      { en: "negotiation", tr: "müzakere", fr: "négociation", es: "negociación" },
      { en: "strategy", tr: "strateji", fr: "stratégie", es: "estrategia" },
      { en: "competitor", tr: "rakip", fr: "concurrent", es: "competidor" },
      { en: "customer", tr: "müşteri", fr: "client", es: "cliente" },
      { en: "recruitment", tr: "işe alım", fr: "recrutement", es: "contratación" },
      { en: "productivity", tr: "verimlilik", fr: "productivité", es: "productividad" },
      { en: "partnership", tr: "ortaklık", fr: "partenariat", es: "asociación" },
      { en: "revenue", tr: "gelir", fr: "chiffre d'affaires", es: "ingresos" },
    ],
    sentences: [
      { en: "The negotiation lasted three hours.", tr: "Müzakere üç saat sürdü.", fr: "La négociation a duré trois heures.", es: "La negociación duró tres horas." },
      { en: "Our main competitor lowered its prices.", tr: "Ana rakibimiz fiyatlarını düşürdü.", fr: "Notre principal concurrent a baissé ses prix.", es: "Nuestro principal competidor bajó sus precios." },
    ],
  },
  {
    id: "toplum-b2",
    categoryId: "toplum",
    levelId: "b2",
    words: [
      { en: "society", tr: "toplum", fr: "société", es: "sociedad" },
      { en: "equality", tr: "eşitlik", fr: "égalité", es: "igualdad" },
      { en: "poverty", tr: "yoksulluk", fr: "pauvreté", es: "pobreza" },
      { en: "migration", tr: "göç", fr: "migration", es: "migración" },
      { en: "population", tr: "nüfus", fr: "population", es: "población" },
      { en: "tradition", tr: "gelenek", fr: "tradition", es: "tradición" },
      { en: "minority", tr: "azınlık", fr: "minorité", es: "minoría" },
      { en: "solidarity", tr: "dayanışma", fr: "solidarité", es: "solidaridad" },
    ],
    sentences: [
      { en: "Migration changes the structure of society.", tr: "Göç toplumun yapısını değiştirir.", fr: "La migration transforme la structure de la société.", es: "La migración cambia la estructura de la sociedad." },
      { en: "Education reduces poverty in the long term.", tr: "Eğitim uzun vadede yoksulluğu azaltır.", fr: "L'éducation réduit la pauvreté à long terme.", es: "La educación reduce la pobreza a largo plazo." },
    ],
  },
  {
    id: "psikoloji-b2",
    categoryId: "psikoloji",
    levelId: "b2",
    words: [
      { en: "behaviour", tr: "davranış", fr: "comportement", es: "comportamiento" },
      { en: "memory", tr: "hafıza", fr: "mémoire", es: "memoria" },
      { en: "motivation", tr: "motivasyon", fr: "motivation", es: "motivación" },
      { en: "anxiety", tr: "kaygı", fr: "anxiété", es: "ansiedad" },
      { en: "perception", tr: "algı", fr: "perception", es: "percepción" },
      { en: "habit", tr: "alışkanlık", fr: "habitude", es: "hábito" },
      { en: "personality", tr: "kişilik", fr: "personnalité", es: "personalidad" },
      { en: "awareness", tr: "farkındalık", fr: "prise de conscience", es: "conciencia" },
    ],
    sentences: [
      { en: "Habits shape our daily behaviour.", tr: "Alışkanlıklar günlük davranışımızı şekillendirir.", fr: "Les habitudes façonnent notre comportement quotidien.", es: "Los hábitos moldean nuestro comportamiento diario." },
      { en: "Motivation decreases without a clear goal.", tr: "Net bir hedef olmadan motivasyon azalır.", fr: "La motivation diminue sans objectif clair.", es: "La motivación disminuye sin un objetivo claro." },
    ],
  },

  // ---------- C1 · İleri Seviye ----------
  {
    id: "felsefe-c1",
    categoryId: "felsefe",
    levelId: "c1",
    words: [
      { en: "consciousness", tr: "bilinç", fr: "conscience", es: "conciencia" },
      { en: "existence", tr: "varoluş", fr: "existence", es: "existencia" },
      { en: "truth", tr: "hakikat", fr: "vérité", es: "verdad" },
      { en: "morality", tr: "ahlak", fr: "morale", es: "moralidad" },
      { en: "free will", tr: "özgür irade", fr: "libre arbitre", es: "libre albedrío" },
      { en: "reasoning", tr: "akıl yürütme", fr: "raisonnement", es: "razonamiento" },
      { en: "meaning", tr: "anlam", fr: "sens", es: "sentido" },
      { en: "doubt", tr: "şüphe", fr: "doute", es: "duda" },
    ],
    sentences: [
      { en: "He questions the meaning of existence.", tr: "Varoluşun anlamını sorguluyor.", fr: "Il s'interroge sur le sens de l'existence.", es: "Él cuestiona el sentido de la existencia." },
      { en: "Doubt is the beginning of knowledge.", tr: "Şüphe, bilginin başlangıcıdır.", fr: "Le doute est le début du savoir.", es: "La duda es el comienzo del saber." },
    ],
  },
  {
    id: "politika-c1",
    categoryId: "politika",
    levelId: "c1",
    words: [
      { en: "government", tr: "hükümet", fr: "gouvernement", es: "gobierno" },
      { en: "election", tr: "seçim", fr: "élection", es: "elección" },
      { en: "policy", tr: "politika", fr: "politique", es: "política" },
      { en: "citizen", tr: "yurttaş", fr: "citoyen", es: "ciudadano" },
      { en: "sovereignty", tr: "egemenlik", fr: "souveraineté", es: "soberanía" },
      { en: "opposition", tr: "muhalefet", fr: "opposition", es: "oposición" },
      { en: "reform", tr: "reform", fr: "réforme", es: "reforma" },
      { en: "legitimacy", tr: "meşruiyet", fr: "légitimité", es: "legitimidad" },
    ],
    sentences: [
      { en: "The government announced a comprehensive reform.", tr: "Hükümet kapsamlı bir reform açıkladı.", fr: "Le gouvernement a annoncé une réforme globale.", es: "El gobierno anunció una reforma integral." },
      { en: "The opposition criticised the new policy.", tr: "Muhalefet yeni politikayı eleştirdi.", fr: "L'opposition a critiqué la nouvelle politique.", es: "La oposición criticó la nueva política." },
    ],
  },
  {
    id: "edebiyat-c1",
    categoryId: "edebiyat",
    levelId: "c1",
    words: [
      { en: "novel", tr: "roman", fr: "roman", es: "novela" },
      { en: "poem", tr: "şiir", fr: "poème", es: "poema" },
      { en: "metaphor", tr: "mecaz", fr: "métaphore", es: "metáfora" },
      { en: "narrator", tr: "anlatıcı", fr: "narrateur", es: "narrador" },
      { en: "plot", tr: "olay örgüsü", fr: "intrigue", es: "trama" },
      { en: "character", tr: "karakter", fr: "personnage", es: "personaje" },
      { en: "irony", tr: "ironi", fr: "ironie", es: "ironía" },
      { en: "translation", tr: "çeviri", fr: "traduction", es: "traducción" },
    ],
    sentences: [
      { en: "The narrator is not reliable.", tr: "Anlatıcı güvenilir değil.", fr: "Le narrateur n'est pas fiable.", es: "El narrador no es fiable." },
      { en: "The novel is full of subtle irony.", tr: "Roman ince bir ironiyle dolu.", fr: "Le roman est plein d'ironie subtile.", es: "La novela está llena de una ironía sutil." },
    ],
  },
  {
    id: "akademik-c1",
    categoryId: "akademik",
    levelId: "c1",
    words: [
      { en: "thesis", tr: "tez", fr: "thèse", es: "tesis" },
      { en: "argument", tr: "sav", fr: "argument", es: "argumento" },
      { en: "methodology", tr: "yöntem bilim", fr: "méthodologie", es: "metodología" },
      { en: "citation", tr: "atıf", fr: "citation", es: "cita" },
      { en: "assumption", tr: "varsayım", fr: "présupposé", es: "supuesto" },
      { en: "conclusion", tr: "sonuç", fr: "conclusion", es: "conclusión" },
      { en: "peer review", tr: "hakem değerlendirmesi", fr: "évaluation par les pairs", es: "revisión por pares" },
      { en: "framework", tr: "çerçeve", fr: "cadre", es: "marco" },
    ],
    sentences: [
      { en: "The author supports the argument with reliable data.", tr: "Yazar savını güvenilir verilerle destekliyor.", fr: "L'auteur appuie son argument sur des données fiables.", es: "El autor apoya su argumento con datos fiables." },
      { en: "This assumption weakens the conclusion.", tr: "Bu varsayım sonucu zayıflatıyor.", fr: "Ce présupposé affaiblit la conclusion.", es: "Este supuesto debilita la conclusión." },
    ],
  },
  {
    id: "soyut-c1",
    categoryId: "soyut",
    levelId: "c1",
    words: [
      { en: "ambiguity", tr: "muğlaklık", fr: "ambiguïté", es: "ambigüedad" },
      { en: "nuance", tr: "nüans", fr: "nuance", es: "matiz" },
      { en: "tendency", tr: "eğilim", fr: "tendance", es: "tendencia" },
      { en: "contradiction", tr: "çelişki", fr: "contradiction", es: "contradicción" },
      { en: "consequence", tr: "netice", fr: "conséquence", es: "consecuencia" },
      { en: "scope", tr: "kapsam", fr: "portée", es: "alcance" },
      { en: "threshold", tr: "eşik", fr: "seuil", es: "umbral" },
      { en: "distinction", tr: "ayrım", fr: "distinction", es: "distinción" },
    ],
    sentences: [
      { en: "There is a subtle distinction between the two concepts.", tr: "İki kavram arasında ince bir ayrım var.", fr: "Il y a une distinction subtile entre les deux concepts.", es: "Hay una distinción sutil entre los dos conceptos." },
      { en: "His argument contains an obvious contradiction.", tr: "Savı bariz bir çelişki içeriyor.", fr: "Son argument contient une contradiction évidente.", es: "Su argumento contiene una contradicción evidente." },
    ],
  },
  {
    id: "diplomasi-c1",
    categoryId: "diplomasi",
    levelId: "c1",
    words: [
      { en: "treaty", tr: "antlaşma", fr: "traité", es: "tratado" },
      { en: "alliance", tr: "ittifak", fr: "alliance", es: "alianza" },
      { en: "sanction", tr: "yaptırım", fr: "sanction", es: "sanción" },
      { en: "ceasefire", tr: "ateşkes", fr: "cessez-le-feu", es: "alto el fuego" },
      { en: "embassy", tr: "büyükelçilik", fr: "ambassade", es: "embajada" },
      { en: "mediation", tr: "arabuluculuk", fr: "médiation", es: "mediación" },
      { en: "agenda", tr: "gündem", fr: "ordre du jour", es: "agenda" },
      { en: "concession", tr: "taviz", fr: "concession", es: "concesión" },
    ],
    sentences: [
      { en: "Both sides agreed to a ceasefire.", tr: "İki taraf da ateşkes üzerinde anlaştı.", fr: "Les deux parties ont accepté un cessez-le-feu.", es: "Ambas partes acordaron un alto el fuego." },
      { en: "The treaty was signed after long negotiations.", tr: "Antlaşma uzun müzakerelerden sonra imzalandı.", fr: "Le traité a été signé après de longues négociations.", es: "El tratado se firmó tras largas negociaciones." },
    ],
  },
  {
    id: "bilim-c1",
    categoryId: "bilim",
    levelId: "c1",
    words: [
      { en: "artificial intelligence", tr: "yapay zekâ", fr: "intelligence artificielle", es: "inteligencia artificial" },
      { en: "algorithm", tr: "algoritma", fr: "algorithme", es: "algoritmo" },
      { en: "genome", tr: "genom", fr: "génome", es: "genoma" },
      { en: "particle", tr: "parçacık", fr: "particule", es: "partícula" },
      { en: "simulation", tr: "benzetim", fr: "simulation", es: "simulación" },
      { en: "uncertainty", tr: "belirsizlik", fr: "incertitude", es: "incertidumbre" },
      { en: "breakthrough", tr: "çığır açan gelişme", fr: "percée", es: "avance decisivo" },
      { en: "ethics", tr: "etik", fr: "éthique", es: "ética" },
    ],
    sentences: [
      { en: "Artificial intelligence raises new ethical questions.", tr: "Yapay zekâ yeni etik sorular doğuruyor.", fr: "L'intelligence artificielle soulève de nouvelles questions éthiques.", es: "La inteligencia artificial plantea nuevas cuestiones éticas." },
      { en: "The experiment reduced the margin of uncertainty.", tr: "Deney belirsizlik payını azalttı.", fr: "L'expérience a réduit la marge d'incertitude.", es: "El experimento redujo el margen de incertidumbre." },
    ],
  },
  {
    id: "ekonomi-c1",
    categoryId: "ekonomi",
    levelId: "c1",
    words: [
      { en: "monetary policy", tr: "para politikası", fr: "politique monétaire", es: "política monetaria" },
      { en: "recession", tr: "durgunluk", fr: "récession", es: "recesión" },
      { en: "liquidity", tr: "likidite", fr: "liquidité", es: "liquidez" },
      { en: "incentive", tr: "teşvik", fr: "incitation", es: "incentivo" },
      { en: "volatility", tr: "oynaklık", fr: "volatilité", es: "volatilidad" },
      { en: "subsidy", tr: "sübvansiyon", fr: "subvention", es: "subvención" },
      { en: "equilibrium", tr: "denge", fr: "équilibre", es: "equilibrio" },
      { en: "speculation", tr: "spekülasyon", fr: "spéculation", es: "especulación" },
    ],
    sentences: [
      { en: "The central bank tightened monetary policy.", tr: "Merkez bankası para politikasını sıkılaştırdı.", fr: "La banque centrale a resserré sa politique monétaire.", es: "El banco central endureció su política monetaria." },
      { en: "Market volatility discourages long-term investment.", tr: "Piyasa oynaklığı uzun vadeli yatırımı caydırır.", fr: "La volatilité des marchés décourage l'investissement à long terme.", es: "La volatilidad del mercado desalienta la inversión a largo plazo." },
    ],
  },

  // ---------- Yeni seviye eklemek için ----------
  // Örn. "c2" (Usta Seviye): önce SERINO_LEVELS dizisine ekle,
  // sonra buraya (SERINO_UNITS'in sonuna) o seviyeye ait üniteleri ekle.
];

function serinoCategory(id) {
  return SERINO_CATEGORIES.find((c) => c.id === id);
}

function serinoLevel(id) {
  return SERINO_LEVELS.find((l) => l.id === id);
}

/* Desteklenen diller. "name" alanı, her arayüz dilinde bu dilin nasıl
   adlandırılacağını belirtir (örn. İngilizce arayüzde "fr" için "French").
   Yeni bir dil eklemek istersen: buraya bir giriş ekle, her kelimeye/
   cümleye o dilin karşılığını ekle ve SERINO_UI (js/i18n.js) içindeki her
   dil sözlüğüne name.<yeni-kod> girişini ekle. */
const SERINO_LANGUAGES = {
  tr: {
    flag: "🇹🇷",
    name: { tr: "Türkçe", en: "Turkish", fr: "Turc", es: "Turco" },
  },
  en: {
    flag: "🇬🇧",
    name: { tr: "İngilizce", en: "English", fr: "Anglais", es: "Inglés" },
  },
  fr: {
    flag: "🇫🇷",
    name: { tr: "Fransızca", en: "French", fr: "Français", es: "Francés" },
  },
  es: {
    flag: "🇪🇸",
    name: { tr: "İspanyolca", en: "Spanish", fr: "Espagnol", es: "Español" },
  },
};
