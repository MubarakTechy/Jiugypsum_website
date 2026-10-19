type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Safe no-op unless an analytics tag is present (see NEXT_PUBLIC_GA_ID).
 * Never throws and never sends personal details (no names, phones or messages).
 */
export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  try {
    if (typeof window.gtag === "function") window.gtag("event", event, params);
    else if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event, ...params });
  } catch {
    /* analytics must never break the page */
  }
}
