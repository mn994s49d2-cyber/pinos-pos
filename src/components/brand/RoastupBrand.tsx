import React, { useState, useEffect, useRef } from 'react';
import { Upload, Sparkles, Image as ImageIcon, Check, RefreshCw, CheckCircle2 } from 'lucide-react';

// Safe in-memory fallback store if localStorage is blocked by iframe security policies
const memoryBrandStore: Record<string, string> = {};
const BRAND_CHANGE_EVENT = 'pizzapino_brand_assets_changed';

/**
 * Resizes an image client-side to keep base64 strings small (<100KB)
 * so they never exceed browser localStorage quotas.
 */
export function resizeImageFile(file: File, maxWidth = 500, maxHeight = 500, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const isPng = file.type === 'image/png';
        const dataUrl = canvas.toDataURL(isPng ? 'image/png' : 'image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

function safeGetStorage(key: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  try {
    return window.localStorage.getItem(key) || memoryBrandStore[key] || fallback;
  } catch {
    return memoryBrandStore[key] || fallback;
  }
}

function safeSetStorage(key: string, value: string): void {
  memoryBrandStore[key] = value;
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, value);
  } catch (err) {
    console.warn('LocalStorage save failed, using memory fallback:', err);
  }
}

function safeRemoveStorage(key: string): void {
  delete memoryBrandStore[key];
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Gracefully ignore
  }
}

// Global broadcast to update all mounted brand components
function broadcastBrandUpdate() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(BRAND_CHANGE_EVENT));
  }
}

