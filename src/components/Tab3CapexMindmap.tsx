import React, { useState } from 'react';
import { capexGatesData, newProjectGatesData, scoringModelData } from '../data/financeData';
import { Layers, CheckCircle, Target, Award, Network } from 'lucide-react';
import { TermPopover } from './TermPopover';

interface Tab3Props {
  searchQuery: string;
  onNavigateTab?: (tabId: 'tab1' | 'tab2' | 'tab3' | 'tab4') => void;
  darkMode?: boolean;
}

export const Tab3CapexMindmap: React.FC<Tab3Props> = ({ searchQuery, onNavigateTab, darkMode = true }) => {
  const [selectedGate, setSelectedGate] = useState<number>(1);

  const activeCapexGate = capexGatesData.find((g) => g.gateNumber === selectedGate) || capexGatesData[0];

  return (
    <div className="space-y-8">
      {/* 4 CAPEX Investment Gates */}
      <div
        className={`rounded-2xl p-6 border shadow-xl space-y-6 transition-colors ${
          darkMode ? 'bg-slate-800/80 border-slate-700/80 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <div>
          <div className="flex items-center space-x-2">
            <Layers className="w-6 h-6 text-blue-500" />
            <h3 className="text-lg font-bold">
              Quy Trình 4 <TermPopover term="Investment Gate (Cổng đầu tư)" displayText="Cổng Đầu Tư CAPEX" onNavigateTab={onNavigateTab} darkMode={darkMode} /> (Investment Gates)
            </h3>
          </div>
          <p className={`text-xs mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            "<TermPopover term="Cổng đứng trước quyền" displayText="Cổng đứng trước quyền" onNavigateTab={onNavigateTab} darkMode={darkMode} />: Hạn mức DOA chỉ trả lời câu hỏi 'Ai được ký'. Cổng đầu tư trả lời câu hỏi đứng trước: 'Có nên đầu tư không?'". 
            Mọi khoản <TermPopover term="CAPEX – Capital Expenditure (Chi đầu tư tài sản)" displayText="CAPEX" onNavigateTab={onNavigateTab} darkMode={darkMode} /> (mua xe mới, phần mềm, hạ tầng lớn) bắt buộc phải vượt đủ 4 cổng trước khi trình tiền.
          </p>
        </div>

        {/* 4 Gates Grid Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {capexGatesData.map((gate) => {
            const isSelected = gate.gateNumber === selectedGate;
            return (
              <button
                key={gate.gateNumber}
                onClick={() => setSelectedGate(gate.gateNumber)}
                className={`p-4 rounded-xl border text-left transition-all relative ${
                  isSelected
                    ? 'bg-blue-600/30 border-blue-500 text-blue-400 font-bold ring-2 ring-blue-500/40 shadow-lg'
                    : darkMode
                    ? 'bg-slate-900/60 border-slate-700/70 text-slate-300 hover:border-slate-500'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-blue-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 border border-blue-500/20">
                    GATE {gate.gateNumber}
                  </span>
                  <span className={`text-[10px] font-mono ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{gate.englishName}</span>
                </div>
                <h4 className="text-sm font-bold truncate">{gate.name.split('–')[1]}</h4>
              </button>
            );
          })}
        </div>

        {/* Active Capex Gate Details */}
        <div className={`border rounded-xl p-5 space-y-4 ${darkMode ? 'bg-slate-900/90 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
          <div className={`flex flex-col md:flex-row md:items-center justify-between border-b pb-3 gap-2 ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
            <div>
              <span className="text-xs font-mono text-blue-500 font-bold block mb-1">CỔNG ĐẦU TƯ CỐ ĐỊNH</span>
              <h4 className="text-lg font-bold">{activeCapexGate.name} ({activeCapexGate.englishName})</h4>
            </div>
            <div className={`text-xs font-semibold px-3 py-1 border rounded-lg ${darkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-300 text-slate-800'}`}>
              Người phê duyệt kết luận: <strong className="text-amber-500">{activeCapexGate.approver}</strong>
            </div>
          </div>

          <p className={`text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{activeCapexGate.description}</p>

          <div className={`p-4 rounded-xl border space-y-2 ${darkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-white border-slate-200'}`}>
            <span className="text-xs font-bold text-blue-500 block">Tiêu chí kiểm soát bắt buộc:</span>
            <ul className="space-y-1.5">
              {activeCapexGate.keyCriteria.map((criterion, idx) => (
                <li key={idx} className={`text-xs flex items-start space-x-2 ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{criterion}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Gate 0 - 5 New Projects & Strategic Bets */}
      <div
        className={`rounded-2xl p-6 border shadow-xl space-y-6 transition-colors ${
          darkMode ? 'bg-slate-800/80 border-slate-700/80 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <div>
          <div className="flex items-center space-x-2">
            <Target className="w-6 h-6 text-emerald-500" />
            <h3 className="text-lg font-bold">
              Tiến Trình Cổng Giai Đoạn (Gate 0–5) Cho Dự Án Mới
            </h3>
          </div>
          <p className={`text-xs mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Đối với các dự án mới hoặc <TermPopover term="Strategic Bet Capital (Vốn Đặt Cược Chiến Lược)" displayText="Strategic Bet" onNavigateTab={onNavigateTab} darkMode={darkMode} />, vốn không được cấp 1 lần mà giải ngân từng phần nhỏ qua 6 Cổng giai đoạn
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {newProjectGatesData.map((gate) => (
            <div
              key={gate.gateNumber}
              className={`border rounded-xl p-4 space-y-2 ${
                darkMode ? 'bg-slate-900/70 border-slate-700/70 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  GIAI ĐOẠN {gate.gateNumber}
                </span>
              </div>
              <h4 className="text-sm font-bold">{gate.name}</h4>
              <p className={`text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{gate.description}</p>
              <div className={`pt-2 border-t text-[11px] font-medium text-amber-500 ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                Yêu cầu: {gate.requirements}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 80-Point Scoring Model & Mindmap Structure */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Scoring Model */}
        <div
          className={`rounded-2xl p-6 border shadow-xl space-y-4 transition-colors ${
            darkMode ? 'bg-slate-800/80 border-slate-700/80 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          <div className={`flex items-center space-x-3 border-b pb-3 ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
            <Award className="w-6 h-6 text-amber-500" />
            <div>
              <h4 className="text-base font-bold">Mô Hình Chấm Điểm Cấp Vốn (&gt;500 Triệu)</h4>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Dự án phải đạt ≥ 80 / 100 điểm mới đủ điều kiện cấp vốn</p>
            </div>
          </div>

          <div className="space-y-2.5">
            {scoringModelData.map((sc, idx) => (
              <div
                key={idx}
                className={`p-3 border rounded-xl flex items-center justify-between ${
                  darkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <span className="text-xs font-bold block">{sc.name}</span>
                  <span className={`text-[11px] ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{sc.description}</span>
                </div>
                <span className="text-xs font-mono font-extrabold text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20 shrink-0 ml-2">
                  {sc.weight}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Mindmap Hierarchy */}
        <div
          className={`rounded-2xl p-6 border shadow-xl space-y-4 transition-colors ${
            darkMode ? 'bg-slate-800/80 border-slate-700/80 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          <div className={`flex items-center space-x-3 border-b pb-3 ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
            <Network className="w-6 h-6 text-indigo-500" />
            <div>
              <h4 className="text-base font-bold">Sơ Đồ Cấu Trúc Bộ Quy Tắc Tài Chính</h4>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Phân tầng hiệu lực từ trên xuống dưới</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className={`p-4 rounded-xl space-y-1 border ${darkMode ? 'bg-indigo-900/30 border-indigo-500/40' : 'bg-indigo-50 border-indigo-200'}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-500">1. HIẾN PHÁP TÀI CHÍNH (Phần 1 - Chương I–VI)</span>
                <span className="text-[10px] bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 px-2 py-0.5 rounded">Cố định</span>
              </div>
              <p className={`text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Triết lý dòng tiền, 10 điều cấm, 7 quỹ, 5 mức cảnh báo, quyền dừng chi kill-switch. Chỉ TGĐ / HĐTV được sửa đổi.</p>
            </div>

            <div className={`p-4 rounded-xl space-y-1 border ${darkMode ? 'bg-blue-900/30 border-blue-500/40' : 'bg-blue-50 border-blue-200'}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-500">2. QUY ĐỊNH CHI TIẾT (Phần 2 - Chương VII–XIII)</span>
                <span className="text-[10px] bg-blue-500/10 text-blue-500 border border-blue-500/20 px-2 py-0.5 rounded">Rà soát 6 tháng</span>
              </div>
              <p className={`text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Cụ thể hóa bảng phân vai, ma trận DOA 6 cấp, chuỗi 6 mắt xích A1-Z3 để cấu hình ERP.</p>
            </div>

            <div className={`p-4 rounded-xl space-y-1 border ${darkMode ? 'bg-slate-900/80 border-slate-700' : 'bg-slate-100 border-slate-200'}`}>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>3. PHỤ LỤC & ĐỊNH MỨC ĐẦU KỲ</span>
                <span className="text-[10px] bg-slate-500/10 text-slate-500 border border-slate-500/20 px-2 py-0.5 rounded">Biến động</span>
              </div>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Bộ hạn mức - định mức chi tiết kỳ kế hoạch và mẫu biểu quy trình.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
