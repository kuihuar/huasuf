export const LAYOUT_DESKTOP_MIN_PX = 1200

export function layoutIsDesktop() {
  if (typeof window === 'undefined') return true
  return window.innerWidth >= LAYOUT_DESKTOP_MIN_PX
}

export function createDesktopLayoutMatcher() {
  return window.matchMedia(`(min-width: ${LAYOUT_DESKTOP_MIN_PX}px)`)
}
