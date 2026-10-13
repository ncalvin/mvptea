import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Plus, 
  Flame, 
  Filter, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  Sparkles,
  MapPin,
  UserCheck
} from 'lucide-react';
import { ABCEvent, Patient, BehaviorFunction } from '../../types/aba';

interface AbcLogManagerProps {
  patient: Patient;
  abcEvents: ABCEvent[];
  onOpenNewAbcModal: () => void;
}

export const AbcLogManager: React.FC<AbcLogManagerProps> = ({
  patient,
  abcEvents,
  onOpenNewAbcModal,
}) => {
  const [functionFilter, setFunctionFilter] = useState<string>('all');

  const filteredEvents = abcEvents.filter((ev) => {
    if (functionFilter === 'all') return true;
    return ev.function === functionFilter;
  });

  const getFunctionColor = (fn: BehaviorFunction) => {
    switch (fn) {
      case 'Fuga/Esquiva': return 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30';
      case 'Acesso a Tangível': return 'bg-amber-500/10 text-amber-300 border-amber-500/30';
      case 'Atenção Social': return 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30';
      case 'Sensorial/Automático': return 'bg-pink-500/10 text-pink-300 border-pink-500/30';
      default: return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Avaliação Funcional do Comportamento (FBA)
            </span>
            <span className="text-[10px] bg-rose-500/10 text-rose-300 px-2 py-0.5 rounded-full border border-rose-500/20 font-bold">
              {abcEvents.length} Eventos Registrados
            </span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight mt-1">
            Registro ABC & Manejo Comportamental
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Mapeamento sistemático de Antecedentes, Comportamentos e Consequências para extinção e ensino de respostas substitutivas.
          </p>
        </div>

        <button
          onClick={onOpenNewAbcModal}
          className="flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-rose-600/20 transition-all scale-100 hover:scale-[1.02]"
        >
          <Plus className="h-4 w-4" />
          <span>Registrar Ocorrência ABC</span>
        </button>
      </div>

      {/* Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
          <div className="text-[10px] uppercase font-bold text-slate-400">Total Ocorrências no Mês</div>
          <div className="text-2xl font-black text-white font-mono mt-1">{abcEvents.length}</div>
          <div className="text-[10px] text-emerald-400 mt-1">↓ 35% em relação ao mês anterior</div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
          <div className="text-[10px] uppercase font-bold text-slate-400">Função Mais Frequente</div>
          <div className="text-lg font-black text-indigo-400 mt-1">Fuga/Esquiva (45%)</div>
          <div className="text-[10px] text-slate-400 mt-1">Disparada por transições de demanda</div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
          <div className="text-[10px] uppercase font-bold text-slate-400">Duração Média de Crise</div>
          <div className="text-2xl font-black text-amber-400 font-mono mt-1">3.5 min</div>
          <div className="text-[10px] text-emerald-400 mt-1">Tempo de desescalada reduzido</div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
          <div className="text-[10px] uppercase font-bold text-slate-400">Nível de Intensidade Máx.</div>
          <div className="flex items-center gap-1 mt-1 text-rose-400">
            {[1, 2, 3, 4, 5].map((i) => (
              <Flame key={i} className={`h-4 w-4 ${i <= 4 ? 'fill-rose-500 text-rose-500' : 'text-slate-700'}`} />
            ))}
            <span className="text-xs font-mono font-bold ml-1">Grau 4/5</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Sem lesão / Protocolo cumprido</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-bold text-slate-400 mr-2 flex items-center gap-1">
          <Filter className="h-3.5 w-3.5" /> Filtrar:
        </span>
        {['all', 'Fuga/Esquiva', 'Acesso a Tangível', 'Atenção Social', 'Sensorial/Automático'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFunctionFilter(tab)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              functionFilter === tab
                ? 'bg-slate-800 text-white border-slate-600 shadow-sm'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            {tab === 'all' ? 'Todas as Funções' : tab}
          </button>
        ))}
      </div>

      {/* ABC Events Feed */}
      <div className="space-y-4">
        {filteredEvents.map((ev) => (
          <div
            key={ev.id}
            className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${getFunctionColor(ev.function)}`}>
                  Função: {ev.function}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <Clock className="h-3.5 w-3.5 text-slate-500" />
                  <span className="font-mono">{new Date(ev.timestamp).toLocaleDateString('pt-BR')} às {ev.timeString}</span>
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <MapPin className="h-3.5 w-3.5 text-slate-500" />
                  <span>{ev.environment}</span>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-xs">
                  <span className="text-slate-400 text-[10px] font-bold uppercase mr-1">Intensidade:</span>
                  {[1, 2, 3, 4, 5].map((lvl) => (
                    <Flame
                      key={lvl}
                      className={`h-3.5 w-3.5 ${
                        lvl <= ev.intensity ? 'fill-rose-500 text-rose-500' : 'text-slate-700'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[11px] font-mono font-bold bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-amber-300">
                  {ev.durationMinutes} min
                </span>
              </div>
            </div>

            {/* A - B - C Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="rounded-xl bg-slate-950/80 p-3.5 border border-slate-800/80">
                <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 mb-1 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-indigo-400" />
                  (A) Antecedente
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {ev.antecedent}
                </p>
              </div>

              <div className="rounded-xl bg-slate-950/80 p-3.5 border border-slate-800/80">
                <div className="text-[10px] font-bold uppercase tracking-wider text-rose-400 mb-1 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-rose-400" />
                  (B) Comportamento
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {ev.behavior}
                </p>
              </div>

              <div className="rounded-xl bg-slate-950/80 p-3.5 border border-slate-800/80">
                <div className="text-[10px] font-bold uppercase tracking-wider text-teal-400 mb-1 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-teal-400" />
                  (C) Consequência & Manejo
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {ev.consequence}
                </p>
              </div>
            </div>

            {ev.notes && (
              <div className="text-[11px] text-slate-400 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/50">
                <strong className="text-slate-300">Nota do Aplicador ({ev.therapistName}):</strong> {ev.notes}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
