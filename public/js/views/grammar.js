// Dilbilgisi / Grammar Page

// Çeviri haritası: Türkçe metin → {en, es, ar, ru, de, fr}
const GRAMMAR_I18N = {
  // === A1 Konu Başlıkları ===
  'Alfabe & Sesler':        { en: 'Alphabet & Sounds', es: 'Alfabeto y sonidos', ar: 'الأبجدية والأصوات', ru: 'Алфавит и звуки', de: 'Alphabet & Laute', fr: 'Alphabet et sons' },
  'Ünlü Uyumu':             { en: 'Vowel Harmony', es: 'Armonía vocálica', ar: 'التناغم الصوتي', ru: 'Гармония гласных', de: 'Vokalharmonie', fr: 'Harmonie vocalique' },
  'İsim Çoğulları':         { en: 'Noun Plurals', es: 'Plurales', ar: 'جمع الأسماء', ru: 'Множественное число', de: 'Pluralbildung', fr: 'Pluriels des noms' },
  'Var / Yok':              { en: 'There is / There isn\'t', es: 'Hay / No hay', ar: 'يوجد / لا يوجد', ru: 'Есть / Нет', de: 'Es gibt / Es gibt nicht', fr: 'Il y a / Il n\'y a pas' },
  'Şimdiki Zaman':          { en: 'Present Continuous', es: 'Presente continuo', ar: 'الزمن الحاضر المستمر', ru: 'Настоящее время', de: 'Präsens (Verlaufsform)', fr: 'Présent continu' },
  'Geçmiş Zaman (-di)':     { en: 'Simple Past (-di)', es: 'Pasado simple (-di)', ar: 'الماضي البسيط', ru: 'Прошедшее время (-di)', de: 'Vergangenheit (-di)', fr: 'Passé simple (-di)' },
  'Hâl Ekleri (Temel)':     { en: 'Case Suffixes (Basic)', es: 'Sufijos de caso (básico)', ar: 'لواحق الحالة (أساسي)', ru: 'Падежные окончания (базов.)', de: 'Kasusendungen (Basis)', fr: 'Suffixes de cas (base)' },
  'İyelik Ekleri':          { en: 'Possessive Suffixes', es: 'Sufijos posesivos', ar: 'لواحق الملكية', ru: 'Притяжательные окончания', de: 'Possessivendungen', fr: 'Suffixes possessifs' },
  'Soru Eki':               { en: 'Question Particle', es: 'Partícula interrogativa', ar: 'أداة الاستفهام', ru: 'Вопросительная частица', de: 'Fragepartikel', fr: 'Particule interrogative' },
  'Olmak & Değil':          { en: 'To Be & Negation', es: 'Ser y negación', ar: 'الكون والنفي', ru: 'Быть и отрицание', de: 'Sein & Verneinung', fr: 'Être et négation' },

  // === A2 Konu Başlıkları ===
  'Gelecek Zaman':          { en: 'Future Tense', es: 'Tiempo futuro', ar: 'زمن المستقبل', ru: 'Будущее время', de: 'Futur', fr: 'Futur' },
  'Geniş Zaman':            { en: 'Aorist (Simple Present)', es: 'Presente simple', ar: 'المضارع البسيط', ru: 'Настоящее-будущее (аорист)', de: 'Aorist (Präsens)', fr: 'Aoriste (présent simple)' },
  'Geçmiş Zaman (-miş)':    { en: 'Reported Past (-miş)', es: 'Pasado reportado (-miş)', ar: 'الماضي المنقول', ru: 'Прошедшее на -mış', de: 'Vergangenheit (-miş)', fr: 'Passé rapporté (-miş)' },
  'Edilgen Çatı':           { en: 'Passive Voice', es: 'Voz pasiva', ar: 'المبني للمجهول', ru: 'Страдательный залог', de: 'Passiv', fr: 'Voix passive' },
  'Karşılaştırma':          { en: 'Comparison', es: 'Comparación', ar: 'المقارنة', ru: 'Сравнение', de: 'Vergleich', fr: 'Comparaison' },
  'Bağlaçlar':              { en: 'Conjunctions', es: 'Conjunciones', ar: 'أدوات الربط', ru: 'Союзы', de: 'Konjunktionen', fr: 'Conjonctions' },
  'Zaman Zarfları & Edatlar':{ en: 'Time Adverbs & Postpositions', es: 'Adverbios de tiempo', ar: 'ظروف الزمان وحروف الجر', ru: 'Наречия времени и послелоги', de: 'Zeitadverbien & Postpos.', fr: 'Adverbes de temps et postpos.' },
  'Emir & Rica':            { en: 'Imperative & Requests', es: 'Imperativo y peticiones', ar: 'الأمر والطلب', ru: 'Повелит. наклонение и просьбы', de: 'Imperativ & Bitten', fr: 'Impératif et demandes' },
  'Yapabilmek / -ebilmek':  { en: 'Ability: -(y)abil', es: 'Capacidad: -(y)abil', ar: 'القدرة: -(y)abil', ru: 'Возможность: -(y)abil', de: 'Können: -(y)abil', fr: 'Capacité : -(y)abil' },
  '-mak İstemek / Lazım':   { en: 'Wants & Necessity', es: 'Deseos y necesidad', ar: 'الرغبة والضرورة', ru: 'Желание и необходимость', de: 'Wollen & Müssen', fr: 'Vouloir et nécessité' },

  // === B1 Konu Başlıkları ===
  'Koşul Cümleleri':        { en: 'Conditionals', es: 'Condicionales', ar: 'الجمل الشرطية', ru: 'Условные предложения', de: 'Konditionalsätze', fr: 'Conditionnels' },
  'Fiilimsi: Sıfat-fiil':   { en: 'Participles', es: 'Participios', ar: 'أسماء الفاعل/المفعول', ru: 'Причастия', de: 'Partizipien', fr: 'Participes' },
  'Fiilimsi: Zarf-fiil':    { en: 'Gerunds (Adverbial)', es: 'Gerundios (adverbial)', ar: 'صيغ الحال', ru: 'Деепричастия', de: 'Adverbialpartizipien', fr: 'Gérondifs (adverbiaux)' },
  'Dolaylı Anlatım':        { en: 'Reported Speech', es: 'Estilo indirecto', ar: 'الكلام المنقول', ru: 'Косвенная речь', de: 'Indirekte Rede', fr: 'Discours indirect' },
  'Ettirgen & İşteş Çatı':  { en: 'Causative & Reciprocal', es: 'Causativo y recíproco', ar: 'صيغة السببية والتبادل', ru: 'Каузатив и взаимный залог', de: 'Kausativ & Reziprok', fr: 'Causatif et réciproque' },
  'İstek Kipi':             { en: 'Optative Mood', es: 'Modo optativo', ar: 'صيغة التمني', ru: 'Желательное наклонение', de: 'Optativ', fr: 'Mode optatif' },
  'Ki Bağlacı':             { en: 'Conjunction "Ki"', es: 'Conjunción "Ki"', ar: 'أداة الربط "Ki"', ru: 'Союз "Ki"', de: 'Konjunktion "Ki"', fr: 'Conjonction « Ki »' },
  'Söz Dizimi':             { en: 'Word Order', es: 'Orden de palabras', ar: 'ترتيب الكلمات', ru: 'Порядок слов', de: 'Wortstellung', fr: 'Ordre des mots' },

  // === B2 Konu Başlıkları ===
  'İleri Sıfat-fiiller':    { en: 'Advanced Participles', es: 'Participios avanzados', ar: 'أسماء الفاعل المتقدمة', ru: 'Продвинутые причастия', de: 'Fortgeschr. Partizipien', fr: 'Participes avancés' },
  'Birleşik Zamanlar':      { en: 'Compound Tenses', es: 'Tiempos compuestos', ar: 'الأزمنة المركبة', ru: 'Сложные времена', de: 'Zusammengesetzte Zeiten', fr: 'Temps composés' },
  'Yapım Ekleri':           { en: 'Derivational Suffixes', es: 'Sufijos derivativos', ar: 'لواحق الاشتقاق', ru: 'Словообразоват. суффиксы', de: 'Wortbildungssuffixe', fr: 'Suffixes dérivationnels' },
  'Kip Uyumu & Dolaylı':    { en: 'Mood Agreement & Indirect', es: 'Concordancia modal', ar: 'توافق الصيغ والأسلوب غير المباشر', ru: 'Согласование наклонений', de: 'Moduskongruenz & indirekt', fr: 'Accord des modes et indirect' },
  'Bağımlı Yan Cümleler':   { en: 'Subordinate Clauses', es: 'Oraciones subordinadas', ar: 'الجمل التابعة', ru: 'Придаточные предложения', de: 'Nebensätze', fr: 'Propositions subordonnées' },

  // === C1 Konu Başlıkları ===
  'Akademik Yazım Yapıları': { en: 'Academic Writing', es: 'Escritura académica', ar: 'الكتابة الأكاديمية', ru: 'Академическое письмо', de: 'Akademisches Schreiben', fr: 'Écriture académique' },
  'Edebi Üslup':            { en: 'Literary Style', es: 'Estilo literario', ar: 'الأسلوب الأدبي', ru: 'Литературный стиль', de: 'Literarischer Stil', fr: 'Style littéraire' },
  'İleri Bağlaçlar':        { en: 'Advanced Conjunctions', es: 'Conjunciones avanzadas', ar: 'أدوات الربط المتقدمة', ru: 'Продвинутые союзы', de: 'Fortgeschr. Konjunktionen', fr: 'Conjonctions avancées' },
  'Eski Türkçe Kalıplar':   { en: 'Ottoman-era Patterns', es: 'Patrones otomanos', ar: 'أنماط عثمانية', ru: 'Османские выражения', de: 'Osmanische Muster', fr: 'Modèles ottomans' },

  // === C2 Konu Başlıkları ===
  'Dil Felsefesi & Anlambilim': { en: 'Semantics & Phil. of Language', es: 'Semántica y filosofía del lenguaje', ar: 'علم الدلالة وفلسفة اللغة', ru: 'Семантика и философия языка', de: 'Semantik & Sprachphilosophie', fr: 'Sémantique et phil. du langage' },
  'Retorik & Söylem':       { en: 'Rhetoric & Discourse', es: 'Retórica y discurso', ar: 'البلاغة والخطاب', ru: 'Риторика и дискурс', de: 'Rhetorik & Diskurs', fr: 'Rhétorique et discours' },

  // === Konu Açıklamaları (desc) ===
  'Türk alfabesi, ünlüler ve ünsüzler': { en: 'Turkish alphabet, vowels and consonants', es: 'Alfabeto turco, vocales y consonantes', ar: 'الأبجدية التركية، حروف العلة والصوامت', ru: 'Турецкий алфавит, гласные и согласные', de: 'Türkisches Alphabet, Vokale und Konsonanten', fr: 'Alphabet turc, voyelles et consonnes' },
  'Büyük ve küçük ünlü uyumu kuralları': { en: 'Major and minor vowel harmony rules', es: 'Reglas de armonía vocálica', ar: 'قواعد التناغم الصوتي', ru: 'Правила гармонии гласных', de: 'Regeln der Vokalharmonie', fr: 'Règles d\'harmonie vocalique' },
  '-ler / -lar ile çoğul yapma': { en: 'Making plurals with -ler / -lar', es: 'Formación del plural con -ler / -lar', ar: 'تكوين الجمع بـ -ler / -lar', ru: 'Образование множ. числа -ler / -lar', de: 'Pluralbildung mit -ler / -lar', fr: 'Formation du pluriel avec -ler / -lar' },
  'Varlık ve yokluk ifadesi': { en: 'Expressing existence and absence', es: 'Expresar existencia y ausencia', ar: 'التعبير عن الوجود والعدم', ru: 'Выражение наличия и отсутствия', de: 'Ausdruck von Existenz und Abwesenheit', fr: 'Exprimer l\'existence et l\'absence' },
  '-(ı)yor eki ile şimdiki zaman': { en: 'Present continuous with -(ı)yor', es: 'Presente continuo con -(ı)yor', ar: 'الحاضر المستمر مع -(ı)yor', ru: 'Настоящее время с -(ı)yor', de: 'Präsens mit -(ı)yor', fr: 'Présent continu avec -(ı)yor' },
  'Belirli geçmiş zaman': { en: 'Definite past tense', es: 'Pasado definido', ar: 'الماضي المحدد', ru: 'Определённое прошедшее', de: 'Bestimmte Vergangenheit', fr: 'Passé défini' },
  'İsmin halleri: -i, -e, -de, -den': { en: 'Noun cases: -i, -e, -de, -den', es: 'Casos del nombre: -i, -e, -de, -den', ar: 'حالات الاسم: -i, -e, -de, -den', ru: 'Падежи: -i, -e, -de, -den', de: 'Kasusformen: -i, -e, -de, -den', fr: 'Cas du nom : -i, -e, -de, -den' },
  'Sahiplik: -im, -in, -i, -imiz...': { en: 'Possession: -im, -in, -i, -imiz...', es: 'Posesión: -im, -in, -i, -imiz...', ar: 'الملكية: -im, -in, -i, -imiz...', ru: 'Принадлежность: -im, -in, -i, -imiz...', de: 'Besitz: -im, -in, -i, -imiz...', fr: 'Possession : -im, -in, -i, -imiz...' },
  'mı / mi / mu / mü ile soru yapma': { en: 'Making questions with mı/mi/mu/mü', es: 'Formación de preguntas con mı/mi/mu/mü', ar: 'تكوين الأسئلة بـ mı/mi/mu/mü', ru: 'Вопросы с mı/mi/mu/mü', de: 'Fragebildung mit mı/mi/mu/mü', fr: 'Formation de questions avec mı/mi/mu/mü' },
  'İsim cümlelerinde olumlu ve olumsuz': { en: 'Affirmative and negative in nominal sentences', es: 'Afirmativo y negativo en oraciones nominales', ar: 'الإيجاب والنفي في الجمل الاسمية', ru: 'Утверд. и отриц. в именных предл.', de: 'Bejahung und Verneinung in Nominalsätzen', fr: 'Affirmatif et négatif dans les phrases nominales' },
  '-(y)acak eki ile gelecek zaman': { en: 'Future tense with -(y)acak', es: 'Futuro con -(y)acak', ar: 'المستقبل مع -(y)acak', ru: 'Будущее время с -(y)acak', de: 'Futur mit -(y)acak', fr: 'Futur avec -(y)acak' },
  '-(a/ı)r eki ile geniş zaman': { en: 'Aorist with -(a/ı)r', es: 'Aoristo con -(a/ı)r', ar: 'المضارع البسيط مع -(a/ı)r', ru: 'Аорист с -(a/ı)r', de: 'Aorist mit -(a/ı)r', fr: 'Aoriste avec -(a/ı)r' },
  'Duyulan / belirsiz geçmiş zaman': { en: 'Reported / indefinite past tense', es: 'Pasado reportado / indefinido', ar: 'الماضي المنقول / غير المحدد', ru: 'Пересказанное прошедшее', de: 'Berichtete / unbestimmte Vergangenheit', fr: 'Passé rapporté / indéfini' },
  'Edilgen yapı: -(ı)l, -(ı)n': { en: 'Passive structure: -(ı)l, -(ı)n', es: 'Estructura pasiva: -(ı)l, -(ı)n', ar: 'البنية المبنية للمجهول: -(ı)l, -(ı)n', ru: 'Пассивная форма: -(ı)l, -(ı)n', de: 'Passivbildung: -(ı)l, -(ı)n', fr: 'Structure passive : -(ı)l, -(ı)n' },
  'daha, en, kadar, gibi': { en: 'daha, en, kadar, gibi', es: 'daha, en, kadar, gibi', ar: 'daha, en, kadar, gibi', ru: 'daha, en, kadar, gibi', de: 'daha, en, kadar, gibi', fr: 'daha, en, kadar, gibi' },
  've, ama, çünkü, veya, hem...hem': { en: 'and, but, because, or, both...and', es: 'y, pero, porque, o, tanto...como', ar: 'و، لكن، لأن، أو، كلا...و', ru: 'и, но, потому что, или, и...и', de: 'und, aber, weil, oder, sowohl...als auch', fr: 'et, mais, car, ou, à la fois...et' },
  'önce, sonra, sırasında, boyunca': { en: 'before, after, during, throughout', es: 'antes, después, durante, a lo largo', ar: 'قبل، بعد، أثناء، طوال', ru: 'до, после, во время, на протяжении', de: 'vor, nach, während, entlang', fr: 'avant, après, pendant, tout au long' },
  'Emir kipi ve rica ifadeleri': { en: 'Imperative mood and polite requests', es: 'Modo imperativo y peticiones corteses', ar: 'صيغة الأمر وطلبات التأدب', ru: 'Повелит. наклонение и вежливые просьбы', de: 'Imperativ und höfliche Bitten', fr: 'Mode impératif et demandes polies' },
  'Yeterlilik kipi: -(y)abil': { en: 'Ability suffix: -(y)abil', es: 'Sufijo de capacidad: -(y)abil', ar: 'لاحقة القدرة: -(y)abil', ru: 'Суффикс возможности: -(y)abil', de: 'Fähigkeitssuffix: -(y)abil', fr: 'Suffixe de capacité : -(y)abil' },
  'İstek, gereklilik: istemek, lazım, gerek': { en: 'Want, necessity: istemek, lazım, gerek', es: 'Deseo, necesidad: istemek, lazım, gerek', ar: 'الرغبة، الضرورة: istemek, lazım, gerek', ru: 'Желание, необходимость: istemek, lazım, gerek', de: 'Wunsch, Notwendigkeit: istemek, lazım, gerek', fr: 'Désir, nécessité : istemek, lazım, gerek' },
  '-sa / eğer...ise yapıları': { en: '-sa / eğer...ise structures', es: 'Estructuras -sa / eğer...ise', ar: 'تراكيب -sa / eğer...ise', ru: 'Конструкции -sa / eğer...ise', de: 'Strukturen -sa / eğer...ise', fr: 'Structures -sa / eğer...ise' },
  '-an, -acak, -dık, -mış sıfat-fiiller': { en: '-an, -acak, -dık, -mış participles', es: 'Participios -an, -acak, -dık, -mış', ar: 'أسماء الفاعل -an, -acak, -dık, -mış', ru: 'Причастия -an, -acak, -dık, -mış', de: 'Partizipien -an, -acak, -dık, -mış', fr: 'Participes -an, -acak, -dık, -mış' },
  '-ıp, -arak, -ınca, -ken zarf-fiiller': { en: '-ıp, -arak, -ınca, -ken gerunds', es: 'Gerundios -ıp, -arak, -ınca, -ken', ar: 'صيغ الحال -ıp, -arak, -ınca, -ken', ru: 'Деепричастия -ıp, -arak, -ınca, -ken', de: 'Gerundien -ıp, -arak, -ınca, -ken', fr: 'Gérondifs -ıp, -arak, -ınca, -ken' },
  'Aktarma cümleleri: dedi ki, söyledi': { en: 'Reported sentences: said that, told', es: 'Oraciones reportadas: dijo que', ar: 'جمل النقل: قال إن', ru: 'Пересказ: сказал что, сообщил', de: 'Wiedergabe: sagte dass, erzählte', fr: 'Phrases rapportées : a dit que' },
  '-dır (ettirgen), -(ı)ş (işteş)': { en: '-dır (causative), -(ı)ş (reciprocal)', es: '-dır (causativo), -(ı)ş (recíproco)', ar: '-dır (سببي)، -(ı)ş (تبادلي)', ru: '-dır (каузатив), -(ı)ş (взаимный)', de: '-dır (Kausativ), -(ı)ş (Reziprok)', fr: '-dır (causatif), -(ı)ş (réciproque)' },
  '-(y)a / -(y)ayım ile istek': { en: 'Wishes with -(y)a / -(y)ayım', es: 'Deseos con -(y)a / -(y)ayım', ar: 'التمني بـ -(y)a / -(y)ayım', ru: 'Пожелания с -(y)a / -(y)ayım', de: 'Wünsche mit -(y)a / -(y)ayım', fr: 'Souhaits avec -(y)a / -(y)ayım' },
  'ki ile bağlı yan cümleler': { en: 'Subordinate clauses with ki', es: 'Oraciones subordinadas con ki', ar: 'جمل تابعة بـ ki', ru: 'Придаточные с ki', de: 'Nebensätze mit ki', fr: 'Propositions subordonnées avec ki' },
  'Türkçe cümle yapısı: SOV ve vurgu': { en: 'Turkish sentence structure: SOV and emphasis', es: 'Estructura oracional turca: SOV y énfasis', ar: 'بنية الجملة التركية: SOV والتأكيد', ru: 'Структура предложения: SOV и ударение', de: 'Türkischer Satzbau: SOV und Betonung', fr: 'Structure de phrase turque : SOV et accentuation' },
  '-ası, -maz, -ır...-maz yapıları': { en: '-ası, -maz, -ır...-maz structures', es: 'Estructuras -ası, -maz, -ır...-maz', ar: 'تراكيب -ası, -maz, -ır...-maz', ru: 'Конструкции -ası, -maz, -ır...-maz', de: 'Strukturen -ası, -maz, -ır...-maz', fr: 'Structures -ası, -maz, -ır...-maz' },
  '-ıyordu, -mıştı, -acaktı': { en: '-ıyordu, -mıştı, -acaktı', es: '-ıyordu, -mıştı, -acaktı', ar: '-ıyordu, -mıştı, -acaktı', ru: '-ıyordu, -mıştı, -acaktı', de: '-ıyordu, -mıştı, -acaktı', fr: '-ıyordu, -mıştı, -acaktı' },
  'İsimden fiil, fiilden isim türetme': { en: 'Noun-to-verb, verb-to-noun derivation', es: 'Derivación nombre-verbo, verbo-nombre', ar: 'اشتقاق اسم-فعل، فعل-اسم', ru: 'Словообразование: имя→глагол, глагол→имя', de: 'Wortableitung: Nomen→Verb, Verb→Nomen', fr: 'Dérivation nom→verbe, verbe→nom' },
  'Karmaşık aktarma ve kip kayması': { en: 'Complex reporting and mood shift', es: 'Reporte complejo y cambio de modo', ar: 'النقل المعقد وتحول الصيغة', ru: 'Сложный пересказ и сдвиг наклонения', de: 'Komplexe Wiedergabe und Moduswechsel', fr: 'Report complexe et changement de mode' },
  '-dığı için, -dığı halde, -dığı sürece': { en: 'because of, although, as long as', es: 'porque, aunque, mientras', ar: 'بسبب، رغم أن، طالما', ru: 'потому что, несмотря на, пока', de: 'weil, obwohl, solange', fr: 'parce que, bien que, tant que' },
  'Resmi ve akademik Türkçe kalıpları': { en: 'Formal and academic Turkish patterns', es: 'Patrones formales y académicos del turco', ar: 'أنماط تركية رسمية وأكاديمية', ru: 'Формальные и академические обороты', de: 'Formelle und akademische türkische Muster', fr: 'Modèles turcs formels et académiques' },
  'Devrik cümle, imgelem, mecaz': { en: 'Inverted sentence, imagery, metaphor', es: 'Oración invertida, imágenes, metáfora', ar: 'جملة مقلوبة، تصوير، استعارة', ru: 'Инверсия, образность, метафора', de: 'Inversion, Bildsprache, Metapher', fr: 'Phrase inversée, imagerie, métaphore' },
  'Şöyle ki, nitekim, oysaki, halbuki': { en: 'That is, indeed, whereas, however', es: 'Es decir, de hecho, mientras que', ar: 'أي أن، في الواقع، بينما، مع ذلك', ru: 'То есть, в самом деле, тогда как', de: 'Nämlich, tatsächlich, wohingegen', fr: 'C\'est-à-dire, en effet, tandis que' },
  'Osmanlıca kökenli yapılar': { en: 'Ottoman-origin structures', es: 'Estructuras de origen otomano', ar: 'تراكيب من أصل عثماني', ru: 'Конструкции османского происхождения', de: 'Strukturen osmanischen Ursprungs', fr: 'Structures d\'origine ottomane' },
  'Anlam katmanları ve söylem analizi': { en: 'Layers of meaning and discourse analysis', es: 'Capas de significado y análisis del discurso', ar: 'طبقات المعنى وتحليل الخطاب', ru: 'Слои значения и анализ дискурса', de: 'Bedeutungsschichten und Diskursanalyse', fr: 'Couches de sens et analyse du discours' },
  'İkna teknikleri ve söylem yapıları': { en: 'Persuasion techniques and discourse structures', es: 'Técnicas de persuasión y estructuras discursivas', ar: 'تقنيات الإقناع وبنى الخطاب', ru: 'Техники убеждения и структуры дискурса', de: 'Überzeugungstechniken und Diskursstrukturen', fr: 'Techniques de persuasion et structures discursives' },

  // === İçerik Başlıkları (h3/h4) ===
  'Türk Alfabesi': { en: 'Turkish Alphabet', es: 'Alfabeto turco', ar: 'الأبجدية التركية', ru: 'Турецкий алфавит', de: 'Türkisches Alphabet', fr: 'Alphabet turc' },
  'Tam Alfabe': { en: 'Full Alphabet', es: 'Alfabeto completo', ar: 'الأبجدية الكاملة', ru: 'Полный алфавит', de: 'Vollständiges Alphabet', fr: 'Alphabet complet' },
  'Ünlüler': { en: 'Vowels', es: 'Vocales', ar: 'حروف العلة', ru: 'Гласные', de: 'Vokale', fr: 'Voyelles' },
  'Ünsüzler': { en: 'Consonants', es: 'Consonantes', ar: 'الصوامت', ru: 'Согласные', de: 'Konsonanten', fr: 'Consonnes' },
  'Büyük Ünlü Uyumu': { en: 'Major Vowel Harmony', es: 'Armonía vocálica mayor', ar: 'التناغم الصوتي الكبير', ru: 'Большая гармония гласных', de: 'Große Vokalharmonie', fr: 'Grande harmonie vocalique' },
  'Küçük Ünlü Uyumu': { en: 'Minor Vowel Harmony', es: 'Armonía vocálica menor', ar: 'التناغم الصوتي الصغير', ru: 'Малая гармония гласных', de: 'Kleine Vokalharmonie', fr: 'Petite harmonie vocalique' },
  'Çoğul Eki': { en: 'Plural Suffix', es: 'Sufijo plural', ar: 'لاحقة الجمع', ru: 'Суффикс множ. числа', de: 'Pluralsuffix', fr: 'Suffixe du pluriel' },
  'Var & Yok': { en: 'There is & There isn\'t', es: 'Hay y no hay', ar: 'يوجد ولا يوجد', ru: 'Есть и нет', de: 'Es gibt & Es gibt nicht', fr: 'Il y a et il n\'y a pas' },
  'Belirli Geçmiş Zaman': { en: 'Simple Past', es: 'Pasado simple', ar: 'الماضي البسيط', ru: 'Определённое прошедшее', de: 'Bestimmte Vergangenheit', fr: 'Passé simple' },
  'Hâl Ekleri': { en: 'Case Suffixes', es: 'Sufijos de caso', ar: 'لواحق الحالة', ru: 'Падежные окончания', de: 'Kasusendungen', fr: 'Suffixes de cas' },
  'Cümlede Kullanım': { en: 'Usage in Sentences', es: 'Uso en oraciones', ar: 'الاستخدام في الجمل', ru: 'Употребление в предложениях', de: 'Verwendung in Sätzen', fr: 'Utilisation dans les phrases' },
  'İyelik Ekleri': { en: 'Possessive Suffixes', es: 'Sufijos posesivos', ar: 'لواحق الملكية', ru: 'Притяжательные окончания', de: 'Possessivendungen', fr: 'Suffixes possessifs' },
  'Soru Eki': { en: 'Question Particle', es: 'Partícula interrogativa', ar: 'أداة الاستفهام', ru: 'Вопросительная частица', de: 'Fragepartikel', fr: 'Particule interrogative' },
  'İsim Cümleleri': { en: 'Nominal Sentences', es: 'Oraciones nominales', ar: 'الجمل الاسمية', ru: 'Именные предложения', de: 'Nominalsätze', fr: 'Phrases nominales' },
  'Gelecek Zaman': { en: 'Future Tense', es: 'Tiempo futuro', ar: 'زمن المستقبل', ru: 'Будущее время', de: 'Futur', fr: 'Futur' },
  'Geniş Zaman': { en: 'Aorist (Simple Present)', es: 'Presente simple', ar: 'المضارع البسيط', ru: 'Аорист', de: 'Aorist', fr: 'Aoriste' },
  'Duyulan Geçmiş Zaman': { en: 'Reported Past', es: 'Pasado reportado', ar: 'الماضي المنقول', ru: 'Пересказанное прошедшее', de: 'Berichtete Vergangenheit', fr: 'Passé rapporté' },
  'Edilgen Çatı': { en: 'Passive Voice', es: 'Voz pasiva', ar: 'المبني للمجهول', ru: 'Страдательный залог', de: 'Passiv', fr: 'Voix passive' },
  'Karşılaştırma': { en: 'Comparison', es: 'Comparación', ar: 'المقارنة', ru: 'Сравнение', de: 'Vergleich', fr: 'Comparaison' },
  'Bağlaçlar': { en: 'Conjunctions', es: 'Conjunciones', ar: 'أدوات الربط', ru: 'Союзы', de: 'Konjunktionen', fr: 'Conjonctions' },
  'Zaman İfadeleri': { en: 'Time Expressions', es: 'Expresiones de tiempo', ar: 'تعبيرات الزمن', ru: 'Выражения времени', de: 'Zeitausdrücke', fr: 'Expressions de temps' },
  'Emir Kipi': { en: 'Imperative Mood', es: 'Modo imperativo', ar: 'صيغة الأمر', ru: 'Повелительное наклонение', de: 'Imperativ', fr: 'Mode impératif' },
  'Rica': { en: 'Polite Requests', es: 'Peticiones corteses', ar: 'طلبات مهذبة', ru: 'Вежливые просьбы', de: 'Höfliche Bitten', fr: 'Demandes polies' },
  'Yeterlilik Kipi': { en: 'Ability', es: 'Capacidad', ar: 'القدرة', ru: 'Возможность', de: 'Fähigkeit', fr: 'Capacité' },
  'İstek & Gereklilik': { en: 'Wants & Necessity', es: 'Deseos y necesidad', ar: 'الرغبة والضرورة', ru: 'Желание и необходимость', de: 'Wollen & Müssen', fr: 'Vouloir et nécessité' },
  'İstek: -mak istemek': { en: 'Want: -mak istemek', es: 'Deseo: -mak istemek', ar: 'الرغبة: -mak istemek', ru: 'Желание: -mak istemek', de: 'Wollen: -mak istemek', fr: 'Vouloir : -mak istemek' },
  'Gereklilik: -malı / lazım / gerek': { en: 'Necessity: -malı / lazım / gerek', es: 'Necesidad: -malı / lazım / gerek', ar: 'الضرورة: -malı / lazım / gerek', ru: 'Необходимость: -malı / lazım / gerek', de: 'Notwendigkeit: -malı / lazım / gerek', fr: 'Nécessité : -malı / lazım / gerek' },
  'Koşul Cümleleri': { en: 'Conditionals', es: 'Condicionales', ar: 'الجمل الشرطية', ru: 'Условные предложения', de: 'Konditionalsätze', fr: 'Conditionnels' },
  'Gerçek Koşul': { en: 'Real Conditional', es: 'Condicional real', ar: 'الشرط الحقيقي', ru: 'Реальное условие', de: 'Reale Bedingung', fr: 'Conditionnel réel' },
  'Gerçekdışı Koşul': { en: 'Unreal Conditional', es: 'Condicional irreal', ar: 'الشرط غير الحقيقي', ru: 'Нереальное условие', de: 'Irreale Bedingung', fr: 'Conditionnel irréel' },
  'Sıfat-Fiiller': { en: 'Participles', es: 'Participios', ar: 'أسماء الفاعل', ru: 'Причастия', de: 'Partizipien', fr: 'Participes' },
  'Zarf-Fiiller': { en: 'Gerunds (Adverbial)', es: 'Gerundios (adverbial)', ar: 'صيغ الحال', ru: 'Деепричастия', de: 'Adverbialpartizipien', fr: 'Gérondifs' },
  'Dolaylı Anlatım': { en: 'Reported Speech', es: 'Estilo indirecto', ar: 'الكلام المنقول', ru: 'Косвенная речь', de: 'Indirekte Rede', fr: 'Discours indirect' },
  'Ettirgen Çatı': { en: 'Causative', es: 'Causativo', ar: 'صيغة السببية', ru: 'Каузатив', de: 'Kausativ', fr: 'Causatif' },
  'İşteş Çatı': { en: 'Reciprocal', es: 'Recíproco', ar: 'صيغة التبادل', ru: 'Взаимный залог', de: 'Reziprok', fr: 'Réciproque' },
  'İstek Kipi': { en: 'Optative Mood', es: 'Modo optativo', ar: 'صيغة التمني', ru: 'Желательное наклонение', de: 'Optativ', fr: 'Mode optatif' },
  '"Ki" Bağlacı': { en: 'The Conjunction "Ki"', es: 'La conjunción "Ki"', ar: 'أداة الربط "Ki"', ru: 'Союз "Ki"', de: 'Die Konjunktion "Ki"', fr: 'La conjonction « Ki »' },
  'Söz Dizimi': { en: 'Word Order', es: 'Orden de palabras', ar: 'ترتيب الكلمات', ru: 'Порядок слов', de: 'Wortstellung', fr: 'Ordre des mots' },
  'İleri Sıfat-Fiiller': { en: 'Advanced Participles', es: 'Participios avanzados', ar: 'أسماء الفاعل المتقدمة', ru: 'Продвинутые причастия', de: 'Fortgeschr. Partizipien', fr: 'Participes avancés' },
  'Birleşik Zamanlar': { en: 'Compound Tenses', es: 'Tiempos compuestos', ar: 'الأزمنة المركبة', ru: 'Сложные времена', de: 'Zusammengesetzte Zeiten', fr: 'Temps composés' },
  'Yapım Ekleri': { en: 'Derivational Suffixes', es: 'Sufijos derivativos', ar: 'لواحق الاشتقاق', ru: 'Словообразоват. суффиксы', de: 'Wortbildungssuffixe', fr: 'Suffixes dérivationnels' },
  'İsimden Fiil': { en: 'Noun to Verb', es: 'De nombre a verbo', ar: 'من اسم إلى فعل', ru: 'Имя → глагол', de: 'Nomen → Verb', fr: 'Nom → verbe' },
  'Fiilden İsim': { en: 'Verb to Noun', es: 'De verbo a nombre', ar: 'من فعل إلى اسم', ru: 'Глагол → имя', de: 'Verb → Nomen', fr: 'Verbe → nom' },
  'Kip Uyumu': { en: 'Mood Agreement', es: 'Concordancia modal', ar: 'توافق الصيغ', ru: 'Согласование наклонений', de: 'Moduskongruenz', fr: 'Accord des modes' },
  'Bağımlı Yan Cümleler': { en: 'Subordinate Clauses', es: 'Oraciones subordinadas', ar: 'الجمل التابعة', ru: 'Придаточные предложения', de: 'Nebensätze', fr: 'Propositions subordonnées' },
  'Akademik Yazım': { en: 'Academic Writing', es: 'Escritura académica', ar: 'الكتابة الأكاديمية', ru: 'Академическое письмо', de: 'Akademisches Schreiben', fr: 'Écriture académique' },
  'Edebi Üslup': { en: 'Literary Style', es: 'Estilo literario', ar: 'الأسلوب الأدبي', ru: 'Литературный стиль', de: 'Literarischer Stil', fr: 'Style littéraire' },
  'Devrik Cümle': { en: 'Inverted Sentence', es: 'Oración invertida', ar: 'جملة مقلوبة', ru: 'Инверсия', de: 'Inversion', fr: 'Phrase inversée' },
  'Mecaz': { en: 'Metaphor', es: 'Metáfora', ar: 'استعارة', ru: 'Метафора', de: 'Metapher', fr: 'Métaphore' },
  'İleri Bağlaçlar': { en: 'Advanced Conjunctions', es: 'Conjunciones avanzadas', ar: 'أدوات الربط المتقدمة', ru: 'Продвинутые союзы', de: 'Fortgeschr. Konjunktionen', fr: 'Conjonctions avancées' },
  'Osmanlıca Kökenli Kalıplar': { en: 'Ottoman-era Patterns', es: 'Patrones otomanos', ar: 'أنماط عثمانية', ru: 'Османские выражения', de: 'Osmanische Muster', fr: 'Modèles ottomans' },
  'Anlambilim': { en: 'Semantics', es: 'Semántica', ar: 'علم الدلالة', ru: 'Семантика', de: 'Semantik', fr: 'Sémantique' },
  'Söz Edimi': { en: 'Speech Acts', es: 'Actos de habla', ar: 'أفعال الكلام', ru: 'Речевые акты', de: 'Sprechakte', fr: 'Actes de parole' },
  'Retorik': { en: 'Rhetoric', es: 'Retórica', ar: 'البلاغة', ru: 'Риторика', de: 'Rhetorik', fr: 'Rhétorique' },

  // === Ortak başlıklar ===
  'Olumlu': { en: 'Affirmative', es: 'Afirmativo', ar: 'إيجابي', ru: 'Утвердительная', de: 'Bejahend', fr: 'Affirmatif' },
  'Olumsuz': { en: 'Negative', es: 'Negativo', ar: 'سلبي', ru: 'Отрицательная', de: 'Verneinend', fr: 'Négatif' },
  'Soru': { en: 'Question', es: 'Pregunta', ar: 'سؤال', ru: 'Вопрос', de: 'Frage', fr: 'Question' },
};

