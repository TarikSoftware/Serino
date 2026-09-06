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
   içerir:  { en: "...", tr: "...", fr: "...", es: "...", ru: "..." }
   Şu an desteklenenler: en (İngilizce), tr (Türkçe), fr (Fransızca),
   es (İspanyolca), ru (Rusça). Bkz. dosyanın sonundaki SERINO_LANGUAGES.

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
           { en: "airport", tr: "havalimanı", fr: "aéroport", es: "aeropuerto", ru: "аэропорт" },
           { en: "ticket", tr: "bilet", fr: "billet", es: "billete", ru: "билет" },
           // ... en az birkaç kelime çifti daha
         ],
         sentences: [ // opsiyonel - cümle kurma alıştırması üretir
           { en: "Where is the airport?", tr: "Havalimanı nerede?",
             fr: "Où est l'aéroport ?", es: "¿Dónde está el aeropuerto?", ru: "Где аэропорт?" },
         ],
       }

   - Yeni bir DİL eklemek istiyorsan: SERINO_LANGUAGES'e bir giriş ekle ve
     her kelimeye/cümleye o dilin alanını ekle (örn. de: "..."). Dilin
     SERINO_LEVELS / SERINO_CATEGORIES etiketlerine ve SERINO_UI (js/i18n.js)
     ile js/copy.js içindeki her sözlüğe de o dile ait girişi eklemeyi
     unutma - aksi halde o dil arayüz dili olarak seçildiğinde metinler
     Türkçeye düşer. Eğer yeni dilin alfabesi Latin değilse (örn. Rusça,
     Yunanca), SERINO_ALPHABETS'e bir giriş ekleyerek "alfabe eğitimi"
     modunu otomatik olarak açabilirsin.

   ÖNEMLİ: SERINO_UNITS dizisindeki SIRA, ders yolundaki ilerleme sırasını
   belirler - bir önceki ünite tamamlanmadan bir sonraki açılmaz. Yeni
   seviye eklerken üniteleri dizinin SONUNA eklemen yeterli.
   ========================================================================== */

const SERINO_LEVELS = [
  { id: "a1", code: "A1", label: { tr: "Başlangıç", en: "Beginner", fr: "Débutant", es: "Principiante", ru: "Начальный" } },
  { id: "a2", code: "A2", label: { tr: "Temel", en: "Elementary", fr: "Élémentaire", es: "Elemental", ru: "Элементарный" } },
  { id: "b1", code: "B1", label: { tr: "Orta Seviye", en: "Intermediate", fr: "Intermédiaire", es: "Intermedio", ru: "Средний" } },
  { id: "b2", code: "B2", label: { tr: "İleri Orta Seviye", en: "Upper Intermediate", fr: "Intermédiaire avancé", es: "Intermedio alto", ru: "Выше среднего" } },
  { id: "c1", code: "C1", label: { tr: "İleri Seviye", en: "Advanced", fr: "Avancé", es: "Avanzado", ru: "Продвинутый" } },
];

const SERINO_CATEGORIES = [
  // --- temel / günlük ---
  { id: "temel", icon: "👋", accent: "#fde2ea", label: { tr: "Temel Kelimeler", en: "Basics", fr: "Bases", es: "Básicos", ru: "Основы" } },
  { id: "aile", icon: "👨‍👩‍👧", accent: "#e2f3e7", label: { tr: "Aile", en: "Family", fr: "Famille", es: "Familia", ru: "Семья" } },
  { id: "yiyecek", icon: "🍎", accent: "#eae2f7", label: { tr: "Yiyecekler", en: "Food", fr: "Nourriture", es: "Comida", ru: "Еда" } },
  { id: "sayilar", icon: "🔢", accent: "#fdecd9", label: { tr: "Sayılar", en: "Numbers", fr: "Nombres", es: "Números", ru: "Числа" } },
  { id: "gunluk", icon: "🏡", accent: "#e2eef7", label: { tr: "Günlük Hayat", en: "Daily Life", fr: "Vie quotidienne", es: "Vida diaria", ru: "Повседневная жизнь" } },
  { id: "renkler", icon: "🎨", accent: "#fde2ea", label: { tr: "Renkler", en: "Colors", fr: "Couleurs", es: "Colores", ru: "Цвета" } },
  { id: "hayvanlar", icon: "🐾", accent: "#e2f3e7", label: { tr: "Hayvanlar", en: "Animals", fr: "Animaux", es: "Animales", ru: "Животные" } },
  { id: "zaman", icon: "⏰", accent: "#eae2f7", label: { tr: "Zaman", en: "Time", fr: "Temps", es: "Tiempo", ru: "Время" } },
  { id: "vucut", icon: "🖐️", accent: "#fdecd9", label: { tr: "Vücut", en: "Body", fr: "Corps", es: "Cuerpo", ru: "Тело" } },
  { id: "giysiler", icon: "👕", accent: "#e2eef7", label: { tr: "Giysiler", en: "Clothing", fr: "Vêtements", es: "Ropa", ru: "Одежда" } },
  { id: "ev", icon: "🛋️", accent: "#fde2ea", label: { tr: "Ev ve Eşyalar", en: "Home", fr: "Maison", es: "Casa", ru: "Дом" } },
  { id: "fiiller", icon: "🏃", accent: "#e2f3e7", label: { tr: "Fiiller", en: "Verbs", fr: "Verbes", es: "Verbos", ru: "Глаголы" } },
  { id: "sifatlar", icon: "✨", accent: "#eae2f7", label: { tr: "Sıfatlar", en: "Adjectives", fr: "Adjectifs", es: "Adjetivos", ru: "Прилагательные" } },

  // --- çevre / toplum ---
  { id: "meslekler", icon: "💼", accent: "#fde2ea", label: { tr: "Meslekler", en: "Professions", fr: "Métiers", es: "Profesiones", ru: "Профессии" } },
  { id: "duygular", icon: "😊", accent: "#e2f3e7", label: { tr: "Duygular", en: "Emotions", fr: "Émotions", es: "Emociones", ru: "Эмоции" } },
  { id: "okul", icon: "🎒", accent: "#fdecd9", label: { tr: "Okul", en: "School", fr: "École", es: "Escuela", ru: "Школа" } },
  { id: "ulasim", icon: "🚌", accent: "#e2eef7", label: { tr: "Ulaşım", en: "Transport", fr: "Transport", es: "Transporte", ru: "Транспорт" } },
  { id: "doga", icon: "🌳", accent: "#e2f3e7", label: { tr: "Doğa", en: "Nature", fr: "Nature", es: "Naturaleza", ru: "Природа" } },
  { id: "sehir", icon: "🏙️", accent: "#eae2f7", label: { tr: "Şehir", en: "City", fr: "Ville", es: "Ciudad", ru: "Город" } },
  { id: "seyahat", icon: "✈️", accent: "#fde2ea", label: { tr: "Seyahat", en: "Travel", fr: "Voyage", es: "Viajes", ru: "Путешествия" } },
  { id: "alisveris", icon: "🛍️", accent: "#e2f3e7", label: { tr: "Alışveriş", en: "Shopping", fr: "Achats", es: "Compras", ru: "Покупки" } },
  { id: "hava", icon: "🌦️", accent: "#eae2f7", label: { tr: "Hava Durumu", en: "Weather", fr: "Météo", es: "Clima", ru: "Погода" } },
  { id: "spor", icon: "⚽", accent: "#fdecd9", label: { tr: "Spor", en: "Sports", fr: "Sport", es: "Deportes", ru: "Спорт" } },
  { id: "teknoloji", icon: "💻", accent: "#e2eef7", label: { tr: "Teknoloji", en: "Technology", fr: "Technologie", es: "Tecnología", ru: "Технологии" } },
  { id: "saglik", icon: "🩺", accent: "#fde2ea", label: { tr: "Sağlık", en: "Health", fr: "Santé", es: "Salud", ru: "Здоровье" } },
  { id: "is", icon: "🏢", accent: "#e2f3e7", label: { tr: "İş Hayatı", en: "Business", fr: "Travail", es: "Negocios", ru: "Работа" } },
  { id: "muzik", icon: "🎵", accent: "#eae2f7", label: { tr: "Müzik", en: "Music", fr: "Musique", es: "Música", ru: "Музыка" } },
  { id: "iletisim", icon: "💬", accent: "#fdecd9", label: { tr: "İletişim", en: "Communication", fr: "Communication", es: "Comunicación", ru: "Общение" } },
  { id: "egitim", icon: "📚", accent: "#e2eef7", label: { tr: "Eğitim", en: "Education", fr: "Éducation", es: "Educación", ru: "Образование" } },

  // --- ileri seviye temaları ---
  { id: "cevre", icon: "🌍", accent: "#e2f3e7", label: { tr: "Çevre", en: "Environment", fr: "Environnement", es: "Medio ambiente", ru: "Окружающая среда" } },
  { id: "ekonomi", icon: "📈", accent: "#fdecd9", label: { tr: "Ekonomi", en: "Economy", fr: "Économie", es: "Economía", ru: "Экономика" } },
  { id: "medya", icon: "📰", accent: "#e2eef7", label: { tr: "Medya", en: "Media", fr: "Médias", es: "Medios", ru: "Медиа" } },
  { id: "bilim", icon: "🔬", accent: "#eae2f7", label: { tr: "Bilim", en: "Science", fr: "Science", es: "Ciencia", ru: "Наука" } },
  { id: "sanat", icon: "🖼️", accent: "#fde2ea", label: { tr: "Sanat", en: "Art", fr: "Art", es: "Arte", ru: "Искусство" } },
  { id: "hukuk", icon: "⚖️", accent: "#e2eef7", label: { tr: "Hukuk", en: "Law", fr: "Droit", es: "Derecho", ru: "Право" } },
  { id: "toplum", icon: "🏛️", accent: "#e2f3e7", label: { tr: "Toplum", en: "Society", fr: "Société", es: "Sociedad", ru: "Общество" } },
  { id: "psikoloji", icon: "🧠", accent: "#eae2f7", label: { tr: "Psikoloji", en: "Psychology", fr: "Psychologie", es: "Psicología", ru: "Психология" } },
  { id: "felsefe", icon: "💭", accent: "#fdecd9", label: { tr: "Felsefe", en: "Philosophy", fr: "Philosophie", es: "Filosofía", ru: "Философия" } },
  { id: "politika", icon: "🗳️", accent: "#fde2ea", label: { tr: "Politika", en: "Politics", fr: "Politique", es: "Política", ru: "Политика" } },
  { id: "edebiyat", icon: "📖", accent: "#e2eef7", label: { tr: "Edebiyat", en: "Literature", fr: "Littérature", es: "Literatura", ru: "Литература" } },
  { id: "akademik", icon: "🎓", accent: "#e2f3e7", label: { tr: "Akademik Dil", en: "Academic", fr: "Langue académique", es: "Lenguaje académico", ru: "Академический язык" } },
  { id: "soyut", icon: "🌀", accent: "#eae2f7", label: { tr: "Soyut Kavramlar", en: "Abstract Concepts", fr: "Concepts abstraits", es: "Conceptos abstractos", ru: "Абстрактные понятия" } },
  { id: "diplomasi", icon: "🕊️", accent: "#fdecd9", label: { tr: "Diplomasi", en: "Diplomacy", fr: "Diplomatie", es: "Diplomacia", ru: "Дипломатия" } },
];

