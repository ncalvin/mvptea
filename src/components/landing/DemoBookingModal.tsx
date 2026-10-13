import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  Users, 
  MessageSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DemoBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAppDemo?: () => void;
}

export const DemoBookingModal: React.FC<DemoBookingModalProps> = ({
  isOpen,
  onClose,
  onOpenAppDemo,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    clinicName: '',
    email: '',
    phone: '',
    patientCount: '15-30',
    primaryGoal: 'eliminar-glosas',
    role: 'Diretor / Gestor',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.error(err);
      }
    }, 800);
  };

  const handleWhatsAppRedirect = () => {
    const text = encodeURIComponent(
      `Olá! Gostaria de agendar uma demonstração VIP do SaaS ABA para a clínica ${formData.clinicName || 'minha clínica'}. Meu nome é ${formData.name || 'um gestor'}.`
    );
    window.open(`https://wa.me/5511999999999?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-xl rounded-2xl border border-slate-700/80 bg-slate-900/95 p-6 sm:p-8 shadow-2xl shadow-indigo-950/50 text-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient header */}
        <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-teal-500/20 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider mb-2">
              <Sparkles className="h-4 w-4" />
              <span>Demonstração Guiada e Personalizada</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
              Transforme a Gestão Clínica e Anti-Glosa da Sua Clínica ABA
            </h2>
            <p className="text-slate-400 text-sm mb-6">
              Veja em 20 minutos como o SaaS ABA reduz 30h/mês de relatórios e zera contestações de operadoras com a RN 539/2022.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-slate-400" />
                    Seu Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Dra. Mariana Silva"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5 text-slate-400" />
                    Nome da Clínica
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Clínica NeuroSaber"
                    value={formData.clinicName}
                    onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-slate-400" />
                    WhatsApp para Contato
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(11) 98765-4321"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-slate-400" />
                    E-mail Corporativo
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="mariana@clinica.com.br"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-slate-400" />
                    Quantidade de Aprendizes Ativos
                  </label>
                  <select
                    value={formData.patientCount}
                    onChange={(e) => setFormData({ ...formData, patientCount: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3.5 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                  >
                    <option value="1-10">Até 10 aprendizes (Consultório)</option>
                    <option value="11-30">11 a 30 aprendizes</option>
                    <option value="31-70">31 a 70 aprendizes</option>
                    <option value="70+">Mais de 70 aprendizes (Rede / Franquia)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <MessageSquare className="h-3.5 w-3.5 text-slate-400" />
                    Principal Desafio Atual
                  </label>
                  <select
                    value={formData.primaryGoal}
                    onChange={(e) => setFormData({ ...formData, primaryGoal: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3.5 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                  >
                    <option value="eliminar-glosas">Eliminar Glosas & Lotes TISS XML</option>
                    <option value="tempo-relatorios">Reduzir Tempo em Relatórios & Gráficos</option>
                    <option value="coleta-tablet">Substituir Papel por Tablet na Sessão</option>
                    <option value="liminares">Cumprimento de Liminares & RN 539/2022</option>
                    <option value="todos">Todos os anteriores</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-teal-500 hover:from-indigo-500 hover:to-teal-400 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                >
                  {loading ? (
                    <span>Processando agendamento...</span>
                  ) : (
                    <>
                      <span>Solicitar Demonstração VIP Gratuita</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  Conforme LGPD & ANS
                </span>
                <span>•</span>
                <span>Sem compromisso</span>
                <span>•</span>
                <span>Implantação assistida</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-5">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="h-9 w-9" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white">Solicitação Confirmada com Sucesso!</h3>
              <p className="text-slate-300 text-sm mt-2 max-w-md mx-auto">
                Excelente, <strong className="text-white">{formData.name}</strong>! Nosso consultor clínico entrará em contato pelo WhatsApp <strong className="text-indigo-300">{formData.phone}</strong> para agendar a demonstração exclusiva para a <strong className="text-white">{formData.clinicName}</strong>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex items-center justify-between text-slate-400">
                <span>Plano Indicado:</span>
                <span className="font-semibold text-emerald-400">SaaS ABA Pro Enterprise</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Foco Estratégico:</span>
                <span className="font-semibold text-slate-200">Blindagem Anti-Glosa &amp; Coleta &lt; 1s</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Tempo de Demonstração:</span>
                <span className="font-semibold text-indigo-300">20 min (Google Meet)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handleWhatsAppRedirect}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-600/25 transition-all"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Conversar Imediatamente no WhatsApp</span>
              </button>

              {onOpenAppDemo && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenAppDemo();
                  }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 px-5 py-2.5 text-xs font-bold text-slate-200 border border-slate-700 transition-all"
                >
                  <Sparkles className="h-4 w-4 text-teal-400" />
                  <span>Explorar Sistema Demo Ao Vivo</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
