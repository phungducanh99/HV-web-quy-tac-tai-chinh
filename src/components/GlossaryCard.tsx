import React, { useState } from 'react';
import { GlossaryItem } from '../types/glossary';
import { Bookmark, BookmarkCheck, Copy, Check, ExternalLink } from 'lucide-react';

interface GlossaryCardProps {
  item: GlossaryItem;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onNavigateTab: (tabId: 'tab1' | 'tab2' | 'tab3') => void;
  darkMode: boolean;
}

export const GlossaryCard: React.FC<GlossaryCardProps> = ({
  item,
  isBookmarked,
  onToggleBookmark,
  onNavigateTab,
  darkMode,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = `[${item.term}]${item.engTerm ? ` (${item.engTerm})` : ''}: ${item.definition} (Nguồn: ${item.source})`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`rounded-xl p-5 border transition-all flex flex-col justify-between ${
        darkMode
          ? 'bg-slate-800/80 border-slate-700/80 hover:border-blue-500/50 text-slate-100'
          : 'bg-white border-slate-200 hover:border-blue-500/40 text-slate-900 shadow-sm hover:shadow-md'
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 border border-blue-500/20">
              {item.categoryName}
            </span>
            <h4 className="text-base font-bold mt-2 flex items-center gap-1.5">
              <span>{item.term}</span>
              {item.engTerm && <span className="text-xs text-blue-400 font-mono">({item.engTerm})</span>}
            </h4>
          </div>

          <button
            onClick={() => onToggleBookmark(item.id)}
            className={`p-1.5 rounded-lg border transition-colors ${
              isBookmarked
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                : darkMode
                ? 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-amber-400'
                : 'bg-slate-100 border-slate-300 text-slate-400 hover:text-amber-500'
            }`}
            title={isBookmarked ? 'Bỏ lưu' : 'Lưu thuật ngữ này'}
          >
            {isBookmarked ? <BookmarkCheck className="w-4 h-4 fill-amber-400" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>

        <p className={`text-xs leading-relaxed mb-4 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          {item.definition}
        </p>
      </div>

      <div className="space-y-3 pt-3 border-t border-slate-700/50">
        <div className="flex items-center justify-between text-[11px]">
          <span className={`italic ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Nguồn: <strong>{item.source}</strong>
          </span>

          <button
            onClick={handleCopy}
            className={`flex items-center space-x-1 px-2 py-1 rounded transition-colors ${
              copied
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : darkMode
                ? 'bg-slate-900 text-slate-300 hover:text-white border border-slate-700'
                : 'bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-300'
            }`}
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Đã chép' : 'Sao chép'}</span>
          </button>
        </div>

        {item.interactiveTabLink && (
          <button
            onClick={() => onNavigateTab(item.interactiveTabLink!.tabId)}
            className="w-full py-1.5 px-3 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 rounded-lg text-blue-400 hover:text-blue-300 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors"
          >
            <span>{item.interactiveTabLink.label}</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
};
