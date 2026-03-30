export const normalizeWordPressContent = (html: string) => {
  if (!html || typeof window === "undefined") {
    return html;
  }

  try {
    const parser = new DOMParser();
    const document = parser.parseFromString(`<div>${html}</div>`, "text/html");
    const container = document.body.firstElementChild as HTMLDivElement | null;

    if (!container) {
      return html;
    }

    container.querySelectorAll("script, gwmw").forEach((node) => node.remove());

    // Remove all inline style attributes so CSS class styles always take precedence
    container.querySelectorAll("[style]").forEach((node) => node.removeAttribute("style"));

    // Also strip any inline color attributes directly from the HTML string as a safety net
    const cleaned = container.innerHTML
      .replace(/\bstyle="[^"]*"/gi, "")
      .replace(/\u00a0/g, " ")
      .replace(/<p>\s*<\/p>/g, "")
      .trim();

    return cleaned;
  } catch {
    return html;
  }
};
