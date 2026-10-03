import React, { useState } from 'react';
import { GlossaryItem } from '../types/glossary';
import { Bookmark, BookmarkCheck, Copy, Check, ExternalLink } from 'lucide-react';

interface GlossaryTableProps {
  items: GlossaryItem[];
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
  onNavigateTab: (tabId: 'tab1' | 'tab2' | 'tab3') => void;
  darkMode: boolean;
}

export const GlossaryTable: React.FC<GlossaryTableProps> = ({
  items,
  bookmarks,
  onToggleBookmark,
  onNavigateTab,
  darkMode,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (item: GlossaryItem) => {
    const textToCopy = `[${item.term}]${item.engTerm ? ` (${item.engTerm})` : ''}: ${item.definition} (Nguồn: ${item.source})`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div
      className={`overflow-x-auto rounded-xl border ${
        darkMode ? 'bg-slate-800/80 border-slate-700/80' : 'bg-white border-slate-200 shadow-sm'
      }`}
    >
      <table className="w-full text-left border-collapse">
        <thead>
          <tr
            className={`border-b text-xs font-semibold uppercase ${
              darkMode ? 'bg-slate-900/60 border-slate-700 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
            }`}
          >
            <th className="py-3 px-4 w-10 text-center">⭐</th>
            <th className="py-3 px-4">Thuật ngữ</th>
            <th className="py-3 px-4">Giải thích / Định nghĩa trong Hải Vân</th>
            <th className="py-3 px-4">Nguồn / Căn cứ</th>
            <th className="py-3 px-4 text-right">Thao tác</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700/50 text-xs">
          {items.map((item) => {
            const isBookmarked = bookmarks.includes(item.id);
            return (
              <tr
                key={item.id}
                className={`transition-colors ${
                  darkMode ? 'hover:bg-slate-700/30 text-slate-200' : 'hover:bg-slate-50 text-slate-800'
                }`}
              >
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => onToggleBookmark(item.id)}
                    className="p-1 text-slate-400 hover:text-amber-400"
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </td>
                <td className="py-3 px-4 font-bold whitespace-nowrap">
                  <div>{item.term}</div>
                  {item.engTerm && <div className="text-[10px] text-blue-400 font-mono">{item.engTerm}</div>}
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono mt-1 inline-block">
                    {item.categoryName}
                  </span>
                </td>
                <td className="py-3 px-4 leading-relaxed max-w-md">{item.definition}</td>
                <td className="py-3 px-4 whitespace-nowrap font-mono text-slate-400">{item.source}</td>
                <td className="py-3 px-4 text-right whitespace-nowrap space-x-2">
                  <button
                    onClick={() => handleCopy(item)}
                    className={`p-1.5 rounded transition-colors ${
                      copiedId === item.id
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : darkMode
                        ? 'bg-slate-900 border border-slate-700 text-slate-300 hover:text-white'
                        : 'bg-slate-100 border border-slate-300 text-slate-700 hover:text-slate-900'
                    }`}
                    title="Sao chép định nghĩa"
                  >
                    {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>

                  {item.interactiveTabLink && (
                    <button
                      onClick={() => onNavigateTab(item.interactiveTabLink!.tabId)}
                      className="p-1.5 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 rounded border border-blue-500/30 inline-flex items-center space-x-1"
                      title={item.interactiveTabLink.label}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
