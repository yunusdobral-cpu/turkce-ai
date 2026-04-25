// Internationalization / Dil Desteği
// Türkçe her zaman gösterilir, seçilen dil ikinci satır olarak eklenir
// Format: "Türkçe metin / Seçilen dil metin"

const I18N = {
  _lang: localStorage.getItem('turkceai_lang') || 'en',

  languages: {
    en: { label: 'EN', name: 'English' },
    es: { label: 'ES', name: 'Español' },
    ar: { label: 'AR', name: 'العربية' },
    ru: { label: 'RU', name: 'Русский' },
    de: { label: 'DE', name: 'Deutsch' },
    fr: { label: 'FR', name: 'Français' }
  },

  translations: {
    // Navbar
    nav_home:       { en: 'Home', es: 'Inicio', ar: 'الرئيسية', ru: 'Главная', de: 'Startseite', fr: 'Accueil' },
    nav_grammar:    { en: 'Grammar', es: 'Gramática', ar: 'القواعد', ru: 'Грамматика', de: 'Grammatik', fr: 'Grammaire' },
    nav_phrases:    { en: 'Daily Phrases', es: 'Frases diarias', ar: 'عبارات يومية', ru: 'Повседневные фразы', de: 'Alltagsausdrücke', fr: 'Expressions quotidiennes' },
    phrases_title:    { en: 'Daily Phrases', es: 'Frases diarias', ar: 'عبارات يومية', ru: 'Повседневные фразы', de: 'Alltagsausdrücke', fr: 'Expressions quotidiennes' },
    phrases_subtitle: { en: 'Most used Turkish phrases in daily life', es: 'Frases turcas más usadas en la vida diaria', ar: 'أكثر العبارات التركية استخداماً في الحياة اليومية', ru: 'Самые используемые турецкие фразы в повседневной жизни', de: 'Die meistbenutzten türkischen Ausdrücke im Alltag', fr: 'Expressions turques les plus utilisées au quotidien' },
    phrases_example:  { en: 'Example', es: 'Ejemplo', ar: 'مثال', ru: 'Пример', de: 'Beispiel', fr: 'Exemple' },
    phrases_count:    { en: 'phrases', es: 'frases', ar: 'عبارات', ru: 'фраз', de: 'Ausdrücke', fr: 'expressions' },
    phrases_select:   { en: 'Select a category', es: 'Selecciona una categoría', ar: 'اختر فئة', ru: 'Выберите категорию', de: 'Wähle eine Kategorie', fr: 'Choisissez une catégorie' },
    nav_reading:    { en: 'Reading', es: 'Lectura', ar: 'القراءة', ru: 'Чтение', de: 'Lesen', fr: 'Lecture' },
    nav_teachers:   { en: 'Teachers', es: 'Profesores', ar: 'المعلمون', ru: 'Учителя', de: 'Lehrer', fr: 'Professeurs' },
    nav_vocab:      { en: 'Vocabulary', es: 'Vocabulario', ar: 'المفردات', ru: 'Словарь', de: 'Wortschatz', fr: 'Vocabulaire' },
    nav_quiz:       { en: 'Quiz', es: 'Examen', ar: 'اختبار', ru: 'Тест', de: 'Quiz', fr: 'Quiz' },
    nav_wordrace:   { en: 'Word Race', es: 'Carrera', ar: 'سباق', ru: 'Гонка', de: 'Wortrennen', fr: 'Course' },
    nav_admin:      { en: 'Admin', es: 'Admin', ar: 'الإدارة', ru: 'Админ', de: 'Verwaltung', fr: 'Admin' },

    // Word Race
    wr_title:        { en: 'Word Race', es: 'Carrera de Palabras', ar: 'سباق الكلمات', ru: 'Гонка слов', de: 'Wortrennen', fr: 'Course de mots' },
    wr_subtitle:     { en: 'Translate Turkish words as fast as possible!', es: '¡Traduce palabras turcas lo más rápido posible!', ar: 'ترجم الكلمات التركية بأسرع ما يمكن!', ru: 'Переводи турецкие слова как можно быстрее!', de: 'Übersetze türkische Wörter so schnell wie möglich!', fr: 'Traduis les mots turcs le plus vite possible !' },
    wr_subtitle2:    { en: '2–8 players · 10 rounds · 12 sec/round', es: '2–8 jugadores · 10 rondas · 12 seg/ronda', ar: '٢–٨ لاعبين · ١٠ جولات · ١٢ ث/جولة', ru: '2–8 игроков · 10 раундов · 12 сек/раунд', de: '2–8 Spieler · 10 Runden · 12 Sek./Runde', fr: '2–8 joueurs · 10 tours · 12 s/tour' },
    wr_name_ph:      { en: 'Your name', es: 'Tu nombre', ar: 'اسمك', ru: 'Ваше имя', de: 'Ihr Name', fr: 'Votre nom' },
    wr_quick_match:  { en: '⚡ Quick Match', es: '⚡ Partida rápida', ar: '⚡ مباراة سريعة', ru: '⚡ Быстрый матч', de: '⚡ Schnellspiel', fr: '⚡ Partie rapide' },
    wr_create_table: { en: '🏠 Create Table', es: '🏠 Crear Mesa', ar: '🏠 إنشاء طاولة', ru: '🏠 Создать стол', de: '🏠 Tisch erstellen', fr: '🏠 Créer une table' },
    wr_play_bot:     { en: '🤖 Play vs Bot', es: '🤖 Jugar vs Bot', ar: '🤖 العب ضد البوت', ru: '🤖 Играть с ботом', de: '🤖 Gegen Bot spielen', fr: '🤖 Jouer contre Bot' },
    wr_open_tables:  { en: 'Open Tables', es: 'Mesas abiertas', ar: 'الطاولات المفتوحة', ru: 'Открытые столы', de: 'Offene Tische', fr: 'Tables ouvertes' },
    wr_no_tables:    { en: 'No open tables — create one!', es: 'No hay mesas — ¡crea una!', ar: 'لا توجد طاولات — أنشئ واحدة!', ru: 'Нет открытых столов — создайте!', de: 'Keine Tische — erstelle einen!', fr: 'Pas de tables — créez-en une !' },
    wr_join_btn:     { en: 'Join →', es: 'Unirse →', ar: '← انضم', ru: 'Войти →', de: 'Beitreten →', fr: 'Rejoindre →' },
    wr_players:      { en: 'players', es: 'jugadores', ar: 'لاعبين', ru: 'игроков', de: 'Spieler', fr: 'joueurs' },
    wr_searching:    { en: 'Searching for opponent', es: 'Buscando oponente', ar: 'البحث عن خصم', ru: 'Поиск соперника', de: 'Gegner wird gesucht', fr: 'Recherche d\'adversaire' },
    wr_bot_hint:     { en: 'A bot joins if no opponent found in 8 seconds', es: 'Un bot se une si no hay oponente en 8 segundos', ar: 'سيُضاف بوت إذا لم يُعثر على خصم خلال ٨ ثوانٍ', ru: 'Бот добавится, если нет соперника за 8 сек', de: 'Bot tritt bei, wenn kein Gegner in 8 Sek. gefunden', fr: 'Un bot rejoindra si aucun adversaire en 8 sec' },
    wr_cancel:       { en: 'Cancel', es: 'Cancelar', ar: 'إلغاء', ru: 'Отмена', de: 'Abbrechen', fr: 'Annuler' },
    wr_table_title:  { en: 'Table', es: 'Mesa', ar: 'الطاولة', ru: 'Стол', de: 'Tisch', fr: 'Table' },
    wr_table_hint:   { en: 'Others can join from the open tables list', es: 'Otros pueden unirse desde la lista', ar: 'يمكن للآخرين الانضمام من القائمة', ru: 'Другие могут присоединиться из списка', de: 'Andere können über die Liste beitreten', fr: 'Les autres peuvent rejoindre via la liste' },
    wr_start_game:   { en: '▶ Start Game', es: '▶ Iniciar juego', ar: '▶ ابدأ اللعبة', ru: '▶ Начать игру', de: '▶ Spiel starten', fr: '▶ Démarrer le jeu' },
    wr_min_players:  { en: 'At least 2 players required', es: 'Se requieren al menos 2 jugadores', ar: 'مطلوب لاعبان على الأقل', ru: 'Требуется минимум 2 игрока', de: 'Mind. 2 Spieler erforderlich', fr: 'Au moins 2 joueurs requis' },
    wr_host_starts:  { en: 'Table host will start the game...', es: 'El anfitrión iniciará el juego...', ar: 'صاحب الطاولة سيبدأ اللعبة...', ru: 'Хозяин стола начнёт игру...', de: 'Gastgeber startet das Spiel...', fr: 'L\'hôte démarrera le jeu...' },
    wr_leave_table:  { en: 'Leave Table', es: 'Abandonar mesa', ar: 'مغادرة الطاولة', ru: 'Покинуть стол', de: 'Tisch verlassen', fr: 'Quitter la table' },
    wr_get_ready:    { en: 'Get ready!', es: '¡Prepárate!', ar: 'استعد!', ru: 'Приготовься!', de: 'Bereitmachen!', fr: 'Prépare-toi !' },
    wr_word_hint:    { en: 'What is the English translation?', es: '¿Cuál es la traducción?', ar: 'ما هي الترجمة الإنجليزية؟', ru: 'Каков перевод на английский?', de: 'Was ist die englische Übersetzung?', fr: 'Quelle est la traduction ?' },
    wr_word_hint_tr: { en: 'What is the Turkish translation?', es: '¿Cuál es la traducción turca?', ar: 'ما هي الترجمة التركية؟', ru: 'Каков перевод на турецкий?', de: 'Was ist die türkische Übersetzung?', fr: 'Quelle est la traduction turque ?' },
    wr_answer_ph:    { en: 'Type and press Enter...', es: 'Escribe y pulsa Intro...', ar: 'اكتب واضغط Enter...', ru: 'Введите и нажмите Enter...', de: 'Tippe und Enter...', fr: 'Écris et Entrée...' },
    wr_wrong:        { en: '✗ Wrong, try again!', es: '✗ ¡Incorrecto!', ar: '✗ خطأ، حاول مجدداً!', ru: '✗ Неверно, попробуй ещё!', de: '✗ Falsch, nochmal!', fr: '✗ Faux, réessaie !' },
    wr_you_won:      { en: '🎉 You got it! Answer: ', es: '🎉 ¡Lo lograste! Respuesta: ', ar: '🎉 أحسنت! الجواب: ', ru: '🎉 Верно! Ответ: ', de: '🎉 Richtig! Antwort: ', fr: '🎉 Bravo ! Réponse : ' },
    wr_other_won:    { en: '✅ {name} got it! Answer: ', es: '✅ ¡{name} acertó! Respuesta: ', ar: '✅ {name} أجاب! الجواب: ', ru: '✅ {name} ответил! Ответ: ', de: '✅ {name} war schneller! Antwort: ', fr: '✅ {name} a répondu ! Réponse : ' },
    wr_timeout:      { en: '⏱️ Time\'s up! Answer: ', es: '⏱️ ¡Tiempo! Respuesta: ', ar: '⏱️ انتهى الوقت! الجواب: ', ru: '⏱️ Время вышло! Ответ: ', de: '⏱️ Zeit abgelaufen! Antwort: ', fr: '⏱️ Temps écoulé ! Réponse : ' },
    wr_score:        { en: 'Score', es: 'Puntuación', ar: 'النتيجة', ru: 'Счёт', de: 'Punkte', fr: 'Score' },
    wr_game_over:    { en: '🏁 Game Over!', es: '🏁 ¡Juego terminado!', ar: '🏁 انتهت اللعبة!', ru: '🏁 Игра окончена!', de: '🏁 Spiel beendet!', fr: '🏁 Partie terminée !' },
    wr_play_again:   { en: 'Play Again', es: 'Jugar de nuevo', ar: 'العب مجدداً', ru: 'Играть снова', de: 'Nochmal', fr: 'Rejouer' },
    wr_home_btn:     { en: 'Home', es: 'Inicio', ar: 'الرئيسية', ru: 'Главная', de: 'Startseite', fr: 'Accueil' },
    wr_share_label:  { en: 'Share your result:', es: 'Comparte tu resultado:', ar: 'شارك نتيجتك:', ru: 'Поделись результатом:', de: 'Teile dein Ergebnis:', fr: 'Partage ton résultat :' },
    wr_share_won:    { en: '🥇 I won the Word Race! {score}/10 points. I challenge you! lingual.work', es: '🥇 ¡Gané la Carrera de Palabras! {score}/10 puntos. ¡Te desafío! lingual.work', ar: '🥇 فزت في سباق الكلمات! {score}/١٠. أتحداك! lingual.work', ru: '🥇 Я выиграл Гонку слов! {score}/10 очков. Вызываю тебя! lingual.work', de: '🥇 Ich gewann das Wortrennen! {score}/10 Punkte. Ich fordere dich! lingual.work', fr: '🥇 J\'ai gagné la Course de mots ! {score}/10. Je te défie ! lingual.work' },
    wr_share_played: { en: '🏆 I scored {score}/10 in the Word Race! Can you beat me? lingual.work', es: '🏆 ¡Obtuve {score}/10 en la Carrera! ¿Puedes superarme? lingual.work', ar: '🏆 حصلت على {score}/١٠ في سباق الكلمات! هل يمكنك التفوق علي؟ lingual.work', ru: '🏆 Набрал {score}/10 в Гонке слов! Сможешь победить? lingual.work', de: '🏆 Ich erzielte {score}/10 im Wortrennen! Kannst du mich schlagen? lingual.work', fr: '🏆 J\'ai obtenu {score}/10 ! Tu peux faire mieux ? lingual.work' },

    // Homepage - Header
    home_subtitle:  { en: 'Learn Turkish with AI', es: 'Aprende Turco con IA', ar: 'تعلم التركية بالذكاء الاصطناعي', ru: 'Учите Турецкий с ИИ', de: 'Türkisch lernen mit KI', fr: 'Apprenez le Turc avec l\'IA' },

    // Homepage - Daily Content
    daily_title:    { en: 'Daily Content', es: 'Contenido diario', ar: 'المحتوى اليومي', ru: 'Ежедневный контент', de: 'Täglicher Inhalt', fr: 'Contenu quotidien' },

    // Daily ticker items
    daily_word_label:    { en: 'Word of the Day', es: 'Palabra del día', ar: 'كلمة اليوم', ru: 'Слово дня', de: 'Wort des Tages', fr: 'Mot du jour' },
    daily_word_text:     { en: 'Curiosity', es: 'Curiosidad', ar: 'فضول', ru: 'Любопытство', de: 'Neugier', fr: 'Curiosité' },
    daily_word_sub:      { en: '"Don\'t worry, everything will be fine."', es: '"No te preocupes, todo saldrá bien."', ar: '"لا تقلق، كل شيء سيكون على ما يرام."', ru: '"Не волнуйся, всё будет хорошо."', de: '"Keine Sorge, alles wird gut."', fr: '"Ne t\'inquiète pas, tout ira bien."' },

    daily_phrase_label:  { en: 'Phrase of the Day', es: 'Frase del día', ar: 'عبارة اليوم', ru: 'Фраза дня', de: 'Redewendung des Tages', fr: 'Expression du jour' },
    daily_phrase_text:   { en: 'May it come easy!', es: '¡Que sea fácil!', ar: 'بالتوفيق!', ru: 'Лёгкой работы!', de: 'Möge es leicht kommen!', fr: 'Que cela soit facile !' },
    daily_phrase_sub:    { en: 'Said to someone who is working.', es: 'Se dice a alguien que está trabajando.', ar: 'تقال لشخص يعمل.', ru: 'Говорят тому, кто работает.', de: 'Wird zu jemandem gesagt, der arbeitet.', fr: 'Dit à quelqu\'un qui travaille.' },

    daily_grammar_label: { en: 'Grammar Tip', es: 'Consejo gramatical', ar: 'نصيحة نحوية', ru: 'Грамматический совет', de: 'Grammatik-Tipp', fr: 'Astuce grammaire' },
    daily_grammar_sub:   { en: '"I ate an apple." — The verb is always at the end!', es: '"Comí una manzana." — ¡El verbo siempre va al final!', ar: '"أكلت تفاحة." — الفعل دائماً في النهاية!', ru: '"Я съел яблоко." — Глагол всегда в конце!', de: '"Ich aß einen Apfel." — Das Verb steht immer am Ende!', fr: '"J\'ai mangé une pomme." — Le verbe est toujours à la fin !' },

    daily_culture_label: { en: 'Culture Corner', es: 'Rincón cultural', ar: 'ركن الثقافة', ru: 'Уголок культуры', de: 'Kulturecke', fr: 'Coin culture' },
    daily_culture_text:  { en: 'Turkish tea culture', es: 'Cultura del té Turco', ar: 'ثقافة الشاي التركي', ru: 'Турецкая чайная культура', de: 'Türkische Teekultur', fr: 'Culture du thé Turc' },
    daily_culture_sub:   { en: 'Tea is offered everywhere as a sign of hospitality.', es: 'El té se ofrece en todas partes como señal de hospitalidad.', ar: 'يُقدَّم الشاي في كل مكان كعلامة على كرم الضيافة.', ru: 'Чай предлагают везде как знак гостеприимства.', de: 'Tee wird überall als Zeichen der Gastfreundschaft angeboten.', fr: 'Le thé est offert partout en signe d\'hospitalité.' },

    daily_didyouknow_label: { en: 'Did You Know?', es: '¿Sabías que?', ar: 'هل تعلم؟', ru: 'Знаете ли вы?', de: 'Wussten Sie?', fr: 'Le saviez-vous ?' },
    daily_didyouknow_sub:   { en: 'Vowel harmony is one of the fundamental rules of Turkish.', es: 'La armonía vocálica es una de las reglas fundamentales del Turco.', ar: 'التناغم الصوتي هو أحد القواعد الأساسية في التركية.', ru: 'Гармония гласных — одно из основных правил Турецкого языка.', de: 'Vokalharmonie ist eine der Grundregeln des Türkischen.', fr: 'L\'harmonie vocalique est l\'une des règles fondamentales du Turc.' },

    // Homepage - Level Test Section
    find_level:     { en: 'Find Your Level', es: 'Descubre tu nivel', ar: 'حدد مستواك', ru: 'Определи свой уровень', de: 'Finde dein Niveau', fr: 'Trouve ton niveau' },
    find_level_desc:{ en: 'Take a general test covering all levels to find out your Turkish level', es: 'Haz un test general que cubre todos los niveles para descubrir tu nivel de Turco', ar: 'أجرِ اختباراً شاملاً لجميع المستويات لمعرفة مستواك في التركية', ru: 'Пройди общий тест по всем уровням, чтобы узнать свой уровень Турецкого', de: 'Mach einen allgemeinen Test über alle Stufen, um dein Türkisch-Niveau herauszufinden', fr: 'Passe un test général couvrant tous les niveaux pour découvrir ton niveau de Turc' },

    level_beginner:     { en: 'Beginner', es: 'Principiante', ar: 'مبتدئ', ru: 'Начальный', de: 'Anfänger', fr: 'Débutant' },
    level_elementary:   { en: 'Elementary', es: 'Elemental', ar: 'أساسي', ru: 'Элементарный', de: 'Grundstufe', fr: 'Élémentaire' },
    level_intermediate: { en: 'Intermediate', es: 'Intermedio', ar: 'متوسط', ru: 'Средний', de: 'Mittelstufe', fr: 'Intermédiaire' },
    level_upper_int:    { en: 'Upper Intermediate', es: 'Intermedio alto', ar: 'فوق المتوسط', ru: 'Выше среднего', de: 'Obere Mittelstufe', fr: 'Intermédiaire supérieur' },
    level_advanced:     { en: 'Advanced', es: 'Avanzado', ar: 'متقدم', ru: 'Продвинутый', de: 'Fortgeschritten', fr: 'Avancé' },
    level_expert:       { en: 'Expert', es: 'Experto', ar: 'خبير', ru: 'Эксперт', de: 'Experte', fr: 'Expert' },

    level_basic_words:  { en: 'Basic words', es: 'Palabras básicas', ar: 'كلمات أساسية', ru: 'Базовые слова', de: 'Grundwörter', fr: 'Mots de base' },
    level_daily_phrases:{ en: 'Daily phrases', es: 'Frases diarias', ar: 'عبارات يومية', ru: 'Ежедневные фразы', de: 'Alltagsphrasen', fr: 'Phrases quotidiennes' },
    level_work_academic:{ en: 'Work & academic', es: 'Trabajo y académico', ar: 'العمل والأكاديمي', ru: 'Работа и учёба', de: 'Beruf & Akademie', fr: 'Travail & académique' },
    level_advanced_words:{ en: 'Advanced words', es: 'Palabras avanzadas', ar: 'كلمات متقدمة', ru: 'Продвинутые слова', de: 'Fortgeschrittene Wörter', fr: 'Mots avancés' },
    level_coming_soon:  { en: 'Coming soon', es: 'Próximamente', ar: 'قريباً', ru: 'Скоро', de: 'Bald verfügbar', fr: 'Bientôt' },

    // Text Correction
    correction_title:       { en: 'Text Correction', es: 'Corrección de Texto', ar: 'تصحيح النص', ru: 'Коррекция текста', de: 'Textkorrektur', fr: 'Correction de texte' },
    correction_intended:    { en: 'What do you want to say?', es: '¿Qué quieres decir?', ar: 'ماذا تريد أن تقول؟', ru: 'Что вы хотите сказать?', de: 'Was möchten Sie sagen?', fr: 'Que voulez-vous dire ?' },
    correction_your_try:    { en: 'Write your Turkish attempt', es: 'Escribe tu intento en turco', ar: 'اكتب محاولتك بالتركية', ru: 'Напишите свою попытку на турецком', de: 'Schreiben Sie Ihren türkischen Versuch', fr: 'Écrivez votre essai en turc' },
    correction_check:       { en: 'Check', es: 'Verificar', ar: 'تحقق', ru: 'Проверить', de: 'Prüfen', fr: 'Vérifier' },
    correction_correct_ver: { en: 'Correct Version', es: 'Versión Correcta', ar: 'النسخة الصحيحة', ru: 'Правильная версия', de: 'Korrekte Version', fr: 'Version correcte' },
    correction_mistakes:    { en: 'Mistakes', es: 'Errores', ar: 'الأخطاء', ru: 'Ошибки', de: 'Fehler', fr: 'Erreurs' },
    correction_perfect:     { en: 'Perfect! No mistakes.', es: '¡Perfecto! Sin errores.', ar: 'ممتاز! لا أخطاء.', ru: 'Отлично! Без ошибок.', de: 'Perfekt! Keine Fehler.', fr: 'Parfait ! Aucune erreur.' },
    correction_checking:    { en: 'Checking...', es: 'Verificando...', ar: 'جاري التحقق...', ru: 'Проверка...', de: 'Wird geprüft...', fr: 'Vérification...' },

    // Forum section
    forum_add_cat:  { en: '+ Add Category', es: '+ Añadir categoría', ar: '+ إضافة فئة', ru: '+ Добавить категорию', de: '+ Kategorie hinzufügen', fr: '+ Ajouter une catégorie' },
    forum_topic:    { en: 'Topic', es: 'Tema', ar: 'موضوع', ru: 'Тема', de: 'Thema', fr: 'Sujet' },
    forum_message:  { en: 'Message', es: 'Mensaje', ar: 'رسالة', ru: 'Сообщение', de: 'Nachricht', fr: 'Message' },
    forum_last_msg: { en: 'Last Message', es: 'Último mensaje', ar: 'آخر رسالة', ru: 'Последнее сообщение', de: 'Letzte Nachricht', fr: 'Dernier message' },
    forum_loading:  { en: 'Loading...', es: 'Cargando...', ar: 'جاري التحميل...', ru: 'Загрузка...', de: 'Wird geladen...', fr: 'Chargement...' },
    forum_empty:    { en: 'No categories yet. Add a new category.', es: 'Aún no hay categorías. Añade una nueva.', ar: 'لا توجد فئات بعد. أضف فئة جديدة.', ru: 'Пока нет категорий. Добавьте новую.', de: 'Noch keine Kategorien. Fügen Sie eine neue hinzu.', fr: 'Pas encore de catégories. Ajoutez-en une.' },
    forum_load_err: { en: 'Forum could not be loaded.', es: 'No se pudo cargar el foro.', ar: 'تعذر تحميل المنتدى.', ru: 'Не удалось загрузить форум.', de: 'Forum konnte nicht geladen werden.', fr: 'Le forum n\'a pas pu être chargé.' },

    // Grammar page
    grammar_title:       { en: 'Grammar', es: 'Gramática', ar: 'القواعد', ru: 'Грамматика', de: 'Grammatik', fr: 'Grammaire' },
    grammar_subtitle:    { en: 'Explore grammar topics by level', es: 'Explora temas de gramática por nivel', ar: 'استكشف مواضيع القواعد حسب المستوى', ru: 'Изучайте грамматику по уровням', de: 'Entdecke Grammatikthemen nach Niveau', fr: 'Explore les sujets de grammaire par niveau' },
    grammar_topic_count: { en: 'topics', es: 'temas', ar: 'مواضيع', ru: 'тем', de: 'Themen', fr: 'sujets' },
    grammar_select_topic:{ en: 'Select a level and topic', es: 'Selecciona un nivel y tema', ar: 'اختر مستوى وموضوعاً', ru: 'Выберите уровень и тему', de: 'Wähle ein Niveau und Thema', fr: 'Choisis un niveau et un sujet' },
    grammar_story_dl:    { en: 'Download Story', es: 'Descargar Story', ar: 'تحميل ستوري', ru: 'Скачать Story', de: 'Story herunterladen', fr: 'Télécharger Story' },
    grammar_post_dl:     { en: 'Download Post', es: 'Descargar Post', ar: 'تحميل بوست', ru: 'Скачать Post', de: 'Post herunterladen', fr: 'Télécharger Post' },
    grammar_preparing:   { en: 'Preparing...', es: 'Preparando...', ar: 'جاري التحضير...', ru: 'Подготовка...', de: 'Wird vorbereitet...', fr: 'Préparation...' },
    grammar_dl_png:      { en: 'Download PNG', es: 'Descargar PNG', ar: 'تحميل PNG', ru: 'Скачать PNG', de: 'PNG herunterladen', fr: 'Télécharger PNG' },
    grammar_dl_all:      { en: 'Download All', es: 'Descargar todo', ar: 'تحميل الكل', ru: 'Скачать всё', de: 'Alle herunterladen', fr: 'Tout télécharger' },

    grammar_lvl_a1:      { en: 'Beginner', es: 'Principiante', ar: 'مبتدئ', ru: 'Начальный', de: 'Anfänger', fr: 'Débutant' },
    grammar_lvl_a2:      { en: 'Elementary', es: 'Elemental', ar: 'أساسي', ru: 'Элементарный', de: 'Grundstufe', fr: 'Élémentaire' },
    grammar_lvl_b1:      { en: 'Intermediate', es: 'Intermedio', ar: 'متوسط', ru: 'Средний', de: 'Mittelstufe', fr: 'Intermédiaire' },
    grammar_lvl_b2:      { en: 'Upper Intermediate', es: 'Intermedio alto', ar: 'فوق المتوسط', ru: 'Выше среднего', de: 'Obere Mittelstufe', fr: 'Intermédiaire sup.' },
    grammar_lvl_c1:      { en: 'Advanced', es: 'Avanzado', ar: 'متقدم', ru: 'Продвинутый', de: 'Fortgeschritten', fr: 'Avancé' },
    grammar_lvl_c2:      { en: 'Proficiency', es: 'Experto', ar: 'خبير', ru: 'Эксперт', de: 'Experte', fr: 'Expert' },

    // Teachers page
    teachers_title:      { en: 'Teachers', es: 'Profesores', ar: 'المعلمون', ru: 'Учителя', de: 'Lehrer', fr: 'Professeurs' },
    teachers_subtitle:   { en: 'Choose a teacher and topic to start your lesson', es: 'Elige un profesor y tema para iniciar tu lección', ar: 'اختر معلماً وموضوعاً لبدء درسك', ru: 'Выберите учителя и тему для начала урока', de: 'Wähle einen Lehrer und ein Thema für deine Lektion', fr: 'Choisis un professeur et un sujet pour commencer' },
    teachers_loading:    { en: 'Loading...', es: 'Cargando...', ar: 'جاري التحميل...', ru: 'Загрузка...', de: 'Wird geladen...', fr: 'Chargement...' },
    teachers_error:      { en: 'Teachers could not be loaded', es: 'No se pudieron cargar los profesores', ar: 'تعذر تحميل المعلمين', ru: 'Не удалось загрузить учителей', de: 'Lehrer konnten nicht geladen werden', fr: 'Les professeurs n\'ont pas pu être chargés' },
    teachers_free_chat:  { en: 'Free Chat', es: 'Chat libre', ar: 'محادثة حرة', ru: 'Свободный чат', de: 'Freies Gespräch', fr: 'Discussion libre' },

    // Reading page
    reading_title:       { en: 'Reading', es: 'Lectura', ar: 'القراءة', ru: 'Чтение', de: 'Lesen', fr: 'Lecture' },
    reading_subtitle:    { en: 'Practice reading with level-appropriate texts', es: 'Practica la lectura con textos de tu nivel', ar: 'تدرب على القراءة بنصوص مناسبة لمستواك', ru: 'Практикуйте чтение с текстами вашего уровня', de: 'Übe Lesen mit Texten deines Niveaus', fr: 'Pratique la lecture avec des textes de ton niveau' },
    reading_text_count:  { en: 'texts', es: 'textos', ar: 'نصوص', ru: 'текстов', de: 'Texte', fr: 'textes' },
    reading_select:      { en: 'Select a level and text', es: 'Selecciona un nivel y texto', ar: 'اختر مستوى ونصاً', ru: 'Выберите уровень и текст', de: 'Wähle ein Niveau und einen Text', fr: 'Choisis un niveau et un texte' },
    reading_coming:      { en: 'Coming soon', es: 'Próximamente', ar: 'قريباً', ru: 'Скоро', de: 'Bald verfügbar', fr: 'Bientôt' },
    reading_no_trans:    { en: 'Translation for this text will be added soon', es: 'La traducción se añadirá pronto', ar: 'ستضاف الترجمة قريباً', ru: 'Перевод скоро появится', de: 'Übersetzung wird bald hinzugefügt', fr: 'La traduction sera bientôt ajoutée' },
    reading_tab_text:    { en: 'Text', es: 'Texto', ar: 'النص', ru: 'Текст', de: 'Text', fr: 'Texte' },
    reading_tab_words:   { en: 'Target Words', es: 'Palabras clave', ar: 'الكلمات المستهدفة', ru: 'Целевые слова', de: 'Zielwörter', fr: 'Mots cibles' },
    reading_tab_trans:   { en: 'Translation', es: 'Traducción', ar: 'الترجمة', ru: 'Перевод', de: 'Übersetzung', fr: 'Traduction' },
    reading_word:        { en: 'Word', es: 'Palabra', ar: 'كلمة', ru: 'Слово', de: 'Wort', fr: 'Mot' },
    reading_meaning:     { en: 'Meaning', es: 'Significado', ar: 'المعنى', ru: 'Значение', de: 'Bedeutung', fr: 'Sens' },
    reading_synonym:     { en: 'Synonym', es: 'Sinónimo', ar: 'مرادف', ru: 'Синоним', de: 'Synonym', fr: 'Synonyme' },

    // Auth
    auth_login:          { en: 'Login', es: 'Iniciar sesión', ar: 'تسجيل الدخول', ru: 'Войти', de: 'Anmelden', fr: 'Connexion' },
    auth_register:       { en: 'Register', es: 'Registrarse', ar: 'التسجيل', ru: 'Регистрация', de: 'Registrieren', fr: 'S\'inscrire' },
    auth_logout:         { en: 'Logout', es: 'Cerrar sesión', ar: 'تسجيل الخروج', ru: 'Выйти', de: 'Abmelden', fr: 'Déconnexion' },
    auth_email:          { en: 'Email', es: 'Correo electrónico', ar: 'البريد الإلكتروني', ru: 'Эл. почта', de: 'E-Mail', fr: 'E-mail' },
    auth_password:       { en: 'Password', es: 'Contraseña', ar: 'كلمة المرور', ru: 'Пароль', de: 'Passwort', fr: 'Mot de passe' },
    auth_password_min:   { en: 'Minimum 6 characters', es: 'Mínimo 6 caracteres', ar: '٦ أحرف على الأقل', ru: 'Минимум 6 символов', de: 'Mindestens 6 Zeichen', fr: 'Minimum 6 caractères' },
    auth_display_name:   { en: 'Display Name', es: 'Nombre', ar: 'الاسم المعروض', ru: 'Имя', de: 'Anzeigename', fr: 'Nom affiché' },
    auth_verify_title:   { en: 'Email Verification', es: 'Verificación de correo', ar: 'التحقق من البريد', ru: 'Подтверждение почты', de: 'E-Mail-Verifizierung', fr: 'Vérification e-mail' },
    auth_verify_desc:    { en: 'Enter the 6-digit code sent to your email', es: 'Ingresa el código de 6 dígitos enviado a tu correo', ar: 'أدخل الرمز المكون من ٦ أرقام المرسل إلى بريدك', ru: 'Введите 6-значный код, отправленный на вашу почту', de: 'Gib den 6-stelligen Code ein, der an deine E-Mail gesendet wurde', fr: 'Entrez le code à 6 chiffres envoyé à votre e-mail' },
    auth_code:           { en: 'Verification Code', es: 'Código de verificación', ar: 'رمز التحقق', ru: 'Код подтверждения', de: 'Bestätigungscode', fr: 'Code de vérification' },
    auth_verify_btn:     { en: 'Verify', es: 'Verificar', ar: 'تحقق', ru: 'Подтвердить', de: 'Bestätigen', fr: 'Vérifier' },
    auth_resend:         { en: 'Resend Code', es: 'Reenviar código', ar: 'إعادة إرسال الرمز', ru: 'Отправить повторно', de: 'Code erneut senden', fr: 'Renvoyer le code' },
    auth_no_account:     { en: 'Don\'t have an account?', es: '¿No tienes cuenta?', ar: 'ليس لديك حساب؟', ru: 'Нет аккаунта?', de: 'Kein Konto?', fr: 'Pas de compte ?' },
    auth_has_account:    { en: 'Already have an account?', es: '¿Ya tienes cuenta?', ar: 'لديك حساب بالفعل؟', ru: 'Уже есть аккаунт?', de: 'Bereits ein Konto?', fr: 'Déjà un compte ?' },
    auth_hello:          { en: 'Hello', es: 'Hola', ar: 'مرحباً', ru: 'Привет', de: 'Hallo', fr: 'Bonjour' },
    auth_cancel:         { en: 'Cancel', es: 'Cancelar', ar: 'إلغاء', ru: 'Отмена', de: 'Abbrechen', fr: 'Annuler' },

    // Time ago
    time_just_now:  { en: 'just now', es: 'ahora mismo', ar: 'الآن', ru: 'только что', de: 'gerade eben', fr: 'à l\'instant' },
    time_min_ago:   { en: 'min ago', es: 'min atrás', ar: 'د قبل', ru: 'мин назад', de: 'Min. her', fr: 'min il y a' },
    time_hour_ago:  { en: 'hour ago', es: 'hora atrás', ar: 'س قبل', ru: 'ч назад', de: 'Std. her', fr: 'h il y a' },
    time_day_ago:   { en: 'day ago', es: 'día atrás', ar: 'ي قبل', ru: 'д назад', de: 'Tag(e) her', fr: 'j il y a' },
  },

  getLang() {
    return this._lang;
  },

  setLang(lang) {
    this._lang = lang;
    localStorage.setItem('turkceai_lang', lang);
    this.updateNavbar();
    if (typeof Auth !== 'undefined') Auth.updateNavbar();
    // Re-render current page
    if (typeof navigateTo === 'function') {
      navigateTo(location.hash || '#/');
    }
  },

  // Get bilingual text: "Türkçe / SelectedLang"
  t(key) {
    const entry = this.translations[key];
    if (!entry) return key;
    return entry[this._lang] || entry['en'] || key;
  },

  // Returns "Türkçe metin / Çeviri" format
  bi(trText, key) {
    const translated = this.t(key);
    if (!translated || translated === key) return trText;
    return `${trText} / ${translated}`;
  },

  updateNavbar() {
    const lang = this._lang;
    const navMap = {
      home: 'nav_home',
      grammar: 'nav_grammar',
      phrases: 'nav_phrases',
      reading: 'nav_reading',
      teachers: 'nav_teachers',
      vocab: 'nav_vocab',
      quiz: 'nav_quiz',
      wordrace: 'nav_wordrace',
      admin: 'nav_admin'
    };

    document.querySelectorAll('.nav-link[data-route]').forEach(link => {
      const route = link.dataset.route;
      const key = navMap[route];
      if (!key) return;
      const trTexts = {
        home: 'Anasayfa',
        grammar: 'Dilbilgisi',
        phrases: 'Günlük İfadeler',
        reading: 'Okuma',
        teachers: 'Öğretmenler',
        vocab: 'Kelime',
        quiz: 'Sınav',
        wordrace: '🏆 Yarışma',
        admin: 'Yönetim'
      };
      const tr = trTexts[route];
      const translated = this.t(key);
      link.innerHTML = `<span class="nav-link-tr">${tr}</span><span class="nav-link-lang">${translated}</span>`;
    });

    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  },

  renderLangPicker() {
    const picker = document.getElementById('langPicker');
    if (!picker) return;
    picker.innerHTML = Object.entries(this.languages).map(([code, info]) =>
      `<button class="lang-btn${code === this._lang ? ' active' : ''}" data-lang="${code}" title="${info.name}">${info.label}</button>`
    ).join('');
    picker.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => this.setLang(btn.dataset.lang));
    });
  },

  init() {
    this.renderLangPicker();
    this.updateNavbar();
  }
};
