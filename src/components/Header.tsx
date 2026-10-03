import React from 'react';
import { ShieldCheck, Search, DollarSign, GitCommit, Layers, BookOpen, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  activeTab: 'tab1' | 'tab2' | 'tab3' | 'tab4';
  setActiveTab: (tab: 'tab1' | 'tab2' | 'tab3' | 'tab4') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  darkMode,
  setDarkMode,
}) => {
  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors ${
        darkMode
          ? 'bg-slate-900/90 border-slate-800 text-slate-100'
          : 'bg-white/90 border-slate-200 text-slate-900 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 gap-4">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-xl shadow-lg shadow-blue-500/20 text-white">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className={`font-bold text-xl tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  HẢI VÂN
                </span>
                <span className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-500 border border-blue-500/30 rounded-full font-semibold">
                  Finance OS v2.0
                </span>
              </div>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Bộ Quy Tắc, Phân Quyền & Từ Điển Thuật Ngữ Tài Chính
              </p>
            </div>
          </div>

          {/* Search Bar & Theme Toggle */}
          <div className="flex items-center space-x-3 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search
                className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${
                  darkMode ? 'text-slate-400' : 'text-slate-400'
                }`}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tra cứu từ khóa: DOA, Runway, A3, Gate 2, SoD, Gen 008..."
                className={`w-full pl-10 pr-4 py-2 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
                  darkMode
                    ? 'bg-slate-800/80 border border-slate-700/60 text-slate-200 placeholder-slate-400 focus:border-blue-500'
                    : 'bg-slate-100 border border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-600'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-blue-500"
                >
                  Xóa
                </button>
              )}
            </div>

            {/* Dark / Light Mode Toggle Button */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-xl border transition-all flex items-center justify-center ${
                darkMode
                  ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
              }`}
              title={darkMode ? 'Chuyển sang Giao diện Sáng (Light Mode)' : 'Chuyển sang Giao diện Tối (Dark Mode)'}
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className={`flex space-x-2 border-t overflow-x-auto py-2 ${darkMode ? 'border-slate-800/80' : 'border-slate-200'}`}>
          <button
            onClick={() => setActiveTab('tab1')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'tab1'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : darkMode
                ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Hiến Pháp & 7 Quỹ Tiền</span>
          </button>

          <button
            onClick={() => setActiveTab('tab2')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'tab2'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : darkMode
                ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <GitCommit className="w-4 h-4" />
            <span>Phân Quyền DOA & 6 Mắt Xích</span>
          </button>

          <button
            onClick={() => setActiveTab('tab3')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'tab3'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : darkMode
                ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Cổng Đầu Tư & Sơ Đồ Trực Quan</span>
          </button>

          <button
            onClick={() => setActiveTab('tab4')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'tab4'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : darkMode
                ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Từ Điển Thuật Ngữ (80+)</span>
          </button>
        </div>
      </div>
    </header>
  );
};
