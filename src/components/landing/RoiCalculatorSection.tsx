import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  DollarSign, 
  ArrowRight, 
  Sparkles,
  Users,
  CheckCircle2
} from 'lucide-react';

interface RoiCalculatorSectionProps {
  onOpenDemoModal: () => void;
}

export const RoiCalculatorSection: React.FC<RoiCalculatorSectionProps> = ({
  onOpenDemoModal,
}) => {
  const [patientCount, setPatientCount] = useState<number>(25);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(20);
  const [hourlyRate, setHourlyRate] = useState<number>(140);
  const [glosaRatePercent, setGlosaRatePercent] = useState<number>(5);

  // Math calculations
  const totalMonthlyHours = Math.round(patientCount * hoursPerWeek * 4.3);
  const grossMonthlyBilling = totalMonthlyHours * hourlyRate;
  
  // Glosas eliminated by digital signature & TISS linter
  const monthlyGlosaSaved = Math.round(grossMonthlyBilling * (glosaRatePercent / 100));
  
  // Supervisor hours saved in reports & graph generation (avg 1.5h per patient/month)
  const supervisorHoursSavedMonthly = Math.round(patientCount * 1.5);
  const supervisorTimeValueSavedMonthly = supervisorHoursSavedMonthly * 90; // R$ 90/h supervisor cost

  const totalMonthlySavings = monthlyGlosaSaved + supervisorTimeValueSavedMonthly;
  const annualProjectedSavings = totalMonthlySavings * 12;

  // Estimated SaaS ABA cost (e.g. Pro tier approx R$ 1.190/mo)
  const estimatedSaaSMonthlyCost = patientCount <= 10 ? 590 : patientCount <= 35 ? 1190 : 2490;
  const estimatedRoiPercent = Math.round(((totalMonthlySavings - estimatedSaaSMonthlyCost) / estimatedSaaSMonthlyCost) * 100);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <section id="calculadora" className="py-20 lg:py-28 relative bg-slate-950 border-b border-slate-900 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-teal-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-950/80 border border-indigo-500/30 px-3.5 py-1 text-xs font-semibold text-indigo-300 mb-3">
            <Calculator className="h-3.5 w-3.5 text-indigo-400" />
            <span>Simulador de Retorno sobre o Investimento</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Calcule Quanto Sua Clínica Economiza por Mês
          </h2>
          <p className="mt-3 text-base text-slate-400">
            Ajuste os parâmetros reais da sua operação para ver o impacto financeiro da eliminação de glosas e da automação de laudos clínicos.
          </p>
        </div>

        {/* The Calculator Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          
          {/* Controls Column (Left) */}
          <div className="lg:col-span-6 space-y-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-xl">
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-indigo-400" />
              Parâmetros da Sua Clínica ABA
            </h3>

            {/* Slider 1: Patients */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-slate-300">Número de Aprendizes Ativos:</label>
                <span className="font-black text-base text-indigo-400 font-mono bg-indigo-950/80 px-2.5 py-0.5 rounded-lg border border-indigo-500/30">
                  {patientCount} aprendizes
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                step="1"
                value={patientCount}
                onChange={(e) => setPatientCount(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>5 pacientes</span>
                <span>50</span>
                <span>100+ pacientes</span>
              </div>
            </div>

            {/* Slider 2: Hours / week */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-slate-300">Horas Semanais Médias por Paciente:</label>
                <span className="font-black text-base text-teal-400 font-mono bg-teal-950/80 px-2.5 py-0.5 rounded-lg border border-teal-500/30">
                  {hoursPerWeek}h / semana
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="40"
                step="2"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>10h (Intervenção Focada)</span>
                <span>20h</span>
                <span>40h (Protocolo Intensivo)</span>
              </div>
            </div>

            {/* Slider 3: Hourly Rate */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-slate-300">Valor Médio por Hora de Sessão:</label>
                <span className="font-black text-base text-emerald-400 font-mono bg-emerald-950/80 px-2.5 py-0.5 rounded-lg border border-emerald-500/30">
                  {formatCurrency(hourlyRate)} / hora
                </span>
              </div>
              <input
                type="range"
                min="80"
                max="250"
                step="10"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>R$ 80 (Convênio Base)</span>
                <span>R$ 150</span>
                <span>R$ 250 (Particular / Reembolso)</span>
              </div>
            </div>

            {/* Slider 4: Glosa Rate */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-slate-300">Taxa Atual de Glosas / Inconsistências:</label>
                <span className="font-black text-base text-rose-400 font-mono bg-rose-950/80 px-2.5 py-0.5 rounded-lg border border-rose-500/30">
                  {glosaRatePercent}%
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="1"
                value={glosaRatePercent}
                onChange={(e) => setGlosaRatePercent(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>1% (Excelente)</span>
                <span>5% (Média de Mercado)</span>
                <span>15% (Crítico)</span>
              </div>
            </div>

          </div>

          {/* Results Summary Box (Right) */}
          <div className="lg:col-span-6 rounded-3xl border border-indigo-500/40 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-950 p-6 sm:p-8 shadow-2xl shadow-indigo-950/50 space-y-6">
            
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" /> Retorno Financeiro Estimado
              </span>
              <span className="text-xs font-mono font-bold text-teal-400">
                ROI Projetado: +{estimatedRoiPercent}%
              </span>
            </div>

            {/* Big Headline Stat */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block">
                Economia Total Recuperada por Ano
              </span>
              <div className="text-3xl sm:text-4xl font-black text-transparent bg-gradient-to-r from-emerald-300 via-teal-200 to-indigo-300 bg-clip-text">
                {formatCurrency(annualProjectedSavings)}
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                Equivalente a <strong className="text-emerald-400">{formatCurrency(totalMonthlySavings)} / mês</strong> de faturamento protegido e tempo clínico recuperado.
              </p>
            </div>

            {/* Metric Breakdown Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Glosas Evitadas</span>
                </div>
                <div className="text-lg font-black text-white font-mono">
                  {formatCurrency(monthlyGlosaSaved)} <span className="text-xs text-slate-400 font-normal">/mês</span>
                </div>
                <p className="text-[10px] text-slate-400">Com assinatura digital e linter TISS v04.01.00.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 text-indigo-400 font-bold">
                  <Clock className="h-4 w-4" />
                  <span>Tempo de Supervisão</span>
                </div>
                <div className="text-lg font-black text-white font-mono">
                  {supervisorHoursSavedMonthly} horas <span className="text-xs text-slate-400 font-normal">/mês</span>
                </div>
                <p className="text-[10px] text-slate-400">Poupa relatórios e gráficos manuais no Excel.</p>
              </div>
            </div>

            {/* CTA in Calculator */}
            <div className="pt-2">
              <button
                onClick={onOpenDemoModal}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-teal-500 hover:from-indigo-500 hover:to-teal-400 px-6 py-4 text-sm font-extrabold text-white shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Receber Relatório Detalhado de ROI da Minha Clínica</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <p className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              Payback do investimento no SaaS ABA ocorre em menos de 20 dias.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};
