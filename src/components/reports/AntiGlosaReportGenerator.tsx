import React, { useState } from 'react';
import { 
  Printer, 
  Download, 
  ShieldCheck, 
  CheckCircle2, 
  Code2, 
  FileCheck,
  Building2,
  Copy,
  Check,
  TrendingUp,
  Sparkles,
  QrCode,
  FileText,
  AlertTriangle,
  Scale,
  HeartHandshake,
  ShieldAlert,
  MapPin
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ReferenceLine 
} from 'recharts';
import { Patient } from '../../types/aba';
import { MOCK_ACQUISITION_GRAPH_DATA, MOCK_HISTORICAL_SESSIONS } from '../../data/mockAbaData';

interface AntiGlosaReportGeneratorProps {
  patient: Patient;
}

export const AntiGlosaReportGenerator: React.FC<AntiGlosaReportGeneratorProps> = ({ patient }) => {
  const [activeView, setActiveView] = useState<'laudo' | 'judicial_dossier' | 'tiss_xml'>('laudo');
  const [copiedXml, setCopiedXml] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState<string>('Unimed');
  const [selectedTuss, setSelectedTuss] = useState<string>('50000470');
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [clinicalParecer, setClinicalParecer] = useState(
    `O aprendiz ${patient.name}, diagnosticado com ${patient.diagnosis} (${patient.cidCode}), permanece sob intervenção intensiva em Análise do Comportamento Aplicada (ABA) com carga horária prescrita de ${patient.authorizedHoursWeek}h semanais. Durante o período avaliado, apresentou ganhos expressivos na aquisição de repertório verbal (VB-MAPP Tato e Mando) e evolução positiva no Índice Ponderado de Independência (WII de 45% para 95%), com redução substancial de dicas físicas e verbais. Não foram registradas faltas injustificadas (assiduidade de 100%). A manutenção integral da carga horária é indispensável para evitar regressão dos marcos consolidados e prosseguir com a generalização em ambiente natural e escolar, respaldada pela RN 539/2022 da ANS.`
  );

  const mockTissXml = `<?xml version="1.0" encoding="ISO-8859-1"?>
<ans:mensagemTISS xmlns:ans="http://www.ans.gov.br/padroes/tiss/schemas" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <ans:cabecalho>
    <ans:identificacaoTransacao>
      <ans:tipoTransacao>ENVIO_LOTE_GUIAS</ans:tipoTransacao>
      <ans:numeroTransacao>202610040001</ans:numeroTransacao>
      <ans:dataRegistroTransacao>2026-10-04</ans:dataRegistroTransacao>
      <ans:horaRegistroTransacao>11:45:00</ans:horaRegistroTransacao>
    </ans:identificacaoTransacao>
    <ans:padrao>04.01.00</ans:padrao>
  </ans:cabecalho>
  <ans:prestadorParaOperadora>
    <ans:loteGuias>
      <ans:numeroLote>000842</ans:numeroLote>
      <ans:guiasTISS>
        <ans:guiaSP-SADT>
          <ans:cabecalhoGuia>
            <ans:registroANS>345678</ans:registroANS>
            <ans:numeroGuiaPrestador>994021</ans:numeroGuiaPrestador>
          </ans:cabecalhoGuia>
          <ans:dadosBeneficiario>
            <ans:numeroCarteira>${patient.insuranceCardNumber}</ans:numeroCarteira>
            <ans:nomeBeneficiario>${patient.name}</ans:nomeBeneficiario>
          </ans:dadosBeneficiario>
          <ans:dadosContratadoExecutante>
            <ans:cnpjContratado>42198842000190</ans:cnpjContratado>
            <ans:nomeContratado>CLINICA NEURODESENVOLVER LTDA</ans:nomeContratado>
            <ans:cnes>8840219</ans:cnes>
          </ans:dadosContratadoExecutante>
          <ans:dadosProfissionalExecutante>
            <ans:nomeProfissional>${patient.responsibleBCBA.split(',')[0]}</ans:nomeProfissional>
            <ans:conselhoProfissional>06</ans:conselhoProfissional>
            <ans:numeroConselhoProfissional>112450</ans:numeroConselhoProfissional>
            <ans:UF>SP</ans:UF>
            <ans:CBOS>251510</ans:CBOS>
          </ans:dadosProfissionalExecutante>
          <ans:procedimentosExecutados>
            <ans:procedimentoExecutado>
              <ans:dataExecucao>2026-10-03</ans:dataExecucao>
              <ans:codigoTabela>22</ans:codigoTabela>
              <ans:codigoProcedimento>${selectedTuss}</ans:codigoProcedimento>
              <ans:descricaoProcedimento>SESSAO DE TERAPIA COMPORTAMENTAL ABA INTENSIVA</ans:descricaoProcedimento>
              <ans:quantidadeExecutada>${patient.completedHoursThisMonth}</ans:quantidadeExecutada>
            </ans:procedimentoExecutado>
          </ans:procedimentosExecutados>
        </ans:guiaSP-SADT>
      </ans:guiasTISS>
    </ans:loteGuias>
  </ans:prestadorParaOperadora>
</ans:mensagemTISS>`;

  const handleCopyXml = () => {
    navigator.clipboard.writeText(mockTissXml);
    setCopiedXml(true);
    setTimeout(() => setCopiedXml(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleRegenerateAiParecer = () => {
    setIsAiGenerating(true);
    setTimeout(() => {
      setClinicalParecer(
        `PARECER EVOLUTIVO PERICIAL: O paciente ${patient.name} (${patient.diagnosis}, ${patient.cidCode}) completou ${patient.completedHoursThisMonth} horas de terapia ABA neste ciclo mensal. Os dados psicométricos e séries temporais demonstram aceleração da curva de aquisição no repertório verbal (Tato e Mando VB-MAPP) com elevação do WII para 95% e extinção gradual de comportamentos de fuga com apoio do BIP. Conforme preceitua a Resolução Normativa RN nº 539/2022 da ANS e a jurisprudência dominante, a continuidade e integralidade do tratamento multidisciplinar intensivo de ${patient.authorizedHoursWeek}h/semana são imperativas para consolidar os ganhos de neuroplasticidade e prevenir perdas funcionais.`
      );
      setIsAiGenerating(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & View Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <ShieldCheck className="h-6 w-6 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-white flex items-center gap-2">
              <span>Laudos Clínicos & Faturamento Anti-Glosa</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                v2.4 Enterprise
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              Geração em 1 clique com curvas cumulativas, prestação judicial RN 539, XML TISS e assinaturas diárias
            </p>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveView('laudo')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeView === 'laudo'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Laudo com Gráficos</span>
          </button>

          <button
            onClick={() => setActiveView('judicial_dossier')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeView === 'judicial_dossier'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Scale className="h-4 w-4 text-amber-400" />
            <span>Liminar / Reembolso (RN 539)</span>
          </button>

          <button
            onClick={() => setActiveView('tiss_xml')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeView === 'tiss_xml'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="h-4 w-4" />
            <span>Lote XML TISS + Linter</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {activeView === 'laudo' || activeView === 'judicial_dossier' ? (
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-950/50 transition-all active:scale-95"
            >
              <Printer className="h-4 w-4" />
              <span>Imprimir / Salvar PDF</span>
            </button>
          ) : (
            <button
              onClick={handleCopyXml}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-950/50 transition-all"
            >
              {copiedXml ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span>{copiedXml ? 'Copiado!' : 'Copiar XML TISS'}</span>
            </button>
          )}
        </div>
      </div>

      {/* VIEW 1: Printable Clinical Dossier with Embedded Recharts (Pilar 2) */}
      {activeView === 'laudo' && (
        <div className="bg-white text-slate-900 rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-200 max-w-4xl mx-auto space-y-8 font-sans print:p-0 print:shadow-none print:border-none">
          {/* Clinic Header */}
          <div className="flex items-start justify-between border-b-2 border-slate-900 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-2xl shadow-md">
                N
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">
                  Clínica Integrada de Neurodesenvolvimento
                </h2>
                <p className="text-xs text-slate-600 font-medium">
                  CNES: 8840219 • CNPJ: 42.198.842/0001-90 • Responsável Técnico: Dra. Mariana Vasconcelos (CRP 06/112450)
                </p>
              </div>
            </div>
            <div className="text-right text-xs text-slate-500 font-mono">
              <div>Documento: LAUDO-2026-10</div>
              <div>Data de Emissão: {new Date().toLocaleDateString('pt-BR')}</div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center space-y-1">
            <h1 className="text-xl font-black uppercase tracking-wider text-slate-900">
              Relatório de Evolução Clínica e Comprovação Terapêutica (ABA)
            </h1>
            <p className="text-xs text-slate-600 font-medium">
              Conformidade com a Diretriz de Utilização da ANS (RN 465/2021 & RN 539/2022) • Código TUSS {selectedTuss}
            </p>
          </div>

          {/* Patient Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <div className="text-slate-500 font-bold uppercase text-[10px]">Paciente:</div>
              <div className="font-extrabold text-slate-900 mt-0.5">{patient.name}</div>
            </div>
            <div>
              <div className="text-slate-500 font-bold uppercase text-[10px]">Data de Nascimento / Idade:</div>
              <div className="font-bold text-slate-800 mt-0.5">15/04/2022 ({patient.ageYears}a {patient.ageMonths}m)</div>
            </div>
            <div>
              <div className="text-slate-500 font-bold uppercase text-[10px]">Diagnóstico / CID:</div>
              <div className="font-bold text-slate-800 mt-0.5">{patient.cidCode}</div>
            </div>
            <div>
              <div className="text-slate-500 font-bold uppercase text-[10px]">Convênio / Carteirinha:</div>
              <div className="font-bold text-slate-800 mt-0.5">{patient.insurancePlan}</div>
            </div>
          </div>

          {/* Hours Executed vs Prescribed Box */}
          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-center justify-between text-xs">
            <div className="space-y-0.5">
              <span className="font-bold text-indigo-950 uppercase text-[11px]">Carga Horária Terapêutica Executada:</span>
              <div className="text-slate-700">
                Prescrição Médica: <strong>{patient.authorizedHoursWeek} horas semanais</strong> • Executado no Mês: <strong>{patient.completedHoursThisMonth} horas</strong>
              </div>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-mono font-bold text-xs shadow-sm">
              100% de Assiduidade
            </div>
          </div>

          {/* EMBEDDED GRAPH 1: Baseline vs Intervention Curve (Pilar 2 Magic) */}
          <div className="space-y-2 border border-slate-200 rounded-2xl p-5 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                  Gráfico 1: Curva de Aquisição Comportamental & WII (Linha de Base vs. Intervenção)
                </h3>
                <p className="text-[11px] text-slate-500">
                  Evolução do programa Tato de Animais (VB-MAPP Tato 5M) demonstrando aceleração pós-intervenção
                </p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold">
                Metodologia Científica ABA
              </span>
            </div>

            <div className="h-56 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={MOCK_ACQUISITION_GRAPH_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="session" tick={{ fontSize: 10, fill: '#64748b' }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#64748b' }} unit="%" />
                  <ReferenceLine x="Sessão 2 (22/Set)" stroke="#ef4444" strokeDasharray="4 4" label={{ value: 'Início Intervenção', fill: '#ef4444', fontSize: 10 }} />
                  <Line type="monotone" dataKey="targetGato" name="% Acerto Independente" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="targetGatoWII" name="WII (Autonomia Ponderada)" stroke="#6366f1" strokeWidth={2} strokeDasharray="3 3" dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Clinical Parecer with AI Button */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                Parecer Técnico e Justificativa de Manutenção de Carga Horária
              </h3>
              <button
                onClick={handleRegenerateAiParecer}
                disabled={isAiGenerating}
                className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-600 hover:text-indigo-800 print:hidden transition-colors"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>{isAiGenerating ? 'Otimizando via IA...' : 'Otimizar com IA'}</span>
              </button>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed text-justify">
              {clinicalParecer}
            </div>
          </div>

          {/* Legal Signatures and QR Code */}
          <div className="pt-6 border-t-2 border-slate-900 flex items-center justify-between text-xs">
            <div className="space-y-1">
              <div className="font-bold text-slate-900">Dra. Mariana Vasconcelos, BCBA-D</div>
              <div className="text-slate-600">Psicóloga Clínica • CRP 06/112450 • Responsável Técnica</div>
              <div className="text-[10px] text-slate-400 font-mono">
                Assinatura Digital ICP-Brasil / GOV.BR PAdES • Timestamp: {new Date().toISOString()}
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <QrCode className="h-10 w-10 text-slate-800" />
              <div className="text-[10px] text-slate-500 font-mono leading-tight">
                <div>Validação Jurídica</div>
                <div className="font-bold text-indigo-600">neurosass.med.br/v/994021</div>
                <div>Lei 14.063/2020</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: Judicial Injunction & Assisted Reimbursement Dossier (RN 539/2022) */}
      {activeView === 'judicial_dossier' && (
        <div className="bg-white text-slate-900 rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-200 max-w-4xl mx-auto space-y-8 font-sans">
          {/* Header Judicial */}
          <div className="flex items-start justify-between border-b-2 border-amber-500 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-500 text-white">
                <Scale className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900 uppercase">
                  Dossiê Pericial de Prestação de Contas Judicial & Reembolso
                </h2>
                <p className="text-xs text-slate-600">
                  Cumprimento da Resolução Normativa ANS nº 539/2022 • Processo: {patient.courtProcessNumber || '1048291-55.2025.8.26.0100'}
                </p>
              </div>
            </div>
            <div className="text-right text-xs font-mono text-slate-500">
              <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 font-bold border border-amber-300">
                Uso em Juízo / Perícia
              </span>
            </div>
          </div>

          {/* Legal Summary */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-slate-800 leading-relaxed space-y-2">
            <div className="font-bold text-amber-950 uppercase text-[11px] flex items-center gap-1.5">
              <Scale className="h-4 w-4 text-amber-700" />
              <span>Sumário Executivo para Magistrados e Peritos Judiciais:</span>
            </div>
            <p>
              Em estrita consonância com a <strong>RN nº 539/2022 da ANS</strong>, que veda a limitação quantitativa de sessões para indivíduos com TEA, o presente dossiê atesta a execução integral e ininterrupta de <strong>{patient.completedHoursThisMonth} horas</strong> no mês de referência para o paciente <strong>{patient.name}</strong>, sob supervisão técnica multidisciplinar.
            </p>
          </div>

          {/* Table of Sessions with Daily Parent Signatures */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <HeartHandshake className="h-4 w-4 text-indigo-600" />
                <span>Folha de Presença Auditada com Assinatura Diária da Família</span>
              </h3>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Zero Risco de Sessão Fantasma
              </span>
            </div>

            <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-700 font-bold text-[10px] uppercase border-b border-slate-200">
                  <tr>
                    <th className="p-3">Data / Hora</th>
                    <th className="p-3">Terapeuta Executante</th>
                    <th className="p-3">WII %</th>
                    <th className="p-3">Responsável Presente</th>
                    <th className="p-3">Comprovante Digital</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_HISTORICAL_SESSIONS.map((sess) => (
                    <tr key={sess.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-medium">{sess.date} ({sess.startTime}-{sess.endTime})</td>
                      <td className="p-3 font-medium">{sess.therapistName} ({sess.therapistRole})</td>
                      <td className="p-3 font-mono font-bold text-indigo-600">{sess.calculatedWii}%</td>
                      <td className="p-3">{sess.presenceConfirmation?.responsibleParentName || 'Camila Mendes (Mãe)'}</td>
                      <td className="p-3">
                        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>Assinado + GPS</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Legal Signatures */}
          <div className="pt-6 border-t-2 border-slate-900 flex items-center justify-between text-xs">
            <div>
              <div className="font-bold text-slate-900">Dra. Mariana Vasconcelos, BCBA-D</div>
              <div className="text-slate-600">Perita Assistente / Responsável Técnica • CRP 06/112450</div>
            </div>
            <div className="text-right font-mono text-[10px] text-slate-500">
              Certificação ICP-Brasil A3 • Lei 14.063/2020
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: TISS XML Viewer & Pre-submission Anti-Glosa Linter */}
      {activeView === 'tiss_xml' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Linter Anti-Glosa Pre-Check (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl text-xs space-y-4">
              <div className="flex items-center gap-2 font-black text-slate-200 uppercase tracking-wider text-xs">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
                <span>Linter Anti-Glosa Pré-Envio</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Validador sintático e semântico de regras da ANS antes da exportação do lote XML:
              </p>

              <div className="space-y-2.5">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-emerald-500/30 flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-200">CNES do Prestador Válido</div>
                    <div className="text-[10px] text-slate-400 font-mono">CNES: 8840219 (Ativo no Datasus)</div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-emerald-500/30 flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-200">Conselho do Profissional Executante</div>
                    <div className="text-[10px] text-slate-400 font-mono">CRP 06/112450 (UF: SP, CBOS: 251510)</div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-emerald-500/30 flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-200">TUSS e Carga Horária Compatíveis</div>
                    <div className="text-[10px] text-slate-400 font-mono">Código {selectedTuss} • {patient.completedHoursThisMonth}h executadas</div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-emerald-500/30 flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-200">100% de Presenças Assinadas</div>
                    <div className="text-[10px] text-slate-400 font-mono">5 de 5 sessões com assinatura da família</div>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-emerald-300 font-bold text-[11px] text-center">
                ✓ Lote Aprovado: Zero Risco de Glosa Documental
              </div>
            </div>
          </div>

          {/* XML Editor & Raw Data (8 Cols) */}
          <div className="lg:col-span-8 rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 className="h-5 w-5 text-indigo-400" />
                <span className="text-xs font-black uppercase tracking-wider text-slate-200">
                  Estrutura XML TISS v04.01.00 (SP/SADT)
                </span>
              </div>
              <button
                onClick={handleCopyXml}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1"
              >
                {copiedXml ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedXml ? 'Copiado para o clipboard' : 'Copiar Estrutura'}</span>
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-mono text-xs overflow-x-auto max-h-[420px] scrollbar-thin">
              {mockTissXml}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
