import { MenuItem, ModifierSet, MenuVariation } from '../types';

// ==========================================
// PIZZA PINO MODIFIER SETS
// ==========================================

export const PIZZA_BASE_MODIFIER: ModifierSet = {
  id: 'pizza-base',
  name: 'Pizza Base Sauce',
  required: true,
  minSelections: 1,
  maxSelections: 1,
  options: [
    { id: 'b-tomato', name: 'Tomato Base', priceDelta: 0, category: 'sauce' },
    { id: 'b-bbq', name: 'BBQ Base', priceDelta: 0, category: 'sauce' },
    { id: 'b-chilli', name: 'Chilli Base', priceDelta: 0, category: 'sauce' },
    { id: 'b-garlic', name: 'Garlic Base', priceDelta: 0, category: 'sauce' },
    { id: 'b-none', name: 'No Base Sauce', priceDelta: 0, category: 'sauce' }
  ]
};

export const PIZZA_CRUST_MODIFIER: ModifierSet = {
  id: 'pizza-crust',
  name: 'Crust Style',
  required: true,
  minSelections: 1,
  maxSelections: 1,
  options: [
    { id: 'crust-standard', name: 'Standard Crust', priceDelta: 0, category: 'size' },
    { id: 'crust-stuffed', name: 'Stuffed Crust', priceDelta: 2.00, category: 'size' },
    { id: 'crust-cheese', name: 'Cheese Stuffed Crust', priceDelta: 2.50, category: 'size' }
  ]
};

export const PIZZA_EXTRA_TOPPINGS_MODIFIER: ModifierSet = {
  id: 'pizza-toppings',
  name: 'Available Extra Toppings (+£1.20)',
  required: false,
  minSelections: 0,
  maxSelections: 10,
  options: [
    { id: 'top-cheese', name: 'Extra Cheese', priceDelta: 1.20, category: 'toppings' },
    { id: 'top-mozz', name: 'Mozzarella', priceDelta: 1.20, category: 'toppings' },
    { id: 'top-ham', name: 'Ham', priceDelta: 1.20, category: 'toppings' },
    { id: 'top-pep', name: 'Pepperoni', priceDelta: 1.20, category: 'toppings' },
    { id: 'top-salami', name: 'Salami', priceDelta: 1.20, category: 'toppings' },
    { id: 'top-bacon', name: 'Bacon', priceDelta: 1.20, category: 'toppings' },
    { id: 'top-chicken', name: 'Chicken', priceDelta: 1.20, category: 'toppings' },
    { id: 'top-pop-chick', name: 'Popcorn Chicken', priceDelta: 1.20, category: 'toppings' },
    { id: 'top-donner', name: 'Donner Meat', priceDelta: 1.20, category: 'toppings' },
    { id: 'top-kebab', name: 'Kebab Meat', priceDelta: 1.20, category: 'toppings' },
    { id: 'top-beef', name: 'Minced Beef', priceDelta: 1.20, category: 'toppings' },
    { id: 'top-bolognese', name: 'Bolognese', priceDelta: 1.20, category: 'toppings' },
    { id: 'top-tuna', name: 'Tuna', priceDelta: 1.20, category: 'toppings' },
    { id: 'top-mushrooms', name: 'Mushrooms', priceDelta: 1.20, category: 'toppings' },
    { id: 'top-onions', name: 'Onions', priceDelta: 1.20, category: 'toppings' },
    { id: 'top-peppers', name: 'Peppers', priceDelta: 1.20, category: 'toppings' },
    { id: 'top-sweetcorn', name: 'Sweetcorn', priceDelta: 1.20, category: 'toppings' },
    { id: 'top-pineapple', name: 'Pineapple', priceDelta: 1.20, category: 'toppings' },
    { id: 'top-jalapenos', name: 'Jalapenos', priceDelta: 1.20, category: 'toppings' },
    { id: 'top-tomatoes', name: 'Tomatoes', priceDelta: 1.20, category: 'toppings' },
    { id: 'top-garlic', name: 'Garlic', priceDelta: 1.20, category: 'toppings' }
  ]
};

export const BYO_4_TOPPINGS_MODIFIER: ModifierSet = {
  id: 'byo-4-toppings',
  name: 'Choose Any 4 Included Toppings',
  required: true,
  minSelections: 1,
  maxSelections: 4,
  options: [
    { id: 'byo-cheese', name: 'Extra Cheese', priceDelta: 0, category: 'toppings' },
    { id: 'byo-mozz', name: 'Mozzarella', priceDelta: 0, category: 'toppings' },
    { id: 'byo-ham', name: 'Ham', priceDelta: 0, category: 'toppings' },
    { id: 'byo-pep', name: 'Pepperoni', priceDelta: 0, category: 'toppings' },
    { id: 'byo-salami', name: 'Salami', priceDelta: 0, category: 'toppings' },
    { id: 'byo-bacon', name: 'Bacon', priceDelta: 0, category: 'toppings' },
    { id: 'byo-chicken', name: 'Chicken', priceDelta: 0, category: 'toppings' },
    { id: 'byo-pop-chick', name: 'Popcorn Chicken', priceDelta: 0, category: 'toppings' },
    { id: 'byo-donner', name: 'Donner Meat', priceDelta: 0, category: 'toppings' },
    { id: 'byo-kebab', name: 'Kebab Meat', priceDelta: 0, category: 'toppings' },
    { id: 'byo-beef', name: 'Minced Beef', priceDelta: 0, category: 'toppings' },
    { id: 'byo-bolognese', name: 'Bolognese', priceDelta: 0, category: 'toppings' },
    { id: 'byo-tuna', name: 'Tuna', priceDelta: 0, category: 'toppings' },
    { id: 'byo-mushrooms', name: 'Mushrooms', priceDelta: 0, category: 'toppings' },
    { id: 'byo-onions', name: 'Onions', priceDelta: 0, category: 'toppings' },
    { id: 'byo-peppers', name: 'Peppers', priceDelta: 0, category: 'toppings' },
    { id: 'byo-sweetcorn', name: 'Sweetcorn', priceDelta: 0, category: 'toppings' },
    { id: 'byo-pineapple', name: 'Pineapple', priceDelta: 0, category: 'toppings' },
    { id: 'byo-jalapenos', name: 'Jalapenos', priceDelta: 0, category: 'toppings' },
    { id: 'byo-tomatoes', name: 'Tomatoes', priceDelta: 0, category: 'toppings' },
    { id: 'byo-garlic', name: 'Garlic', priceDelta: 0, category: 'toppings' }
  ]
};

export const STANDARD_PIZZA_MODIFIERS: ModifierSet[] = [
  PIZZA_BASE_MODIFIER,
  PIZZA_CRUST_MODIFIER,
  PIZZA_EXTRA_TOPPINGS_MODIFIER
];

export const BYO_PIZZA_MODIFIERS: ModifierSet[] = [
  PIZZA_BASE_MODIFIER,
  PIZZA_CRUST_MODIFIER,
  BYO_4_TOPPINGS_MODIFIER,
  PIZZA_EXTRA_TOPPINGS_MODIFIER
];