// Yardımcı: Türkçe metni çift dilli yap
function grammarBi(trText) {
  const entry = GRAMMAR_I18N[trText];
  if (!entry) return trText;
  const lang = I18N.getLang();
  const translated = entry[lang] || entry['en'] || '';
  if (!translated) return trText;
  return `${trText} / ${translated}`;
}

// İçerik HTML'indeki h3/h4 başlıklarını çift dilli yap
function translateGrammarContent(html) {
  // h3 ve h4 başlıklarındaki "Türkçe / English" kalıbını bul ve seçili dile çevir
  return html.replace(/<(h[34])([^>]*)>(.*?)<\/\1>/g, (match, tag, attrs, inner) => {
    // Emoji prefix'leri koru (✅, ❌, ❓)
    const emojiMatch = inner.match(/^([✅❌❓]\s*)/);
    const emoji = emojiMatch ? emojiMatch[1] : '';
    let text = emojiMatch ? inner.slice(emojiMatch[0].length) : inner;

    // "Türkçe / English" formatını ayır
    const slashIdx = text.indexOf(' / ');
    let trPart;
    if (slashIdx > -1) {
      trPart = text.substring(0, slashIdx);
    } else {
      trPart = text;
    }

    // Parantez içindeki ekstra bilgiyi koru: "Ünlüler / Vowels (8)" → trPart="Ünlüler", extra=" (8)"
    let extra = '';
    const parenMatch = text.match(/(\s*\(\d+\))$/);
    if (parenMatch) {
      extra = parenMatch[1];
      if (slashIdx > -1) {
        // extra zaten İngilizce kısımda, trPart doğru
      }
    }

    const entry = GRAMMAR_I18N[trPart];
    if (entry) {
      const lang = I18N.getLang();
      const translated = entry[lang] || entry['en'] || '';
      return `<${tag}${attrs}>${emoji}${trPart} / ${translated}${extra}</${tag}>`;
    }
    return match;
  });
}

