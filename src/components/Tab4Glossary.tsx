import React, { useState, useEffect } from 'react';
import { glossaryData } from '../data/glossaryData';
import { GlossaryCard } from './GlossaryCard';
import { GlossaryTable } from './GlossaryTable';
import { BookOpen, LayoutGrid, List, Bookmark, Search, ShieldCheck } from 'lucide-react';

interface Tab4Props {
  searchQuery: string;
  onNavigateTab: (tabId: 'tab1' | 'tab2' | 'tab3') => void;
  darkMode: boolean;
}

export const Tab4Glossary: React.FC<Tab4Props> = ({ searchQuery, onNavigateTab, darkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('hvo_glossary_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('hvo_glossary_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarks]);

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const filteredItems = glossaryData.filter((item) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      item.term.toLowerCase().includes(query) ||
      (item.engTerm && item.engTerm.toLowerCase().includes(query)) ||
      item.definition.toLowerCase().includes(query) ||
      item.source.toLowerCase().includes(query) ||
      (item.tags && item.tags.some((t) => t.toLowerCase().includes(query)));

    if (selectedCategory === 'all') return matchesSearch;
    if (selectedCategory === 'bookmarked') return matchesSearch && bookmarks.includes(item.id);
    return matchesSearch && item.category === selectedCategory;
  });

  return (
    <div className="space-y-8">
      {/* Introduction Banner */}
      <div
        className={`rounded-2xl p-6 border shadow-xl transition-colors ${
          darkMode
            ? 'bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-slate-900 border-blue-500/30 text-white'
            : 'bg-gradient-to-r from-blue-50 via-indigo-50 to-white border-blue-200 text-slate-900'
        }`}
      >
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-blue-600/20 text-blue-500 rounded-xl border border-blue-500/30 shrink-0">
            <BookOpen className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Từ Điển Thuật Ngữ Hải Vân (Glossaries Hub)</h2>
            <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Hệ thống hóa toàn bộ <strong className="text-blue-500">80+ thuật ngữ</strong> bản sắc riêng Hải Vân, 
              nguyên tắc Hiến pháp tài chính, quy chế vận hành VP TGĐ và thuật ngữ quản trị chuyên môn.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Toolbar & Controls */}
      <div
        className={`p-4 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
          darkMode ? 'bg-slate-800/80 border-slate-700/80' : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        {/* Category Filter Tabs */}
        <div className="flex space-x-1.5 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white shadow-md'
                : darkMode
                ? 'bg-slate-900/70 text-slate-300 hover:bg-slate-700'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Tất cả ({glossaryData.length})
          </button>

          <button
            onClick={() => setSelectedCategory('identity')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'identity'
                ? 'bg-blue-600 text-white shadow-md'
                : darkMode
                ? 'bg-slate-900/70 text-slate-300 hover:bg-slate-700'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            🌟 Bản sắc Hải Vân (17)
          </button>

          <button
            onClick={() => setSelectedCategory('finance')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'finance'
                ? 'bg-blue-600 text-white shadow-md'
                : darkMode
                ? 'bg-slate-900/70 text-slate-300 hover:bg-slate-700'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            💳 Tài chính Hải Vân (26)
          </button>

          <button
            onClick={() => setSelectedCategory('vptgd')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'vptgd'
                ? 'bg-blue-600 text-white shadow-md'
                : darkMode
                ? 'bg-slate-900/70 text-slate-300 hover:bg-slate-700'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            🏛️ VP TGĐ Nội bộ (8)
          </button>

          <button
            onClick={() => setSelectedCategory('governance')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'governance'
                ? 'bg-blue-600 text-white shadow-md'
                : darkMode
                ? 'bg-slate-900/70 text-slate-300 hover:bg-slate-700'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            📊 Quản trị & Chuyên môn (30+)
          </button>

          <button
            onClick={() => setSelectedCategory('bookmarked')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1 ${
              selectedCategory === 'bookmarked'
                ? 'bg-amber-500 text-white shadow-md'
                : darkMode
                ? 'bg-slate-900/70 text-amber-400 hover:bg-slate-700'
                : 'bg-slate-100 text-amber-600 hover:bg-slate-200'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Đã lưu ({bookmarks.length})</span>
          </button>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center space-x-2 shrink-0">
          <span className="text-xs text-slate-400 hidden sm:inline">Chế độ xem:</span>
          <div className={`p-1 rounded-lg border flex space-x-1 ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-100 border-slate-200'}`}>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded transition-all ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white'
                  : darkMode
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Xem dạng Card Grid"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded transition-all ${
                viewMode === 'table'
                  ? 'bg-blue-600 text-white'
                  : darkMode
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Xem dạng Bảng chi tiết"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {filteredItems.length === 0 ? (
        <div className={`p-12 text-center rounded-2xl border ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-slate-200'}`}>
          <Search className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h4 className="text-base font-bold mb-1">Không tìm thấy thuật ngữ nào</h4>
          <p className="text-xs text-slate-400">Thử thay đổi từ khóa tìm kiếm hoặc chọn danh mục khác.</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <GlossaryCard
              key={item.id}
              item={item}
              isBookmarked={bookmarks.includes(item.id)}
              onToggleBookmark={toggleBookmark}
              onNavigateTab={onNavigateTab}
              darkMode={darkMode}
            />
          ))}
        </div>
      ) : (
        <GlossaryTable
          items={filteredItems}
          bookmarks={bookmarks}
          onToggleBookmark={toggleBookmark}
          onNavigateTab={onNavigateTab}
          darkMode={darkMode}
        />
      )}
    </div>
  );
};
