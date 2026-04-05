// Gizlilik Politikası, Kullanım Şartları, İletişim Sayfaları

function getSiteName() {
  return 'Lingual.work';
}

function getSiteUrl() {
  return location.origin;
}

function renderPrivacy(container) {
  const site = getSiteName();
  const url = getSiteUrl();
  const date = '04.04.2026';

  container.innerHTML = `
    <div class="legal-page">
      <div class="legal-header">
        <h1>Gizlilik Politikasi / Privacy Policy</h1>
        <p class="legal-date">Son guncelleme / Last updated: ${date}</p>
      </div>
      <div class="legal-content">

        <section>
          <h2>1. Genel Bakis</h2>
          <p>${site} ("biz", "bizim", "site") olarak kullanicilarimizin gizliligine onem veriyoruz. Bu gizlilik politikasi, sitemizi kullanirken hangi bilgilerin toplandigini, nasil kullanildigini ve korundigunu aciklar.</p>
        </section>

        <section>
          <h2>2. Toplanan Bilgiler</h2>
          <h3>2.1 Kisisel Bilgiler</h3>
          <ul>
            <li>Uyelik sirasinda verilen e-posta adresi ve kullanici adi</li>
            <li>Forum ve sohbet alanlarinda paylasilan icerikler</li>
            <li>Sinav ve yarisma sonuclari</li>
          </ul>
          <h3>2.2 Otomatik Toplanan Bilgiler</h3>
          <ul>
            <li>IP adresi</li>
            <li>Tarayici turu ve surumu</li>
            <li>Ziyaret edilen sayfalar ve kullanim suresi</li>
            <li>Cerez (cookie) verileri</li>
          </ul>
        </section>

        <section>
          <h2>3. Cerezler (Cookies)</h2>
          <p>Sitemiz, kullanici deneyimini iyilestirmek ve analiz amacli cerezler kullanmaktadir. Cerez turleri:</p>
          <ul>
            <li><strong>Zorunlu Cerezler:</strong> Sitenin temel islevleri icin gereklidir.</li>
            <li><strong>Analiz Cerezleri:</strong> Google Analytics gibi araclarla site kullanimini analiz etmek icin kullanilir.</li>
            <li><strong>Reklam Cerezleri:</strong> Google AdSense tarafindan kisisellestirilmis reklamlar gostermek icin kullanilir.</li>
          </ul>
          <p>Tarayici ayarlarinizdan cerezleri devre disi birakabilirsiniz; ancak bu, bazi site islevlerini etkileyebilir.</p>
        </section>

        <section>
          <h2>4. Google AdSense ve Reklamlar</h2>
          <p>Sitemizde ucuncu taraf reklam hizmeti olarak Google AdSense kullanilmaktadir. Google AdSense:</p>
          <ul>
            <li>Kisisellestirilmis reklamlar gostermek icin cerezler kullanir.</li>
            <li>Google'in reklam cerezlerini nasil kullandigini <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener">buradan</a> ogrenebilirsiniz.</li>
            <li>Kisisellestirilmis reklamlari <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener">Google Reklam Ayarlari</a> sayfasindan devre disi birakabilirsiniz.</li>
            <li>Ucuncu taraf reklam cerezlerini <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener">aboutads.info</a> uzerinden yonetebilirsiniz.</li>
          </ul>
        </section>

        <section>
          <h2>5. Bilgilerin Kullanimi</h2>
          <p>Toplanan bilgiler asagidaki amaclarla kullanilir:</p>
          <ul>
            <li>Hizmet sunumu ve iyilestirilmesi</li>
            <li>Kullanici hesaplarinin yonetimi</li>
            <li>Icerik kisisellestirilmesi</li>
            <li>Site kullaniminin analizi</li>
            <li>Yasal yukumluluklerin yerine getirilmesi</li>
          </ul>
        </section>

        <section>
          <h2>6. Bilgi Paylasimi</h2>
          <p>Kisisel bilgilerinizi asagidaki durumlar disinda ucuncu taraflarla paylasmayiz:</p>
          <ul>
            <li>Yasal zorunluluk durumlarinda</li>
            <li>Hizmet saglayicilarimizla (hosting, analiz araclari)</li>
            <li>Kullanicinin acik rizasi ile</li>
          </ul>
        </section>

        <section>
          <h2>7. Veri Guvenligi</h2>
          <p>Kisisel verilerinizi korumak icin SSL sifreleme, guvenli sunucu altyapisi ve erisim kontrolu gibi teknik ve idari onlemler alinmaktadir.</p>
        </section>

        <section>
          <h2>8. Kullanici Haklari</h2>
          <p>Kullanicilar asagidaki haklara sahiptir:</p>
          <ul>
            <li>Kisisel verilerine erisim talep etme</li>
            <li>Verilerin duzeltilmesini veya silinmesini isteme</li>
            <li>Veri islenmesine itiraz etme</li>
            <li>Hesabini silme</li>
          </ul>
          <p>Bu haklarinizi kullanmak icin <a href="#/contact">iletisim sayfamiz</a> uzerinden bize ulasabilirsiniz.</p>
        </section>

        <section>
          <h2>9. Cocuklarin Gizliligi</h2>
          <p>Sitemiz 13 yasindan kucuk cocuklardan bilerek kisisel bilgi toplamaz. Eger 13 yasindan kucuk bir cocugun bilgi sagladigini fark edersek, bu bilgileri derhal sileriz.</p>
        </section>

        <section>
          <h2>10. Degisiklikler</h2>
          <p>Bu gizlilik politikasi zaman zaman guncellenebilir. Onemli degisiklikler sitede duyurulacaktir. Siteyi kullanmaya devam etmeniz, guncellenmis politikayi kabul ettiginiz anlamina gelir.</p>
        </section>

        <section>
          <h2>11. Iletisim</h2>
          <p>Gizlilik politikamiz hakkinda sorulariniz icin <a href="#/contact">iletisim sayfamizi</a> ziyaret edin.</p>
        </section>

      </div>

      <div class="legal-footer-links">
        <a href="#/terms">Kullanim Sartlari</a>
        <a href="#/contact">Iletisim</a>
        <a href="#/">Anasayfa</a>
      </div>
    </div>
  `;
  window.scrollTo(0, 0);
}

