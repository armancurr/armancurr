function supported(): boolean {
  return typeof navigator !== "undefined" && "vibrate" in navigator;
}

export const haptics = {
  light: () => supported() && navigator.vibrate(10),
  medium: () => supported() && navigator.vibrate(25),
  heavy: () => supported() && navigator.vibrate([30, 10, 30]),
  hover: () => supported() && navigator.vibrate(8),
  click: () => supported() && navigator.vibrate(15),
};
