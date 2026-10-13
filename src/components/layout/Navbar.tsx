import React from 'react';
import { 
  Activity, 
  Brain, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Clock, 
  FileText, 
  PieChart, 
  Layers, 
  ShieldAlert,
  ChevronDown,
  BrainCircuit,
  Calendar,
  Stethoscope,
  Heart,
  DollarSign,
  Zap
} from 'lucide-react';
import { Patient } from '../../types/aba';
import { soundFeedback } from '../../utils/audioFeedback';

export type MainAppTab = 
  | 'dashboard' 
  | 'live-dtt' 
  | 'protocols' 
  | 'schedule' 
  | 'soap' 
  | 'pei' 
  | 'abc' 
  | 'family' 
  | 'financial' 
  | 'graphs' 
  | 'reports';

interface NavbarProps {
  currentTab: MainAppTab;
  setCurrentTab: (tab: MainAppTab) => void;
  patients: Patient[];
  activePatient: Patient;
  setActivePatient: (patient: Patient) => void;
  userRole: 'BCBA' | 'RBT' | 'Gestor';
  setUserRole: (role: 'BCBA' | 'RBT' | 'Gestor') => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  lowSensoryMode: boolean;
  setLowSensoryMode: (val: boolean) => void;
  sessionTimeSeconds: number;
  isSessionActive: boolean;
  onToggleSession: () => void;
  onGoToLanding?: () => void;
  onOpenAiCopilot?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  patients,
  activePatient,
  setActivePatient,
  userRole,
  setUserRole,
  soundEnabled,
  setSoundEnabled,
  lowSensoryMode,
  setLowSensoryMode,
  sessionTimeSeconds,
  isSessionActive,
  onToggleSession,
  onGoToLanding,
  onOpenAiCopilot,
}) => {
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl transition-colors">
      {/* Top Utility Bar */}
      <div className="flex h-16 items-center justify-between px-4 lg:px-8 border-b border-slate-900">
        <div className="flex items-center gap-4">
          <div 
            onClick={() => setCurrentTab('dashboard')} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-teal-400 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950">
                <Brain className="h-5 w-5 text-teal-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  SaaS ABA
                </span>
                <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-[10px] font-bold text-indigo-400 border border-indigo-500/20">
                  CLINICAL PRO
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Clínica NeuroDesenvolver • SP</p>
            </div>
          </div>

          <div className="hidden md:block h-6 w-px bg-slate-800" />

          {/* Active Patient Switcher */}
          <div className="relative group">
            <div className="flex items-center gap-2 rounded-xl bg-slate-900/90 hover:bg-slate-800/80 border border-slate-800 px-3 py-1.5 transition-all cursor-pointer">
              <img 
                src={activePatient.avatar} 
                alt={activePatient.name} 
                className="h-7 w-7 rounded-full object-cover ring-1 ring-indigo-500/40"
              />
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-200">{activePatient.preferredName}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-950 text-indigo-300 font-semibold border border-indigo-800/50">
                    {activePatient.ageYears}a {activePatient.ageMonths}m
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 truncate max-w-[130px]">{activePatient.insurancePlan}</p>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </div>

            <div className="absolute left-0 mt-1 w-64 rounded-xl border border-slate-800 bg-slate-900 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50 p-1.5">
              <div className="px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Selecionar Aprendiz
              </div>
              {patients.map((pat) => (
                <button
                  key={pat.id}
                  onClick={() => setActivePatient(pat)}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left text-xs transition-colors ${
                    pat.id === activePatient.id 
                      ? 'bg-indigo-600/20 text-indigo-300 font-semibold border border-indigo-500/30' 
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <img src={pat.avatar} alt={pat.name} className="h-6 w-6 rounded-full object-cover" />
                  <div className="truncate">
                    <div className="truncate font-medium">{pat.name}</div>
                    <div className="text-[10px] text-slate-400">{pat.diagnosis}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active Live Session Timer Pill */}
          <div className={`flex items-center gap-2 rounded-xl px-3 py-1.5 border transition-all ${
            isSessionActive 
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 animate-pulse' 
              : 'bg-slate-900 border-slate-800 text-slate-400'
          }`}>
            <Clock className={`h-4 w-4 ${isSessionActive ? 'text-emerald-400' : 'text-slate-500'}`} />
            <span className="font-mono text-xs font-bold">{formatTime(sessionTimeSeconds)}</span>
            <button
              onClick={onToggleSession}
              className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider transition-colors ${
                isSessionActive
                  ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                  : 'bg-indigo-600 text-white hover:bg-indigo-500'
              }`}
            >
              {isSessionActive ? 'Pausar' : 'Iniciar'}
            </button>
          </div>

          {/* Role Switcher */}
          <div className="hidden sm:flex items-center bg-slate-900 rounded-xl p-1 border border-slate-800">
            {(['RBT', 'BCBA', 'Gestor'] as const).map((role) => (
              <button
                key={role}
                onClick={() => setUserRole(role)}
                className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
                  userRole === role
                    ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          {/* AI Clinical Copilot Button */}
          {onOpenAiCopilot && (
            <button
              onClick={onOpenAiCopilot}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-500/40 text-xs font-bold text-purple-300 transition-all hover:scale-105 shadow-sm shadow-purple-950/50"
              title="Abrir Copiloto Clínico com IA (Análise de WII, Alertas de Platô e Sugestões de PEI)"
            >
              <Sparkles className="h-3.5 w-3.5 text-purple-400 animate-spin" />
              <span className="hidden md:inline">Copiloto IA</span>
              <span className="md:hidden">IA</span>
            </button>
          )}

          {/* Link to Marketing Website */}
          {onGoToLanding && (
            <button
              onClick={onGoToLanding}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-500/40 text-xs font-bold text-indigo-300 transition-all hover:scale-105"
              title="Voltar para a página de divulgação comercial do SaaS ABA"
            >
              <Sparkles className="h-3.5 w-3.5 text-teal-400" />
              <span className="hidden md:inline">Website Comercial</span>
              <span className="md:hidden">Site</span>
            </button>
          )}

          {/* Sound Feedback Toggle */}
          <button
            onClick={() => {
              const next = !soundEnabled;
              setSoundEnabled(next);
              soundFeedback.soundEnabled = next;
            }}
            title={soundEnabled ? 'Áudio de feedback DTT ativado' : 'Áudio de feedback desativado'}
            className={`p-2 rounded-xl border transition-colors ${
              soundEnabled 
                ? 'bg-indigo-950/60 border-indigo-500/30 text-indigo-300 hover:bg-indigo-900/60' 
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
          >
            {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>

          {/* Low Sensory Mode Toggle */}
          <button
            onClick={() => setLowSensoryMode(!lowSensoryMode)}
            title="Modo Baixo Estímulo Sensorial (Paleta suave / Sem animações fortes)"
            className={`p-2 rounded-xl border transition-colors ${
              lowSensoryMode 
                ? 'bg-teal-950/60 border-teal-500/40 text-teal-300' 
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <nav className="flex items-center gap-1.5 overflow-x-auto px-4 lg:px-8 py-2 scrollbar-none bg-slate-950/50">
        {[
          { id: 'dashboard', label: 'Visão Geral', icon: Activity },
          { id: 'live-dtt', label: '⚡ Coletor DTT/NET', icon: Zap, highlight: true },
          { id: 'protocols', label: 'Centro de Protocolos', icon: BrainCircuit, badge: '6 Protocolos' },
          { id: 'schedule', label: 'Agenda & Salas Sensoriais', icon: Calendar, badge: 'Em Bloco' },
          { id: 'soap', label: 'Prontuário SOAP Multi', icon: Stethoscope },
          { id: 'pei', label: 'PEI & Programas', icon: Layers },
          { id: 'abc', label: 'Registro ABC & BIP', icon: ShieldAlert },
          { id: 'family', label: 'Portal Família & Escola', icon: Heart },
          { id: 'financial', label: 'Financeiro & Glosas RN 539', icon: DollarSign },
          { id: 'graphs', label: 'Gráficos de Decisão', icon: PieChart },
          { id: 'reports', label: 'Laudo Anti-Glosa', icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id as any)}
              className={`flex items-center gap-2 whitespace-nowrap px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isActive
                  ? tab.highlight 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                  : tab.highlight
                    ? 'text-emerald-400 hover:bg-emerald-950/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? (tab.highlight ? 'text-emerald-400' : 'text-indigo-400') : ''}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
};
