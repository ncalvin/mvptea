import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Sparkles, 
  RotateCcw, 
  Volume2, 
  CheckCircle2, 
  TrendingUp, 
  Award, 
  Layers, 
  ArrowRight,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFeedback } from '../../utils/audioFeedback';

interface SimulatedTrial {
  id: string;
  promptType: string;
  promptLabel: string;
  weight: number;
  isIndependent: boolean;
  time: string;
}

const SAMPLE_EXEMPLARS = [
  {
    id: 'ex-1',
    program: 'Comunicação Funcional (Mando)',
    title: 'Pedir "Água" com apoio gestual / vocal',
    instruction: 'Operação Motivadora: Garrafa visível fora de alcance',
    sd: 'Mando Naturalístico (NET)',
  },
  {
    id: 'ex-2',
    program: 'Imitação Motora Grossa (VB-MAPP)',
    title: 'Imitar "Bater Palmas" ao comando',
    instruction: 'Apresentação de estímulo discriminativo claro',
    sd: '"Faz igual"',
  },
  {
    id: 'ex-3',
    program: 'Linguagem Receptiva',
    title: 'Apontar para o "Cachorro" em matriz de 3 itens',
    instruction: 'Matriz visual disposta sobre a mesa',
    sd: '"Mostra o cachorro"',
  },
];

const PROMPT_BUTTONS = [
  { code: 'IND', label: 'Independente (+)', key: '1', weight: 1.0, isInd: true, color: 'from-emerald-600 to-emerald-500', border: 'border-emerald-500/50', text: 'text-emerald-300' },
  { code: 'GP', label: 'Ajuda Gestual', key: '2', weight: 0.8, isInd: false, color: 'from-teal-600 to-teal-500', border: 'border-teal-500/50', text: 'text-teal-300' },
  { code: 'VP', label: 'Ajuda Verbal', key: '3', weight: 0.6, isInd: false, color: 'from-indigo-600 to-indigo-500', border: 'border-indigo-500/50', text: 'text-indigo-300' },
  { code: 'MP', label: 'Dica Modelo', key: '4', weight: 0.5, isInd: false, color: 'from-purple-600 to-purple-500', border: 'border-purple-500/50', text: 'text-purple-300' },
  { code: 'PP', label: 'Físico Parcial', key: '5', weight: 0.3, isInd: false, color: 'from-amber-600 to-amber-500', border: 'border-amber-500/50', text: 'text-amber-300' },
  { code: 'FP', label: 'Físico Total', key: '6', weight: 0.1, isInd: false, color: 'from-orange-600 to-orange-500', border: 'border-orange-500/50', text: 'text-orange-300' },
  { code: 'INC', label: 'Incorreto (-)', key: '8', weight: 0.0, isInd: false, color: 'from-rose-600 to-rose-500', border: 'border-rose-500/50', text: 'text-rose-300' },
];

