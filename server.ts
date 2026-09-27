import express from 'express';
import path from 'path';
import os from 'os';
import { createServer as createViteServer } from 'vite';
import { INITIAL_MENU_ITEMS } from './src/data/defaultMenu.ts';
import { INITIAL_INVENTORY } from './src/data/defaultInventory.ts';

const app = express();
const PORT = 3000;

// In-memory persistent state (persists across connected clients on network)
let menuItems = [...INITIAL_MENU_ITEMS];
let inventoryItems = [...INITIAL_INVENTORY];
function normalizeSchedulingFields(orderPayload: any) {
  const orderNum = orderPayload.orderNumber || nextOrderNumber++;
  const ticketNumber = orderPayload.ticketNumber || `A-${orderNum}`;
  const placedTime = orderPayload.placedAt || orderPayload.timestamp || new Date().toISOString();
  
  // Resolve dueAt and dueTime
  let dueAtIso = '';
  let dueTimeFormatted = '';

  if (orderPayload.dueAt) {
    dueAtIso = new Date(orderPayload.dueAt).toISOString();
  } else if (orderPayload.dueTime && orderPayload.dueTime.includes('T')) {
    dueAtIso = new Date(orderPayload.dueTime).toISOString();
  } else if (orderPayload.dueTime && /^\d{1,2}:\d{2}$/.test(orderPayload.dueTime.trim())) {
    const [h, m] = orderPayload.dueTime.trim().split(':').map(Number);
    const d = new Date(placedTime);
    d.setHours(h, m, 0, 0);
    dueAtIso = d.toISOString();
  } else {
    const leadMinutes = orderPayload.dueMinutes || (orderPayload.type === 'dine_in' ? 12 : 10);
    dueAtIso = new Date(new Date(placedTime).getTime() + leadMinutes * 60000).toISOString();
  }

  // Format short dueTime "HH:MM"
  if (orderPayload.dueTime && /^\d{1,2}:\d{2}$/.test(orderPayload.dueTime.trim())) {
    const [h, m] = orderPayload.dueTime.trim().split(':');
    dueTimeFormatted = `${h.padStart(2, '0')}:${m}`;
  } else {
    const d = new Date(dueAtIso);
    dueTimeFormatted = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  }

  // Time of Day
  const dueHour = new Date(dueAtIso).getHours();
  const timeOfDay = orderPayload.timeOfDay || (dueHour < 14 ? 'lunch' : dueHour < 17 ? 'afternoon' : 'dinner');
  const capitalizedTimeOfDay = timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1).toLowerCase();

  // Is Pre-order: explicit flag or >= 20 mins gap
  const diffMinutes = Math.round((new Date(dueAtIso).getTime() - new Date(placedTime).getTime()) / 60000);
  const isPreOrder = orderPayload.isPreOrder !== undefined ? Boolean(orderPayload.isPreOrder) : (diffMinutes >= 20);

  // Pickup Time string
  const pickupTime = orderPayload.pickupTime || `Today at ${dueTimeFormatted} (${capitalizedTimeOfDay})`;

  // Notes prepending for thermal & kitchen chits
  let rawNotes = (orderPayload.notes || orderPayload.customerNotes || '').trim();
  let formattedNotes = rawNotes;
  if (isPreOrder) {
    if (!formattedNotes.includes('[PRE-ORDER DUE:')) {
      const prefix = `[PRE-ORDER DUE: ${dueTimeFormatted} (${timeOfDay.toUpperCase()})]`;
      formattedNotes = rawNotes ? `${prefix} ${rawNotes}` : prefix;
    }
  }

  return {
    ...orderPayload,
    id: orderPayload.id || `ord-${orderNum}`,
    orderNumber: orderNum,
    ticketNumber,
    timestamp: placedTime,
    placedAt: placedTime,
    dueAt: dueAtIso,
    dueTime: dueTimeFormatted,
    dueMinutes: orderPayload.dueMinutes || Math.max(10, diffMinutes),
    isPreOrder,
    timeOfDay,
    pickupTime,
    notes: formattedNotes,
    customerNotes: formattedNotes,
    status: orderPayload.status || 'pending',
    paymentStatus: orderPayload.paymentStatus || 'paid',
    source: orderPayload.source || 'pos'
  };
}

let nextOrderNumber = 106;

