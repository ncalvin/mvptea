import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Building2,
  HelpCircle
} from 'lucide-react';

interface PricingSectionProps {
  onOpenDemoModal: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenDemoModal }) => {
  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');

  const PLANS = [
    {
      id: 'starter',
      name: 'Starter Consultório',
      target: 'Ideal para consultórios individuais e terapeutas autônomos em fase inicial.',
      patientLimit: 'Até 10 Aprendizes Ativos',
      monthlyPrice: 590,
      annualPrice: 472, // 20% off
      isPopular: false,
      badge: 'Início Rápido',
      features: [
        'Coletor DTT / NET Local-First Offline (Tablet & Celular)',
        'Hierarquia de Dicas Completa (IND a FP) com atalhos 1-8',
        'Cálculo Automático do Índice WII e Taxa de Acerto',
        'Centro de 6 Protocolos com 1-Click PEI Bridge',
        'Motor de Manutenção Automática (Sondas D+10, D+20, D+30)',
        'Folha de Presença com Assinatura Touch do Responsável',
        'Laudos em PDF com Gráficos Embutidos em 1 Clique',
        'Exportação de Séries Temporais para CSV/Excel',
        'Suporte Clínico via WhatsApp em horário comercial',
      ],
      ctaText: 'Começar com Plano Starter',
    },
    {
      id: 'pro',
      name: 'Pro Clínica em Expansão',
      target: 'O padrão de ouro para clínicas com equipe multidisciplinar e convênios.',
      patientLimit: 'Até 35 Aprendizes Ativos',
      monthlyPrice: 1190,
      annualPrice: 952, // 20% off
      isPopular: true,
      badge: 'Mais Escolhido • ROI Imediato',
      features: [
        'Tudo incluso no Plano Starter +',
        'Agenda com Salas Sensoriais (Ayres) & Agendamento em Bloco',
        'Prontuário Multidisciplinar SOAP (Fono, T.O., Psico e ABA)',
        'Portal da Família & Diário de Bordo do AT Escolar',
        'Gestor Ativo de Glosas com Minutas de Recurso RN 539 ANS',
        'Extrato Automatizado de Repasse por Terapeuta / Hora',
        'Copiloto Clínico com IA (Detecção de Platô & Ditado ABC)',
        'Linter Pré-Envio de XML TISS v04.01.00 sem glosas',
        'Treinamento e Implantação VIP com Especialista Clínico',
      ],
      ctaText: 'Escolher Plano Pro Enterprise',
    },
    {
      id: 'enterprise',
      name: 'Enterprise Redes & Franquias',
      target: 'Para grandes centros de neurodesenvolvimento e redes com múltiplas filiais.',
      patientLimit: 'Aprendizes Ilimitados • Multi-Unidades',
      monthlyPrice: 2490,
      annualPrice: 1992, // 20% off
      isPopular: false,
      badge: 'Escala Máxima',
      features: [
        'Tudo incluso no Plano Pro +',
        'Matriz de Salas e Equipamentos Sensoriais Multi-Unidades',
        'Módulo Financeiro Integrado com Conciliação TISS e Repasses',
        'Copiloto de IA com Customização de Modelos de Laudo',
        'Painel Consolidado de Multi-Unidades e Filiais',
        'Assinatura Digital PAdES / ICP-Brasil em Lote',
        'API REST para Integração com ERP e Faturamento',
        'Gerente de Contas (CSM) Dedicado + SLA 1h',
        'Consultoria Anti-Glosa Personalizada para Recursos de Glosa',
      ],
      ctaText: 'Falar com Consultor Enterprise',
    },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <section id="precos" className="py-20 lg:py-28 relative bg-slate-900/60 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 border border-slate-800 px-3.5 py-1 text-xs font-semibold text-slate-300 mb-3">
            <Sparkles className="h-3.5 w-3.5 text-teal-400" />
            <span>Investimento Transparente e Previsível</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Planos que se Pagam no Primeiro Mês
          </h2>
          <p className="mt-3 text-base text-slate-400">
            A assinatura do SaaS ABA representa menos de <strong className="text-white">1,5% do faturamento</strong> de um único aprendiz na sua clínica.
          </p>

          {/* Billing Cycle Switcher */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <span className={`text-xs sm:text-sm font-semibold ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-400'}`}>
              Faturamento Mensal
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'annual' ? 'monthly' : 'annual')}
              className="relative inline-flex h-7 w-14 items-center rounded-full bg-slate-800 border border-slate-700 p-1 transition-colors"
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-gradient-to-r from-indigo-500 to-teal-400 shadow-md transition-transform ${
                  billingCycle === 'annual' ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>
            <div className="flex items-center gap-1.5">
              <span className={`text-xs sm:text-sm font-semibold ${billingCycle === 'annual' ? 'text-white' : 'text-slate-400'}`}>
                Faturamento Anual
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-extrabold uppercase">
                20% OFF + Setup VIP Grátis
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
          {PLANS.map((plan) => {
            const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all ${
                  plan.isPopular
                    ? 'bg-gradient-to-b from-indigo-950/80 via-slate-900 to-slate-950 border-2 border-indigo-500 shadow-2xl shadow-indigo-950/80 scale-100 lg:scale-105 z-10'
                    : 'bg-slate-950/80 border border-slate-800 hover:border-slate-700 shadow-xl'
                }`}
              >
                {/* Popular Pill */}
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-teal-400 text-slate-950 font-extrabold text-xs shadow-lg uppercase tracking-wider">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider block mb-1">
                      {plan.patientLimit}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white">{plan.name}</h3>
                    <p className="text-xs text-slate-400 mt-2 min-h-[34px]">{plan.target}</p>
                  </div>

                  {/* Price */}
                  <div className="pb-4 border-b border-slate-800">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-black text-white font-mono">
                        {formatPrice(price)}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">/ mês</span>
                    </div>
                    {billingCycle === 'annual' && (
                      <span className="text-[11px] text-emerald-400 font-medium mt-1 block">
                        Faturado anualmente com 20% de desconto
                      </span>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 pt-2">
                    <span className="text-xs font-bold text-slate-300 block">O que está incluso:</span>
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <div className="h-4 w-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="h-3 w-3" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-8">
                  <button
                    onClick={onOpenDemoModal}
                    className={`w-full flex items-center justify-center gap-2 rounded-2xl py-3.5 px-4 text-xs sm:text-sm font-extrabold transition-all ${
                      plan.isPopular
                        ? 'bg-gradient-to-r from-indigo-600 to-teal-500 hover:from-indigo-500 hover:to-teal-400 text-white shadow-xl shadow-indigo-600/30 hover:scale-102'
                        : 'bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-14 max-w-4xl mx-auto p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Garantia Incondicional Anti-Glosa</h4>
              <p className="text-xs text-slate-400">
                Se a sua clínica tiver qualquer glosa técnica de assiduidade usando a folha de presença digital, devolvemos 100% da sua mensalidade.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenDemoModal}
            className="shrink-0 text-xs font-bold text-teal-400 hover:text-teal-300 underline underline-offset-4"
          >
            Falar com Consultor
          </button>
        </div>

      </div>
    </section>
  );
};
