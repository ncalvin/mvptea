import React from 'react';
import { 
  Brain, 
  ShieldCheck, 
  Lock, 
  FileCheck2, 
  MessageSquare, 
  Heart, 
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const LandingFooter: React.FC<{ onOpenDemoModal: () => void; onOpenLiveApp: () => void }> = ({
  onOpenDemoModal,
  onOpenLiveApp,
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-teal-400 p-0.5 shadow-lg shadow-indigo-500/25">
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950">
                  <Brain className="h-5 w-5 text-teal-400" />
                </div>
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-tight text-white block">SaaS ABA</span>
                <span className="text-[11px] text-teal-400 font-bold">Enterprise v2.4 • Clinical Suite</span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              A plataforma definitiva para clínicas de Análise do Comportamento Aplicada (ABA). Unimos a ciência comportamental rigorosa com blindagem regulatória contra glosas e cumprimento da RN 539/2022 da ANS.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onOpenDemoModal}
                className="px-3.5 py-2 rounded-xl bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 font-bold hover:bg-indigo-600/30 transition-colors"
              >
                Solicitar Demonstração VIP
              </button>
              <button
                onClick={onOpenLiveApp}
                className="px-3.5 py-2 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 font-bold hover:bg-slate-800 transition-colors"
              >
                Acessar Plataforma
              </button>
            </div>
          </div>

          {/* Col 2: Soluções Clínicas */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide">Recursos Clínicos</h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => scrollTo('ia-clinica')} className="hover:text-purple-300 transition-colors text-left flex items-center gap-1 font-semibold text-purple-300">
                  <Sparkles className="h-3 w-3 text-purple-400" />
                  Copiloto de IA Clínica
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('coletor-demo')} className="hover:text-teal-300 transition-colors text-left">
                  Coletor DTT & NET Local-First
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('recursos')} className="hover:text-teal-300 transition-colors text-left">
                  PEI & Matrizes (VB-MAPP / ABLLS)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('recursos')} className="hover:text-teal-300 transition-colors text-left">
                  Índice WII & Curvas Cumulativas
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('pilares')} className="hover:text-teal-300 transition-colors text-left">
                  Ditado por Voz de Crises ABC
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('recursos')} className="hover:text-teal-300 transition-colors text-left">
                  Fidedignidade Trial-by-Trial IOA
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Regulatório & Anti-Glosa */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide">Regulatório & TISS</h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => scrollTo('anti-glosa')} className="hover:text-teal-300 transition-colors text-left">
                  Linter Pré-Envio de XML TISS
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('anti-glosa')} className="hover:text-teal-300 transition-colors text-left">
                  Folha de Presença Digital (GPS)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('anti-glosa')} className="hover:text-teal-300 transition-colors text-left">
                  Dossiê Judicial RN 539/2022
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('recursos')} className="hover:text-teal-300 transition-colors text-left">
                  Assinatura Digital PAdES / ICP
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('calculadora')} className="hover:text-teal-300 transition-colors text-left">
                  Calculadora de Economia Anti-Glosa
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Institucional & Contato */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide">Planos & Atendimento</h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => scrollTo('precos')} className="hover:text-teal-300 transition-colors text-left">
                  Planos & Preços Transparentes
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('depoimentos')} className="hover:text-teal-300 transition-colors text-left">
                  Casos de Sucesso de Clínicas
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('faq')} className="hover:text-teal-300 transition-colors text-left">
                  Perguntas Frequentes (FAQ)
                </button>
              </li>
              <li>
                <a 
                  href="https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20tirar%20dúvidas%20sobre%20o%20SaaS%20ABA." 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  WhatsApp Comercial
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Regulatory Badges */}
        <div className="mt-12 pt-8 border-t border-slate-900 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="text-[11px] font-medium text-slate-300">ANS RN 539/2022</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-center gap-2">
            <FileCheck2 className="h-4 w-4 text-teal-400" />
            <span className="text-[11px] font-medium text-slate-300">TISS XML v04.01.00</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-center gap-2">
            <Lock className="h-4 w-4 text-indigo-400" />
            <span className="text-[11px] font-medium text-slate-300">LGPD Lei 13.709/18</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-center gap-2">
            <Brain className="h-4 w-4 text-purple-400" />
            <span className="text-[11px] font-medium text-slate-300">BACB & ABPMC Guidelines</span>
          </div>
        </div>

        {/* Copyright & Disclaimer */}
        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} SaaS ABA Enterprise. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Termos de Uso</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Política de Privacidade & LGPD</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Segurança da Informação</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
