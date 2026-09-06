/* Serino - uygulama mantığı (ekran geçişleri, ders akışı, ilerleme). */

let serinoState = serinoLoadState();
let serinoOnboard = { nativeLang: null, learnLang: null };
let serinoOnboardMode = "new"; // "new" (yeni hesap) | "add" (mevcut hesaba yeni kurs)
let serinoSession = null; // aktif ders oturumu
let serinoAudioCtx = null;
let serinoPendingLessonUnitId = null; // bilgilendirme ekranında bekleyen ünite

/* ---------- Ekran geçişleri ---------- */

function serinoGoto(screenId) {
  document.querySelectorAll(".screen").forEach((el) => el.classList.remove("active", "screen-enter"));
  const target = document.getElementById(screenId);
  target.classList.add("active", "screen-enter");
  requestAnimationFrame(() => requestAnimationFrame(() => target.classList.remove("screen-enter")));
}

/* ---------- Başlangıç ---------- */

document.addEventListener("DOMContentLoaded", () => {
  document.body.dataset.daytime = serinoDaytimePeriod();
  serinoApplyTheme();
  serinoApplyUiLanguage();
  document.getElementById("mascot-welcome").innerHTML = serinoMascotSVG("happy");
  document.getElementById("mascot-name").innerHTML = serinoMascotSVG("normal");
  serinoRenderSoundToggle();

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (serinoState.settings.theme === "system") serinoApplyTheme();
  });

  if (serinoState.profile && serinoActiveCourse()) {
    serinoRenderHome();
    serinoGoto("screen-home");
  } else {
    serinoGoto("screen-welcome");
  }
});

/* ---------- Kurslar ---------- */

function serinoActiveCourse() {
  return serinoState.courses.find((c) => c.id === serinoState.activeCourseId);
}

function serinoAddOrSwitchCourse(nativeLang, learnLang) {
  const id = serinoMakeCourseId(nativeLang, learnLang);
  let course = serinoState.courses.find((c) => c.id === id);
  if (!course) {
    course = { id, nativeLang, learnLang, createdAt: new Date().toISOString(), completedUnits: [], unitBest: {} };
    serinoState.courses.push(course);
  }
  serinoState.activeCourseId = id;
  serinoSaveState(serinoState);
  return course;
}

function serinoOpenCourses() {
  serinoRenderCoursesList();
  document.getElementById("courses-overlay").classList.add("active");
}

function serinoCloseCourses() {
  document.getElementById("courses-overlay").classList.remove("active");
}

function serinoCloseCoursesIfBackdrop(evt) {
  if (evt.target.id === "courses-overlay") serinoCloseCourses();
}

function serinoRenderCoursesList() {
  const container = document.getElementById("courses-list");
  container.innerHTML = "";

  serinoState.courses.forEach((course) => {
    const from = SERINO_LANGUAGES[course.nativeLang];
    const to = SERINO_LANGUAGES[course.learnLang];
    const total = SERINO_UNITS.length;
    const done = course.completedUnits.length;
    const isActive = course.id === serinoState.activeCourseId;

    const row = document.createElement("button");
    row.className = "course-row" + (isActive ? " active" : "");
    row.innerHTML = `
      <span class="course-row-flag">${to.flag}</span>
      <span class="course-row-body">
        <strong>${to.name[serinoUiLang]}</strong>
        <small>${serinoT("course_from_template", { lang: from.name[serinoUiLang] })} &middot; ${serinoT("units_done_template", { done, total })}</small>
      </span>
      ${isActive ? `<span class="course-row-badge">${serinoT("badge_active")}</span>` : ""}
    `;
    row.onclick = () => {
      if (isActive) return;
      serinoState.activeCourseId = course.id;
      serinoSaveState(serinoState);
      serinoRenderHome();
      serinoCloseCourses();
    };
    container.appendChild(row);
  });
}

function serinoStartAddCourse() {
  serinoCloseCourses();
  serinoOnboardMode = "add";
  serinoOnboard = { nativeLang: null, learnLang: null };
  serinoShowNativeStep();
}

/* ---------- Onboarding ---------- */

function serinoRenderLangGrid(containerId, excludeLang, onPick) {
  const grid = document.getElementById(containerId);
  grid.innerHTML = "";
  Object.keys(SERINO_LANGUAGES).forEach((code) => {
    if (code === excludeLang) return;
    const lang = SERINO_LANGUAGES[code];
    const card = document.createElement("button");
    card.className = "lang-card";
    card.innerHTML = `<span class="lang-flag">${lang.flag}</span><span>${lang.name[serinoUiLang]}</span>`;
    card.onclick = () => onPick(code);
    grid.appendChild(card);
  });
}

function serinoOnboardBackFromNative() {
  if (serinoOnboardMode === "add") {
    serinoGoto("screen-home");
  } else {
    serinoGoto("screen-welcome");
  }
}

function serinoShowNativeStep() {
  serinoRenderLangGrid("native-lang-grid", null, (code) => {
    serinoOnboard.nativeLang = code;
    serinoSetUiLang(code);
    serinoShowLearnStep();
  });
  serinoGoto("screen-native");
}

