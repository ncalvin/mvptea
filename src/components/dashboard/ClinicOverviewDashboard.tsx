import React, { useState } from 'react';
import { 
  Users, 
  Activity, 
  Award, 
  ShieldCheck, 
  AlertTriangle, 
  ArrowUpRight, 
  Play, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  Sparkles, 
  ChevronRight, 
  TrendingUp,
  Flame,
  RotateCcw,
  Zap,
  Check
} from 'lucide-react';
import { Patient, ClinicalSession } from '../../types/aba';
import { MOCK_HISTORICAL_SESSIONS } from '../../data/mockAbaData';

interface ClinicOverviewDashboardProps {
  patients: Patient[];
  onSelectPatient: (patient: Patient) => void;
  onGoToLiveDtt: (patient: Patient) => void;
  onGoToReports: () => void;
}

export const ClinicOverviewDashboard: React.FC<ClinicOverviewDashboardProps> = ({
  patients,
  onSelectPatient,
  onGoToLiveDtt,
  onGoToReports,
}) => {
  const [rescheduledAlert, setRescheduledAlert] = useState(false);
  const totalMasteredTargets = patients.reduce((acc, p) => acc + p.masteredTargetsCount, 0);
  const totalAcquisitionTargets = patients.reduce((acc, p) => acc + p.acquisitionTargetsCount, 0);

  const handleAutoReschedule = () => {
    setRescheduledAlert(true);
    setTimeout(() => setRescheduledAlert(false), 3500);
  };

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6 max-w-7xl mx-auto w-full">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-6 lg:p-8 shadow-2xl">
        <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute right-20 -bottom-10 h-48 w-48 rounded-full bg-teal-500/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Sistema Clínico Conectado • 100% Em Conformidade ANS
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Painel de Gestão e Inteligência ABA
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Monitore coletas DTT em tempo real, acompanhe a evolução dos PEIs, controle o burn-rate de horas autorizadas e garanta conformidade anti-glosa com relatórios automáticos.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onGoToLiveDtt(patients[0])}
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-emerald-500/25 transition-all scale-100 hover:scale-[1.02]"
            >
              <Play className="h-4 w-4 fill-slate-950" />
              <span>Iniciar Coleta DTT</span>
            </button>
            <button
              onClick={onGoToReports}
              className="flex items-center gap-2 px-4 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs rounded-xl transition-colors"
            >
              <ShieldCheck className="h-4 w-4 text-indigo-400" />
              <span>Relatórios Convênio</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
            <span>Pacientes Ativos</span>
            <Users className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="text-3xl font-black text-white font-mono mt-2">{patients.length}</div>
          <div className="text-[11px] text-slate-400 mt-1">
            60h semanais autorizadas no total
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
            <span>Taxa Média de Independência</span>
            <Activity className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400 font-mono mt-2">78.4%</div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1">
            <TrendingUp className="h-3.5 w-3.5" /> +14% no WII este mês
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
            <span>Alvos Dominados (Mês)</span>
            <Award className="h-4 w-4 text-teal-400" />
          </div>
          <div className="text-3xl font-black text-teal-400 font-mono mt-2">{totalMasteredTargets}</div>
          <div className="text-[11px] text-slate-400 mt-1">
            {totalAcquisitionTargets} alvos em aquisição ativa
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
            <span>Taxa Anti-Glosa Auditada</span>
            <ShieldCheck className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="text-3xl font-black text-white font-mono mt-2">100%</div>
          <div className="text-[11px] text-indigo-400 mt-1">
            100% presenças diárias assinadas
          </div>
        </div>
      </div>

      {/* Burn-Rate Monitor (Gestão Proativa de Horas & Reposição de Cancelamentos) */}
      <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-amber-400" />
              <h2 className="text-sm font-black text-white uppercase tracking-wider">
                Monitor de Burn-Rate de Horas Autorizadas (Mês Vigente)
              </h2>
            </div>
            <p className="text-xs text-slate-300">
              Controle proativo para evitar perda de faturamento e corte de horas pelo convênio na reavaliação
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleAutoReschedule}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-colors"
            >
              {rescheduledAlert ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <RotateCcw className="h-3.5 w-3.5" />}
              <span>{rescheduledAlert ? 'Reposições Agendadas!' : 'Agendar Reposições Automáticas'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-800">
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="text-[10px] font-bold uppercase text-slate-400">Horas Autorizadas (Mês)</div>
            <div className="text-2xl font-black text-white font-mono mt-0.5">80h</div>
            <div className="text-[10px] text-slate-500 mt-1">Guia Unimed / 20h semanais</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="text-[10px] font-bold uppercase text-slate-400">Horas Executadas & Assinadas</div>
            <div className="text-2xl font-black text-emerald-400 font-mono mt-0.5">64h (80%)</div>
            <div className="text-[10px] text-emerald-400 mt-1">✓ No ritmo esperado do mês</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="text-[10px] font-bold uppercase text-slate-400">Saldo a Executar (7 Dias Restantes)</div>
            <div className="text-2xl font-black text-amber-400 font-mono mt-0.5">16h</div>
            <div className="text-[10px] text-amber-300 mt-1">2 sessões de reforço sugeridas</div>
          </div>
        </div>
      </div>

      {/* Clinical Supervision Alerts & Stagnation Detection */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-950/20 p-5 shadow-xl">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-sm font-black text-white">
                Alerta de Supervisão Clínica: 1 Alvo com Estagnação Detectada
              </h2>
              <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                Ação do BCBA Necessária
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              O alvo <strong>"Tato 5M - Leão"</strong> do aprendiz <strong>Lucas Mendes</strong> registrou 5 sessões consecutivas com taxa de resposta &lt; 65% sem tendência ascendente. Sugerido: revisar hierarquia de dicas (Errorless Teaching) ou substituir o estímulo por exemplar tridimensional.
            </p>
          </div>
        </div>
      </div>

      {/* Active Patients Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-white">Aprendizes em Atendimento</h2>
            <p className="text-xs text-slate-400">Selecione um paciente para ver o prontuário ou iniciar coleta imediata</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {patients.map((pat) => (
            <div
              key={pat.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl hover:border-indigo-500/40 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={pat.avatar}
                      alt={pat.name}
                      className="h-12 w-12 rounded-xl object-cover ring-2 ring-indigo-500/30 group-hover:scale-105 transition-transform"
                    />
                    <div>
                      <h3 className="font-extrabold text-white text-base leading-tight">{pat.name}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-slate-400 font-semibold">{pat.ageYears}a {pat.ageMonths}m</span>
                        <span className="text-[10px] px-2 py-0.2 rounded bg-indigo-950 text-indigo-300 font-bold border border-indigo-800">
                          {pat.insurancePlan.split(' ')[0]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5 text-xs">
                  <div className="text-[11px] text-slate-300 font-medium truncate">
                    {pat.diagnosis}
                  </div>
                  <div className="flex items-center justify-between text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                    <span>Carga Horária:</span>
                    <strong className="text-white font-mono">{pat.authorizedHoursWeek}h/semana</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-400 text-[11px]">
                    <span>Metas Conquistadas:</span>
                    <strong className="text-emerald-400 font-mono">{pat.masteredTargetsCount} alvos</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-400 text-[11px]">
                    <span>Supervisor:</span>
                    <strong className="text-slate-300 truncate max-w-[120px]">{pat.responsibleBCBA.split(',')[0]}</strong>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800">
                <button
                  onClick={() => onSelectPatient(pat)}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors text-center"
                >
                  Ver Prontuário
                </button>
                <button
                  onClick={() => onGoToLiveDtt(pat)}
                  className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1 shadow-md shadow-indigo-600/20"
                >
                  <Play className="h-3 w-3 fill-white" />
                  <span>Coletar DTT</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Sessions Activity Feed */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 lg:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-base font-black text-white">Histórico Recente de Sessões Concluídas</h2>
            <p className="text-xs text-slate-400">Registros clínicos salvos e auditados</p>
          </div>
        </div>

        <div className="divide-y divide-slate-800/80">
          {MOCK_HISTORICAL_SESSIONS.map((sess) => (
            <div key={sess.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-bold text-white flex items-center gap-2">
                    <span>Sessão de Terapia Comportamental Intensiva</span>
                    <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-slate-800 text-slate-300">
                      {sess.environment}
                    </span>
                  </div>
                  <div className="text-slate-400 text-[11px] mt-0.5">
                    Aplicador: <strong className="text-slate-300">{sess.therapistName} ({sess.therapistRole})</strong> • {new Date(sess.date).toLocaleDateString('pt-BR')} ({sess.startTime} - {sess.endTime})
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Taxa de Independência</div>
                  <div className="text-sm font-black text-emerald-400 font-mono">
                    {sess.calculatedIndependenceRate}%
                  </div>
                </div>
                <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">
                  Auditado
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
