import React, { useState } from 'react';
import { executionLinksData, doaLevelsData } from '../data/financeData';
import { GitCommit, ShieldCheck, AlertCircle, FileCheck, CheckCircle2, Lock } from 'lucide-react';
import { TermPopover } from './TermPopover';

interface Tab2Props {
  searchQuery: string;
  onNavigateTab?: (tabId: 'tab1' | 'tab2' | 'tab3' | 'tab4') => void;
  darkMode?: boolean;
}

export const Tab2DOAWorkflow: React.FC<Tab2Props> = ({ searchQuery, onNavigateTab, darkMode = true }) => {
  const [selectedLink, setSelectedLink] = useState<string>('A1');
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<number | 'all'>('all');

  const activeLinkDetail = executionLinksData.find((l) => l.code === selectedLink) || executionLinksData[0];

  const filteredDOA = doaLevelsData.filter((doa) => {
    const matchesSearch =
      doa.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doa.limit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doa.approvalScope.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = selectedLevelFilter === 'all' || doa.level === selectedLevelFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      {/* Interactive 6-step Execution Workflow */}
      <div
        className={`rounded-2xl p-6 border shadow-xl space-y-6 transition-colors ${
          darkMode ? 'bg-slate-800/80 border-slate-700/80 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <div>
          <div className="flex items-center space-x-2">
            <GitCommit className="w-6 h-6 text-blue-500" />
            <h3 className="text-lg font-bold">
              <TermPopover term="Chuỗi sáu mắt xích A1–Z3" displayText="Chuỗi 6 Mắt Xích Phê Duyệt – Thực Thi Khoản Chi" onNavigateTab={onNavigateTab} darkMode={darkMode} />
            </h3>
          </div>
          <p className={`text-xs mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            "Phê duyệt khác Thực thi". Việc TGĐ duyệt chủ trương không có nghĩa cấp dưới tự ý ký hợp đồng hay rút tiền. Mỗi khoản chi phải đi qua đúng 6 mắt xích trên ERP.
          </p>
        </div>

        {/* Workflow Diagram Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
          {executionLinksData.map((link) => {
            const isSelected = link.code === selectedLink;
            const isApproval = link.type === 'Phê duyệt';
            return (
              <button
                key={link.code}
                onClick={() => setSelectedLink(link.code)}
                className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
                  isSelected
                    ? 'bg-blue-600/30 border-blue-500 text-blue-400 font-bold ring-2 ring-blue-500/40 shadow-lg'
                    : darkMode
                    ? 'bg-slate-900/60 border-slate-700/70 text-slate-300 hover:border-slate-500'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-blue-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono font-extrabold text-sm px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 border border-blue-500/20">
                    {link.code}
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                      isApproval ? 'bg-amber-500/20 text-amber-500' : 'bg-emerald-500/20 text-emerald-500'
                    }`}
                  >
                    {link.type}
                  </span>
                </div>
                <div className="text-xs font-bold truncate mt-1">{link.name.split('(')[0]}</div>
              </button>
            );
          })}
        </div>

        {/* Selected Link Detail Card */}
        <div className={`border rounded-xl p-5 space-y-4 ${darkMode ? 'bg-slate-900/90 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
          <div className={`flex flex-col md:flex-row md:items-center justify-between border-b pb-3 gap-2 ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
            <div>
              <div className="flex items-center space-x-3">
                <span className="text-xl font-mono font-bold text-blue-500">{activeLinkDetail.code}</span>
                <span className="text-lg font-bold">{activeLinkDetail.name}</span>
              </div>
              <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{activeLinkDetail.group}</span>
            </div>
            <div className={`text-xs font-semibold px-3 py-1 border rounded-lg ${darkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-300 text-slate-800'}`}>
              Người đảm nhiệm: <strong className="text-blue-500">{activeLinkDetail.role}</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-3 rounded-lg border ${darkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-white border-slate-200'}`}>
              <span className={`text-xs font-bold block mb-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Nội dung thực hiện:</span>
              <p className={`text-xs ${darkMode ? 'text-slate-200' : 'text-slate-600'}`}>{activeLinkDetail.description}</p>
            </div>
            <div className={`p-3 rounded-lg border ${darkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-white border-slate-200'}`}>
              <span className="text-xs font-bold text-amber-500 block mb-1">Điểm kiểm soát tuân thủ:</span>
              <p className={`text-xs ${darkMode ? 'text-slate-200' : 'text-slate-600'}`}>{activeLinkDetail.controls}</p>
            </div>
          </div>
        </div>

        {/* Segregation of Duties Highlight */}
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-600 dark:text-amber-200 space-y-1">
            <strong className="block font-bold text-amber-500">
              Nguyên Tắc <TermPopover term="Segregation of Duties – SoD (Phân tách nhiệm vụ)" displayText="Phân Tách Nhiệm Vụ (SoD)" onNavigateTab={onNavigateTab} darkMode={darkMode} /> (Khoản chi &gt; 5 triệu):
            </strong>
            <p>
              Một cá nhân <strong>không được nắm quá 2 mắt xích liền kề</strong> của cùng một khoản chi. 
              Người chọn nhà cung cấp (A3) tuyệt đối không đồng thời là người nghiệm thu; Người duyệt thanh toán (Z2) không được tự lập lệnh giải ngân (Z3).
            </p>
          </div>
        </div>
      </div>

      {/* Interactive DOA Lookup Table */}
      <div
        className={`rounded-2xl p-6 border shadow-xl space-y-6 transition-colors ${
          darkMode ? 'bg-slate-800/80 border-slate-700/80 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-6 h-6 text-emerald-500" />
              <h3 className="text-lg font-bold">
                Khung Phân Quyền Tài Chính (<TermPopover term="Financial DOA (Ma trận phân quyền tài chính)" displayText="Financial DOA 6 Cấp" onNavigateTab={onNavigateTab} darkMode={darkMode} />)
              </h3>
            </div>
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Hạn mức thẩm quyền phê duyệt dựa trên vai trò và quy mô số tiền chi tiêu
            </p>
          </div>

          {/* Level Filter */}
          <div className="flex items-center space-x-2">
            <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Lọc theo cấp:</span>
            <select
              value={selectedLevelFilter}
              onChange={(e) => setSelectedLevelFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className={`border text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-slate-100 border-slate-300 text-slate-800'
              }`}
            >
              <option value="all">Tất cả 6 cấp</option>
              <option value={1}>Cấp 1 (Trưởng BP)</option>
              <option value={2}>Cấp 2 (GĐ SBU / TP HO)</option>
              <option value={3}>Cấp 3 (TP TCKT / Kế toán trưởng)</option>
              <option value={4}>Cấp 4 (PTGĐ Khối / TCCL)</option>
              <option value={5}>Cấp 5 (Tổng Giám đốc)</option>
              <option value={6}>Cấp 6 (HĐTV / Chủ sở hữu)</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`border-b text-xs font-semibold uppercase ${darkMode ? 'bg-slate-900/60 border-slate-700 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
                <th className="py-3 px-4">Cấp & Vai trò</th>
                <th className="py-3 px-4">Hạn mức phê duyệt</th>
                <th className="py-3 px-4">Phạm vi phê duyệt chi tiết</th>
                <th className="py-3 px-4">Quy định Ngoài ngân sách</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50 text-xs">
              {filteredDOA.map((doa) => (
                <tr key={doa.level} className={`transition-colors ${darkMode ? 'hover:bg-slate-700/30' : 'hover:bg-slate-50'}`}>
                  <td className="py-3.5 px-4 font-bold whitespace-nowrap">
                    <span className="px-2 py-1 bg-blue-500/10 text-blue-500 rounded-md border border-blue-500/20 mr-2 font-mono">
                      Cấp {doa.level}
                    </span>
                    {doa.role.split(':')[1]}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-500 whitespace-nowrap">{doa.limit}</td>
                  <td className={`py-3.5 px-4 max-w-xs ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{doa.approvalScope}</td>
                  <td className="py-3.5 px-4 text-amber-500 font-mono max-w-xs">{doa.unbudgetedLimit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Emergency Approval & Delegation Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Emergency Approval Card */}
        <div
          className={`rounded-2xl p-6 border shadow-xl space-y-4 transition-colors ${
            darkMode ? 'bg-slate-800/80 border-slate-700/80 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          <div className={`flex items-center space-x-3 border-b pb-3 ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
            <FileCheck className="w-6 h-6 text-red-500" />
            <div>
              <h4 className="text-base font-bold">
                Quy Trình <TermPopover term="Emergency Approval (Phê duyệt khẩn cấp)" displayText="Chi Khẩn Cấp (Emergency)" onNavigateTab={onNavigateTab} darkMode={darkMode} />
              </h4>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Áp dụng sự cố tai nạn (E1), thiên tai (E2), khủng hoảng truyền thông (E3)</p>
            </div>
          </div>

          <ul className={`space-y-3 text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Cho phép duyệt nhanh qua Mobile/Email/Zalo lưu vết để xử lý sự cố kịp thời.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Trong <strong>24 giờ</strong>: Người chi phải lập Phiếu phê duyệt khẩn cấp gửi hệ thống.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Trong <strong>5 ngày làm việc</strong>: Bổ sung đủ chứng từ và trình cấp thẩm quyền duyệt bù.</span>
            </li>
            <li className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 font-semibold">
              ⚠️ Cảnh báo: Quá hạn 5 ngày chưa bổ sung thủ tục, toàn bộ khoản chi khẩn cấp sẽ tự động chuyển thành NỢ CÁ NHÂN của người đề xuất.
            </li>
          </ul>
        </div>

        {/* Delegation Rules Card */}
        <div
          className={`rounded-2xl p-6 border shadow-xl space-y-4 transition-colors ${
            darkMode ? 'bg-slate-800/80 border-slate-700/80 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          <div className={`flex items-center space-x-3 border-b pb-3 ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
            <Lock className="w-6 h-6 text-blue-500" />
            <div>
              <h4 className="text-base font-bold">Kỷ Luật Ủy Quyền Tài Chính (Delegation)</h4>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Điều kiện có hiệu lực nội bộ</p>
            </div>
          </div>

          <ul className={`space-y-3 text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            <li className="flex items-start space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
              <span>Bắt buộc phải đăng ký vào <TermPopover term="Delegation Register (Sổ đăng ký ủy quyền)" displayText="Sổ đăng ký ủy quyền (Delegation Register)" onNavigateTab={onNavigateTab} darkMode={darkMode} /> trên ERP.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
              <span>Người được ủy quyền <strong>tuyệt đối không được tái ủy quyền</strong> cho người khác.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
              <span>Thời hạn ủy quyền vắng mặt tối đa 30 ngày; ủy quyền thường xuyên tối đa 12 tháng.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
              <span>Cấm ủy quyền phê duyệt khoản chi mà mình là người đề xuất hoặc người thụ hưởng.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
