/* ==========================================================================
   Serino - içerik şablonu
   ==========================================================================
   Bu dosya üç katmandan oluşur:

   1) SERINO_LEVELS      - zorluk seviyeleri (A1, A2, B1, ...)
   2) SERINO_CATEGORIES  - konu/tema kategorileri (Aile, Yiyecek, ...)
   3) SERINO_UNITS        - her biri BİR kategori + BİR seviye kombinasyonu.
                            Kelimeleri (words) ve isteğe bağlı örnek
                            cümleleri (sentences) burada tutulur.

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
           { en: "airport", tr: "havalimanı" },
           { en: "ticket", tr: "bilet" },
           // ... en az birkaç kelime çifti daha
         ],
         sentences: [ // opsiyonel - cümle kurma alıştırması üretir
           { en: "Where is the airport?", tr: "Havalimanı nerede?" },
         ],
       }

   ÖNEMLİ: SERINO_UNITS dizisindeki SIRA, ders yolundaki ilerleme sırasını
   belirler - bir önceki ünite tamamlanmadan bir sonraki açılmaz. Yeni
   seviye eklerken üniteleri dizinin SONUNA eklemen yeterli.
   ========================================================================== */

const SERINO_LEVELS = [
  { id: "a1", code: "A1", label: { tr: "Başlangıç", en: "Beginner" } },
  { id: "a2", code: "A2", label: { tr: "Temel", en: "Elementary" } },
  { id: "b1", code: "B1", label: { tr: "Orta Seviye", en: "Intermediate" } },
];

const SERINO_CATEGORIES = [
  { id: "temel", icon: "👋", accent: "#fde2ea", label: { tr: "Temel Kelimeler", en: "Basics" } },
  { id: "aile", icon: "👨‍👩‍👧", accent: "#e2f3e7", label: { tr: "Aile", en: "Family" } },
  { id: "yiyecek", icon: "🍎", accent: "#eae2f7", label: { tr: "Yiyecekler", en: "Food" } },
  { id: "sayilar", icon: "🔢", accent: "#fdecd9", label: { tr: "Sayılar", en: "Numbers" } },
  { id: "gunluk", icon: "🏡", accent: "#e2eef7", label: { tr: "Günlük Hayat", en: "Daily Life" } },
  { id: "renkler", icon: "🎨", accent: "#fde2ea", label: { tr: "Renkler", en: "Colors" } },
  { id: "hayvanlar", icon: "🐾", accent: "#e2f3e7", label: { tr: "Hayvanlar", en: "Animals" } },
  { id: "zaman", icon: "⏰", accent: "#eae2f7", label: { tr: "Zaman", en: "Time" } },
  { id: "vucut", icon: "🖐️", accent: "#fdecd9", label: { tr: "Vücut", en: "Body" } },
  { id: "giysiler", icon: "👕", accent: "#e2eef7", label: { tr: "Giysiler", en: "Clothing" } },
  { id: "meslekler", icon: "💼", accent: "#fde2ea", label: { tr: "Meslekler", en: "Professions" } },
  { id: "duygular", icon: "😊", accent: "#e2f3e7", label: { tr: "Duygular", en: "Emotions" } },
  { id: "seyahat", icon: "✈️", accent: "#fde2ea", label: { tr: "Seyahat", en: "Travel" } },
  { id: "alisveris", icon: "🛍️", accent: "#e2f3e7", label: { tr: "Alışveriş", en: "Shopping" } },
  { id: "hava", icon: "🌦️", accent: "#eae2f7", label: { tr: "Hava Durumu", en: "Weather" } },
  { id: "spor", icon: "⚽", accent: "#fdecd9", label: { tr: "Spor", en: "Sports" } },
  { id: "teknoloji", icon: "💻", accent: "#e2eef7", label: { tr: "Teknoloji", en: "Technology" } },
];

