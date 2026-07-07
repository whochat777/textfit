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
  const linkButton = document.querySelector("[data-link]");
  const languageSelect = document.querySelector("[data-language-select]");
  const bodyPreset = document.body.dataset.preset;
  const translations = {
    en: {
      languageLabel: "Language",
      navTool: "Tool",
      navPresets: "Presets",
      navLimits: "Limits",
      navFaq: "FAQ",
      navPrivacy: "Privacy",
      navTerms: "Terms",
      eyebrow: "Platform copy checker",
      heroTitle: "Fit copy to the field before you publish.",
      heroIntro: "A focused counter for titles, descriptions, ads, metadata, and platform copy. One text box, clear limits, source links where public rules exist.",
      adLabel: "Advertisement",
      adTitle: "Horizontal display slot",
      pasteText: "Paste text",
      localCounts: "Counts run locally in your browser.",
      reset: "Reset",
      copyText: "Copy text",
      copyRuleLink: "Copy rule link",
      textareaPlaceholder: "Paste a title, description, ad headline, post, or Markdown draft here.",
      characters: "Characters",
      weightedCjk: "Weighted width",
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
      faqCjkQ: "What is weighted width counting?",
      faqCjkA: "Some ad systems count full-width characters as 2. TextFit shows that weighted count next to normal characters and bytes.",
      privacyLabel: "Privacy",
      privacyTitle: "Privacy notice",
      privacyBody: "TextFit counts pasted text in your browser. The current version does not upload your source text to a Solidscreen server. The site may use Cloudflare Web Analytics and Google AdSense, which can process standard visit, device, and advertising data according to their own policies.",
      termsLabel: "Terms",
      termsTitle: "Terms of use",
      termsBody: "TextFit is provided as a practical browser tool. You are responsible for the text you paste, the results you use, and the rules of any platform where you publish. Platform limits can change, so source links and writing ranges should be checked when accuracy matters.",
      footerText: "(c) 2026 Solidscreen. TextFit is a Solidscreen product.",
      categories: { All: "All", Global: "Global", SEO: "SEO", Japan: "Japan", China: "China" },
      platforms: { Search: "Search", Xiaohongshu: "Xiaohongshu", WeChat: "WeChat", Bilibili: "Bilibili", Douyin: "Douyin" },
      fields: {
        "Video title": "Video title",
        "Video description": "Video description",
        "Responsive search ad headline": "Responsive search ad headline",
        "Responsive search ad description": "Responsive search ad description",
        "App name": "App name",
        "Subtitle": "Subtitle",
        "Meta title": "Meta title",
        "Meta description": "Meta description",
        "Post": "Post",
        "Article title": "Article title",
        "Note title": "Note title",
        "Video caption": "Video caption"
      },
      presetTypes: {
        "Verified limit": "Verified limit",
        "Practical range": "Practical range",
        "Platform style count": "Platform style count",
        "Writing guide": "Writing guide"
      },
      presetLabels: {
        "youtube-title": "YouTube title",
        "youtube-description": "YouTube description",
        "google-ads-headline": "Google Ads headline",
        "google-ads-description": "Google Ads description",
        "app-store-name": "App Store name",
        "app-store-subtitle": "App Store subtitle",
        "meta-title": "Meta title",
        "meta-description": "Meta description",
        "x-post": "X post",
        "note-title": "note title",
        "qiita-title": "Qiita title",
        "zenn-title": "Zenn title",
        "xiaohongshu-title": "Xiaohongshu title",
        "wechat-title": "WeChat article title",
        "bilibili-title": "Bilibili title",
        "douyin-title": "Douyin caption"
      },
      hintTemplates: {
        verified: "This field has a published maximum. Use the source link to check the current rule.",
        weighted: "This rule uses weighted width counting, where full-width characters can count as 2.",
        bytes: "This rule is measured in bytes, so wide characters and emoji can take more space.",
        guide: "This is a practical writing range, not a guaranteed platform limit.",
        sourceFallback: "No public source"
      },
      units: { chars: "chars", bytes: "bytes", weighted: "weighted" },
      status: { over: "over", left: "left", short: "short", overGuide: "over guide", inRange: "in range", ready: "ready", min: "min" }
    },
    ja: {
      languageLabel: "言語",
      navTool: "ツール",
      navPresets: "プリセット",
      navLimits: "制限一覧",
      navFaq: "FAQ",
      navPrivacy: "プライバシー",
      navTerms: "利用規約",
      eyebrow: "プラットフォーム用コピー確認",
      heroTitle: "公開前に文字数を合わせる。",
      heroIntro: "タイトル、説明文、広告、メタ情報、プラットフォーム文案向けの文字数カウンターです。入力欄はひとつ、制限は明確に、公開ルールがある場合は出典リンクを表示します。",
      adLabel: "広告",
      adTitle: "横長ディスプレイ広告枠",
      pasteText: "テキストを入力",
      localCounts: "カウントはブラウザ内で実行されます。",
      reset: "リセット",
      copyText: "本文をコピー",
      copyRuleLink: "ルールリンクをコピー",
      textareaPlaceholder: "タイトル、説明文、広告見出し、投稿、Markdown 下書きを貼り付けてください。",
      characters: "文字数",
      weightedCjk: "幅換算",
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
      faqCjkQ: "幅換算とは？",
      faqCjkA: "一部の広告システムでは全角文字を 2 と数えます。TextFit は通常の文字数やバイト数と並べて表示します。",
      privacyLabel: "プライバシー",
      privacyTitle: "プライバシー通知",
      privacyBody: "TextFit は貼り付けたテキストをブラウザ内でカウントします。現在のバージョンでは原文を Solidscreen のサーバーへ送信しません。Cloudflare Web Analytics と Google AdSense は、各ポリシーに従って標準的な閲覧・端末・広告データを処理する場合があります。",
      termsLabel: "利用規約",
      termsTitle: "利用条件",
      termsBody: "TextFit は実用的なブラウザツールとして提供されます。入力するテキスト、利用する結果、公開先プラットフォームのルール確認は利用者の責任です。制限は変更される場合があります。",
      footerText: "(c) 2026 Solidscreen. TextFit は Solidscreen のプロダクトです。",
      categories: { All: "すべて", Global: "グローバル", SEO: "SEO", Japan: "日本", China: "中国" },
      platforms: { Search: "検索", Xiaohongshu: "小紅書", WeChat: "WeChat", Bilibili: "Bilibili", Douyin: "Douyin" },
      fields: {
        "Video title": "動画タイトル",
        "Video description": "動画説明",
        "Responsive search ad headline": "検索広告の見出し",
        "Responsive search ad description": "検索広告の説明文",
        "App name": "アプリ名",
        "Subtitle": "サブタイトル",
        "Meta title": "メタタイトル",
        "Meta description": "メタディスクリプション",
        "Post": "投稿",
        "Article title": "記事タイトル",
        "Note title": "ノートタイトル",
        "Video caption": "動画キャプション"
      },
      presetTypes: {
        "Verified limit": "公開制限",
        "Practical range": "実用目安",
        "Platform style count": "形式別カウント",
        "Writing guide": "執筆目安"
      },
      presetLabels: {
        "youtube-title": "YouTube タイトル",
        "youtube-description": "YouTube 説明文",
        "google-ads-headline": "Google 広告 見出し",
        "google-ads-description": "Google 広告 説明文",
        "app-store-name": "App Store アプリ名",
        "app-store-subtitle": "App Store サブタイトル",
        "meta-title": "メタタイトル",
        "meta-description": "メタディスクリプション",
        "x-post": "X 投稿",
        "note-title": "note タイトル",
        "qiita-title": "Qiita タイトル",
        "zenn-title": "Zenn タイトル",
        "xiaohongshu-title": "小紅書タイトル",
        "wechat-title": "WeChat 記事タイトル",
        "bilibili-title": "Bilibili タイトル",
        "douyin-title": "Douyin キャプション"
      },
      hintTemplates: {
        verified: "公開されている上限です。現在のルールは出典リンクで確認してください。",
        weighted: "幅換算を使います。全角文字は 2 と数える場合があります。",
        bytes: "バイト数で測るルールです。全角文字や絵文字は容量が大きくなる場合があります。",
        guide: "これは実用的な執筆目安で、固定された公式上限ではありません。",
        sourceFallback: "公開出典なし"
      },
      units: { chars: "文字", bytes: "バイト", weighted: "換算" },
      status: { over: "超過", left: "残り", short: "不足", overGuide: "目安超過", inRange: "範囲内", ready: "準備完了", min: "分" }
    },
    "zh-Hans": {
      languageLabel: "语言",
      navTool: "工具",
      navPresets: "规则",
      navLimits: "限制中心",
      navFaq: "FAQ",
      navPrivacy: "隐私",
      navTerms: "条款",
      eyebrow: "平台文案检查器",
      heroTitle: "发布前，把字数对齐到要求。",
      heroIntro: "用于标题、描述、广告、元信息和平台文案的专注计数器。一个输入框，清楚的限制，有公开规则时提供来源链接。",
      adLabel: "广告",
      adTitle: "横向展示广告位",
      pasteText: "粘贴文本",
      localCounts: "计数在你的浏览器本地运行。",
      reset: "重置",
      copyText: "复制文本",
      copyRuleLink: "复制规则链接",
      textareaPlaceholder: "粘贴标题、描述、广告标题、帖子或 Markdown 草稿。",
      characters: "字符",
      weightedCjk: "字幅权重",
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
      faqCjkQ: "字幅权重计数是什么意思？",
      faqCjkA: "部分广告系统会把全角字符按 2 计算。TextFit 会同时显示普通字符、权重字符和字节数。",
      privacyLabel: "隐私",
      privacyTitle: "隐私说明",
      privacyBody: "TextFit 在浏览器内统计你粘贴的文本。当前版本不会把原文上传到 Solidscreen 服务器。网站可能使用 Cloudflare Web Analytics 和 Google AdSense，它们会按各自政策处理标准访问、设备和广告数据。",
      termsLabel: "条款",
      termsTitle: "使用条款",
      termsBody: "TextFit 是一个实用型浏览器工具。你需要自行负责粘贴的文本、使用的结果，以及发布平台的规则。平台限制可能变化，重要场景请检查来源链接和实际平台要求。",
      footerText: "(c) 2026 Solidscreen. TextFit 是 Solidscreen 产品。",
      categories: { All: "全部", Global: "全球", SEO: "SEO", Japan: "日本", China: "中国" },
      platforms: { Search: "搜索", Xiaohongshu: "小红书", WeChat: "微信", Bilibili: "B站", Douyin: "抖音" },
      fields: {
        "Video title": "视频标题",
        "Video description": "视频描述",
        "Responsive search ad headline": "搜索广告标题",
        "Responsive search ad description": "搜索广告描述",
        "App name": "应用名称",
        "Subtitle": "副标题",
        "Meta title": "网页标题",
        "Meta description": "网页描述",
        "Post": "帖子",
        "Article title": "文章标题",
        "Note title": "笔记标题",
        "Video caption": "视频文案"
      },
      presetTypes: {
        "Verified limit": "公开限制",
        "Practical range": "实用范围",
        "Platform style count": "平台计数",
        "Writing guide": "写作参考"
      },
      presetLabels: {
        "youtube-title": "YouTube 标题",
        "youtube-description": "YouTube 描述",
        "google-ads-headline": "Google Ads 标题",
        "google-ads-description": "Google Ads 描述",
        "app-store-name": "App Store 应用名",
        "app-store-subtitle": "App Store 副标题",
        "meta-title": "网页标题",
        "meta-description": "网页描述",
        "x-post": "X 帖子",
        "note-title": "note 标题",
        "qiita-title": "Qiita 标题",
        "zenn-title": "Zenn 标题",
        "xiaohongshu-title": "小红书标题",
        "wechat-title": "微信公众号标题",
        "bilibili-title": "B站标题",
        "douyin-title": "抖音文案"
      },
      hintTemplates: {
        verified: "这是公开上限。请通过来源链接确认平台当前规则。",
        weighted: "这条规则使用字幅权重计数，全角字符可能按 2 计算。",
        bytes: "这条规则按字节计算，全角字符和 emoji 可能占用更多空间。",
        guide: "这是实用写作范围，不是平台保证不变的硬性上限。",
        sourceFallback: "暂无公开来源"
      },
      units: { chars: "字符", bytes: "字节", weighted: "权重" },
      status: { over: "超出", left: "剩余", short: "不足", overGuide: "超出参考", inRange: "符合范围", ready: "就绪", min: "分钟" }
    },
    "zh-Hant": {
      languageLabel: "語言",
      navTool: "工具",
      navPresets: "規則",
      navLimits: "限制中心",
      navFaq: "FAQ",
      navPrivacy: "隱私",
      navTerms: "條款",
      eyebrow: "平台文案檢查器",
      heroTitle: "發布前，把字數對齊到要求。",
      heroIntro: "用於標題、描述、廣告、元資訊和平台文案的專注計數器。一個輸入框，清楚的限制，有公開規則時提供來源連結。",
      adLabel: "廣告",
      adTitle: "橫向展示廣告位",
      pasteText: "貼上文字",
      localCounts: "計數在你的瀏覽器本機執行。",
      reset: "重置",
      copyText: "複製文字",
      copyRuleLink: "複製規則連結",
      textareaPlaceholder: "貼上標題、描述、廣告標題、貼文或 Markdown 草稿。",
      characters: "字元",
      weightedCjk: "字幅權重",
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
      faqCjkQ: "字幅權重計數是什麼意思？",
      faqCjkA: "部分廣告系統會把全形字元按 2 計算。TextFit 會同時顯示普通字元、權重字元和位元組數。",
      privacyLabel: "隱私",
      privacyTitle: "隱私說明",
      privacyBody: "TextFit 在瀏覽器內統計你貼上的文字。目前版本不會把原文上傳到 Solidscreen 伺服器。網站可能使用 Cloudflare Web Analytics 和 Google AdSense，它們會依各自政策處理標準訪問、裝置和廣告資料。",
      termsLabel: "條款",
      termsTitle: "使用條款",
      termsBody: "TextFit 是一個實用型瀏覽器工具。你需要自行負責貼上的文字、使用的結果，以及發布平台的規則。平台限制可能變更，重要情境請檢查來源連結和實際平台要求。",
      footerText: "(c) 2026 Solidscreen. TextFit 是 Solidscreen 產品。",
      categories: { All: "全部", Global: "全球", SEO: "SEO", Japan: "日本", China: "中國" },
      platforms: { Search: "搜尋", Xiaohongshu: "小紅書", WeChat: "微信", Bilibili: "B站", Douyin: "抖音" },
      fields: {
        "Video title": "影片標題",
        "Video description": "影片描述",
        "Responsive search ad headline": "搜尋廣告標題",
        "Responsive search ad description": "搜尋廣告描述",
        "App name": "應用名稱",
        "Subtitle": "副標題",
        "Meta title": "網頁標題",
        "Meta description": "網頁描述",
        "Post": "貼文",
        "Article title": "文章標題",
        "Note title": "筆記標題",
        "Video caption": "影片文案"
      },
      presetTypes: {
        "Verified limit": "公開限制",
        "Practical range": "實用範圍",
        "Platform style count": "平台計數",
        "Writing guide": "寫作參考"
      },
      presetLabels: {
        "youtube-title": "YouTube 標題",
        "youtube-description": "YouTube 描述",
        "google-ads-headline": "Google Ads 標題",
        "google-ads-description": "Google Ads 描述",
        "app-store-name": "App Store 應用名",
        "app-store-subtitle": "App Store 副標題",
        "meta-title": "網頁標題",
        "meta-description": "網頁描述",
        "x-post": "X 貼文",
        "note-title": "note 標題",
        "qiita-title": "Qiita 標題",
        "zenn-title": "Zenn 標題",
        "xiaohongshu-title": "小紅書標題",
        "wechat-title": "微信公眾號標題",
        "bilibili-title": "B站標題",
        "douyin-title": "抖音文案"
      },
      hintTemplates: {
        verified: "這是公開上限。請透過來源連結確認平台目前規則。",
        weighted: "這條規則使用字幅權重計數，全形字元可能按 2 計算。",
        bytes: "這條規則按位元組計算，全形字元和 emoji 可能佔用更多空間。",
        guide: "這是實用寫作範圍，不是平台保證不變的硬性上限。",
        sourceFallback: "暫無公開來源"
      },
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

  function tMap(group, key) {
    return translations[currentLanguage]?.[group]?.[key] || translations.en[group]?.[key] || key;
  }

  function presetLabel(preset) {
    return tMap("presetLabels", preset.id);
  }

  function presetPlatform(preset) {
    return tMap("platforms", preset.platform);
  }

  function presetField(preset) {
    return tMap("fields", preset.field);
  }

  function presetType(preset) {
    return tMap("presetTypes", preset.type);
  }

  function presetHint(preset) {
    const hints = translations[currentLanguage]?.hintTemplates || translations.en.hintTemplates;
    if (preset.unit === "bytes") return hints.bytes;
    if (preset.unit === "weighted") return hints.weighted;
    if (preset.recommendedMax) return hints.guide;
    return hints.verified;
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
        <span class="presetTop"><span>${presetPlatform(preset)}</span></span>
        <strong>${presetField(preset)}</strong>
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

    selectedTitle.textContent = presetLabel(activePreset);
    selectedMeta.textContent = `${presetPlatform(activePreset)} / ${presetField(activePreset)} / ${presetType(activePreset)}`;
    selectedHint.textContent = presetHint(activePreset);
    selectedSource.textContent = activePreset.sourceName || (translations[currentLanguage]?.hintTemplates?.sourceFallback || translations.en.hintTemplates.sourceFallback);
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
  renderStaticText();
  renderCategories();
  renderPresets();
  setPreset(activePreset, false);
})();
