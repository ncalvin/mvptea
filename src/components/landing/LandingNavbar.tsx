import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Sparkles, 
  ArrowRight, 
  Menu, 
  X, 
  ShieldCheck, 
  Zap, 
  Calculator, 
  FileCheck2,
  Layers,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface LandingNavbarProps {
  onOpenDemoModal: () => void;
  onOpenLiveApp: () => void;
}

export const LandingNavbar: React.FC<LandingNavbarProps> = ({
  onOpenDemoModal,
  onOpenLiveApp,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Regulatory Notice Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-teal-950 border-b border-indigo-500/20 py-1.5 px-4 text-center text-xs font-medium text-slate-300 flex items-center justify-center gap-2">
        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>Conformidade 100% com a <strong className="text-emerald-400">RN 539/2022 da ANS</strong> & Exportação <strong className="text-indigo-300">TISS XML v04.01.00</strong></span>
        <span className="hidden md:inline text-slate-500">|</span>
        <button 
          onClick={onOpenDemoModal}
          className="hidden md:inline-flex items-center gap-1 text-teal-300 hover:text-teal-200 font-semibold underline underline-offset-2 ml-1"
        >
          Agendar demonstração VIP <ChevronRight className="h-3 w-3" />
        </button>
      </div>

      {/* Main Sticky Navbar */}
      <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 shadow-xl shadow-slate-950/50' 
          : 'bg-slate-950/60 backdrop-blur-md border-b border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-teal-400 p-0.5 shadow-lg shadow-indigo-500/25 group hover:scale-105 transition-transform">
              <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-slate-950">
                <Brain className="h-6 w-6 text-teal-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  SaaS ABA
                </span>
                <span className="rounded-full bg-gradient-to-r from-indigo-500/20 to-teal-500/20 px-2 py-0.5 text-[10px] font-extrabold text-teal-300 border border-teal-500/30">
                  ENTERPRISE v2.4
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Gestão Clínica, Coleta Local-First & Anti-Glosa</p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-7 text-xs font-semibold text-slate-300">
            <button 
              onClick={() => scrollToSection('pilares')} 
              className="hover:text-teal-400 transition-colors"
            >
              Os 2 Pilares
            </button>
            <button 
              onClick={() => scrollToSection('coletor-demo')} 
              className="hover:text-teal-400 transition-colors flex items-center gap-1"
            >
              <Zap className="h-3.5 w-3.5 text-amber-400" />
              Coletor &lt;1s
            </button>
            <button 
              onClick={() => scrollToSection('anti-glosa')} 
              className="hover:text-teal-400 transition-colors flex items-center gap-1"
            >
              <FileCheck2 className="h-3.5 w-3.5 text-emerald-400" />
              Anti-Glosa TISS
            </button>
            <button 
              onClick={() => scrollToSection('ia-clinica')} 
              className="hover:text-purple-400 transition-colors flex items-center gap-1 text-purple-300 font-bold"
            >
              <Sparkles className="h-3.5 w-3.5 text-purple-400" />
              IA Clínica
            </button>
            <button 
              onClick={() => scrollToSection('recursos')} 
              className="hover:text-teal-400 transition-colors"
            >
              Recursos
            </button>
            <button 
              onClick={() => scrollToSection('calculadora')} 
              className="hover:text-teal-400 transition-colors flex items-center gap-1"
            >
              <Calculator className="h-3.5 w-3.5 text-indigo-400" />
              Calculadora ROI
            </button>
            <button 
              onClick={() => scrollToSection('comparativo')} 
              className="hover:text-teal-400 transition-colors"
            >
              Comparativo
            </button>
            <button 
              onClick={() => scrollToSection('depoimentos')} 
              className="hover:text-teal-400 transition-colors"
            >
              Depoimentos
            </button>
            <button 
              onClick={() => scrollToSection('precos')} 
              className="hover:text-teal-400 transition-colors"
            >
              Planos
            </button>
            <button 
              onClick={() => scrollToSection('faq')} 
              className="hover:text-teal-400 transition-colors"
            >
              FAQ
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenLiveApp}
              className="flex items-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 px-4 py-2.5 text-xs font-bold text-slate-200 hover:text-white transition-all hover:border-slate-600 group"
              title="Abrir a aplicação operacional com dados clínicos reais"
            >
              <Sparkles className="h-4 w-4 text-teal-400 group-hover:rotate-12 transition-transform" />
              <span>Acessar Plataforma Ao Vivo</span>
            </button>

            <button
              onClick={onOpenDemoModal}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-teal-500 hover:from-indigo-500 hover:to-teal-400 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/25 transition-all hover:scale-105 active:scale-95"
            >
              <span>Agendar Demonstração VIP</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={onOpenLiveApp}
              className="sm:hidden flex items-center gap-1.5 rounded-lg bg-slate-900 border border-slate-800 px-2.5 py-1.5 text-xs font-bold text-teal-400"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>App</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-slate-950/95 border-b border-slate-800 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
              <button 
                onClick={() => scrollToSection('pilares')} 
                className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/60 text-slate-300 hover:bg-slate-800"
              >
                <Layers className="h-4 w-4 text-indigo-400" />
                Os 2 Pilares
              </button>
              <button 
                onClick={() => scrollToSection('coletor-demo')} 
                className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/60 text-slate-300 hover:bg-slate-800"
              >
                <Zap className="h-4 w-4 text-amber-400" />
                Coletor &lt;1s
              </button>
              <button 
                onClick={() => scrollToSection('anti-glosa')} 
                className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/60 text-slate-300 hover:bg-slate-800"
              >
                <FileCheck2 className="h-4 w-4 text-emerald-400" />
                Anti-Glosa TISS
              </button>
              <button 
                onClick={() => scrollToSection('ia-clinica')} 
                className="flex items-center gap-2 p-2.5 rounded-lg bg-purple-950/60 text-purple-300 hover:bg-purple-900/60 border border-purple-500/30"
              >
                <Sparkles className="h-4 w-4 text-purple-400" />
                IA Clínica
              </button>
              <button 
                onClick={() => scrollToSection('recursos')} 
                className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/60 text-slate-300 hover:bg-slate-800"
              >
                <Sparkles className="h-4 w-4 text-teal-400" />
                Recursos
              </button>
              <button 
                onClick={() => scrollToSection('calculadora')} 
                className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/60 text-slate-300 hover:bg-slate-800"
              >
                <Calculator className="h-4 w-4 text-indigo-400" />
                Calculadora ROI
              </button>
              <button 
                onClick={() => scrollToSection('comparativo')} 
                className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/60 text-slate-300 hover:bg-slate-800"
              >
                <ShieldCheck className="h-4 w-4 text-teal-400" />
                Comparativo
              </button>
              <button 
                onClick={() => scrollToSection('depoimentos')} 
                className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/60 text-slate-300 hover:bg-slate-800"
              >
                Depoimentos
              </button>
              <button 
                onClick={() => scrollToSection('precos')} 
                className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/60 text-slate-300 hover:bg-slate-800"
              >
                Planos & Preços
              </button>
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLiveApp();
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 border border-slate-700 py-3 text-xs font-bold text-slate-200"
              >
                <ExternalLink className="h-4 w-4 text-teal-400" />
                <span>Acessar Plataforma Ao Vivo</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDemoModal();
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-teal-500 py-3 text-xs font-bold text-white shadow-lg"
              >
                <span>Agendar Demonstração VIP</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
