import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  AlertTriangle, 
  PlusCircle, 
  FileText, 
  Search, 
  Check,
  BrainCircuit,
  PieChart as PieIcon
} from 'lucide-react';
import { 
  Patient, 
  ProgramPEI, 
  AssessmentProtocol, 
  StandardProtocolType, 
  ProtocolScoreItem 
} from '../../types/aba';
import { MOCK_ASSESSMENT_PROTOCOLS } from '../../data/mockAbaData';

interface ProtocolsManagerProps {
  patient: Patient;
  onAddProgramToPei: (newProgram: ProgramPEI) => void;
  lowSensoryMode?: boolean;
}

const AVAILABLE_PROTOCOLS: {
  type: StandardProtocolType;
  name: string;
  badge: string;
  targetAge: string;
  description: string;
  color: string;
  domainsCount: number;
}[] = [
  {
    type: 'VB-MAPP',
    name: 'VB-MAPP (Marcos Verbais)',
    badge: 'Padrão-Ouro Verbal',
    targetAge: '0 a 48 meses',
    description: 'Avaliação de Marcos do Comportamento Verbal e Programa de Nivelamento (Mark Sundberg). Mando, Tato, Ecoico e Intraverbal.',
    color: 'from-indigo-600 to-blue-500',
    domainsCount: 16,
  },
  {
    type: 'Denver-ESDM',
    name: 'Modelo Denver (ESDM)',
    badge: 'Intervenção Precoce',
    targetAge: '12 a 60 meses',
    description: 'Checklist de Currículo do Modelo Denver (Rogers & Dawson). Atenção compartilhada, rotinas sociais e comunicação receptiva/expressiva.',
    color: 'from-teal-600 to-emerald-500',
    domainsCount: 8,
  },
  {
    type: 'M-CHAT-R/F',
    name: 'M-CHAT-R/F (Rastreio Precoce)',
    badge: 'Triagem Diagnóstica',
    targetAge: '16 a 30 meses',
    description: 'Questionário modificado de rastreio de autismo com 20 perguntas críticas e pontuação automatizada de risco.',
    color: 'from-amber-600 to-orange-500',
    domainsCount: 4,
  },
  {
    type: 'ABLLS-R',
    name: 'ABLLS-R (Básico de Aprendizagem)',
    badge: '25 Áreas de Ensino',
    targetAge: 'Todas as idades',
    description: 'Avaliação de Linguagem Básica e Habilidades de Aprendizagem (Partington). Grelha analítica de A a Z.',
    color: 'from-purple-600 to-pink-500',
    domainsCount: 25,
  },
  {
    type: 'CARS-2',
    name: 'CARS-2 (Escala de Sintomas)',
    badge: 'Gravidade TEA',
    targetAge: '2 anos ou mais',
    description: 'Escala de Avaliação do Autismo na Infância (Schopler). 15 domínios clínicos para gradação de severidade.',
    color: 'from-rose-600 to-red-500',
    domainsCount: 15,
  },
  {
    type: 'Socially-Savvy',
    name: 'Socially Savvy (Habilidades Sociais)',
    badge: 'Inclusão & Pares',
    targetAge: 'Pré-escola e Fundamental',
    description: 'Currículo de competências sociais, brincadeiras coletivas, autorregulação e resolução de conflitos entre pares.',
    color: 'from-cyan-600 to-blue-600',
    domainsCount: 7,
  },
];

