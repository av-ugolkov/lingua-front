import { useEffect, useState } from 'react';

export const getLocalStorage = (storageKey: string): string => {
  return localStorage.getItem(storageKey) || '';
};

export const setLocalStorage = (storageKey: string, value: string) => {
  localStorage.setItem(storageKey, value);
};

export const removeLocalStorage = (storageKey: string) => {
  localStorage.removeItem(storageKey);
};