const GRAMMAR_LEVELS = {
  A1: [
    { title: 'Alfabe & Sesler', desc: 'Türk alfabesi, ünlüler ve ünsüzler', content: `
      <h3>Türk Alfabesi / Turkish Alphabet</h3>
      <p>Türk alfabesinde <strong>29 harf</strong> vardır: 8 ünlü, 21 ünsüz. Latin alfabesi temellidir.</p>

      <h4>Tam Alfabe / Full Alphabet</h4>
      <div class="grammar-table-wrap">
        <table class="grammar-table">
          <tr><th>Harf</th><th>Okunuşu</th><th>Ses</th><th>Örnek</th></tr>
          <tr><td><strong>A a</strong></td><td>a</td><td>"a" in father</td><td><em>araba</em> (car)</td></tr>
          <tr><td><strong>B b</strong></td><td>be</td><td>"b" in boy</td><td><em>baba</em> (father)</td></tr>
          <tr><td><strong>C c</strong></td><td>ce</td><td>"j" in jam</td><td><em>cam</em> (glass)</td></tr>
          <tr><td><strong>Ç ç</strong></td><td>çe</td><td>"ch" in chair</td><td><em>çay</em> (tea)</td></tr>
          <tr><td><strong>D d</strong></td><td>de</td><td>"d" in dog</td><td><em>deniz</em> (sea)</td></tr>
          <tr><td><strong>E e</strong></td><td>e</td><td>"e" in bed</td><td><em>ev</em> (house)</td></tr>
          <tr><td><strong>F f</strong></td><td>fe</td><td>"f" in fire</td><td><em>fare</em> (mouse)</td></tr>
          <tr><td><strong>G g</strong></td><td>ge</td><td>"g" in go</td><td><em>göz</em> (eye)</td></tr>
          <tr><td><strong>Ğ ğ</strong></td><td>yumuşak ge</td><td>sessiz, ünlüyü uzatır</td><td><em>dağ</em> (mountain)</td></tr>
          <tr><td><strong>H h</strong></td><td>he</td><td>"h" in hello</td><td><em>hava</em> (weather)</td></tr>
          <tr><td><strong>I ı</strong></td><td>ı</td><td>"u" in circus (noktasız)</td><td><em>ılık</em> (warm)</td></tr>
          <tr><td><strong>İ i</strong></td><td>i</td><td>"ee" in see (noktalı)</td><td><em>ip</em> (rope)</td></tr>
          <tr><td><strong>J j</strong></td><td>je</td><td>"s" in measure</td><td><em>jandarma</em> (gendarmerie)</td></tr>
          <tr><td><strong>K k</strong></td><td>ke</td><td>"k" in key</td><td><em>kitap</em> (book)</td></tr>
          <tr><td><strong>L l</strong></td><td>le</td><td>"l" in love</td><td><em>limon</em> (lemon)</td></tr>
          <tr><td><strong>M m</strong></td><td>me</td><td>"m" in man</td><td><em>masa</em> (table)</td></tr>
          <tr><td><strong>N n</strong></td><td>ne</td><td>"n" in no</td><td><em>ne</em> (what)</td></tr>
          <tr><td><strong>O o</strong></td><td>o</td><td>"o" in more</td><td><em>okul</em> (school)</td></tr>
          <tr><td><strong>Ö ö</strong></td><td>ö</td><td>"u" in burn</td><td><em>ördek</em> (duck)</td></tr>
          <tr><td><strong>P p</strong></td><td>pe</td><td>"p" in pen</td><td><em>para</em> (money)</td></tr>
          <tr><td><strong>R r</strong></td><td>re</td><td>"r" (rolled/tapped)</td><td><em>renk</em> (color)</td></tr>
          <tr><td><strong>S s</strong></td><td>se</td><td>"s" in sun</td><td><em>su</em> (water)</td></tr>
          <tr><td><strong>Ş ş</strong></td><td>şe</td><td>"sh" in she</td><td><em>şeker</em> (sugar)</td></tr>
          <tr><td><strong>T t</strong></td><td>te</td><td>"t" in top</td><td><em>top</em> (ball)</td></tr>
          <tr><td><strong>U u</strong></td><td>u</td><td>"oo" in food</td><td><em>uzun</em> (long)</td></tr>
          <tr><td><strong>Ü ü</strong></td><td>ü</td><td>"u" in French "tu"</td><td><em>üzüm</em> (grape)</td></tr>
          <tr><td><strong>V v</strong></td><td>ve</td><td>"v" in van</td><td><em>var</em> (there is)</td></tr>
          <tr><td><strong>Y y</strong></td><td>ye</td><td>"y" in yes</td><td><em>yol</em> (road)</td></tr>
          <tr><td><strong>Z z</strong></td><td>ze</td><td>"z" in zoo</td><td><em>zaman</em> (time)</td></tr>
        </table>
      </div>

      <h4>Ünlüler / Vowels (8)</h4>
      <div class="grammar-table-wrap">
        <table class="grammar-table">
          <tr><th></th><th>Düz</th><th>Yuvarlak</th></tr>
          <tr><th>Kalın (back)</th><td>a, ı</td><td>o, u</td></tr>
          <tr><th>İnce (front)</th><td>e, i</td><td>ö, ü</td></tr>
        </table>
      </div>

      <h4>Ünsüzler / Consonants (21)</h4>
      <div class="grammar-table-wrap">
        <table class="grammar-table">
          <tr><th>Sert (voiceless)</th><td>p, ç, t, k, f, h, s, ş</td></tr>
          <tr><th>Yumuşak (voiced)</th><td>b, c, d, g, ğ, j, l, m, n, r, v, y, z</td></tr>
        </table>
      </div>
      <div class="grammar-tip">💡 Sert ünsüz yumuşaması: p→b, ç→c, t→d, k→ğ. Örnek: kitap → kitab<strong>ı</strong>, ağaç → ağac<strong>ı</strong></div>

      <div class="grammar-tip">💡 İngilizce alfabede olmayan 6 harf: <strong>Ç, Ğ, I, Ö, Ş, Ü</strong><br>
      Türk alfabesinde olmayan 3 harf: <strong>Q, W, X</strong></div>
    ` },
    { title: 'Ünlü Uyumu', desc: 'Büyük ve küçük ünlü uyumu kuralları', content: `
      <h3>Ünlü Uyumu / Vowel Harmony</h3>
      <p>Türkçenin en önemli kuralıdır. Eklerdeki ünlüler, kelimenin son ünlüsüne göre değişir.</p>
      <h4>Büyük Ünlü Uyumu</h4>
      <p>Kelimenin son ünlüsü kalınsa ek de kalın (a), inceyse ek de ince (e) olur.</p>
      <div class="grammar-table-wrap">
        <table class="grammar-table">
          <tr><th>Son ünlü → Ek ünlüsü</th><th>Örnek</th></tr>
          <tr><td>a, ı, o, u (kalın) → <strong>a</strong></td><td>araba → araba<strong>lar</strong><br>bakır → bakır<strong>lar</strong><br>okul → okul<strong>lar</strong><br>kuş → kuş<strong>lar</strong></td></tr>
          <tr><td>e, i, ö, ü (ince) → <strong>e</strong></td><td>ev → ev<strong>ler</strong><br>bilgi → bilgi<strong>ler</strong><br>göz → göz<strong>ler</strong><br>gül → gül<strong>ler</strong></td></tr>
        </table>
      </div>
      <h4>Küçük Ünlü Uyumu</h4>
      <p>Son ünlüye göre ek ünlüsü 4 farklı şekilde değişir (ı, i, u, ü).</p>
      <div class="grammar-table-wrap">
        <table class="grammar-table">
          <tr><th>Son ünlü → Ek ünlüsü</th><th>Örnek</th></tr>
          <tr><td>a, ı → <strong>ı</strong></td><td>araba → araba<strong>yı</strong><br>kapı → kapı<strong>yı</strong></td></tr>
          <tr><td>e, i → <strong>i</strong></td><td>ev → ev<strong>i</strong><br>bilgi → bilgi<strong>yi</strong></td></tr>
          <tr><td>o, u → <strong>u</strong></td><td>yol → yol<strong>u</strong><br>okul → okul<strong>u</strong></td></tr>
          <tr><td>ö, ü → <strong>ü</strong></td><td>göz → göz<strong>ü</strong><br>gül → gül<strong>ü</strong></td></tr>
        </table>
      </div>
    ` },
    { title: 'İsim Çoğulları', desc: '-ler / -lar ile çoğul yapma', content: `
      <h3>Çoğul Eki / Plural Suffix</h3>
      <p>Türkçede çoğul eki <strong>-ler</strong> veya <strong>-lar</strong> şeklindedir.</p>
      <div class="grammar-table-wrap">
        <table class="grammar-table">
          <tr><th>Kural</th><th>Ek</th><th>Örnek</th></tr>
          <tr><td>Son ünlü ince (e,i,ö,ü)</td><td>-ler</td><td>ev → ev<strong>ler</strong>, göz → göz<strong>ler</strong></td></tr>
          <tr><td>Son ünlü kalın (a,ı,o,u)</td><td>-lar</td><td>masa → masa<strong>lar</strong>, kuş → kuş<strong>lar</strong></td></tr>
        </table>
      </div>
      <div class="grammar-example">
        <strong>Örnekler:</strong><br>
        kitap → kitap<strong>lar</strong> (books)<br>
        öğrenci → öğrenci<strong>ler</strong> (students)<br>
        araba → araba<strong>lar</strong> (cars)<br>
        ülke → ülke<strong>ler</strong> (countries)
      </div>
      <div class="grammar-tip">💡 Sayılardan sonra çoğul eki kullanılmaz: "üç elma" (three apples), "beş kişi" (five people)</div>
    ` },
    { title: 'Var / Yok', desc: 'Varlık ve yokluk ifadesi', content: `
      <h3>Var & Yok / There is & There isn't</h3>
      <p><strong>Var</strong> = var, mevcut (there is/are, exists)<br>
      <strong>Yok</strong> = yok, mevcut değil (there isn't/aren't, doesn't exist)</p>
      <div class="grammar-example">
        <strong>Örnekler:</strong><br>
        Evde süt <strong>var</strong>. (There is milk at home.)<br>
        Evde süt <strong>yok</strong>. (There is no milk at home.)<br>
        Param <strong>var</strong>. (I have money.)<br>
        Param <strong>yok</strong>. (I don't have money.)<br>
        Zamanın <strong>var mı</strong>? (Do you have time?)
      </div>
      <div class="grammar-tip">💡 "Var mı?" = soru formu. "Yok mu?" = olumsuz soru.</div>
    ` },
    { title: 'Şimdiki Zaman', desc: '-(ı)yor eki ile şimdiki zaman', content: `
      <h3>Şimdiki Zaman / Present Continuous</h3>
      <p>Şu anda yapılan eylemleri anlatır. Ek: <strong>-(ı)yor</strong></p>

      <h4>✅ Olumlu / Affirmative</h4>
      <div class="grammar-table-wrap">
        <table class="grammar-table">
          <tr><th>Kişi</th><th>Ek</th><th>Örnek (gelmek)</th><th>Örnek (almak)</th></tr>
          <tr><td>Ben</td><td>-(ı)yorum</td><td>gel<strong>iyorum</strong></td><td>al<strong>ıyorum</strong></td></tr>
          <tr><td>Sen</td><td>-(ı)yorsun</td><td>gel<strong>iyorsun</strong></td><td>al<strong>ıyorsun</strong></td></tr>
          <tr><td>O</td><td>-(ı)yor</td><td>gel<strong>iyor</strong></td><td>al<strong>ıyor</strong></td></tr>
          <tr><td>Biz</td><td>-(ı)yoruz</td><td>gel<strong>iyoruz</strong></td><td>al<strong>ıyoruz</strong></td></tr>
          <tr><td>Siz</td><td>-(ı)yorsunuz</td><td>gel<strong>iyorsunuz</strong></td><td>al<strong>ıyorsunuz</strong></td></tr>
          <tr><td>Onlar</td><td>-(ı)yorlar</td><td>gel<strong>iyorlar</strong></td><td>al<strong>ıyorlar</strong></td></tr>
        </table>
      </div>

      <h4>❌ Olumsuz / Negative</h4>
      <div class="grammar-table-wrap">
        <table class="grammar-table">
          <tr><th>Kişi</th><th>Örnek (gelmek)</th><th>Örnek (almak)</th></tr>
          <tr><td>Ben</td><td>gel<strong>miyorum</strong></td><td>al<strong>mıyorum</strong></td></tr>
          <tr><td>Sen</td><td>gel<strong>miyorsun</strong></td><td>al<strong>mıyorsun</strong></td></tr>
          <tr><td>O</td><td>gel<strong>miyor</strong></td><td>al<strong>mıyor</strong></td></tr>
          <tr><td>Biz</td><td>gel<strong>miyoruz</strong></td><td>al<strong>mıyoruz</strong></td></tr>
          <tr><td>Siz</td><td>gel<strong>miyorsunuz</strong></td><td>al<strong>mıyorsunuz</strong></td></tr>
          <tr><td>Onlar</td><td>gel<strong>miyorlar</strong></td><td>al<strong>mıyorlar</strong></td></tr>
        </table>
      </div>

      <h4>❓ Soru / Question</h4>
      <div class="grammar-table-wrap">
        <table class="grammar-table">
          <tr><th>Kişi</th><th>Örnek (gelmek)</th><th>Örnek (almak)</th></tr>
          <tr><td>Ben</td><td>gel<strong>iyor muyum</strong>?</td><td>al<strong>ıyor muyum</strong>?</td></tr>
          <tr><td>Sen</td><td>gel<strong>iyor musun</strong>?</td><td>al<strong>ıyor musun</strong>?</td></tr>
          <tr><td>O</td><td>gel<strong>iyor mu</strong>?</td><td>al<strong>ıyor mu</strong>?</td></tr>
          <tr><td>Biz</td><td>gel<strong>iyor muyuz</strong>?</td><td>al<strong>ıyor muyuz</strong>?</td></tr>
          <tr><td>Siz</td><td>gel<strong>iyor musunuz</strong>?</td><td>al<strong>ıyor musunuz</strong>?</td></tr>
          <tr><td>Onlar</td><td>gel<strong>iyorlar mı</strong>?</td><td>al<strong>ıyorlar mı</strong>?</td></tr>
        </table>
      </div>
    ` },
    { title: 'Geçmiş Zaman (-di)', desc: 'Belirli geçmiş zaman', content: `
      <h3>Belirli Geçmiş Zaman / Simple Past (-di)</h3>
      <p>Kesin olarak bilinen, tanık olunan geçmiş olaylar. Ek: <strong>-dı</strong> (di/dı/du/dü/ti/tı/tu/tü)</p>
      <h4>✅ Olumlu / Affirmative</h4>
      <div class="grammar-table-wrap">
        <table class="grammar-table">
          <tr><th>Kişi</th><th>Örnek (gelmek)</th><th>Örnek (almak)</th></tr>
          <tr><td>Ben</td><td>gel<strong>dim</strong></td><td>al<strong>dım</strong></td></tr>
          <tr><td>Sen</td><td>gel<strong>din</strong></td><td>al<strong>dın</strong></td></tr>
          <tr><td>O</td><td>gel<strong>di</strong></td><td>al<strong>dı</strong></td></tr>
          <tr><td>Biz</td><td>gel<strong>dik</strong></td><td>al<strong>dık</strong></td></tr>
          <tr><td>Siz</td><td>gel<strong>diniz</strong></td><td>al<strong>dınız</strong></td></tr>
          <tr><td>Onlar</td><td>gel<strong>diler</strong></td><td>al<strong>dılar</strong></td></tr>
        </table>
      </div>

      <h4>❌ Olumsuz / Negative</h4>
      <div class="grammar-table-wrap">
        <table class="grammar-table">
          <tr><th>Kişi</th><th>Örnek (gelmek)</th><th>Örnek (almak)</th></tr>
          <tr><td>Ben</td><td>gel<strong>medim</strong></td><td>al<strong>madım</strong></td></tr>
          <tr><td>Sen</td><td>gel<strong>medin</strong></td><td>al<strong>madın</strong></td></tr>
          <tr><td>O</td><td>gel<strong>medi</strong></td><td>al<strong>madı</strong></td></tr>
          <tr><td>Biz</td><td>gel<strong>medik</strong></td><td>al<strong>madık</strong></td></tr>
          <tr><td>Siz</td><td>gel<strong>mediniz</strong></td><td>al<strong>madınız</strong></td></tr>
          <tr><td>Onlar</td><td>gel<strong>mediler</strong></td><td>al<strong>madılar</strong></td></tr>
        </table>
      </div>

      <h4>❓ Soru / Question</h4>
      <div class="grammar-table-wrap">
        <table class="grammar-table">
          <tr><th>Kişi</th><th>Örnek (gelmek)</th><th>Örnek (almak)</th></tr>
          <tr><td>Ben</td><td>gel<strong>dim mi</strong>?</td><td>al<strong>dım mı</strong>?</td></tr>
          <tr><td>Sen</td><td>gel<strong>din mi</strong>?</td><td>al<strong>dın mı</strong>?</td></tr>
          <tr><td>O</td><td>gel<strong>di mi</strong>?</td><td>al<strong>dı mı</strong>?</td></tr>
          <tr><td>Biz</td><td>gel<strong>dik mi</strong>?</td><td>al<strong>dık mı</strong>?</td></tr>
          <tr><td>Siz</td><td>gel<strong>diniz mi</strong>?</td><td>al<strong>dınız mı</strong>?</td></tr>
          <tr><td>Onlar</td><td>gel<strong>diler mi</strong>?</td><td>al<strong>dılar mı</strong>?</td></tr>
        </table>
      </div>
      <div class="grammar-tip">💡 Sert ünsüzlerden (p,ç,t,k,f,h,s,ş) sonra -ti/tı/tu/tü kullanılır: git<strong>ti</strong>, iç<strong>ti</strong></div>
    ` },
    { title: 'Hâl Ekleri (Temel)', desc: 'İsmin halleri: -i, -e, -de, -den', content: `
      <h3>Hâl Ekleri / Case Suffixes</h3>
      <div class="grammar-table-wrap">
        <table class="grammar-table">
          <tr><th>Hâl</th><th>Ek</th><th>Anlam</th><th>Örnek (ev)</th><th>Örnek (okul)</th><th>Örnek (kitap)</th></tr>
          <tr><td>Yalın</td><td>—</td><td>subject</td><td>ev</td><td>okul</td><td>kitap</td></tr>
          <tr><td>Belirtme (-i)</td><td>-ı/-i/-u/-ü</td><td>definite object</td><td>ev<strong>i</strong></td><td>okul<strong>u</strong></td><td>kitab<strong>ı</strong></td></tr>
          <tr><td>Yönelme (-e)</td><td>-a/-e</td><td>to, toward</td><td>ev<strong>e</strong></td><td>okul<strong>a</strong></td><td>kitab<strong>a</strong></td></tr>
          <tr><td>Bulunma (-de)</td><td>-da/-de/-ta/-te</td><td>at, in, on</td><td>ev<strong>de</strong></td><td>okul<strong>da</strong></td><td>kitap<strong>ta</strong></td></tr>
          <tr><td>Ayrılma (-den)</td><td>-dan/-den/-tan/-ten</td><td>from</td><td>ev<strong>den</strong></td><td>okul<strong>dan</strong></td><td>kitap<strong>tan</strong></td></tr>
        </table>
      </div>

      <h4>Cümlede Kullanım / Usage in Sentences</h4>
      <div class="grammar-table-wrap">
        <table class="grammar-table">
          <tr><th>Hâl</th><th>Cümle</th><th>Anlam</th></tr>
          <tr><td>Yalın</td><td><strong>Ev</strong> güzel.</td><td>A house is nice. / Houses are nice.</td></tr>
          <tr><td>Belirtme (-i)</td><td><strong>Evi</strong> gördüm.</td><td>I saw the house.</td></tr>
          <tr><td>Yönelme (-e)</td><td><strong>Eve</strong> gittim.</td><td>I went to the house.</td></tr>
          <tr><td>Bulunma (-de)</td><td><strong>Evde</strong> kaldım.</td><td>I stayed at the house.</td></tr>
          <tr><td>Ayrılma (-den)</td><td><strong>Evden</strong> çıktım.</td><td>I left the house.</td></tr>
        </table>
      </div>
      <div class="grammar-example">
        <strong>Daha fazla örnek:</strong><br>
        Okul<strong>a</strong> gidiyorum. (I'm going <strong>to</strong> school.)<br>
        Okul<strong>da</strong> öğreniyorum. (I'm learning <strong>at</strong> school.)<br>
        Okul<strong>dan</strong> geliyorum. (I'm coming <strong>from</strong> school.)<br>
        Kitab<strong>ı</strong> okudum. (I read <strong>the</strong> book.)<br>
        Kitab<strong>a</strong> baktım. (I looked <strong>at</strong> the book.)
      </div>
    ` },
    { title: 'İyelik Ekleri', desc: 'Sahiplik: -im, -in, -i, -imiz...', content: `
      <h3>İyelik Ekleri / Possessive Suffixes</h3>
      <div class="grammar-table-wrap">
        <table class="grammar-table">
          <tr><th>Kişi</th><th>Ek</th><th>Örnek (ev)</th><th>Anlam</th></tr>
          <tr><td>Benim</td><td>-(ı)m</td><td>ev<strong>im</strong></td><td>my house</td></tr>
          <tr><td>Senin</td><td>-(ı)n</td><td>ev<strong>in</strong></td><td>your house</td></tr>
          <tr><td>Onun</td><td>-(s)ı</td><td>ev<strong>i</strong></td><td>his/her house</td></tr>
          <tr><td>Bizim</td><td>-(ı)mız</td><td>ev<strong>imiz</strong></td><td>our house</td></tr>
          <tr><td>Sizin</td><td>-(ı)nız</td><td>ev<strong>iniz</strong></td><td>your house</td></tr>
          <tr><td>Onların</td><td>-ları</td><td>ev<strong>leri</strong></td><td>their house</td></tr>
        </table>
      </div>
      <div class="grammar-example">
        <strong>Ünlüyle biten kelimeler:</strong><br>
        araba<strong>m</strong> (my car), araba<strong>n</strong> (your car), araba<strong>sı</strong> (his/her car)
      </div>
    ` },
    { title: 'Soru Eki', desc: 'mı / mi / mu / mü ile soru yapma', content: `
      <h3>Soru Eki / Question Particle</h3>
      <p>Türkçede evet/hayır soruları <strong>mı</strong> eki ile yapılır (ayrı yazılır).</p>
      <div class="grammar-table-wrap">
        <table class="grammar-table">
          <tr><th>Son ünlü</th><th>Soru eki</th><th>Örnek</th></tr>
          <tr><td>a, ı</td><td>mı</td><td>Güzel <strong>mi</strong>? → Hazır <strong>mı</strong>?</td></tr>
          <tr><td>e, i</td><td>mi</td><td>Geldin <strong>mi</strong>?</td></tr>
          <tr><td>o, u</td><td>mu</td><td>Yorgun <strong>mu</strong>?</td></tr>
          <tr><td>ö, ü</td><td>mü</td><td>Güzel <strong>mü</strong>?</td></tr>
        </table>
      </div>
      <div class="grammar-example">
        Türk <strong>müsünüz</strong>? (Are you Turkish?)<br>
        Kahve ister <strong>misiniz</strong>? (Would you like coffee?)<br>
        Bu senin <strong>mi</strong>? (Is this yours?)
      </div>
    ` },
    { title: 'Olmak & Değil', desc: 'İsim cümlelerinde olumlu ve olumsuz', content: `
      <h3>İsim Cümleleri / Nominal Sentences</h3>
      <p>Türkçede "to be" fiili ek olarak kullanılır. Olumsuz: <strong>değil</strong></p>
      <div class="grammar-table-wrap">
        <table class="grammar-table">
          <tr><th>Kişi</th><th>Olumlu</th><th>Olumsuz</th></tr>
          <tr><td>Ben</td><td>öğrenci<strong>yim</strong></td><td>öğrenci <strong>değilim</strong></td></tr>
          <tr><td>Sen</td><td>öğrenci<strong>sin</strong></td><td>öğrenci <strong>değilsin</strong></td></tr>
          <tr><td>O</td><td>öğrenci(dir)</td><td>öğrenci <strong>değil</strong></td></tr>
          <tr><td>Biz</td><td>öğrenci<strong>yiz</strong></td><td>öğrenci <strong>değiliz</strong></td></tr>
          <tr><td>Siz</td><td>öğrenci<strong>siniz</strong></td><td>öğrenci <strong>değilsiniz</strong></td></tr>
          <tr><td>Onlar</td><td>öğrenci(ler)</td><td>öğrenci <strong>değiller</strong></td></tr>
        </table>
      </div>
    ` }
  ],
  A2: [
    { title: 'Gelecek Zaman', desc: '-(y)acak eki ile gelecek zaman', content: `
      <h3>Gelecek Zaman / Future Tense</h3>
      <p>Ek: <strong>-(y)acak</strong></p>
      <h4>✅ Olumlu / Affirmative</h4>
      <div class="grammar-table-wrap">
        <table class="grammar-table">
          <tr><th>Kişi</th><th>Örnek (gelmek)</th><th>Örnek (bakmak)</th></tr>
          <tr><td>Ben</td><td>gel<strong>eceğim</strong></td><td>bak<strong>acağım</strong></td></tr>
          <tr><td>Sen</td><td>gel<strong>eceksin</strong></td><td>bak<strong>acaksın</strong></td></tr>
          <tr><td>O</td><td>gel<strong>ecek</strong></td><td>bak<strong>acak</strong></td></tr>
          <tr><td>Biz</td><td>gel<strong>eceğiz</strong></td><td>bak<strong>acağız</strong></td></tr>
          <tr><td>Siz</td><td>gel<strong>eceksiniz</strong></td><td>bak<strong>acaksınız</strong></td></tr>
          <tr><td>Onlar</td><td>gel<strong>ecekler</strong></td><td>bak<strong>acaklar</strong></td></tr>
        </table>
      </div>

      <h4>❌ Olumsuz / Negative</h4>
      <div class="grammar-table-wrap">
        <table class="grammar-table">
          <tr><th>Kişi</th><th>Örnek (gelmek)</th><th>Örnek (bakmak)</th></tr>
          <tr><td>Ben</td><td>gel<strong>meyeceğim</strong></td><td>bak<strong>mayacağım</strong></td></tr>
          <tr><td>Sen</td><td>gel<strong>meyeceksin</strong></td><td>bak<strong>mayacaksın</strong></td></tr>
          <tr><td>O</td><td>gel<strong>meyecek</strong></td><td>bak<strong>mayacak</strong></td></tr>
          <tr><td>Biz</td><td>gel<strong>meyeceğiz</strong></td><td>bak<strong>mayacağız</strong></td></tr>
          <tr><td>Siz</td><td>gel<strong>meyeceksiniz</strong></td><td>bak<strong>mayacaksınız</strong></td></tr>
          <tr><td>Onlar</td><td>gel<strong>meyecekler</strong></td><td>bak<strong>mayacaklar</strong></td></tr>
        </table>
      </div>

      <h4>❓ Soru / Question</h4>
      <div class="grammar-table-wrap">
        <table class="grammar-table">
          <tr><th>Kişi</th><th>Örnek (gelmek)</th><th>Örnek (bakmak)</th></tr>
          <tr><td>Ben</td><td>gel<strong>ecek miyim</strong>?</td><td>bak<strong>acak mıyım</strong>?</td></tr>
          <tr><td>Sen</td><td>gel<strong>ecek misin</strong>?</td><td>bak<strong>acak mısın</strong>?</td></tr>
          <tr><td>O</td><td>gel<strong>ecek mi</strong>?</td><td>bak<strong>acak mı</strong>?</td></tr>
          <tr><td>Biz</td><td>gel<strong>ecek miyiz</strong>?</td><td>bak<strong>acak mıyız</strong>?</td></tr>
          <tr><td>Siz</td><td>gel<strong>ecek misiniz</strong>?</td><td>bak<strong>acak mısınız</strong>?</td></tr>
          <tr><td>Onlar</td><td>gel<strong>ecekler mi</strong>?</td><td>bak<strong>acaklar mı</strong>?</td></tr>
        </table>
      </div>
    ` },
    { title: 'Geniş Zaman', desc: '-(a/ı)r eki ile geniş zaman', content: `
      <h3>Geniş Zaman / Aorist (Simple Present)</h3>
      <p>Genel doğruları, alışkanlıkları ve yetenekleri ifade eder.</p>
      <h4>✅ Olumlu / Affirmative</h4>
      <div class="grammar-table-wrap">
        <table class="grammar-table">
          <tr><th>Kişi</th><th>Örnek (gelmek)</th><th>Örnek (okumak)</th></tr>
          <tr><td>Ben</td><td>gel<strong>irim</strong></td><td>oku<strong>rum</strong></td></tr>
          <tr><td>Sen</td><td>gel<strong>irsin</strong></td><td>oku<strong>rsun</strong></td></tr>
          <tr><td>O</td><td>gel<strong>ir</strong></td><td>oku<strong>r</strong></td></tr>
          <tr><td>Biz</td><td>gel<strong>iriz</strong></td><td>oku<strong>ruz</strong></td></tr>
          <tr><td>Siz</td><td>gel<strong>irsiniz</strong></td><td>oku<strong>rsunuz</strong></td></tr>
          <tr><td>Onlar</td><td>gel<strong>irler</strong></td><td>oku<strong>rlar</strong></td></tr>
        </table>
      </div>

      <h4>❌ Olumsuz / Negative</h4>
      <div class="grammar-table-wrap">
        <table class="grammar-table">
          <tr><th>Kişi</th><th>Örnek (gelmek)</th><th>Örnek (okumak)</th></tr>
          <tr><td>Ben</td><td>gel<strong>mem</strong></td><td>oku<strong>mam</strong></td></tr>
          <tr><td>Sen</td><td>gel<strong>mezsin</strong></td><td>oku<strong>mazsın</strong></td></tr>
          <tr><td>O</td><td>gel<strong>mez</strong></td><td>oku<strong>maz</strong></td></tr>
          <tr><td>Biz</td><td>gel<strong>meyiz</strong></td><td>oku<strong>mayız</strong></td></tr>
          <tr><td>Siz</td><td>gel<strong>mezsiniz</strong></td><td>oku<strong>mazsınız</strong></td></tr>
          <tr><td>Onlar</td><td>gel<strong>mezler</strong></td><td>oku<strong>mazlar</strong></td></tr>
        </table>
      </div>

      <h4>❓ Soru / Question</h4>
      <div class="grammar-table-wrap">
        <table class="grammar-table">
          <tr><th>Kişi</th><th>Örnek (gelmek)</th><th>Örnek (okumak)</th></tr>
          <tr><td>Ben</td><td>gel<strong>ir miyim</strong>?</td><td>oku<strong>r muyum</strong>?</td></tr>
          <tr><td>Sen</td><td>gel<strong>ir misin</strong>?</td><td>oku<strong>r musun</strong>?</td></tr>
          <tr><td>O</td><td>gel<strong>ir mi</strong>?</td><td>oku<strong>r mu</strong>?</td></tr>
          <tr><td>Biz</td><td>gel<strong>ir miyiz</strong>?</td><td>oku<strong>r muyuz</strong>?</td></tr>
          <tr><td>Siz</td><td>gel<strong>ir misiniz</strong>?</td><td>oku<strong>r musunuz</strong>?</td></tr>
          <tr><td>Onlar</td><td>gel<strong>irler mi</strong>?</td><td>oku<strong>rlar mı</strong>?</td></tr>
        </table>
      </div>
      <div class="grammar-example">
        Her sabah kahve <strong>içerim</strong>. (I drink coffee every morning.)<br>
        Güneş doğudan <strong>doğar</strong>. (The sun rises from the east.)
      </div>
    ` },
    { title: 'Geçmiş Zaman (-miş)', desc: 'Duyulan / belirsiz geçmiş zaman', content: `
      <h3>Duyulan Geçmiş Zaman / Reported Past (-miş)</h3>
      <p>Tanık olunmayan, duyulan veya fark edilen olaylar. Ek: <strong>-mış</strong></p>
      <h4>✅ Olumlu / Affirmative</h4>
      <div class="grammar-table-wrap">
        <table class="grammar-table">
          <tr><th>Kişi</th><th>Örnek (gelmek)</th><th>Örnek (almak)</th></tr>
          <tr><td>Ben</td><td>gel<strong>mişim</strong></td><td>al<strong>mışım</strong></td></tr>
          <tr><td>Sen</td><td>gel<strong>mişsin</strong></td><td>al<strong>mışsın</strong></td></tr>
          <tr><td>O</td><td>gel<strong>miş</strong></td><td>al<strong>mış</strong></td></tr>
          <tr><td>Biz</td><td>gel<strong>mişiz</strong></td><td>al<strong>mışız</strong></td></tr>
          <tr><td>Siz</td><td>gel<strong>mişsiniz</strong></td><td>al<strong>mışsınız</strong></td></tr>
          <tr><td>Onlar</td><td>gel<strong>mişler</strong></td><td>al<strong>mışlar</strong></td></tr>
        </table>
      </div>

      <h4>❌ Olumsuz / Negative</h4>
      <div class="grammar-table-wrap">
        <table class="grammar-table">
          <tr><th>Kişi</th><th>Örnek (gelmek)</th><th>Örnek (almak)</th></tr>
          <tr><td>Ben</td><td>gel<strong>memişim</strong></td><td>al<strong>mamışım</strong></td></tr>
          <tr><td>Sen</td><td>gel<strong>memişsin</strong></td><td>al<strong>mamışsın</strong></td></tr>
          <tr><td>O</td><td>gel<strong>memiş</strong></td><td>al<strong>mamış</strong></td></tr>
          <tr><td>Biz</td><td>gel<strong>memişiz</strong></td><td>al<strong>mamışız</strong></td></tr>
          <tr><td>Siz</td><td>gel<strong>memişsiniz</strong></td><td>al<strong>mamışsınız</strong></td></tr>
          <tr><td>Onlar</td><td>gel<strong>memişler</strong></td><td>al<strong>mamışlar</strong></td></tr>
        </table>
      </div>

      <h4>❓ Soru / Question</h4>
      <div class="grammar-table-wrap">
        <table class="grammar-table">
          <tr><th>Kişi</th><th>Örnek (gelmek)</th><th>Örnek (almak)</th></tr>
          <tr><td>Ben</td><td>gel<strong>miş miyim</strong>?</td><td>al<strong>mış mıyım</strong>?</td></tr>
          <tr><td>Sen</td><td>gel<strong>miş misin</strong>?</td><td>al<strong>mış mısın</strong>?</td></tr>
          <tr><td>O</td><td>gel<strong>miş mi</strong>?</td><td>al<strong>mış mı</strong>?</td></tr>
          <tr><td>Biz</td><td>gel<strong>miş miyiz</strong>?</td><td>al<strong>mış mıyız</strong>?</td></tr>
          <tr><td>Siz</td><td>gel<strong>miş misiniz</strong>?</td><td>al<strong>mış mısınız</strong>?</td></tr>
          <tr><td>Onlar</td><td>gel<strong>mişler mi</strong>?</td><td>al<strong>mışlar mı</strong>?</td></tr>
        </table>
      </div>
      <div class="grammar-example">
        Ali gel<strong>miş</strong>. (Ali came, apparently / I heard Ali came.)<br>
        Dün çok yağmur yağ<strong>mış</strong>. (It rained a lot yesterday, they say.)
      </div>
      <div class="grammar-tip">💡 -di: "Gördüm, biliyorum" / -miş: "Duyduma göre, fark ettim"</div>
    ` },
    { title: 'Edilgen Çatı', desc: 'Edilgen yapı: -(ı)l, -(ı)n', content: `
      <h3>Edilgen Çatı / Passive Voice</h3>
      <p>Ek: <strong>-(ı)l</strong> veya <strong>-(ı)n</strong></p>
      <div class="grammar-example">
        <strong>Etken:</strong> Ahmet mektubu yazdı. (Ahmet wrote the letter.)<br>
        <strong>Edilgen:</strong> Mektup yazı<strong>ldı</strong>. (The letter was written.)<br><br>
        <strong>Etken:</strong> Kapıyı açtılar. (They opened the door.)<br>
        <strong>Edilgen:</strong> Kapı açı<strong>ldı</strong>. (The door was opened.)
      </div>
      <div class="grammar-tip">💡 Ünlüyle biten fiillere -n eklenir: ye → ye<strong>n</strong>ir, söyle → söyle<strong>n</strong>ir</div>
    ` },
    { title: 'Karşılaştırma', desc: 'daha, en, kadar, gibi', content: `
      <h3>Karşılaştırma / Comparison</h3>
      <div class="grammar-table-wrap">
        <table class="grammar-table">
          <tr><th>Yapı</th><th>Kullanım</th><th>Örnek</th></tr>
          <tr><td><strong>daha</strong> + sıfat</td><td>more (comparative)</td><td>Ali <strong>daha</strong> uzun. (Ali is taller.)</td></tr>
          <tr><td><strong>en</strong> + sıfat</td><td>most (superlative)</td><td>Ali <strong>en</strong> uzun. (Ali is the tallest.)</td></tr>
          <tr><td>isim + <strong>kadar</strong></td><td>as ... as</td><td>Sen benim <strong>kadar</strong> güçlüsün.</td></tr>
          <tr><td>isim + <strong>gibi</strong></td><td>like</td><td>Aslan <strong>gibi</strong> güçlü.</td></tr>
          <tr><td>-dan + sıfat</td><td>than</td><td>Ali ben<strong>den</strong> uzun.</td></tr>
        </table>
      </div>
    ` },
    { title: 'Bağlaçlar', desc: 've, ama, çünkü, veya, hem...hem', content: `
      <h3>Bağlaçlar / Conjunctions</h3>
      <div class="grammar-table-wrap">
        <table class="grammar-table">
          <tr><th>Bağlaç</th><th>Anlam</th><th>Örnek</th></tr>
          <tr><td>ve</td><td>and</td><td>Çay <strong>ve</strong> kahve içerim.</td></tr>
          <tr><td>ama / fakat</td><td>but</td><td>Güzel <strong>ama</strong> pahalı.</td></tr>
          <tr><td>çünkü</td><td>because</td><td>Gelmedi <strong>çünkü</strong> hastaydı.</td></tr>
          <tr><td>veya / ya da</td><td>or</td><td>Çay <strong>veya</strong> kahve?</td></tr>
          <tr><td>hem...hem</td><td>both...and</td><td><strong>Hem</strong> güzel <strong>hem</strong> ucuz.</td></tr>
          <tr><td>ne...ne</td><td>neither...nor</td><td><strong>Ne</strong> çay <strong>ne</strong> kahve istiyorum.</td></tr>
        </table>
      </div>
    ` },
    { title: 'Zaman Zarfları & Edatlar', desc: 'önce, sonra, sırasında, boyunca', content: `
      <h3>Zaman İfadeleri / Time Expressions</h3>
      <div class="grammar-table-wrap">
        <table class="grammar-table">
          <tr><th>İfade</th><th>Anlam</th><th>Örnek</th></tr>
          <tr><td>-dan önce</td><td>before</td><td>Yemek<strong>ten önce</strong> el yıka.</td></tr>
          <tr><td>-dan sonra</td><td>after</td><td>Okul<strong>dan sonra</strong> gel.</td></tr>
          <tr><td>-ken / iken</td><td>while</td><td>Yürür<strong>ken</strong> müzik dinlerim.</td></tr>
          <tr><td>boyunca</td><td>throughout</td><td>Yaz <strong>boyunca</strong> çalıştım.</td></tr>
          <tr><td>sırasında</td><td>during</td><td>Ders <strong>sırasında</strong> konuşma.</td></tr>
        </table>
      </div>
    ` },
    { title: 'Emir & Rica', desc: 'Emir kipi ve rica ifadeleri', content: `
      <h3>Emir Kipi / Imperative Mood</h3>
      <div class="grammar-table-wrap">
        <table class="grammar-table">
          <tr><th>Kişi</th><th>Ek</th><th>Örnek (gelmek)</th></tr>
          <tr><td>Sen</td><td>(kök)</td><td><strong>Gel!</strong></td></tr>
          <tr><td>Siz</td><td>-(y)ın(ız)</td><td><strong>Gelin!</strong> / <strong>Geliniz!</strong></td></tr>
        </table>
      </div>
      <h4>Rica / Polite Requests</h4>
      <div class="grammar-example">
        Lütfen kapıyı kapat<strong>ır mısınız</strong>? (Could you close the door, please?)<br>
        Bir dakika bekle<strong>yebilir misiniz</strong>? (Could you wait a moment?)<br>
        Bana yardım ede<strong>r misin</strong>? (Can you help me?)
      </div>
    ` },
    { title: 'Yapabilmek / -ebilmek', desc: 'Yeterlilik kipi: -(y)abil', content: `
      <h3>Yeterlilik Kipi / Ability: -(y)abil</h3>
      <p>"Can / be able to" anlamı verir.</p>
      <div class="grammar-table-wrap">
        <table class="grammar-table">
          <tr><th></th><th>✅ Olumlu</th><th>❌ Olumsuz</th><th>❓ Soru</th></tr>
          <tr><td>Şimdiki</td><td>gel<strong>ebiliyorum</strong></td><td>gel<strong>emiyorum</strong></td><td>gel<strong>ebiliyor muyum</strong>?</td></tr>
          <tr><td>Geniş</td><td>gel<strong>ebilirim</strong></td><td>gel<strong>emem</strong></td><td>gel<strong>ebilir miyim</strong>?</td></tr>
          <tr><td>Geçmiş</td><td>gel<strong>ebildim</strong></td><td>gel<strong>emedim</strong></td><td>gel<strong>ebildim mi</strong>?</td></tr>
          <tr><td>Gelecek</td><td>gel<strong>ebileceğim</strong></td><td>gel<strong>emeyeceğim</strong></td><td>gel<strong>ebilecek miyim</strong>?</td></tr>
        </table>
      </div>
      <div class="grammar-example">
        Türkçe konuş<strong>abiliyorum</strong>. (I can speak Turkish.)<br>
        Yarın gel<strong>emeyeceğim</strong>. (I won't be able to come tomorrow.)<br>
        Bana yardım ed<strong>ebilir misiniz</strong>? (Can you help me?)
      </div>
    ` },
    { title: '-mak İstemek / Lazım', desc: 'İstek, gereklilik: istemek, lazım, gerek', content: `
      <h3>İstek & Gereklilik / Wants & Necessity</h3>
      <h4>İstek: -mak istemek</h4>
      <div class="grammar-example">
        Türkçe öğren<strong>mek istiyorum</strong>. (I want to learn Turkish.)<br>
        Git<strong>mek istemiyorum</strong>. (I don't want to go.)
      </div>
      <h4>Gereklilik: -malı / lazım / gerek</h4>
      <div class="grammar-example">
        Çalış<strong>malıyım</strong>. (I must study.)<br>
        Git<strong>mem lazım</strong>. (I need to go.)<br>
        Erken kalk<strong>mam gerek</strong>. (I need to wake up early.)
      </div>
    ` }
  ],
  B1: [
    { title: 'Koşul Cümleleri', desc: '-sa / eğer...ise yapıları', content: `<h3>Koşul Cümleleri / Conditionals</h3>
      <h4>Gerçek Koşul (Real Conditional)</h4>
      <div class="grammar-example">
        <strong>Eğer</strong> yarın hava güzel <strong>olursa</strong>, pikniğe gideriz.<br>
        (If the weather is nice tomorrow, we'll go on a picnic.)
      </div>
      <h4>Gerçekdışı Koşul (Unreal Conditional)</h4>
      <div class="grammar-example">
        <strong>Eğer</strong> param <strong>olsaydı</strong>, o evi alırdım.<br>
        (If I had money, I would buy that house.)<br><br>
        <strong>Eğer</strong> erken kalk<strong>saydım</strong>, otobüsü kaçırmazdım.<br>
        (If I had woken up early, I wouldn't have missed the bus.)
      </div>
      <div class="grammar-tip">💡 -sa = if (koşul) / -saydı = if...had (gerçekleşmemiş koşul)</div>` },
    { title: 'Fiilimsi: Sıfat-fiil', desc: '-an, -acak, -dık, -mış sıfat-fiiller', content: `<h3>Sıfat-Fiiller / Participles</h3>
      <div class="grammar-table-wrap">
        <table class="grammar-table">
          <tr><th>Ek</th><th>Zaman</th><th>Örnek</th></tr>
          <tr><td>-an</td><td>Şimdiki</td><td>koş<strong>an</strong> çocuk (the running child)</td></tr>
          <tr><td>-(y)acak</td><td>Gelecek</td><td>gel<strong>ecek</strong> misafir (the guest who will come)</td></tr>
          <tr><td>-dık</td><td>Geçmiş (öznel)</td><td>gör<strong>düğüm</strong> film (the film I saw)</td></tr>
          <tr><td>-mış</td><td>Geçmiş</td><td>piş<strong>miş</strong> yemek (cooked food)</td></tr>
        </table>
      </div>
      <div class="grammar-example">
        Dün oku<strong>duğum</strong> kitap çok güzeldi. (The book I read yesterday was very nice.)<br>
        Yarın gel<strong>ecek</strong> öğretmen yeni. (The teacher who will come tomorrow is new.)
      </div>` },
    { title: 'Fiilimsi: Zarf-fiil', desc: '-ıp, -arak, -ınca, -ken zarf-fiiller', content: `<h3>Zarf-Fiiller / Gerunds (Adverbial)</h3>
      <div class="grammar-table-wrap">
        <table class="grammar-table">
          <tr><th>Ek</th><th>Anlam</th><th>Örnek</th></tr>
          <tr><td>-(y)ıp</td><td>and then</td><td>Gel<strong>ip</strong> oturdu. (He came and sat.)</td></tr>
          <tr><td>-(y)arak</td><td>by doing</td><td>Koş<strong>arak</strong> geldi. (He came running.)</td></tr>
          <tr><td>-(y)ınca</td><td>when/after</td><td>Gör<strong>ünce</strong> sevindi. (He was happy when he saw.)</td></tr>
          <tr><td>-ken</td><td>while</td><td>Yürür<strong>ken</strong> düştü. (He fell while walking.)</td></tr>
          <tr><td>-madan</td><td>without</td><td>Sor<strong>madan</strong> aldı. (He took it without asking.)</td></tr>
          <tr><td>-dikça</td><td>as...more</td><td>Çalış<strong>tıkça</strong> başarılı olursun.</td></tr>
        </table>
      </div>` },
    { title: 'Dolaylı Anlatım', desc: 'Aktarma cümleleri: dedi ki, söyledi', content: `<h3>Dolaylı Anlatım / Reported Speech</h3>
      <div class="grammar-example">
        <strong>Doğrudan:</strong> Ali: "Yarın geleceğim."<br>
        <strong>Dolaylı:</strong> Ali yarın gel<strong>eceğini</strong> söyledi.<br><br>
        <strong>Doğrudan:</strong> Ayşe: "Hastaydım."<br>
        <strong>Dolaylı:</strong> Ayşe hasta ol<strong>duğunu</strong> söyledi.
      </div>
      <div class="grammar-tip">💡 -diğini / -(y)acağını + söylemek / demek / bildirmek</div>` },
    { title: 'Ettirgen & İşteş Çatı', desc: '-dır (ettirgen), -(ı)ş (işteş)', content: `<h3>Ettirgen Çatı / Causative</h3>
      <p>Birine bir iş yaptırmak: <strong>-dır, -t, -ır, -ar</strong></p>
      <div class="grammar-example">
        yap → yap<strong>tır</strong>mak (to have something done)<br>
        kes → kes<strong>tir</strong>mek (to have something cut)<br>
        Saçımı kes<strong>tirdim</strong>. (I had my hair cut.)
      </div>
      <h3>İşteş Çatı / Reciprocal</h3>
      <p>Karşılıklı yapılan eylem: <strong>-(ı)ş</strong></p>
      <div class="grammar-example">
        gör → gör<strong>üş</strong>mek (to see each other / to meet)<br>
        bak → bak<strong>ış</strong>mak (to look at each other)<br>
        Yarın görüş<strong>elim</strong>. (Let's meet tomorrow.)
      </div>` },
    { title: 'İstek Kipi', desc: '-(y)a / -(y)ayım ile istek', content: `<h3>İstek Kipi / Optative Mood</h3>
      <p>"Let me / let's" anlamında kullanılır.</p>

      <h4>✅ Olumlu / Affirmative</h4>
      <div class="grammar-table-wrap">
        <table class="grammar-table">
          <tr><th>Kişi</th><th>Ek</th><th>Örnek (gitmek)</th><th>Örnek (gelmek)</th></tr>
          <tr><td>Ben</td><td>-(y)ayım</td><td>gid<strong>eyim</strong></td><td>gel<strong>eyim</strong></td></tr>
          <tr><td>Biz</td><td>-(y)alım</td><td>gid<strong>elim</strong></td><td>gel<strong>elim</strong></td></tr>
          <tr><td>O</td><td>-sın</td><td>git<strong>sin</strong></td><td>gel<strong>sin</strong></td></tr>
          <tr><td>Onlar</td><td>-sınlar</td><td>git<strong>sinler</strong></td><td>gel<strong>sinler</strong></td></tr>
        </table>
      </div>

      <h4>❌ Olumsuz / Negative</h4>
      <div class="grammar-table-wrap">
        <table class="grammar-table">
          <tr><th>Kişi</th><th>Örnek (gitmek)</th><th>Örnek (gelmek)</th></tr>
          <tr><td>Ben</td><td>git<strong>meyeyim</strong></td><td>gel<strong>meyeyim</strong></td></tr>
          <tr><td>Biz</td><td>git<strong>meyelim</strong></td><td>gel<strong>meyelim</strong></td></tr>
          <tr><td>O</td><td>git<strong>mesin</strong></td><td>gel<strong>mesin</strong></td></tr>
          <tr><td>Onlar</td><td>git<strong>mesinler</strong></td><td>gel<strong>mesinler</strong></td></tr>
        </table>
      </div>

      <div class="grammar-example">
        Bir kahve iç<strong>elim</strong>. (Let's have a coffee.)<br>
        Bugün çık<strong>mayalım</strong>. (Let's not go out today.)
      </div>` },
    { title: 'Ki Bağlacı', desc: 'ki ile bağlı yan cümleler', content: `<h3>"Ki" Bağlacı / The Conjunction "Ki"</h3>
      <div class="grammar-example">
        Düşünüyorum <strong>ki</strong> bu doğru. (I think that this is right.)<br>
        O kadar yoruldum <strong>ki</strong> uyuyakaldım. (I was so tired that I fell asleep.)<br>
        Biliyorum <strong>ki</strong> başaracaksın. (I know that you will succeed.)
      </div>
      <div class="grammar-tip">💡 "Ki" ayrı yazılır ve ünlü uyumuna uymaz (her zaman "ki").</div>` },
    { title: 'Söz Dizimi', desc: 'Türkçe cümle yapısı: SOV ve vurgu', content: `<h3>Söz Dizimi / Word Order</h3>
      <p>Temel sıra: <strong>Özne + Nesne + Yüklem (SOV)</strong></p>
      <div class="grammar-example">
        <strong>Ben</strong> (S) <strong>kitap</strong> (O) <strong>okuyorum</strong> (V).<br>
        I am reading a book.
      </div>
      <p>Vurgulamak istenen öge yüklemden hemen önce gelir:</p>
      <div class="grammar-example">
        <strong>Kitabı ben</strong> aldım. (It was <strong>I</strong> who took the book.)<br>
        <strong>Ben kitabı</strong> aldım. (I took <strong>the book</strong>.)
      </div>` }
  ],
  B2: [
    { title: 'İleri Sıfat-fiiller', desc: '-ası, -maz, -ır...-maz yapıları', content: `<h3>İleri Sıfat-Fiiller</h3>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Ek</th><th>Anlam</th><th>Örnek</th></tr>
        <tr><td>-ası</td><td>worth doing</td><td>gör<strong>esi</strong> yerler (places worth seeing)</td></tr>
        <tr><td>-maz</td><td>that doesn't</td><td>bit<strong>mez</strong> tüken<strong>mez</strong> (endless)</td></tr>
        <tr><td>-ır...-maz</td><td>as soon as</td><td>Gel<strong>ir</strong> gel<strong>mez</strong> aradı. (He called as soon as he arrived.)</td></tr>
      </table></div>` },
    { title: 'Birleşik Zamanlar', desc: '-ıyordu, -mıştı, -acaktı', content: `<h3>Birleşik Zamanlar / Compound Tenses</h3>
      <h4>✅ Olumlu / Affirmative</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Birleşik Zaman</th><th>Yapı</th><th>Örnek (gelmek)</th></tr>
        <tr><td>Şimdiki zamanın hikayesi</td><td>-ıyordu</td><td>gel<strong>iyordu</strong> (he was coming)</td></tr>
        <tr><td>Geçmişin hikayesi</td><td>-mıştı</td><td>gel<strong>mişti</strong> (he had come)</td></tr>
        <tr><td>Geleceğin hikayesi</td><td>-acaktı</td><td>gel<strong>ecekti</strong> (he was going to come)</td></tr>
        <tr><td>Geniş zamanın hikayesi</td><td>-ırdı</td><td>gel<strong>irdi</strong> (he used to come)</td></tr>
      </table></div>

      <h4>❌ Olumsuz / Negative</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Birleşik Zaman</th><th>Yapı</th><th>Örnek (gelmek)</th></tr>
        <tr><td>Şimdiki zamanın hikayesi</td><td>-mıyordu</td><td>gel<strong>miyordu</strong> (he was not coming)</td></tr>
        <tr><td>Geçmişin hikayesi</td><td>-mamıştı</td><td>gel<strong>memişti</strong> (he had not come)</td></tr>
        <tr><td>Geleceğin hikayesi</td><td>-mayacaktı</td><td>gel<strong>meyecekti</strong> (he was not going to come)</td></tr>
        <tr><td>Geniş zamanın hikayesi</td><td>-mazdi</td><td>gel<strong>mezdi</strong> (he would not come)</td></tr>
      </table></div>

      <h4>❓ Soru / Question</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Birleşik Zaman</th><th>Örnek (gelmek)</th></tr>
        <tr><td>Şimdiki zamanın hikayesi</td><td>gel<strong>iyor muydu</strong>? (was he coming?)</td></tr>
        <tr><td>Geçmişin hikayesi</td><td>gel<strong>miş miydi</strong>? (had he come?)</td></tr>
        <tr><td>Geleceğin hikayesi</td><td>gel<strong>ecek miydi</strong>? (was he going to come?)</td></tr>
        <tr><td>Geniş zamanın hikayesi</td><td>gel<strong>ir miydi</strong>? (would he come?)</td></tr>
      </table></div>

      <div class="grammar-example">
        O zamanlar her gün yürü<strong>yorduk</strong>. (We used to walk every day back then.)<br>
        Daha önce hiç git<strong>memişti</strong>. (He had never gone before.)
      </div>` },
    { title: 'Yapım Ekleri', desc: 'İsimden fiil, fiilden isim türetme', content: `<h3>Yapım Ekleri / Derivational Suffixes</h3>
      <h4>İsimden Fiil</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Ek</th><th>Örnek</th></tr>
        <tr><td>-la</td><td>su → su<strong>la</strong>mak (to water)</td></tr>
        <tr><td>-lan</td><td>ev → ev<strong>len</strong>mek (to get married)</td></tr>
        <tr><td>-laş</td><td>güzel → güzel<strong>leş</strong>mek (to become beautiful)</td></tr>
      </table></div>
      <h4>Fiilden İsim</h4>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Ek</th><th>Örnek</th></tr>
        <tr><td>-ma</td><td>yaz → yaz<strong>ma</strong> (writing)</td></tr>
        <tr><td>-ış</td><td>bak → bak<strong>ış</strong> (glance)</td></tr>
        <tr><td>-ım</td><td>say → say<strong>ım</strong> (census)</td></tr>
        <tr><td>-(y)ıcı</td><td>yap → yap<strong>ıcı</strong> (constructive)</td></tr>
      </table></div>` },
    { title: 'Kip Uyumu & Dolaylı', desc: 'Karmaşık aktarma ve kip kayması', content: `<h3>Kip Uyumu / Mood Agreement</h3>
      <div class="grammar-example">
        "Gel<strong>sin</strong>" dedi. → Gel<strong>mesini</strong> istedi. (He wanted him to come.)<br>
        "Yap<strong>ma</strong>!" dedi. → Yap<strong>mamasını</strong> söyledi. (He told him not to do it.)<br>
        "Yap<strong>abilir misin</strong>?" → Yap<strong>ıp yapamayacağını</strong> sordu.
      </div>` },
    { title: 'Bağımlı Yan Cümleler', desc: '-dığı için, -dığı halde, -dığı sürece', content: `<h3>Bağımlı Yan Cümleler / Subordinate Clauses</h3>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Yapı</th><th>Anlam</th><th>Örnek</th></tr>
        <tr><td>-dığı için</td><td>because</td><td>Hasta ol<strong>duğu için</strong> gelmedi.</td></tr>
        <tr><td>-dığı halde</td><td>although</td><td>Bil<strong>diği halde</strong> söylemedi.</td></tr>
        <tr><td>-dığı sürece</td><td>as long as</td><td>Çalış<strong>tığı sürece</strong> başarır.</td></tr>
        <tr><td>-dığı takdirde</td><td>in case</td><td>Gel<strong>diği takdirde</strong> haber ver.</td></tr>
        <tr><td>-masına rağmen</td><td>despite</td><td>Çalış<strong>masına rağmen</strong> başaramadı.</td></tr>
      </table></div>` }
  ],
  C1: [
    { title: 'Akademik Yazım Yapıları', desc: 'Resmi ve akademik Türkçe kalıpları', content: `<h3>Akademik Yazım / Academic Writing</h3>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Kalıp</th><th>Anlam</th><th>Örnek</th></tr>
        <tr><td>-dığı öne sürülmektedir</td><td>it is argued that</td><td>Bu durumun sürdürülebilir ol<strong>duğu öne sürülmektedir</strong>.</td></tr>
        <tr><td>-ması gerekmektedir</td><td>it is necessary that</td><td>Önlem alın<strong>ması gerekmektedir</strong>.</td></tr>
        <tr><td>-dığı görülmektedir</td><td>it is observed that</td><td>Sonuçların tutarlı ol<strong>duğu görülmektedir</strong>.</td></tr>
        <tr><td>-ması bakımından</td><td>in terms of</td><td>Verimlilik sağla<strong>ması bakımından</strong> önemlidir.</td></tr>
      </table></div>` },
    { title: 'Edebi Üslup', desc: 'Devrik cümle, imgelem, mecaz', content: `<h3>Edebi Üslup / Literary Style</h3>
      <h4>Devrik Cümle (Inverted Sentence)</h4>
      <div class="grammar-example">
        Normal: Ben seni <strong>seviyorum</strong>.<br>
        Devrik: <strong>Seviyorum</strong> ben seni.<br><br>
        Normal: Yağmur <strong>yağıyor</strong>.<br>
        Devrik: <strong>Yağıyor</strong> yağmur, durmadan.
      </div>
      <h4>Mecaz / Metaphor</h4>
      <div class="grammar-example">
        "Gözlerin deniz." (Your eyes are the sea.)<br>
        "Yüreğim yanıyor." (My heart is burning.)
      </div>` },
    { title: 'İleri Bağlaçlar', desc: 'Şöyle ki, nitekim, oysaki, halbuki', content: `<h3>İleri Bağlaçlar / Advanced Conjunctions</h3>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Bağlaç</th><th>Anlam</th><th>Örnek</th></tr>
        <tr><td>şöyle ki</td><td>that is to say</td><td>Bir sorun var, <strong>şöyle ki</strong> bütçe yetersiz.</td></tr>
        <tr><td>oysaki / halbuki</td><td>whereas</td><td>Herkes gülüyordu, <strong>oysaki</strong> durum ciddiydi.</td></tr>
        <tr><td>velhasıl</td><td>in short</td><td><strong>Velhasıl</strong>, proje başarısız oldu.</td></tr>
        <tr><td>binaenaleyh</td><td>therefore (formal)</td><td><strong>Binaenaleyh</strong>, karar alınmalıdır.</td></tr>
        <tr><td>mamafih</td><td>nevertheless</td><td><strong>Mamafih</strong>, umut var.</td></tr>
      </table></div>` },
    { title: 'Eski Türkçe Kalıplar', desc: 'Osmanlıca kökenli yapılar', content: `<h3>Osmanlıca Kökenli Kalıplar</h3>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Kalıp</th><th>Anlam</th><th>Modern Karşılık</th></tr>
        <tr><td>bilcümle</td><td>all together</td><td>hep birlikte</td></tr>
        <tr><td>hasılıkelam</td><td>in short</td><td>sözün kısası</td></tr>
        <tr><td>maalifahr</td><td>with pride</td><td>gururla</td></tr>
        <tr><td>bermutat</td><td>as usual</td><td>her zamanki gibi</td></tr>
      </table></div>
      <div class="grammar-tip">💡 Bu kalıplar resmi yazışmalarda ve edebiyatta hâlâ kullanılır.</div>` }
  ],
  C2: [
    { title: 'Dil Felsefesi & Anlambilim', desc: 'Anlam katmanları ve söylem analizi', content: `<h3>Anlambilim / Semantics</h3>
      <div class="grammar-example">
        <strong>Eşanlamlılık:</strong> büyük = iri = kocaman<br>
        <strong>Karşıtanlamlılık:</strong> güzel ↔ çirkin<br>
        <strong>Çokanlamlılık:</strong> "yüz" → yüz (face), yüz (100), yüz- (swim)<br>
        <strong>Eşseslilik:</strong> "yaz" → yaz (summer) / yaz- (write)
      </div>
      <h4>Söz Edimi / Speech Acts</h4>
      <div class="grammar-example">
        <strong>Dolaylı söz edimi:</strong><br>
        "Pencereyi açar mısın?" → Rica (soru değil)<br>
        "Çok güzel olmuş!" → İroni (bağlama göre)
      </div>` },
    { title: 'Retorik & Söylem', desc: 'İkna teknikleri ve söylem yapıları', content: `<h3>Retorik / Rhetoric</h3>
      <div class="grammar-table-wrap"><table class="grammar-table">
        <tr><th>Teknik</th><th>Açıklama</th><th>Örnek</th></tr>
        <tr><td>Tekrir</td><td>Tekrar</td><td>"Gel, gel, ne olursan ol gel."</td></tr>
        <tr><td>Tezat</td><td>Karşıtlık</td><td>"Ağlarım hatıra geldikçe gülüştüklerimiz."</td></tr>
        <tr><td>Mübalağa</td><td>Abartma</td><td>"Bin yıldır bekliyorum."</td></tr>
        <tr><td>Hüsn-i talil</td><td>Güzel nedenleme</td><td>"Güneş senin için doğar."</td></tr>
      </table></div>` }
  ]
};