function renderTerms(container) {
  const site = getSiteName();
  const date = '04.04.2026';

  container.innerHTML = `
    <div class="legal-page">
      <div class="legal-header">
        <h1>Kullanim Sartlari / Terms of Service</h1>
        <p class="legal-date">Son guncelleme / Last updated: ${date}</p>
      </div>
      <div class="legal-content">

        <section>
          <h2>1. Kabul</h2>
          <p>${site} web sitesini ("Site") kullanan herkes, asagidaki kullanim sartlarini kabul etmis sayilir. Bu sartlari kabul etmiyorsaniz, siteyi kullanmayiniz.</p>
        </section>

        <section>
          <h2>2. Hizmet Tanimi</h2>
          <p>${site}, yapay zeka destekli bir Turkce ogretim platformudur. Sunulan hizmetler:</p>
          <ul>
            <li>Turkce dilbilgisi dersleri</li>
            <li>Kelime ogrenme araclari</li>
            <li>Okuma ve anlama metinleri</li>
            <li>AI destekli sohbet pratigi</li>
            <li>Sinav ve yarisma modulleri</li>
            <li>Topluluk forumu</li>
          </ul>
        </section>

        <section>
          <h2>3. Uyelik</h2>
          <ul>
            <li>Bazi ozelliklere erismek icin uyelik gereklidir.</li>
            <li>Uyelik bilgilerinizin guvenligi sizin sorumlulugunuzdadir.</li>
            <li>Yanlis veya yaniltici bilgi vermek hesabinizin kapatilmasina neden olabilir.</li>
            <li>Hesabinizda gerceklesen tum islemlerden siz sorumlusunuz.</li>
          </ul>
        </section>

        <section>
          <h2>4. Kabul Edilebilir Kullanim</h2>
          <p>Siteyi kullanirken asagidaki kurallara uymaniz gerekmektedir:</p>
          <ul>
            <li>Yasadisi faaliyetler icin kullanmamak</li>
            <li>Diger kullanicilara hakaret, tehdit veya tacizde bulunmamak</li>
            <li>Spam, reklam veya yaniltici icerik paylasimamak</li>
            <li>Sitenin guvenligini tehlikeye atacak islemler yapmamak</li>
            <li>Baskalarinin kisisel bilgilerini izinsiz paylasimamak</li>
            <li>Telif hakki ile korunan icerikleri izinsiz paylasimamak</li>
          </ul>
        </section>

        <section>
          <h2>5. Fikri Mulkiyet</h2>
          <p>Sitedeki tum icerikler (metinler, gorseller, yazilim, tasarim) ${site}'ye aittir veya lisanslidir. Izinsiz kopyalanmasi, dagitilmasi veya ticari amacla kullanilmasi yasaktir.</p>
        </section>

        <section>
          <h2>6. Kullanici Icerikleri</h2>
          <ul>
            <li>Forum ve sohbet alanlarinda paylastiginiz iceriklerden siz sorumlusunuz.</li>
            <li>Paylasilan icerikler uzerinde sitemizde yayinlama hakki verdiginizi kabul edersiniz.</li>
            <li>Kurallara aykiri icerikleri bildirmeden kaldirma hakkimiz saklidir.</li>
          </ul>
        </section>

        <section>
          <h2>7. Sorumluluk Sinirlamasi</h2>
          <ul>
            <li>Site "oldugu gibi" sunulmaktadir. Kesintisiz veya hatasiz calisma garantisi verilmez.</li>
            <li>AI tarafindan uretilen icerikler her zaman dogrulugindan emin olunmayabilir.</li>
            <li>Siteyi kullanmaniz sonucu olusabilecek dolayli veya dogrudan zararlardan sorumlu degiliz.</li>
          </ul>
        </section>

        <section>
          <h2>8. Ucuncu Taraf Hizmetleri</h2>
          <p>Sitemiz ucuncu taraf hizmetleri kullanmaktadir:</p>
          <ul>
            <li><strong>Google AdSense:</strong> Reklam gosterimi</li>
            <li><strong>Google Analytics:</strong> Site analizi</li>
            <li><strong>OpenAI API:</strong> AI sohbet ozelligi</li>
          </ul>
          <p>Bu hizmetlerin kendi gizlilik politikalari ve kullanim sartlari gecerlidir.</p>
        </section>

        <section>
          <h2>9. Hesap Sonlandirma</h2>
          <p>Kullanim sartlarini ihlal eden hesaplar uyari yapilmaksizin askiya alinabilir veya silinebilir. Kullanicilar istedikleri zaman hesaplarini silme hakina sahiptir.</p>
        </section>

        <section>
          <h2>10. Degisiklikler</h2>
          <p>Bu kullanim sartlari onceden bildirimde bulunulmaksizin guncellenebilir. Guncellenmis sartlar sitede yayinlandigi tarihte yururluge girer.</p>
        </section>

        <section>
          <h2>11. Uygulanacak Hukuk</h2>
          <p>Bu kullanim sartlari Turkiye Cumhuriyeti kanunlarina tabidir. Uyusmazliklarda Istanbul mahkemeleri yetkilidir.</p>
        </section>

        <section>
          <h2>12. Iletisim</h2>
          <p>Kullanim sartlari hakkinda sorulariniz icin <a href="#/contact">iletisim sayfamizi</a> ziyaret edin.</p>
        </section>

      </div>

      <div class="legal-footer-links">
        <a href="#/privacy">Gizlilik Politikasi</a>
        <a href="#/contact">Iletisim</a>
        <a href="#/">Anasayfa</a>
      </div>
    </div>
  `;
  window.scrollTo(0, 0);
}