let orders: any[] = [
  normalizeSchedulingFields({
    id: 'ord-101',
    orderNumber: 101,
    ticketNumber: 'A-101',
    timestamp: new Date(Date.now() - 10 * 60000).toISOString(),
    placedAt: new Date(Date.now() - 10 * 60000).toISOString(),
    dueAt: new Date(Date.now() + 2 * 60000).toISOString(),
    dueMinutes: 12,
    type: 'dine_in',
    tableNumber: '4',
    customerName: 'James L.',
    timeOfDay: 'lunch',
    isPreOrder: false,
    items: [
      {
        cartItemId: 'c1',
        menuItemId: 'pizza-double-pepperoni',
        name: 'Double Pepperoni',
        category: 'Pizzas',
        variation: { id: 'v-DBL-PEP-12', name: '12"', sku: 'PINO-DBL-PEP-12', price: 10.30 },
        selectedModifiers: [
          { setId: 'pizza-base', setName: 'Pizza Base Sauce', optionId: 'b-tomato', optionName: 'Tomato Base', priceDelta: 0 },
          { setId: 'pizza-crust', setName: 'Crust Style', optionId: 'crust-cheese', optionName: 'Cheese Stuffed Crust', priceDelta: 2.50 }
        ],
        unitPrice: 12.80,
        quantity: 1,
        totalPrice: 12.80,
        specialAdditions: ['Well Done / Crispy Crust']
      },
      {
        cartItemId: 'c2',
        menuItemId: 'drink-can-pop',
        name: 'Can of Pop',
        category: 'Sides',
        variation: { id: 'v-can-330', name: 'Standard', sku: 'PINO-DRK-CAN', price: 1.30 },
        selectedModifiers: [{ setId: 'can-choice', setName: 'Select Can of Pop', optionId: 'can-pepsi-max', optionName: 'Pepsi Max', priceDelta: 0 }],
        unitPrice: 1.30,
        quantity: 1,
        totalPrice: 1.30
      }
    ],
    subtotal: 11.75,
    tax: 2.35,
    total: 14.10,
    status: 'ready',
    kitchenBumped: true,
    paymentMethod: 'card_terminal',
    paymentStatus: 'paid',
    cardBrand: 'Visa',
    cardLast4: '4242',
    paymentRef: 'TXN-984210',
    preparedAt: new Date(Date.now() - 2 * 60000).toISOString()
  }),
  normalizeSchedulingFields({
    id: 'ord-102',
    orderNumber: 102,
    ticketNumber: 'A-102',
    timestamp: new Date(Date.now() - 4 * 60000).toISOString(),
    placedAt: new Date(Date.now() - 4 * 60000).toISOString(),
    dueAt: new Date(Date.now() + 6 * 60000).toISOString(),
    dueMinutes: 10,
    type: 'takeaway',
    customerName: 'Sarah M.',
    timeOfDay: 'lunch',
    isPreOrder: false,
    kitchenBumped: false,
    items: [
      {
        cartItemId: 'c3',
        menuItemId: 'pizza-pino-special',
        name: 'Pino Special',
        category: 'Pizzas',
        variation: { id: 'v-PINO-SPEC-12', name: '12"', sku: 'PINO-SPEC-12', price: 11.40 },
        selectedModifiers: [
          { setId: 'pizza-base', setName: 'Pizza Base Sauce', optionId: 'b-tomato', optionName: 'Tomato Base', priceDelta: 0 },
          { setId: 'pizza-crust', setName: 'Crust Style', optionId: 'crust-standard', optionName: 'Standard Crust', priceDelta: 0 }
        ],
        specialAdditions: ['Cut into 8 slices'],
        unitPrice: 11.40,
        quantity: 1,
        totalPrice: 11.40
      },
      {
        cartItemId: 'c4',
        menuItemId: 'gb-cheese',
        name: 'Garlic Bread Cheese',
        category: 'Garlic Bread',
        variation: { id: 'v-gb-CHEESE-10', name: '10"', sku: 'PINO-GB-CHEESE-10', price: 6.50 },
        selectedModifiers: [],
        unitPrice: 6.50,
        quantity: 1,
        totalPrice: 6.50
      }
    ],
    subtotal: 14.92,
    tax: 2.98,
    total: 17.90,
    status: 'preparing',
    paymentMethod: 'contactless',
    paymentStatus: 'paid',
    cardBrand: 'Apple Pay',
    cardLast4: '8821',
    paymentRef: 'TXN-984211'
  }),
  normalizeSchedulingFields({
    id: 'ord-103',
    orderNumber: 103,
    ticketNumber: 'A-103',
    customerName: 'Marcus B.',
    type: 'takeaway',
    isPreOrder: true,
    timestamp: new Date(Date.now() - 25 * 60000).toISOString(),
    placedAt: new Date(Date.now() - 25 * 60000).toISOString(),
    dueAt: new Date(Date.now() + 16 * 60000).toISOString(),
    timeOfDay: 'afternoon',
    notes: 'Please pack garlic mayo pot',
    items: [
      {
        cartItemId: 'c5',
        menuItemId: 'deal-mums-night-off',
        name: 'Mums Night Off',
        category: 'Meal Deals',
        variation: { id: 'v-deal-mums', name: 'Standard', sku: 'PINO-DEAL-MUMS', price: 20.00 },
        selectedModifiers: [
          { setId: 'deal-pizza-1', setName: 'Choose 1st 12" Pizza', optionId: 'dp1-meatfeast', optionName: '12" Meat Feast', priceDelta: 0 },
          { setId: 'deal-pizza-2', setName: 'Choose 2nd 12" Pizza', optionId: 'dp2-bbq-chicken', optionName: '12" BBQ Chicken', priceDelta: 0 }
        ],
        includedItems: [
          '2 x 12" Pizzas: 12" Meat Feast + 12" BBQ Chicken',
          '1 x Large Hot Crispy Chips'
        ],
        unitPrice: 20.00,
        quantity: 1,
        totalPrice: 20.00
      }
    ],
    subtotal: 16.67,
    tax: 3.33,
    total: 20.00,
    status: 'pending',
    paymentStatus: 'paid',
    paymentMethod: 'contactless'
  }),
  normalizeSchedulingFields({
    id: 'ord-104',
    orderNumber: 104,
    ticketNumber: 'A-104',
    customerName: 'Oliver T.',
    type: 'takeaway',
    isPreOrder: true,
    dueTime: '18:30',
    dueAt: '2026-09-26T18:30:00.000Z',
    timeOfDay: 'dinner',
    pickupTime: 'Today at 18:30 (Dinner)',
    notes: '[PRE-ORDER DUE: 18:30 (DINNER)] Please pack extra napkins',
    customerNotes: '[PRE-ORDER DUE: 18:30 (DINNER)] Please pack extra napkins',
    timestamp: '2026-09-26T14:30:00.000Z',
    placedAt: '2026-09-26T14:30:00.000Z',
    status: 'pending',
    paymentStatus: 'paid',
    paymentMethod: 'contactless',
    subtotal: 5.75,
    tax: 1.15,
    total: 6.90,
    items: [
      {
        cartItemId: 'c6',
        menuItemId: 'burger-sizzler',
        name: 'Sizzler Burger',
        category: 'Burgers',
        variation: { id: 'v-bg-SIZZLER-5', name: '5oz Single', sku: 'PINO-BG-SIZZLER-5', price: 6.90 },
        selectedModifiers: [],
        unitPrice: 6.90,
        quantity: 1,
        totalPrice: 6.90
      }
    ]
  }),
  normalizeSchedulingFields({
    id: 'ord-105',
    orderNumber: 105,
    ticketNumber: 'A-105',
    customerName: 'Liam K.',
    type: 'takeaway',
    isPreOrder: false,
    timestamp: new Date(Date.now() - 3 * 60000).toISOString(),
    placedAt: new Date(Date.now() - 3 * 60000).toISOString(),
    dueAt: new Date(Date.now() + 7 * 60000).toISOString(),
    dueMinutes: 10,
    timeOfDay: 'lunch',
    status: 'preparing',
    paymentStatus: 'paid',
    paymentMethod: 'contactless',
    items: [
      {
        cartItemId: 'c7',
        menuItemId: 'deal-box-meal',
        name: 'Box Meal',
        category: 'Meal Deals',
        variation: { id: 'v-box-12', name: '12"', sku: 'PINO-BOX-12', price: 15.00 },
        selectedModifiers: [
          { setId: 'dip-choice', setName: 'Select 4oz Dip', optionId: 'dip-chilli', optionName: 'Chilli Sauce', priceDelta: 0 }
        ],
        includedItems: [
          'Garlic Bread with Cheese',
          'Chips',
          'Kebab Meat',
          'Coleslaw',
          'Lettuce and Tomatoes',
          'Cucumber & Onions',
          '4oz Dip: Chilli Sauce'
        ],
        unitPrice: 15.00,
        quantity: 1,
        totalPrice: 15.00,
        specialAdditions: ['Extra Coleslaw']
      }
    ],
    subtotal: 12.50,
    tax: 2.50,
    total: 15.00
  })
];
let activeCfdCart: any = {
  items: [],
  subtotal: 0,
  tax: 0,
  total: 0,
  orderType: 'takeaway',
  customerGreeting: 'Welcome to PIZZA PINO!'
};

