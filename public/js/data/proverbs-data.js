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
        fr: 'Petit à petit, l\'oiseau fait son nid.',
        detailEn: 'Even the smallest consistent efforts accumulate into great results over time. Think of saving a little money each day, practicing a language for 15 minutes daily, or doing a few push-ups every morning — none of it feels significant in the moment, but accumulated over months or years, it becomes something remarkable. Turks often say this to encourage someone who feels their progress is too slow or their contributions too small. The message: don\'t underestimate consistency.'
      },
      {
        tr: 'İt ürür, kervan yürür.',
        meaning: 'Eleştirilere aldırmadan yoluna devam et.',
        en: 'The dog barks, but the caravan moves on.',
        es: 'El perro ladra, pero la caravana sigue.',
        ar: 'الكلاب تنبح والقافلة تسير.',
        ru: 'Собаки лают — ветер носит.',
        de: 'Die Hunde bellen, aber die Karawane zieht weiter.',
        fr: 'Les chiens aboient, la caravane passe.',
        detailEn: 'One of the most commonly used Turkish proverbs, invoked when someone faces criticism or opposition they consider irrelevant. The image comes from Silk Road trade caravans — as they passed through towns, dogs would bark at them, but the caravan never stopped. Used when someone is unfairly criticized at work, ridiculed for a personal choice, or opposed by people whose opinion doesn\'t carry weight. The message is clear: keep moving forward, don\'t stop for the noise.'
      },
      {
        tr: 'Sabreden derviş muradına ermiş.',
        meaning: 'Sabırlı olan sonunda amacına ulaşır.',
        en: 'Good things come to those who wait.',
        es: 'La paciencia es la madre de la ciencia.',
        ar: 'الصبر مفتاح الفرج.',
        ru: 'Терпение и труд всё перетрут.',
        de: 'Geduld bringt Rosen.',
        fr: 'La patience est la mère de toutes les vertus.',
        detailEn: 'A dervish is a Sufi mystic — someone devoted to a long, patient spiritual journey. This proverb carries the weight of that image: those who endure with patience and purpose eventually reach what they seek. More than just "good things come to those who wait," it implies that patience is itself a form of active wisdom — not passive waiting, but perseverance with faith. Often said to comfort someone in the middle of a long and difficult effort who is tempted to give up.'
      },
      {
        tr: 'Bir musibet, bin nasihatten iyidir.',
        meaning: 'Yaşanan bir zorluk, sayısız öğütten daha çok ders verir.',
        en: 'Experience is the best teacher.',
        es: 'La experiencia es la madre de la ciencia.',
        ar: 'التجربة خير معلم.',
        ru: 'Опыт — лучший учитель.',
        de: 'Erfahrung ist der beste Lehrmeister.',
        fr: 'L\'expérience est la meilleure des écoles.',
        detailEn: '"Musibet" means misfortune or calamity; "nasihat" means advice or counsel. The proverb acknowledges a universal truth: people rarely learn from warnings alone — they learn from experience. One real setback teaches more than a thousand pieces of advice ever could. Often said (without blame) after someone has made a mistake despite being warned — not as a criticism, but as an observation about human nature. It also carries a note of compassion: the hardship was the real teacher, and now the lesson is learned.'
      },
      {
        tr: 'Bugünün işini yarına bırakma.',
        meaning: 'Yapılacak işleri erteleme.',
        en: 'Don\'t put off until tomorrow what you can do today.',
        es: 'No dejes para mañana lo que puedas hacer hoy.',
        ar: 'لا تؤجل عمل اليوم إلى الغد.',
        ru: 'Не откладывай на завтра то, что можно сделать сегодня.',
        de: 'Was du heute kannst besorgen, das verschiebe nicht auf morgen.',
        fr: 'Ne remets pas au lendemain ce que tu peux faire aujourd\'hui.',
        detailEn: 'A direct, practical call to action against procrastination. In Turkish culture, completing tasks promptly has historically been associated with reliability and personal honor — the kind of person who says they\'ll do something and then actually does it today. The proverb is commonly told to children, students, or anyone who keeps delaying something important. Simple, unambiguous, and still entirely relevant — because the human tendency to procrastinate hasn\'t changed in centuries.'
      },
      {
        tr: 'Ne ekersen onu biçersin.',
        meaning: 'Yaptıklarının sonucunu er ya da geç göreceksin.',
        en: 'You reap what you sow.',
        es: 'Cosecharás lo que sembrares.',
        ar: 'كما تزرع تحصد.',
        ru: 'Что посеешь, то и пожнёшь.',
        de: 'Wie man sät, so erntet man.',
        fr: 'On récolte ce qu\'on sème.',
        detailEn: 'Direct and unambiguous: your actions have consequences, and you will face them — sooner or later. Used in moral contexts — if you treat people poorly, similar treatment will find you; if you work honestly and hard, the reward comes. But it\'s not only a warning. It also serves as encouragement: if you\'ve been doing the right things and haven\'t yet seen results, this proverb reminds you to stay the course. The harvest takes time, but it comes.'
      },
      {
        tr: 'Bal tutan parmağını yalar.',
        meaning: 'Güç ya da zenginlikle ilgilenen ondan yararlanır.',
        en: 'He who handles honey licks his fingers.',
        es: 'Quien con miel anda, algo se le pega.',
        ar: 'من اتجر بالعسل لعق أصابعه.',
        ru: 'Кто с мёдом дело имеет, тот пальцы облизывает.',
        de: 'Wer mit Honig umgeht, leckt an den Fingern.',
        fr: 'Qui se frotte au miel se lèche les doigts.',
        detailEn: 'Whoever handles honey will inevitably lick their fingers. Used when someone benefits — expectedly or unexpectedly — from a position close to something valuable: a chef who tastes the best portions, a bookkeeper who knows the finances, a gatekeeper who receives a small cut. The proverb is not always negative — it simply acknowledges a natural reality: proximity to something desirable tends to lead to benefiting from it. Context determines whether it\'s said admiringly or as a quiet accusation.'
      },
      {
        tr: 'Dost ile ye iç, iş tutma.',
        meaning: 'Arkadaşlarla zevk paylaş ama iş ilişkisi kurma.',
        en: 'Don\'t mix friendship with business.',
        es: 'En negocios, no hay amigos.',
        ar: 'الصداقة صداقة والعمل عمل.',
        ru: 'Дружба — дружбой, а служба — службой.',
        de: 'Freundschaft und Geschäft vertragen sich nicht.',
        fr: 'En affaires, pas d\'amis; en amitié, pas d\'affaires.',
        detailEn: 'A pragmatic warning with centuries of wisdom behind it. It doesn\'t say don\'t enjoy friendship — it says keep money out of it. Financial disputes and broken agreements are among the most common reasons friendships collapse, and this proverb has been warning Turks about this for generations. Often quoted just before someone is tempted to lend money to a close friend, go into business with a family member, or hire someone they care about. Sometimes said with a wry smile just after the mistake has already been made.'
      },
      {
        tr: 'Körle yatan, şaşı kalkar.',
        meaning: 'Kötü arkadaş seçimi seni olumsuz etkiler.',
        en: 'He who lies with dogs rises with fleas.',
        es: 'Dime con quién andas y te diré quién eres.',
        ar: 'من جالس السفهاء عُدَّ منهم.',
        ru: 'С кем поведёшься, от того и наберёшься.',
        de: 'Sage mir, wer deine Freunde sind, und ich sage dir, wer du bist.',
        fr: 'Dis-moi qui tu fréquentes, je te dirai qui tu es.',
        detailEn: '"Körle" means "with a blind person"; "şaşı" means "cross-eyed." The literal image is almost comical — but the meaning is serious: the company you keep shapes who you become. Spend time around dishonest people and their habits will gradually creep into your own behavior. Spend time around disciplined, principled people and you\'ll absorb those qualities instead. A favorite among Turkish parents when cautioning children about their social circle, and a quiet reminder to adults choosing their colleagues and friends.'
      },
      {
        tr: 'Komşu komşunun külüne muhtaç olur.',
        meaning: 'İnsanlar birbirlerine muhtaçtır; yardımlaşmak önemlidir.',
        en: 'A good neighbor is worth more than a distant friend.',
        es: 'Un buen vecino es una gran riqueza.',
        ar: 'الجار قبل الدار.',
        ru: 'Хороший сосед — лучший друг.',
        de: 'Gute Nachbarn sind Gold wert.',
        fr: 'Un bon voisin vaut mieux qu\'un ami lointain.',
        detailEn: 'Ash ("kül") was historically used for cleaning pots and other household tasks. The image: even something as minor as ash might need to be borrowed from a neighbor. The deeper message is that no one is truly self-sufficient — no matter how capable or wealthy, we all depend on others for something. It encourages maintaining good neighborly relations not merely as a social courtesy, but as a practical necessity. When trouble comes, it\'s often the neighbor next door — not the dear friend across the city — who can actually help.'
      },
      {
        tr: 'Boş durma, boş çuval ayakta durmaz.',
        meaning: 'Çalışmadan başarıya ulaşılamaz.',
        en: 'An empty sack cannot stand upright.',
        es: 'El que no trabaja, no come.',
        ar: 'من جدَّ وجد.',
        ru: 'Без труда не выловишь и рыбку из пруда.',
        de: 'Ohne Fleiß kein Preis.',
        fr: 'Qui ne travaille pas ne mange pas.',
        detailEn: 'An empty sack cannot stand on its own — and neither can a person without purpose, effort, or substance. The proverb is a vivid call against idleness: "boş durma" literally means "don\'t just stand there idle." Used by parents, teachers, and elders to encourage someone to stay active and purposeful. The visual metaphor is simple and irrefutable — an empty sack simply collapses under its own emptiness. Fill yourself with effort and purpose, and you\'ll stand upright.'
      },
      {
        tr: 'Söz gümüşse sükût altındır.',
        meaning: 'Bazen susmak konuşmaktan daha değerlidir.',
        en: 'Speech is silver, silence is golden.',
        es: 'La palabra es plata, el silencio es oro.',
        ar: 'الكلام من فضة والصمت من ذهب.',
        ru: 'Слово — серебро, молчание — золото.',
        de: 'Reden ist Silber, Schweigen ist Gold.',
        fr: 'La parole est d\'argent, le silence est d\'or.',
        detailEn: 'This proverb appears across many cultures, but it holds particular weight in Turkish thought. Speech is valuable — but knowing when to stay silent is even more so. Used when someone has said something they regret, when someone is being pressured to reveal information they shouldn\'t, or simply as a reminder that restraint is more powerful than hasty words. In Turkish culture, the wise person is not the loudest voice in the room — it\'s the one who speaks carefully and knows when silence says more than words ever could.'
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
