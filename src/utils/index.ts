/**
 * @runwell/brand-kit utilities
 */

export type Brand = 'external' | 'internal';
export type Mode = 'light' | 'dark';

export interface ThemeSwitcherOptions {
  defaultBrand?: Brand;
  defaultMode?: Mode;
  persistKey?: string;
  onBrandChange?: (brand: Brand) => void;
  onModeChange?: (mode: Mode) => void;
}

export interface ThemeSwitcher {
  getBrand: () => Brand;
  getMode: () => Mode;
  setBrand: (brand: Brand) => void;
  setMode: (mode: Mode) => void;
  toggleMode: () => void;
  init: () => void;
}

/**
 * Create a theme switcher for managing brand and mode
 */
export function createThemeSwitcher(options: ThemeSwitcherOptions = {}): ThemeSwitcher {
  const {
    defaultBrand = 'external',
    defaultMode = 'light',
    persistKey = 'runwell-theme',
    onBrandChange,
    onModeChange,
  } = options;

  let currentBrand: Brand = defaultBrand;
  let currentMode: Mode = defaultMode;

  // Load persisted preference
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    try {
      const persisted = localStorage.getItem(persistKey);
      if (persisted) {
        const { brand, mode } = JSON.parse(persisted);
        if (brand === 'external' || brand === 'internal') currentBrand = brand;
        if (mode === 'light' || mode === 'dark') currentMode = mode;
      }
    } catch {
      // Ignore parse errors
    }
  }

  function applyTheme() {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;

    // Remove existing theme classes
    root.classList.remove('dark', 'light', 'external', 'internal');
    root.removeAttribute('data-theme');
    root.removeAttribute('data-brand');

    // Apply current theme
    root.classList.add(currentMode);
    root.classList.add(currentBrand);
    root.setAttribute('data-theme', currentMode);
    root.setAttribute('data-brand', currentBrand);
  }

  function persist() {
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem(persistKey, JSON.stringify({
          brand: currentBrand,
          mode: currentMode,
        }));
      } catch {
        // Ignore storage errors
      }
    }
  }

  return {
    getBrand: () => currentBrand,
    getMode: () => currentMode,

    setBrand(brand: Brand) {
      if (brand !== currentBrand) {
        currentBrand = brand;
        applyTheme();
        persist();
        onBrandChange?.(brand);
      }
    },

    setMode(mode: Mode) {
      if (mode !== currentMode) {
        currentMode = mode;
        applyTheme();
        persist();
        onModeChange?.(mode);
      }
    },

    toggleMode() {
      const newMode = currentMode === 'light' ? 'dark' : 'light';
      currentMode = newMode;
      applyTheme();
      persist();
      onModeChange?.(newMode);
    },

    init() {
      applyTheme();
    },
  };
}

/**
 * Get CSS variable value from the document
 */
export function getCssVar(name: string): string {
  if (typeof document === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

/**
 * Set CSS variable value on the document
 */
export function setCssVar(name: string, value: string): void {
  if (typeof document === 'undefined') return;
  document.documentElement.style.setProperty(name, value);
}
