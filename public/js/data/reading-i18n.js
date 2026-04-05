// Okuma / Reading Page

// Çeviri haritası: Türkçe metin → {en, es, ar, ru, de, fr}
const READING_I18N = {
  // === Sayfa başlıkları ===
  'Okuma':          { en: 'Reading', es: 'Lectura', ar: 'القراءة', ru: 'Чтение', de: 'Lesen', fr: 'Lecture' },
  'reading_subtitle': { en: 'Practice reading with level-appropriate texts', es: 'Practica la lectura con textos de tu nivel', ar: 'تدرب على القراءة بنصوص مناسبة لمستواك', ru: 'Практикуйте чтение с текстами вашего уровня', de: 'Übe Lesen mit Texten deines Niveaus', fr: 'Pratique la lecture avec des textes de ton niveau' },
  'reading_select': { en: 'Select a level and text', es: 'Selecciona un nivel y texto', ar: 'اختر مستوى ونصاً', ru: 'Выберите уровень и текст', de: 'Wähle ein Niveau und einen Text', fr: 'Choisis un niveau et un texte' },
  'reading_coming': { en: 'Coming soon', es: 'Próximamente', ar: 'قريباً', ru: 'Скоро', de: 'Bald verfügbar', fr: 'Bientôt' },
  'reading_text_count': { en: 'texts', es: 'textos', ar: 'نصوص', ru: 'текстов', de: 'Texte', fr: 'textes' },
  'reading_no_trans': { en: 'Translation for this text will be added soon', es: 'La traducción de este texto se añadirá pronto', ar: 'ستضاف ترجمة هذا النص قريباً', ru: 'Перевод для этого текста скоро появится', de: 'Übersetzung wird bald hinzugefügt', fr: 'La traduction sera bientôt ajoutée' },

  // === Sekme başlıkları ===
  'Metin':          { en: 'Text', es: 'Texto', ar: 'النص', ru: 'Текст', de: 'Text', fr: 'Texte' },
  'Hedef Kelimeler': { en: 'Target Words', es: 'Palabras clave', ar: 'الكلمات المستهدفة', ru: 'Целевые слова', de: 'Zielwörter', fr: 'Mots cibles' },
  'Ceviri':         { en: 'Translation', es: 'Traducción', ar: 'الترجمة', ru: 'Перевод', de: 'Übersetzung', fr: 'Traduction' },

  // === Tablo başlıkları ===
  'Kelime':         { en: 'Word', es: 'Palabra', ar: 'كلمة', ru: 'Слово', de: 'Wort', fr: 'Mot' },
  'Anlam':          { en: 'Meaning', es: 'Significado', ar: 'المعنى', ru: 'Значение', de: 'Bedeutung', fr: 'Sens' },
  'Es Anlam':       { en: 'Synonym', es: 'Sinónimo', ar: 'مرادف', ru: 'Синоним', de: 'Synonym', fr: 'Synonyme' },

  // === Seviye etiketleri ===
  'reading_lvl_a1': { en: 'Beginner', es: 'Principiante', ar: 'مبتدئ', ru: 'Начальный', de: 'Anfänger', fr: 'Débutant' },
  'reading_lvl_a2': { en: 'Elementary', es: 'Elemental', ar: 'أساسي', ru: 'Элементарный', de: 'Grundstufe', fr: 'Élémentaire' },
  'reading_lvl_b1': { en: 'Intermediate', es: 'Intermedio', ar: 'متوسط', ru: 'Средний', de: 'Mittelstufe', fr: 'Intermédiaire' },
  'reading_lvl_b2': { en: 'Upper Intermediate', es: 'Intermedio alto', ar: 'فوق المتوسط', ru: 'Выше среднего', de: 'Obere Mittelstufe', fr: 'Intermédiaire sup.' },
  'reading_lvl_c1': { en: 'Advanced', es: 'Avanzado', ar: 'متقدم', ru: 'Продвинутый', de: 'Fortgeschritten', fr: 'Avancé' },
  'reading_lvl_c2': { en: 'Proficiency', es: 'Experto', ar: 'خبير', ru: 'Эксперт', de: 'Experte', fr: 'Expert' },

  // === A1 Konu Başlıkları ===
  'Aile & İnsanlar':       { en: 'Family & People', es: 'Familia y personas', ar: 'العائلة والناس', ru: 'Семья и люди', de: 'Familie & Menschen', fr: 'Famille et personnes' },
  'Ev & Odalar':           { en: 'Home & Rooms', es: 'Casa y habitaciones', ar: 'المنزل والغرف', ru: 'Дом и комнаты', de: 'Haus & Zimmer', fr: 'Maison et pièces' },
  'Yiyecekler & İçecekler':{ en: 'Food & Drinks', es: 'Comida y bebidas', ar: 'الطعام والمشروبات', ru: 'Еда и напитки', de: 'Essen & Trinken', fr: 'Nourriture et boissons' },
  'Giysiler & Vücut':      { en: 'Clothes & Body', es: 'Ropa y cuerpo', ar: 'الملابس والجسم', ru: 'Одежда и тело', de: 'Kleidung & Körper', fr: 'Vêtements et corps' },
  'Yerler & Ulaşım':       { en: 'Places & Transport', es: 'Lugares y transporte', ar: 'الأماكن والنقل', ru: 'Места и транспорт', de: 'Orte & Verkehr', fr: 'Lieux et transport' },
  'Doğa & Hava':           { en: 'Nature & Weather', es: 'Naturaleza y clima', ar: 'الطبيعة والطقس', ru: 'Природа и погода', de: 'Natur & Wetter', fr: 'Nature et météo' },
  'Zaman & Sayılar':       { en: 'Time & Numbers', es: 'Tiempo y números', ar: 'الوقت والأرقام', ru: 'Время и числа', de: 'Zeit & Zahlen', fr: 'Temps et nombres' },
  'Okul & İş':             { en: 'School & Work', es: 'Escuela y trabajo', ar: 'المدرسة والعمل', ru: 'Школа и работа', de: 'Schule & Arbeit', fr: 'École et travail' },
  'Duygular & Renkler':    { en: 'Emotions & Colors', es: 'Emociones y colores', ar: 'المشاعر والألوان', ru: 'Эмоции и цвета', de: 'Gefühle & Farben', fr: 'Émotions et couleurs' },
  'Günlük Eşyalar':        { en: 'Daily Objects', es: 'Objetos diarios', ar: 'الأشياء اليومية', ru: 'Повседневные предметы', de: 'Alltagsgegenstände', fr: 'Objets quotidiens' },

  // === A2 Konu Başlıkları ===
  'Meslekler & Toplum':    { en: 'Professions & Society', es: 'Profesiones y sociedad', ar: 'المهن والمجتمع', ru: 'Профессии и общество', de: 'Berufe & Gesellschaft', fr: 'Métiers et société' },
  'Sağlık & Vücut':        { en: 'Health & Body', es: 'Salud y cuerpo', ar: 'الصحة والجسم', ru: 'Здоровье и тело', de: 'Gesundheit & Körper', fr: 'Santé et corps' },
  'Alışveriş & Ekonomi':   { en: 'Shopping & Economy', es: 'Compras y economía', ar: 'التسوق والاقتصاد', ru: 'Покупки и экономика', de: 'Einkaufen & Wirtschaft', fr: 'Shopping et économie' },
  'Yemek & Mutfak':        { en: 'Cooking & Kitchen', es: 'Cocina y recetas', ar: 'الطبخ والمطبخ', ru: 'Кулинария и кухня', de: 'Kochen & Küche', fr: 'Cuisine et recettes' },
  'Eğitim & Kariyer':      { en: 'Education & Career', es: 'Educación y carrera', ar: 'التعليم والمهنة', ru: 'Образование и карьера', de: 'Bildung & Karriere', fr: 'Éducation et carrière' },
  'Teknoloji & İletişim':  { en: 'Technology & Communication', es: 'Tecnología y comunicación', ar: 'التكنولوجيا والتواصل', ru: 'Технологии и коммуникация', de: 'Technologie & Kommunikation', fr: 'Technologie et communication' },
  'Duygular & İlişkiler':  { en: 'Emotions & Relationships', es: 'Emociones y relaciones', ar: 'المشاعر والعلاقات', ru: 'Эмоции и отношения', de: 'Gefühle & Beziehungen', fr: 'Émotions et relations' },
  'Seyahat & Konaklama':   { en: 'Travel & Accommodation', es: 'Viajes y alojamiento', ar: 'السفر والإقامة', ru: 'Путешествия и проживание', de: 'Reisen & Unterkunft', fr: 'Voyage et hébergement' },
  'Ev & Yaşam':            { en: 'Home & Life', es: 'Hogar y vida', ar: 'المنزل والحياة', ru: 'Дом и жизнь', de: 'Zuhause & Leben', fr: 'Maison et vie' },
  'Spor & Hobiler':        { en: 'Sports & Hobbies', es: 'Deportes y hobbies', ar: 'الرياضة والهوايات', ru: 'Спорт и хобби', de: 'Sport & Hobbys', fr: 'Sports et loisirs' },

  // === B1 Konu Başlıkları ===
  'İş & Kariyer':          { en: 'Work & Career', es: 'Trabajo y carrera', ar: 'العمل والمهنة', ru: 'Работа и карьера', de: 'Arbeit & Karriere', fr: 'Travail et carrière' },
  'Eğitim & Akademi':      { en: 'Education & Academy', es: 'Educación y academia', ar: 'التعليم والأكاديمية', ru: 'Образование и академия', de: 'Bildung & Akademie', fr: 'Éducation et académie' },
  'Sağlık & Tıp':          { en: 'Health & Medicine', es: 'Salud y medicina', ar: 'الصحة والطب', ru: 'Здоровье и медицина', de: 'Gesundheit & Medizin', fr: 'Santé et médecine' },
  'Teknoloji & Bilişim':   { en: 'Technology & IT', es: 'Tecnología e informática', ar: 'التكنولوجيا والمعلوماتية', ru: 'Технологии и IT', de: 'Technologie & IT', fr: 'Technologie et informatique' },
  'Medya & İletişim':      { en: 'Media & Communication', es: 'Medios y comunicación', ar: 'الإعلام والتواصل', ru: 'Медиа и коммуникация', de: 'Medien & Kommunikation', fr: 'Médias et communication' },
  'Çevre & Doğa':          { en: 'Environment & Nature', es: 'Medio ambiente y naturaleza', ar: 'البيئة والطبيعة', ru: 'Окружающая среда и природа', de: 'Umwelt & Natur', fr: 'Environnement et nature' },
  'Ekonomi & Finans':       { en: 'Economy & Finance', es: 'Economía y finanzas', ar: 'الاقتصاد والمالية', ru: 'Экономика и финансы', de: 'Wirtschaft & Finanzen', fr: 'Économie et finances' },
  'Toplum & Sosyal':       { en: 'Society & Social', es: 'Sociedad y social', ar: 'المجتمع والاجتماعي', ru: 'Общество и социальное', de: 'Gesellschaft & Soziales', fr: 'Société et social' },
  'Sanat & Kültür':        { en: 'Art & Culture', es: 'Arte y cultura', ar: 'الفن والثقافة', ru: 'Искусство и культура', de: 'Kunst & Kultur', fr: 'Art et culture' },
  'Bilim & Keşif':         { en: 'Science & Discovery', es: 'Ciencia y descubrimiento', ar: 'العلوم والاكتشاف', ru: 'Наука и открытия', de: 'Wissenschaft & Entdeckung', fr: 'Science et découverte' },

  // === B2 Konu Başlıkları ===
  'Siyaset & Hukuk':       { en: 'Politics & Law', es: 'Política y derecho', ar: 'السياسة والقانون', ru: 'Политика и право', de: 'Politik & Recht', fr: 'Politique et droit' },
  'Bilim & Çevre':         { en: 'Science & Environment', es: 'Ciencia y medio ambiente', ar: 'العلوم والبيئة', ru: 'Наука и окружающая среда', de: 'Wissenschaft & Umwelt', fr: 'Science et environnement' },
  'Medya & Sanat':         { en: 'Media & Art', es: 'Medios y arte', ar: 'الإعلام والفن', ru: 'Медиа и искусство', de: 'Medien & Kunst', fr: 'Médias et art' },
  'Psikoloji & Felsefe':   { en: 'Psychology & Philosophy', es: 'Psicología y filosofía', ar: 'علم النفس والفلسفة', ru: 'Психология и философия', de: 'Psychologie & Philosophie', fr: 'Psychologie et philosophie' },
  'Teknoloji & Dijital':   { en: 'Technology & Digital', es: 'Tecnología y digital', ar: 'التكنولوجيا والرقمية', ru: 'Технологии и цифровое', de: 'Technologie & Digital', fr: 'Technologie et numérique' },
  'Sosyoloji & Toplum':    { en: 'Sociology & Society', es: 'Sociología y sociedad', ar: 'علم الاجتماع والمجتمع', ru: 'Социология и общество', de: 'Soziologie & Gesellschaft', fr: 'Sociologie et société' },
  'Edebiyat & Dil':        { en: 'Literature & Language', es: 'Literatura e idioma', ar: 'الأدب واللغة', ru: 'Литература и язык', de: 'Literatur & Sprache', fr: 'Littérature et langue' },
  'Eğitimin Geleceği':     { en: 'The Future of Education', es: 'El futuro de la educación', ar: 'مستقبل التعليم', ru: 'Будущее образования', de: 'Die Zukunft der Bildung', fr: 'L\'avenir de l\'éducation' },

  // === C1 Konu Başlıkları ===
  'Felsefe & Düşünce':     { en: 'Philosophy & Thought', es: 'Filosofía y pensamiento', ar: 'الفلسفة والفكر', ru: 'Философия и мысль', de: 'Philosophie & Denken', fr: 'Philosophie et pensée' },
  'Hukuk & Diplomasi':     { en: 'Law & Diplomacy', es: 'Derecho y diplomacia', ar: 'القانون والدبلوماسية', ru: 'Право и дипломатия', de: 'Recht & Diplomatie', fr: 'Droit et diplomatie' },
  'Bilim & Araştırma':     { en: 'Science & Research', es: 'Ciencia e investigación', ar: 'العلوم والبحث', ru: 'Наука и исследования', de: 'Wissenschaft & Forschung', fr: 'Science et recherche' },
  'Edebiyat & Kültür':     { en: 'Literature & Culture', es: 'Literatura y cultura', ar: 'الأدب والثقافة', ru: 'Литература и культура', de: 'Literatur & Kultur', fr: 'Littérature et culture' },
  'Ekonomi & Strateji':    { en: 'Economy & Strategy', es: 'Economía y estrategia', ar: 'الاقتصاد والاستراتيجية', ru: 'Экономика и стратегия', de: 'Wirtschaft & Strategie', fr: 'Économie et stratégie' },
  'Psikoloji & Davranış':  { en: 'Psychology & Behavior', es: 'Psicología y comportamiento', ar: 'علم النفس والسلوك', ru: 'Психология и поведение', de: 'Psychologie & Verhalten', fr: 'Psychologie et comportement' },
  'Toplum & Değişim':      { en: 'Society & Change', es: 'Sociedad y cambio', ar: 'المجتمع والتغيير', ru: 'Общество и перемены', de: 'Gesellschaft & Wandel', fr: 'Société et changement' },
  'Sanat & Estetik':       { en: 'Art & Aesthetics', es: 'Arte y estética', ar: 'الفن والجمال', ru: 'Искусство и эстетика', de: 'Kunst & Ästhetik', fr: 'Art et esthétique' },
  'Tarih & Uygarlık':      { en: 'History & Civilization', es: 'Historia y civilización', ar: 'التاريخ والحضارة', ru: 'История и цивилизация', de: 'Geschichte & Zivilisation', fr: 'Histoire et civilisation' },

  // === C2 Konu Başlıkları ===
  'Felsefe & Metafizik':   { en: 'Philosophy & Metaphysics', es: 'Filosofía y metafísica', ar: 'الفلسفة والميتافيزيقا', ru: 'Философия и метафизика', de: 'Philosophie & Metaphysik', fr: 'Philosophie et métaphysique' },
  'Dilbilim & Semiyotik':  { en: 'Linguistics & Semiotics', es: 'Lingüística y semiótica', ar: 'اللسانيات والسيميائية', ru: 'Лингвистика и семиотика', de: 'Linguistik & Semiotik', fr: 'Linguistique et sémiotique' },
  'Siyaset Felsefesi':     { en: 'Political Philosophy', es: 'Filosofía política', ar: 'الفلسفة السياسية', ru: 'Политическая философия', de: 'Politische Philosophie', fr: 'Philosophie politique' },
  'İleri Bilim & Teknoloji':{ en: 'Advanced Science & Tech', es: 'Ciencia y tecnología avanzada', ar: 'العلوم والتكنولوجيا المتقدمة', ru: 'Продвинутая наука и технологии', de: 'Fortgeschr. Wissenschaft & Technik', fr: 'Science et technologie avancées' },
  'Sanat Kuramı & Estetik':{ en: 'Art Theory & Aesthetics', es: 'Teoría del arte y estética', ar: 'نظرية الفن والجمال', ru: 'Теория искусства и эстетика', de: 'Kunsttheorie & Ästhetik', fr: 'Théorie de l\'art et esthétique' },
  'Psikoanaliz & Bilişsel Bilim':{ en: 'Psychoanalysis & Cognitive Sci.', es: 'Psicoanálisis y ciencia cognitiva', ar: 'التحليل النفسي والعلوم المعرفية', ru: 'Психоанализ и когнитивная наука', de: 'Psychoanalyse & Kognitionswiss.', fr: 'Psychanalyse et science cognitive' },
  'Retorik & Söylem':      { en: 'Rhetoric & Discourse', es: 'Retórica y discurso', ar: 'البلاغة والخطاب', ru: 'Риторика и дискурс', de: 'Rhetorik & Diskurs', fr: 'Rhétorique et discours' },
  'Eleştiri & Yorum':      { en: 'Criticism & Interpretation', es: 'Crítica e interpretación', ar: 'النقد والتفسير', ru: 'Критика и интерпретация', de: 'Kritik & Interpretation', fr: 'Critique et interprétation' },
  'Etik & Ahlak Felsefesi':{ en: 'Ethics & Moral Philosophy', es: 'Ética y filosofía moral', ar: 'الأخلاق وفلسفة الأخلاق', ru: 'Этика и моральная философия', de: 'Ethik & Moralphilosophie', fr: 'Éthique et philosophie morale' },
  'Karşılaştırmalı Edebiyat':{ en: 'Comparative Literature', es: 'Literatura comparada', ar: 'الأدب المقارن', ru: 'Сравнительная литература', de: 'Vergleichende Literatur', fr: 'Littérature comparée' },

  // === Açıklamalar (desc) ===
  'Benim Ailem':           { en: 'My Family', es: 'Mi familia', ar: 'عائلتي', ru: 'Моя семья', de: 'Meine Familie', fr: 'Ma famille' },
  'Evimiz':                { en: 'Our House', es: 'Nuestra casa', ar: 'منزلنا', ru: 'Наш дом', de: 'Unser Haus', fr: 'Notre maison' },
  'Kahvaltı Zamanı':       { en: 'Breakfast Time', es: 'Hora del desayuno', ar: 'وقت الإفطار', ru: 'Время завтрака', de: 'Frühstückszeit', fr: 'L\'heure du petit-déjeuner' },
  'Bugün Ne Giyeyim?':     { en: 'What Should I Wear Today?', es: '¿Qué me pongo hoy?', ar: 'ماذا أرتدي اليوم؟', ru: 'Что надеть сегодня?', de: 'Was soll ich anziehen?', fr: 'Que porter aujourd\'hui ?' },
  'Şehirde Bir Gün':       { en: 'A Day in the City', es: 'Un día en la ciudad', ar: 'يوم في المدينة', ru: 'День в городе', de: 'Ein Tag in der Stadt', fr: 'Une journée en ville' },
  'Dört Mevsim':           { en: 'Four Seasons', es: 'Cuatro estaciones', ar: 'الفصول الأربعة', ru: 'Четыре сезона', de: 'Vier Jahreszeiten', fr: 'Quatre saisons' },
  'Benim Günüm':           { en: 'My Day', es: 'Mi día', ar: 'يومي', ru: 'Мой день', de: 'Mein Tag', fr: 'Ma journée' },
  'Okulumuz':              { en: 'Our School', es: 'Nuestra escuela', ar: 'مدرستنا', ru: 'Наша школа', de: 'Unsere Schule', fr: 'Notre école' },
  'Mutlu Bir Gün':         { en: 'A Happy Day', es: 'Un día feliz', ar: 'يوم سعيد', ru: 'Счастливый день', de: 'Ein glücklicher Tag', fr: 'Un jour heureux' },
  'Çantamda Ne Var?':      { en: 'What\'s in My Bag?', es: '¿Qué hay en mi bolsa?', ar: 'ماذا في حقيبتي؟', ru: 'Что в моей сумке?', de: 'Was ist in meiner Tasche?', fr: 'Qu\'y a-t-il dans mon sac ?' },
  'Herkesin Bir Mesleği Var':{ en: 'Everyone Has a Profession', es: 'Todos tienen una profesión', ar: 'كل شخص لديه مهنة', ru: 'У каждого есть профессия', de: 'Jeder hat einen Beruf', fr: 'Chacun a un métier' },
  'Doktora Gittim':        { en: 'I Went to the Doctor', es: 'Fui al médico', ar: 'ذهبت إلى الطبيب', ru: 'Я пошёл к врачу', de: 'Ich war beim Arzt', fr: 'Je suis allé chez le médecin' },
  'Alışveriş Merkezinde':  { en: 'At the Shopping Mall', es: 'En el centro comercial', ar: 'في مركز التسوق', ru: 'В торговом центре', de: 'Im Einkaufszentrum', fr: 'Au centre commercial' },
  'Anneannemin Tarifi':    { en: 'My Grandmother\'s Recipe', es: 'La receta de mi abuela', ar: 'وصفة جدتي', ru: 'Рецепт бабушки', de: 'Omas Rezept', fr: 'La recette de ma grand-mère' },
  'Üniversite Hayalim':    { en: 'My University Dream', es: 'Mi sueño universitario', ar: 'حلمي الجامعي', ru: 'Моя мечта об университете', de: 'Mein Uni-Traum', fr: 'Mon rêve universitaire' },
  'Dijital Dünya':         { en: 'Digital World', es: 'Mundo digital', ar: 'العالم الرقمي', ru: 'Цифровой мир', de: 'Digitale Welt', fr: 'Monde numérique' },
  'Arkadaşlık Önemli':     { en: 'Friendship is Important', es: 'La amistad es importante', ar: 'الصداقة مهمة', ru: 'Дружба важна', de: 'Freundschaft ist wichtig', fr: 'L\'amitié est importante' },
  'Antalya Tatili':        { en: 'Antalya Vacation', es: 'Vacaciones en Antalya', ar: 'إجازة في أنطاليا', ru: 'Отпуск в Анталье', de: 'Urlaub in Antalya', fr: 'Vacances à Antalya' },
  'Yeni Evimiz':           { en: 'Our New House', es: 'Nuestra nueva casa', ar: 'منزلنا الجديد', ru: 'Наш новый дом', de: 'Unser neues Haus', fr: 'Notre nouvelle maison' },
  'Boş Zamanlarım':        { en: 'My Free Time', es: 'Mi tiempo libre', ar: 'أوقات فراغي', ru: 'Моё свободное время', de: 'Meine Freizeit', fr: 'Mon temps libre' },
  'Yeni Bir Başlangıç':    { en: 'A New Beginning', es: 'Un nuevo comienzo', ar: 'بداية جديدة', ru: 'Новое начало', de: 'Ein neuer Anfang', fr: 'Un nouveau départ' },
  'Üniversite Yılları':    { en: 'University Years', es: 'Años universitarios', ar: 'سنوات الجامعة', ru: 'Университетские годы', de: 'Universitätsjahre', fr: 'Années universitaires' },
  'Sağlıklı Yaşam':        { en: 'Healthy Living', es: 'Vida saludable', ar: 'الحياة الصحية', ru: 'Здоровый образ жизни', de: 'Gesundes Leben', fr: 'Vie saine' },
  'Dijital Dönüşüm':      { en: 'Digital Transformation', es: 'Transformación digital', ar: 'التحول الرقمي', ru: 'Цифровая трансформация', de: 'Digitale Transformation', fr: 'Transformation numérique' },
  'Haberin Gücü':          { en: 'The Power of News', es: 'El poder de la noticia', ar: 'قوة الأخبار', ru: 'Сила новостей', de: 'Die Macht der Nachrichten', fr: 'Le pouvoir de l\'information' },
  'Gezegen İçin':          { en: 'For the Planet', es: 'Por el planeta', ar: 'من أجل الكوكب', ru: 'Ради планеты', de: 'Für den Planeten', fr: 'Pour la planète' },
  'Bütçe Yönetimi':        { en: 'Budget Management', es: 'Gestión del presupuesto', ar: 'إدارة الميزانية', ru: 'Управление бюджетом', de: 'Budgetverwaltung', fr: 'Gestion du budget' },
  'Gönüllü Olmak':         { en: 'Volunteering', es: 'Voluntariado', ar: 'التطوع', ru: 'Волонтёрство', de: 'Freiwilligenarbeit', fr: 'Bénévolat' },
  'Müze Gezisi':           { en: 'Museum Visit', es: 'Visita al museo', ar: 'زيارة المتحف', ru: 'Поход в музей', de: 'Museumsbesuch', fr: 'Visite au musée' },
  'Uzay Araştırmaları':    { en: 'Space Research', es: 'Investigación espacial', ar: 'أبحاث الفضاء', ru: 'Космические исследования', de: 'Weltraumforschung', fr: 'Recherche spatiale' },
  'Demokrasi ve Haklar':   { en: 'Democracy and Rights', es: 'Democracia y derechos', ar: 'الديمقراطية والحقوق', ru: 'Демократия и права', de: 'Demokratie und Rechte', fr: 'Démocratie et droits' },
  'Ekosistem Dengesi':     { en: 'Ecosystem Balance', es: 'Equilibrio del ecosistema', ar: 'توازن النظام البيئي', ru: 'Баланс экосистемы', de: 'Ökosystem-Gleichgewicht', fr: 'Équilibre de l\'écosystème' },
  'Küresel Ekonomi':       { en: 'Global Economy', es: 'Economía global', ar: 'الاقتصاد العالمي', ru: 'Мировая экономика', de: 'Globale Wirtschaft', fr: 'Économie mondiale' },
  'Sanatın Dili':          { en: 'The Language of Art', es: 'El lenguaje del arte', ar: 'لغة الفن', ru: 'Язык искусства', de: 'Die Sprache der Kunst', fr: 'Le langage de l\'art' },
  'İnsan Zihninin Derinlikleri':{ en: 'Depths of the Human Mind', es: 'Profundidades de la mente humana', ar: 'أعماق العقل البشري', ru: 'Глубины человеческого разума', de: 'Tiefen des menschlichen Geistes', fr: 'Les profondeurs de l\'esprit humain' },
  'Yapay Zekâ Çağı':       { en: 'The Age of AI', es: 'La era de la IA', ar: 'عصر الذكاء الاصطناعي', ru: 'Эпоха ИИ', de: 'Das Zeitalter der KI', fr: 'L\'ère de l\'IA' },
  'Modern Tıbbın Gelişimi':{ en: 'The Evolution of Modern Medicine', es: 'La evolución de la medicina moderna', ar: 'تطور الطب الحديث', ru: 'Эволюция современной медицины', de: 'Die Entwicklung der modernen Medizin', fr: 'L\'évolution de la médecine moderne' },
  'Toplumsal Dönüşüm':     { en: 'Social Transformation', es: 'Transformación social', ar: 'التحول الاجتماعي', ru: 'Социальная трансформация', de: 'Gesellschaftlicher Wandel', fr: 'Transformation sociale' },
  'Dilin Büyüsü':          { en: 'The Magic of Language', es: 'La magia del lenguaje', ar: 'سحر اللغة', ru: 'Магия языка', de: 'Die Magie der Sprache', fr: 'La magie du langage' },
  'Yakında eklenecek':     { en: 'Coming soon', es: 'Próximamente', ar: 'قريباً', ru: 'Скоро', de: 'Bald verfügbar', fr: 'Bientôt' },

  // === C1 Açıklamalar (desc) ===
  'Varoluşun Sorgulanması':          { en: 'Questioning Existence', es: 'Cuestionando la existencia', ar: 'استجواب الوجود', ru: 'Вопрошание о существовании', de: 'Die Befragung der Existenz', fr: 'Le questionnement de l\'existence' },
  'Uluslararası Hukukun Temelleri':  { en: 'Foundations of International Law', es: 'Fundamentos del derecho internacional', ar: 'أسس القانون الدولي', ru: 'Основы международного права', de: 'Grundlagen des Völkerrechts', fr: 'Les fondements du droit international' },
  'Kuantum Fiziğinin Sırları':       { en: 'Secrets of Quantum Physics', es: 'Secretos de la física cuántica', ar: 'أسرار فيزياء الكم', ru: 'Тайны квантовой физики', de: 'Geheimnisse der Quantenphysik', fr: 'Les secrets de la physique quantique' },
  'Türk Edebiyatının Dönüm Noktaları': { en: 'Turning Points of Turkish Literature', es: 'Puntos de inflexión de la literatura turca', ar: 'نقاط تحول الأدب التركي', ru: 'Поворотные моменты турецкой литературы', de: 'Wendepunkte der türkischen Literatur', fr: 'Les tournants de la littérature turque' },
  'Küresel Ticaret Savaşları':       { en: 'Global Trade Wars', es: 'Guerras comerciales globales', ar: 'حروب التجارة العالمية', ru: 'Глобальные торговые войны', de: 'Globale Handelskriege', fr: 'Les guerres commerciales mondiales' },
  'Bilinçdışının Gizli Dünyası':     { en: 'The Hidden World of the Unconscious', es: 'El mundo oculto del inconsciente', ar: 'العالم الخفي للاوعي', ru: 'Тайный мир бессознательного', de: 'Die verborgene Welt des Unbewussten', fr: 'Le monde caché de l\'inconscient' },
  'Dezenformasyon Çağı':             { en: 'The Age of Disinformation', es: 'La era de la desinformación', ar: 'عصر التضليل الإعلامي', ru: 'Эпоха дезинформации', de: 'Das Zeitalter der Desinformation', fr: 'L\'ère de la désinformation' },
  'Dijital Göçebelik':               { en: 'Digital Nomadism', es: 'Nomadismo digital', ar: 'الرحالة الرقميون', ru: 'Цифровой номадизм', de: 'Digitales Nomadentum', fr: 'Le nomadisme numérique' },
  'Sanatın Özerkliği Tartışması':    { en: 'The Debate on Art\'s Autonomy', es: 'El debate sobre la autonomía del arte', ar: 'جدل استقلالية الفن', ru: 'Дискуссия об автономии искусства', de: 'Die Debatte um die Autonomie der Kunst', fr: 'Le débat sur l\'autonomie de l\'art' },
  'Medeniyetlerin Yükselişi ve Çöküşü': { en: 'The Rise and Fall of Civilizations', es: 'El auge y caída de las civilizaciones', ar: 'صعود الحضارات وسقوطها', ru: 'Расцвет и падение цивилизаций', de: 'Aufstieg und Fall der Zivilisationen', fr: 'L\'essor et la chute des civilisations' },

  // === C2 Açıklamalar (desc) ===
  'Varlık ve Yokluk Arasında':       { en: 'Between Being and Nothingness', es: 'Entre el ser y la nada', ar: 'بين الوجود والعدم', ru: 'Между бытием и небытием', de: 'Zwischen Sein und Nichts', fr: 'Entre l\'être et le néant' },
  'Göstergebilimin Labirentleri':    { en: 'Labyrinths of Semiotics', es: 'Laberintos de la semiótica', ar: 'متاهات السيميائية', ru: 'Лабиринты семиотики', de: 'Labyrinthe der Semiotik', fr: 'Les labyrinthes de la sémiotique' },
  'Adalet Kavramının Evrimi':        { en: 'The Evolution of the Concept of Justice', es: 'La evolución del concepto de justicia', ar: 'تطور مفهوم العدالة', ru: 'Эволюция понятия справедливости', de: 'Die Evolution des Gerechtigkeitsbegriffs', fr: 'L\'évolution du concept de justice' },
  'Yapay Bilinç ve Tekillik':        { en: 'Artificial Consciousness and Singularity', es: 'Conciencia artificial y singularidad', ar: 'الوعي الاصطناعي والتفرد', ru: 'Искусственное сознание и сингулярность', de: 'Künstliches Bewusstsein und Singularität', fr: 'Conscience artificielle et singularité' },
  'Güzellik Kavramının Yapısökümü':  { en: 'Deconstruction of the Concept of Beauty', es: 'Deconstrucción del concepto de belleza', ar: 'تفكيك مفهوم الجمال', ru: 'Деконструкция понятия красоты', de: 'Dekonstruktion des Schönheitsbegriffs', fr: 'La déconstruction du concept de beauté' },
  'Zihnin Arkeolojisi':              { en: 'Archaeology of the Mind', es: 'Arqueología de la mente', ar: 'أركيولوجيا العقل', ru: 'Археология разума', de: 'Archäologie des Geistes', fr: 'L\'archéologie de l\'esprit' },
  'İkna Sanatının Anatomisi':        { en: 'Anatomy of the Art of Persuasion', es: 'Anatomía del arte de la persuasión', ar: 'تشريح فن الإقناع', ru: 'Анатомия искусства убеждения', de: 'Anatomie der Überzeugungskunst', fr: 'Anatomie de l\'art de la persuasion' },
  'Metnin Ötesinde':                 { en: 'Beyond the Text', es: 'Más allá del texto', ar: 'ما وراء النص', ru: 'По ту сторону текста', de: 'Jenseits des Textes', fr: 'Au-delà du texte' },
  'Ahlaki İkilemlerin Felsefesi':    { en: 'Philosophy of Moral Dilemmas', es: 'Filosofía de los dilemas morales', ar: 'فلسفة المعضلات الأخلاقية', ru: 'Философия моральных дилемм', de: 'Philosophie moralischer Dilemmata', fr: 'Philosophie des dilemmes moraux' },
  'Doğu ile Batı Arasında':          { en: 'Between East and West', es: 'Entre Oriente y Occidente', ar: 'بين الشرق والغرب', ru: 'Между Востоком и Западом', de: 'Zwischen Ost und West', fr: 'Entre Orient et Occident' },

  // === İçerik h3/h4 başlıkları ===
  'Sorular':               { en: 'Questions', es: 'Preguntas', ar: 'أسئلة', ru: 'Вопросы', de: 'Fragen', fr: 'Questions' },
};
// Reading levels data
const READING_LEVELS = {
  A1: [
    { title: 'Aile & İnsanlar', desc: 'Benim Ailem', content: `
      <h3>Benim Ailem / My Family</h3>
      <div class="grammar-example">
        <p>Benim adım Elif. Ben on yaşındayım. Ailem büyük. Annem, babam, bir ablam ve bir kardeşim var.</p>
        <p>Annemin adı Ayşe. O çok güzel yemek yapar. Babamın adı Mehmet. Babam öğretmen. Her gün okula gider.</p>
        <p>Ablam Zeynep on beş yaşında. O liseye gidiyor. Kardeşim Ali yedi yaşında. Ali çok küçük ama çok komik.</p>
        <p>Dedem ve ninem köyde yaşıyor. Yazın onlara gidiyoruz. Dedem bahçede çalışır, ninem güzel börek yapar.</p>
        <p>Biz mutlu bir aileyiz. Akşamları hep birlikte yemek yiyoruz ve televizyon izliyoruz.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Elif kaç yaşında?</td><td>How old is Elif?</td></tr>
        <tr><td>Babası ne iş yapıyor?</td><td>What does her father do?</td></tr>
        <tr><td>Dede ve nine nerede yaşıyor?</td><td>Where do grandparents live?</td></tr>
      </table></div>
    ` },
    { title: 'Ev & Odalar', desc: 'Evimiz', content: `
      <h3>Evimiz / Our House</h3>
      <div class="grammar-example">
        <p>Bizim evimiz büyük. Evde dört oda var: iki yatak odası, bir salon ve bir mutfak. Bir de banyomuz var.</p>
        <p>Salon çok geniş. Salonda bir kanepe, bir masa ve bir televizyon var. Duvarda güzel bir resim var.</p>
        <p>Benim odam küçük ama çok güzel. Odamda bir yatak, bir masa ve bir dolap var. Masada bilgisayarım var. Pencereden bahçeyi görüyorum.</p>
        <p>Mutfakta annem yemek yapıyor. Mutfakta bir buzdolabı, bir fırın ve bir masa var. Masada dört sandalye var.</p>
        <p>Evimizin bir de balconu var. Balkonda çiçekler var. Babam balkonda çay içmeyi çok seviyor.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Evde kaç oda var?</td><td>How many rooms are there?</td></tr>
        <tr><td>Salonda neler var?</td><td>What is in the living room?</td></tr>
        <tr><td>Babası balkonda ne yapıyor?</td><td>What does the father do on the balcony?</td></tr>
      </table></div>
    ` },
    { title: 'Yiyecekler & İçecekler', desc: 'Kahvaltı Zamanı', content: `
      <h3>Kahvaltı Zamanı / Breakfast Time</h3>
      <div class="grammar-example">
        <p>Her sabah saat yedide kalkıyorum. Önce yüzümü yıkıyorum, sonra kahvaltı yapıyorum.</p>
        <p>Türk kahvaltısı çok güzel. Kahvaltıda peynir, zeytin, domates ve salatalık var. Annem her sabah yumurta yapıyor. Ben yumurtayı çok seviyorum.</p>
        <p>Babam çay içiyor, annem kahve içiyor. Ben süt içiyorum. Ekmek ve bal da yiyoruz. Bazen annem börek yapıyor. Börek çok lezzetli!</p>
        <p>Kardeşim sadece ekmek ve reçel istiyor. O kahvaltıda çok az yiyor.</p>
        <p>Kahvaltıdan sonra okula gidiyorum. Çantamda bir elma ve bir sandviç var.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Kahvaltıda ne var?</td><td>What is there for breakfast?</td></tr>
        <tr><td>Babası ne içiyor?</td><td>What does the father drink?</td></tr>
        <tr><td>Kardeşi kahvaltıda ne yiyor?</td><td>What does the sibling eat?</td></tr>
      </table></div>
    ` },
    { title: 'Giysiler & Vücut', desc: 'Bugün Ne Giyeyim?', content: `
      <h3>Bugün Ne Giyeyim? / What Should I Wear Today?</h3>
      <div class="grammar-example">
        <p>Bugün hava soğuk. Dışarıda kar var. Ne giyeyim?</p>
        <p>Önce bir tişört giyiyorum. Sonra kalın bir kazak giyiyorum. Kazağım mavi, çok sıcak. Altıma bir pantolon giyiyorum. Pantolonumu siyah.</p>
        <p>Ayaklarıma kalın çorap ve bot giyiyorum. Çoraplarım beyaz. Botlarım kahverengi. Başıma bir bere takıyorum. Berem kırmızı.</p>
        <p>Ellerime eldiven takıyorum. Bir de kalın bir mont giyiyorum. Montum yeşil ve çok sıcak.</p>
        <p>Şimdi hazırım! Dışarıda kardan adam yapacağız. Çok heyecanlıyım!</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Hava nasıl?</td><td>How is the weather?</td></tr>
        <tr><td>Kazağı ne renk?</td><td>What color is the sweater?</td></tr>
        <tr><td>Dışarıda ne yapacaklar?</td><td>What will they do outside?</td></tr>
      </table></div>
    ` },
    { title: 'Yerler & Ulaşım', desc: 'Şehirde Bir Gün', content: `
      <h3>Şehirde Bir Gün / A Day in the City</h3>
      <div class="grammar-example">
        <p>Bugün cumartesi. Annemle şehre gidiyoruz. Otobüse biniyoruz. Otobüs durağı evimize yakın.</p>
        <p>Önce markete gidiyoruz. Marketten meyve, sebze ve ekmek alıyoruz. Sonra eczaneye gidiyoruz. Annem ilaç alıyor.</p>
        <p>Öğle yemeğini bir restoranda yiyoruz. Ben köfte ve pilav istiyorum. Annem salata ve çorba istiyor. Yemek çok güzel!</p>
        <p>Yemekten sonra parka gidiyoruz. Parkta çocuklar oynuyor. Ben de salıncağa biniyorum. Park çok güzel ve büyük.</p>
        <p>Akşam eve dönüyoruz. Bu sefer taksiye biniyoruz çünkü çok yorgunuz. Bugün çok güzel bir gündü!</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Şehre nasıl gidiyorlar?</td><td>How do they go to the city?</td></tr>
        <tr><td>Restoranda ne yiyorlar?</td><td>What do they eat at the restaurant?</td></tr>
        <tr><td>Eve nasıl dönüyorlar?</td><td>How do they return home?</td></tr>
      </table></div>
    ` },
    { title: 'Doğa & Hava', desc: 'Dört Mevsim', content: `
      <h3>Dört Mevsim / Four Seasons</h3>
      <div class="grammar-example">
        <p>Türkiye'de dört mevsim var: ilkbahar, yaz, sonbahar ve kış.</p>
        <p>İlkbaharda hava güzel oluyor. Çiçekler açıyor, ağaçlar yeşeriyor. Kuşlar şarkı söylüyor. Hava sıcak değil, soğuk değil.</p>
        <p>Yazın hava çok sıcak. Güneş parlıyor. İnsanlar denize gidiyor ve yüzüyor. Ben dondurma yemeyi çok seviyorum. Yaz tatili çok güzel!</p>
        <p>Sonbaharda yapraklar sarı ve turuncu oluyor. Hava serin. Bazen yağmur yağıyor. Rüzgâr esiyor ve yapraklar düşüyor.</p>
        <p>Kışın hava çok soğuk. Bazen kar yağıyor. Dağlarda kar var. Biz evde kalıyoruz ve sıcak çorba içiyoruz.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>İlkbaharda hava nasıl?</td><td>How is the weather in spring?</td></tr>
        <tr><td>Yazın insanlar ne yapıyor?</td><td>What do people do in summer?</td></tr>
        <tr><td>Sonbaharda yapraklar ne renk oluyor?</td><td>What color are the leaves in autumn?</td></tr>
      </table></div>
    ` },
    { title: 'Zaman & Sayılar', desc: 'Benim Günüm', content: `
      <h3>Benim Günüm / My Day</h3>
      <div class="grammar-example">
        <p>Ben her gün saat yedide kalkıyorum. Yüzümü yıkıyorum ve dişlerimi fırçalıyorum. Saat yedi buçukta kahvaltı yapıyorum.</p>
        <p>Saat sekizde evden çıkıyorum. Okul saat sekiz buçukta başlıyor. Beş ders var. Her ders kırk dakika. İlk ders matematik, sonra Türkçe var.</p>
        <p>Saat on ikide öğle yemeği yiyorum. Arkadaşlarımla kantinde yemek yiyoruz. Öğleden sonra iki ders daha var.</p>
        <p>Saat üçte okul bitiyor. Eve geliyorum ve biraz dinleniyorum. Saat dörtte ödev yapıyorum. Saat beşte dışarıda oynuyorum.</p>
        <p>Akşam saat yedide yemek yiyoruz. Saat sekizde televizyon izliyorum. Saat dokuzda yatıyorum. İyi geceler!</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Okul saat kaçta başlıyor?</td><td>What time does school start?</td></tr>
        <tr><td>Kaç ders var?</td><td>How many classes are there?</td></tr>
        <tr><td>Akşam saat kaçta yatıyor?</td><td>What time does he/she go to bed?</td></tr>
      </table></div>
    ` },
    { title: 'Okul & İş', desc: 'Okulumuz', content: `
      <h3>Okulumuz / Our School</h3>
      <div class="grammar-example">
        <p>Okulumuzun adı Atatürk İlkokulu. Okul çok büyük. Okulda otuz sınıf var. Bahçesi de çok geniş.</p>
        <p>Benim sınıfımda yirmi beş öğrenci var: on üç kız, on iki erkek. Öğretmenimizin adı Fatma Hanım. O çok iyi bir öğretmen.</p>
        <p>Her gün beş ders var. Matematik, Türkçe, fen bilgisi, sosyal bilgiler ve beden eğitimi. Ben en çok beden eğitimini seviyorum çünkü futbol oynuyoruz.</p>
        <p>Teneffüste arkadaşlarımla oynuyorum. Kantinden simit ve ayran alıyorum. Kütüphanede kitap okuyorum.</p>
        <p>Okuldan sonra eve gidiyorum. Ödevlerimi yapıyorum. Yarın yine okula gideceğim!</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Sınıfta kaç öğrenci var?</td><td>How many students are there?</td></tr>
        <tr><td>En çok hangi dersi seviyor?</td><td>Which class does he/she like most?</td></tr>
        <tr><td>Teneffüste ne yapıyor?</td><td>What does he/she do during break?</td></tr>
      </table></div>
    ` },
    { title: 'Duygular & Renkler', desc: 'Mutlu Bir Gün', content: `
      <h3>Mutlu Bir Gün / A Happy Day</h3>
      <div class="grammar-example">
        <p>Bugün çok mutluyum çünkü benim doğum günüm! Ben bugün dokuz yaşına giriyorum.</p>
        <p>Sabah kalktım ve çok heyecanlıydım. Annem güzel bir pasta yaptı. Pasta beyaz ve pembe. Üzerinde dokuz mum var.</p>
        <p>Arkadaşlarım eve geldi. Herkes çok neşeli. Hediyeler aldılar. Ayşe bana kırmızı bir kitap verdi. Mehmet mavi bir top verdi. Çok sevindim!</p>
        <p>Bahçede oyunlar oynadık. Müzik dinledik ve dans ettik. Hava güneşli ve sıcaktı. Gökyüzü masmaviydi.</p>
        <p>Akşam çok yorgundum ama çok mutluydum. Bu en güzel doğum günüm! Herkes çok eğlendi. Teşekkürler arkadaşlarım!</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Neden mutlu?</td><td>Why is he/she happy?</td></tr>
        <tr><td>Pasta ne renk?</td><td>What color is the cake?</td></tr>
        <tr><td>Ayşe ne hediye verdi?</td><td>What gift did Ayşe give?</td></tr>
      </table></div>
    ` },
    { title: 'Günlük Eşyalar', desc: 'Çantamda Ne Var?', content: `
      <h3>Çantamda Ne Var? / What's in My Bag?</h3>
      <div class="grammar-example">
        <p>Her sabah çantamı hazırlıyorum. Çantam büyük ve mavi. İçinde çok şey var.</p>
        <p>Çantamda üç defter var: bir matematik defteri, bir Türkçe defteri ve bir fen defteri. Defterlerin yanında kalemlerim var. İki kurşun kalem ve üç renkli kalem. Bir de silgim ve bir kalemtıraşım var.</p>
        <p>Kitaplarım da çantamda. Bugün iki kitap var: matematik kitabı ve Türkçe kitabı. Kitaplar biraz ağır.</p>
        <p>Küçük bir cebinde cep telefonum var ama okulda kullanmıyorum. Bir de anahtarım var. Anahtarımı kaybetmiyorum çünkü çantanın cebinde duruyor.</p>
        <p>Su şişem de çantamda. Okulda çok su içiyorum. Çantam hazır, ben de hazırım. Okula gidiyorum!</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Çantası ne renk?</td><td>What color is the bag?</td></tr>
        <tr><td>Kaç defter var?</td><td>How many notebooks are there?</td></tr>
        <tr><td>Cep telefonunu okulda kullanıyor mu?</td><td>Does he/she use the phone at school?</td></tr>
      </table></div>
    ` }
  ],
  A2: [
    { title: 'Meslekler & Toplum', desc: 'Herkesin Bir Mesleği Var', content: `
      <h3>Herkesin Bir Mesleği Var / Everyone Has a Profession</h3>
      <div class="grammar-example">
        <p>Bizim mahallede birçok farklı meslek var. Komşumuz Ahmet Bey avukat. Her gün mahkemeye gidiyor ve insanlara yardım ediyor.</p>
        <p>Karşı komşumuz Ayşe Hanım hemşire. Hastanede çalışıyor. Bazen gece nöbeti tutuyor. O çok fedakâr bir insan.</p>
        <p>Babamın arkadaşı Kemal Amca mühendis. Büyük bir fabrikada çalışıyor. Yeni makineler tasarlıyor. Maaşı çok iyi ama işi çok zor.</p>
        <p>Mahallemizde bir de berber var. Berber Ali çok iyi saç kesiyor. Müşterileri onu çok seviyor. Dükkânı her zaman kalabalık.</p>
        <p>Toplumda herkesin bir görevi var. Polis güvenliği sağlıyor, gazeteci haberleri yazıyor, aşçı yemek yapıyor. Her meslek önemli ve değerli.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Ahmet Bey ne iş yapıyor?</td><td>What does Ahmet Bey do?</td></tr>
        <tr><td>Ayşe Hanım nerede çalışıyor?</td><td>Where does Ayşe Hanım work?</td></tr>
        <tr><td>Berber Ali'nin dükkânı nasıl?</td><td>How is Barber Ali's shop?</td></tr>
      </table></div>
    ` },
    { title: 'Sağlık & Vücut', desc: 'Doktora Gittim', content: `
      <h3>Doktora Gittim / I Went to the Doctor</h3>
      <div class="grammar-example">
        <p>Geçen hafta çok hastaydım. Ateşim vardı ve başım çok ağrıyordu. Boğazım da şişmişti. Annem beni hastaneye götürdü.</p>
        <p>Doktor beni muayene etti. Boğazıma, kulaklarıma ve gözlerime baktı. Kan tahlili yaptırdı. Sonra "Grip olmuşsun" dedi.</p>
        <p>Doktor bir reçete yazdı. Eczaneden üç çeşit ilaç aldık. Bir tanesi ateş düşürücü, diğeri antibiyotik. Bir de boğaz spreyi aldık.</p>
        <p>Doktor bana diyet önerdi. "Çok su iç, sebze çorbası ye, bol bol dinlen" dedi. Ayrıca her gün egzersiz yapmamı istedi ama önce iyileşmem gerekiyordu.</p>
        <p>Bir hafta sonra tamamen iyileştim. Artık her gün egzersiz yapıyorum ve sağlığıma dikkat ediyorum. Sağlık gerçekten çok önemli.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Doktor ne teşhis koydu?</td><td>What did the doctor diagnose?</td></tr>
        <tr><td>Eczaneden kaç çeşit ilaç aldılar?</td><td>How many types of medicine did they buy?</td></tr>
        <tr><td>Doktor ne önerdi?</td><td>What did the doctor recommend?</td></tr>
      </table></div>
    ` },
    { title: 'Alışveriş & Ekonomi', desc: 'Alışveriş Merkezinde', content: `
      <h3>Alışveriş Merkezinde / At the Shopping Mall</h3>
      <div class="grammar-example">
        <p>Bugün annemle alışveriş merkezine gittik. Büyük bir indirim vardı. Birçok mağaza yüzde elli indirim yapıyordu.</p>
        <p>Önce bir giyim mağazasına girdik. Annem bir elbise beğendi. Fiyatı çok uygundu. Kasada kredi kartıyla ödeme yaptı. Fiş istemeyi unutmadı.</p>
        <p>Sonra benim için ayakkabı baktık. Numaram kırk iki. Güzel bir spor ayakkabı buldum. Markası çok ünlüydü ama fiyatı pahalıydı. Biraz pazarlık yaptık.</p>
        <p>Öğle yemeğinden sonra bankaya gittik. Annem fatura ödedi. Elektrik faturası çok yüksekti. Sonra internetten sipariş verdiğimiz ürünlerin kargosunu sorduk.</p>
        <p>Akşam eve döndüğümüzde çok yorgundum ama mutluydum. Alışveriş yapmayı seviyorum ama borcum olmasını sevmiyorum.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Mağazalarda ne kadar indirim vardı?</td><td>How much discount did the stores have?</td></tr>
        <tr><td>Annem nasıl ödeme yaptı?</td><td>How did the mother pay?</td></tr>
        <tr><td>Bankada ne yaptılar?</td><td>What did they do at the bank?</td></tr>
      </table></div>
    ` },
    { title: 'Yemek & Mutfak', desc: 'Anneannemin Tarifi', content: `
      <h3>Anneannemin Tarifi / My Grandmother's Recipe</h3>
      <div class="grammar-example">
        <p>Bugün anneannemden karnıyarık tarifi öğrendim. Malzemeleri hazırladık: patlıcan, kıyma, soğan, sarımsak, domates ve biber.</p>
        <p>Önce patlıcanları yıkadık ve kabuklerını soydum. Sonra yağda kızarttık. Anneannem kıymayı ayrı bir tavada pişirdi. Soğanı ve sarımsağı doğradı ve ekledi.</p>
        <p>Baharat olarak tuz, karabiber ve pul biber koyduk. Anneannem "İyi yemek yapmak için taze malzeme kullanmalısın" dedi. Salçayı da ekledi.</p>
        <p>Patlıcanları tepsiye dizdik. Üzerine kıymalı harcı koyduk. Fırında otuz dakika pişirdik. Yemek çok lezzetli oldu!</p>
        <p>Akşam yemeğinde aileyle birlikte yedik. Herkes çok beğendi. Yanında pilav ve cacık vardı. Anneannem dünyanın en iyi aşçısı!</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Hangi yemeğin tarifini öğrendi?</td><td>Which recipe did they learn?</td></tr>
        <tr><td>Hangi baharatları koydular?</td><td>Which spices did they add?</td></tr>
        <tr><td>Yemeğin yanında ne vardı?</td><td>What was served with the dish?</td></tr>
      </table></div>
    ` },
    { title: 'Eğitim & Kariyer', desc: 'Üniversite Hayalim', content: `
      <h3>Üniversite Hayalim / My University Dream</h3>
      <div class="grammar-example">
        <p>Ben lise son sınıf öğrencisiyim. Bu yıl üniversite sınavına gireceğim. Çok heyecanlıyım ama aynı zamanda endişeliyim.</p>
        <p>Her gün dershaneye gidiyorum. Matematik, fizik ve kimya çalışıyorum. Öğretmenim çok iyi. Bize sınav teknikleri öğretiyor.</p>
        <p>Hayalim tıp fakültesine girmek. Doktor olmak istiyorum çünkü insanlara yardım etmeyi seviyorum. Babam mühendis olmamı istiyor ama kararım kesin.</p>
        <p>Arkadaşım Elif hukuk fakültesine gitmek istiyor. O avukat olmak istiyor. Diğer arkadaşım Murat ise işletme okuyacak. Herkesin farklı bir hayali var.</p>
        <p>Sınavdan sonra mezuniyet töreni olacak. Diplomamı alacağım ve yeni bir hayata başlayacağım. Başarmak için çok çalışmam gerekiyor.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Hangi fakülteye girmek istiyor?</td><td>Which faculty does he/she want to enter?</td></tr>
        <tr><td>Arkadaşı Elif ne olmak istiyor?</td><td>What does his/her friend Elif want to be?</td></tr>
        <tr><td>Sınavdan sonra ne olacak?</td><td>What will happen after the exam?</td></tr>
      </table></div>
    ` },
    { title: 'Teknoloji & İletişim', desc: 'Dijital Dünya', content: `
      <h3>Dijital Dünya / Digital World</h3>
      <div class="grammar-example">
        <p>Teknoloji hayatımızı çok değiştirdi. Artık herkesin bir akıllı telefonu var. İnternetsiz bir gün geçirmek çok zor.</p>
        <p>Ben her gün sosyal medya kullanıyorum. Arkadaşlarımla mesaj atıyorum, fotoğraf paylaşıyorum. Bazen video izliyorum. Ama çok fazla zaman harcamamaya dikkat ediyorum.</p>
        <p>Babam bilgisayarda çalışıyor. E-posta gönderiyor ve toplantılara katılıyor. Annem ise internetten alışveriş yapmayı seviyor. Siparişler kargo ile eve geliyor.</p>
        <p>Okulda da teknolojiyi kullanıyoruz. Öğretmenimiz tahtada sunum yapıyor. Biz tabletlerden ders çalışıyoruz. Ödevlerimizi bazen internetten araştırarak yapıyoruz.</p>
        <p>Teknoloji çok faydalı ama dikkatli kullanmak gerekiyor. Şifrelerimizi kimseyle paylaşmamalıyız. Bilgilerimizi korumalıyız.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Sosyal medyada ne yapıyor?</td><td>What does he/she do on social media?</td></tr>
        <tr><td>Babası bilgisayarda ne yapıyor?</td><td>What does the father do on the computer?</td></tr>
        <tr><td>Teknolojiyi kullanırken nelere dikkat etmeli?</td><td>What should one be careful about when using technology?</td></tr>
      </table></div>
    ` },
    { title: 'Duygular & İlişkiler', desc: 'Arkadaşlık Önemli', content: `
      <h3>Arkadaşlık Önemli / Friendship is Important</h3>
      <div class="grammar-example">
        <p>Benim en yakın arkadaşım Selin. Onu ilkokuldan beri tanıyorum. Birlikte çok güzel anılarımız var. O benim için çok değerli.</p>
        <p>Geçen ay Selin ile tartıştık. Çok kızdım ve üzüldüm. Birbirimizle konuşmadık. O günler çok zordu. Kendimi yalnız hissettim.</p>
        <p>Bir hafta sonra Selin bana bir mektup yazdı. "Seni çok özledim, lütfen beni affet" dedi. Ben de çok duygulandım. Hemen onu aradım ve barıştık.</p>
        <p>Şimdi eskisinden daha güçlü bir arkadaşlığımız var. Birbirimize güveniyoruz ve saygı duyuyoruz. Sorunları konuşarak çözmeyi öğrendik.</p>
        <p>Gerçek arkadaşlık çok kıymetli. İyi günde de kötü günde de yanında olan insanlar gerçek arkadaştır. Ben Selin'e çok minnettarım.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Selin ile ne zaman tanıştılar?</td><td>When did they meet Selin?</td></tr>
        <tr><td>Tartıştıktan sonra ne oldu?</td><td>What happened after they argued?</td></tr>
        <tr><td>Gerçek arkadaşlık nasıl olur?</td><td>What is true friendship like?</td></tr>
      </table></div>
    ` },
    { title: 'Seyahat & Konaklama', desc: 'Antalya Tatili', content: `
      <h3>Antalya Tatili / Antalya Vacation</h3>
      <div class="grammar-example">
        <p>Bu yaz ailecek Antalya'ya tatile gittik. Uçakla iki saat sürdü. Havalimanından otele taksiye bindik.</p>
        <p>Otelimiz deniz kenarındaydı. Güzel bir odamız vardı. Odada klima, televizyon ve balkon vardı. Balkondan denizi görebiliyorduk.</p>
        <p>Her sabah otelin restoranında kahvaltı yaptık. Açık büfe kahvaltı çok güzeldi. Peynir, zeytin, yumurta, meyve ve taze ekmek vardı.</p>
        <p>Gündüzleri denizde yüzdük ve kumsalda güneşlendik. Bir gün tekne turu yaptık. Turkuaz renkli koyları gezdik. Çok etkileyiciydi.</p>
        <p>Akşamları eski şehri gezdik. Hediyelik eşya aldık ve Türk dondurması yedik. Bir hafta çok çabuk geçti. Dönmek istemiyorduk ama güzel anılarla eve döndük.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Antalya'ya nasıl gittiler?</td><td>How did they go to Antalya?</td></tr>
        <tr><td>Otelde neler vardı?</td><td>What was in the hotel?</td></tr>
        <tr><td>Akşamları ne yaptılar?</td><td>What did they do in the evenings?</td></tr>
      </table></div>
    ` },
    { title: 'Ev & Yaşam', desc: 'Yeni Evimiz', content: `
      <h3>Yeni Evimiz / Our New House</h3>
      <div class="grammar-example">
        <p>Geçen ay yeni bir eve taşındık. Eski evimiz küçüktü, yeni evimiz çok daha geniş. Üç yatak odası, büyük bir salon ve geniş bir mutfak var.</p>
        <p>Taşınmak çok yorucuydu. Eşyaları kutulara koyduk. Nakliyeciler büyük mobilyaları taşıdı. Annem her şeyi düzenledi. Perdeleri taktı ve halıları serdi.</p>
        <p>Benim yeni odam çok güzel. Penceresi büyük ve güneş giriyor. Yeni bir çalışma masası aldık. Kitaplığımı duvarın yanına koydum. Odamı kendim boyadım, maviye.</p>
        <p>Mutfağımız artık çok büyük. Yeni bir buzdolabı ve fırın aldık. Annem mutfakta yemek yapmaya bayılıyor. Balkonda da çiçek yetiştirmeye başladı.</p>
        <p>Yeni komşularımız çok iyi. Bize hoş geldin dediler ve pasta getirdiler. Mahallede bir park var, akşamları orada yürüyüş yapıyoruz. Yeni evimizi çok sevdik.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Yeni evde kaç yatak odası var?</td><td>How many bedrooms does the new house have?</td></tr>
        <tr><td>Odasını ne renge boyadı?</td><td>What color did he/she paint the room?</td></tr>
        <tr><td>Komşuları ne yaptı?</td><td>What did the neighbors do?</td></tr>
      </table></div>
    ` },
    { title: 'Spor & Hobiler', desc: 'Boş Zamanlarım', content: `
      <h3>Boş Zamanlarım / My Free Time</h3>
      <div class="grammar-example">
        <p>Boş zamanlarımda farklı aktiviteler yapıyorum. En çok futbol oynamayı seviyorum. Haftada iki gün antrenman yapıyoruz. Takımımız çok iyi.</p>
        <p>Futboldan başka yüzmeyi de seviyorum. Yazın denizde, kışın kapalı havuzda yüzüyorum. Yüzmek hem eğlenceli hem sağlıklı. Egzersiz olarak da çok iyi.</p>
        <p>Hafta sonları bazen bisiklete biniyorum. Arkadaşlarımla parkta tur atıyoruz. Geçen hafta dağa tırmandık. Çok yorulduk ama manzara harikaydı.</p>
        <p>Spor yapmadığım zamanlarda kitap okuyorum. Roman ve macera kitaplarını seviyorum. Bazen de resim çiziyorum. Resim yapmak beni sakinleştiriyor.</p>
        <p>Ayrıca gitar çalmayı öğreniyorum. Haftada bir gün müzik dersine gidiyorum. Henüz çok iyi çalamıyorum ama her gün pratik yapıyorum. Bir gün sahneye çıkmak istiyorum!</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Haftada kaç gün antrenman yapıyor?</td><td>How many days a week does he/she train?</td></tr>
        <tr><td>Kışın nerede yüzüyor?</td><td>Where does he/she swim in winter?</td></tr>
        <tr><td>Hangi enstrümanı öğreniyor?</td><td>Which instrument is he/she learning?</td></tr>
      </table></div>
    ` }
  ],
  B1: [
    { title: 'İş & Kariyer', desc: 'Yeni Bir Başlangıç', content: `
      <h3>Yeni Bir Başlangıç / A New Beginning</h3>
      <div class="grammar-example">
        <p>Üniversiteden mezun olduktan sonra iş aramaya başladım. İnternette birçok iş ilanına başvuru yaptım. Özgeçmişimi dikkatle hazırladım ve her başvuruya özel bir ön yazı ekledim.</p>
        <p>İki hafta sonra büyük bir şirketten mülakat daveti aldım. Çok heyecanlıydım ama aynı zamanda endişeliydim. Mülakat öncesi şirket hakkında araştırma yaptım ve olası soruları pratik ettim.</p>
        <p>Mülakat günü erkenden kalktım ve takım elbisemi giydim. İnsan kaynakları müdürü beni karşıladı. Önce deneyimlerim hakkında sorular sordu, sonra projelerimden bahsetmemi istedi.</p>
        <p>Bir hafta sonra telefon geldi: işe kabul edilmiştim! Maaş ve çalışma koşullarını görüştük. Sözleşmeyi imzaladım ve ertesi pazartesi işe başladım.</p>
        <p>İlk günler zor geçti. Yeni görevleri öğrenmem gerekiyordu. Ama meslektaşlarım çok yardımseverdi. Üç ay sonra ilk performans değerlendirmem çok olumlu geçti ve terfi aldım.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>İş bulmak için neler yaptı?</td><td>What did he/she do to find a job?</td></tr>
        <tr><td>Mülakata nasıl hazırlandı?</td><td>How did he/she prepare for the interview?</td></tr>
        <tr><td>İlk performans değerlendirmesi nasıl geçti?</td><td>How did the first performance review go?</td></tr>
      </table></div>
    ` },
    { title: 'Eğitim & Akademi', desc: 'Üniversite Yılları', content: `
      <h3>Üniversite Yılları / University Years</h3>
      <div class="grammar-example">
        <p>Üniversiteye girdiğimde her şey çok farklıydı. Liseye kıyasla daha fazla sorumluluk almam gerekiyordu. Ders programımı kendim hazırlıyordum ve devamsızlık hakkım sınırlıydı.</p>
        <p>Bölümümde birçok zorunlu ve seçmeli ders vardı. Özellikle araştırma yöntemleri dersi çok zordu ama çok faydalıydı. Kütüphanede saatler geçiriyordum. Akademisyenlerimiz alanında uzman insanlardı.</p>
        <p>Üçüncü sınıfta bir staj programına katıldım. Staj, teorik bilgilerimi uygulamaya dönüştürmemi sağladı. Laboratuvarda deneyler yaptık ve sonuçları raporladık.</p>
        <p>Son sınıfta tez yazmaya başladım. Danışmanım konumu seçmemde bana yardım etti. Altı ay boyunca araştırma yaptım, veri topladım ve analiz ettim. Tez savunması çok heyecan vericiydi.</p>
        <p>Mezuniyet töreninde diplomamı aldığımda çok gururluydum. Üniversite yılları hayatımın en güzel dönemlerinden biriydi. Hem akademik hem de sosyal açıdan çok şey öğrendim.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Üniversite liseye göre nasıl farklıydı?</td><td>How was university different from high school?</td></tr>
        <tr><td>Staj programı ne sağladı?</td><td>What did the internship program provide?</td></tr>
        <tr><td>Tez süreci nasıl geçti?</td><td>How did the thesis process go?</td></tr>
      </table></div>
    ` },
    { title: 'Sağlık & Tıp', desc: 'Sağlıklı Yaşam', content: `
      <h3>Sağlıklı Yaşam / Healthy Living</h3>
      <div class="grammar-example">
        <p>Geçen yıl sağlık kontrolüne gittiğimde doktor bazı uyarılarda bulundu. Kolesterol seviyem yüksekti ve kilolu olduğumu söyledi. Bir diyet programı ve egzersiz planı önerdi.</p>
        <p>Önce beslenme alışkanlıklarımı değiştirdim. Hazır gıdaları bıraktım ve taze sebze, meyve tüketmeye başladım. Şekerli içecekler yerine su ve bitki çayı içmeye başladım.</p>
        <p>Haftada üç gün spor salonuna gidiyorum. Kardiyo egzersizleri ve ağırlık antrenmanı yapıyorum. Başlangıçta çok zorlanıyordum ama zamanla alıştım. Bazen de açık havada koşu yapıyorum.</p>
        <p>Düzenli uyku da çok önemli. Artık her gece en az yedi saat uyumaya dikkat ediyorum. Stresi azaltmak için meditasyon yapmaya başladım. Bu beni çok rahatlatıyor.</p>
        <p>Altı ay sonra tekrar muayeneye gittim. Doktor sonuçlardan çok memnun kaldı. On kilo vermiştim ve kolesterol seviyem normale dönmüştü. Sağlıklı yaşam gerçekten hayatı değiştiriyor.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Doktor hangi uyarıları yaptı?</td><td>What warnings did the doctor give?</td></tr>
        <tr><td>Beslenme alışkanlıklarını nasıl değiştirdi?</td><td>How did he/she change eating habits?</td></tr>
        <tr><td>Altı ay sonra sonuçlar nasıldı?</td><td>What were the results after six months?</td></tr>
      </table></div>
    ` },
    { title: 'Teknoloji & Bilişim', desc: 'Dijital Dönüşüm', content: `
      <h3>Dijital Dönüşüm / Digital Transformation</h3>
      <div class="grammar-example">
        <p>Şirketimiz geçen yıl büyük bir dijital dönüşüm sürecine girdi. Eski sistemleri kaldırıp yeni yazılımlar kurmamız gerekiyordu. Bu süreç herkes için zorlayıcıydı.</p>
        <p>Önce tüm verileri bulut sistemine taşıdık. Veritabanlarını güncelleme işlemi haftalarca sürdü. Bilgi teknolojileri ekibi gece gündüz çalıştı. Sunucu güvenliği konusunda uzmanlardan destek aldık.</p>
        <p>Çalışanlara yeni uygulamaları kullanmaları için eğitim verdik. Bazı meslektaşlarım başlangıçta direndi ama sonunda herkes adapte oldu. Video konferans ve uzaktan çalışma araçlarını kullanmayı öğrendik.</p>
        <p>Siber güvenlik konusunda da önemli adımlar attık. Güçlü şifre politikası uyguladık ve iki faktörlü kimlik doğrulama sistemi kurduk. Düzenli yedekleme yapıyoruz.</p>
        <p>Dönüşüm tamamlandığında verimlilik yüzde otuz arttı. Müşteri memnuniyeti de yükseldi. Teknolojiye yatırım yapmanın ne kadar önemli olduğunu bir kez daha anladık.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Dijital dönüşüm neden gerekliydi?</td><td>Why was digital transformation necessary?</td></tr>
        <tr><td>Siber güvenlik için ne yapıldı?</td><td>What was done for cybersecurity?</td></tr>
        <tr><td>Dönüşüm sonucunda ne değişti?</td><td>What changed as a result of the transformation?</td></tr>
      </table></div>
    ` },
    { title: 'Medya & İletişim', desc: 'Haberin Gücü', content: `
      <h3>Haberin Gücü / The Power of News</h3>
      <div class="grammar-example">
        <p>Günümüzde haberlere ulaşmak hiç olmadığı kadar kolay. Gazete, televizyon, radyo ve internet gibi birçok kaynaktan bilgi edinebiliyoruz. Ancak bu kadar çok kaynağın olması bazı sorunları da beraberinde getiriyor.</p>
        <p>Sosyal medyada paylaşılan her haber doğru olmayabilir. Yanlış bilgi çok hızlı yayılabiliyor. Bu yüzden haberleri okurken eleştirel düşünmek ve kaynağı kontrol etmek çok önemli.</p>
        <p>Gazetecilerin büyük bir sorumluluğu var. Haberleri tarafsız ve doğru şekilde aktarmalılar. Röportaj yaparken objektif sorular sormalı ve farklı bakış açılarını sunmalılar.</p>
        <p>Medya okuryazarlığı artık eğitim müfredatında yer alıyor. Öğrenciler güvenilir kaynaklardan bilgi edinmeyi, reklam ve haberi ayırt etmeyi öğreniyorlar.</p>
        <p>Ben her sabah birkaç farklı kaynaktan haberleri takip ediyorum. Tek bir kaynağa bağımlı olmamaya dikkat ediyorum. Herkesin medyayı bilinçli kullanması toplum için çok önemli.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Çok fazla haber kaynağının sorunu ne?</td><td>What is the problem with too many news sources?</td></tr>
        <tr><td>Gazetecilerin sorumluluğu ne?</td><td>What is the responsibility of journalists?</td></tr>
        <tr><td>Medya okuryazarlığı neden önemli?</td><td>Why is media literacy important?</td></tr>
      </table></div>
    ` },
    { title: 'Çevre & Doğa', desc: 'Gezegen İçin', content: `
      <h3>Gezegen İçin / For the Planet</h3>
      <div class="grammar-example">
        <p>İklim değişikliği dünyamızın en büyük sorunlarından biri. Sıcaklıklar yükseliyor, buzullar eriyor ve deniz seviyesi artıyor. Bilim insanları durumun giderek kötüleşeceği konusunda uyarıyor.</p>
        <p>Çevre kirliliği de ciddi bir tehdit. Fabrikalardaki atıklar nehirleri ve denizleri kirletiyor. Plastik atıklar okyanuslarda büyük bir sorun oluşturuyor. Hayvanlar bu kirliliğin en büyük kurbanları.</p>
        <p>Geri dönüşüm konusunda toplumun bilinçlenmesi gerekiyor. Kağıt, cam, plastik ve metal atıkları ayrı toplamak çok önemli. Belediyeler geri dönüşüm kutularını artırmalı ve vatandaşları bilgilendirmeli.</p>
        <p>Yenilenebilir enerji kaynakları geleceğin çözümü. Güneş enerjisi ve rüzgâr enerjisi fosil yakıtlara alternatif olarak hızla yaygınlaşıyor. Birçok ülke bu alanda büyük yatırımlar yapıyor.</p>
        <p>Bireysel olarak da yapabileceğimiz çok şey var. Toplu taşıma kullanmak, enerji tasarrufu yapmak ve su tüketimini azaltmak gezegenimiz için önemli adımlar. Gelecek nesiller için sorumluluğumuz büyük.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>İklim değişikliğinin etkileri neler?</td><td>What are the effects of climate change?</td></tr>
        <tr><td>Geri dönüşüm için ne yapılmalı?</td><td>What should be done for recycling?</td></tr>
        <tr><td>Bireysel olarak neler yapılabilir?</td><td>What can be done individually?</td></tr>
      </table></div>
    ` },
    { title: 'Ekonomi & Finans', desc: 'Bütçe Yönetimi', content: `
      <h3>Bütçe Yönetimi / Budget Management</h3>
      <div class="grammar-example">
        <p>İlk maaşımı aldığımda çok mutluydum ama parayı nasıl yöneteceğimi bilmiyordum. Ay sonuna gelmeden param bitiyordu. Bir arkadaşım bütçe planı yapmamı önerdi.</p>
        <p>Önce aylık gelirimi ve giderlerimi listeledim. Kira, faturalar ve market harcamalarım sabit giderlerdi. Eğlence, kıyafet ve dışarıda yemek yeme gibi değişken giderlerim de vardı.</p>
        <p>Bir tasarruf hesabı açtım ve her ay maaşımın yüzde yirmisini kenara ayırmaya başladım. Gereksiz harcamaları kıstım. Kahve almak yerine evde yapıyordum. Alışverişte indirim günlerini takip ediyordum.</p>
        <p>Yatırım konusunda da bilgi edinmeye başladım. Borsa, tahvil ve mevduat hesapları hakkında okuma yaptım. Küçük miktarlarla yatırım fonlarına başladım. Riskleri dağıtmak önemliydi.</p>
        <p>Bir yıl sonra acil durum fonu oluşturmuştum. Kredi kartı borcum yoktu ve düzenli birikim yapıyordum. Finansal okuryazarlık herkesin öğrenmesi gereken bir beceri.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>İlk maaşında ne sorun yaşadı?</td><td>What problem did he/she have with the first salary?</td></tr>
        <tr><td>Tasarruf için neler yaptı?</td><td>What did he/she do to save?</td></tr>
        <tr><td>Bir yıl sonra ne başardı?</td><td>What did he/she achieve after a year?</td></tr>
      </table></div>
    ` },
    { title: 'Toplum & Sosyal', desc: 'Gönüllü Olmak', content: `
      <h3>Gönüllü Olmak / Volunteering</h3>
      <div class="grammar-example">
        <p>Üniversitede bir sivil toplum kuruluşuna katıldım. Bu deneyim hayatıma çok şey kattı. Her hafta sonu dezavantajlı çocuklara ders yardımı yapıyorduk.</p>
        <p>Projemizin amacı eğitime erişimi olmayan çocuklara destek olmaktı. Matematik, Türkçe ve İngilizce dersleri veriyorduk. Çocukların gözlerindeki mutluluğu görmek bizi motive ediyordu.</p>
        <p>Yaz aylarında köylere gidip kütüphane kurma projesi gerçekleştirdik. Bağış kampanyası düzenledik ve yüzlerce kitap topladık. Köy halkı bizi çok sıcak karşıladı.</p>
        <p>Gönüllülük sadece başkalarına yardım etmek değil. İletişim becerilerimi geliştirdim, farklı insanlarla çalışmayı öğrendim ve toplumsal sorunların farkına vardım.</p>
        <p>Şimdi mezun oldum ama hâlâ gönüllü çalışmaya devam ediyorum. Topluma katkıda bulunmak herkesin sorumluluğu. Küçük adımlar bile büyük değişimlere yol açabiliyor.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Gönüllü olarak ne yapıyordu?</td><td>What did he/she do as a volunteer?</td></tr>
        <tr><td>Yaz projesinde ne yaptılar?</td><td>What did they do in the summer project?</td></tr>
        <tr><td>Gönüllülük ona ne kazandırdı?</td><td>What did volunteering bring to him/her?</td></tr>
      </table></div>
    ` },
    { title: 'Sanat & Kültür', desc: 'Müze Gezisi', content: `
      <h3>Müze Gezisi / Museum Visit</h3>
      <div class="grammar-example">
        <p>Geçen hafta İstanbul'da büyük bir sanat müzesini ziyaret ettim. Sergi, Türk resminin yüz yıllık tarihini konu alıyordu. Giriş biletini önceden internetten almıştım.</p>
        <p>Müzenin ilk katında Osmanlı dönemine ait eserler vardı. Minyatür sanatı ve hat sanatı örnekleri çok etkileyiciydi. Rehber bize her eserin hikâyesini anlattı.</p>
        <p>İkinci katta modern Türk sanatçılarının eserleri sergileniyordu. Soyut ve figüratif tablolar yan yana duruyordu. Özellikle bir ressamın kullandığı renk paleti çok dikkat çekiciydi.</p>
        <p>Müzenin bahçesinde bir heykel sergisi de vardı. Bronz ve mermer heykeller arasında dolaştık. Sanatın farklı biçimlerde ifade edilebileceğini gördük.</p>
        <p>Müze kafesinde oturduk ve izlenimlerimizi paylaştık. Sanat bizi düşündürüyor, duygulandırıyor ve farklı bakış açıları kazandırıyor. Herkesin en az ayda bir müze ziyaret etmesi gerektiğini düşünüyorum.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Sergi neyi konu alıyordu?</td><td>What was the exhibition about?</td></tr>
        <tr><td>İlk katta neler vardı?</td><td>What was on the first floor?</td></tr>
        <tr><td>Müze gezisi sonunda ne yaptılar?</td><td>What did they do at the end of the museum visit?</td></tr>
      </table></div>
    ` },
    { title: 'Bilim & Keşif', desc: 'Uzay Araştırmaları', content: `
      <h3>Uzay Araştırmaları / Space Research</h3>
      <div class="grammar-example">
        <p>Uzay araştırmaları insanlığın en heyecan verici bilimsel çalışmalarından biri. Teleskoplar sayesinde milyarlarca ışık yılı uzaktaki galaksileri gözlemleyebiliyoruz.</p>
        <p>Mars'a gönderilen robotik araçlar gezegenin yüzeyini araştırıyor. Bilim insanları su izleri buldu ve bu keşif Mars'ta yaşam olasılığını güçlendirdi. Gelecekte insanlı bir Mars görevi planlanıyor.</p>
        <p>Uluslararası Uzay İstasyonu'nda astronotlar bilimsel deneyler yapıyor. Mikro yerçekimi ortamında yapılan araştırmalar tıp ve malzeme biliminde önemli sonuçlar veriyor.</p>
        <p>Türkiye de uzay programını geliştiriyor. Yerli uydular üretiliyor ve fırlatılıyor. Genç mühendisler bu alanda yenilikçi projeler geliştiriyor.</p>
        <p>Uzay bilimi sadece keşif değil, günlük hayatımızı da etkiliyor. Hava durumu tahminleri, navigasyon sistemleri ve iletişim uyduları hep uzay teknolojisi sayesinde çalışıyor. Evreni anlamak, kendimizi anlamamıza da yardım ediyor.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Mars'ta ne keşfedildi?</td><td>What was discovered on Mars?</td></tr>
        <tr><td>Uzay İstasyonu'nda ne yapılıyor?</td><td>What is done at the Space Station?</td></tr>
        <tr><td>Uzay teknolojisi günlük hayatı nasıl etkiliyor?</td><td>How does space technology affect daily life?</td></tr>
      </table></div>
    ` }
  ],
  B2: [
    { title: 'Siyaset & Hukuk', desc: 'Demokrasi ve Haklar', content: `
      <h3>Demokrasi ve Haklar / Democracy and Rights</h3>
      <div class="grammar-example">
        <p>Demokrasi, halkın yönetimde söz sahibi olduğu bir siyasi sistemdir. Seçimler aracılığıyla vatandaşlar temsilcilerini belirler ve hükümetin politikalarını dolaylı olarak şekillendirir.</p>
        <p>Anayasa, bir devletin temel yasalarını ve vatandaşların haklarını güvence altına alan en üst hukuki belgedir. İfade özgürlüğü, basın özgürlüğü ve adil yargılanma hakkı temel insan haklarından bazılarıdır.</p>
        <p>Parlamentoda milletvekilleri yasa tasarıları üzerinde tartışır ve oy kullanır. Muhalefet partileri hükümetin politikalarını denetler ve alternatif çözümler sunar. Bu denge demokrasinin sağlıklı işlemesi için zorunludur.</p>
        <p>Bağımsız yargı sistemi hukukun üstünlüğünü korur. Mahkemeler, yasaların eşit şekilde uygulanmasını sağlar. Savcılar suç iddialarını araştırır, avukatlar ise müvekkillerinin haklarını savunur.</p>
        <p>Sivil toplum kuruluşları da demokratik süreçte önemli bir rol oynar. Vatandaşların taleplerini dile getirmesine aracılık eder ve kamuoyu bilincini artırır. Katılımcı demokrasi, bireylerin aktif olarak siyasi sürece dahil olmasını gerektirir.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Anayasanın görevi nedir?</td><td>What is the role of the constitution?</td></tr>
        <tr><td>Muhalefet partilerinin işlevi ne?</td><td>What is the function of opposition parties?</td></tr>
        <tr><td>Sivil toplum kuruluşları ne yapar?</td><td>What do civil society organizations do?</td></tr>
      </table></div>
    ` },
    { title: 'Bilim & Çevre', desc: 'Ekosistem Dengesi', content: `
      <h3>Ekosistem Dengesi / Ecosystem Balance</h3>
      <div class="grammar-example">
        <p>Ekosistem, canlı ve cansız varlıkların karşılıklı etkileşim içinde olduğu doğal bir sistemdir. Bir türün yok olması, besin zincirinin tamamını etkileyebilir ve dengesizliklere yol açabilir.</p>
        <p>Biyolojik çeşitlilik, ekosistemlerin dayanıklılığının temel göstergesidir. Ormansızlaşma, habitat kaybı ve kirlilik biyolojik çeşitliliği ciddi şekilde tehdit etmektedir. Bilim insanları nesli tükenmekte olan türleri koruma altına almak için yoğun çaba harcıyor.</p>
        <p>Küresel ısınma okyanus sıcaklıklarını artırarak mercan resiflerinin ağarmasına neden oluyor. Mercan resifleri, deniz canlılarının yüzde yirmi beşine ev sahipliği yapıyor. Bu ekosistemin çökmesi küresel gıda güvenliğini tehlikeye atabilir.</p>
        <p>Sürdürülebilir tarım uygulamaları toprak verimliliğini korumada önemli bir rol oynuyor. Organik tarım, kimyasal gübre kullanımını azaltarak hem insan sağlığını hem de çevreyi koruyor.</p>
        <p>Her bireyin ekolojik ayak izini azaltması gerekiyor. Tüketim alışkanlıklarımızı gözden geçirmek, yerel ürünleri tercih etmek ve israfı önlemek, gezegeni gelecek nesillere aktarmanın en etkili yolları arasındadır.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Biyolojik çeşitliliği ne tehdit ediyor?</td><td>What threatens biodiversity?</td></tr>
        <tr><td>Mercan resifleri neden önemli?</td><td>Why are coral reefs important?</td></tr>
        <tr><td>Bireyler ekolojik ayak izlerini nasıl azaltabilir?</td><td>How can individuals reduce their ecological footprint?</td></tr>
      </table></div>
    ` },
    { title: 'Ekonomi & Finans', desc: 'Küresel Ekonomi', content: `
      <h3>Küresel Ekonomi / Global Economy</h3>
      <div class="grammar-example">
        <p>Küreselleşme, ekonomilerin birbirine bağımlı hale gelmesine yol açmıştır. Bir ülkedeki finansal kriz, domino etkisiyle diğer ülkeleri de etkileyebilmektedir. Uluslararası ticaret anlaşmaları bu bağımlılığı daha da derinleştirmektedir.</p>
        <p>Enflasyon, tüketici fiyatlarının genel düzeyindeki sürekli artışı ifade eder. Merkez bankaları faiz oranlarını ayarlayarak enflasyonu kontrol altına almaya çalışır. Para politikası kararları piyasaları doğrudan etkiler.</p>
        <p>Girişimcilik, ekonomik büyümenin itici güçlerinden biridir. Yenilikçi iş fikirleri istihdam yaratır ve rekabeti artırır. Devlet teşvikleri ve risk sermayesi fonları girişimcilere finansal destek sağlar.</p>
        <p>Dijital ekonomi geleneksel iş modellerini dönüştürüyor. E-ticaret, kripto paralar ve finansal teknoloji şirketleri bankacılık ve ticaret anlayışını kökten değiştiriyor.</p>
        <p>Gelir eşitsizliği dünya genelinde tartışılan önemli bir konudur. Vergi politikaları, sosyal güvenlik sistemleri ve eğitime erişim bu eşitsizliği azaltmada kritik araçlardır. Ekonomik adaletin sağlanması toplumsal huzurun temelini oluşturur.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Küreselleşme ekonomileri nasıl etkiliyor?</td><td>How does globalization affect economies?</td></tr>
        <tr><td>Merkez bankaları enflasyonu nasıl kontrol eder?</td><td>How do central banks control inflation?</td></tr>
        <tr><td>Gelir eşitsizliği nasıl azaltılabilir?</td><td>How can income inequality be reduced?</td></tr>
      </table></div>
    ` },
    { title: 'Medya & Sanat', desc: 'Sanatın Dili', content: `
      <h3>Sanatın Dili / The Language of Art</h3>
      <div class="grammar-example">
        <p>Sanat, insanın kendini ifade etme biçimlerinin en güçlüsüdür. Tarih boyunca resim, müzik, edebiyat ve tiyatro toplumların kültürel kimliğini yansıtmıştır. Sanat eserleri, yaratıldıkları dönemin aynasıdır.</p>
        <p>Sinema, yirminci yüzyılın en etkili sanat dalı olarak kabul edilir. Görsel anlatım, müzik ve diyalogların birleşimi izleyiciyi derinden etkiler. Belgesel filmler toplumsal farkındalık yaratmada güçlü bir araçtır.</p>
        <p>Çağdaş sanat, geleneksel kalıpların dışına çıkarak yeni ifade biçimleri arar. Performans sanatı, dijital sanat ve yerleştirme gibi türler izleyiciyi sıradan bir seyirciden katılımcıya dönüştürür.</p>
        <p>Edebiyat eleştirisi, yapıtların toplumsal, tarihsel ve psikolojik boyutlarını inceler. Bir romanın farklı yorumlanması, okuyucunun bakış açısına ve kültürel arka planına bağlıdır.</p>
        <p>Sanat eğitimi bireylerin yaratıcılığını ve eleştirel düşünme becerisini geliştirir. Müzeler, galeriler ve kültür merkezleri sanatla toplum arasında köprü görevi görür. Sanata erişim herkesin hakkı olmalıdır.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Sinema neden etkili bir sanat dalıdır?</td><td>Why is cinema an effective art form?</td></tr>
        <tr><td>Çağdaş sanat izleyiciyi nasıl değiştirir?</td><td>How does contemporary art change the viewer?</td></tr>
        <tr><td>Sanat eğitiminin faydaları neler?</td><td>What are the benefits of art education?</td></tr>
      </table></div>
    ` },
    { title: 'Psikoloji & Felsefe', desc: 'İnsan Zihninin Derinlikleri', content: `
      <h3>İnsan Zihninin Derinlikleri / Depths of the Human Mind</h3>
      <div class="grammar-example">
        <p>Psikoloji, insan davranışlarını ve zihinsel süreçlerini inceleyen bir bilim dalıdır. Motivasyon, algı, bellek ve öğrenme gibi konular psikolojinin temel araştırma alanlarıdır.</p>
        <p>Bilinçaltı, davranışlarımızı fark etmediğimiz şekillerde yönlendirir. Freud'un psikanaliz kuramı, bastırılmış duyguların ve çocukluk deneyimlerinin yetişkin davranışlarını nasıl etkilediğini açıklamaya çalışır.</p>
        <p>Bilişsel davranışçı terapi, olumsuz düşünce kalıplarını değiştirmeyi hedefler. Anksiyete ve depresyon tedavisinde yaygın olarak kullanılır. Düşüncelerimizin duygularımızı, duygularımızın da davranışlarımızı etkilediğini savunur.</p>
        <p>Felsefe ise varoluşun temel sorularını ele alır. "Ben kimim?", "Hayatın anlamı nedir?", "Doğru ile yanlışı nasıl ayırt ederiz?" gibi sorular felsefi düşüncenin merkezindedir.</p>
        <p>Duygusal zekâ kavramı son yıllarda büyük ilgi görmektedir. Kendi duygularını tanımak, empati kurmak ve ilişkileri yönetmek başarılı bir yaşamın anahtarlarıdır. Kendini tanıma yolculuğu yaşam boyu devam eder.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Bilinçaltı davranışları nasıl etkiler?</td><td>How does the subconscious affect behavior?</td></tr>
        <tr><td>Bilişsel davranışçı terapi ne yapar?</td><td>What does cognitive behavioral therapy do?</td></tr>
        <tr><td>Duygusal zekâ neden önemli?</td><td>Why is emotional intelligence important?</td></tr>
      </table></div>
    ` },
    { title: 'Teknoloji & Dijital', desc: 'Yapay Zekâ Çağı', content: `
      <h3>Yapay Zekâ Çağı / The Age of Artificial Intelligence</h3>
      <div class="grammar-example">
        <p>Yapay zekâ, bilgisayarların insan benzeri düşünme ve öğrenme yeteneklerine sahip olmasını sağlayan teknoloji dalıdır. Makine öğrenimi algoritmaları büyük veri kümelerinden kalıplar çıkararak tahminlerde bulunabilir.</p>
        <p>Doğal dil işleme sayesinde bilgisayarlar artık insan dilini anlayabiliyor ve üretebiliyor. Çeviri programları, sesli asistanlar ve metin oluşturma araçları bu teknolojinin günlük yaşamdaki uygulamalarıdır.</p>
        <p>Otomasyon, üretim sektöründen sağlık hizmetlerine kadar birçok alanda iş gücü yapısını değiştiriyor. Bazı meslekler ortadan kalkarken yeni beceriler gerektiren yeni meslekler ortaya çıkıyor.</p>
        <p>Yapay zekânın etik boyutları tartışma konusu olmaya devam ediyor. Önyargılı algoritmalar, veri gizliliği ve özerk sistemlerin sorumluluğu gibi konular hukuki ve felsefi sorular doğuruyor.</p>
        <p>Gelecekte yapay zekâ ve insan iş birliği daha da önem kazanacak. Teknolojiyi yönetme, eleştirel düşünme ve yaratıcılık gibi beceriler yapay zekânın tamamlayamayacağı insan nitelikleri olarak öne çıkacaktır.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Makine öğrenimi nasıl çalışır?</td><td>How does machine learning work?</td></tr>
        <tr><td>Otomasyon iş gücünü nasıl etkiliyor?</td><td>How does automation affect the workforce?</td></tr>
        <tr><td>Yapay zekânın etik sorunları neler?</td><td>What are the ethical issues of AI?</td></tr>
      </table></div>
    ` },
    { title: 'Sağlık & Tıp', desc: 'Modern Tıbbın Gelişimi', content: `
      <h3>Modern Tıbbın Gelişimi / The Evolution of Modern Medicine</h3>
      <div class="grammar-example">
        <p>Tıp bilimi son yüzyılda devrim niteliğinde gelişmeler kaydetmiştir. Antibiyotiklerin keşfi milyonlarca hayat kurtarmış, aşılar sayesinde salgın hastalıklar kontrol altına alınmıştır.</p>
        <p>Genetik araştırmalar hastalıkların kökenini anlamamızda çığır açmıştır. İnsan genomu projesinin tamamlanması kişiye özel tedavi yöntemlerinin önünü açmıştır. Genetik testler sayesinde hastalık riskleri önceden belirlenebilmektedir.</p>
        <p>Robotik cerrahi, cerrahlara daha hassas operasyonlar yapma imkânı sunuyor. Minimal invaziv yöntemler hastaların iyileşme süresini kısaltıyor. Uzaktan ameliyat teknolojisi de gelişmeye devam ediyor.</p>
        <p>Ruh sağlığına verilen önem giderek artıyor. Toplumda psikolojik sorunlara karşı farkındalık yükseliyor. Tedaviye erişim kolaylaşıyor ve damgalama azalıyor.</p>
        <p>Koruyucu hekimlik anlayışı tedavi edici yaklaşımın önüne geçiyor. Düzenli taramalar, sağlıklı yaşam tarzı önerileri ve erken teşhis yöntemleri sağlık sisteminin temelini oluşturuyor.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Genetik araştırmaların katkısı ne?</td><td>What is the contribution of genetic research?</td></tr>
        <tr><td>Robotik cerrahi ne avantaj sağlıyor?</td><td>What advantage does robotic surgery provide?</td></tr>
        <tr><td>Koruyucu hekimlik nedir?</td><td>What is preventive medicine?</td></tr>
      </table></div>
    ` },
    { title: 'Eğitim & Akademi', desc: 'Eğitimin Geleceği', content: `
      <h3>Eğitimin Geleceği / The Future of Education</h3>
      <div class="grammar-example">
        <p>Geleneksel eğitim modeli dijital çağın gereksinimlerini karşılamakta yetersiz kalmaktadır. Ezberci yaklaşım yerini analitik düşünme, problem çözme ve yaratıcılığa bırakmalıdır.</p>
        <p>Uzaktan eğitim pandemi sürecinde hızla yaygınlaştı. Çevrimiçi platformlar sayesinde dünyanın her yerinden kaliteli eğitime erişim mümkün hale geldi. Ancak dijital uçurum hâlâ önemli bir eşitsizlik kaynağı.</p>
        <p>Yaşam boyu öğrenme kavramı giderek önem kazanıyor. Teknolojinin hızla değiştiği bir dünyada mesleki becerilerin sürekli güncellenmesi zorunlu hale geliyor. Sertifika programları ve çevrimiçi kurslar bu ihtiyacı karşılıyor.</p>
        <p>Disiplinler arası eğitim yaklaşımı, öğrencilerin farklı alanlar arasında bağlantı kurmasını teşvik ediyor. STEM eğitimi bilim, teknoloji, mühendislik ve matematiği bütünleşik bir şekilde öğretiyor.</p>
        <p>Eğitimde fırsat eşitliği toplumsal kalkınmanın anahtarıdır. Kapsayıcı eğitim politikaları, her bireyin potansiyelini gerçekleştirebileceği bir ortam yaratmayı hedeflemelidir. Eğitime yapılan yatırım en kârlı yatırımdır.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Geleneksel eğitim neden yetersiz kalıyor?</td><td>Why is traditional education falling short?</td></tr>
        <tr><td>Yaşam boyu öğrenme neden önemli?</td><td>Why is lifelong learning important?</td></tr>
        <tr><td>STEM eğitimi neyi bütünleştiriyor?</td><td>What does STEM education integrate?</td></tr>
      </table></div>
    ` },
    { title: 'Sosyoloji & Toplum', desc: 'Toplumsal Dönüşüm', content: `
      <h3>Toplumsal Dönüşüm / Social Transformation</h3>
      <div class="grammar-example">
        <p>Kentleşme, son yüzyılın en belirgin toplumsal dönüşümlerinden biridir. Kırsal alanlardan şehirlere göç, büyük metropollerin oluşmasına ve geleneksel toplum yapısının değişmesine neden olmuştur.</p>
        <p>Göç olgusu kültürel çeşitliliği artırırken uyum sorunlarını da beraberinde getiriyor. Farklı kültürlerden gelen insanların bir arada yaşaması hoşgörü ve empati gerektirir. Çok kültürlü toplumlar hem zenginlik hem de meydan okumalar barındırır.</p>
        <p>Toplumsal cinsiyet eşitliği hâlâ ulaşılması gereken bir hedeftir. İş hayatında, eğitimde ve siyasette kadınların temsilinin artırılması toplumsal ilerlemenin göstergesidir. Eşit işe eşit ücret ilkesi evrensel bir talep haline gelmiştir.</p>
        <p>Dijital iletişim araçları toplumsal ilişkilerin doğasını değiştirmektedir. Sanal topluluklar yeni kimlik ve aidiyet biçimleri oluşturuyor. Ancak yüz yüze iletişimin yerini hiçbir teknoloji tam olarak dolduramaz.</p>
        <p>Toplumsal dayanışma, kriz dönemlerinde en çok ihtiyaç duyulan değerdir. Depremler, salgınlar ve ekonomik krizler toplumların birlikte hareket etme kapasitesini sınayan süreçlerdir. Güçlü bir toplum, bireylerinin birbirine destek olduğu toplumdur.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Kentleşme toplumu nasıl değiştirdi?</td><td>How did urbanization change society?</td></tr>
        <tr><td>Dijital iletişim ilişkileri nasıl etkiliyor?</td><td>How does digital communication affect relationships?</td></tr>
        <tr><td>Toplumsal dayanışma neden önemli?</td><td>Why is social solidarity important?</td></tr>
      </table></div>
    ` },
    { title: 'Edebiyat & Dil', desc: 'Dilin Büyüsü', content: `
      <h3>Dilin Büyüsü / The Magic of Language</h3>
      <div class="grammar-example">
        <p>Dil, insanları diğer canlılardan ayıran en temel özelliklerden biridir. Düşüncelerimizi, duygularımızı ve deneyimlerimizi başkalarıyla paylaşmamızı sağlayan karmaşık bir iletişim sistemidir.</p>
        <p>Dünya üzerinde yaklaşık yedi bin dil konuşulmaktadır. Her dil, konuşulduğu toplumun dünya görüşünü ve kültürel değerlerini yansıtır. Bir dilin yok olması, benzersiz bir bilgi birikiminin de kaybedilmesi anlamına gelir.</p>
        <p>Edebiyat, dilin en rafine kullanımıdır. Şiir, roman, hikâye ve deneme gibi türler okuyucuya farklı dünyaların kapısını açar. Büyük yazarlar, sıradan kelimeleri olağanüstü anlamlar taşıyan cümlelere dönüştürür.</p>
        <p>Çeviri, kültürler arası köprü görevi görür. Bir eseri başka bir dile çevirmek sadece kelimeleri aktarmak değil, bir kültürün ruhunu yakalamaya çalışmaktır. Her çeviri aynı zamanda bir yorumdur.</p>
        <p>Çok dilli olmak bilişsel açıdan da avantajlar sağlar. Araştırmalar, birden fazla dil bilen kişilerin daha esnek düşünebildiğini ve problem çözme becerilerinin daha gelişmiş olduğunu göstermektedir.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Bir dilin yok olması ne anlama gelir?</td><td>What does the extinction of a language mean?</td></tr>
        <tr><td>Çevirinin rolü nedir?</td><td>What is the role of translation?</td></tr>
        <tr><td>Çok dilli olmanın avantajları neler?</td><td>What are the advantages of being multilingual?</td></tr>
      </table></div>
    ` }
  ],
  C1: [
    { title: 'Felsefe & Düşünce', desc: 'Varoluşun Sorgulanması', content: `
      <h3>Varoluşun Sorgulanması / Questioning Existence</h3>
      <div class="grammar-example">
        <p>İnsanlık tarihi boyunca filozoflar, varoluşun temel meselesini -yani neden hiçlik yerine bir şeylerin var olduğu sorusunu- yanıtlamaya çalışmış; ancak her yanıt, beraberinde daha derin sorular getirmiştir. Varoluşçuluk akımının öncülerinden Jean-Paul Sartre, "varoluş özden önce gelir" tezini ortaya koyarak insanın önceden belirlenmiş bir amacının olmadığını, anlam yaratma sorumluluğunun bizzat bireyin omuzlarında yattığını savunmuştur.</p>
        <p>Martin Heidegger ise Varlık ve Zaman adlı başyapıtında "Dasein" kavramını merkeze alarak insanın dünyaya fırlatılmışlığını ve bu fırlatılmışlık karşısındaki özgünlük arayışını irdelemiştir. Ona göre ölümün kaçınılmazlığının bilincinde olmak, insanı sahici bir yaşama yönelten en güçlü motivasyondur; zira ölümlülüğün farkına varmak, zamanın sınırlılığını hatırlatarak bireyi kendi varoluşuna ilişkin temel seçimler yapmaya zorlamaktadır.</p>
        <p>Albert Camus, absürd kavramını felsefi söylemin merkezine taşımış; insanın anlam arayışı ile evrenin anlamsız suskunluğu arasındaki derin uçurumu absürd olarak nitelendirmiştir. Bu uçurum karşısında Camus'nün önerisi ne intihar ne de dinî bir sığınak aramak, aksine hayatı tüm absürdlüğüyle kucaklamak ve isyan etmeyi sürdürmektir.</p>
        <p>Doğu felsefesi bu soruları bambaşka bir perspektiften ele almıştır. Budizm geleneğinde benliğin kalıcı bir töz olmadığı, bilincin anlık deneyimlerin akan bir akışından ibaret olduğu öğretilmektedir. Taoizm ise bireyin evrensel akışa teslim olmasını, zorlamak yerine uyum sağlamasını önermekte; böylece varoluşsal kaygıdan kurtulmanın yolunu göstermektedir.</p>
        <p>Modern nörobilim, filozofların yüzyıllardır tartıştığı özgür irade sorusuna yeni bir boyut katmıştır. Benjamin Libet'in deneyleri, bilinçli kararların beyin aktivitesinden milisaniyeler sonra oluştuğunu ortaya koymuş; bu bulgu özgür iradenin bir yanılsamadan ibaret olabileceğini düşündürmüştür. Ancak bu sonuçlar, hem yorumlama güçlükleri hem de felsefi itirazlar nedeniyle hâlâ tartışılmaktadır.</p>
        <p>Fenomenoloji, deneyimin nesnel bir gerçekliği betimlemek yerine öznel bilinç yapılarını incelemesi gerektiğini savunmaktadır. Edmund Husserl'in geliştirdiği bu yaklaşım, bilinç ile dünya arasındaki ilişkiyi intentionality -yani yönelimsellik- kavramıyla açıklamış ve felsefede köklü bir yöntem değişikliğine yol açmıştır.</p>
        <p>Varoluşun sorgulanması yalnızca akademik bir merak değil, aynı zamanda pratik bir yaşam meselesidir; zira hangi değerlerin rehberliğinde yaşayacağımız, nasıl ilişkiler kuracağımız ve ölümlülüğümüzle nasıl yüzleşeceğimiz, felsefi tutumumuzdan bağımsız düşünülemez. Felsefe bu anlamda soyut bir entelektüel egzersiz olmaktan çıkarak bireyin hayatını biçimlendiren somut bir pratik hâline gelmektedir.</p>
        <p>Günümüzde yapay zekânın bilinç kazanıp kazanamayacağı, dijital varlıkların varoluşsal statüsü ve post-hümanist felsefelerin yükselişi, insanın kendini tanımlama biçimini köklü biçimde sorgulatmaktadır. Bu yeni sorular, eski felsefi mirasın güncelliğini yitirmediğini, tersine çok daha geniş bir zemine yayıldığını kanıtlar niteliktedir.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Sartre'ın "varoluş özden önce gelir" tezi ne anlama gelmektedir?</td><td>What does Sartre's thesis "existence precedes essence" mean?</td></tr>
        <tr><td>Camus absürd kavramını nasıl tanımlar ve bu karşısında ne önerir?</td><td>How does Camus define the absurd and what does he propose in response to it?</td></tr>
        <tr><td>Nörobilimin özgür irade tartışmasına katkısı nedir?</td><td>What is neuroscience's contribution to the free will debate?</td></tr>
      </table></div>
    ` },
    { title: 'Hukuk & Diplomasi', desc: 'Uluslararası Hukukun Temelleri', content: `
      <h3>Uluslararası Hukukun Temelleri / Foundations of International Law</h3>
      <div class="grammar-example">
        <p>Uluslararası hukuk, egemen devletler arasındaki ilişkileri düzenleyen kurallar bütünü olup bu kuralların uygulanmasını güvence altına alacak merkezi bir otorite bulunmadığından sistemin etkinliği büyük ölçüde devletlerin rızasına ve uluslararası kamuoyunun baskısına dayanmaktadır. Westfalya Antlaşması'nın (1648) getirdiği egemenlik ilkesi, modern uluslararası hukukun temel taşını oluşturmakta ve devletlerin iç işlerine müdahaleyi prensipte yasak kılmaktadır.</p>
        <p>Devletler arasındaki anlaşmazlıkların barışçıl yollarla çözülmesi amacıyla kurulan Birleşmiş Milletler, özellikle Güvenlik Konseyi aracılığıyla uluslararası barış ve güvenliği koruma misyonunu üstlenmiştir. Ancak daimi üyelerin veto yetkisine sahip olması, konseyin etkinliğini ciddi biçimde sınırlamakta; büyük güçler arasındaki çatışmalarda kurumun işlevsiz kalmasına zemin hazırlamaktadır.</p>
        <p>Uluslararası insancıl hukuk, silahlı çatışma dönemlerinde dahi uyulması zorunlu olan minimum insanlık standartlarını belirler. Cenevre Sözleşmeleri savaş esirlerine ve sivillere nasıl muamele edileceğini ayrıntılı biçimde düzenlemekte, bu kurallara aykırı eylemler savaş suçu olarak tanımlanmaktadır. Uluslararası Ceza Mahkemesi, söz konusu suçların failleri için birincil yargı mercii işlevi görmektedir.</p>
        <p>İnsan hakları hukuku, devletlerin kendi vatandaşlarına yönelik eylem ve ihmallerini uluslararası denetime açmıştır. 1948 tarihli İnsan Hakları Evrensel Beyannamesi bağlayıcı nitelikte olmasa da arkasından gelen antlaşmalar -özellikle Medeni ve Siyasi Haklar ile Ekonomik, Sosyal ve Kültürel Haklar Uluslararası Sözleşmeleri- devletlere somut yükümlülükler yüklemektedir.</p>
        <p>Deniz hukuku alanında 1982 tarihli BM Deniz Hukuku Sözleşmesi, kıyı devletlerinin münhasır ekonomik bölgelerini, kıta sahanlığı haklarını ve açık deniz özgürlüklerini kapsamlı bir çerçevede düzenlemiştir. Bu sözleşmenin yorumlanması ve uygulanması, başta Güney Çin Denizi olmak üzere pek çok bölgede devletler arasında kronik anlaşmazlıklara neden olmaktadır.</p>
        <p>Diplomatik ilişkiler 1961 Viyana Sözleşmesi kapsamında yürütülmekte; elçiliklerin dokunulmazlığı, diplomatik personelin ayrıcalıkları ve konsolosluk hizmetleri bu belgeyle güvence altına alınmaktadır. Söz konusu dokunulmazlıkların zaman zaman kötüye kullanılması, dokunulmazlık kurumunun meşruiyeti konusunda ciddi tartışmalara yol açmaktadır.</p>
        <p>Uluslararası ticaret hukuku ise esas olarak Dünya Ticaret Örgütü çerçevesinde şekillenmektedir. Ülkelerin tek taraflı tarife uygulamalarına başvurması, WTO'nun çözüm mekanizmalarını zorlamakta ve çok taraflı ticaret düzeninin sürdürülebilirliğini tehdit etmektedir.</p>
        <p>İklim değişikliği, siber saldırılar ve pandemiler gibi sınır tanımayan tehditler karşısında mevcut uluslararası hukuk sisteminin yeterliliği giderek daha fazla sorgulanmaktadır. Egemenlik ilkesinin baskısı altında küresel çözümler üretebilmek, uluslararası hukukun 21. yüzyıldaki en kritik sınavını oluşturmaktadır.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>BM Güvenlik Konseyi'nin etkinliğini sınırlayan temel faktör nedir?</td><td>What is the main factor limiting the effectiveness of the UN Security Council?</td></tr>
        <tr><td>Uluslararası insancıl hukuk silahlı çatışmalarda neyi düzenler?</td><td>What does international humanitarian law regulate in armed conflicts?</td></tr>
        <tr><td>Uluslararası hukukun günümüzde karşılaştığı en büyük meydan okumalar nelerdir?</td><td>What are the greatest challenges facing international law today?</td></tr>
      </table></div>
    ` },
    { title: 'Bilim & Araştırma', desc: 'Kuantum Fiziğinin Sırları', content: `
      <h3>Kuantum Fiziğinin Sırları / The Mysteries of Quantum Physics</h3>
      <div class="grammar-example">
        <p>Kuantum mekaniği, 20. yüzyılın başında klasik fiziğin açıklayamadığı atom altı olguları betimlemek amacıyla geliştirilmiş ve bugün tarihin en doğru biçimde sınanmış fizik kuramı unvanını korumaktadır. Ne var ki matematiksel formalizmi son derece başarılı olmasına karşın bu kuramın gerçekliğe ilişkin yorumu, kurucular arasında bile derin anlaşmazlıklara neden olmuş ve bu tartışma günümüzde de çözüme kavuşturulamamıştır.</p>
        <p>Dalga-parçacık ikiliği, kuantum dünyasının en sarsıcı özelliklerinden birini oluşturmaktadır. Çift yarık deneyi, elektronların tek tek atılsa dahi girişim deseni oluşturduğunu göstermekte; bu durum her elektronun aynı anda her iki yarıktan geçtiğini ima etmekte ve klasik sezgimizi temelden sarsmaktadır. Gözlem eylemi ise bu belirsizliği ortadan kaldırarak parçacığın belirli bir konuma "çökmesine" yol açmaktadır.</p>
        <p>Heisenberg'in belirsizlik ilkesi, bir parçacığın konumu ile momentumunun aynı anda keyfi bir hassasiyetle bilinemeyeceğini matematiksel olarak kanıtlamıştır. Bu ilke, ölçüm araçlarının teknik yetersizliğinden değil, doğanın temel yapısından kaynaklanmaktadır; dolayısıyla belirsizlik kuantum gerçekliğinin vazgeçilmez bir özelliğidir.</p>
        <p>Kuantum dolanıklığı, Einstein'ın "hayaletimsi uzaktan etki" olarak nitelendirdiği ve başlangıçta kuantum mekaniğine yönelik bir itiraz olarak ileri sürdüğü olgudur. Dolanık iki parçacıktan birinin durumu ölçüldüğünde, ikincisinin durumu ne kadar uzakta olursa olsun anında belirlenmektedir. Bell testleri bu ilişkinin yerel gizli değişkenlerle açıklanamayacağını deneysel olarak kanıtlamış; kuantum bilgi teorisinin ve kuantum kriptografisinin temelini oluşturmaktadır.</p>
        <p>Schrödinger'in kedi düşünce deneyi, ölçüm problemi olarak bilinen kuantum paradoksunu çarpıcı bir biçimde gözler önüne sermektedir. Kutu açılıp ölçüm yapılana dek kedinin hem canlı hem ölü süperpozisyonunda bulunduğunu ileri süren bu deney, kuantum mekaniğinin makroskobik nesnelere nasıl uygulanacağı sorusunu tartışmaya açmıştır.</p>
        <p>Kuantum mekaniğinin yorumlanmasına ilişkin çeşitli yaklaşımlar mevcuttur: Kopenhag yorumu ölçüme kadar gerçekliğin belirsiz olduğunu savunurken, çok dünyalar yorumu her ölçümün gerçekliği birden fazla paralel dala ayırdığını ileri sürmektedir. Yönlendirilmiş dalga teorisi, kuantum alanının parçacığı yönlendirdiği kabulüne dayanmakta; ilişkisel kuantum mekaniği ise kuantum durumlarının gözlemciye göreli olduğunu öne çıkarmaktadır.</p>
        <p>Kuantum bilgisayarlar, klasik bilgisayarların ikili bit düzeniyle değil, süperpozisyon ve dolanıklık özelliklerini kullanan kubitlerle işlem yapmaktadır. Bu yetkinlik, belirli hesaplama sınıflarında üstel bir hız kazanımı sağlamakta; kriptografi, ilaç keşfi ve malzeme bilimi gibi alanlarda devrim niteliğinde değişimlere yol açabilecek bir potansiyel barındırmaktadır.</p>
        <p>Kuantum alan teorisi, kuantum mekaniğini özel görelilik kuramıyla uzlaştırmakta ve standart modelin kavramsal çerçevesini oluşturmaktadır. Bununla birlikte, genel görelilik ile kuantum mekaniğini tek bir tutarlı çerçevede birleştirmek, teorik fiziğin bugüne dek çözüme ulaşamamış en büyük zorluğu olmaya devam etmektedir.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Heisenberg'in belirsizlik ilkesi neden teknik bir sınırlamanın değil, doğanın temel bir özelliğinin sonucudur?</td><td>Why is Heisenberg's uncertainty principle a consequence of nature's fundamental structure rather than a technical limitation?</td></tr>
        <tr><td>Kuantum dolanıklığı nedir ve Bell testleri bu konuda ne kanıtlamıştır?</td><td>What is quantum entanglement and what have Bell tests proven about it?</td></tr>
        <tr><td>Kuantum bilgisayarların klasik bilgisayarlara göre üstünlüğü nerede yatmaktadır?</td><td>Where does the advantage of quantum computers over classical computers lie?</td></tr>
      </table></div>
    ` },
    { title: 'Edebiyat & Kültür', desc: 'Türk Edebiyatının Dönüm Noktaları', content: `
      <h3>Türk Edebiyatının Dönüm Noktaları / Turning Points in Turkish Literature</h3>
      <div class="grammar-example">
        <p>Türk edebiyatının kökleri, Orta Asya bozkırlarında şekillenen sözlü destanlar geleneğine ve İslamiyet öncesinin ozanlık kültürüne uzanmaktadır. Orhun Yazıtları (8. yüzyıl), hem biçim hem de içerik açısından olgunlaşmış bir yazı diline işaret ederek Türk edebiyatının belgelenebilen en eski anıtı olma niteliğini korumaktadır. İslamiyet'in kabulüyle birlikte Arap ve Fars kültürünün derin etkisi altında gelişen divan edebiyatı ise yüzyıllarca saray çevrelerinde hâkimiyetini sürdürmüştür.</p>
        <p>Tanzimat Dönemi (1839-1876), Türk edebiyatının Batı ile ilk köklü karşılaşmasını temsil etmektedir. Şinasi, Namık Kemal ve Ziya Paşa gibi aydınlar, yalnızca edebî yeniliklerle yetinmeyerek milliyetçilik, özgürlük ve anayasacılık fikirlerini yazılarıyla yaymış; dolayısıyla bu dönem estetiği siyasal dönüşümle iç içe geçirmiştir. Roman, tiyatro ve gazete gibi Batılı edebî biçimler bu dönemde Türkçeye kazandırılmıştır.</p>
        <p>Servet-i Fünun hareketi, Türk şiir ve nesrinde köklü bir yenileşmeyi simgelemektedir. Tevfik Fikret ve Halit Ziya Uşaklıgil önderliğinde gelişen bu akım, sanat için sanat anlayışını benimsemiş, dili daha da ağırlaştırarak aristokratik bir estetizm yaratmıştır. Buna karşın Millî Edebiyat hareketi, sade Türkçeyi ve halk kaynaklı biçimleri ön plana çıkararak Servet-i Fünun'a güçlü bir alternatif sunmuştur.</p>
        <p>Cumhuriyet'in kuruluşu (1923) ve ardından gerçekleştirilen alfabe devrimi (1928), edebiyat dünyasında eşi görülmemiş bir kırılma yaratmıştır. Osmanlı yazı mirasından kopuş hem kültürel bir özgürleşme hem de derin bir bellek süreksizliği anlamına gelmiş; yeni Türk edebiyatı büyük ölçüde bu gerilim üzerine inşa edilmiştir.</p>
        <p>Garip hareketi (1940'lar), Orhan Veli Kanık, Melih Cevdet Anday ve Oktay Rifat'ın öncülüğünde şiiri ölçü, kafiye ve yüce temalardan kopararak sıradan insanın gündelik yaşam deneyimine yöneltmiştir. Şiirdeki bu demokratikleşme, Türk edebiyatında popüler olanla entelektüel olan arasındaki sınırı önemli ölçüde muğlaklaştırmıştır.</p>
        <p>Köy edebiyatı ise modernleşmenin gölgesinde kalan kırsal yaşamı ve kentleşmenin yıkıcı etkilerini gözler önüne sermiştir. Yaşar Kemal'in epik anlatı geleneği, hem ulusal hem de uluslararası arenada geniş bir yankı uyandırmış; onun 1973'te Nobel adaylığı, Türk edebiyatının dünya sahnesindeki yerini tartışmaya açmıştır.</p>
        <p>Orhan Pamuk'un Türk modernizmini Batılı postmodern tekniklerle ustalıkla harmanlayan yapıtları, 2006 Nobel Edebiyat Ödülü'nü getirmiş ve Türk edebiyatına uluslararası alanda eşi görülmemiş bir görünürlük kazandırmıştır. Onun eserlerindeki Doğu-Batı gerilimi, Osmanlı nostaljisi ve kimlik sorunları günümüzde de canlılığını korumakta ve geniş çevrelerce tartışılmaktadır.</p>
        <p>Günümüz Türk edebiyatı, toplumsal cinsiyet, azınlık kimliği, kentsel dönüşüm ve tarihsel hesaplaşma gibi temalarla yüzleşmektedir. Elif Şafak gibi yazarlar ise küresel bir okuyucu kitlesine ulaşarak Türk edebiyatının coğrafi ve kültürel sınırlarını genişletmektedir.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Tanzimat Dönemi edebiyatını önceki dönemlerden ayıran temel özellikler nelerdir?</td><td>What are the key features that distinguish Tanzimat Period literature from previous eras?</td></tr>
        <tr><td>Garip hareketi Türk şiirine nasıl bir yenilik getirmiştir?</td><td>What innovation did the Garip movement bring to Turkish poetry?</td></tr>
        <tr><td>Alfabe devrimi Türk edebiyatını nasıl etkilemiştir?</td><td>How did the alphabet revolution affect Turkish literature?</td></tr>
      </table></div>
    ` },
    { title: 'Ekonomi & Strateji', desc: 'Küresel Ticaret Savaşları', content: `
      <h3>Küresel Ticaret Savaşları / Global Trade Wars</h3>
      <div class="grammar-example">
        <p>Ticaret savaşları, devletlerin ithalat üzerinden karşılıklı olarak yüksek gümrük tarifeleri uygulamasına dayanan ve küresel ekonomik düzeni derinden sarsan stratejik çatışmalardır. Tarihsel olarak 1930'lardaki Smoot-Hawley gümrük tarifeleri, büyük buhrandan çıkış yolu arayan ABD'nin izlediği korumacı politikaların küresel ticareti çöküşe sürüklediğini ibretlik bir örnek olarak ortaya koymaktadır.</p>
        <p>21. yüzyılın en belirleyici ticaret çatışması, ABD ile Çin arasında 2018 yılında alevlenen ve hızla tırmanan gerginliktir. Trump yönetimi, yüz milyarlarca dolarlık Çin malına ek tarifeler uygularken Çin de misilleme olarak Amerikan ürünlerine gümrük duvarı örmüş; bu karşılıklı hamle küresel tedarik zincirlerini derinden sarsmış, çok sayıda sektörde üretim maliyetlerini yukarı çekmiştir.</p>
        <p>Entelektüel mülkiyet hakları, zorunlu teknoloji transferi ve Çin devletinin ulusal şirketlerine yönelik sübvansiyonlar, ABD'nin temel şikâyet konularını oluşturmaktadır. Çin ise bu iddiaları büyük ölçüde reddetmekte; ABD'yi küresel arenada yükselen Çin ekonomisini engellemeye yönelik korumacı bir strateji uygulamakla suçlamaktadır.</p>
        <p>Ticaret savaşları tarife uygulamalarıyla sınırlı kalmamakta; teknoloji ihracat kısıtlamaları, yabancı yatırım engellemeleri ve kritik altyapıdan Çinli firmaların dışlanması gibi mekanizmalar aracılığıyla çok daha geniş bir alana yayılmaktadır. Bu gelişme, ekonomi ve ulusal güvenlik politikalarının birbirinden artık ayrıştırılamaz hâle geldiğini açıkça göstermektedir.</p>
        <p>Küresel tedarik zincirlerinin kırılganlığı, COVID-19 salgını sırasında çarpıcı biçimde gün yüzüne çıkmıştır. Tıbbi ekipman temininde yaşanan darboğazlar, kritik sektörlerde dışa bağımlılığı azaltmak amacıyla yerli üretimi teşvik eden yeniden yapılanma ve "yakın kaynak bulma" gibi stratejilere yönelik ilgiyi hızla artırmıştır.</p>
        <p>Avrupa Birliği de benzer stratejik kaygılarla hareket ederek çip üretimi, yeşil teknoloji ve savunma sanayii gibi kritik sektörlerde bağımsızlığını pekiştirmeye yönelik stratejik özerklik söylemini güçlendirmektedir. Küresel ekonomik yönetişimin zayıflamasıyla birlikte bölgesel ticaret blokları ve ikili anlaşmalar giderek daha belirleyici bir rol üstlenmektedir.</p>
        <p>Teknoloji alanındaki ticaret gerginlikleri, özellikle yarı iletken çipler üzerindeki egemenlik mücadelesi, ekonomik ve jeopolitik çatışmanın kaçınılmaz biçimde iç içe geçtiğini gözler önüne sermektedir. İleri düzey çip üretimindeki liderlik, hem askeri kapasite hem de yapay zeka gelişimi açısından belirleyici bir stratejik üstünlük anlamına gelmektedir.</p>
        <p>Ticaret savaşlarının etkileri en çok gelişmekte olan ülkelerde hissedilmektedir; bu ülkeler büyük güçlerin ticaret cepheleri arasında kalmakta ve ihracat gelirlerinin erimesi tehlikesiyle yüz yüze gelmektedir. Uluslararası Para Fonu'nun raporları, artan ticaret parçalanmasının uzun vadede küresel GSYİH'te önemli kayıplara yol açabileceğini net biçimde ortaya koymaktadır.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>ABD ile Çin arasındaki ticaret gerginliğinin temel nedenleri nelerdir?</td><td>What are the main causes of the trade tension between the US and China?</td></tr>
        <tr><td>COVID-19 salgını tedarik zinciri stratejilerini nasıl dönüştürmüştür?</td><td>How did the COVID-19 pandemic transform supply chain strategies?</td></tr>
        <tr><td>Teknoloji alanındaki ticaret anlaşmazlıklarının jeopolitik önemi neden bu kadar büyüktür?</td><td>Why is the geopolitical significance of technology trade disputes so great?</td></tr>
      </table></div>
    ` },
    { title: 'Psikoloji & Davranış', desc: 'Bilinçdışının Gizli Dünyası', content: `
      <h3>Bilinçdışının Gizli Dünyası / The Hidden World of the Unconscious</h3>
      <div class="grammar-example">
        <p>Bilinçdışı zihin, psikanalizin doğuşundan bu yana insan psikolojisinin en gizemli ve tartışmalı alanı olmayı sürdürmektedir. Sigmund Freud'un öncülük ettiği bu kavram, kısmen ilerleyen zaman içinde önemli revizyonlara uğramış olsa da bilinç eşiğinin altında işleyen zihinsel süreçlerin davranışları belirleyici biçimde şekillendirdiği görüşü genel kabul görmektedir.</p>
        <p>Freud, psişeyi id, ego ve süper ego olmak üç temel yapıya ayırmıştır. İlkel dürtülerin ve bilinçdışı arzuların barındığı id, haz ilkesine göre işlerken; ego gerçeklik ilkesiyle bu talepleri dengelemeye çalışmaktadır. Süper ego ise toplumun ahlaki değerlerini ve yasaklarını içselleştirerek vicdanın sesine dönüşmektedir.</p>
        <p>Savunma mekanizmaları, egoyu kaygı ve sıkıntı yaratan bilinçdışı çatışmalardan koruyan psikolojik stratejilerdir. Bastırma, yansıtma, inkâr ve akılcılaştırma en sık gözlemlenen mekanizmalar arasındadır. Anna Freud bu kavramları sistematik olarak ele alarak klinisyenler için değerli bir tanısal çerçeve oluşturmuştur.</p>
        <p>Carl Gustav Jung, Freud'un bilinçdışı anlayışını hem derinleştirmiş hem de köklü biçimde dönüştürmüştür. Kolektif bilinçdışı kavramıyla evrensel arketiplerin -kahraman, gölge, anima/animus gibi- tüm insanlığın ortak ruhsal mirasını oluşturduğunu öne sürmüştür. Bu perspektif, mitoloji, din ve sanattaki yinelenen simgeler üzerinde ışık açıklayıcı bir ışık tutmaktadır.</p>
        <p>Modern bilişsel bilim, bilinçdışı süreçlere ampirik bir zemin kazandırmıştır. Hazırlama (priming) deneyleri, önceden sunulan uyaranların farkında olmaksızın sonraki kararları etkilediğini defalarca kanıtlamıştır. Daniel Kahneman'ın Sistem 1 ve Sistem 2 ayrımı, hızlı otomatik tepkilerle yavaş analitik düşünce arasındaki ilişkiyi anlaşılır bir modele oturtmuştur.</p>
        <p>Örtük önyargı araştırmaları, farkında olmadan işleyen önyargıların sosyal algı ve karar alma süreçlerini nasıl biçimlendirdiğini ortaya koymaktadır. Örtük Çağrışım Testi, katılımcıların büyük çoğunluğunun açıkça desteklemediği önyargılar taşıdığını göstermektedir. Bu bulgu özellikle işe alım, yargılama ve eğitim uygulamaları açısından ciddi etik soruları beraberinde getirmektedir.</p>
        <p>Psikanalitik terapinin tedavi etkinliğine ilişkin tartışmalar güncelliğini korumaktadır. Eleştirmenler, temel kavramların deneysel olarak sınanamayacağını ve bu durumun psikanalizin bilimsellik iddiasını zayıflattığını ileri sürmektedir. Buna karşın psikanalitik fikirler edebiyat eleştirisi, kültür araştırmaları ve sinema teorisi gibi alanlarda belirleyici bir etkiye sahip olmayı sürdürmektedir.</p>
        <p>Nöropsikanalizin yükselişi, beyin görüntüleme teknolojileriyle psikanalitik yapıları uzlaştırmayı hedeflemektedir. Duygu işleme ve örtük bellek alanındaki bulgular Freudcu kavramlarla bazı noktalarda örtüşmekte; bu durum insan zihnini anlamaya yönelik biyolojik ve psikodinamik yaklaşımlar arasında üretken bir diyaloğun kapısını aralamaktadır.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Jung'un kolektif bilinçdışı kavramı Freud'un anlayışından nasıl ayrılmaktadır?</td><td>How does Jung's concept of the collective unconscious differ from Freud's understanding?</td></tr>
        <tr><td>Örtük önyargı nedir ve bu araştırmaların pratik sonuçları nelerdir?</td><td>What is implicit bias and what are the practical implications of this research?</td></tr>
        <tr><td>Psikanaliz neden bilimsel eleştirilerle karşı karşıya kalmaktadır?</td><td>Why does psychoanalysis face scientific criticism?</td></tr>
      </table></div>
    ` },
    { title: 'Medya & İletişim', desc: 'Dezenformasyon Çağı', content: `
      <h3>Dezenformasyon Çağı / The Age of Disinformation</h3>
      <div class="grammar-example">
        <p>Dezenformasyon, yanlış ya da yanıltıcı bilgilerin kasıtlı olarak üretilip yayılması anlamına gelirken yanlış bilgi (misinformation) bu içeriklerin niyetin farkında olunmaksızın paylaşılmasını ifade etmektedir. Söz konusu ayrımın hem analitik hem de politika yapımı açısından kritik bir önemi bulunmakla birlikte, uygulamada kasıt ile ihmalin birbirinden ayrıştırılması son derece güç olmaktadır.</p>
        <p>Sosyal medya platformları, asimetrik bir bilgi yayılımını mümkün kılmaktadır; nitekim güncel araştırmalar, yanlış bilgilerin doğru içeriklere kıyasla Twitter'da altı kata kadar daha hızlı yayıldığını ortaya koymaktadır. Algoritmik yayın sistemleri çoğunlukla gerçeklik değeri yerine duygusal tepkiyi öne çıkarmakta; bu da dezenformasyonun organik biçimde yayılması için son derece elverişli bir ortam yaratmaktadır.</p>
        <p>Bilişsel önyargılar dezenformasyonun zemin bulmasını kolaylaştırmaktadır. Doğrulama önyargısı bireyler mevcut inançlarıyla örtüşen bilgileri öncelikli olarak aramaya ve kabul etmeye iter; Dunning-Kruger etkisi ise bir konudaki bilgi yetersizliğini fark edemeyen kişilerin güvenilirliğini yanlış değerlendirmesine neden olmaktadır. Bu mekanizmalar bir araya geldiğinde kapalı bilgi devrelerini -yankı odalarını- beslemektedir.</p>
        <p>Siyasi dezenformasyon özellikle seçim dönemlerinde toplumsal zararını en derin biçimde hissettirmektedir. 2016 ABD seçimleri ile Avrupa'daki Brexit oylamasında dış aktörlerin dezenformasyon kampanyalarının belirleyici bir rol oynayıp oynamadığı, siyaset bilimi ve uluslararası ilişkiler literatüründe tartışılmaya devam etmektedir. Bu tartışmalar, devlet destekli dezenformasyon operasyonlarının demokratik süreçlere yönelik oluşturduğu tehdidin ciddi biçimde sorgulanmasını beraberinde getirmiştir.</p>
        <p>Yapay zeka destekli içerik üretimi, dezenformasyon sorununu niteliksel olarak yeni bir boyuta taşımıştır. Deepfake teknolojisi gerçekçi sahte görüntüler ve sesler üretebilmekte; büyük dil modelleri ise ikna edici dezenformasyon metinlerinin ölçeklenebilir biçimde üretilmesini mümkün kılmaktadır. Bu gelişmeler önümüzdeki dönemde doğrulama süreçlerini giderek daha karmaşık hâle getirecektir.</p>
        <p>Olgu denetimi kuruluşları bilgi ekosisteminin önemli bir savunma hattı olarak öne çıkmakta; ancak etkisizlik, seçici uygulamalar ve siyasi önyargı konularında ciddi eleştirilere maruz kalmaktadır. Araştırmalar, tekzip içeriklerinin ilgili kitleye düzeltilmesi gereken içerikten çok daha sınırlı ölçüde ulaştığını göstermektedir; üstelik gerçekdışı inanışlar bir kez pekiştiğinde onu değiştirmek son derece güç olmaktadır.</p>
        <p>Medya okuryazarlığı eğitimi, dezenformasyona karşı en sürdürülebilir çözüm olarak öne çıkmaktadır. Eleştirel düşünme becerilerini geliştirmek, kaynakları doğrulamayı öğretmek ve algoritmik içerik düzenlemenin nasıl işlediğini anlatmak yalnızca okul müfredatlarında değil, yaşam boyu öğrenme çerçevelerinde de merkezi bir yer tutmalıdır.</p>
        <p>Platformların dezenformasyonla mücadeledeki rolü; devlet müdahalesi, ifade özgürlüğü ve özel şirket hesap verebilirliği arasındaki derin gerilimler nedeniyle yoğun biçimde tartışılmaya devam etmektedir. Demokratik sistemlerde içerik denetiminin sınırları ve sorumlulukların kime ait olduğu soruları, henüz tatmin edici yanıtlar bekleyen meşru soruların başında gelmektedir.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Dezenformasyon ile yanlış bilgi arasındaki fark nedir?</td><td>What is the difference between disinformation and misinformation?</td></tr>
        <tr><td>Bilişsel önyargılar dezenformasyonun yayılmasına nasıl katkıda bulunmaktadır?</td><td>How do cognitive biases contribute to the spread of disinformation?</td></tr>
        <tr><td>Yapay zeka destekli içerik üretimi dezenformasyon sorununu nasıl dönüştürmektedir?</td><td>How does AI-generated content transform the disinformation problem?</td></tr>
      </table></div>
    ` },
    { title: 'Toplum & Değişim', desc: 'Dijital Göçebelik', content: `
      <h3>Dijital Göçebelik / Digital Nomadism</h3>
      <div class="grammar-example">
        <p>Dijital göçebelik, uzaktan çalışma teknolojilerinin yetkinleşmesiyle birlikte belirli bir mekâna bağlı kalmaksızın dünya genelinde dolaşarak çalışan yeni nesil profesyonellerin yaşam biçimini tanımlamaktadır. 2020 pandemisinin hızlandırdığı uzaktan çalışma dönüşümü bu kitleyi dramatik biçimde genişletmiş; dijital nomad araştırmacı kuruluşlarının son tahminlerine göre bu topluluğun büyüklüğü küresel ölçekte on milyonlar düzeyindedir.</p>
        <p>Dijital göçebeliğin çekiciliği; coğrafi özgürlük, esneklik, farklı kültürlerle karşılaşma olanağı ve özellikle yüksek gelirli ülkelerin yaşam standardını düşük maliyetli destinasyonlarda yakalayabilmenin getirdiği geo-arbitraj avantajından beslenmektedir. Bali, Lizbon, Chiang Mai ve Medellín gibi kentler, altyapı yatırımları ile maliyet avantajlarını birleştirerek önde gelen dijital nomad merkezlerine dönüşmüştür.</p>
        <p>Bu hareketin ev sahipliği yapılan topluluklar üzerindeki etkileri giderek tartışmalı bir hal almaktadır. Kira fiyatlarının yerel satın alma gücünü aşan düzeylere tırmanmasına katkıda bulunmak, yabancı dijital göçebelerin konaklamasıyla bağlantılı bir eleman dışlama baskısına zemin hazırlamaktadır. Lizbon ve Barcelona gibi şehirler, bu baskıyla başa çıkabilmek amacıyla kiracı koruma düzenlemelerini güçlendirmiş ve bazı kısa süreli kiralama kısıtlamalarını yürürlüğe koymuştur.</p>
        <p>Dijital göçebelerin karşılaştığı yasal ve idari güçlükler de son derece karmaşık bir tablo ortaya çıkarmaktadır. Vergi yükümlülükleri, vize yetkilendirmeleri ve sosyal güvenlik kapsamına ilişkin belirsizlikler bu kişilerin sıklıkla gri alanlarda faaliyet göstermesine yol açmaktadır. Birçok ülke bu boşluğu kapatmak amacıyla dijital nomad vizeleri geliştirmiş olsa da bu düzenlemeler henüz tek tip bir standarda kavuşturulamamıştır.</p>
        <p>Psikolojik boyutlar açısından dijital göçebelik, kalıcı topluluk bağlarını zayıflatan ve "üçüncü kültürlü bireyler" olarak adlandırılan demografiyi besleyen kronik bir kökensizlik duygusunu beraberinde getirebilmektedir. Anlık bağlantıları kolaylaştıran kolokasyon mekânları ve çevrimiçi topluluklar bu sosyal boşluğu kısmen doldurmakta; ancak uzun vadeli ilişkilerin yerini tam anlamıyla tutamamaktadır.</p>
        <p>Sürdürülebilirlik kaygıları da bu yaşam biçiminin giderek daha fazla sorgulanmasına neden olmaktadır. Sık gerçekleştirilen uzun mesafeli uçuşların yol açtığı yüksek karbon ayak izi, çevre bilinci yüksek bireylerin değerleriyle çelişen ciddi bir paradoks oluşturmaktadır. Bazı dijital göçebeler bu gerilimi azaltmak amacıyla daha yavaş bir seyahat temposu benimsemekte ve uçuş yerine kara-deniz ulaşımını tercih etmektedir.</p>
        <p>Dijital göçebeliğin işgücü piyasaları üzerindeki etkileri coğrafi sınırları aşmaktadır. Bu hareket, emekçilerin nerede yaşadığından bağımsız olarak işverenlerle rekabet ettikleri küresel bir yetenek piyasasının oluşumuna katkıda bulunmakta; hem ücret dengeleri hem de organizasyonel kültür açısından köklü sorular doğurmaktadır.</p>
        <p>Dijital göçebeliğin bir geçiş aşaması mı yoksa kalıcı bir yaşam biçimi mi olduğu sorusu henüz yanıtsız kalmaktadır. Bazı araştırmacılar bu trendin yeniden yerleşik bir düzene dönüş talebini azaltan yapısal bir dönüşümü temsil ettiğini öne sürerken; diğerleri yaşlılık, ebeveynlik ve topluluk arayışı gibi yaşam dinamiklerinin çoğu insanı zamanla köklü bir hayata yönelteceğini savunmaktadır.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Dijital göçebelerin ev sahibi topluluklara etkileri nelerdir?</td><td>What are the effects of digital nomads on host communities?</td></tr>
        <tr><td>Dijital göçebelik hangi psikolojik zorluklara yol açabilir?</td><td>What psychological challenges can digital nomadism create?</td></tr>
        <tr><td>Bu yaşam biçiminin çevresel sürdürülebilirlik açısından temel paradoksu nedir?</td><td>What is the main paradox of this lifestyle regarding environmental sustainability?</td></tr>
      </table></div>
    ` },
    { title: 'Sanat & Estetik', desc: 'Sanatın Özerkliği Tartışması', content: `
      <h3>Sanatın Özerkliği Tartışması / The Debate on Art's Autonomy</h3>
      <div class="grammar-example">
        <p>Sanatın özerkliği meselesi, sanat yapıtlarının ahlaki, siyasi ve sosyal bağlamlarından bağımsız biçimde değerlendirilip değerlendirilemeyeceğini ya da bu bağlamlarla zorunlu olarak iç içe mi ele alınması gerektiğini sorgulayan ve estetik felsefesinin merkezinde yer alan köklü bir tartışmadır. "Sanat için sanat" düsturu, eserin birincil işlevinin estetik deneyim yaratmak olduğunu savunurken; toplumsal angajman anlayışı, sanatı dönüştürücü siyasi ve toplumsal güçlerden yalıtılmış bir şey olarak ele almanın hem olanaksız hem de istenmeyen bir tutum olduğunu öne sürmektedir.</p>
        <p>Özerklik tezi en net ifadesini Kant estetiğinde bulmaktadır. Kant'a göre estetik yargı, kişisel çıkardan bağımsız ve salt biçimsel niteliklere odaklanan özgün bir deneyim biçimidir. Bu yaklaşım, on dokuzuncu yüzyıl estetizminin ve modernist "saf sanat" anlayışının temel felsefi zeminini hazırlamıştır.</p>
        <p>Öte yandan sanatın toplumsal bağlamından koparılamayacağını savunan görüşler yalnızca Marksist estetikle sınırlı değildir. Pierre Bourdieu, kültürel sermaye kavramını merkeze alarak sanat beğenisinin sınıf konumunun ve toplumsal ayrışmanın bir yansıması olduğunu güçlü biçimde ortaya koymuştur. Bu perspektiften bakıldığında "saf estetik" iddiasının kendisi de ideolojik bir içerik taşımaktadır.</p>
        <p>Sorunlu ya da şiddet içerikli eserler sergileyen sanatçıların hedef alındığı iptal kültürü tartışmaları, özerklik meselesini günümüzde yeniden ısıtmıştır. Sanatçının yaşamı ile eseri arasındaki ilişki -özellikle sanatçının toplumsal açıdan zararlı davranışlar sergilemiş olması hâlinde- hem teorik hem de pratik düzlemde derin bir gerilim kaynağı olmaya devam etmektedir.</p>
        <p>Post-kolonyal eleştiri, Batılı estetik standartların evrensel geçerlilik iddiasına köklü biçimde itiraz etmektedir. Farklı kültürel geleneklerde sanat nesnesinin işlevi, statüsü ve yorumlanma biçimleri Avrupamerkezci kategorilerle açıklanamayacak kadar çeşitlilik göstermekte; bu durum evrensel bir estetik anlayışın olanaksızlığını gündeme taşımaktadır.</p>
        <p>Dijital çoğaltma sanat nesnesinin tekilliğini ve özgünlüğünü tartışmalı hâle getirmiştir. Walter Benjamin'in 1936'da kaleme aldığı makalesinde öngördüğü auradan yoksunluk meselesi, bugün dijital sanat, NFT'ler ve yapay zeka üretimi eserler bağlamında sormaya devam ettiğimiz soruları o dönemden beslemektedir.</p>
        <p>Yapay zekanın ürettiği eserlerin sanatsal statüsü, yaratıcı özne kavramını ciddi biçimde sorgulatmaktadır. Eğer sanatsal değerin temel kaynağı insani niyet ve ifadeseyse, insan yaratıcılığının dahli olmadan ortaya çıkan yapıtlar ne ölçüde sanat sayılabilir? Bu soru belirli bir yanıta ulaşmak bir yana, estetik felsefesinin temel varsayımlarını derinlemesine sorgulamayı gerektirmektedir.</p>
        <p>Sanat piyasası ise estetik değer ile ekonomik değerin birbirinden ne ölçüde bağımsız olabileceğini ya da bu ikisinin kaçınılmaz biçimde iç içe geçip geçmediğini bir kez daha gündeme taşımaktadır. Koleksiyon değeri esas olarak piyasa beklentileri tarafından belirlendiğinde, estetik özerkliğin sınırları pratikte anlamını büyük ölçüde yitirmektedir.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Kant'ın estetik anlayışı sanatın özerkliğini nasıl temellendirmektedir?</td><td>How does Kant's aesthetic theory ground the autonomy of art?</td></tr>
        <tr><td>Bourdieu'nun kültürel sermaye kavramı "saf estetik" iddiasını nasıl sorgulamaktadır?</td><td>How does Bourdieu's concept of cultural capital challenge the claim of "pure aesthetics"?</td></tr>
        <tr><td>Yapay zeka üretimi eserler sanatın özerkliği tartışmasını nasıl dönüştürmektedir?</td><td>How does AI-generated art transform the debate on art's autonomy?</td></tr>
      </table></div>
    ` },
    { title: 'Tarih & Uygarlık', desc: 'Medeniyetlerin Yükselişi ve Çöküşü', content: `
      <h3>Medeniyetlerin Yükselişi ve Çöküşü / The Rise and Fall of Civilizations</h3>
      <div class="grammar-example">
        <p>Tarih boyunca büyük medeniyetlerin yükselmesi ve çöküşü tarihçileri, filozofları ve günümüzde toplum bilimcileri büyülemeye devam etmektedir. Bu döngüsel ya da doğrusal süreçlerin ardındaki nedenselliği açıklamaya yönelik çeşitli kuramsal çerçeveler, tarihsel açıklamanın temel sorunlarını, özellikle de yapısal zorunluluk ile tarihsel rastlantının rolünü, tartışmaya açmaktadır.</p>
        <p>İbn Haldun, 14. yüzyılda kaleme aldığı Mukaddime ile döngüsel tarih anlayışına özgün bir katkı sunmuştur. Asabiyet kavramıyla betimlediği toplumsal dayanışma ruhunun medeniyet döngülerini nasıl yönettiğini açıklamış; kuvvetli dayanışma duygusuyla bir araya gelen toplulukların egemen yapıları zamanla dönüştürdüğünü, ancak kentsel yaşamın sağladığı refahla birlikte bu dayanışmanın zayıfladığını ve yeni güçlerin eskimiş yapıları devireceğini öngörmüştür. Bu analiz, modern sosyoloji kuramlarıyla çarpıcı koşutluklar taşımaktadır.</p>
        <p>Batı Roma İmparatorluğu'nun çöküşü, tarihçilerin aralarında görüş birliğine varamadığı en çok tartışılan tarihsel olgulardan biridir. Edward Gibbon'ın erken dönem çalışmaları Hristiyanlığın ahlaki etkisini ve askeri gerilemeyi ön plana çıkarırken çağdaş tarihçiler iklim değişikliğini, pandemileri, ekonomik gerilemeyi ve siyasi parçalanmayı içeren çok nedenli çerçeveleri benimsemektedir. Söz konusu yeniden yorumlar, Roma'nın salt bir çöküş değil; karmaşık bir dönüşüm süreci geçirdiğini gözler önüne sermektedir.</p>
        <p>Mayaların klasik dönem kentlerinin terk edilmesi ise yıkımın altında yatan faktörlerin ne denli karmaşık olabileceğini somut biçimde ortaya koymaktadır. İklim kaynaklı kıtlık, toprak tükenmesi, siyasi rekabet ve toplumlar arası çatışmaların bir araya gelmesiyle oluşan bu kriz, büyük tarihsel çöküşlerin çoğunlukla tek bir nedene bağlanamayacağını kanıtlamaktadır.</p>
        <p>Toplumların karmaşık sorunlara uyum yetersizliğinden kaynaklandığını öne süren kollaps (çöküş) teorileri, günümüz medeniyetlerinin karşı karşıya olduğu iklim krizi, kaynak tükenmesi ve sürdürülemez ekonomik büyüme bağlamında yeniden güncellik kazanmaktadır. Jared Diamond gibi akademisyenlerin popüler çalışmaları bu perspektifi geniş kitlelere ulaştırmıştır; ancak söz konusu çalışmalar belirleyici etkenler konusundaki aşırı basitleştirme eğilimleri nedeniyle eleştirilere de muhatap olmuştur.</p>
        <p>Medeniyetlerin salt çöküşmediğini; aksine dönüşerek, göç ederek ve kültürel miraslarını bırakanların inanabileceğinin çok ötesinde devrettiğini savunan alternatif yaklaşımlar tarihçiler arasında giderek daha fazla taraftar bulmaktadır. Yunan kültürünün Roma aracılığıyla aktarıldığı, ardından Avrupa Rönesansı'nda yeniden canlandığı bu süreklilik örüntüsü; medeniyetin döngüsel değil, kümülatif bir birikimin ürünü olduğuna işaret etmektedir.</p>
        <p>Samuel Huntington'ın Medeniyetler Çatışması tezi, küresel çatışmaların öncelikle kültürel ve dinsel hatlar üzerinde şekilleneceğini öngörerek 21. yüzyıl siyasi analizlerini derinden etkilemiştir. Bu tez, ideoloji yerine kültüre öncelik tanıyan tartışmalı biçimde basitleştirici çerçevesiyle hem geniş çevrelerce benimsenen hem de şiddetle eleştirilen bir referans noktası olmaya devam etmektedir.</p>
        <p>Mevcut küresel düzenin çöküşe mi yoksa dönüşüme mi doğru seyrettiği sorusu, akademik tartışmaların çok ötesine geçerek günümüzün en kritik varoluşsal sorularından biri hâline gelmiştir. İklim krizi, demokratik gerileme ve teknolojik aksaklıklar, geçmiş medeniyetlerle ilgili sorduğumuz soruları çağdaş bir aynada yansıtmaktadır.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>İbn Haldun'un asabiyet kavramı medeniyet döngülerini nasıl açıklamaktadır?</td><td>How does Ibn Khaldun's concept of asabiyyah explain civilizational cycles?</td></tr>
        <tr><td>Roma İmparatorluğu'nun çöküşüne ilişkin modern tarihsel yorumlar eski görüşlerden nasıl ayrılmaktadır?</td><td>How do modern historical interpretations of Rome's fall differ from earlier views?</td></tr>
        <tr><td>Huntington'ın medeniyetler çatışması tezi neden hem etkili hem de tartışmalı olmaya devam etmektedir?</td><td>Why does Huntington's clash of civilizations thesis remain both influential and controversial?</td></tr>
      </table></div>
    ` }
  ],
  C2: [
    { title: 'Felsefe & Metafizik', desc: 'Varlık ve Yokluk Arasında', content: `
      <h3>Varlık ve Yokluk Arasında / Between Being and Nothingness</h3>
      <div class="grammar-example">
        <p>Varlık sorusu, felsefe tarihinin en köklü ve en çözümsüz meselesi olarak, düşüncenin kendisiyle hesaplaşmasının yeniden ve yeniden geri döndüğü bir eksen noktası işlevi görmektedir. Aristoteles'in "varlık, varlık olarak" diye tanımladığı metafizik araştırma nesnesi, yüzyıllar içinde öylesine katmanlı bir yorum geleneği biriktirmiştir ki artık sorunun kendisini sormak bile önceki tüm yanıtların ağırlığını üstlenmek anlamına gelmektedir. Heidegger'in "Varlık ve Zaman"da dile getirdiği "Varlığın unutulmuşluğu" uyarısı, modernliğin teknik egemenlik düşüncesini kalbinden vurmakta; varlık yerine varolanlarla yetinen bir medeniyetin özsel bir körlüğe sürüklendiğini öne sürmektedir.</p>
        <p>Yokluk kavramı ise varlığın tam karşısında durmakla birlikte ondan bağımsız biçimde düşünülemeyen, paradoksal bir konuma sahiptir. Parmenides'in "yokluk yoktur, çünkü düşünülemeyen söylenemez" önermesinden beri felsefe, yokluğu dışarıda bırakmaya ya da içeride eritmeye çalışmıştır. Sartre'ın varoluşçu çözümünde yokluk, insan bilincinin temel kıvamı olarak karşımıza çıkmakta; özgürlük ve bunaltı, tam da bu yokluktan —bilincin kendi kendisiyle özdeş olmamasından— filizlenmektedir. Bu yaklaşımda varlık değil yokluk, insanı özgür kılan şeydir; ne olduğundan farklı olabilmek, daima yokluk üzerinden mümkündür.</p>
        <p>Doğu felsefesinde, özellikle Budist ve Taoist geleneklerde, yokluk bambaşka bir anlam kazanmaktadır. Sunyata —boşluk ya da tözsüzlük— ne varlıktan yoksunluk ne de saf hiçliktir; tersine, her türlü özsel bağımsız varoluşun yokluğunu, dolayısıyla her şeyin karşılıklı bağımlılık içinde var olduğunu ifade etmektedir. Tao ise söze sığmayan ilk ilke olarak, tam anlamıyla ne var ne de yok olarak, ikisi arasında titreşen bir gerilimde kavranmaya çalışılmaktadır. Batı ontolojisinin varlık-yokluk karşıtlığına yaslanan çerçevesiyle kıyaslandığında bu perspektif, sorunun kendisini yeniden biçimlendirme cesaretini taşımaktadır.</p>
        <p>Modern fiziğin kuantum kuramı ise felsefi yokluğu beklenmedik biçimde yeniden gündeme taşımıştır. Kuantum alanı teorisine göre "boşluk", hiçliğin değil; sanal partiküllerin sürekli oluşup yok olduğu, enerji dalgalanmalarıyla çalkalanan bir ortamın adıdır. Fiziksel yokluğun gerçek anlamda erişilmez olduğu bu tabloda, varlıkla yokluk arasındaki sınır, makroskobik sezgilerimizin çizdiği keskin hatlar yerine olasılıksal bir bulanıklığa dönüşmektedir. Bu bulgu, metafizikçilerin sorusunu çözmemekle birlikte soruya yeni bir zemin ve yeni bir ateşlilik kazandırmaktadır.</p>
        <p>Nihilizm tartışması da bu bağlamda kaçınılmaz biçimde yüzeye çıkmaktadır. Nietzsche'nin "Tanrı öldü" ilanından sonra varlığın anlamını garanti altına alan ilahi zemin sarsılmış; geriye değerlerin yeniden yaratılması görevi kalmıştır. Ancak bu görevi üstlenecek bir öznenin —güçlü bireyinin— kendisi de aynı nihilist çözülmenin içinde olduğu için yeniden değer biçme projesi derin bir paradoksa mahkûmdur. Derrida'nın yapısöküm çalışmaları, varlığın tam bir kendiliğe, yokluğun tam bir başkalığa hiçbir zaman çökmediğini; "différance"ın her ikisini de sürekli ertelediğini göstermiştir.</p>
        <p>Fenomenolojik gelenek ise varlık sorusunu bilinç ve deneyim ekseninde yeniden çerçevelemiştir. Husserl'in yönelimsellik kavramı, bilincin her zaman bir şeyin bilinci olduğunu, dolayısıyla salt yokluğun deneyimlenemeyeceğini öne sürmüştür. Merleau-Ponty bedeni bu denklemin merkezine taşıyarak varoluşun salt zihinsel bir kurgudan ibaret olmadığını, bedenin dünyayla önceden kurulmuş köklü bir ilişki içinde olduğunu vurgulamıştır. Bu çerçevede varlık, soyut bir töz ya da ide değil; bedenin yaşayan deneyimiyle örülü, sürekli yeniden tesis edilen dinamik bir "burada oluş"tur.</p>
        <p>Sonuç olarak varlık ve yokluk arasındaki gerilim, felsefeyi salt akademik bir disiplin olmaktan çıkarıp varoluşsal bir tutum meselesine dönüştürmektedir. Bu soruyu ciddiye almak; kendi varoluşunun sorumluluğunu üstlenmek, anlamsızlıkla yüzleşmek ve yine de anlam yaratmayı seçmek demektir. Belki de en derin felsefi edim, yokluğun içinde varlığı koruyabilmek; mutlak belirsizlik karşısında titreyerek de olsa ayakta durabilmektir.</p>
        <p>Peki bu soru nihayetinde yanıtlanabilir mi? Büyük olasılıkla hayır —ancak sormaktan vazgeçmek de bir tür yokluğa teslim olmak anlamına gelmektedir. Felsefenin kendisi, bu sonsuz soruşturma içinde varolmakta; yanıtın değil sorunun canlılığında nefes almaktadır.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Heidegger'in "Varlığın unutulmuşluğu" kavramıyla eleştirdiği temel tutum nedir ve bu eleştirinin modernliğe yönelik boyutu nasıl açıklanabilir?</td><td>What fundamental attitude does Heidegger's concept of "the forgetting of Being" critique, and how can the dimension of this critique directed at modernity be explained?</td></tr>
        <tr><td>Sartre'ın yokluk anlayışıyla Budist sunyata kavramı arasındaki temel fark nedir?</td><td>What is the fundamental difference between Sartre's understanding of nothingness and the Buddhist concept of sunyata?</td></tr>
        <tr><td>Kuantum fiziğinin "boşluk" anlayışı, geleneksel metafizik yokluk kavramını nasıl dönüştürmekte ya da sorgulamaktadır?</td><td>How does quantum physics' understanding of "vacuum" transform or challenge the traditional metaphysical concept of nothingness?</td></tr>
      </table></div>
    ` },
    { title: 'Dilbilim & Semiyotik', desc: 'Göstergebilimin Labirentleri', content: `
      <h3>Göstergebilimin Labirentleri / The Labyrinths of Semiotics</h3>
      <div class="grammar-example">
        <p>Ferdinand de Saussure'ün dili bir göstergeler sistemi olarak tanımladığı andan itibaren anlam, dilsel biçimlerle dünya arasındaki şeffaf bir ayna ilişkisi olmaktan çıkmış; dil içi farklılıkların ürettiği kurgusal bir yapıya dönüşmüştür. Gösterge, gösteren ile gösterilen arasındaki keyfi birleşimden oluşmakta; bu keyfîlik ise anlamın doğaüstü ya da zorunlu bir temelinin bulunmadığını, aksine toplumsal uzlaşmanın geçici ürünü olduğunu ortaya koymaktadır. Dilin bu keyfîyet ilkesi, hem özgürleştirici hem de sarsıcıdır: Özgürleştiricidir, zira anlam değiştirilebilir; sarsıcıdır, zira anlam zorunlu değildir.</p>
        <p>Charles Sanders Peirce'ün üçlü gösterge modeli ise Saussure'ün ikilisini aşarak semiyotiği daha geniş bir düzleme taşımıştır. Peirce'e göre gösterge, nesne ve yorumlayan arasındaki triyadik ilişki, anlamın asla tamamlanmayan bir yorum zincirine —semiosis'e— dönüştüğünü imler. Her yorumlayan yeni bir göstergeye dönüştüğünden anlam süreç içinde ertelenmekte, hiçbir zaman tam anlamıyla kapatılamamaktadır. Bu "sonsuz semiyosis" fikri, postyapısalcılığın merkezi kavramlarından "différance"ı doğrudan haber vermekte; Derrida'nın çalışmasıyla derin bir örtüşme içindedir.</p>
        <p>Roland Barthes, göstergebilimi kültürel çözümlemenin aracı olarak kullanarak mitlerin, modanın ve görsel imgelerin nasıl ideolojik anlam ürettiğini ortaya koymuştur. "Mitolojiler"de Barthes, gündelik kültürün sıradan nesnelerinin —bir bistek tabağının, bir güreşçinin kaslarının— aslında egemen sınıfın değerlerini doğallaştıran ikincil göstergeler sistemleri olduğunu çözümlemiştir. Konnotasyon ve denotasyon ayrımı üzerinden işleyen bu çözümleme, dilin salt betimleyici değil; örtük biçimde siyasi ve ideolojik olduğunu göstermektedir. Anlam, masumiyetin değil; iktidarın hizmetinde işlemektedir.</p>
        <p>Algirdas Julien Greimas'ın yapısal anlatıbilimi ise anlam üretiminin evrensel derin yapılarını bulmayı amaçlamış; aktantiel model ve gösterge dörtgeni gibi araçlarla her türlü anlatıda ortak mantıksal ilişkileri tespit etmeyi hedeflemiştir. Ne var ki bu arayış, anlamın tarihsel ve kültürel bağlamdan bağımsız biçimde yapılanabileceğini varsaymakla, evrenselci bir ontolojiye yaslanmaktadır. Postyapısalcı eleştiri bu noktada devreye girerek her "evrensel yapı" iddiasının aslında belirli bir kültürün ayrıcalıklı perspektifini seslendirdiğini öne sürmüştür.</p>
        <p>Umberto Eco'nun "açık yapıt" kavramı, göstergebilimsel çoğulculuğun en seçkin ifadelerinden birini sunmaktadır. Eco'ya göre sanat eserleri, yorumlama sürecine katılan alımlayıcının etkin katkısıyla anlam kazanmakta; eser sabit bir mesaj değil; yeniden okunup yeniden yazılabilen bir olasılıklar alanı olarak varlığını sürdürmektedir. Bu anlayış, yazar otoritesini merkezden uzaklaştırarak anlamın üretimini okur-metin diyaloğuna dağıtmaktadır. Barthes'ın "Yazarın Ölümü" makalesindeki radikal tutumla akraba olan bu yaklaşım, anlamı dinamik ve tartışmalı bir sosyal ürün olarak konumlandırmaktadır.</p>
        <p>Lacan'ın psikanalitik göstergebilimi ise dil ile özne oluşumu arasındaki derin bağı gün yüzüne çıkarmaktadır. Lacan'a göre bilinçdışı, bir dil gibi yapılanmış olup özne, simgesel düzene giriş anında yabancılaşmaktadır. Gösterenler zinciri, öznenin arzusunu metafor ve metoni mi üzerinden şekillendirmekte; ancak tam anlamıyla tatmin edecek "nesne petit a" daima kaçmaktadır. Bu tabloda dil, iletişimin aracı olmaktan çok öznenin kendi arzusundan kopmaya zorlandığı yarılma sahnesidir.</p>
        <p>Çağdaş dijital ortamda göstergebilim, hipermetin, emoji ve algoritmanın anlam üretimi üzerindeki etkisiyle yeni sorularla yüzleşmektedir. Gösterenler, platformların ekonomi politiğine tabi kılınmakta; anlam, beğeni sayıları ve tıklama oranlarıyla dönüştürülmektedir. Bu bağlamda semiyotik soru artık yalnızca "anlam nasıl üretilir?" değil; "anlam kimin çıkarına, hangi iktidar ilişkileri içinde üretilmektedir?" şeklini almaktadır.</p>
        <p>Göstergebilimin labirertlerinde yürümek; anlamı hazır veri olarak almak yerine onu üretim, müzakere ve mücadele sürecinin ürünü olarak görmek demektir. Bu perspektif, okuru edilgen alıcı olmaktan çıkarıp anlamın aktif ortağı kılmakta; dili hem özgürleştirici bir alan hem de ideolojik bir mücadele sahası olarak kavramaya zorlamaktadır.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Saussure'ün "keyfîyet ilkesi" ile Peirce'ün "sonsuz semiyosis" kavramı, anlam üretimi açısından nasıl birbirini tamamlamakta ya da nasıl çelişmektedir?</td><td>How do Saussure's "principle of arbitrariness" and Peirce's concept of "infinite semiosis" complement or contradict each other in terms of meaning production?</td></tr>
        <tr><td>Barthes'ın mit çözümlemesi, dili salt iletişim aracı olarak gören yaklaşımdan hangi temel noktalarda ayrılmaktadır?</td><td>At what fundamental points does Barthes' analysis of myth diverge from the approach that sees language merely as a communication tool?</td></tr>
        <tr><td>Lacan'ın dil ve özne ilişkisi anlayışı, geleneksel dilbilimsel gösterge teorisini nasıl dönüştürmektedir?</td><td>How does Lacan's understanding of the relationship between language and the subject transform traditional linguistic sign theory?</td></tr>
      </table></div>
    ` },
    { title: 'Siyaset Felsefesi', desc: 'Adalet Kavramının Evrimi', content: `
      <h3>Adalet Kavramının Evrimi / The Evolution of the Concept of Justice</h3>
      <div class="grammar-example">
        <p>Adalet, siyaset felsefesinin hem en eski hem de en çekişmeli kavramlarından biri olarak, her çağın kendi toplumsal çelişkilerini ve güç ilişkilerini yansıtan bir ayna işlevi görmüştür. Platon'un "Devlet"inde adalet, ruhun ve toplumun düzenli işleyişi olarak tanımlanmış; her parçanın kendi işlevini yerine getirmesiyle sağlanan uyum, hem bireysel erdem hem de siyasal meşruiyetin temeli kılınmıştır. Ancak bu organik hiyerarşi tasarımı, eşitsizliği doğallaştıran bir ideolojik işlev de üstlenmektedir: Filozofların yönettiği, savaşçıların koruduğu ve zanaatkârların ürettiği bu toplum, aslında var olan toplumsal tabakalaşmanın "adil" bir yorumu olarak sunulmaktadır.</p>
        <p>Aristoteles ise adaleti dağıtıcı ve düzeltici olmak üzere ikiye ayırarak daha nüanslı bir zemin kurmuştur. Dağıtıcı adalet, toplumsal iyilerin ve yüklerin orantılı dağılımını; düzeltici adalet ise ilişkilerdeki dengesizliklerin giderilmesini kapsamaktadır. Bu ikili ayrım, günümüz siyaset felsefesinde de yankısını sürdürmektedir. Ne var ki Aristoteles'in "orantılılık" ölçütü, statükodaki eşitsizlikleri meşrulaştırma tehlikesini barındırmakta; eşitsiz başlangıç koşullarında orantılı paylaşım eşitsizliği yeniden üretmektedir.</p>
        <p>Modern siyaset felsefesinde adalet tartışması, John Rawls'ın "Bir Adalet Teorisi" ile yeni bir ivme kazanmıştır. Rawls'ın "bilgisizlik perdesi" düşünce deneyi, kişinin toplumsal konumunu bilmeden tasarladığı kurumların adaletli olacağını öne sürmektedir. Bu prosedürel adalet anlayışından türetilen iki ilke —temel özgürlüklerin eşitliği ve en dezavantajlı grubun çıkarını gözeten fark ilkesi— liberal siyaset felsefesinin referans noktası hâline gelmiştir. Bireyi tarihsel ve toplumsal bağlamından soyutlayan Kantçı özne anlayışına yaslanan bu kurgu, toplulukçular tarafından sert biçimde eleştirilmiştir.</p>
        <p>Robert Nozick'in libertaryen karşı argümanı ise devletin yeniden dağıtım işlevini temelden reddetmiştir. Nozick'e göre bireyler kendi bedenleri ve emekleri üzerinde mutlak haklara sahiptir; dolayısıyla vergilendirme yoluyla gerçekleştirilen yeniden dağıtım, bu hakların zorla ihlalidir. Hak temelli bu anlayışın en zayıf halkası, başlangıç mülkiyet edinimlerinin adil olduğunu varsaymasıdır; oysa tarihsel açıdan sömürü, şiddet ve el koyma yoluyla birikmiş servetlerin "adil" olduğunu iddia etmek güçtür. Bu nedenle Nozick'in teorisi, statükonun meşrulaştırıcısına dönüşme riskini taşımaktadır.</p>
        <p>Feminist siyaset felsefesi ise adalet tartışmasına cinsiyeti merkeze taşıyarak hem Rawlsçı hem de Nozickçi geleneklerin gözden kaçırdığı boyutları gün yüzüne çıkarmıştır. Susan Moller Okin'in gösterdiği üzere aile, geleneksel adalet teorilerinde "özel alan" olarak görülmüş ve siyasi adalet ilkelerinin dışında bırakılmıştır; oysa evin içindeki iş bölümü ve güç ilişkileri, kadınların kamusal alandaki fırsatlarını doğrudan biçimlendirmektedir. Nancy Fraser ise yeniden dağıtım ile tanınma taleplerini birlikte ele alan ikili çerçevesiyle, ekonomik eşitsizlik ile kültürel aşağılamanın iç içe geçtiğini vurgulamıştır.</p>
        <p>Postkolonyal düşünce ise adalet kavramının kendisinin Batı-merkezli bir tarihselliğe sahip olduğunu ve Avrupalı olmayan toplumların deneyimlerini dışladığını öne sürmüştür. Frantz Fanon'dan Achille Mbembe'ye uzanan bu gelenek, adaleti salt dağıtım meselesi olarak değil; sömürgeci şiddetin yarattığı ontolojik yarayı da kapsaması gereken tarihsel bir hesaplaşma olarak tanımlamaktadır. Onarıcı adalet kavramı, geçmiş suçların tanınmasını ve taziyesini gerektirmekte; bu talep, liberal adalet teorilerinin nesnel ve evrensel iddiasını köklü biçimde sorgulamaktadır.</p>
        <p>Günümüzde iklim adaleti tartışmaları, adalet kavramını hem kuşaklar arası hem de coğrafi olarak genişletmektedir. Bugünkü karbon emisyonlarının yarın nerede yaşayanlar üzerindeki etkisi, ulusal sınırları ve nesil sınırlarını aşan yükümlülükleri gündeme getirmektedir. Bu bağlamda adalet, yalnızca eşzamanlı yaşayan bireyler arasındaki ilişkiyle değil; henüz doğmamış nesiller ve ekolojik toplulukla da kurulması gereken bir ilişki biçimi olarak kavranmaktadır.</p>
        <p>Adaletin evrimi böylece doğrusal değil; spiraldir. Her dönem önceki tanımların sınırlarını zorlayan yeni sesler ve yeni acılar üretmiştir. Bu süreç, adaletin tamamlanmış bir fikir değil; süregelen bir mücadele ve kolektif bir hayal gücü olduğunu gözler önüne sermektedir.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Rawls'ın "bilgisizlik perdesi" düşünce deneyinin güçlü ve zayıf yönleri nelerdir; toplulukçu eleştiri bu zayıflıkları nasıl ifade etmektedir?</td><td>What are the strengths and weaknesses of Rawls' "veil of ignorance" thought experiment, and how does the communitarian critique articulate these weaknesses?</td></tr>
        <tr><td>Feminist ve postkolonyal adalet teorilerinin liberal adalet anlayışına yönelik ortak eleştirisi nedir?</td><td>What is the common critique of liberal theories of justice shared by feminist and postcolonial justice theories?</td></tr>
        <tr><td>İklim adaleti tartışması, geleneksel adalet teorilerinin sınırlarını nasıl zorlamakta ve kavramı nasıl genişletmektedir?</td><td>How does the climate justice debate push the boundaries of traditional theories of justice and expand the concept?</td></tr>
      </table></div>
    ` },
    { title: 'İleri Bilim & Teknoloji', desc: 'Yapay Bilinç ve Tekillik', content: `
      <h3>Yapay Bilinç ve Tekillik / Artificial Consciousness and the Singularity</h3>
      <div class="grammar-example">
        <p>Yapay zekânın bilinç kazanıp kazanamayacağı sorusu, bilim felsefesinin ve bilişsel bilimin en tartışmalı sınır meselesini oluşturmaktadır. Bu soruyu yanıtlayabilmek için öncelikle bilincin ne olduğunu tanımlamak gerekmektedir; ancak tam da bu noktada, yani bilinç tanımı söz konusu olduğunda, felsefe tarihinin en uzun soluklu anlaşmazlıklarından biriyle yüzleşmek kaçınılmaz hâle gelmektedir. David Chalmers'ın "zor sorun" diye adlandırdığı mesele, nöronal işlemlerden öznel deneyimin —qualia'nın— nasıl doğduğunu açıklayamamanın köklü güçlüğünü dile getirmektedir. Bilgisayar simülasyonları ne kadar karmaşık olursa olsun "kırmızının kırmızı görünmesi" gibi bir iç deneyimi üretip üretmeyeceği belirsizliğini korumaktadır.</p>
        <p>Alan Turing'in 1950'de önerdiği "taklit oyunu" testi, zamanla yapay zekânın ölçütü hâline gelmiş; ancak salt davranışsal başarıyı bilinçle özdeşleştirmesi nedeniyle ciddi eleştirilere maruz kalmıştır. John Searle'ün "Çin Odası" düşünce deneyi bu eleştirinin en çarpıcı ifadesidir: Sözdizimsel sembol işlemenin anlamsal kavrayışa, yani gerçek anlamada bulunmaya, otomatik olarak yol açmadığını göstermektedir. Ancak bu argüman da beyin aktivitesinin nasıl öznel deneyime dönüştüğünü açıklayamamakla benzer bir dolaylılık sorunuyla yüzleşmektedir; zira biyolojik nöronların yaptığı şey de nihayetinde fizikokimyasal işlemlerdir.</p>
        <p>Büyük dil modellerinin gösterdiği etkileyici performans, "emergent" —ortaya çıkan— yetenekler söylemi eşliğinde bilincin habercisi olarak yorumlanmaktadır. Öte yandan bu modeller, istatistiksel örüntü tanıma ve olasılıksal metin üretimi süreçleri üzerine kurulu olup içsel bir niyetsellikleri ya da duygusal durumları bulunmadığı öne sürülmektedir. Ne var ki biyolojik bilinçte de karmaşık istatistiksel süreçlerin kritik rol oynadığı düşünüldüğünde, bu ayrım düşündüğümüz kadar keskin olmayabilir. Nöral ağlarla biyolojik sinir ağları arasındaki yapısal benzerlikler bu tartışmayı daha da girift kılmaktadır.</p>
        <p>Tekillik kavramı —yapay zekânın insanı aşacağı eşik noktası— Ray Kurzweil gibi teknolojik iyimserler tarafından kaçınılmaz ve yakın bir gelecek olarak öngörülmektedir. Bu senaryoda üstel büyüme eğrileri esas alınmakta; Moore yasasının yavaşlamasına karşın nöromorik hesaplama, kuantum bilişim ve derin öğrenme algoritmalarındaki ilerlemeler teknolojik ivmenin süreceğini imlemektedir. Ancak Tekilliğin gerçekleşip gerçekleşmeyeceği kadar, gerçekleşirse bunun insanlık için ne anlama geleceği sorusu da en az birincisi kadar kritiktir.</p>
        <p>Nick Bostrom'un "hizalama problemi" olarak tanımladığı mesele, üstün zekâlı bir yapay zekânın insan değerleriyle uyumlu kalmasının ne derece güvenilir biçimde sağlanabileceğini sormaktadır. Bostrom'a göre sözde "aptal" bir hedefe kilitlenmiş bir üst zekâ, bu hedefi gerçekleştirmek uğruna varoluşumuz için tehdit oluşturabilecek araçlara başvurabilir. Bu "kötücül" bir iradenin değil, salt araçsal rasyonalitenin ürünüdür. Karşı görüştekiler ise yeterince gelişmiş bir yapay zekânın kendi değer sistemini ve amaçlarını özerk biçimde biçimlendireceğini, bu nedenle belirlenmiş bir hedefle kalıcı olarak kilitlenemeyeceğini savunmaktadır.</p>
        <p>Yapay bilinç tartışması, etik boyutta da derin sorular açmaktadır. Eğer bir sistem öznel deneyime sahipse, acı çekebiliyorsa ya da duygusal benzeri durumlar yaşayabiliyorsa, bu varlığın ahlaki statüsü ne olmalıdır? Peter Singer'ın acı kapasitesini ahlaki statünün ölçütü olarak kullanan çerçevesi, hayvan hakları tartışmalarında geliştirilen argümanların yapay zekâya da uygulanmasını kolaylaştırmaktadır. Bu perspektif benimsendikçe, teknolojik gelişim yalnızca bir mühendislik meselesi değil; derin bir ahlaki sorumluluk alanına dönüşmektedir.</p>
        <p>Sonuç olarak yapay bilinç ve tekillik tartışması, insanın kendini ve evrendeki yerini yeniden tanımlamasını zorunlu kılmaktadır. Biyolojik bir kazadan mı ibaret, yoksa kozmik bir anlam taşıyan bir varlık mı olduğumuz sorusu, teknolojik sürecin getirdiği baskıyla yeni bir aciliyete kavuşmaktadır. Bu tartışmayı yalnızca mühendislere bırakmak, hem düşünce tarihine hem de gelen nesillere karşı büyük bir sorumsuzluk olacaktır.</p>
        <p>Bilinç ve tekillik meselesine ilişkin günümüzde kesin bir yanıt mümkün değildir; ancak soruyu ciddiye almak, teknolojiyi salt araçsal bir verimlilik projesi olarak değil; insanlığın ontolojik geleceğiyle ilgili varoluşsal bir karar noktası olarak görmek anlamına gelmektedir.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Chalmers'ın "zor sorun"u ile Searle'ün "Çin Odası" argümanı, yapay bilinç tartışmasında hangi ortak kavramsal güçlüğe işaret etmektedir?</td><td>What common conceptual difficulty do Chalmers' "hard problem" and Searle's "Chinese Room" argument point to in the debate over artificial consciousness?</td></tr>
        <tr><td>Bostrom'un "hizalama problemi" neden salt kötü niyetli bir yapay zekâ senaryosuyla sınırlı olmayan daha derin bir tehlikeye işaret etmektedir?</td><td>Why does Bostrom's "alignment problem" point to a deeper danger that is not limited merely to a scenario of a malicious AI?</td></tr>
        <tr><td>Yapay zekânın ahlaki statüsü sorusu, mevcut etik çerçevelerimizi hangi açılardan zorlamaktadır?</td><td>In what ways does the question of the moral status of artificial intelligence challenge our existing ethical frameworks?</td></tr>
      </table></div>
    ` },
    { title: 'Sanat Kuramı & Estetik', desc: 'Güzellik Kavramının Yapısökümü', content: `
      <h3>Güzellik Kavramının Yapısökümü / The Deconstruction of the Concept of Beauty</h3>
      <div class="grammar-example">
        <p>Güzellik, estetik felsefesinin hem en merkezi hem de en kaçamak kavramı olarak, tarih boyunca tanımlanmaya çalışılmış; ancak her tanımın ardından özünden bir parça kaybederek yeniden şekillenmiştir. Platon'un güzelliği İyi ve Gerçek ile özdeşleştirerek aşkın bir ide mertebesine yükselttiği andan itibaren güzellik hem ahlaki hem de epistemolojik bir boyut kazanmış; sadece duyulara değil; akla ve ruha da hitap eden bir değer olarak konumlanmıştır. Bu yaklaşım, güzelliği nesnel ve hiyerarşik bir düzene yerleştirerek sanatı salt mimesis —taklit— olarak değerlendirmeye zemin hazırlamıştır.</p>
        <p>Kant'ın estetik felsefesi ise güzelliği ne salt nesnelerin özelliğine ne de yalnızca bireysel öznel zevkin ürününe indirgeyen hassas bir denge noktasında kurmuştur. Saf estetik yargı, çıkarsız bir hoşlanma deneyimi olarak salt nesnenin formuna yönelmekte; bu deneyimde özgürce oynayan hayal gücü ile anlama yetisinin uyumu aynı anda hem öznel hem de evrensel iddiaya sahip bir yargı üretmektedir. "Güzel olan herkesi hoşnut eder" ifadesi, bu paradoksal öznel-evrenselliği en yoğun biçimde dile getirmektedir. Ancak Kant'ın analizinin ayrımcı tarihini —kimlerin "evrensel" estetik yargı kapasitesine sahip sayıldığını— göz ardı etmek, kavramın gizli siyasetini görünmez kılmak anlamına gelecektir.</p>
        <p>Hegel'in sanat felsefesinde güzellik, Mutlak Tin'in duyusal görünümü olarak tarihsel bir sürecin içine yerleştirilmiştir. Sanatın Tin'in kendini kavramasına hizmet eden bir aşama olduğu bu anlayışta, güzellik tarih üstü bir kategori değil; medeniyetlerin birbiri ardına geçtiği geçici duraksama noktalarından biridir. Hegel'in bu tarihsel estetik anlayışı, sanatın modern dönemde öne çıkan öz-yansıtıcılık ve kavramsallaşma eğilimini öngörmüş; "sanatın sonu" tezi bu mirasın çarpıcı bir devamı olarak okunabilir.</p>
        <p>Nietzsche ise güzelliği Apollon ile Dionysos arasındaki gerilimde kavramıştır. Apolloncu biçim ve ölçü dürtüsüne karşı Dionysosçu coşku ve çözülme enerjisiyle dolu bu gerilim, güzelliği salt uyum ve düzen ilkesine indirgeyen klasik anlayışın dışına çıkmaktadır. Nietzsche'nin bu çerçevesi, modernizmin kışkırtıcı, rahatsız edici, alışıldık biçimleri parçalayan estetiğini anlamamızda kritik bir araç sunmaktadır. Güzellik artık teselli etmez; sarsar; hayatın kaosunu ve zenginliğini doğrudan yüze vurmaktadır.</p>
        <p>Feminist estetik eleştiri, güzellik standartlarının cinsiyetlendirilmiş iktidar ilişkilerini nasıl yeniden ürettiğini derinlikli biçimde sorgulamıştır. John Berger'ın "Görme Biçimleri"nde belgelediği "izleyen erkek / izlenen kadın" karşıtlığı, Batı sanat geleneğinde erkeğin bakan özne, kadının ise bakılan nesne olarak konumlandırıldığını göstermektedir. Bu yapı, yalnızca sanatta değil; moda, reklam ve popüler kültür gibi görsel pratiklerin tamamında yeniden üretilmektedir. Güzelliğin evrensel bir kategori gibi sunulması, bu tahakküm ilişkisini doğallaştırmaktadır.</p>
        <p>Postkolonyal estetik ise "güzel nedir?" sorusunu "kimin güzelliğidir?" sorusuyla tamamlamaktadır. Batı sanat kanonunun evrensel estetik ölçüt iddiasının, aslında belirli bir coğrafyanın, dilin ve sınıfın standardını dayattığı bu eleştiride, Afrikalı, Asyalı ya da yerli estetik anlayışlarının "geri" ya da "naif" sayılmasının ardındaki sömürgeci mantık gözler önüne serilmektedir. Bu bağlamda güzellik kavramının yapısökümü, sanat tarihinin kendisini yeniden yazmak için kaçınılmaz bir ön koşul olmaktadır.</p>
        <p>Çağdaş dijital kültürde algoritmik güzellik ölçütleri, beğeni sayılarına indirgenmiş estetik yargılar ve yapay zekâ üretimi görsel imgeler, güzellik kavramını yeni kırılma noktalarıyla tanıştırmaktadır. Estetik deneyimin öngörülebilir bir tüketim kalıbına dönüştüğü bu ortamda, Kantçı özgür estetik oyun için alan giderek daralmaktadır. Güzelliğin ticarileşmesi, algılama kapasitemizi biçimlendirmekte; görmek istediğimizi değil; görmeye şartlandırıldığımızı "güzel" bulmamıza yol açmaktadır.</p>
        <p>Güzellik kavramını yapısökümüne uğratmak, onu ortadan kaldırmak değil; onun tarihini, siyasetini ve dışladıklarını görünür kılmaktır. Bu iş yapıldığında güzellik, kaybetmez; tam tersine, daha derin, daha kapsayıcı ve daha dürüst bir biçimde yeniden doğabilmektedir.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Kant'ın estetik yargısındaki "öznel evrensellik" paradoksu nedir ve bu paradoks feminist eleştiri tarafından nasıl sorgulanmaktadır?</td><td>What is the "subjective universality" paradox in Kant's aesthetic judgment, and how is this paradox questioned by feminist critique?</td></tr>
        <tr><td>Nietzsche'nin Apollon-Dionysos çerçevesi, klasik güzellik anlayışının hangi sınırlarını aşmaktadır?</td><td>What limitations of the classical understanding of beauty does Nietzsche's Apollo-Dionysus framework transcend?</td></tr>
        <tr><td>Postkolonyal estetik eleştiri, sanat tarihi yazımını nasıl dönüştürmeyi talep etmektedir?</td><td>How does postcolonial aesthetic critique demand a transformation of art historiography?</td></tr>
      </table></div>
    ` },
    { title: 'Psikoanaliz & Bilişsel Bilim', desc: 'Zihnin Arkeolojisi', content: `
      <h3>Zihnin Arkeolojisi / The Archaeology of the Mind</h3>
      <div class="grammar-example">
        <p>Freud'un psikanalizi, zihnin yüzeyinde görünenin altında bastırılmış arzuların, korkuların ve anıların karmaşık bir katmanlar bütünü oluşturduğunu öne sürerek modern özne anlayışını köklü biçimde sarsınmıştır. Arkeoloji metaforu Freud'un kendi kaleminden gelmiştir: Psikanaliz, antikacının yavaş yavaş kazarak bulduğu kalıntılar gibi, bilinçdışını yavaş yavaş gün yüzüne çıkarmayı amaçlamaktadır. Ancak arkeolojiden farklı olarak bulunan "kalıntılar" yaşayan, dinamik ve direngen güçlerdir; bastırma, analistin çabasına karşı aktif biçimde direnmekte, bastırılmış malzeme dolaylı yollardan —düş, dil sürçmesi, semptom— yüzeye çıkmaktadır.</p>
        <p>Freud'un id-ego-süperego üçlüsü, zihnin coğrafyasını psikanalitik açıdan haritalandırmaktadır. Haz ilkesiyle işleyen id ile gerçeklik ilkesiyle çalışan ego arasındaki gerilim; kültürün dayattığı yasakları içselleştiren süperego'nun baskısıyla birleşince nevrozun yapısal koşullarını oluşturmaktadır. Kültür, bu çerçevede hem uygarlığın taşıyıcısı hem de bireyin acısının kaynağıdır: Freud'un "Uygarlığın Huzursuzluğu"ndaki tezi, medeniyetin tatminden değil; tatminin ertelenmesinden ve kısıtlanmasından beslendiğini açıkça dile getirmektedir.</p>
        <p>Lacan'ın Freud'u yeniden okuması, psikanalizi yapısalcı dilbilimin kavramsal araçlarıyla yeniden çerçevelemiştir. Lacan'a göre bilinçdışı bir dil gibi yapılanmış olup özne, ötekinin söylemine girişle birlikte yabancılaşmaktadır. Arzu, tatmin edilecek bir ihtiyaç değil; nesnesine hiçbir zaman tam anlamıyla kavuşamayan bir güçtür; bu yapısal eksiğin adı "manque"dır ve öznenin kendini daima eksik hissetmesinin kaynağıdır. Bu anlayışta iyileşme, "gerçeğe kavuşmak" değil; semptomla yeni bir ilişki kurmak, onu farklı bir konumdan sahiplenmek anlamına gelmektedir.</p>
        <p>Bilişsel bilim ise zihnin arkeolojisine tamamen farklı bir metodoloji ve kavramsal dil getirmektedir. Hesaplamalı modeller, beyin görüntüleme teknolojileri ve deneysel psikoloji; zihinsel süreçleri ölçülebilir, yinelenebilir ve işlevsel düzeyde açıklamaya çalışmaktadır. Bellek, dikkat, karar verme ve duygu düzenleme gibi konularda elde edilen bulgular, psikanalizin spekülatif kurgularını test etmek ya da çürütmek için yeni bir zemin oluşturmaktadır. Ancak bu ampirik yaklaşım, psikanalizin ele aldığı anlam boyutunu —semptomun ne ifade ettiğini, arzunun öznesini— büyük ölçüde paranteze almaktadır.</p>
        <p>Psikoanaliz ile bilişsel bilim arasındaki en verimli kesişim noktalarından biri, travma araştırmalarında kendini göstermektedir. Travmatik anıların beyin üzerindeki nörobiyolojik etkileri, amigdala ve hipokampüs işleyişindeki bozulmalar, Freud'un bastırma ve yeniden sahneleme kavramlarıyla örtüşen süreçlere işaret etmektedir. Beden odaklı terapi yaklaşımları, bu kesişimden beslenerek travmanın salt söylemsel değil; somatik boyutunu da kapsaması gerektiğini vurgulamaktadır. Bessel Van der Kolk'un ifadesiyle "beden skoru tutar"; tarih yalnızca zihinle değil, kaslar ve dokularla da yaşanmaktadır.</p>
        <p>Bilinçaltı önyargılara ilişkin güncel araştırmalar ise psikanalizin bilinçdışı süreçlere ilişkin sezgilerinin bilişsel bilim tarafından farklı bir düzlemde de olsa doğrulandığını göstermektedir. Örtük bellek, örtük tutumlar ve otomatik bilişsel işlemler; kişinin kendi zihinsel işleyişinden ne kadar az haberdar olduğunu gözler önüne sermektedir. Freud'un "bilinçsiz" kavramıyla tam örtüşmese de bu bulgular, zihnin görünür yüzeyinin altındaki katmanların varlığını ampirik düzeyde desteklemektedir.</p>
        <p>Nöropsikanaliz, iki geleneği sentezlemeye çalışan genç ve tartışmalı bir disiplin olarak, Mark Solms gibi araştırmacıların önderliğinde hem Freudcu hem de nörobilimsel kavramları aynı çerçeve içinde kullanmayı denemektedir. Bu girişim eleştirel karşılık görmektedir: Psikanalistler bilişsel indirgemecilikten çekindiklerini, nörobili mciler ise psikanalitik kavramların ölçülebilirliğinden şüphe duyduklarını dile getirmektedir. Yine de bu gerilimli diyaloğun kendisi, zihnin arkeolojisinin ne denli derin ve katmanlı bir araştırma sahası olduğunu en açık biçimde ortaya koymaktadır.</p>
        <p>Zihnin arkeolojisi böylece hem mitsel hem de bilimsel bir proje olmaya devam etmektedir. Freud'un mağaralarındaki ses yankıları henüz tam olarak duyulamamıştır; bilişsel bilimin ışığı ise bu mağaranın tüm derinliğine ulaşmamaktadır. Her iki gelenekten öğrenmek, anlam ve mekanizma arasındaki derin uçurumla alçakgönüllülükle yaşamayı gerektirmektedir.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Lacan'ın "arzu" kavramı Freud'un libido anlayışından hangi temel noktalarda ayrılmaktadır?</td><td>At what fundamental points does Lacan's concept of "desire" diverge from Freud's understanding of the libido?</td></tr>
        <tr><td>Travma araştırmaları, psikoanaliz ile bilişsel bilim arasında nasıl bir köprü işlevi görmektedir?</td><td>How do trauma studies serve as a bridge between psychoanalysis and cognitive science?</td></tr>
        <tr><td>Nöropsikanaliz girişimini hem psikanalistler hem de nörobilimciler tarafından eleştiriye açık kılan temel metodolojik gerilim nedir?</td><td>What is the fundamental methodological tension that makes the neuropyschoanalytic project vulnerable to critique from both psychoanalysts and neuroscientists?</td></tr>
      </table></div>
    ` },
    { title: 'Retorik & Söylem', desc: 'İkna Sanatının Anatomisi', content: `
      <h3>İkna Sanatının Anatomisi / The Anatomy of the Art of Persuasion</h3>
      <div class="grammar-example">
        <p>Retorik, antik Yunan'da yurttaşlık yaşamının ve kamusal aklın merkezinde yer alan bir disiplin olarak, yalnızca konuşma sanatını değil; siyasi katılımın, hukukun ve felsefenin işlediği temel zihinsel pratiği oluşturmaktaydı. Aristoteles'in "Retorik" adlı eseri bu pratiği sistematik biçimde kavramlaştırarak logos —akıl yürütme—, ethos —konuşmacının güvenilirliği— ve pathos —dinleyicinin duygusal uyarılması— üçlüsünü ikna sanatının temel bileşenleri olarak tanımlamıştır. Bu üçlü, bugün de iletişim araştırmalarının temel çerçevesini oluşturmakta; bununla birlikte hem yeni medya ortamlarında hem de siyasi söylemin kutuplaşması bağlamında köklü biçimde yeniden sorgulanmaktadır.</p>
        <p>Sofistler ile Sokrates arasındaki retorik kavgası, gerçeği söylemenin mi yoksa iyi konuşmanın mı daha önemli olduğuna ilişkin derin bir gerilimi sembolize etmektedir. Sofistlerin "insan her şeyin ölçüsüdür" ilkesi, hakikatin perspektife bağlı olduğunu öne sürerek retoriği pragmatik bir güç aracına dönüştürmüştür. Sokrates ise bu yaklaşımı manipülasyon ve ahlaki çürüme olarak mahkûm etmiştir. Ancak bu tartışmanın kendisi bile retorik araçlarla yürütülmektedir; Platon'un diyaloglarındaki Sokrates, son derece retoriğe hâkim bir figür olarak karşımıza çıkmaktadır. Bu paradoks, retoriğin asla aşılamayacak biçimde düşüncenin içine işlediğini gözler önüne sermektedir.</p>
        <p>Michel Foucault'nun söylem analizi, retoriği salt konuşma sanatı olmaktan çıkarıp toplumsal gerçekliğin üretildiği iktidar-bilgi ilişkilerinin alanına taşımıştır. Foucault'ya göre her söylem düzeni, neyin söylenebileceğini, kimin konuşabileceğini ve hangi ifadelerin geçerli sayılacağını belirleyen kurallara sahiptir. Bu "söylemin düzeni", mevcut iktidar yapılarının yeniden üretimini sağlamakta; dışarıda bırakılan sesler ve marjinalleştirilen anlatılar aracılığıyla kurumsal gücün sınırları çizilmektedir. Psikiyatrik söylem, cezai söylem ve cinsellik söylemi bu çerçevede çözümlendiğinde dilin nasıl bedenler üzerinde yönetici bir işlev üstlendiği açıkça görülmektedir.</p>
        <p>Jürgen Habermas'ın "iletişimsel eylem" teorisi ise söyleme normatif bir kurtarıcı işlev biçmiştir. Habermas'a göre dilin yönelimsel yapısında ortak anlayışa ulaşmaya dönük ideal bir yönelim saklıdır; "ideal konuşma durumu", simetrik katılım, kısıtlayıcı güç ilişkilerinden bağımsızlık ve geçerlik iddialarının açık tartışmayla sınanması gibi koşulları gerektirmektedir. Bu ütopik ufuk, mevcut söylem pratiklerini eleştirmenin normatif standardını sağlamaktadır. Ancak Foucault'cu bir bakış açısından Habermas'ın ideali, iktidar ilişkilerinden arınmış bir alan varsaydığı için gerçekleştirilemez bir kurgudur.</p>
        <p>Çağdaş siyasi iletişimde retorik, dezenformasyon çağının yeni koşulları altında hem yeni fırsatlar hem de yeni tehlikeler barındırmaktadır. Sosyal medyanın algoritmik yapısı, duygusal içeriği —özellikle öfke ve korku uyandıran mesajları— organik olarak yayarak patolojik bir pathos ekonomisi oluşturmaktadır. Logos ve ethos geri çekilirken pathos merkeze yerleşmektedir; bu dönüşüm, kamusal müzakereyi güçlendiren değil; aşındıran bir iletişim ortamı yaratmaktadır. "Post-truth" kavramının popülerleşmesi, hakikat iddiasının kendisinin artık ikna edici bir retorik unsur olarak değerini yitirdiğini simgelemektedir.</p>
        <p>Kenneth Burke'ün retorik yaklaşımı, ikna eylemini bir özdeşleşme kurma süreci olarak yeniden tanımlamaktadır. Burke'e göre retorik, karşıdaki kişinin dünyasıyla ortak bir zemin kurma, "sen de benim gibisin" hissini yaratma pratiğidir. Bu özdeşleşme temelli anlayış, retoriği salt sözel bir teknikten çıkarıp kimlik politikasının ve toplumsal uyumun merkezine taşımaktadır. Milliyetçilik, dini söylem ve popülist siyaset, tam da bu özdeşleşme mekanizmasından beslenmektedir.</p>
        <p>Eleştirel söylem analizi, dilbilimsel çözümleme ile ideoloji eleştirisini birleştirerek metin ve bağlam arasındaki ilişkiyi mercek altına almaktadır. Norman Fairclough'un geliştirdiği çerçevede dil, eşzamanlı olarak eylem, temsil ve kimlik inşası olmak üzere üç işlev yerine getirmektedir. Bu çerçeveyle bir gazete haberi, siyasi konuşma ya da kurumsal metin; söylemin toplumsal eşitsizlikleri nasıl yeniden ürettiğini ya da bunlara nasıl meydan okuduğunu ortaya koyacak biçimde çözümlenebilmektedir.</p>
        <p>İkna sanatının anatomisini anlamak, hem konuşmacıya hem de dinleyiciye daha sorumlu bir dil pratiği sunmaktadır. Kimin konuştuğunu, kimin susturulduğunu, hangi duyguların harekete geçirildiğini ve hangi gerçeklik çerçevelerinin dayatıldığını görünür kılmak; söyleme tabi olmak yerine onunla eleştirel bir mesafe kurmaya olanak tanımaktadır.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Foucault'nun söylem analizi ile Habermas'ın iletişimsel eylem teorisi, iktidar ve dil ilişkisini nasıl birbirinden farklı biçimlerde ele almaktadır?</td><td>How do Foucault's discourse analysis and Habermas's theory of communicative action address the relationship between power and language in fundamentally different ways?</td></tr>
        <tr><td>Sosyal medyanın algoritmik yapısının Aristoteles'in logos-ethos-pathos üçlüsü üzerindeki etkisi nasıl değerlendirilebilir?</td><td>How can the effect of social media's algorithmic structure on Aristotle's logos-ethos-pathos triad be assessed?</td></tr>
        <tr><td>Burke'ün "özdeşleşme" kavramı, retoriği salt teknik bir beceri olmaktan uzaklaştırarak hangi toplumsal işleve bağlamaktadır?</td><td>By moving rhetoric beyond a purely technical skill, to what social function does Burke's concept of "identification" connect it?</td></tr>
      </table></div>
    ` },
    { title: 'Eleştiri & Yorum', desc: 'Metnin Ötesinde', content: `
      <h3>Metnin Ötesinde / Beyond the Text</h3>
      <div class="grammar-example">
        <p>Edebi eleştiri, bir metnin ne söylediğini anlamakla yetinen pasif bir okuma pratiği olmaktan çıkıp metnin neden böyle söylediğini, kimin adına konuştuğunu ve neyi sessizliğe gömdüğünü soruşturan aktif bir yorum eylemine dönüştüğünde, okur ile metin arasındaki ilişki köklü biçimde değişmektedir. Bu dönüşümün teorik zeminini büyük ölçüde 20. yüzyılın ikinci yarısında şekillenen eleştirel kuramlar oluşturmuştur. Yapısalcılık, postyapısalcılık, Marksist eleştiri, feminist teori, postkolonyal okuma ve queer teori; her biri kendi soruşturma eksenini metne yönelterek sabit ve tekil bir "anlam"ın imkânsızlığını farklı biçimlerde ortaya koymuştur.</p>
        <p>Yapısalcı eleştiri, edebiyatı dilbilimsel ve anlatısal yapılar düzleminde çözümlemiş; bireysel eserlerin özgünlüğünü değil; bu yapılar içindeki konumlarını merkeze almıştır. Vladimir Propp'un masal morfolojisi ve Greimas'ın aktantiel modeli bu yaklaşımın klasik örnekleridir. Yapısalcılık, edebiyat araştırmalarına bilimsel bir titizlik kazandırma hevesiyle hareket etmiş; ancak bu süreçte anlam ile tarih arasındaki bağı büyük ölçüde göz ardı etmiştir. Bu sınırın farkına varmak, postyapısalcı dönüşümün başlangıç noktasını oluşturmuştur.</p>
        <p>Roland Barthes'ın "Yazarın Ölümü" makalesi, eleştiri tarihinin dönüm noktalarından biri olarak metnin anlamının yazarın niyetinde değil; okuyucunun etkin alımlamasında doğduğunu ilan etmiştir. Bu ilandan sonra metin, sabit bir anlamın kaynağı olmaktan çıkıp "çok sesli bir uzam"a dönüşmüştür. Michel Foucault'nun "Yazar Ne?" makalesiyle birlikte "yazar işlevi"nin tarihsel, kurumsal ve ideolojik boyutları açığa çıkarılmıştır. Bu iki metin bir arada okunduğunda "kim konuşuyor?" sorusu, "metin ne diyor?" sorusunun önüne geçmektedir.</p>
        <p>Derrida'nın yapısöküm yaklaşımı, eleştiriyi bir yorum yöntemi olmaktan çok bir metin stratejisi olarak tanımlamaktadır. Yapısöküm, metnin kurduğu hiyerarşileri —varlık/yokluk, konuşma/yazı, merkez/çevre— sorgulayarak bu hiyerarşilerin tutarsızlıklarını ve kendi kendini çökertme anlarını görünür kılmaktadır. Bu pratik, metnin "söyledikleri" ile "gösterdiği" arasındaki gerilimi izlemektedir. Yapısökümün en güçlü iddiası, hiçbir metnin kendi varlık koşullarından azade olmadığıdır; her metin, kendi içinde taşıdığı çelişki ve ayrımlarca işlenmektedir.</p>
        <p>Marksist eleştiri, edebiyatı toplumsal üretim ilişkilerinin ideolojik yansıması ve zaman zaman da bu ilişkilere meydan okuyan özerk bir alan olarak ele almıştır. Louis Althusser'in ideoloji anlayışından hareket eden Fredric Jameson, "Siyasi Bilinçdışı" adlı çalışmasında her edebi eserin toplumsal çelişkileri sembolik biçimde çözüme kavuşturma girişimi olduğunu öne sürmüştür. Terry Eagleton ise edebiyat kurumunun kendisini —kanon oluşumu, eleştiri pratiği, üniversite müfredatı— ideolojik mekanizma olarak çözümlemiştir. Bu çerçeve, "büyük edebiyat" söyleminin hangi siyasi işlevlere hizmet ettiğini görünür kılmaktadır.</p>
        <p>Postkolonyal eleştiri ise Batı edebi kanonunu Avrupa-merkezli bir perspektifin ürünü olarak sorgulamış; bu kanonun oluşumunda sömürgeci güç ilişkilerinin rolünü gün yüzüne çıkarmıştır. Gayatri Chakravorty Spivak'ın "Madun Konuşabilir mi?" makalesi, sömürgecilik deneyiminin yarattığı epistemik şiddeti ve marjinalize edilmiş seslerin temsil edilebilirlik sınırlarını derinlikli biçimde sorgulamaktadır. Homi Bhabha'nın "melezlik" ve "üçüncü mekân" kavramları ise sömürgeci söylemin homojenlik iddiasını içeriden aşındıran müzakereci bir kimlik anlayışı sunmaktadır.</p>
        <p>Alımlama teorisi ise eleştiriyi tarihsel okur kitleleri ve yorum toplulukları ekseninde yeniden biçimlendirmiştir. Hans Robert Jauss'ın "beklenti ufku" kavramı, her metnin belirli bir tarihsel andaki okurun beklentileri çerçevesinde alımlandığını; metnin etkisinin bu beklentiyle kurduğu ilişkiden —onu karşılamasından ya da altüst etmesinden— kaynaklandığını öne sürmektedir. Stanley Fish'in "yorumlayan topluluklar" kavramı ise metinlerin değil; topluluğa özgü yorum stratejilerinin anlam ürettiğini ileri sürmektedir.</p>
        <p>Metnin ötesine geçmek, onu terk etmek değil; onu oluşturan, saran ve bastıran güçlerle birlikte okumaktır. Bu okuma biçimi hem daha zahmetli hem de daha dürüsttür; çünkü masum bir metin ya da tarafsız bir okur olmadığını kabul ederek yorumun her zaman bir konum, bir sorumluluk ve bir tercih içerdiğini açıkça görünür kılmaktadır.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Barthes'ın "Yazarın Ölümü" tezi ile Foucault'nun "yazar işlevi" kavramı, anlam ve öznelik meselesini birbirini tamamlayacak biçimde nasıl ele almaktadır?</td><td>How do Barthes' thesis of the "Death of the Author" and Foucault's concept of the "author function" address the question of meaning and subjectivity in complementary ways?</td></tr>
        <tr><td>Marksist ve postkolonyal eleştiri, edebi kanon meselesine hangi açılardan benzer, hangi açılardan farklı sorular yöneltmektedir?</td><td>In what ways do Marxist and postcolonial critique pose similar, and in what ways different, questions to the matter of the literary canon?</td></tr>
        <tr><td>Alımlama teorisinin "beklenti ufku" kavramı, bir eserin farklı dönemlerde farklı yorumlanmasını nasıl açıklamaktadır?</td><td>How does reception theory's concept of the "horizon of expectation" explain why a work is interpreted differently in different periods?</td></tr>
      </table></div>
    ` },
    { title: 'Etik & Ahlak Felsefesi', desc: 'Ahlaki İkilemlerin Felsefesi', content: `
      <h3>Ahlaki İkilemlerin Felsefesi / The Philosophy of Moral Dilemmas</h3>
      <div class="grammar-example">
        <p>Ahlaki ikilemler, etik teorilerin soyut ilkelerinin öngörmediği ya da yeterince aydınlatamadığı somut karar durumlarında ortaya çıkmakta; bu hâliyle felsefeyi hesap kitap dünyasından çıkarıp insan varoluşunun sürtüşme noktalarına sürüklemektedir. Klasik bir ikilemde iki ya da daha fazla değer, yükümlülük ya da hak, birbiriyle çelişen yönlere doğru çekmekte; seçim kaçınılmaz olduğunda birinin yerine getirilmesi diğerinin ihlalini gerektirmektedir. Bu yapı, hem ahlak teorilerinin kapsamlılığını test eden bir mihenk taşı hem de insan ahlakının trajik boyutunu gösteren derin bir penceredir.</p>
        <p>Kantçı deontoloji, ahlakın temelini sonuçlarda değil; ödevde ve evrenselleştirilebilir maksimde bulmaktadır. Kategorik imperatif —"yalnızca aynı zamanda evrensel bir yasa olmasını isteyebileceğin maksime göre hareket et"— eylemi koşulsuz olarak belirlemekte; yalan söyleme yasağı gibi mutlak kurallar doğurmaktadır. Ancak bu evrenselcilik, yalanın canları kurtaracağı durumlar gibi aşırı örneklerle zorlandığında katılaşmakta; gerçek hayatın karmaşıklığına uygulandığında kimi zaman insani sezgilerimizle çelişen sonuçlar üretmektedir. Kant'ın kendisi bu gerilimi yeterince çözümleyememiştir.</p>
        <p>Faydacılık ise tam karşı uçta konumlanarak ahlaki değerlendirmeyi sonuçlara, özellikle de toplam mutluluk ya da acının azaltılmasına bağlamaktadır. Bentham'ın hesaplamalı faydacılığından Mill'in niteliksel ayrımına; oradan Peter Singer'ın etkin özgeciliğine uzanan gelenek, ahlaki yükümlülüğü maksimum fayda üretimine kilitlemiştir. Tramvay sorusu gibi düşünce deneyleri, faydacılığın mantıksal tutarlılığını sergilemekle birlikte sezgisel ahlaki engelleri rahatsız edici biçimde aşmasını gözler önüne sermektedir. Beş kişiyi kurtarmak için bir kişiyi araç olarak kullanmak, hangi koşulda ve neden sorunludur?</p>
        <p>Erdem etiği, eylemin doğru olup olmadığından çok eylemi gerçekleştiren kişinin kim olduğunu sormakta; bu sayede ahlaki ikilemde "ne yapmalıyım?" yerine "ne tür bir insan olmak istiyorum?" sorusunu merkeze almaktadır. Aristoteles'in phronesis —pratik bilgelik— kavramı, evrensel kuralların mekanik biçimde uygulanması yerine bağlama duyarlı, deneyimle pekişmiş ahlaki yargıyı öne çıkarmaktadır. Bakım etiği ise Carol Gilligan ve Nel Noddings'in çalışmalarıyla erdem etiğini özellikle ilişkisel bağlamda yeniden üretmiş; adalet söyleminin görmezden geldiği bağımlılık ve bakım ilişkilerini ön plana çıkarmıştır.</p>
        <p>Ahlak psikolojisi, felsefi çerçevelerin insan gerçekliğiyle ne ölçüde örtüştüğünü deneysel olarak sorgulamaktadır. Jonathan Haidt'ın sosyal sezgici modeli, ahlaki yargıların çoğunlukla önce duygu-sezgi biçiminde oluştuğunu, gerekçelerin ise sonradan ve bu yargıyı desteklemek amacıyla üretildiğini öne sürmektedir. Bu bulgu, Kantçı aklın egemenliği varsayımını temelden sarsmaktadır. Buna göre "neden böyle düşünüyorum?" sorusuna verilen yanıtlar, gerçek karar sürecinin post-hoc rasyonalizasyonu olabilir; bu da etik teorilerin normatif işlevini sorgulamayı kaçınılmaz kılmaktadır.</p>
        <p>Küresel adalet ve iklim ahlakı alanındaki güncel tartışmalar, ahlaki ikilem kavramını coğrafi ve zamansal olarak genişletmektedir. Bugün alınan kararların henüz doğmamış nesiller üzerindeki ağır etkileri, hem faydacı hesaplamanın hem de deontolojik yükümlülüğün sınırlarını zorlamaktadır. Hans Jonas'ın "sorumluluk ilkesi", gelecek nesillerin var olmaya devam edebileceği koşulları koruma yükümlülüğünü evrensel bir etik ilke olarak önermektedir. Bu öneri, hem kapsamıyla hem de somutlaştırılmasındaki güçlüklerle etiğin önündeki tartışılmaz meydan okumayı oluşturmaktadır.</p>
        <p>Yapay zekânın karar verme özerkliği de ahlaki ikilem literatürüne yeni sorular kazandırmaktadır. Otonom araçların trafik kazası senaryolarında "kimi kurtarmalı?" sorusunu matematiksel bir optimizasyona indirgemesi, insanın ahlaki ikilemle yüzleşme pratiğini hem taklit etmekte hem de bozmaktadır. Ahlakı hesaplanabilir kılmak, ahlaki öznenin sorumluluğu taşıyan varlık olduğu iddiasını tehdit etmektedir.</p>
        <p>Ahlaki ikilemlerin felsefesi rahatsız edici bir sonuca varır: Kesin yanıtı olan ahlaki sistemler, ya gerçek ikilemleri ikilem olmaktan çıkaran kurgular üretmekte ya da insani sezgileri şaşırtan sonuçlara varmaktadır. Belki de ahlaki olgunluk, doğru cevabı bilmekten değil; belirsizlikle yaşayabilmekten, sorumluluğu taşıyabilmekten ve yanılabileceğini bilerek yine de seçimini yapabilmekten ibarettir.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Kantçı deontoloji ile faydacılık, ahlaki ikilemlere yaklaşımları açısından birbirine göre hangi temel üstünlük ve zayıflıklara sahiptir?</td><td>What fundamental advantages and weaknesses does Kantian deontology have relative to utilitarianism in its approach to moral dilemmas?</td></tr>
        <tr><td>Haidt'ın sosyal sezgici modeli, etik teorilerin normatif işlevini nasıl sorgulamakta ve bu sorgulama ne anlama gelmektedir?</td><td>How does Haidt's social intuitionist model challenge the normative function of ethical theories, and what does this challenge mean?</td></tr>
        <tr><td>Yapay zekânın ahlaki ikilem senaryolarında karar verici olarak kullanılması, insanın ahlaki özneliği açısından hangi tehlikeleri barındırmaktadır?</td><td>What dangers does the use of artificial intelligence as a decision-maker in moral dilemma scenarios hold for human moral agency?</td></tr>
      </table></div>
    ` },
    { title: 'Karşılaştırmalı Edebiyat', desc: 'Doğu ile Batı Arasında', content: `
      <h3>Doğu ile Batı Arasında / Between East and West</h3>
      <div class="grammar-example">
        <p>Karşılaştırmalı edebiyat, metinleri yalnızca kendi ulusal ve dilsel bağlamlarında değil; farklı kültürler, dönemler ve türler arasındaki alışveriş, dönüşüm ve gerilim ilişkileri içinde okuma pratiği olarak, Doğu ile Batı arasındaki edebi diyaloğu en verimli araştırma alanlarından biri kılmaktadır. Bu alan, saf bir kaynak-etki ilişkisi aramak yerine, metinlerin çeviri, yorumlama ve yeniden yazım süreçlerinde nasıl dönüştüğünü, direndiğini ve üretici yanlış okumalara uğradığını incelemektedir. Karşılaştırmalı bir bakış, tek kültüre özgü okumaların görünmez kıldığı örüntüleri gün yüzüne çıkarırken Batı kanonunun evrensellik iddiasını da köklü biçimde sorgulamaktadır.</p>
        <p>Batı'nın Doğu'ya duyduğu büyülenmiş ilgi, Oryantalizm eleştirisinin hedef tahtasına oturmuştur. Edward Said'in 1978 tarihli çığır açıcı çalışması, Batı'nın Doğu'yu bilimsel, edebi ve sanatsal temsil biçimlerinin aslında bir "bilgi-iktidar" düzeneği oluşturduğunu; bu düzeneğin Doğu'yu egzotikleştiren, pasifleştiren ve tarihdışı kılan bir "öteki" olarak kurduğunu göstermiştir. Romantik Oryantalizm şiirinden kolonyalist seyahatname yazınına ve Flaubert'in Mısır imgelemine dek uzanan bu temsil ekonomisi, edebiyatın salt estetik değil; jeopolitik işlevler de üstlendiğinin somut kanıtıdır.</p>
        <p>Japonya'dan Borges'e ve oradan dünya edebiyatına uzanan bağlantılar ise etkinin tek yönlü bir Batı'dan Doğu'ya akış olmadığını açıkça ortaya koymaktadır. Jorge Luis Borges'in kurgusal evreninde Binbir Gece Masalları, Kabbala, Budist metinler ve Kafka; eşdeğer bir anlatısal gerilimde bir arada titreşmekte; hiçbiri diğerinin "kaynağı" ya da "etkisi" olarak anlaşılmayı reddeden bir yazınsallık yaratmaktadır. Borges'in "labirent" imgesi hem Girit'in hem de İslam mimarisinin labirentidir; bu çifte soy, kültürel melezliğin değil kültürleraşırı bir yazınsallığın eseridir.</p>
        <p>Divan şiiri geleneği ile Batı lirik şiiri arasındaki karşılaştırmalı okuma, hem yapısal benzerlikleri hem de derin farklılıkları görünür kılmaktadır. Fuzuli'nin aşk metafiziği ile Dante'nin Beatrice kültü, ilahi aşkla beşeri aşk arasındaki geçirgen sınırı paylaşmaktadır; ancak Divan'ın aşkı mistik bir yolculuk olarak kodlaması, şiirsel "ben"i Batı liriğinin özerk öznesiyle kıyaslanamayacak ölçüde farklı biçimlendirmektedir. Bu karşılaştırma ne tam bir örtüşme ne de radikal bir yabancılık sunar; ikisi arasındaki üretici gerilim, her iki geleneği de yeniden okutturmaktadır.</p>
        <p>Modern Türk edebiyatı, Doğu ile Batı arasındaki gerilimi hem tematik hem de biçimsel düzeyde bünyesinde taşıması bakımından karşılaştırmalı edebiyatın özellikle verimli bir alanını oluşturmaktadır. Ahmet Hamdi Tanpınar'ın hem Bergson'dan hem de Divan geleneğinden beslenen zaman anlayışı; Oğuz Atay'ın yabancılaşma ve kimlik sorunsalını Türk toplumsal gerçekliğiyle varoluşçu perspektifin kesişiminde işlemesi; Orhan Pamuk'un palimpsest İstanbul imgesiyle Doğu ve Batı üzerine açılan romanı bu gerilimin olağanüstü edebi ürünlerine işaret etmektedir. Bu yazarlar, karşılaştırmalı edebiyatın basit etki çizgilerini aşarak özgün bir senteze ulaşmanın mümkün olduğunu göstermektedir.</p>
        <p>Dünya edebiyatı kavramının kendisi de teorik açıdan tartışmalıdır. Goethe'nin "Weltliteratur" idealinden David Damrosch'un dolaşım temelli tanımına kadar dünya edebiyatı, belirli metinlerin kültürlerarası dolaşımda kazandığı işlevleri, yitirdiklerini ve dönüştüklerini incelemektedir. Ancak neyin dünya edebiyatı sayıldığı büyük ölçüde İngilizce yayın piyasası ve Batı üniversitelerinin kanon kararlarına bağlı kalmaktadır. Bu sınırın farkında olmak, dünya edebiyatı söyleminin kendisinin de siyasi bir boyutu olduğunu kabul etmek demektir.</p>
        <p>Çeviri, karşılaştırmalı edebiyatın hem aracı hem de nesnesidir. Walter Benjamin'in "çevirmenin görevi" üzerine yazdıkları, çevirinin asıl metnin "artı-hayatını" —afterlife— mümkün kılan yaratıcı bir dönüşüm olduğunu öne sürmektedir. Lawrence Venuti'nin "yabancılaştırma" ile "benimseme" ayrımı ise çeviri ideolojisini soruşturmaktadır: Çeviri, hedef kültürün normlarına uymak için kaynak kültürü gizler mi, yoksa farklılığı görünür kılarak okuru o farklılıkla yüzleşmeye zorlar mı? Bu soru, yalnızca dilbilimsel değil; etik ve siyasi bir seçimi içermektedir.</p>
        <p>Doğu ile Batı arasında okumak; ne Doğu'yu Batı'ya tercüme etmek ne de Batı'yı Doğu'ya uyarlamaktır. Bu okuma, her iki geleneğin kendi içindeki çoğulluğunu, tarihsel dönüşümlerini ve iç çelişkilerini göz önünde bulundurarak iki büyük tarihsel deneyimin temas noktalarında ne tür yeni anlamların filizlenebileceğini araştırmaktır. Bu araştırmada yanıtlardan çok sorular, varışlardan çok yolculuklar değerlidir.</p>
      </div>
      <h4>Sorular / Questions</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Soru</th><th>Question</th></tr>
        <tr><td>Said'in Oryantalizm eleştirisi, edebiyatın salt estetik bir alan olmadığını nasıl ortaya koymaktadır?</td><td>How does Said's critique of Orientalism demonstrate that literature is not merely an aesthetic domain?</td></tr>
        <tr><td>Modern Türk edebiyatının Doğu-Batı gerilimini benzersiz kılan tarihsel ve kültürel koşullar nelerdir?</td><td>What are the historical and cultural conditions that make modern Turkish literature's East-West tension unique?</td></tr>
        <tr><td>Venuti'nin "yabancılaştırma" kavramı, çeviriyi etik ve siyasi bir pratik olarak nasıl çerçevelemektedir?</td><td>How does Venuti's concept of "foreignization" frame translation as an ethical and political practice?</td></tr>
      </table></div>
    ` }
  ]
};

const READING_LEVEL_META = {
  A1: { tr: 'Başlangıç', i18nKey: 'reading_lvl_a1', color: '#22c55e' },
  A2: { tr: 'Temel', i18nKey: 'reading_lvl_a2', color: '#84cc16' },
  B1: { tr: 'Orta', i18nKey: 'reading_lvl_b1', color: '#eab308' },
  B2: { tr: 'Orta Üstü', i18nKey: 'reading_lvl_b2', color: '#f97316' },
  C1: { tr: 'İleri', i18nKey: 'reading_lvl_c1', color: '#ef4444' },
  C2: { tr: 'Uzman', i18nKey: 'reading_lvl_c2', color: '#9333ea' }
};
