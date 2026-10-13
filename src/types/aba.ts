export type PromptLevel = 'IND' | 'GP' | 'VP' | 'MP' | 'POS' | 'PP' | 'FP' | 'INC';

export type TargetStatus = 'baseline' | 'acquisition' | 'mastered' | 'on_hold' | 'generalization';

export type ProtocolType = 'VB-MAPP' | 'ABLLS-R' | 'PEAK' | 'Vineland-3' | 'AFLS' | 'Customizado';

export type MeasurementType = 
  | 'dtt_discrete_trial' 
  | 'frequency_rate' 
  | 'duration_latency' 
  | 'interval_pir' 
  | 'interval_wir' 
  | 'interval_mts' 
  | 'task_analysis';

export type BehaviorFunction = 'Fuga/Esquiva' | 'Acesso a Tangível' | 'Atenção Social' | 'Sensorial/Automático';

export interface PromptConfig {
  code: PromptLevel;
  label: string;
  shortLabel: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
  isIndependent: boolean;
  weight: number; // 0.0 to 1.0 for WII calculation
}

export interface TargetExemplar {
  id: string;
  name: string;
  status: TargetStatus;
  trialsCount: number;
  successRate: number;
  weightedIndependenceIndex?: number;
  stepOrder?: number; // For Task Analysis chaining
  lastTrainedDate?: string;
  masteredDate?: string;
}

export interface ProgramPEI {
  id: string;
  title: string;
  domain: 'Mando (Comunicação)' | 'Tato (Nomeação)' | 'Ecoico (Vocal)' | 'Intraverbal' | 'Imitação Motora' | 'Habilidades Sociais' | 'Autonomia (AVD)' | 'Pré-Acadêmico' | 'Comportamento';
  protocol: ProtocolType;
  protocolCode: string;
  measurementType: MeasurementType;
  sd?: string; // Estímulo Discriminativo (Instrução) - Opcional para NET/Mando
  motivatingOperation?: string; // Antecedente para Mandos espontâneos (NET)
  antecedentSetup?: string; // Disposição ambiental / materiais
  targetResponse: string; // Resposta Comportamental Alvo
  masteryCriteria: string; // Ex: 80% independentes em 3 sessões consecutivas
  errorCorrectionStrategy?: '4_step_correction' | 'backstep' | 'errorless_immediate';
  status: TargetStatus;
  exemplars: TargetExemplar[];
  currentExemplarIndex: number;
  consecutiveSuccessSessions: number;
  requiredConsecutiveSessions: number;
  masteryPercentageThreshold: number;
  version?: number; // OCC (Optimistic Concurrency Control)
  notes?: string;
}

export interface BehaviorInterventionPlan {
  id: string;
  patientId: string;
  targetBehavior: string; // ex: "Autoagressão (bater na cabeça)"
  presumedFunction: BehaviorFunction;
  proactiveStrategies: string; // Estratégias preventivas / adaptação ambiental
  replacementBehavior: string; // DRA / DRI / FCT (Comunicação Funcional)
  reactiveStrategies: string; // Protocolo de crise / segurança
  isActive: boolean;
  version?: number;
}

export interface QuickBriefingCard {
  topReinforcers: string[]; // Top 3 reforçadores vigentes da semana
  sensoryTriggers: string[]; // Gatilhos de sobrecarga sensorial
  functionalCommunicationMode: string; // ex: PECS Fase III, Fala oral, Tablet CAA
  specialCareNotes?: string;
}

export interface DTTTrial {
  id: string;
  sessionId: string;
  patientId: string;
  programId: string;
  programTitle: string;
  exemplarId: string;
  exemplarName: string;
  promptLevel: PromptLevel;
  isIndependent: boolean;
  promptWeight: number;
  timestamp: string;
  clientEventUuid?: string;
  clientRecordedAt?: string;
  latencySeconds?: number;
  notes?: string;
}

export interface BehavioralMeasurement {
  id: string;
  sessionId: string;
  patientId: string;
  programId: string;
  measurementType: MeasurementType;
  intervalIndex?: number;
  intervalLengthSeconds?: number;
  occurred?: boolean;
  frequencyCount?: number;
  durationSeconds?: number;
  timestamp: string;
}