let connectedDevices: any[] = [];

let customizationSettings = {
  themeMode: 'light',
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
    mealDealDesc: 'Any 2 x 12-inch Pizzas from our menu + 1 x Large Hot Crispy Chips.'
  },
  printer: {
    type: 'browser',
    paperWidth: 80,
    autoPrintOnPayment: true
  },
  paymentTerminal: {
    provider: 'simulator',
    status: 'connected',
    testMode: true,
    readerId: '',
    locationId: '',
    deviceCode: '',
    ipAddress: ''
  }
};

app.use(express.json({ limit: '15mb' }));

// Universal CORS Middleware: Enables seamless cross-origin communication
// from customer mobile web apps, external servers, and local network devices
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Helper to determine local IP addresses
function getLocalNetworkIPs(): string[] {
  const interfaces = os.networkInterfaces();
  const ips: string[] = [];
  for (const devName in interfaces) {
    const iface = interfaces[devName];
    if (iface) {
      for (const alias of iface) {
        if (alias.family === 'IPv4' && !alias.internal) {
          ips.push(alias.address);
        }
      }
    }
  }
  return ips.length > 0 ? ips : ['127.0.0.1'];
}

// ----------------- API ROUTES ----------------- //

// Health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString(), totalOrders: orders.length });
});

// Network info & device discovery
app.get('/api/network/info', (req, res) => {
  const localIPs = getLocalNetworkIPs();
  const primaryIP = localIPs[0] || 'localhost';
  const reqHost = req.get('host') || `${primaryIP}:${PORT}`;
  const protocol = req.protocol === 'https' || req.get('x-forwarded-proto') === 'https' ? 'https' : 'http';
  const baseUrl = `${protocol}://${reqHost}`;

  res.json({
    host: reqHost,
    port: PORT,
    localIps: localIPs,
    primaryIp: primaryIP,
    baseUrl,
    urls: {
      pos: `${baseUrl}?screen=pos`,
      kds: `${baseUrl}?screen=kds`,
      signageMenu: `${baseUrl}?screen=signage_menu`,
      orderStatus: `${baseUrl}?screen=order_status`,
      cfd: `${baseUrl}?screen=cfd`,
      inventory: `${baseUrl}?screen=inventory`,
      networkHub: `${baseUrl}?screen=network_hub`
    },
    connectedDevices
  });
});

// Register or ping a connected device (e.g. Kitchen iPad, Customer TV)
app.post('/api/network/register-device', (req, res) => {
  const { id, name, type } = req.body;
  const ipAddress = req.ip || req.socket.remoteAddress || 'unknown';
  const existingIdx = connectedDevices.findIndex(d => d.id === id);

  const deviceData = {
    id: id || `dev-${Date.now()}`,
    name: name || `${type.toUpperCase()} Station`,
    type: type || 'pos',
    ipAddress,
    lastActive: new Date().toISOString(),
    status: 'online'
  };

  if (existingIdx >= 0) {
    connectedDevices[existingIdx] = deviceData;
  } else {
    connectedDevices.push(deviceData);
  }

  // Prune devices inactive for > 15 mins
  const now = Date.now();
  connectedDevices = connectedDevices.filter(d => {
    return now - new Date(d.lastActive).getTime() < 15 * 60 * 1000;
  });

  res.json({ success: true, device: deviceData, totalConnected: connectedDevices.length });
});

// Customization & Typography Settings Endpoints
app.get('/api/customization', (req, res) => {
  res.json(customizationSettings);
});

app.post('/api/customization', (req, res) => {
  const newSettings = req.body;
  if (newSettings && typeof newSettings === 'object') {
    customizationSettings = {
      ...customizationSettings,
      ...newSettings,
      paymentTerminal: {
        ...customizationSettings.paymentTerminal,
        ...(newSettings.paymentTerminal || {})
      },
      printer: {
        ...customizationSettings.printer,
        ...(newSettings.printer || {})
      },
      digitalSignage: {
        ...customizationSettings.digitalSignage,
        ...(newSettings.digitalSignage || {})
      }
    };
    res.json({ success: true, settings: customizationSettings });
  } else {
    res.status(400).json({ error: 'Invalid settings payload' });
  }
});

