export function getElementPositionToParent (element: HTMLElement) {
  const parent = element?.offsetParent;
  if (!element || !parent) {
    return { top: 0, left: 0, bottom: 0, right: 0 };
  }

  const rect = element.getBoundingClientRect();
  const parentRect = parent.getBoundingClientRect();

  return {
    top: rect.top - parentRect.top,
    bottom: rect.bottom - parentRect.bottom,
    left: rect.left - parentRect.left,
    right: rect.right - parentRect.right,
  };
}
