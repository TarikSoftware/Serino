/* Serino - uygulama mantığı (ekran geçişleri, ders akışı, ilerleme). */

let serinoState = serinoLoadState();
let serinoOnboard = { nativeLang: null, learnLang: null };
let serinoOnboardMode = "new"; // "new" (yeni hesap) | "add" (mevcut hesaba yeni kurs)
let serinoSession = null; // aktif ders oturumu
let serinoAudioCtx = null;

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
        <strong>${to.name}</strong>
        <small>${from.name}'den &middot; ${done}/${total} ünite</small>
      </span>
      ${isActive ? '<span class="course-row-badge">Aktif</span>' : ""}
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
    card.innerHTML = `<span class="lang-flag">${lang.flag}</span><span>${lang.name}</span>`;
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
  const name = nameInput.value.trim() || "Öğrenci";

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
  return `${from.flag} ${from.name} → ${to.flag} ${to.name}`;
}

function serinoRenderHome() {
  const profile = serinoState.profile;
  const course = serinoActiveCourse();
  const progress = serinoState.progress;
  const period = serinoDaytimePeriod();
  document.body.dataset.daytime = period;

  document.getElementById("home-course-label").textContent = serinoCourseLabel();
  document.getElementById("stat-streak").textContent = progress.streak;
  document.getElementById("stat-xp").textContent = progress.xp;

  const flameScale = 1 + Math.min(progress.streak, 20) * 0.025;
  document.getElementById("stat-streak-wrap").style.setProperty("--flame-scale", flameScale);

  const g = SERINO_GREETINGS[period];
  document.getElementById("home-greeting-text").textContent = `${g.salutation}, ${profile.name}!`;
  document.getElementById("home-greeting-note").textContent = serinoRandomFrom(g.notes);
  document.getElementById("mascot-home").innerHTML = serinoMascotSVG("normal");

  const weeklyXp = serinoWeeklyXp(progress);
  document.getElementById("weekly-xp").textContent = weeklyXp;
  document.getElementById("weekly-message").textContent = serinoWeeklyMessage(weeklyXp);

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
      setTimeout(() => serinoStartLesson(unit.id), 160);
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
  if (confirm("Bu kursun ilerlemesi (tamamlanan üniteler) sıfırlansın mı?")) {
    serinoResetCourseProgress(serinoActiveCourse());
    serinoSaveState(serinoState);
    serinoRenderHome();
    serinoCloseSettings();
  }
}

function serinoResetAllClick() {
  if (confirm("Tüm veriler silinsin mi? Bu işlem geri alınamaz.")) {
    serinoResetAll();
    location.reload();
  }
}

function serinoToggleSound() {
  serinoState.settings.sound = !serinoState.settings.sound;
  serinoSaveState(serinoState);
  serinoRenderSoundToggle();
  if (serinoState.settings.sound) serinoSoundCorrect();
}

function serinoRenderSoundToggle() {
  const btn = document.getElementById("sound-toggle-btn");
  btn.textContent = serinoState.settings.sound ? "🔊 Ses Açık" : "🔇 Ses Kapalı";
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
  const label = resolved === "dark" ? "Koyu Mod" : "Açık Mod";
  document.querySelectorAll(".theme-toggle-icon").forEach((btn) => (btn.textContent = icon));
  document.querySelectorAll(".theme-toggle-label").forEach((btn) => (btn.textContent = `${icon} ${label}`));
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

function serinoStartLesson(unitId) {
  const unit = SERINO_UNITS.find((u) => u.id === unitId);
  serinoSession = {
    unit: unit,
    questions: serinoBuildQuestions(unit),
    index: 0,
    correct: 0,
    hearts: 5,
    xpGain: 0,
    answered: false,
  };
  serinoGoto("screen-lesson");
  serinoRenderQuestion();
}

function serinoQuitLesson() {
  if (confirm("Dersten çıkmak istediğine emin misin? İlerlemen kaydedilmeyecek.")) {
    serinoSession = null;
    serinoGoto("screen-home");
  }
}

function serinoRenderQuestion() {
  const s = serinoSession;
  const q = s.questions[s.index];
  s.answered = false;

  document.getElementById("lesson-progress").style.width =
    Math.round((s.index / s.questions.length) * 100) + "%";

  serinoRenderHearts(s.hearts);

  const promptEl = document.getElementById("prompt-word");
  promptEl.textContent = q.prompt;
  promptEl.classList.toggle("prompt-sentence", q.type === "build");

  document.getElementById("lesson-instruction").textContent =
    q.type === "build" ? "Kelimeleri doğru sırada diz" : "Doğru çeviriyi seç";

  document.getElementById("feedback-text").textContent = "";
  document.getElementById("feedback-text").className = "feedback-text";

  const continueBtn = document.getElementById("lesson-continue-btn");
  continueBtn.disabled = true;
  continueBtn.textContent = "Devam Et";

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
    feedback.textContent = "Harika! 🎉";
    feedback.className = "feedback-text feedback-correct";
    serinoSpawnConfetti(document.querySelector(".prompt-card"));
    serinoSoundCorrect();
  } else {
    s.hearts -= 1;
    feedback.textContent = `Doğrusu: ${correctText}`;
    feedback.className = "feedback-text feedback-wrong";
    serinoShakeElement(document.querySelector(".prompt-card"));
    serinoSoundWrong();
  }

  serinoRenderHearts(Math.max(s.hearts, 0));

  const continueBtn = document.getElementById("lesson-continue-btn");
  continueBtn.disabled = false;
  continueBtn.textContent = s.hearts <= 0 ? "Bitir" : "Devam Et";
}

function serinoNextStep() {
  const s = serinoSession;
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
  document.getElementById("result-title").textContent = success
    ? "Ders tamamlandı!"
    : "Canların bitti, tekrar dene!";
  document.getElementById("result-note").textContent = serinoRandomFrom(
    success ? SERINO_RESULT_MESSAGES.success : SERINO_RESULT_MESSAGES.fail
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
