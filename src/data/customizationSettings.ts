import { AppCustomizationSettings } from '../types';

export const DEFAULT_CUSTOMIZATION_SETTINGS: AppCustomizationSettings = {
  fontFamily: 'sans',
  fontSizeScale: 'normal',
  categoryOrder: [
    'Pizzas',
    'Garlic Bread',
    'Calzones',
    'Burgers',
    'Wraps',
    'Meal Deals',
    'Sides',
    'Desserts',
    'Drinks'
  ],
  digitalSignage: {
    layoutMode: 'grid-2col',
    showImages: true,
    showDescriptions: true,
    showVariations: true,
    showDietaryBadges: true,
    cycleInterval: 10,
    autoCycle: true,
    tickerText: '🍕 PIZZA PINO • AUTHENTIC STONE-BAKED PIZZAS • 100% MOZZARELLA & FRESH HAND-STRETCHED DOUGH DAILY • 🔥 TRY THE PINO SPECIAL & SIZZLER BURGERS • ⚡ CARD, APPLE PAY & CASH ACCEPTED',
    tickerSpeed: 'normal',
    featuredItemId: 'pizza-pino-special',
    mealDealTitle: 'Mums Night Off Deal',
    mealDealPrice: 'ONLY £20.00',
    mealDealDesc: 'Any 2 x 12-inch Pizzas from our menu + 1 x Large Hot Crispy Chips.',
    activeChannel: 0,
    itemsPerPage: 6,
    density: 'spacious',
    showDealBanner: false
  },
  themeMode: 'light',
  printer: {
    type: 'browser',
    paperWidth: 80,
    autoPrintOnPayment: true
  },
  paymentTerminal: {
    provider: 'simulator',
    status: 'connected',
    testMode: true
  }
};

const STORAGE_KEY = 'pizzapino_customization_v1';
const LEGACY_STORAGE_KEY = 'roastup_customization_v1';
let memoryCustomizationCache: AppCustomizationSettings | null = null;

export function loadSavedCustomization(): AppCustomizationSettings {
  if (memoryCustomizationCache) return memoryCustomizationCache;
  if (typeof window === 'undefined') return DEFAULT_CUSTOMIZATION_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const combined = {
        ...DEFAULT_CUSTOMIZATION_SETTINGS,
        ...parsed,
        // Ensure new pizza categories take precedence over old roast potato categories
        categoryOrder: (parsed.categoryOrder && parsed.categoryOrder.includes('Pizzas'))
          ? parsed.categoryOrder
          : DEFAULT_CUSTOMIZATION_SETTINGS.categoryOrder,
        digitalSignage: {
          ...DEFAULT_CUSTOMIZATION_SETTINGS.digitalSignage,
          ...(parsed.digitalSignage || {}),
          tickerText: (parsed.digitalSignage?.tickerText && !parsed.digitalSignage.tickerText.includes('ROAST'))
            ? parsed.digitalSignage.tickerText
            : DEFAULT_CUSTOMIZATION_SETTINGS.digitalSignage.tickerText
        }
      };
      memoryCustomizationCache = combined;
      return combined;
    }
  } catch (err) {
    console.warn('Error reading customization settings from storage, using defaults:', err);
  }
  return DEFAULT_CUSTOMIZATION_SETTINGS;
}

export function saveCustomizationLocally(settings: AppCustomizationSettings): void {
  memoryCustomizationCache = settings;
  applyCustomizationToDOM(settings);
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (err) {
    console.warn('Error saving customization settings to storage:', err);
  }
}

export const loadCustomizationLocally = loadSavedCustomization;

export function applyFontToDocument(font: string, scale: string): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  
  root.classList.remove('font-style-sans', 'font-style-street', 'font-style-rounded', 'font-style-serif', 'font-style-diner', 'font-style-mono');
  root.classList.add(`font-style-${font}`);

  root.classList.remove('scale-compact', 'scale-normal', 'scale-large', 'scale-xl');
  root.classList.add(`scale-${scale}`);
}

export function applyCustomizationToDOM(settings: AppCustomizationSettings): void {
  if (typeof document === 'undefined') return;
  applyFontToDocument(settings.fontFamily, settings.fontSizeScale);
  
  const isDark = settings.themeMode === 'dark';
  if (isDark) {
    document.documentElement.classList.add('dark');
    document.body.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
  } else {
    document.documentElement.classList.remove('dark');
    document.body.classList.remove('dark');
    document.documentElement.style.colorScheme = 'light';
  }
}
