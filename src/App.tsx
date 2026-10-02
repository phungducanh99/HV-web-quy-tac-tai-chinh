import React, { useState } from 'react';
import { Header } from './components/Header';
import { Tab1RunwayReserves } from './components/Tab1RunwayReserves';
import { Tab2DOAWorkflow } from './components/Tab2DOAWorkflow';
import { Tab3CapexMindmap } from './components/Tab3CapexMindmap';

export function App() {
  const [activeTab, setActiveTab] = useState<'tab1' | 'tab2' | 'tab3'>('tab1');
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Header & Navbar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'tab1' && <Tab1RunwayReserves searchQuery={searchQuery} />}
        {activeTab === 'tab2' && <Tab2DOAWorkflow searchQuery={searchQuery} />}
        {activeTab === 'tab3' && <Tab3CapexMindmap searchQuery={searchQuery} />}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            © 2026 <strong>Công ty Liên doanh Vận chuyển Quốc tế Hải Vân</strong>. All rights reserved.
          </div>
          <div className="flex items-center space-x-4 font-mono">
            <span>Finance OS v1.0</span>
            <span>•</span>
            <span>Quy chế Tài chính 20260930</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
