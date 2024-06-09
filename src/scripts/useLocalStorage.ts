'use client';

export function getLocalStorage(key: string): string {
  if (typeof window !== 'undefined') {
    const value = localStorage.getItem(key);
    return value || '';
  }
  return '';
}

export function setLocalStorage(key: string, value: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, value);
  }
}

export function removeLocalStorage(key: string) {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
}
