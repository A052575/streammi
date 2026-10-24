import React, { useState, useRef, useEffect } from 'react';
import { SHOPPING_LINKS } from '../data/moviesData';

export const ShoppingLinks = ({
  amazonUrl,
  flipkartUrl,
  itemTitle = 'Title',
  variant = 'compact',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const defaultAmazon = amazonUrl || SHOPPING_LINKS[0].url;
  const defaultFlipkart = flipkartUrl || SHOPPING_LINKS[4].url;

  if (variant === 'hero') {
    return (
      <div className={`flex flex-col gap-1.5 pt-1 ${className}`}>
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="font-meta-mono text-secondary uppercase tracking-wider">
            Links:
          </span>

          <a
            href={defaultAmazon}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-[#FF9900] hover:text-[#ffb347] font-semibold underline underline-offset-2 hover:opacity-90 transition-opacity"
            title={`Open Amazon Page for ${itemTitle}`}
          >
            Amazon Link
          </a>

          <span className="text-secondary/40 font-meta-mono">|</span>

          <a
            href={defaultFlipkart}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-[#3B82F6] hover:text-[#60A5FA] font-semibold underline underline-offset-2 hover:opacity-90 transition-opacity"
            title={`Open Flipkart Page for ${itemTitle}`}
          >
            Flipkart Link
          </a>

          <span className="text-secondary/40 font-meta-mono">|</span>

          <div className="relative inline-block" ref={dropdownRef}>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
              className="text-secondary hover:text-on-surface underline underline-offset-2 font-meta-mono"
            >
              All 6 Links
            </button>

            {isOpen && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute left-0 top-full mt-2 w-72 sm:w-80 bg-surface-container-high/95 backdrop-blur-xl border border-surface-container-highest rounded-xl p-3 shadow-2xl z-50 animate-fadeIn"
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-surface-container-highest">
                  <span className="text-[11px] font-meta-mono uppercase tracking-wider text-secondary">
                    All Product Links (6)
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="text-secondary hover:text-on-surface text-xs font-mono"
                  >
                    [Close]
                  </button>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto no-scrollbar">
                  {SHOPPING_LINKS.map((link) => (
                    <div key={link.id} className="flex flex-col border-b border-surface-container-highest/50 pb-1.5 last:border-b-0">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-on-surface hover:underline font-medium"
                      >
                        {link.title}
                      </a>
                      <div className="flex items-center gap-2 text-[10px] text-secondary font-meta-mono mt-0.5">
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={link.store === 'Amazon' ? 'text-[#FF9900] underline font-bold' : 'text-[#3B82F6] underline font-bold'}
                        >
                          Visit {link.store}
                        </a>
                        <span>•</span>
                        <span>{link.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Compact variant (For Cards) - purely text links, NO icons
  return (
    <div className={`relative flex items-center gap-1.5 mt-1 text-[11px] flex-wrap leading-tight ${className}`} ref={dropdownRef}>
      <a
        href={defaultAmazon}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="text-[#FF9900] hover:text-[#ffb347] font-semibold underline underline-offset-2 hover:opacity-90"
        title={`Open Amazon Link - ${itemTitle}`}
      >
        Amazon Link
      </a>

      <span className="text-secondary/40">|</span>

      <a
        href={defaultFlipkart}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="text-[#3B82F6] hover:text-[#60A5FA] font-semibold underline underline-offset-2 hover:opacity-90"
        title={`Open Flipkart Link - ${itemTitle}`}
      >
        Flipkart Link
      </a>

      <span className="text-secondary/40">|</span>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="text-secondary hover:text-on-surface text-[10px] underline font-meta-mono"
        title="View all 6 links"
      >
        More Links
      </button>

      {isOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute left-0 bottom-full mb-1 w-64 bg-surface-container-high/95 backdrop-blur-xl border border-surface-container-highest rounded-xl p-2.5 shadow-2xl z-50 animate-fadeIn"
        >
          <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-surface-container-highest">
            <span className="text-[10px] font-meta-mono uppercase tracking-wider text-secondary">
              Product Links (6)
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-secondary hover:text-on-surface text-[11px] font-mono"
            >
              [X]
            </button>
          </div>
          <div className="space-y-1.5 max-h-48 overflow-y-auto no-scrollbar">
            {SHOPPING_LINKS.map((link) => (
              <div key={link.id} className="border-b border-surface-container-highest/40 pb-1 last:border-b-0">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-on-surface hover:underline line-clamp-1 font-medium"
                >
                  {link.title}
                </a>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-[10px] underline font-bold ${
                    link.store === 'Amazon' ? 'text-[#FF9900]' : 'text-[#3B82F6]'
                  }`}
                >
                  Go to {link.store}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
