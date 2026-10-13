import React from 'react';
import { 
  Check, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  ArrowRight 
} from 'lucide-react';

export const ComparisonSection: React.FC<{ onOpenDemoModal: () => void }> = ({ onOpenDemoModal }) => {
  const COMPETITOR_BENCHMARK = [
    { name: 'NeoABA', lacuna: 'Focado apenas em VB-MAPP/ABLLS; sem Denver, M-CHAT integrado ou salas sensoriais em bloco' },
    { name: 'ClinicABA', lacuna: 'Módulo PTABA fechado; sem prontuário transdisciplinar SOAP e sem recursos de liminares RN 539' },
    { name: 'TEA360', lacuna: 'Sem coletor multimodal < 1s local-first e sem automação de sondas de retenção 10/20/30d' },
    { name: 'Cliniconect', lacuna: 'Falta conexão direta entre protocolos de avaliação e geração de metas do PEI em 1 clique' },
    { name: 'Sr. ABA (BPA)', lacuna: 'Falta agenda matricial de equipamentos de integração sensorial e contestação ativa de glosas' },
    { name: 'ComportaTudo', lacuna: 'Sem módulo dedicado ao AT escolar e sem suporte integrado ao protocolo Denver ESDM' },
    { name: 'AkivaTEA', lacuna: 'Sem agendamento em bloco de terapias casadas no mesmo turno e sem extrato de repasse automatizado' },
    { name: 'Blue Smiles', lacuna: 'Sem cobertura completa de protocolos simultâneos e sem linter semântico pré-envio TISS XML' },
  ];

  const COMPARISON_ROWS = [
    {
      feature: 'Centro de 6 Protocolos Padronizados (VB-MAPP, Denver, ABLLS-R, M-CHAT, CARS, Socially Savvy)',
      saasAba: 'Todos integrados com conversão em 1 clique para o PEI',
      paperExcel: 'Apenas 1 ou 2 protocolos isolados em papel',
      genericEhr: 'Inexistente (apenas consultas genéricas)',
      highlight: true,
    },
    {
      feature: 'Agenda de Salas Sensoriais & Agendamento em Bloco',
      saasAba: 'Matriz espacial (Ayres, DTT, Denver) e terapias casadas sem conflito',
      paperExcel: 'Planilha estática com choques frequentes',
      genericEhr: 'Agenda simples sem inteligência sensorial',
      highlight: true,
    },
    {
      feature: 'Prontuário Multidisciplinar SOAP & Metas Compartilhadas',
      saasAba: 'Fono, T.O., Psico e ABA no padrão SOAP com metas transdisciplinares',
      paperExcel: 'Anotações dispersas sem comunicação entre especialidades',
      genericEhr: 'Campos de texto livre sem estrutura clínica',
      highlight: true,
    },
    {
      feature: 'Motor de Manutenção Automática (10/20/30 Dias)',
      saasAba: 'Promoção automática e alertas de sondas de retenção para o aplicador',
      paperExcel: 'Esquecimento frequente de alvos dominados',
      genericEhr: 'Inexistente',
      highlight: true,
    },
    {
      feature: 'Defesa Ativa de Glosas com Minuta RN 539/2022 (ANS)',
      saasAba: '1 Clique com fundamentação na vedação de limite de sessões',
      paperExcel: 'Prejuízo financeiro de até 40% em glosas não contestadas',
      genericEhr: 'Sem suporte a liminares de autismo',
      highlight: true,
    },
    {
      feature: 'Portal da Família & Diário de Bordo do AT Escolar',
      saasAba: 'Timeline de conquistas, generalização em casa e diário da inclusão escolar',
      paperExcel: 'Caderno físico de recados escolar',
      genericEhr: 'Apenas portal de agendamento',
      highlight: true,
    },
    {
      feature: 'Tempo de Registro por Tentativa no Tablet',
      saasAba: '< 1 segundo (1 toque com latência zero e atalhos 1-8)',
      paperExcel: '15 a 30s (desvia o olhar da criança)',
      genericEhr: '20 a 40s (múltiplas telas e dropdowns)',
      highlight: true,
    },
    {
      feature: 'Folha de Presença com Assinatura Touch, GPS e TISS XML',
      saasAba: 'Digital, carimbo temporal, geolocalização e XML v04.01.00',
      paperExcel: 'Papel físico (alto risco de glosa documental)',
      genericEhr: 'Assinatura genérica sem blindagem jurídica',
      highlight: true,
    },
  ];

  return (
    <section id="comparativo" className="py-20 lg:py-28 relative bg-slate-950 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 border border-slate-800 px-3.5 py-1 text-xs font-semibold text-slate-300 mb-3">
            <ShieldCheck className="h-3.5 w-3.5 text-teal-400" />
            <span>Matriz Comparativa de Mercado</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Por Que as Maiores Clínicas do Brasil Migram para o SaaS ABA
          </h2>
          <p className="mt-3 text-base text-slate-400">
            Veja a diferença entre tentar adaptar sistemas genéricos ou planilhas versus usar uma plataforma nativamente projetada para a ciência comportamental e as regras da ANS.
          </p>
        </div>

        {/* Competitor Benchmarks & Solved Gaps */}
        <div className="mb-12 rounded-3xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-400">
                <Zap className="h-4 w-4" />
                <span>Superação de Lacunas dos Sistemas do Mercado Brasileiro</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Comparativo de Lacunas Resolvidas (Benchmark Nacional)
              </h3>
            </div>
            <span className="text-xs text-slate-400">
              Análise baseada nas 8 principais soluções de gestão TEA do Brasil
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {COMPETITOR_BENCHMARK.map((comp, idx) => (
              <div 
                key={idx}
                className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4 hover:border-indigo-500/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-extrabold text-slate-200">{comp.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 font-semibold">
                      Lacuna Superada
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {comp.lacuna}
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-slate-900 flex items-center gap-1.5 text-[10px] font-semibold text-emerald-400">
                  <Check className="h-3 w-3 shrink-0" />
                  <span>Nativo no SaaS ABA</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900/60 shadow-2xl backdrop-blur-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/90 text-xs sm:text-sm">
                <th className="p-4 sm:p-6 text-slate-400 font-bold">Recursos & Metodologia</th>
                <th className="p-4 sm:p-6 bg-indigo-950/60 text-white font-extrabold border-l border-r border-indigo-500/30">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-teal-400" />
                    <span>SaaS ABA Enterprise</span>
                  </div>
                </th>
                <th className="p-4 sm:p-6 text-slate-400 font-semibold">Papel / Prancheta / Excel</th>
                <th className="p-4 sm:p-6 text-slate-400 font-semibold">Sistemas Médicos Genéricos</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-xs sm:text-sm">
              {COMPARISON_ROWS.map((row, idx) => (
                <tr 
                  key={idx} 
                  className={`hover:bg-slate-900/40 transition-colors ${
                    row.highlight ? 'bg-indigo-950/10' : ''
                  }`}
                >
                  <td className="p-4 sm:p-5 font-semibold text-slate-200">
                    {row.feature}
                  </td>
                  
                  {/* SaaS ABA Column */}
                  <td className="p-4 sm:p-5 bg-indigo-950/40 border-l border-r border-indigo-500/30 font-bold text-teal-300">
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                        <Check className="h-3.5 w-3.5" />
                      </div>
                      <span>{row.saasAba}</span>
                    </div>
                  </td>

                  {/* Paper / Excel Column */}
                  <td className="p-4 sm:p-5 text-slate-400">
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0">
                        <X className="h-3.5 w-3.5" />
                      </div>
                      <span>{row.paperExcel}</span>
                    </div>
                  </td>

                  {/* Generic EHR Column */}
                  <td className="p-4 sm:p-5 text-slate-400">
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0">
                        <X className="h-3.5 w-3.5" />
                      </div>
                      <span>{row.genericEhr}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <button
            onClick={onOpenDemoModal}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-teal-500 hover:from-indigo-500 hover:to-teal-400 px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-indigo-600/25 transition-all hover:scale-105"
          >
            <span>Modernizar a Operação da Minha Clínica</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
