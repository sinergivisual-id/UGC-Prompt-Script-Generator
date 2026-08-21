import { HistoryItem } from '@/types';

const STORAGE_KEYS = {
  HISTORY: 'sinergi_ugc_history_v1',
  API_KEY: 'sinergi_ugc_api_key_v1',
  CREDITS: 'sinergi_ugc_credits_v1',
  THEME: 'sinergi_ugc_theme_v1',
};

const INITIAL_CREDITS = 50;

export function getStoredHistory(): HistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to read history from localStorage:', err);
    return [];
  }
}

export function saveHistoryItem(item: HistoryItem): HistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = getStoredHistory();
    // Prepend new item and keep max 50 items
    const updated = [item, ...current.filter((i) => i.id !== item.id)].slice(0, 50);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to save history to localStorage:', err);
    return [];
  }
}

export function deleteHistoryItem(id: string): HistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = getStoredHistory();
    const updated = current.filter((i) => i.id !== id);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to delete history item:', err);
    return [];
  }
}

export function clearAllHistory(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
  } catch (err) {
    console.error('Failed to clear history:', err);
  }
}

export function getCustomApiKey(): string {
  if (typeof window === 'undefined') return '';
  try {
    return localStorage.getItem(STORAGE_KEYS.API_KEY) || '';
  } catch {
    return '';
  }
}

export function setCustomApiKey(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    if (key.trim()) {
      localStorage.setItem(STORAGE_KEYS.API_KEY, key.trim());
    } else {
      localStorage.removeItem(STORAGE_KEYS.API_KEY);
    }
  } catch (err) {
    console.error('Failed to store API Key:', err);
  }
}

export function getRemainingCredits(): number {
  if (typeof window === 'undefined') return INITIAL_CREDITS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CREDITS);
    if (raw === null) {
      localStorage.setItem(STORAGE_KEYS.CREDITS, String(INITIAL_CREDITS));
      return INITIAL_CREDITS;
    }
    return Number(raw) || 0;
  } catch {
    return INITIAL_CREDITS;
  }
}

export function deductCredits(amount: number = 1): number {
  if (typeof window === 'undefined') return INITIAL_CREDITS;
  try {
    const current = getRemainingCredits();
    const next = Math.max(0, current - amount);
    localStorage.setItem(STORAGE_KEYS.CREDITS, String(next));
    return next;
  } catch {
    return INITIAL_CREDITS;
  }
}

export function resetCredits(amount: number = 50): number {
  if (typeof window === 'undefined') return amount;
  try {
    localStorage.setItem(STORAGE_KEYS.CREDITS, String(amount));
    return amount;
  } catch {
    return amount;
  }
}