export const BURGER_OPTIONS_MODIFIER: ModifierSet = {
  id: 'burger-opts',
  name: 'Salad & Sauce Adjustments',
  required: false,
  minSelections: 0,
  maxSelections: 5,
  options: [
    { id: 'bo-no-lettuce', name: 'No Lettuce', priceDelta: 0, category: 'extras' },
    { id: 'bo-no-onions', name: 'No Onions', priceDelta: 0, category: 'extras' },
    { id: 'bo-no-sauce', name: 'No Burger Sauce', priceDelta: 0, category: 'sauce' },
    { id: 'bo-no-mayo', name: 'No Mayo', priceDelta: 0, category: 'sauce' },
    { id: 'bo-extra-cheese', name: 'Extra Cheese Slice (+£0.50)', priceDelta: 0.50, category: 'cheese' }
  ]
};

export const SIZZLER_OPTIONS_MODIFIER: ModifierSet = {
  id: 'sizzler-opts',
  name: 'Sizzler Adjustments',
  required: false,
  minSelections: 0,
  maxSelections: 6,
  options: [
    { id: 'so-no-cheese', name: 'No Cheese', priceDelta: 0 },
    { id: 'so-no-salsa', name: 'No Salsa', priceDelta: 0 },
    { id: 'so-no-hash', name: 'No Hash Brown', priceDelta: 0 },
    { id: 'so-no-mayo', name: 'No Mayo', priceDelta: 0 },
    { id: 'so-no-lettuce', name: 'No Lettuce', priceDelta: 0 },
    { id: 'so-no-onions', name: 'No Onions', priceDelta: 0 }
  ]
};

export const WRAP_OPTIONS_MODIFIER: ModifierSet = {
  id: 'wrap-opts',
  name: 'Wrap Salad & Sauce Adjustments',
  required: false,
  minSelections: 0,
  maxSelections: 6,
  options: [
    { id: 'wo-no-lettuce', name: 'No Lettuce', priceDelta: 0 },
    { id: 'wo-no-onions', name: 'No Onions', priceDelta: 0 },
    { id: 'wo-no-tomatoes', name: 'No Tomatoes', priceDelta: 0 },
    { id: 'wo-no-cucumber', name: 'No Cucumber', priceDelta: 0 },
    { id: 'wo-no-sauce', name: 'No Sauce', priceDelta: 0 },
    { id: 'wo-extra-cheese', name: 'Add Grated Cheese (+£1.00)', priceDelta: 1.00 }
  ]
};

export const DIP_CHOICE_MODIFIER: ModifierSet = {
  id: 'dip-choice',
  name: 'Select 4oz Dip Pot',
  required: true,
  minSelections: 1,
  maxSelections: 1,
  options: [
    { id: 'dip-garlic-mayo', name: 'Garlic Mayo', priceDelta: 0, category: 'sauce' },
    { id: 'dip-sweet-chilli', name: 'Sweet Chilli', priceDelta: 0, category: 'sauce' },
    { id: 'dip-chilli', name: 'Chilli Sauce', priceDelta: 0, category: 'sauce' },
    { id: 'dip-mayo', name: 'Mayo', priceDelta: 0, category: 'sauce' },
    { id: 'dip-bbq', name: 'BBQ Sauce', priceDelta: 0, category: 'sauce' },
    { id: 'dip-ketchup', name: 'Ketchup', priceDelta: 0, category: 'sauce' }
  ]
};

export const CAN_CHOICE_MODIFIER: ModifierSet = {
  id: 'can-choice',
  name: 'Select Can of Pop',
  required: true,
  minSelections: 1,
  maxSelections: 1,
  options: [
    { id: 'can-pepsi', name: 'Pepsi', priceDelta: 0, category: 'drink' },
    { id: 'can-diet-pepsi', name: 'Diet Pepsi', priceDelta: 0, category: 'drink' },
    { id: 'can-pepsi-max', name: 'Pepsi Max', priceDelta: 0, category: 'drink' },
    { id: 'can-7up', name: '7Up Free', priceDelta: 0, category: 'drink' },
    { id: 'can-tango', name: 'Tango Orange', priceDelta: 0, category: 'drink' }
  ]
};

export const PIZZA_DEAL_CHOICE_1: ModifierSet = {
  id: 'deal-pizza-1',
  name: 'Choose 1st 12" Pizza',
  required: true,
  minSelections: 1,
  maxSelections: 1,
  options: [
    { id: 'dp1-margherita', name: '12" Margherita', priceDelta: 0 },
    { id: 'dp1-pepperoni', name: '12" Double Pepperoni', priceDelta: 0 },
    { id: 'dp1-meatfeast', name: '12" Meat Feast', priceDelta: 0 },
    { id: 'dp1-ham-mush', name: '12" Ham & Mushroom', priceDelta: 0 },
    { id: 'dp1-ham-pine', name: '12" Ham & Pineapple', priceDelta: 0 },
    { id: 'dp1-bbq-chicken', name: '12" BBQ Chicken', priceDelta: 0 },
    { id: 'dp1-hotshot', name: '12" Hot Shot', priceDelta: 0 },
    { id: 'dp1-veggie', name: '12" Vegetarian', priceDelta: 0 },
    { id: 'dp1-pino-spec', name: '12" Pino Special', priceDelta: 0 },
    { id: 'dp1-pollo', name: '12" Special Pollo', priceDelta: 0 },
    { id: 'dp1-donner-mush', name: '12" Donner & Mushroom', priceDelta: 0 }
  ]
};

export const PIZZA_DEAL_CHOICE_2: ModifierSet = {
  id: 'deal-pizza-2',
  name: 'Choose 2nd 12" Pizza',
  required: true,
  minSelections: 1,
  maxSelections: 1,
  options: [
    { id: 'dp2-margherita', name: '12" Margherita', priceDelta: 0 },
    { id: 'dp2-pepperoni', name: '12" Double Pepperoni', priceDelta: 0 },
    { id: 'dp2-meatfeast', name: '12" Meat Feast', priceDelta: 0 },
    { id: 'dp2-ham-mush', name: '12" Ham & Mushroom', priceDelta: 0 },
    { id: 'dp2-ham-pine', name: '12" Ham & Pineapple', priceDelta: 0 },
    { id: 'dp2-bbq-chicken', name: '12" BBQ Chicken', priceDelta: 0 },
    { id: 'dp2-hotshot', name: '12" Hot Shot', priceDelta: 0 },
    { id: 'dp2-veggie', name: '12" Vegetarian', priceDelta: 0 },
    { id: 'dp2-pino-spec', name: '12" Pino Special', priceDelta: 0 },
    { id: 'dp2-pollo', name: '12" Special Pollo', priceDelta: 0 },
    { id: 'dp2-donner-mush', name: '12" Donner & Mushroom', priceDelta: 0 }
  ]
};

// Helper for standard pizza variations
const makePizzaVars = (skuPrefix: string, p10: number, p12: number): MenuVariation[] => [
  { id: `v-${skuPrefix}-10`, name: '10"', sku: `PINO-${skuPrefix}-10`, price: p10 },
  { id: `v-${skuPrefix}-12`, name: '12"', sku: `PINO-${skuPrefix}-12`, price: p12 }
];

// Helper for garlic bread variations
const makeGbVars = (skuPrefix: string, p10: number, p12: number): MenuVariation[] => [
  { id: `v-gb-${skuPrefix}-10`, name: '10"', sku: `PINO-GB-${skuPrefix}-10`, price: p10 },
  { id: `v-gb-${skuPrefix}-12`, name: '12"', sku: `PINO-GB-${skuPrefix}-12`, price: p12 }
];

// Helper for burger variations
const makeBurgerVars = (skuPrefix: string, single: number, double: number): MenuVariation[] => [
  { id: `v-bg-${skuPrefix}-5`, name: '5oz Single', sku: `PINO-BG-${skuPrefix}-5`, price: single },
  { id: `v-bg-${skuPrefix}-10`, name: '10oz Double', sku: `PINO-BG-${skuPrefix}-10`, price: double }
];

