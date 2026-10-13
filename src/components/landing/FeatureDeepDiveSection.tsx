import React, { useState } from 'react';
import { 
  Zap, 
  Layers, 
  PieChart, 
  ShieldCheck, 
  Scale, 
  Users, 
  Check, 
  ArrowRight,
  Brain,
  Activity,
  FileCheck2,
  FileText,
  Clock,
  Sparkles,
  Target
} from 'lucide-react';

interface FeatureDeepDiveSectionProps {
  onOpenLiveApp: () => void;
  onOpenDemoModal: () => void;
}

export const FeatureDeepDiveSection: React.FC<FeatureDeepDiveSectionProps> = ({
  onOpenLiveApp,
  onOpenDemoModal,
}) => {
  const [activeTab, setActiveTab] = useState<'multimodal' | 'pei' | 'analytics' | 'antiglosa' | 'judicial' | 'family'>('multimodal');

  const FEATURE_TABS = [
    { id: 'multimodal', label: 'Coleta Multimodal Local-First', icon: Zap, color: 'text-amber-400' },
    { id: 'pei', label: 'PEI, BIP & VB-MAPP', icon: Layers, color: 'text-indigo-400' },
    { id: 'analytics', label: 'Motor de Gráficos & WII', icon: PieChart, color: 'text-teal-400' },
    { id: 'antiglosa', label: 'Escudo Anti-Glosa & TISS', icon: ShieldCheck, color: 'text-emerald-400' },
    { id: 'judicial', label: 'Dossiê Judicial RN 539', icon: Scale, color: 'text-purple-400' },
    { id: 'family', label: 'Portal da Família', icon: Users, color: 'text-pink-400' },
  ];

  return (
    <section id="recursos" className="py-20 lg:py-28 relative bg-slate-900/40 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 border border-slate-800 px-3.5 py-1 text-xs font-semibold text-slate-300 mb-3">
            <Sparkles className="h-3.5 w-3.5 text-teal-400" />
            <span>Ecossistema Completo de Intervenção ABA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Cada Detalhe Pensado para a Rotina Real das Clínicas
          </h2>
          <p className="mt-3 text-base text-slate-400">
            Da sessão prática no tablet com a criança até a auditoria jurídica contra operadoras de planos de saúde.
          </p>
        </div>

        {/* Feature Tabs Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none justify-start lg:justify-center">
          {FEATURE_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-slate-900 border-indigo-500/60 text-white shadow-lg shadow-indigo-950/40 ring-1 ring-indigo-500/30'
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`h-4 w-4 ${tab.color}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Box */}
        <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-6 sm:p-10 shadow-2xl shadow-indigo-950/30">
          
          {/* TAB 1: COLETA MULTIMODAL */}
          {activeTab === 'multimodal' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-fadeIn">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-bold">
                  Latência Zero • 100% Offline
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  6 Modalidades de Medição Comportamental no Mesmo Tablet
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Não importa se a sessão é estruturada em mesa ou lúdica no chão: o aplicador transita facilmente entre métodos sem perder o engajamento com a criança.
                </p>

                <div className="space-y-3 pt-2">
                  {[
                    { title: 'Tentativas Discretas (DTT) & Ensino Natural (NET)', desc: 'Hierarquia com 7 níveis de dicas, desvanecimento gradual e cálculo de WII.' },
                    { title: 'Frequência e Taxa (Rate / Minuto)', desc: 'Contagem instantânea para mandos espontâneos, ecolalias e comportamentos-alvo.' },
                    { title: 'Duração e Latência com Cronômetros', desc: 'Medição precisa de permanência em atividade e tempo de resposta.' },
                    { title: 'Registro de Intervalos (PIR, WIR, MTS)', desc: 'Amostragem de tempo parcial, total e momentânea com bipes configuráveis.' },
                    { title: 'Análise de Tarefas (Task Analysis)', desc: 'Encadeamento para frente, para trás ou tarefa total para AVDs e autonomia.' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="h-5 w-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="h-3 w-3" />
                      </div>
                      <div>
                        <strong className="text-xs sm:text-sm font-bold text-white block">{item.title}</strong>
                        <span className="text-xs text-slate-400">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
                    <Activity className="h-4 w-4 text-amber-400" />
                    Fluxo de Sessão Local-First
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    Sincronização em Segundo Plano
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">1. Início de Sessão</span>
                    <span className="text-indigo-400 font-mono">0.0s</span>
                  </div>
                  <p className="text-xs text-slate-400">Card de Boas-Vindas apresenta os reforçadores vigentes da semana.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">2. Coleta de Tentativas</span>
                    <span className="text-teal-400 font-mono">&lt; 1.0s / toque</span>
                  </div>
                  <p className="text-xs text-slate-400">Gravação direta no IndexedDB com feedback de áudio regulável.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">3. Check-out com Assinatura</span>
                    <span className="text-emerald-400 font-mono">Carimbo GPS</span>
                  </div>
                  <p className="text-xs text-slate-400">Responsável assina na tela do tablet e a guia é blindada contra glosas.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PEI & BIP */}
          {activeTab === 'pei' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-fadeIn">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 text-xs font-bold">
                  Padrão-Ouro Científico
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  Plano de Ensino Individualizado (PEI) & BIP Integrados
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Prescreva alvos baseados nas principais matrizes de avaliação do neurodesenvolvimento com esteira automática de manutenção e generalização.
                </p>

                <div className="space-y-3 pt-2">
                  {[
                    { title: 'Centro de 6 Protocolos Padronizados (VB-MAPP, Denver, M-CHAT, ABLLS-R, CARS-2, Socially Savvy)', desc: 'Mapeamento de marcos com conversão de lacunas em programas do PEI em 1 clique.' },
                    { title: 'Plano de Intervenção Comportamental (BIP / PAC)', desc: 'Estratégias antecedentes, comportamento substitutivo (DRA/FCT) e manejo de crises.' },
                    { title: 'Motor Automático de Manutenção (D+10, D+20, D+30)', desc: 'Sondas periódicas automáticas de retenção com alertas integrados ao coletor DTT.' },
                    { title: 'Sondas de Generalização Cruzada & Escola', desc: 'Checagem com novos aplicadores, ambientes (casa/escola) e diário de bordo do AT escolar.' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="h-5 w-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="h-3 w-3" />
                      </div>
                      <div>
                        <strong className="text-xs sm:text-sm font-bold text-white block">{item.title}</strong>
                        <span className="text-xs text-slate-400">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
                    <Target className="h-4 w-4 text-indigo-400" />
                    Critérios Clínicos Parametrizáveis
                  </span>
                  <span className="text-[10px] text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800">
                    Automação BCBA
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 text-[10px] block">Critério de Domínio</span>
                    <strong className="text-sm font-bold text-white">80% IND</strong>
                    <span className="text-emerald-400 text-[10px] block">3 sessões consecutivas</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 text-[10px] block">Fidelidade Aplicadores</span>
                    <strong className="text-sm font-bold text-white">2 Terapeutas</strong>
                    <span className="text-teal-400 text-[10px] block">Validação cruzada</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-slate-300">
                  ✨ <strong>Alerta Inteligente de Estagnação:</strong> Se um alvo apresentar mais de 5 sessões consecutivas sem evolução de WII, o supervisor recebe notificação automática para ajustar o procedimento de esvanecimento.
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ANALYTICS & WII */}
          {activeTab === 'analytics' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-fadeIn">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/30 text-xs font-bold">
                  Ciência da Decisão Baseada em Evidências
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  Gráficos de Aquisição, Linhas de Fase e Índice WII
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Diga adeus ao Excel. Gráficos de séries temporais de alta precisão mostram a evolução real da autonomia da criança, mesmo quando o acerto independente bruto ainda não chegou a 100%.
                </p>

                <div className="space-y-3 pt-2">
                  {[
                    { title: 'Índice Ponderado de Independência (WII)', desc: 'Valoriza a redução de ajudas (ex: transição de Físico Total para Gestual) comprovando avanço.' },
                    { title: 'Linhas de Mudança de Fase (A-B-A-B)', desc: 'Registro formal de introdução de novos protocolos e mudanças de medição.' },
                    { title: 'Fidedignidade entre Observadores (IOA Automático)', desc: 'Cálculo de concordância trial-by-trial em sessões de supervisão presencial.' },
                    { title: 'Curvas Cumulativas de Alvos Dominados', desc: 'Comprovação visual de aceleração do aprendizado para pais e planos.' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="h-5 w-5 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="h-3 w-3" />
                      </div>
                      <div>
                        <strong className="text-xs sm:text-sm font-bold text-white block">{item.title}</strong>
                        <span className="text-xs text-slate-400">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
                    <PieChart className="h-4 w-4 text-teal-400" />
                    Fórmula do Índice WII
                  </span>
                  <span className="text-[10px] text-teal-300 font-mono bg-teal-950 px-2 py-0.5 rounded border border-teal-800">
                    Weighted Independence
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center font-mono text-xs sm:text-sm text-teal-300 space-y-2">
                  <div>WII = [ Σ (Tentativas × Peso do Nível de Ajuda) / Total ] × 100</div>
                  <p className="text-[11px] text-slate-400 font-sans">
                    IND: 100% • GP: 80% • VP: 60% • MP: 50% • PP: 30% • FP: 10%
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Trial-by-Trial IOA</span>
                    <strong className="text-white font-bold">92.5% de Concordância</strong>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 text-xs font-bold border border-emerald-800">
                    Aprovado BACB &gt; 80%
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ANTI-GLOSA & TISS */}
          {activeTab === 'antiglosa' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-fadeIn">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                  Proteção Financeira B2B
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  Linter Pré-Envio de XML TISS & Folha de Presença Digital
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  As operadoras usam falhas documentais para glosar 5% a 15% do seu faturamento. O SaaS ABA cria uma blindagem à prova de auditorias.
                </p>

                <div className="space-y-3 pt-2">
                  {[
                    { title: 'Linter Pré-Envio de Lotes TISS XML v04.01.00', desc: 'Verifica CNES, conselho de classe (CRP/CRFa/CREFITO) e código TUSS antes de exportar.' },
                    { title: 'Assinatura Touch dos Pais no Tablet', desc: 'Comprovante irrevogável de realização de sessão com carimbo de geolocalização.' },
                    { title: 'Monitor de Burn-Rate de Carga Horária Autorizada', desc: 'Controle em tempo real de horas executadas vs. saldo restante na guia do convênio.' },
                    { title: 'Laudos em PDF com Gráficos Embutidos em 1 Clique', desc: 'Elimina contestações técnicas de auditores médicos com evidência visual irrefutável.' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="h-3 w-3" />
                      </div>
                      <div>
                        <strong className="text-xs sm:text-sm font-bold text-white block">{item.title}</strong>
                        <span className="text-xs text-slate-400">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    Checklist Linter Anti-Glosa
                  </span>
                  <span className="text-[10px] text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 font-bold">
                    100% Válido
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  {[
                    { label: 'CNES da Clínica Ativo e Regularizado', status: 'OK' },
                    { label: 'Registro de Conselho de Classe (CRP / CRFa / CREFITO)', status: 'OK' },
                    { label: 'Códigos TUSS (50000470 / 50000560 / 50000640)', status: 'OK' },
                    { label: 'Horas Executadas ≤ Horas Autorizadas na Guia', status: 'OK' },
                    { label: 'Assinatura dos Pais Presente em 100% das Sessões', status: 'OK' },
                  ].map((chk, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                      <span className="text-slate-300">{chk.label}</span>
                      <span className="text-emerald-400 font-mono font-bold text-[11px]">✓ {chk.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: DOSSIE JUDICIAL RN 539 */}
          {activeTab === 'judicial' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-fadeIn">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 text-xs font-bold">
                  Segurança Jurídica Regulatória
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  Dossiê Pericial Estruturado para Liminares e Reembolso
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  No Brasil, mais de 60% dos pacientes em tratamento intensivo operam via Liminar ou Reembolso Assistido. O SaaS ABA gera a documentação que juízes e peritos exigem.
                </p>

                <div className="space-y-3 pt-2">
                  {[
                    { title: 'Fundamentação na RN 539/2022 da ANS', desc: 'Citações e respaldo técnico na proibição expressa de limitação de sessões para TEA.' },
                    { title: 'Comprovação Inequívoca de Horas Executadas', desc: 'Relatório discriminado por terapeuta, data, hora e código de especialidade.' },
                    { title: 'Assinatura Digital PAdES e ICP-Brasil', desc: 'Conformidade plena com a Lei 14.063/2020 e QR Code de validação pública.' },
                    { title: 'Demonstração de Ganho Terapêutico e Risco de Regressão', desc: 'Justificativa clínica para manutenção da carga prescrita de 20h a 40h semanais.' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="h-5 w-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="h-3 w-3" />
                      </div>
                      <div>
                        <strong className="text-xs sm:text-sm font-bold text-white block">{item.title}</strong>
                        <span className="text-xs text-slate-400">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    <FileText className="h-4 w-4 text-purple-400" />
                    Estrutura do Dossiê Pericial
                  </span>
                  <span className="text-[10px] text-purple-300 bg-purple-950 px-2 py-0.5 rounded border border-purple-800 font-bold">
                    Padrão Tribunal
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2">
                  <div className="font-bold text-white">Seções Geradas Automaticamente:</div>
                  <ul className="list-disc list-inside space-y-1 text-slate-400">
                    <li>1. Qualificação do Aprendiz e Diagnóstico CID-11 / DSM-5</li>
                    <li>2. Prescrição de Carga Horária Intensiva Multidisciplinar</li>
                    <li>3. Curvas de Evolução Clínica e Aquisição de Alvos PEI</li>
                    <li>4. Folha de Frequência Assinada pelos Pais com Georreferenciamento</li>
                    <li>5. Assinatura Digital do Responsável Técnico (CRP / CRFa / CREFITO)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: FAMILY PORTAL */}
          {activeTab === 'family' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-fadeIn">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-pink-500/10 text-pink-300 border border-pink-500/30 text-xs font-bold">
                  Engajamento e Transparência
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  Portal dos Pais & Treino Parental
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Famílias engajadas aceleram o desenvolvimento da criança e viram os maiores promotores da sua clínica.
                </p>

                <div className="space-y-3 pt-2">
                  {[
                    { title: 'Confirmação de Presença Digital sem Papel', desc: 'Assinatura na tela do tablet ou confirmação instantânea via WhatsApp OTP.' },
                    { title: 'Acompanhamento Simplificado de Metas', desc: 'Visualização transparente da evolução do filho sem jargões técnicos complexos.' },
                    { title: 'Módulo de Treino Parental', desc: 'Orientações práticas de manejo de antecedentes e reforçamento em casa.' },
                    { title: 'Registro de Generalização de Mandos', desc: 'A família registra quando a criança pede água ou itens espontaneamente no ambiente doméstico.' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="h-5 w-5 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="h-3 w-3" />
                      </div>
                      <div>
                        <strong className="text-xs sm:text-sm font-bold text-white block">{item.title}</strong>
                        <span className="text-xs text-slate-400">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    <Users className="h-4 w-4 text-pink-400" />
                    Visão dos Pais no Smartphone
                  </span>
                  <span className="text-[10px] text-pink-300 bg-pink-950 px-2 py-0.5 rounded border border-pink-800 font-bold">
                    PWA Mobile
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">Progresso Semanal do Filho</span>
                    <span className="text-emerald-400 font-bold">12 novos alvos dominados</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                    💬 "Enzo pediu suco olhando nos olhos hoje no almoço sem ajuda!" — <em>Registro da mãe às 12:40</em>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Bar in Feature Box */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-400">
              Quer ver todos os módulos em funcionamento com os dados da sua clínica?
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenLiveApp}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200"
              >
                Abrir App Agora
              </button>
              <button
                onClick={onOpenDemoModal}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-teal-500 hover:from-indigo-500 hover:to-teal-400 text-xs font-bold text-white shadow-md shadow-indigo-600/20"
              >
                <span>Agendar Demonstração</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