export interface TaskAnalysisTrial {
  id: string;
  sessionId: string;
  patientId: string;
  exemplarId: string;
  stepName: string;
  stepOrder: number;
  promptLevel: PromptLevel;
  isIndependent: boolean;
  timestamp: string;
}

export interface ABCEvent {
  id: string;
  patientId: string;
  sessionId?: string;
  bipId?: string;
  timestamp: string;
  timeString: string;
  antecedent: string;
  behavior: string;
  consequence: string;
  function: BehaviorFunction;
  intensity: 1 | 2 | 3 | 4 | 5;
  durationMinutes: number;
  environment: string;
  therapistName: string;
  speechToTextRaw?: string;
  notes?: string;
}

export interface SessionPresenceConfirmation {
  id: string;
  sessionId: string;
  patientId: string;
  responsibleParentName: string;
  parentSignatureSvg?: string;
  parentOtpCode?: string;
  confirmedAt: string;
  geolocation?: {
    lat: number;
    lng: number;
    addressDescription?: string;
  };
}

export interface ClinicalSession {
  id: string;
  patientId: string;
  date: string;
  startTime: string;
  endTime: string;
  therapistName: string;
  therapistRole: 'RBT' | 'BCBA' | 'Fonoaudiólogo' | 'Terapeuta Ocupacional' | 'Psicólogo' | 'AT Escolar';
  supervisorName?: string;
  isOverlapSupervision?: boolean;
  ioaPercentage?: number;
  environment: 'Clínica' | 'Domiciliar (Home Care)' | 'Escola' | 'Ambiente Natural (NET)';
  status: 'active' | 'completed' | 'draft';
  trials: DTTTrial[];
  abcEvents: ABCEvent[];
  presenceConfirmation?: SessionPresenceConfirmation;
  generalNotes: string;
  calculatedIndependenceRate?: number;
  calculatedWii?: number;
}

export interface Patient {
  id: string;
  name: string;
  preferredName: string;
  birthDate: string;
  ageYears: number;
  ageMonths: number;
  avatar: string;
  diagnosis: string;
  cidCode: string; // ex: CID-11 6A02 / F84.0
  insurancePlan: string;
  insuranceCardNumber: string;
  authorizedHoursWeek: number;
  completedHoursThisMonth: number;
  responsibleBCBA: string;
  responsibleCouncil: string; // ex: CRP 06/112450
  primaryTherapist: string;
  caretakers: {
    name: string;
    relation: string;
    phone: string;
    email: string;
  }[];
  quickBriefing?: QuickBriefingCard;
  bips?: BehaviorInterventionPlan[];
  programs: ProgramPEI[];
  currentSessionId?: string;
  activeStatus: 'Em Atendimento' | 'Em Avaliação' | 'Pausa Terapêutica';
  masteredTargetsCount: number;
  acquisitionTargetsCount: number;
  baselineTargetsCount: number;
  // Campos de Liminar Judicial e Reembolso
  billingMode?: 'tiss_network' | 'assisted_reimbursement' | 'judicial_injunction_rn539';
  courtProcessNumber?: string;
}

export interface VbMappMilestone {
  code: string;
  domain: string;
  level: 1 | 2 | 3;
  description: string;
  score: 0 | 0.5 | 1;
  assessedDate?: string;
}

// ==========================================
// 1. Centro de Protocolos Padronizados
// ==========================================
export type StandardProtocolType = 
  | 'VB-MAPP' 
  | 'ABLLS-R' 
  | 'Denver-ESDM' 
  | 'M-CHAT-R/F' 
  | 'CARS-2' 
  | 'Socially-Savvy';

export interface ProtocolScoreItem {
  id: string;
  code: string;
  title: string;
  domain: string;
  level?: number;
  score: number;
  maxScore: number;
  notes?: string;
  recommendedPeiTarget?: {
    domain: ProgramPEI['domain'];
    targetResponse: string;
    sd: string;
    exemplars: string[];
  };
}

