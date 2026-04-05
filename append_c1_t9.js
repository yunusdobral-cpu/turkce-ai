const fs = require('fs');
const path = require('path');

const topic9 = [
  {
    tr: "Tarih boyunca büyük medeniyetlerin yükselmesi ve çöküşü tarihçileri, filozofları ve günümüzde toplum bilimcileri büyülemeye devam etmektedir.",
    en: "Throughout history, the rise and fall of great civilizations has continued to fascinate historians, philosophers, and today's social scientists.",
    de: "Der Aufstieg und Fall großer Zivilisationen fasziniert Historiker, Philosophen und heutige Sozialwissenschaftler seit jeher.",
    fr: "Tout au long de l'histoire, l'ascension et la chute des grandes civilisations continuent de fasciner les historiens, les philosophes et les spécialistes des sciences sociales d'aujourd'hui.",
    es: "A lo largo de la historia, el ascenso y la caída de las grandes civilizaciones ha seguido fascinando a historiadores, filósofos y científicos sociales de la actualidad.",
    ar: "على مرّ التاريخ، لا يزال صعود الحضارات الكبرى وسقوطها يأسر المؤرخين والفلاسفة وعلماء الاجتماع المعاصرين.",
    ru: "На протяжении всей истории взлёт и падение великих цивилизаций продолжают очаровывать историков, философов и современных социологов."
  },
  {
    tr: "İbn Haldun, 14. yüzyılda kaleme aldığı Mukaddime ile döngüsel tarih anlayışına özgün bir katkı sunmuştur.",
    en: "Ibn Khaldun made an original contribution to the cyclical understanding of history with his Muqaddimah, written in the 14th century.",
    de: "Ibn Chaldun leistete mit seiner im 14. Jahrhundert verfassten Muqaddima einen originellen Beitrag zum zyklischen Geschichtsverständnis.",
    fr: "Ibn Khaldoun a apporté une contribution originale à la compréhension cyclique de l'histoire avec sa Muqaddima, rédigée au XIVe siècle.",
    es: "Ibn Jaldún realizó una contribución original a la comprensión cíclica de la historia con su Muqaddima, escrita en el siglo XIV.",
    ar: "قدّم ابن خلدون إسهاماً فريداً في الفهم الدوري للتاريخ من خلال مقدمته التي ألّفها في القرن الرابع عشر.",
    ru: "Ибн Хальдун внёс оригинальный вклад в циклическое понимание истории своей «Мукаддимой», написанной в XIV веке."
  },
  {
    tr: "Batı Roma İmparatorluğu'nun çöküşü, tarihçilerin aralarında görüş birliğine varamadığı en çok tartışılan tarihsel olgulardan biridir.",
    en: "The fall of the Western Roman Empire is one of the most debated historical phenomena on which historians have been unable to reach consensus.",
    de: "Der Untergang des Weströmischen Reiches ist eines der meistdiskutierten historischen Phänomene, über das Historiker keinen Konsens erzielen konnten.",
    fr: "La chute de l'Empire romain d'Occident est l'un des phénomènes historiques les plus débattus sur lequel les historiens n'ont pas pu parvenir à un consensus.",
    es: "La caída del Imperio romano de Occidente es uno de los fenómenos históricos más debatidos sobre el cual los historiadores no han podido alcanzar un consenso.",
    ar: "يُعدّ سقوط الإمبراطورية الرومانية الغربية من أكثر الظواهر التاريخية إثارةً للجدل التي لم يتمكن المؤرخون من التوصل إلى إجماع بشأنها.",
    ru: "Падение Западной Римской империи — одно из наиболее дискутируемых исторических явлений, по поводу которого историки не смогли достичь консенсуса."
  },
  {
    tr: "Mayaların klasik dönem kentlerinin terk edilmesi ise yıkımın altında yatan faktörlerin ne denli karmaşık olabileceğini somut biçimde ortaya koymaktadır.",
    en: "The abandonment of the Maya's Classic period cities concretely demonstrates how complex the factors underlying collapse can be.",
    de: "Die Aufgabe der Städte der klassischen Maya-Periode zeigt konkret, wie komplex die einem Zusammenbruch zugrunde liegenden Faktoren sein können.",
    fr: "L'abandon des cités de la période classique maya démontre concrètement à quel point les facteurs sous-jacents à un effondrement peuvent être complexes.",
    es: "El abandono de las ciudades del período clásico maya demuestra concretamente cuán complejos pueden ser los factores subyacentes a un colapso.",
    ar: "يُظهر هجر مدن حضارة المايا في الفترة الكلاسيكية بشكل ملموس مدى تعقيد العوامل الكامنة وراء الانهيار.",
    ru: "Оставление городов классического периода майя наглядно демонстрирует, насколько сложными могут быть факторы, лежащие в основе коллапса."
  },
  {
    tr: "Toplumların karmaşık sorunlara uyum yetersizliğinden kaynaklandığını öne süren kollaps teorileri, günümüz medeniyetlerinin karşı karşıya olduğu iklim krizi, kaynak tükenmesi ve sürdürülemez ekonomik büyüme bağlamında yeniden güncellik kazanmaktadır.",
    en: "Collapse theories, which argue that societies fail due to their inability to adapt to complex problems, are regaining relevance in the context of the climate crisis, resource depletion, and unsustainable economic growth facing today's civilizations.",
    de: "Kollapstheorien, die argumentieren, dass Gesellschaften an ihrer Unfähigkeit scheitern, sich an komplexe Probleme anzupassen, gewinnen im Kontext der Klimakrise, Ressourcenerschöpfung und des nicht nachhaltigen Wirtschaftswachstums heutiger Zivilisationen erneut an Relevanz.",
    fr: "Les théories de l'effondrement, qui soutiennent que les sociétés échouent en raison de leur incapacité à s'adapter à des problèmes complexes, retrouvent leur pertinence dans le contexte de la crise climatique, de l'épuisement des ressources et de la croissance économique insoutenable auxquels font face les civilisations actuelles.",
    es: "Las teorías del colapso, que sostienen que las sociedades fracasan debido a su incapacidad para adaptarse a problemas complejos, están recuperando relevancia en el contexto de la crisis climática, el agotamiento de recursos y el crecimiento económico insostenible que enfrentan las civilizaciones actuales.",
    ar: "تستعيد نظريات الانهيار، التي تزعم أن المجتمعات تفشل بسبب عجزها عن التكيف مع المشكلات المعقدة، راهنيتها في سياق أزمة المناخ ونضوب الموارد والنمو الاقتصادي غير المستدام الذي تواجهه حضارات اليوم.",
    ru: "Теории коллапса, утверждающие, что общества терпят крах из-за неспособности адаптироваться к сложным проблемам, вновь обретают актуальность в контексте климатического кризиса, истощения ресурсов и неустойчивого экономического роста, с которыми сталкиваются современные цивилизации."
  },
  {
    tr: "Medeniyetlerin salt çöküşmediğini; aksine dönüşerek, göç ederek ve kültürel miraslarını bırakanların inanabileceğinin çok ötesinde devrettiğini savunan alternatif yaklaşımlar tarihçiler arasında giderek daha fazla taraftar bulmaktadır.",
    en: "Alternative approaches arguing that civilizations do not simply collapse but rather transform, migrate, and pass on their cultural heritage far beyond what those who left it behind could have believed, are gaining increasing support among historians.",
    de: "Alternative Ansätze, die argumentieren, dass Zivilisationen nicht einfach zusammenbrechen, sondern sich vielmehr transformieren, migrieren und ihr kulturelles Erbe weit über das hinaus weitergeben, was diejenigen, die es hinterließen, hätten glauben können, finden unter Historikern zunehmend Anklang.",
    fr: "Les approches alternatives soutenant que les civilisations ne s'effondrent pas simplement mais se transforment, migrent et transmettent leur héritage culturel bien au-delà de ce que ceux qui l'ont laissé auraient pu croire, gagnent de plus en plus d'adeptes parmi les historiens.",
    es: "Los enfoques alternativos que sostienen que las civilizaciones no simplemente colapsan sino que se transforman, migran y transmiten su herencia cultural mucho más allá de lo que quienes la dejaron habrían podido creer, están ganando cada vez más apoyo entre los historiadores.",
    ar: "تكتسب المقاربات البديلة التي تزعم أن الحضارات لا تنهار ببساطة بل تتحول وتهاجر وتنقل إرثها الثقافي إلى ما هو أبعد بكثير مما كان يتصوره من خلّفوه، تأييداً متزايداً بين المؤرخين.",
    ru: "Альтернативные подходы, утверждающие, что цивилизации не просто рушатся, а трансформируются, мигрируют и передают своё культурное наследие далеко за пределы того, во что могли бы поверить те, кто его оставил, завоёвывают всё больше сторонников среди историков."
  },
  {
    tr: "Samuel Huntington'ın Medeniyetler Çatışması tezi, küresel çatışmaların öncelikle kültürel ve dinsel hatlar üzerinde şekilleneceğini öngörerek 21. yüzyıl siyasi analizlerini derinden etkilemiştir.",
    en: "Samuel Huntington's Clash of Civilizations thesis has profoundly influenced 21st-century political analyses by predicting that global conflicts would primarily take shape along cultural and religious lines.",
    de: "Samuel Huntingtons These vom Kampf der Kulturen hat die politischen Analysen des 21. Jahrhunderts tiefgreifend beeinflusst, indem sie vorhersagte, dass globale Konflikte sich vorrangig entlang kultureller und religiöser Linien formieren würden.",
    fr: "La thèse du Choc des civilisations de Samuel Huntington a profondément influencé les analyses politiques du XXIe siècle en prédisant que les conflits mondiaux se structureraient principalement selon des lignes culturelles et religieuses.",
    es: "La tesis del Choque de civilizaciones de Samuel Huntington ha influido profundamente en los análisis políticos del siglo XXI al predecir que los conflictos globales se configurarían principalmente a lo largo de líneas culturales y religiosas.",
    ar: "أثّرت أطروحة صراع الحضارات لصامويل هنتنغتون تأثيراً عميقاً في التحليلات السياسية للقرن الحادي والعشرين بتوقعها أن الصراعات العالمية ستتشكل أساساً على خطوط ثقافية ودينية.",
    ru: "Тезис Сэмюэля Хантингтона о столкновении цивилизаций глубоко повлиял на политический анализ XXI века, предсказывая, что глобальные конфликты будут формироваться преимущественно по культурным и религиозным линиям."
  },
  {
    tr: "Mevcut küresel düzenin çöküşe mi yoksa dönüşüme mi doğru seyrettiği sorusu, akademik tartışmaların çok ötesine geçerek günümüzün en kritik varoluşsal sorularından biri hâline gelmiştir.",
    en: "The question of whether the current global order is heading toward collapse or transformation has gone far beyond academic debates to become one of the most critical existential questions of our time.",
    de: "Die Frage, ob die derzeitige Weltordnung auf einen Zusammenbruch oder eine Transformation zusteuert, ist weit über akademische Debatten hinausgegangen und zu einer der kritischsten existenziellen Fragen unserer Zeit geworden.",
    fr: "La question de savoir si l'ordre mondial actuel se dirige vers un effondrement ou une transformation a largement dépassé les débats académiques pour devenir l'une des questions existentielles les plus critiques de notre époque.",
    es: "La pregunta de si el orden global actual se dirige hacia el colapso o la transformación ha ido mucho más allá de los debates académicos para convertirse en una de las preguntas existenciales más críticas de nuestro tiempo.",
    ar: "تجاوز السؤال حول ما إذا كان النظام العالمي الحالي يسير نحو الانهيار أم التحول النقاشات الأكاديمية ليصبح أحد أكثر الأسئلة الوجودية إلحاحاً في عصرنا.",
    ru: "Вопрос о том, движется ли нынешний мировой порядок к краху или трансформации, давно вышел за рамки академических дискуссий и стал одним из самых критических экзистенциальных вопросов нашего времени."
  }
];

const filePath = path.join(__dirname, 'public', 'js', 'data', 'reading-translations.js');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/\s*\]\s*\};\s*$/, '');

content += ',\n    // 9: Medeniyetlerin Yükselişi ve Çöküşü\n    [\n';
topic9.forEach((sentence, i) => {
  const line = `      { tr: ${JSON.stringify(sentence.tr)}, en: ${JSON.stringify(sentence.en)}, de: ${JSON.stringify(sentence.de)}, fr: ${JSON.stringify(sentence.fr)}, es: ${JSON.stringify(sentence.es)}, ar: ${JSON.stringify(sentence.ar)}, ru: ${JSON.stringify(sentence.ru)} }`;
  content += line + (i < topic9.length - 1 ? ',\n' : '\n');
});
content += '    ]\n  ]\n};\n';

fs.writeFileSync(filePath, content, 'utf8');
console.log('Topic 9 (Medeniyetlerin Yükselişi ve Çöküşü) added successfully!');