const SERINO_UNITS = [
  // ---------- A1 · Başlangıç ----------
  {
    id: "temel-a1",
    categoryId: "temel",
    levelId: "a1",
    words: [
      { en: "hello", tr: "merhaba" },
      { en: "goodbye", tr: "hoşça kal" },
      { en: "yes", tr: "evet" },
      { en: "no", tr: "hayır" },
      { en: "please", tr: "lütfen" },
      { en: "thank you", tr: "teşekkür ederim" },
      { en: "sorry", tr: "özür dilerim" },
      { en: "friend", tr: "arkadaş" },
    ],
    sentences: [
      { en: "Thank you very much.", tr: "Çok teşekkür ederim." },
      { en: "I am sorry.", tr: "Özür dilerim." },
    ],
  },
  {
    id: "aile-a1",
    categoryId: "aile",
    levelId: "a1",
    words: [
      { en: "mother", tr: "anne" },
      { en: "father", tr: "baba" },
      { en: "sister", tr: "kız kardeş" },
      { en: "brother", tr: "erkek kardeş" },
      { en: "child", tr: "çocuk" },
      { en: "family", tr: "aile" },
      { en: "grandmother", tr: "büyükanne" },
      { en: "grandfather", tr: "büyükbaba" },
    ],
    sentences: [
      { en: "This is my family.", tr: "Bu benim ailem." },
      { en: "My mother and father are here.", tr: "Annem ve babam burada." },
    ],
  },
  {
    id: "yiyecek-a1",
    categoryId: "yiyecek",
    levelId: "a1",
    words: [
      { en: "bread", tr: "ekmek" },
      { en: "water", tr: "su" },
      { en: "apple", tr: "elma" },
      { en: "milk", tr: "süt" },
      { en: "coffee", tr: "kahve" },
      { en: "tea", tr: "çay" },
      { en: "egg", tr: "yumurta" },
      { en: "cheese", tr: "peynir" },
    ],
    sentences: [
      { en: "I drink coffee every morning.", tr: "Her sabah kahve içerim." },
      { en: "She likes apples and cheese.", tr: "O elma ve peyniri sever." },
    ],
  },
  {
    id: "sayilar-a1",
    categoryId: "sayilar",
    levelId: "a1",
    words: [
      { en: "one", tr: "bir" },
      { en: "two", tr: "iki" },
      { en: "three", tr: "üç" },
      { en: "four", tr: "dört" },
      { en: "five", tr: "beş" },
      { en: "six", tr: "altı" },
      { en: "seven", tr: "yedi" },
      { en: "eight", tr: "sekiz" },
    ],
    sentences: [
      { en: "I have two brothers.", tr: "İki erkek kardeşim var." },
      { en: "She is eight years old.", tr: "O sekiz yaşında." },
    ],
  },
  {
    id: "gunluk-a1",
    categoryId: "gunluk",
    levelId: "a1",
    words: [
      { en: "house", tr: "ev" },
      { en: "work", tr: "iş" },
      { en: "school", tr: "okul" },
      { en: "book", tr: "kitap" },
      { en: "time", tr: "zaman" },
      { en: "day", tr: "gün" },
      { en: "night", tr: "gece" },
      { en: "city", tr: "şehir" },
    ],
    sentences: [
      { en: "I go to school every day.", tr: "Her gün okula giderim." },
      { en: "This city is very big.", tr: "Bu şehir çok büyük." },
    ],
  },
  {
    id: "renkler-a1",
    categoryId: "renkler",
    levelId: "a1",
    words: [
      { en: "red", tr: "kırmızı" },
      { en: "blue", tr: "mavi" },
      { en: "green", tr: "yeşil" },
      { en: "yellow", tr: "sarı" },
      { en: "black", tr: "siyah" },
      { en: "white", tr: "beyaz" },
      { en: "orange", tr: "turuncu" },
      { en: "purple", tr: "mor" },
    ],
    sentences: [
      { en: "The sky is blue.", tr: "Gökyüzü mavidir." },
      { en: "I like the color red.", tr: "Kırmızı rengi severim." },
    ],
  },
  {
    id: "hayvanlar-a1",
    categoryId: "hayvanlar",
    levelId: "a1",
    words: [
      { en: "dog", tr: "köpek" },
      { en: "cat", tr: "kedi" },
      { en: "bird", tr: "kuş" },
      { en: "fish", tr: "balık" },
      { en: "horse", tr: "at" },
      { en: "cow", tr: "inek" },
      { en: "lion", tr: "aslan" },
      { en: "rabbit", tr: "tavşan" },
    ],
    sentences: [
      { en: "The dog is very friendly.", tr: "Köpek çok arkadaş canlısı." },
      { en: "I have a small cat.", tr: "Küçük bir kedim var." },
    ],
  },
  {
    id: "zaman-a1",
    categoryId: "zaman",
    levelId: "a1",
    words: [
      { en: "today", tr: "bugün" },
      { en: "tomorrow", tr: "yarın" },
      { en: "yesterday", tr: "dün" },
      { en: "week", tr: "hafta" },
      { en: "month", tr: "ay" },
      { en: "year", tr: "yıl" },
      { en: "hour", tr: "saat" },
      { en: "minute", tr: "dakika" },
    ],
    sentences: [
      { en: "See you tomorrow.", tr: "Yarın görüşürüz." },
      { en: "I am busy this week.", tr: "Bu hafta meşgulüm." },
    ],
  },
  {
    id: "vucut-a1",
    categoryId: "vucut",
    levelId: "a1",
    words: [
      { en: "head", tr: "baş" },
      { en: "hand", tr: "el" },
      { en: "eye", tr: "göz" },
      { en: "ear", tr: "kulak" },
      { en: "foot", tr: "ayak" },
      { en: "nose", tr: "burun" },
      { en: "mouth", tr: "ağız" },
      { en: "hair", tr: "saç" },
    ],
    sentences: [
      { en: "Close your eyes.", tr: "Gözlerini kapat." },
      { en: "My hands are cold.", tr: "Ellerim soğuk." },
    ],
  },
  {
    id: "giysiler-a1",
    categoryId: "giysiler",
    levelId: "a1",
    words: [
      { en: "shirt", tr: "gömlek" },
      { en: "shoes", tr: "ayakkabı" },
      { en: "hat", tr: "şapka" },
      { en: "dress", tr: "elbise" },
      { en: "jacket", tr: "ceket" },
      { en: "socks", tr: "çorap" },
      { en: "pants", tr: "pantolon" },
      { en: "scarf", tr: "atkı" },
    ],
    sentences: [
      { en: "I need new shoes.", tr: "Yeni ayakkabıya ihtiyacım var." },
      { en: "She is wearing a red dress.", tr: "O kırmızı bir elbise giyiyor." },
    ],
  },

  // ---------- A2 · Temel ----------
  {
    id: "meslekler-a2",
    categoryId: "meslekler",
    levelId: "a2",
    words: [
      { en: "teacher", tr: "öğretmen" },
      { en: "doctor", tr: "doktor" },
      { en: "engineer", tr: "mühendis" },
      { en: "driver", tr: "şoför" },
      { en: "farmer", tr: "çiftçi" },
      { en: "nurse", tr: "hemşire" },
      { en: "lawyer", tr: "avukat" },
      { en: "artist", tr: "sanatçı" },
    ],
    sentences: [
      { en: "My father is a doctor.", tr: "Babam bir doktor." },
      { en: "She wants to be a teacher.", tr: "O bir öğretmen olmak istiyor." },
    ],
  },
  {
    id: "duygular-a2",
    categoryId: "duygular",
    levelId: "a2",
    words: [
      { en: "happy", tr: "mutlu" },
      { en: "sad", tr: "üzgün" },
      { en: "angry", tr: "kızgın" },
      { en: "tired", tr: "yorgun" },
      { en: "excited", tr: "heyecanlı" },
      { en: "afraid", tr: "korkmuş" },
      { en: "surprised", tr: "şaşırmış" },
      { en: "calm", tr: "sakin" },
    ],
    sentences: [
      { en: "I am very happy today.", tr: "Bugün çok mutluyum." },
      { en: "Don't be afraid.", tr: "Korkma." },
    ],
  },

  // ---------- B1 · Orta Seviye ----------
  {
    id: "seyahat-b1",
    categoryId: "seyahat",
    levelId: "b1",
    words: [
      { en: "airport", tr: "havalimanı" },
      { en: "ticket", tr: "bilet" },
      { en: "passport", tr: "pasaport" },
      { en: "hotel", tr: "otel" },
      { en: "suitcase", tr: "bavul" },
      { en: "map", tr: "harita" },
      { en: "journey", tr: "yolculuk" },
      { en: "border", tr: "sınır" },
    ],
    sentences: [
      { en: "Where is the airport?", tr: "Havalimanı nerede?" },
      { en: "I lost my passport.", tr: "Pasaportumu kaybettim." },
    ],
  },
  {
    id: "alisveris-b1",
    categoryId: "alisveris",
    levelId: "b1",
    words: [
      { en: "price", tr: "fiyat" },
      { en: "discount", tr: "indirim" },
      { en: "receipt", tr: "fiş" },
      { en: "cash", tr: "nakit" },
      { en: "market", tr: "pazar" },
      { en: "cashier", tr: "kasiyer" },
      { en: "expensive", tr: "pahalı" },
      { en: "cheap", tr: "ucuz" },
    ],
    sentences: [
      { en: "This shirt is too expensive.", tr: "Bu gömlek çok pahalı." },
      { en: "Can I pay by cash?", tr: "Nakit ödeyebilir miyim?" },
    ],
  },
  {
    id: "hava-b1",
    categoryId: "hava",
    levelId: "b1",
    words: [
      { en: "rain", tr: "yağmur" },
      { en: "snow", tr: "kar" },
      { en: "sun", tr: "güneş" },
      { en: "wind", tr: "rüzgar" },
      { en: "cloud", tr: "bulut" },
      { en: "storm", tr: "fırtına" },
      { en: "temperature", tr: "sıcaklık" },
      { en: "season", tr: "mevsim" },
    ],
    sentences: [
      { en: "It is raining outside.", tr: "Dışarıda yağmur yağıyor." },
      { en: "I love the summer season.", tr: "Yaz mevsimini çok severim." },
    ],
  },
  {
    id: "spor-b1",
    categoryId: "spor",
    levelId: "b1",
    words: [
      { en: "football", tr: "futbol" },
      { en: "basketball", tr: "basketbol" },
      { en: "swimming", tr: "yüzme" },
      { en: "running", tr: "koşu" },
      { en: "team", tr: "takım" },
      { en: "match", tr: "maç" },
      { en: "champion", tr: "şampiyon" },
      { en: "referee", tr: "hakem" },
    ],
    sentences: [
      { en: "Our team won the match.", tr: "Takımımız maçı kazandı." },
      { en: "He goes swimming every week.", tr: "O her hafta yüzmeye gider." },
    ],
  },
  {
    id: "teknoloji-b1",
    categoryId: "teknoloji",
    levelId: "b1",
    words: [
      { en: "computer", tr: "bilgisayar" },
      { en: "phone", tr: "telefon" },
      { en: "internet", tr: "internet" },
      { en: "screen", tr: "ekran" },
      { en: "password", tr: "şifre" },
      { en: "application", tr: "uygulama" },
      { en: "battery", tr: "batarya" },
      { en: "keyboard", tr: "klavye" },
    ],
    sentences: [
      { en: "I forgot my password.", tr: "Şifremi unuttum." },
      { en: "My phone battery is low.", tr: "Telefonumun bataryası az." },
    ],
  },

  // ---------- Yeni seviye eklemek için ----------
  // Örn. "b2" (İleri Orta Seviye): önce SERINO_LEVELS dizisine ekle,
  // sonra buraya (SERINO_UNITS'in sonuna) o seviyeye ait üniteleri ekle.
];

function serinoCategory(id) {
  return SERINO_CATEGORIES.find((c) => c.id === id);
}

function serinoLevel(id) {
  return SERINO_LEVELS.find((l) => l.id === id);
}

/* Desteklenen diller. Yeni bir dil eklemek için buraya bir giriş ve
   her kelimeye/cümleye o dilin karşılığını eklemek yeterli. */
const SERINO_LANGUAGES = {
  tr: { name: "Türkçe", flag: "🇹🇷" },
  en: { name: "İngilizce", flag: "🇬🇧" },
};
