import React, { useState } from 'react';
import { runwayLevelsData, reservesData, cutPrioritiesData } from '../data/financeData';
import { AlertTriangle, Shield, TrendingDown, Info, Lock, Flame } from 'lucide-react';

interface Tab1Props {
  searchQuery: string;
}

export const Tab1RunwayReserves: React.FC<Tab1Props> = ({ searchQuery }) => {
  const [weeks, setWeeks] = useState<number>(14);

  // Determine current runway status based on selected weeks
  const getCurrentLevel = (w: number) => {
    if (w >= 12) return runwayLevelsData[0]; // Green
    if (w >= 8) return runwayLevelsData[1];  // Yellow
    if (w >= 4) return runwayLevelsData[2];  // Orange
    if (w >= 2) return runwayLevelsData[3];  // Red
    return runwayLevelsData[4];              // Dark
  };

  const currentLevel = getCurrentLevel(weeks);

  // Filter items if search active
  const filteredReserves = reservesData.filter(
    (r) =>
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.rule.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Introduction Banner */}
      <div className="bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-slate-900 border border-blue-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/30">
            <Shield className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white mb-2">
              Hiến Pháp Dòng Tiền & 5 Mức Cảnh Báo Runway
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Triết lý cốt lõi của Hải Vân: <strong className="text-blue-300">"Dòng tiền là Oxy của hệ thống"</strong>. 
              Không một dự án chiến lược nào được phép làm tổn thương dòng tiền sống còn của doanh nghiệp. 
              Sức khỏe dòng tiền được đo bằng chỉ số Runway (số tuần hoạt động khả dụng), và thẩm quyền phê duyệt sẽ <strong className="text-yellow-300">tự động thu hẹp</strong> theo 5 mức cảnh báo.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Runway Simulator Meter */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center space-x-2">
              <Flame className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-bold text-white">Mô Phỏng Cảnh Báo Runway Tương Tác</h3>
            </div>
            <p className="text-xs text-slate-400">
              Kéo thanh trượt hoặc chọn số tuần Runway để xem sự thay đổi tự động của thẩm quyền phê duyệt & quy định chi tiêu
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-900 px-4 py-2 rounded-xl border border-slate-700">
            <span className="text-xs text-slate-400">Runway hiện tại:</span>
            <span className="text-xl font-extrabold text-blue-400">{weeks} tuần</span>
          </div>
        </div>

        {/* Range Slider */}
        <div className="space-y-4 mb-6">
          <input
            type="range"
            min="0"
            max="16"
            step="1"
            value={weeks}
            onChange={(e) => setWeeks(Number(e.target.value))}
            className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-xs text-slate-400 font-mono">
            <span>0w (ĐEN)</span>
            <span>2w (ĐỎ)</span>
            <span>4w (CAM)</span>
            <span>8w (VÀNG)</span>
            <span>12w (XANH)</span>
            <span>16w+</span>
          </div>
        </div>

        {/* Current Active Warning Card */}
        <div className={`p-6 rounded-xl border transition-all ${currentLevel.colorClass}`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-black">{currentLevel.name}</span>
              <span className="text-sm px-3 py-1 rounded-full bg-slate-900/60 font-semibold border border-current">
                Runway {currentLevel.runwayRange}
              </span>
            </div>
            <div className="text-xs font-bold uppercase tracking-wider px-3 py-1 bg-slate-900/80 rounded-md">
              Trạng thái: {currentLevel.statusText}
            </div>
          </div>

          <p className="text-sm text-slate-200 mb-4">{currentLevel.description}</p>

          <div className="space-y-3 bg-slate-900/70 p-4 rounded-xl border border-slate-700/60">
            <div className="flex items-start space-x-2">
              <Lock className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
              <div>
                <span className="text-xs font-bold text-amber-300">Tác động lên Thẩm quyền DOA: </span>
                <span className="text-xs text-slate-200">{currentLevel.doaImpact}</span>
              </div>
            </div>

            <div className="space-y-1 pt-2 border-t border-slate-800">
              <span className="text-xs font-bold text-slate-300">Hành động bắt buộc hệ thống:</span>
              <ul className="space-y-1">
                {currentLevel.mandatoryActions.map((action, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 7 Cash Reserves */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <Shield className="w-5 h-5 text-blue-400" />
            <span>Cấu Trúc 7 Quỹ Tiền Tối Thượng (Cash Reserves)</span>
          </h3>
          <p className="text-xs text-slate-400">
            Nguyên tắc trích lập bắt buộc tuân theo quy tắc <strong>"Không được tất tay"</strong>: Vận hành $\rightarrow$ Dự phòng $\rightarrow$ Đầu tư
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredReserves.map((res) => (
            <div
              key={res.id}
              className="bg-slate-800/60 border border-slate-700/70 rounded-xl p-5 hover:border-blue-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    Ưu tiên #{res.priority}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{res.category}</span>
                </div>
                <h4 className="text-base font-bold text-white mb-2">{res.name}</h4>
                <p className="text-xs text-slate-300 mb-4">{res.description}</p>
              </div>

              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                <span className="text-[11px] font-semibold text-amber-400 block mb-1">Luật quản lý:</span>
                <p className="text-[11px] text-slate-300 italic">{res.rule}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cost Cut Hierarchy */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center space-x-3 mb-4">
          <TrendingDown className="w-6 h-6 text-red-400" />
          <div>
            <h3 className="text-lg font-bold text-white">
              Thứ Tự Ưu Tiên Cắt Giảm Chi Phí Khi Thiếu Hụt Dòng Tiền
            </h3>
            <p className="text-xs text-slate-400">
              Khi dòng tiền bị suy giảm, các khoản chi bắt buộc phải lập và cắt giảm theo thứ tự ưu tiên tuyệt đối từ cao xuống thấp
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {cutPrioritiesData.map((item, index) => (
            <div
              key={index}
              className="p-3 bg-slate-900/70 border border-slate-800 rounded-xl flex items-center space-x-3"
            >
              <div
                className={`w-7 h-7 rounded-lg font-mono font-bold text-xs flex items-center justify-center shrink-0 ${
                  index < 3
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : index < 6
                    ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40'
                    : 'bg-red-500/20 text-red-400 border border-red-500/40'
                }`}
              >
                #{index + 1}
              </div>
              <span className="text-xs font-medium text-slate-200">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
