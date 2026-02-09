
export enum AppState {
  IDLE = 'IDLE',
  SCANNING = 'SCANNING',
  REPORT = 'REPORT',
  CLEANING = 'CLEANING',
  RE_SCANNING = 'RE_SCANNING',
  FINISHED = 'FINISHED'
}

export interface DataCategory {
  id: string;
  label: string;
  sizeGb: number;
  explanation: string;
  impact: string;
  safety: 'safe' | 'optional' | 'risky';
  selected: boolean;
  aiInsight?: string;
}

export interface StorageStatus {
  totalGb: number;
  usedGb: number;
  reclaimableGb: number;
}
