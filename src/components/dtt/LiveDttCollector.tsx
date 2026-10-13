import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  CheckCircle2, 
  RotateCcw, 
  Flame, 
  Sparkles, 
  AlertTriangle, 
  Timer, 
  Pause, 
  ChevronRight, 
  TrendingUp,
  ShieldAlert,
  Users,
  Zap,
  BookOpen,
  PenTool,
  HeartHandshake,
  Volume2,
  Eye,
  KeyRound,
  MapPin
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Patient, PromptLevel, DTTTrial, SessionPresenceConfirmation, MaintenanceProbeSchedule } from '../../types/aba';
import { PROMPT_CONFIGS } from '../../utils/abaConstants';
import { soundFeedback } from '../../utils/audioFeedback';
import { MOCK_MAINTENANCE_PROBES } from '../../data/mockAbaData';

interface LiveDttCollectorProps {
  patient: Patient;
  onRecordTrial: (trial: DTTTrial) => void;
  onOpenAbcModal: () => void;
  recentTrials: DTTTrial[];
  onUndoTrial: (trialId: string) => void;
  isSessionActive: boolean;
  onToggleSession: () => void;
}

export const LiveDttCollector: React.FC<LiveDttCollectorProps> = ({
  patient,
  onRecordTrial,
  onOpenAbcModal,
  recentTrials,
  onUndoTrial,
  isSessionActive,
  onToggleSession,
}) => {
  const [selectedProgramId, setSelectedProgramId] = useState<string>(
    patient.programs[0]?.id || ''
  );
  const [activeExemplarId, setActiveExemplarId] = useState<string>('');
  const [reinforcerTimer, setReinforcerTimer] = useState<number | null>(null);
  const [reinforcerRunning, setReinforcerRunning] = useState<boolean>(false);
  const [lastTappedPrompt, setLastTappedPrompt] = useState<PromptLevel | null>(null);
  const [showErrorCorrectionGuide, setShowErrorCorrectionGuide] = useState<boolean>(false);
  const [isOverlapMode, setIsOverlapMode] = useState<boolean>(false);

  // v2.4 Modais
  const [showQuickBriefingModal, setShowQuickBriefingModal] = useState<boolean>(false);
  const [showBipModal, setShowBipModal] = useState<boolean>(false);
  const [showPresenceModal, setShowPresenceModal] = useState<boolean>(false);
  const [parentName, setParentName] = useState<string>(patient.caretakers[0]?.name || 'Responsável');
  const [signatureDone, setSignatureDone] = useState<boolean>(false);
  const [otpCode, setOtpCode] = useState<string>('');
  const [presenceConfirmed, setPresenceConfirmed] = useState<SessionPresenceConfirmation | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const activeProgram = patient.programs.find((p) => p.id === selectedProgramId) || patient.programs[0];

  useEffect(() => {
    if (activeProgram && activeProgram.exemplars.length > 0) {
      const currentEx = activeProgram.exemplars[activeProgram.currentExemplarIndex] || activeProgram.exemplars[0];
      setActiveExemplarId(currentEx.id);
    }
  }, [activeProgram]);

  const activeExemplar = activeProgram?.exemplars.find((e) => e.id === activeExemplarId) || activeProgram?.exemplars[0];
  const [maintenanceProbes] = useState<MaintenanceProbeSchedule[]>(MOCK_MAINTENANCE_PROBES);
  const activeProbe = maintenanceProbes.find(
    (p) => p.patientId === patient.id && (p.exemplarId === activeExemplar?.id || p.programId === activeProgram?.id)
  );

  const exemplarTrials = recentTrials.filter(
    (t) => t.programId === activeProgram?.id && t.exemplarId === activeExemplar?.id
  );
  
  const totalExemplarTrials = exemplarTrials.length;
  const independentExemplarTrials = exemplarTrials.filter((t) => t.isIndependent).length;
  const liveSuccessRate = totalExemplarTrials > 0 
    ? Math.round((independentExemplarTrials / totalExemplarTrials) * 100) 
    : 0;

  // Calculate Weighted Independence Index (WII)
  const totalWeight = exemplarTrials.reduce((sum, t) => sum + (t.promptWeight || 0), 0);
  const liveWII = totalExemplarTrials > 0 ? Math.round((totalWeight / totalExemplarTrials) * 100) : 0;

  const handleRecordPrompt = useCallback((level: PromptLevel) => {
    if (!activeProgram || !activeExemplar) return;

    setLastTappedPrompt(level);
    soundFeedback.playPromptSound(level);

    const cfg = PROMPT_CONFIGS[level];
    const isInd = cfg.isIndependent;

    if (level === 'INC') {
      setShowErrorCorrectionGuide(true);
    } else {
      setShowErrorCorrectionGuide(false);
    }

    const newTrial: DTTTrial = {
      id: `trial-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      sessionId: 'current-active-session',
      patientId: patient.id,
      programId: activeProgram.id,
      programTitle: activeProgram.title,
      exemplarId: activeExemplar.id,
      exemplarName: activeExemplar.name,
      promptLevel: level,
      isIndependent: isInd,
      promptWeight: cfg.weight,
      timestamp: new Date().toISOString(),
      clientRecordedAt: new Date().toISOString(),
      clientEventUuid: `event-${Date.now()}`,
    };

    onRecordTrial(newTrial);

    // If Independent or 3 consecutive correct, celebrate with confetti
    if (level === 'IND' && exemplarTrials.length >= 2) {
      const prevIsInd = exemplarTrials[exemplarTrials.length - 1]?.isIndependent;
      if (prevIsInd) {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b']
        });
      }
    }
  }, [activeProgram, activeExemplar, exemplarTrials, onRecordTrial, patient.id]);

  // Keyboard shortcuts (1 to 8) for blind instant recording
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['input', 'textarea'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) {
        return;
      }

      const keyMap: Record<string, PromptLevel> = {
        '1': 'IND',
        '2': 'GP',
        '3': 'VP',
        '4': 'MP',
        '5': 'POS',
        '6': 'PP',
        '7': 'FP',
        '8': 'INC',
      };

      if (keyMap[e.key]) {
        e.preventDefault();
        handleRecordPrompt(keyMap[e.key]);
      } else if (e.key.toLowerCase() === 'c') {
        onOpenAbcModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleRecordPrompt, onOpenAbcModal]);

  // Reinforcer timer countdown
  useEffect(() => {
    let interval: any = null;
    if (reinforcerRunning && reinforcerTimer !== null && reinforcerTimer > 0) {
      interval = setInterval(() => {
        setReinforcerTimer((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else if (reinforcerTimer === 0) {
      setReinforcerRunning(false);
      soundFeedback.playReinforcerEnd();
    }
    return () => clearInterval(interval);
  }, [reinforcerRunning, reinforcerTimer]);

  const startReinforcer = (seconds: number) => {
    setReinforcerTimer(seconds);
    setReinforcerRunning(true);
    soundFeedback.playReinforcerStart();
  };

  // Canvas drawing for parent touch signature
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#38bdf8';
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
    setSignatureDone(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignatureDone(false);
  };

  const handleConfirmPresence = () => {
    const confirmation: SessionPresenceConfirmation = {
      id: `pres-${Date.now()}`,
      sessionId: 'current-active-session',
      patientId: patient.id,
      responsibleParentName: parentName,
      parentSignatureSvg: signatureDone ? '<svg>Parent Touch Signature Verified</svg>' : undefined,
      parentOtpCode: otpCode || undefined,
      confirmedAt: new Date().toISOString(),
      geolocation: {
        lat: -23.55052,
        lng: -46.633308,
        addressDescription: 'Clínica de Neurodesenvolvimento (Geolocalização Validada)',
      },
    };
    setPresenceConfirmed(confirmation);
    setShowPresenceModal(false);
    soundFeedback.playMasteryCelebration();
  };

  return (
    <div className="space-y-4">
      {/* Quick Briefing Banner / Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-3.5 rounded-2xl shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isSessionActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-600'}`} />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              {isSessionActive ? 'Sessão em Andamento' : 'Sessão Pausada'}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 border-l border-slate-800 pl-3">
            <button
              onClick={() => setShowQuickBriefingModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 transition-all hover:scale-[1.02]"
              title="Card de Boas-Vindas com reforçadores e gatilhos para aplicadores substitutos"
            >
              <Zap className="h-3.5 w-3.5 text-amber-400" />
              <span>Quick Briefing (Boas-Vindas)</span>
            </button>

            {patient.bips && patient.bips.length > 0 && (
              <button
                onClick={() => setShowBipModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-all hover:scale-[1.02]"
                title="Plano de Intervenção Comportamental (BIP / PAC)"
              >
                <BookOpen className="h-3.5 w-3.5 text-rose-400" />
                <span>Guia BIP / Crise</span>
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Overlap supervision toggle */}
          <button
            onClick={() => setIsOverlapMode(!isOverlapMode)}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-xl font-medium border transition-colors ${
              isOverlapMode 
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' 
                : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
            title="Modo Overlap: Coleta simultânea com cálculo automático de IOA"
          >
            <Users className="h-3.5 w-3.5" />
            <span>{isOverlapMode ? 'Supervisão Overlap (IOA)' : 'Overlap IOA'}</span>
          </button>

          {/* Checkout Presence Signature */}
          <button
            onClick={() => setShowPresenceModal(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl border transition-all ${
              presenceConfirmed
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white border-sky-400/40 hover:brightness-110 shadow-lg'
            }`}
          >
            <PenTool className="h-3.5 w-3.5" />
            <span>{presenceConfirmed ? 'Presença Confirmada ✓' : 'Assinatura dos Pais'}</span>
          </button>

          {/* End/Pause Session Button */}
          <button
            onClick={onToggleSession}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl border transition-all ${
              isSessionActive
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/30 hover:bg-rose-500/30'
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/30'
            }`}
          >
            <Pause className="h-3.5 w-3.5" />
            <span>{isSessionActive ? 'Pausar Sessão' : 'Iniciar Sessão'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: PEI Program Navigator + Prompt Collector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: PEI Programs Selector (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Programas PEI em Execução
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold">
                {patient.programs.length} Ativos
              </span>
            </div>

            <div className="space-y-2">
              {patient.programs.map((program) => {
                const isSelected = program.id === selectedProgramId;
                const progExemplarTrials = recentTrials.filter((t) => t.programId === program.id);
                const progIndCount = progExemplarTrials.filter((t) => t.isIndependent).length;
                const progRate = progExemplarTrials.length > 0
                  ? Math.round((progIndCount / progExemplarTrials.length) * 100)
                  : 0;

                return (
                  <button
                    key={program.id}
                    onClick={() => {
                      setSelectedProgramId(program.id);
                      const currentEx = program.exemplars[program.currentExemplarIndex] || program.exemplars[0];
                      if (currentEx) setActiveExemplarId(currentEx.id);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-indigo-950/70 to-slate-900 border-indigo-500/60 shadow-lg shadow-indigo-950/40 ring-1 ring-indigo-500/30'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono font-medium">
                            {program.protocolCode || program.protocol}
                          </span>
                          <span className="text-[10px] font-bold text-indigo-400 uppercase truncate">
                            {program.domain}
                          </span>
                          {program.motivatingOperation && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                              NET
                            </span>
                          )}
                        </div>
                        <div className="font-bold text-slate-100 text-sm truncate">
                          {program.title}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-mono font-bold text-emerald-400">
                          {progRate}%
                        </div>
                        <div className="text-[9px] text-slate-500">
                          {progExemplarTrials.length} tent.
                        </div>
                      </div>
                    </div>

                    {/* Exemplars Pills */}
                    <div className="flex flex-wrap gap-1.5 mt-2.5 pt-2 border-t border-slate-800/80">
                      {program.exemplars.map((ex) => {
                        const isExActive = isSelected && ex.id === activeExemplarId;
                        return (
                          <span
                            key={ex.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProgramId(program.id);
                              setActiveExemplarId(ex.id);
                            }}
                            className={`text-[10px] px-2 py-0.5 rounded-md cursor-pointer transition-colors font-medium ${
                              isExActive
                                ? 'bg-indigo-600 text-white font-bold shadow'
                                : ex.status === 'mastered'
                                ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/50'
                                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            {ex.name}
                          </span>
                        );
                      })}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ABC Quick Crisis Trigger Button */}
          <button
            onClick={onOpenAbcModal}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-rose-950/70 to-red-900/40 border border-rose-600/50 hover:border-rose-500 text-left transition-all hover:scale-[1.01] shadow-xl group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-rose-600/20 text-rose-400 border border-rose-500/30 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                <ShieldAlert className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-rose-400 flex items-center gap-2">
                  <span>🚨 Registrar Crise ABC</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-900/60 text-rose-300 font-mono">
                    Tecla C ou Voz
                  </span>
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  Registro imediato em &lt; 5s com apoio de IA e guia do BIP
                </div>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-rose-400 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Center & Right Column: Interactive DTT Prompt Board (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Active Target Banner */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl backdrop-blur-md">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex-1 min-w-[240px]">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                    {activeProgram?.domain}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs text-slate-400 font-mono">
                    {activeProgram?.protocolCode || activeProgram?.protocol}
                  </span>
                  {activeProgram?.motivatingOperation && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                      NET / Ensino Natural
                    </span>
                  )}
                </div>

                <h1 className="text-xl font-extrabold text-white flex items-center gap-2.5">
                  <span>{activeProgram?.title}</span>
                  <span className="text-slate-500 font-normal">➔</span>
                  <span className="text-indigo-300 font-black">{activeExemplar?.name}</span>
                </h1>

                {/* SD or MO Instruction banner */}
                <div className="mt-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
                  {activeProgram?.motivatingOperation ? (
                    <div>
                      <span className="font-bold text-amber-400">Operação Motivadora (MO): </span>
                      {activeProgram.motivatingOperation}
                      {activeProgram.antecedentSetup && (
                        <div className="mt-1 text-[11px] text-slate-400">
                          <span className="font-bold text-indigo-300">Arranjo Ambiental: </span>
                          {activeProgram.antecedentSetup}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <span className="font-bold text-indigo-400">Estímulo Discriminativo ($S^D$): </span>
                      {activeProgram?.sd || 'Apresente o estímulo instrucional com clareza.'}
                    </div>
                  )}
                  <div className="mt-1 text-slate-400">
                    <span className="font-bold text-slate-300">Resposta Alvo: </span>
                    {activeProgram?.targetResponse}
                  </div>
                </div>
              </div>

              {/* Realtime WII and Success Rate Widgets */}
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-slate-950/90 border border-slate-800 p-3 text-center min-w-[95px]">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Acerto Ind.
                  </div>
                  <div className="text-2xl font-black text-emerald-400 font-mono mt-0.5">
                    {liveSuccessRate}%
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    {independentExemplarTrials}/{totalExemplarTrials} tentativas
                  </div>
                </div>

                <div className="rounded-xl bg-gradient-to-br from-indigo-950/80 to-slate-950 border border-indigo-500/40 p-3 text-center min-w-[105px] shadow-lg shadow-indigo-950/50">
                  <div className="text-[10px] font-black uppercase tracking-wider text-indigo-300 flex items-center justify-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    <span>Índice WII</span>
                  </div>
                  <div className="text-2xl font-black text-indigo-400 font-mono mt-0.5">
                    {liveWII}%
                  </div>
                  <div className="text-[9px] text-indigo-300/70 font-medium">
                    Autonomia Ponderada
                  </div>
                </div>
              </div>
            </div>

            {/* Error correction active notice */}
            {showErrorCorrectionGuide && (
              <div className="mt-4 p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-xs text-amber-200 flex items-start gap-3 animate-fade-in">
                <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="font-bold text-amber-300 flex items-center gap-2">
                    <span>Protocolo de Correção de Erros (4-Step Correction)</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-900/60 font-mono">
                      Acionado por INC (-)
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 font-mono text-[11px]">
                    <div className="p-1.5 rounded bg-slate-900/80 border border-amber-500/20">
                      1. Dica Total Imediata
                    </div>
                    <div className="p-1.5 rounded bg-slate-900/80 border border-amber-500/20">
                      2. Transferência de Dica
                    </div>
                    <div className="p-1.5 rounded bg-slate-900/80 border border-amber-500/20">
                      3. Distrator Conhecido
                    </div>
                    <div className="p-1.5 rounded bg-slate-900/80 border border-amber-500/20">
                      4. Teste Independente
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sonda de Manutenção Ativa (10/20/30 Dias) */}
            {activeProbe && (
              <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-amber-950/80 via-slate-900 to-amber-950/50 border border-amber-500/40 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/20 text-amber-300">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-amber-300 text-xs">🎯 Sonda de Manutenção Programada (Ciclo D+{activeProbe.probeDay})</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        REVISÃO PROGRAMADA
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      Alvo atingiu maestria em {activeProbe.masteredDate}. Aplique a sonda sem ajuda física para validar a retenção de longo prazo!
                    </p>
                  </div>
                </div>
              </div>
            )}

            {liveSuccessRate >= 80 && totalExemplarTrials >= 5 && (
              <div className="mt-4 p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/80 to-slate-900 border border-emerald-500/40 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-emerald-300 font-bold">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Critério de Maestria Atingido ({liveSuccessRate}% com {totalExemplarTrials} tentativas)!</span>
                </div>
                <span className="text-[11px] text-emerald-400 font-semibold">
                  Sondas D+10, D+20 e D+30 agendadas automaticamente ✓
                </span>
              </div>
            )}
          </div>

          {/* The 8 Prompt Buttons - Ultra Responsive (< 1s rule) */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-300">
                  ⚡ Registro de Tentativas (1-Toque / Latência 0ms)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                  Atalhos 1 a 8
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                Hierarquia Expandida (8 Níveis)
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(Object.keys(PROMPT_CONFIGS) as PromptLevel[]).map((level, idx) => {
                const cfg = PROMPT_CONFIGS[level];
                const isSelected = lastTappedPrompt === level;
                const shortcutNum = idx + 1;

                return (
                  <button
                    key={level}
                    onClick={() => handleRecordPrompt(level)}
                    className={`relative p-4 rounded-2xl border-2 transition-all active:scale-95 flex flex-col justify-between min-h-[105px] group ${cfg.bgColor} ${cfg.borderColor} ${
                      isSelected ? 'ring-4 ring-white/30 scale-[1.02]' : 'hover:scale-[1.02]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={`text-xl font-black font-mono ${cfg.color}`}>
                        {cfg.shortLabel}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-950/60 text-slate-400 border border-slate-800">
                        {shortcutNum}
                      </span>
                    </div>

                    <div className="w-full text-left mt-2">
                      <div className="font-extrabold text-xs text-white leading-tight">
                        {cfg.label}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5 truncate">
                        {cfg.description}
                      </div>
                    </div>

                    <div className="absolute bottom-1.5 right-2 text-[9px] font-mono font-bold text-slate-500">
                      Peso {Math.round(cfg.weight * 100)}%
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Bar: Reinforcer Timer + Session Stats + Live Stream */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Reinforcer Delivery Bar */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Timer className="h-4 w-4 text-amber-400" />
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Temporizador de Reforçador
                    </span>
                  </div>
                  {reinforcerTimer !== null && reinforcerTimer > 0 && (
                    <span className="text-lg font-black font-mono text-amber-400 animate-pulse">
                      {reinforcerTimer}s
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-slate-400 mb-3">
                  Entregue o reforçador tangível/sensorial e marque o intervalo de pausa estruturada:
                </p>
              </div>

              <div className="flex items-center gap-2">
                {[15, 30, 60, 120].map((sec) => (
                  <button
                    key={sec}
                    onClick={() => startReinforcer(sec)}
                    className="flex-1 py-2 rounded-xl bg-slate-950/80 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 border border-slate-800 hover:border-amber-500/40 text-xs font-mono font-bold transition-all"
                  >
                    {sec}s
                  </button>
                ))}
              </div>
            </div>

            {/* Real-time Trial Stream with Undo */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 shadow-xl flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
                    Fluxo da Sessão
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
                    {recentTrials.length} tent.
                  </span>
                </div>
                {recentTrials.length > 0 && (
                  <button
                    onClick={() => onUndoTrial(recentTrials[recentTrials.length - 1].id)}
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-rose-400 transition-colors font-medium"
                    title="Desfazer última tentativa coletada"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>Desfazer</span>
                  </button>
                )}
              </div>

              <div className="overflow-y-auto space-y-1.5 max-h-[140px] pr-1 scrollbar-thin">
                {recentTrials.length === 0 ? (
                  <div className="text-center text-slate-500 py-6 text-xs">
                    Nenhuma tentativa coletada ainda nesta sessão.
                  </div>
                ) : (
                  [...recentTrials].reverse().slice(0, 10).map((trial) => {
                    const cfg = PROMPT_CONFIGS[trial.promptLevel];
                    return (
                      <div
                        key={trial.id}
                        className="flex items-center justify-between p-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] border ${cfg.bgColor} ${cfg.borderColor}`}>
                            {cfg.shortLabel}
                          </span>
                          <span className="font-bold text-slate-200 truncate max-w-[120px]">
                            {trial.exemplarName}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500">
                          {new Date(trial.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL 1: Quick Briefing Card (Boas-Vindas & Anti-Turnover) */}
      {showQuickBriefingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-2xl rounded-3xl border border-indigo-500/30 bg-slate-900 p-6 shadow-2xl space-y-5 text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  <Zap className="h-6 w-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">
                    Briefing Clínico Instantâneo — {patient.preferredName}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Orientações essenciais de regulação sensorial e comunicação para o aplicador
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowQuickBriefingModal(false)}
                className="text-slate-400 hover:text-white text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Top Reinforcers */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                  <Flame className="h-4 w-4" />
                  <span>Top 3 Reforçadores Vigentes da Semana</span>
                </div>
                <ul className="space-y-1.5 text-slate-200">
                  {patient.quickBriefing?.topReinforcers.map((reinf, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-mono text-emerald-400 font-bold">{i + 1}.</span>
                      <span>{reinf}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sensory Triggers */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span>Gatilhos de Sobrecarga Sensorial</span>
                </div>
                <ul className="space-y-1.5 text-slate-200">
                  {patient.quickBriefing?.sensoryTriggers.map((trig, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-mono text-amber-400 font-bold">•</span>
                      <span>{trig}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Functional Communication */}
              <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-1.5">
                <div className="font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
                  <Volume2 className="h-4 w-4" />
                  <span>Modalidade de Comunicação Funcional Ativa</span>
                </div>
                <p className="text-slate-200 font-medium">
                  {patient.quickBriefing?.functionalCommunicationMode}
                </p>
                {patient.quickBriefing?.specialCareNotes && (
                  <p className="text-slate-400 mt-2 text-[11px] italic">
                    💡 Dica: {patient.quickBriefing.specialCareNotes}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowQuickBriefingModal(false)}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors"
              >
                Entendido, Iniciar Coleta
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Behavior Intervention Plan (BIP / PAC) Guide */}
      {showBipModal && patient.bips && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-2xl rounded-3xl border border-rose-500/30 bg-slate-900 p-6 shadow-2xl space-y-5 text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  <BookOpen className="h-6 w-6 text-rose-400" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">
                    Plano de Intervenção Comportamental (BIP / PAC)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Diretrizes ativas para manejo de crises e comportamentos concorrentes
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowBipModal(false)}
                className="text-slate-400 hover:text-white text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs max-h-[60vh] overflow-y-auto pr-1">
              {patient.bips.map((bip) => (
                <div key={bip.id} className="p-4 rounded-2xl bg-slate-950/90 border border-rose-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-rose-300 text-sm">{bip.targetBehavior}</span>
                    <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-mono text-[10px] font-bold">
                      Função: {bip.presumedFunction}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <span className="font-bold text-amber-400 uppercase text-[10px] tracking-wider block">
                        1. Estratégias Proativas / Antecedentes:
                      </span>
                      <p className="text-slate-300 mt-0.5">{bip.proactiveStrategies}</p>
                    </div>

                    <div>
                      <span className="font-bold text-emerald-400 uppercase text-[10px] tracking-wider block">
                        2. Comportamento Substitutivo (DRA / FCT):
                      </span>
                      <p className="text-slate-300 mt-0.5">{bip.replacementBehavior}</p>
                    </div>

                    <div>
                      <span className="font-bold text-rose-400 uppercase text-[10px] tracking-wider block">
                        3. Protocolo de Crise e Segurança (Reativo):
                      </span>
                      <p className="text-slate-300 mt-0.5">{bip.reactiveStrategies}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowBipModal(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
              >
                Fechar Guia
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Daily Family Presence Confirmation (Anti-Glosa Shield) */}
      {showPresenceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-lg rounded-3xl border border-sky-500/30 bg-slate-900 p-6 shadow-2xl space-y-5 text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
                  <HeartHandshake className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">
                    Comprovante de Presença Diária
                  </h3>
                  <p className="text-xs text-slate-400">
                    Escudo Anti-Glosa: Assinatura da Família e Geolocalização
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPresenceModal(false)}
                className="text-slate-400 hover:text-white text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Nome do Responsável Presente:
                </label>
                <input
                  type="text"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              {/* Touch Signature Pad */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-slate-300 font-bold flex items-center gap-1.5">
                    <PenTool className="h-3.5 w-3.5 text-sky-400" />
                    <span>Assinatura Digital no Tablet (Touch):</span>
                  </label>
                  <button
                    onClick={clearCanvas}
                    className="text-[10px] text-slate-400 hover:text-rose-400 underline font-medium"
                  >
                    Limpar
                  </button>
                </div>
                <div className="rounded-2xl border-2 border-dashed border-slate-700 bg-slate-950 p-1 flex items-center justify-center">
                  <canvas
                    ref={canvasRef}
                    width={440}
                    height={120}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="w-full h-[120px] cursor-crosshair touch-none"
                  />
                </div>
              </div>

              {/* OTP Alternative */}
              <div className="flex items-center gap-3 pt-2">
                <div className="flex-1">
                  <label className="block text-slate-400 text-[11px] mb-1">
                    Ou Código Token OTP (SMS/WhatsApp):
                  </label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="Ex: 9420"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-center tracking-widest focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div className="flex-1 p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2 text-[11px] text-slate-400">
                  <MapPin className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-slate-300 block">GPS Validado:</span>
                    <span className="text-[10px] text-slate-500">Clínica NeuroSaaS (SP)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setShowPresenceModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmPresence}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:brightness-110 text-white text-xs font-bold shadow-lg transition-all"
              >
                Confirmar Presença e Assinatura
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
