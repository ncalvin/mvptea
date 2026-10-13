import React, { useState } from 'react';
import { 
  ChevronDown, 
  HelpCircle, 
  Sparkles, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const FaqSection: React.FC<{ onOpenDemoModal: () => void }> = ({ onOpenDemoModal }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const FAQ_ITEMS = [
    {
      question: 'O que é o SaaS ABA e por que ele é diferente de sistemas médicos comuns?',
      answer: 'O SaaS ABA é a primeira plataforma enterprise projetada 100% para a rotina de Análise do Comportamento Aplicada (ABA) e neurodesenvolvimento no Brasil. Diferente de prontuários genéricos que apenas têm caixas de texto soltas, o SaaS ABA possui um coletor ergonômico no tablet com resposta em menos de 1 segundo, cálculo automatizado do Índice Ponderado de Independência (WII), curvas cumulativas, linter anti-glosa para lotes TISS XML v04.01.00 e dossiê pericial fundamentado na RN 539/2022 da ANS.',
    },
    {
      question: 'Como a plataforma elimina 100% das glosas de operadoras de saúde?',
      answer: 'As operadoras glosam faturas principalmente por: 1) alegação de "sessão fantasma" e 2) laudos sem comprovação gráfica de evolução. O SaaS ABA resolve isso na raiz: o responsável legal assina digitalmente no tablet ao fim de cada atendimento com carimbo de geolocalização e data/hora imutável; o Linter checa o lote XML TISS antes do envio; e os laudos gerados em 1 clique já incluem gráficos de linha de base e desvanecimento de dicas que anulam contestações de auditores.',
    },
    {
      question: 'O coletor do tablet funciona se a internet da clínica ou domicílio cair?',
      answer: 'Sim, com 100% de estabilidade! O SaaS ABA foi construído com arquitetura Local-First (IndexedDB). Todas as tentativas discretas (DTT), registros de mando (NET), cronômetros e eventos de crise são gravados instantaneamente na memória do aparelho. A sessão nunca trava por oscilação de rede e sincroniza automaticamente com o servidor quando a conexão for restabelecida.',
    },
    {
      question: 'Como a RN 539/2022 da ANS é aplicada nos laudos e dossiês judiciais?',
      answer: 'A Resolução Normativa nº 539/2022 da ANS tornou obrigatória a cobertura de qualquer método indicado pelo médico assistente para o tratamento de TEA, vedando expressamente a limitação de número de sessões. O SaaS ABA possui um gerador de Dossiê Pericial pré-estruturado com fundamentação na resolução, demonstrando a necessidade médica de manutenção da carga prescrita (15h a 40h semanais) para peritos judiciais e convênios.',
    },
    {
      question: 'Como funciona a migração dos dados que já tenho em planilhas do Excel?',
      answer: 'Você não precisa recomeçar do zero. Nossa equipe técnica e clínica realiza o processo de migração assistida sem custo adicional para os planos Pro e Enterprise. Importamos o cadastro dos aprendizes, históricos de PEI, alvos vigentes e dados dos aplicadores em até 48 horas úteis.',
    },
    {
      question: 'Posso personalizar os critérios de domínio e a hierarquia de dicas?',
      answer: 'Sim, totalmente. O supervisor clínico tem autonomia para configurar os critérios de dominância (ex: 80% ou 90% IND por 3 sessões consecutivas com 2 aplicadores diferentes), os pesos do Índice Ponderado de Independência (WII) e ativar/desativar modalidades de medição (DTT, NET, Taxa, Duração, Intervalos PIR/WIR/MTS e Análise de Tarefas).',
    },
    {
      question: 'Qualquer tablet ou celular é compatível com o sistema?',
      answer: 'Sim! O SaaS ABA funciona em iPads (Apple), tablets Android (Samsung, Lenovo, Xiaomi), smartphones (iOS e Android), além de notebooks e computadores de mesa. Ele é leve, responsivo e pode ser instalado como um Web App (PWA) direto na tela inicial.',
    },
    {
      question: 'Como funciona o Copiloto Clínico com IA e o Ditado por Voz para Crises ABC?',
      answer: 'O motor de IA do SaaS ABA foi treinado especificamente na ciência comportamental (ABA). O terapeuta pode ditar ocorrências de crises em áudio no tablet e a IA converte a fala em Antecedente, Comportamento e Consequência estruturados em menos de 5 segundos. Além disso, o Copiloto monitora séries temporais de WII para alertar sobre platôs e redige parágrafos periciais embasados na RN 539/2022. Todos os dados são previamente anonimizados (LGPD) com retenção zero para treinamento de terceiros, e toda decisão exige a aprovação do Responsável Técnico (Human-in-the-Loop).',
    },
    {
      question: 'Como o sistema garante a conformidade com a LGPD e o sigilo médico?',
      answer: 'Cumprimos rigorosamente a Lei Geral de Proteção de Dados (LGPD) e as diretrizes do CFP, CREFITO e CFFa. Todos os dados clínicos trafegam criptografados com TLS 1.3 e repousam criptografados com AES-256 em data centers com certificação ISO 27001 e SOC 2. Laudos contam com assinatura digital no padrão PAdES com QR Code de validação pública.',
    },
    {
      question: 'Já usamos sistemas como NeoABA, ClinicABA, TEA360, Cliniconect ou ComportaTudo. Como funciona a migração?',
      answer: 'A migração é rápida, assistida e 100% gratuita para planos anuais. Nossa equipe de Customer Success importa todo o cadastro de aprendizes, histórico de PEI, metas vigentes e dados de aplicadores em até 48 horas úteis. Ao migrar para o SaaS ABA, sua clínica ganha imediatamente o Centro com 6 Protocolos Padronizados, agenda com matriz de salas sensoriais em bloco, prontuário multidisciplinar SOAP, módulo do AT escolar e impugnação automática de glosas pela RN 539 da ANS.',
    },
    {
      question: 'Quais os 6 protocolos padronizados inclusos e como funciona a conversão em 1 clique para o PEI?',
      answer: 'O SaaS ABA integra nativamente: VB-MAPP (170 marcos), Modelo Denver (ESDM), M-CHAT-R/F (rastreio de 16-30 meses), ABLLS-R (25 áreas), CARS-2 (escala de gravidade) e Socially Savvy (habilidades sociais). O grande diferencial é a "Ponte PEI em 1 Clique": qualquer marco não dominado na avaliação gera imediatamente alvos operacionais e critérios de maestria no currículo do aprendiz, sem redigitação.',
    },
    {
      question: 'Como a plataforma resolve choques em salas sensoriais (Ayres) e organiza terapias em bloco?',
      answer: 'Nossa agenda inteligente possui uma matriz espacial física que mapeia salas especializadas (Integração Sensorial Ayres com balanços e tirolesa, Salas DTT 1 e 2, Sala Denver/NET e Sala Fono/CAA). O sistema permite o agendamento em bloco de terapias casadas no mesmo turno (ex: 50m ABA + 50m T.O. + 50m Fono) para a comodidade da família, emitindo alertas visuais imediatos caso haja sobreposição de equipamento ou sala.',
    },
  ];

  return (
    <section id="faq" className="py-20 lg:py-28 relative bg-slate-950 border-b border-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 border border-slate-800 px-3.5 py-1 text-xs font-semibold text-slate-300 mb-3">
            <HelpCircle className="h-3.5 w-3.5 text-indigo-400" />
            <span>Tire Suas Dúvidas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Perguntas Frequentes sobre o SaaS ABA
          </h2>
          <p className="mt-3 text-base text-slate-400">
            Tudo o que você precisa saber sobre implementação, conformidade regulatória e resultados clínicos.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-900 transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-white leading-snug">
                    {item.question}
                  </span>
                  <div className={`p-1.5 rounded-lg bg-slate-800 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-teal-400 bg-teal-950/60' : ''}`}>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-4 animate-fadeIn">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Help Box */}
        <div className="mt-12 text-center p-6 rounded-3xl bg-indigo-950/30 border border-indigo-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-sm font-bold text-white">Ainda tem alguma dúvida específica sobre a sua clínica?</h4>
            <p className="text-xs text-slate-400">Nossos especialistas clínicos e regulatórios estão prontos para conversar.</p>
          </div>
          <button
            onClick={onOpenDemoModal}
            className="shrink-0 flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-teal-500 hover:from-indigo-500 hover:to-teal-400 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition-all hover:scale-105"
          >
            <span>Falar com um Especialista</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