const GRAMMAR_LEVEL_META = {
  A1: { tr: 'Başlangıç', i18nKey: 'grammar_lvl_a1', color: '#22c55e' },
  A2: { tr: 'Temel', i18nKey: 'grammar_lvl_a2', color: '#84cc16' },
  B1: { tr: 'Orta', i18nKey: 'grammar_lvl_b1', color: '#eab308' },
  B2: { tr: 'Orta Üstü', i18nKey: 'grammar_lvl_b2', color: '#f97316' },
  C1: { tr: 'İleri', i18nKey: 'grammar_lvl_c1', color: '#ef4444' },
  C2: { tr: 'Uzman', i18nKey: 'grammar_lvl_c2', color: '#9333ea' }
};

function getGrammarLevelLabel(meta) {
  return I18N.bi(meta.tr, meta.i18nKey);
}

let grammarState = { level: 'A1', topicIndex: 0 };

function renderGrammar(container) {
  const levelsHtml = ['A1','A2','B1','B2','C1','C2'].map(lvl => {
    const meta = GRAMMAR_LEVEL_META[lvl];
    const isOpen = grammarState.level === lvl;
    const topics = GRAMMAR_LEVELS[lvl] || [];
    const topicsHtml = isOpen ? topics.map((t, i) => `
      <div class="grammar-topic-item${i === grammarState.topicIndex ? ' active' : ''}" data-level="${lvl}" data-index="${i}">
        <div class="grammar-topic-title"><span class="grammar-topic-num" style="background:${meta.color}">${i + 1}</span>${grammarBi(t.title)}</div>
        <div class="grammar-topic-desc">${grammarBi(t.desc)}</div>
      </div>
    `).join('') : '';

    return `
      <div class="grammar-level-row${isOpen ? ' open' : ''}" data-level="${lvl}">
        <div class="grammar-level-header" data-level="${lvl}">
          <span class="grammar-level-badge" style="background:${meta.color}">${lvl}</span>
          <span class="grammar-level-label">${getGrammarLevelLabel(meta)}</span>
          <span class="grammar-level-count">${(GRAMMAR_LEVELS[lvl] || []).length} ${I18N.bi('konu', 'grammar_topic_count')}</span>
          <span class="grammar-level-arrow">${isOpen ? '&#9650;' : '&#9660;'}</span>
        </div>
        ${isOpen ? `<div class="grammar-topic-list">${topicsHtml}</div>` : ''}
      </div>
    `;
  }).join('');

  const topics = grammarState.level ? (GRAMMAR_LEVELS[grammarState.level] || []) : [];
  const currentTopic = topics[grammarState.topicIndex] || null;
  const isAdmin = !!sessionStorage.getItem('adminPassword');
  const shareBtn = (currentTopic && isAdmin) ? `<div class="grammar-share-actions">
    <button class="grammar-share-btn grammar-share-story" data-mode="story">
      <span>&#9641;</span> ${I18N.bi('Story İndir', 'grammar_story_dl')}
    </button>
    <button class="grammar-share-btn grammar-share-post" data-mode="post">
      <span>&#9635;</span> ${I18N.bi('Post İndir', 'grammar_post_dl')}
    </button>
  </div>` : '';
  const contentHtml = currentTopic ? (shareBtn + translateGrammarContent(currentTopic.content)) : `<div class="grammar-placeholder"><span>&#128218;</span><p>${I18N.bi('Bir seviye ve konu seçin', 'grammar_select_topic')}</p></div>`;

  container.innerHTML = `
    <div class="vocab-page">
      <div class="gallery-header">
        <h1>${I18N.bi('Dilbilgisi', 'grammar_title')}</h1>
        <p class="gallery-subtitle">${I18N.bi('Seviyene uygun dilbilgisi konularını keşfet', 'grammar_subtitle')}</p>
      </div>

      <div class="vocab-full">
        <div class="vocab-full-sidebar grammar-sidebar">
          ${levelsHtml}
        </div>

        <div class="vocab-full-main grammar-content-area">
          ${contentHtml}
        </div>
      </div>
    </div>
  `;

  // Level headers (accordion toggle)
  container.querySelectorAll('.grammar-level-header').forEach(header => {
    header.addEventListener('click', () => {
      const lvl = header.dataset.level;
      if (grammarState.level === lvl) {
        grammarState.level = null;
      } else {
        grammarState.level = lvl;
        grammarState.topicIndex = 0;
      }
      renderGrammar(container);
    });
  });

  // Topic items
  container.querySelectorAll('.grammar-topic-item').forEach(item => {
    item.addEventListener('click', () => {
      grammarState.topicIndex = parseInt(item.dataset.index);
      renderGrammar(container);
    });
  });

  // Instagram share buttons (admin only)
  container.querySelectorAll('.grammar-share-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode;
      generateGrammarCards(grammarState.level, grammarState.topicIndex, mode);
    });
  });
}

