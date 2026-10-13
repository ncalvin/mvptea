import React, { useState } from 'react';
import { 
  Plus, 
  Layers, 
  CheckCircle2, 
  Flame, 
  Clock, 
  Award, 
  FileEdit, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  BookOpen, 
  Check,
  ShieldAlert,
  Zap,
  Tag,
  ChevronRight
} from 'lucide-react';
import { Patient, ProgramPEI, TargetExemplar, TargetStatus, VbMappMilestone } from '../../types/aba';
import { MOCK_VB_MAPP_MILESTONES } from '../../data/mockAbaData';

interface PeiProgramManagerProps {
  patient: Patient;
  onAddProgram: (newProgram: ProgramPEI) => void;
  onGoToProtocols?: () => void;
}

export const PeiProgramManager: React.FC<PeiProgramManagerProps> = ({ 
  patient, 
  onAddProgram,
  onGoToProtocols 
}) => {
  const [activeTab, setActiveTab] = useState<'programs' | 'bip' | 'vbmapp'>('programs');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedProgramId, setExpandedProgramId] = useState<string | null>(patient.programs[0]?.id || null);

  // New Program Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDomain, setNewDomain] = useState<ProgramPEI['domain']>('Tato (Nomeação)');
  const [newProtocol, setNewProtocol] = useState<'VB-MAPP' | 'ABLLS-R' | 'PEAK' | 'Customizado'>('VB-MAPP');
  const [newProtocolCode, setNewProtocolCode] = useState('');
  const [isNetProgram, setIsNetProgram] = useState(false);
  const [newSd, setNewSd] = useState('');
  const [newMo, setNewMo] = useState('');
  const [newTargetResponse, setNewTargetResponse] = useState('');
  const [newMasteryCriteria, setNewMasteryCriteria] = useState('80% de independência em 3 sessões consecutivas');
  const [newExemplarNames, setNewExemplarNames] = useState('Item 1, Item 2, Item 3');

  const handleCreateProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || (!newSd.trim() && !newMo.trim())) return;

    const exemplars: TargetExemplar[] = newExemplarNames
      .split(',')
      .map((item, idx) => ({
        id: `ex-${Date.now()}-${idx}`,
        name: item.trim(),
        status: (idx === 0 ? 'acquisition' : 'baseline') as TargetStatus,
        trialsCount: 0,
        successRate: 0,
      }))
      .filter((ex) => ex.name.length > 0);

    const program: ProgramPEI = {
      id: `prog-${Date.now()}`,
      title: newTitle.trim(),
      domain: newDomain,
      protocol: newProtocol,
      protocolCode: newProtocolCode.trim() || 'Custom',
      measurementType: isNetProgram ? 'frequency_rate' : 'dtt_discrete_trial',
      sd: isNetProgram ? undefined : newSd.trim(),
      motivatingOperation: isNetProgram ? newMo.trim() : undefined,
      antecedentSetup: isNetProgram ? 'Disposição de brinquedos reforçadores no ambiente' : undefined,
      targetResponse: newTargetResponse.trim(),
      masteryCriteria: newMasteryCriteria.trim(),
      status: 'acquisition',
      currentExemplarIndex: 0,
      consecutiveSuccessSessions: 0,
      requiredConsecutiveSessions: 3,
      masteryPercentageThreshold: 80,
      exemplars: exemplars.length > 0 ? exemplars : [{ id: `ex-${Date.now()}-0`, name: 'Alvo Principal', status: 'acquisition', trialsCount: 0, successRate: 0 }],
    };

    onAddProgram(program);
    setIsModalOpen(false);
    // Reset Form
    setNewTitle('');
    setNewSd('');
    setNewMo('');
    setNewTargetResponse('');
    setNewProtocolCode('');
  };

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Plano de Ensino Individualizado (PEI & BIP)
            </span>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/20 font-bold">
              {patient.programs.length} Programas Ativos
            </span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight mt-1">
            Gestão de Programas, BIP & Protocolos ABA
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Definição de alvos, planos de intervenção comportamental e matriz de marcos VB-MAPP.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-teal-600 hover:from-indigo-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition-all scale-100 hover:scale-[1.02]"
          >
            <Plus className="h-4 w-4" />
            <span>Novo Programa</span>
          </button>
        </div>
      </div>

      {/* Sub Tabs: Programs vs BIP vs VB-MAPP */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('programs')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'programs'
              ? 'bg-indigo-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Layers className="h-4 w-4" />
          <span>Programas de Ensino ({patient.programs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('bip')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'bip'
              ? 'bg-rose-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <BookOpen className="h-4 w-4 text-rose-300" />
          <span>Plano de Intervenção (BIP / PAC)</span>
        </button>

        <button
          onClick={() => setActiveTab('vbmapp')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'vbmapp'
              ? 'bg-teal-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Award className="h-4 w-4 text-teal-300" />
          <span>Matriz de Marcos VB-MAPP</span>
        </button>
      </div>

      {/* TAB 1: PEI Programs List */}
      {activeTab === 'programs' && (
        <div className="space-y-4">
          {onGoToProtocols && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-teal-950/60 via-slate-900 to-indigo-950/50 border border-teal-500/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-teal-500/20 text-teal-300">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Centro de Protocolos Padronizados</h4>
                  <p className="text-[11px] text-slate-400">Importe metas avaliadas no VB-MAPP, Denver ESDM, M-CHAT ou ABLLS-R com 1 clique.</p>
                </div>
              </div>
              <button
                onClick={onGoToProtocols}
                className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold text-xs transition-all flex items-center gap-1.5 shrink-0 shadow-sm"
              >
                <span>Abrir Protocolos</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {patient.programs.map((prog) => {
            const isExpanded = expandedProgramId === prog.id;
            const masteredCount = prog.exemplars.filter((e) => e.status === 'mastered').length;
            const totalCount = prog.exemplars.length;
            const progressPercent = totalCount > 0 ? Math.round((masteredCount / totalCount) * 100) : 0;

            return (
              <div
                key={prog.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl overflow-hidden transition-all"
              >
                <div
                  onClick={() => setExpandedProgramId(isExpanded ? null : prog.id)}
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-850/60 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-indigo-950/80 border border-indigo-500/30 text-indigo-400 shrink-0">
                      <Layers className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">
                          {prog.protocolCode || prog.protocol}
                        </span>
                        <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                          {prog.domain}
                        </span>
                        {prog.motivatingOperation && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                            NET / Mando Natural
                          </span>
                        )}
                      </div>
                      <h2 className="text-base font-extrabold text-white">{prog.title}</h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Critério: {prog.masteryCriteria}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6">
                    <div className="text-right">
                      <div className="text-xs font-bold text-slate-300">
                        {masteredCount} de {totalCount} Dominados
                      </div>
                      <div className="w-32 bg-slate-800 h-2 rounded-full overflow-hidden mt-1.5">
                        <div
                          className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>

                    <button className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/80">
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="p-5 border-t border-slate-800 bg-slate-950/60 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                        <div className="text-[10px] font-bold uppercase text-indigo-400 mb-1">
                          {prog.motivatingOperation ? 'Operação Motivadora (MO / NET)' : 'Estímulo Discriminativo ($S^D$)'}
                        </div>
                        <p className="text-xs text-slate-200">
                          {prog.motivatingOperation || prog.sd}
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                        <div className="text-[10px] font-bold uppercase text-teal-400 mb-1">
                          Resposta Alvo
                        </div>
                        <p className="text-xs text-slate-200">{prog.targetResponse}</p>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                        <div className="text-[10px] font-bold uppercase text-amber-400 mb-1">
                          Critério de Domínio
                        </div>
                        <p className="text-xs text-slate-200">{prog.masteryCriteria}</p>
                      </div>
                    </div>

                    {/* Exemplars Table */}
                    <div>
                      <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                        Exemplares / Sub-Alvos do Programa
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                        {prog.exemplars.map((ex) => (
                          <div
                            key={ex.id}
                            className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs"
                          >
                            <div className="flex items-center gap-2">
                              {ex.status === 'mastered' ? (
                                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                              ) : ex.status === 'acquisition' ? (
                                <Flame className="h-4 w-4 text-amber-400 shrink-0" />
                              ) : (
                                <Clock className="h-4 w-4 text-slate-500 shrink-0" />
                              )}
                              <span className="font-bold text-slate-200">{ex.name}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              {ex.status === 'mastered' && (
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                                  Manutenção (D+10/20/30)
                                </span>
                              )}
                              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                                ex.status === 'mastered' ? 'bg-emerald-500/20 text-emerald-300' :
                                ex.status === 'acquisition' ? 'bg-amber-500/20 text-amber-300' :
                                'bg-slate-800 text-slate-400'
                              }`}>
                                {ex.successRate}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: Behavior Intervention Plan (BIP / PAC) */}
      {activeTab === 'bip' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 text-xs text-rose-200 flex items-start gap-3">
            <ShieldAlert className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-rose-300">
                Plano de Ação Comportamental (BIP) em Vigor
              </div>
              <p className="text-slate-300 mt-0.5">
                Diretrizes clínicas para manejo preventivo, ensino de habilidades substitutivas funcionais (FCT/DRA) e protocolos de segurança em situações de crise para {patient.name}.
              </p>
            </div>
          </div>

          {patient.bips && patient.bips.length > 0 ? (
            patient.bips.map((bip) => (
              <div key={bip.id} className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800 font-bold font-mono">
                      Função Presumida: {bip.presumedFunction}
                    </span>
                    <h2 className="text-base font-extrabold text-white mt-1">{bip.targetBehavior}</h2>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                    BIP Ativo
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                    <span className="font-bold text-amber-400 uppercase text-[10px] tracking-wider block">
                      1. Estratégias Proativas (Antecedentes)
                    </span>
                    <p className="text-slate-300 leading-relaxed">{bip.proactiveStrategies}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                    <span className="font-bold text-emerald-400 uppercase text-[10px] tracking-wider block">
                      2. Comportamento Substitutivo (FCT / DRA)
                    </span>
                    <p className="text-slate-300 leading-relaxed">{bip.replacementBehavior}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                    <span className="font-bold text-rose-400 uppercase text-[10px] tracking-wider block">
                      3. Protocolo de Crise e Segurança (Reativo)
                    </span>
                    <p className="text-slate-300 leading-relaxed">{bip.reactiveStrategies}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-8 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 text-xs">
              Nenhum BIP cadastrado para este aprendiz.
            </div>
          )}
        </div>
      )}

      {/* TAB 3: VB-MAPP Milestones Visual Matrix */}
      {activeTab === 'vbmapp' && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 lg:p-6 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-black text-white">
                Grade de Marcos do Desenvolvimento Verbal (VB-MAPP)
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Avaliação comportamental de marcos (Nível 1: 0-18 meses | Nível 2: 18-30 meses | Nível 3: 30-48 meses).
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded bg-emerald-500" />
                <span className="text-slate-300">Dominado (1.0)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded bg-amber-500" />
                <span className="text-slate-300">Parcial (0.5)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded bg-slate-700" />
                <span className="text-slate-300">Não Atingido (0.0)</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {MOCK_VB_MAPP_MILESTONES.map((milestone) => (
              <div
                key={milestone.code}
                className={`p-3.5 rounded-xl border text-xs transition-all ${
                  milestone.score === 1
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                    : milestone.score === 0.5
                    ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                    : 'bg-slate-950/50 border-slate-800 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between font-mono font-bold mb-1">
                  <span className="text-sm text-white">{milestone.code}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] ${
                    milestone.score === 1 ? 'bg-emerald-500 text-slate-950 font-black' :
                    milestone.score === 0.5 ? 'bg-amber-500 text-slate-950 font-black' :
                    'bg-slate-800 text-slate-400'
                  }`}>
                    {milestone.score.toFixed(1)}
                  </span>
                </div>
                <div className="text-[11px] font-medium text-slate-300">{milestone.domain}</div>
                <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-tight">
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Program Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto scrollbar-thin">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-teal-400" />
                <h3 className="text-lg font-black text-white">Criar Novo Programa no PEI</h3>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProgram} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Nome do Programa / Habilidade</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Tato de Animais ou Mando de Brinquedos"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Domínio Comportamental</label>
                  <select
                    value={newDomain}
                    onChange={(e) => {
                      const d = e.target.value as any;
                      setNewDomain(d);
                      if (d === 'Mando (Comunicação)') setIsNetProgram(true);
                    }}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Mando (Comunicação)">Mando (Comunicação)</option>
                    <option value="Tato (Nomeação)">Tato (Nomeação)</option>
                    <option value="Ecoico (Vocal)">Ecoico (Vocal)</option>
                    <option value="Intraverbal">Intraverbal</option>
                    <option value="Imitação Motora">Imitação Motora</option>
                    <option value="Habilidades Sociais">Habilidades Sociais</option>
                    <option value="Autonomia (AVD)">Autonomia (AVD)</option>
                    <option value="Pré-Acadêmico">Pré-Acadêmico</option>
                  </select>
                </div>
              </div>

              {/* NET vs DTT Mode toggle */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Metodologia NET / Ensino Natural</span>
                  <span className="text-[11px] text-slate-400">Antecedente baseado em Operação Motivadora (MO) sem SD vocal</span>
                </div>
                <input
                  type="checkbox"
                  checked={isNetProgram}
                  onChange={(e) => setIsNetProgram(e.target.checked)}
                  className="h-4 w-4 rounded accent-indigo-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Protocolo Base</label>
                  <select
                    value={newProtocol}
                    onChange={(e) => setNewProtocol(e.target.value as any)}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="VB-MAPP">VB-MAPP</option>
                    <option value="ABLLS-R">ABLLS-R</option>
                    <option value="PEAK">PEAK</option>
                    <option value="Customizado">Customizado</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Código do Protocolo (Opcional)</label>
                  <input
                    type="text"
                    placeholder="Ex: Mando 7M ou Tato 5M"
                    value={newProtocolCode}
                    onChange={(e) => setNewProtocolCode(e.target.value)}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {isNetProgram ? (
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Operação Motivadora (MO / EO)</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Privação do brinquedo favorito colocado fora do alcance imediato"
                    value={newMo}
                    onChange={(e) => setNewMo(e.target.value)}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Estímulo Discriminativo ($S^D$ / Instrução)</label>
                  <input
                    type="text"
                    required
                    placeholder='Ex: "O que é isso?" ou "Faz igual"'
                    value={newSd}
                    onChange={(e) => setNewSd(e.target.value)}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-slate-300 font-bold mb-1">Resposta Alvo Esperada</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Aprendiz nomeia o objeto em até 3 segundos com clareza vocal."
                  value={newTargetResponse}
                  onChange={(e) => setNewTargetResponse(e.target.value)}
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Lista de Exemplares (Separados por vírgula)</label>
                <input
                  type="text"
                  placeholder="Cachorro, Gato, Leão, Elefante"
                  value={newExemplarNames}
                  onChange={(e) => setNewExemplarNames(e.target.value)}
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-teal-600 hover:from-indigo-500 hover:to-teal-500 text-white font-black shadow-lg shadow-indigo-600/20 transition-all"
                >
                  Salvar Programa no PEI
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