export const InteractiveDttPlayground: React.FC<{ onOpenLiveApp: () => void; onOpenDemoModal: () => void }> = ({
  onOpenLiveApp,
  onOpenDemoModal,
}) => {
  const [selectedExemplar, setSelectedExemplar] = useState(SAMPLE_EXEMPLARS[0]);
  const [trials, setTrials] = useState<SimulatedTrial[]>([
    { id: '1', promptType: 'VP', promptLabel: 'Ajuda Verbal', weight: 0.6, isIndependent: false, time: '10:14:02' },
    { id: '2', promptType: 'GP', promptLabel: 'Ajuda Gestual', weight: 0.8, isIndependent: false, time: '10:14:15' },
    { id: '3', promptType: 'IND', promptLabel: 'Independente (+)', weight: 1.0, isIndependent: true, time: '10:14:28' },
    { id: '4', promptType: 'IND', promptLabel: 'Independente (+)', weight: 1.0, isIndependent: true, time: '10:14:41' },
  ]);

  const [lastPromptTapped, setLastPromptTapped] = useState<string | null>(null);

  // Calculate live stats
  const totalTrials = trials.length;
  const indTrials = trials.filter((t) => t.isIndependent).length;
  const indPercentage = totalTrials > 0 ? Math.round((indTrials / totalTrials) * 100) : 0;
  
  const totalWeightedScore = trials.reduce((acc, t) => acc + t.weight, 0);
  const wiiScore = totalTrials > 0 ? Math.round((totalWeightedScore / totalTrials) * 100) : 0;

  const handleRecordTrial = (btn: typeof PROMPT_BUTTONS[0]) => {
    // Play sound feedback
    soundFeedback.playPromptSound(btn.code as any);

    const newTrial: SimulatedTrial = {
      id: Math.random().toString(),
      promptType: btn.code,
      promptLabel: btn.label,
      weight: btn.weight,
      isIndependent: btn.isInd,
      time: new Date().toTimeString().split(' ')[0],
    };

    const nextTrials = [...trials, newTrial];
    setTrials(nextTrials);
    setLastPromptTapped(btn.code);

    // If reaching mastery in this demo, celebrate!
    const nextInd = nextTrials.filter((t) => t.isIndependent).length;
    const nextPct = Math.round((nextInd / nextTrials.length) * 100);
    if (nextPct >= 80 && nextTrials.length >= 6 && btn.isInd) {
      soundFeedback.playMasteryCelebration();
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 }
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleUndo = () => {
    if (trials.length > 0) {
      setTrials(trials.slice(0, -1));
    }
  };

  const handleReset = () => {
    setTrials([]);
  };

  return (
    <section id="coletor-demo" className="py-20 lg:py-28 relative bg-slate-900/60 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-950/80 border border-emerald-500/30 px-3.5 py-1 text-xs font-semibold text-emerald-300 mb-3">
            <Zap className="h-3.5 w-3.5 text-emerald-400" />
            <span>Simulador Interativo em Tempo Real</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Experimente a Coleta em Menos de 1 Segundo
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Clique nos botões abaixo ou pressione as teclas <span className="font-mono font-bold text-white bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">1</span> a <span className="font-mono font-bold text-white bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">8</span> para registrar tentativas DTT/NET e observe os gráficos e o índice WII calculados instantaneamente.
          </p>
        </div>

        {/* The Simulator Interactive Console */}
        <div className="max-w-4xl mx-auto rounded-3xl border border-slate-700/80 bg-slate-950 p-6 sm:p-8 shadow-2xl shadow-indigo-950/40 space-y-6">
          
          {/* Target Selector Tabs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-teal-400">
                Programa Selecionado: {selectedExemplar.program}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white">{selectedExemplar.title}</h3>
              <p className="text-xs text-slate-400 flex items-center gap-1.5">
                <Info className="h-3.5 w-3.5 text-slate-400" />
                Estímulo ($S^D$ / MO): <span className="text-slate-200 font-medium">{selectedExemplar.sd}</span>
              </p>
            </div>

            {/* Exemplar Switcher */}
            <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 self-stretch sm:self-auto">
              {SAMPLE_EXEMPLARS.map((ex, idx) => (
                <button
                  key={ex.id}
                  onClick={() => setSelectedExemplar(ex)}
                  className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedExemplar.id === ex.id
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Alvo #{idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Real-time Stats Header */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 font-medium block">Tentativas Coletadas</span>
              <strong className="text-xl sm:text-2xl font-black text-white">{totalTrials}</strong>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 font-medium block">Acerto Independente (IND%)</span>
              <strong className={`text-xl sm:text-2xl font-black ${indPercentage >= 80 ? 'text-emerald-400' : 'text-slate-200'}`}>
                {indPercentage}%
              </strong>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-center">
              <span className="text-[10px] text-teal-400 font-bold block flex items-center justify-center gap-1">
                <Sparkles className="h-3 w-3" /> Índice WII Ponderado
              </span>
              <strong className="text-xl sm:text-2xl font-black text-teal-300 font-mono">
                {wiiScore}%
              </strong>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 font-medium block">Status da Meta</span>
              <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                indPercentage >= 80 && totalTrials >= 5
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
              }`}>
                {indPercentage >= 80 && totalTrials >= 5 ? '🎯 Critério Atingido' : '📈 Em Aquisição'}
              </span>
            </div>
          </div>

          {/* Interactive Tap Buttons Grid (Hierarquia de Dicas) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span className="font-semibold text-slate-300">Selecione o Nível de Resposta ou Ajuda:</span>
              <span className="text-[11px]">Feedback sonoro ativado</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
              {PROMPT_BUTTONS.map((btn) => (
                <button
                  key={btn.code}
                  onClick={() => handleRecordTrial(btn)}
                  className={`relative p-3.5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border ${btn.border} hover:scale-105 active:scale-95 transition-all text-center flex flex-col items-center justify-between gap-1.5 shadow-md group ${
                    lastPromptTapped === btn.code ? 'ring-2 ring-indigo-400' : ''
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-mono text-[10px] font-bold text-slate-500 group-hover:text-slate-300">[{btn.key}]</span>
                    <span className="text-[9px] font-mono font-bold text-slate-400">{Math.round(btn.weight * 100)}%</span>
                  </div>
                  <span className={`text-sm font-black ${btn.text}`}>{btn.code}</span>
                  <span className="text-[10px] text-slate-300 font-medium truncate max-w-full">{btn.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Real-time Trial History Sequence */}
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-indigo-400" />
                Sequência de Tentativas da Sessão ({trials.length}):
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleUndo}
                  disabled={trials.length === 0}
                  className="text-[11px] text-slate-400 hover:text-slate-200 disabled:opacity-40 flex items-center gap-1"
                >
                  <RotateCcw className="h-3 w-3" /> Desfazer
                </button>
                <button
                  onClick={handleReset}
                  className="text-[11px] text-rose-400 hover:text-rose-300"
                >
                  Limpar
                </button>
              </div>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none min-h-[38px]">
              {trials.length === 0 ? (
                <span className="text-xs text-slate-500 italic">Nenhuma tentativa registrada ainda. Clique em um botão acima para começar!</span>
              ) : (
                trials.map((t, idx) => (
                  <span
                    key={t.id}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono font-bold whitespace-nowrap border animate-fadeIn ${
                      t.isIndependent
                        ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
                        : t.promptType === 'INC'
                        ? 'bg-rose-950/80 border-rose-500/40 text-rose-300'
                        : 'bg-indigo-950/80 border-indigo-500/40 text-indigo-300'
                    }`}
                  >
                    #{idx + 1}: {t.promptType}
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <p className="text-xs text-slate-400">
              💡 No tablet real, o aplicador registra 80 tentativas em uma sessão sem desviar os olhos da criança.
            </p>
            <button
              onClick={onOpenLiveApp}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-teal-500/20 transition-all hover:scale-105"
            >
              <span>Abrir Coletor Completo no App</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
