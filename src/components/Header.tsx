import React from 'react';
import { ShieldCheck, Search, DollarSign, GitCommit, Layers } from 'lucide-react';

interface HeaderProps {
  activeTab: 'tab1' | 'tab2' | 'tab3';
  setActiveTab: (tab: 'tab1' | 'tab2' | 'tab3') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 gap-4">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-xl shadow-lg shadow-blue-500/20">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-xl text-white tracking-tight">HẢI VÂN</span>
                <span className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full font-semibold">
                  Finance OS
                </span>
              </div>
              <p className="text-xs text-slate-400">Bộ Quy Tắc & Tra Cứu Phân Quyền Tài Chính</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tra cứu từ khóa: DOA, Runway, A3, Gate 2, chi khẩn cấp..."
              className="w-full pl-10 pr-4 py-2 bg-slate-800/80 border border-slate-700/60 rounded-xl text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Xóa
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 border-t border-slate-800/80 overflow-x-auto py-2">
          <button
            onClick={() => setActiveTab('tab1')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'tab1'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
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
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
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
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Cổng Đầu Tư & Sơ Đồ Trực Quan</span>
          </button>
        </div>
      </div>
    </header>
  );
};