// Helper hook for persistent brand assets (stored safely in localStorage & memory)
export function useBrandAssets() {
  const [logoUrl, setLogoUrl] = useState<string>(() => safeGetStorage('pizzapino_custom_logo', ''));
  const [iconUrl, setIconUrl] = useState<string>(() => safeGetStorage('pizzapino_custom_icon', ''));

  useEffect(() => {
    const handleUpdate = () => {
      setLogoUrl(safeGetStorage('pizzapino_custom_logo', ''));
      setIconUrl(safeGetStorage('pizzapino_custom_icon', ''));
    };

    window.addEventListener(BRAND_CHANGE_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener(BRAND_CHANGE_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const updateLogo = (dataUrl: string) => {
    setLogoUrl(dataUrl);
    safeSetStorage('pizzapino_custom_logo', dataUrl);
    broadcastBrandUpdate();
  };

  const updateIcon = (dataUrl: string) => {
    setIconUrl(dataUrl);
    safeSetStorage('pizzapino_custom_icon', dataUrl);
    broadcastBrandUpdate();
  };

  const resetBrand = () => {
    setLogoUrl('');
    setIconUrl('');
    safeRemoveStorage('pizzapino_custom_logo');
    safeRemoveStorage('pizzapino_custom_icon');
    safeRemoveStorage('roastup_custom_logo');
    safeRemoveStorage('roastup_custom_icon');
    broadcastBrandUpdate();
  };

  return { logoUrl, iconUrl, updateLogo, updateIcon, resetBrand };
}

/**
 * Pizza Pino Authentic Pizzeria Vector Logo
 * Features bold Italian typography, pizza oven arch, and vibrant red/gold accents
 */
export const PizzaPinoSvgLogo: React.FC<{ className?: string; color?: string }> = ({ 
  className = "h-9 w-auto", 
  color = "#DC2626" 
}) => {
  return (
    <svg 
      viewBox="0 0 420 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      aria-label="PIZZA PINO"
    >
      {/* Pizza Slice Icon Emblem */}
      <g transform="translate(15, 12)">
        {/* Crust */}
        <path 
          d="M 12 18 C 35 12, 65 12, 88 18 C 92 20, 90 28, 85 30 C 65 24, 35 24, 15 30 C 10 28, 8 20, 12 18 Z" 
          fill="#D97706" 
        />
        {/* Cheese Body */}
        <path 
          d="M 16 30 L 50 94 L 84 30 Z" 
          fill="#F59E0B" 
        />
        {/* Tomato Sauce Edge */}
        <path 
          d="M 18 30 L 50 92 L 82 30 Q 50 25 18 30 Z" 
          fill="#DC2626" 
        />
        {/* Melted Cheese Surface */}
        <path 
          d="M 22 34 L 50 88 L 78 34 Q 50 28 22 34 Z" 
          fill="#FBBF24" 
        />
        {/* Pepperoni Slices */}
        <circle cx="50" cy="46" r="8" fill="#B91C1C" />
        <circle cx="52" cy="45" r="7" fill="#DC2626" />
        <circle cx="38" cy="62" r="6.5" fill="#B91C1C" />
        <circle cx="39" cy="61" r="5.5" fill="#DC2626" />
        <circle cx="62" cy="62" r="6.5" fill="#B91C1C" />
        <circle cx="63" cy="61" r="5.5" fill="#DC2626" />
        {/* Basil Leaves */}
        <path d="M 46 32 C 43 30, 41 33, 44 36 C 47 38, 48 34, 46 32 Z" fill="#16A34A" />
        <path d="M 58 72 C 55 70, 53 73, 56 76 C 59 78, 60 74, 58 72 Z" fill="#16A34A" />
        {/* Steaming heat lines */}
        <path d="M 40 10 Q 44 4 41 0" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 52 10 Q 56 3 53 0" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 64 10 Q 68 4 65 0" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* Italian Flag Subtle Accent Bar */}
      <g transform="translate(130, 18)">
        <rect x="0" y="0" width="18" height="5" rx="2" fill="#16A34A" />
        <rect x="22" y="0" width="18" height="5" rx="2" fill="#E2E8F0" />
        <rect x="44" y="0" width="18" height="5" rx="2" fill="#DC2626" />
        <text 
          x="72" 
          y="6" 
          fill="#78716C" 
          fontFamily="system-ui, -apple-system, sans-serif" 
          fontWeight="800" 
          fontSize="9" 
          letterSpacing="2.5px"
        >
          AUTHENTIC STONE-BAKED
        </text>
      </g>

      {/* Main Brand Typography: PIZZA PINO */}
      <text 
        x="130" 
        y="75" 
        fill={color} 
        fontFamily="'Plus Jakarta Sans', 'Arial Black', sans-serif" 
        fontWeight="900" 
        fontSize="54" 
        letterSpacing="-1.5px"
      >
        PIZZA <tspan fill="#1C1917" className="dark:fill-white">PINO</tspan>
      </text>

      {/* Tagline / Subtitle */}
      <text 
        x="132" 
        y="98" 
        fill="#A8A29E" 
        fontFamily="system-ui, -apple-system, sans-serif" 
        fontWeight="700" 
        fontSize="12.5" 
        letterSpacing="3px"
      >
        PIZZAS • CALZONES • BURGERS
      </text>
    </svg>
  );
};

export const RoastupSvgLogo = PizzaPinoSvgLogo;

/**
 * Crispy Golden Stone-Baked Pizza Slice Vector Icon
 */
export const PizzaPinoSvgPizzaSlice: React.FC<{ className?: string }> = ({ className = "w-9 h-9" }) => {
  return (
    <svg 
      viewBox="0 0 120 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      aria-label="Pizza Pino Slice"
    >
      {/* Background Soft Glow Circle */}
      <circle cx="60" cy="60" r="56" fill="#FEE2E2" className="dark:fill-red-950/60" />
      
      {/* Pizza Slice Group */}
      <g transform="translate(10, 6)">
        {/* Golden Puffy Crust */}
        <path 
          d="M 16 26 C 42 18, 58 18, 84 26 C 89 28, 88 38, 81 40 C 58 32, 42 32, 19 40 C 12 38, 11 28, 16 26 Z" 
          fill="#D97706" 
          stroke="#B45309" 
          strokeWidth="3.5" 
        />
        {/* Toast spots on crust */}
        <circle cx="32" cy="28" r="2.5" fill="#78350F" />
        <circle cx="50" cy="27" r="3" fill="#78350F" />
        <circle cx="68" cy="29" r="2.5" fill="#78350F" />

        {/* Tomato Sauce Base */}
        <path 
          d="M 22 39 L 50 102 L 78 39 Q 50 33 22 39 Z" 
          fill="#DC2626" 
          stroke="#B91C1C" 
          strokeWidth="2" 
        />

        {/* Rich Gooey Melted Cheese Layer */}
        <path 
          d="M 26 42 L 50 96 L 74 42 Q 50 36 26 42 Z" 
          fill="#FBBF24" 
        />

        {/* Stringy Cheese Melt Highlights */}
        <path 
          d="M 36 44 Q 50 56 64 44" 
          stroke="#FEF3C7" 
          strokeWidth="4" 
          strokeLinecap="round" 
        />
        <path 
          d="M 42 66 Q 50 78 58 66" 
          stroke="#FEF3C7" 
          strokeWidth="3" 
          strokeLinecap="round" 
        />

        {/* Pepperoni Slices with Crisp Edges */}
        <circle cx="50" cy="52" r="9" fill="#B91C1C" />
        <circle cx="51" cy="51" r="8" fill="#EF4444" />
        <circle cx="36" cy="72" r="7" fill="#B91C1C" />
        <circle cx="37" cy="71" r="6" fill="#EF4444" />
        <circle cx="64" cy="72" r="7" fill="#B91C1C" />
        <circle cx="65" cy="71" r="6" fill="#EF4444" />

        {/* Fresh Green Basil Flecks */}
        <path d="M 44 38 C 40 35, 38 40, 42 42 C 45 44, 47 41, 44 38 Z" fill="#16A34A" />
        <path d="M 60 56 C 56 53, 54 58, 58 60 C 61 62, 63 59, 60 56 Z" fill="#16A34A" />
        <circle cx="49" cy="84" r="2.5" fill="#15803D" />
        <circle cx="42" cy="58" r="1.5" fill="#15803D" />
        <circle cx="58" cy="80" r="1.5" fill="#15803D" />
      </g>
    </svg>
  );
};

export const RoastupSvgPotato = PizzaPinoSvgPizzaSlice;

/**
 * Universal Pizza Pino Brand Logo Component
 */
export const PizzaPinoLogo: React.FC<{ 
  className?: string; 
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtext?: boolean;
}> = ({ className = '', size = 'md', showSubtext = false }) => {
  const { logoUrl } = useBrandAssets();
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    sm: 'h-7',
    md: 'h-10',
    lg: 'h-14',
    xl: 'h-20'
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {!imgError && logoUrl ? (
        <img 
          src={logoUrl} 
          alt="PIZZA PINO Logo" 
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className={`${sizeClasses[size]} w-auto object-contain drop-shadow-xs`} 
        />
      ) : (
        <PizzaPinoSvgLogo className={`${sizeClasses[size]} w-auto`} />
      )}
      {showSubtext && (
        <div className="flex flex-col leading-none">
          <span className="text-[10px] font-black uppercase tracking-widest text-red-600">
            Stone-Baked Pizza
          </span>
        </div>
      )}
    </div>
  );
};

export const RoastupLogo = PizzaPinoLogo;
export const RoastiesLogo = PizzaPinoLogo;

/**
 * Universal Pizza Slice Icon Component
 */
export const PizzaPinoIcon: React.FC<{ 
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}> = ({ className = '', size = 'md' }) => {
  const { iconUrl } = useBrandAssets();
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20'
  };

  return (
    <div className={`inline-flex items-center justify-center rounded-2xl overflow-hidden shrink-0 ${sizeClasses[size]} ${className}`}>
      {!imgError && iconUrl ? (
        <img 
          src={iconUrl} 
          alt="Pizza Pino" 
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover rounded-2xl" 
        />
      ) : (
        <PizzaPinoSvgPizzaSlice className="w-full h-full" />
      )}
    </div>
  );
};

export const RoastupPotatoIcon = PizzaPinoIcon;
export const RoastupIcon = PizzaPinoIcon;
export const RoastiesPotatoIcon = PizzaPinoIcon;

/**
 * Brand Customizer / Uploader Modal
 */
export const BrandUploadModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { logoUrl, iconUrl, updateLogo, updateIcon, resetBrand } = useBrandAssets();
  const logoInputRef = useRef<HTMLInputElement>(null);
  const iconInputRef = useRef<HTMLInputElement>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'icon') => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const resized = await resizeImageFile(file, 600, 600, 0.88);
      if (type === 'logo') {
        updateLogo(resized);
        setUploadSuccess('PIZZA PINO Logo updated successfully across all screens!');
      } else {
        updateIcon(resized);
        setUploadSuccess('Pizza Pino Icon updated successfully across all screens!');
      }
      setTimeout(() => setUploadSuccess(null), 3500);
    } catch (err) {
      console.error('Failed to process uploaded image', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl w-full max-w-lg shadow-2xl p-6 text-stone-900 dark:text-white space-y-6">
        <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-stone-900 dark:text-white">Pizza Pino Brand Assets</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">Upload your custom PNG files or use default Pizza Pino artwork</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 font-bold text-xs p-1"
          >
            ✕
          </button>
        </div>

        {uploadSuccess && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 rounded-2xl text-xs flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>{uploadSuccess}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Main Logo Card */}
          <div className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/40 flex flex-col items-center text-center space-y-3">
            <span className="text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider">
              Pizzeria Logo
            </span>
            <div className="h-16 w-full flex items-center justify-center bg-white dark:bg-stone-900 rounded-xl border border-stone-100 dark:border-stone-700 p-2 shadow-2xs">
              <PizzaPinoLogo size="md" />
            </div>
            <input 
              type="file" 
              ref={logoInputRef} 
              accept="image/png,image/jpeg,image/webp,image/svg+xml"
              onChange={(e) => handleFileChange(e, 'logo')} 
              className="hidden" 
            />
            <button
              onClick={() => logoInputRef.current?.click()}
              className="w-full py-2 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Custom Logo</span>
            </button>
          </div>

          {/* Pizza Icon Card */}
          <div className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/40 flex flex-col items-center text-center space-y-3">
            <span className="text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider">
              Pizza Slice Icon
            </span>
            <div className="h-16 w-full flex items-center justify-center bg-white dark:bg-stone-900 rounded-xl border border-stone-100 dark:border-stone-700 p-2 shadow-2xs">
              <PizzaPinoIcon size="md" />
            </div>
            <input 
              type="file" 
              ref={iconInputRef} 
              accept="image/png,image/jpeg,image/webp,image/svg+xml"
              onChange={(e) => handleFileChange(e, 'icon')} 
              className="hidden" 
            />
            <button
              onClick={() => iconInputRef.current?.click()}
              className="w-full py-2 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Custom Icon</span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800">
          <button
            onClick={resetBrand}
            className="text-stone-500 hover:text-red-600 text-xs font-medium flex items-center gap-1.5 py-1 px-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Restore Pizza Pino Defaults</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 dark:hover:bg-stone-600 font-bold text-xs text-stone-800 dark:text-white transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Settings Section Component for Admin Hub
 */
export const BrandAssetsSettingsSection: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const { logoUrl, iconUrl } = useBrandAssets();

  return (
    <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 flex items-center justify-center">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-stone-900 dark:text-white">Pizzeria Branding &amp; Visual Identity</h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">Pizza Pino logos and icons displayed on POS, TV Menu, KDS and Receipts</p>
          </div>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Customize Brand</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2">
        <div className="p-3 bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-100 dark:border-stone-800 flex items-center gap-3">
          <div className="h-10 w-28 bg-white dark:bg-stone-900 rounded-lg border border-stone-200 dark:border-stone-700 flex items-center justify-center p-1">
            <PizzaPinoLogo size="sm" />
          </div>
          <div>
            <div className="text-xs font-bold text-stone-800 dark:text-stone-200">Active Logo</div>
            <div className="text-[11px] text-stone-400">{logoUrl ? 'Custom Image' : 'Default Pizza Pino Vector'}</div>
          </div>
        </div>

        <div className="p-3 bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-100 dark:border-stone-800 flex items-center gap-3">
          <div className="h-10 w-10 bg-white dark:bg-stone-900 rounded-lg border border-stone-200 dark:border-stone-700 flex items-center justify-center p-1">
            <PizzaPinoIcon size="sm" />
          </div>
          <div>
            <div className="text-xs font-bold text-stone-800 dark:text-stone-200">Active Icon</div>
            <div className="text-[11px] text-stone-400">{iconUrl ? 'Custom Image' : 'Default Pizza Slice Vector'}</div>
          </div>
        </div>
      </div>

      <BrandUploadModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};
