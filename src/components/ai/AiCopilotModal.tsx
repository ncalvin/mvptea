import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  X, 
  Send, 
  Lightbulb, 
  Scale, 
  Layers, 
  Activity, 
  CheckCircle2, 
  FileText,
  TrendingUp,
  Brain
} from 'lucide-react';
import { Patient } from '../../types/aba';

interface AiCopilotModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient;
}

export const AiCopilotModal: React.FC<AiCopilotModalProps> = ({
  isOpen,
  onClose,
  patient,
}) => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; time: string; actionData?: any }>>([
    {
      sender: 'ai',
      text: `Olá! Sou o Copiloto Clínico de IA do SaaS ABA. Estou analisando os dados em tempo real do aprendiz ${patient.name} (${patient.ageYears}a ${patient.ageMonths}m • ${patient.diagnosis}). Como posso ajudar você hoje?`,
      time: 'Agora',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleQuickPrompt = (type: 'plato' | 'rn539' | 'vbmpp' | 'bip') => {
    let userMsg = '';
    let aiResponse = '';

    if (type === 'plato') {
      userMsg = 'Verificar se há algum alvo em platô ou estagnação nas últimas sessões.';
      aiResponse = `📊 **Análise de Séries Temporais e WII**:
- Alvo em Atenção: **${patient.programs[0]?.title || 'Contato Visual'}**
- Desempenho: O WII estabilizou em **72% nas últimas 4 sessões** (variação < 3%).
- **Recomendação Clínica da IA**: 
  1. Realizar transição da estratégia de *Least-to-Most* para *Errorless Learning* na dica gestual.
  2. Testar novo reforçador de alta preferência (${patient.quickBriefing?.topReinforcers[0] || 'Massinha azul'}).`;
    } else if (type === 'rn539') {
      userMsg = 'Gerar justificativa pericial para manutenção de 20h semanais com base na RN 539/2022.';
      aiResponse = `⚖️ **Parágrafo Pericial Gerado para Laudo Anti-Glosa**:
"O aprendiz ${patient.name}, diagnosticado com ${patient.diagnosis} (${patient.cidCode}), cumpre plano terapêutico intensivo com evolução positiva comprovada com ${patient.masteredTargetsCount} alvos dominados. A manutenção da carga prescrita de ${patient.authorizedHoursWeek}h/semanais é indispensável para a consolidação de generalização de mandos e prevenção de regressões comportamentais, sob amparo da **Resolução Normativa nº 539/2022 da ANS**."`;
    } else if (type === 'vbmpp') {
      userMsg = 'Sugerir próximos 2 alvos do VB-MAPP Nível 2 compatíveis com o perfil.';
      aiResponse = `🎯 **Sugestões de Metas PEI (Base: VB-MAPP)**:
1. **Mando Nível 2 (Marco 7)**: Solicita a cessação de atividade aversiva usando o mando "Para" ou "Não" com apoio gestual.
2. **Tato Nível 2 (Marco 6)**: Nomeia 10 ações diferentes em vídeos curtos ou figuras de ação.`;
    } else {
      userMsg = 'Consultar estratégias antecedentes recomendadas para comportamentos de fuga.';
      aiResponse = `🛡️ **Estratégias Antecedentes (BIP)**:
- Previsibilidade com cronômetro visual de 2 minutos antes de transições.
- Aumento na densidade de reforçamento diferencial (DRA) a cada 3 minutos de engajamento independente.`;
    }

    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userMsg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    ]);

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: aiResponse, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      ]);
    }, 600);
  };

  const handleSendCustomMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userText = prompt;
    setPrompt('');
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    ]);

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `Compreendido! Com base no histórico clínico de ${patient.name} e nos ${patient.acquisitionTargetsCount} alvos em aquisição, recomendo manter o protocolo com sondas de manutenção D+7 e registrar as contingências ABC no tablet imediatamente após cada ocorrência.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl rounded-3xl border border-purple-500/30 bg-slate-900/95 p-6 shadow-2xl shadow-purple-950/50 flex flex-col h-[600px] text-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient header */}
        <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 p-0.5 shadow-lg shadow-purple-500/30 flex items-center justify-center">
              <div className="h-full w-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Bot className="h-5 w-5 text-purple-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-white">Copiloto Clínico com IA</h3>
                <span className="px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800 text-[10px] font-mono font-bold">
                  v2.4 ABA LLM
                </span>
              </div>
              <p className="text-xs text-slate-400">Contexto ativo: <strong className="text-slate-200">{patient.name}</strong></p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Quick Action Chips */}
        <div className="py-3 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0 border-b border-slate-800/80">
          <button
            onClick={() => handleQuickPrompt('plato')}
            className="px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 text-[11px] font-semibold text-slate-300 hover:text-purple-300 whitespace-nowrap flex items-center gap-1.5 transition-colors"
          >
            <Activity className="h-3.5 w-3.5 text-teal-400" />
            <span>Alerta de Platô / WII</span>
          </button>
          <button
            onClick={() => handleQuickPrompt('rn539')}
            className="px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 text-[11px] font-semibold text-slate-300 hover:text-emerald-300 whitespace-nowrap flex items-center gap-1.5 transition-colors"
          >
            <Scale className="h-3.5 w-3.5 text-emerald-400" />
            <span>Laudo RN 539/2022</span>
          </button>
          <button
            onClick={() => handleQuickPrompt('vbmpp')}
            className="px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 text-[11px] font-semibold text-slate-300 hover:text-indigo-300 whitespace-nowrap flex items-center gap-1.5 transition-colors"
          >
            <Layers className="h-3.5 w-3.5 text-indigo-400" />
            <span>Sugerir Alvos VB-MAPP</span>
          </button>
        </div>

        {/* Chat History Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed space-y-1.5 ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-none shadow-md'
                    : 'bg-slate-950 border border-slate-800/90 text-slate-200 rounded-bl-none shadow-md'
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>
                <span className={`text-[9px] block text-right font-mono ${msg.sender === 'user' ? 'text-indigo-200' : 'text-slate-500'}`}>
                  {msg.time}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-purple-400 bg-slate-950/80 p-3 rounded-2xl border border-purple-500/20 w-fit">
              <Sparkles className="h-4 w-4 animate-spin" />
              <span>Copiloto de IA analisando dados clínicos...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendCustomMessage} className="pt-3 border-t border-slate-800 flex items-center gap-2 shrink-0">
          <input
            type="text"
            placeholder="Digite uma dúvida clínica, solicitação de PEI ou laudo..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={!prompt.trim() || isTyping}
            className="p-2.5 rounded-2xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white shadow-lg shadow-purple-600/30 transition-all hover:scale-105"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
