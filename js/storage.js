/* Serino - localStorage yardımcıları. */

const SERINO_STORAGE_KEY = "serino_state";

function serinoDefaultState() {
  return {
    profile: null, // { name, createdAt }
    settings: {
      sound: true,
      theme: "system", // "system" | "light" | "dark"
    },
    progress: {
      // hesap geneli: tüm kurslarda ortak
      xp: 0,
      streak: 0,
      lastActiveDate: null, // "YYYY-MM-DD"
      xpByDate: {}, // { "YYYY-MM-DD": xp }
    },
    courses: [], // { id, nativeLang, learnLang, createdAt, completedUnits: [], unitBest: {} }
    activeCourseId: null,
  };
}

function serinoMakeCourseId(nativeLang, learnLang) {
  return `${nativeLang}-${learnLang}`;
}

/* Eski (tek kurslu) veri şeklini yeni çok kurslu şekle taşır. */
function serinoMigrateState(parsed) {
  if (!parsed.profile || parsed.courses) return parsed;

  if (parsed.profile.nativeLang && parsed.profile.learnLang) {
    const course = {
      id: serinoMakeCourseId(parsed.profile.nativeLang, parsed.profile.learnLang),
      nativeLang: parsed.profile.nativeLang,
      learnLang: parsed.profile.learnLang,
      createdAt: parsed.profile.createdAt || new Date().toISOString(),
      completedUnits: (parsed.progress && parsed.progress.completedUnits) || [],
      unitBest: (parsed.progress && parsed.progress.unitBest) || {},
    };
    parsed.courses = [course];
    parsed.activeCourseId = course.id;
    delete parsed.profile.nativeLang;
    delete parsed.profile.learnLang;
    if (parsed.progress) {
      delete parsed.progress.completedUnits;
      delete parsed.progress.unitBest;
    }
  }
  return parsed;
}

function serinoLoadState() {
  try {
    const raw = localStorage.getItem(SERINO_STORAGE_KEY);
    if (!raw) return serinoDefaultState();
    const parsed = serinoMigrateState(JSON.parse(raw));
    return Object.assign(serinoDefaultState(), parsed, {
      settings: Object.assign(serinoDefaultState().settings, parsed.settings || {}),
      progress: Object.assign(serinoDefaultState().progress, parsed.progress || {}),
    });
  } catch (e) {
    return serinoDefaultState();
  }
}

function serinoSaveState(state) {
  localStorage.setItem(SERINO_STORAGE_KEY, JSON.stringify(state));
}

function serinoTodayStr() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

/* Bir dersin tamamlanmasının ardından günlük seriyi (streak) günceller. */
function serinoBumpStreak(progress) {
  const today = serinoTodayStr();
  if (progress.lastActiveDate === today) {
    return; // bugün zaten sayıldı
  }
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().slice(0, 10);

  if (progress.lastActiveDate === yesterdayStr) {
    progress.streak += 1;
  } else {
    progress.streak = 1;
  }
  progress.lastActiveDate = today;
}

/* Bugünün XP kaydını artırır ve 14 günden eski kayıtları temizler. */
function serinoLogXp(progress, amount) {
  const today = serinoTodayStr();
  progress.xpByDate[today] = (progress.xpByDate[today] || 0) + amount;

  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 14);
  Object.keys(progress.xpByDate).forEach((date) => {
    if (new Date(date) < cutoff) delete progress.xpByDate[date];
  });
}

/* Son 7 gün (bugün dahil) içinde kazanılan toplam XP. */
function serinoWeeklyXp(progress) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 6);
  cutoff.setHours(0, 0, 0, 0);

  return Object.entries(progress.xpByDate).reduce((total, [date, xp]) => {
    return new Date(date) >= cutoff ? total + xp : total;
  }, 0);
}

function serinoResetCourseProgress(course) {
  course.completedUnits = [];
  course.unitBest = {};
}

function serinoResetAll() {
  localStorage.removeItem(SERINO_STORAGE_KEY);
}