export const ProtocolsManager: React.FC<ProtocolsManagerProps> = ({
  patient,
  onAddProgramToPei,
  lowSensoryMode: _lowSensoryMode = false,
}) => {
  const [selectedProtocolType, setSelectedProtocolType] = useState<StandardProtocolType>('VB-MAPP');
  const [protocolsState, setProtocolsState] = useState<AssessmentProtocol[]>(MOCK_ASSESSMENT_PROTOCOLS);
  const [importedItemCodes, setImportedItemCodes] = useState<string[]>([]);
  const [filterDomain, setFilterDomain] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Active protocol for patient
  const activeProtocol = protocolsState.find(
    (p) => p.patientId === patient.id && p.protocolType === selectedProtocolType
  ) || {
    id: `proto-${selectedProtocolType.toLowerCase()}-${patient.id}`,
    patientId: patient.id,
    protocolType: selectedProtocolType,
    assessedDate: new Date().toISOString().split('T')[0],
    assessorName: patient.responsibleBCBA,
    assessorCouncil: patient.responsibleCouncil,
    totalScore: 0,
    maxPossibleScore: 100,
    percentageScore: 0,
    status: 'in_progress',
    interpretationSummary: `Avaliação ${selectedProtocolType} em andamento para ${patient.name}.`,
    items: [],
  };

  const handleUpdateItemScore = (itemId: string, newScore: number) => {
    setProtocolsState((prev) =>
      prev.map((proto) => {
        if (proto.id !== activeProtocol.id) return proto;

        const updatedItems = proto.items.map((it) => {
          if (it.id !== itemId) return it;
          return { ...it, score: newScore };
        });

        const newTotalScore = updatedItems.reduce((acc, it) => acc + it.score, 0);
        const newMaxScore = updatedItems.reduce((acc, it) => acc + it.maxScore, 0) || 1;
        const newPercentage = Math.round((newTotalScore / newMaxScore) * 100);

        return {
          ...proto,
          items: updatedItems,
          totalScore: newTotalScore,
          maxPossibleScore: newMaxScore,
          percentageScore: newPercentage,
        };
      })
    );
  };

  const handleImportGapToPei = (item: ProtocolScoreItem) => {
    if (!item.recommendedPeiTarget) return;

    const newProg: ProgramPEI = {
      id: `prog-auto-${Date.now()}`,
      title: `${selectedProtocolType}: ${item.title}`,
      domain: item.recommendedPeiTarget.domain,
      protocol: selectedProtocolType === 'Denver-ESDM' ? 'Customizado' : (selectedProtocolType as any),
      protocolCode: item.code,
      measurementType: 'dtt_discrete_trial',
      sd: item.recommendedPeiTarget.sd,
      targetResponse: item.recommendedPeiTarget.targetResponse,
      masteryCriteria: '80% IND em 3 sessões consecutivas com manutenção agendada',
      status: 'acquisition',
      consecutiveSuccessSessions: 0,
      requiredConsecutiveSessions: 3,
      masteryPercentageThreshold: 80,
      currentExemplarIndex: 0,
      exemplars: item.recommendedPeiTarget.exemplars.map((exName, idx) => ({
        id: `ex-${Date.now()}-${idx}`,
        name: exName,
        status: idx === 0 ? 'acquisition' : 'baseline',
        trialsCount: 0,
        successRate: 0,
        weightedIndependenceIndex: 0,
      })),
      notes: `Meta importada automaticamente a partir da avaliação ${selectedProtocolType} (${item.code}).`,
    };

    onAddProgramToPei(newProg);
    setImportedItemCodes((prev) => [...prev, item.code]);
  };

  const protocolMeta = AVAILABLE_PROTOCOLS.find((p) => p.type === selectedProtocolType)!;

  // Filter items
  const filteredItems = (activeProtocol.items || []).filter((item) => {
    const matchesDomain = filterDomain === 'all' || item.domain === filterDomain;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  const domainsList = Array.from(new Set((activeProtocol.items || []).map((it) => it.domain)));
  const deficitItemsWithRecommendations = (activeProtocol.items || []).filter(
    (it) => it.score < it.maxScore && it.recommendedPeiTarget
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 shadow-lg shadow-indigo-500/10">
            <BrainCircuit className="h-7 w-7 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white tracking-tight">Centro de Protocolos & Avaliações Diagnósticas</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/10 text-teal-300 border border-teal-500/30">
                6 PROTOCOLOS INTEGRADOS
              </span>
            </div>
            <p className="text-sm text-slate-400 mt-1">
              Avaliações padronizadas completas (VB-MAPP, Denver, M-CHAT, ABLLS-R, CARS-2 e Socially Savvy) conectadas em 1 clique ao PEI de <strong>{patient.name}</strong>.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-slate-400">Responsável Técnica</p>
            <p className="text-sm font-bold text-slate-200">{patient.responsibleBCBA}</p>
          </div>
        </div>
      </div>

      {/* Protocol Selection Carousel / Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {AVAILABLE_PROTOCOLS.map((proto) => {
          const isSelected = selectedProtocolType === proto.type;
          return (
            <button
              key={proto.type}
              onClick={() => {
                setSelectedProtocolType(proto.type);
                setFilterDomain('all');
              }}
              className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden group ${
                isSelected
                  ? 'bg-slate-900 border-indigo-500 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500'
                  : 'bg-slate-900/50 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {proto.badge}
                </span>
                {isSelected && (
                  <CheckCircle2 className="h-4 w-4 text-indigo-400" />
                )}
              </div>
              <h3 className="font-bold text-sm text-white group-hover:text-indigo-300 transition-colors">
                {proto.type}
              </h3>
              <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{proto.targetAge}</p>
            </button>
          );
        })}
      </div>

      {/* Selected Protocol Dashboard & Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 cols: Score Summary & Items List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Protocolo Selecionado</span>
                <h2 className="text-xl font-bold text-white mt-0.5">{protocolMeta.name}</h2>
                <p className="text-xs text-slate-400 mt-1">{protocolMeta.description}</p>
              </div>

              {activeProtocol.riskClassification && (
                <div className={`px-3 py-1.5 rounded-xl border text-xs font-bold self-start sm:self-auto ${
                  activeProtocol.riskClassification === 'Alto Risco' || activeProtocol.riskClassification === 'Severo'
                    ? 'bg-rose-950/60 border-rose-500/40 text-rose-300'
                    : 'bg-amber-950/60 border-amber-500/40 text-amber-300'
                }`}>
                  Classificação: {activeProtocol.riskClassification}
                </div>
              )}
            </div>

            {/* Score Cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="text-xs font-medium text-slate-400">Pontuação Bruta</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-black text-indigo-400">{activeProtocol.totalScore}</span>
                  <span className="text-xs text-slate-500">/ {activeProtocol.maxPossibleScore} pts</span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="text-xs font-medium text-slate-400">% Conquista</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-black text-teal-400">{activeProtocol.percentageScore}%</span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="text-xs font-medium text-slate-400">Data Avaliação</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-sm font-bold text-slate-200">{activeProtocol.assessedDate}</span>
                </div>
              </div>
            </div>

            {/* Interpretation */}
            <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20 text-xs text-slate-300 leading-relaxed">
              <strong className="text-indigo-300 font-semibold block mb-1">Parecer Clínico da Avaliação:</strong>
              {activeProtocol.interpretationSummary}
            </div>

            {/* Search & Domain Filter */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Buscar marcos ou habilidades..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {domainsList.length > 0 && (
                <select
                  value={filterDomain}
                  onChange={(e) => setFilterDomain(e.target.value)}
                  className="px-3 py-2 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                >
                  <option value="all">Todos os Domínios ({domainsList.length})</option>
                  {domainsList.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* Interactive Items Scoring List */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Layers className="h-4 w-4 text-indigo-400" />
                Marcos e Itens Avaliados ({filteredItems.length})
              </h3>
              <span className="text-xs text-slate-400">Clique nas notas para atualizar a avaliação</span>
            </div>

            {filteredItems.length === 0 ? (
              <div className="p-8 text-center rounded-xl bg-slate-950/40 border border-dashed border-slate-800 text-slate-400 text-xs">
                Nenhum item encontrado para os filtros selecionados.
              </div>
            ) : (
              <div className="space-y-3">
                {filteredItems.map((item) => {
                  const isImported = importedItemCodes.includes(item.code);
                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1 max-w-xl">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 font-mono text-[11px] font-bold border border-indigo-500/30">
                            {item.code}
                          </span>
                          <span className="text-xs font-semibold text-slate-400">{item.domain}</span>
                          {item.level && (
                            <span className="text-[10px] text-teal-400 font-bold bg-teal-500/10 px-2 py-0.5 rounded">
                              Nível {item.level}
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-semibold text-white">{item.title}</p>
                        {item.notes && (
                          <p className="text-xs text-amber-400/90 italic">Obs: {item.notes}</p>
                        )}
                      </div>

                      {/* Interactive Score Selector */}
                      <div className="flex items-center gap-3 self-end sm:self-center">
                        <div className="flex items-center bg-slate-900 rounded-lg p-1 border border-slate-800">
                          {[0, 0.5, 1].map((scoreVal) => (
                            <button
                              key={scoreVal}
                              onClick={() => handleUpdateItemScore(item.id, scoreVal)}
                              className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                                item.score === scoreVal
                                  ? 'bg-indigo-600 text-white shadow-sm'
                                  : 'text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              {scoreVal}
                            </button>
                          ))}
                        </div>

                        {/* Bridge to PEI if has recommended target */}
                        {item.recommendedPeiTarget && item.score < item.maxScore && (
                          <button
                            onClick={() => handleImportGapToPei(item)}
                            disabled={isImported}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                              isImported
                                ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 cursor-default'
                                : 'bg-teal-600 hover:bg-teal-500 text-slate-950 hover:scale-105 shadow-md shadow-teal-500/20'
                            }`}
                            title="Converter esta lacuna em um novo programa no PEI do paciente com 1 clique"
                          >
                            {isImported ? (
                              <>
                                <Check className="h-3.5 w-3.5" />
                                <span>No PEI</span>
                              </>
                            ) : (
                              <>
                                <Sparkles className="h-3.5 w-3.5" />
                                <span>+ Meta no PEI</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right 1 col: 1-Click PEI Bridge Panel & Domain Radar */}
        <div className="space-y-6">
          {/* 1-Click PEI Bridge Panel */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-teal-950/40 via-slate-900 to-slate-900 border border-teal-500/30 shadow-xl space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Ponte Automática com o PEI</h3>
                <p className="text-[11px] text-teal-300/80">Lacunas do Protocolo ➔ Alvos de Ensino</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              O sistema identificou <strong>{deficitItemsWithRecommendations.length} lacunas críticas</strong> nesta avaliação que possuem currículo adaptativo estruturado para inserção imediata no PEI de {patient.preferredName}.
            </p>

            <div className="space-y-2.5 pt-2">
              {deficitItemsWithRecommendations.map((item) => {
                const isImported = importedItemCodes.includes(item.code);
                return (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-teal-400 font-mono">{item.code}</span>
                      <span className="text-[10px] text-rose-400 font-bold bg-rose-950/50 px-1.5 py-0.5 rounded border border-rose-500/30">
                        Nota: {item.score} / {item.maxScore}
                      </span>
                    </div>
                    <p className="font-medium text-slate-200">{item.title}</p>
                    <p className="text-[11px] text-slate-400">
                      <strong>Alvo Sugerido:</strong> {item.recommendedPeiTarget?.targetResponse}
                    </p>

                    <button
                      onClick={() => handleImportGapToPei(item)}
                      disabled={isImported}
                      className={`w-full py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        isImported
                          ? 'bg-slate-800 text-slate-400 cursor-default'
                          : 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-sm'
                      }`}
                    >
                      {isImported ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                          <span>Adicionado ao PEI</span>
                        </>
                      ) : (
                        <>
                          <PlusCircle className="h-3.5 w-3.5" />
                          <span>Adicionar Meta ao PEI</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Domain Breakdown Bars */}
          {activeProtocol.radarScores && activeProtocol.radarScores.length > 0 && (
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <PieIcon className="h-4 w-4 text-indigo-400" />
                <h3 className="font-bold text-white text-sm">Desempenho por Domínio Clínico</h3>
              </div>

              <div className="space-y-3 pt-1">
                {activeProtocol.radarScores.map((scoreItem) => {
                  const pct = Math.round((scoreItem.score / scoreItem.maxScore) * 100);
                  return (
                    <div key={scoreItem.domain} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-slate-300">{scoreItem.domain}</span>
                        <span className="font-mono font-bold text-indigo-400">
                          {scoreItem.score} / {scoreItem.maxScore} ({pct}%)
                        </span>
                      </div>
                      <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-teal-400 rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