function serinoShowLearnStep() {
  serinoRenderLangGrid("learn-lang-grid", serinoOnboard.nativeLang, (code) => {
    serinoOnboard.learnLang = code;

    if (serinoOnboardMode === "add") {
      serinoAddOrSwitchCourse(serinoOnboard.nativeLang, serinoOnboard.learnLang);
      serinoRenderHome();
      serinoGoto("screen-home");
      return;
    }

    const nameInput = document.getElementById("name-input");
    if (serinoState.profile) nameInput.value = serinoState.profile.name;
    serinoGoto("screen-name");
    nameInput.focus();
  });
  serinoGoto("screen-learn");
}

function serinoFinishOnboarding() {
  const nameInput = document.getElementById("name-input");
  const name = nameInput.value.trim() || serinoT("default_name");

  serinoState.profile = { name: name, createdAt: new Date().toISOString() };
  serinoAddOrSwitchCourse(serinoOnboard.nativeLang, serinoOnboard.learnLang);
  serinoRenderHome();
  serinoGoto("screen-home");
}

/* ---------- Ana ekran (ders yolu) ---------- */

function serinoCourseLabel() {
  const course = serinoActiveCourse();
  const from = SERINO_LANGUAGES[course.nativeLang];
  const to = SERINO_LANGUAGES[course.learnLang];
  return `${from.flag} ${from.name[serinoUiLang]} → ${to.flag} ${to.name[serinoUiLang]}`;
}

function serinoRenderHome() {
  const profile = serinoState.profile;
  const course = serinoActiveCourse();
  const progress = serinoState.progress;
  const period = serinoDaytimePeriod();
  document.body.dataset.daytime = period;

  serinoSetUiLang(course.nativeLang);
  document.getElementById("home-course-label").textContent = serinoCourseLabel();
  document.getElementById("weekly-label").textContent = serinoT("weekly_label");
  document.getElementById("stat-streak").textContent = progress.streak;
  document.getElementById("stat-xp").textContent = progress.xp;

  const flameScale = 1 + Math.min(progress.streak, 20) * 0.025;
  document.getElementById("stat-streak-wrap").style.setProperty("--flame-scale", flameScale);

  const g = SERINO_GREETINGS[serinoUiLang][period];
  document.getElementById("home-greeting-text").textContent = `${g.salutation}, ${profile.name}!`;
  document.getElementById("home-greeting-note").textContent = serinoRandomFrom(g.notes);
  document.getElementById("mascot-home").innerHTML = serinoMascotSVG("normal");

  const weeklyXp = serinoWeeklyXp(progress);
  document.getElementById("weekly-xp").textContent = weeklyXp;
  document.getElementById("weekly-message").textContent = serinoWeeklyMessage(weeklyXp);

  serinoRenderAlphabetCard(course);

  const path = document.getElementById("unit-path");
  path.innerHTML = "";
  let lastLevelId = null;

  SERINO_UNITS.forEach((unit, index) => {
    const category = serinoCategory(unit.categoryId);
    const level = serinoLevel(unit.levelId);

    if (unit.levelId !== lastLevelId) {
      const divider = document.createElement("div");
      divider.className = "level-divider";
      divider.textContent = `${level.code} · ${level.label[course.nativeLang]}`;
      path.appendChild(divider);
      lastLevelId = unit.levelId;
    }

    const isCompleted = course.completedUnits.includes(unit.id);
    const isUnlocked = index === 0 || course.completedUnits.includes(SERINO_UNITS[index - 1].id);

    const node = document.createElement("button");
    node.className = "unit-node" + (isCompleted ? " completed" : "") + (!isUnlocked ? " locked" : "");
    node.style.setProperty("--offset", index % 2 === 0 ? "-1" : "1");
    node.style.setProperty("--accent", category.accent);
    node.disabled = !isUnlocked;
    if (isCompleted) {
      node.innerHTML = `<span class="unit-node-icon">✓</span>`;
    } else if (isUnlocked) {
      node.innerHTML = `<span class="unit-node-icon">${category.icon}</span>`;
    } else {
      node.innerHTML = `<span class="unit-node-icon unit-node-sleepy">${serinoMascotSVG("sleepy")}</span>`;
    }
    node.title = category.label[course.nativeLang];
    node.onclick = () => {
      node.classList.add("bounce");
      setTimeout(() => serinoOpenLessonInfo(unit.id), 160);
    };

    const label = document.createElement("div");
    label.className = "unit-label";
    label.style.setProperty("--offset", index % 2 === 0 ? "-1" : "1");
    label.textContent = category.label[course.nativeLang];

    const wrap = document.createElement("div");
    wrap.className = "unit-wrap";
    wrap.appendChild(node);
    wrap.appendChild(label);
    path.appendChild(wrap);
  });
}

