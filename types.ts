
export type ThreatLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export interface ThreatAnalysis {
  riskScore: number;
  threatLevel: ThreatLevel;
  confidenceLevel: number;
  category: string;
  linguisticManipulation: string[];
  psychologicalTriggers: string[];
  explanation: string;
  recommendation: string;
  indicators: string[];
  behavioralRiskIndex: number;
}

export interface AttackType {
  id: string;
  title: string;
  category: 'Phishing' | 'Messaging' | 'Psychological' | 'Corporate' | 'Emerging';
  description: string;
  detectionSigns: string[];
  preventionSteps: string[];
  difficulty: 'Basic' | 'Sophisticated' | 'Advanced';
  xp: number;
}

export interface UserState {
  level: number;
  xp: number;
  badges: string[];
  completedAttacks: string[];
  theme: 'cyber-dark' | 'glass-frost' | 'terminal' | 'pro-light';
}