// ========== Instagram Card Generator ==========
const GRAMMAR_BRAND_NAME = 'TurkceAI';
const GRAMMAR_BRAND_HANDLE = '@turkceai';

function generateGrammarCards(level, topicIndex, mode) {
  const topic = GRAMMAR_LEVELS[level][topicIndex];
  if (!topic) return;
  const meta = GRAMMAR_LEVEL_META[level];

  // Parse the HTML content into logical slides
  const slides = parseTopicIntoSlides(topic, level, meta);

  // Show overlay with carousel
  showCardCarousel(slides, mode, topic.title, level, meta);
}

function parseTopicIntoSlides(topic, level, meta) {
  const temp = document.createElement('div');
  temp.innerHTML = topic.content;

  const slides = [];
  // First slide: title card
  slides.push({
    type: 'title',
    title: topic.title,
    desc: topic.desc,
    level: level,
    label: meta.label
  });

  // Walk through child nodes and group them into slides
  let currentSlide = { type: 'content', elements: [] };
  const children = Array.from(temp.children);

  for (let i = 0; i < children.length; i++) {
    const el = children[i];
    const tag = el.tagName.toLowerCase();

    // h3 is overall title - skip (we have title card)
    if (tag === 'h3') continue;

    // h4 starts a new slide
    if (tag === 'h4') {
      if (currentSlide.elements.length > 0) {
        slides.push(currentSlide);
      }
      currentSlide = { type: 'content', elements: [] };
      currentSlide.heading = el.innerHTML;
      continue;
    }

    currentSlide.elements.push(el.outerHTML);

    // If we have a table + tip/example, break
    const hasTable = currentSlide.elements.some(e => e.includes('<table'));
    const hasTipOrExample = currentSlide.elements.some(e => e.includes('grammar-tip') || e.includes('grammar-example'));
    if (hasTable && hasTipOrExample && i < children.length - 1) {
      const nextTag = children[i + 1]?.tagName?.toLowerCase();
      if (nextTag !== 'div' || children[i + 1]?.className === 'grammar-table-wrap') {
        slides.push(currentSlide);
        currentSlide = { type: 'content', elements: [], heading: currentSlide.heading };
      }
    }
  }

  if (currentSlide.elements.length > 0) {
    slides.push(currentSlide);
  }

  return slides;
}

