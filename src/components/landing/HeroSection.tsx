import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Zap, 
  FileCheck2, 
  PieChart, 
  Smartphone, 
  Users, 
  CheckCircle2, 
  Play, 
  Award, 
  Check, 
  TrendingUp, 
  FileSignature,
  BrainCircuit,
  Stethoscope,
  Calendar
} from 'lucide-react';

interface HeroSectionProps {
  onOpenDemoModal: () => void;
  onOpenLiveApp: () => void;
  onScrollToSimulator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenDemoModal,
  onOpenLiveApp,
  onScrollToSimulator,
}) => {
  const [activeMockTab, setActiveMockTab] = useState<'collector' | 'protocols' | 'soap' | 'report' | 'analytics' | 'family'>('collector');

  return (
    <section className="relative pt-12 pb-24 lg:pt-16 lg:pb-32 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[450px] bg-gradient-to-tr from-indigo-600/20 via-teal-500/15 to-purple-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-12 left-10 w-72 h-72 bg-indigo-500/10 blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-80 h-80 bg-teal-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Eyebrow Tag */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 rounded-full bg-indigo-950/80 border border-indigo-500/30 px-4 py-1.5 text-xs font-semibold text-indigo-300 shadow-lg shadow-indigo-950/50 backdrop-blur-xl">
            <span className="flex h-2 w-2 rounded-full bg-teal-400 animate-ping" />
            <span className="bg-gradient-to-r from-teal-300 to-indigo-200 bg-clip-text text-transparent font-bold">
              Nova Versão 2.4 Enterprise
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300 flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              6 Protocolos Padronizados • Salas Sensoriais • RN 539/2022 ANS
            </span>
          </div>
        </div>

        {/* Main Punchy Headline */}
        <div className="text-center max-w-4xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
            A Única Plataforma ABA e Multidisciplinar que{' '}
            <span className="bg-gradient-to-r from-teal-400 via-indigo-300 to-indigo-400 bg-clip-text text-transparent">
              Elimina 100% das Glosas
            </span>{' '}
            e Unifica Toda a Intervenção TEA
          </h1>
          <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Elimine planilhas isoladas e softwares fragmentados. O ecossistema definitivo com <strong className="text-teal-300 font-semibold">coleta DTT/NET &lt; 1s local-first</strong>, <strong className="text-indigo-300 font-semibold">Centro de 6 Protocolos com 1-Click PEI Bridge</strong>, <strong className="text-purple-300 font-semibold">Agenda de Salas Sensoriais em Bloco</strong>, <strong className="text-pink-300 font-semibold">Prontuário Multidisciplinar SOAP</strong> e <strong className="text-emerald-300 font-semibold">defesa ativa de glosas pela RN 539/2022 da ANS</strong>.
          </p>
        </div>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onOpenDemoModal}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-teal-500 hover:from-indigo-500 hover:to-teal-400 px-8 py-4 text-sm sm:text-base font-extrabold text-white shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95 group"
          >
            <span>Solicitar Demonstração VIP Gratuita</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onScrollToSimulator}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 px-6 py-4 text-sm sm:text-base font-bold text-slate-200 hover:text-white transition-all hover:border-slate-500 shadow-lg"
          >
            <Zap className="h-5 w-5 text-amber-400" />
            <span>Testar Coletor Interativo Agora</span>
          </button>

          <button
            onClick={onOpenLiveApp}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-slate-950/80 hover:bg-indigo-950/40 border border-indigo-500/30 px-6 py-4 text-sm sm:text-base font-bold text-indigo-300 hover:text-teal-300 transition-all"
          >
            <Sparkles className="h-4 w-4 text-teal-400" />
            <span>Abrir Sistema Completo</span>
          </button>
        </div>

        {/* Key Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto mb-16">
          {[
            { metric: '+85.000', label: 'Horas de Intervenção Registradas', icon: Clock, color: 'text-indigo-400' },
            { metric: '0%', label: 'Glosas de Assiduidade com Assinatura Digital', icon: ShieldCheck, color: 'text-emerald-400' },
            { metric: '< 1 seg', label: 'Tempo de Registro por Tentativa (Tablet)', icon: Zap, color: 'text-amber-400' },
            { metric: '30h / mês', label: 'Economizadas por Supervisor BCBA', icon: TrendingUp, color: 'text-teal-400' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-800/80 bg-slate-900/50 text-center hover:border-slate-700 transition-all hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <Icon className={`h-4 w-4 ${item.color}`} />
                  <span className={`text-xl sm:text-2xl font-black ${item.color}`}>{item.metric}</span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-400 font-medium leading-tight">{item.label}</p>
              </div>
            );
          })}
        </div>

        {/* Interactive Live Mockup Showcase Frame */}
        <div className="max-w-5xl mx-auto rounded-3xl border border-slate-700/80 bg-slate-900/90 shadow-2xl shadow-indigo-950/60 overflow-hidden backdrop-blur-2xl">
          
          {/* Mockup Header Bar */}
          <div className="flex flex-wrap items-center justify-between border-b border-slate-800 bg-slate-950/80 px-4 sm:px-6 py-3.5 gap-3">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs font-mono text-slate-400 ml-2 hidden sm:inline">saasaba.app/clinical-workspace</span>
            </div>

            {/* Showcase Tab Switcher */}
            <div className="flex items-center bg-slate-900 rounded-xl p-1 border border-slate-800 text-xs font-semibold overflow-x-auto max-w-full">
              {[
                { id: 'collector', label: '📱 Tablet Coletor DTT', icon: Smartphone },
                { id: 'protocols', label: '🧠 6 Protocolos & PEI', icon: BrainCircuit },
                { id: 'soap', label: '🩺 Prontuário SOAP Multi', icon: Stethoscope },
                { id: 'report', label: '🛡️ Laudo Anti-Glosa & TISS', icon: FileCheck2 },
                { id: 'analytics', label: '📈 Curvas & WII', icon: PieChart },
                { id: 'family', label: '👨‍👩‍👧 Família & Escola', icon: Users },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveMockTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                    activeMockTab === tab.id
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mockup View Content */}
          <div className="p-4 sm:p-8 bg-slate-950/60 min-h-[380px]">
            
            {/* VIEW 1: COLLECTOR TABLET */}
            {activeMockTab === 'collector' && (
              <div className="space-y-4 animate-fadeIn">
                {/* Briefing Strip */}
                <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-600 text-white text-[10px] font-bold">QUICK BRIEFING</span>
                    <span className="text-xs font-bold text-slate-200">Enzo Gabriel (4a 3m) • TEA Nível 2</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-300">
                    <span className="text-teal-300">⭐ Reforçadores: Massinha azul, Bolhas</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-amber-300">⚠️ Gatilho: Ruídos altos</span>
                  </div>
                </div>

                {/* Target Card Simulation */}
                <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider">Mando • Comunicação Funcional</span>
                      <h4 className="text-base sm:text-lg font-bold text-white">Pedir "Água" com apoio gestual / vocal</h4>
                      <p className="text-xs text-slate-400">Operação Motivadora (MO): Garrafa de água visível mas fora de alcance</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30 text-xs font-bold font-mono">
                      84% Acerto • WII: 91%
                    </span>
                  </div>

                  {/* Buttons Grid simulation */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                    <div className="p-3 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-center hover:scale-102 transition-transform cursor-pointer">
                      <span className="block text-xs font-extrabold text-emerald-300">IND (+)</span>
                      <span className="text-[10px] text-emerald-400/80">Independente [1]</span>
                    </div>
                    <div className="p-3 rounded-xl bg-teal-600/20 border border-teal-500/40 text-center hover:scale-102 transition-transform cursor-pointer">
                      <span className="block text-xs font-extrabold text-teal-300">GP</span>
                      <span className="text-[10px] text-teal-400/80">Ajuda Gestual [2]</span>
                    </div>
                    <div className="p-3 rounded-xl bg-indigo-600/20 border border-indigo-500/40 text-center hover:scale-102 transition-transform cursor-pointer">
                      <span className="block text-xs font-extrabold text-indigo-300">VP</span>
                      <span className="text-[10px] text-indigo-400/80">Ajuda Verbal [3]</span>
                    </div>
                    <div className="p-3 rounded-xl bg-rose-600/20 border border-rose-500/40 text-center hover:scale-102 transition-transform cursor-pointer">
                      <span className="block text-xs font-extrabold text-rose-300">INC (-)</span>
                      <span className="text-[10px] text-rose-400/80">Incorreto [8]</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <Check className="h-3.5 w-3.5" /> IndexedDB Local-First (Funciona 100% Offline)
                    </span>
                    <span className="text-slate-400">Atalhos de teclado 1 a 8 ativos</span>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 2: PROTOCOLS & PEI */}
            {activeMockTab === 'protocols' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        <BrainCircuit className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Centro de 6 Protocolos Padronizados & PEI</h4>
                        <p className="text-xs text-slate-400">VB-MAPP, Denver ESDM, M-CHAT-R/F, ABLLS-R, CARS-2 e Socially Savvy</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-indigo-950 text-indigo-300 text-xs font-bold border border-indigo-800/40">
                      1-Click PEI Bridge
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs pt-2">
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">VB-MAPP Nível 2</span>
                      <strong className="text-sm font-bold text-teal-400">32.5 / 60 pts</strong>
                      <span className="text-[10px] text-slate-400 block">3 lacunas prontas para PEI</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">M-CHAT-R/F</span>
                      <strong className="text-sm font-bold text-amber-300">Risco Moderado (4 pts)</strong>
                      <span className="text-[10px] text-slate-400 block">Encaminhamento auditado</span>
                    </div>
                    <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">Denver ESDM</span>
                      <strong className="text-sm font-bold text-indigo-300">Fase 1: 78%</strong>
                      <span className="text-[10px] text-emerald-400 block">Comunicação receptiva</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/30 flex items-center justify-between text-xs">
                    <span className="text-slate-300">Lacuna detectada: <strong>Mando 7M (Pedir itens ausentes)</strong></span>
                    <span className="px-2.5 py-1 rounded-lg bg-teal-500/20 text-teal-300 font-bold border border-teal-500/30 text-[11px] flex items-center gap-1">
                      <Check className="h-3 w-3" /> Convertido em Programa PEI
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 3: SOAP MULTI */}
            {activeMockTab === 'soap' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                        <Stethoscope className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Prontuário Multidisciplinar SOAP & Metas Compartilhadas</h4>
                        <p className="text-xs text-slate-400">Evoluções cruzadas: Fonoaudiologia, T.O., Psico e Equipe ABA</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-teal-950 text-teal-300 text-xs font-bold border border-teal-800/40">
                      ICP-Brasil / CFM
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-indigo-400 font-bold block">S (Subjetivo)</span>
                      <p className="text-[11px] text-slate-300 line-clamp-2">Chegou regulado após acolhimento sensorial em rede...</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-teal-400 font-bold block">O (Objetivo)</span>
                      <p className="text-[11px] text-slate-300 line-clamp-2">Treino de mastigação e CAA em prancha de 12 símbolos...</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-purple-400 font-bold block">A (Avaliação)</span>
                      <p className="text-[11px] text-slate-300 line-clamp-2">Boa modulação vestibular; aceitou novo alimento sólido...</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-emerald-400 font-bold block">P (Plano)</span>
                      <p className="text-[11px] text-slate-300 line-clamp-2">Manter dieta sensorial diária antes da mesa DTT...</p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span>Meta Transdisciplinar: <strong>Regulação Sensorial e Atenção Compartilhada</strong></span>
                    <span className="text-teal-400 font-semibold">T.O. + Fono + ABA sincronizados</span>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 4: ANTI-GLOSA REPORT */}
            {activeMockTab === 'report' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <FileSignature className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Dossiê Pericial Anti-Glosa & RN 539/2022</h4>
                        <p className="text-xs text-slate-400">Convênio: Bradesco Saúde • 20h/semanais autorizadas</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-900/50 text-emerald-300 text-xs font-bold border border-emerald-500/40 flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Linter TISS 100% Aprovado
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">Carga Horária Comprovada</span>
                      <strong className="text-sm font-bold text-white">80 Horas / Mês</strong>
                      <span className="text-emerald-400 text-[10px] block">100% Assinada pela Família</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">Validação Jurídica</span>
                      <strong className="text-sm font-bold text-white">PAdES + QR Code</strong>
                      <span className="text-teal-400 text-[10px] block">ICP-Brasil / GOV.BR</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">Lote XML TISS</span>
                      <strong className="text-sm font-bold text-white">v04.01.00 (SP/SADT)</strong>
                      <span className="text-indigo-400 text-[10px] block">Zero inconsistências</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 3: ANALYTICS & WII */}
            {activeMockTab === 'analytics' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">Curva Cumulativa de Alvos Dominados & WII</h4>
                      <p className="text-xs text-slate-400">Linha de Fase A-B com desvanecimento de dicas automatizado</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-teal-400 bg-teal-950/80 px-2.5 py-1 rounded-lg border border-teal-800">
                      WII Geral: +38.4% no mês
                    </span>
                  </div>

                  {/* Visual Chart Bars Representation */}
                  <div className="h-32 w-full flex items-end gap-2 pt-4 pb-2 px-2 bg-slate-950/60 rounded-xl border border-slate-800">
                    {[35, 42, 50, 58, 65, 72, 80, 85, 91, 94].map((height, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group">
                        <span className="text-[9px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">{height}%</span>
                        <div 
                          className="w-full rounded-t-md bg-gradient-to-t from-indigo-600 to-teal-400 transition-all group-hover:brightness-125"
                          style={{ height: `${height}%` }}
                        />
                        <span className="text-[8px] text-slate-500 font-mono">S{i + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 4: FAMILY PORTAL */}
            {activeMockTab === 'family' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                        <Users className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Portal da Família & Treino Parental</h4>
                        <p className="text-xs text-slate-400">Assinatura de presença e acompanhamento transparente de metas</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-purple-950 text-purple-300 text-xs font-bold border border-purple-800/40">
                      WhatsApp OTP Ativo
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-slate-200">Sessão de Hoje • 04/10/2026 (2h30)</span>
                      <p className="text-[11px] text-slate-400">Aplicador: Dr. Rafael Santos (RBT) • Terapeuta Responsável: Dra. Beatriz Costa (BCBA)</p>
                    </div>
                    <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1">
                      <Check className="h-3 w-3" /> Presença Confirmada
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mockup Footer Quick Action */}
          <div className="border-t border-slate-800 bg-slate-950/80 px-4 sm:px-6 py-3 flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Ambiente de Demonstração em Tempo Real
            </span>
            <button
              onClick={onOpenLiveApp}
              className="text-teal-400 hover:text-teal-300 font-bold flex items-center gap-1 hover:underline"
            >
              Experimentar Todos os Módulos no Sistema <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
