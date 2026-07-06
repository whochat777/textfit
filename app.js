(function () {
  const presets = window.TEXTFIT_PRESETS || [];
  const byId = window.TEXTFIT_BY_ID || {};
  const bySlug = window.TEXTFIT_BY_SLUG || {};

  const textarea = document.querySelector("[data-text-input]");
  const presetGrid = document.querySelector("[data-preset-grid]");
  const categoryTabs = document.querySelector("[data-category-tabs]");
  const selectedTitle = document.querySelector("[data-selected-title]");
  const selectedMeta = document.querySelector("[data-selected-meta]");
  const selectedHint = document.querySelector("[data-selected-hint]");
  const selectedSource = document.querySelector("[data-selected-source]");
  const scoreValue = document.querySelector("[data-score-value]");
  const scoreLabel = document.querySelector("[data-score-label]");
  const progress = document.querySelector("[data-progress]");
  const statNodes = Array.from(document.querySelectorAll("[data-stat]"));
  const markdownToggle = document.querySelector("[data-markdown-toggle]");
  const copyButton = document.querySelector("[data-copy]");
  const clearButton = document.querySelector("[data-clear]");
  const sampleButton = document.querySelector("[data-sample]");
  const linkButton = document.querySelector("[data-link]");
  const languageSelect = document.querySelector("[data-language-select]");
  const bodyPreset = document.body.dataset.preset;
  const translations = {
    en: {
      languageLabel: "Language",
      navTool: "Tool",
      navPresets: "Presets",
      navFaq: "FAQ",
      navPrivacy: "Privacy",
      navTerms: "Terms",
      eyebrow: "Platform copy checker",
      heroTitle: "Fit copy to the field before you publish.",
      heroIntro: "A focused counter for titles, descriptions, ads, metadata, and CJK-heavy platform copy. One text box, clear limits, source links where public rules exist.",
      adLabel: "Advertisement",
      adTitle: "Horizontal display slot",
      pasteText: "Paste text",
      localCounts: "Counts run locally in your browser.",
      loadSample: "Load sample",
      reset: "Reset",
      copyText: "Copy text",
      copyRuleLink: "Copy rule link",
      textareaPlaceholder: "Paste a title, description, ad headline, post, or Markdown draft here.",
      characters: "Characters",
      weightedCjk: "Weighted CJK",
      bytes: "Bytes",
      words: "Words",
      reading: "Reading",
      presets: "Presets",
      lines: "Lines",
      paragraphs: "Paragraphs",
      headings: "Headings",
      links: "Links",
      howLabel: "How TextFit works",
      howTitle: "Specific pages, same fast tool.",
      howBody: "TextFit gives concrete URLs to concrete writing jobs. A YouTube title page, a Google Ads headline page, and a WeChat title page all open the same counter with the right preset already selected. Public official limits are linked from the result card; writing-guide presets are labeled as practical ranges instead of hard rules.",
      faqTitle: "Useful before publishing.",
      faqUploadQ: "Does TextFit upload my text?",
      faqUploadA: "No. The current version counts text in your browser with local JavaScript.",
      faqPresetQ: "Why are some presets verified and others guides?",
      faqPresetA: "Some platforms publish exact field limits. Others change UI behavior or do not publish a stable public limit, so TextFit labels those as writing ranges.",
      faqCjkQ: "What is weighted CJK counting?",
      faqCjkA: "Some ad systems count Japanese, Chinese, and Korean full-width characters as 2. TextFit shows that count next to normal characters and bytes.",
      privacyLabel: "Privacy",
      privacyTitle: "Privacy notice",
      privacyBody: "TextFit counts pasted text in your browser. The current version does not upload your source text to a Solidscreen server. The site may use Cloudflare Web Analytics and Google AdSense, which can process standard visit, device, and advertising data according to their own policies.",
      termsLabel: "Terms",
      termsTitle: "Terms of use",
      termsBody: "TextFit is provided as a practical browser tool. You are responsible for the text you paste, the results you use, and the rules of any platform where you publish. Platform limits can change, so source links and writing ranges should be checked when accuracy matters.",
      footerText: "(c) 2026 Solidscreen. TextFit is a Solidscreen product.",
      categories: { All: "All", Global: "Global", SEO: "SEO", Japan: "Japan", China: "China" },
      units: { chars: "chars", bytes: "bytes", weighted: "weighted" },
      status: { over: "over", left: "left", short: "short", overGuide: "over guide", inRange: "in range", ready: "ready", min: "min" }
    },
    ja: {
      languageLabel: "言語",
      navTool: "ツール",
      navPresets: "プリセット",
      navFaq: "FAQ",
      navPrivacy: "プライバシー",
      navTerms: "利用規約",
      eyebrow: "プラットフォーム用コピー確認",
      heroTitle: "公開前に文字数を合わせる。",
      heroIntro: "タイトル、説明文、広告、メタ情報、CJK を含む文章向けの文字数カウンターです。入力欄はひとつ、制限は明確に、公開ルールがある場合は出典リンクを表示します。",
      adLabel: "広告",
      adTitle: "横長ディスプレイ広告枠",
      pasteText: "テキストを入力",
      localCounts: "カウントはブラウザ内で実行されます。",
      loadSample: "サンプル",
      reset: "リセット",
      copyText: "本文をコピー",
      copyRuleLink: "ルールリンクをコピー",
      textareaPlaceholder: "タイトル、説明文、広告見出し、投稿、Markdown 下書きを貼り付けてください。",
      characters: "文字数",
      weightedCjk: "CJK 換算",
      bytes: "バイト",
      words: "単語",
      reading: "読了",
      presets: "プリセット",
      lines: "行",
      paragraphs: "段落",
      headings: "見出し",
      links: "リンク",
      howLabel: "TextFit の仕組み",
      howTitle: "用途別ページ、同じ高速ツール。",
      howBody: "TextFit は具体的な作業ごとに固定 URL を用意します。YouTube タイトル、Google Ads 見出し、WeChat タイトルなどを開くと、対応するプリセットが選択された状態で同じカウンターを使えます。",
      faqTitle: "公開前の確認に便利です。",
      faqUploadQ: "TextFit は入力テキストをアップロードしますか？",
      faqUploadA: "いいえ。現在のバージョンはブラウザ内の JavaScript で文字数を数えます。",
      faqPresetQ: "Verified と Guide の違いは？",
      faqPresetA: "公開された正確な制限があるものは出典付きの制限として扱い、それ以外は実用的な目安として表示します。",
      faqCjkQ: "CJK 換算とは？",
      faqCjkA: "一部の広告システムでは日本語・中国語・韓国語の全角文字を 2 と数えます。TextFit は通常の文字数やバイト数と並べて表示します。",
      privacyLabel: "プライバシー",
      privacyTitle: "プライバシー通知",
      privacyBody: "TextFit は貼り付けたテキストをブラウザ内でカウントします。現在のバージョンでは原文を Solidscreen のサーバーへ送信しません。Cloudflare Web Analytics と Google AdSense は、各ポリシーに従って標準的な閲覧・端末・広告データを処理する場合があります。",
      termsLabel: "利用規約",
      termsTitle: "利用条件",
      termsBody: "TextFit は実用的なブラウザツールとして提供されます。入力するテキスト、利用する結果、公開先プラットフォームのルール確認は利用者の責任です。制限は変更される場合があります。",
      footerText: "(c) 2026 Solidscreen. TextFit は Solidscreen のプロダクトです。",
      categories: { All: "すべて", Global: "グローバル", SEO: "SEO", Japan: "日本", China: "中国" },
      units: { chars: "文字", bytes: "バイト", weighted: "換算" },
      status: { over: "超過", left: "残り", short: "不足", overGuide: "目安超過", inRange: "範囲内", ready: "準備完了", min: "分" }
    },
    "zh-Hans": {
      languageLabel: "语言",
      navTool: "工具",
      navPresets: "规则",
      navFaq: "FAQ",
      navPrivacy: "隐私",
      navTerms: "条款",
      eyebrow: "平台文案检查器",
      heroTitle: "发布前，把字数对齐到要求。",
      heroIntro: "用于标题、描述、广告、元信息和中日韩文案的专注计数器。一个输入框，清楚的限制，有公开规则时提供来源链接。",
      adLabel: "广告",
      adTitle: "横向展示广告位",
      pasteText: "粘贴文本",
      localCounts: "计数在你的浏览器本地运行。",
      loadSample: "加载示例",
      reset: "重置",
      copyText: "复制文本",
      copyRuleLink: "复制规则链接",
      textareaPlaceholder: "粘贴标题、描述、广告标题、帖子或 Markdown 草稿。",
      characters: "字符",
      weightedCjk: "CJK 权重",
      bytes: "字节",
      words: "词数",
      reading: "阅读",
      presets: "规则",
      lines: "行数",
      paragraphs: "段落",
      headings: "标题",
      links: "链接",
      howLabel: "TextFit 如何工作",
      howTitle: "具体页面，同一个快速工具。",
      howBody: "TextFit 给具体写作任务提供固定链接。YouTube 标题、Google Ads 标题、微信文章标题等页面都会打开同一个计数器，并自动选中对应规则。",
      faqTitle: "发布前更适合检查。",
      faqUploadQ: "TextFit 会上传我的文本吗？",
      faqUploadA: "不会。当前版本使用浏览器里的 JavaScript 本地计数。",
      faqPresetQ: "为什么有些规则是 verified，有些是 guide？",
      faqPresetA: "有些平台公开了明确限制；有些没有稳定公开限制，所以 TextFit 把它们标记为写作参考范围。",
      faqCjkQ: "CJK 权重计数是什么意思？",
      faqCjkA: "部分广告系统会把中日韩全角字符按 2 计算。TextFit 会同时显示普通字符、权重字符和字节数。",
      privacyLabel: "隐私",
      privacyTitle: "隐私说明",
      privacyBody: "TextFit 在浏览器内统计你粘贴的文本。当前版本不会把原文上传到 Solidscreen 服务器。网站可能使用 Cloudflare Web Analytics 和 Google AdSense，它们会按各自政策处理标准访问、设备和广告数据。",
      termsLabel: "条款",
      termsTitle: "使用条款",
      termsBody: "TextFit 是一个实用型浏览器工具。你需要自行负责粘贴的文本、使用的结果，以及发布平台的规则。平台限制可能变化，重要场景请检查来源链接和实际平台要求。",
      footerText: "(c) 2026 Solidscreen. TextFit 是 Solidscreen 产品。",
      categories: { All: "全部", Global: "全球", SEO: "SEO", Japan: "日本", China: "中国" },
      units: { chars: "字符", bytes: "字节", weighted: "权重" },
      status: { over: "超出", left: "剩余", short: "不足", overGuide: "超出参考", inRange: "符合范围", ready: "就绪", min: "分钟" }
    },
    "zh-Hant": {
      languageLabel: "語言",
      navTool: "工具",
      navPresets: "規則",
      navFaq: "FAQ",
      navPrivacy: "隱私",
      navTerms: "條款",
      eyebrow: "平台文案檢查器",
      heroTitle: "發布前，把字數對齊到要求。",
      heroIntro: "用於標題、描述、廣告、元資訊和中日韓文案的專注計數器。一個輸入框，清楚的限制，有公開規則時提供來源連結。",
      adLabel: "廣告",
      adTitle: "橫向展示廣告位",
      pasteText: "貼上文字",
      localCounts: "計數在你的瀏覽器本機執行。",
      loadSample: "載入範例",
      reset: "重置",
      copyText: "複製文字",
      copyRuleLink: "複製規則連結",
      textareaPlaceholder: "貼上標題、描述、廣告標題、貼文或 Markdown 草稿。",
      characters: "字元",
      weightedCjk: "CJK 權重",
      bytes: "位元組",
      words: "詞數",
      reading: "閱讀",
      presets: "規則",
      lines: "行數",
      paragraphs: "段落",
      headings: "標題",
      links: "連結",
      howLabel: "TextFit 如何運作",
      howTitle: "具體頁面，同一個快速工具。",
      howBody: "TextFit 為具體寫作任務提供固定連結。YouTube 標題、Google Ads 標題、微信文章標題等頁面都會開啟同一個計數器，並自動選中對應規則。",
      faqTitle: "發布前更適合檢查。",
      faqUploadQ: "TextFit 會上傳我的文字嗎？",
      faqUploadA: "不會。目前版本使用瀏覽器裡的 JavaScript 本機計數。",
      faqPresetQ: "為什麼有些規則是 verified，有些是 guide？",
      faqPresetA: "有些平台公開了明確限制；有些沒有穩定公開限制，所以 TextFit 把它們標記為寫作參考範圍。",
      faqCjkQ: "CJK 權重計數是什麼意思？",
      faqCjkA: "部分廣告系統會把中日韓全形字元按 2 計算。TextFit 會同時顯示普通字元、權重字元和位元組數。",
      privacyLabel: "隱私",
      privacyTitle: "隱私說明",
      privacyBody: "TextFit 在瀏覽器內統計你貼上的文字。目前版本不會把原文上傳到 Solidscreen 伺服器。網站可能使用 Cloudflare Web Analytics 和 Google AdSense，它們會依各自政策處理標準訪問、裝置和廣告資料。",
      termsLabel: "條款",
      termsTitle: "使用條款",
      termsBody: "TextFit 是一個實用型瀏覽器工具。你需要自行負責貼上的文字、使用的結果，以及發布平台的規則。平台限制可能變更，重要情境請檢查來源連結和實際平台要求。",
      footerText: "(c) 2026 Solidscreen. TextFit 是 Solidscreen 產品。",
      categories: { All: "全部", Global: "全球", SEO: "SEO", Japan: "日本", China: "中國" },
      units: { chars: "字元", bytes: "位元組", weighted: "權重" },
      status: { over: "超出", left: "剩餘", short: "不足", overGuide: "超出參考", inRange: "符合範圍", ready: "就緒", min: "分鐘" }
    }
  };

  let activeCategory = "All";
  let activePreset = byId[bodyPreset] || bySlug[getSlugFromPath()] || presets[0];
  let markdownMode = false;
  let isComposing = false;
  let currentLanguage = getInitialLanguage();

  function getInitialLanguage() {
    const saved = localStorage.getItem("textfit-language");
    if (saved && translations[saved]) return saved;
    const browserLanguage = navigator.language || "";
    if (browserLanguage.startsWith("ja")) return "ja";
    if (browserLanguage.toLowerCase().includes("hant") || ["zh-tw", "zh-hk", "zh-mo"].some((prefix) => browserLanguage.toLowerCase().startsWith(prefix))) return "zh-Hant";
    if (browserLanguage.startsWith("zh")) return "zh-Hans";
    return "en";
  }

  function t(key) {
    return translations[currentLanguage]?.[key] || translations.en[key] || key;
  }

  function getSlugFromPath() {
    return window.location.pathname.split("/").filter(Boolean).pop() || "";
  }

  function countCodePoints(value) {
    return Array.from(value).length;
  }

  function countBytes(value) {
    return new TextEncoder().encode(value).length;
  }

  function countWeighted(value) {
    let total = 0;
    for (const char of value) {
      const code = char.codePointAt(0);
      const isWide = (
        code >= 0x1100 &&
        (code <= 0x115f ||
          code === 0x2329 ||
          code === 0x232a ||
          (code >= 0x2e80 && code <= 0xa4cf) ||
          (code >= 0xac00 && code <= 0xd7a3) ||
          (code >= 0xf900 && code <= 0xfaff) ||
          (code >= 0xfe10 && code <= 0xfe19) ||
          (code >= 0xfe30 && code <= 0xfe6f) ||
          (code >= 0xff00 && code <= 0xff60) ||
          (code >= 0xffe0 && code <= 0xffe6))
      );
      total += isWide ? 2 : 1;
    }
    return total;
  }

  function stripMarkdown(value) {
    return value
      .replace(/```[\s\S]*?```/g, "")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/^#{1,6}\s+/gm, "")
      .replace(/^>\s?/gm, "")
      .replace(/^[-*+]\s+/gm, "")
      .replace(/^\d+\.\s+/gm, "")
      .replace(/[*_~#]/g, "");
  }

  function getWorkingText() {
    const value = textarea.value || "";
    return markdownMode ? stripMarkdown(value) : value;
  }

  function getMetric(value, preset) {
    if (preset.unit === "bytes") return countBytes(value);
    if (preset.unit === "weighted") return countWeighted(value);
    return countCodePoints(value);
  }

  function unitLabel(unit) {
    const labels = translations[currentLanguage]?.units || translations.en.units;
    if (unit === "bytes") return labels.bytes;
    if (unit === "weighted") return labels.weighted;
    return labels.chars;
  }

  function analyzeMarkdown(value) {
    return {
      headings: (value.match(/^#{1,6}\s+/gm) || []).length,
      links: (value.match(/\[[^\]]+\]\([^)]+\)/g) || []).length,
      lists: (value.match(/^(\s*)([-*+]|\d+\.)\s+/gm) || []).length,
      codeBlocks: (value.match(/```[\s\S]*?```/g) || []).length
    };
  }

  function getStatus(metric, preset) {
    const statusLabels = translations[currentLanguage]?.status || translations.en.status;
    if (preset.limit) {
      if (metric > preset.limit) return { label: `${metric - preset.limit} ${statusLabels.over}`, state: "bad", max: preset.limit };
      return { label: `${preset.limit - metric} ${statusLabels.left}`, state: "ok", max: preset.limit };
    }
    if (preset.recommendedMax) {
      if (metric < preset.recommendedMin) return { label: `${preset.recommendedMin - metric} ${statusLabels.short}`, state: "bad", max: preset.recommendedMax };
      if (metric > preset.recommendedMax) return { label: `${metric - preset.recommendedMax} ${statusLabels.overGuide}`, state: "bad", max: preset.recommendedMax };
      return { label: statusLabels.inRange, state: "ok", max: preset.recommendedMax };
    }
    return { label: statusLabels.ready, state: "ok", max: Math.max(metric, 1) };
  }

  function renderStaticText() {
    document.documentElement.lang = currentLanguage;
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      node.textContent = t(node.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
      node.placeholder = t(node.dataset.i18nPlaceholder);
    });
    if (languageSelect) languageSelect.value = currentLanguage;
  }

  function renderCategories() {
    const categoryLabels = translations[currentLanguage]?.categories || translations.en.categories;
    const categories = ["All", ...new Set(presets.map((preset) => preset.category))];
    categoryTabs.innerHTML = "";
    categories.forEach((category) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = category === activeCategory ? "chip active" : "chip";
      button.textContent = categoryLabels[category] || category;
      button.addEventListener("click", () => {
        activeCategory = category;
        renderCategories();
        renderPresets();
      });
      categoryTabs.appendChild(button);
    });
  }

  function renderPresets() {
    const shown = activeCategory === "All" ? presets : presets.filter((preset) => preset.category === activeCategory);
    presetGrid.innerHTML = "";
    shown.forEach((preset) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = preset.id === activePreset.id ? "preset active" : "preset";
      const rule = preset.limit ? `${preset.limit} ${unitLabel(preset.unit)}` : `${preset.recommendedMin}-${preset.recommendedMax} ${unitLabel(preset.unit)}`;
      button.innerHTML = `
        <span class="presetTop"><span>${preset.platform}</span></span>
        <strong>${preset.field}</strong>
        <small>${rule}</small>
      `;
      button.addEventListener("click", () => setPreset(preset, true));
      presetGrid.appendChild(button);
    });
  }

  function setPreset(preset, pushState) {
    activePreset = preset;
    if (pushState && history.replaceState) {
      history.replaceState(null, "", `/${preset.slug}/`);
    }
    renderPresets();
    renderResult();
  }

  function renderResult() {
    const raw = textarea.value || "";
    const working = getWorkingText();
    const metric = getMetric(working, activePreset);
    const status = getStatus(metric, activePreset);
    const words = (working.trim().match(/[A-Za-z0-9]+(?:[-'][A-Za-z0-9]+)?|[\u3040-\u30ff\u3400-\u9fff]/g) || []).length;
    const cjk = (working.match(/[\u3040-\u30ff\u3400-\u9fff]/g) || []).length;
    const lines = raw ? raw.split(/\r\n|\r|\n/).length : 0;
    const paragraphs = raw.trim() ? raw.trim().split(/\n\s*\n/).length : 0;
    const markdown = analyzeMarkdown(raw);
    const readingMinutes = Math.max(1, Math.ceil(Math.max(words / 220, cjk / 450)));

    selectedTitle.textContent = activePreset.label;
    selectedMeta.textContent = `${activePreset.platform} / ${activePreset.field} / ${activePreset.type}`;
    selectedHint.textContent = activePreset.hint;
    selectedSource.textContent = activePreset.sourceName || "No public source";
    selectedSource.href = activePreset.sourceUrl || "#";
    scoreValue.textContent = metric.toLocaleString();
    scoreLabel.textContent = `${unitLabel(activePreset.unit)} · ${status.label}`;
    progress.style.width = `${Math.min((metric / status.max) * 100, 100)}%`;
    document.querySelector("[data-meter]").dataset.state = status.state;

    const values = {
      chars: countCodePoints(working),
      weighted: countWeighted(working),
      bytes: countBytes(working),
      words,
      lines,
      paragraphs,
      read: `${readingMinutes} ${translations[currentLanguage]?.status?.min || translations.en.status.min}`,
      headings: markdown.headings,
      links: markdown.links,
      lists: markdown.lists,
      code: markdown.codeBlocks
    };
    statNodes.forEach((node) => {
      node.textContent = values[node.dataset.stat];
    });
  }

  function copyText() {
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const restoreScroll = () => {
      copyButton.blur();
      window.scrollTo(scrollX, scrollY);
      window.requestAnimationFrame(() => window.scrollTo(scrollX, scrollY));
    };
    restoreScroll();
    Promise.resolve()
      .then(() => navigator.clipboard.writeText(textarea.value || ""))
      .catch(() => {})
      .finally(restoreScroll);
  }

  function copyLink() {
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const url = `${window.location.origin}/${activePreset.slug}/`;
    const restoreScroll = () => {
      linkButton.blur();
      window.scrollTo(scrollX, scrollY);
      window.requestAnimationFrame(() => window.scrollTo(scrollX, scrollY));
    };
    restoreScroll();
    Promise.resolve()
      .then(() => navigator.clipboard.writeText(url))
      .catch(() => {})
      .finally(restoreScroll);
  }

  textarea.addEventListener("compositionstart", () => {
    isComposing = true;
  });
  textarea.addEventListener("compositionend", () => {
    isComposing = false;
    renderResult();
  });
  textarea.addEventListener("input", () => {
    if (!isComposing) renderResult();
  });
  markdownToggle.addEventListener("change", () => {
    markdownMode = markdownToggle.checked;
    renderResult();
  });
  languageSelect?.addEventListener("change", () => {
    currentLanguage = languageSelect.value;
    localStorage.setItem("textfit-language", currentLanguage);
    renderStaticText();
    renderCategories();
    renderPresets();
    renderResult();
  });
  copyButton.addEventListener("mousedown", (event) => event.preventDefault());
  linkButton.addEventListener("mousedown", (event) => event.preventDefault());
  copyButton.addEventListener("click", copyText);
  linkButton.addEventListener("click", copyLink);
  clearButton.addEventListener("click", () => {
    textarea.value = "";
    textarea.focus();
    renderResult();
  });
  sampleButton.addEventListener("click", () => {
    textarea.value = activePreset.example || "";
    textarea.focus();
    renderResult();
  });

  renderStaticText();
  renderCategories();
  renderPresets();
  setPreset(activePreset, false);
})();
