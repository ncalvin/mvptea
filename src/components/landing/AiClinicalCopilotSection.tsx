import React, { useState } from 'react';
import { 
  Sparkles, 
  Mic, 
  Bot, 
  FileText, 
  ShieldAlert, 
  Check, 
  ArrowRight, 
  Layers, 
  Lock, 
  Scale, 
  Activity,
  Send,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

interface AiClinicalCopilotSectionProps {
  onOpenDemoModal: () => void;
  onOpenLiveApp: () => void;
}

export const AiClinicalCopilotSection: React.FC<AiClinicalCopilotSectionProps> = ({
  onOpenDemoModal,
  onOpenLiveApp,
}) => {
  const [activeTab, setActiveTab] = useState<'speech-abc' | 'report-writer' | 'pei-suggester'>('speech-abc');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // State for Speech-to-ABC Simulator
  const [selectedVoiceSample, setSelectedVoiceSample] = useState(0);
  const VOICE_SAMPLES = [
    {
      text: '"Ele se jogou no chão e gritou por 3 minutos quando pedi para guardar o iPad; retirei a atenção e redirecionei para o painel de rotina visual."',
      ant: 'Transição de atividade / Retirada do iPad',
      beh: 'Disrupção motora (jogar-se no chão) e vocalização alta por 3 minutos',
      csq: 'Extinção de atenção com redirecionamento neutro para rotina visual',
      fn: 'Acesso a Tangível / Fuga de Transição',
      intensity: 3,
      duration: '3 minutos',
    },
    {
      text: '"Tentou morder o antebraço ao apresentar o cartão novo do elefante; fiz bloqueio neutro com anteparo e forneci dica gestual imediata."',
      ant: 'Apresentação de estímulo de alta complexidade (Tato / Cartão Novo)',
      beh: 'Tentativa de autoagressão (morder o próprio antebraço) e recusa motora',
      csq: 'Bloqueio protetivo sem contato visual e dica gestual imediata (Errorless)',
      fn: 'Fuga/Esquiva de Demanda',
      intensity: 4,
      duration: '1 minuto',
    },
    {
      text: '"Puxou a mão da terapeuta em direção ao armário de brinquedos sem vocalizar; pausei e aguardei apontar para o cartão de bolhas."',
      ant: 'Operação Motivadora espontânea (brinquedo fora de alcance)',
      beh: 'Mando não vocal por condução motora física da terapeuta',
      csq: 'Espera de latência e modelagem para apontamento do cartão PECS correspondente',
      fn: 'Comunicação Funcional / Mando',
      intensity: 1,
      duration: '30 segundos',
    }
  ];

  const handleSimulateAi = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 450);
  };

  return (
    <section id="ia-clinica" className="py-20 lg:py-28 relative bg-slate-950 border-b border-slate-900 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-purple-600/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-indigo-600/15 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-950/80 border border-purple-500/40 px-4 py-1.5 text-xs font-bold text-purple-300 shadow-lg shadow-purple-950/50 mb-3">
            <Sparkles className="h-4 w-4 text-purple-400 animate-spin" />
            <span>Inteligência Artificial Clínica Nativa & Copiloto BCBA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            A Primeira IA Especializada na Ciência do Comportamento (ABA)
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300">
            Não é um chatbot genérico. É um copiloto treinado estritamente nas metodologias do <strong className="text-purple-300">VB-MAPP</strong>, no cálculo do <strong className="text-teal-300">Índice WII</strong> e no enquadramento jurídico da <strong className="text-emerald-300">RN 539/2022 da ANS</strong>.
          </p>
        </div>

        {/* The 5 AI Superpowers Strip */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-6xl mx-auto mb-12">
          {[
            { title: 'Ditado ABC por Voz', desc: '< 5 segundos', icon: Mic, color: 'text-purple-400' },
            { title: 'Laudos RN 539', desc: '1 Clique em PDF', icon: Scale, color: 'text-emerald-400' },
            { title: 'Alerta de Platô', desc: 'Predição WII', icon: Activity, color: 'text-teal-400' },
            { title: 'Prescrição PEI', desc: 'VB-MAPP / ABLLS', icon: Layers, color: 'text-indigo-400' },
            { title: 'Segurança LGPD', desc: 'Anonimização Total', icon: Lock, color: 'text-pink-400' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 text-center hover:border-purple-500/40 transition-colors">
                <Icon className={`h-5 w-5 mx-auto mb-1.5 ${item.color}`} />
                <h4 className="text-xs font-bold text-white leading-tight">{item.title}</h4>
                <span className="text-[10px] text-slate-400 block mt-0.5">{item.desc}</span>
              </div>
            );
          })}
        </div>

        {/* Live Interactive AI Playground */}
        <div className="max-w-5xl mx-auto rounded-3xl border border-purple-500/30 bg-gradient-to-b from-purple-950/30 via-slate-900/90 to-slate-950 p-6 sm:p-8 shadow-2xl shadow-purple-950/40 space-y-6">
          
          {/* Playground Tab Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-wider">
                Simulador Interativo da IA Clínica
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white">Teste os Modelos de IA em Tempo Real</h3>
            </div>

            <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-bold">
              {[
                { id: 'speech-abc', label: '🎤 Ditado de Voz ABC', icon: Mic },
                { id: 'report-writer', label: '🛡️ Redator Laudo RN 539', icon: FileText },
                { id: 'pei-suggester', label: '🎯 Sugestor de PEI', icon: Layers },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    handleSimulateAi();
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* SIMULATOR 1: SPEECH TO ABC */}
          {activeTab === 'speech-abc' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span>Selecione uma narração de crise para ver a IA estruturar a contingência:</span>
                  <span className="text-[11px] text-purple-300 font-mono">Speech-to-Contingency v2.4</span>
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {VOICE_SAMPLES.map((sample, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedVoiceSample(idx);
                        handleSimulateAi();
                      }}
                      className={`p-3 rounded-xl border text-left text-xs transition-all flex items-start gap-2 ${
                        selectedVoiceSample === idx
                          ? 'bg-purple-950/80 border-purple-500 text-white font-medium ring-1 ring-purple-500/40'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
                      }`}
                    >
                      <Mic className={`h-4 w-4 shrink-0 mt-0.5 ${selectedVoiceSample === idx ? 'text-purple-400' : 'text-slate-500'}`} />
                      <span className="line-clamp-2">{sample.text}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Transcribed Speech Box */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-purple-200 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-purple-400 animate-ping" />
                <span>Transcrição de Áudio:</span>
                <span className="text-white italic">{VOICE_SAMPLES[selectedVoiceSample].text}</span>
              </div>

              {/* AI Structured Output Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-indigo-500/30 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-indigo-400 block">(A) Antecedente Identificado</span>
                  <p className="text-xs sm:text-sm font-semibold text-white">{VOICE_SAMPLES[selectedVoiceSample].ant}</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/90 border border-rose-500/30 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-rose-400 block">(B) Comportamento Mensurado</span>
                  <p className="text-xs sm:text-sm font-semibold text-white">{VOICE_SAMPLES[selectedVoiceSample].beh}</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/30 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 block">(C) Consequência / Manejo</span>
                  <p className="text-xs sm:text-sm font-semibold text-white">{VOICE_SAMPLES[selectedVoiceSample].csq}</p>
                </div>
              </div>

              {/* Inferred Function and Severity */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/30 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Função Hipotética Presumida pela IA:</span>
                  <span className="px-2.5 py-1 rounded-lg bg-purple-900/60 text-purple-200 font-bold border border-purple-700">
                    {VOICE_SAMPLES[selectedVoiceSample].fn}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400">Intensidade: <strong className="text-rose-400 font-mono">{VOICE_SAMPLES[selectedVoiceSample].intensity}/5</strong></span>
                  <span className="text-slate-400">Duração: <strong className="text-teal-400 font-mono">{VOICE_SAMPLES[selectedVoiceSample].duration}</strong></span>
                </div>
              </div>
            </div>
          )}

          {/* SIMULATOR 2: REPORT WRITER RN 539 */}
          {activeTab === 'report-writer' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Scale className="h-4 w-4 text-emerald-400" />
                    <span className="text-xs font-bold text-white">Parágrafo Pericial Anti-Glosa Gerado pelo Copiloto de IA</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold">
                    Pronto para Assinatura PAdES
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed space-y-2 font-serif">
                  <p>
                    "No período avaliado (01/05 a 30/09/2026), o aprendiz <strong>Enzo Gabriel (CID-11: 6A02.0 / TEA Nível 2)</strong> totalizou 160 horas de intervenção multidisciplinar ABA. Conforme demonstrado no Gráfico 3.2 de Curvas Cumulativas, o aprendiz adquiriu <strong>18 novos alvos de comunicação funcional</strong>, elevando seu Índice Ponderado de Independência (WII) de <strong>42,1% para 83,4%</strong>."
                  </p>
                  <p>
                    "A manutenção da carga horária intensiva prescrita de <strong>20 horas semanais</strong> é estritamente imperativa para consolidar a generalização no ambiente escolar e prevenir regressões comportamentais, em estrito cumprimento à <strong>Resolução Normativa nº 539/2022 da ANS</strong> que veda qualquer limitação de sessões pelo plano de saúde."
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" /> 100% Auditável com Gráficos e Assinatura Digital
                  </span>
                  <span className="text-slate-400">Tempo de geração: 0.8s</span>
                </div>
              </div>
            </div>
          )}

          {/* SIMULATOR 3: PEI SUGGESTER */}
          {activeTab === 'pei-suggester' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-indigo-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-indigo-400" />
                    <span className="text-xs font-bold text-white">Prescrição Assistida de Alvo PEI (Base: VB-MAPP Mando Nível 2)</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 text-[10px] font-bold">
                    Protocolo Recomendado
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Estímulo Discriminativo ($S^D$ / MO)</span>
                    <p className="text-white font-medium">Operação Motivadora: Item favorito mantido fora do alcance visual</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Hierarquia de Dicas Inicial</span>
                    <p className="text-teal-300 font-medium">Least-to-Most: Gestual (GP) ➔ Modelo (MP) ➔ Físico Parcial (PP)</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Critério de Domínio Parametrizado</span>
                    <p className="text-emerald-400 font-medium">80% IND por 3 sessões consecutivas com 2 aplicadores</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Esteira de Manutenção Pós-Domínio</span>
                    <p className="text-purple-300 font-medium">Sondas automáticas agendadas em D+7, D+14, D+30 e D+90</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Simulator Footer Action */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800/80">
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-pink-400" />
              Anonimização total LGPD com zero retenção de dados para treinamento
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenLiveApp}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200"
              >
                Testar no App
              </button>
              <button
                onClick={onOpenDemoModal}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-xs font-bold text-white shadow-lg shadow-purple-600/30 transition-all hover:scale-105"
              >
                <span>Ver Demonstração de IA ao Vivo</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
