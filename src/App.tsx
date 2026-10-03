import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Tab1RunwayReserves } from './components/Tab1RunwayReserves';
import { Tab2DOAWorkflow } from './components/Tab2DOAWorkflow';
import { Tab3CapexMindmap } from './components/Tab3CapexMindmap';
import { Tab4Glossary } from './components/Tab4Glossary';

export function App() {
  const [activeTab, setActiveTab] = useState<'tab1' | 'tab2' | 'tab3' | 'tab4'>('tab1');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem('hvo_theme');
      return savedTheme ? savedTheme === 'dark' : true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('hvo_theme', darkMode ? 'dark' : 'light');
    } catch (e) {
      console.error(e);
    }
  }, [darkMode]);

  const handleNavigateTab = (tabId: 'tab1' | 'tab2' | 'tab3' | 'tab4') => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors ${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Header & Navbar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'tab1' && <Tab1RunwayReserves searchQuery={searchQuery} onNavigateTab={handleNavigateTab} darkMode={darkMode} />}
        {activeTab === 'tab2' && <Tab2DOAWorkflow searchQuery={searchQuery} onNavigateTab={handleNavigateTab} darkMode={darkMode} />}
        {activeTab === 'tab3' && <Tab3CapexMindmap searchQuery={searchQuery} onNavigateTab={handleNavigateTab} darkMode={darkMode} />}
        {activeTab === 'tab4' && <Tab4Glossary searchQuery={searchQuery} onNavigateTab={handleNavigateTab} darkMode={darkMode} />}
      </main>

      {/* Footer */}
      <footer className={`border-t py-6 mt-12 transition-colors ${darkMode ? 'bg-slate-950 border-slate-800/80 text-slate-400' : 'bg-white border-slate-200 text-slate-600'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-xs gap-4">
          <div>
            © 2026 <strong>Công ty Liên doanh Vận chuyển Quốc tế Hải Vân</strong>. All rights reserved.
          </div>
          <div className="flex items-center space-x-4 font-mono">
            <span>Finance OS v2.0</span>
            <span>•</span>
            <span>Quy chế Tài chính 20260930</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
