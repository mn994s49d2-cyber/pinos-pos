/**
 * Preset Food Photography for PIZZA PINO
 * High-quality, reliable imagery for stone-baked pizzas, garlic bread, calzones, burgers, wraps, sides, and shakes.
 */

export interface PresetImageOption {
  id: string;
  name: string;
  category: string;
  url: string;
  thumb: string;
}

export const PRESET_FOOD_IMAGES: PresetImageOption[] = [
  {
    id: 'pizza-margherita',
    name: 'Classic Margherita Pizza',
    category: 'Pizzas',
    url: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=200&q=75'
  },
  {
    id: 'pizza-pepperoni',
    name: 'Double Pepperoni Pizza',
    category: 'Pizzas',
    url: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=200&q=75'
  },
  {
    id: 'pizza-meat-feast',
    name: 'Meat Feast Supreme',
    category: 'Pizzas',
    url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=200&q=75'
  },
  {
    id: 'pizza-bbq-chicken',
    name: 'BBQ Chicken Pizza',
    category: 'Pizzas',
    url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=200&q=75'
  },
  {
    id: 'pizza-vegetarian',
    name: 'Vegetarian Garden Pizza',
    category: 'Pizzas',
    url: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=200&q=75'
  },
  {
    id: 'pizza-spicy',
    name: 'Red Hot Chilli / Spicy Beef Pizza',
    category: 'Pizzas',
    url: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=200&q=75'
  },
  {
    id: 'garlic-bread-cheese',
    name: 'Cheesy Garlic Bread',
    category: 'Garlic Bread',
    url: 'https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?auto=format&fit=crop&w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?auto=format&fit=crop&w=200&q=75'
  },
  {
    id: 'calzone-golden',
    name: 'Folded Stuffed Calzone',
    category: 'Calzones',
    url: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&w=200&q=75'
  },
  {
    id: 'burger-gourmet',
    name: 'Gourmet Cheeseburger',
    category: 'Burgers',
    url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=200&q=75'
  },
  {
    id: 'burger-sfc-sizzler',
    name: 'SFC Sizzler Chicken Burger',
    category: 'Burgers',
    url: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=200&q=75'
  },
  {
    id: 'wrap-donner-sfc',
    name: 'Toasted Chicken & Donner Wrap',
    category: 'Wraps',
    url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=200&q=75'
  },
  {
    id: 'side-chips',
    name: 'Hot Crispy Chips',
    category: 'Sides',
    url: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=200&q=75'
  },
  {
    id: 'side-mozzarella-sticks',
    name: 'Crispy Mozzarella Sticks',
    category: 'Sides',
    url: 'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?auto=format&fit=crop&w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?auto=format&fit=crop&w=200&q=75'
  },
  {
    id: 'side-hot-wings',
    name: 'Spicy Chicken Hot Wings',
    category: 'Sides',
    url: 'https://images.unsplash.com/photo-1527477378370-5b5849d44e54?auto=format&fit=crop&w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1527477378370-5b5849d44e54?auto=format&fit=crop&w=200&q=75'
  },
  {
    id: 'side-onion-rings',
    name: 'Golden Beer Battered Onion Rings',
    category: 'Sides',
    url: 'https://images.unsplash.com/photo-1639024471285-0afc38316555?auto=format&fit=crop&w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1639024471285-0afc38316555?auto=format&fit=crop&w=200&q=75'
  },
  {
    id: 'dessert-choc-cake',
    name: 'Chocolate Fudge Cake',
    category: 'Desserts',
    url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=200&q=75'
  },
  {
    id: 'drink-milkshake',
    name: 'Thick Gourmet Milkshake',
    category: 'Drinks',
    url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=200&q=75'
  },
  {
    id: 'drink-pepsi-can',
    name: 'Cold Can of Pop / Pepsi Max',
    category: 'Drinks',
    url: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=200&q=75'
  }
];
