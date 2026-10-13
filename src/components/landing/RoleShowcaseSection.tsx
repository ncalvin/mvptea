import React, { useState } from 'react';
import { 
  Brain, 
  Smartphone, 
  Building2, 
  Heart, 
  Check, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Users
} from 'lucide-react';

export const RoleShowcaseSection: React.FC<{ onOpenDemoModal: () => void }> = ({ onOpenDemoModal }) => {
  const [activeRole, setActiveRole] = useState<'bcba' | 'rbt' | 'gestor' | 'family'>('bcba');

  const ROLES = [
    {
      id: 'bcba',
      title: 'Supervisores Clínicos & BCBAs',
      subtitle: 'Psicólogos (CRP), Fonoaudiólogos (CRFa) e Terapeutas Ocupacionais (CREFITO)',
      icon: Brain,
      color: 'from-indigo-500 to-indigo-600',
      badge: 'Economize 30h/mês em Relatórios',
      highlights: [
        'Prescrição estruturada de PEI com matrizes VB-MAPP, ABLLS-R e AFLS.',
        'Gráficos de séries temporais com cálculo automático do Índice WII.',
        'Laudos periciais com curvas embutidas gerados em 1 clique.',
        'Sessões de overlap com cálculo de fidedignidade IOA em tempo real.',
        'Alertas inteligentes de estagnação e necessidade de ajuste de dicas.',
      ],
      quote: '“O SaaS ABA me devolveu os fins de semana. Antes eu passava os sábados compilando dados no Excel. Hoje entrego laudos impecáveis em minutos.”',
      author: 'Dra. Beatriz Costa • BCBA / Psicóloga Clínica',
    },
    {
      id: 'rbt',
      title: 'Terapeutas Aplicadores & RBTs / ATs',
      subtitle: 'Acompanhantes Terapêuticos e Estagiários na ponta da intervenção',
      icon: Smartphone,
      color: 'from-teal-500 to-teal-600',
      badge: 'Coleta Instantânea em < 1s',
      highlights: [
        'Zonas de toque gigantes e atalhos físicos 1 a 8 para manter os olhos 100% na criança.',
        'Quick Briefing de 3 segundos com Top 3 reforçadores e hipersensibilidades.',
        'Modo Offline Local-First: a internet pode oscilar que a sessão não trava nunca.',
        'Ditado por voz com IA para registrar crises e eventos ABC em 5 segundos.',
        'Acesso imediato às estratégias reativas do BIP (Plano de Intervenção Comportamental).',
      ],
      quote: '“Com crianças pequenas que tentam fugir ou precisam de apoio motor, qualquer botão difícil é motivo para voltar ao papel. O SaaS ABA é rápido de verdade.”',
      author: 'Rafael Santos • RBT / Aplicador ABA',
    },
    {
      id: 'gestor',
      title: 'Gestores & Faturamento de Clínicas',
      subtitle: 'Diretores de Operações, Administradores e Responsáveis por Guias TISS',
      icon: Building2,
      color: 'from-emerald-500 to-emerald-600',
      badge: 'Zero Glosas & Conformidade ANS',
      highlights: [
        'Linter Pré-Envio de XML TISS v04.01.00 com checagem de CNES e conselho de classe.',
        'Folha de presença com assinatura digital do responsável e carimbo de geolocalização.',
        'Dossiê jurídico estruturado para cumprimento da RN 539/2022 e liminares.',
        'Monitor de queima de horas autorizadas (burn-rate) para evitar atendimentos descobertos.',
        'Relatórios de produtividade clínica e assiduidade por terapeuta e unidade.',
      ],
      quote: '“Eliminamos 100% das glosas de assiduidade nos convênios Bradesco, Amil e Unimed logo no primeiro mês de uso.”',
      author: 'Carlos Eduardo Mendes • Diretor de Operações de Rede Clínica',
    },
    {
      id: 'family',
      title: 'Famílias & Responsáveis Legais',
      subtitle: 'Pais e cuidadores parceiros no processo de generalização',
      icon: Heart,
      color: 'from-pink-500 to-pink-600',
      badge: 'Transparência & Treino Parental',
      highlights: [
        'Assinatura de presença na tela do tablet ou confirmação via WhatsApp OTP.',
        'Visualização simples da evolução de marcos do PEI sem jargões inacessíveis.',
        'Módulo de Treino Parental para consistência de condutas no ambiente doméstico.',
        'Registro fácil de generalização de mandos (pedidos espontâneos) em casa.',
        'Segurança total de dados de saúde em conformidade rigorosa com a LGPD.',
      ],
      quote: '“Poder assinar digitalmente e ver os gráficos do progresso do meu filho nos traz uma tranquilidade enorme.”',
      author: 'Juliana Paiva • Mãe de Aprendiz com TEA',
    },
  ];

  const currentRoleData = ROLES.find((r) => r.id === activeRole) || ROLES[0];

  return (
    <section className="py-20 lg:py-28 relative bg-slate-900/30 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 border border-slate-800 px-3.5 py-1 text-xs font-semibold text-slate-300 mb-3">
            <Users className="h-3.5 w-3.5 text-indigo-400" />
            <span>Projetado para Toda a Equipe Multidisciplinar</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            A Experiência Perfeita Para Cada Papel na Clínica
          </h2>
          <p className="mt-3 text-base text-slate-400">
            O SaaS ABA resolve a dor de todos os envolvidos na jornada terapêutica de neurodesenvolvimento.
          </p>
        </div>

        {/* Role Selector Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto mb-10">
          {ROLES.map((role) => {
            const Icon = role.icon;
            const isActive = activeRole === role.id;
            return (
              <button
                key={role.id}
                onClick={() => setActiveRole(role.id as any)}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between gap-3 ${
                  isActive
                    ? 'bg-slate-900 border-indigo-500/80 shadow-xl shadow-indigo-950/50 ring-1 ring-indigo-500/40 scale-[1.02]'
                    : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                }`}
              >
                <div className={`p-2.5 rounded-xl bg-gradient-to-tr ${role.color} text-white w-fit shadow-md`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className={`text-sm font-black ${isActive ? 'text-white' : 'text-slate-300'}`}>{role.title}</h3>
                  <span className="text-[10px] text-teal-400 font-bold block mt-1">{role.badge}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Role Card Deep Dive */}
        <div className="max-w-5xl mx-auto rounded-3xl border border-slate-800 bg-slate-950/90 p-6 sm:p-10 shadow-2xl space-y-8 animate-fadeIn">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Módulo Especializado</span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">{currentRoleData.title}</h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">{currentRoleData.subtitle}</p>
            </div>
            <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold font-mono">
              {currentRoleData.badge}
            </span>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentRoleData.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <div className="h-5 w-5 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3 w-3" />
                </div>
                <span className="text-xs sm:text-sm text-slate-300 font-medium">{highlight}</span>
              </div>
            ))}
          </div>

          {/* Role Quote */}
          <div className="p-4 sm:p-6 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs sm:text-sm italic text-slate-300">{currentRoleData.quote}</p>
              <span className="text-xs font-bold text-teal-300 block mt-2">{currentRoleData.author}</span>
            </div>
            <button
              onClick={onOpenDemoModal}
              className="shrink-0 flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-md shadow-indigo-600/30 transition-all hover:scale-105"
            >
              <span>Ver Demonstração VIP</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
