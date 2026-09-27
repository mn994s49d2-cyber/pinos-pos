import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Maximize, 
  Minimize, 
  ArrowLeft,
  Tv,
  Plus,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Package,
  Check,
  Flame,
  LayoutGrid
} from 'lucide-react';
import { MenuItem, AppCustomizationSettings, DigitalLayoutMode } from '../../types';
import { DEFAULT_CUSTOMIZATION_SETTINGS } from '../../data/customizationSettings';
import { PizzaPinoLogo, PizzaPinoIcon } from '../brand/RoastupBrand';
import { getMealDealIncludedItems, isMealDealItem } from '../../utils/mealDeals';

interface DigitalSignageMenuProps {
  menuItems: MenuItem[];
  customization?: AppCustomizationSettings;
  onOpenStudio?: () => void;
  standaloneTvMode?: boolean;
  initialChannel?: number;
  onExit?: () => void;
}

export const DigitalSignageMenu: React.FC<DigitalSignageMenuProps> = ({ 
  menuItems, 
  customization = DEFAULT_CUSTOMIZATION_SETTINGS,
  initialChannel = 0,
  onExit
}) => {
  // Dynamically resolve all existing categories from menu items in order
  const derivedCategories = React.useMemo(() => {
    const set = new Set<string>();
    menuItems.forEach(i => {
      if (i.category) set.add(i.category);
    });
    const itemCats = Array.from(set);
    
    // Sort according to preferred pizza house order
    const preferredOrder = [
      'Pizzas',
      'Garlic Bread',
      'Calzones',
      'Burgers',
      'Wraps',
      'Meal Deals',
      'Sides',
      'Desserts',
      'Drinks'
    ];

    const ordered: string[] = [];
    preferredOrder.forEach(p => {
      const match = itemCats.find(c => c.toLowerCase() === p.toLowerCase());
      if (match && !ordered.includes(match)) ordered.push(match);
    });
    // Add any remaining categories
    itemCats.forEach(c => {
      if (!ordered.includes(c)) ordered.push(c);
    });

    return ordered.length > 0 ? ordered : ['Pizzas', 'Garlic Bread', 'Calzones', 'Burgers', 'Wraps', 'Meal Deals', 'Sides', 'Desserts', 'Drinks'];
  }, [menuItems]);

  const allCategories = derivedCategories;

  // Multi-Screen Channel Setup for Pizza Pino:
  // 0: All categories (auto-cycle every N seconds)
  // 1: Stone-Baked Pizzas & Calzones
  // 2: Burgers, Garlic Bread & Wraps
  // 3: Meal Deals, Sides, Desserts & Drinks
  const [channels, setChannels] = useState<Array<{ id: number; name: string; categories: string[] }>>(() => [
    { id: 0, name: 'All (Carousel)', categories: allCategories },
    { 
      id: 1, 
      name: 'Screen 1 (Pizzas & Calzones)', 
      categories: allCategories.filter(c => {
        const lc = c.toLowerCase();
        return lc.includes('pizza') || lc.includes('calzone');
      })
    },
    { 
      id: 2, 
      name: 'Screen 2 (Burgers & Garlic Bread)', 
      categories: allCategories.filter(c => {
        const lc = c.toLowerCase();
        return lc.includes('burger') || lc.includes('garlic') || lc.includes('wrap');
      })
    },
    { 
      id: 3, 
      name: 'Screen 3 (Deals, Sides & Drinks)', 
      categories: allCategories.filter(c => {
        const lc = c.toLowerCase();
        return lc.includes('deal') || lc.includes('side') || lc.includes('dessert') || lc.includes('drink') || lc.includes('sauce') || lc.includes('dip');
      })
    }
  ]);

  // Keep channels synced if categories change
  useEffect(() => {
    setChannels([
      { id: 0, name: 'All (Carousel)', categories: allCategories },
      { 
        id: 1, 
        name: 'Screen 1 (Pizzas & Calzones)', 
        categories: allCategories.filter(c => c.toLowerCase().includes('pizza') || c.toLowerCase().includes('calzone'))
      },
      { 
        id: 2, 
        name: 'Screen 2 (Burgers & Garlic Bread)', 
        categories: allCategories.filter(c => c.toLowerCase().includes('burger') || c.toLowerCase().includes('garlic') || c.toLowerCase().includes('wrap'))
      },
      { 
        id: 3, 
        name: 'Screen 3 (Deals, Sides & Drinks)', 
        categories: allCategories.filter(c => c.toLowerCase().includes('deal') || c.toLowerCase().includes('side') || c.toLowerCase().includes('dessert') || c.toLowerCase().includes('drink') || c.toLowerCase().includes('sauce') || c.toLowerCase().includes('dip'))
      }
    ]);
  }, [allCategories]);

  const [selectedChannelId, setSelectedChannelId] = useState<number>(initialChannel || 0);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);
  const [isAutoCyclePaused, setIsAutoCyclePaused] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [cycleProgress, setCycleProgress] = useState<number>(0);

  // Active Channel categories
  const activeChannel = channels.find(c => c.id === selectedChannelId) || channels[0];
  const channelCategories = activeChannel.categories.length > 0 ? activeChannel.categories : allCategories;

  // Auto-hide floating controls after 3.5 seconds of mouse inactivity
  useEffect(() => {
    let timeout: any;
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setShowControls(false), 3500);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  const cycleSeconds = customization.digitalSignage.cycleInterval || 10;
  const cycleMs = cycleSeconds * 1000;
  const shouldAutoCycle = !isAutoCyclePaused && channelCategories.length > 1;

  // Auto-cycle through categories with animated progress bar
  const [tvScale, setTvScale] = useState<'auto' | 'standard' | 'large' | 'xl'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pizzapino_tv_scale');
      if (saved === 'auto' || saved === 'standard' || saved === 'large' || saved === 'xl') return saved;
    }
    return 'auto';
  });

  // Spacious Density & Items Per Page state (prevents squishing and crowding)
  const [density, setDensity] = useState<'spacious' | 'balanced' | 'compact'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pizzapino_tv_density');
      if (saved === 'spacious' || saved === 'balanced' || saved === 'compact') return saved;
    }
    return customization.digitalSignage.density || 'spacious';
  });

  const [itemsPerPage, setItemsPerPage] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pizzapino_tv_items_per_page');
      if (saved !== null) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed)) return parsed;
      }
    }
    return customization.digitalSignage.itemsPerPage ?? 6;
  });

  const [currentPage, setCurrentPage] = useState<number>(0);

  const handleSetDensity = (newDensity: 'spacious' | 'balanced' | 'compact') => {
    setDensity(newDensity);
    const newCount = newDensity === 'spacious' ? 6 : newDensity === 'balanced' ? 8 : 10;
    setItemsPerPage(newCount);
    setCurrentPage(0);
    setCycleProgress(0);
    if (typeof window !== 'undefined') {
      localStorage.setItem('pizzapino_tv_density', newDensity);
      localStorage.setItem('pizzapino_tv_items_per_page', newCount.toString());
    }
  };

  const handleSetItemsPerPage = (count: number) => {
    setItemsPerPage(count);
    setCurrentPage(0);
    setCycleProgress(0);
    if (typeof window !== 'undefined') {
      localStorage.setItem('pizzapino_tv_items_per_page', count.toString());
    }
  };

  // Current category & items
  const safeIndex = activeCategoryIndex % channelCategories.length;
  const currentCategory = channelCategories[safeIndex] || channelCategories[0] || 'Pizzas';
  const itemsInCurrentCategory = menuItems.filter(i => i.category === currentCategory);

  // Calculate total pages for current category
  const totalPages = itemsPerPage > 0 
    ? Math.max(1, Math.ceil(itemsInCurrentCategory.length / itemsPerPage))
    : 1;
  const safePage = Math.min(currentPage, totalPages - 1);
  const displayedItems = itemsPerPage > 0 
    ? itemsInCurrentCategory.slice(safePage * itemsPerPage, (safePage + 1) * itemsPerPage)
    : itemsInCurrentCategory;

  // Auto-cycle through pages first, then categories with animated progress bar
  useEffect(() => {
    if (!shouldAutoCycle) {
      setCycleProgress(0);
      return;
    }

    const stepMs = 100;
    const increment = (stepMs / cycleMs) * 100;

    const interval = setInterval(() => {
      setCycleProgress(prev => {
        if (prev >= 100) {
          setCurrentPage(currPage => {
            const numPages = itemsPerPage > 0 
              ? Math.max(1, Math.ceil(itemsInCurrentCategory.length / itemsPerPage)) 
              : 1;
            
            if (currPage + 1 < numPages) {
              // Advance to next page of current category
              return currPage + 1;
            } else {
              // Pages in category completed, advance to next category
              setActiveCategoryIndex(idx => (idx + 1) % channelCategories.length);
              return 0;
            }
          });
          return 0;
        }
        return prev + increment;
      });
    }, stepMs);

    return () => clearInterval(interval);
  }, [shouldAutoCycle, channelCategories.length, cycleMs, itemsPerPage, itemsInCurrentCategory.length]);

  const handleSetTvScale = (scale: 'auto' | 'standard' | 'large' | 'xl') => {
    setTvScale(scale);
    if (typeof window !== 'undefined') {
      localStorage.setItem('pizzapino_tv_scale', scale);
    }
  };

  const getItemNameClass = () => {
    switch (tvScale) {
      case 'standard': return 'text-sm sm:text-base font-black text-stone-900 dark:text-white truncate';
      case 'large': return 'text-base sm:text-lg lg:text-xl font-black text-stone-900 dark:text-white truncate';
      case 'xl': return 'text-lg sm:text-xl lg:text-2xl font-black text-stone-900 dark:text-white truncate';
      default: // auto
        return density === 'spacious'
          ? 'text-base sm:text-lg lg:text-xl xl:text-2xl font-black text-stone-900 dark:text-white truncate'
          : 'text-[clamp(0.95rem,1.15vw+0.2rem,1.55rem)] font-black text-stone-900 dark:text-white truncate';
    }
  };

  const getItemDescClass = () => {
    switch (tvScale) {
      case 'standard': return 'text-[11px] sm:text-xs text-stone-500 dark:text-stone-400 line-clamp-2 mt-0.5 leading-snug';
      case 'large': return 'text-xs sm:text-sm text-stone-500 dark:text-stone-400 line-clamp-2 mt-0.5 leading-snug';
      case 'xl': return 'text-sm sm:text-base text-stone-500 dark:text-stone-400 line-clamp-2 mt-0.5 leading-snug';
      default: // auto
        return 'text-xs sm:text-sm text-stone-500 dark:text-stone-400 line-clamp-2 mt-0.5 leading-relaxed';
    }
  };

  const getImageSizeClass = () => {
    switch (tvScale) {
      case 'standard': return 'w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 rounded-2xl object-cover border border-stone-200 dark:border-stone-700 shrink-0';
      case 'large': return 'w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-2xl object-cover border border-stone-200 dark:border-stone-700 shrink-0';
      case 'xl': return 'w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-2xl object-cover border border-stone-200 dark:border-stone-700 shrink-0';
      default: // auto
        return density === 'spacious'
          ? 'w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-2xl object-cover border border-stone-200 dark:border-stone-700 shrink-0'
          : 'w-[clamp(3.2rem,4.5vw,5rem)] h-[clamp(3.2rem,4.5vw,5rem)] rounded-xl object-cover border border-stone-200 dark:border-stone-700 shrink-0';
    }
  };

  const {
    layoutMode = 'grid-2col',
    showImages = true,
    showDescriptions = true,
    showVariations = true,
    showDietaryBadges = true,
    showDealBanner = false,
    tickerText = '🍕 PIZZA PINO • AUTHENTIC STONE-BAKED PIZZAS • 100% MOZZARELLA & FRESH HAND-STRETCHED DOUGH DAILY • 🔥 SIZZLER BURGERS & BOX MEALS • ⚡ CARD, APPLE PAY & CASH ACCEPTED',
    tickerSpeed = 'normal',
    mealDealTitle = 'Mums Night Off Deal',
    mealDealPrice = 'ONLY £20.00',
    mealDealDesc = 'Any 2 x 12-inch Pizzas from our menu + 1 x Large Hot Crispy Chips.'
  } = customization.digitalSignage;

  const isSpotlightLayout = layoutMode === 'spotlight';
  const featuredItem = menuItems.find(i => i.id === customization.digitalSignage.featuredItemId) || menuItems[0];

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleSelectCategory = (catName: string) => {
    const idx = channelCategories.indexOf(catName);
    if (idx !== -1) {
      setActiveCategoryIndex(idx);
      setCurrentPage(0);
      setCycleProgress(0);
    }
  };

  const handlePrevCategory = () => {
    setActiveCategoryIndex(prev => (prev - 1 + channelCategories.length) % channelCategories.length);
    setCurrentPage(0);
    setCycleProgress(0);
  };

  const handleNextCategory = () => {
    setActiveCategoryIndex(prev => (prev + 1) % channelCategories.length);
    setCurrentPage(0);
    setCycleProgress(0);
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => (prev - 1 + totalPages) % totalPages);
    setCycleProgress(0);
  };

  const handleNextPage = () => {
    setCurrentPage(prev => (prev + 1) % totalPages);
    setCycleProgress(0);
  };

  const handleAddCustomScreen = () => {
    const nextId = channels.length;
    const name = `Screen ${nextId} (Custom)`;
    const newChan = { id: nextId, name, categories: allCategories };
    setChannels(prev => [...prev, newChan]);
    setSelectedChannelId(nextId);
  };

  return (
    <div className="h-screen max-h-screen w-screen flex flex-col bg-[#FBFBFA] dark:bg-stone-950 text-stone-900 dark:text-stone-100 overflow-hidden select-none font-sans relative">
      {/* PURE COMMERCIAL DIGITAL SIGNAGE BOARD */}
      <div className="flex-1 min-h-0 flex flex-col justify-between overflow-hidden p-3.5 sm:p-4 lg:p-5">
        
        {/* Brand Header Bar & Category Navigation */}
        <div className="border-b-2 border-red-600 dark:border-red-600 pb-2.5 mb-2.5 shrink-0">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* Logo and Brand Tagline */}
            <div className="flex items-center gap-3">
              <PizzaPinoIcon size="md" className="ring-2 ring-red-500/60 shadow-xs shrink-0" />
              <div>
                <div className="flex items-center gap-2">
                  <PizzaPinoLogo size="sm" />
                  <span className="text-[10px] px-2.5 py-0.5 rounded-md bg-red-600 text-white font-black tracking-widest uppercase shadow-2xs">
                    {selectedChannelId > 0 ? activeChannel.name : 'Master Menu Board'}
                  </span>
                  {totalPages > 1 && (
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-stone-900 text-white dark:bg-white dark:text-stone-900 font-mono shadow-2xs">
                      Page {safePage + 1} of {totalPages}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 font-extrabold uppercase tracking-widest mt-0.5">
                  Fresh Artisan Dough • Stone-Baked in 400°C Oven • 100% Mozzarella
                </p>
              </div>
            </div>

            {/* Interactive Category Selector & Page Controller */}
            <div className="flex items-center gap-2">
              {/* Category Pills Bar */}
              <div className="flex items-center gap-1.5 overflow-x-auto max-w-xl py-1 px-1.5 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 scrollbar-none">
                {channelCategories.map(cat => {
                  const isActive = cat === currentCategory;
                  return (
                    <button
                      key={cat}
                      onClick={() => handleSelectCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap uppercase tracking-wider ${
                        isActive 
                          ? 'bg-red-600 text-white shadow-xs scale-[1.02]' 
                          : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200/60 dark:hover:bg-stone-800'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Page Dots (If category has multiple pages) */}
              {totalPages > 1 && (
                <div className="hidden sm:flex items-center gap-1 px-2 py-1.5 bg-stone-100 dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800">
                  {Array.from({ length: totalPages }).map((_, pIdx) => (
                    <button
                      key={pIdx}
                      onClick={() => { setCurrentPage(pIdx); setCycleProgress(0); }}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        pIdx === safePage 
                          ? 'w-5 bg-red-600' 
                          : 'w-2 bg-stone-300 dark:bg-stone-700 hover:bg-stone-400'
                      }`}
                      title={`Page ${pIdx + 1} of ${totalPages}`}
                    />
                  ))}
                </div>
              )}

              {/* Cycle Controls (Play / Pause & Nav Arrows) */}
              <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-900 p-1 rounded-2xl border border-stone-200 dark:border-stone-800 shrink-0">
                <button
                  onClick={totalPages > 1 ? handlePrevPage : handlePrevCategory}
                  className="p-1.5 rounded-xl text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer"
                  title={totalPages > 1 ? 'Previous Page' : 'Previous Category'}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsAutoCyclePaused(!isAutoCyclePaused)}
                  className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                    isAutoCyclePaused 
                      ? 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300' 
                      : 'bg-red-600 text-white shadow-2xs'
                  }`}
                  title={isAutoCyclePaused ? 'Resume Auto-Cycle' : 'Pause on this Screen'}
                >
                  {isAutoCyclePaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4 fill-current" />}
                </button>
                <button
                  onClick={totalPages > 1 ? handleNextPage : handleNextCategory}
                  className="p-1.5 rounded-xl text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer"
                  title={totalPages > 1 ? 'Next Page' : 'Next Category'}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Rotation Progress Line (When auto-cycling) */}
          {shouldAutoCycle && (
            <div className="w-full bg-stone-200/60 dark:bg-stone-800/60 h-1 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-red-600 h-full transition-all duration-100 ease-linear rounded-full"
                style={{ width: `${cycleProgress}%` }}
              />
            </div>
          )}
        </div>

        {/* Dynamic Items Content Area */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 overflow-hidden items-stretch">
          {/* Main Items Catalog */}
          <div className={`${isSpotlightLayout && featuredItem ? 'lg:col-span-8' : 'lg:col-span-12'} flex flex-col justify-between overflow-hidden min-h-0`}>
            <div className={`grid gap-3 sm:gap-4 flex-1 min-h-0 ${
              itemsPerPage === 0 ? 'overflow-y-auto pr-1' : 'overflow-hidden'
            } ${
              layoutMode === 'grid-3col'
                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1 md:grid-cols-2'
            }`}>
              {displayedItems.length === 0 ? (
                <div className="col-span-full h-full flex flex-col items-center justify-center text-center p-8 text-stone-400">
                  <PizzaPinoIcon size="lg" className="opacity-30 mb-2" />
                  <p className="font-bold text-base text-stone-700 dark:text-stone-300">Category Updating...</p>
                  <p className="text-xs text-stone-500">Authentic recipes baking straight from the deck oven</p>
                </div>
              ) : (
                displayedItems.map(item => {
                  const isSoldOut = item.inStock === false;
                  const dealItems = isMealDealItem(item) ? getMealDealIncludedItems(item) : [];
                  const hasVariations = item.variations && item.variations.length > 1;

                  return (
                    <div 
                      key={item.id}
                      className={`rounded-2xl sm:rounded-3xl border transition-all flex flex-col justify-between shadow-2xs relative overflow-hidden ${
                        density === 'spacious' ? 'p-3.5 sm:p-4.5' : 'p-3 sm:p-3.5'
                      } ${
                        isSoldOut 
                          ? 'bg-stone-100/70 dark:bg-stone-900/60 border-dashed border-stone-300 dark:border-stone-800 opacity-55 grayscale select-none' 
                          : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-red-300 dark:hover:border-red-900'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          {showImages && item.imageUrl && (
                            <div className="relative shrink-0">
                              <img 
                                src={item.imageUrl} 
                                alt={item.name}
                                className={getImageSizeClass()}
                                referrerPolicy="no-referrer"
                              />
                              {isSoldOut && (
                                <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center">
                                  <span className="text-[9px] font-black uppercase text-red-300 px-1 py-0.5 rounded bg-black/90">
                                    Sold Out
                                  </span>
                                </div>
                              )}
                            </div>
                          )}

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className={getItemNameClass()}>
                                {item.name}
                              </h4>
                              {isSoldOut ? (
                                <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md bg-stone-800 text-red-400 dark:bg-red-950 dark:text-red-300 shrink-0">
                                  Sold Out
                                </span>
                              ) : (
                                showDietaryBadges && item.tags?.includes('signature') && (
                                  <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-red-600 text-white shrink-0 shadow-2xs">
                                    ★ Special
                                  </span>
                                )
                              )}
                            </div>

                            {showDescriptions && item.description && (
                              <p className={getItemDescClass()}>
                                {item.description}
                              </p>
                            )}

                            {/* Meal Deal Included Items Highlight on Card */}
                            {dealItems.length > 0 && (
                              <div className="mt-2 p-1.5 sm:p-2 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200/70 dark:border-red-900/60">
                                <span className="text-[9px] font-extrabold uppercase tracking-wider text-red-700 dark:text-red-300 flex items-center gap-1 mb-1">
                                  <Package className="w-3 h-3" />
                                  Includes:
                                </span>
                                <div className="flex flex-wrap gap-1">
                                  {dealItems.map((inc, i) => (
                                    <span key={i} className="text-[9.5px] bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 border border-red-100 dark:border-red-900/40 px-1.5 py-0.5 rounded font-bold shadow-2xs">
                                      ✓ {inc}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Single-Price Display (if not multiple variations) */}
                        {!hasVariations && (
                          <div className="text-right shrink-0 pl-2">
                            <span className="text-lg sm:text-xl font-black font-mono text-stone-900 dark:text-white">
                              £{(item.defaultPrice ?? item.variations?.[0]?.price ?? 0).toFixed(2)}
                            </span>
                            {isSoldOut && (
                              <span className="text-[9px] font-bold text-rose-500 uppercase tracking-wider block">
                                Unavailable
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Multi-Variation Size & Price Matrix (10", 12", 14", etc.) */}
                      {hasVariations && (
                        <div className="mt-2.5 pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-2 flex-wrap">
                          <span className="text-[10px] font-bold uppercase text-stone-400 tracking-wider">
                            Sizes &amp; Prices:
                          </span>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {item.variations.map(v => (
                              <div 
                                key={v.id} 
                                className="px-2 py-0.5 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center gap-1.5 text-xs font-mono font-bold"
                              >
                                <span className="text-[10px] font-sans font-extrabold uppercase text-stone-500 dark:text-stone-400">
                                  {v.name}
                                </span>
                                <span className="font-black text-red-600 dark:text-red-400">
                                  £{v.price.toFixed(2)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Signature Meal Deal Footer Banner (Only when enabled or on Deals screen) */}
            {mealDealTitle && (showDealBanner || currentCategory === 'Meal Deals' || selectedChannelId === 3) && (
              <div className="mt-2.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-red-600 via-red-600 to-rose-700 text-white flex items-center justify-between shadow-md shrink-0 border border-red-500">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/20 text-white flex items-center justify-center font-black shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-wider block text-red-100">
                      Signature Pizza Pino Deal
                    </span>
                    <h3 className="text-xs sm:text-sm font-black tracking-tight">{mealDealTitle}</h3>
                    <p className="text-[11px] text-red-100 font-medium line-clamp-1">{mealDealDesc}</p>
                  </div>
                </div>
                <div className="text-right pl-3 shrink-0">
                  <span className="text-lg sm:text-xl font-black font-mono">{mealDealPrice}</span>
                </div>
              </div>
            )}
          </div>

          {/* Spotlight Hero Dish (When Spotlight layout is active) */}
          {isSpotlightLayout && featuredItem && (
            <div className="hidden lg:flex lg:col-span-4 flex-col rounded-3xl bg-stone-900 text-white p-5 justify-between overflow-hidden shadow-xl border border-stone-800 shrink-0">
              <div>
                <span className="text-[9px] font-black uppercase tracking-widest text-red-400 bg-red-500/20 px-2.5 py-0.5 rounded-full border border-red-500/30">
                  Chef's Highlight
                </span>
                <h3 className="text-xl font-black tracking-tight mt-2 text-white">
                  {featuredItem.name}
                </h3>
                <p className="text-xs text-stone-400 mt-1 line-clamp-3">
                  {featuredItem.description}
                </p>
              </div>

              {featuredItem.imageUrl && (
                <div className="my-3 rounded-2xl overflow-hidden border border-stone-800 shadow-md h-40">
                  <img 
                    src={featuredItem.imageUrl} 
                    alt={featuredItem.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              <div className="flex items-center justify-between border-t border-stone-800 pt-3">
                <span className="text-xs font-bold text-stone-400">Portion from</span>
                <span className="text-2xl font-black text-red-500 font-mono">
                  £{(featuredItem.defaultPrice || 0).toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Crawl Marquee Ticker */}
        {tickerText && tickerSpeed !== 'off' && (
          <div className="mt-2.5 bg-stone-900 text-white py-1.5 px-4 rounded-xl overflow-hidden shrink-0 border border-stone-800">
            <div className="whitespace-nowrap flex items-center font-bold text-xs uppercase tracking-wider animate-marquee">
              <span className="mr-8 text-red-400">🍕 {tickerText}</span>
              <span className="mr-8 text-red-400">🍕 {tickerText}</span>
            </div>
          </div>
        )}
      </div>

      {/* DISCREET FLOATING CONTROL BAR (Auto-hides on inactivity; reveals on mouse move) */}
      <div className={`fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-stone-900/95 dark:bg-stone-800/95 backdrop-blur-md p-1.5 rounded-2xl shadow-2xl border border-stone-700 transition-all duration-300 ${
        showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        {onExit && (
          <button
            onClick={onExit}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
            title="Exit Menu Board & Back to POS"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>POS</span>
          </button>
        )}

        {/* Multi-screen channel switchers */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl">
          {channels.map(ch => (
            <button
              key={ch.id}
              onClick={() => {
                setSelectedChannelId(ch.id);
                setActiveCategoryIndex(0);
                setCurrentPage(0);
                setCycleProgress(0);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                selectedChannelId === ch.id
                  ? 'bg-red-600 text-white font-black shadow-xs'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              {ch.name}
            </button>
          ))}

          <button
            onClick={handleAddCustomScreen}
            className="p-1 rounded-lg text-stone-400 hover:text-red-400 transition-colors cursor-pointer"
            title="Add another screen channel"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Spacing / Density Adjuster */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl">
          <span className="text-[10px] font-bold text-stone-400 px-1 hidden sm:inline uppercase">Spacing:</span>
          {(['spacious', 'balanced', 'compact'] as const).map(d => (
            <button
              key={d}
              onClick={() => handleSetDensity(d)}
              className={`px-2 py-1 rounded-lg text-[10px] sm:text-xs font-bold transition-colors cursor-pointer uppercase ${
                density === d
                  ? 'bg-red-600 text-white font-black shadow-xs'
                  : 'text-stone-300 hover:text-white'
              }`}
              title={
                d === 'spacious' ? 'Spacious: 6 dishes/page, maximum breathing room (Recommended)' :
                d === 'balanced' ? 'Balanced: 8 dishes/page' : 'Compact: 10 dishes/page'
              }
            >
              {d === 'spacious' ? 'Spacious' : d === 'balanced' ? 'Balanced' : 'Dense'}
            </button>
          ))}
        </div>

        {/* Page Switcher (if current category has multiple pages) */}
        {totalPages > 1 && (
          <div className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded-xl text-xs font-bold text-stone-200">
            <button
              onClick={handlePrevPage}
              className="p-1 rounded hover:text-white text-stone-400 cursor-pointer"
              title="Previous Page"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[11px] px-1 text-red-400">
              {safePage + 1}/{totalPages}
            </span>
            <button
              onClick={handleNextPage}
              className="p-1 rounded hover:text-white text-stone-400 cursor-pointer"
              title="Next Page"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Display Scale Adjuster */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl">
          <span className="text-[10px] font-bold text-stone-400 px-1 hidden sm:inline uppercase">Scale:</span>
          {(['auto', 'standard', 'large', 'xl'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => handleSetTvScale(mode)}
              className={`px-2 py-1 rounded-lg text-[10px] sm:text-xs font-bold transition-colors cursor-pointer uppercase ${
                tvScale === mode
                  ? 'bg-red-600 text-white font-black shadow-xs'
                  : 'text-stone-300 hover:text-white'
              }`}
              title={
                mode === 'auto' ? 'Auto Dynamic Screen Adjust' :
                mode === 'standard' ? 'Standard Display' :
                mode === 'large' ? 'Large Screen / TV' : 'Extra Large Display'
              }
            >
              {mode === 'auto' ? 'Auto' : mode === 'standard' ? 'Std' : mode === 'large' ? 'Lg' : 'XL'}
            </button>
          ))}
        </div>

        <button
          onClick={toggleFullscreen}
          className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
          title="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};
