import { getHostDocument, getHostWindow } from './host.js';

/**
 * 精准手势防误触守卫
 * 过滤掉：上下滚动阅读、左右滑动翻页（Swipe）、双指缩放、长按选词
 * 仅放行干净利落的轻点（Tap）
 */
const MAX_TAP_DISTANCE = 9; // px：超过即判定为滚动或左右滑动
const MAX_TAP_DURATION = 420; // ms：超过即判定为长按
const SCROLL_COOLDOWN = 260; // ms：滚动结束后的防误触冷却期

let startX = 0;
let startY = 0;
let startTime = 0;
let movedTooMuch = false;
let multiTouch = false;
let lastScrollTime = 0;
let initialized = false;

let onPointerDown = null;
let onPointerMove = null;
let onTouchStart = null;
let onScroll = null;

export function initGestureGuard() {
  if (initialized) return;
  const doc = getHostDocument();
  const win = getHostWindow();

  onPointerDown = (e) => {
    if (e.button && e.button !== 0) return;
    startX = e.clientX;
    startY = e.clientY;
    startTime = Date.now();
    movedTooMuch = false;
    multiTouch = false;
  };

  onPointerMove = (e) => {
    if (movedTooMuch) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (Math.hypot(dx, dy) > MAX_TAP_DISTANCE) {
      movedTooMuch = true;
    }
  };

  onTouchStart = (e) => {
    if (e.touches && e.touches.length > 1) {
      multiTouch = true;
    }
  };

  onScroll = () => {
    lastScrollTime = Date.now();
    movedTooMuch = true;
  };

  doc.addEventListener('pointerdown', onPointerDown, { passive: true, capture: true });
  doc.addEventListener('pointermove', onPointerMove, { passive: true, capture: true });
  doc.addEventListener('touchstart', onTouchStart, { passive: true, capture: true });
  win.addEventListener('scroll', onScroll, { passive: true, capture: true });
  doc.addEventListener('scroll', onScroll, { passive: true, capture: true });
  initialized = true;
}

export function destroyGestureGuard() {
  if (!initialized) return;
  const doc = getHostDocument();
  const win = getHostWindow();
  if (onPointerDown) doc.removeEventListener('pointerdown', onPointerDown, true);
  if (onPointerMove) doc.removeEventListener('pointermove', onPointerMove, true);
  if (onTouchStart) doc.removeEventListener('touchstart', onTouchStart, true);
  if (onScroll) {
    win.removeEventListener('scroll', onScroll, true);
    doc.removeEventListener('scroll', onScroll, true);
  }
  initialized = false;
}

export function isCleanTap(clickEvent) {
  const now = Date.now();
  if (multiTouch || movedTooMuch) return false;
  if (now - lastScrollTime < SCROLL_COOLDOWN) return false;
  if (startTime > 0 && now - startTime > MAX_TAP_DURATION) return false;

  if (clickEvent && typeof clickEvent.clientX === 'number' && startTime > 0) {
    const dx = clickEvent.clientX - startX;
    const dy = clickEvent.clientY - startY;
    if (Math.hypot(dx, dy) > MAX_TAP_DISTANCE) return false;
  }

  const sel = getHostWindow().getSelection();
  if (sel && sel.toString().trim().length > 0) return false;

  return true;
}