// ==========================================
// PIZZA PINO INITIAL MENU ITEMS
// ==========================================

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  // ----------------------------------------
  // 1. STANDARD PIZZAS
  // ----------------------------------------
  {
    id: 'pizza-margherita',
    name: 'Margherita',
    category: 'Pizzas',
    description: 'Classic rich Italian tomato sauce base topped with 100% melted mozzarella cheese.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['popular', 'vegetarian'],
    imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',
    defaultPrice: 6.90,
    variations: makePizzaVars('MARG', 6.90, 8.90),
    modifierSets: STANDARD_PIZZA_MODIFIERS
  },
  {
    id: 'pizza-ham',
    name: 'Ham',
    category: 'Pizzas',
    description: 'Tender sliced ham and melted mozzarella on our signature tomato base.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['popular'],
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    defaultPrice: 7.90,
    variations: makePizzaVars('HAM', 7.90, 9.90),
    modifierSets: STANDARD_PIZZA_MODIFIERS
  },
  {
    id: 'pizza-al-funghi',
    name: 'Al Funghi',
    category: 'Pizzas',
    description: 'Sliced sliced field mushrooms and mozzarella on tomato sauce base.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['vegetarian'],
    imageUrl: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=800&q=80',
    defaultPrice: 7.90,
    variations: makePizzaVars('FUNGHI', 7.90, 9.90),
    modifierSets: STANDARD_PIZZA_MODIFIERS
  },
  {
    id: 'pizza-ham-mushroom',
    name: 'Ham & Mushroom',
    category: 'Pizzas',
    description: 'Classic combination of sliced savory ham and fresh mushrooms with mozzarella.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['popular'],
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    defaultPrice: 8.30,
    variations: makePizzaVars('HAM-MUSH', 8.30, 10.30),
    modifierSets: STANDARD_PIZZA_MODIFIERS
  },
  {
    id: 'pizza-ham-pineapple',
    name: 'Ham & Pineapple',
    category: 'Pizzas',
    description: 'Sweet juicy pineapple chunks with savory ham and mozzarella cheese.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['popular'],
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
    defaultPrice: 8.30,
    variations: makePizzaVars('HAM-PINE', 8.30, 10.30),
    modifierSets: STANDARD_PIZZA_MODIFIERS
  },
  {
    id: 'pizza-ham-onion',
    name: 'Ham & Onion',
    category: 'Pizzas',
    description: 'Sliced ham and diced sweet red onions on tomato base with melted cheese.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    defaultPrice: 8.30,
    variations: makePizzaVars('HAM-ONION', 8.30, 10.30),
    modifierSets: STANDARD_PIZZA_MODIFIERS
  },
  {
    id: 'pizza-ham-pepperoni',
    name: 'Ham & Pepperoni',
    category: 'Pizzas',
    description: 'Crispy spicy pepperoni and juicy ham with golden melted mozzarella.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['popular'],
    imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80',
    defaultPrice: 8.30,
    variations: makePizzaVars('HAM-PEP', 8.30, 10.30),
    modifierSets: STANDARD_PIZZA_MODIFIERS
  },
  {
    id: 'pizza-pepperoni-mushroom',
    name: 'Pepperoni & Mushroom',
    category: 'Pizzas',
    description: 'Generous pepperoni slices paired with earthy sliced mushrooms.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    defaultPrice: 8.30,
    variations: makePizzaVars('PEP-MUSH', 8.30, 10.30),
    modifierSets: STANDARD_PIZZA_MODIFIERS
  },
  {
    id: 'pizza-pepperoni-pineapple',
    name: 'Pepperoni & Pineapple',
    category: 'Pizzas',
    description: 'Spicy pepperoni contrasted with sweet juicy pineapple pieces.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    defaultPrice: 8.30,
    variations: makePizzaVars('PEP-PINE', 8.30, 10.30),
    modifierSets: STANDARD_PIZZA_MODIFIERS
  },
  {
    id: 'pizza-chicken-mushroom',
    name: 'Chicken & Mushroom',
    category: 'Pizzas',
    description: 'Succulent seasoned chicken breast and mushrooms on tomato sauce.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    defaultPrice: 8.30,
    variations: makePizzaVars('CHICK-MUSH', 8.30, 10.30),
    modifierSets: STANDARD_PIZZA_MODIFIERS
  },
  {
    id: 'pizza-chicken-sweetcorn',
    name: 'Chicken & Sweetcorn',
    category: 'Pizzas',
    description: 'Tender chicken pieces and sweet juicy golden corn with mozzarella.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    defaultPrice: 8.30,
    variations: makePizzaVars('CHICK-CORN', 8.30, 10.30),
    modifierSets: STANDARD_PIZZA_MODIFIERS
  },
  {
    id: 'pizza-chicken-onion',
    name: 'Chicken & Onion',
    category: 'Pizzas',
    description: 'Tender seasoned chicken breast with crisp sweet onions and mozzarella.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    defaultPrice: 8.30,
    variations: makePizzaVars('CHICK-ONION', 8.30, 10.30),
    modifierSets: STANDARD_PIZZA_MODIFIERS
  },
  {
    id: 'pizza-tuna-sweetcorn',
    name: 'Tuna & Sweetcorn',
    category: 'Pizzas',
    description: 'Flaked tuna and sweet golden corn over rich tomato sauce and cheese.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    defaultPrice: 8.30,
    variations: makePizzaVars('TUNA-CORN', 8.30, 10.30),
    modifierSets: STANDARD_PIZZA_MODIFIERS
  },
  {
    id: 'pizza-tuna-onions',
    name: 'Tuna & Onions',
    category: 'Pizzas',
    description: 'Flaked tuna with sliced red and white onions and melted mozzarella.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    defaultPrice: 8.30,
    variations: makePizzaVars('TUNA-ONION', 8.30, 10.30),
    modifierSets: STANDARD_PIZZA_MODIFIERS
  },
  {
    id: 'pizza-chicken',
    name: 'Chicken',
    category: 'Pizzas',
    description: 'Pure seasoned roast chicken breast pieces with melted cheese.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    defaultPrice: 8.30,
    variations: makePizzaVars('CHICKEN', 8.30, 10.30),
    modifierSets: STANDARD_PIZZA_MODIFIERS
  },
  {
    id: 'pizza-double-pepperoni',
    name: 'Double Pepperoni',
    category: 'Pizzas',
    description: 'Extra double helping of spicy cured Italian pepperoni with mozzarella.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['popular', 'signature'],
    imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80',
    defaultPrice: 8.30,
    variations: makePizzaVars('DBL-PEP', 8.30, 10.30),
    modifierSets: STANDARD_PIZZA_MODIFIERS
  },
  {
    id: 'pizza-bbq-chicken',
    name: 'BBQ Chicken',
    category: 'Pizzas',
    description: 'Smoky BBQ sauce base topped with seasoned chicken, mushrooms and mozzarella.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['popular'],
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
    defaultPrice: 8.60,
    variations: makePizzaVars('BBQ-CHICK', 8.60, 10.60),
    modifierSets: STANDARD_PIZZA_MODIFIERS
  },
  {
    id: 'pizza-bbq-beef',
    name: 'BBQ Beef',
    category: 'Pizzas',
    description: 'Smoky BBQ sauce base with seasoned minced beef, mushrooms and cheese.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    defaultPrice: 8.60,
    variations: makePizzaVars('BBQ-BEEF', 8.60, 10.60),
    modifierSets: STANDARD_PIZZA_MODIFIERS
  },
  {
    id: 'pizza-donner-mushroom',
    name: 'Donner & Mushroom',
    category: 'Pizzas',
    description: 'Fresh sliced seasoned donner kebab meat and mushrooms with mozzarella.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['popular'],
    defaultPrice: 8.60,
    variations: makePizzaVars('DONNER-MUSH', 8.60, 10.60),
    modifierSets: STANDARD_PIZZA_MODIFIERS
  },
  {
    id: 'pizza-donner-onions',
    name: 'Donner & Onions',
    category: 'Pizzas',
    description: 'Thinly carved donner kebab meat paired with sweet sliced onions.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    defaultPrice: 8.60,
    variations: makePizzaVars('DONNER-ONION', 8.60, 10.60),
    modifierSets: STANDARD_PIZZA_MODIFIERS
  },
  {
    id: 'pizza-bolognese-onions',
    name: 'Bolognese & Onions',
    category: 'Pizzas',
    description: 'Rich slow-cooked beef bolognese sauce and sliced onions with cheese.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    defaultPrice: 8.60,
    variations: makePizzaVars('BOLO-ONION', 8.60, 10.60),
    modifierSets: STANDARD_PIZZA_MODIFIERS
  },
  {
    id: 'pizza-popcorn-chicken',
    name: 'Popcorn Chicken',
    category: 'Pizzas',
    description: 'Southern fried crispy popcorn chicken bites on tomato base with cheese.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['popular'],
    defaultPrice: 8.60,
    variations: makePizzaVars('POP-CHICK', 8.60, 10.60),
    modifierSets: STANDARD_PIZZA_MODIFIERS
  },
  {
    id: 'pizza-quattro-formaggi',
    name: 'Quattro Formaggi',
    category: 'Pizzas',
    description: 'Four cheese blend: Mozzarella, Cheddar, Parmesan and creamy cheese sauce.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['vegetarian'],
    defaultPrice: 8.60,
    variations: makePizzaVars('QUATTRO', 8.60, 10.60),
    modifierSets: STANDARD_PIZZA_MODIFIERS
  },
  {
    id: 'pizza-meat-feast',
    name: 'Meat Feast',
    category: 'Pizzas',
    description: 'Loaded meat lover dream: Ham, pepperoni, salami, bacon and minced beef.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['popular', 'signature'],
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    defaultPrice: 8.60,
    variations: makePizzaVars('MEAT-FEAST', 8.60, 10.90),
    modifierSets: STANDARD_PIZZA_MODIFIERS
  },
  {
    id: 'pizza-bacon-special',
    name: 'Bacon Special',
    category: 'Pizzas',
    description: 'Crispy bacon bits, sweet sliced onions and mushrooms with mozzarella.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    defaultPrice: 8.60,
    variations: makePizzaVars('BACON-SPEC', 8.60, 10.90),
    modifierSets: STANDARD_PIZZA_MODIFIERS
  },
  {
    id: 'pizza-hot-shot',
    name: 'Hot Shot',
    category: 'Pizzas',
    description: 'Fiery chilli base sauce, spicy pepperoni, sliced onions and mozzarella.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['spicy', 'popular'],
    imageUrl: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80',
    defaultPrice: 8.60,
    variations: makePizzaVars('HOT-SHOT', 8.60, 10.90),
    modifierSets: STANDARD_PIZZA_MODIFIERS
  },
  {
    id: 'pizza-salami',
    name: 'Salami',
    category: 'Pizzas',
    description: 'Italian cured salami slices, sweet onions and bell peppers with cheese.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    defaultPrice: 8.60,
    variations: makePizzaVars('SALAMI', 8.60, 10.90),
    modifierSets: STANDARD_PIZZA_MODIFIERS
  },
  {
    id: 'pizza-spicy-beef',
    name: 'Spicy Beef',
    category: 'Pizzas',
    description: 'Spicy cured pepperoni, seasoned minced beef and fiery jalapeños.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['spicy'],
    defaultPrice: 8.60,
    variations: makePizzaVars('SPICY-BEEF', 8.60, 10.90),
    modifierSets: STANDARD_PIZZA_MODIFIERS
  },
  {
    id: 'pizza-chicken-mexicano',
    name: 'Chicken Mexicano',
    category: 'Pizzas',
    description: 'Spicy chilli sauce base, seasoned roast chicken and mushrooms.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['spicy'],
    defaultPrice: 8.60,
    variations: makePizzaVars('CHICK-MEX', 8.60, 10.90),
    modifierSets: STANDARD_PIZZA_MODIFIERS
  },
  {
    id: 'pizza-special-pollo',
    name: 'Special Pollo',
    category: 'Pizzas',
    description: 'Seasoned chicken, fresh mushrooms, juicy pineapple and sweetcorn.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['signature'],
    defaultPrice: 8.70,
    variations: makePizzaVars('SPEC-POLLO', 8.70, 11.00),
    modifierSets: STANDARD_PIZZA_MODIFIERS
  },
  {
    id: 'pizza-jr-pepperoni',
    name: 'J.R. Pepperoni',
    category: 'Pizzas',
    description: 'Sliced ham, spicy pepperoni, fresh mushrooms and sweet onions.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    defaultPrice: 8.70,
    variations: makePizzaVars('JR-PEP', 8.70, 11.00),
    modifierSets: STANDARD_PIZZA_MODIFIERS
  },
  {
    id: 'pizza-special-pepperoni',
    name: 'Special Pepperoni',
    category: 'Pizzas',
    description: 'Spicy pepperoni, sliced mushrooms, onions and crisp bell peppers.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    defaultPrice: 8.70,
    variations: makePizzaVars('SPEC-PEP', 8.70, 11.00),
    modifierSets: STANDARD_PIZZA_MODIFIERS
  },
  {
    id: 'pizza-mexicana',
    name: 'Mexicana',
    category: 'Pizzas',
    description: 'Fiery chilli base, spicy pepperoni, seasoned minced beef and onions.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['spicy'],
    defaultPrice: 8.70,
    variations: makePizzaVars('MEXICANA', 8.70, 11.00),
    modifierSets: STANDARD_PIZZA_MODIFIERS
  },
  {
    id: 'pizza-mediterranean',
    name: 'Mediterranean',
    category: 'Pizzas',
    description: 'Flaked tuna, juicy sweet pineapple and sweetcorn with mozzarella.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    defaultPrice: 8.70,
    variations: makePizzaVars('MEDITERR', 8.70, 11.00),
    modifierSets: STANDARD_PIZZA_MODIFIERS
  },
  {
    id: 'pizza-vegetarian',
    name: 'Vegetarian',
    category: 'Pizzas',
    description: 'Fresh sliced mushrooms, crisp onions, sweetcorn and bell peppers.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['vegetarian'],
    imageUrl: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=800&q=80',
    defaultPrice: 8.70,
    variations: makePizzaVars('VEG', 8.70, 11.00),
    modifierSets: STANDARD_PIZZA_MODIFIERS
  },
  {
    id: 'pizza-toscana',
    name: 'Toscana',
    category: 'Pizzas',
    description: 'Savory ham, sliced mushrooms, onions and sweet bell peppers.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    defaultPrice: 8.70,
    variations: makePizzaVars('TOSCANA', 8.70, 11.00),
    modifierSets: STANDARD_PIZZA_MODIFIERS
  },
  {
    id: 'pizza-pino-special',
    name: 'Pino Special',
    category: 'Pizzas',
    description: 'House masterpiece: Ham, pepperoni, salami, mushrooms, peppers, sweetcorn and onions.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['signature', 'popular'],
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    defaultPrice: 9.40,
    variations: makePizzaVars('PINO-SPEC', 9.40, 11.40),
    modifierSets: STANDARD_PIZZA_MODIFIERS
  },
  {
    id: 'pizza-special-ham',
    name: 'Special Ham',
    category: 'Pizzas',
    description: 'Savory ham, spicy pepperoni, fresh mushrooms, bell peppers and onions.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    defaultPrice: 9.40,
    variations: makePizzaVars('SPEC-HAM', 9.40, 11.40),
    modifierSets: STANDARD_PIZZA_MODIFIERS
  },
  {
    id: 'pizza-red-hot-chilli-pepper',
    name: 'Red Hot Chilli Pepper',
    category: 'Pizzas',
    description: 'Fiery feast: Pepperoni, salami, ham, chicken and hot sliced jalapeños.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['spicy', 'signature'],
    imageUrl: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80',
    defaultPrice: 9.40,
    variations: makePizzaVars('RHCP', 9.40, 11.40),
    modifierSets: STANDARD_PIZZA_MODIFIERS
  },
  {
    id: 'pizza-make-your-own',
    name: 'Make Your Own',
    category: 'Pizzas',
    description: 'Choose any 4 toppings of your choice with base sauce and crust options.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['popular', 'custom'],
    imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',
    defaultPrice: 8.70,
    variations: makePizzaVars('MYO', 8.70, 11.00),
    modifierSets: BYO_PIZZA_MODIFIERS
  },
  {
    id: 'pizza-extra-topping-item',
    name: 'Extra Topping Portion',
    category: 'Pizzas',
    description: 'Add an extra portion of your favorite meat, cheese or veg topping.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    defaultPrice: 1.20,
    variations: makePizzaVars('EXTRA-TOP', 1.20, 1.60),
    modifierSets: [PIZZA_EXTRA_TOPPINGS_MODIFIER]
  },

  // ----------------------------------------
  // 2. GARLIC BREAD
  // ----------------------------------------
  {
    id: 'gb-plain',
    name: 'Garlic Bread',
    category: 'Garlic Bread',
    description: 'Fresh hand-stretched pizza base baked with aromatic garlic butter.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['popular', 'vegetarian'],
    defaultPrice: 5.00,
    variations: makeGbVars('PLAIN', 5.00, 6.50)
  },
  {
    id: 'gb-tomato',
    name: 'Garlic Bread Tomato',
    category: 'Garlic Bread',
    description: 'Garlic butter base with rich seasoned Italian tomato pizza sauce.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['vegetarian'],
    defaultPrice: 5.50,
    variations: makeGbVars('TOM', 5.50, 6.90)
  },
  {
    id: 'gb-tomato-chilli',
    name: 'Garlic Bread Tomato & Chilli',
    category: 'Garlic Bread',
    description: 'Garlic bread infused with spicy chilli and rich tomato sauce.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['spicy', 'vegetarian'],
    defaultPrice: 5.90,
    variations: makeGbVars('TOM-CHILLI', 5.90, 7.30)
  },
  {
    id: 'gb-cheese',
    name: 'Garlic Bread Cheese',
    category: 'Garlic Bread',
    description: 'Golden baked garlic bread loaded with bubbling melted mozzarella cheese.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['popular', 'vegetarian'],
    imageUrl: 'https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?auto=format&fit=crop&w=800&q=80',
    defaultPrice: 6.50,
    variations: makeGbVars('CHEESE', 6.50, 8.50)
  },
  {
    id: 'gb-cheese-tomato',
    name: 'Garlic Bread Cheese & Tomato',
    category: 'Garlic Bread',
    description: 'Garlic bread topped with rich tomato pizza sauce and melted cheese.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['vegetarian'],
    defaultPrice: 7.30,
    variations: makeGbVars('CHEESE-TOM', 7.30, 9.20)
  },
  {
    id: 'gb-cheese-mushroom',
    name: 'Garlic Bread Cheese & Mushroom',
    category: 'Garlic Bread',
    description: 'Garlic butter, melted mozzarella and sliced savory mushrooms.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['vegetarian'],
    defaultPrice: 6.70,
    variations: makeGbVars('CHEESE-MUSH', 6.70, 8.70)
  },
  {
    id: 'gb-cheese-donner',
    name: 'Garlic Bread Cheese & Donner',
    category: 'Garlic Bread',
    description: 'Hot garlic bread layered with donner kebab meat and melted mozzarella.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['popular'],
    defaultPrice: 8.50,
    variations: makeGbVars('CHEESE-DONNER', 8.50, 10.50)
  },
  {
    id: 'gb-spicy',
    name: 'Spicy Garlic Bread',
    category: 'Garlic Bread',
    description: 'Garlic bread layered with tomato, chilli, spicy jalapeños and melted cheese.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['spicy'],
    defaultPrice: 8.50,
    variations: makeGbVars('SPICY', 8.50, 10.50)
  },

  // ----------------------------------------
  // 3. CALZONES
  // ----------------------------------------
  {
    id: 'calzone-monster',
    name: 'Monster Calzone',
    category: 'Calzones',
    description: 'Folded 12" pizza dough stuffed with donner meat, tomatoes and spicy chilli (No Cheese).',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['spicy', 'popular'],
    imageUrl: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&w=800&q=80',
    defaultPrice: 10.50,
    variations: [{ id: 'v-calzone-monster-12', name: '12"', sku: 'PINO-CAL-MONSTER', price: 10.50 }]
  },
  {
    id: 'calzone-regular',
    name: 'Regular Calzone',
    category: 'Calzones',
    description: 'Folded 12" calzone filled with tomatoes, cheese, kebab meat and mushrooms, topped with garlic butter.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['signature'],
    imageUrl: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&w=800&q=80',
    defaultPrice: 11.30,
    variations: [{ id: 'v-calzone-regular-12', name: '12"', sku: 'PINO-CAL-REGULAR', price: 11.30 }]
  },
  {
    id: 'calzone-plus',
    name: 'Calzone Plus',
    category: 'Calzones',
    description: 'Folded 12" meat lover calzone: Tomatoes, cheese, kebab meat, ham, pepperoni and salami.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['popular'],
    imageUrl: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&w=800&q=80',
    defaultPrice: 12.50,
    variations: [{ id: 'v-calzone-plus-12', name: '12"', sku: 'PINO-CAL-PLUS', price: 12.50 }]
  },

  // ----------------------------------------
  // 4. BURGERS
  // ----------------------------------------
  {
    id: 'burger-plain',
    name: 'Plain Burger',
    category: 'Burgers',
    description: 'Juicy flame-grilled beef patty served in a toasted seeded bun with fresh salad & sauce.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    defaultPrice: 5.70,
    variations: makeBurgerVars('PLAIN', 5.70, 6.70),
    modifierSets: [BURGER_OPTIONS_MODIFIER]
  },
  {
    id: 'burger-cheese',
    name: 'Cheese Burger',
    category: 'Burgers',
    description: 'Classic beef patty topped with melted cheese, crisp salad & signature sauce.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['popular'],
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    defaultPrice: 6.30,
    variations: makeBurgerVars('CHEESE', 6.30, 7.30),
    modifierSets: [BURGER_OPTIONS_MODIFIER]
  },
  {
    id: 'burger-hawaiian',
    name: 'Hawaiian Burger',
    category: 'Burgers',
    description: 'Flame-grilled patty with melted cheese, juicy pineapple ring, salad & sauce.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    defaultPrice: 6.50,
    variations: makeBurgerVars('HAWAIIAN', 6.50, 7.50),
    modifierSets: [BURGER_OPTIONS_MODIFIER]
  },
  {
    id: 'burger-bolognese',
    name: 'Bolognese Burger',
    category: 'Burgers',
    description: 'Beef burger topped with rich Italian savoury minced beef bolognese, salad & sauce.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    defaultPrice: 6.50,
    variations: makeBurgerVars('BOLO', 6.50, 7.50),
    modifierSets: [BURGER_OPTIONS_MODIFIER]
  },
  {
    id: 'burger-mexicana',
    name: 'Mexicana Burger',
    category: 'Burgers',
    description: 'Spicy chilli bolognese topping with salad & sauce for an authentic Mexican kick.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['spicy'],
    defaultPrice: 6.50,
    variations: makeBurgerVars('MEX', 6.50, 7.50),
    modifierSets: [BURGER_OPTIONS_MODIFIER]
  },
  {
    id: 'burger-pino',
    name: 'Pino Burger',
    category: 'Burgers',
    description: 'House specialty: Sautéed garlic mushrooms, melted cheese, crisp salad and sauce.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['signature', 'popular'],
    defaultPrice: 6.50,
    variations: makeBurgerVars('PINO', 6.50, 7.50),
    modifierSets: [BURGER_OPTIONS_MODIFIER]
  },
  {
    id: 'burger-bacon',
    name: 'Bacon Burger',
    category: 'Burgers',
    description: 'Crispy smoked bacon strips, melted cheddar cheese, salad & burger sauce.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['popular'],
    defaultPrice: 7.00,
    variations: makeBurgerVars('BACON', 7.00, 8.00),
    modifierSets: [BURGER_OPTIONS_MODIFIER]
  },
  {
    id: 'burger-donner',
    name: 'Donner Burger',
    category: 'Burgers',
    description: 'Beef patty generously loaded with spiced donner kebab meat, salad & sauce.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['popular'],
    defaultPrice: 7.00,
    variations: makeBurgerVars('DONNER', 7.00, 8.00),
    modifierSets: [BURGER_OPTIONS_MODIFIER]
  },
  {
    id: 'burger-sfc',
    name: 'SFC Burger',
    category: 'Burgers',
    description: 'Crispy southern fried chicken fillet with fresh lettuce, onions & creamy mayo.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['popular'],
    imageUrl: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80',
    defaultPrice: 6.00,
    variations: makeBurgerVars('SFC', 6.00, 7.00),
    modifierSets: [BURGER_OPTIONS_MODIFIER]
  },
  {
    id: 'burger-sizzler',
    name: 'Sizzler Burger',
    category: 'Burgers',
    description: 'Crispy SFC chicken fillet, melted cheese, spicy salsa, golden hash brown, mayo, lettuce & onions.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['signature', 'popular'],
    imageUrl: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80',
    defaultPrice: 6.90,
    variations: makeBurgerVars('SIZZLER', 6.90, 7.90),
    modifierSets: [SIZZLER_OPTIONS_MODIFIER]
  },

  // ----------------------------------------
  // 5. WRAPS
  // ----------------------------------------
  {
    id: 'wrap-sfc-fillet',
    name: 'SFC Fillet Wrap',
    category: 'Wraps',
    description: 'Crispy southern fried chicken fillet strips with fresh salad & cool mayo in a warm toasted tortilla.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['popular'],
    imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    defaultPrice: 6.20,
    variations: [{ id: 'v-wrap-sfc', name: 'Standard', sku: 'PINO-WRP-SFC', price: 6.20 }],
    modifierSets: [WRAP_OPTIONS_MODIFIER]
  },
  {
    id: 'wrap-sfc-sweet-chilli',
    name: 'SFC Sweet Chilli Wrap',
    category: 'Wraps',
    description: 'SFC chicken breast with fresh crispy salad, creamy mayo & sweet chilli glaze.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    defaultPrice: 6.40,
    variations: [{ id: 'v-wrap-sweet-chilli', name: 'Standard', sku: 'PINO-WRP-SWCH', price: 6.40 }],
    modifierSets: [WRAP_OPTIONS_MODIFIER]
  },
  {
    id: 'wrap-sfc-popcorn',
    name: 'SFC Popcorn Wrap',
    category: 'Wraps',
    description: 'Crispy popcorn chicken bites with salad, melted cheese & smoky BBQ sauce.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    defaultPrice: 6.50,
    variations: [{ id: 'v-wrap-popcorn', name: 'Standard', sku: 'PINO-WRP-POP', price: 6.50 }],
    modifierSets: [WRAP_OPTIONS_MODIFIER]
  },
  {
    id: 'wrap-donner',
    name: 'Donner Wrap',
    category: 'Wraps',
    description: 'Warm toasted tortilla packed with tender carved donner kebab meat, salad & mayo.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['popular'],
    defaultPrice: 6.50,
    variations: [{ id: 'v-wrap-donner', name: 'Standard', sku: 'PINO-WRP-DON', price: 6.50 }],
    modifierSets: [WRAP_OPTIONS_MODIFIER]
  },
  {
    id: 'wrap-cheesy-chips',
    name: 'Cheesy Chips Wrap',
    category: 'Wraps',
    description: 'Golden hot chips smothered in melted cheddar cheese with creamy mayo.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['vegetarian'],
    defaultPrice: 4.80,
    variations: [{ id: 'v-wrap-cheesy-chips', name: 'Standard', sku: 'PINO-WRP-CHP', price: 4.80 }],
    modifierSets: [WRAP_OPTIONS_MODIFIER]
  },
  {
    id: 'wrap-sfc-bacon',
    name: 'SFC Fillet & Bacon',
    category: 'Wraps',
    description: 'Crispy SFC chicken fillet layered with smokey bacon, crisp salad & mayo.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['signature'],
    defaultPrice: 6.90,
    variations: [{ id: 'v-wrap-sfc-bacon', name: 'Standard', sku: 'PINO-WRP-BAC', price: 6.90 }],
    modifierSets: [WRAP_OPTIONS_MODIFIER]
  },
  {
    id: 'wrap-steak-cheese',
    name: 'Steak & Cheese Wrap',
    category: 'Wraps',
    description: 'Tender seasoned steak strips with melted cheese, crisp salad & sauce.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['popular'],
    defaultPrice: 6.40,
    variations: [{ id: 'v-wrap-steak', name: 'Standard', sku: 'PINO-WRP-STK', price: 6.40 }],
    modifierSets: [WRAP_OPTIONS_MODIFIER]
  },

  // ----------------------------------------
  // 6. SIDES
  // ----------------------------------------
  {
    id: 'side-pot-sauce',
    name: '4oz Pot of Sauce',
    category: 'Sides',
    description: 'Choice of Garlic Mayo, Sweet Chilli, Chilli, Mayo, BBQ or Ketchup.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    defaultPrice: 1.30,
    variations: [{ id: 'v-side-pot-4oz', name: 'Standard', sku: 'PINO-SD-POT', price: 1.30 }],
    modifierSets: [DIP_CHOICE_MODIFIER]
  },
  {
    id: 'side-chips',
    name: 'Chips',
    category: 'Sides',
    description: 'Hot, golden, crispy potato chips cooked fresh to order.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['popular', 'vegetarian'],
    imageUrl: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80',
    defaultPrice: 2.90,
    variations: [{ id: 'v-chips-std', name: 'Standard', sku: 'PINO-SD-CHIPS', price: 2.90 }]
  },
  {
    id: 'side-cheesy-chips',
    name: 'Cheesy Chips',
    category: 'Sides',
    description: 'Crispy golden hot chips topped with generous melted cheddar cheese.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['popular', 'vegetarian'],
    defaultPrice: 4.50,
    variations: [{ id: 'v-cheesy-chips-std', name: 'Standard', sku: 'PINO-SD-CSH', price: 4.50 }]
  },
  {
    id: 'side-potato-wedges',
    name: 'Potato Wedges',
    category: 'Sides',
    description: 'Thick cut seasoned crispy potato wedges with savory herbs.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['vegetarian'],
    defaultPrice: 3.60,
    variations: [{ id: 'v-wedges-std', name: 'Standard', sku: 'PINO-SD-WDG', price: 3.60 }]
  },
  {
    id: 'side-onion-rings',
    name: 'Onion Rings (10 pcs)',
    category: 'Sides',
    description: '10 golden crispy battered whole onion rings.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['vegetarian'],
    imageUrl: 'https://images.unsplash.com/photo-1639024471285-0afc38316555?auto=format&fit=crop&w=800&q=80',
    defaultPrice: 3.20,
    variations: [{ id: 'v-rings-10', name: '10 pieces', sku: 'PINO-SD-OR10', price: 3.20 }]
  },
  {
    id: 'side-garlic-mushrooms',
    name: 'Garlic Mushrooms',
    category: 'Sides',
    description: 'Whole breaded mushrooms coated in crispy crumb with rich garlic butter.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['vegetarian'],
    defaultPrice: 4.00,
    variations: [{ id: 'v-mush-std', name: 'Standard', sku: 'PINO-SD-GM', price: 4.00 }]
  },
  {
    id: 'side-chicken-hot-wings',
    name: 'Chicken Hot Wings (6 pcs)',
    category: 'Sides',
    description: '6 spicy crispy fried chicken wings tossed in hot chilli seasoning.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['spicy', 'popular'],
    imageUrl: 'https://images.unsplash.com/photo-1527477378370-5b5849d44e54?auto=format&fit=crop&w=800&q=80',
    defaultPrice: 5.50,
    variations: [{ id: 'v-wings-6', name: '6 pieces', sku: 'PINO-SD-WNG6', price: 5.50 }]
  },
  {
    id: 'side-sfc-fillet-strips',
    name: 'SFC Fillet Strips (3 pcs)',
    category: 'Sides',
    description: '3 golden crispy southern fried 100% chicken breast fillet strips.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['popular'],
    defaultPrice: 4.20,
    variations: [{ id: 'v-strips-3', name: '3 pieces', sku: 'PINO-SD-STRP3', price: 4.20 }]
  },
  {
    id: 'side-donner-meat',
    name: 'Donner Meat Portion',
    category: 'Sides',
    description: 'Generous tray of freshly carved seasoned donner kebab meat.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['popular'],
    defaultPrice: 4.80,
    variations: [{ id: 'v-donner-std', name: 'Standard', sku: 'PINO-SD-DNTR', price: 4.80 }]
  },
  {
    id: 'side-salad',
    name: 'Side Salad',
    category: 'Sides',
    description: 'Crisp lettuce, fresh tomatoes, sliced red onions, cucumber and homemade coleslaw.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['vegetarian'],
    defaultPrice: 4.00,
    variations: [{ id: 'v-salad-std', name: 'Standard', sku: 'PINO-SD-SLD', price: 4.00 }]
  },
  {
    id: 'side-coleslaw',
    name: 'Coleslaw',
    category: 'Sides',
    description: 'Pot of creamy crunchy traditional coleslaw.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['vegetarian'],
    defaultPrice: 2.00,
    variations: [{ id: 'v-coleslaw-std', name: 'Standard', sku: 'PINO-SD-CLS', price: 2.00 }]
  },
  {
    id: 'side-mozzarella-sticks',
    name: 'Mozzarella Sticks',
    category: 'Sides',
    description: 'Crispy crumbed mozzarella cheese sticks with melted stringy cheese center.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['popular', 'vegetarian'],
    imageUrl: 'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?auto=format&fit=crop&w=800&q=80',
    defaultPrice: 5.00,
    variations: [
      { id: 'v-mozz-6', name: '6 pieces', sku: 'PINO-SD-MOZ6', price: 5.00 },
      { id: 'v-mozz-10', name: '10 pieces', sku: 'PINO-SD-MOZ10', price: 7.00 }
    ]
  },
  {
    id: 'side-jalapeno-balls',
    name: 'Jalapeno Balls',
    category: 'Sides',
    description: 'Crispy breaded spicy cream cheese and chopped jalapeño pepper bites.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['spicy', 'vegetarian'],
    defaultPrice: 5.00,
    variations: [
      { id: 'v-jal-6', name: '6 pieces', sku: 'PINO-SD-JAL6', price: 5.00 },
      { id: 'v-jal-10', name: '10 pieces', sku: 'PINO-SD-JAL10', price: 7.00 }
    ]
  },
  {
    id: 'drink-can-pop',
    name: 'Can of Pop',
    category: 'Sides',
    description: 'Chilled 330ml can of Pepsi, Diet Pepsi, Pepsi Max, 7Up, or Tango.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    defaultPrice: 1.30,
    variations: [{ id: 'v-can-330', name: 'Standard', sku: 'PINO-DRK-CAN', price: 1.30 }],
    modifierSets: [CAN_CHOICE_MODIFIER]
  },
  {
    id: 'drink-bottle-pepsi-max',
    name: '1.5L Bottle of Pepsi Max',
    category: 'Sides',
    description: 'Large 1.5 litre chilled sharing bottle of sugar-free Pepsi Max.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    defaultPrice: 2.90,
    variations: [{ id: 'v-bottle-15l', name: 'Standard', sku: 'PINO-DRK-15L', price: 2.90 }]
  },

  // ----------------------------------------
  // 7. MEAL DEALS
  // ----------------------------------------
  {
    id: 'deal-box-meal',
    name: 'Box Meal',
    category: 'Meal Deals',
    description: 'Garlic Bread with Cheese, Chips, Kebab Meat, Coleslaw, Lettuce, Tomatoes, Cucumber, Onions & a 4oz Dip.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['signature', 'popular'],
    imageUrl: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&w=800&q=80',
    defaultPrice: 13.00,
    variations: [
      { id: 'v-box-10', name: '10"', sku: 'PINO-BOX-10', price: 13.00 },
      { id: 'v-box-12', name: '12"', sku: 'PINO-BOX-12', price: 15.00 }
    ],
    includedItems: [
      'Garlic Bread with Cheese',
      'Chips',
      'Kebab Meat',
      'Coleslaw',
      'Lettuce and Tomatoes',
      'Cucumber & Onions',
      '4oz Dip'
    ],
    modifierSets: [DIP_CHOICE_MODIFIER]
  },
  {
    id: 'deal-set-1',
    name: 'Set Meal 1',
    category: 'Meal Deals',
    description: '3 x Southern Fried Chicken Fillet Strips & Hot Crispy Chips.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    defaultPrice: 6.80,
    variations: [{ id: 'v-set-1', name: 'Standard', sku: 'PINO-SET-1', price: 6.80 }],
    includedItems: [
      '3 x Southern Fried Chicken Strips',
      'Hot Crispy Chips'
    ]
  },
  {
    id: 'deal-set-2',
    name: 'Set Meal 2',
    category: 'Meal Deals',
    description: '8 x Golden Crispy Chicken Breast Nuggets & Hot Chips.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    defaultPrice: 7.30,
    variations: [{ id: 'v-set-2', name: 'Standard', sku: 'PINO-SET-2', price: 7.30 }],
    includedItems: [
      '8 x Crispy Chicken Breast Nuggets',
      'Hot Crispy Chips'
    ]
  },
  {
    id: 'deal-set-3',
    name: 'Set Meal 3',
    category: 'Meal Deals',
    description: 'Carved Spiced Donner Kebab Meat & Hot Crispy Chips.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['popular'],
    defaultPrice: 7.00,
    variations: [{ id: 'v-set-3', name: 'Standard', sku: 'PINO-SET-3', price: 7.00 }],
    includedItems: [
      'Carved Donner Kebab Meat',
      'Hot Crispy Chips'
    ]
  },
  {
    id: 'deal-set-4',
    name: 'Set Meal 4',
    category: 'Meal Deals',
    description: 'Southern Fried Popcorn Chicken Bites & Hot Crispy Chips.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    defaultPrice: 7.00,
    variations: [{ id: 'v-set-4', name: 'Standard', sku: 'PINO-SET-4', price: 7.00 }],
    includedItems: [
      'Southern Fried Popcorn Chicken Bites',
      'Hot Crispy Chips'
    ]
  },
  {
    id: 'deal-chicken-combo',
    name: 'Chicken Combo',
    category: 'Meal Deals',
    description: '2 x Chicken Fillet Strips, 4 x Chicken Nuggets, Popcorn Chicken & Hot Crispy Chips.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['popular'],
    defaultPrice: 7.50,
    variations: [{ id: 'v-combo-chick', name: 'Standard', sku: 'PINO-COMBO-CHK', price: 7.50 }],
    includedItems: [
      '2 x Chicken Fillet Strips',
      '4 x Chicken Nuggets',
      'Popcorn Chicken Bites',
      'Hot Crispy Chips'
    ]
  },
  {
    id: 'deal-mums-night-off',
    name: 'Mums Night Off',
    category: 'Meal Deals',
    description: 'Any 2 x 12-inch Pizzas from our menu & 1 x Large portion of Hot Crispy Chips.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['signature', 'popular'],
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    defaultPrice: 20.00,
    variations: [{ id: 'v-deal-mums', name: 'Standard', sku: 'PINO-DEAL-MUMS', price: 20.00 }],
    includedItems: [
      '2 x 12" Pizzas (Customer Choice)',
      '1 x Large Hot Crispy Chips'
    ],
    modifierSets: [PIZZA_DEAL_CHOICE_1, PIZZA_DEAL_CHOICE_2]
  },
  {
    id: 'deal-family-feast',
    name: 'Family Feast',
    category: 'Meal Deals',
    description: 'Any 2 x 12-inch Pizzas, 1 x 12-inch Garlic Bread with Cheese, 1 x Large Chips & 1.5L Bottle Pepsi Max.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['signature', 'popular'],
    imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',
    defaultPrice: 25.50,
    variations: [{ id: 'v-deal-family', name: 'Standard', sku: 'PINO-DEAL-FAM', price: 25.50 }],
    includedItems: [
      '2 x 12" Pizzas (Customer Choice)',
      '1 x 12" Garlic Bread with Cheese',
      '1 x Large Hot Chips',
      '1 x 1.5L Bottle Pepsi Max'
    ],
    modifierSets: [PIZZA_DEAL_CHOICE_1, PIZZA_DEAL_CHOICE_2]
  },

  // ----------------------------------------
  // 8. DESSERTS
  // ----------------------------------------
  {
    id: 'dessert-choc-fudge-cake',
    name: 'Chocolate Fudge Cake',
    category: 'Desserts',
    description: 'Rich dark chocolate sponge layered with gooey chocolate fudge. Ask for available flavors.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['popular', 'vegetarian'],
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    defaultPrice: 5.50,
    variations: [{ id: 'v-cake-choc', name: 'Slice', sku: 'PINO-DS-CHOC', price: 5.50 }]
  },
  {
    id: 'dessert-homemade-cheesecake',
    name: 'Homemade Cheese Cake',
    category: 'Desserts',
    description: 'Velvety smooth artisanal cheesecake on buttery biscuit base. Ask for available flavors.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['vegetarian'],
    defaultPrice: 5.50,
    variations: [{ id: 'v-cake-cheese', name: 'Slice', sku: 'PINO-DS-CHS', price: 5.50 }]
  },

  // ----------------------------------------
  // 9. DRINKS (MILKSHAKES)
  // ----------------------------------------
  {
    id: 'drink-shake-bueno',
    name: 'Bueno Milkshake',
    category: 'Drinks',
    description: 'Thick gourmet milkshake blended with real Kinder Bueno hazelnut chocolate & whipped cream.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['popular'],
    imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    defaultPrice: 5.50,
    variations: [{ id: 'v-shake-bueno', name: '16oz', sku: 'PINO-SHK-BUE', price: 5.50 }]
  },
  {
    id: 'drink-shake-mint-aero',
    name: 'Mint Aero Milkshake',
    category: 'Drinks',
    description: 'Refreshing thick milkshake blended with Mint Aero bubbly chocolate.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    defaultPrice: 5.50,
    variations: [{ id: 'v-shake-mintaero', name: '16oz', sku: 'PINO-SHK-AERO', price: 5.50 }]
  },
  {
    id: 'drink-shake-oreo',
    name: 'Oreo Milkshake',
    category: 'Drinks',
    description: 'Creamy thick shake spun with crushed Oreo cookies & vanilla ice cream.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    tags: ['popular'],
    defaultPrice: 5.50,
    variations: [{ id: 'v-shake-oreo', name: '16oz', sku: 'PINO-SHK-OREO', price: 5.50 }]
  },
  {
    id: 'drink-shake-strawberry',
    name: 'Strawberry Milkshake',
    category: 'Drinks',
    description: 'Classic velvety strawberry ice cream milkshake topped with strawberry swirl.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    defaultPrice: 5.50,
    variations: [{ id: 'v-shake-straw', name: '16oz', sku: 'PINO-SHK-STRAW', price: 5.50 }]
  },
  {
    id: 'drink-shake-chocolate',
    name: 'Chocolate Milkshake',
    category: 'Drinks',
    description: 'Decadent double chocolate thick milkshake with chocolate drizzle.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    defaultPrice: 5.50,
    variations: [{ id: 'v-shake-choc', name: '16oz', sku: 'PINO-SHK-CHOC', price: 5.50 }]
  },
  {
    id: 'drink-shake-crunchie',
    name: 'Crunchie Milkshake',
    category: 'Drinks',
    description: 'Golden honeycomb Cadbury Crunchie chunks blended into thick creamy milkshake.',
    itemType: 'Prepared food and beverage',
    inStock: true,
    defaultPrice: 5.50,
    variations: [{ id: 'v-shake-crunchie', name: '16oz', sku: 'PINO-SHK-CRN', price: 5.50 }]
  }
];

// Backward-compatible modifier exports
export const COMMON_BYO_MODIFIERS = BYO_PIZZA_MODIFIERS;
export const MEAL_DEAL_DRINK_MODIFIER = CAN_CHOICE_MODIFIER;
export const MEAL_DEAL_FILLING_MODIFIER = DIP_CHOICE_MODIFIER;
