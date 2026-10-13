import React, { useState } from 'react';
import { 
  Heart, 
  Sparkles, 
  GraduationCap, 
  Home, 
  Plus 
} from 'lucide-react';
import { 
  Patient, 
  FamilyMilestonePost, 
  HomeGeneralizationLog, 
  SchoolAtLogEntry 
} from '../../types/aba';
import { 
  MOCK_FAMILY_POSTS, 
  MOCK_HOME_GENERALIZATIONS, 
  MOCK_SCHOOL_AT_LOGS 
} from '../../data/mockAbaData';

interface FamilySchoolPortalProps {
  patient: Patient;
  lowSensoryMode?: boolean;
}

export const FamilySchoolPortal: React.FC<FamilySchoolPortalProps> = ({
  patient,
  lowSensoryMode: _lowSensoryMode = false,
}) => {
  const [activePortalTab, setActivePortalTab] = useState<'family' | 'school'>('family');
  const [familyPosts, setFamilyPosts] = useState<FamilyMilestonePost[]>(MOCK_FAMILY_POSTS);
  const [homeLogs, setHomeLogs] = useState<HomeGeneralizationLog[]>(MOCK_HOME_GENERALIZATIONS);
  const [schoolLogs, setSchoolLogs] = useState<SchoolAtLogEntry[]>(MOCK_SCHOOL_AT_LOGS);

  // New Home Generalization Form
  const [isHomeModalOpen, setIsHomeModalOpen] = useState(false);
  const [newTargetTrained, setNewTargetTrained] = useState('');
  const [newContext, setNewContext] = useState('');
  const [newPrompt, setNewPrompt] = useState<HomeGeneralizationLog['promptNeeded']>('Nenhuma (Independente)');
  const [newReinforcer, setNewReinforcer] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New School AT Log Form
  const [isSchoolModalOpen, setIsSchoolModalOpen] = useState(false);
  const [newSeatEngagement, setNewSeatEngagement] = useState<number>(30);
  const [newSocialCount, setNewSocialCount] = useState<number>(3);
  const [newCurricularNotes, setNewCurricularNotes] = useState('');
  const [newSensoryTriggers, setNewSensoryTriggers] = useState('Sirene do recreio');
  const [newGeneralObs, setNewGeneralObs] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleLikePost = (postId: string) => {
    setFamilyPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, likesCount: p.likesCount + 1 } : p))
    );
  };

  const handleCreateHomeLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTargetTrained.trim() || !newContext.trim()) return;

    const newLog: HomeGeneralizationLog = {
      id: `gen-${Date.now()}`,
      patientId: patient.id,
      date: new Date().toISOString().split('T')[0],
      recordedByParent: `${patient.caretakers[0]?.name || 'Responsável Legal'}`,
      skillTargetTrained: newTargetTrained,
      contextDescription: newContext,
      promptNeeded: newPrompt,
      reinforcerUsed: newReinforcer || 'Elogio social carinhoso',
      success: true,
    };

    setHomeLogs([newLog, ...homeLogs]);
    setIsHomeModalOpen(false);
    setNewTargetTrained('');
    setNewContext('');
    setNewReinforcer('');
    showToast('Registro de generalização em casa salvo e compartilhado com a supervisão clínica!');
  };

  const handleCreateSchoolLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCurricularNotes.trim() || !newGeneralObs.trim()) return;

    const newEntry: SchoolAtLogEntry = {
      id: `school-${Date.now()}`,
      patientId: patient.id,
      atTherapistName: 'Beatriz Vasques (AT Escolar)',
      date: new Date().toISOString().split('T')[0],
      schoolName: 'Colégio Viver e Aprender',
      gradeClass: 'Educação Infantil II',
      seatEngagementMinutes: Number(newSeatEngagement),
      peerSocialInteractionsCount: Number(newSocialCount),
      sensoryOverloadTriggers: [newSensoryTriggers],
      curricularAdaptationNotes: newCurricularNotes,
      generalObservations: newGeneralObs,
    };

    setSchoolLogs([newEntry, ...schoolLogs]);
    setIsSchoolModalOpen(false);
    setNewCurricularNotes('');
    setNewGeneralObs('');
    showToast('Diário de mediação do AT Escolar registrado com sucesso!');
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
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 shadow-lg shadow-indigo-500/10">
            <Heart className="h-7 w-7 text-rose-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white tracking-tight">Portal Família & Inclusão Escolar</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/10 text-rose-300 border border-rose-500/30">
                GENERALIZAÇÃO NATURAL
              </span>
            </div>
            <p className="text-sm text-slate-400 mt-1">
              Conexão em tempo real com os pais de <strong>{patient.name}</strong> e acompanhamento diário do Acompanhante Terapêutico (AT) na escola regular.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start lg:self-auto">
          <div className="flex items-center bg-slate-900 rounded-xl p-1 border border-slate-800">
            <button
              onClick={() => setActivePortalTab('family')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activePortalTab === 'family'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Home className="h-3.5 w-3.5" />
              <span>Portal da Família</span>
            </button>
            <button
              onClick={() => setActivePortalTab('school')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activePortalTab === 'school'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <GraduationCap className="h-3.5 w-3.5" />
              <span>Diário AT Escolar</span>
            </button>
          </div>
        </div>
      </div>

      {/* SUB-TAB 1: Portal da Família ("BlueFamily / Comunidade") */}
      {activePortalTab === 'family' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Timeline Feed */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-rose-400" />
                Linha do Tempo de Conquistas & Marcos
              </h3>
              <span className="text-xs text-slate-400">Atualizado pela equipe de supervisão</span>
            </div>

            <div className="space-y-4">
              {familyPosts.map((post) => (
                <div
                  key={post.id}
                  className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-sm hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/30">
                      {post.category === 'conquista_clinica' ? '🌟 Conquista Clínica' : '💡 Treino Parental'}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{post.date}</span>
                  </div>

                  <h4 className="text-base font-bold text-white leading-snug">{post.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{post.description}</p>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                    <span className="text-[11px] text-slate-400 font-medium">
                      Publicado por: <strong>{post.therapistName}</strong>
                    </span>

                    <button
                      onClick={() => handleLikePost(post.id)}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 border border-rose-500/30 text-rose-300 text-xs font-bold transition-all hover:scale-105"
                    >
                      <Heart className="h-3.5 w-3.5 fill-rose-400 text-rose-400" />
                      <span>{post.likesCount} Comemorações</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right 1 Col: Diário de Generalização Domiciliar */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4 text-teal-400" />
                  <h3 className="font-bold text-white text-sm">Diário de Generalização em Casa</h3>
                </div>
                <button
                  onClick={() => setIsHomeModalOpen(true)}
                  className="px-2.5 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-slate-950 text-xs font-bold transition-all flex items-center gap-1 shadow-sm"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Novo Registro</span>
                </button>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Quando {patient.preferredName} reproduzir um comportamento funcional em casa (ex: pedir água, usar o banheiro, guardar brinquedos), registre aqui para análise do supervisor BCBA.
              </p>

              <div className="space-y-3 pt-2">
                {homeLogs.map((log) => (
                  <div key={log.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-teal-400">{log.skillTargetTrained}</span>
                      <span className="text-[10px] text-slate-500">{log.date}</span>
                    </div>
                    <p className="text-[11px] text-slate-300">{log.contextDescription}</p>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-900">
                      <span>Ajuda: <strong className="text-slate-200">{log.promptNeeded}</strong></span>
                      <span>Reforçador: <strong className="text-teal-300">{log.reinforcerUsed}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: Diário do AT Escolar */}
      {activePortalTab === 'school' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-indigo-400" />
                <h3 className="font-bold text-white text-base">Diário de Bordo da Mediação Escolar</h3>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
                Registro diário do Acompanhante Terapêutico (AT) na escola regular para acompanhamento de socialização com pares, permanência em carteira e manejo de sobrecarga sensorial.
              </p>
            </div>

            <button
              onClick={() => setIsSchoolModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-1.5 shrink-0"
            >
              <Plus className="h-4 w-4" />
              <span>Novo Registro do AT</span>
            </button>
          </div>

          <div className="space-y-4">
            {schoolLogs.map((entry) => (
              <div
                key={entry.id}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <h4 className="font-bold text-sm text-white">{entry.schoolName} — {entry.gradeClass}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">AT Responsável: <strong>{entry.atTherapistName}</strong></p>
                  </div>
                  <span className="text-xs font-semibold text-slate-400">{entry.date}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] font-medium text-slate-400">Permanência em Carteira</span>
                    <p className="text-base font-extrabold text-teal-400 mt-0.5">{entry.seatEngagementMinutes} minutos</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] font-medium text-slate-400">Interações com Pares</span>
                    <p className="text-base font-extrabold text-indigo-400 mt-0.5">{entry.peerSocialInteractionsCount} ocorrências</p>
                  </div>
                  <div className="col-span-2 p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] font-medium text-slate-400">Gatilhos Sensoriais Observados</span>
                    <p className="text-xs font-bold text-amber-300 mt-0.5">{entry.sensoryOverloadTriggers.join(', ')}</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <strong className="text-indigo-300 block mb-1">Adaptação Curricular Realizada:</strong>
                    <p className="text-slate-300">{entry.curricularAdaptationNotes}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <strong className="text-teal-300 block mb-1">Observações Gerais de Inclusão no Recreio:</strong>
                    <p className="text-slate-300">{entry.generalObservations}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Novo Registro de Generalização em Casa */}
      {isHomeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm">Registrar Conquista / Generalização em Casa</h3>
              <button onClick={() => setIsHomeModalOpen(false)} className="text-slate-400 hover:text-white text-xs">✕</button>
            </div>

            <form onSubmit={handleCreateHomeLog} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Qual comportamento foi observado?</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Pediu maçã dizendo 'Qué maça' sem apontar"
                  value={newTargetTrained}
                  onChange={(e) => setNewTargetTrained(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 rounded-xl border border-slate-800 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Em qual contexto aconteceu?</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Ex: Na cozinha, enquanto preparávamos o lanche da tarde..."
                  value={newContext}
                  onChange={(e) => setNewContext(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 rounded-xl border border-slate-800 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Precisou de ajuda?</label>
                <select
                  value={newPrompt}
                  onChange={(e) => setNewPrompt(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300"
                >
                  <option value="Nenhuma (Independente)">Nenhuma (Fez 100% sozinho)</option>
                  <option value="Dica Leve">Dica Leve (Gesto ou incentivo verbal)</option>
                  <option value="Dica Total">Dica Total (Ajuda física)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">O que a criança recebeu de recompensa?</label>
                <input
                  type="text"
                  placeholder="Ex: Pedaço de maçã + abraço e parabéns"
                  value={newReinforcer}
                  onChange={(e) => setNewReinforcer(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 rounded-xl border border-slate-800 text-xs text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button type="button" onClick={() => setIsHomeModalOpen(false)} className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs">Cancelar</button>
                <button type="submit" className="px-4 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold text-xs">Salvar Registro</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Novo Registro do AT Escolar */}
      {isSchoolModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm">Registrar Mediação do AT Escolar</h3>
              <button onClick={() => setIsSchoolModalOpen(false)} className="text-slate-400 hover:text-white text-xs">✕</button>
            </div>

            <form onSubmit={handleCreateSchoolLog} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Tempo em Carteira (min)</label>
                  <input
                    type="number"
                    value={newSeatEngagement}
                    onChange={(e) => setNewSeatEngagement(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 rounded-xl border border-slate-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Interações com Pares</label>
                  <input
                    type="number"
                    value={newSocialCount}
                    onChange={(e) => setNewSocialCount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 rounded-xl border border-slate-800 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Gatilhos Sensoriais na Escola</label>
                <input
                  type="text"
                  value={newSensoryTriggers}
                  onChange={(e) => setNewSensoryTriggers(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 rounded-xl border border-slate-800 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Adaptação Curricular Realizada</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Ex: Atividade de recorte e colagem adaptada com tesoura de mola..."
                  value={newCurricularNotes}
                  onChange={(e) => setNewCurricularNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 rounded-xl border border-slate-800 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Observações no Recreio / Socialização</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Ex: Compartilhou brinquedo com colega e aceitou mediação..."
                  value={newGeneralObs}
                  onChange={(e) => setNewGeneralObs(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 rounded-xl border border-slate-800 text-xs text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button type="button" onClick={() => setIsSchoolModalOpen(false)} className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs">Cancelar</button>
                <button type="submit" className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs">Salvar Diário Escolar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
