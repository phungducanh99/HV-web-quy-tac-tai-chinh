export interface ReserveItem {
  id: string;
  name: string;
  category: 'Vận hành (Sinh tồn)' | 'Dự phòng' | 'Đầu tư';
  description: string;
  rule: string;
  priority: number;
}

export interface RunwayLevel {
  id: string;
  color: 'green' | 'yellow' | 'orange' | 'red' | 'dark';
  colorClass: string;
  name: string;
  runwayRange: string;
  minWeeks: number;
  statusText: string;
  description: string;
  doaImpact: string;
  mandatoryActions: string[];
}

export interface ExecutionLink {
  code: 'A1' | 'A2' | 'A3' | 'Z1' | 'Z2' | 'Z3';
  name: string;
  type: 'Phê duyệt' | 'Thực thi';
  group: 'Approval (Phê duyệt)' | 'Authorization (Thực thi)';
  role: string;
  description: string;
  controls: string;
}

export interface DOALevel {
  level: number;
  role: string;
  limit: string;
  approvalScope: string;
  unbudgetedLimit: string;
}

export interface CapexGate {
  gateNumber: number;
  name: string;
  englishName: string;
  description: string;
  keyCriteria: string[];
  approver: string;
}

export interface NewProjectGate {
  gateNumber: number;
  name: string;
  description: string;
  requirements: string;
}

export interface ScoreCriterion {
  name: string;
  weight: string;
  description: string;
}
