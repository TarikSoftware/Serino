/* Serino - arayüz dili (i18n).
   serinoUiLang, aktif kursun "konuştuğun dil"ine göre ayarlanır ve tüm
   sabit arayüz metinlerini (buton, başlık, mesaj) belirler - ders
   içeriğinden (kelime/cümle) bağımsızdır. */

let serinoUiLang = "tr";

const SERINO_UI = {
  tr: {
    page_title: "Serino - Dil Öğren",
    brand_tagline: "Kelimeler ve cümlelerle, günde birkaç dakikada yeni bir dil öğren.",
    btn_start: "Başla",
    back_title: "Geri",
    native_title: "Hangi dili konuşuyorsun?",
    native_sub: "Sana bu dilde rehberlik edeceğiz.",
    learn_title: "Hangi dili öğrenmek istiyorsun?",
    learn_sub: "İstediğin zaman ayarlardan değiştirebilirsin.",
    name_title: "Sana nasıl seslenelim?",
    name_placeholder: "Adın",
    btn_start_serino: "Serino'ya Başla",
    default_name: "Öğrenci",
    settings_title: "Ayarlar",
    theme_title: "Görünüm",
    courses_title: "Kurslarım",
    weekly_label: "XP · bu hafta",
    settings_h3: "Ayarlar",
    sound_on: "🔊 Ses Açık",
    sound_off: "🔇 Ses Kapalı",
    theme_dark: "🌙 Koyu Mod",
    theme_light: "☀️ Açık Mod",
    btn_my_courses: "Kurslarım",
    btn_reset_course: "Bu Kursu Sıfırla",
    btn_reset_all: "Tüm Verileri Sil",
    btn_close: "Kapat",
    confirm_reset_course: "Bu kursun ilerlemesi (tamamlanan üniteler) sıfırlansın mı?",
    confirm_reset_all: "Tüm veriler silinsin mi? Bu işlem geri alınamaz.",
    confirm_quit_lesson: "Dersten çıkmak istediğine emin misin? İlerlemen kaydedilmeyecek.",
    courses_h3: "Kurslarım",
    btn_add_course: "+ Yeni Kurs Ekle",
    course_from_template: "{lang}'den",
    units_done_template: "{done}/{total} ünite",
    badge_active: "Aktif",
    instruction_choice: "Doğru çeviriyi seç",
    instruction_build: "Kelimeleri doğru sırada diz",
    btn_continue: "Devam Et",
    btn_finish: "Bitir",
    feedback_correct: "Harika! 🎉",
    feedback_wrong_template: "Doğrusu: {text}",
    tile_placeholder: "Kelimeleri buraya diz",
    result_success_title: "Ders tamamlandı!",
    result_fail_title: "Canların bitti, tekrar dene!",
    result_correct_label: "Doğru",
    result_streak_label: "Seri",
  },
  en: {
    page_title: "Serino - Learn a Language",
    brand_tagline: "Learn a new language a few minutes a day, through words and sentences.",
    btn_start: "Start",
    back_title: "Back",
    native_title: "What language do you speak?",
    native_sub: "We'll guide you in this language.",
    learn_title: "What language do you want to learn?",
    learn_sub: "You can change this anytime in settings.",
    name_title: "What should we call you?",
    name_placeholder: "Your name",
    btn_start_serino: "Start with Serino",
    default_name: "Learner",
    settings_title: "Settings",
    theme_title: "Appearance",
    courses_title: "My Courses",
    weekly_label: "XP this week",
    settings_h3: "Settings",
    sound_on: "🔊 Sound On",
    sound_off: "🔇 Sound Off",
    theme_dark: "🌙 Dark Mode",
    theme_light: "☀️ Light Mode",
    btn_my_courses: "My Courses",
    btn_reset_course: "Reset This Course",
    btn_reset_all: "Delete All Data",
    btn_close: "Close",
    confirm_reset_course: "Reset this course's progress (completed units)?",
    confirm_reset_all: "Delete all data? This cannot be undone.",
    confirm_quit_lesson: "Are you sure you want to leave the lesson? Your progress won't be saved.",
    courses_h3: "My Courses",
    btn_add_course: "+ Add New Course",
    course_from_template: "from {lang}",
    units_done_template: "{done}/{total} units",
    badge_active: "Active",
    instruction_choice: "Choose the correct translation",
    instruction_build: "Put the words in the right order",
    btn_continue: "Continue",
    btn_finish: "Finish",
    feedback_correct: "Great! 🎉",
    feedback_wrong_template: "Correct answer: {text}",
    tile_placeholder: "Place the words here",
    result_success_title: "Lesson complete!",
    result_fail_title: "Out of hearts, try again!",
    result_correct_label: "Correct",
    result_streak_label: "Streak",
  },
  fr: {
    page_title: "Serino - Apprendre une langue",
    brand_tagline: "Apprends une nouvelle langue en quelques minutes par jour, avec des mots et des phrases.",
    btn_start: "Commencer",
    back_title: "Retour",
    native_title: "Quelle langue parles-tu ?",
    native_sub: "Nous te guiderons dans cette langue.",
    learn_title: "Quelle langue veux-tu apprendre ?",
    learn_sub: "Tu peux changer cela à tout moment dans les paramètres.",
    name_title: "Comment devons-nous t'appeler ?",
    name_placeholder: "Ton prénom",
    btn_start_serino: "Commencer avec Serino",
    default_name: "Apprenant",
    settings_title: "Paramètres",
    theme_title: "Apparence",
    courses_title: "Mes cours",
    weekly_label: "XP cette semaine",
    settings_h3: "Paramètres",
    sound_on: "🔊 Son activé",
    sound_off: "🔇 Son désactivé",
    theme_dark: "🌙 Mode sombre",
    theme_light: "☀️ Mode clair",
    btn_my_courses: "Mes cours",
    btn_reset_course: "Réinitialiser ce cours",
    btn_reset_all: "Supprimer toutes les données",
    btn_close: "Fermer",
    confirm_reset_course: "Réinitialiser la progression de ce cours (unités terminées) ?",
    confirm_reset_all: "Supprimer toutes les données ? Cette action est irréversible.",
    confirm_quit_lesson: "Veux-tu vraiment quitter la leçon ? Ta progression ne sera pas enregistrée.",
    courses_h3: "Mes cours",
    btn_add_course: "+ Ajouter un cours",
    course_from_template: "depuis {lang}",
    units_done_template: "{done}/{total} unités",
    badge_active: "Actif",
    instruction_choice: "Choisis la bonne traduction",
    instruction_build: "Remets les mots dans le bon ordre",
    btn_continue: "Continuer",
    btn_finish: "Terminer",
    feedback_correct: "Bravo ! 🎉",
    feedback_wrong_template: "Réponse correcte : {text}",
    tile_placeholder: "Place les mots ici",
    result_success_title: "Leçon terminée !",
    result_fail_title: "Plus de cœurs, réessaie !",
    result_correct_label: "Correct",
    result_streak_label: "Série",
  },
  es: {
    page_title: "Serino - Aprende un idioma",
    brand_tagline: "Aprende un nuevo idioma en pocos minutos al día, con palabras y frases.",
    btn_start: "Empezar",
    back_title: "Atrás",
    native_title: "¿Qué idioma hablas?",
    native_sub: "Te guiaremos en este idioma.",
    learn_title: "¿Qué idioma quieres aprender?",
    learn_sub: "Puedes cambiarlo en cualquier momento desde los ajustes.",
    name_title: "¿Cómo te llamamos?",
    name_placeholder: "Tu nombre",
    btn_start_serino: "Empezar con Serino",
    default_name: "Estudiante",
    settings_title: "Ajustes",
    theme_title: "Apariencia",
    courses_title: "Mis cursos",
    weekly_label: "XP esta semana",
    settings_h3: "Ajustes",
    sound_on: "🔊 Sonido activado",
    sound_off: "🔇 Sonido desactivado",
    theme_dark: "🌙 Modo oscuro",
    theme_light: "☀️ Modo claro",
    btn_my_courses: "Mis cursos",
    btn_reset_course: "Reiniciar este curso",
    btn_reset_all: "Eliminar todos los datos",
    btn_close: "Cerrar",
    confirm_reset_course: "¿Reiniciar el progreso de este curso (unidades completadas)?",
    confirm_reset_all: "¿Eliminar todos los datos? Esta acción no se puede deshacer.",
    confirm_quit_lesson: "¿Seguro que quieres salir de la lección? Tu progreso no se guardará.",
    courses_h3: "Mis cursos",
    btn_add_course: "+ Añadir nuevo curso",
    course_from_template: "desde {lang}",
    units_done_template: "{done}/{total} unidades",
    badge_active: "Activo",
    instruction_choice: "Elige la traducción correcta",
    instruction_build: "Ordena las palabras correctamente",
    btn_continue: "Continuar",
    btn_finish: "Terminar",
    feedback_correct: "¡Genial! 🎉",
    feedback_wrong_template: "Respuesta correcta: {text}",
    tile_placeholder: "Coloca las palabras aquí",
    result_success_title: "¡Lección completada!",
    result_fail_title: "Sin corazones, ¡inténtalo de nuevo!",
    result_correct_label: "Correcto",
    result_streak_label: "Racha",
  },
};

function serinoT(key, vars) {
  const dict = SERINO_UI[serinoUiLang] || SERINO_UI.tr;
  let text = dict[key] || SERINO_UI.tr[key] || key;
  if (vars) {
    Object.keys(vars).forEach((k) => {
      text = text.replace(`{${k}}`, vars[k]);
    });
  }
  return text;
}

function serinoSetUiLang(code) {
  serinoUiLang = SERINO_UI[code] ? code : "tr";
  serinoApplyUiLanguage();
}

/* Sayfadaki data-i18n / data-i18n-placeholder / data-i18n-title
   özniteliklerine sahip tüm sabit metinleri günceller. */
function serinoApplyUiLanguage() {
  document.documentElement.lang = serinoUiLang;
  document.title = serinoT("page_title");

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = serinoT(el.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.placeholder = serinoT(el.dataset.i18nPlaceholder);
  });
  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    el.title = serinoT(el.dataset.i18nTitle);
  });
  document.querySelectorAll("[data-i18n-empty]").forEach((el) => {
    el.setAttribute("data-placeholder", serinoT(el.dataset.i18nEmpty));
  });
}