// Menu Endpoints
app.get('/api/menu', (req, res) => {
  res.json(menuItems);
});

// Add new menu item
app.post('/api/menu/item', (req, res) => {
  const newItem = req.body;
  if (!newItem || !newItem.name) {
    return res.status(400).json({ error: 'Item name is required' });
  }

  const createdItem = {
    ...newItem,
    id: newItem.id || `item-${Date.now()}`,
    category: newItem.category || 'Loaded Roast Potatoes',
    itemType: newItem.itemType || 'Prepared food and beverage',
    description: newItem.description || '',
    inStock: newItem.inStock !== false,
    defaultPrice: typeof newItem.defaultPrice === 'number' ? newItem.defaultPrice : 6.50,
    variations: Array.isArray(newItem.variations) && newItem.variations.length > 0 
      ? newItem.variations 
      : [{ id: `v-${Date.now()}`, name: 'Standard', sku: `ROAST-${Date.now().toString().slice(-4)}`, price: newItem.defaultPrice || 6.50 }],
    tags: Array.isArray(newItem.tags) ? newItem.tags : [],
    imageUrl: newItem.imageUrl || ''
  };

  menuItems.push(createdItem);
  res.status(201).json({ success: true, item: createdItem });
});

// Full update of menu item (name, category, description, price, variations, imageUrl, tags, etc.)
app.put('/api/menu/item/:id', (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const idx = menuItems.findIndex(i => i.id === id);

  if (idx >= 0) {
    menuItems[idx] = {
      ...menuItems[idx],
      ...updatedData,
      id // preserve ID
    };
    res.json({ success: true, item: menuItems[idx] });
  } else {
    res.status(404).json({ error: 'Menu item not found' });
  }
});

// Delete menu item
app.delete('/api/menu/item/:id', (req, res) => {
  const { id } = req.params;
  const beforeLen = menuItems.length;
  menuItems = menuItems.filter(i => i.id !== id);

  if (menuItems.length < beforeLen) {
    res.json({ success: true, deletedId: id });
  } else {
    res.status(404).json({ error: 'Menu item not found' });
  }
});

// Reorder menu items
app.post('/api/menu/reorder', (req, res) => {
  const { items, categoryOrder } = req.body;
  if (Array.isArray(items)) {
    menuItems = items;
  }
  if (Array.isArray(categoryOrder)) {
    customizationSettings.categoryOrder = categoryOrder;
  }
  res.json({ success: true, count: menuItems.length });
});

