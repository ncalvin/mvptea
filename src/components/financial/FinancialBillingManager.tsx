import React, { useState } from 'react';
import { 
  DollarSign, 
  ShieldAlert, 
  Users, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  Download, 
  Copy, 
  Clock, 
  CreditCard, 
  PieChart, 
  ExternalLink,
  Sparkles,
  ChevronRight,
  Gavel,
  ShieldCheck
} from 'lucide-react';
import { 
  Patient, 
  TherapistPayable, 
  ClaimGlosa 
} from '../../types/aba';
import { 
  MOCK_THERAPIST_PAYABLES, 
  MOCK_CLAIM_GLOSAS 
} from '../../data/mockAbaData';

interface FinancialBillingManagerProps {
  patient: Patient;
  lowSensoryMode?: boolean;
}

export const FinancialBillingManager: React.FC<FinancialBillingManagerProps> = ({
  patient,
  lowSensoryMode = false,
}) => {
  const [activeFinanceTab, setActiveFinanceTab] = useState<'glosas' | 'repasses' | 'pacotes'>('glosas');
  const [glosas, setGlosas] = useState<ClaimGlosa[]>(MOCK_CLAIM_GLOSAS);
  const [payables, setPayables] = useState<TherapistPayable[]>(MOCK_THERAPIST_PAYABLES);
  const [selectedGlosaForAppeal, setSelectedGlosaForAppeal] = useState<ClaimGlosa | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const totalBilled = glosas.reduce((acc, g) => acc + g.billedAmount, 0);
  const totalGlosado = glosas.reduce((acc, g) => acc + g.glosaAmount, 0);
  const totalRepasses = payables.reduce((acc, p) => acc + p.totalAmount, 0);

  const handleApprovePayable = (payableId: string) => {
    setPayables((prev) =>
      prev.map((p) => (p.id === payableId ? { ...p, paymentStatus: 'paid' } : p))
    );
    showToast('Repasse aprovado e marcado como pago no sistema financeiro!');
  };

  const handleCopyAppealText = (text: string) => {
    navigator.clipboard?.writeText(text);
    showToast('Minuta de recurso fundamentada na RN 539/2022 copiada para a área de transferência!');
  };

  const handleSetAppealSubmitted = (glosaId: string) => {
    setGlosas((prev) =>
      prev.map((g) => (g.id === glosaId ? { ...g, status: 'em_recurso', appealGeneratedDate: new Date().toISOString().split('T')[0] } : g))
    );
    setSelectedGlosaForAppeal(null);
    showToast('Recurso de Glosa protocolado no sistema! Prazo legal de 30 dias de resposta iniciado.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-indigo-900 border border-indigo-400 text-white text-xs font-semibold shadow-2xl animate-fade-in">
          <Sparkles className="h-4 w-4 text-teal-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 shadow-lg shadow-emerald-500/10">
            <DollarSign className="h-7 w-7 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white tracking-tight">Central Financeira, Repasses & Glosas RN 539</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                BLINDAGEM JURÍDICA ANS
              </span>
            </div>
            <p className="text-sm text-slate-400 mt-1">
              Controle de honorários multidisciplinares, conciliação de faturas TISS e defesa automatizada contra glosas com base na Resolução Normativa 539 da ANS.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start lg:self-auto">
          <div className="flex items-center bg-slate-900 rounded-xl p-1 border border-slate-800">
            <button
              onClick={() => setActiveFinanceTab('glosas')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeFinanceTab === 'glosas'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Gavel className="h-3.5 w-3.5" />
              <span>Glosas & Recurso RN 539</span>
            </button>
            <button
              onClick={() => setActiveFinanceTab('repasses')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeFinanceTab === 'repasses'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Users className="h-3.5 w-3.5" />
              <span>Repasse a Terapeutas</span>
            </button>
            <button
              onClick={() => setActiveFinanceTab('pacotes')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeFinanceTab === 'pacotes'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <CreditCard className="h-3.5 w-3.5" />
              <span>Pacotes & Particular</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-xs font-medium text-slate-400">Total Faturado em Guias TISS</span>
          <p className="text-2xl font-black text-white">R$ {totalBilled.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          <span className="text-[11px] text-teal-400 font-semibold">100% com XML v04.01.00 e Folhas Assinadas</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-xs font-medium text-slate-400">Glosas Contestáveis (RN 539/2022)</span>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-black text-rose-400">R$ {totalGlosado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            <span className="text-xs font-bold text-rose-300">({glosas.length} guia(s))</span>
          </div>
          <span className="text-[11px] text-rose-400/90 font-semibold">Recurso pronto para envio com 1 clique</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-xs font-medium text-slate-400">Total a Repassar à Equipe Multi</span>
          <p className="text-2xl font-black text-indigo-400">R$ {totalRepasses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          <span className="text-[11px] text-slate-400">4 terapeutas com sessões validadas</span>
        </div>
      </div>

      {/* TAB 1: Gestor Ativo de Glosas & Recurso RN 539 */}
      {activeFinanceTab === 'glosas' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-950/40 via-slate-900 to-slate-900 border border-rose-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Gavel className="h-5 w-5 text-rose-400" />
                <h3 className="font-bold text-white text-base">Defesa Ativa de Glosas com Base na RN 539/2022 da ANS</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                Operadoras frequentemente aplicam glosas indevidas alegando teto de sessões ou falta de laudo. O SaaS ABA gera automaticamente a contestação pericial com base no Art. 2º da RN 539/2022 (que veda expressamente qualquer limite de sessões terapêuticas para TEA), anexando as folhas de presença assinadas e os gráficos de evolução.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {glosas.map((glosa) => (
              <div
                key={glosa.id}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">{glosa.healthPlanName}</span>
                      <span className="text-xs text-slate-400">• Guia: <strong className="text-slate-200">{glosa.guideNumber}</strong></span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">Paciente: <strong>{glosa.patientName}</strong> • {glosa.procedureTuss}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400">Valor Glosado</p>
                      <p className="text-base font-black text-rose-400">R$ {glosa.glosaAmount.toFixed(2)}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                      glosa.status === 'em_recurso'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}>
                      {glosa.status === 'em_recurso' ? 'Recurso Protocolado' : 'Pendente de Recurso'}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                  <span className="font-bold text-rose-400 block">{glosa.glosaCode}</span>
                  <p className="text-slate-300">{glosa.glosaReasonDescription}</p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <ShieldCheck className="h-4 w-4 text-teal-400" />
                    <span>Fundamentação: RN 539/2022 ANS + Tema 1069/STJ</span>
                  </div>

                  <button
                    onClick={() => setSelectedGlosaForAppeal(glosa)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/20 transition-all hover:scale-105"
                  >
                    <Gavel className="h-3.5 w-3.5" />
                    <span>Gerar Minuta de Recurso (RN 539)</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Repasse a Terapeutas */}
      {activeFinanceTab === 'repasses' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base">Extrato de Honorários & Repasses à Equipe Multidisciplinar</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Cálculo automatizado a partir das sessões efetivamente cumpridas e validadas por assinatura no Coletor DTT e na Agenda.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/80">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 text-[11px] uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Profissional / Especialidade</th>
                  <th className="py-3 px-4">Conselho</th>
                  <th className="py-3 px-4 text-center">Horas Validadas</th>
                  <th className="py-3 px-4 text-center">Valor / Hora</th>
                  <th className="py-3 px-4 text-right">Total a Pagar</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {payables.map((payable) => (
                  <tr key={payable.id} className="hover:bg-slate-850/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-white">{payable.therapistName}</p>
                      <p className="text-[11px] text-slate-400">{payable.specialty}</p>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px]">{payable.councilNumber}</td>
                    <td className="py-3.5 px-4 text-center font-bold text-white">{payable.validatedHoursCount}h ({payable.completedSessionsCount} sessões)</td>
                    <td className="py-3.5 px-4 text-center font-mono">R$ {payable.ratePerHour.toFixed(2)}</td>
                    <td className="py-3.5 px-4 text-right font-black text-indigo-400 text-sm">
                      R$ {payable.totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        payable.paymentStatus === 'paid'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : payable.paymentStatus === 'approved'
                          ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {payable.paymentStatus === 'paid' ? 'Pago' : payable.paymentStatus === 'approved' ? 'Aprovado' : 'Pendente'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {payable.paymentStatus !== 'paid' ? (
                        <button
                          onClick={() => handleApprovePayable(payable.id)}
                          className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs transition-all shadow-sm"
                        >
                          Pagar PIX
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-500 font-semibold">Comprovante OK</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Pacotes Particulares & Burn Rate */}
      {activeFinanceTab === 'pacotes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-base">Monitor de Consumo de Horas (Burn-Rate)</h3>
            <p className="text-xs text-slate-400">
              Acompanhamento semanal de cumprimento de carga horária para {patient.name} ({patient.authorizedHoursWeek}h semanais autorizadas).
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">Horas Cumpridas no Mês:</span>
                <span className="font-black text-teal-400 text-sm">{patient.completedHoursThisMonth}h de 80h</span>
              </div>
              <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="h-full bg-gradient-to-r from-teal-500 to-indigo-500 rounded-full"
                  style={{ width: `${(patient.completedHoursThisMonth / 80) * 100}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400">Restam 16 horas para completar a prescrição médica do mês.</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-base">Cobrança Particular / Co-Participação</h3>
            <p className="text-xs text-slate-400">
              Gere faturas e cobranças instantâneas via chave PIX para atendimentos particulares ou pacotes de estimulação sensorial.
            </p>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Chave PIX da Clínica (CNPJ):</span>
                <span className="font-mono font-bold text-white">44.120.998/0001-50</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Valor da Mensalidade Particular:</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">R$ 4.800,00</span>
              </div>
              <button
                onClick={() => showToast('Cobrança PIX com QR Code dinâmico emitida com sucesso!')}
                className="w-full py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold text-xs transition-all shadow-md shadow-teal-500/20"
              >
                Gerar Cobrança PIX
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Minuta de Recurso de Glosa RN 539 */}
      {selectedGlosaForAppeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-5 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Gavel className="h-5 w-5 text-rose-400" />
                <h3 className="font-bold text-white text-base">Minuta de Recurso de Glosa (RN 539/2022)</h3>
              </div>
              <button
                onClick={() => setSelectedGlosaForAppeal(null)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕ Fechar
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Operadora Notificada:</span>
                <strong className="text-white">{selectedGlosaForAppeal.healthPlanName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Número da Guia TISS:</span>
                <strong className="text-white font-mono">{selectedGlosaForAppeal.guideNumber}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Valor Contestatório:</span>
                <strong className="text-rose-400 font-bold">R$ {selectedGlosaForAppeal.glosaAmount.toFixed(2)}</strong>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-indigo-400">Texto Jurídico da Contestação:</label>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono leading-relaxed max-h-60 overflow-y-auto">
                <p className="mb-2"><strong>ILMO(A). AUDITOR(A) MÉDICO(A) - {selectedGlosaForAppeal.healthPlanName.toUpperCase()}</strong></p>
                <p className="mb-2">Ref: Contestação de Glosa na Guia nº {selectedGlosaForAppeal.guideNumber} — Paciente: {selectedGlosaForAppeal.patientName} (CID-11: 6A02 / F84.0)</p>
                <p className="mb-2">Vimos por meio deste manifestar expressa DIVERGÊNCIA quanto à glosa aplicada sob a justificativa "{selectedGlosaForAppeal.glosaReasonDescription}".</p>
                <p className="mb-2"><strong>DA FUNDAMENTAÇÃO LEGAL:</strong></p>
                <p className="mb-2">{selectedGlosaForAppeal.rn539LegalBasisSummary}</p>
                <p className="mb-2">Ressalta-se que a Resolução Normativa RN nº 539/2022 da Diretoria Colegiada da Agência Nacional de Saúde Suplementar (ANS) estabeleceu de forma taxativa a vedação a qualquer limitação de número de consultas e sessões com psicólogos, terapeutas ocupacionais e fonoaudiólogos para pessoas com autismo e outros transtornos globais do desenvolvimento.</p>
                <p className="mb-2">Anexamos ao presente lote XML os relatórios clínicos circunstanciados, os gráficos de aquisição e a folha de presença com geolocalização e assinatura diária dos genitores.</p>
                <p>Termos em que pede deferimento e liberação imediata do crédito glosado.</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <button
                onClick={() => handleCopyAppealText(selectedGlosaForAppeal.rn539LegalBasisSummary)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                <Copy className="h-4 w-4" />
                <span>Copiar Texto</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedGlosaForAppeal(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white text-xs font-semibold"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleSetAppealSubmitted(selectedGlosaForAppeal.id)}
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/20"
                >
                  Protocolar Recurso no TISS
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