function renderContact(container) {
  const site = getSiteName();

  container.innerHTML = `
    <div class="legal-page">
      <div class="legal-header">
        <h1>Iletisim / Contact</h1>
        <p class="legal-date">Bize ulasin, yardimci olalim!</p>
      </div>
      <div class="legal-content">

        <div class="contact-grid">
          <div class="contact-card">
            <div class="contact-card-icon">📧</div>
            <h3>E-posta</h3>
            <p>Genel sorular ve destek icin:</p>
            <a href="mailto:info@lingual.work" class="contact-link">info@lingual.work</a>
          </div>

          <div class="contact-card">
            <div class="contact-card-icon">🐛</div>
            <h3>Hata Bildirimi</h3>
            <p>Bir hata veya sorun buldunuz mu?</p>
            <a href="mailto:support@lingual.work" class="contact-link">support@lingual.work</a>
          </div>

          <div class="contact-card">
            <div class="contact-card-icon">💡</div>
            <h3>Oneri ve Geri Bildirim</h3>
            <p>Fikirlerinizi duymak isteriz!</p>
            <a href="mailto:feedback@lingual.work" class="contact-link">feedback@lingual.work</a>
          </div>
        </div>

        <div class="contact-form-section">
          <h2>Bize Yazin</h2>
          <form id="contactForm" class="contact-form">
            <div class="contact-form-row">
              <div class="form-group">
                <label for="contactName">Adiniz *</label>
                <input type="text" id="contactName" name="name" required placeholder="Adinizi girin">
              </div>
              <div class="form-group">
                <label for="contactEmail">E-posta *</label>
                <input type="email" id="contactEmail" name="email" required placeholder="E-posta adresiniz">
              </div>
            </div>
            <div class="form-group">
              <label for="contactSubject">Konu *</label>
              <select id="contactSubject" name="subject" required>
                <option value="">Konu secin...</option>
                <option value="general">Genel Soru</option>
                <option value="bug">Hata Bildirimi</option>
                <option value="suggestion">Oneri</option>
                <option value="account">Hesap Sorunu</option>
                <option value="privacy">Gizlilik / Veri Talebi</option>
                <option value="other">Diger</option>
              </select>
            </div>
            <div class="form-group">
              <label for="contactMessage">Mesajiniz *</label>
              <textarea id="contactMessage" name="message" rows="6" required placeholder="Mesajinizi yazin..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary contact-submit">Gonder</button>
          </form>
        </div>

      </div>

      <div class="legal-footer-links">
        <a href="#/privacy">Gizlilik Politikasi</a>
        <a href="#/terms">Kullanim Sartlari</a>
        <a href="#/">Anasayfa</a>
      </div>
    </div>
  `;

  document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const subject = form.elements.subject.value;
    const message = form.elements.message.value.trim();

    // Store in localStorage as a simple solution
    const messages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
    messages.push({ name, email, subject, message, date: new Date().toISOString() });
    localStorage.setItem('contact_messages', JSON.stringify(messages));

    form.reset();
    showToast('Mesajiniz alindi! En kisa surede donus yapacagiz.');
  });

  window.scrollTo(0, 0);
}
