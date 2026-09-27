import React, { useState } from 'react';
import { X, Plus, Minus, Check, AlertCircle } from 'lucide-react';
import { MenuItem, MenuVariation, SelectedModifier, CartItem, ModifierOption } from '../../types';
import { getMealDealIncludedItems, isMealDealItem } from '../../utils/mealDeals';

interface CustomOrderModalProps {
  item: MenuItem;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const CustomOrderModal: React.FC<CustomOrderModalProps> = ({
  item,
  onClose,
  onAddToCart
}) => {
  // Default to 12" if available, else first variation
  const initialVariation = item.variations.find(v => v.name.includes('12')) || item.variations[0];
  const [selectedVariation, setSelectedVariation] = useState<MenuVariation>(initialVariation);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedModifiers, setSelectedModifiers] = useState<SelectedModifier[]>([]);
  const [specialRemovals, setSpecialRemovals] = useState<string[]>([]);
  const [specialAdditions, setSpecialAdditions] = useState<string[]>([]);
  const [customNotes, setCustomNotes] = useState<string>('');

  // Extract quick removal options for standard signature recipes
  const commonRemovals = React.useMemo(() => {
    const list: string[] = [];
    const desc = (item.description || '').toLowerCase();
    const name = item.name.toLowerCase();
    
    if (desc.includes('onion') || name.includes('onion')) list.push('No Onions');
    if (desc.includes('mushroom') || name.includes('mushroom')) list.push('No Mushrooms');
    if (desc.includes('cheese') || name.includes('margherita')) list.push('No Cheese');
    if (desc.includes('pepper') || name.includes('pepperoni')) list.push('No Peppers');
    if (desc.includes('pineapple') || name.includes('pineapple')) list.push('No Pineapple');
    if (desc.includes('sweetcorn') || name.includes('sweetcorn')) list.push('No Sweetcorn');
    if (desc.includes('jalapeno') || desc.includes('chilli')) list.push('No Jalapenos');
    if (desc.includes('garlic')) list.push('No Garlic');
    if (desc.includes('bacon')) list.push('No Bacon');
    if (desc.includes('lettuce')) list.push('No Lettuce');
    if (desc.includes('mayo')) list.push('No Mayo');
    if (desc.includes('sauce') || desc.includes('tomato')) list.push('No Base Sauce');
    
    if (list.length === 0) {
      list.push('No Onions', 'No Mushrooms', 'Sauce on the side');
    }
    return Array.from(new Set(list));
  }, [item]);

  const toggleRemoval = (removal: string) => {
    setSpecialRemovals(prev => 
      prev.includes(removal) ? prev.filter(r => r !== removal) : [...prev, removal]
    );
  };

  const toggleAddition = (addition: string) => {
    setSpecialAdditions(prev =>
      prev.includes(addition) ? prev.filter(a => a !== addition) : [...prev, addition]
    );
  };

  const handleModifierToggle = (setId: string, setName: string, opt: ModifierOption, maxSelections: number) => {
    setSelectedModifiers(prev => {
      const isSelected = prev.some(m => m.optionId === opt.id);
      if (isSelected) {
        return prev.filter(m => m.optionId !== opt.id);
      }
      
      // If single choice (maxSelections === 1), replace previous selection in this set
      if (maxSelections === 1) {
        const withoutThisSet = prev.filter(m => m.setId !== setId);
        return [...withoutThisSet, {
          setId,
          setName,
          optionId: opt.id,
          optionName: opt.name,
          priceDelta: opt.priceDelta
        }];
      }

      // If multi-select, check limit
      const currentInSet = prev.filter(m => m.setId === setId);
      if (currentInSet.length >= maxSelections) {
        return prev;
      }

      return [...prev, {
        setId,
        setName,
        optionId: opt.id,
        optionName: opt.name,
        priceDelta: opt.priceDelta
      }];
    });
  };

  // Calculate unit and total prices
  const modifiersCost = selectedModifiers.reduce((sum, m) => sum + m.priceDelta, 0);
  const unitPrice = selectedVariation.price + modifiersCost;
  const totalPrice = unitPrice * quantity;

