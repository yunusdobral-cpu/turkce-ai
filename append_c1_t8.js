const fs = require('fs');
const path = require('path');

const topic8 = [
  {
    tr: "Sanatın özerkliği meselesi, sanat yapıtlarının ahlaki, siyasi ve sosyal bağlamlarından bağımsız biçimde değerlendirilip değerlendirilemeyeceğini ya da bu bağlamlarla zorunlu olarak iç içe mi ele alınması gerektiğini sorgulayan ve estetik felsefesinin merkezinde yer alan köklü bir tartışmadır.",
    en: "The question of art's autonomy is a deep-rooted debate at the center of aesthetic philosophy, questioning whether artworks can be evaluated independently of their moral, political, and social contexts, or whether they must necessarily be considered intertwined with these contexts.",
    de: "Die Frage der Autonomie der Kunst ist eine tiefgreifende Debatte im Zentrum der Ästhetik, die hinterfragt, ob Kunstwerke unabhängig von ihrem moralischen, politischen und sozialen Kontext bewertet werden können oder ob sie zwangsläufig mit diesen Kontexten verflochten betrachtet werden müssen.",
    fr: "La question de l'autonomie de l'art est un débat profondément enraciné au cœur de la philosophie esthétique, interrogeant si les œuvres d'art peuvent être évaluées indépendamment de leurs contextes moraux, politiques et sociaux, ou si elles doivent nécessairement être considérées comme imbriquées dans ces contextes.",
    es: "La cuestión de la autonomía del arte es un debate profundamente arraigado en el centro de la filosofía estética, que cuestiona si las obras de arte pueden evaluarse independientemente de sus contextos morales, políticos y sociales, o si deben considerarse necesariamente entrelazadas con estos contextos.",
    ar: "تُعدّ مسألة استقلالية الفن نقاشاً متجذراً في صميم فلسفة الجماليات، يتساءل عمّا إذا كان بالإمكان تقييم الأعمال الفنية بمعزل عن سياقاتها الأخلاقية والسياسية والاجتماعية، أم أنه يجب بالضرورة تناولها بوصفها متشابكة مع هذه السياقات.",
    ru: "Вопрос автономии искусства — это глубоко укоренившаяся дискуссия в центре эстетической философии, ставящая вопрос о том, можно ли оценивать произведения искусства независимо от их моральных, политических и социальных контекстов, или же их необходимо рассматривать как неразрывно связанные с этими контекстами."
  },
  {
    tr: "Özerklik tezi en net ifadesini Kant estetiğinde bulmaktadır.",
    en: "The autonomy thesis finds its clearest expression in Kantian aesthetics.",
    de: "Die Autonomiethese findet ihren klarsten Ausdruck in der kantischen Ästhetik.",
    fr: "La thèse de l'autonomie trouve son expression la plus claire dans l'esthétique kantienne.",
    es: "La tesis de la autonomía encuentra su expresión más clara en la estética kantiana.",
    ar: "تجد أطروحة الاستقلالية تعبيرها الأوضح في الجماليات الكانطية.",
    ru: "Тезис об автономии находит наиболее чёткое выражение в кантианской эстетике."
  },
  {
    tr: "Öte yandan sanatın toplumsal bağlamından koparılamayacağını savunan görüşler yalnızca Marksist estetikle sınırlı değildir.",
    en: "On the other hand, views arguing that art cannot be separated from its social context are not limited to Marxist aesthetics alone.",
    de: "Andererseits beschränken sich die Ansichten, die argumentieren, dass Kunst nicht von ihrem sozialen Kontext getrennt werden kann, nicht allein auf die marxistische Ästhetik.",
    fr: "D'autre part, les perspectives soutenant que l'art ne peut être séparé de son contexte social ne se limitent pas à l'esthétique marxiste seule.",
    es: "Por otro lado, las perspectivas que sostienen que el arte no puede separarse de su contexto social no se limitan únicamente a la estética marxista.",
    ar: "من ناحية أخرى، لا تقتصر الآراء القائلة بأن الفن لا يمكن فصله عن سياقه الاجتماعي على الجماليات الماركسية وحدها.",
    ru: "С другой стороны, взгляды, утверждающие, что искусство неотделимо от своего социального контекста, не ограничиваются лишь марксистской эстетикой."
  },
  {
    tr: "Sorunlu ya da şiddet içerikli eserler sergileyen sanatçıların hedef alındığı iptal kültürü tartışmaları, özerklik meselesini günümüzde yeniden ısıtmıştır.",
    en: "Cancel culture debates targeting artists who exhibit problematic or violent works have reignited the autonomy issue in our time.",
    de: "Die Cancel-Culture-Debatten, die sich gegen Künstler mit problematischen oder gewalthaltigen Werken richten, haben die Autonomiefrage in unserer Zeit neu entfacht.",
    fr: "Les débats sur la culture de l'annulation ciblant des artistes présentant des œuvres problématiques ou violentes ont ravivé la question de l'autonomie à notre époque.",
    es: "Los debates sobre la cultura de la cancelación dirigidos a artistas que exhiben obras problemáticas o violentas han reavivado la cuestión de la autonomía en nuestros tiempos.",
    ar: "أعادت نقاشات ثقافة الإلغاء التي تستهدف فنانين يعرضون أعمالاً إشكالية أو عنيفة إشعال مسألة الاستقلالية في عصرنا.",
    ru: "Дискуссии о культуре отмены, направленные против художников с проблемными или содержащими насилие работами, вновь разожгли вопрос автономии в наше время."
  },
  {
    tr: "Post-kolonyal eleştiri, Batılı estetik standartların evrensel geçerlilik iddiasına köklü biçimde itiraz etmektedir.",
    en: "Postcolonial criticism fundamentally challenges the claim of universal validity of Western aesthetic standards.",
    de: "Die postkoloniale Kritik stellt den Anspruch auf universelle Gültigkeit westlicher ästhetischer Standards grundlegend infrage.",
    fr: "La critique postcoloniale conteste fondamentalement la prétention à la validité universelle des normes esthétiques occidentales.",
    es: "La crítica poscolonial cuestiona fundamentalmente la pretensión de validez universal de los estándares estéticos occidentales.",
    ar: "يعترض النقد ما بعد الاستعماري اعتراضاً جذرياً على ادعاء المعايير الجمالية الغربية بالصلاحية العالمية.",
    ru: "Постколониальная критика фундаментально оспаривает претензию западных эстетических стандартов на универсальную значимость."
  },
  {
    tr: "Dijital çoğaltma sanat nesnesinin tekilliğini ve özgünlüğünü tartışmalı hâle getirmiştir.",
    en: "Digital reproduction has made the singularity and authenticity of the art object controversial.",
    de: "Die digitale Reproduktion hat die Einzigartigkeit und Authentizität des Kunstobjekts kontrovers gemacht.",
    fr: "La reproduction numérique a rendu la singularité et l'authenticité de l'objet d'art controversées.",
    es: "La reproducción digital ha convertido en controvertidas la singularidad y autenticidad del objeto artístico.",
    ar: "جعل الاستنساخ الرقمي تفرّد الموضوع الفني وأصالته محلّ جدل.",
    ru: "Цифровое воспроизведение сделало уникальность и подлинность художественного объекта спорными."
  },
  {
    tr: "Yapay zekanın ürettiği eserlerin sanatsal statüsü, yaratıcı özne kavramını ciddi biçimde sorgulatmaktadır.",
    en: "The artistic status of works produced by artificial intelligence seriously challenges the concept of the creative subject.",
    de: "Der künstlerische Status von durch künstliche Intelligenz erzeugten Werken stellt das Konzept des kreativen Subjekts ernsthaft infrage.",
    fr: "Le statut artistique des œuvres produites par l'intelligence artificielle remet sérieusement en question le concept du sujet créateur.",
    es: "El estatus artístico de las obras producidas por inteligencia artificial cuestiona seriamente el concepto del sujeto creativo.",
    ar: "يُشكّل الوضع الفني للأعمال التي ينتجها الذكاء الاصطناعي تحدياً جدياً لمفهوم الذات المبدعة.",
    ru: "Художественный статус произведений, созданных искусственным интеллектом, серьёзно ставит под сомнение концепцию творческого субъекта."
  },
  {
    tr: "Sanat piyasası ise estetik değer ile ekonomik değerin birbirinden ne ölçüde bağımsız olabileceğini ya da bu ikisinin kaçınılmaz biçimde iç içe geçip geçmediğini bir kez daha gündeme taşımaktadır.",
    en: "The art market once again raises the question of to what extent aesthetic value and economic value can be independent of each other, or whether the two are inevitably intertwined.",
    de: "Der Kunstmarkt wirft erneut die Frage auf, inwieweit ästhetischer und ökonomischer Wert voneinander unabhängig sein können oder ob die beiden unweigerlich miteinander verflochten sind.",
    fr: "Le marché de l'art soulève une fois de plus la question de savoir dans quelle mesure la valeur esthétique et la valeur économique peuvent être indépendantes l'une de l'autre, ou si les deux sont inévitablement imbriquées.",
    es: "El mercado del arte plantea una vez más la cuestión de hasta qué punto el valor estético y el valor económico pueden ser independientes entre sí, o si ambos están inevitablemente entrelazados.",
    ar: "يطرح سوق الفن مجدداً تساؤلاً حول مدى إمكانية استقلال القيمة الجمالية عن القيمة الاقتصادية، أو ما إذا كان الاثنان متشابكين حتماً.",
    ru: "Арт-рынок вновь поднимает вопрос о том, насколько эстетическая и экономическая ценность могут быть независимы друг от друга, или же они неизбежно переплетены."
  }
];

const filePath = path.join(__dirname, 'public', 'js', 'data', 'reading-translations.js');
let content = fs.readFileSync(filePath, 'utf8');

// Remove the closing ]\n}; and add the new topic
content = content.replace(/\s*\]\s*\};\s*$/, '');

// Add comma after last topic, then new topic
content += ',\n    // 8: Sanatın Özerkliği Tartışması\n    [\n';
topic8.forEach((sentence, i) => {
  const line = `      { tr: ${JSON.stringify(sentence.tr)}, en: ${JSON.stringify(sentence.en)}, de: ${JSON.stringify(sentence.de)}, fr: ${JSON.stringify(sentence.fr)}, es: ${JSON.stringify(sentence.es)}, ar: ${JSON.stringify(sentence.ar)}, ru: ${JSON.stringify(sentence.ru)} }`;
  content += line + (i < topic8.length - 1 ? ',\n' : '\n');
});
content += '    ]\n  ]\n};\n';

fs.writeFileSync(filePath, content, 'utf8');
console.log('Topic 8 (Sanatın Özerkliği Tartışması) added successfully!');
