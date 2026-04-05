const fs = require('fs');
const path = require('path');

const topic7 = [
  {
    tr: "Dijital göçebelik, uzaktan çalışma teknolojilerinin yetkinleşmesiyle birlikte belirli bir mekâna bağlı kalmaksızın dünya genelinde dolaşarak çalışan yeni nesil profesyonellerin yaşam biçimini tanımlamaktadır.",
    en: "Digital nomadism defines the lifestyle of a new generation of professionals who work while traveling around the world without being tied to a specific location, enabled by the maturation of remote work technologies.",
    de: "Digitales Nomadentum beschreibt den Lebensstil einer neuen Generation von Fachkräften, die dank ausgereifter Fernarbeitstechnologien ortsungebunden rund um die Welt arbeiten.",
    fr: "Le nomadisme numérique définit le mode de vie d'une nouvelle génération de professionnels qui travaillent en parcourant le monde sans être liés à un lieu précis, grâce à la maturation des technologies de travail à distance.",
    es: "El nomadismo digital define el estilo de vida de una nueva generación de profesionales que trabajan recorriendo el mundo sin estar atados a un lugar específico, gracias a la maduración de las tecnologías de trabajo remoto.",
    ar: "يُعرّف الترحال الرقمي نمط حياة جيل جديد من المهنيين الذين يعملون أثناء تنقلهم حول العالم دون الارتباط بمكان محدد، بفضل نضج تقنيات العمل عن بُعد.",
    ru: "Цифровое кочевничество определяет образ жизни нового поколения профессионалов, которые работают, путешествуя по миру без привязки к определённому месту, благодаря развитию технологий удалённой работы."
  },
  {
    tr: "Dijital göçebeliğin çekiciliği; coğrafi özgürlük, esneklik, farklı kültürlerle karşılaşma olanağı ve özellikle yüksek gelirli ülkelerin yaşam standardını düşük maliyetli destinasyonlarda yakalayabilmenin getirdiği geo-arbitraj avantajından beslenmektedir.",
    en: "The appeal of digital nomadism is fueled by geographical freedom, flexibility, the opportunity to encounter different cultures, and especially the geo-arbitrage advantage of achieving high-income country living standards in low-cost destinations.",
    de: "Die Attraktivität des digitalen Nomadentums speist sich aus geografischer Freiheit, Flexibilität, der Möglichkeit, verschiedene Kulturen kennenzulernen, und insbesondere dem Geo-Arbitrage-Vorteil, den Lebensstandard einkommensstarker Länder an kostengünstigen Standorten zu erreichen.",
    fr: "L'attrait du nomadisme numérique se nourrit de la liberté géographique, de la flexibilité, de la possibilité de rencontrer différentes cultures et surtout de l'avantage du géo-arbitrage permettant d'atteindre le niveau de vie des pays à hauts revenus dans des destinations à faible coût.",
    es: "El atractivo del nomadismo digital se alimenta de la libertad geográfica, la flexibilidad, la oportunidad de encontrarse con diferentes culturas y especialmente la ventaja del geoarbitraje de alcanzar el nivel de vida de países de altos ingresos en destinos de bajo costo.",
    ar: "تتغذى جاذبية الترحال الرقمي من الحرية الجغرافية والمرونة وفرصة التعرف على ثقافات مختلفة، وخاصة ميزة المراجحة الجغرافية التي تتيح تحقيق مستوى معيشة الدول ذات الدخل المرتفع في وجهات منخفضة التكلفة.",
    ru: "Привлекательность цифрового кочевничества питается географической свободой, гибкостью, возможностью знакомства с разными культурами и особенно преимуществом геоарбитража — достижением уровня жизни стран с высоким доходом в недорогих локациях."
  },
  {
    tr: "Bu hareketin ev sahipliği yapılan topluluklar üzerindeki etkileri giderek tartışmalı bir hal almaktadır.",
    en: "The effects of this movement on host communities are becoming increasingly controversial.",
    de: "Die Auswirkungen dieser Bewegung auf die Gastgemeinden werden zunehmend kontrovers diskutiert.",
    fr: "Les effets de ce mouvement sur les communautés d'accueil deviennent de plus en plus controversés.",
    es: "Los efectos de este movimiento sobre las comunidades anfitrionas se están volviendo cada vez más controvertidos.",
    ar: "تزداد الآثار المترتبة على هذه الحركة في المجتمعات المضيفة إثارةً للجدل.",
    ru: "Влияние этого движения на принимающие сообщества становится всё более спорным."
  },
  {
    tr: "Dijital göçebelerin karşılaştığı yasal ve idari güçlükler de son derece karmaşık bir tablo ortaya çıkarmaktadır.",
    en: "The legal and administrative difficulties faced by digital nomads also present an extremely complex picture.",
    de: "Die rechtlichen und administrativen Schwierigkeiten, mit denen digitale Nomaden konfrontiert sind, ergeben ebenfalls ein äußerst komplexes Bild.",
    fr: "Les difficultés juridiques et administratives auxquelles sont confrontés les nomades numériques présentent également un tableau extrêmement complexe.",
    es: "Las dificultades legales y administrativas que enfrentan los nómadas digitales también presentan un panorama extremadamente complejo.",
    ar: "تُشكّل الصعوبات القانونية والإدارية التي يواجهها الرحّالة الرقميون صورة بالغة التعقيد.",
    ru: "Юридические и административные трудности, с которыми сталкиваются цифровые кочевники, также создают чрезвычайно сложную картину."
  },
  {
    tr: "Psikolojik boyutlar açısından dijital göçebelik, kalıcı topluluk bağlarını zayıflatan ve 'üçüncü kültürlü bireyler' olarak adlandırılan demografiyi besleyen kronik bir kökensizlik duygusunu beraberinde getirebilmektedir.",
    en: "In terms of psychological dimensions, digital nomadism can bring a chronic sense of rootlessness that weakens lasting community bonds and feeds the demographic known as 'third culture individuals.'",
    de: "In psychologischer Hinsicht kann digitales Nomadentum ein chronisches Gefühl der Entwurzelung mit sich bringen, das dauerhafte Gemeinschaftsbindungen schwächt und die als 'Drittkultur-Individuen' bezeichnete Bevölkerungsgruppe nährt.",
    fr: "Sur le plan psychologique, le nomadisme numérique peut engendrer un sentiment chronique de déracinement qui affaiblit les liens communautaires durables et alimente la démographie qualifiée d'« individus de troisième culture ».",
    es: "En términos psicológicos, el nomadismo digital puede traer consigo un sentimiento crónico de desarraigo que debilita los vínculos comunitarios duraderos y alimenta la demografía conocida como 'individuos de tercera cultura.'",
    ar: "من الناحية النفسية، قد يجلب الترحال الرقمي شعوراً مزمناً بالاقتلاع يُضعف الروابط المجتمعية الدائمة ويُغذي الفئة الديموغرافية المعروفة بـ'أفراد الثقافة الثالثة'.",
    ru: "С психологической точки зрения цифровое кочевничество может приносить хроническое чувство бескорневности, ослабляющее устойчивые общественные связи и питающее демографическую группу, известную как «люди третьей культуры»."
  },
  {
    tr: "Sürdürülebilirlik kaygıları da bu yaşam biçiminin giderek daha fazla sorgulanmasına neden olmaktadır.",
    en: "Sustainability concerns are also causing this lifestyle to be increasingly questioned.",
    de: "Nachhaltigkeitsbedenken führen ebenfalls dazu, dass dieser Lebensstil zunehmend infrage gestellt wird.",
    fr: "Les préoccupations en matière de durabilité conduisent également à une remise en question croissante de ce mode de vie.",
    es: "Las preocupaciones sobre la sostenibilidad también están provocando que este estilo de vida sea cada vez más cuestionado.",
    ar: "تُسهم مخاوف الاستدامة أيضاً في تزايد التساؤلات حول نمط الحياة هذا.",
    ru: "Опасения относительно устойчивости также приводят к тому, что этот образ жизни всё чаще ставится под сомнение."
  },
  {
    tr: "Dijital göçebeliğin işgücü piyasaları üzerindeki etkileri coğrafi sınırları aşmaktadır.",
    en: "The effects of digital nomadism on labor markets transcend geographical boundaries.",
    de: "Die Auswirkungen des digitalen Nomadentums auf die Arbeitsmärkte überschreiten geografische Grenzen.",
    fr: "Les effets du nomadisme numérique sur les marchés du travail transcendent les frontières géographiques.",
    es: "Los efectos del nomadismo digital en los mercados laborales trascienden las fronteras geográficas.",
    ar: "تتجاوز آثار الترحال الرقمي على أسواق العمل الحدود الجغرافية.",
    ru: "Влияние цифрового кочевничества на рынки труда выходит за географические границы."
  },
  {
    tr: "Dijital göçebeliğin bir geçiş aşaması mı yoksa kalıcı bir yaşam biçimi mi olduğu sorusu henüz yanıtsız kalmaktadır.",
    en: "The question of whether digital nomadism is a transitional phase or a permanent lifestyle remains unanswered.",
    de: "Die Frage, ob digitales Nomadentum eine Übergangsphase oder eine dauerhafte Lebensform ist, bleibt bislang unbeantwortet.",
    fr: "La question de savoir si le nomadisme numérique est une phase de transition ou un mode de vie permanent reste sans réponse.",
    es: "La pregunta de si el nomadismo digital es una fase de transición o un estilo de vida permanente permanece sin respuesta.",
    ar: "لا يزال السؤال حول ما إذا كان الترحال الرقمي مرحلة انتقالية أم نمط حياة دائم بلا إجابة.",
    ru: "Вопрос о том, является ли цифровое кочевничество переходным этапом или постоянным образом жизни, пока остаётся без ответа."
  }
];

const filePath = path.join(__dirname, 'public', 'js', 'data', 'reading-translations.js');
let content = fs.readFileSync(filePath, 'utf8');

// Remove the closing ]\n}; and add the new topic
content = content.replace(/\s*\]\s*\};\s*$/, '');

// Add comma after last topic, then new topic
content += ',\n    // 7: Dijital Göçebelik\n    [\n';
topic7.forEach((sentence, i) => {
  const line = `      { tr: ${JSON.stringify(sentence.tr)}, en: ${JSON.stringify(sentence.en)}, de: ${JSON.stringify(sentence.de)}, fr: ${JSON.stringify(sentence.fr)}, es: ${JSON.stringify(sentence.es)}, ar: ${JSON.stringify(sentence.ar)}, ru: ${JSON.stringify(sentence.ru)} }`;
  content += line + (i < topic7.length - 1 ? ',\n' : '\n');
});
content += '    ]\n  ]\n};\n';

fs.writeFileSync(filePath, content, 'utf8');
console.log('Topic 7 (Dijital Göçebelik) added successfully!');
