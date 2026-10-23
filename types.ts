
export interface User {
  uid: string;
  name: string;
  email: string;
  photoURL?: string;
  isPaid: boolean;
}

export interface Message {
  role: 'user' | 'assistant';
  text: string;
}

export interface UserStats {
  accumulatedTimeMs: number;
  isPaid: boolean;
  registrationDate?: string;
  currentUser?: User | null;
}

/** Language the interview is conducted in */
export type InterviewLanguage = 'my' | 'en';

export enum ConnectionStatus {
  IDLE = 'IDLE',
  CONNECTING = 'CONNECTING',
  ACTIVE = 'ACTIVE',
  ERROR = 'ERROR'
}
