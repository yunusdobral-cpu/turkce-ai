// Blog View

const BLOG_POSTS = [
  {
    id: 'is-turkish-hard-to-learn',
    title: 'Türkçe Öğrenmek Gerçekten Zor mu?',
    titleEn: 'Is Turkish Really Hard to Learn?',
    date: '2026-04-20',
    category: 'Başlangıç',
    categoryEn: 'Beginner',
    summary: 'Pek çok kaynak Türkçeyi "en zor dillerden biri" olarak gösterir. Ama gerçek bu kadar korkutucu değil.',
    summaryEn: 'Many sources list Turkish as one of the hardest languages. But the reality is far less scary than you think.',
    titles: {
      tr: 'Türkçe Öğrenmek Gerçekten Zor mu?',
      en: 'Is Turkish Really Hard to Learn?',
      es: '¿Es Realmente Difícil Aprender Turco?',
      ar: 'هل تعلم اللغة التركية صعب حقاً؟',
      ru: 'Действительно ли трудно учить турецкий?',
      de: 'Ist Türkisch wirklich schwer zu lernen?',
      fr: 'Le turc est-il vraiment difficile à apprendre ?'
    },
    categories: {
      tr: 'Başlangıç',
      en: 'Beginner',
      es: 'Principiante',
      ar: 'مبتدئ',
      ru: 'Начинающий',
      de: 'Anfänger',
      fr: 'Débutant'
    },
    summaries: {
      tr: 'Pek çok kaynak Türkçeyi "en zor dillerden biri" olarak gösterir. Ama gerçek bu kadar korkutucu değil.',
      en: 'Many sources list Turkish as one of the hardest languages. But the reality is far less scary than you think.',
      es: 'Muchas fuentes clasifican el turco como uno de los idiomas más difíciles. Pero la realidad es mucho menos aterradora de lo que crees.',
      ar: 'تصنّف كثير من المصادر التركية كأحد أصعب اللغات. لكن الواقع أقل إثارة للرعب مما تتخيل.',
      ru: 'Многие источники называют турецкий одним из самых сложных языков. Но реальность гораздо менее пугающая, чем вы думаете.',
      de: 'Viele Quellen listen Türkisch als eine der schwierigsten Sprachen auf. Aber die Realität ist viel weniger beängstigend, als du denkst.',
      fr: 'De nombreuses sources classent le turc parmi les langues les plus difficiles. Mais la réalité est bien moins effrayante que vous ne le pensez.'
    },
    bodies: {
      en: `
        <p>If you've ever Googled "how hard is Turkish," you've probably stumbled across the Foreign Service Institute's ranking, which puts Turkish in Category IV — the hardest tier for English speakers, estimating around 1,100 hours to reach professional proficiency.</p>
        <p>That sounds daunting. But here's what those rankings don't tell you.</p>

        <h2>What Makes Turkish Difficult</h2>
        <p>Turkish is an agglutinative language — meaning it builds meaning by stacking suffixes onto a root word, rather than using separate words. Where English says "I could not come," Turkish compresses this into a single word: <em>gelemezdim</em>.</p>
        <p>This takes time to internalize. The rules are consistent, but there are many of them, and they interact with vowel harmony — a system where the vowels in suffixes change to match the vowels in the root word.</p>
        <div class="example-box">
          <span>ev</span> (house) → evde (in the house) → evden (from the house)<br>
          <span>şehir</span> (city) → şehirde (in the city) → şehirden (from the city)
        </div>
        <p>Notice how the suffix vowel shifts from "e" to match the root? That's vowel harmony in action.</p>

        <h2>What Makes Turkish Easier Than You Think</h2>
        <p>Here's the good news: Turkish is almost completely phonetic. Every letter makes exactly one sound, and every sound is written exactly the same way. No silent letters, no "ough" problem.</p>
        <ul>
          <li><strong>No grammatical gender.</strong> Every noun is just a noun — no masculine/feminine/neuter to memorize.</li>
          <li><strong>No irregular plurals.</strong> Add -ler or -lar to any noun. Done.</li>
          <li><strong>Consistent verb conjugation.</strong> The suffixes follow rules, and the rules don't have many exceptions.</li>
          <li><strong>Word order is flexible.</strong> Turkish is SOV (Subject-Object-Verb) but the order can shift for emphasis without changing meaning.</li>
        </ul>

        <h2>The Realistic Timeline</h2>
        <p>Most learners reach basic conversational Turkish (A2-B1) in 6–12 months with consistent daily practice of 30–45 minutes. Reaching B2 (comfortable fluency) typically takes 2–3 years.</p>
        <div class="highlight">The biggest predictor of success in Turkish is not talent — it's consistency. Ten minutes every day beats two hours on weekends.</div>

        <h2>Where to Start</h2>
        <p>Start with these three pillars:</p>
        <ol>
          <li><strong>Vocabulary</strong> — The top 500 words cover ~75% of everyday conversation. Start there.</li>
          <li><strong>Pronunciation</strong> — Learn the alphabet sounds first. It takes one afternoon and pays off forever.</li>
          <li><strong>Basic sentence structure</strong> — Subject + Object + Verb. Practice simple sentences before grammar rules.</li>
        </ol>
        <p>Turkish is not easy. But it is learnable — and it rewards patience with a language that, once you get it, feels remarkably logical.</p>
      `,
      es: `
        <p>Si alguna vez has buscado en Google "qué tan difícil es el turco", probablemente hayas encontrado la clasificación del Foreign Service Institute, que sitúa el turco en la Categoría IV — el nivel más difícil para hablantes de inglés, estimando unas 1.100 horas para alcanzar fluidez profesional.</p>
        <p>Eso suena intimidante. Pero esto es lo que esas clasificaciones no te dicen.</p>

        <h2>Qué hace difícil al turco</h2>
        <p>El turco es una lengua aglutinante — es decir, construye el significado apilando sufijos sobre una raíz, en lugar de usar palabras separadas. Donde el español dice "no pude venir," el turco comprime esto en una sola palabra: <em>gelemezdim</em>.</p>
        <p>Esto lleva tiempo asimilarlo. Las reglas son consistentes, pero hay muchas, y se combinan con la armonía vocálica — un sistema en el que las vocales de los sufijos cambian para coincidir con las vocales de la raíz.</p>
        <div class="example-box">
          <span>ev</span> (casa) → evde (en la casa) → evden (desde la casa)<br>
          <span>şehir</span> (ciudad) → şehirde (en la ciudad) → şehirden (desde la ciudad)
        </div>
        <p>¿Notas cómo la vocal del sufijo cambia para coincidir con la raíz? Eso es la armonía vocálica en acción.</p>

        <h2>Qué hace al turco más fácil de lo que crees</h2>
        <p>Buenas noticias: el turco es casi completamente fonético. Cada letra produce exactamente un sonido, y cada sonido se escribe siempre de la misma manera. Sin letras mudas, sin irregularidades.</p>
        <ul>
          <li><strong>Sin género gramatical.</strong> Cada sustantivo es simplemente un sustantivo — sin masculino/femenino/neutro que memorizar.</li>
          <li><strong>Sin plurales irregulares.</strong> Agrega -ler o -lar a cualquier sustantivo. Listo.</li>
          <li><strong>Conjugación verbal consistente.</strong> Los sufijos siguen reglas, y las reglas tienen pocas excepciones.</li>
          <li><strong>Orden de palabras flexible.</strong> El turco es SOV (Sujeto-Objeto-Verbo) pero el orden puede cambiar para dar énfasis sin cambiar el significado.</li>
        </ul>

        <h2>El cronograma realista</h2>
        <p>La mayoría de los aprendices alcanzan un turco conversacional básico (A2-B1) en 6 a 12 meses con práctica diaria constante de 30 a 45 minutos. Llegar a B2 (fluidez cómoda) generalmente toma 2 a 3 años.</p>
        <div class="highlight">El mayor predictor del éxito en turco no es el talento — es la constancia. Diez minutos cada día supera dos horas los fines de semana.</div>

        <h2>Por dónde empezar</h2>
        <p>Comienza con estos tres pilares:</p>
        <ol>
          <li><strong>Vocabulario</strong> — Las 500 palabras más frecuentes cubren ~75% de las conversaciones cotidianas. Empieza ahí.</li>
          <li><strong>Pronunciación</strong> — Aprende primero los sonidos del alfabeto. Te tomará una tarde y te beneficiará para siempre.</li>
          <li><strong>Estructura básica de oraciones</strong> — Sujeto + Objeto + Verbo. Practica oraciones simples antes de las reglas gramaticales.</li>
        </ol>
        <p>El turco no es fácil. Pero se puede aprender — y recompensa la paciencia con un idioma que, una vez que lo entiendes, resulta notablemente lógico.</p>
      `,
      ar: `
        <p>إذا بحثت يومًا على الإنترنت عن "مدى صعوبة اللغة التركية"، فربما صادفت تصنيف معهد الخدمة الخارجية الأمريكي، الذي يضع التركية في الفئة الرابعة — أصعب مستوى للناطقين بالعربية، مع تقدير يبلغ نحو 1,100 ساعة للوصول إلى إتقان مهني.</p>
        <p>يبدو ذلك مخيفًا. لكن إليك ما لا تخبرك به تلك التصنيفات.</p>

        <h2>ما الذي يجعل التركية صعبة</h2>
        <p>التركية لغة إلصاقية — أي أنها تبني المعنى بإضافة لواحق على الجذر، بدلًا من استخدام كلمات منفصلة. فبدلًا من قول "لم أستطع المجيء"، تضغط التركية هذا في كلمة واحدة: <em>gelemezdim</em>.</p>
        <p>يستغرق استيعاب هذا وقتًا. القواعد منتظمة، لكنها كثيرة، وتتفاعل مع التناسق الصوتي — نظام تتغير فيه حركات اللواحق لتتطابق مع حركات الجذر.</p>
        <div class="example-box">
          <span>ev</span> (بيت) → evde (في البيت) → evden (من البيت)<br>
          <span>şehir</span> (مدينة) → şehirde (في المدينة) → şehirden (من المدينة)
        </div>
        <p>لاحظ كيف تتغير حركة اللاحقة لتتطابق مع الجذر؟ هذا هو التناسق الصوتي في العمل.</p>

        <h2>ما الذي يجعل التركية أسهل مما تتخيل</h2>
        <p>البشرى السارة: التركية شبه نطقية تمامًا. كل حرف يصدر صوتًا واحدًا بالضبط، وكل صوت يُكتب بالطريقة ذاتها دائمًا. لا حروف صامتة، لا استثناءات محيرة.</p>
        <ul>
          <li><strong>لا جنس نحوي.</strong> كل اسم هو مجرد اسم — لا مذكر أو مؤنث أو محايد لحفظه.</li>
          <li><strong>لا جمع شاذ.</strong> أضف -ler أو -lar لأي اسم. انتهى الأمر.</li>
          <li><strong>تصريف فعلي منتظم.</strong> اللواحق تتبع قواعد، وهذه القواعد لها استثناءات قليلة.</li>
          <li><strong>ترتيب الكلمات مرن.</strong> التركية ذات ترتيب فاعل-مفعول-فعل، لكن يمكن تغييره للتأكيد دون تغيير المعنى.</li>
        </ul>

        <h2>الجدول الزمني الواقعي</h2>
        <p>يصل معظم المتعلمين إلى مستوى محادثة أساسي في التركية (A2-B1) خلال 6 إلى 12 شهرًا مع ممارسة يومية منتظمة من 30 إلى 45 دقيقة. الوصول إلى B2 (طلاقة مريحة) يستغرق عادةً 2 إلى 3 سنوات.</p>
        <div class="highlight">أكبر عامل للنجاح في التركية ليس الموهبة — بل الانتظام. عشر دقائق كل يوم تتفوق على ساعتين في نهاية الأسبوع.</div>

        <h2>من أين تبدأ</h2>
        <p>ابدأ بهذه الركائز الثلاث:</p>
        <ol>
          <li><strong>المفردات</strong> — أكثر 500 كلمة شيوعًا تغطي ~75% من المحادثات اليومية. ابدأ من هنا.</li>
          <li><strong>النطق</strong> — تعلم أصوات الحروف أولًا. يستغرق ذلك بعد ظهر واحد ويؤتي ثماره إلى الأبد.</li>
          <li><strong>بنية الجملة الأساسية</strong> — فاعل + مفعول + فعل. تدرب على جمل بسيطة قبل قواعد النحو.</li>
        </ol>
        <p>التركية ليست سهلة. لكنها قابلة للتعلم — وتكافئ الصبر بلغة، حين تستوعبها، تبدو منطقية بشكل لافت.</p>
      `,
      ru: `
        <p>Если вы когда-нибудь искали в Google «насколько сложен турецкий», вы, вероятно, наталкивались на рейтинг Института иностранной службы США, который относит турецкий к категории IV — самому сложному уровню, оценивая около 1100 часов для достижения профессионального владения.</p>
        <p>Это звучит пугающе. Но вот что эти рейтинги не говорят вам.</p>

        <h2>Что делает турецкий сложным</h2>
        <p>Турецкий — агглютинативный язык: он строит смысл, добавляя суффиксы к корню слова, а не используя отдельные слова. Там, где русский говорит «я не смог прийти», турецкий сжимает это в одно слово: <em>gelemezdim</em>.</p>
        <p>На усвоение этого уходит время. Правила последовательны, но их много, и они взаимодействуют с гармонией гласных — системой, в которой гласные в суффиксах изменяются, чтобы соответствовать гласным корня.</p>
        <div class="example-box">
          <span>ev</span> (дом) → evde (в доме) → evden (из дома)<br>
          <span>şehir</span> (город) → şehirde (в городе) → şehirden (из города)
        </div>
        <p>Замечаете, как гласная суффикса меняется, чтобы совпасть с корнем? Это гармония гласных в действии.</p>

        <h2>Что делает турецкий проще, чем вы думаете</h2>
        <p>Хорошая новость: турецкий почти полностью фонетичен. Каждая буква издаёт ровно один звук, и каждый звук всегда пишется одинаково. Никаких немых букв, никаких странных исключений.</p>
        <ul>
          <li><strong>Нет грамматического рода.</strong> Каждое существительное — просто существительное, без мужского/женского/среднего рода.</li>
          <li><strong>Нет неправильных множественных чисел.</strong> Добавьте -ler или -lar к любому существительному. Готово.</li>
          <li><strong>Последовательное спряжение глаголов.</strong> Суффиксы следуют правилам, и исключений немного.</li>
          <li><strong>Гибкий порядок слов.</strong> Турецкий — SOV (подлежащее-дополнение-сказуемое), но порядок может меняться для акцента без изменения смысла.</li>
        </ul>

        <h2>Реалистичные сроки</h2>
        <p>Большинство учащихся достигают базового разговорного уровня (A2-B1) за 6–12 месяцев при ежедневных занятиях по 30–45 минут. Достижение B2 (уверенного владения) обычно занимает 2–3 года.</p>
        <div class="highlight">Главный предсказатель успеха в турецком — не талант, а последовательность. Десять минут каждый день лучше, чем два часа в выходные.</div>

        <h2>С чего начать</h2>
        <p>Начните с трёх столпов:</p>
        <ol>
          <li><strong>Словарный запас</strong> — 500 самых частотных слов покрывают ~75% повседневных разговоров. Начните с них.</li>
          <li><strong>Произношение</strong> — Сначала выучите звуки алфавита. Это займёт один вечер и окупится навсегда.</li>
          <li><strong>Базовая структура предложений</strong> — Подлежащее + Дополнение + Сказуемое. Практикуйте простые предложения, прежде чем переходить к грамматике.</li>
        </ol>
        <p>Турецкий нелёгок. Но его можно выучить — и он вознаграждает терпение языком, который, когда вы его постигаете, кажется поразительно логичным.</p>
      `,
      de: `
        <p>Wenn du jemals nach "wie schwer ist Türkisch" gegoogelt hast, bist du wahrscheinlich auf die Rangliste des Foreign Service Institute gestoßen, das Türkisch in Kategorie IV einordnet — die schwierigste Stufe für englischsprachige Lernende, mit etwa 1.100 geschätzten Stunden bis zur professionellen Beherrschung.</p>
        <p>Das klingt entmutigend. Aber hier ist, was diese Rankings dir nicht sagen.</p>

        <h2>Was Türkisch schwierig macht</h2>
        <p>Türkisch ist eine agglutinierende Sprache — das bedeutet, sie baut Bedeutung auf, indem sie Suffixe an eine Wortwurzel anhängt, anstatt separate Wörter zu verwenden. Wo das Deutsche sagt "ich konnte nicht kommen", verdichtet Türkisch das in ein einziges Wort: <em>gelemezdim</em>.</p>
        <p>Das braucht Zeit zum Verinnerlichen. Die Regeln sind konsistent, aber es gibt viele davon, und sie interagieren mit der Vokalharmonie — ein System, bei dem sich die Vokale in Suffixen ändern, um den Vokalen der Wortwurzel zu entsprechen.</p>
        <div class="example-box">
          <span>ev</span> (Haus) → evde (im Haus) → evden (aus dem Haus)<br>
          <span>şehir</span> (Stadt) → şehirde (in der Stadt) → şehirden (aus der Stadt)
        </div>
        <p>Siehst du, wie sich der Suffix-Vokal ändert, um zur Wurzel zu passen? Das ist Vokalharmonie in Aktion.</p>

        <h2>Was Türkisch einfacher macht, als du denkst</h2>
        <p>Hier sind gute Nachrichten: Türkisch ist fast vollständig phonetisch. Jeder Buchstabe hat genau einen Laut, und jeder Laut wird immer gleich geschrieben. Keine stummen Buchstaben, keine verwirrenden Ausnahmen.</p>
        <ul>
          <li><strong>Kein grammatisches Geschlecht.</strong> Jedes Substantiv ist einfach ein Substantiv — kein maskulin/feminin/neutrum zum Auswendiglernen.</li>
          <li><strong>Keine unregelmäßigen Plurale.</strong> Hänge -ler oder -lar an jedes Substantiv. Fertig.</li>
          <li><strong>Konsequente Verbkonjugation.</strong> Die Suffixe folgen Regeln, und die Regeln haben wenige Ausnahmen.</li>
          <li><strong>Flexible Wortstellung.</strong> Türkisch ist SOV (Subjekt-Objekt-Verb), aber die Reihenfolge kann sich zur Betonung verschieben, ohne die Bedeutung zu ändern.</li>
        </ul>

        <h2>Der realistische Zeitrahmen</h2>
        <p>Die meisten Lernenden erreichen grundlegendes Gesprächstürkisch (A2-B1) in 6–12 Monaten mit konsequentem täglichen Üben von 30–45 Minuten. B2 (komfortable Flüssigkeit) zu erreichen, dauert typischerweise 2–3 Jahre.</p>
        <div class="highlight">Der größte Erfolgsprädiktor im Türkischen ist nicht Talent — es ist Beständigkeit. Zehn Minuten jeden Tag schlagen zwei Stunden am Wochenende.</div>

        <h2>Wo fange ich an</h2>
        <p>Beginne mit diesen drei Säulen:</p>
        <ol>
          <li><strong>Vokabular</strong> — Die häufigsten 500 Wörter decken ~75% der Alltagsgespräche ab. Fang dort an.</li>
          <li><strong>Aussprache</strong> — Lerne zuerst die Alphabetlaute. Es dauert einen Nachmittag und zahlt sich für immer aus.</li>
          <li><strong>Grundlegende Satzstruktur</strong> — Subjekt + Objekt + Verb. Übe einfache Sätze, bevor du mit Grammatikregeln anfängst.</li>
        </ol>
        <p>Türkisch ist nicht einfach. Aber es ist lernbar — und es belohnt Geduld mit einer Sprache, die sich, wenn man sie einmal versteht, bemerkenswert logisch anfühlt.</p>
      `,
      fr: `
        <p>Si vous avez déjà cherché sur Google "à quel point le turc est difficile", vous avez probablement rencontré le classement du Foreign Service Institute américain, qui place le turc en Catégorie IV — le niveau le plus difficile pour les locuteurs natifs, estimant environ 1 100 heures pour atteindre une maîtrise professionnelle.</p>
        <p>Cela semble intimidant. Mais voici ce que ces classements ne vous disent pas.</p>

        <h2>Ce qui rend le turc difficile</h2>
        <p>Le turc est une langue agglutinante — c'est-à-dire qu'il construit le sens en empilant des suffixes sur une racine, plutôt qu'en utilisant des mots séparés. Là où le français dit "je n'ai pas pu venir", le turc comprime cela en un seul mot : <em>gelemezdim</em>.</p>
        <p>Cela prend du temps à intérioriser. Les règles sont cohérentes, mais elles sont nombreuses, et elles interagissent avec l'harmonie vocalique — un système où les voyelles des suffixes changent pour correspondre aux voyelles de la racine.</p>
        <div class="example-box">
          <span>ev</span> (maison) → evde (dans la maison) → evden (de la maison)<br>
          <span>şehir</span> (ville) → şehirde (dans la ville) → şehirden (de la ville)
        </div>
        <p>Vous remarquez comment la voyelle du suffixe change pour correspondre à la racine ? C'est l'harmonie vocalique en action.</p>

        <h2>Ce qui rend le turc plus facile que vous ne le pensez</h2>
        <p>Bonne nouvelle : le turc est presque entièrement phonétique. Chaque lettre produit exactement un son, et chaque son s'écrit toujours de la même façon. Pas de lettres muettes, pas d'exceptions déroutantes.</p>
        <ul>
          <li><strong>Pas de genre grammatical.</strong> Chaque nom est simplement un nom — pas de masculin/féminin/neutre à mémoriser.</li>
          <li><strong>Pas de pluriels irréguliers.</strong> Ajoutez -ler ou -lar à n'importe quel nom. C'est tout.</li>
          <li><strong>Conjugaison verbale cohérente.</strong> Les suffixes suivent des règles, et ces règles ont peu d'exceptions.</li>
          <li><strong>Ordre des mots flexible.</strong> Le turc est SOV (Sujet-Objet-Verbe), mais l'ordre peut varier pour l'emphase sans changer le sens.</li>
        </ul>

        <h2>Le calendrier réaliste</h2>
        <p>La plupart des apprenants atteignent un turc conversationnel de base (A2-B1) en 6 à 12 mois avec une pratique quotidienne régulière de 30 à 45 minutes. Atteindre B2 (aisance confortable) prend généralement 2 à 3 ans.</p>
        <div class="highlight">Le plus grand facteur de succès en turc n'est pas le talent — c'est la régularité. Dix minutes chaque jour valent mieux que deux heures le week-end.</div>

        <h2>Par où commencer</h2>
        <p>Commencez par ces trois piliers :</p>
        <ol>
          <li><strong>Vocabulaire</strong> — Les 500 mots les plus fréquents couvrent ~75% des conversations quotidiennes. Commencez par là.</li>
          <li><strong>Prononciation</strong> — Apprenez d'abord les sons de l'alphabet. Cela prend un après-midi et vous sera utile pour toujours.</li>
          <li><strong>Structure de phrase de base</strong> — Sujet + Objet + Verbe. Pratiquez des phrases simples avant les règles de grammaire.</li>
        </ol>
        <p>Le turc n'est pas facile. Mais il est accessible — et il récompense la patience avec une langue qui, une fois comprise, semble remarquablement logique.</p>
      `
    }
  },
  {
    id: 'common-turkish-mistakes',
    title: 'Türkçede En Çok Yapılan 5 Hata',
    titleEn: '5 Most Common Mistakes Turkish Learners Make',
    date: '2026-04-23',
    category: 'İpuçları',
    categoryEn: 'Tips',
    summary: 'Bu hataları erken fark ederseniz, çok zaman kazanırsınız. Hepsinin arkasında mantıklı bir açıklama var.',
    summaryEn: 'Spot these mistakes early and save yourself months of confusion. Each one has a logical explanation.',
    body: `
      <p>Every Turkish learner makes these mistakes. The good news: they're all fixable once you understand why they happen.</p>

      <h2>1. Forgetting Vowel Harmony on Suffixes</h2>
      <p>This is the #1 mistake. Learners memorize that "in/at" is expressed with <em>-de</em>, then write <em>okulde</em> (at school) instead of the correct <em>okulda</em>.</p>
      <div class="example-box">
        ❌ okulde &nbsp;&nbsp; ✅ <span>okulda</span> (at school)<br>
        ❌ evde is correct! — because ev has a front vowel<br>
        ✅ <span>okulda</span> — okul has a back vowel (u), so suffix becomes -da
      </div>
      <p>The fix: always check the last vowel of the root word before adding a suffix.</p>

      <h2>2. Translating Word for Word from English</h2>
      <p>English: "I am hungry." Turkish: <em>Açım</em> — literally "I am hungry-I" in one word. Trying to build Turkish sentences with English structure leads to unnatural output.</p>
      <div class="example-box">
        ❌ Ben aç am &nbsp;&nbsp; ✅ <span>Açım</span><br>
        ❌ Ben gitmek istiyorum (almost right, but formal/stiff)<br>
        ✅ <span>Gitmek istiyorum</span> (subject is implied)
      </div>

      <h2>3. Misusing "var" and "yok"</h2>
      <p><em>Var</em> (there is/I have) and <em>yok</em> (there isn't/I don't have) are some of the most used words in Turkish — and the most misused.</p>
      <div class="example-box">
        "I have a cat" → <span>Kedim var</span> (literally: My cat exists)<br>
        "I don't have time" → <span>Zamanım yok</span> (My time doesn't exist)
      </div>
      <p>You don't "have" things in Turkish. Things "exist" in relation to you. Shift your mental model.</p>

      <h2>4. Overusing "Ben" (I)</h2>
      <p>In English, you always say "I." In Turkish, the subject pronoun is built into the verb suffix, so repeating <em>ben</em> constantly sounds emphatic or unnatural.</p>
      <div class="example-box">
        ❌ Ben gidiyorum, ben yiyorum, ben uyuyorum<br>
        ✅ <span>Gidiyorum, yiyorum, uyuyorum</span>
      </div>
      <p>Use <em>ben</em> only when you want to emphasize contrast: "I am going (not you)."</p>

      <h2>5. Pronouncing "ı" Like "i"</h2>
      <p>Turkish has two different i-sounds: <em>i</em> (like English "ee") and <em>ı</em> (a back vowel with no English equivalent — like the "u" in "bus" but further back). Confusing them changes word meanings.</p>
      <div class="example-box">
        <span>iş</span> = work &nbsp;&nbsp; <span>ış</span>ık = light<br>
        <span>bir</span> = one &nbsp;&nbsp; <span>bır</span> (not a word)
      </div>
      <p>Practice: say "uh" while slowly pulling your tongue back and rounding your lips slightly. That's the ı sound.</p>
    `
  },
  {
    id: 'turkish-breakfast-culture',
    title: 'Türk Kahvaltısı: Sadece Yemek Değil, Bir Kültür',
    titleEn: 'Turkish Breakfast: More Than Just a Meal',
    date: '2026-04-27',
    category: 'Kültür',
    categoryEn: 'Culture',
    summary: 'Türk kahvaltısı dünyada eşi benzeri olmayan bir deneyim. Neden bu kadar özel, ve nasıl sipariş edilir?',
    summaryEn: 'Turkish breakfast is a unique experience in the world. Why is it so special, and how do you order one?',
    body: `
      <p>In Turkey, breakfast is not a meal you rush through. It is an event. On weekends especially, Turkish families gather around a table loaded with small plates — sometimes 20 or more — and spend two to three hours eating, talking, and drinking endless glasses of tea.</p>
      <p>Understanding Turkish breakfast is a window into Turkish culture itself: hospitality, abundance, and the value of shared time.</p>

      <h2>What's on the Table</h2>
      <p>A traditional Turkish breakfast (Türk kahvaltısı) typically includes:</p>
      <ul>
        <li><strong>Peynir</strong> (cheese) — usually at least two types: white cheese similar to feta, and a mild yellow cheese</li>
        <li><strong>Zeytin</strong> (olives) — both black and green, often marinated</li>
        <li><strong>Domates ve salatalık</strong> (tomatoes and cucumber) — sliced fresh</li>
        <li><strong>Yumurta</strong> (eggs) — scrambled, fried, or <em>menemen</em> (eggs cooked with tomatoes and peppers)</li>
        <li><strong>Bal ve kaymak</strong> (honey and clotted cream) — eaten together on fresh bread</li>
        <li><strong>Reçel</strong> (jam) — often rose, fig, or strawberry</li>
        <li><strong>Simit</strong> — a sesame-crusted bread ring, the backbone of Turkish street food</li>
        <li><strong>Börek</strong> — flaky pastry filled with cheese, spinach, or meat</li>
      </ul>

      <h2>The Role of Tea</h2>
      <p>No Turkish breakfast is complete without <em>çay</em> — black tea brewed strong in a two-tiered teapot called a <em>çaydanlık</em>, then diluted to taste with hot water. It is served in small tulip-shaped glasses, never with milk.</p>
      <div class="highlight">"Çay içer misiniz?" — Would you like tea? This question is the beginning of almost every social interaction in Turkey.</div>
      <p>Turks drink an average of 3.5 kg of tea per person per year — the highest consumption in the world.</p>

      <h2>Useful Phrases for Breakfast</h2>
      <div class="example-box">
        <span>Kahvaltı nerede?</span> — Where is breakfast?<br>
        <span>Biraz daha çay alabilir miyim?</span> — Can I have a little more tea?<br>
        <span>Menemen var mı?</span> — Do you have menemen?<br>
        <span>Çok lezzetli!</span> — Very delicious!<br>
        <span>Hesap lütfen.</span> — The bill, please.
      </div>

      <h2>Van Kahvaltısı: A Special Case</h2>
      <p>If you ever travel to eastern Turkey, seek out a Van-style breakfast. The city of Van in eastern Anatolia is famous for having the most elaborate breakfast spread in the country — up to 40 different items, including local herbs, several types of cheese unique to the region, and a special type of cream called <em>Van tereyağı</em>.</p>
      <p>Restaurants in Istanbul and other cities have started serving Van breakfasts for weekend brunch, usually priced per person and served as a full spread.</p>

      <h2>The Word to Know</h2>
      <p>The word <em>kahvaltı</em> itself is telling: <em>kahve</em> (coffee) + <em>altı</em> (under/before) = "what you eat before coffee." Originally, breakfast was the meal that preceded the morning coffee ritual. Today, tea has largely replaced coffee at the breakfast table, but the name remains.</p>
    `
  }
];

function formatBlogDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' });
}

function getPostField(post, field, lang) {
  const pluralKey = field === 'body' ? 'bodies' : field + 's';
  if (post[pluralKey] && post[pluralKey][lang]) return post[pluralKey][lang];
  if (post[pluralKey] && post[pluralKey]['en']) return post[pluralKey]['en'];
  if (field === 'title') return lang === 'tr' ? post.title : (post.titleEn || post.title);
  if (field === 'category') return lang === 'tr' ? post.category : (post.categoryEn || post.category);
  if (field === 'summary') return lang === 'tr' ? post.summary : (post.summaryEn || post.summary);
  return post.body || '';
}

function renderBlog(container) {
  const lang = (typeof I18N !== 'undefined' ? I18N.getLang() : null) || 'en';
  container.innerHTML = `
    <div class="blog-page">
      <div class="blog-header">
        <h1>Blog</h1>
        <p>Türkçe öğrenme rehberleri, kültür yazıları ve ipuçları / Guides, culture & tips for Turkish learners</p>
      </div>
      <div class="blog-grid">
        ${BLOG_POSTS.map(post => `
          <a class="blog-card" href="#/blog/${post.id}">
            <div class="blog-card-meta">
              <span class="blog-card-cat">${getPostField(post, 'category', lang)}</span>
              <span class="blog-card-date">${formatBlogDate(post.date)}</span>
            </div>
            <h2>${getPostField(post, 'title', lang)}</h2>
            <p>${getPostField(post, 'summary', lang)}</p>
            <span class="blog-card-read">Read more →</span>
          </a>
        `).join('')}
      </div>
    </div>
  `;
  window.scrollTo(0, 0);
}

function renderBlogPost(container, id) {
  const post = BLOG_POSTS.find(p => p.id === id);
  if (!post) {
    container.innerHTML = `<div style="text-align:center;padding:3rem"><p>Yazı bulunamadı.</p><a href="#/blog">← Blog'a dön</a></div>`;
    return;
  }
  const lang = (typeof I18N !== 'undefined' ? I18N.getLang() : null) || 'en';
  const body = getPostField(post, 'body', lang);
  const isRtl = lang === 'ar';
  container.innerHTML = `
    <div class="blog-page">
      <div class="blog-post">
        <button class="blog-back" onclick="location.hash='#/blog'">← Blog</button>
        <div class="blog-post-header">
          <div class="blog-post-meta">
            <span class="blog-card-cat">${getPostField(post, 'category', lang)}</span>
            <span class="blog-card-date">${formatBlogDate(post.date)}</span>
          </div>
          <h1>${getPostField(post, 'title', lang)}</h1>
        </div>
        <div class="blog-post-body"${isRtl ? ' dir="rtl"' : ''}>${body}</div>
      </div>
    </div>
  `;
  window.scrollTo(0, 0);
}
