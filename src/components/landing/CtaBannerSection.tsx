import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Zap 
} from 'lucide-react';

interface CtaBannerSectionProps {
  onOpenDemoModal: () => void;
  onOpenLiveApp: () => void;
}

export const CtaBannerSection: React.FC<CtaBannerSectionProps> = ({
  onOpenDemoModal,
  onOpenLiveApp,
}) => {
  return (
    <section className="py-20 lg:py-28 relative bg-slate-950 overflow-hidden">
      {/* Glow ambient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-indigo-600/30 via-teal-500/25 to-purple-600/20 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="relative rounded-3xl border border-indigo-500/40 bg-gradient-to-b from-indigo-950/80 via-slate-900/95 to-slate-950 p-8 sm:p-14 shadow-2xl shadow-indigo-950/80 text-center max-w-5xl mx-auto overflow-hidden">
          
          {/* Subtle grid pattern inside */}
          <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-950/80 border border-emerald-500/30 px-4 py-1.5 text-xs font-semibold text-emerald-300 mb-6 relative z-10">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Modernize Sua Clínica em Menos de 48 Horas</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl mx-auto relative z-10">
            Pronto para Blindar o Faturamento da Sua Clínica e Revolucionar a Coleta ABA?
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed relative z-10">
            Elimine 100% das glosas de assiduidade, economize até 30 horas por mês em relatórios e dê aos seus terapeutas uma ferramenta que eles realmente amam usar.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 relative z-10">
            <button
              onClick={onOpenDemoModal}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-teal-500 hover:from-indigo-500 hover:to-teal-400 px-8 py-4 text-sm sm:text-base font-extrabold text-white shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95 group"
            >
              <span>Solicitar Demonstração VIP Gratuita</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenLiveApp}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 px-6 py-4 text-sm sm:text-base font-bold text-slate-200 hover:text-white transition-all hover:border-slate-500 shadow-lg"
            >
              <Sparkles className="h-4 w-4 text-teal-400" />
              <span>Explorar Plataforma Ao Vivo</span>
            </button>
          </div>

          {/* Bottom assurance items */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 pt-8 border-t border-slate-800/80 text-xs text-slate-400 font-medium relative z-10">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              Sem taxa de adesão oculta
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-teal-400" />
              Conforme RN 539/2022 & LGPD
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-indigo-400" />
              Migração de planilhas em 48h
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