/* ---------- Sözlüğüm (ilerlemeye bağlı büyüyen kelime listesi) ----------
   Ayrı bir depoda tutulmaz: tamamlanan ünitelerin kelimelerinden anlık
   olarak türetilir, böylece yeni bir ünite bitirildiğinde sözlük otomatik
   büyür ve asla ilerlemeyle senkron dışı kalmaz. */

function serinoDictionaryEntries(course) {
  const entries = [];
  SERINO_UNITS.forEach((unit) => {
    if (!course.completedUnits.includes(unit.id)) return;
    const category = serinoCategory(unit.categoryId);
    unit.words.forEach((word) => {
      entries.push({
        learnWord: word[course.learnLang],
        nativeWord: word[course.nativeLang],
        categoryLabel: category.label[course.nativeLang],
        categoryIcon: category.icon,
      });
    });
  });
  return entries;
}

function serinoOpenDictionary() {
  document.getElementById("dictionary-search").value = "";
  serinoRenderDictionaryList();
  document.getElementById("dictionary-overlay").classList.add("active");
}

function serinoCloseDictionary() {
  document.getElementById("dictionary-overlay").classList.remove("active");
}

function serinoCloseDictionaryIfBackdrop(evt) {
  if (evt.target.id === "dictionary-overlay") serinoCloseDictionary();
}

function serinoRenderDictionaryList() {
  const course = serinoActiveCourse();
  const entries = serinoDictionaryEntries(course);
  const query = document.getElementById("dictionary-search").value.trim().toLowerCase();
  const filtered = query
    ? entries.filter(
        (e) => e.learnWord.toLowerCase().includes(query) || e.nativeWord.toLowerCase().includes(query)
      )
    : entries;

  document.getElementById("dictionary-sub").textContent = serinoT("dictionary_sub_template", { count: entries.length });

  const list = document.getElementById("dictionary-list");
  list.innerHTML = "";

  if (filtered.length === 0) {
    const empty = document.createElement("p");
    empty.className = "dictionary-empty";
    empty.textContent = serinoT("dictionary_empty");
    list.appendChild(empty);
    return;
  }

  let lastCategory = null;
  filtered.forEach((entry) => {
    if (entry.categoryLabel !== lastCategory) {
      const label = document.createElement("div");
      label.className = "dictionary-group-label";
      label.textContent = `${entry.categoryIcon} ${entry.categoryLabel}`;
      list.appendChild(label);
      lastCategory = entry.categoryLabel;
    }
    const row = document.createElement("div");
    row.className = "dictionary-row";
    row.innerHTML = `<span class="dictionary-word">${entry.learnWord}</span><span class="dictionary-translation">${entry.nativeWord}</span>`;
    list.appendChild(row);
  });
}

/* ---------- Alfabe eğitimi (Latin dışı alfabesi olan diller için) ----------
   SERINO_ALPHABETS içinde girişi olmayan diller (örn. İngilizce, Fransızca)
   için ana ekrandaki alfabe kartı hiç gösterilmez. Öğrenilen harfler
   course.alphabetLearned dizisinde tutulur, böylece bu da ilerlemeyle
   birlikte büyür. */

let serinoAlphabetSession = null;

function serinoRenderAlphabetCard(course) {
  const card = document.getElementById("alphabet-card");
  const letters = SERINO_ALPHABETS[course.learnLang];
  if (!letters) {
    card.style.display = "none";
    return;
  }
  card.style.display = "";
  const learned = (course.alphabetLearned || []).length;
  const total = letters.length;
  document.getElementById("alphabet-card-progress").textContent =
    learned >= total ? serinoT("alphabet_done_badge") : serinoT("alphabet_progress_template", { done: learned, total });
}

function serinoOpenAlphabet() {
  const course = serinoActiveCourse();
  if (!SERINO_ALPHABETS[course.learnLang]) return;
  serinoAlphabetShowTab("learn");
  serinoRenderAlphabetGrid();
  serinoGoto("screen-alphabet");
}

function serinoCloseAlphabet() {
  serinoAlphabetSession = null;
  serinoRenderHome();
  serinoGoto("screen-home");
}

function serinoAlphabetShowTab(tab) {
  document.getElementById("alphabet-tab-learn").classList.toggle("active", tab === "learn");
  document.getElementById("alphabet-tab-practice").classList.toggle("active", tab === "practice");
  document.getElementById("alphabet-learn-panel").style.display = tab === "learn" ? "flex" : "none";
  document.getElementById("alphabet-practice-panel").style.display = tab === "practice" ? "flex" : "none";
  document.getElementById("alphabet-practice-footer").style.display = tab === "practice" ? "flex" : "none";
  if (tab === "practice") serinoStartAlphabetPractice();
}

function serinoRenderAlphabetGrid() {
  const course = serinoActiveCourse();
  const letters = SERINO_ALPHABETS[course.learnLang];
  const learned = course.alphabetLearned || [];
  const grid = document.getElementById("alphabet-grid");
  grid.innerHTML = "";
  letters.forEach((letter) => {
    const card = document.createElement("button");
    card.className = "alphabet-letter-card" + (learned.includes(letter.upper) ? " letter-learned" : "");
    card.innerHTML = `<span class="alphabet-letter-glyph">${letter.upper}${letter.lower}</span><span class="alphabet-letter-translit">${letter.translit}</span>`;
    card.onclick = () => serinoSpeakLetter(letter, course);
    grid.appendChild(card);
  });
}

