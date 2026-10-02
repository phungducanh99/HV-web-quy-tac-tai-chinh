import React, { useState } from 'react';
import { capexGatesData, newProjectGatesData, scoringModelData } from '../data/financeData';
import { Layers, CheckCircle, Target, Award, Network, BookOpen, Layers3 } from 'lucide-react';

interface Tab3Props {
  searchQuery: string;
}

export const Tab3CapexMindmap: React.FC<Tab3Props> = ({ searchQuery }) => {
  const [selectedGate, setSelectedGate] = useState<number>(1);

  const activeCapexGate = capexGatesData.find((g) => g.gateNumber === selectedGate) || capexGatesData[0];

  return (
    <div className="space-y-8">
      {/* 4 CAPEX Investment Gates */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-6">
        <div>
          <div className="flex items-center space-x-2">
            <Layers className="w-6 h-6 text-blue-400" />
            <h3 className="text-lg font-bold text-white">
              Quy Trình 4 Cổng Đầu Tư CAPEX (Investment Gates)
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            "Hạn mức DOA chỉ trả lời câu hỏi 'Ai được ký'. Cổng đầu tư trả lời câu hỏi đứng trước: 'Có nên đầu tư không?'". 
            Mọi khoản CAPEX (mua xe mới, phần mềm, hạ tầng lớn) bắt buộc phải vượt đủ 4 cổng trước khi trình tiền.
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
                    ? 'bg-blue-600/30 border-blue-500 text-white ring-2 ring-blue-500/40 shadow-lg shadow-blue-500/20'
                    : 'bg-slate-900/60 border-slate-700/70 text-slate-300 hover:border-slate-500'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-blue-400">
                    GATE {gate.gateNumber}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{gate.englishName}</span>
                </div>
                <h4 className="text-sm font-bold truncate">{gate.name.split('–')[1]}</h4>
              </button>
            );
          })}
        </div>

        {/* Active Capex Gate Details */}
        <div className="bg-slate-900/90 border border-slate-700 rounded-xl p-5 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-3 gap-2">
            <div>
              <span className="text-xs font-mono text-blue-400 font-bold block mb-1">CỔNG ĐẦU TƯ CỐ ĐỊNH</span>
              <h4 className="text-lg font-bold text-white">{activeCapexGate.name} ({activeCapexGate.englishName})</h4>
            </div>
            <div className="text-xs font-semibold px-3 py-1 bg-slate-800 border border-slate-700 rounded-lg text-slate-300">
              Người phê duyệt kết luận: <strong className="text-amber-300">{activeCapexGate.approver}</strong>
            </div>
          </div>

          <p className="text-xs text-slate-300">{activeCapexGate.description}</p>

          <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/60 space-y-2">
            <span className="text-xs font-bold text-blue-300 block">Tiêu chí kiểm soát bắt buộc:</span>
            <ul className="space-y-1.5">
              {activeCapexGate.keyCriteria.map((criterion, idx) => (
                <li key={idx} className="text-xs text-slate-200 flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{criterion}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Gate 0 - 5 New Projects & Strategic Bets */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-6">
        <div>
          <div className="flex items-center space-x-2">
            <Target className="w-6 h-6 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">
              Tiến Trình Cổng Giai Đoạn (Gate 0–5) Cho Dự Án Mới
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Đối với các dự án mới hoặc Strategic Bet, vốn không được cấp 1 lần mà giải ngân từng phần nhỏ qua 6 Cổng giai đoạn
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {newProjectGatesData.map((gate) => (
            <div key={gate.gateNumber} className="bg-slate-900/70 border border-slate-700/70 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  GIAI ĐOẠN {gate.gateNumber}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white">{gate.name}</h4>
              <p className="text-xs text-slate-300">{gate.description}</p>
              <div className="pt-2 border-t border-slate-800 text-[11px] text-amber-300 font-medium">
                Yêu cầu: {gate.requirements}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 80-Point Scoring Model & Mindmap Structure */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Scoring Model */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center space-x-3 border-b border-slate-700 pb-3">
            <Award className="w-6 h-6 text-amber-400" />
            <div>
              <h4 className="text-base font-bold text-white">Mô Hình Chấm Điểm Cấp Vốn (&gt;500 Triệu)</h4>
              <p className="text-xs text-slate-400">Dự án phải đạt ≥ 80 / 100 điểm mới đủ điều kiện cấp vốn</p>
            </div>
          </div>

          <div className="space-y-2.5">
            {scoringModelData.map((sc, idx) => (
              <div key={idx} className="p-3 bg-slate-900/70 border border-slate-800 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-200 block">{sc.name}</span>
                  <span className="text-[11px] text-slate-400">{sc.description}</span>
                </div>
                <span className="text-xs font-mono font-extrabold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20 shrink-0 ml-2">
                  {sc.weight}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Mindmap Hierarchy */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center space-x-3 border-b border-slate-700 pb-3">
            <Network className="w-6 h-6 text-indigo-400" />
            <div>
              <h4 className="text-base font-bold text-white">Sơ Đồ Cấu Trúc Bộ Quy Tắc Tài Chính</h4>
              <p className="text-xs text-slate-400">Phân tầng hiệu lực từ trên xuống dưới</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-indigo-900/30 border border-indigo-500/40 rounded-xl space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-300">1. HIẾN PHÁP TÀI CHÍNH (Phần 1 - Chương I–VI)</span>
                <span className="text-[10px] bg-indigo-500/20 px-2 py-0.5 rounded text-indigo-300">Cố định</span>
              </div>
              <p className="text-xs text-slate-300">Triết lý dòng tiền, 10 điều cấm, 7 quỹ, 5 mức cảnh báo, quyền dừng chi kill-switch. Chỉ TGĐ / HĐTV được sửa đổi.</p>
            </div>

            <div className="p-4 bg-blue-900/30 border border-blue-500/40 rounded-xl space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-300">2. QUY ĐỊNH CHI TIẾT (Phần 2 - Chương VII–XIII)</span>
                <span className="text-[10px] bg-blue-500/20 px-2 py-0.5 rounded text-blue-300">Rà soát 6 tháng</span>
              </div>
              <p className="text-xs text-slate-300">Cụ thể hóa bảng phân vai, ma trận DOA 6 cấp, chuỗi 6 mắt xích A1-Z3 để cấu hình ERP.</p>
            </div>

            <div className="p-4 bg-slate-900/80 border border-slate-700 rounded-xl space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">3. PHỤ LỤC & ĐỊNH MỨC ĐẦU KỲ</span>
                <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">Biến động</span>
              </div>
              <p className="text-xs text-slate-400">Bộ hạn mức - định mức chi tiết kỳ kế hoạch và mẫu biểu quy trình.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
