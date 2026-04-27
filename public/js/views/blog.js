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
    body: `
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
    `
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

function renderBlog(container) {
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
              <span class="blog-card-cat">${post.categoryEn}</span>
              <span class="blog-card-date">${formatBlogDate(post.date)}</span>
            </div>
            <h2>${post.title}</h2>
            <p class="blog-card-sub">${post.titleEn}</p>
            <p>${post.summaryEn}</p>
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
  container.innerHTML = `
    <div class="blog-page">
      <div class="blog-post">
        <button class="blog-back" onclick="location.hash='#/blog'">← Blog</button>
        <div class="blog-post-header">
          <div class="blog-post-meta">
            <span class="blog-card-cat">${post.categoryEn}</span>
            <span class="blog-card-date">${formatBlogDate(post.date)}</span>
          </div>
          <h1>${post.title}</h1>
          <p class="blog-sub">${post.titleEn}</p>
        </div>
        <div class="blog-post-body">${post.body}</div>
      </div>
    </div>
  `;
  window.scrollTo(0, 0);
}
