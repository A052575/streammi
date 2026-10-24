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
      <div className={`flex flex-col gap-1.5 pt-2 ${className}`}>
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="font-meta-mono text-secondary uppercase tracking-wider font-medium text-[11px]">
            Store Links:
          </span>

          <a
            href={defaultAmazon}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="px-2.5 py-1 rounded bg-[#FF9900]/15 text-[#FFB039] hover:bg-[#FF9900] hover:text-black font-semibold border border-[#FF9900]/40 transition-all text-xs"
            title={`Open Amazon Store for ${itemTitle}`}
          >
            Amazon Link
          </a>

          <a
            href={defaultFlipkart}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="px-2.5 py-1 rounded bg-[#2874F0]/15 text-[#60A5FA] hover:bg-[#2874F0] hover:text-white font-semibold border border-[#2874F0]/40 transition-all text-xs"
            title={`Open Flipkart Store for ${itemTitle}`}
          >
            Flipkart Link
          </a>

          <div className="relative inline-block" ref={dropdownRef}>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
              className="px-2.5 py-1 rounded bg-surface-container-high/80 hover:bg-surface-container-highest text-secondary hover:text-on-surface font-meta-mono text-xs border border-surface-container-highest transition-all"
            >
              All 6 Links
            </button>

            {isOpen && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute left-0 top-full mt-2 w-80 bg-[#161A22]/98 backdrop-blur-xl border border-surface-container-highest rounded-xl p-3 shadow-2xl z-50 animate-fadeIn"
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-surface-container-highest">
                  <span className="text-[11px] font-meta-mono uppercase tracking-wider text-secondary font-bold">
                    All 6 Clothing Deals
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="text-secondary hover:text-on-surface text-xs font-mono px-1.5 py-0.5 rounded bg-surface-container"
                  >
                    Close
                  </button>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto no-scrollbar">
                  {SHOPPING_LINKS.map((link) => (
                    <div key={link.id} className="flex flex-col p-2 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-on-surface hover:underline font-medium line-clamp-1"
                      >
                        {link.title}
                      </a>
                      <div className="flex items-center justify-between mt-1 text-[11px] font-meta-mono">
                        <span className="text-secondary">{link.category}</span>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={link.store === 'Amazon' ? 'text-[#FF9900] underline font-bold' : 'text-[#60A5FA] underline font-bold'}
                        >
                          {link.store} Link
                        </a>
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

  // Compact variant (For Cards) - clean text links without icons
  return (
    <div className={`relative flex items-center gap-1.5 mt-1.5 text-[11px] flex-wrap leading-tight ${className}`} ref={dropdownRef}>
      <a
        href={defaultAmazon}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="px-1.5 py-0.5 rounded text-[10px] font-semibold text-[#FF9900] bg-[#FF9900]/15 hover:bg-[#FF9900] hover:text-black border border-[#FF9900]/30 transition-all"
        title={`Open Amazon Link - ${itemTitle}`}
      >
        Amazon Link
      </a>

      <a
        href={defaultFlipkart}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="px-1.5 py-0.5 rounded text-[10px] font-semibold text-[#60A5FA] bg-[#2874F0]/15 hover:bg-[#2874F0] hover:text-white border border-[#2874F0]/30 transition-all"
        title={`Open Flipkart Link - ${itemTitle}`}
      >
        Flipkart Link
      </a>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="px-1.5 py-0.5 rounded text-[10px] font-meta-mono text-secondary hover:text-on-surface bg-surface-container-high/60 hover:bg-surface-container-high border border-surface-container-highest transition-all"
        title="View all 6 links"
      >
        More (6)
      </button>

      {isOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute left-0 bottom-full mb-1.5 w-72 bg-[#161A22]/98 backdrop-blur-xl border border-surface-container-highest rounded-xl p-2.5 shadow-2xl z-50 animate-fadeIn"
        >
          <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-surface-container-highest">
            <span className="text-[10px] font-meta-mono uppercase tracking-wider text-secondary font-bold">
              Product Links ({SHOPPING_LINKS.length})
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-secondary hover:text-on-surface text-[10px] font-mono px-1 rounded bg-surface-container"
            >
              Close
            </button>
          </div>
          <div className="space-y-1.5 max-h-48 overflow-y-auto no-scrollbar">
            {SHOPPING_LINKS.map((link) => (
              <div key={link.id} className="p-1.5 rounded bg-surface-container-low hover:bg-surface-container transition-colors">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-on-surface hover:underline line-clamp-1 font-medium block"
                >
                  {link.title}
                </a>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-[10px] text-secondary font-meta-mono">{link.category}</span>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-[10px] underline font-bold ${
                      link.store === 'Amazon' ? 'text-[#FF9900]' : 'text-[#60A5FA]'
                    }`}
                  >
                    Open {link.store}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
