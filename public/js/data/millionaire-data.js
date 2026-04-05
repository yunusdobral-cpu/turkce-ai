// Milyoner Yarışması Soru Veritabanı - 6 Dil Destekli
// Diller: tr (Türkçe), en, es, ar, ru, de, fr
// options array ise tüm dillerde aynı (Türkçe kelimeler), object ise dile göre değişir

window.MILLIONAIRE_DATA = {
  A1: [
    {
      q: { tr: '"Merhaba" ne demek?', en: 'What does "Merhaba" mean?', es: '¿Qué significa "Merhaba"?', ar: 'ماذا تعني "Merhaba"؟', ru: 'Что означает "Merhaba"?', de: 'Was bedeutet "Merhaba"?', fr: 'Que signifie "Merhaba" ?' },
      options: { tr: ['Merhaba', 'Hoşçakal', 'Teşekkürler', 'Lütfen'], en: ['Hello', 'Goodbye', 'Thank you', 'Please'], es: ['Hola', 'Adiós', 'Gracias', 'Por favor'], ar: ['مرحبا', 'وداعا', 'شكرا', 'من فضلك'], ru: ['Привет', 'До свидания', 'Спасибо', 'Пожалуйста'], de: ['Hallo', 'Tschüss', 'Danke', 'Bitte'], fr: ['Bonjour', 'Au revoir', 'Merci', 'S\'il vous plaît'] },
      answer: 0
    },
    {
      q: { tr: '"Kedi" hangi hayvandır?', en: 'What animal is "Kedi"?', es: '¿Qué animal es "Kedi"?', ar: 'ما هو حيوان "Kedi"؟', ru: 'Какое животное "Kedi"?', de: 'Welches Tier ist "Kedi"?', fr: 'Quel animal est "Kedi" ?' },
      options: { tr: ['Köpek', 'Kedi', 'Kuş', 'Balık'], en: ['Dog', 'Cat', 'Bird', 'Fish'], es: ['Perro', 'Gato', 'Pájaro', 'Pez'], ar: ['كلب', 'قطة', 'طائر', 'سمكة'], ru: ['Собака', 'Кошка', 'Птица', 'Рыба'], de: ['Hund', 'Katze', 'Vogel', 'Fisch'], fr: ['Chien', 'Chat', 'Oiseau', 'Poisson'] },
      answer: 1
    },
    {
      q: { tr: '"Bir" sayısından sonra ne gelir?', en: 'What number comes after "Bir" (one)?', es: '¿Qué número viene después de "Bir" (uno)?', ar: 'ما الرقم الذي يأتي بعد "Bir" (واحد)؟', ru: 'Какое число идёт после "Bir" (один)?', de: 'Welche Zahl kommt nach "Bir" (eins)?', fr: 'Quel nombre vient après "Bir" (un) ?' },
      options: ['Üç', 'Dört', 'İki', 'Beş'],
      answer: 2
    },
    {
      q: { tr: '"Su" ne demek?', en: 'What does "Su" mean?', es: '¿Qué significa "Su"?', ar: 'ماذا تعني "Su"؟', ru: 'Что означает "Su"?', de: 'Was bedeutet "Su"?', fr: 'Que signifie "Su" ?' },
      options: { tr: ['Ateş', 'Su', 'Hava', 'Toprak'], en: ['Fire', 'Water', 'Air', 'Earth'], es: ['Fuego', 'Agua', 'Aire', 'Tierra'], ar: ['نار', 'ماء', 'هواء', 'أرض'], ru: ['Огонь', 'Вода', 'Воздух', 'Земля'], de: ['Feuer', 'Wasser', 'Luft', 'Erde'], fr: ['Feu', 'Eau', 'Air', 'Terre'] },
      answer: 1
    },
    {
      q: { tr: '"Günaydın" ne zaman söylenir?', en: 'When do you say "Günaydın"?', es: '¿Cuándo se dice "Günaydın"?', ar: 'متى تقول "Günaydın"؟', ru: 'Когда говорят "Günaydın"?', de: 'Wann sagt man "Günaydın"?', fr: 'Quand dit-on "Günaydın" ?' },
      options: { tr: ['Akşam', 'Gece', 'Sabah', 'Öğlen'], en: ['Evening', 'Night', 'Morning', 'Noon'], es: ['Tarde', 'Noche', 'Mañana', 'Mediodía'], ar: ['مساء', 'ليل', 'صباح', 'ظهر'], ru: ['Вечер', 'Ночь', 'Утро', 'Полдень'], de: ['Abend', 'Nacht', 'Morgen', 'Mittag'], fr: ['Soir', 'Nuit', 'Matin', 'Midi'] },
      answer: 2
    },
    {
      q: { tr: '"Elma" ne tür bir yiyecektir?', en: 'What type of food is "Elma"?', es: '¿Qué tipo de alimento es "Elma"?', ar: 'ما نوع طعام "Elma"؟', ru: 'Какой тип еды "Elma"?', de: 'Was für ein Lebensmittel ist "Elma"?', fr: 'Quel type d\'aliment est "Elma" ?' },
      options: { tr: ['Sebze', 'Et', 'Meyve', 'Tahıl'], en: ['Vegetable', 'Meat', 'Fruit', 'Grain'], es: ['Verdura', 'Carne', 'Fruta', 'Cereal'], ar: ['خضار', 'لحم', 'فاكهة', 'حبوب'], ru: ['Овощ', 'Мясо', 'Фрукт', 'Злак'], de: ['Gemüse', 'Fleisch', 'Obst', 'Getreide'], fr: ['Légume', 'Viande', 'Fruit', 'Céréale'] },
      answer: 2
    },
    {
      q: { tr: '"Büyük"ün zıttı nedir?', en: 'What is the opposite of "Büyük" (big)?', es: '¿Cuál es el opuesto de "Büyük" (grande)?', ar: 'ما عكس "Büyük" (كبير)؟', ru: 'Что противоположно "Büyük" (большой)?', de: 'Was ist das Gegenteil von "Büyük" (groß)?', fr: 'Quel est le contraire de "Büyük" (grand) ?' },
      options: ['Uzun', 'Küçük', 'Geniş', 'Ağır'],
      answer: 1
    },
    {
      q: { tr: '"Teşekkür ederim" ne demek?', en: 'What does "Teşekkür ederim" mean?', es: '¿Qué significa "Teşekkür ederim"?', ar: 'ماذا تعني "Teşekkür ederim"؟', ru: 'Что означает "Teşekkür ederim"?', de: 'Was bedeutet "Teşekkür ederim"?', fr: 'Que signifie "Teşekkür ederim" ?' },
      options: { tr: ['Özür dilerim', 'Lütfen', 'Teşekkür ederim', 'Affedersiniz'], en: ['Sorry', 'Please', 'Thank you', 'Excuse me'], es: ['Lo siento', 'Por favor', 'Gracias', 'Disculpe'], ar: ['آسف', 'من فضلك', 'شكرا لك', 'عفوا'], ru: ['Извините', 'Пожалуйста', 'Спасибо', 'Простите'], de: ['Entschuldigung', 'Bitte', 'Danke', 'Verzeihung'], fr: ['Pardon', 'S\'il vous plaît', 'Merci', 'Excusez-moi'] },
      answer: 2
    },
    {
      q: { tr: '"Araba" ne demek?', en: 'What does "Araba" mean?', es: '¿Qué significa "Araba"?', ar: 'ماذا تعني "Araba"؟', ru: 'Что означает "Araba"?', de: 'Was bedeutet "Araba"?', fr: 'Que signifie "Araba" ?' },
      options: { tr: ['Ev', 'Araba', 'Ağaç', 'Kitap'], en: ['House', 'Car', 'Tree', 'Book'], es: ['Casa', 'Coche', 'Árbol', 'Libro'], ar: ['بيت', 'سيارة', 'شجرة', 'كتاب'], ru: ['Дом', 'Машина', 'Дерево', 'Книга'], de: ['Haus', 'Auto', 'Baum', 'Buch'], fr: ['Maison', 'Voiture', 'Arbre', 'Livre'] },
      answer: 1
    },
    {
      q: { tr: '"Kırmızı" ne tür bir kelimedir?', en: 'What type of word is "Kırmızı" (red)?', es: '¿Qué tipo de palabra es "Kırmızı" (rojo)?', ar: 'ما نوع كلمة "Kırmızı" (أحمر)؟', ru: 'Что за слово "Kırmızı" (красный)?', de: 'Was für ein Wort ist "Kırmızı" (rot)?', fr: 'Quel type de mot est "Kırmızı" (rouge) ?' },
      options: { tr: ['Hayvan', 'Renk', 'Sayı', 'Yiyecek'], en: ['Animal', 'Color', 'Number', 'Food'], es: ['Animal', 'Color', 'Número', 'Comida'], ar: ['حيوان', 'لون', 'رقم', 'طعام'], ru: ['Животное', 'Цвет', 'Число', 'Еда'], de: ['Tier', 'Farbe', 'Zahl', 'Essen'], fr: ['Animal', 'Couleur', 'Nombre', 'Nourriture'] },
      answer: 1
    },
    {
      q: { tr: 'Haftanın ilk günü hangisidir?', en: 'What is the first day of the week in Turkey?', es: '¿Cuál es el primer día de la semana en Turquía?', ar: 'ما هو أول يوم في الأسبوع في تركيا؟', ru: 'Какой первый день недели в Турции?', de: 'Was ist der erste Wochentag in der Türkei?', fr: 'Quel est le premier jour de la semaine en Turquie ?' },
      options: ['Salı', 'Çarşamba', 'Pazartesi', 'Cuma'],
      answer: 2
    },
    {
      q: { tr: '"Ev" ne demek?', en: 'What does "Ev" mean?', es: '¿Qué significa "Ev"?', ar: 'ماذا تعني "Ev"؟', ru: 'Что означает "Ev"?', de: 'Was bedeutet "Ev"?', fr: 'Que signifie "Ev" ?' },
      options: { tr: ['Okul', 'Ev', 'Hastane', 'Market'], en: ['School', 'House', 'Hospital', 'Market'], es: ['Escuela', 'Casa', 'Hospital', 'Mercado'], ar: ['مدرسة', 'بيت', 'مستشفى', 'سوق'], ru: ['Школа', 'Дом', 'Больница', 'Магазин'], de: ['Schule', 'Haus', 'Krankenhaus', 'Markt'], fr: ['École', 'Maison', 'Hôpital', 'Marché'] },
      answer: 1
    },
    {
      q: { tr: '"Soğuk"un zıttı nedir?', en: 'What is the opposite of "Soğuk" (cold)?', es: '¿Cuál es el opuesto de "Soğuk" (frío)?', ar: 'ما عكس "Soğuk" (بارد)؟', ru: 'Что противоположно "Soğuk" (холодный)?', de: 'Was ist das Gegenteil von "Soğuk" (kalt)?', fr: 'Quel est le contraire de "Soğuk" (froid) ?' },
      options: ['Sıcak', 'Ilık', 'Serin', 'Donuk'],
      answer: 0
    },
    {
      q: { tr: '"Ben öğrenciyim" cümlesinde özne nedir?', en: 'What is the subject in "Ben öğrenciyim" (I am a student)?', es: '¿Cuál es el sujeto en "Ben öğrenciyim" (Soy estudiante)?', ar: 'ما الفاعل في "Ben öğrenciyim" (أنا طالب)؟', ru: 'Что является подлежащим в "Ben öğrenciyim" (Я студент)?', de: 'Was ist das Subjekt in "Ben öğrenciyim" (Ich bin Student)?', fr: 'Quel est le sujet dans "Ben öğrenciyim" (Je suis étudiant) ?' },
      options: ['Öğrenci', 'Ben', 'İm', 'Yim'],
      answer: 1
    },
    {
      q: { tr: '"Güle güle" ne zaman söylenir?', en: 'When do you say "Güle güle"?', es: '¿Cuándo se dice "Güle güle"?', ar: 'متى تقول "Güle güle"؟', ru: 'Когда говорят "Güle güle"?', de: 'Wann sagt man "Güle güle"?', fr: 'Quand dit-on "Güle güle" ?' },
      options: { tr: ['Karşılaşınca', 'Ayrılırken', 'Yemekte', 'Sabah'], en: ['When meeting', 'When parting', 'At dinner', 'In the morning'], es: ['Al encontrarse', 'Al despedirse', 'En la cena', 'Por la mañana'], ar: ['عند اللقاء', 'عند الوداع', 'عند العشاء', 'في الصباح'], ru: ['При встрече', 'При прощании', 'За ужином', 'Утром'], de: ['Beim Treffen', 'Beim Abschied', 'Beim Essen', 'Morgens'], fr: ['En se rencontrant', 'En se séparant', 'Au dîner', 'Le matin'] },
      answer: 1
    }
  ],
  A2: [
    {
      q: { tr: '"Dün" ne zaman anlamına gelir?', en: 'What time does "Dün" refer to?', es: '¿A qué momento se refiere "Dün"?', ar: 'إلى أي وقت تشير "Dün"؟', ru: 'К какому времени относится "Dün"?', de: 'Auf welche Zeit bezieht sich "Dün"?', fr: 'À quel moment se réfère "Dün" ?' },
      options: { tr: ['Yarın', 'Bugün', 'Geçmiş gün', 'Gelecek hafta'], en: ['Tomorrow', 'Today', 'Previous day', 'Next week'], es: ['Mañana', 'Hoy', 'Día anterior', 'Próxima semana'], ar: ['غدا', 'اليوم', 'اليوم السابق', 'الأسبوع القادم'], ru: ['Завтра', 'Сегодня', 'Вчерашний день', 'На следующей неделе'], de: ['Morgen', 'Heute', 'Vorheriger Tag', 'Nächste Woche'], fr: ['Demain', 'Aujourd\'hui', 'Jour précédent', 'Semaine prochaine'] },
      answer: 2
    },
    {
      q: { tr: '"Eczane"de ne satılır?', en: 'What is sold at an "Eczane"?', es: '¿Qué se vende en una "Eczane"?', ar: 'ماذا يُباع في "Eczane"؟', ru: 'Что продаётся в "Eczane"?', de: 'Was wird in einer "Eczane" verkauft?', fr: 'Que vend-on dans une "Eczane" ?' },
      options: { tr: ['Yiyecek', 'Giysi', 'İlaç', 'Kitap'], en: ['Food', 'Clothes', 'Medicine', 'Books'], es: ['Comida', 'Ropa', 'Medicinas', 'Libros'], ar: ['طعام', 'ملابس', 'أدوية', 'كتب'], ru: ['Еда', 'Одежда', 'Лекарства', 'Книги'], de: ['Essen', 'Kleidung', 'Medizin', 'Bücher'], fr: ['Nourriture', 'Vêtements', 'Médicaments', 'Livres'] },
      answer: 2
    },
    {
      q: { tr: '"Gel-" fiilinin geniş zaman 1. tekil hali nedir?', en: 'What is the simple present 1st person of "Gel-" (come)?', es: '¿Cuál es el presente simple 1ª persona de "Gel-" (venir)?', ar: 'ما صيغة المضارع المفرد الأول لـ "Gel-" (يأتي)؟', ru: 'Какая форма настоящего времени 1-го лица "Gel-" (приходить)?', de: 'Wie lautet die 1. Person Präsens von "Gel-" (kommen)?', fr: 'Quel est le présent 1ère personne de "Gel-" (venir) ?' },
      options: ['Gelirim', 'Geliyorum', 'Geldim', 'Geleceğim'],
      answer: 0
    },
    {
      q: { tr: '"Bazen" ne sıklıkta bir anlam taşır?', en: 'What frequency does "Bazen" express?', es: '¿Qué frecuencia expresa "Bazen"?', ar: 'ما التردد الذي تعبر عنه "Bazen"؟', ru: 'Какую частоту выражает "Bazen"?', de: 'Welche Häufigkeit drückt "Bazen" aus?', fr: 'Quelle fréquence exprime "Bazen" ?' },
      options: { tr: ['Her zaman', 'Hiçbir zaman', 'Ara sıra', 'Sık sık'], en: ['Always', 'Never', 'Sometimes', 'Often'], es: ['Siempre', 'Nunca', 'A veces', 'A menudo'], ar: ['دائما', 'أبدا', 'أحيانا', 'غالبا'], ru: ['Всегда', 'Никогда', 'Иногда', 'Часто'], de: ['Immer', 'Nie', 'Manchmal', 'Oft'], fr: ['Toujours', 'Jamais', 'Parfois', 'Souvent'] },
      answer: 2
    },
    {
      q: { tr: '"Postane"de ne yapılır?', en: 'What do you do at a "Postane"?', es: '¿Qué se hace en una "Postane"?', ar: 'ماذا تفعل في "Postane"؟', ru: 'Что делают на "Postane"?', de: 'Was macht man in einer "Postane"?', fr: 'Que fait-on à la "Postane" ?' },
      options: { tr: ['Yemek yenir', 'Mektup gönderilir', 'Film izlenir', 'Spor yapılır'], en: ['Eat food', 'Send letters', 'Watch movies', 'Do sports'], es: ['Comer', 'Enviar cartas', 'Ver películas', 'Hacer deporte'], ar: ['تأكل', 'ترسل رسائل', 'تشاهد أفلام', 'تمارس رياضة'], ru: ['Есть', 'Отправлять письма', 'Смотреть фильмы', 'Заниматься спортом'], de: ['Essen', 'Briefe senden', 'Filme schauen', 'Sport treiben'], fr: ['Manger', 'Envoyer des lettres', 'Regarder des films', 'Faire du sport'] },
      answer: 1
    },
    {
      q: { tr: '"Kardeş" ne demek?', en: 'What does "Kardeş" mean?', es: '¿Qué significa "Kardeş"?', ar: 'ماذا تعني "Kardeş"؟', ru: 'Что означает "Kardeş"?', de: 'Was bedeutet "Kardeş"?', fr: 'Que signifie "Kardeş" ?' },
      options: { tr: ['Ebeveyn', 'Arkadaş', 'Kardeş', 'Öğretmen'], en: ['Parent', 'Friend', 'Sibling', 'Teacher'], es: ['Padre/Madre', 'Amigo', 'Hermano/a', 'Profesor'], ar: ['والد', 'صديق', 'أخ/أخت', 'معلم'], ru: ['Родитель', 'Друг', 'Брат/Сестра', 'Учитель'], de: ['Elternteil', 'Freund', 'Geschwister', 'Lehrer'], fr: ['Parent', 'Ami', 'Frère/Sœur', 'Professeur'] },
      answer: 2
    },
    {
      q: { tr: '"Çok güzel" ifadesinde "çok" ne tür bir kelimedir?', en: 'In "Çok güzel" (very beautiful), what type of word is "çok"?', es: 'En "Çok güzel" (muy bonito), ¿qué tipo de palabra es "çok"?', ar: 'في "Çok güzel" (جميل جداً)، ما نوع كلمة "çok"؟', ru: 'В "Çok güzel" (очень красиво), какой тип слова "çok"?', de: 'In "Çok güzel" (sehr schön), was für ein Wort ist "çok"?', fr: 'Dans "Çok güzel" (très beau), quel type de mot est "çok" ?' },
      options: { tr: ['Sıfat', 'İsim', 'Zarf', 'Fiil'], en: ['Adjective', 'Noun', 'Adverb', 'Verb'], es: ['Adjetivo', 'Sustantivo', 'Adverbio', 'Verbo'], ar: ['صفة', 'اسم', 'ظرف', 'فعل'], ru: ['Прилагательное', 'Существительное', 'Наречие', 'Глагол'], de: ['Adjektiv', 'Nomen', 'Adverb', 'Verb'], fr: ['Adjectif', 'Nom', 'Adverbe', 'Verbe'] },
      answer: 2
    },
    {
      q: { tr: '"Yüz" sayısı kaçtır?', en: 'What number is "Yüz"?', es: '¿Qué número es "Yüz"?', ar: 'ما هو الرقم "Yüz"؟', ru: 'Какое число "Yüz"?', de: 'Welche Zahl ist "Yüz"?', fr: 'Quel nombre est "Yüz" ?' },
      options: ['10', '50', '100', '1000'],
      answer: 2
    },
    {
      q: { tr: '"Market"e neden gidilir?', en: 'Why do you go to a "Market"?', es: '¿Por qué se va al "Market"?', ar: 'لماذا تذهب إلى "Market"؟', ru: 'Зачем ходят в "Market"?', de: 'Warum geht man zum "Market"?', fr: 'Pourquoi va-t-on au "Market" ?' },
      options: { tr: ['Ders çalışmak', 'Alışveriş yapmak', 'Yüzmek', 'Uyumak'], en: ['To study', 'To shop', 'To swim', 'To sleep'], es: ['Estudiar', 'Comprar', 'Nadar', 'Dormir'], ar: ['للدراسة', 'للتسوق', 'للسباحة', 'للنوم'], ru: ['Учиться', 'Делать покупки', 'Плавать', 'Спать'], de: ['Lernen', 'Einkaufen', 'Schwimmen', 'Schlafen'], fr: ['Étudier', 'Faire les courses', 'Nager', 'Dormir'] },
      answer: 1
    },
    {
      q: { tr: '"Yavaş"ın zıttı nedir?', en: 'What is the opposite of "Yavaş" (slow)?', es: '¿Cuál es el opuesto de "Yavaş" (lento)?', ar: 'ما عكس "Yavaş" (بطيء)؟', ru: 'Что противоположно "Yavaş" (медленный)?', de: 'Was ist das Gegenteil von "Yavaş" (langsam)?', fr: 'Quel est le contraire de "Yavaş" (lent) ?' },
      options: ['Hızlı', 'Uzun', 'Ağır', 'Geniş'],
      answer: 0
    },
    {
      q: { tr: '"İstanbul" hangi kıtadadır?', en: 'On which continent(s) is Istanbul?', es: '¿En qué continente(s) está Estambul?', ar: 'في أي قارة تقع إسطنبول؟', ru: 'На каком континенте Стамбул?', de: 'Auf welchem Kontinent liegt Istanbul?', fr: 'Sur quel(s) continent(s) se trouve Istanbul ?' },
      options: { tr: ['Avrupa ve Asya', 'Sadece Avrupa', 'Afrika', 'Sadece Asya'], en: ['Europe and Asia', 'Only Europe', 'Africa', 'Only Asia'], es: ['Europa y Asia', 'Solo Europa', 'África', 'Solo Asia'], ar: ['أوروبا وآسيا', 'أوروبا فقط', 'أفريقيا', 'آسيا فقط'], ru: ['Европа и Азия', 'Только Европа', 'Африка', 'Только Азия'], de: ['Europa und Asien', 'Nur Europa', 'Afrika', 'Nur Asien'], fr: ['Europe et Asie', 'Europe seulement', 'Afrique', 'Asie seulement'] },
      answer: 0
    },
    {
      q: { tr: '"Hafta sonu" hangi günlerdir?', en: 'Which days are "Hafta sonu" (weekend)?', es: '¿Qué días son "Hafta sonu" (fin de semana)?', ar: 'ما أيام "Hafta sonu" (عطلة نهاية الأسبوع)؟', ru: 'Какие дни — "Hafta sonu" (выходные)?', de: 'Welche Tage sind "Hafta sonu" (Wochenende)?', fr: 'Quels jours sont le "Hafta sonu" (week-end) ?' },
      options: { tr: ['Pazartesi-Salı', 'Cumartesi-Pazar', 'Perşembe-Cuma', 'Çarşamba-Perşembe'], en: ['Mon-Tue', 'Sat-Sun', 'Thu-Fri', 'Wed-Thu'], es: ['Lun-Mar', 'Sáb-Dom', 'Jue-Vie', 'Mié-Jue'], ar: ['الإثنين-الثلاثاء', 'السبت-الأحد', 'الخميس-الجمعة', 'الأربعاء-الخميس'], ru: ['Пн-Вт', 'Сб-Вс', 'Чт-Пт', 'Ср-Чт'], de: ['Mo-Di', 'Sa-So', 'Do-Fr', 'Mi-Do'], fr: ['Lun-Mar', 'Sam-Dim', 'Jeu-Ven', 'Mer-Jeu'] },
      answer: 1
    },
    {
      q: { tr: '"Ben Türkçe öğreniyorum" hangi zamandadır?', en: 'What tense is "Ben Türkçe öğreniyorum"?', es: '¿En qué tiempo está "Ben Türkçe öğreniyorum"?', ar: 'ما زمن "Ben Türkçe öğreniyorum"؟', ru: 'В каком времени "Ben Türkçe öğreniyorum"?', de: 'In welcher Zeitform steht "Ben Türkçe öğreniyorum"?', fr: 'À quel temps est "Ben Türkçe öğreniyorum" ?' },
      options: { tr: ['Geçmiş', 'Şimdiki', 'Gelecek', 'Geniş'], en: ['Past', 'Present continuous', 'Future', 'Simple present'], es: ['Pasado', 'Presente continuo', 'Futuro', 'Presente simple'], ar: ['ماضي', 'مضارع مستمر', 'مستقبل', 'مضارع بسيط'], ru: ['Прошедшее', 'Настоящее длительное', 'Будущее', 'Простое настоящее'], de: ['Vergangenheit', 'Verlaufsform Gegenwart', 'Zukunft', 'Einfache Gegenwart'], fr: ['Passé', 'Présent continu', 'Futur', 'Présent simple'] },
      answer: 1
    },
    {
      q: { tr: '"Acıkmak" ne demek?', en: 'What does "Acıkmak" mean?', es: '¿Qué significa "Acıkmak"?', ar: 'ماذا تعني "Acıkmak"؟', ru: 'Что означает "Acıkmak"?', de: 'Was bedeutet "Acıkmak"?', fr: 'Que signifie "Acıkmak" ?' },
      options: { tr: ['Susamak', 'Yorulmak', 'Acıkmak', 'Üşümek'], en: ['To be thirsty', 'To be tired', 'To be hungry', 'To be cold'], es: ['Tener sed', 'Estar cansado', 'Tener hambre', 'Tener frío'], ar: ['عطشان', 'متعب', 'جائع', 'بارد'], ru: ['Хотеть пить', 'Устать', 'Проголодаться', 'Мёрзнуть'], de: ['Durst haben', 'Müde sein', 'Hunger haben', 'Frieren'], fr: ['Avoir soif', 'Être fatigué', 'Avoir faim', 'Avoir froid'] },
      answer: 2
    }
  ],
  B1: [
    {
      q: { tr: '"Hâlâ" ve "hala" arasındaki fark nedir?', en: 'What is the difference between "Hâlâ" and "hala"?', es: '¿Cuál es la diferencia entre "Hâlâ" y "hala"?', ar: 'ما الفرق بين "Hâlâ" و "hala"؟', ru: 'В чём разница между "Hâlâ" и "hala"?', de: 'Was ist der Unterschied zwischen "Hâlâ" und "hala"?', fr: 'Quelle est la différence entre "Hâlâ" et "hala" ?' },
      options: { tr: ['Aynı anlam', 'Hâlâ=hâlâ, Hala=teyze', 'Hâlâ=teyze, Hala=hâlâ', 'İkisi de akraba'], en: ['Same meaning', 'Hâlâ=still, Hala=aunt', 'Hâlâ=aunt, Hala=still', 'Both mean relative'], es: ['Mismo significado', 'Hâlâ=todavía, Hala=tía', 'Hâlâ=tía, Hala=todavía', 'Ambos son parientes'], ar: ['نفس المعنى', 'Hâlâ=لا يزال، Hala=عمة', 'Hâlâ=عمة، Hala=لا يزال', 'كلاهما قريب'], ru: ['Одно значение', 'Hâlâ=всё ещё, Hala=тётя', 'Hâlâ=тётя, Hala=всё ещё', 'Оба — родственники'], de: ['Gleiche Bedeutung', 'Hâlâ=noch, Hala=Tante', 'Hâlâ=Tante, Hala=noch', 'Beide = Verwandte'], fr: ['Même sens', 'Hâlâ=encore, Hala=tante', 'Hâlâ=tante, Hala=encore', 'Les deux = famille'] },
      answer: 1
    },
    {
      q: { tr: '"Rağmen" kelimesi hangi yapıyla kullanılır?', en: 'Which structure is used with "Rağmen" (despite)?', es: '¿Con qué estructura se usa "Rağmen" (a pesar de)?', ar: 'ما البنية المستخدمة مع "Rağmen" (رغم)؟', ru: 'С какой конструкцией используется "Rağmen" (несмотря на)?', de: 'Mit welcher Struktur wird "Rağmen" (trotz) verwendet?', fr: 'Avec quelle structure utilise-t-on "Rağmen" (malgré) ?' },
      options: ['-e rağmen', '-de rağmen', '-den rağmen', '-i rağmen'],
      answer: 0
    },
    {
      q: { tr: '"Keşke gelseydin" cümlesi ne ifade eder?', en: 'What does "Keşke gelseydin" express?', es: '¿Qué expresa "Keşke gelseydin"?', ar: 'ماذا تعبر "Keşke gelseydin"؟', ru: 'Что выражает "Keşke gelseydin"?', de: 'Was drückt "Keşke gelseydin" aus?', fr: 'Qu\'exprime "Keşke gelseydin" ?' },
      options: { tr: ['Emir', 'Dilek/Temenni', 'Soru', 'Şart'], en: ['Command', 'Wish/Desire', 'Question', 'Condition'], es: ['Orden', 'Deseo', 'Pregunta', 'Condición'], ar: ['أمر', 'تمنّي', 'سؤال', 'شرط'], ru: ['Приказ', 'Желание', 'Вопрос', 'Условие'], de: ['Befehl', 'Wunsch', 'Frage', 'Bedingung'], fr: ['Ordre', 'Souhait', 'Question', 'Condition'] },
      answer: 1
    },
    {
      q: { tr: '"Yalnız" kelimesinin eş anlamlısı nedir?', en: 'What is a synonym of "Yalnız" (alone)?', es: '¿Cuál es un sinónimo de "Yalnız" (solo)?', ar: 'ما مرادف "Yalnız" (وحيد)؟', ru: 'Какой синоним у "Yalnız" (одинокий)?', de: 'Was ist ein Synonym für "Yalnız" (allein)?', fr: 'Quel est un synonyme de "Yalnız" (seul) ?' },
      options: ['Birlikte', 'Kalabalık', 'Tek başına', 'Beraber'],
      answer: 2
    },
    {
      q: { tr: '"Ancak" kelimesi ne anlama gelir?', en: 'What does "Ancak" mean?', es: '¿Qué significa "Ancak"?', ar: 'ماذا تعني "Ancak"؟', ru: 'Что означает "Ancak"?', de: 'Was bedeutet "Ancak"?', fr: 'Que signifie "Ancak" ?' },
      options: { tr: ['Ve', 'Ama/Fakat', 'Çünkü', 'Veya'], en: ['And', 'But/However', 'Because', 'Or'], es: ['Y', 'Pero/Sin embargo', 'Porque', 'O'], ar: ['و', 'لكن/ومع ذلك', 'لأن', 'أو'], ru: ['И', 'Но/Однако', 'Потому что', 'Или'], de: ['Und', 'Aber/Jedoch', 'Weil', 'Oder'], fr: ['Et', 'Mais/Cependant', 'Parce que', 'Ou'] },
      answer: 1
    },
    {
      q: { tr: 'Türkçede "ünlü uyumu" ne demek?', en: 'What does "vowel harmony" mean in Turkish?', es: '¿Qué significa "armonía vocálica" en turco?', ar: 'ماذا يعني "التناغم الصوتي" في التركية؟', ru: 'Что такое "гармония гласных" в турецком?', de: 'Was bedeutet "Vokalharmonie" im Türkischen?', fr: 'Que signifie l\'"harmonie vocalique" en turc ?' },
      options: { tr: ['Ünlü insanlar', 'Sesli harf uyumu', 'Sessiz harf kuralı', 'Cümle yapısı'], en: ['Famous people', 'Vowel sound harmony', 'Consonant rule', 'Sentence structure'], es: ['Personas famosas', 'Armonía de vocales', 'Regla de consonantes', 'Estructura oracional'], ar: ['أشخاص مشهورون', 'تناغم الحروف المتحركة', 'قاعدة الحروف الساكنة', 'بنية الجملة'], ru: ['Знаменитости', 'Гармония гласных звуков', 'Правило согласных', 'Структура предложения'], de: ['Berühmte Leute', 'Vokalklangharmonie', 'Konsonantenregel', 'Satzstruktur'], fr: ['Personnes célèbres', 'Harmonie des sons voyelles', 'Règle des consonnes', 'Structure de phrase'] },
      answer: 1
    },
    {
      q: { tr: '"Başvuru yapmak" ne demek?', en: 'What does "Başvuru yapmak" mean?', es: '¿Qué significa "Başvuru yapmak"?', ar: 'ماذا تعني "Başvuru yapmak"؟', ru: 'Что означает "Başvuru yapmak"?', de: 'Was bedeutet "Başvuru yapmak"?', fr: 'Que signifie "Başvuru yapmak" ?' },
      options: { tr: ['Şikayet etmek', 'Başvurmak', 'Reddetmek', 'Kabul etmek'], en: ['To complain', 'To apply', 'To refuse', 'To accept'], es: ['Quejarse', 'Solicitar', 'Rechazar', 'Aceptar'], ar: ['الشكوى', 'التقديم', 'الرفض', 'القبول'], ru: ['Жаловаться', 'Подавать заявку', 'Отказать', 'Принять'], de: ['Sich beschweren', 'Sich bewerben', 'Ablehnen', 'Akzeptieren'], fr: ['Se plaindre', 'Postuler', 'Refuser', 'Accepter'] },
      answer: 1
    },
    {
      q: { tr: '"Ne kadar çalışırsa o kadar başarılı olur" yapısı nedir?', en: 'What structure is "Ne kadar...o kadar..." (the more...the more)?', es: '¿Qué estructura es "Ne kadar...o kadar..." (cuanto más...más)?', ar: 'ما بنية "Ne kadar...o kadar..." (كلما...كلما)؟', ru: 'Какая конструкция "Ne kadar...o kadar..." (чем больше...тем)?', de: 'Welche Struktur ist "Ne kadar...o kadar..." (je...desto)?', fr: 'Quelle structure est "Ne kadar...o kadar..." (plus...plus) ?' },
      options: { tr: ['Koşul', 'Karşılaştırma', 'Orantı', 'Neden-sonuç'], en: ['Condition', 'Comparison', 'Proportion', 'Cause-effect'], es: ['Condición', 'Comparación', 'Proporción', 'Causa-efecto'], ar: ['شرط', 'مقارنة', 'تناسب', 'سبب-نتيجة'], ru: ['Условие', 'Сравнение', 'Пропорция', 'Причина-следствие'], de: ['Bedingung', 'Vergleich', 'Proportion', 'Ursache-Wirkung'], fr: ['Condition', 'Comparaison', 'Proportion', 'Cause-effet'] },
      answer: 2
    },
    {
      q: { tr: '"Toplantı" ne demek?', en: 'What does "Toplantı" mean?', es: '¿Qué significa "Toplantı"?', ar: 'ماذا تعني "Toplantı"؟', ru: 'Что означает "Toplantı"?', de: 'Was bedeutet "Toplantı"?', fr: 'Que signifie "Toplantı" ?' },
      options: { tr: ['Parti', 'Toplantı', 'Tatil', 'Yolculuk'], en: ['Party', 'Meeting', 'Holiday', 'Journey'], es: ['Fiesta', 'Reunión', 'Vacaciones', 'Viaje'], ar: ['حفلة', 'اجتماع', 'عطلة', 'رحلة'], ru: ['Вечеринка', 'Собрание', 'Праздник', 'Путешествие'], de: ['Party', 'Besprechung', 'Urlaub', 'Reise'], fr: ['Fête', 'Réunion', 'Vacances', 'Voyage'] },
      answer: 1
    },
    {
      q: { tr: '"Araştırma" kelimesinin kökü nedir?', en: 'What is the root of "Araştırma" (research)?', es: '¿Cuál es la raíz de "Araştırma" (investigación)?', ar: 'ما جذر كلمة "Araştırma" (بحث)؟', ru: 'Какой корень у "Araştırma" (исследование)?', de: 'Was ist die Wurzel von "Araştırma" (Forschung)?', fr: 'Quelle est la racine de "Araştırma" (recherche) ?' },
      options: ['Ara', 'Araş', 'Araştır', 'Araştırma'],
      answer: 0
    },
    {
      q: { tr: '"-mış" eki ne ifade eder?', en: 'What does the suffix "-mış" express?', es: '¿Qué expresa el sufijo "-mış"?', ar: 'ماذا تعبر اللاحقة "-mış"؟', ru: 'Что выражает суффикс "-mış"?', de: 'Was drückt das Suffix "-mış" aus?', fr: 'Qu\'exprime le suffixe "-mış" ?' },
      options: { tr: ['Kesinlik', 'Duyulan geçmiş', 'Gelecek zaman', 'Emir'], en: ['Certainty', 'Reported/Hearsay past', 'Future tense', 'Command'], es: ['Certeza', 'Pasado referido', 'Futuro', 'Orden'], ar: ['يقين', 'ماضي منقول', 'مستقبل', 'أمر'], ru: ['Уверенность', 'Прошедшее со слов', 'Будущее время', 'Приказ'], de: ['Sicherheit', 'Vom Hörensagen', 'Zukunft', 'Befehl'], fr: ['Certitude', 'Passé rapporté', 'Futur', 'Ordre'] },
      answer: 1
    },
    {
      q: { tr: '"Meğer" ne anlama gelir?', en: 'What does "Meğer" mean?', es: '¿Qué significa "Meğer"?', ar: 'ماذا تعني "Meğer"؟', ru: 'Что означает "Meğer"?', de: 'Was bedeutet "Meğer"?', fr: 'Que signifie "Meğer" ?' },
      options: { tr: ['Belki', 'Meğerse/Anlaşılan', 'Asla', 'Her zaman'], en: ['Maybe', 'Apparently/It turns out', 'Never', 'Always'], es: ['Quizás', 'Al parecer/Resulta que', 'Nunca', 'Siempre'], ar: ['ربما', 'يبدو أن/اتضح أن', 'أبدا', 'دائما'], ru: ['Может быть', 'Оказывается', 'Никогда', 'Всегда'], de: ['Vielleicht', 'Anscheinend/Es stellt sich heraus', 'Nie', 'Immer'], fr: ['Peut-être', 'Apparemment/Il s\'avère que', 'Jamais', 'Toujours'] },
      answer: 1
    },
    {
      q: { tr: '"Şikayet etmek" ne demek?', en: 'What does "Şikayet etmek" mean?', es: '¿Qué significa "Şikayet etmek"?', ar: 'ماذا تعني "Şikayet etmek"؟', ru: 'Что означает "Şikayet etmek"?', de: 'Was bedeutet "Şikayet etmek"?', fr: 'Que signifie "Şikayet etmek" ?' },
      options: { tr: ['Övmek', 'Şikayet etmek', 'Yardım etmek', 'Kabul etmek'], en: ['To praise', 'To complain', 'To help', 'To agree'], es: ['Elogiar', 'Quejarse', 'Ayudar', 'Aceptar'], ar: ['يمدح', 'يشتكي', 'يساعد', 'يوافق'], ru: ['Хвалить', 'Жаловаться', 'Помогать', 'Соглашаться'], de: ['Loben', 'Sich beschweren', 'Helfen', 'Zustimmen'], fr: ['Féliciter', 'Se plaindre', 'Aider', 'Accepter'] },
      answer: 1
    },
    {
      q: { tr: '"Hem...hem de..." yapısı ne ifade eder?', en: 'What does "Hem...hem de..." (both...and) express?', es: '¿Qué expresa "Hem...hem de..." (tanto...como)?', ar: 'ماذا تعبر "Hem...hem de..." (كلا...و)؟', ru: 'Что выражает "Hem...hem de..." (и...и)?', de: 'Was drückt "Hem...hem de..." (sowohl...als auch) aus?', fr: 'Qu\'exprime "Hem...hem de..." (à la fois...et) ?' },
      options: { tr: ['Seçenek', 'Karşıtlık', 'İkisini birden', 'Neden'], en: ['Choice', 'Contrast', 'Both together', 'Cause'], es: ['Elección', 'Contraste', 'Ambos juntos', 'Causa'], ar: ['اختيار', 'تناقض', 'كلاهما معاً', 'سبب'], ru: ['Выбор', 'Контраст', 'Оба вместе', 'Причина'], de: ['Auswahl', 'Gegensatz', 'Beides zusammen', 'Ursache'], fr: ['Choix', 'Contraste', 'Les deux ensemble', 'Cause'] },
      answer: 2
    },
    {
      q: { tr: '"Özgeçmiş" ne demek?', en: 'What does "Özgeçmiş" mean?', es: '¿Qué significa "Özgeçmiş"?', ar: 'ماذا تعني "Özgeçmiş"؟', ru: 'Что означает "Özgeçmiş"?', de: 'Was bedeutet "Özgeçmiş"?', fr: 'Que signifie "Özgeçmiş" ?' },
      options: { tr: ['Tarih kitabı', 'Özgeçmiş/CV', 'Günlük', 'Roman'], en: ['History book', 'CV/Resume', 'Diary', 'Novel'], es: ['Libro de historia', 'CV/Currículum', 'Diario', 'Novela'], ar: ['كتاب تاريخ', 'سيرة ذاتية', 'مذكرات', 'رواية'], ru: ['Книга по истории', 'Резюме/CV', 'Дневник', 'Роман'], de: ['Geschichtsbuch', 'Lebenslauf/CV', 'Tagebuch', 'Roman'], fr: ['Livre d\'histoire', 'CV/Curriculum', 'Journal intime', 'Roman'] },
      answer: 1
    }
  ],
  B2: [
    {
      q: { tr: '"Dolayısıyla" ne anlama gelir?', en: 'What does "Dolayısıyla" mean?', es: '¿Qué significa "Dolayısıyla"?', ar: 'ماذا تعني "Dolayısıyla"؟', ru: 'Что означает "Dolayısıyla"?', de: 'Was bedeutet "Dolayısıyla"?', fr: 'Que signifie "Dolayısıyla" ?' },
      options: { tr: ['Buna rağmen', 'Bu nedenle', 'Ayrıca', 'Oysa'], en: ['Despite this', 'Therefore', 'Also', 'Whereas'], es: ['A pesar de esto', 'Por lo tanto', 'Además', 'Mientras que'], ar: ['رغم ذلك', 'لذلك', 'أيضاً', 'بينما'], ru: ['Несмотря на это', 'Поэтому', 'Также', 'Тогда как'], de: ['Trotzdem', 'Daher', 'Außerdem', 'Wohingegen'], fr: ['Malgré cela', 'Par conséquent', 'De plus', 'Alors que'] },
      answer: 1
    },
    {
      q: { tr: '"Öngörmek" ne demek?', en: 'What does "Öngörmek" mean?', es: '¿Qué significa "Öngörmek"?', ar: 'ماذا تعني "Öngörmek"؟', ru: 'Что означает "Öngörmek"?', de: 'Was bedeutet "Öngörmek"?', fr: 'Que signifie "Öngörmek" ?' },
      options: { tr: ['Hatırlamak', 'Tahmin etmek', 'Unutmak', 'Görmezden gelmek'], en: ['To remember', 'To foresee/predict', 'To forget', 'To ignore'], es: ['Recordar', 'Prever/predecir', 'Olvidar', 'Ignorar'], ar: ['يتذكر', 'يتوقع/يتنبأ', 'ينسى', 'يتجاهل'], ru: ['Вспомнить', 'Предвидеть', 'Забыть', 'Игнорировать'], de: ['Sich erinnern', 'Vorhersehen', 'Vergessen', 'Ignorieren'], fr: ['Se souvenir', 'Prévoir', 'Oublier', 'Ignorer'] },
      answer: 1
    },
    {
      q: { tr: '"Nitekim" kelimesinin kullanımı nedir?', en: 'How is "Nitekim" used?', es: '¿Cómo se usa "Nitekim"?', ar: 'كيف تُستخدم "Nitekim"؟', ru: 'Как используется "Nitekim"?', de: 'Wie wird "Nitekim" verwendet?', fr: 'Comment utilise-t-on "Nitekim" ?' },
      options: { tr: ['Zıtlık', 'Doğrulama/Gerçekten de', 'Soru', 'Olumsuzluk'], en: ['Contrast', 'Confirmation/Indeed', 'Question', 'Negation'], es: ['Contraste', 'Confirmación/En efecto', 'Pregunta', 'Negación'], ar: ['تناقض', 'تأكيد/فعلاً', 'سؤال', 'نفي'], ru: ['Контраст', 'Подтверждение/Действительно', 'Вопрос', 'Отрицание'], de: ['Gegensatz', 'Bestätigung/Tatsächlich', 'Frage', 'Verneinung'], fr: ['Contraste', 'Confirmation/En effet', 'Question', 'Négation'] },
      answer: 1
    },
    {
      q: { tr: '"-dıkça" eki ne anlam katar?', en: 'What meaning does the suffix "-dıkça" add?', es: '¿Qué significado añade el sufijo "-dıkça"?', ar: 'ما المعنى الذي تضيفه اللاحقة "-dıkça"؟', ru: 'Какое значение добавляет суффикс "-dıkça"?', de: 'Welche Bedeutung fügt "-dıkça" hinzu?', fr: 'Quel sens ajoute le suffixe "-dıkça" ?' },
      options: { tr: ['Zaman-koşul', 'Olumsuzluk', 'Emir', 'Soru'], en: ['Time-condition', 'Negation', 'Command', 'Question'], es: ['Tiempo-condición', 'Negación', 'Orden', 'Pregunta'], ar: ['زمن-شرط', 'نفي', 'أمر', 'سؤال'], ru: ['Время-условие', 'Отрицание', 'Приказ', 'Вопрос'], de: ['Zeit-Bedingung', 'Verneinung', 'Befehl', 'Frage'], fr: ['Temps-condition', 'Négation', 'Ordre', 'Question'] },
      answer: 0
    },
    {
      q: { tr: '"Yadsımak" ne demek?', en: 'What does "Yadsımak" mean?', es: '¿Qué significa "Yadsımak"?', ar: 'ماذا تعني "Yadsımak"؟', ru: 'Что означает "Yadsımak"?', de: 'Was bedeutet "Yadsımak"?', fr: 'Que signifie "Yadsımak" ?' },
      options: { tr: ['Kabul etmek', 'İnkâr etmek', 'Anlamak', 'Desteklemek'], en: ['To accept', 'To deny', 'To understand', 'To support'], es: ['Aceptar', 'Negar', 'Entender', 'Apoyar'], ar: ['يقبل', 'ينكر', 'يفهم', 'يدعم'], ru: ['Принять', 'Отрицать', 'Понять', 'Поддержать'], de: ['Akzeptieren', 'Leugnen', 'Verstehen', 'Unterstützen'], fr: ['Accepter', 'Nier', 'Comprendre', 'Soutenir'] },
      answer: 1
    },
    {
      q: { tr: '"Muhatap" ne demek?', en: 'What does "Muhatap" mean?', es: '¿Qué significa "Muhatap"?', ar: 'ماذا تعني "Muhatap"؟', ru: 'Что означает "Muhatap"?', de: 'Was bedeutet "Muhatap"?', fr: 'Que signifie "Muhatap" ?' },
      options: { tr: ['Rakip', 'Dost', 'Karşı taraf/İlgili kişi', 'Tanık'], en: ['Rival', 'Friend', 'Counterpart/Addressee', 'Witness'], es: ['Rival', 'Amigo', 'Interlocutor', 'Testigo'], ar: ['منافس', 'صديق', 'المخاطَب/الطرف المعني', 'شاهد'], ru: ['Соперник', 'Друг', 'Собеседник/Адресат', 'Свидетель'], de: ['Rivale', 'Freund', 'Gegenüber/Adressat', 'Zeuge'], fr: ['Rival', 'Ami', 'Interlocuteur', 'Témoin'] },
      answer: 2
    },
    {
      q: { tr: '"Öte yandan" ne tür bir bağlaçtır?', en: 'What type of connector is "Öte yandan" (on the other hand)?', es: '¿Qué tipo de conector es "Öte yandan" (por otro lado)?', ar: 'ما نوع الرابط "Öte yandan" (من ناحية أخرى)؟', ru: 'Какой тип связки "Öte yandan" (с другой стороны)?', de: 'Was für eine Konjunktion ist "Öte yandan" (andererseits)?', fr: 'Quel type de connecteur est "Öte yandan" (d\'autre part) ?' },
      options: { tr: ['Neden', 'Sonuç', 'Karşıtlık', 'Ekleme'], en: ['Cause', 'Result', 'Contrast', 'Addition'], es: ['Causa', 'Resultado', 'Contraste', 'Adición'], ar: ['سبب', 'نتيجة', 'تناقض', 'إضافة'], ru: ['Причина', 'Результат', 'Контраст', 'Дополнение'], de: ['Ursache', 'Ergebnis', 'Gegensatz', 'Ergänzung'], fr: ['Cause', 'Résultat', 'Contraste', 'Addition'] },
      answer: 2
    },
    {
      q: { tr: '"Vecize" ne demek?', en: 'What does "Vecize" mean?', es: '¿Qué significa "Vecize"?', ar: 'ماذا تعني "Vecize"؟', ru: 'Что означает "Vecize"?', de: 'Was bedeutet "Vecize"?', fr: 'Que signifie "Vecize" ?' },
      options: { tr: ['Şiir', 'Özdeyiş/Atasözü', 'Roman', 'Mektup'], en: ['Poem', 'Aphorism/Proverb', 'Novel', 'Letter'], es: ['Poema', 'Aforismo/Proverbio', 'Novela', 'Carta'], ar: ['شعر', 'حكمة/مثل', 'رواية', 'رسالة'], ru: ['Стихотворение', 'Афоризм/Пословица', 'Роман', 'Письмо'], de: ['Gedicht', 'Aphorismus/Sprichwort', 'Roman', 'Brief'], fr: ['Poème', 'Aphorisme/Proverbe', 'Roman', 'Lettre'] },
      answer: 1
    },
    {
      q: { tr: '"Sözde" kelimesi ne ifade eder?', en: 'What does "Sözde" express?', es: '¿Qué expresa "Sözde"?', ar: 'ماذا تعبر "Sözde"؟', ru: 'Что выражает "Sözde"?', de: 'Was drückt "Sözde" aus?', fr: 'Qu\'exprime "Sözde" ?' },
      options: { tr: ['Gerçek', 'Güya/İddiaya göre', 'Kesin', 'Mutlaka'], en: ['Real', 'Supposedly/Allegedly', 'Certain', 'Definitely'], es: ['Real', 'Supuestamente', 'Cierto', 'Definitivamente'], ar: ['حقيقي', 'يُزعم/بحسب الادعاء', 'مؤكد', 'بالتأكيد'], ru: ['Реальный', 'Якобы/Предположительно', 'Определённый', 'Обязательно'], de: ['Echt', 'Angeblich', 'Sicher', 'Unbedingt'], fr: ['Réel', 'Soi-disant', 'Certain', 'Absolument'] },
      answer: 1
    },
    {
      q: { tr: '"Benimsemek" ne demek?', en: 'What does "Benimsemek" mean?', es: '¿Qué significa "Benimsemek"?', ar: 'ماذا تعني "Benimsemek"؟', ru: 'Что означает "Benimsemek"?', de: 'Was bedeutet "Benimsemek"?', fr: 'Que signifie "Benimsemek" ?' },
      options: { tr: ['Reddetmek', 'Sahiplenmek/Kabul etmek', 'Şüphelenmek', 'Kaçınmak'], en: ['To reject', 'To adopt/embrace', 'To doubt', 'To avoid'], es: ['Rechazar', 'Adoptar/abrazar', 'Dudar', 'Evitar'], ar: ['يرفض', 'يتبنى/يحتضن', 'يشك', 'يتجنب'], ru: ['Отвергнуть', 'Принять/усвоить', 'Сомневаться', 'Избегать'], de: ['Ablehnen', 'Annehmen/verinnerlichen', 'Bezweifeln', 'Vermeiden'], fr: ['Rejeter', 'Adopter/s\'approprier', 'Douter', 'Éviter'] },
      answer: 1
    },
    {
      q: { tr: '"Eşzamanlı" ne demek?', en: 'What does "Eşzamanlı" mean?', es: '¿Qué significa "Eşzamanlı"?', ar: 'ماذا تعني "Eşzamanlı"؟', ru: 'Что означает "Eşzamanlı"?', de: 'Was bedeutet "Eşzamanlı"?', fr: 'Que signifie "Eşzamanlı" ?' },
      options: { tr: ['Aynı anda', 'Farklı zamanda', 'Geçmişte', 'Gelecekte'], en: ['Simultaneously', 'At different times', 'In the past', 'In the future'], es: ['Simultáneamente', 'En diferentes momentos', 'En el pasado', 'En el futuro'], ar: ['في وقت واحد', 'في أوقات مختلفة', 'في الماضي', 'في المستقبل'], ru: ['Одновременно', 'В разное время', 'В прошлом', 'В будущем'], de: ['Gleichzeitig', 'Zu verschiedenen Zeiten', 'In der Vergangenheit', 'In der Zukunft'], fr: ['Simultanément', 'À différents moments', 'Dans le passé', 'Dans le futur'] },
      answer: 0
    },
    {
      q: { tr: '"İstikrar" ne demek?', en: 'What does "İstikrar" mean?', es: '¿Qué significa "İstikrar"?', ar: 'ماذا تعني "İstikrar"؟', ru: 'Что означает "İstikrar"?', de: 'Was bedeutet "İstikrar"?', fr: 'Que signifie "İstikrar" ?' },
      options: { tr: ['Değişkenlik', 'Tutarlılık/Kararlılık', 'Belirsizlik', 'Hız'], en: ['Instability', 'Stability/Consistency', 'Uncertainty', 'Speed'], es: ['Inestabilidad', 'Estabilidad/Consistencia', 'Incertidumbre', 'Velocidad'], ar: ['تقلب', 'استقرار/ثبات', 'غموض', 'سرعة'], ru: ['Нестабильность', 'Стабильность', 'Неопределённость', 'Скорость'], de: ['Instabilität', 'Stabilität/Beständigkeit', 'Unsicherheit', 'Geschwindigkeit'], fr: ['Instabilité', 'Stabilité/Constance', 'Incertitude', 'Vitesse'] },
      answer: 1
    },
    {
      q: { tr: '"-cesine" eki ne anlam katar?', en: 'What meaning does the suffix "-cesine" add?', es: '¿Qué significado añade el sufijo "-cesine"?', ar: 'ما المعنى الذي تضيفه "-cesine"؟', ru: 'Какое значение добавляет суффикс "-cesine"?', de: 'Welche Bedeutung fügt "-cesine" hinzu?', fr: 'Quel sens ajoute "-cesine" ?' },
      options: { tr: ['Gibi/Biçiminde', 'İçin', 'Rağmen', 'Karşı'], en: ['As if/Like', 'For', 'Despite', 'Against'], es: ['Como si/A la manera de', 'Para', 'A pesar de', 'Contra'], ar: ['كأنه/بطريقة', 'من أجل', 'رغم', 'ضد'], ru: ['Как будто/Подобно', 'Для', 'Несмотря на', 'Против'], de: ['Als ob/Wie', 'Für', 'Trotz', 'Gegen'], fr: ['Comme si/À la manière de', 'Pour', 'Malgré', 'Contre'] },
      answer: 0
    },
    {
      q: { tr: '"Yoğunlaşmak" ne demek?', en: 'What does "Yoğunlaşmak" mean?', es: '¿Qué significa "Yoğunlaşmak"?', ar: 'ماذا تعني "Yoğunlaşmak"؟', ru: 'Что означает "Yoğunlaşmak"?', de: 'Was bedeutet "Yoğunlaşmak"?', fr: 'Que signifie "Yoğunlaşmak" ?' },
      options: { tr: ['Rahatlamak', 'Dağılmak', 'Konsantre olmak', 'Uzaklaşmak'], en: ['To relax', 'To scatter', 'To concentrate', 'To move away'], es: ['Relajarse', 'Dispersarse', 'Concentrarse', 'Alejarse'], ar: ['يسترخي', 'يتفرق', 'يتركز', 'يبتعد'], ru: ['Расслабиться', 'Рассеяться', 'Сконцентрироваться', 'Удалиться'], de: ['Entspannen', 'Zerstreuen', 'Sich konzentrieren', 'Sich entfernen'], fr: ['Se détendre', 'Se disperser', 'Se concentrer', 'S\'éloigner'] },
      answer: 2
    }
  ],
  C1: [
    {
      q: { tr: '"Müteakip" ne demek?', en: 'What does "Müteakip" mean?', es: '¿Qué significa "Müteakip"?', ar: 'ماذا تعني "Müteakip"؟', ru: 'Что означает "Müteakip"?', de: 'Was bedeutet "Müteakip"?', fr: 'Que signifie "Müteakip" ?' },
      options: { tr: ['Önceki', 'Sonraki/Takip eden', 'Paralel', 'Karşıt'], en: ['Previous', 'Subsequent/Following', 'Parallel', 'Opposite'], es: ['Anterior', 'Siguiente/Subsiguiente', 'Paralelo', 'Opuesto'], ar: ['سابق', 'لاحق/تالي', 'متوازي', 'معاكس'], ru: ['Предыдущий', 'Последующий', 'Параллельный', 'Противоположный'], de: ['Vorherig', 'Nachfolgend', 'Parallel', 'Entgegengesetzt'], fr: ['Précédent', 'Suivant/Subséquent', 'Parallèle', 'Opposé'] },
      answer: 1
    },
    {
      q: { tr: '"Tevatür" ne demek?', en: 'What does "Tevatür" mean?', es: '¿Qué significa "Tevatür"?', ar: 'ماذا تعني "Tevatür"؟', ru: 'Что означает "Tevatür"?', de: 'Was bedeutet "Tevatür"?', fr: 'Que signifie "Tevatür" ?' },
      options: { tr: ['Dedikodu/Söylenti', 'Gerçek', 'Belge', 'Kanıt'], en: ['Rumor/Hearsay', 'Truth', 'Document', 'Evidence'], es: ['Rumor', 'Verdad', 'Documento', 'Evidencia'], ar: ['إشاعة/شائعة', 'حقيقة', 'وثيقة', 'دليل'], ru: ['Слух/Молва', 'Правда', 'Документ', 'Доказательство'], de: ['Gerücht', 'Wahrheit', 'Dokument', 'Beweis'], fr: ['Rumeur', 'Vérité', 'Document', 'Preuve'] },
      answer: 0
    },
    {
      q: { tr: '"İltimas" ne demek?', en: 'What does "İltimas" mean?', es: '¿Qué significa "İltimas"?', ar: 'ماذا تعني "İltimas"؟', ru: 'Что означает "İltimas"?', de: 'Was bedeutet "İltimas"?', fr: 'Que signifie "İltimas" ?' },
      options: { tr: ['Ceza', 'Kayırma/Torpil', 'Adalet', 'Eşitlik'], en: ['Punishment', 'Favoritism/Nepotism', 'Justice', 'Equality'], es: ['Castigo', 'Favoritismo/Nepotismo', 'Justicia', 'Igualdad'], ar: ['عقوبة', 'محاباة/واسطة', 'عدالة', 'مساواة'], ru: ['Наказание', 'Фаворитизм/Кумовство', 'Справедливость', 'Равенство'], de: ['Strafe', 'Begünstigung/Vetternwirtschaft', 'Gerechtigkeit', 'Gleichheit'], fr: ['Punition', 'Favoritisme/Népotisme', 'Justice', 'Égalité'] },
      answer: 1
    },
    {
      q: { tr: '"Müstakil" ne demek?', en: 'What does "Müstakil" mean?', es: '¿Qué significa "Müstakil"?', ar: 'ماذا تعني "Müstakil"؟', ru: 'Что означает "Müstakil"?', de: 'Was bedeutet "Müstakil"?', fr: 'Que signifie "Müstakil" ?' },
      options: { tr: ['Bağımlı', 'Bağımsız/Ayrı', 'Ortak', 'Geçici'], en: ['Dependent', 'Independent/Separate', 'Shared', 'Temporary'], es: ['Dependiente', 'Independiente', 'Compartido', 'Temporal'], ar: ['تابع', 'مستقل/منفصل', 'مشترك', 'مؤقت'], ru: ['Зависимый', 'Независимый/Отдельный', 'Общий', 'Временный'], de: ['Abhängig', 'Unabhängig/Eigenständig', 'Gemeinsam', 'Vorübergehend'], fr: ['Dépendant', 'Indépendant/Séparé', 'Partagé', 'Temporaire'] },
      answer: 1
    },
    {
      q: { tr: '"Tedirgin" ne demek?', en: 'What does "Tedirgin" mean?', es: '¿Qué significa "Tedirgin"?', ar: 'ماذا تعني "Tedirgin"؟', ru: 'Что означает "Tedirgin"?', de: 'Was bedeutet "Tedirgin"?', fr: 'Que signifie "Tedirgin" ?' },
      options: { tr: ['Rahat', 'Huzursuz/Endişeli', 'Mutlu', 'Sakin'], en: ['Comfortable', 'Uneasy/Anxious', 'Happy', 'Calm'], es: ['Cómodo', 'Inquieto/Ansioso', 'Feliz', 'Tranquilo'], ar: ['مرتاح', 'قلق/مضطرب', 'سعيد', 'هادئ'], ru: ['Комфортный', 'Встревоженный', 'Счастливый', 'Спокойный'], de: ['Bequem', 'Unruhig/Besorgt', 'Glücklich', 'Ruhig'], fr: ['À l\'aise', 'Inquiet/Anxieux', 'Heureux', 'Calme'] },
      answer: 1
    },
    {
      q: { tr: '"Mütemadiyen" ne demek?', en: 'What does "Mütemadiyen" mean?', es: '¿Qué significa "Mütemadiyen"?', ar: 'ماذا تعني "Mütemadiyen"؟', ru: 'Что означает "Mütemadiyen"?', de: 'Was bedeutet "Mütemadiyen"?', fr: 'Que signifie "Mütemadiyen" ?' },
      options: { tr: ['Bazen', 'Sürekli olarak', 'Nadiren', 'Bir kez'], en: ['Sometimes', 'Continuously', 'Rarely', 'Once'], es: ['A veces', 'Continuamente', 'Raramente', 'Una vez'], ar: ['أحياناً', 'باستمرار', 'نادراً', 'مرة واحدة'], ru: ['Иногда', 'Непрерывно', 'Редко', 'Однажды'], de: ['Manchmal', 'Ständig', 'Selten', 'Einmal'], fr: ['Parfois', 'Continuellement', 'Rarement', 'Une fois'] },
      answer: 1
    },
    {
      q: { tr: '"Tahakküm" ne demek?', en: 'What does "Tahakküm" mean?', es: '¿Qué significa "Tahakküm"?', ar: 'ماذا تعني "Tahakküm"؟', ru: 'Что означает "Tahakküm"?', de: 'Was bedeutet "Tahakküm"?', fr: 'Que signifie "Tahakküm" ?' },
      options: { tr: ['Özgürlük', 'Baskı/Hâkimiyet', 'Yardım', 'İşbirliği'], en: ['Freedom', 'Domination/Oppression', 'Help', 'Cooperation'], es: ['Libertad', 'Dominación/Opresión', 'Ayuda', 'Cooperación'], ar: ['حرية', 'تسلط/هيمنة', 'مساعدة', 'تعاون'], ru: ['Свобода', 'Господство/Угнетение', 'Помощь', 'Сотрудничество'], de: ['Freiheit', 'Herrschaft/Unterdrückung', 'Hilfe', 'Zusammenarbeit'], fr: ['Liberté', 'Domination/Oppression', 'Aide', 'Coopération'] },
      answer: 1
    },
    {
      q: { tr: '"Müzakere" ne demek?', en: 'What does "Müzakere" mean?', es: '¿Qué significa "Müzakere"?', ar: 'ماذا تعني "Müzakere"؟', ru: 'Что означает "Müzakere"?', de: 'Was bedeutet "Müzakere"?', fr: 'Que signifie "Müzakere" ?' },
      options: { tr: ['Tartışma', 'Görüşme/Pazarlık', 'Kavga', 'Kaçış'], en: ['Argument', 'Negotiation', 'Fight', 'Escape'], es: ['Discusión', 'Negociación', 'Pelea', 'Escape'], ar: ['جدال', 'مفاوضة/تفاوض', 'قتال', 'هروب'], ru: ['Спор', 'Переговоры', 'Драка', 'Побег'], de: ['Streit', 'Verhandlung', 'Kampf', 'Flucht'], fr: ['Dispute', 'Négociation', 'Bagarre', 'Fuite'] },
      answer: 1
    },
    {
      q: { tr: '"Teşvik" ne demek?', en: 'What does "Teşvik" mean?', es: '¿Qué significa "Teşvik"?', ar: 'ماذا تعني "Teşvik"؟', ru: 'Что означает "Teşvik"?', de: 'Was bedeutet "Teşvik"?', fr: 'Que signifie "Teşvik" ?' },
      options: { tr: ['Engelleme', 'Özendirme/Destekleme', 'Yasaklama', 'Cezalandırma'], en: ['Obstruction', 'Encouragement/Incentive', 'Prohibition', 'Punishment'], es: ['Obstrucción', 'Estímulo/Incentivo', 'Prohibición', 'Castigo'], ar: ['عرقلة', 'تشجيع/حافز', 'حظر', 'عقاب'], ru: ['Препятствие', 'Поощрение/Стимул', 'Запрет', 'Наказание'], de: ['Behinderung', 'Förderung/Anreiz', 'Verbot', 'Bestrafung'], fr: ['Obstruction', 'Encouragement/Incitation', 'Interdiction', 'Punition'] },
      answer: 1
    },
    {
      q: { tr: '"Kadim" ne demek?', en: 'What does "Kadim" mean?', es: '¿Qué significa "Kadim"?', ar: 'ماذا تعني "Kadim"؟', ru: 'Что означает "Kadim"?', de: 'Was bedeutet "Kadim"?', fr: 'Que signifie "Kadim" ?' },
      options: { tr: ['Yeni', 'Çok eski/Antik', 'Modern', 'Geçici'], en: ['New', 'Very old/Ancient', 'Modern', 'Temporary'], es: ['Nuevo', 'Muy antiguo', 'Moderno', 'Temporal'], ar: ['جديد', 'قديم جداً/عتيق', 'حديث', 'مؤقت'], ru: ['Новый', 'Очень древний', 'Современный', 'Временный'], de: ['Neu', 'Sehr alt/Antik', 'Modern', 'Vorübergehend'], fr: ['Nouveau', 'Très ancien/Antique', 'Moderne', 'Temporaire'] },
      answer: 1
    },
    {
      q: { tr: '"İcap etmek" ne demek?', en: 'What does "İcap etmek" mean?', es: '¿Qué significa "İcap etmek"?', ar: 'ماذا تعني "İcap etmek"؟', ru: 'Что означает "İcap etmek"?', de: 'Was bedeutet "İcap etmek"?', fr: 'Que signifie "İcap etmek" ?' },
      options: { tr: ['İstemek', 'Gerekmek', 'Beğenmek', 'Kaçınmak'], en: ['To want', 'To be necessary', 'To like', 'To avoid'], es: ['Querer', 'Ser necesario', 'Gustar', 'Evitar'], ar: ['يريد', 'يلزم/يجب', 'يحب', 'يتجنب'], ru: ['Хотеть', 'Быть необходимым', 'Нравиться', 'Избегать'], de: ['Wollen', 'Erforderlich sein', 'Mögen', 'Vermeiden'], fr: ['Vouloir', 'Être nécessaire', 'Aimer', 'Éviter'] },
      answer: 1
    },
    {
      q: { tr: '"Muğlak" ne demek?', en: 'What does "Muğlak" mean?', es: '¿Qué significa "Muğlak"?', ar: 'ماذا تعني "Muğlak"؟', ru: 'Что означает "Muğlak"?', de: 'Was bedeutet "Muğlak"?', fr: 'Que signifie "Muğlak" ?' },
      options: { tr: ['Açık/Net', 'Belirsiz/Bulanık', 'Kesin', 'Basit'], en: ['Clear', 'Ambiguous/Vague', 'Definite', 'Simple'], es: ['Claro', 'Ambiguo/Vago', 'Definitivo', 'Simple'], ar: ['واضح', 'غامض/مبهم', 'قاطع', 'بسيط'], ru: ['Ясный', 'Неясный/Расплывчатый', 'Определённый', 'Простой'], de: ['Klar', 'Mehrdeutig/Unklar', 'Bestimmt', 'Einfach'], fr: ['Clair', 'Ambigu/Vague', 'Défini', 'Simple'] },
      answer: 1
    },
    {
      q: { tr: '"Teamül" ne demek?', en: 'What does "Teamül" mean?', es: '¿Qué significa "Teamül"?', ar: 'ماذا تعني "Teamül"؟', ru: 'Что означает "Teamül"?', de: 'Was bedeutet "Teamül"?', fr: 'Que signifie "Teamül" ?' },
      options: { tr: ['Yenilik', 'Gelenek/Alışılmış uygulama', 'Devrim', 'Değişim'], en: ['Innovation', 'Custom/Established practice', 'Revolution', 'Change'], es: ['Innovación', 'Costumbre/Práctica establecida', 'Revolución', 'Cambio'], ar: ['ابتكار', 'عُرف/ممارسة معتادة', 'ثورة', 'تغيير'], ru: ['Инновация', 'Обычай/Устоявшаяся практика', 'Революция', 'Изменение'], de: ['Innovation', 'Brauch/Übliche Praxis', 'Revolution', 'Veränderung'], fr: ['Innovation', 'Coutume/Pratique établie', 'Révolution', 'Changement'] },
      answer: 1
    },
    {
      q: { tr: '"Muhafazakâr" ne demek?', en: 'What does "Muhafazakâr" mean?', es: '¿Qué significa "Muhafazakâr"?', ar: 'ماذا تعني "Muhafazakâr"؟', ru: 'Что означает "Muhafazakâr"?', de: 'Was bedeutet "Muhafazakâr"?', fr: 'Que signifie "Muhafazakâr" ?' },
      options: { tr: ['Yenilikçi', 'Tutucu/Geleneksel', 'Liberal', 'Radikal'], en: ['Innovative', 'Conservative/Traditional', 'Liberal', 'Radical'], es: ['Innovador', 'Conservador/Tradicional', 'Liberal', 'Radical'], ar: ['مبتكر', 'محافظ/تقليدي', 'ليبرالي', 'راديكالي'], ru: ['Инновационный', 'Консервативный', 'Либеральный', 'Радикальный'], de: ['Innovativ', 'Konservativ/Traditionell', 'Liberal', 'Radikal'], fr: ['Innovant', 'Conservateur/Traditionnel', 'Libéral', 'Radical'] },
      answer: 1
    }
  ],
  C2: [
    {
      q: { tr: '"Mülemma" ne demek?', en: 'What does "Mülemma" mean?', es: '¿Qué significa "Mülemma"?', ar: 'ماذا تعني "Mülemma"؟', ru: 'Что означает "Mülemma"?', de: 'Was bedeutet "Mülemma"?', fr: 'Que signifie "Mülemma" ?' },
      options: { tr: ['Tek dilde yazılmış şiir', 'Birden fazla dilde yazılmış şiir', 'Nesir türü', 'Roman türü'], en: ['Poem in one language', 'Multilingual poem', 'Prose genre', 'Novel genre'], es: ['Poema en un idioma', 'Poema multilingüe', 'Género de prosa', 'Género novelístico'], ar: ['شعر بلغة واحدة', 'شعر متعدد اللغات', 'نوع نثري', 'نوع روائي'], ru: ['Стих на одном языке', 'Многоязычное стихотворение', 'Жанр прозы', 'Жанр романа'], de: ['Gedicht in einer Sprache', 'Mehrsprachiges Gedicht', 'Prosagenre', 'Romangenre'], fr: ['Poème en une langue', 'Poème multilingue', 'Genre de prose', 'Genre romanesque'] },
      answer: 1
    },
    {
      q: { tr: '"Şecere" ne demek?', en: 'What does "Şecere" mean?', es: '¿Qué significa "Şecere"?', ar: 'ماذا تعني "Şecere"؟', ru: 'Что означает "Şecere"?', de: 'Was bedeutet "Şecere"?', fr: 'Que signifie "Şecere" ?' },
      options: { tr: ['Ağaç türü', 'Soy ağacı/Soy kütüğü', 'Şehir haritası', 'Yemek tarifi'], en: ['Tree species', 'Family tree/Genealogy', 'City map', 'Recipe'], es: ['Especie de árbol', 'Árbol genealógico', 'Mapa de ciudad', 'Receta'], ar: ['نوع شجرة', 'شجرة العائلة/نسب', 'خريطة مدينة', 'وصفة طبخ'], ru: ['Вид дерева', 'Родословная', 'Карта города', 'Рецепт'], de: ['Baumart', 'Stammbaum/Genealogie', 'Stadtplan', 'Rezept'], fr: ['Espèce d\'arbre', 'Arbre généalogique', 'Plan de ville', 'Recette'] },
      answer: 1
    },
    {
      q: { tr: '"Feraset" ne demek?', en: 'What does "Feraset" mean?', es: '¿Qué significa "Feraset"?', ar: 'ماذا تعني "Feraset"؟', ru: 'Что означает "Feraset"?', de: 'Was bedeutet "Feraset"?', fr: 'Que signifie "Feraset" ?' },
      options: { tr: ['Korkaklık', 'İleri görüşlülük/Sezgi', 'Cimrilik', 'Tembellik'], en: ['Cowardice', 'Foresight/Intuition', 'Stinginess', 'Laziness'], es: ['Cobardía', 'Previsión/Intuición', 'Tacañería', 'Pereza'], ar: ['جبن', 'بصيرة/فراسة', 'بخل', 'كسل'], ru: ['Трусость', 'Проницательность/Интуиция', 'Скупость', 'Лень'], de: ['Feigheit', 'Weitblick/Intuition', 'Geiz', 'Faulheit'], fr: ['Lâcheté', 'Clairvoyance/Intuition', 'Avarice', 'Paresse'] },
      answer: 1
    },
    {
      q: { tr: '"Münzevi" ne demek?', en: 'What does "Münzevi" mean?', es: '¿Qué significa "Münzevi"?', ar: 'ماذا تعني "Münzevi"؟', ru: 'Что означает "Münzevi"?', de: 'Was bedeutet "Münzevi"?', fr: 'Que signifie "Münzevi" ?' },
      options: { tr: ['Sosyal', 'İnzivaya çekilmiş/Yalnız yaşayan', 'Zengin', 'Güçlü'], en: ['Social', 'Reclusive/Hermit', 'Wealthy', 'Powerful'], es: ['Social', 'Recluso/Ermitaño', 'Rico', 'Poderoso'], ar: ['اجتماعي', 'منعزل/ناسك', 'غني', 'قوي'], ru: ['Общительный', 'Отшельник/Затворник', 'Богатый', 'Сильный'], de: ['Gesellig', 'Zurückgezogen/Einsiedler', 'Wohlhabend', 'Mächtig'], fr: ['Social', 'Reclus/Ermite', 'Riche', 'Puissant'] },
      answer: 1
    },
    {
      q: { tr: '"Mübhem" ne demek?', en: 'What does "Mübhem" mean?', es: '¿Qué significa "Mübhem"?', ar: 'ماذا تعني "Mübhem"؟', ru: 'Что означает "Mübhem"?', de: 'Was bedeutet "Mübhem"?', fr: 'Que signifie "Mübhem" ?' },
      options: { tr: ['Açık', 'Kapalı/Belirsiz', 'Parlak', 'Geniş'], en: ['Clear', 'Obscure/Ambiguous', 'Bright', 'Wide'], es: ['Claro', 'Oscuro/Ambiguo', 'Brillante', 'Amplio'], ar: ['واضح', 'مبهم/غامض', 'ساطع', 'واسع'], ru: ['Ясный', 'Смутный/Неясный', 'Яркий', 'Широкий'], de: ['Klar', 'Unklar/Mehrdeutig', 'Hell', 'Breit'], fr: ['Clair', 'Obscur/Ambigu', 'Brillant', 'Large'] },
      answer: 1
    },
    {
      q: { tr: '"Rüçhan" ne demek?', en: 'What does "Rüçhan" mean?', es: '¿Qué significa "Rüçhan"?', ar: 'ماذا تعني "Rüçhan"؟', ru: 'Что означает "Rüçhan"?', de: 'Was bedeutet "Rüçhan"?', fr: 'Que signifie "Rüçhan" ?' },
      options: { tr: ['Gerileme', 'Öncelik/Üstünlük', 'Eşitlik', 'Kayıp'], en: ['Regression', 'Priority/Superiority', 'Equality', 'Loss'], es: ['Regresión', 'Prioridad/Superioridad', 'Igualdad', 'Pérdida'], ar: ['تراجع', 'أولوية/أفضلية', 'مساواة', 'خسارة'], ru: ['Регресс', 'Приоритет/Превосходство', 'Равенство', 'Потеря'], de: ['Rückgang', 'Vorrang/Überlegenheit', 'Gleichheit', 'Verlust'], fr: ['Régression', 'Priorité/Supériorité', 'Égalité', 'Perte'] },
      answer: 1
    },
    {
      q: { tr: '"Muharrir" ne demek?', en: 'What does "Muharrir" mean?', es: '¿Qué significa "Muharrir"?', ar: 'ماذا تعني "Muharrir"؟', ru: 'Что означает "Muharrir"?', de: 'Was bedeutet "Muharrir"?', fr: 'Que signifie "Muharrir" ?' },
      options: { tr: ['Savaşçı', 'Yazar', 'Ressam', 'Müzisyen'], en: ['Warrior', 'Writer/Author', 'Painter', 'Musician'], es: ['Guerrero', 'Escritor/Autor', 'Pintor', 'Músico'], ar: ['محارب', 'كاتب/مؤلف', 'رسام', 'موسيقي'], ru: ['Воин', 'Писатель/Автор', 'Художник', 'Музыкант'], de: ['Krieger', 'Schriftsteller/Autor', 'Maler', 'Musiker'], fr: ['Guerrier', 'Écrivain/Auteur', 'Peintre', 'Musicien'] },
      answer: 1
    },
    {
      q: { tr: '"Salahiyet" ne demek?', en: 'What does "Salahiyet" mean?', es: '¿Qué significa "Salahiyet"?', ar: 'ماذا تعني "Salahiyet"؟', ru: 'Что означает "Salahiyet"?', de: 'Was bedeutet "Salahiyet"?', fr: 'Que signifie "Salahiyet" ?' },
      options: { tr: ['Suç', 'Yetki/İktidar', 'Ceza', 'Af'], en: ['Crime', 'Authority/Power', 'Penalty', 'Pardon'], es: ['Crimen', 'Autoridad/Poder', 'Pena', 'Perdón'], ar: ['جريمة', 'صلاحية/سلطة', 'عقوبة', 'عفو'], ru: ['Преступление', 'Полномочие/Власть', 'Наказание', 'Помилование'], de: ['Verbrechen', 'Autorität/Befugnis', 'Strafe', 'Begnadigung'], fr: ['Crime', 'Autorité/Pouvoir', 'Peine', 'Pardon'] },
      answer: 1
    },
    {
      q: { tr: '"Müstesna" ne demek?', en: 'What does "Müstesna" mean?', es: '¿Qué significa "Müstesna"?', ar: 'ماذا تعني "Müstesna"؟', ru: 'Что означает "Müstesna"?', de: 'Was bedeutet "Müstesna"?', fr: 'Que signifie "Müstesna" ?' },
      options: { tr: ['Sıradan', 'Ayrıcalıklı/İstisna', 'Belirsiz', 'Sabit'], en: ['Ordinary', 'Exceptional/Exempt', 'Uncertain', 'Fixed'], es: ['Ordinario', 'Excepcional/Exento', 'Incierto', 'Fijo'], ar: ['عادي', 'استثنائي/مستثنى', 'غير مؤكد', 'ثابت'], ru: ['Обычный', 'Исключительный', 'Неопределённый', 'Постоянный'], de: ['Gewöhnlich', 'Außergewöhnlich/Ausgenommen', 'Unsicher', 'Fest'], fr: ['Ordinaire', 'Exceptionnel/Exempté', 'Incertain', 'Fixe'] },
      answer: 1
    },
    {
      q: { tr: '"Rikkat" ne demek?', en: 'What does "Rikkat" mean?', es: '¿Qué significa "Rikkat"?', ar: 'ماذا تعني "Rikkat"؟', ru: 'Что означает "Rikkat"?', de: 'Was bedeutet "Rikkat"?', fr: 'Que signifie "Rikkat" ?' },
      options: { tr: ['Sertlik', 'İncelik/Hassasiyet', 'Güçlülük', 'Kalınlık'], en: ['Harshness', 'Delicacy/Sensitivity', 'Strength', 'Thickness'], es: ['Dureza', 'Delicadeza/Sensibilidad', 'Fuerza', 'Grosor'], ar: ['قسوة', 'رقة/حساسية', 'قوة', 'سُمك'], ru: ['Жёсткость', 'Деликатность/Чувствительность', 'Сила', 'Толщина'], de: ['Härte', 'Feinfühligkeit/Empfindsamkeit', 'Stärke', 'Dicke'], fr: ['Dureté', 'Délicatesse/Sensibilité', 'Force', 'Épaisseur'] },
      answer: 1
    },
    {
      q: { tr: '"Tecessüs" ne demek?', en: 'What does "Tecessüs" mean?', es: '¿Qué significa "Tecessüs"?', ar: 'ماذا تعني "Tecessüs"؟', ru: 'Что означает "Tecessüs"?', de: 'Was bedeutet "Tecessüs"?', fr: 'Que signifie "Tecessüs" ?' },
      options: { tr: ['Korku', 'Merak/Araştırma isteği', 'Öfke', 'Sevgi'], en: ['Fear', 'Curiosity/Desire to explore', 'Anger', 'Love'], es: ['Miedo', 'Curiosidad/Deseo de explorar', 'Ira', 'Amor'], ar: ['خوف', 'فضول/رغبة في الاستكشاف', 'غضب', 'حب'], ru: ['Страх', 'Любопытство/Стремление исследовать', 'Гнев', 'Любовь'], de: ['Angst', 'Neugier/Erforschungsdrang', 'Wut', 'Liebe'], fr: ['Peur', 'Curiosité/Désir d\'explorer', 'Colère', 'Amour'] },
      answer: 1
    },
    {
      q: { tr: '"Mütehakkim" ne demek?', en: 'What does "Mütehakkim" mean?', es: '¿Qué significa "Mütehakkim"?', ar: 'ماذا تعني "Mütehakkim"؟', ru: 'Что означает "Mütehakkim"?', de: 'Was bedeutet "Mütehakkim"?', fr: 'Que signifie "Mütehakkim" ?' },
      options: { tr: ['Alçakgönüllü', 'Zorba/Baskıcı', 'Yardımsever', 'Nazik'], en: ['Humble', 'Tyrannical/Overbearing', 'Charitable', 'Kind'], es: ['Humilde', 'Tiránico/Dominante', 'Caritativo', 'Amable'], ar: ['متواضع', 'متسلط/مستبد', 'خيّر', 'لطيف'], ru: ['Скромный', 'Деспотичный/Властный', 'Благотворительный', 'Добрый'], de: ['Bescheiden', 'Tyrannisch/Herrisch', 'Wohltätig', 'Freundlich'], fr: ['Humble', 'Tyrannique/Autoritaire', 'Charitable', 'Gentil'] },
      answer: 1
    },
    {
      q: { tr: '"İştikak" ne demek?', en: 'What does "İştikak" mean?', es: '¿Qué significa "İştikak"?', ar: 'ماذا تعني "İştikak"؟', ru: 'Что означает "İştikak"?', de: 'Was bedeutet "İştikak"?', fr: 'Que signifie "İştikak" ?' },
      options: { tr: ['Ayrılık', 'Türeme/Kelime kökünden türetme', 'Birleşme', 'Bölünme'], en: ['Separation', 'Derivation/Word root derivation', 'Union', 'Division'], es: ['Separación', 'Derivación/Derivación de raíz', 'Unión', 'División'], ar: ['انفصال', 'اشتقاق/اشتقاق من الجذر', 'اتحاد', 'انقسام'], ru: ['Разделение', 'Словообразование/Деривация', 'Объединение', 'Разделение'], de: ['Trennung', 'Ableitung/Wortbildung', 'Vereinigung', 'Teilung'], fr: ['Séparation', 'Dérivation/Dérivation lexicale', 'Union', 'Division'] },
      answer: 1
    },
    {
      q: { tr: '"Tahassüs" ne demek?', en: 'What does "Tahassüs" mean?', es: '¿Qué significa "Tahassüs"?', ar: 'ماذا تعني "Tahassüs"؟', ru: 'Что означает "Tahassüs"?', de: 'Was bedeutet "Tahassüs"?', fr: 'Que signifie "Tahassüs" ?' },
      options: { tr: ['Düşünme', 'Hissetme/Duygulanma', 'Hesaplama', 'Planlama'], en: ['Thinking', 'Feeling/Being moved', 'Calculating', 'Planning'], es: ['Pensar', 'Sentir/Conmoverse', 'Calcular', 'Planificar'], ar: ['تفكير', 'إحساس/تأثر', 'حساب', 'تخطيط'], ru: ['Мышление', 'Чувствование/Переживание', 'Вычисление', 'Планирование'], de: ['Denken', 'Empfinden/Ergriffen sein', 'Berechnen', 'Planen'], fr: ['Penser', 'Ressentir/S\'émouvoir', 'Calculer', 'Planifier'] },
      answer: 1
    },
    {
      q: { tr: '"Tagallüp" ne demek?', en: 'What does "Tagallüp" mean?', es: '¿Qué significa "Tagallüp"?', ar: 'ماذا تعني "Tagallüp"؟', ru: 'Что означает "Tagallüp"?', de: 'Was bedeutet "Tagallüp"?', fr: 'Que signifie "Tagallüp" ?' },
      options: { tr: ['Yenilgi', 'Üstün gelme/Galip gelme', 'Kaçış', 'Barış'], en: ['Defeat', 'Prevailing/Overcoming', 'Escape', 'Peace'], es: ['Derrota', 'Prevalecer/Superar', 'Escape', 'Paz'], ar: ['هزيمة', 'تغلُّب/انتصار', 'هروب', 'سلام'], ru: ['Поражение', 'Преобладание/Победа', 'Побег', 'Мир'], de: ['Niederlage', 'Überlegenheit/Siegen', 'Flucht', 'Frieden'], fr: ['Défaite', 'Prévaloir/L\'emporter', 'Fuite', 'Paix'] },
      answer: 1
    }
  ]
};

// Para basamakları (15 soru Milyoner formatı)
window.MILLIONAIRE_PRIZES = [
  '100 TL', '200 TL', '300 TL', '500 TL', '1.000 TL',
  '2.000 TL', '4.000 TL', '8.000 TL', '16.000 TL', '32.000 TL',
  '64.000 TL', '125.000 TL', '250.000 TL', '500.000 TL', '1.000.000 TL'
];

// Güvenli basamaklar (5. ve 10. soru)
window.MILLIONAIRE_SAFE = [4, 9];
