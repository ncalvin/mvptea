import React, { useState } from 'react';
import { LandingNavbar } from './LandingNavbar';
import { HeroSection } from './HeroSection';
import { TwoPillarsSection } from './TwoPillarsSection';
import { AiClinicalCopilotSection } from './AiClinicalCopilotSection';
import { InteractiveDttPlayground } from './InteractiveDttPlayground';
import { RoiCalculatorSection } from './RoiCalculatorSection';
import { FeatureDeepDiveSection } from './FeatureDeepDiveSection';
import { ComparisonSection } from './ComparisonSection';
import { RoleShowcaseSection } from './RoleShowcaseSection';
import { TestimonialsSection } from './TestimonialsSection';
import { PricingSection } from './PricingSection';
import { FaqSection } from './FaqSection';
import { CtaBannerSection } from './CtaBannerSection';
import { LandingFooter } from './LandingFooter';
import { DemoBookingModal } from './DemoBookingModal';
import { MessageSquare, Sparkles } from 'lucide-react';

interface LandingPageProps {
  onOpenLiveApp: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenLiveApp }) => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const scrollToSimulator = () => {
    const el = document.getElementById('coletor-demo');
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white relative">
      
      {/* Top Marketing Navigation */}
      <LandingNavbar
        onOpenDemoModal={() => setIsDemoModalOpen(true)}
        onOpenLiveApp={onOpenLiveApp}
      />

      {/* Hero Section with Interactive Mockup */}
      <HeroSection
        onOpenDemoModal={() => setIsDemoModalOpen(true)}
        onOpenLiveApp={onOpenLiveApp}
        onScrollToSimulator={scrollToSimulator}
      />

      {/* The 2 Non-Negotiable Pillars */}
      <TwoPillarsSection
        onOpenDemoModal={() => setIsDemoModalOpen(true)}
        onOpenLiveApp={onOpenLiveApp}
      />

      {/* AI Clinical Copilot & Speech-to-ABC Showcase */}
      <AiClinicalCopilotSection
        onOpenDemoModal={() => setIsDemoModalOpen(true)}
        onOpenLiveApp={onOpenLiveApp}
      />

      {/* Live Interactive DTT Simulator */}
      <InteractiveDttPlayground
        onOpenLiveApp={onOpenLiveApp}
        onOpenDemoModal={() => setIsDemoModalOpen(true)}
      />

      {/* Comprehensive Feature Deep Dive */}
      <FeatureDeepDiveSection
        onOpenLiveApp={onOpenLiveApp}
        onOpenDemoModal={() => setIsDemoModalOpen(true)}
      />

      {/* Interactive ROI Calculator */}
      <RoiCalculatorSection
        onOpenDemoModal={() => setIsDemoModalOpen(true)}
      />

      {/* Market Comparison Matrix */}
      <ComparisonSection
        onOpenDemoModal={() => setIsDemoModalOpen(true)}
      />

      {/* Personas & Roles Showcase */}
      <RoleShowcaseSection
        onOpenDemoModal={() => setIsDemoModalOpen(true)}
      />

      {/* Verified Clinic Testimonials */}
      <TestimonialsSection />

      {/* Pricing Tiers & Packages */}
      <PricingSection
        onOpenDemoModal={() => setIsDemoModalOpen(true)}
      />

      {/* Interactive FAQ Accordion */}
      <FaqSection
        onOpenDemoModal={() => setIsDemoModalOpen(true)}
      />

      {/* High-Impact Pre-Footer CTA */}
      <CtaBannerSection
        onOpenDemoModal={() => setIsDemoModalOpen(true)}
        onOpenLiveApp={onOpenLiveApp}
      />

      {/* Footer */}
      <LandingFooter
        onOpenDemoModal={() => setIsDemoModalOpen(true)}
        onOpenLiveApp={onOpenLiveApp}
      />

      {/* Lead Generation / VIP Demo Booking Modal */}
      <DemoBookingModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onOpenAppDemo={onOpenLiveApp}
      />

      {/* Floating Action Button: Quick WhatsApp Contact */}
      <a
        href="https://wa.me/5511999999999?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20o%20SaaS%20ABA."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 px-4 py-3 text-xs font-bold text-white shadow-2xl shadow-emerald-950/80 border border-emerald-400/40 transition-all hover:scale-105 active:scale-95 group"
        title="Falar com consultor no WhatsApp"
      >
        <MessageSquare className="h-5 w-5 fill-white" />
        <span className="hidden sm:inline">Falar com Consultor</span>
      </a>

      {/* Floating Action Button: Test Live App */}
      <button
        onClick={onOpenLiveApp}
        className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-2 rounded-full bg-slate-900 hover:bg-slate-800 px-4 py-3 text-xs font-bold text-teal-300 shadow-2xl shadow-slate-950/80 border border-teal-500/40 transition-all hover:scale-105 group"
        title="Acessar ambiente operacional do aplicativo"
      >
        <Sparkles className="h-4 w-4 text-teal-400 group-hover:rotate-12 transition-transform" />
        <span>Abrir Sistema Ao Vivo</span>
      </button>

    </div>
  );
};