  const handleSave = () => {
    const mealDealItems = getMealDealIncludedItems(item);
    const cartItem: CartItem = {
      cartItemId: `${item.id}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      menuItemId: item.id,
      name: item.name,
      category: item.category,
      variation: selectedVariation,
      selectedModifiers,
      includedItems: mealDealItems.length > 0 ? mealDealItems : undefined,
      specialRemovals: specialRemovals.length > 0 ? specialRemovals : undefined,
      specialAdditions: specialAdditions.length > 0 ? specialAdditions : undefined,
      customNotes: customNotes.trim() ? customNotes.trim() : undefined,
      unitPrice,
      quantity,
      totalPrice
    };

    onAddToCart(cartItem);
    onClose();
  };

  const mealDealIncluded = getMealDealIncludedItems(item);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200 font-sans">
      <div className="bg-white rounded-3xl w-full max-w-xl max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg bg-red-100 text-red-900 border border-red-200">
                {item.category}
              </span>
              {item.tags?.includes('signature') && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-red-50 text-red-700 border border-red-200">★ Signature</span>
              )}
              {item.tags?.includes('spicy') && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200">🌶️ Spicy</span>
              )}
              {item.tags?.includes('vegetarian') && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">🌱 Veg</span>
              )}
            </div>
            <h2 className="text-xl font-extrabold text-stone-900 mt-1.5">{item.name}</h2>
            <p className="text-xs text-stone-500 mt-0.5 max-w-md">{item.description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-100 text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-6 flex-1 text-sm bg-white">
          {/* Meal Deal Included Items Box */}
          {mealDealIncluded.length > 0 && (
            <div className="p-3.5 rounded-2xl bg-red-50/70 border border-red-200/80 shadow-2xs">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-red-600 text-white">
                  Included in this Meal Deal
                </span>
                <span className="text-xs font-bold text-red-950">
                  {mealDealIncluded.length} items packed fresh
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {mealDealIncluded.map((included, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-stone-800 bg-white/90 px-2.5 py-1.5 rounded-xl border border-red-100">
                    <Check className="w-3.5 h-3.5 text-red-600 shrink-0" />
                    <span className="truncate">{included}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Size / Variation selection */}
          {item.variations.length > 1 && (
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-stone-700 mb-2.5">
                1. Select Size / Portion
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {item.variations.map(v => {
                  const isSelected = selectedVariation.id === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariation(v)}
                      className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                        isSelected 
                          ? 'border-red-600 bg-red-50 text-stone-950 ring-2 ring-red-500' 
                          : 'border-stone-200 bg-stone-50/50 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-bold text-sm">{v.name}</span>
                        {isSelected && <Check className="w-4 h-4 text-red-600" />}
                      </div>
                      <span className="text-xs font-black text-red-700 mt-1">
                        £{v.price.toFixed(2)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Modifier Sets */}
          {item.modifierSets && item.modifierSets.length > 0 && (
            <div className="space-y-5">
              {item.modifierSets.map(modSet => (
                <div key={modSet.id} className="border-t border-stone-100 pt-4">
                  <div className="flex items-center justify-between mb-2.5">
                    <label className="text-xs font-extrabold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                      {modSet.name}
                      {modSet.required && <span className="text-rose-500">*</span>}
                    </label>
                    <span className="text-[11px] text-stone-500 font-medium">
                      {modSet.maxSelections === 1 ? 'Choose 1' : `Up to ${modSet.maxSelections}`}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {modSet.options.map(opt => {
                      const isSelected = selectedModifiers.some(m => m.optionId === opt.id);
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleModifierToggle(modSet.id, modSet.name, opt, modSet.maxSelections)}
                          className={`px-3 py-2.5 rounded-xl border text-left flex items-center justify-between transition-all text-xs font-semibold cursor-pointer ${
                            isSelected
                              ? 'border-red-600 bg-red-50 text-stone-950 ring-1 ring-red-500'
                              : 'border-stone-200 bg-stone-50/50 text-stone-700 hover:bg-stone-100'
                          }`}
                        >
                          <span>{opt.name}</span>
                          <span className={opt.priceDelta > 0 ? 'text-red-700 font-bold ml-2 shrink-0' : 'text-stone-400 ml-2 shrink-0'}>
                            {opt.priceDelta > 0 ? `+£${opt.priceDelta.toFixed(2)}` : 'Included'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Kitchen Adjustments (Removals / Kitchen Notes) */}
          <div className="border-t border-stone-100 pt-4">
            <label className="block text-xs font-extrabold uppercase tracking-wider text-stone-700 mb-2.5">
              Kitchen Preparation Adjustments
            </label>
            <div className="flex flex-wrap gap-2">
              {commonRemovals.map(removal => {
                const isRemoved = specialRemovals.includes(removal);
                return (
                  <button
                    key={removal}
                    type="button"
                    onClick={() => toggleRemoval(removal)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                      isRemoved
                        ? 'bg-rose-50 text-rose-700 border-rose-300 line-through font-bold'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {removal}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => toggleAddition('Well Done / Crispy Crust')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                  specialAdditions.includes('Well Done / Crispy Crust')
                    ? 'bg-red-100 text-red-950 border-red-400 font-bold'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                + Well Done / Crispy Crust
              </button>

              <button
                type="button"
                onClick={() => toggleAddition('Cut into 8 Slices')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                  specialAdditions.includes('Cut into 8 Slices')
                    ? 'bg-red-100 text-red-950 border-red-400 font-bold'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                + Cut into 8 Slices
              </button>

              <button
                type="button"
                onClick={() => toggleAddition('Sauce in Pot on Side')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                  specialAdditions.includes('Sauce in Pot on Side')
                    ? 'bg-red-100 text-red-950 border-red-400 font-bold'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                + Sauce On Side
              </button>
            </div>
          </div>

          {/* Allergen & Kitchen Instructions */}
          <div className="border-t border-stone-100 pt-4">
            <label className="block text-xs font-extrabold uppercase tracking-wider text-stone-700 mb-1.5 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-red-600" />
              Special Instructions / Allergy Warnings for Kitchen
            </label>
            <input
              type="text"
              value={customNotes}
              onChange={e => setCustomNotes(e.target.value)}
              placeholder="e.g. Extra crispy base, well done crust, slice into 8 pieces, allergy alert..."
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-hidden focus:border-red-500 focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Footer with Quantity Counter and Add to Order Button */}
        <div className="p-4 sm:p-5 border-t border-stone-100 bg-stone-50/50 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-2xl p-1 shadow-2xs">
            <button
              type="button"
              disabled={quantity <= 1}
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="p-2 rounded-xl text-stone-500 hover:bg-stone-100 disabled:opacity-30 transition-colors cursor-pointer"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-extrabold text-stone-900 text-sm">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(q => q + 1)}
              className="p-2 rounded-xl text-stone-500 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            id="modal-add-to-order-btn"
            type="button"
            onClick={handleSave}
            className="flex-1 py-3.5 px-5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-sm shadow-xs transition-all flex items-center justify-between cursor-pointer"
          >
            <span>Add to Order</span>
            <span>£{totalPrice.toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