const SERINO_UNITS = [
  // ---------- A1 · Başlangıç ----------
  {
    id: "temel-a1",
    categoryId: "temel",
    levelId: "a1",
    words: [
      { en: "hello", tr: "merhaba", fr: "bonjour", es: "hola", ru: "привет" },
      { en: "goodbye", tr: "hoşça kal", fr: "au revoir", es: "adiós", ru: "пока" },
      { en: "yes", tr: "evet", fr: "oui", es: "sí", ru: "да" },
      { en: "no", tr: "hayır", fr: "non", es: "no", ru: "нет" },
      { en: "please", tr: "lütfen", fr: "s'il vous plaît", es: "por favor", ru: "пожалуйста" },
      { en: "thank you", tr: "teşekkür ederim", fr: "merci", es: "gracias", ru: "спасибо" },
      { en: "sorry", tr: "özür dilerim", fr: "pardon", es: "perdón", ru: "извините" },
      { en: "friend", tr: "arkadaş", fr: "ami", es: "amigo", ru: "друг" },
    ],
    sentences: [
      { en: "Thank you very much.", tr: "Çok teşekkür ederim.", fr: "Merci beaucoup.", es: "Muchas gracias.", ru: "Большое спасибо." },
      { en: "I am sorry.", tr: "Özür dilerim.", fr: "Je suis désolé.", es: "Lo siento.", ru: "Мне жаль." },
      { en: "Hello, how are you?", tr: "Merhaba, nasılsın?", fr: "Bonjour, comment vas-tu ?", es: "Hola, ¿cómo estás?", ru: "Привет, как дела?" },
    ],
  },
  {
    id: "aile-a1",
    categoryId: "aile",
    levelId: "a1",
    words: [
      { en: "mother", tr: "anne", fr: "mère", es: "madre", ru: "мама" },
      { en: "father", tr: "baba", fr: "père", es: "padre", ru: "папа" },
      { en: "sister", tr: "kız kardeş", fr: "sœur", es: "hermana", ru: "сестра" },
      { en: "brother", tr: "erkek kardeş", fr: "frère", es: "hermano", ru: "брат" },
      { en: "child", tr: "çocuk", fr: "enfant", es: "niño", ru: "ребёнок" },
      { en: "family", tr: "aile", fr: "famille", es: "familia", ru: "семья" },
      { en: "grandmother", tr: "büyükanne", fr: "grand-mère", es: "abuela", ru: "бабушка" },
      { en: "grandfather", tr: "büyükbaba", fr: "grand-père", es: "abuelo", ru: "дедушка" },
    ],
    sentences: [
      { en: "This is my family.", tr: "Bu benim ailem.", fr: "C'est ma famille.", es: "Esta es mi familia.", ru: "Это моя семья." },
      { en: "My mother and father are here.", tr: "Annem ve babam burada.", fr: "Ma mère et mon père sont ici.", es: "Mi madre y mi padre están aquí.", ru: "Моя мама и папа здесь." },
    ],
  },
  {
    id: "yiyecek-a1",
    categoryId: "yiyecek",
    levelId: "a1",
    words: [
      { en: "bread", tr: "ekmek", fr: "pain", es: "pan", ru: "хлеб" },
      { en: "water", tr: "su", fr: "eau", es: "agua", ru: "вода" },
      { en: "apple", tr: "elma", fr: "pomme", es: "manzana", ru: "яблоко" },
      { en: "milk", tr: "süt", fr: "lait", es: "leche", ru: "молоко" },
      { en: "coffee", tr: "kahve", fr: "café", es: "café", ru: "кофе" },
      { en: "tea", tr: "çay", fr: "thé", es: "té", ru: "чай" },
      { en: "egg", tr: "yumurta", fr: "œuf", es: "huevo", ru: "яйцо" },
      { en: "cheese", tr: "peynir", fr: "fromage", es: "queso", ru: "сыр" },
    ],
    sentences: [
      { en: "I drink coffee every morning.", tr: "Her sabah kahve içerim.", fr: "Je bois du café chaque matin.", es: "Bebo café cada mañana.", ru: "Я пью кофе каждое утро." },
      { en: "She likes apples and cheese.", tr: "O elma ve peyniri sever.", fr: "Elle aime les pommes et le fromage.", es: "A ella le gustan las manzanas y el queso.", ru: "Она любит яблоки и сыр." },
    ],
  },
  {
    id: "sayilar-a1",
    categoryId: "sayilar",
    levelId: "a1",
    words: [
      { en: "one", tr: "bir", fr: "un", es: "uno", ru: "один" },
      { en: "two", tr: "iki", fr: "deux", es: "dos", ru: "два" },
      { en: "three", tr: "üç", fr: "trois", es: "tres", ru: "три" },
      { en: "four", tr: "dört", fr: "quatre", es: "cuatro", ru: "четыре" },
      { en: "five", tr: "beş", fr: "cinq", es: "cinco", ru: "пять" },
      { en: "six", tr: "altı", fr: "six", es: "seis", ru: "шесть" },
      { en: "seven", tr: "yedi", fr: "sept", es: "siete", ru: "семь" },
      { en: "eight", tr: "sekiz", fr: "huit", es: "ocho", ru: "восемь" },
    ],
    sentences: [
      { en: "I have two brothers.", tr: "İki erkek kardeşim var.", fr: "J'ai deux frères.", es: "Tengo dos hermanos.", ru: "У меня два брата." },
      { en: "She is eight years old.", tr: "O sekiz yaşında.", fr: "Elle a huit ans.", es: "Ella tiene ocho años.", ru: "Ей восемь лет." },
    ],
  },
  {
    id: "gunluk-a1",
    categoryId: "gunluk",
    levelId: "a1",
    words: [
      { en: "house", tr: "ev", fr: "maison", es: "casa", ru: "дом" },
      { en: "work", tr: "iş", fr: "travail", es: "trabajo", ru: "работа" },
      { en: "school", tr: "okul", fr: "école", es: "escuela", ru: "школа" },
      { en: "book", tr: "kitap", fr: "livre", es: "libro", ru: "книга" },
      { en: "time", tr: "zaman", fr: "temps", es: "tiempo", ru: "время" },
      { en: "day", tr: "gün", fr: "jour", es: "día", ru: "день" },
      { en: "night", tr: "gece", fr: "nuit", es: "noche", ru: "ночь" },
      { en: "city", tr: "şehir", fr: "ville", es: "ciudad", ru: "город" },
    ],
    sentences: [
      { en: "I go to school every day.", tr: "Her gün okula giderim.", fr: "Je vais à l'école tous les jours.", es: "Voy a la escuela todos los días.", ru: "Я хожу в школу каждый день." },
      { en: "This city is very big.", tr: "Bu şehir çok büyük.", fr: "Cette ville est très grande.", es: "Esta ciudad es muy grande.", ru: "Этот город очень большой." },
    ],
  },
  {
    id: "renkler-a1",
    categoryId: "renkler",
    levelId: "a1",
    words: [
      { en: "red", tr: "kırmızı", fr: "rouge", es: "rojo", ru: "красный" },
      { en: "blue", tr: "mavi", fr: "bleu", es: "azul", ru: "синий" },
      { en: "green", tr: "yeşil", fr: "vert", es: "verde", ru: "зелёный" },
      { en: "yellow", tr: "sarı", fr: "jaune", es: "amarillo", ru: "жёлтый" },
      { en: "black", tr: "siyah", fr: "noir", es: "negro", ru: "чёрный" },
      { en: "white", tr: "beyaz", fr: "blanc", es: "blanco", ru: "белый" },
      { en: "orange", tr: "turuncu", fr: "orange", es: "naranja", ru: "оранжевый" },
      { en: "purple", tr: "mor", fr: "violet", es: "morado", ru: "фиолетовый" },
    ],
    sentences: [
      { en: "The sky is blue.", tr: "Gökyüzü mavidir.", fr: "Le ciel est bleu.", es: "El cielo es azul.", ru: "Небо синее." },
      { en: "I like the color red.", tr: "Kırmızı rengi severim.", fr: "J'aime la couleur rouge.", es: "Me gusta el color rojo.", ru: "Мне нравится красный цвет." },
    ],
  },
  {
    id: "hayvanlar-a1",
    categoryId: "hayvanlar",
    levelId: "a1",
    words: [
      { en: "dog", tr: "köpek", fr: "chien", es: "perro", ru: "собака" },
      { en: "cat", tr: "kedi", fr: "chat", es: "gato", ru: "кошка" },
      { en: "bird", tr: "kuş", fr: "oiseau", es: "pájaro", ru: "птица" },
      { en: "fish", tr: "balık", fr: "poisson", es: "pez", ru: "рыба" },
      { en: "horse", tr: "at", fr: "cheval", es: "caballo", ru: "лошадь" },
      { en: "cow", tr: "inek", fr: "vache", es: "vaca", ru: "корова" },
      { en: "lion", tr: "aslan", fr: "lion", es: "león", ru: "лев" },
      { en: "rabbit", tr: "tavşan", fr: "lapin", es: "conejo", ru: "кролик" },
    ],
    sentences: [
      { en: "The dog is very friendly.", tr: "Köpek çok arkadaş canlısı.", fr: "Le chien est très gentil.", es: "El perro es muy amistoso.", ru: "Собака очень дружелюбная." },
      { en: "I have a small cat.", tr: "Küçük bir kedim var.", fr: "J'ai un petit chat.", es: "Tengo un gato pequeño.", ru: "У меня маленькая кошка." },
    ],
  },
  {
    id: "zaman-a1",
    categoryId: "zaman",
    levelId: "a1",
    words: [
      { en: "today", tr: "bugün", fr: "aujourd'hui", es: "hoy", ru: "сегодня" },
      { en: "tomorrow", tr: "yarın", fr: "demain", es: "mañana", ru: "завтра" },
      { en: "yesterday", tr: "dün", fr: "hier", es: "ayer", ru: "вчера" },
      { en: "week", tr: "hafta", fr: "semaine", es: "semana", ru: "неделя" },
      { en: "month", tr: "ay", fr: "mois", es: "mes", ru: "месяц" },
      { en: "year", tr: "yıl", fr: "année", es: "año", ru: "год" },
      { en: "hour", tr: "saat", fr: "heure", es: "hora", ru: "час" },
      { en: "minute", tr: "dakika", fr: "minute", es: "minuto", ru: "минута" },
    ],
    sentences: [
      { en: "See you tomorrow.", tr: "Yarın görüşürüz.", fr: "À demain.", es: "Hasta mañana.", ru: "До завтра." },
      { en: "I am busy this week.", tr: "Bu hafta meşgulüm.", fr: "Je suis occupé cette semaine.", es: "Estoy ocupado esta semana.", ru: "Я занят на этой неделе." },
    ],
  },
  {
    id: "vucut-a1",
    categoryId: "vucut",
    levelId: "a1",
    words: [
      { en: "head", tr: "baş", fr: "tête", es: "cabeza", ru: "голова" },
      { en: "hand", tr: "el", fr: "main", es: "mano", ru: "рука" },
      { en: "eye", tr: "göz", fr: "œil", es: "ojo", ru: "глаз" },
      { en: "ear", tr: "kulak", fr: "oreille", es: "oreja", ru: "ухо" },
      { en: "foot", tr: "ayak", fr: "pied", es: "pie", ru: "нога" },
      { en: "nose", tr: "burun", fr: "nez", es: "nariz", ru: "нос" },
      { en: "mouth", tr: "ağız", fr: "bouche", es: "boca", ru: "рот" },
      { en: "hair", tr: "saç", fr: "cheveux", es: "pelo", ru: "волосы" },
    ],
    sentences: [
      { en: "Close your eyes.", tr: "Gözlerini kapat.", fr: "Ferme les yeux.", es: "Cierra los ojos.", ru: "Закрой глаза." },
      { en: "My hands are cold.", tr: "Ellerim soğuk.", fr: "J'ai les mains froides.", es: "Tengo las manos frías.", ru: "Мои руки холодные." },
    ],
  },
  {
    id: "giysiler-a1",
    categoryId: "giysiler",
    levelId: "a1",
    words: [
      { en: "shirt", tr: "gömlek", fr: "chemise", es: "camisa", ru: "рубашка" },
      { en: "shoes", tr: "ayakkabı", fr: "chaussures", es: "zapatos", ru: "туфли" },
      { en: "hat", tr: "şapka", fr: "chapeau", es: "sombrero", ru: "шапка" },
      { en: "dress", tr: "elbise", fr: "robe", es: "vestido", ru: "платье" },
      { en: "jacket", tr: "ceket", fr: "veste", es: "chaqueta", ru: "куртка" },
      { en: "socks", tr: "çorap", fr: "chaussettes", es: "calcetines", ru: "носки" },
      { en: "pants", tr: "pantolon", fr: "pantalon", es: "pantalones", ru: "брюки" },
      { en: "scarf", tr: "atkı", fr: "écharpe", es: "bufanda", ru: "шарф" },
    ],
    sentences: [
      { en: "I need new shoes.", tr: "Yeni ayakkabıya ihtiyacım var.", fr: "J'ai besoin de nouvelles chaussures.", es: "Necesito zapatos nuevos.", ru: "Мне нужны новые туфли." },
      { en: "She is wearing a red dress.", tr: "O kırmızı bir elbise giyiyor.", fr: "Elle porte une robe rouge.", es: "Ella lleva un vestido rojo.", ru: "Она носит красное платье." },
    ],
  },
  {
    id: "ev-a1",
    categoryId: "ev",
    levelId: "a1",
    words: [
      { en: "door", tr: "kapı", fr: "porte", es: "puerta", ru: "дверь" },
      { en: "window", tr: "pencere", fr: "fenêtre", es: "ventana", ru: "окно" },
      { en: "table", tr: "masa", fr: "table", es: "mesa", ru: "стол" },
      { en: "chair", tr: "sandalye", fr: "chaise", es: "silla", ru: "стул" },
      { en: "bed", tr: "yatak", fr: "lit", es: "cama", ru: "кровать" },
      { en: "kitchen", tr: "mutfak", fr: "cuisine", es: "cocina", ru: "кухня" },
      { en: "room", tr: "oda", fr: "chambre", es: "habitación", ru: "комната" },
      { en: "key", tr: "anahtar", fr: "clé", es: "llave", ru: "ключ" },
    ],
    sentences: [
      { en: "The key is on the table.", tr: "Anahtar masanın üstünde.", fr: "La clé est sur la table.", es: "La llave está sobre la mesa.", ru: "Ключ на столе." },
      { en: "Please close the door.", tr: "Lütfen kapıyı kapat.", fr: "Ferme la porte, s'il te plaît.", es: "Cierra la puerta, por favor.", ru: "Пожалуйста, закрой дверь." },
    ],
  },
  {
    id: "fiiller-a1",
    categoryId: "fiiller",
    levelId: "a1",
    words: [
      { en: "to go", tr: "gitmek", fr: "aller", es: "ir", ru: "идти" },
      { en: "to come", tr: "gelmek", fr: "venir", es: "venir", ru: "приходить" },
      { en: "to eat", tr: "yemek", fr: "manger", es: "comer", ru: "есть" },
      { en: "to drink", tr: "içmek", fr: "boire", es: "beber", ru: "пить" },
      { en: "to see", tr: "görmek", fr: "voir", es: "ver", ru: "видеть" },
      { en: "to speak", tr: "konuşmak", fr: "parler", es: "hablar", ru: "говорить" },
      { en: "to read", tr: "okumak", fr: "lire", es: "leer", ru: "читать" },
      { en: "to write", tr: "yazmak", fr: "écrire", es: "escribir", ru: "писать" },
    ],
    sentences: [
      { en: "I want to eat something.", tr: "Bir şey yemek istiyorum.", fr: "Je veux manger quelque chose.", es: "Quiero comer algo.", ru: "Я хочу что-нибудь съесть." },
      { en: "Can you speak slowly?", tr: "Yavaş konuşabilir misin?", fr: "Peux-tu parler lentement ?", es: "¿Puedes hablar despacio?", ru: "Ты можешь говорить медленно?" },
    ],
  },

  // ---------- A2 · Temel ----------
  {
    id: "meslekler-a2",
    categoryId: "meslekler",
    levelId: "a2",
    words: [
      { en: "teacher", tr: "öğretmen", fr: "professeur", es: "profesor", ru: "учитель" },
      { en: "doctor", tr: "doktor", fr: "médecin", es: "médico", ru: "врач" },
      { en: "engineer", tr: "mühendis", fr: "ingénieur", es: "ingeniero", ru: "инженер" },
      { en: "driver", tr: "şoför", fr: "chauffeur", es: "conductor", ru: "водитель" },
      { en: "farmer", tr: "çiftçi", fr: "agriculteur", es: "agricultor", ru: "фермер" },
      { en: "nurse", tr: "hemşire", fr: "infirmier", es: "enfermero", ru: "медсестра" },
      { en: "lawyer", tr: "avukat", fr: "avocat", es: "abogado", ru: "адвокат" },
      { en: "artist", tr: "sanatçı", fr: "artiste", es: "artista", ru: "художник" },
    ],
    sentences: [
      { en: "My father is a doctor.", tr: "Babam bir doktor.", fr: "Mon père est médecin.", es: "Mi padre es médico.", ru: "Мой отец врач." },
      { en: "She wants to be a teacher.", tr: "O bir öğretmen olmak istiyor.", fr: "Elle veut devenir professeur.", es: "Ella quiere ser profesora.", ru: "Она хочет стать учителем." },
    ],
  },
  {
    id: "duygular-a2",
    categoryId: "duygular",
    levelId: "a2",
    words: [
      { en: "happy", tr: "mutlu", fr: "heureux", es: "feliz", ru: "счастливый" },
      { en: "sad", tr: "üzgün", fr: "triste", es: "triste", ru: "грустный" },
      { en: "angry", tr: "kızgın", fr: "en colère", es: "enfadado", ru: "злой" },
      { en: "tired", tr: "yorgun", fr: "fatigué", es: "cansado", ru: "уставший" },
      { en: "excited", tr: "heyecanlı", fr: "enthousiaste", es: "emocionado", ru: "взволнованный" },
      { en: "afraid", tr: "korkmuş", fr: "effrayé", es: "asustado", ru: "испуганный" },
      { en: "surprised", tr: "şaşırmış", fr: "surpris", es: "sorprendido", ru: "удивлённый" },
      { en: "calm", tr: "sakin", fr: "calme", es: "tranquilo", ru: "спокойный" },
    ],
    sentences: [
      { en: "I am very happy today.", tr: "Bugün çok mutluyum.", fr: "Je suis très heureux aujourd'hui.", es: "Hoy estoy muy feliz.", ru: "Сегодня я очень счастлив." },
      { en: "Don't be afraid.", tr: "Korkma.", fr: "N'aie pas peur.", es: "No tengas miedo.", ru: "Не бойся." },
    ],
  },
  {
    id: "okul-a2",
    categoryId: "okul",
    levelId: "a2",
    words: [
      { en: "student", tr: "öğrenci", fr: "étudiant", es: "estudiante", ru: "студент" },
      { en: "lesson", tr: "ders", fr: "leçon", es: "lección", ru: "урок" },
      { en: "homework", tr: "ödev", fr: "devoir", es: "deberes", ru: "домашнее задание" },
      { en: "exam", tr: "sınav", fr: "examen", es: "examen", ru: "экзамен" },
      { en: "notebook", tr: "defter", fr: "cahier", es: "cuaderno", ru: "тетрадь" },
      { en: "pencil", tr: "kalem", fr: "crayon", es: "lápiz", ru: "карандаш" },
      { en: "classroom", tr: "sınıf", fr: "salle de classe", es: "aula", ru: "класс" },
      { en: "library", tr: "kütüphane", fr: "bibliothèque", es: "biblioteca", ru: "библиотека" },
    ],
    sentences: [
      { en: "I have an exam tomorrow.", tr: "Yarın sınavım var.", fr: "J'ai un examen demain.", es: "Tengo un examen mañana.", ru: "Завтра у меня экзамен." },
      { en: "The library is next to the school.", tr: "Kütüphane okulun yanında.", fr: "La bibliothèque est à côté de l'école.", es: "La biblioteca está al lado de la escuela.", ru: "Библиотека рядом со школой." },
    ],
  },
  {
    id: "ulasim-a2",
    categoryId: "ulasim",
    levelId: "a2",
    words: [
      { en: "bus", tr: "otobüs", fr: "bus", es: "autobús", ru: "автобус" },
      { en: "train", tr: "tren", fr: "train", es: "tren", ru: "поезд" },
      { en: "car", tr: "araba", fr: "voiture", es: "coche", ru: "машина" },
      { en: "plane", tr: "uçak", fr: "avion", es: "avión", ru: "самолёт" },
      { en: "bicycle", tr: "bisiklet", fr: "vélo", es: "bicicleta", ru: "велосипед" },
      { en: "station", tr: "istasyon", fr: "gare", es: "estación", ru: "станция" },
      { en: "road", tr: "yol", fr: "route", es: "carretera", ru: "дорога" },
      { en: "traffic", tr: "trafik", fr: "circulation", es: "tráfico", ru: "движение" },
    ],
    sentences: [
      { en: "I take the bus to work.", tr: "İşe otobüsle giderim.", fr: "Je prends le bus pour aller au travail.", es: "Voy al trabajo en autobús.", ru: "Я езжу на работу на автобусе." },
      { en: "The train is late.", tr: "Tren geç kaldı.", fr: "Le train est en retard.", es: "El tren llega tarde.", ru: "Поезд опаздывает." },
    ],
  },
  {
    id: "yiyecek-a2",
    categoryId: "yiyecek",
    levelId: "a2",
    words: [
      { en: "meat", tr: "et", fr: "viande", es: "carne", ru: "мясо" },
      { en: "rice", tr: "pirinç", fr: "riz", es: "arroz", ru: "рис" },
      { en: "soup", tr: "çorba", fr: "soupe", es: "sopa", ru: "суп" },
      { en: "salt", tr: "tuz", fr: "sel", es: "sal", ru: "соль" },
      { en: "sugar", tr: "şeker", fr: "sucre", es: "azúcar", ru: "сахар" },
      { en: "vegetable", tr: "sebze", fr: "légume", es: "verdura", ru: "овощ" },
      { en: "fruit", tr: "meyve", fr: "fruit", es: "fruta", ru: "фрукт" },
      { en: "breakfast", tr: "kahvaltı", fr: "petit-déjeuner", es: "desayuno", ru: "завтрак" },
    ],
    sentences: [
      { en: "Breakfast is ready.", tr: "Kahvaltı hazır.", fr: "Le petit-déjeuner est prêt.", es: "El desayuno está listo.", ru: "Завтрак готов." },
      { en: "There is too much salt in the soup.", tr: "Çorbada çok fazla tuz var.", fr: "Il y a trop de sel dans la soupe.", es: "Hay demasiada sal en la sopa.", ru: "В супе слишком много соли." },
    ],
  },
  {
    id: "doga-a2",
    categoryId: "doga",
    levelId: "a2",
    words: [
      { en: "tree", tr: "ağaç", fr: "arbre", es: "árbol", ru: "дерево" },
      { en: "flower", tr: "çiçek", fr: "fleur", es: "flor", ru: "цветок" },
      { en: "mountain", tr: "dağ", fr: "montagne", es: "montaña", ru: "гора" },
      { en: "sea", tr: "deniz", fr: "mer", es: "mar", ru: "море" },
      { en: "river", tr: "nehir", fr: "rivière", es: "río", ru: "река" },
      { en: "forest", tr: "orman", fr: "forêt", es: "bosque", ru: "лес" },
      { en: "sky", tr: "gökyüzü", fr: "ciel", es: "cielo", ru: "небо" },
      { en: "stone", tr: "taş", fr: "pierre", es: "piedra", ru: "камень" },
    ],
    sentences: [
      { en: "We walked in the forest.", tr: "Ormanda yürüdük.", fr: "Nous avons marché dans la forêt.", es: "Caminamos por el bosque.", ru: "Мы гуляли в лесу." },
      { en: "The mountain is very high.", tr: "Dağ çok yüksek.", fr: "La montagne est très haute.", es: "La montaña es muy alta.", ru: "Гора очень высокая." },
    ],
  },
  {
    id: "sehir-a2",
    categoryId: "sehir",
    levelId: "a2",
    words: [
      { en: "street", tr: "sokak", fr: "rue", es: "calle", ru: "улица" },
      { en: "park", tr: "park", fr: "parc", es: "parque", ru: "парк" },
      { en: "hospital", tr: "hastane", fr: "hôpital", es: "hospital", ru: "больница" },
      { en: "bank", tr: "banka", fr: "banque", es: "banco", ru: "банк" },
      { en: "restaurant", tr: "restoran", fr: "restaurant", es: "restaurante", ru: "ресторан" },
      { en: "museum", tr: "müze", fr: "musée", es: "museo", ru: "музей" },
      { en: "bridge", tr: "köprü", fr: "pont", es: "puente", ru: "мост" },
      { en: "square", tr: "meydan", fr: "place", es: "plaza", ru: "площадь" },
    ],
    sentences: [
      { en: "The museum is near the square.", tr: "Müze meydanın yakınında.", fr: "Le musée est près de la place.", es: "El museo está cerca de la plaza.", ru: "Музей рядом с площадью." },
      { en: "Is there a bank on this street?", tr: "Bu sokakta banka var mı?", fr: "Y a-t-il une banque dans cette rue ?", es: "¿Hay un banco en esta calle?", ru: "Есть ли банк на этой улице?" },
    ],
  },
  {
    id: "sifatlar-a2",
    categoryId: "sifatlar",
    levelId: "a2",
    words: [
      { en: "big", tr: "büyük", fr: "grand", es: "grande", ru: "большой" },
      { en: "small", tr: "küçük", fr: "petit", es: "pequeño", ru: "маленький" },
      { en: "new", tr: "yeni", fr: "nouveau", es: "nuevo", ru: "новый" },
      { en: "old", tr: "eski", fr: "vieux", es: "viejo", ru: "старый" },
      { en: "easy", tr: "kolay", fr: "facile", es: "fácil", ru: "лёгкий" },
      { en: "difficult", tr: "zor", fr: "difficile", es: "difícil", ru: "трудный" },
      { en: "fast", tr: "hızlı", fr: "rapide", es: "rápido", ru: "быстрый" },
      { en: "slow", tr: "yavaş", fr: "lent", es: "lento", ru: "медленный" },
    ],
    sentences: [
      { en: "This exercise is very easy.", tr: "Bu alıştırma çok kolay.", fr: "Cet exercice est très facile.", es: "Este ejercicio es muy fácil.", ru: "Это упражнение очень лёгкое." },
      { en: "He has an old car.", tr: "Onun eski bir arabası var.", fr: "Il a une vieille voiture.", es: "Él tiene un coche viejo.", ru: "У него старая машина." },
    ],
  },
  {
    id: "gunluk-a2",
    categoryId: "gunluk",
    levelId: "a2",
    words: [
      { en: "to wake up", tr: "uyanmak", fr: "se réveiller", es: "despertarse", ru: "просыпаться" },
      { en: "to sleep", tr: "uyumak", fr: "dormir", es: "dormir", ru: "спать" },
      { en: "to wash", tr: "yıkamak", fr: "laver", es: "lavar", ru: "мыть" },
      { en: "to cook", tr: "yemek pişirmek", fr: "cuisiner", es: "cocinar", ru: "готовить" },
      { en: "to clean", tr: "temizlemek", fr: "nettoyer", es: "limpiar", ru: "убирать" },
      { en: "to rest", tr: "dinlenmek", fr: "se reposer", es: "descansar", ru: "отдыхать" },
      { en: "to wait", tr: "beklemek", fr: "attendre", es: "esperar", ru: "ждать" },
      { en: "to forget", tr: "unutmak", fr: "oublier", es: "olvidar", ru: "забывать" },
    ],
    sentences: [
      { en: "I wake up at seven o'clock.", tr: "Saat yedide uyanırım.", fr: "Je me réveille à sept heures.", es: "Me despierto a las siete.", ru: "Я просыпаюсь в семь часов." },
      { en: "Don't forget to call me.", tr: "Beni aramayı unutma.", fr: "N'oublie pas de m'appeler.", es: "No olvides llamarme.", ru: "Не забудь позвонить мне." },
    ],
  },
  {
    id: "aile-a2",
    categoryId: "aile",
    levelId: "a2",
    words: [
      { en: "wife", tr: "eş (kadın)", fr: "épouse", es: "esposa", ru: "жена" },
      { en: "husband", tr: "koca", fr: "mari", es: "marido", ru: "муж" },
      { en: "son", tr: "oğul", fr: "fils", es: "hijo", ru: "сын" },
      { en: "daughter", tr: "kız evlat", fr: "fille", es: "hija", ru: "дочь" },
      { en: "uncle", tr: "amca", fr: "oncle", es: "tío", ru: "дядя" },
      { en: "aunt", tr: "teyze", fr: "tante", es: "tía", ru: "тётя" },
      { en: "cousin", tr: "kuzen", fr: "cousin", es: "primo", ru: "кузен" },
      { en: "neighbour", tr: "komşu", fr: "voisin", es: "vecino", ru: "сосед" },
    ],
    sentences: [
      { en: "My cousin lives in another city.", tr: "Kuzenim başka bir şehirde yaşıyor.", fr: "Mon cousin habite dans une autre ville.", es: "Mi primo vive en otra ciudad.", ru: "Мой кузен живёт в другом городе." },
      { en: "Our neighbours are very kind.", tr: "Komşularımız çok kibar.", fr: "Nos voisins sont très gentils.", es: "Nuestros vecinos son muy amables.", ru: "Наши соседи очень добрые." },
    ],
  },

  // ---------- B1 · Orta Seviye ----------
  {
    id: "seyahat-b1",
    categoryId: "seyahat",
    levelId: "b1",
    words: [
      { en: "airport", tr: "havalimanı", fr: "aéroport", es: "aeropuerto", ru: "аэропорт" },
      { en: "ticket", tr: "bilet", fr: "billet", es: "billete", ru: "билет" },
      { en: "passport", tr: "pasaport", fr: "passeport", es: "pasaporte", ru: "паспорт" },
      { en: "hotel", tr: "otel", fr: "hôtel", es: "hotel", ru: "отель" },
      { en: "suitcase", tr: "bavul", fr: "valise", es: "maleta", ru: "чемодан" },
      { en: "map", tr: "harita", fr: "carte", es: "mapa", ru: "карта" },
      { en: "journey", tr: "yolculuk", fr: "voyage", es: "viaje", ru: "путешествие" },
      { en: "border", tr: "sınır", fr: "frontière", es: "frontera", ru: "граница" },
    ],
    sentences: [
      { en: "Where is the airport?", tr: "Havalimanı nerede?", fr: "Où est l'aéroport ?", es: "¿Dónde está el aeropuerto?", ru: "Где аэропорт?" },
      { en: "I lost my passport.", tr: "Pasaportumu kaybettim.", fr: "J'ai perdu mon passeport.", es: "He perdido mi pasaporte.", ru: "Я потерял паспорт." },
    ],
  },
  {
    id: "alisveris-b1",
    categoryId: "alisveris",
    levelId: "b1",
    words: [
      { en: "price", tr: "fiyat", fr: "prix", es: "precio", ru: "цена" },
      { en: "discount", tr: "indirim", fr: "réduction", es: "descuento", ru: "скидка" },
      { en: "receipt", tr: "fiş", fr: "reçu", es: "recibo", ru: "чек" },
      { en: "cash", tr: "nakit", fr: "espèces", es: "efectivo", ru: "наличные" },
      { en: "market", tr: "pazar", fr: "marché", es: "mercado", ru: "рынок" },
      { en: "cashier", tr: "kasiyer", fr: "caissier", es: "cajero", ru: "кассир" },
      { en: "expensive", tr: "pahalı", fr: "cher", es: "caro", ru: "дорогой" },
      { en: "cheap", tr: "ucuz", fr: "bon marché", es: "barato", ru: "дешёвый" },
    ],
    sentences: [
      { en: "This shirt is too expensive.", tr: "Bu gömlek çok pahalı.", fr: "Cette chemise est trop chère.", es: "Esta camisa es demasiado cara.", ru: "Эта рубашка слишком дорогая." },
      { en: "Can I pay by cash?", tr: "Nakit ödeyebilir miyim?", fr: "Puis-je payer en espèces ?", es: "¿Puedo pagar en efectivo?", ru: "Могу я заплатить наличными?" },
    ],
  },
  {
    id: "hava-b1",
    categoryId: "hava",
    levelId: "b1",
    words: [
      { en: "rain", tr: "yağmur", fr: "pluie", es: "lluvia", ru: "дождь" },
      { en: "snow", tr: "kar", fr: "neige", es: "nieve", ru: "снег" },
      { en: "sun", tr: "güneş", fr: "soleil", es: "sol", ru: "солнце" },
      { en: "wind", tr: "rüzgar", fr: "vent", es: "viento", ru: "ветер" },
      { en: "cloud", tr: "bulut", fr: "nuage", es: "nube", ru: "облако" },
      { en: "storm", tr: "fırtına", fr: "tempête", es: "tormenta", ru: "буря" },
      { en: "temperature", tr: "sıcaklık", fr: "température", es: "temperatura", ru: "температура" },
      { en: "season", tr: "mevsim", fr: "saison", es: "estación", ru: "сезон" },
    ],
    sentences: [
      { en: "It is raining outside.", tr: "Dışarıda yağmur yağıyor.", fr: "Il pleut dehors.", es: "Está lloviendo fuera.", ru: "На улице идёт дождь." },
      { en: "I love the summer season.", tr: "Yaz mevsimini çok severim.", fr: "J'adore la saison d'été.", es: "Me encanta la estación de verano.", ru: "Я обожаю летний сезон." },
    ],
  },
  {
    id: "spor-b1",
    categoryId: "spor",
    levelId: "b1",
    words: [
      { en: "football", tr: "futbol", fr: "football", es: "fútbol", ru: "футбол" },
      { en: "basketball", tr: "basketbol", fr: "basket-ball", es: "baloncesto", ru: "баскетбол" },
      { en: "swimming", tr: "yüzme", fr: "natation", es: "natación", ru: "плавание" },
      { en: "running", tr: "koşu", fr: "course à pied", es: "carrera", ru: "бег" },
      { en: "team", tr: "takım", fr: "équipe", es: "equipo", ru: "команда" },
      { en: "match", tr: "maç", fr: "match", es: "partido", ru: "матч" },
      { en: "champion", tr: "şampiyon", fr: "champion", es: "campeón", ru: "чемпион" },
      { en: "referee", tr: "hakem", fr: "arbitre", es: "árbitro", ru: "судья" },
    ],
    sentences: [
      { en: "Our team won the match.", tr: "Takımımız maçı kazandı.", fr: "Notre équipe a gagné le match.", es: "Nuestro equipo ganó el partido.", ru: "Наша команда выиграла матч." },
      { en: "He goes swimming every week.", tr: "O her hafta yüzmeye gider.", fr: "Il va nager chaque semaine.", es: "Él va a nadar cada semana.", ru: "Он плавает каждую неделю." },
    ],
  },
  {
    id: "teknoloji-b1",
    categoryId: "teknoloji",
    levelId: "b1",
    words: [
      { en: "computer", tr: "bilgisayar", fr: "ordinateur", es: "ordenador", ru: "компьютер" },
      { en: "phone", tr: "telefon", fr: "téléphone", es: "teléfono", ru: "телефон" },
      { en: "internet", tr: "internet", fr: "internet", es: "internet", ru: "интернет" },
      { en: "screen", tr: "ekran", fr: "écran", es: "pantalla", ru: "экран" },
      { en: "password", tr: "şifre", fr: "mot de passe", es: "contraseña", ru: "пароль" },
      { en: "application", tr: "uygulama", fr: "application", es: "aplicación", ru: "приложение" },
      { en: "battery", tr: "batarya", fr: "batterie", es: "batería", ru: "батарея" },
      { en: "keyboard", tr: "klavye", fr: "clavier", es: "teclado", ru: "клавиатура" },
    ],
    sentences: [
      { en: "I forgot my password.", tr: "Şifremi unuttum.", fr: "J'ai oublié mon mot de passe.", es: "He olvidado mi contraseña.", ru: "Я забыл свой пароль." },
      { en: "My phone battery is low.", tr: "Telefonumun bataryası az.", fr: "La batterie de mon téléphone est faible.", es: "La batería de mi teléfono está baja.", ru: "Батарея моего телефона садится." },
    ],
  },
  {
    id: "saglik-b1",
    categoryId: "saglik",
    levelId: "b1",
    words: [
      { en: "illness", tr: "hastalık", fr: "maladie", es: "enfermedad", ru: "болезнь" },
      { en: "medicine", tr: "ilaç", fr: "médicament", es: "medicamento", ru: "лекарство" },
      { en: "pain", tr: "ağrı", fr: "douleur", es: "dolor", ru: "боль" },
      { en: "fever", tr: "ateş", fr: "fièvre", es: "fiebre", ru: "жар" },
      { en: "treatment", tr: "tedavi", fr: "traitement", es: "tratamiento", ru: "лечение" },
      { en: "appointment", tr: "randevu", fr: "rendez-vous", es: "cita", ru: "приём" },
      { en: "pharmacy", tr: "eczane", fr: "pharmacie", es: "farmacia", ru: "аптека" },
      { en: "health", tr: "sağlık", fr: "santé", es: "salud", ru: "здоровье" },
    ],
    sentences: [
      { en: "I have an appointment with the doctor.", tr: "Doktorla randevum var.", fr: "J'ai un rendez-vous chez le médecin.", es: "Tengo una cita con el médico.", ru: "У меня приём у врача." },
      { en: "Take this medicine twice a day.", tr: "Bu ilacı günde iki kez al.", fr: "Prenez ce médicament deux fois par jour.", es: "Tome este medicamento dos veces al día.", ru: "Принимайте это лекарство два раза в день." },
    ],
  },
  {
    id: "is-b1",
    categoryId: "is",
    levelId: "b1",
    words: [
      { en: "office", tr: "ofis", fr: "bureau", es: "oficina", ru: "офис" },
      { en: "meeting", tr: "toplantı", fr: "réunion", es: "reunión", ru: "встреча" },
      { en: "salary", tr: "maaş", fr: "salaire", es: "salario", ru: "зарплата" },
      { en: "colleague", tr: "iş arkadaşı", fr: "collègue", es: "compañero de trabajo", ru: "коллега" },
      { en: "manager", tr: "yönetici", fr: "responsable", es: "jefe", ru: "менеджер" },
      { en: "project", tr: "proje", fr: "projet", es: "proyecto", ru: "проект" },
      { en: "deadline", tr: "son tarih", fr: "date limite", es: "fecha límite", ru: "срок" },
      { en: "contract", tr: "sözleşme", fr: "contrat", es: "contrato", ru: "контракт" },
    ],
    sentences: [
      { en: "The meeting starts at nine.", tr: "Toplantı dokuzda başlıyor.", fr: "La réunion commence à neuf heures.", es: "La reunión empieza a las nueve.", ru: "Встреча начинается в девять." },
      { en: "We must finish the project before the deadline.", tr: "Projeyi son tarihten önce bitirmeliyiz.", fr: "Nous devons finir le projet avant la date limite.", es: "Debemos terminar el proyecto antes de la fecha límite.", ru: "Мы должны закончить проект до срока." },
    ],
  },
  {
    id: "muzik-b1",
    categoryId: "muzik",
    levelId: "b1",
    words: [
      { en: "song", tr: "şarkı", fr: "chanson", es: "canción", ru: "песня" },
      { en: "singer", tr: "şarkıcı", fr: "chanteur", es: "cantante", ru: "певец" },
      { en: "guitar", tr: "gitar", fr: "guitare", es: "guitarra", ru: "гитара" },
      { en: "piano", tr: "piyano", fr: "piano", es: "piano", ru: "пианино" },
      { en: "concert", tr: "konser", fr: "concert", es: "concierto", ru: "концерт" },
      { en: "rhythm", tr: "ritim", fr: "rythme", es: "ritmo", ru: "ритм" },
      { en: "voice", tr: "ses", fr: "voix", es: "voz", ru: "голос" },
      { en: "audience", tr: "seyirci", fr: "public", es: "público", ru: "публика" },
    ],
    sentences: [
      { en: "She sings with a beautiful voice.", tr: "O güzel bir sesle şarkı söylüyor.", fr: "Elle chante avec une belle voix.", es: "Ella canta con una voz hermosa.", ru: "Она поёт красивым голосом." },
      { en: "We went to a concert last night.", tr: "Dün gece bir konsere gittik.", fr: "Nous sommes allés à un concert hier soir.", es: "Anoche fuimos a un concierto.", ru: "Вчера вечером мы ходили на концерт." },
    ],
  },
  {
    id: "iletisim-b1",
    categoryId: "iletisim",
    levelId: "b1",
    words: [
      { en: "message", tr: "mesaj", fr: "message", es: "mensaje", ru: "сообщение" },
      { en: "letter", tr: "mektup", fr: "lettre", es: "carta", ru: "письмо" },
      { en: "call", tr: "arama", fr: "appel", es: "llamada", ru: "звонок" },
      { en: "answer", tr: "cevap", fr: "réponse", es: "respuesta", ru: "ответ" },
      { en: "question", tr: "soru", fr: "question", es: "pregunta", ru: "вопрос" },
      { en: "news", tr: "haber", fr: "nouvelle", es: "noticia", ru: "новость" },
      { en: "advice", tr: "tavsiye", fr: "conseil", es: "consejo", ru: "совет" },
      { en: "opinion", tr: "fikir", fr: "avis", es: "opinión", ru: "мнение" },
    ],
    sentences: [
      { en: "Can I ask you a question?", tr: "Sana bir soru sorabilir miyim?", fr: "Puis-je te poser une question ?", es: "¿Puedo hacerte una pregunta?", ru: "Могу я задать тебе вопрос?" },
      { en: "I need your advice.", tr: "Tavsiyene ihtiyacım var.", fr: "J'ai besoin de ton conseil.", es: "Necesito tu consejo.", ru: "Мне нужен твой совет." },
    ],
  },
  {
    id: "egitim-b1",
    categoryId: "egitim",
    levelId: "b1",
    words: [
      { en: "university", tr: "üniversite", fr: "université", es: "universidad", ru: "университет" },
      { en: "degree", tr: "diploma", fr: "diplôme", es: "título", ru: "диплом" },
      { en: "research", tr: "araştırma", fr: "recherche", es: "investigación", ru: "исследование" },
      { en: "knowledge", tr: "bilgi", fr: "connaissance", es: "conocimiento", ru: "знание" },
      { en: "subject", tr: "konu", fr: "matière", es: "asignatura", ru: "предмет" },
      { en: "scholarship", tr: "burs", fr: "bourse", es: "beca", ru: "стипендия" },
      { en: "success", tr: "başarı", fr: "réussite", es: "éxito", ru: "успех" },
      { en: "effort", tr: "çaba", fr: "effort", es: "esfuerzo", ru: "усилие" },
    ],
    sentences: [
      { en: "He studies at a university in Paris.", tr: "Paris'te bir üniversitede okuyor.", fr: "Il étudie dans une université à Paris.", es: "Él estudia en una universidad en París.", ru: "Он учится в университете в Париже." },
      { en: "Success requires a lot of effort.", tr: "Başarı çok çaba gerektirir.", fr: "La réussite demande beaucoup d'efforts.", es: "El éxito requiere mucho esfuerzo.", ru: "Успех требует больших усилий." },
    ],
  },

  // ---------- B2 · İleri Orta Seviye ----------
  {
    id: "cevre-b2",
    categoryId: "cevre",
    levelId: "b2",
    words: [
      { en: "pollution", tr: "kirlilik", fr: "pollution", es: "contaminación", ru: "загрязнение" },
      { en: "climate", tr: "iklim", fr: "climat", es: "clima", ru: "климат" },
      { en: "recycling", tr: "geri dönüşüm", fr: "recyclage", es: "reciclaje", ru: "переработка" },
      { en: "waste", tr: "atık", fr: "déchets", es: "residuos", ru: "отходы" },
      { en: "energy", tr: "enerji", fr: "énergie", es: "energía", ru: "энергия" },
      { en: "sustainable", tr: "sürdürülebilir", fr: "durable", es: "sostenible", ru: "устойчивый" },
      { en: "species", tr: "tür", fr: "espèce", es: "especie", ru: "вид" },
      { en: "drought", tr: "kuraklık", fr: "sécheresse", es: "sequía", ru: "засуха" },
    ],
    sentences: [
      { en: "Air pollution affects public health.", tr: "Hava kirliliği halk sağlığını etkiliyor.", fr: "La pollution de l'air affecte la santé publique.", es: "La contaminación del aire afecta a la salud pública.", ru: "Загрязнение воздуха влияет на здоровье населения." },
      { en: "We should use renewable energy sources.", tr: "Yenilenebilir enerji kaynakları kullanmalıyız.", fr: "Nous devrions utiliser des sources d'énergie renouvelables.", es: "Deberíamos usar fuentes de energía renovables.", ru: "Нам следует использовать возобновляемые источники энергии." },
    ],
  },
  {
    id: "ekonomi-b2",
    categoryId: "ekonomi",
    levelId: "b2",
    words: [
      { en: "inflation", tr: "enflasyon", fr: "inflation", es: "inflación", ru: "инфляция" },
      { en: "investment", tr: "yatırım", fr: "investissement", es: "inversión", ru: "инвестиция" },
      { en: "budget", tr: "bütçe", fr: "budget", es: "presupuesto", ru: "бюджет" },
      { en: "tax", tr: "vergi", fr: "impôt", es: "impuesto", ru: "налог" },
      { en: "supply", tr: "arz", fr: "offre", es: "oferta", ru: "предложение" },
      { en: "demand", tr: "talep", fr: "demande", es: "demanda", ru: "спрос" },
      { en: "profit", tr: "kâr", fr: "bénéfice", es: "beneficio", ru: "прибыль" },
      { en: "debt", tr: "borç", fr: "dette", es: "deuda", ru: "долг" },
    ],
    sentences: [
      { en: "Inflation reduces purchasing power.", tr: "Enflasyon alım gücünü azaltır.", fr: "L'inflation réduit le pouvoir d'achat.", es: "La inflación reduce el poder adquisitivo.", ru: "Инфляция снижает покупательную способность." },
      { en: "The company increased its profit last year.", tr: "Şirket geçen yıl kârını artırdı.", fr: "L'entreprise a augmenté son bénéfice l'an dernier.", es: "La empresa aumentó su beneficio el año pasado.", ru: "Компания увеличила прибыль в прошлом году." },
    ],
  },
  {
    id: "medya-b2",
    categoryId: "medya",
    levelId: "b2",
    words: [
      { en: "journalist", tr: "gazeteci", fr: "journaliste", es: "periodista", ru: "журналист" },
      { en: "headline", tr: "manşet", fr: "titre", es: "titular", ru: "заголовок" },
      { en: "source", tr: "kaynak", fr: "source", es: "fuente", ru: "источник" },
      { en: "interview", tr: "röportaj", fr: "entretien", es: "entrevista", ru: "интервью" },
      { en: "broadcast", tr: "yayın", fr: "diffusion", es: "emisión", ru: "трансляция" },
      { en: "advertisement", tr: "reklam", fr: "publicité", es: "anuncio", ru: "реклама" },
      { en: "censorship", tr: "sansür", fr: "censure", es: "censura", ru: "цензура" },
      { en: "bias", tr: "önyargı", fr: "parti pris", es: "sesgo", ru: "предвзятость" },
    ],
    sentences: [
      { en: "The journalist did not reveal her source.", tr: "Gazeteci kaynağını açıklamadı.", fr: "La journaliste n'a pas révélé sa source.", es: "La periodista no reveló su fuente.", ru: "Журналистка не раскрыла свой источник." },
      { en: "Social media shapes public opinion.", tr: "Sosyal medya kamuoyunu şekillendirir.", fr: "Les réseaux sociaux façonnent l'opinion publique.", es: "Las redes sociales moldean la opinión pública.", ru: "Социальные сети формируют общественное мнение." },
    ],
  },
  {
    id: "bilim-b2",
    categoryId: "bilim",
    levelId: "b2",
    words: [
      { en: "experiment", tr: "deney", fr: "expérience", es: "experimento", ru: "эксперимент" },
      { en: "theory", tr: "kuram", fr: "théorie", es: "teoría", ru: "теория" },
      { en: "evidence", tr: "kanıt", fr: "preuve", es: "prueba", ru: "доказательство" },
      { en: "hypothesis", tr: "hipotez", fr: "hypothèse", es: "hipótesis", ru: "гипотеза" },
      { en: "laboratory", tr: "laboratuvar", fr: "laboratoire", es: "laboratorio", ru: "лаборатория" },
      { en: "measurement", tr: "ölçüm", fr: "mesure", es: "medición", ru: "измерение" },
      { en: "discovery", tr: "keşif", fr: "découverte", es: "descubrimiento", ru: "открытие" },
      { en: "data", tr: "veri", fr: "données", es: "datos", ru: "данные" },
    ],
    sentences: [
      { en: "The results confirm the hypothesis.", tr: "Sonuçlar hipotezi doğruluyor.", fr: "Les résultats confirment l'hypothèse.", es: "Los resultados confirman la hipótesis.", ru: "Результаты подтверждают гипотезу." },
      { en: "There is not enough evidence yet.", tr: "Henüz yeterli kanıt yok.", fr: "Il n'y a pas encore assez de preuves.", es: "Todavía no hay pruebas suficientes.", ru: "Пока недостаточно доказательств." },
    ],
  },
  {
    id: "sanat-b2",
    categoryId: "sanat",
    levelId: "b2",
    words: [
      { en: "painting", tr: "resim", fr: "peinture", es: "pintura", ru: "картина" },
      { en: "sculpture", tr: "heykel", fr: "sculpture", es: "escultura", ru: "скульптура" },
      { en: "exhibition", tr: "sergi", fr: "exposition", es: "exposición", ru: "выставка" },
      { en: "masterpiece", tr: "başyapıt", fr: "chef-d'œuvre", es: "obra maestra", ru: "шедевр" },
      { en: "style", tr: "üslup", fr: "style", es: "estilo", ru: "стиль" },
      { en: "critic", tr: "eleştirmen", fr: "critique", es: "crítico", ru: "критик" },
      { en: "inspiration", tr: "ilham", fr: "inspiration", es: "inspiración", ru: "вдохновение" },
      { en: "gallery", tr: "galeri", fr: "galerie", es: "galería", ru: "галерея" },
    ],
    sentences: [
      { en: "The exhibition opens next week.", tr: "Sergi gelecek hafta açılıyor.", fr: "L'exposition ouvre la semaine prochaine.", es: "La exposición abre la semana que viene.", ru: "Выставка открывается на следующей неделе." },
      { en: "This painting is considered a masterpiece.", tr: "Bu resim bir başyapıt olarak kabul edilir.", fr: "Ce tableau est considéré comme un chef-d'œuvre.", es: "Este cuadro se considera una obra maestra.", ru: "Эта картина считается шедевром." },
    ],
  },
  {
    id: "saglik-b2",
    categoryId: "saglik",
    levelId: "b2",
    words: [
      { en: "surgery", tr: "ameliyat", fr: "chirurgie", es: "cirugía", ru: "операция" },
      { en: "diagnosis", tr: "teşhis", fr: "diagnostic", es: "diagnóstico", ru: "диагноз" },
      { en: "symptom", tr: "belirti", fr: "symptôme", es: "síntoma", ru: "симптом" },
      { en: "vaccine", tr: "aşı", fr: "vaccin", es: "vacuna", ru: "вакцина" },
      { en: "recovery", tr: "iyileşme", fr: "guérison", es: "recuperación", ru: "выздоровление" },
      { en: "prevention", tr: "önleme", fr: "prévention", es: "prevención", ru: "профилактика" },
      { en: "nutrition", tr: "beslenme", fr: "nutrition", es: "nutrición", ru: "питание" },
      { en: "immune system", tr: "bağışıklık sistemi", fr: "système immunitaire", es: "sistema inmunitario", ru: "иммунная система" },
    ],
    sentences: [
      { en: "Early diagnosis saves lives.", tr: "Erken teşhis hayat kurtarır.", fr: "Un diagnostic précoce sauve des vies.", es: "Un diagnóstico temprano salva vidas.", ru: "Ранняя диагностика спасает жизни." },
      { en: "Prevention is better than treatment.", tr: "Önleme tedaviden daha iyidir.", fr: "La prévention vaut mieux que le traitement.", es: "Prevenir es mejor que curar.", ru: "Профилактика лучше лечения." },
    ],
  },
  {
    id: "hukuk-b2",
    categoryId: "hukuk",
    levelId: "b2",
    words: [
      { en: "law", tr: "yasa", fr: "loi", es: "ley", ru: "закон" },
      { en: "court", tr: "mahkeme", fr: "tribunal", es: "tribunal", ru: "суд" },
      { en: "judge", tr: "hâkim", fr: "juge", es: "juez", ru: "судья" },
      { en: "witness", tr: "tanık", fr: "témoin", es: "testigo", ru: "свидетель" },
      { en: "trial", tr: "duruşma", fr: "procès", es: "juicio", ru: "судебный процесс" },
      { en: "right", tr: "hak", fr: "droit", es: "derecho", ru: "право" },
      { en: "punishment", tr: "ceza", fr: "punition", es: "castigo", ru: "наказание" },
      { en: "justice", tr: "adalet", fr: "justice", es: "justicia", ru: "справедливость" },
    ],
    sentences: [
      { en: "Everyone is equal before the law.", tr: "Herkes yasa önünde eşittir.", fr: "Tout le monde est égal devant la loi.", es: "Todos son iguales ante la ley.", ru: "Все равны перед законом." },
      { en: "The witness testified in court.", tr: "Tanık mahkemede ifade verdi.", fr: "Le témoin a témoigné au tribunal.", es: "El testigo declaró en el tribunal.", ru: "Свидетель дал показания в суде." },
    ],
  },
  {
    id: "is-b2",
    categoryId: "is",
    levelId: "b2",
    words: [
      { en: "negotiation", tr: "müzakere", fr: "négociation", es: "negociación", ru: "переговоры" },
      { en: "strategy", tr: "strateji", fr: "stratégie", es: "estrategia", ru: "стратегия" },
      { en: "competitor", tr: "rakip", fr: "concurrent", es: "competidor", ru: "конкурент" },
      { en: "customer", tr: "müşteri", fr: "client", es: "cliente", ru: "клиент" },
      { en: "recruitment", tr: "işe alım", fr: "recrutement", es: "contratación", ru: "найм" },
      { en: "productivity", tr: "verimlilik", fr: "productivité", es: "productividad", ru: "продуктивность" },
      { en: "partnership", tr: "ortaklık", fr: "partenariat", es: "asociación", ru: "партнёрство" },
      { en: "revenue", tr: "gelir", fr: "chiffre d'affaires", es: "ingresos", ru: "доход" },
    ],
    sentences: [
      { en: "The negotiation lasted three hours.", tr: "Müzakere üç saat sürdü.", fr: "La négociation a duré trois heures.", es: "La negociación duró tres horas.", ru: "Переговоры длились три часа." },
      { en: "Our main competitor lowered its prices.", tr: "Ana rakibimiz fiyatlarını düşürdü.", fr: "Notre principal concurrent a baissé ses prix.", es: "Nuestro principal competidor bajó sus precios.", ru: "Наш главный конкурент снизил цены." },
    ],
  },
  {
    id: "toplum-b2",
    categoryId: "toplum",
    levelId: "b2",
    words: [
      { en: "society", tr: "toplum", fr: "société", es: "sociedad", ru: "общество" },
      { en: "equality", tr: "eşitlik", fr: "égalité", es: "igualdad", ru: "равенство" },
      { en: "poverty", tr: "yoksulluk", fr: "pauvreté", es: "pobreza", ru: "бедность" },
      { en: "migration", tr: "göç", fr: "migration", es: "migración", ru: "миграция" },
      { en: "population", tr: "nüfus", fr: "population", es: "población", ru: "население" },
      { en: "tradition", tr: "gelenek", fr: "tradition", es: "tradición", ru: "традиция" },
      { en: "minority", tr: "azınlık", fr: "minorité", es: "minoría", ru: "меньшинство" },
      { en: "solidarity", tr: "dayanışma", fr: "solidarité", es: "solidaridad", ru: "солидарность" },
    ],
    sentences: [
      { en: "Migration changes the structure of society.", tr: "Göç toplumun yapısını değiştirir.", fr: "La migration transforme la structure de la société.", es: "La migración cambia la estructura de la sociedad.", ru: "Миграция меняет структуру общества." },
      { en: "Education reduces poverty in the long term.", tr: "Eğitim uzun vadede yoksulluğu azaltır.", fr: "L'éducation réduit la pauvreté à long terme.", es: "La educación reduce la pobreza a largo plazo.", ru: "Образование снижает бедность в долгосрочной перспективе." },
    ],
  },
  {
    id: "psikoloji-b2",
    categoryId: "psikoloji",
    levelId: "b2",
    words: [
      { en: "behaviour", tr: "davranış", fr: "comportement", es: "comportamiento", ru: "поведение" },
      { en: "memory", tr: "hafıza", fr: "mémoire", es: "memoria", ru: "память" },
      { en: "motivation", tr: "motivasyon", fr: "motivation", es: "motivación", ru: "мотивация" },
      { en: "anxiety", tr: "kaygı", fr: "anxiété", es: "ansiedad", ru: "тревога" },
      { en: "perception", tr: "algı", fr: "perception", es: "percepción", ru: "восприятие" },
      { en: "habit", tr: "alışkanlık", fr: "habitude", es: "hábito", ru: "привычка" },
      { en: "personality", tr: "kişilik", fr: "personnalité", es: "personalidad", ru: "личность" },
      { en: "awareness", tr: "farkındalık", fr: "prise de conscience", es: "conciencia", ru: "осознанность" },
    ],
    sentences: [
      { en: "Habits shape our daily behaviour.", tr: "Alışkanlıklar günlük davranışımızı şekillendirir.", fr: "Les habitudes façonnent notre comportement quotidien.", es: "Los hábitos moldean nuestro comportamiento diario.", ru: "Привычки формируют наше повседневное поведение." },
      { en: "Motivation decreases without a clear goal.", tr: "Net bir hedef olmadan motivasyon azalır.", fr: "La motivation diminue sans objectif clair.", es: "La motivación disminuye sin un objetivo claro.", ru: "Мотивация снижается без чёткой цели." },
    ],
  },

  // ---------- C1 · İleri Seviye ----------
  {
    id: "felsefe-c1",
    categoryId: "felsefe",
    levelId: "c1",
    words: [
      { en: "consciousness", tr: "bilinç", fr: "conscience", es: "conciencia", ru: "сознание" },
      { en: "existence", tr: "varoluş", fr: "existence", es: "existencia", ru: "существование" },
      { en: "truth", tr: "hakikat", fr: "vérité", es: "verdad", ru: "истина" },
      { en: "morality", tr: "ahlak", fr: "morale", es: "moralidad", ru: "нравственность" },
      { en: "free will", tr: "özgür irade", fr: "libre arbitre", es: "libre albedrío", ru: "свобода воли" },
      { en: "reasoning", tr: "akıl yürütme", fr: "raisonnement", es: "razonamiento", ru: "рассуждение" },
      { en: "meaning", tr: "anlam", fr: "sens", es: "sentido", ru: "смысл" },
      { en: "doubt", tr: "şüphe", fr: "doute", es: "duda", ru: "сомнение" },
    ],
    sentences: [
      { en: "He questions the meaning of existence.", tr: "Varoluşun anlamını sorguluyor.", fr: "Il s'interroge sur le sens de l'existence.", es: "Él cuestiona el sentido de la existencia.", ru: "Он ставит под сомнение смысл существования." },
      { en: "Doubt is the beginning of knowledge.", tr: "Şüphe, bilginin başlangıcıdır.", fr: "Le doute est le début du savoir.", es: "La duda es el comienzo del saber.", ru: "Сомнение — это начало знания." },
    ],
  },
  {
    id: "politika-c1",
    categoryId: "politika",
    levelId: "c1",
    words: [
      { en: "government", tr: "hükümet", fr: "gouvernement", es: "gobierno", ru: "правительство" },
      { en: "election", tr: "seçim", fr: "élection", es: "elección", ru: "выборы" },
      { en: "policy", tr: "politika", fr: "politique", es: "política", ru: "политика" },
      { en: "citizen", tr: "yurttaş", fr: "citoyen", es: "ciudadano", ru: "гражданин" },
      { en: "sovereignty", tr: "egemenlik", fr: "souveraineté", es: "soberanía", ru: "суверенитет" },
      { en: "opposition", tr: "muhalefet", fr: "opposition", es: "oposición", ru: "оппозиция" },
      { en: "reform", tr: "reform", fr: "réforme", es: "reforma", ru: "реформа" },
      { en: "legitimacy", tr: "meşruiyet", fr: "légitimité", es: "legitimidad", ru: "легитимность" },
    ],
    sentences: [
      { en: "The government announced a comprehensive reform.", tr: "Hükümet kapsamlı bir reform açıkladı.", fr: "Le gouvernement a annoncé une réforme globale.", es: "El gobierno anunció una reforma integral.", ru: "Правительство объявило о всеобъемлющей реформе." },
      { en: "The opposition criticised the new policy.", tr: "Muhalefet yeni politikayı eleştirdi.", fr: "L'opposition a critiqué la nouvelle politique.", es: "La oposición criticó la nueva política.", ru: "Оппозиция раскритиковала новую политику." },
    ],
  },
  {
    id: "edebiyat-c1",
    categoryId: "edebiyat",
    levelId: "c1",
    words: [
      { en: "novel", tr: "roman", fr: "roman", es: "novela", ru: "роман" },
      { en: "poem", tr: "şiir", fr: "poème", es: "poema", ru: "стихотворение" },
      { en: "metaphor", tr: "mecaz", fr: "métaphore", es: "metáfora", ru: "метафора" },
      { en: "narrator", tr: "anlatıcı", fr: "narrateur", es: "narrador", ru: "рассказчик" },
      { en: "plot", tr: "olay örgüsü", fr: "intrigue", es: "trama", ru: "сюжет" },
      { en: "character", tr: "karakter", fr: "personnage", es: "personaje", ru: "персонаж" },
      { en: "irony", tr: "ironi", fr: "ironie", es: "ironía", ru: "ирония" },
      { en: "translation", tr: "çeviri", fr: "traduction", es: "traducción", ru: "перевод" },
    ],
    sentences: [
      { en: "The narrator is not reliable.", tr: "Anlatıcı güvenilir değil.", fr: "Le narrateur n'est pas fiable.", es: "El narrador no es fiable.", ru: "Рассказчик ненадёжен." },
      { en: "The novel is full of subtle irony.", tr: "Roman ince bir ironiyle dolu.", fr: "Le roman est plein d'ironie subtile.", es: "La novela está llena de una ironía sutil.", ru: "Роман полон тонкой иронии." },
    ],
  },
  {
    id: "akademik-c1",
    categoryId: "akademik",
    levelId: "c1",
    words: [
      { en: "thesis", tr: "tez", fr: "thèse", es: "tesis", ru: "тезис" },
      { en: "argument", tr: "sav", fr: "argument", es: "argumento", ru: "аргумент" },
      { en: "methodology", tr: "yöntem bilim", fr: "méthodologie", es: "metodología", ru: "методология" },
      { en: "citation", tr: "atıf", fr: "citation", es: "cita", ru: "цитата" },
      { en: "assumption", tr: "varsayım", fr: "présupposé", es: "supuesto", ru: "предположение" },
      { en: "conclusion", tr: "sonuç", fr: "conclusion", es: "conclusión", ru: "заключение" },
      { en: "peer review", tr: "hakem değerlendirmesi", fr: "évaluation par les pairs", es: "revisión por pares", ru: "рецензирование" },
      { en: "framework", tr: "çerçeve", fr: "cadre", es: "marco", ru: "структура" },
    ],
    sentences: [
      { en: "The author supports the argument with reliable data.", tr: "Yazar savını güvenilir verilerle destekliyor.", fr: "L'auteur appuie son argument sur des données fiables.", es: "El autor apoya su argumento con datos fiables.", ru: "Автор подкрепляет аргумент надёжными данными." },
      { en: "This assumption weakens the conclusion.", tr: "Bu varsayım sonucu zayıflatıyor.", fr: "Ce présupposé affaiblit la conclusion.", es: "Este supuesto debilita la conclusión.", ru: "Это предположение ослабляет заключение." },
    ],
  },
  {
    id: "soyut-c1",
    categoryId: "soyut",
    levelId: "c1",
    words: [
      { en: "ambiguity", tr: "muğlaklık", fr: "ambiguïté", es: "ambigüedad", ru: "двусмысленность" },
      { en: "nuance", tr: "nüans", fr: "nuance", es: "matiz", ru: "нюанс" },
      { en: "tendency", tr: "eğilim", fr: "tendance", es: "tendencia", ru: "тенденция" },
      { en: "contradiction", tr: "çelişki", fr: "contradiction", es: "contradicción", ru: "противоречие" },
      { en: "consequence", tr: "netice", fr: "conséquence", es: "consecuencia", ru: "последствие" },
      { en: "scope", tr: "kapsam", fr: "portée", es: "alcance", ru: "охват" },
      { en: "threshold", tr: "eşik", fr: "seuil", es: "umbral", ru: "порог" },
      { en: "distinction", tr: "ayrım", fr: "distinction", es: "distinción", ru: "различие" },
    ],
    sentences: [
      { en: "There is a subtle distinction between the two concepts.", tr: "İki kavram arasında ince bir ayrım var.", fr: "Il y a une distinction subtile entre les deux concepts.", es: "Hay una distinción sutil entre los dos conceptos.", ru: "Между этими двумя понятиями есть тонкое различие." },
      { en: "His argument contains an obvious contradiction.", tr: "Savı bariz bir çelişki içeriyor.", fr: "Son argument contient une contradiction évidente.", es: "Su argumento contiene una contradicción evidente.", ru: "Его аргумент содержит очевидное противоречие." },
    ],
  },
  {
    id: "diplomasi-c1",
    categoryId: "diplomasi",
    levelId: "c1",
    words: [
      { en: "treaty", tr: "antlaşma", fr: "traité", es: "tratado", ru: "договор" },
      { en: "alliance", tr: "ittifak", fr: "alliance", es: "alianza", ru: "альянс" },
      { en: "sanction", tr: "yaptırım", fr: "sanction", es: "sanción", ru: "санкция" },
      { en: "ceasefire", tr: "ateşkes", fr: "cessez-le-feu", es: "alto el fuego", ru: "перемирие" },
      { en: "embassy", tr: "büyükelçilik", fr: "ambassade", es: "embajada", ru: "посольство" },
      { en: "mediation", tr: "arabuluculuk", fr: "médiation", es: "mediación", ru: "посредничество" },
      { en: "agenda", tr: "gündem", fr: "ordre du jour", es: "agenda", ru: "повестка дня" },
      { en: "concession", tr: "taviz", fr: "concession", es: "concesión", ru: "уступка" },
    ],
    sentences: [
      { en: "Both sides agreed to a ceasefire.", tr: "İki taraf da ateşkes üzerinde anlaştı.", fr: "Les deux parties ont accepté un cessez-le-feu.", es: "Ambas partes acordaron un alto el fuego.", ru: "Обе стороны согласились на перемирие." },
      { en: "The treaty was signed after long negotiations.", tr: "Antlaşma uzun müzakerelerden sonra imzalandı.", fr: "Le traité a été signé après de longues négociations.", es: "El tratado se firmó tras largas negociaciones.", ru: "Договор был подписан после долгих переговоров." },
    ],
  },
  {
    id: "bilim-c1",
    categoryId: "bilim",
    levelId: "c1",
    words: [
      { en: "artificial intelligence", tr: "yapay zekâ", fr: "intelligence artificielle", es: "inteligencia artificial", ru: "искусственный интеллект" },
      { en: "algorithm", tr: "algoritma", fr: "algorithme", es: "algoritmo", ru: "алгоритм" },
      { en: "genome", tr: "genom", fr: "génome", es: "genoma", ru: "геном" },
      { en: "particle", tr: "parçacık", fr: "particule", es: "partícula", ru: "частица" },
      { en: "simulation", tr: "benzetim", fr: "simulation", es: "simulación", ru: "симуляция" },
      { en: "uncertainty", tr: "belirsizlik", fr: "incertitude", es: "incertidumbre", ru: "неопределённость" },
      { en: "breakthrough", tr: "çığır açan gelişme", fr: "percée", es: "avance decisivo", ru: "прорыв" },
      { en: "ethics", tr: "etik", fr: "éthique", es: "ética", ru: "этика" },
    ],
    sentences: [
      { en: "Artificial intelligence raises new ethical questions.", tr: "Yapay zekâ yeni etik sorular doğuruyor.", fr: "L'intelligence artificielle soulève de nouvelles questions éthiques.", es: "La inteligencia artificial plantea nuevas cuestiones éticas.", ru: "Искусственный интеллект поднимает новые этические вопросы." },
      { en: "The experiment reduced the margin of uncertainty.", tr: "Deney belirsizlik payını azalttı.", fr: "L'expérience a réduit la marge d'incertitude.", es: "El experimento redujo el margen de incertidumbre.", ru: "Эксперимент снизил степень неопределённости." },
    ],
  },
  {
    id: "ekonomi-c1",
    categoryId: "ekonomi",
    levelId: "c1",
    words: [
      { en: "monetary policy", tr: "para politikası", fr: "politique monétaire", es: "política monetaria", ru: "денежно-кредитная политика" },
      { en: "recession", tr: "durgunluk", fr: "récession", es: "recesión", ru: "рецессия" },
      { en: "liquidity", tr: "likidite", fr: "liquidité", es: "liquidez", ru: "ликвидность" },
      { en: "incentive", tr: "teşvik", fr: "incitation", es: "incentivo", ru: "стимул" },
      { en: "volatility", tr: "oynaklık", fr: "volatilité", es: "volatilidad", ru: "волатильность" },
      { en: "subsidy", tr: "sübvansiyon", fr: "subvention", es: "subvención", ru: "субсидия" },
      { en: "equilibrium", tr: "denge", fr: "équilibre", es: "equilibrio", ru: "равновесие" },
      { en: "speculation", tr: "spekülasyon", fr: "spéculation", es: "especulación", ru: "спекуляция" },
    ],
    sentences: [
      { en: "The central bank tightened monetary policy.", tr: "Merkez bankası para politikasını sıkılaştırdı.", fr: "La banque centrale a resserré sa politique monétaire.", es: "El banco central endureció su política monetaria.", ru: "Центральный банк ужесточил денежно-кредитную политику." },
      { en: "Market volatility discourages long-term investment.", tr: "Piyasa oynaklığı uzun vadeli yatırımı caydırır.", fr: "La volatilité des marchés décourage l'investissement à long terme.", es: "La volatilidad del mercado desalienta la inversión a largo plazo.", ru: "Волатильность рынка отпугивает долгосрочные инвестиции." },
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
    name: { tr: "Türkçe", en: "Turkish", fr: "Turc", es: "Turco", ru: "Турецкий" },
  },
  en: {
    flag: "🇬🇧",
    name: { tr: "İngilizce", en: "English", fr: "Anglais", es: "Inglés", ru: "Английский" },
  },
  fr: {
    flag: "🇫🇷",
    name: { tr: "Fransızca", en: "French", fr: "Français", es: "Francés", ru: "Французский" },
  },
  es: {
    flag: "🇪🇸",
    name: { tr: "İspanyolca", en: "Spanish", fr: "Espagnol", es: "Español", ru: "Испанский" },
  },
  ru: {
    flag: "🇷🇺",
    name: { tr: "Rusça", en: "Russian", fr: "Russe", es: "Ruso", ru: "Русский" },
  },
};

/* Alfabe eğitimi verisi. Latin alfabesinden farklı bir yazı sistemi
   kullanan öğrenilecek diller için (şu an: Rusça) harf listesi tutulur.
   Her harf: upper/lower biçimleri, Rus alfabesindeki okunuşu ("name") ve
   alıştırma ekranında kullanılmayan, sadece "Öğren" sekmesinde ipucu
   olarak gösterilen kabaca Latin okunuşu ("translit"). Bir dilin burada
   girişi yoksa (örn. İngilizce, Fransızca, İspanyolca - zaten Latin
   alfabesi kullanıyorlar) ana ekranda alfabe kartı hiç gösterilmez. */
const SERINO_ALPHABETS = {
  ru: [
    { upper: "А", lower: "а", name: "а", translit: "a" },
    { upper: "Б", lower: "б", name: "бэ", translit: "b" },
    { upper: "В", lower: "в", name: "вэ", translit: "v" },
    { upper: "Г", lower: "г", name: "гэ", translit: "g" },
    { upper: "Д", lower: "д", name: "дэ", translit: "d" },
    { upper: "Е", lower: "е", name: "е", translit: "ye" },
    { upper: "Ё", lower: "ё", name: "ё", translit: "yo" },
    { upper: "Ж", lower: "ж", name: "жэ", translit: "zh" },
    { upper: "З", lower: "з", name: "зэ", translit: "z" },
    { upper: "И", lower: "и", name: "и", translit: "i" },
    { upper: "Й", lower: "й", name: "и краткое", translit: "j" },
    { upper: "К", lower: "к", name: "ка", translit: "k" },
    { upper: "Л", lower: "л", name: "эль", translit: "l" },
    { upper: "М", lower: "м", name: "эм", translit: "m" },
    { upper: "Н", lower: "н", name: "эн", translit: "n" },
    { upper: "О", lower: "о", name: "о", translit: "o" },
    { upper: "П", lower: "п", name: "пэ", translit: "p" },
    { upper: "Р", lower: "р", name: "эр", translit: "r" },
    { upper: "С", lower: "с", name: "эс", translit: "s" },
    { upper: "Т", lower: "т", name: "тэ", translit: "t" },
    { upper: "У", lower: "у", name: "у", translit: "u" },
    { upper: "Ф", lower: "ф", name: "эф", translit: "f" },
    { upper: "Х", lower: "х", name: "ха", translit: "kh" },
    { upper: "Ц", lower: "ц", name: "цэ", translit: "ts" },
    { upper: "Ч", lower: "ч", name: "че", translit: "ch" },
    { upper: "Ш", lower: "ш", name: "ша", translit: "sh" },
    { upper: "Щ", lower: "щ", name: "ща", translit: "shch" },
    { upper: "Ъ", lower: "ъ", name: "твёрдый знак", translit: "ʺ" },
    { upper: "Ы", lower: "ы", name: "ы", translit: "y" },
    { upper: "Ь", lower: "ь", name: "мягкий знак", translit: "ʹ" },
    { upper: "Э", lower: "э", name: "э", translit: "e" },
    { upper: "Ю", lower: "ю", name: "ю", translit: "yu" },
    { upper: "Я", lower: "я", name: "я", translit: "ya" },
  ],
};

/* speechSynthesis için BCP-47 dil kodları. Hem alfabe ekranında harfe
   dokununca hem de ders ekranındaki hoparlör butonunda telaffuz için
   kullanılır. */
const SERINO_TTS_LOCALE = {
  tr: "tr-TR",
  en: "en-US",
  fr: "fr-FR",
  es: "es-ES",
  ru: "ru-RU",
};

/* Derse başlamadan önce gösterilen "bilgilendirme" kartı (Duolingo'daki
   "Tips" ekranı gibi): öğrenilen dile (learnLang) ve seviyeye (levelId)
   göre kısa bir gramer ve telaffuz notu. Metinler, okuyanın arayüz
   dilinde (nativeLang) anlaşılsın diye 5 dilin hepsine çevrilmiştir.
   Kelime bilgisi notu ise ünitenin kategorisine göre js/i18n.js içindeki
   "lesson_info_vocab_template" şablonundan üretilir. */
const SERINO_LESSON_TIPS = {
  en: {
    a1: {
      grammar: {
        tr: "'To be' fiili (am/is/are) ve geniş zaman, temel İngilizce cümlelerin temelini oluşturur.",
        en: "The verb 'to be' (am/is/are) and the simple present tense are the foundation of basic English sentences.",
        fr: "Le verbe 'to be' (am/is/are) et le présent simple sont la base des phrases anglaises de base.",
        es: "El verbo 'to be' (am/is/are) y el presente simple son la base de las oraciones básicas en inglés.",
        ru: "Глагол 'to be' (am/is/are) и простое настоящее время — основа базовых английских предложений.",
      },
      pronunciation: {
        tr: "İngilizcede birçok sessiz harf vardır (örn. 'know' kelimesindeki 'k') ve ünlü sesler yazılışıyla uyuşmayabilir.",
        en: "English has many silent letters (like the 'k' in 'know') and vowel sounds that don't match their spelling.",
        fr: "L'anglais comporte de nombreuses lettres muettes (comme le 'k' de 'know') et des voyelles qui ne correspondent pas à leur orthographe.",
        es: "El inglés tiene muchas letras mudas (como la 'k' de 'know') y sonidos vocálicos que no coinciden con su escritura.",
        ru: "В английском много непроизносимых букв (например, 'k' в слове 'know'), а гласные звуки часто не совпадают с написанием.",
      },
    },
    a2: {
      grammar: {
        tr: "Geçmiş zaman (düzenli fiiller '-ed' ile biter) tamamlanmış eylemlerden bahsetmek için kullanılır.",
        en: "The past simple tense (regular verbs end in '-ed') is used to talk about finished actions.",
        fr: "Le prétérit simple (les verbes réguliers se terminent en '-ed') sert à parler d'actions terminées.",
        es: "El pasado simple (los verbos regulares terminan en '-ed') se usa para hablar de acciones terminadas.",
        ru: "Простое прошедшее время (правильные глаголы оканчиваются на '-ed') используется для завершённых действий.",
      },
      pronunciation: {
        tr: "Kelime vurgusu anlamı değiştirebilir — uzun kelimelerde doğru heceyi vurgulamayı pratik et.",
        en: "Word stress can change meaning — practice emphasizing the correct syllable in longer words.",
        fr: "L'accent tonique peut changer le sens d'un mot — entraîne-toi à accentuer la bonne syllabe dans les mots longs.",
        es: "El acento de la palabra puede cambiar su significado — practica enfatizar la sílaba correcta en palabras largas.",
        ru: "Ударение в слове может менять его значение — тренируйся ставить ударение на нужный слог в длинных словах.",
      },
    },
    b1: {
      grammar: {
        tr: "Present perfect ('have/has' + past participle) geçmişi şimdiki zamana bağlar ve öğrencileri sık sık zorlar.",
        en: "Present perfect ('have/has' + past participle) connects the past to the present and often confuses learners.",
        fr: "Le present perfect ('have/has' + participe passé) relie le passé au présent et déroute souvent les apprenants.",
        es: "El present perfect ('have/has' + participio pasado) conecta el pasado con el presente y suele confundir a los estudiantes.",
        ru: "Present perfect ('have/has' + причастие прошедшего времени) связывает прошлое с настоящим и часто путает изучающих язык.",
      },
      pronunciation: {
        tr: "Kelimeler arasında sesleri bağlamak (örn. 'turn off') konuşulan İngilizcenin doğal akmasını sağlar.",
        en: "Linking sounds between words (e.g., 'turn_off') makes spoken English flow naturally.",
        fr: "La liaison des sons entre les mots (par ex. 'turn off') donne à l'anglais parlé son flux naturel.",
        es: "Enlazar los sonidos entre palabras (p. ej., 'turn off') hace que el inglés hablado fluya de forma natural.",
        ru: "Связывание звуков между словами (например, 'turn off') делает разговорный английский более естественным и плавным.",
      },
    },
    b2: {
      grammar: {
        tr: "Koşul cümleleri (if-clauses) farklı zaman kombinasyonlarıyla gerçek ve varsayımsal durumları ifade eder.",
        en: "Conditional sentences (if-clauses) express real and hypothetical situations using different tense combinations.",
        fr: "Les phrases conditionnelles (propositions en 'if') expriment des situations réelles et hypothétiques selon différentes combinaisons de temps.",
        es: "Las oraciones condicionales (con 'if') expresan situaciones reales e hipotéticas usando distintas combinaciones de tiempos verbales.",
        ru: "Условные предложения (с 'if') выражают реальные и гипотетические ситуации с помощью разных сочетаний времён.",
      },
      pronunciation: {
        tr: "Tonlama kalıpları, sadece kelime seçiminden daha fazla; soruları, duyguları ve vurguyu belli eder.",
        en: "Intonation patterns signal questions, emotions, and emphasis more than word choice alone.",
        fr: "Les schémas d'intonation signalent les questions, les émotions et l'emphase, plus que le choix des mots seul.",
        es: "Los patrones de entonación señalan preguntas, emociones y énfasis más que la simple elección de palabras.",
        ru: "Интонационные модели сигнализируют о вопросах, эмоциях и акцентах больше, чем просто выбор слов.",
      },
    },
    c1: {
      grammar: {
        tr: "Edilgen çatı ve karmaşık ilgi cümlecikleri, daha ince ve resmi bir şekilde yazıp konuşmanı sağlar.",
        en: "Passive voice and complex relative clauses let you write and speak with more nuance and formality.",
        fr: "La voix passive et les propositions relatives complexes permettent de s'exprimer avec plus de nuance et de formalité.",
        es: "La voz pasiva y las oraciones de relativo complejas permiten escribir y hablar con más matiz y formalidad.",
        ru: "Страдательный залог и сложные относительные придаточные предложения позволяют говорить и писать более точно и официально.",
      },
      pronunciation: {
        tr: "Vurgusuz hecelerdeki daralmış ünlüler (schwa sesi), doğal ve akıcı konuşmanın anahtarıdır.",
        en: "Reduced vowels in unstressed syllables (schwa sound) are key to sounding natural and fluent.",
        fr: "Les voyelles réduites dans les syllabes non accentuées (le son schwa) sont essentielles pour sonner naturel et fluide.",
        es: "Las vocales reducidas en sílabas átonas (sonido schwa) son clave para sonar natural y fluido.",
        ru: "Редуцированные гласные в безударных слогах (звук шва) — ключ к естественному и беглому произношению.",
      },
    },
  },
  fr: {
    a1: {
      grammar: {
        tr: "Fransızca isimlerin cinsiyeti vardır (eril/dişil) ve bu, artikelleri ('le/la') ve sıfat sonlarını etkiler.",
        en: "French nouns have gender (masculine/feminine), which affects articles ('le/la') and adjective endings.",
        fr: "Les noms français ont un genre (masculin/féminin), ce qui influence les articles ('le/la') et les terminaisons des adjectifs.",
        es: "Los sustantivos franceses tienen género (masculino/femenino), lo que afecta a los artículos ('le/la') y a las terminaciones de los adjetivos.",
        ru: "Французские существительные имеют род (мужской/женский), что влияет на артикли ('le/la') и окончания прилагательных.",
      },
      pronunciation: {
        tr: "Çoğu son ünsüz harf okunmaz, ancak bir sonraki kelime ünlüyle başlıyorsa 'liaison' kelimeleri birbirine bağlar.",
        en: "Most final consonants are silent, but liaison connects words when the next one starts with a vowel.",
        fr: "La plupart des consonnes finales sont muettes, mais la liaison relie les mots lorsque le suivant commence par une voyelle.",
        es: "La mayoría de las consonantes finales son mudas, pero la liaison conecta las palabras cuando la siguiente empieza por vocal.",
        ru: "Большинство конечных согласных не произносятся, но связка (liaison) соединяет слова, если следующее начинается с гласной.",
      },
    },
    a2: {
      grammar: {
        tr: "Passé composé (avoir/être + past participle) konuşma dilinde geçmişten bahsetmenin ana yoludur.",
        en: "The passé composé (avoir/être + past participle) is the main way to talk about the past in spoken French.",
        fr: "Le passé composé (avoir/être + participe passé) est la principale façon de parler du passé à l'oral.",
        es: "El passé composé (avoir/être + participio pasado) es la forma principal de hablar del pasado en el francés hablado.",
        ru: "Passé composé (avoir/être + причастие прошедшего времени) — основной способ говорить о прошлом в разговорном французском.",
      },
      pronunciation: {
        tr: "Nazal ünlüler ('bon' veya 'vin' kelimelerindeki gibi) birçok dilde karşılığı olmayan seslerdir — dikkatlice pratik yap.",
        en: "Nasal vowels (like in 'bon' or 'vin') have no equivalent in many languages — practice them carefully.",
        fr: "Les voyelles nasales (comme dans 'bon' ou 'vin') n'ont pas d'équivalent dans de nombreuses langues — entraîne-toi avec attention.",
        es: "Las vocales nasales (como en 'bon' o 'vin') no tienen equivalente en muchos idiomas — practícalas con cuidado.",
        ru: "Носовые гласные (как в словах 'bon' или 'vin') не имеют аналогов во многих языках — тренируй их внимательно.",
      },
    },
    b1: {
      grammar: {
        tr: "Dönüşlü fiiller (se lever, s'appeler) ve imparfait zamanı, geçmişteki alışkanlıkları ve arka plan eylemlerini anlatır.",
        en: "Reflexive verbs (se lever, s'appeler) and the imparfait tense describe habits and background actions in the past.",
        fr: "Les verbes pronominaux (se lever, s'appeler) et l'imparfait décrivent les habitudes et les actions de fond dans le passé.",
        es: "Los verbos reflexivos (se lever, s'appeler) y el imparfait describen hábitos y acciones de fondo en el pasado.",
        ru: "Возвратные глаголы (se lever, s'appeler) и время imparfait описывают привычки и фоновые действия в прошлом.",
      },
      pronunciation: {
        tr: "Fransızca 'r' sesi boğazın arkasından çıkarılır, İspanyolcadaki yuvarlanan 'r' sesinden farklıdır.",
        en: "The French 'r' is pronounced at the back of the throat, unlike the rolled 'r' in Spanish.",
        fr: "Le 'r' français se prononce au fond de la gorge, contrairement au 'r' roulé de l'espagnol.",
        es: "La 'r' francesa se pronuncia en el fondo de la garganta, a diferencia de la 'r' vibrante del español.",
        ru: "Французский звук 'r' произносится в глубине горла, в отличие от раскатистого 'r' в испанском.",
      },
    },
    b2: {
      grammar: {
        tr: "Subjonctif kipi, şüphe, duygu veya gereklilik ifade eder ve belirli tetikleyici ifadelerden sonra kullanılır.",
        en: "The subjunctive mood expresses doubt, emotion, or necessity and follows specific trigger expressions.",
        fr: "Le subjonctif exprime le doute, l'émotion ou la nécessité et suit des expressions déclencheuses spécifiques.",
        es: "El subjuntivo expresa duda, emoción o necesidad y se usa tras expresiones desencadenantes específicas.",
        ru: "Сослагательное наклонение (subjonctif) выражает сомнение, эмоцию или необходимость и используется после определённых вводных выражений.",
      },
      pronunciation: {
        tr: "Fransızca ritim bir cümle boyunca eşit dağılır; vurgu tek tek kelimelere değil, grubun son hecesine düşer.",
        en: "French rhythm falls evenly across a phrase, with stress on the last syllable of the group, not individual words.",
        fr: "Le rythme du français est régulier sur toute la phrase, avec l'accent sur la dernière syllabe du groupe, pas sur chaque mot.",
        es: "El ritmo del francés se distribuye de forma uniforme en la frase, con el acento en la última sílaba del grupo, no en cada palabra.",
        ru: "Ритм французской речи распределяется равномерно по фразе, с ударением на последнем слоге группы, а не на отдельных словах.",
      },
    },
    c1: {
      grammar: {
        tr: "Yan cümlecikler içeren karmaşık cümle yapıları ve edebi zamanlar (passé simple) resmi yazılarda karşımıza çıkar.",
        en: "Complex sentence structures with subordinate clauses and the literary tenses (passé simple) appear in formal writing.",
        fr: "Les structures de phrases complexes avec propositions subordonnées et les temps littéraires (passé simple) apparaissent à l'écrit formel.",
        es: "Las estructuras de oraciones complejas con cláusulas subordinadas y los tiempos literarios (passé simple) aparecen en la escritura formal.",
        ru: "Сложные синтаксические конструкции с придаточными предложениями и литературные времена (passé simple) встречаются в официальной письменной речи.",
      },
      pronunciation: {
        tr: "Elision ve liaison kurallarına hâkim olmak, ileri seviyede doğal konuşabilmek için şarttır.",
        en: "Mastering elision and liaison rules is essential for sounding natural at an advanced level.",
        fr: "Maîtriser les règles d'élision et de liaison est essentiel pour sonner naturel à un niveau avancé.",
        es: "Dominar las reglas de elisión y liaison es esencial para sonar natural en un nivel avanzado.",
        ru: "Владение правилами элизии и связывания (liaison) необходимо для естественного звучания речи на продвинутом уровне.",
      },
    },
  },
  es: {
    a1: {
      grammar: {
        tr: "İspanyolca isimlerin cinsiyeti vardır ve sıfatlar cinsiyet ile sayı bakımından onlarla uyumlu olmalıdır.",
        en: "Spanish nouns have gender, and adjectives must agree with them in gender and number.",
        fr: "Les noms espagnols ont un genre, et les adjectifs doivent s'accorder avec eux en genre et en nombre.",
        es: "Los sustantivos en español tienen género, y los adjetivos deben concordar con ellos en género y número.",
        ru: "Испанские существительные имеют род, и прилагательные должны согласовываться с ними в роде и числе.",
      },
      pronunciation: {
        tr: "İspanyolca oldukça fonetiktir — İngilizceden farklı olarak her harf neredeyse her zaman aynı sesi verir.",
        en: "Spanish is very phonetic — each letter almost always makes the same sound, unlike English.",
        fr: "L'espagnol est très phonétique — contrairement à l'anglais, chaque lettre fait presque toujours le même son.",
        es: "El español es muy fonético — a diferencia del inglés, cada letra suena casi siempre igual.",
        ru: "Испанский язык очень фонетичен — в отличие от английского, каждая буква почти всегда произносится одинаково.",
      },
    },
    a2: {
      grammar: {
        tr: "Ser ve estar ikisi de 'olmak' anlamına gelir ama farklı kullanılır — biri kalıcı özellikler, diğeri durum ve yer için kullanılır.",
        en: "Ser and estar both mean 'to be' but are used differently — one for permanent traits, the other for states and locations.",
        fr: "Ser et estar signifient tous deux « être », mais s'utilisent différemment — l'un pour les traits permanents, l'autre pour les états et les lieux.",
        es: "Ser y estar significan ambos 'to be', pero se usan de forma diferente: uno para rasgos permanentes y otro para estados y ubicaciones.",
        ru: "Ser и estar оба означают «быть», но используются по-разному — один для постоянных признаков, другой для состояний и местоположения.",
      },
      pronunciation: {
        tr: "Yuvarlanan 'rr' sesi ile yumuşak tekli 'r' sesi birbirinden farklıdır ve kelimenin anlamını değiştirir.",
        en: "The rolled 'rr' sound and the soft single 'r' are distinct and change word meaning.",
        fr: "Le 'rr' roulé et le 'r' simple doux sont distincts et changent le sens des mots.",
        es: "El sonido de la 'rr' vibrante y la 'r' simple suave son distintos y cambian el significado de las palabras.",
        ru: "Раскатистое 'rr' и мягкое одиночное 'r' — разные звуки, которые меняют значение слова.",
      },
    },
    b1: {
      grammar: {
        tr: "Preterite ve imperfect zamanları geçmişi anlatır ama biri tamamlanmış, diğeri süregelen eylemleri ifade eder.",
        en: "The preterite and imperfect tenses both describe the past but express completed actions versus ongoing ones.",
        fr: "Le prétérit et l'imparfait décrivent tous deux le passé, mais expriment des actions terminées ou en cours.",
        es: "El pretérito y el imperfecto describen el pasado, pero expresan acciones terminadas frente a acciones en curso.",
        ru: "Претерит и имперфект оба описывают прошлое, но выражают завершённые действия в отличие от длящихся.",
      },
      pronunciation: {
        tr: "İspanyolca vurgu, kelime sonlarına ve yazılı aksanlara dayalı tahmin edilebilir kurallar izler.",
        en: "Spanish stress follows predictable rules based on word endings and written accents.",
        fr: "L'accent tonique en espagnol suit des règles prévisibles basées sur les terminaisons des mots et les accents écrits.",
        es: "El acento en español sigue reglas predecibles basadas en las terminaciones de las palabras y las tildes.",
        ru: "Ударение в испанском языке подчиняется предсказуемым правилам, основанным на окончаниях слов и письменных акцентах.",
      },
    },
    b2: {
      grammar: {
        tr: "Subjunctivo kipi, dilek, şüphe veya duygu ifadelerinden sonra kullanılır ve doğal konuşma için gereklidir.",
        en: "The subjunctive mood is used after expressions of wish, doubt, or emotion, and is essential for natural speech.",
        fr: "Le subjonctif s'utilise après des expressions de souhait, de doute ou d'émotion, et est essentiel pour un discours naturel.",
        es: "El subjuntivo se usa tras expresiones de deseo, duda o emoción, y es esencial para un habla natural.",
        ru: "Сослагательное наклонение используется после выражений желания, сомнения или эмоций и необходимо для естественной речи.",
      },
      pronunciation: {
        tr: "İspanyolcada heceler eşit sürede söylenir, bu da dile karakteristik ritmik akışını verir.",
        en: "Syllables in Spanish are evenly timed, giving the language its characteristic rhythmic flow.",
        fr: "Les syllabes en espagnol ont une durée régulière, ce qui donne à la langue son flux rythmique caractéristique.",
        es: "Las sílabas en español tienen una duración uniforme, lo que le da al idioma su flujo rítmico característico.",
        ru: "Слоги в испанском произносятся с равной длительностью, что придаёт языку характерный ритмичный поток.",
      },
    },
    c1: {
      grammar: {
        tr: "Bileşik zamanlar ve koşul/subjunctivo kombinasyonları, varsayımsal ve resmi fikirleri kesin biçimde ifade etmeni sağlar.",
        en: "Compound tenses and conditional/subjunctive combinations let you express hypothetical and formal ideas precisely.",
        fr: "Les temps composés et les combinaisons conditionnel/subjonctif permettent d'exprimer des idées hypothétiques et formelles avec précision.",
        es: "Los tiempos compuestos y las combinaciones de condicional/subjuntivo permiten expresar ideas hipotéticas y formales con precisión.",
        ru: "Сложные времена и сочетания условного наклонения с сослагательным позволяют точно выражать гипотетические и формальные идеи.",
      },
      pronunciation: {
        tr: "Bölgesel aksanlar büyük farklılık gösterir, ancak standart ritim ve tonlama akıcı konuşmanın anahtarı olmaya devam eder.",
        en: "Regional accents vary widely, but standard rhythm and intonation remain key to sounding fluent.",
        fr: "Les accents régionaux varient beaucoup, mais le rythme et l'intonation standards restent essentiels pour paraître fluide.",
        es: "Los acentos regionales varían mucho, pero el ritmo y la entonación estándar siguen siendo clave para sonar fluido.",
        ru: "Региональные акценты сильно различаются, но стандартный ритм и интонация остаются ключом к беглой речи.",
      },
    },
  },
  ru: {
    a1: {
      grammar: {
        tr: "Rusçada tanımlık ('a'/'the') yoktur ve şimdiki zamanda 'olmak' fiili kullanılmaz — cümleler çok kısa olabilir.",
        en: "Russian has no articles ('a'/'the') and no present-tense verb 'to be' — sentences can be very short.",
        fr: "Le russe n'a pas d'articles ('a'/'the') ni de verbe 'être' au présent — les phrases peuvent être très courtes.",
        es: "El ruso no tiene artículos ('a'/'the') ni verbo 'ser/estar' en presente — las frases pueden ser muy cortas.",
        ru: "В русском языке нет артиклей ('a'/'the') и нет глагола-связки «быть» в настоящем времени — предложения могут быть очень короткими.",
      },
      pronunciation: {
        tr: "Kelime vurgusu tahmin edilemez ve ezberlenmelidir, çünkü vurgusuz ünlüler farklı seslendirilir.",
        en: "Word stress is unpredictable and must be memorized, as unstressed vowels change sound.",
        fr: "L'accent tonique est imprévisible et doit être mémorisé, car les voyelles non accentuées changent de son.",
        es: "El acento de la palabra es impredecible y debe memorizarse, ya que las vocales átonas cambian de sonido.",
        ru: "Ударение в русском языке непредсказуемо, его нужно запоминать, так как безударные гласные меняют звучание.",
      },
    },
    a2: {
      grammar: {
        tr: "Rusça isimler cümledeki rollerine göre sonlarını değiştirir — buna hâl (case) sistemi denir.",
        en: "Russian nouns change endings depending on their role in the sentence — this is called the case system.",
        fr: "Les noms russes changent de terminaison selon leur rôle dans la phrase — c'est le système des cas.",
        es: "Los sustantivos rusos cambian de terminación según su función en la oración — esto se llama sistema de casos.",
        ru: "Русские существительные меняют окончания в зависимости от их роли в предложении — это называется падежной системой.",
      },
      pronunciation: {
        tr: "Ünsüzler 'sert' ya da 'yumuşak' (damaksıllaşmış) olabilir; bu, benzer görünen kelimelerin anlamını değiştirir.",
        en: "Consonants can be 'hard' or 'soft' (palatalized), which changes the meaning of similar-looking words.",
        fr: "Les consonnes peuvent être 'dures' ou 'douces' (palatalisées), ce qui change le sens de mots qui se ressemblent.",
        es: "Las consonantes pueden ser 'duras' o 'suaves' (palatalizadas), lo que cambia el significado de palabras parecidas.",
        ru: "Согласные могут быть 'твёрдыми' или 'мягкими' (палатализованными), что меняет значение похожих слов.",
      },
    },
    b1: {
      grammar: {
        tr: "Hareket fiilleri ve fiil görünüşü (tamamlanmış/tamamlanmamış) bir eylemin bitip bitmediğini anlatır.",
        en: "Verbs of motion and verb aspect (perfective/imperfective) describe whether an action is completed or ongoing.",
        fr: "Les verbes de mouvement et l'aspect verbal (perfectif/imperfectif) indiquent si une action est achevée ou en cours.",
        es: "Los verbos de movimiento y el aspecto verbal (perfectivo/imperfectivo) indican si una acción está terminada o en curso.",
        ru: "Глаголы движения и вид глагола (совершенный/несовершенный) показывают, завершено действие или продолжается.",
      },
      pronunciation: {
        tr: "Kelime sonundaki ötümlü ünsüzler ötümsüz okunur (örn. 'город' kelimesi 'gorot' gibi seslendirilir).",
        en: "Voiced consonants at the end of a word are pronounced unvoiced (e.g., 'город' sounds like 'gorot').",
        fr: "Les consonnes sonores en fin de mot se prononcent sourdes (ex. 'город' se prononce comme 'gorot').",
        es: "Las consonantes sonoras al final de una palabra se pronuncian sordas (p. ej., 'город' suena como 'gorot').",
        ru: "Звонкие согласные на конце слова оглушаются (например, слово 'город' произносится как 'горот').",
      },
    },
    b2: {
      grammar: {
        tr: "Altı hâllik sistem (yalın, ilgi, yönelme, belirtme, araç, edat hâli) isim, zamir ve sıfatları birlikte yönetir.",
        en: "The six-case system (nominative, genitive, dative, accusative, instrumental, prepositional) governs nouns, pronouns, and adjectives together.",
        fr: "Le système à six cas (nominatif, génitif, datif, accusatif, instrumental, prépositionnel) régit ensemble noms, pronoms et adjectifs.",
        es: "El sistema de seis casos (nominativo, genitivo, dativo, acusativo, instrumental, preposicional) rige juntos sustantivos, pronombres y adjetivos.",
        ru: "Система из шести падежей (именительный, родительный, дательный, винительный, творительный, предложный) управляет существительными, местоимениями и прилагательными вместе.",
      },
      pronunciation: {
        tr: "Vurgusuz hecelerdeki ünlü daralması (akanye), 'o' ve 'a' seslerinin vurguya göre nasıl duyulacağını değiştirir.",
        en: "Vowel reduction in unstressed syllables (akanye) changes how 'o' and 'a' sound depending on stress.",
        fr: "La réduction vocalique dans les syllabes non accentuées (akanié) change la prononciation de 'o' et 'a' selon l'accent.",
        es: "La reducción vocálica en sílabas átonas (akanie) cambia cómo suenan la 'o' y la 'a' según el acento.",
        ru: "Редукция гласных в безударных слогах (аканье) меняет звучание 'о' и 'а' в зависимости от ударения.",
      },
    },
    c1: {
      grammar: {
        tr: "Sıfat-fiiller ve zarf-fiiller, resmi Rusçada yaygın olan derli toplu, edebi cümle yapıları kurmayı sağlar.",
        en: "Participles and gerunds (verbal adverbs) allow compact, literary sentence structures common in formal Russian.",
        fr: "Les participes et les gérondifs (adverbes verbaux) permettent des structures de phrases compactes et littéraires, courantes en russe formel.",
        es: "Los participios y los gerundios (adverbios verbales) permiten estructuras de oración compactas y literarias, comunes en el ruso formal.",
        ru: "Причастия и деепричастия позволяют строить компактные литературные конструкции, характерные для официального русского языка.",
      },
      pronunciation: {
        tr: "Ünsüz kümeleri ve hızlı konuşma, doğal ve hızlı Rusçayı çözebilmek için pratik gerektirir.",
        en: "Consonant clusters and rapid speech require practice to parse natural, fast spoken Russian.",
        fr: "Les groupes de consonnes et le débit rapide demandent de la pratique pour comprendre le russe parlé naturel et rapide.",
        es: "Los grupos consonánticos y el habla rápida requieren práctica para entender el ruso hablado natural y veloz.",
        ru: "Стечения согласных и быстрая речь требуют практики, чтобы понимать естественную, быструю русскую речь.",
      },
    },
  },
  tr: {
    a1: {
      grammar: {
        tr: "Türkçe eklemeli bir dildir — anlam, kök kelimelere ekler getirilerek oluşturulur ve ünlü uyumu vardır.",
        en: "Turkish is an agglutinative language — suffixes are added to word roots to build meaning, and there is vowel harmony.",
        fr: "Le turc est une langue agglutinante — des suffixes s'ajoutent aux racines des mots pour construire le sens, avec une harmonie vocalique.",
        es: "El turco es una lengua aglutinante — se añaden sufijos a las raíces de las palabras para construir el significado, y existe armonía vocálica.",
        ru: "Турецкий — агглютинативный язык: к корням слов добавляются суффиксы для образования значения, и в нём действует гармония гласных.",
      },
      pronunciation: {
        tr: "Her harf tutarlı ve net biçimde okunur — Türkçe yazım, sesleriyle büyük ölçüde örtüşür.",
        en: "Every letter is pronounced consistently and clearly — Turkish spelling matches its sounds closely.",
        fr: "Chaque lettre se prononce de manière constante et claire — l'orthographe turque correspond de près à ses sons.",
        es: "Cada letra se pronuncia de forma constante y clara — la ortografía turca coincide de cerca con sus sonidos.",
        ru: "Каждая буква произносится последовательно и чётко — турецкое написание точно соответствует звучанию.",
      },
    },
    a2: {
      grammar: {
        tr: "Kelime sırası genellikle Özne-Nesne-Yüklem şeklindedir; fiil neredeyse her zaman cümlenin sonunda yer alır.",
        en: "Word order is typically Subject-Object-Verb, with the verb almost always at the end of the sentence.",
        fr: "L'ordre des mots est généralement Sujet-Objet-Verbe, le verbe se trouvant presque toujours en fin de phrase.",
        es: "El orden de las palabras suele ser Sujeto-Objeto-Verbo, y el verbo casi siempre va al final de la oración.",
        ru: "Порядок слов обычно 'подлежащее-дополнение-сказуемое', при этом глагол почти всегда стоит в конце предложения.",
      },
      pronunciation: {
        tr: "Ünlü uyumu, eklerdeki ünlülerin kelimedeki son ünlüye göre değişmesi demektir — bu düzeni dinleyerek fark et.",
        en: "Vowel harmony means suffix vowels change to match the last vowel in the word — listen for the pattern.",
        fr: "L'harmonie vocalique signifie que les voyelles des suffixes changent pour s'accorder à la dernière voyelle du mot — sois attentif à ce schéma.",
        es: "La armonía vocálica implica que las vocales de los sufijos cambian para coincidir con la última vocal de la palabra — presta atención al patrón.",
        ru: "Гармония гласных означает, что гласные в суффиксах меняются в соответствии с последней гласной слова — прислушивайся к этой закономерности.",
      },
    },
    b1: {
      grammar: {
        tr: "Türkçede tanıklık (evidentiality) vardır — farklı geçmiş zaman ekleri, bir olayı bizzat gördüğünü mü yoksa duyduğunu mu belirtir.",
        en: "Turkish uses evidentiality — different past-tense suffixes show whether you witnessed an event or heard about it.",
        fr: "Le turc utilise l'évidentialité — différents suffixes du passé indiquent si tu as été témoin d'un événement ou si tu en as seulement entendu parler.",
        es: "El turco usa la evidencialidad — distintos sufijos de pasado indican si presenciaste un evento o solo lo escuchaste.",
        ru: "В турецком языке есть категория эвиденциальности — разные суффиксы прошедшего времени показывают, стал ли говорящий свидетелем события или узнал о нём с чужих слов.",
      },
      pronunciation: {
        tr: "Vurgu genellikle son hecededir, ancak bazı ekler ve alıntı kelimelerle bu değişebilir.",
        en: "Stress is usually on the last syllable, but this shifts with certain suffixes and loanwords.",
        fr: "L'accent tombe généralement sur la dernière syllabe, mais cela change avec certains suffixes et les mots empruntés.",
        es: "El acento suele recaer en la última sílaba, pero esto cambia con ciertos sufijos y palabras prestadas.",
        ru: "Ударение обычно падает на последний слог, но оно может смещаться с определёнными суффиксами и заимствованными словами.",
      },
    },
    b2: {
      grammar: {
        tr: "Karmaşık cümlelerde 'ki' ya da 'çünkü' gibi ayrı kelimeler yerine sıfat-fiil ve zarf-fiil ekleri kullanılır.",
        en: "Complex sentences use participle and converb suffixes instead of separate words like 'that' or 'because'.",
        fr: "Les phrases complexes utilisent des suffixes de participe et de converbe au lieu de mots séparés comme 'que' ou 'parce que'.",
        es: "Las oraciones complejas usan sufijos de participio y converbio en lugar de palabras separadas como 'que' o 'porque'.",
        ru: "В сложных предложениях используются суффиксы причастий и деепричастий вместо отдельных слов вроде 'что' или 'потому что'.",
      },
      pronunciation: {
        tr: "Ek sınırlarında ünsüz yumuşaması olur (örn. k→ğ); bu, doğal bir Türkçe için önemlidir.",
        en: "Consonant softening happens at suffix boundaries (e.g., k→ğ), which is key to natural-sounding Turkish.",
        fr: "Un adoucissement des consonnes se produit aux limites des suffixes (par ex. k→ğ), ce qui est essentiel pour un turc naturel.",
        es: "El ablandamiento consonántico ocurre en los límites de los sufijos (p. ej., k→ğ), lo cual es clave para un turco natural.",
        ru: "На стыке суффиксов происходит смягчение согласных (например, k→ğ), что важно для естественного звучания турецкой речи.",
      },
    },
    c1: {
      grammar: {
        tr: "İsim-fiil cümlecikleri, tüm bir cümlenin tek bir isim öbeği gibi işlev görmesini sağlar; bu, resmi ve yazılı Türkçede yaygındır.",
        en: "Nominalized clauses let entire sentences function as a single noun phrase, common in formal and written Turkish.",
        fr: "Les propositions nominalisées permettent à des phrases entières de fonctionner comme un simple groupe nominal, ce qui est courant dans le turc formel et écrit.",
        es: "Las cláusulas nominalizadas permiten que oraciones enteras funcionen como una sola frase nominal, algo común en el turco formal y escrito.",
        ru: "Номинализованные придаточные позволяют целому предложению функционировать как одна именная группа — это распространено в официальном и письменном турецком языке.",
      },
      pronunciation: {
        tr: "Resmi anlatım daha uzun ve yoğun ek zincirleri kullanır — bunları kulaktan hızlıca çözmeyi pratik et.",
        en: "Formal registers use longer, denser suffix chains — practice parsing them quickly by ear.",
        fr: "Les registres formels utilisent des chaînes de suffixes plus longues et plus denses — entraîne-toi à les analyser rapidement à l'oreille.",
        es: "Los registros formales usan cadenas de sufijos más largas y densas — practica analizarlas rápidamente de oído.",
        ru: "В официальной речи используются более длинные и насыщенные суффиксальные цепочки — тренируйся быстро распознавать их на слух.",
      },
    },
  },
};
