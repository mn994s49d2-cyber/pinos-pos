import { CartItem, MenuItem } from '../types';

/**
 * Known default included components for Pizza Pino Meal Deals
 */
export const MEAL_DEAL_COMPONENTS: Record<string, string[]> = {
  'box meal': [
    'Garlic Bread with Cheese',
    'Chips',
    'Kebab Meat',
    'Coleslaw',
    'Lettuce and Tomatoes',
    'Cucumber & Onions',
    '4oz Dip'
  ],
  'set meal 1': [
    '3 x Southern Fried Chicken Strips',
    'Hot Crispy Chips'
  ],
  'set meal 2': [
    '8 x Golden Crispy Nuggets',
    'Hot Crispy Chips'
  ],
  'set meal 3': [
    'Carved Donner Kebab Meat',
    'Hot Crispy Chips'
  ],
  'set meal 4': [
    'Southern Fried Popcorn Chicken Bites',
    'Hot Crispy Chips'
  ],
  'chicken combo': [
    '2 x Chicken Fillet Strips',
    '4 x Chicken Nuggets',
    'Popcorn Chicken Bites',
    'Hot Crispy Chips'
  ],
  'mums night off': [
    '2 x 12" Pizzas (Choice of 2)',
    '1 x Large Hot Crispy Chips'
  ],
  'family feast': [
    '2 x 12" Pizzas (Choice of 2)',
    '1 x 12" Garlic Bread with Cheese',
    '1 x Large Hot Chips',
    '1 x 1.5L Bottle Pepsi Max'
  ]
};

/**
 * Check if a menu or cart item is a meal deal
 */
export function isMealDealItem(item: CartItem | MenuItem): boolean {
  if (item.category && item.category.toLowerCase().includes('deal')) return true;
  const name = item.name.toLowerCase();
  if (name.includes('box meal') || name.includes('set meal') || name.includes('combo') || name.includes('feast') || name.includes('night off')) {
    return true;
  }
  return false;
}

/**
 * Retrieve the full list of included items for a meal deal item.
 * Guarantees that items like Box Meal return:
 * ['Garlic Bread with Cheese', 'Chips', 'Kebab Meat', 'Coleslaw', 'Lettuce and Tomatoes', 'Cucumber & Onions', '4oz Dip']
 */
export function getMealDealIncludedItems(item: CartItem | MenuItem): string[] {
  // 1. Explicit includedItems if attached to item
  if ('includedItems' in item && Array.isArray(item.includedItems) && item.includedItems.length > 0) {
    return item.includedItems;
  }

  const nameKey = item.name.toLowerCase().trim();

  // 2. Direct lookup in MEAL_DEAL_COMPONENTS dictionary
  for (const [key, items] of Object.entries(MEAL_DEAL_COMPONENTS)) {
    if (nameKey.includes(key)) {
      // If item has selected modifiers for dip or pizza, inject/enrich the choices!
      if ('selectedModifiers' in item && Array.isArray(item.selectedModifiers) && item.selectedModifiers.length > 0) {
        return items.map(subItem => {
          if (subItem.toLowerCase().includes('dip')) {
            const dipMod = item.selectedModifiers.find(m => m.setName.toLowerCase().includes('dip') || m.optionName.toLowerCase().includes('sauce') || m.optionName.toLowerCase().includes('mayo') || m.optionName.toLowerCase().includes('chilli'));
            if (dipMod) return `4oz Dip: ${dipMod.optionName}`;
          }
          if (subItem.toLowerCase().includes('pizza')) {
            const pizzaMods = item.selectedModifiers.filter(m => m.setName.toLowerCase().includes('pizza'));
            if (pizzaMods.length > 0) {
              return `2 x 12" Pizzas: ${pizzaMods.map(m => m.optionName).join(' + ')}`;
            }
          }
          return subItem;
        });
      }
      return items;
    }
  }

  // 3. Fallback: Parse description comma/ampersand separated list
  if ('description' in item && typeof item.description === 'string' && item.description.length > 0) {
    const rawDesc = item.description.replace(/\.$/, '');
    const parts = rawDesc.split(/,\s*|\s*&\s*|\s*\+\s*/).map(p => p.trim()).filter(Boolean);
    if (parts.length > 1) {
      return parts;
    }
  }

  return [];
}
