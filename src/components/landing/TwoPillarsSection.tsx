import React from 'react';
import { 
  Zap, 
  ShieldCheck, 
  WifiOff, 
  Mic, 
  Keyboard, 
  Clock, 
  FileCheck2, 
  FileSignature, 
  TrendingUp, 
  Scale, 
  QrCode, 
  CheckCircle2, 
  ArrowRight,
  Eye,
  HeartHandshake,
  BrainCircuit,
  Calendar,
  Stethoscope,
  DollarSign,
  Check
} from 'lucide-react';

interface TwoPillarsSectionProps {
  onOpenDemoModal: () => void;
  onOpenLiveApp: () => void;
}

export const TwoPillarsSection: React.FC<TwoPillarsSectionProps> = ({
  onOpenDemoModal,
  onOpenLiveApp,
}) => {
  return (
    <section id="pilares" className="py-20 lg:py-28 relative bg-slate-950 border-t border-b border-slate-900 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 border border-slate-700 px-3.5 py-1 text-xs font-semibold text-slate-300 mb-4">
            <span className="h-2 w-2 rounded-full bg-indigo-400" />
            <span>Arquitetura de Produto de Alto Impacto</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Os Dois Pilares Inegociáveis que Fazem o SaaS ABA Ser Insubstituível
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Enquanto outros softwares complicam a rotina clínica com telas lentas e relatórios manuais, nossa engenharia foi desenhada em torno de dois objetivos fundamentais.
          </p>
        </div>

        {/* The 2 Giant Pillar Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* PILAR 1 */}
          <div className="relative rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-indigo-950/40 via-slate-900/90 to-slate-950 p-6 sm:p-8 shadow-2xl shadow-indigo-950/30 flex flex-col justify-between group hover:border-indigo-500/50 transition-all">
            <div className="space-y-6">
              
              {/* Badge */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/40 px-3 py-1 text-xs font-extrabold text-indigo-300">
                  <Zap className="h-3.5 w-3.5 text-amber-400" />
                  PILAR 1 • BLINDAGEM ANTI-CHURN NA PONTA
                </span>
                <span className="text-xs font-mono font-bold text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                  &lt; 1 Segundo
                </span>
              </div>

              {/* Title & Pain */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                  A Regra do Registro Instantâneo: Olhos 100% na Criança
                </h3>
                <p className="text-sm text-slate-300 mt-2.5 leading-relaxed">
                  O terapeuta aplicador ou AT está com uma criança regulando crises, manuseando reforçadores tangíveis e aplicando tentativas. <strong className="text-white">Se o app demorar mais de 3 segundos, ele abandona o tablet e volta para a prancheta de papel.</strong>
                </p>
              </div>

              {/* Feature Highlights Grid */}
              <div className="space-y-3.5 pt-2">
                
                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3.5 hover:border-indigo-500/30 transition-colors">
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
                    <WifiOff className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Arquitetura Local-First & 100% Offline</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Coleta com latência zero gravada no IndexedDB do navegador. A internet da clínica ou domicílio pode cair, a sessão continua fluindo sem travar.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3.5 hover:border-indigo-500/30 transition-colors">
                  <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 shrink-0">
                    <Eye className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Quick Briefing de Boas-Vindas da Sessão</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Resolve o turnover de aplicadores (&gt;40%). Em 3 segundos o terapeuta vê os Top 3 reforçadores vigentes, gatilhos sensoriais e comunicação funcional ativa.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3.5 hover:border-indigo-500/30 transition-colors">
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
                    <Mic className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Ditado de Voz com IA para Crises ABC</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Grave eventos comportamentais em segundos. Basta ditar o ocorrido e o assistente estrutura automaticamente o Antecedente, Comportamento e Consequência.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3.5 hover:border-indigo-500/30 transition-colors">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                    <Keyboard className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Hierarquia de Dicas Completa & Atalhos 1-8</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Teclas físicas no teclado ou botões táteis gigantes: Independente (IND), Gestual (GP), Verbal (VP), Modelo (MP), Físico Parcial/Total (PP/FP) e Incorreto (INC).
                    </p>
                  </div>
                </div>

              </div>

            </div>

            <div className="pt-6 border-t border-slate-800/80 mt-6 flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" /> Adesão de 100% dos aplicadores
              </span>
              <button 
                onClick={onOpenLiveApp}
                className="text-xs font-bold text-indigo-300 hover:text-white flex items-center gap-1 group-hover:translate-x-0.5 transition-all"
              >
                Ver coletor funcionando <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* PILAR 2 */}
          <div className="relative rounded-3xl border border-teal-500/30 bg-gradient-to-b from-teal-950/40 via-slate-900/90 to-slate-950 p-6 sm:p-8 shadow-2xl shadow-teal-950/30 flex flex-col justify-between group hover:border-teal-500/50 transition-all">
            <div className="space-y-6">
              
              {/* Badge */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-500/20 border border-teal-500/40 px-3 py-1 text-xs font-extrabold text-teal-300">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  PILAR 2 • ALAVANCA DE VENDA E RETENÇÃO B2B
                </span>
                <span className="text-xs font-mono font-bold text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                  1 Clique
                </span>
              </div>

              {/* Title & Pain */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                  Laudos Anti-Glosa, TISS XML e Dossiê Judicial RN 539/2022
                </h3>
                <p className="text-sm text-slate-300 mt-2.5 leading-relaxed">
                  Supervisores perdem 30% das horas montando planilhas no Excel e faturas são glosadas por falta de assinatura dos pais e relatórios sem gráficos. <strong className="text-white">O SaaS ABA blinda 100% do faturamento da sua clínica.</strong>
                </p>
              </div>

              {/* Feature Highlights Grid */}
              <div className="space-y-3.5 pt-2">
                
                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3.5 hover:border-teal-500/30 transition-colors">
                  <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 shrink-0">
                    <FileSignature className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Folha de Presença Diária com Assinatura da Família</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Coleta de assinatura touch no tablet ou validação via OTP/WhatsApp a cada sessão, com geolocalização e carimbo de tempo. Anula contestações de "sessão fantasma".
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3.5 hover:border-teal-500/30 transition-colors">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                    <FileCheck2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Linter Pré-Envio de XML TISS v04.01.00</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Validador sintático e semântico em tempo real: checa CNES da clínica, registros de conselho (CRP/CRFa/CREFITO), códigos TUSS e consistência antes de exportar o lote.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3.5 hover:border-teal-500/30 transition-colors">
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
                    <Scale className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Dossiê Judicial Conforme a RN 539/2022 da ANS</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Relatório pericial estruturado para cumprimento de liminares e reembolso assistido, fundamentado na proibição de limites de sessões pela ANS.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3.5 hover:border-teal-500/30 transition-colors">
                  <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 shrink-0">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Gráficos de Aquisição Embutidos & Índice WII</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Gere laudos clínicos com curvas cumulativas, desvanecimento de dicas e Índice Ponderado de Independência (WII) renderizados direto no PDF.
                    </p>
                  </div>
                </div>

              </div>

            </div>

            <div className="pt-6 border-t border-slate-800/80 mt-6 flex items-center justify-between">
              <span className="text-xs font-semibold text-teal-300 flex items-center gap-1.5">
                <QrCode className="h-4 w-4" /> Assinatura PAdES + ICP-Brasil
              </span>
              <button 
                onClick={onOpenDemoModal}
                className="text-xs font-bold text-teal-300 hover:text-white flex items-center gap-1 group-hover:translate-x-0.5 transition-all"
              >
                Proteger faturamento <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* 4 Enterprise Pillars Grid */}
        <div className="mt-14 pt-12 border-t border-slate-900">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-extrabold uppercase tracking-wider text-teal-400">
              Expansão Multidisciplinar Enterprise v2.4
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Os 4 Pilares da Clínica Neurodesenvolvimental Integrada
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Superamos a barreira do ABA isolado para integrar toda a equipe multidisciplinar sob os mesmos dados.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: BrainCircuit,
                color: 'text-indigo-400',
                border: 'border-indigo-500/30',
                bg: 'bg-indigo-950/20',
                title: 'Centro de 6 Protocolos',
                badge: '1-Click PEI Bridge',
                desc: 'VB-MAPP, Denver ESDM, M-CHAT-R/F, ABLLS-R, CARS-2 e Socially Savvy com importação direta de lacunas para o PEI.',
              },
              {
                icon: Calendar,
                color: 'text-teal-400',
                border: 'border-teal-500/30',
                bg: 'bg-teal-950/20',
                title: 'Agenda de Salas Sensoriais',
                badge: 'Agendamento em Bloco',
                desc: 'Matriz espacial (Ayres, DTT, CAA) e agendamento de terapias casadas no mesmo turno sem choque de equipamentos.',
              },
              {
                icon: Stethoscope,
                color: 'text-purple-400',
                border: 'border-purple-500/30',
                bg: 'bg-purple-950/20',
                title: 'Prontuário SOAP Multi',
                badge: 'Metas Compartilhadas',
                desc: 'Evoluções no padrão SOAP para Fono, T.O., Psico e ABA com dieta sensorial e assinatura digital ICP-Brasil.',
              },
              {
                icon: DollarSign,
                color: 'text-emerald-400',
                border: 'border-emerald-500/30',
                bg: 'bg-emerald-950/20',
                title: 'Defesa Ativa RN 539',
                badge: 'Repasse Automático',
                desc: 'Geração em 1 clique de minuta de recurso contra glosas de planos de saúde e extrato automatizado de repasse por terapeuta.',
              },
            ].map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div 
                  key={idx}
                  className={`p-5 rounded-2xl border ${pillar.border} ${pillar.bg} backdrop-blur-xl flex flex-col justify-between hover:border-slate-600 transition-colors`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2 rounded-xl bg-slate-900 border border-slate-800 ${pillar.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-800">
                        {pillar.badge}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1.5">{pillar.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{pillar.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-900/80 flex items-center gap-1.5 text-[10px] font-semibold text-teal-300">
                    <Check className="h-3 w-3 text-teal-400" />
                    <span>Nativo no SaaS ABA Enterprise</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