export interface AssessmentProtocol {
  id: string;
  patientId: string;
  protocolType: StandardProtocolType;
  assessedDate: string;
  assessorName: string;
  assessorCouncil: string;
  totalScore: number;
  maxPossibleScore: number;
  percentageScore: number;
  status: 'completed' | 'in_progress';
  riskClassification?: 'Baixo Risco' | 'Risco Moderado' | 'Alto Risco' | 'Severo' | 'Leve/Moderado';
  items: ProtocolScoreItem[];
  interpretationSummary: string;
  radarScores?: { domain: string; score: number; maxScore: number }[];
}

// ==========================================
// 2. Agenda Multidisciplinar & Salas Sensoriais
// ==========================================
export interface SensoryRoom {
  id: string;
  name: string;
  type: 'sensory_integration' | 'dtt_individual' | 'denver_net' | 'speech_aac' | 'social_daily_living';
  capacity: number;
  equipment: string[];
  status: 'available' | 'occupied' | 'maintenance';
}

export interface RoomScheduleItem {
  id: string;
  patientId: string;
  patientName: string;
  therapistId: string;
  therapistName: string;
  therapistRole: string;
  roomId: string;
  roomName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'canceled' | 'missed';
  isBlockBooking?: boolean;
  blockTherapiesSequence?: string[];
  notes?: string;
  whatsappReminderSent?: boolean;
}

// ==========================================
// 3. Prontuário Multidisciplinar SOAP
// ==========================================
export interface MultidisciplinarySoapNote {
  id: string;
  patientId: string;
  therapistId: string;
  therapistName: string;
  therapistSpecialty: 'Fonoaudiologia' | 'Terapia Ocupacional' | 'Psicologia' | 'Psicopedagogia' | 'Fisioterapia' | 'ABA/Comportamental';
  councilNumber: string;
  date: string;
  time: string;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  sensoryDietNotes?: string;
  aacFunctionalNotes?: string;
  sharedGoals: string[];
  digitalSignatureStamp?: string;
}

// ==========================================
// 4. Central Financeira, Repasse & Glosas RN 539
// ==========================================
export interface TherapistPayable {
  id: string;
  therapistId: string;
  therapistName: string;
  specialty: string;
  councilNumber: string;
  period: string;
  ratePerHour: number;
  validatedHoursCount: number;
  completedSessionsCount: number;
  totalAmount: number;
  paymentStatus: 'pending' | 'approved' | 'paid';
  pixKey?: string;
}

export interface ClaimGlosa {
  id: string;
  invoiceId: string;
  healthPlanName: string;
  guideNumber: string;
  patientName: string;
  procedureTuss: string;
  billedAmount: number;
  glosaAmount: number;
  glosaCode: string;
  glosaReasonDescription: string;
  status: 'pendente' | 'em_recurso' | 'recurso_deferido' | 'glosa_mantida';
  rn539LegalBasisSummary: string;
  appealGeneratedDate?: string;
}

// ==========================================
// 5. Portal da Família & AT Escolar
// ==========================================
export interface FamilyMilestonePost {
  id: string;
  patientId: string;
  date: string;
  title: string;
  description: string;
  category: 'conquista_clinica' | 'comunicacao' | 'autonomia' | 'orientacao_pais';
  likesCount: number;
  photos?: string[];
  therapistName: string;
}

export interface HomeGeneralizationLog {
  id: string;
  patientId: string;
  date: string;
  recordedByParent: string;
  skillTargetTrained: string;
  contextDescription: string;
  promptNeeded: 'Nenhuma (Independente)' | 'Dica Leve' | 'Dica Total';
  reinforcerUsed: string;
  success: boolean;
}

export interface SchoolAtLogEntry {
  id: string;
  patientId: string;
  atTherapistName: string;
  date: string;
  schoolName: string;
  gradeClass: string;
  seatEngagementMinutes: number;
  peerSocialInteractionsCount: number;
  sensoryOverloadTriggers: string[];
  curricularAdaptationNotes: string;
  generalObservations: string;
}

// ==========================================
// 6. Motor de Manutenção 10/20/30 Dias
// ==========================================
export interface MaintenanceProbeSchedule {
  id: string;
  patientId: string;
  programId: string;
  exemplarId: string;
  exemplarName: string;
  masteredDate: string;
  probeDay: 10 | 20 | 30;
  scheduledDate: string;
  status: 'pending' | 'tested_passed' | 'tested_relapsed';
  resultSuccessRate?: number;
}

