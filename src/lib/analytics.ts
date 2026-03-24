declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, params?: Record<string, string>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
}

export function trackBookNowClick(location: string) {
  trackEvent('book_now_click', { location });
}

export function trackSectionView(sectionName: string) {
  trackEvent('section_view', { section_name: sectionName });
}

export function trackFaqExpand(questionText: string) {
  trackEvent('faq_expand', { question_text: questionText.substring(0, 50) });
}
