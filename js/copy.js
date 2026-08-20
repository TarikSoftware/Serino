/* Serino - sıcak metin havuzları, maskot çizimi ve gün vakti yardımcıları. */

const SERINO_GREETINGS = {
  morning: { salutation: "Günaydın", notes: ["Güne enerjik başla ☀️", "Kahvenle birlikte birkaç kelime?"] },
  afternoon: { salutation: "İyi günler", notes: ["Güzel bir mola zamanı", "Biraz kelime öğrenmeye ne dersin?"] },
  evening: { salutation: "İyi akşamlar", notes: ["Günü güzel bitir", "Akşam pratiği seni bekliyor"] },
  night: { salutation: "İyi geceler", notes: ["Uyumadan önce birkaç kelime", "Sessiz bir çalışma anı"] },
};

const SERINO_RESULT_MESSAGES = {
  success: [
    "Bugün de bir adım ileri gittin.",
    "Ne sıcak bir öğrenme anıydı!",
    "Böyle devam, harika gidiyorsun.",
    "Küçük adımlar büyük fark yaratır.",
  ],
  fail: [
    "Olsun, bir dahaki sefere olacak.",
    "Her deneme seni biraz daha ileri taşır.",
    "Derin bir nefes al ve tekrar dene.",
    "Vazgeçmek yok, kahveni tazele ve devam et.",
  ],
};

const SERINO_WEEKLY_MESSAGES = [
  { min: 0, text: "Bu hafta yeni başlangıçlar için harika bir zaman." },
  { min: 1, text: "Güzel bir başlangıç yaptın." },
  { min: 60, text: "Bu hafta gayet sıcak geçiyor!" },
  { min: 150, text: "Ne sıcak bir öğrenme haftası!" },
];

function serinoDaytimePeriod() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 21) return "evening";
  return "night";
}

function serinoRandomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function serinoWeeklyMessage(xp) {
  const matches = SERINO_WEEKLY_MESSAGES.filter((m) => xp >= m.min);
  return matches[matches.length - 1].text;
}

/* Sevimli bir tavşan maskotu. mood: "happy" | "normal" | "sad" | "sleepy" */
function serinoMascotSVG(mood) {
  const faces = {
    happy: { eye: "M -13 -4 Q -8 -10 -3 -4", eyeR: "M 3 -4 Q 8 -10 13 -4", mouth: "M -9 6 Q 0 15 9 6" },
    normal: { eye: 'circle', eyeR: 'circle', mouth: "M -7 7 Q 0 11 7 7" },
    sad: { eye: 'circle', eyeR: 'circle', mouth: "M -7 10 Q 0 4 7 10" },
    sleepy: { eye: "M -13 -4 Q -8 -1 -3 -4", eyeR: "M 3 -4 Q 8 -1 13 -4", mouth: "M -5 8 Q 0 10 5 8" },
  };
  const f = faces[mood] || faces.normal;

  const eyesMarkup = f.eye === "circle"
    ? `<circle cx="-8" cy="-3" r="3.2" fill="var(--brown)"/><circle cx="8" cy="-3" r="3.2" fill="var(--brown)"/>`
    : `<path d="${f.eye}" stroke="var(--brown)" stroke-width="3" fill="none" stroke-linecap="round"/><path d="${f.eyeR}" stroke="var(--brown)" stroke-width="3" fill="none" stroke-linecap="round"/>`;

  const zzz = mood === "sleepy"
    ? `<text x="26" y="-28" font-size="11" fill="var(--pink-dark)" font-family="Fredoka, sans-serif">Zzz</text>`
    : "";

  return `
  <svg viewBox="-45 -55 90 105" class="mascot-svg mascot-${mood}" aria-hidden="true">
    <ellipse cx="-14" cy="-38" rx="7" ry="18" fill="var(--card)" stroke="var(--pink)" stroke-width="3" transform="rotate(-12 -14 -38)"/>
    <ellipse cx="14" cy="-38" rx="7" ry="18" fill="var(--card)" stroke="var(--pink)" stroke-width="3" transform="rotate(12 14 -38)"/>
    <ellipse cx="-14" cy="-36" rx="3.2" ry="10" fill="var(--pink)" transform="rotate(-12 -14 -36)"/>
    <ellipse cx="14" cy="-36" rx="3.2" ry="10" fill="var(--pink)" transform="rotate(12 14 -36)"/>
    <circle cx="0" cy="2" r="30" fill="var(--card)" stroke="var(--pink)" stroke-width="3"/>
    <path d="M -20 24 Q 0 34 20 24 Q 22 40 10 46 Q 0 40 -10 46 Q -22 40 -20 24 Z" fill="var(--pink-dark)"/>
    ${eyesMarkup}
    <ellipse cx="0" cy="4" rx="3" ry="2.2" fill="var(--pink-dark)"/>
    <path d="${f.mouth}" stroke="var(--brown)" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <circle cx="-19" cy="6" r="3.5" fill="var(--rose)" opacity="0.35"/>
    <circle cx="19" cy="6" r="3.5" fill="var(--rose)" opacity="0.35"/>
    ${zzz}
  </svg>`;
}

/* Can göstergesi: sıcak çikolata fincanı, dolu/boş durumuna göre. */
function serinoMugIcon(filled) {
  return `<svg viewBox="0 0 24 24" class="mug-icon ${filled ? "mug-filled" : "mug-empty"}">
    <path d="M4 8h13a3 3 0 0 1 0 6h-1.4" fill="none" stroke="currentColor" stroke-width="1.6"/>
    <path d="M4 8h12v7a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8Z" fill="${filled ? "currentColor" : "none"}" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
    ${filled ? '<path d="M8 3.5c0 1-1.4 1-1.4 2.2M12.4 3.5c0 1-1.4 1-1.4 2.2" stroke="currentColor" stroke-width="1.3" fill="none" stroke-linecap="round"/>' : ""}
  </svg>`;
}