function showCardCarousel(slides, mode, topicTitle, level, meta) {
  // Remove existing overlay
  const existing = document.querySelector('.ig-card-overlay');
  if (existing) existing.remove();

  const isStory = mode === 'story';
  const cardW = isStory ? 1080 : 1080;
  const cardH = isStory ? 1920 : 1080;
  const previewW = isStory ? 270 : 300;
  const previewH = isStory ? 480 : 300;
  const scaleRatio = previewW / cardW;

  let currentIndex = 0;

  const overlay = document.createElement('div');
  overlay.className = 'ig-card-overlay';
  overlay.innerHTML = `
    <div class="ig-card-modal">
      <div class="ig-card-topbar">
        <span class="ig-card-counter">1 / ${slides.length}</span>
        <span class="ig-card-mode-label">${isStory ? 'Story (9:16)' : 'Post (1:1)'}</span>
        <button class="ig-card-close">&times;</button>
      </div>
      <div class="ig-card-preview-wrap" style="width:${previewW}px;height:${previewH}px;">
        <div class="ig-card-render-zone" style="width:${cardW}px;height:${cardH}px;transform:scale(${scaleRatio});transform-origin:top left;"></div>
      </div>
      <div class="ig-card-nav">
        <button class="ig-card-prev">&larr; Onceki</button>
        <button class="ig-card-dl">PNG Indir</button>
        <button class="ig-card-dl-all">Tumunu Indir</button>
        <button class="ig-card-next">Sonraki &rarr;</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const renderZone = overlay.querySelector('.ig-card-render-zone');
  const counter = overlay.querySelector('.ig-card-counter');

  function renderSlide(idx) {
    currentIndex = idx;
    counter.textContent = `${idx + 1} / ${slides.length}`;
    const slide = slides[idx];
    const levelColor = meta.color;
    const gradientBg = isStory
      ? `linear-gradient(180deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)`
      : `linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)`;

    if (slide.type === 'title') {
      renderZone.innerHTML = `
        <div class="ig-card" style="width:${cardW}px;height:${cardH}px;background:${gradientBg};">
          <div class="ig-card-header">
            <div class="ig-card-badge" style="background:${levelColor}">${slide.level}</div>
            <div class="ig-card-level-text">${slide.label}</div>
          </div>
          <div class="ig-card-title-area ${isStory ? 'ig-story' : 'ig-post'}">
            <div class="ig-card-emoji">&#128214;</div>
            <h2 class="ig-card-title">${slide.title}</h2>
            <p class="ig-card-desc">${slide.desc}</p>
          </div>
          <div class="ig-card-swipe">${slides.length > 1 ? (isStory ? '&uarr; Yukari kaydir' : '&larr; Kaydirarak devam et') : ''}</div>
          <div class="ig-card-watermark">
            <div class="ig-card-wm-name">${GRAMMAR_BRAND_NAME}</div>
            <div class="ig-card-wm-handle">${GRAMMAR_BRAND_HANDLE}</div>
          </div>
        </div>`;
    } else {
      const heading = slide.heading ? `<div class="ig-card-content-heading">${slide.heading}</div>` : '';
      renderZone.innerHTML = `
        <div class="ig-card" style="width:${cardW}px;height:${cardH}px;background:${gradientBg};">
          <div class="ig-card-header">
            <div class="ig-card-badge" style="background:${levelColor}">${level}</div>
            <div class="ig-card-header-title">${topicTitle}</div>
            <div class="ig-card-page-num">${idx + 1}/${slides.length}</div>
          </div>
          <div class="ig-card-body ${isStory ? 'ig-story' : 'ig-post'}">
            ${heading}
            <div class="ig-card-content">${slide.elements.join('')}</div>
          </div>
          <div class="ig-card-watermark">
            <div class="ig-card-wm-name">${GRAMMAR_BRAND_NAME}</div>
            <div class="ig-card-wm-handle">${GRAMMAR_BRAND_HANDLE}</div>
          </div>
        </div>`;
    }
  }

  renderSlide(0);

  overlay.querySelector('.ig-card-close').addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
  overlay.querySelector('.ig-card-prev').addEventListener('click', () => {
    if (currentIndex > 0) renderSlide(currentIndex - 1);
  });
  overlay.querySelector('.ig-card-next').addEventListener('click', () => {
    if (currentIndex < slides.length - 1) renderSlide(currentIndex + 1);
  });

  // Capture a slide at full resolution off-screen
  async function captureSlide(idx) {
    // Save current, render target slide
    const prevIdx = currentIndex;
    renderSlide(idx);

    // Clone the card into a full-size off-screen container
    const card = renderZone.querySelector('.ig-card');
    if (!card) return null;
    const offscreen = document.createElement('div');
    offscreen.style.cssText = `position:fixed;left:-9999px;top:0;width:${cardW}px;height:${cardH}px;z-index:-1;overflow:hidden;`;
    const clone = card.cloneNode(true);
    clone.style.transform = 'none';
    clone.style.width = cardW + 'px';
    clone.style.height = cardH + 'px';
    offscreen.appendChild(clone);
    document.body.appendChild(offscreen);

    await new Promise(r => setTimeout(r, 100));

    try {
      const canvas = await html2canvas(clone, {
        scale: 1,
        width: cardW,
        height: cardH,
        useCORS: true,
        backgroundColor: null,
        windowWidth: cardW,
        windowHeight: cardH
      });
      return canvas;
    } finally {
      offscreen.remove();
    }
  }

  // Download current slide
  overlay.querySelector('.ig-card-dl').addEventListener('click', async () => {
    const btn = overlay.querySelector('.ig-card-dl');
    btn.textContent = I18N.bi('Hazırlanıyor...', 'grammar_preparing');
    btn.disabled = true;
    try {
      const canvas = await captureSlide(currentIndex);
      if (canvas) downloadCanvas(canvas, `${level}_${topicTitle.replace(/\s+/g, '_')}_${currentIndex + 1}.png`);
    } catch (err) { console.error('Download error:', err); }
    btn.textContent = I18N.bi('PNG İndir', 'grammar_dl_png');
    btn.disabled = false;
  });

  // Download all slides
  overlay.querySelector('.ig-card-dl-all').addEventListener('click', async () => {
    const btn = overlay.querySelector('.ig-card-dl-all');
    btn.disabled = true;
    for (let i = 0; i < slides.length; i++) {
      btn.textContent = `${i + 1}/${slides.length}...`;
      try {
        const canvas = await captureSlide(i);
        if (canvas) downloadCanvas(canvas, `${level}_${topicTitle.replace(/\s+/g, '_')}_${i + 1}.png`);
      } catch (err) { console.error('Download error:', err); }
      await new Promise(r => setTimeout(r, 300));
    }
    btn.textContent = I18N.bi('Tümünü İndir', 'grammar_dl_all');
    btn.disabled = false;
  });
}

function downloadCanvas(canvas, filename) {
  canvas.toBlob(function(blob) {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = filename;
    link.href = url;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  }, 'image/png');
}
