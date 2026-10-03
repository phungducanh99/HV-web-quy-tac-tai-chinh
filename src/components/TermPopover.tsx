import React, { useState, useRef, useEffect } from 'react';
import { findGlossaryTerm } from '../utils/glossaryLookup';
import { Info, ExternalLink, Bookmark, Check } from 'lucide-react';

interface TermPopoverProps {
  term: string;
  displayText?: string;
  onNavigateTab?: (tabId: 'tab1' | 'tab2' | 'tab3' | 'tab4') => void;
  darkMode?: boolean;
}

export const TermPopover: React.FC<TermPopoverProps> = ({
  term,
  displayText,
  onNavigateTab,
  darkMode = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const glossaryItem = findGlossaryTerm(term);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!glossaryItem) {
    return <span>{displayText || term}</span>;
  }

  return (
    <span className="relative inline-block" ref={popoverRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        className="inline-flex items-center space-x-0.5 border-b border-dashed border-blue-400/70 hover:border-blue-400 text-blue-300 hover:text-blue-200 transition-colors font-semibold cursor-pointer px-0.5 rounded"
      >
        <span>{displayText || glossaryItem.term}</span>
        <Info className="w-3 h-3 text-blue-400 opacity-80 inline ml-0.5" />
      </button>

      {/* Popover Bubble */}
      {isOpen && (
        <div
          className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-72 md:w-80 p-4 rounded-xl shadow-2xl z-50 transition-all border text-left ${
            darkMode
              ? 'bg-slate-900 border-slate-700 text-slate-100 ring-1 ring-blue-500/30'
              : 'bg-white border-slate-200 text-slate-900 shadow-slate-400/20 ring-1 ring-blue-500/20'
          }`}
        >
          <div className="flex items-start justify-between gap-2 border-b border-slate-700/50 pb-2 mb-2">
            <div>
              <span className="font-bold text-sm block">{glossaryItem.term}</span>
              {glossaryItem.engTerm && (
                <span className="text-[11px] text-blue-400 font-mono block">({glossaryItem.engTerm})</span>
              )}
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {glossaryItem.categoryName}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            {glossaryItem.definition}
          </p>

          <div className="flex items-center justify-between text-[10px] pt-2 border-t border-slate-800/60">
            <span className="text-slate-400 italic">Nguồn: {glossaryItem.source}</span>

            {onNavigateTab && (
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  if (glossaryItem.interactiveTabLink) {
                    onNavigateTab(glossaryItem.interactiveTabLink.tabId);
                  } else {
                    onNavigateTab('tab4');
                  }
                }}
                className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 font-semibold"
              >
                <span>Xem ở Từ điển</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      )}
    </span>
  );
};
