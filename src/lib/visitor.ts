"use client";

import { useSyncExternalStore } from "react";

// 訪客稱呼存在瀏覽器的 localStorage，讓歡迎視窗與各處的歡迎文字共用同一份資料
const STORAGE_KEY = "visitor-name";
const listeners = new Set<() => void>();
let editing = false;
let memoryName: string | null = null;

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function readName() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function saveVisitorName(name: string) {
  try {
    localStorage.setItem(STORAGE_KEY, name);
  } catch {
    // 無痕模式等情況無法寫入時，只在這次瀏覽中生效
  }
  memoryName = name;
  editing = false;
  emit();
}

export function editVisitorName() {
  editing = true;
  emit();
}

export function cancelEditVisitorName() {
  editing = false;
  emit();
}

// 尚未輸入過稱呼時回傳 null；伺服器端渲染時一律回傳 undefined，代表「還不知道」
export function useVisitorName() {
  return useSyncExternalStore(
    subscribe,
    () => readName() ?? memoryName,
    () => undefined,
  );
}

export function useEditingVisitorName() {
  return useSyncExternalStore(
    subscribe,
    () => editing,
    () => false,
  );
}
