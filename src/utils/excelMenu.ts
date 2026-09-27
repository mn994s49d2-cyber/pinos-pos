import * as XLSX from 'xlsx';
import { MenuItem, MenuVariation } from '../types';
import { INITIAL_MENU_ITEMS, STANDARD_PIZZA_MODIFIERS, BYO_PIZZA_MODIFIERS } from '../data/defaultMenu';

export interface RawMenuRow {
  'Item Name'?: string;
  'Variation Name'?: string;
  Description?: string;
  SKU?: string;
  Price?: number | string;
  Category?: string;
  'Item Type'?: string;
  'Modifier Sets'?: string;
  [key: string]: any;
}

export function parseMenuSpreadsheet(data: ArrayBuffer | Uint8Array): MenuItem[] {
  const workbook = XLSX.read(data, { type: 'array' });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const rows: RawMenuRow[] = XLSX.utils.sheet_to_json(worksheet);

  const itemsMap = new Map<string, MenuItem>();

  rows.forEach((row, index) => {
    const itemName = String(row['Item Name'] || row['Name'] || row['item_name'] || '').trim();
    if (!itemName) return;

    const variationName = String(row['Variation Name'] || row['Size'] || row['Size/Variant'] || row['variation'] || 'Standard').trim();
    const desc = String(row['Description'] || row['desc'] || '').trim();
    const sku = String(row['SKU'] || `PINO-${index + 1}`).trim();
    const rawPrice = row['Price'] ?? row['price'] ?? 0;
    const price = typeof rawPrice === 'number' ? rawPrice : parseFloat(String(rawPrice).replace(/[^0-9.]/g, '')) || 0;
    const rawCategory = String(row['Category'] || row['category'] || 'Pizzas').trim();
    const itemType = String(row['Item Type'] || 'Prepared food and beverage').trim();

    const variation: MenuVariation = {
      id: `v-${itemName.toLowerCase().replace(/\s+/g, '-')}-${variationName.toLowerCase()}`,
      name: variationName,
      sku,
      price
    };

    if (itemsMap.has(itemName)) {
      const existing = itemsMap.get(itemName)!;
      if (!existing.variations.some(v => v.name === variation.name)) {
        existing.variations.push(variation);
      }
      if (!existing.description && desc) existing.description = desc;
    } else {
      let modifierSets = undefined;
      if (itemName.toLowerCase().includes('build your own') || itemName.toLowerCase().includes('make your own')) {
        modifierSets = BYO_PIZZA_MODIFIERS;
      } else if (rawCategory.toLowerCase().includes('pizza')) {
        modifierSets = STANDARD_PIZZA_MODIFIERS;
      }

      const newItem: MenuItem = {
        id: `item-${itemName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        name: itemName,
        category: rawCategory || 'Pizzas',
        description: desc,
        itemType,
        variations: [variation],
        defaultPrice: price,
        inStock: true,
        modifierSets,
        tags: itemName.toLowerCase().includes('special') || itemName.toLowerCase().includes('margherita') || itemName.toLowerCase().includes('pepperoni') 
          ? ['popular', 'signature'] 
          : itemName.toLowerCase().includes('hot') || itemName.toLowerCase().includes('spicy') || itemName.toLowerCase().includes('chilli')
            ? ['spicy'] 
            : itemName.toLowerCase().includes('veggie') || itemName.toLowerCase().includes('vegetarian') || itemName.toLowerCase().includes('cheese')
              ? ['vegetarian']
              : []
      };

      itemsMap.set(itemName, newItem);
    }
  });

  const parsedItems = Array.from(itemsMap.values());
  return parsedItems.length > 0 ? parsedItems : INITIAL_MENU_ITEMS;
}

export function exportMenuToExcel(items: MenuItem[], format: 'xlsx' | 'csv' = 'xlsx') {
  const rows: RawMenuRow[] = [];

  items.forEach(item => {
    if (item.variations && item.variations.length > 0) {
      item.variations.forEach(v => {
        rows.push({
          'Item Name': item.name,
          'Variation Name': v.name,
          Description: item.description,
          SKU: v.sku,
          Price: v.price.toFixed(2),
          Category: item.category,
          'Item Type': item.itemType,
          'Modifier Sets': item.modifierSets ? item.modifierSets.map(m => m.name).join('; ') : ''
        });
      });
    } else {
      rows.push({
        'Item Name': item.name,
        'Variation Name': 'Standard',
        Description: item.description,
        SKU: `PINO-${item.id}`,
        Price: item.defaultPrice.toFixed(2),
        Category: item.category,
        'Item Type': item.itemType,
        'Modifier Sets': ''
      });
    }
  });

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Pizza_Pino_Menu');

  if (format === 'csv') {
    const csvData = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    downloadBlob(blob, 'pizza_pino_menu.csv');
  } else {
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    downloadBlob(blob, 'pizza_pino_menu.xlsx');
  }
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