app.post('/api/menu/update-item', (req, res) => {
  const { id, inStock, price, variations } = req.body;
  const itemIndex = menuItems.findIndex(item => item.id === id);
  if (itemIndex >= 0) {
    if (typeof inStock === 'boolean') menuItems[itemIndex].inStock = inStock;
    if (typeof price === 'number') menuItems[itemIndex].defaultPrice = price;
    if (variations && Array.isArray(variations)) menuItems[itemIndex].variations = variations;
    res.json({ success: true, item: menuItems[itemIndex] });
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

app.post('/api/menu/import', (req, res) => {
  const { items } = req.body;
  if (Array.isArray(items) && items.length > 0) {
    menuItems = items;
    res.json({ success: true, count: menuItems.length });
  } else {
    res.status(400).json({ error: 'Invalid menu items array' });
  }
});

app.post('/api/menu/reset-default', (req, res) => {
  menuItems = [...INITIAL_MENU_ITEMS];
  res.json({ success: true, count: menuItems.length });
});

// Orders Endpoints
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

// Single Order Status Endpoint (for customer app tracking)
app.get('/api/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id || String(o.orderNumber) === req.params.id);
  if (order) {
    return res.json(order);
  }
  return res.status(404).json({ error: 'Order not found' });
});

app.post('/api/orders', (req, res) => {
  const orderPayload = req.body;
  const newOrder = normalizeSchedulingFields(orderPayload);

  orders.unshift(newOrder);

  // Auto-deduct inventory
  if (Array.isArray(newOrder.items)) {
    newOrder.items.forEach((item: any) => {
      // Deduct potatoes
      const potatoInv = inventoryItems.find(i => i.id === 'inv-potatoes');
      if (potatoInv) {
        const portionKg = item.variation?.name === 'Large' ? 0.45 : item.variation?.name === 'Medium' ? 0.35 : 0.25;
        potatoInv.currentStock = Math.max(0, Math.round((potatoInv.currentStock - portionKg * item.quantity) * 10) / 10);
      }
      // Deduct box
      const boxInv = inventoryItems.find(i => i.id === 'inv-takeaway-boxes');
      if (boxInv && newOrder.type === 'takeaway') {
        boxInv.currentStock = Math.max(0, boxInv.currentStock - item.quantity);
      }
      // Deduct roti if wrap
      if (item.category?.includes('Roti') || item.name?.includes('Roti')) {
        const rotiInv = inventoryItems.find(i => i.id === 'inv-roti');
        if (rotiInv) rotiInv.currentStock = Math.max(0, rotiInv.currentStock - item.quantity);
      }
      // Deduct chicken if chicken item
      if (item.name?.includes('Chicken') || item.selectedModifiers?.some((m: any) => m.optionName?.includes('Chicken'))) {
        const chickenInv = inventoryItems.find(i => i.id === 'inv-chicken-shredded');
        if (chickenInv) chickenInv.currentStock = Math.max(0, Math.round((chickenInv.currentStock - 0.12 * item.quantity) * 10) / 10);
      }
      // Deduct bacon if bacon item
      if (item.name?.includes('Bacon') || item.name?.includes('OG Loaded') || item.selectedModifiers?.some((m: any) => m.optionName?.includes('Bacon'))) {
        const baconInv = inventoryItems.find(i => i.id === 'inv-bacon');
        if (baconInv) baconInv.currentStock = Math.max(0, Math.round((baconInv.currentStock - 0.05 * item.quantity) * 10) / 10);
      }
      // Deduct cheese
      if (item.name?.includes('Cheesy') || item.selectedModifiers?.some((m: any) => m.optionName?.includes('Cheddar'))) {
        const cheeseInv = inventoryItems.find(i => i.id === 'inv-cheddar');
        if (cheeseInv) cheeseInv.currentStock = Math.max(0, Math.round((cheeseInv.currentStock - 0.06 * item.quantity) * 10) / 10);
      }
    });
  }

  // Clear live CFD cart
  activeCfdCart = {
    items: [],
    subtotal: 0,
    tax: 0,
    total: 0,
    orderType: 'takeaway',
    lastCompletedOrderNumber: newOrder.orderNumber,
    customerGreeting: `Thank you! Order #${newOrder.orderNumber}`
  };

  res.status(201).json(newOrder);
});

app.patch('/api/orders/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = orders.find(o => o.id === id);
  if (order) {
    order.status = status;
    if (status === 'ready') {
      order.preparedAt = new Date().toISOString();
    } else if (status === 'completed') {
      order.completedAt = new Date().toISOString();
    }
    res.json({ success: true, order });
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

// Bump station endpoint (Kitchen or Front of House)
app.patch('/api/orders/:id/bump', (req, res) => {
  const { id } = req.params;
  const { station, unbump } = req.body; // 'kitchen' | 'foh'
  const order = orders.find(o => o.id === id);
  
  if (order) {
    if (station === 'kitchen') {
      order.kitchenBumped = !unbump;
      if (!unbump) {
        order.status = 'ready';
        order.preparedAt = new Date().toISOString();
      } else {
        order.status = 'preparing';
        delete order.preparedAt;
      }
    } else if (station === 'foh') {
      order.fohBumped = !unbump;
      if (!unbump) {
        // Front of house performs final handover, completing the order
        order.status = 'completed';
        order.completedAt = new Date().toISOString();
      } else {
        order.status = 'ready';
        delete order.completedAt;
      }
    }

    res.json({ success: true, order });
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

// Order refund endpoint
app.patch('/api/orders/:id/refund', (req, res) => {
  const { id } = req.params;
  const order = orders.find(o => o.id === id);
  if (order) {
    order.paymentStatus = 'refunded';
    order.refundedAt = new Date().toISOString();
    order.status = 'cancelled';
    res.json({ success: true, order });
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

// =========================================================================
// Online Customer App Integration Engine
// =========================================================================
let customerAppConfig = {
  url: process.env.CUSTOMER_APP_URL || "https://ais-dev-wzwlyr5z47t37eijstn6yp-692264068415.europe-west2.run.app",
  lastStatus: 'idle' as 'idle' | 'connected' | 'warning' | 'error',
  lastChecked: null as string | null,
  lastMessage: 'Ready to connect' as string | null
};

// Get current Customer App configuration
app.get('/api/customer-app/config', (req, res) => {
  res.json(customerAppConfig);
});

// Update Customer App URL dynamically (from Admin / Network Hub)
app.post('/api/customer-app/config', (req, res) => {
  const { url } = req.body;
  if (url && typeof url === 'string') {
    customerAppConfig.url = url.trim().replace(/\/+$/, '');
    customerAppConfig.lastStatus = 'idle';
    customerAppConfig.lastMessage = 'Target URL updated';
    res.json({ success: true, config: customerAppConfig });
  } else {
    res.status(400).json({ error: 'Valid URL is required' });
  }
});

// Test Connection endpoint with diagnostics
app.post('/api/customer-app/test', async (req, res) => {
  const targetUrl = (req.body.url || customerAppConfig.url).trim().replace(/\/+$/, '');
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const testRes = await fetch(`${targetUrl}/api/orders`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    const contentType = testRes.headers.get('content-type') || '';
    const text = await testRes.text();

    if (text.includes('__cookie_check.html') || text.includes('_aistudio-iframe') || text.includes('302 Found')) {
      customerAppConfig.lastStatus = 'warning';
      customerAppConfig.lastChecked = new Date().toISOString();
      customerAppConfig.lastMessage = 'Google AI Studio Cookie Gate detected. On AI Studio dev domains, server-to-server HTTP requests require Google session cookies. When you deploy both apps to your server, direct HTTP linking works without restrictions.';
      return res.json({
        ok: false,
        status: 'auth_gate',
        message: customerAppConfig.lastMessage,
        details: 'Self-hosted and production deployments do not have this session cookie requirement.'
      });
    }

    if (testRes.ok) {
      customerAppConfig.lastStatus = 'connected';
      customerAppConfig.lastChecked = new Date().toISOString();
      customerAppConfig.lastMessage = `Connected successfully! Status HTTP ${testRes.status}`;
      return res.json({
        ok: true,
        status: 'connected',
        message: customerAppConfig.lastMessage
      });
    } else {
      customerAppConfig.lastStatus = 'error';
      customerAppConfig.lastChecked = new Date().toISOString();
      customerAppConfig.lastMessage = `Customer app returned HTTP ${testRes.status}`;
      return res.json({
        ok: false,
        status: 'error',
        message: customerAppConfig.lastMessage
      });
    }
  } catch (err: any) {
    customerAppConfig.lastStatus = 'error';
    customerAppConfig.lastChecked = new Date().toISOString();
    customerAppConfig.lastMessage = `Connection failed: ${err.message || 'Host unreachable'}`;
    return res.json({
      ok: false,
      status: 'error',
      message: customerAppConfig.lastMessage
    });
  }
});

// Simulate incoming online order (for verification on KDS & FOH)
app.post('/api/customer-app/simulate-order', (req, res) => {
  const sampleOrder = {
    id: `ord-online-${Date.now()}`,
    orderNumber: nextOrderNumber++,
    timestamp: new Date().toISOString(),
    source: 'online_customer_app',
    type: req.body.type || 'takeaway',
    customerName: req.body.customerName || 'Sarah M. (Online App)',
    customerPhone: '07700 900123',
    customerNotes: 'Please pack gravy in separate pot. Thank you!',
    status: 'pending',
    paymentMethod: 'contactless',
    paymentStatus: 'paid',
    paymentRef: `APP-${Math.floor(100000 + Math.random() * 900000)}`,
    items: [
      {
        cartItemId: `c-sim-${Date.now()}-1`,
        menuItemId: 'item-001',
        name: 'The OG Loaded',
        category: 'Loaded Roast Potatoes',
        variation: { id: 'v-og-l', name: 'Large', sku: 'ROASTUP-003', price: 7.50 },
        selectedModifiers: [
          { setId: 'sauce-choice', setName: 'Sauce', optionId: 'gravy-rich', optionName: 'Rich British Beef Gravy', priceDelta: 0 }
        ],
        unitPrice: 7.50,
        quantity: 1,
        totalPrice: 7.50,
        specialAdditions: ['Extra crispy']
      },
      {
        cartItemId: `c-sim-${Date.now()}-2`,
        menuItemId: 'item-028',
        name: 'Canned Soft Drink',
        category: 'Drinks',
        variation: { id: 'v-can-std', name: 'Standard', sku: 'ROASTUP-048', price: 1.50 },
        selectedModifiers: [
          { setId: 'can-flavour', setName: 'Drink Flavour', optionId: 'can-diet-coke', optionName: 'Diet Coke', priceDelta: 0 }
        ],
        unitPrice: 1.50,
        quantity: 1,
        totalPrice: 1.50
      }
    ],
    subtotal: 7.50,
    tax: 1.50,
    total: 9.00
  };

  orders.unshift(sampleOrder);
  res.status(201).json({ success: true, order: sampleOrder });
});

// Proxy route: Fetch orders from customer app (if customer app acts as orders store)
app.get('/api/customer-app/orders', async (req, res) => {
  try {
    const fetchRes = await fetch(`${customerAppConfig.url}/api/orders`);
    const contentType = fetchRes.headers.get('content-type') || '';
    if (fetchRes.ok && contentType.includes('application/json')) {
      const data = await fetchRes.json();
      return res.json(data);
    }
    return res.json([]);
  } catch (err) {
    return res.json([]);
  }
});

// Proxy route: Forward kitchen bump event to customer app
app.patch('/api/customer-app/orders/:id/bump', async (req, res) => {
  try {
    const fetchRes = await fetch(`${customerAppConfig.url}/api/orders/${req.params.id}/bump`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await fetchRes.json().catch(() => ({}));
    return res.status(fetchRes.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to notify customer app' });
  }
});

// Customer-Facing Display (CFD) live cart synchronization
app.get('/api/orders/current-active', (req, res) => {
  res.json(activeCfdCart);
});

app.post('/api/orders/current-active', (req, res) => {
  activeCfdCart = req.body;
  res.json({ success: true });
});

// Inventory Endpoints
app.get('/api/inventory', (req, res) => {
  res.json(inventoryItems);
});

app.patch('/api/inventory/:id', (req, res) => {
  const { id } = req.params;
  const { currentStock, isOut } = req.body;
  const item = inventoryItems.find(i => i.id === id);
  if (item) {
    if (typeof currentStock === 'number') item.currentStock = Math.max(0, currentStock);
    if (typeof isOut === 'boolean') item.isOut = isOut;
    res.json({ success: true, item });
  } else {
    res.status(404).json({ error: 'Inventory item not found' });
  }
});

app.post('/api/inventory/restock', (req, res) => {
  const { id, amount } = req.body;
  const item = inventoryItems.find(i => i.id === id);
  if (item && typeof amount === 'number') {
    item.currentStock += amount;
    item.isOut = false;
    res.json({ success: true, item });
  } else {
    res.status(400).json({ error: 'Invalid restock parameters' });
  }
});

// Card Payment Processing Endpoint
app.post('/api/payments/process-card', async (req, res) => {
  const { amount, method, cardDetails } = req.body;
  
  // Simulate payment gateway handshake delay (800ms)
  await new Promise(resolve => setTimeout(resolve, 800));

  // If manual card provided and ends with 0000, simulate decline for testing
  if (cardDetails?.number && cardDetails.number.endsWith('0000')) {
    return res.status(402).json({
      success: false,
      message: 'Card declined: Insufficient funds or invalid security code (test card ending 0000)',
      authCode: null
    });
  }

  const authCode = 'AUTH-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  const txnRef = 'ROAST-' + Date.now().toString().slice(-6);

  res.json({
    success: true,
    authCode,
    txnRef,
    amount,
    method: method || 'card_terminal',
    timestamp: new Date().toISOString(),
    cardBrand: cardDetails?.brand || (method === 'contactless' ? 'Contactless Pay' : 'Visa Debit'),
    last4: cardDetails?.number ? cardDetails.number.slice(-4) : (method === 'contactless' ? '9204' : '4242')
  });
});

// =========================================================================
// Roastup Loyalty QR & Customer Rewards Engine
// =========================================================================

interface ServerLoyaltyReward {
  id: string;
  title: string;
  pointsCost: number;
  discountValue: number;
}

interface ServerLoyaltyMember {
  id: string;
  name: string;
  points: number;
  tier: string;
  phone: string;
  email: string;
  availableRewards: ServerLoyaltyReward[];
  history: Array<{ timestamp: string; delta: number; desc: string; type: 'earn' | 'redeem' }>;
}

const DEFAULT_REWARDS: ServerLoyaltyReward[] = [
  { id: 'reward-dip', title: 'Free Signature Pizza Dip (Garlic & Herb / Chilli)', pointsCost: 35, discountValue: 1.25 },
  { id: 'reward-drink', title: 'Free Cold Drink (Can / Water)', pointsCost: 40, discountValue: 1.30 },
  { id: 'reward-garlic-bread', title: 'Free Garlic Bread with Cheese', pointsCost: 75, discountValue: 3.50 },
  { id: 'reward-pizza', title: '50% Off Any 10" or 12" Pizza', pointsCost: 150, discountValue: 6.50 },
  { id: 'reward-free-pizza', title: 'Free Any 12" Stone-Baked Pizza', pointsCost: 240, discountValue: 10.50 }
];

let loyaltyMembers: Record<string, ServerLoyaltyMember> = {
  'PP-88392': {
    id: 'PP-88392',
    name: 'Marco Rossi',
    points: 240,
    tier: 'Gold Crust VIP',
    phone: '07700 900123',
    email: 'marco.r@example.com',
    availableRewards: DEFAULT_REWARDS,
    history: [
      { timestamp: new Date(Date.now() - 86400000 * 3).toISOString(), delta: +60, desc: 'Double Pepperoni & Garlic Bread', type: 'earn' },
      { timestamp: new Date(Date.now() - 86400000 * 7).toISOString(), delta: +80, desc: 'Welcome Loyalty Bonus', type: 'earn' }
    ]
  },
  'RP-88392': {
    id: 'RP-88392',
    name: 'Sarah Miller',
    points: 240,
    tier: 'Gold Crust VIP',
    phone: '07700 900123',
    email: 'sarah.m@example.com',
    availableRewards: DEFAULT_REWARDS,
    history: [
      { timestamp: new Date(Date.now() - 86400000 * 3).toISOString(), delta: +60, desc: 'Pino Special 12" Pizza Deal', type: 'earn' },
      { timestamp: new Date(Date.now() - 86400000 * 7).toISOString(), delta: +80, desc: 'Welcome Loyalty Bonus', type: 'earn' }
    ]
  },
  'PP-44102': {
    id: 'PP-44102',
    name: 'James Wilson',
    points: 110,
    tier: 'Silver Crust',
    phone: '07700 900456',
    email: 'james.w@example.com',
    availableRewards: DEFAULT_REWARDS,
    history: [
      { timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), delta: +110, desc: 'Family Pizza Feast Deal', type: 'earn' }
    ]
  },
  'RP-44102': {
    id: 'RP-44102',
    name: 'James Wilson',
    points: 110,
    tier: 'Silver Crust',
    phone: '07700 900456',
    email: 'james.w@example.com',
    availableRewards: DEFAULT_REWARDS,
    history: [
      { timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), delta: +110, desc: 'Family Pizza Feast Deal', type: 'earn' }
    ]
  },
  'PP-10025': {
    id: 'PP-10025',
    name: 'Elena Rostova',
    points: 380,
    tier: 'Platinum Pizza VIP',
    phone: '07700 900789',
    email: 'elena.r@example.com',
    availableRewards: DEFAULT_REWARDS,
    history: [
      { timestamp: new Date(Date.now() - 86400000 * 1).toISOString(), delta: +90, desc: 'Calzone & Hot Fries', type: 'earn' }
    ]
  },
  'RP-10025': {
    id: 'RP-10025',
    name: 'Elena Rostova',
    points: 380,
    tier: 'Platinum Pizza VIP',
    phone: '07700 900789',
    email: 'elena.r@example.com',
    availableRewards: DEFAULT_REWARDS,
    history: [
      { timestamp: new Date(Date.now() - 86400000 * 1).toISOString(), delta: +90, desc: 'Calzone & Hot Fries', type: 'earn' }
    ]
  }
};

// Helper: Parse Loyalty QR Code string
function parseLoyaltyQrCode(rawCode: string) {
  const code = (rawCode || '').trim();

  // Format 1: Member Identification QR: PINO:MEMBER:<id> or ROASTUP:MEMBER:<id>
  if (code.startsWith('PINO:MEMBER:') || code.startsWith('ROASTUP:MEMBER:')) {
    const memberId = code.replace(/^PINO:MEMBER:|^ROASTUP:MEMBER:/, '').trim();
    return { type: 'member' as const, memberId, raw: code };
  }

  // Format 2: Voucher QR: PINO:VOUCHER:<id>:<rewardId>:<pointsCost>:<title>:<discountValue>
  if (code.startsWith('PINO:VOUCHER:') || code.startsWith('ROASTUP:VOUCHER:')) {
    const parts = code.split(':');
    const memberId = parts[2] || 'PP-88392';
    const rewardId = parts[3] || 'reward-custom';
    const pointsCost = parseFloat(parts[4]) || 0;
    let title = 'Loyalty Reward';
    try {
      title = decodeURIComponent(parts[5] || 'Loyalty Reward');
    } catch {
      title = parts[5] || 'Loyalty Reward';
    }
    const discountValue = parseFloat(parts[6]) || 0;

    return {
      type: 'voucher' as const,
      memberId,
      rewardId,
      pointsCost,
      title,
      discountValue,
      raw: code
    };
  }

  // Loose format fallback: PP-XXXXX or RP-XXXXX or custom code
  if (code.toUpperCase().startsWith('PP-') || code.toUpperCase().startsWith('RP-') || loyaltyMembers[code]) {
    return { type: 'member' as const, memberId: code.toUpperCase(), raw: code };
  }

  // Generic fallback if member exists
  return { type: 'unknown' as const, raw: code };
}

// 1. Scan Loyalty QR endpoint (Lookup or Redeem)
app.post('/api/pos/scan-loyalty', async (req, res) => {
  const { code, action = 'lookup', rewardId, rewardTitle, pointsCost, discountValue, tillId } = req.body;
  if (!code || typeof code !== 'string') {
    return res.status(400).json({ valid: false, error: 'QR code string is required' });
  }

  // First try proxying to Customer App if remote customer app is live
  if (customerAppConfig.url && customerAppConfig.lastStatus === 'connected') {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);
      const remoteRes = await fetch(`${customerAppConfig.url}/api/pos/scan-loyalty`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (remoteRes.ok) {
        const remoteData = await remoteRes.json();
        return res.json(remoteData);
      }
    } catch {
      // Gracefully fall back to internal POS loyalty engine
    }
  }

  const parsed = parseLoyaltyQrCode(code);

  if (parsed.type === 'voucher') {
    // If it's a redeem action
    if (action === 'redeem') {
      const member = loyaltyMembers[parsed.memberId];
      if (member) {
        const cost = typeof pointsCost === 'number' ? pointsCost : parsed.pointsCost;
        member.points = Math.max(0, member.points - cost);
        member.history.unshift({
          timestamp: new Date().toISOString(),
          delta: -cost,
          desc: `Redeemed: ${parsed.title || rewardTitle} on ${tillId || 'Till'}`,
          type: 'redeem'
        });
      }

      return res.json({
        success: true,
        valid: true,
        redeemed: true,
        type: 'voucher',
        memberId: parsed.memberId,
        rewardId: parsed.rewardId,
        rewardTitle: parsed.title,
        pointsCost: parsed.pointsCost,
        discountValue: parsed.discountValue,
        remainingPoints: member ? member.points : 0
      });
    }

    // Voucher lookup
    const member = loyaltyMembers[parsed.memberId] || {
      id: parsed.memberId,
      name: 'Loyalty Member',
      points: 200,
      tier: 'Roastup Member',
      phone: '',
      email: '',
      availableRewards: DEFAULT_REWARDS,
      history: []
    };

    return res.json({
      valid: true,
      type: 'voucher',
      voucher: {
        memberId: parsed.memberId,
        memberName: member.name,
        rewardId: parsed.rewardId,
        pointsCost: parsed.pointsCost,
        title: parsed.title,
        discountValue: parsed.discountValue
      },
      member: {
        id: member.id,
        name: member.name,
        points: member.points,
        tier: member.tier,
        availableRewards: member.availableRewards
      }
    });
  }

  if (parsed.type === 'member') {
    let member = loyaltyMembers[parsed.memberId];
    if (!member) {
      // Auto-register member on first scan
      member = {
        id: parsed.memberId,
        name: `Member ${parsed.memberId}`,
        points: 150,
        tier: 'Gold Member',
        phone: '07700 900000',
        email: 'member@roastup.co.uk',
        availableRewards: DEFAULT_REWARDS,
        history: []
      };
      loyaltyMembers[parsed.memberId] = member;
    }

    // If redeeming an available reward from the member card
    if (action === 'redeem' && rewardId) {
      const reward = member.availableRewards.find(r => r.id === rewardId) || {
        id: rewardId,
        title: rewardTitle || 'Reward',
        pointsCost: pointsCost || 50,
        discountValue: discountValue || 1.25
      };

      member.points = Math.max(0, member.points - reward.pointsCost);
      member.history.unshift({
        timestamp: new Date().toISOString(),
        delta: -reward.pointsCost,
        desc: `Redeemed: ${reward.title}`,
        type: 'redeem'
      });

      return res.json({
        success: true,
        valid: true,
        redeemed: true,
        type: 'member_reward',
        memberId: member.id,
        rewardId: reward.id,
        rewardTitle: reward.title,
        pointsCost: reward.pointsCost,
        discountValue: reward.discountValue,
        remainingPoints: member.points
      });
    }

    return res.json({
      valid: true,
      type: 'member',
      member: {
        id: member.id,
        name: member.name,
        points: member.points,
        tier: member.tier,
        phone: member.phone,
        email: member.email,
        availableRewards: member.availableRewards
      }
    });
  }

  // Not recognized format
  return res.status(404).json({
    valid: false,
    error: 'Unrecognized loyalty barcode or voucher code format. Expected ROASTUP:MEMBER:... or ROASTUP:VOUCHER:...'
  });
});

// 2. Award or update loyalty points on payment completion
app.post('/api/auth/update-loyalty', async (req, res) => {
  const { customerId, pointsDelta = 0, description = 'Purchase Earn', type = 'earn' } = req.body;
  if (!customerId) {
    return res.status(400).json({ error: 'customerId is required' });
  }

  // Proxy to Customer App if reachable
  if (customerAppConfig.url && customerAppConfig.lastStatus === 'connected') {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);
      const remoteRes = await fetch(`${customerAppConfig.url}/api/auth/update-loyalty`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (remoteRes.ok) {
        const remoteData = await remoteRes.json();
        return res.json(remoteData);
      }
    } catch {}
  }

  let member = loyaltyMembers[customerId];
  if (!member) {
    member = {
      id: customerId,
      name: `Member ${customerId}`,
      points: 0,
      tier: 'Roastup Club',
      phone: '',
      email: '',
      availableRewards: DEFAULT_REWARDS,
      history: []
    };
    loyaltyMembers[customerId] = member;
  }

  member.points = Math.max(0, member.points + pointsDelta);
  member.history.unshift({
    timestamp: new Date().toISOString(),
    delta: pointsDelta,
    desc: description,
    type: type === 'redeem' ? 'redeem' : 'earn'
  });

  res.json({
    success: true,
    customerId: member.id,
    newPoints: member.points,
    pointsEarned: pointsDelta > 0 ? pointsDelta : 0,
    member: {
      id: member.id,
      name: member.name,
      points: member.points,
      tier: member.tier
    }
  });
});

// Get member by ID
app.get('/api/loyalty/members/:id', (req, res) => {
  const member = loyaltyMembers[req.params.id];
  if (member) {
    res.json(member);
  } else {
    res.status(404).json({ error: 'Member not found' });
  }
});

// ----------------- VITE & STATIC SERVING ----------------- //

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    const ips = getLocalNetworkIPs();
    console.log(`\n🥔 ROASTUP POS Server running on port ${PORT}`);
    console.log(`Local Access: http://localhost:${PORT}`);
    ips.forEach(ip => {
      console.log(`Network Device Access: http://${ip}:${PORT}`);
    });
    console.log(`Screen modes: ?screen=pos | ?screen=kds | ?screen=signage_menu | ?screen=order_status | ?screen=cfd\n`);
  });
}

startServer();
