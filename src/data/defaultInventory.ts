import { InventoryItem } from '../types';

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'inv-dough-balls',
    name: 'Fresh Pizza Dough Balls (10" & 12")',
    category: 'Bakery & Dough',
    currentStock: 160,
    unit: 'units',
    minThreshold: 40,
    costPerUnit: 0.45
  },
  {
    id: 'inv-pizza-flour',
    name: 'Italian Pizza Flour "00"',
    category: 'Dry Goods',
    currentStock: 125,
    unit: 'kg',
    minThreshold: 25,
    costPerUnit: 1.15
  },
  {
    id: 'inv-mozzarella',
    name: '100% Shredded Mozzarella Cheese',
    category: 'Dairy & Cheese',
    currentStock: 45.0,
    unit: 'kg',
    minThreshold: 12.0,
    costPerUnit: 5.80
  },
  {
    id: 'inv-pizza-sauce',
    name: 'Rich Italian Seasoned Tomato Pizza Sauce',
    category: 'Sauces & Condiments',
    currentStock: 35.0,
    unit: 'liters',
    minThreshold: 8.0,
    costPerUnit: 2.20
  },
  {
    id: 'inv-pepperoni',
    name: 'Cured Spicy Pepperoni Slices',
    category: 'Meat & Poultry',
    currentStock: 18.5,
    unit: 'kg',
    minThreshold: 4.0,
    costPerUnit: 7.50
  },
  {
    id: 'inv-ham',
    name: 'Sliced Cooked Pizza Ham',
    category: 'Meat & Poultry',
    currentStock: 16.0,
    unit: 'kg',
    minThreshold: 3.5,
    costPerUnit: 6.80
  },
  {
    id: 'inv-donner',
    name: 'Seasoned Donner Kebab Meat',
    category: 'Meat & Poultry',
    currentStock: 25.0,
    unit: 'kg',
    minThreshold: 5.0,
    costPerUnit: 6.20
  },
  {
    id: 'inv-sfc-fillets',
    name: 'Southern Fried Chicken Fillets',
    category: 'Meat & Poultry',
    currentStock: 80,
    unit: 'units',
    minThreshold: 20,
    costPerUnit: 0.95
  },
  {
    id: 'inv-beef-patties',
    name: '5oz Gourmet Beef Burger Patties',
    category: 'Meat & Poultry',
    currentStock: 90,
    unit: 'units',
    minThreshold: 25,
    costPerUnit: 1.20
  },
  {
    id: 'inv-garlic-butter',
    name: 'Fresh Garlic & Herb Butter Spread',
    category: 'Dairy & Cheese',
    currentStock: 12.0,
    unit: 'kg',
    minThreshold: 3.0,
    costPerUnit: 4.10
  },
  {
    id: 'inv-chips',
    name: 'Premium Skin-On Chips (Cases)',
    category: 'Produce',
    currentStock: 95,
    unit: 'kg',
    minThreshold: 20,
    costPerUnit: 1.30
  },
  {
    id: 'inv-mushrooms',
    name: 'Fresh Sliced Field Mushrooms',
    category: 'Produce',
    currentStock: 12.0,
    unit: 'kg',
    minThreshold: 3.0,
    costPerUnit: 2.80
  },
  {
    id: 'inv-onions',
    name: 'Diced Red & White Onions',
    category: 'Produce',
    currentStock: 18.0,
    unit: 'kg',
    minThreshold: 4.0,
    costPerUnit: 1.20
  },
  {
    id: 'inv-peppers',
    name: 'Sliced Mixed Bell Peppers',
    category: 'Produce',
    currentStock: 14.0,
    unit: 'kg',
    minThreshold: 3.0,
    costPerUnit: 2.90
  },
  {
    id: 'inv-jalapenos',
    name: 'Sliced Green Pickled Jalapeños',
    category: 'Produce',
    currentStock: 8.5,
    unit: 'kg',
    minThreshold: 2.0,
    costPerUnit: 3.20
  },
  {
    id: 'inv-sauce-garlic-mayo',
    name: 'Garlic Mayo Sauce Drums',
    category: 'Sauces & Condiments',
    currentStock: 15.0,
    unit: 'liters',
    minThreshold: 3.0,
    costPerUnit: 3.50
  },
  {
    id: 'inv-boxes-10',
    name: '10-inch Corrugated Pizza Boxes',
    category: 'Packaging',
    currentStock: 350,
    unit: 'units',
    minThreshold: 80,
    costPerUnit: 0.22
  },
  {
    id: 'inv-boxes-12',
    name: '12-inch Corrugated Pizza Boxes',
    category: 'Packaging',
    currentStock: 420,
    unit: 'units',
    minThreshold: 100,
    costPerUnit: 0.28
  },
  {
    id: 'inv-cans-pepsi',
    name: 'Canned Drinks Assorted (Pepsi, 7Up, Tango)',
    category: 'Beverages',
    currentStock: 180,
    unit: 'units',
    minThreshold: 40,
    costPerUnit: 0.48
  },
  {
    id: 'inv-milkshake-mix',
    name: 'Artisan Dairy Milkshake Base Mix',
    category: 'Dairy & Cheese',
    currentStock: 24.0,
    unit: 'liters',
    minThreshold: 6.0,
    costPerUnit: 2.80
  }
];
