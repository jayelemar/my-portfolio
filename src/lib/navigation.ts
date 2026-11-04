const SCROLL_SETTLE_DELAY = 120;
const ALIGNMENT_TIMEOUT = 2000;

let cancelProjectsAlignment: (() => void) | undefined;

function alignProjectsAfterScroll(element: HTMLElement, scrollOffset: number) {
  let settleTimer: number | undefined;
  let timeoutTimer: number | undefined;
  const inputEvents = [
    "wheel",
    "touchstart",
    "pointerdown",
    "keydown",
  ] as const;

  const cleanup = () => {
    window.clearTimeout(settleTimer);
    window.clearTimeout(timeoutTimer);
    window.removeEventListener("scroll", onScroll);
    inputEvents.forEach((event) => {
      window.removeEventListener(event, cleanup, true);
    });
    if (cancelProjectsAlignment === cleanup) {
      cancelProjectsAlignment = undefined;
    }
  };

  const correctAlignment = () => {
    cleanup();
    if (!element.isConnected) return;
    const correction = element.getBoundingClientRect().top - scrollOffset;
    if (Math.abs(correction) <= 2) return;
    window.scrollBy({
      top: correction,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };

  const onScroll = () => {
    window.clearTimeout(settleTimer);
    settleTimer = window.setTimeout(correctAlignment, SCROLL_SETTLE_DELAY);
  };

  cancelProjectsAlignment = cleanup;
  window.addEventListener("scroll", onScroll, { passive: true });
  inputEvents.forEach((event) => {
    window.addEventListener(event, cleanup, { capture: true, passive: true });
  });
  timeoutTimer = window.setTimeout(cleanup, ALIGNMENT_TIMEOUT);
  onScroll();
}

export function scrollToHome() {
  cancelProjectsAlignment?.();
  if (window.location.hash) {
    window.history.pushState(
      window.history.state,
      "",
      window.location.pathname + window.location.search,
    );
  }
  window.scrollTo({
    top: 0,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "instant"
      : "smooth",
  });
}

export function scrollToSection(id: string) {
  cancelProjectsAlignment?.();
  if (id === "/") {
    scrollToHome();
    return;
  }
  const element = document.getElementById(id);
  if (!element) return;
  const hash = `#${encodeURIComponent(id)}`;
  if (window.location.hash !== hash) {
    window.history.pushState(window.history.state, "", hash);
  }
  if (id === "projects") {
    const scrollOffset = parseFloat(
      window.getComputedStyle(element).scrollMarginTop,
    );
    alignProjectsAfterScroll(element, scrollOffset);
    window.scrollTo({
      top: window.scrollY + element.getBoundingClientRect().top - scrollOffset,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
    return;
  }
  element.scrollIntoView({
    block: "start",
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "instant"
      : "smooth",
  });
}
