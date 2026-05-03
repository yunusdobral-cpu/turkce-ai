const PROVERBS_DATA = [
  {
    id: 'atasozleri',
    icon: '📜',
    category: { tr: 'Atasözleri', en: 'Proverbs', es: 'Refranes', ar: 'أمثال شعبية', ru: 'Пословицы', de: 'Sprichwörter', fr: 'Proverbes' },
    items: [
      {
        tr: 'Damlaya damlaya göl olur.',
        meaning: 'Küçük çabalar birikerek büyük sonuçlar doğurur.',
        en: 'Drop by drop, a lake is formed.',
        es: 'De grano en grano, se llena el granero.',
        ar: 'قطرة قطرة يُملأ الإناء.',
        ru: 'Капля по капле — и камень долбит.',
        de: 'Steter Tropfen höhlt den Stein.',
        fr: 'Petit à petit, l\'oiseau fait son nid.'
      },
      {
        tr: 'İt ürür, kervan yürür.',
        meaning: 'Eleştirilere aldırmadan yoluna devam et.',
        en: 'The dog barks, but the caravan moves on.',
        es: 'El perro ladra, pero la caravana sigue.',
        ar: 'الكلاب تنبح والقافلة تسير.',
        ru: 'Собаки лают — ветер носит.',
        de: 'Die Hunde bellen, aber die Karawane zieht weiter.',
        fr: 'Les chiens aboient, la caravane passe.'
      },
      {
        tr: 'Sabreden derviş muradına ermiş.',
        meaning: 'Sabırlı olan sonunda amacına ulaşır.',
        en: 'Good things come to those who wait.',
        es: 'La paciencia es la madre de la ciencia.',
        ar: 'الصبر مفتاح الفرج.',
        ru: 'Терпение и труд всё перетрут.',
        de: 'Geduld bringt Rosen.',
        fr: 'La patience est la mère de toutes les vertus.'
      },
      {
        tr: 'Bir musibet, bin nasihatten iyidir.',
        meaning: 'Yaşanan bir zorluk, sayısız öğütten daha çok ders verir.',
        en: 'Experience is the best teacher.',
        es: 'La experiencia es la madre de la ciencia.',
        ar: 'التجربة خير معلم.',
        ru: 'Опыт — лучший учитель.',
        de: 'Erfahrung ist der beste Lehrmeister.',
        fr: 'L\'expérience est la meilleure des écoles.'
      },
      {
        tr: 'Bugünün işini yarına bırakma.',
        meaning: 'Yapılacak işleri erteleme.',
        en: 'Don\'t put off until tomorrow what you can do today.',
        es: 'No dejes para mañana lo que puedas hacer hoy.',
        ar: 'لا تؤجل عمل اليوم إلى الغد.',
        ru: 'Не откладывай на завтра то, что можно сделать сегодня.',
        de: 'Was du heute kannst besorgen, das verschiebe nicht auf morgen.',
        fr: 'Ne remets pas au lendemain ce que tu peux faire aujourd\'hui.'
      },
      {
        tr: 'Ne ekersen onu biçersin.',
        meaning: 'Yaptıklarının sonucunu er ya da geç göreceksin.',
        en: 'You reap what you sow.',
        es: 'Cosecharás lo que sembrares.',
        ar: 'كما تزرع تحصد.',
        ru: 'Что посеешь, то и пожнёшь.',
        de: 'Wie man sät, so erntet man.',
        fr: 'On récolte ce qu\'on sème.'
      },
      {
        tr: 'Bal tutan parmağını yalar.',
        meaning: 'Güç ya da zenginlikle ilgilenen ondan yararlanır.',
        en: 'He who handles honey licks his fingers.',
        es: 'Quien con miel anda, algo se le pega.',
        ar: 'من اتجر بالعسل لعق أصابعه.',
        ru: 'Кто с мёдом дело имеет, тот пальцы облизывает.',
        de: 'Wer mit Honig umgeht, leckt an den Fingern.',
        fr: 'Qui se frotte au miel se lèche les doigts.'
      },
      {
        tr: 'Dost ile ye iç, iş tutma.',
        meaning: 'Arkadaşlarla zevk paylaş ama iş ilişkisi kurma.',
        en: 'Don\'t mix friendship with business.',
        es: 'En negocios, no hay amigos.',
        ar: 'الصداقة صداقة والعمل عمل.',
        ru: 'Дружба — дружбой, а служба — службой.',
        de: 'Freundschaft und Geschäft vertragen sich nicht.',
        fr: 'En affaires, pas d\'amis; en amitié, pas d\'affaires.'
      },
      {
        tr: 'Körle yatan, şaşı kalkar.',
        meaning: 'Kötü arkadaş seçimi seni olumsuz etkiler.',
        en: 'He who lies with dogs rises with fleas.',
        es: 'Dime con quién andas y te diré quién eres.',
        ar: 'من جالس السفهاء عُدَّ منهم.',
        ru: 'С кем поведёшься, от того и наберёшься.',
        de: 'Sage mir, wer deine Freunde sind, und ich sage dir, wer du bist.',
        fr: 'Dis-moi qui tu fréquentes, je te dirai qui tu es.'
      },
      {
        tr: 'Komşu komşunun külüne muhtaç olur.',
        meaning: 'İnsanlar birbirlerine muhtaçtır; yardımlaşmak önemlidir.',
        en: 'A good neighbor is worth more than a distant friend.',
        es: 'Un buen vecino es una gran riqueza.',
        ar: 'الجار قبل الدار.',
        ru: 'Хороший сосед — лучший друг.',
        de: 'Gute Nachbarn sind Gold wert.',
        fr: 'Un bon voisin vaut mieux qu\'un ami lointain.'
      },
      {
        tr: 'Boş durma, boş çuval ayakta durmaz.',
        meaning: 'Çalışmadan başarıya ulaşılamaz.',
        en: 'An empty sack cannot stand upright.',
        es: 'El que no trabaja, no come.',
        ar: 'من جدَّ وجد.',
        ru: 'Без труда не выловишь и рыбку из пруда.',
        de: 'Ohne Fleiß kein Preis.',
        fr: 'Qui ne travaille pas ne mange pas.'
      },
      {
        tr: 'Söz gümüşse sükût altındır.',
        meaning: 'Bazen susmak konuşmaktan daha değerlidir.',
        en: 'Speech is silver, silence is golden.',
        es: 'La palabra es plata, el silencio es oro.',
        ar: 'الكلام من فضة والصمت من ذهب.',
        ru: 'Слово — серебро, молчание — золото.',
        de: 'Reden ist Silber, Schweigen ist Gold.',
        fr: 'La parole est d\'argent, le silence est d\'or.'
      }
    ]
  },
  {
    id: 'deyimler',
    icon: '💬',
    category: { tr: 'Deyimler', en: 'Idioms', es: 'Modismos', ar: 'تعابير اصطلاحية', ru: 'Идиомы', de: 'Redewendungen', fr: 'Expressions idiomatiques' },
    items: [
      {
        tr: 'Kulak vermek',
        meaning: 'Dikkatle dinlemek.',
        en: 'To lend an ear / to listen attentively.',
        es: 'Prestar atención / escuchar con atención.',
        ar: 'يُصغي / يُعير انتباهاً.',
        ru: 'Прислушиваться / слушать внимательно.',
        de: 'Ein offenes Ohr haben / aufmerksam zuhören.',
        fr: 'Prêter l\'oreille / écouter attentivement.'
      },
      {
        tr: 'Göz kulak olmak',
        meaning: 'Birine veya bir şeye dikkat etmek, korumak.',
        en: 'To keep an eye on / to watch over.',
        es: 'Vigilar / estar al tanto.',
        ar: 'يراقب / يحرس.',
        ru: 'Присматривать / приглядывать.',
        de: 'Ein Auge auf etwas haben / aufpassen.',
        fr: 'Garder un œil sur / surveiller.'
      },
      {
        tr: 'El atmak',
        meaning: 'Bir işe dahil olmak, girişmek.',
        en: 'To get involved / to put one\'s hand to.',
        es: 'Meterse / involucrarse.',
        ar: 'يتدخل / يشارك.',
        ru: 'Взяться за что-то / вмешаться.',
        de: 'Sich einmischen / anpacken.',
        fr: 'S\'impliquer / mettre la main à la pâte.'
      },
      {
        tr: 'Burnunu sokmak',
        meaning: 'Başkasının işine karışmak.',
        en: 'To poke one\'s nose into / to meddle.',
        es: 'Meter las narices / entrometerse.',
        ar: 'يُدخل أنفه في شؤون غيره / يتدخل.',
        ru: 'Совать нос не в своё дело.',
        de: 'Die Nase in etwas stecken / sich einmischen.',
        fr: 'Fourrer son nez dans les affaires des autres.'
      },
      {
        tr: 'Ağzı açık kalmak',
        meaning: 'Hayrete düşmek, şaşakalmak.',
        en: 'To be left with one\'s mouth open / to be astonished.',
        es: 'Quedarse boquiabierto.',
        ar: 'يبقى مفتوح الفم / يُذهل.',
        ru: 'Рот раскрыть от удивления / опешить.',
        de: 'Den Mund offen stehen haben / sprachlos sein.',
        fr: 'Rester bouche bée.'
      },
      {
        tr: 'Ayak uydurmak',
        meaning: 'Uyum sağlamak, adım tutturmak.',
        en: 'To keep pace with / to adapt.',
        es: 'Mantener el ritmo / adaptarse.',
        ar: 'يواكب / يتأقلم.',
        ru: 'Идти в ногу / приспосабливаться.',
        de: 'Schritt halten / sich anpassen.',
        fr: 'Suivre le rythme / s\'adapter.'
      },
      {
        tr: 'İşi başından aşmak',
        meaning: 'Çok fazla işi olmak, bunalmak.',
        en: 'To be overwhelmed / to be snowed under with work.',
        es: 'Estar desbordado de trabajo.',
        ar: 'غارق في العمل / مثقل بالأعمال.',
        ru: 'Быть по уши в делах / захлёбываться работой.',
        de: 'In Arbeit versinken / überwältigt sein.',
        fr: 'Être débordé de travail.'
      },
      {
        tr: 'Gözden düşmek',
        meaning: 'Birisinin gözünde değer kaybetmek.',
        en: 'To fall out of favor / to lose someone\'s respect.',
        es: 'Caer en desgracia / perder el favor.',
        ar: 'يسقط من عيون شخص ما / يفقد مكانته.',
        ru: 'Потерять расположение / впасть в немилость.',
        de: 'In Ungnade fallen / jemandes Gunst verlieren.',
        fr: 'Tomber en disgrâce / perdre la faveur de quelqu\'un.'
      },
      {
        tr: 'Kılına dokunmamak',
        meaning: 'Birine hiç zarar vermemek.',
        en: 'Not to touch a hair on someone\'s head / to leave unharmed.',
        es: 'No tocarle un pelo / dejar ileso.',
        ar: 'لا يمسّ شعرة من رأسه / لا يؤذيه.',
        ru: 'Не тронуть и волоска / не причинить вреда.',
        de: 'Kein Haar krümmen / nichts antun.',
        fr: 'Ne pas toucher à un cheveu de quelqu\'un.'
      },
      {
        tr: 'İki arada bir derede kalmak',
        meaning: 'İki seçenek arasında kararsız kalmak.',
        en: 'To be caught between a rock and a hard place.',
        es: 'Estar entre la espada y la pared.',
        ar: 'بين المطرقة والسندان.',
        ru: 'Оказаться между двух огней.',
        de: 'Zwischen zwei Stühlen sitzen.',
        fr: 'Être entre le marteau et l\'enclume.'
      },
      {
        tr: 'Göz yummak',
        meaning: 'Bir hatayı ya da kusuru görmezden gelmek.',
        en: 'To turn a blind eye / to overlook.',
        es: 'Hacer la vista gorda / ignorar.',
        ar: 'يغضّ الطرف / يتجاهل.',
        ru: 'Закрывать глаза / смотреть сквозь пальцы.',
        de: 'Ein Auge zudrücken / übersehen.',
        fr: 'Fermer les yeux sur / faire semblant de ne pas voir.'
      },
      {
        tr: 'Dili tutulmak',
        meaning: 'Söyleyecek bir şey bulamamak, şaşkınlıktan konuşamamak.',
        en: 'To be tongue-tied / to be at a loss for words.',
        es: 'Quedarse sin palabras / trabarse la lengua.',
        ar: 'يُصاب بالتلعثم / يعجز عن الكلام.',
        ru: 'Онеметь / лишиться дара речи.',
        de: 'Nicht wissen, was man sagen soll / sprachlos sein.',
        fr: 'Rester sans voix / avoir la langue paralysée.'
      }
    ]
  }
];