function serinoMarkLetterLearned(course, letter) {
  if (!course.alphabetLearned) course.alphabetLearned = [];
  if (!course.alphabetLearned.includes(letter.upper)) {
    course.alphabetLearned.push(letter.upper);
    serinoSaveState(serinoState);
  }
}

function serinoSpeakLetter(letter, course) {
  serinoMarkLetterLearned(course, letter);
  serinoRenderAlphabetGrid();
  serinoSpeakText(letter.lower, course.learnLang);
}

function serinoStartAlphabetPractice() {
  const course = serinoActiveCourse();
  const letters = SERINO_ALPHABETS[course.learnLang];
  serinoAlphabetSession = {
    letters: serinoShuffle(letters),
    index: 0,
    correct: 0,
    xpGain: 0,
    answered: false,
  };
  serinoRenderAlphabetQuestion();
}

/* Her soru rastgele iki yönden birinde sorulur:
   - ileri: Kiril harfi gösterilir, doğru okunuşu (name) seçilir.
   - ters: harfin Latin karşılığı (translit) gösterilir, doğru Kiril harfi
     seçilir - bunun için her harfin translit değeri tek/benzersiz olmalı
     (bkz. data.js - sert/yumuşak işaret gibi "özel karakterler" ʺ/ʹ). */
function serinoRenderAlphabetQuestion() {
  const s = serinoAlphabetSession;
  const course = serinoActiveCourse();
  const letters = SERINO_ALPHABETS[course.learnLang];
  const letter = s.letters[s.index];
  s.answered = false;
  const reverse = Math.random() < 0.5;
  s.reverse = reverse;

  document.getElementById("alphabet-practice-progress").textContent = serinoT("alphabet_progress_template", {
    done: s.index,
    total: s.letters.length,
  });
  document.getElementById("alphabet-practice-instruction").textContent = serinoT(
    reverse ? "alphabet_instruction_reverse" : "alphabet_instruction_forward"
  );

  const correct = reverse ? letter.upper + letter.lower : letter.name;
  document.getElementById("alphabet-prompt-letter").textContent = reverse
    ? letter.translit
    : letter.upper + letter.lower;

  const pool = letters.filter((l) => l !== letter).map((l) => (reverse ? l.upper + l.lower : l.name));
  const distractors = serinoShuffle(pool).slice(0, 3);
  const options = serinoShuffle([correct, ...distractors]);

  const grid = document.getElementById("alphabet-options-grid");
  grid.innerHTML = "";
  options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = opt;
    btn.onclick = () => serinoSelectAlphabetOption(btn, opt, letter, correct);
    grid.appendChild(btn);
  });

  const feedback = document.getElementById("alphabet-feedback-text");
  feedback.textContent = "";
  feedback.className = "feedback-text";
  const continueBtn = document.getElementById("alphabet-continue-btn");
  continueBtn.disabled = true;
  continueBtn.textContent = serinoT("btn_continue");
}

function serinoSelectAlphabetOption(btnEl, chosen, letter, correct) {
  const s = serinoAlphabetSession;
  if (s.answered) return;
  s.answered = true;
  const isCorrect = chosen === correct;

  document.querySelectorAll("#alphabet-options-grid .option-btn").forEach((b) => {
    b.disabled = true;
    if (b.textContent === correct) b.classList.add("correct");
  });
  if (!isCorrect) btnEl.classList.add("wrong");

  const feedback = document.getElementById("alphabet-feedback-text");
  if (isCorrect) {
    s.correct += 1;
    s.xpGain += 5;
    feedback.textContent = serinoT("feedback_correct");
    feedback.className = "feedback-text feedback-correct";
    serinoSoundCorrect();
  } else {
    feedback.textContent = serinoT("feedback_wrong_template", { text: correct });
    feedback.className = "feedback-text feedback-wrong";
    serinoSoundWrong();
  }

  serinoMarkLetterLearned(serinoActiveCourse(), letter);
  document.getElementById("alphabet-continue-btn").disabled = false;
}

function serinoAlphabetNext() {
  const s = serinoAlphabetSession;
  if (!s.answered) return;
  s.index += 1;
  if (s.index >= s.letters.length) {
    serinoFinishAlphabetPractice();
  } else {
    serinoRenderAlphabetQuestion();
  }
}

function serinoFinishAlphabetPractice() {
  const s = serinoAlphabetSession;
  const course = serinoActiveCourse();
  const progress = serinoState.progress;
  progress.xp += s.xpGain;
  serinoLogXp(progress, s.xpGain);
  course.alphabetDone = true;
  serinoSaveState(serinoState);
  if (s.correct === s.letters.length) serinoSoundComplete();
  serinoAlphabetSession = null;
  serinoRenderAlphabetGrid();
  serinoAlphabetShowTab("learn");
}

