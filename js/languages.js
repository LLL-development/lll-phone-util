(function () {
  var LANGUAGES = [
    { code: 'en-US', label: 'English (US)' },
    { code: 'en-GB', label: 'English (UK)' },
    { code: 'zh-CN', label: '中文 (简体)' },
    { code: 'zh-TW', label: '中文 (繁體)' },
    { code: 'yue-HK', label: '粵語 (香港)' },
    { code: 'ja-JP', label: '日本語' },
    { code: 'ko-KR', label: '한국어' },
    { code: 'ms-MY', label: 'Bahasa Melayu' },
    { code: 'id-ID', label: 'Bahasa Indonesia' },
    { code: 'fil-PH', label: 'Filipino' },
    { code: 'fr-FR', label: 'Français' },
    { code: 'es-ES', label: 'Español' },
    { code: 'de-DE', label: 'Deutsch' },
    { code: 'it-IT', label: 'Italiano' },
    { code: 'pt-BR', label: 'Português (Brasil)' },
    { code: 'pt-PT', label: 'Português (Portugal)' },
    { code: 'nl-NL', label: 'Nederlands' },
    { code: 'pl-PL', label: 'Polski' },
    { code: 'tr-TR', label: 'Türkçe' },
    { code: 'sv-SE', label: 'Svenska' },
    { code: 'da-DK', label: 'Dansk' },
    { code: 'nb-NO', label: 'Norsk' },
    { code: 'fi-FI', label: 'Suomi' },
    { code: 'cs-CZ', label: 'Čeština' },
    { code: 'sk-SK', label: 'Slovenčina' },
    { code: 'ro-RO', label: 'Română' },
    { code: 'hu-HU', label: 'Magyar' },
    { code: 'el-GR', label: 'Ελληνικά' },
    { code: 'ru-RU', label: 'Русский' },
    { code: 'uk-UA', label: 'Українська' },
    { code: 'bg-BG', label: 'Български' },
    { code: 'he-IL', label: 'עברית' },
    { code: 'ar-SA', label: 'العربية' },
    { code: 'ur-PK', label: 'اردو' },
    { code: 'hi-IN', label: 'हिन्दी' },
    { code: 'mr-IN', label: 'मराठी' },
    { code: 'bn-BD', label: 'বাংলা' },
    { code: 'ta-IN', label: 'தமிழ்' },
    { code: 'te-IN', label: 'తెలుగు' },
    { code: 'th-TH', label: 'ไทย' },
    { code: 'vi-VN', label: 'Tiếng Việt' },
    { code: 'sw-KE', label: 'Kiswahili' }
  ];

  function closestMatch(pref) {
    if (!pref) return LANGUAGES[0].code;
    var lower = pref.toLowerCase();
    var exact = LANGUAGES.find(function (l) { return l.code.toLowerCase() === lower; });
    if (exact) return exact.code;
    var base = lower.split('-')[0];
    var partial = LANGUAGES.find(function (l) { return l.code.toLowerCase().indexOf(base) === 0; });
    return partial ? partial.code : LANGUAGES[0].code;
  }

  // Script (Unicode block) ranges that map unambiguously to one language in our list.
  // Order matters: more specific scripts (kana, hangul) are checked before generic Han.
  var SCRIPT_RANGES = [
    { code: 'ja-JP', re: /[぀-ヿ]/ },
    { code: 'ko-KR', re: /[가-힯]/ },
    { code: 'th-TH', re: /[฀-๿]/ },
    { code: 'el-GR', re: /[Ͱ-Ͽ]/ },
    { code: 'he-IL', re: /[֐-׿]/ },
    { code: 'bn-BD', re: /[ঀ-৿]/ },
    { code: 'ta-IN', re: /[஀-௿]/ },
    { code: 'te-IN', re: /[ఀ-౿]/ },
    { code: 'zh-CN', re: /[一-鿿]/ }
  ];

  // Devanagari is shared by Hindi and Marathi; ळ is a Marathi-specific letter
  // (not part of standard Hindi orthography), so check it before defaulting to Hindi.
  function detectDevanagariVariant(text) {
    return /ळ/.test(text) ? 'mr-IN' : 'hi-IN';
  }

  // A set of character pairs that differ between Simplified and Traditional Chinese,
  // used to pick zh-CN vs zh-TW once Han script has already been detected. Covers
  // enough high-frequency characters to catch most everyday sentences.
  var ZH_SIMPLIFIED_CHARS = '这来说时会没开关无电国学几发点东马爱长门问间语汉头车书买卖华儿从众传严认让义乐习亲产变觉视议兴备尽归显阳阴过还进运连选适联断继续势环极构权术状争层号类处领频页风飞广应当尝党龙凤汤场伤杨扬图团圆园员围报惊观规恋弯湾与举转专简练纪级约纯纸纷纲纳纵纹纽线络绝统绩绪绿缘缩结给绍组织终经绕编缓么样带钟称货质责贤践钱银错锁错误';
  var ZH_TRADITIONAL_CHARS = '這來說時會沒開關無電國學幾發點東馬愛長門問間語漢頭車書買賣華兒從眾傳嚴認讓義樂習親產變覺視議興備盡歸顯陽陰過還進運連選適聯斷繼續勢環極構權術狀爭層號類處領頻頁風飛廣應當嘗黨龍鳳湯場傷楊揚圖團圓園員圍報驚觀規戀彎灣與舉轉專簡練紀級約純紙紛綱納縱紋紐線絡絕統績緒綠緣縮結給紹組織終經繞編緩麼樣帶鐘稱貨質責賢踐錢銀錯鎖錯誤';

  // Characters used in written Cantonese (colloquial particles/pronouns) that are
  // rare-to-absent in Standard Written Chinese — a single hit is a strong signal.
  var YUE_ONLY_CHARS = '嘅喺唔冇佢咗啲嗰咁嘢乜嚟啱噉';

  function detectChineseVariant(text) {
    for (var j = 0; j < text.length; j++) {
      if (YUE_ONLY_CHARS.indexOf(text[j]) !== -1) return 'yue-HK';
    }
    var simp = 0, trad = 0;
    for (var i = 0; i < text.length; i++) {
      var ch = text[i];
      if (ZH_SIMPLIFIED_CHARS.indexOf(ch) !== -1) simp++;
      else if (ZH_TRADITIONAL_CHARS.indexOf(ch) !== -1) trad++;
    }
    return trad > simp ? 'zh-TW' : 'zh-CN';
  }

  // Letters that exist in only one language's alphabet (within our candidate set) —
  // a single occurrence is a strong, near-unambiguous signal.
  function diacriticDetect(lower) {
    if (/[ٹڈڑںے]/.test(lower)) return 'ur-PK'; // Urdu-only letters in the Arabic block
    if (/[؀-ۿ]/.test(lower)) return 'ar-SA'; // remaining Arabic-script text
    if (/[іїєґ]/.test(lower)) return 'uk-UA'; // Ukrainian-only Cyrillic letters
    if (/[ыэё]/.test(lower)) return 'ru-RU'; // Russian-only Cyrillic letters (absent from Bulgarian)
    if (/[đơư]/.test(lower)) return 'vi-VN'; // Vietnamese-only Latin letters
    // Romanian ț/ţ (comma-below or legacy cedilla T) has no Turkish equivalent, so
    // check it before Turkish — Romanian text is frequently typed with legacy
    // cedilla forms (ş/ţ) that would otherwise be mistaken for Turkish ş.
    if (/[ăţț]/.test(lower)) return 'ro-RO';
    if (/[ğşı]/.test(lower)) return 'tr-TR';
    if (/[łąężńść]/.test(lower)) return 'pl-PL';
    if (/[řě]/.test(lower)) return 'cs-CZ';
    if (/[ľĺŕ]/.test(lower)) return 'sk-SK';
    if (/[őű]/.test(lower)) return 'hu-HU';
    if (/ș/.test(lower)) return 'ro-RO';
    return null;
  }

  // Common function words per language, used to score plain Latin/Cyrillic text that
  // shares a script with several other languages. Weighted by inverse document
  // frequency below, so words unique to one language count far more than words
  // ("de", "la", "que"...) that are common filler across many languages.
  var STOPWORDS = {
    'en-US': ['the', 'and', 'is', 'are', 'you', 'to', 'of', 'in', 'it', 'that', 'this', 'with', 'for', 'was', 'have', 'about', 'would', 'there', 'their', 'which', 'been', 'from', 'but', 'not', 'what', 'all', 'we', 'when', 'your', 'can', 'they', 'will', 'i', 'me', 'my', 'do', 'does', 'hello', 'hi', 'hey', 'thanks', 'please', 'sorry', 'yes', 'no', 'good', 'love', 'morning', 'night', 'how', 'where', 'why', 'who', 'welcome', 'congratulations', 'happy', 'birthday', 'today', 'tomorrow', 'yesterday', 'goodbye', 'bye'],
    'fr-FR': ['le', 'la', 'les', 'et', 'est', 'de', 'des', 'un', 'une', 'vous', 'nous', 'avec', 'pour', 'que', 'dans', 'être', 'avoir', 'ainsi', 'alors', 'comme', 'très', 'aussi', 'je', 'tu', 'il', 'elle', 'ils', 'elles', 'mais', 'ou', 'donc', 'car', 'à', 'au', 'du', 'sont', 'fait', 'tout', 'tous', 'bien', 'plus', 'sans', 'quand', 'qui', 'où', 'votre', 'leur', 'mon', 'ma', 'bonjour', 'salut', 'merci', 'désolé', 'oui', 'non', 'bon', 'bonne', 'amour', 'matin', 'soir', 'nuit', 'comment', 'pourquoi', 'jour', 'bienvenue', 'félicitations', 'demain', 'hier', 'revoir', 'joyeux', 'anniversaire'],
    'es-ES': ['el', 'la', 'los', 'las', 'y', 'es', 'de', 'un', 'una', 'usted', 'para', 'que', 'con', 'en', 'también', 'porque', 'cuando', 'entre', 'sobre', 'muy', 'está', 'yo', 'tú', 'él', 'ella', 'nosotros', 'ellos', 'ellas', 'pero', 'si', 'más', 'sin', 'todo', 'todos', 'cómo', 'dónde', 'quién', 'mi', 'su', 'nuestro', 'esto', 'eso', 'por', 'lo', 'mucho', 'muchas', 'gracias', 'hola', 'perdón', 'sí', 'bueno', 'buena', 'amor', 'mañana', 'noche', 'día', 'te', 'bienvenido', 'bienvenida', 'felicidades', 'cumpleaños', 'hoy', 'ayer', 'adiós', 'chao'],
    'de-DE': ['der', 'die', 'das', 'und', 'ist', 'sie', 'ein', 'eine', 'mit', 'für', 'nicht', 'auf', 'von', 'auch', 'wenn', 'wird', 'werden', 'können', 'müssen', 'schon', 'ich', 'du', 'er', 'wir', 'ihr', 'aber', 'oder', 'doch', 'noch', 'nur', 'alle', 'wie', 'was', 'wo', 'wer', 'mein', 'dein', 'sein', 'unser', 'euer', 'im', 'am', 'hallo', 'danke', 'bitte', 'entschuldigung', 'ja', 'nein', 'gut', 'liebe', 'morgen', 'nacht', 'warum', 'tag', 'willkommen', 'glückwunsch', 'geburtstag', 'heute', 'gestern', 'tschüss'],
    'it-IT': ['il', 'la', 'le', 'e', 'di', 'un', 'una', 'per', 'che', 'con', 'sono', 'non', 'anche', 'quando', 'perché', 'questo', 'della', 'io', 'tu', 'lui', 'lei', 'noi', 'voi', 'loro', 'ma', 'però', 'se', 'più', 'senza', 'tutto', 'tutti', 'come', 'dove', 'chi', 'mio', 'tuo', 'suo', 'nostro', 'vostro', 'dei', 'delle', 'negli', 'ciao', 'salve', 'grazie', 'prego', 'scusa', 'sì', 'buono', 'buona', 'amore', 'mattina', 'notte', 'giorno', 'benvenuto', 'benvenuta', 'congratulazioni', 'compleanno', 'oggi', 'domani', 'ieri', 'arrivederci'],
    'pt-BR': ['o', 'a', 'os', 'as', 'e', 'de', 'um', 'uma', 'para', 'que', 'com', 'não', 'você', 'também', 'porque', 'quando', 'está', 'isso', 'muito', 'eu', 'tu', 'ele', 'ela', 'nós', 'eles', 'elas', 'mas', 'ou', 'se', 'mais', 'sem', 'tudo', 'todos', 'como', 'onde', 'quem', 'meu', 'teu', 'seu', 'nosso', 'do', 'da', 'dos', 'das', 'no', 'na', 'olá', 'oi', 'obrigado', 'obrigada', 'desculpa', 'sim', 'bom', 'boa', 'amor', 'manhã', 'noite', 'dia', 'bem-vindo', 'parabéns', 'aniversário', 'hoje', 'amanhã', 'ontem', 'tchau'],
    'nl-NL': ['de', 'het', 'een', 'en', 'is', 'van', 'voor', 'met', 'niet', 'dat', 'je', 'ook', 'maar', 'omdat', 'wordt', 'worden', 'kunnen', 'ik', 'jij', 'hij', 'zij', 'wij', 'jullie', 'of', 'dus', 'nog', 'alles', 'hoe', 'waar', 'wie', 'mijn', 'jouw', 'zijn', 'haar', 'onze', 'uw', 'hallo', 'hoi', 'dank', 'alsjeblieft', 'sorry', 'ja', 'nee', 'goed', 'liefde', 'ochtend', 'nacht', 'waarom', 'dag', 'welkom', 'gefeliciteerd', 'verjaardag', 'vandaag', 'gisteren', 'doei'],
    'ms-MY': ['yang', 'dan', 'di', 'ini', 'itu', 'adalah', 'untuk', 'dengan', 'tidak', 'saya', 'anda', 'juga', 'tetapi', 'kerana', 'boleh', 'mereka', 'sudah', 'helo', 'tolong', 'maaf', 'ya', 'bagus', 'baik', 'cinta', 'pagi', 'malam', 'bagaimana', 'kenapa', 'siapa', 'hari'],
    'id-ID': ['yang', 'dan', 'di', 'ini', 'itu', 'adalah', 'untuk', 'dengan', 'tidak', 'saya', 'juga', 'tetapi', 'karena', 'bisa', 'mereka', 'sudah', 'halo', 'tolong', 'maaf', 'bagus', 'baik', 'cinta', 'pagi', 'malam', 'bagaimana', 'kenapa', 'siapa', 'hari'],
    'sv-SE': ['och', 'är', 'det', 'en', 'ett', 'för', 'med', 'inte', 'du', 'också', 'väl', 'vill', 'skulle', 'måste', 'mycket', 'jag', 'hur', 'vad', 'som', 'till', 'av', 'hej', 'tack', 'snälla', 'förlåt', 'ja', 'nej', 'bra', 'kärlek', 'morgon', 'natt', 'varför', 'vem', 'dag'],
    'da-DK': ['og', 'er', 'det', 'ikke', 'jeg', 'også', 'hvad', 'men', 'har', 'kan', 'vil', 'hej', 'tak', 'undskyld', 'ja', 'nej', 'god', 'kærlighed', 'morgen', 'nat', 'hvordan', 'hvorfor', 'hvem'],
    'nb-NO': ['og', 'er', 'det', 'ikke', 'jeg', 'også', 'hva', 'men', 'har', 'kan', 'vil', 'hei', 'takk', 'unnskyld', 'ja', 'nei', 'god', 'kjærlighet', 'morgen', 'natt', 'hvordan', 'hvorfor', 'hvem'],
    'fi-FI': ['ja', 'on', 'ei', 'että', 'se', 'hän', 'minä', 'sinä', 'me', 'ovat', 'mutta', 'koska', 'vain', 'paljon', 'täytyy', 'hei', 'kiitos', 'anteeksi', 'kyllä', 'hyvä', 'rakkaus', 'aamu', 'yö', 'miten', 'miksi', 'kuka', 'päivä'],
    'tr-TR': ['ve', 'bir', 'bu', 'için', 'çok', 'ama', 'gibi', 'daha', 'ile', 'de', 'da', 'ne', 'ben', 'sen', 'merhaba', 'selam', 'teşekkürler', 'lütfen', 'üzgünüm', 'evet', 'hayır', 'iyi', 'aşk', 'sabah', 'gece', 'nasıl', 'neden', 'kim', 'gün'],
    'pl-PL': ['jest', 'nie', 'się', 'tak', 'ale', 'bardzo', 'jak', 'tylko', 'oraz', 'czy', 'jestem', 'jesteś', 'cześć', 'dziękuję', 'proszę', 'przepraszam', 'dobry', 'dobra', 'miłość', 'rano', 'noc', 'dlaczego', 'kto', 'dzień'],
    'ro-RO': ['și', 'este', 'de', 'un', 'o', 'pentru', 'cu', 'nu', 'că', 'sunt', 'foarte', 'dacă', 'care', 'mult', 'ce', 'mai', 'să', 'cum', 'ta', 'meu', 'salut', 'mulțumesc', 'scuze', 'da', 'bun', 'bună', 'dragoste', 'dimineață', 'noapte', 'cine', 'zi'],
    'ru-RU': ['и', 'не', 'что', 'это', 'как', 'все', 'она', 'он', 'мы', 'вы', 'я', 'был', 'было', 'этот', 'который', 'также', 'привет', 'спасибо', 'пожалуйста', 'извините', 'да', 'нет', 'хорошо', 'любовь', 'утро', 'ночь', 'почему', 'кто', 'день'],
    'bg-BG': ['и', 'на', 'е', 'да', 'за', 'се', 'не', 'че', 'са', 'какво', 'това', 'който', 'със', 'него', 'защото', 'много', 'сега', 'здравей', 'благодаря', 'моля', 'съжалявам', 'добър', 'добре', 'любов', 'сутрин', 'вечер', 'защо', 'кой', 'ден'],
    'vi-VN': ['chào', 'không', 'có', 'là', 'của', 'này', 'được', 'cho', 'với', 'tôi', 'bạn', 'rất', 'cũng', 'cảm', 'ơn', 'xin', 'anh', 'em', 'yêu', 'ngày', 'sáng', 'nhé', 'vậy'],
    'uk-UA': ['привіт', 'дякую', 'будь', 'ласка', 'вибачте', 'так', 'ні', 'добре', 'любов', 'ранок', 'ніч', 'чому', 'хто', 'день', 'дуже', 'та', 'це', 'він', 'вона', 'можна', 'сьогодні'],
    'fil-PH': ['ang', 'ng', 'sa', 'at', 'ay', 'na', 'mga', 'ako', 'ikaw', 'siya', 'kami', 'tayo', 'sila', 'hindi', 'oo', 'salamat', 'kumusta', 'mahal', 'magandang', 'umaga', 'gabi', 'paano', 'saan', 'bakit', 'sino', 'ito', 'iyan', 'po', 'opo'],
    'sw-KE': ['na', 'ya', 'wa', 'kwa', 'ni', 'si', 'hii', 'hiyo', 'mimi', 'wewe', 'yeye', 'sisi', 'wao', 'hapana', 'ndiyo', 'asante', 'habari', 'jambo', 'mzuri', 'asubuhi', 'usiku', 'kwaheri', 'tafadhali', 'samahani', 'upendo']
  };

  // Inverse-document-frequency style weighting: a stopword shared by many languages
  // ("de", "que", "and"-style filler) contributes little; a word unique to one
  // language's list is a much stronger signal.
  var WORD_LANG_FREQ = (function () {
    var freq = {};
    Object.keys(STOPWORDS).forEach(function (code) {
      STOPWORDS[code].forEach(function (w) { freq[w] = (freq[w] || 0) + 1; });
    });
    return freq;
  })();

  function stopwordDetect(lower) {
    var words = lower.match(/[\p{L}]+/gu) || [];
    if (words.length < 1) return null;

    var scores = {};
    words.forEach(function (w) {
      var freq = WORD_LANG_FREQ[w];
      if (!freq) return;
      var weight = 1 / freq;
      Object.keys(STOPWORDS).forEach(function (code) {
        if (STOPWORDS[code].indexOf(w) !== -1) scores[code] = (scores[code] || 0) + weight;
      });
    });

    var ranked = Object.keys(scores).map(function (code) { return [code, scores[code]]; })
      .sort(function (a, b) { return b[1] - a[1]; });
    if (ranked.length === 0) return null;

    var best = ranked[0];
    var runnerUp = ranked[1] ? ranked[1][1] : 0;
    // Short phrases (the common case: "Hello", "Merci beaucoup") need to clear a
    // much lower bar than long paragraphs, where a couple of stray shared words
    // could otherwise look like a false signal.
    var threshold = Math.max(0.9, words.length * 0.06);

    if (best[1] < threshold) return null; // not enough signal
    if (runnerUp > 0 && best[1] - runnerUp < 0.4) return null; // too close to call confidently
    return best[0];
  }

  function detect(text) {
    if (!text) return null;
    var trimmed = text.trim();
    if (!trimmed) return null;
    var lower = trimmed.toLowerCase();

    if (/[ऀ-ॿ]/.test(trimmed)) return detectDevanagariVariant(trimmed);

    for (var i = 0; i < SCRIPT_RANGES.length; i++) {
      if (SCRIPT_RANGES[i].re.test(trimmed)) {
        return SCRIPT_RANGES[i].code === 'zh-CN' ? detectChineseVariant(trimmed) : SCRIPT_RANGES[i].code;
      }
    }

    var dia = diacriticDetect(lower);
    if (dia) return dia;

    var guess = stopwordDetect(lower);
    if (guess) return guess;

    // Generic Cyrillic with no Ukrainian/Russian-exclusive letters and no clear
    // stopword winner: Russian is by far the most common case, so default to it.
    if (/[Ѐ-ӿ]/.test(trimmed)) return 'ru-RU';

    return null;
  }

  window.PtkLanguages = { list: LANGUAGES, closestMatch: closestMatch, detect: detect };
})();
