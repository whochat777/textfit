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
  const routeLabel = document.querySelector("[data-route-label]");
  const bodyPreset = document.body.dataset.preset;

  let activeCategory = "All";
  let activePreset = byId[bodyPreset] || bySlug[getSlugFromPath()] || presets[0];
  let markdownMode = false;

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
    if (unit === "bytes") return "bytes";
    if (unit === "weighted") return "weighted";
    return "chars";
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
    if (preset.limit) {
      if (metric > preset.limit) return { label: `${metric - preset.limit} over`, state: "bad", max: preset.limit };
      return { label: `${preset.limit - metric} left`, state: metric > preset.limit * .9 ? "warn" : "ok", max: preset.limit };
    }
    if (preset.recommendedMax) {
      if (metric < preset.recommendedMin) return { label: `${preset.recommendedMin - metric} short`, state: "warn", max: preset.recommendedMax };
      if (metric > preset.recommendedMax) return { label: `${metric - preset.recommendedMax} over guide`, state: "warn", max: preset.recommendedMax };
      return { label: "in range", state: "ok", max: preset.recommendedMax };
    }
    return { label: "ready", state: "ok", max: Math.max(metric, 1) };
  }

  function renderCategories() {
    const categories = ["All", ...new Set(presets.map((preset) => preset.category))];
    categoryTabs.innerHTML = "";
    categories.forEach((category) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = category === activeCategory ? "chip active" : "chip";
      button.textContent = category;
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
        <span class="presetTop"><span>${preset.platform}</span><span>${preset.type}</span></span>
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
    routeLabel.textContent = `/${preset.slug}/`;
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
      read: `${readingMinutes} min`,
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
    navigator.clipboard.writeText(textarea.value || "").then(() => {
      copyButton.textContent = "Copied";
      window.setTimeout(() => { copyButton.textContent = "Copy text"; }, 1200);
    });
  }

  function copyLink() {
    const url = `${window.location.origin}/${activePreset.slug}/`;
    navigator.clipboard.writeText(url).then(() => {
      linkButton.textContent = "Link copied";
      window.setTimeout(() => { linkButton.textContent = "Copy preset link"; }, 1200);
    });
  }

  textarea.addEventListener("input", renderResult);
  markdownToggle.addEventListener("change", () => {
    markdownMode = markdownToggle.checked;
    renderResult();
  });
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

  renderCategories();
  renderPresets();
  setPreset(activePreset, false);
})();