/* ---------- Ayarlar ---------- */

function serinoOpenSettings() {
  document.getElementById("settings-course-label").textContent = serinoCourseLabel();
  serinoRenderSoundToggle();
  document.getElementById("settings-overlay").classList.add("active");
}

function serinoCloseSettings() {
  document.getElementById("settings-overlay").classList.remove("active");
}

function serinoCloseSettingsIfBackdrop(evt) {
  if (evt.target.id === "settings-overlay") serinoCloseSettings();
}

function serinoResetProgressClick() {
  if (confirm(serinoT("confirm_reset_course"))) {
    serinoResetCourseProgress(serinoActiveCourse());
    serinoSaveState(serinoState);
    serinoRenderHome();
    serinoCloseSettings();
  }
}

function serinoResetAllClick() {
  if (confirm(serinoT("confirm_reset_all"))) {
    serinoResetAll();
    location.reload();
  }
}

/* ---------- İlerlemeyi dışa/içe aktarma (yedekleme, cihazlar arası taşıma) ----------
   localStorage tek bir tarayıcıya bağlı olduğundan, ilerlemeyi bir .json
   dosyasına indirip başka bir tarayıcı/cihazda geri yükleyebilmek için. */

function serinoExportProgress() {
  const dataStr = JSON.stringify(serinoState, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `serino-ilerleme-${serinoTodayStr()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function serinoTriggerImportProgress() {
  document.getElementById("import-progress-input").click();
}

function serinoImportProgressFile(event) {
  const file = event.target.files[0];
  event.target.value = ""; // aynı dosyayı tekrar seçebilmek için sıfırla
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    let parsed;
    try {
      parsed = JSON.parse(reader.result);
    } catch (e) {
      alert(serinoT("import_error_invalid"));
      return;
    }
    if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.courses) || !parsed.profile) {
      alert(serinoT("import_error_invalid"));
      return;
    }
    if (!confirm(serinoT("confirm_import_progress"))) return;
    localStorage.setItem(SERINO_STORAGE_KEY, JSON.stringify(parsed));
    location.reload();
  };
  reader.readAsText(file);
}

function serinoToggleSound() {
  serinoState.settings.sound = !serinoState.settings.sound;
  serinoSaveState(serinoState);
  serinoRenderSoundToggle();
  if (serinoState.settings.sound) serinoSoundCorrect();
}

function serinoRenderSoundToggle() {
  const btn = document.getElementById("sound-toggle-btn");
  btn.textContent = serinoT(serinoState.settings.sound ? "sound_on" : "sound_off");
}

/* ---------- Görünüm (açık/koyu mod) ---------- */

function serinoResolvedTheme() {
  const theme = serinoState.settings.theme;
  if (theme === "light" || theme === "dark") return theme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function serinoApplyTheme() {
  document.body.dataset.theme = serinoResolvedTheme();
  serinoUpdateThemeColorMeta();
  serinoRenderThemeToggle();
}

function serinoToggleTheme() {
  serinoState.settings.theme = serinoResolvedTheme() === "dark" ? "light" : "dark";
  serinoSaveState(serinoState);
  serinoApplyTheme();
}

function serinoRenderThemeToggle() {
  const resolved = serinoResolvedTheme();
  const icon = resolved === "dark" ? "🌙" : "☀️";
  document.querySelectorAll(".theme-toggle-icon").forEach((btn) => (btn.textContent = icon));
  document.querySelectorAll(".theme-toggle-label").forEach(
    (btn) => (btn.textContent = serinoT(resolved === "dark" ? "theme_dark" : "theme_light"))
  );
}

function serinoUpdateThemeColorMeta() {
  const meta = document.getElementById("theme-color-meta");
  if (meta) meta.setAttribute("content", serinoResolvedTheme() === "dark" ? "#201a26" : "#fff2f6");
}

/* ---------- Ses efektleri (Web Audio, dosya gerekmez) ---------- */

function serinoGetAudioCtx() {
  if (!serinoAudioCtx) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    serinoAudioCtx = new Ctx();
  }
  if (serinoAudioCtx.state === "suspended") serinoAudioCtx.resume();
  return serinoAudioCtx;
}

function serinoPlayTone(freq, startDelay, duration, type, peak) {
  const ctx = serinoGetAudioCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  const t0 = ctx.currentTime + startDelay;
  gain.gain.setValueAtTime(0, t0);
  gain.gain.linearRampToValueAtTime(peak, t0 + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, t0 + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.05);
}

function serinoSoundCorrect() {
  if (!serinoState.settings.sound) return;
  serinoPlayTone(880, 0, 0.14, "sine", 0.15);
  serinoPlayTone(1318.5, 0.08, 0.18, "sine", 0.13);
}

function serinoSoundWrong() {
  if (!serinoState.settings.sound) return;
  serinoPlayTone(220, 0, 0.22, "triangle", 0.12);
}

function serinoSoundComplete() {
  if (!serinoState.settings.sound) return;
  [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => serinoPlayTone(f, i * 0.09, 0.22, "sine", 0.12));
}

/* Metni sesli okur (tarayıcının yerleşik speechSynthesis API'si - dosya
   gerekmez). Desteklenmiyorsa veya izin yoksa sessizce hiçbir şey yapmaz. */
function serinoSpeakText(text, langCode) {
  try {
    if (!window.speechSynthesis || !text) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = SERINO_TTS_LOCALE[langCode] || "";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  } catch (e) {}
}

/* ---------- Küçük görsel efektler ---------- */

function serinoShakeElement(el) {
  el.classList.remove("shake");
  void el.offsetWidth;
  el.classList.add("shake");
}

function serinoSpawnConfetti(anchorEl) {
  const colors = ["#f5a8c7", "#a8dcc0", "#f7c15c", "#eae2f7", "#ffffff"];
  const rect = anchorEl.getBoundingClientRect();
  for (let i = 0; i < 14; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = rect.left + rect.width / 2 + "px";
    piece.style.top = rect.top + rect.height / 2 + "px";
    piece.style.setProperty("--dx", Math.random() * 160 - 80 + "px");
    piece.style.setProperty("--dy", Math.random() * -130 - 40 + "px");
    piece.style.setProperty("--rot", Math.random() * 360 + "deg");
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 900);
  }
}

function serinoAnimateNumber(el, from, to, duration) {
  if (from === to) {
    el.textContent = to;
    return;
  }
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(from + (to - from) * eased);
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ---------- Ders oturumu ---------- */

function serinoShuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function serinoBuildQuestions(unit) {
  const course = serinoActiveCourse();
  const { nativeLang, learnLang } = course;

  const choiceQuestions = serinoShuffle(unit.words).map((word) => {
    const correct = word[nativeLang];
    const otherAnswers = unit.words.filter((w) => w !== word).map((w) => w[nativeLang]);
    const distractors = serinoShuffle(otherAnswers).slice(0, 3);
    return {
      type: "choice",
      prompt: word[learnLang],
      correct: correct,
      options: serinoShuffle([correct, ...distractors]),
    };
  });

  const buildQuestions = (unit.sentences || []).map((sentence) => ({
    type: "build",
    prompt: sentence[nativeLang],
    correctText: sentence[learnLang],
    tokens: sentence[learnLang].split(" "),
  }));

  return serinoShuffle([...choiceQuestions, ...buildQuestions]);
}

function serinoRenderHearts(hearts) {
  const container = document.getElementById("lesson-hearts");
  container.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    container.innerHTML += serinoMugIcon(i < hearts);
  }
}

/* ---------- Ders bilgilendirme kartı (Duolingo tarzı "Tips") ---------- */
/* Derse başlamadan önce gramer, kelime ve telaffuz hakkında kısa bilgi
   verir. SERINO_LESSON_TIPS içinde ilgili (learnLang, levelId) girişi
   yoksa o bölüm boş bırakılır, ekran yine de çalışır. */

function serinoOpenLessonInfo(unitId) {
  const unit = SERINO_UNITS.find((u) => u.id === unitId);
  const course = serinoActiveCourse();
  const category = serinoCategory(unit.categoryId);
  const tips = (SERINO_LESSON_TIPS[course.learnLang] || {})[unit.levelId];

  serinoPendingLessonUnitId = unitId;

  document.getElementById("lesson-info-icon").textContent = category.icon;
  document.getElementById("lesson-info-title").textContent = category.label[course.nativeLang];
  document.getElementById("lesson-info-grammar").textContent = tips ? tips.grammar[course.nativeLang] : "";
  document.getElementById("lesson-info-vocab").textContent = serinoT("lesson_info_vocab_template", {
    category: category.label[course.nativeLang],
  });
  document.getElementById("lesson-info-pronunciation").textContent = tips ? tips.pronunciation[course.nativeLang] : "";

  serinoGoto("screen-lesson-info");
}

function serinoCloseLessonInfo() {
  serinoPendingLessonUnitId = null;
  serinoGoto("screen-home");
}

function serinoBeginLessonFromInfo() {
  const unitId = serinoPendingLessonUnitId;
  serinoPendingLessonUnitId = null;
  serinoStartLesson(unitId);
}

function serinoStartLesson(unitId) {
  const unit = SERINO_UNITS.find((u) => u.id === unitId);
  serinoSession = {
    unit: unit,
    phase: "teach", // "teach" (yeni kelimeleri tanıt) -> "quiz" (sor)
    teachWords: unit.words.slice(),
    teachIndex: 0,
    questions: serinoBuildQuestions(unit),
    index: 0,
    correct: 0,
    hearts: 5,
    xpGain: 0,
    answered: false,
  };
  serinoGoto("screen-lesson");
  serinoRenderTeachCard();
}

function serinoQuitLesson() {
  if (confirm(serinoT("confirm_quit_lesson"))) {
    serinoSession = null;
    serinoGoto("screen-home");
  }
}

/* Toplam ilerleme: "kelimeyi öğren" adımları + quiz soruları birlikte. */
function serinoLessonProgressPercent() {
  const s = serinoSession;
  const total = s.teachWords.length + s.questions.length;
  const done = s.phase === "teach" ? s.teachIndex : s.teachWords.length + s.index;
  return Math.round((done / total) * 100);
}

/* Quiz sormadan önce her yeni kelimeyi tek tek tanıtan kart - kelime +
   ana dildeki karşılığı + telaffuz için hoparlör butonu. */
function serinoRenderTeachCard() {
  const s = serinoSession;
  const course = serinoActiveCourse();
  const word = s.teachWords[s.teachIndex];

  document.getElementById("lesson-progress").style.width = serinoLessonProgressPercent() + "%";
  serinoRenderHearts(s.hearts);

  document.getElementById("lesson-instruction").textContent = serinoT("instruction_learn");

  const promptEl = document.getElementById("prompt-word");
  promptEl.textContent = word[course.learnLang];
  promptEl.classList.remove("prompt-sentence");

  const translationEl = document.getElementById("prompt-translation");
  translationEl.textContent = word[course.nativeLang];
  translationEl.style.display = "block";

  document.getElementById("options-grid").style.display = "none";
  document.getElementById("build-area").style.display = "none";

  document.getElementById("feedback-text").textContent = "";
  document.getElementById("feedback-text").className = "feedback-text";

  const continueBtn = document.getElementById("lesson-continue-btn");
  continueBtn.disabled = false;
  continueBtn.textContent = serinoT("btn_continue");
}

function serinoRenderQuestion() {
  const s = serinoSession;
  const q = s.questions[s.index];
  s.answered = false;

  document.getElementById("lesson-progress").style.width = serinoLessonProgressPercent() + "%";

  serinoRenderHearts(s.hearts);

  document.getElementById("prompt-translation").style.display = "none";

  const promptEl = document.getElementById("prompt-word");
  promptEl.textContent = q.prompt;
  promptEl.classList.toggle("prompt-sentence", q.type === "build");

  document.getElementById("lesson-instruction").textContent =
    serinoT(q.type === "build" ? "instruction_build" : "instruction_choice");

  document.getElementById("feedback-text").textContent = "";
  document.getElementById("feedback-text").className = "feedback-text";

  const continueBtn = document.getElementById("lesson-continue-btn");
  continueBtn.disabled = true;
  continueBtn.textContent = serinoT("btn_continue");

  if (q.type === "build") {
    document.getElementById("options-grid").style.display = "none";
    document.getElementById("build-area").style.display = "flex";
    serinoRenderBuildQuestion(q);
  } else {
    document.getElementById("build-area").style.display = "none";
    document.getElementById("options-grid").style.display = "grid";
    serinoRenderChoiceQuestion(q);
  }
}

/* Hoparlör butonu: öğretim kartındaki kelimeyi ya da quiz'deki hedef dil
   metnini (cümle kurma sorularında doğru cümleyi) seslendirir. */
function serinoSpeakPrompt() {
  const s = serinoSession;
  if (!s) return;
  const course = serinoActiveCourse();
  if (s.phase === "teach") {
    serinoSpeakText(s.teachWords[s.teachIndex][course.learnLang], course.learnLang);
    return;
  }
  const q = s.questions[s.index];
  const text = q.type === "build" ? q.correctText : q.prompt;
  serinoSpeakText(text, course.learnLang);
}

function serinoRenderChoiceQuestion(q) {
  const grid = document.getElementById("options-grid");
  grid.innerHTML = "";
  q.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = opt;
    btn.onclick = () => serinoSelectOption(btn, opt);
    grid.appendChild(btn);
  });
}

function serinoSelectOption(btnEl, chosen) {
  const s = serinoSession;
  if (s.answered) return;

  const q = s.questions[s.index];
  const isCorrect = chosen === q.correct;

  document.querySelectorAll(".option-btn").forEach((b) => {
    b.disabled = true;
    if (b.textContent === q.correct) b.classList.add("correct");
  });
  if (!isCorrect) btnEl.classList.add("wrong");

  serinoApplyAnswerResult(isCorrect, q.correct);
}

/* ---------- Cümle kurma soruları ---------- */

function serinoRenderBuildQuestion(q) {
  const s = serinoSession;
  s.buildTiles = serinoShuffle(q.tokens.map((token, i) => ({ token, key: i, used: false })));
  s.buildAnswer = [];
  serinoRenderBuildTiles();
}

function serinoRenderBuildTiles() {
  const s = serinoSession;
  const bank = document.getElementById("tile-bank");
  const answerRow = document.getElementById("answer-row");
  bank.innerHTML = "";
  answerRow.innerHTML = "";

  s.buildTiles.forEach((tile) => {
    if (tile.used) return;
    const btn = document.createElement("button");
    btn.className = "tile";
    btn.textContent = tile.token;
    btn.disabled = s.answered;
    btn.onclick = () => serinoTapBankTile(tile.key);
    bank.appendChild(btn);
  });

  s.buildAnswer.forEach((key) => {
    const tile = s.buildTiles.find((t) => t.key === key);
    const btn = document.createElement("button");
    btn.className = "tile tile-placed";
    btn.textContent = tile.token;
    btn.disabled = s.answered;
    btn.onclick = () => serinoTapAnswerTile(key);
    answerRow.appendChild(btn);
  });

  const allPlaced = s.buildAnswer.length === s.buildTiles.length;
  const continueBtn = document.getElementById("lesson-continue-btn");
  if (!s.answered) continueBtn.disabled = !allPlaced;
}

function serinoTapBankTile(key) {
  const s = serinoSession;
  if (s.answered) return;
  const tile = s.buildTiles.find((t) => t.key === key);
  tile.used = true;
  s.buildAnswer.push(key);
  serinoRenderBuildTiles();
}

function serinoTapAnswerTile(key) {
  const s = serinoSession;
  if (s.answered) return;
  const tile = s.buildTiles.find((t) => t.key === key);
  tile.used = false;
  s.buildAnswer = s.buildAnswer.filter((k) => k !== key);
  serinoRenderBuildTiles();
}

function serinoGradeSentence() {
  const s = serinoSession;
  const q = s.questions[s.index];
  const answerText = s.buildAnswer.map((key) => s.buildTiles.find((t) => t.key === key).token).join(" ");
  const isCorrect = answerText === q.correctText;

  serinoApplyAnswerResult(isCorrect, q.correctText);
  serinoRenderBuildTiles();
}

/* ---------- Ortak cevap sonucu (her iki soru tipi için) ---------- */

function serinoApplyAnswerResult(isCorrect, correctText) {
  const s = serinoSession;
  s.answered = true;

  const feedback = document.getElementById("feedback-text");
  if (isCorrect) {
    s.correct += 1;
    s.xpGain += 10;
    feedback.textContent = serinoT("feedback_correct");
    feedback.className = "feedback-text feedback-correct";
    serinoSpawnConfetti(document.querySelector(".prompt-card"));
    serinoSoundCorrect();
  } else {
    s.hearts -= 1;
    feedback.textContent = serinoT("feedback_wrong_template", { text: correctText });
    feedback.className = "feedback-text feedback-wrong";
    serinoShakeElement(document.querySelector(".prompt-card"));
    serinoSoundWrong();
  }

  serinoRenderHearts(Math.max(s.hearts, 0));

  const continueBtn = document.getElementById("lesson-continue-btn");
  continueBtn.disabled = false;
  continueBtn.textContent = serinoT(s.hearts <= 0 ? "btn_finish" : "btn_continue");
}

function serinoNextStep() {
  const s = serinoSession;

  if (s.phase === "teach") {
    s.teachIndex += 1;
    if (s.teachIndex >= s.teachWords.length) {
      s.phase = "quiz";
      serinoRenderQuestion();
    } else {
      serinoRenderTeachCard();
    }
    return;
  }

  const q = s.questions[s.index];

  if (!s.answered) {
    if (q.type === "build") serinoGradeSentence();
    return;
  }

  if (s.hearts <= 0) {
    serinoFinishLesson(false);
    return;
  }

  s.index += 1;
  if (s.index >= s.questions.length) {
    serinoFinishLesson(true);
  } else {
    serinoRenderQuestion();
  }
}

function serinoFinishLesson(success) {
  const s = serinoSession;
  const progress = serinoState.progress;
  const course = serinoActiveCourse();

  progress.xp += s.xpGain;
  serinoLogXp(progress, s.xpGain);
  course.unitBest[s.unit.id] = Math.max(course.unitBest[s.unit.id] || 0, s.correct);

  if (success) {
    serinoBumpStreak(progress);
    if (!course.completedUnits.includes(s.unit.id)) {
      course.completedUnits.push(s.unit.id);
    }
  }

  serinoSaveState(serinoState);
  if (success) serinoSoundComplete();

  document.getElementById("result-mascot").innerHTML = serinoMascotSVG(success ? "happy" : "sad");
  document.getElementById("result-title").textContent = serinoT(
    success ? "result_success_title" : "result_fail_title"
  );
  const resultPool = SERINO_RESULT_MESSAGES[serinoUiLang] || SERINO_RESULT_MESSAGES.tr;
  document.getElementById("result-note").textContent = serinoRandomFrom(
    success ? resultPool.success : resultPool.fail
  );
  document.getElementById("result-correct").textContent = `${s.correct}/${s.questions.length}`;
  document.getElementById("result-streak").textContent = progress.streak;

  const xpEl = document.getElementById("result-xp");
  serinoAnimateNumber(xpEl, 0, s.xpGain, 700);

  serinoGoto("screen-result");
}

function serinoBackHomeFromResult() {
  serinoSession = null;
  serinoRenderHome();
  serinoGoto("screen-home");
}
