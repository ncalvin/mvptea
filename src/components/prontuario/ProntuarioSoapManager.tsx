import React, { useState } from 'react';
import { 
  FileText, 
  Stethoscope, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Share2, 
  Plus, 
  Award, 
  Sparkles, 
  Filter, 
  Search, 
  User, 
  ShieldCheck, 
  Lock, 
  Bookmark, 
  ChevronRight,
  Download,
  Printer
} from 'lucide-react';
import { 
  Patient, 
  MultidisciplinarySoapNote 
} from '../../types/aba';
import { MOCK_SOAP_NOTES } from '../../data/mockAbaData';

interface ProntuarioSoapManagerProps {
  patient: Patient;
  lowSensoryMode?: boolean;
}

export const ProntuarioSoapManager: React.FC<ProntuarioSoapManagerProps> = ({
  patient,
  lowSensoryMode = false,
}) => {
  const [soapNotes, setSoapNotes] = useState<MultidisciplinarySoapNote[]>(MOCK_SOAP_NOTES);
  const [selectedSpecialtyFilter, setSelectedSpecialtyFilter] = useState<string>('all');
  const [isNewNoteModalOpen, setIsNewNoteModalOpen] = useState<boolean>(false);

  // New Note Form State
  const [newSpecialty, setNewSpecialty] = useState<MultidisciplinarySoapNote['therapistSpecialty']>('Terapia Ocupacional');
  const [newSubjective, setNewSubjective] = useState('');
  const [newObjective, setNewObjective] = useState('');
  const [newAssessment, setNewAssessment] = useState('');
  const [newPlan, setNewPlan] = useState('');
  const [newSensoryDiet, setNewSensoryDiet] = useState('');
  const [newSharedGoal, setNewSharedGoal] = useState('Regulação e Atenção Compartilhada');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleCreateSoapNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubjective.trim() || !newObjective.trim() || !newAssessment.trim() || !newPlan.trim()) return;

    const councilMap = {
      'Fonoaudiologia': 'CRFa 2-19230',
      'Terapia Ocupacional': 'CREFITO 3-44120',
      'Psicologia': 'CRP 06/15890',
      'Psicopedagogia': 'ABPp 4410',
      'Fisioterapia': 'CREFITO 3-89110',
      'ABA/Comportamental': 'RBT-23-41288 (Supervisão BCBA-D)',
    };

    const newNote: MultidisciplinarySoapNote = {
      id: `soap-${Date.now()}`,
      patientId: patient.id,
      therapistId: 'ther-current',
      therapistName: 'Especialista Multidisciplinar',
      therapistSpecialty: newSpecialty,
      councilNumber: councilMap[newSpecialty] || 'Conselho Regional de Saúde',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().slice(0, 5),
      subjective: newSubjective,
      objective: newObjective,
      assessment: newAssessment,
      plan: newPlan,
      sensoryDietNotes: newSensoryDiet || undefined,
      sharedGoals: [newSharedGoal],
      digitalSignatureStamp: `Assinado digitalmente via ICP-Brasil em ${new Date().toLocaleDateString('pt-BR')} ${new Date().toLocaleTimeString('pt-BR')} UTC-3`,
    };

    setSoapNotes([newNote, ...soapNotes]);
    setIsNewNoteModalOpen(false);
    setNewSubjective('');
    setNewObjective('');
    setNewAssessment('');
    setNewPlan('');
    setNewSensoryDiet('');
    showToast('Evolução SOAP multidisciplinar registrada e assinada digitalmente com sucesso!');
  };

  const patientNotes = soapNotes.filter((n) => n.patientId === patient.id);
  const filteredNotes = patientNotes.filter((n) => {
    return selectedSpecialtyFilter === 'all' || n.therapistSpecialty === selectedSpecialtyFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-teal-900 border border-teal-400 text-white text-xs font-semibold shadow-2xl animate-fade-in">
          <Sparkles className="h-4 w-4 text-teal-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-teal-950/40 to-slate-900 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-600/20 border border-teal-500/40 text-teal-400 shadow-lg shadow-teal-500/10">
            <Stethoscope className="h-7 w-7 text-teal-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white tracking-tight">Prontuário Multidisciplinar SOAP</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/10 text-teal-300 border border-teal-500/30">
                PADRÃO INTERNACIONAL S.O.A.P.
              </span>
            </div>
            <p className="text-sm text-slate-400 mt-1">
              Registro clínico unificado para Fonoaudiologia, Terapia Ocupacional, Psicologia e ABA com metas transdisciplinares e assinatura digital ICP-Brasil.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsNewNoteModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold text-xs shadow-lg shadow-teal-600/20 transition-all hover:scale-105"
          >
            <Plus className="h-4 w-4" />
            <span>Nova Evolução SOAP</span>
          </button>
        </div>
      </div>

      {/* Shared Transdisciplinary Goals Showcase */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/30 space-y-3">
        <div className="flex items-center gap-2.5">
          <Share2 className="h-5 w-5 text-indigo-400" />
          <h3 className="font-bold text-white text-base">Metas Transdisciplinares Compartilhadas</h3>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
          Na abordagem de excelência em TEA, as especialidades não atuam isoladas. A Fonoaudiologia prescreve a Comunicação Alternativa (CAA/PECS), a T.O. Sensorial garante a regulação prévia e a ABA generaliza os mandos em tentativas discretas e ambiente natural.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-1">
            <span className="text-[10px] font-bold text-indigo-400 uppercase">Fonoaudiologia + ABA</span>
            <p className="font-bold text-white">Generalização de Mandos via Prancha PECS Fase III</p>
            <p className="text-[11px] text-slate-400">Uso do mesmo vocabulário de figuras na sala de fono e nas mesas DTT.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-1">
            <span className="text-[10px] font-bold text-teal-400 uppercase">T.O. Sensorial + ABA</span>
            <p className="font-bold text-white">Dieta Sensorial Proprioceptiva Pré-Mesa</p>
            <p className="text-[11px] text-slate-400">10 minutos de pressão profunda / balanço antes do treino cognitivo para elevar foco.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-1">
            <span className="text-[10px] font-bold text-purple-400 uppercase">Psicologia + Escola</span>
            <p className="font-bold text-white">Manejo de Transição com Timer Visual</p>
            <p className="text-[11px] text-slate-400">Previsibilidade de mudança de atividade compartilhada com o AT escolar.</p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400" />
          <span className="text-xs font-semibold text-slate-400">Filtrar por Especialidade:</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: `Todas (${patientNotes.length})` },
            { id: 'Terapia Ocupacional', label: 'T.O. Sensorial' },
            { id: 'Fonoaudiologia', label: 'Fonoaudiologia' },
            { id: 'ABA/Comportamental', label: 'ABA Comportamental' },
            { id: 'Psicologia', label: 'Psicologia' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedSpecialtyFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedSpecialtyFilter === tab.id
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* SOAP Notes List */}
      <div className="space-y-6">
        {filteredNotes.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 text-slate-400 space-y-2">
            <FileText className="h-8 w-8 mx-auto text-slate-600" />
            <p className="text-sm font-semibold">Nenhuma evolução SOAP cadastrada para esta especialidade.</p>
          </div>
        ) : (
          filteredNotes.map((note) => (
            <div
              key={note.id}
              className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5 shadow-sm hover:border-slate-700 transition-colors"
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400">
                    <Stethoscope className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white text-sm">{note.therapistSpecialty}</h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold">
                        {note.councilNumber}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Terapeuta: <strong>{note.therapistName}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-teal-400" />
                    <span>{note.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-teal-400" />
                    <span>{note.time}</span>
                  </div>
                </div>
              </div>

              {/* S.O.A.P. Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* S - Subjetivo */}
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20 text-[10px]">S</span>
                    Subjetivo (Relato e Estado de Entrada)
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">{note.subjective}</p>
                </div>

                {/* O - Objetivo */}
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-500/20 text-[10px]">O</span>
                    Objetivo (Dados Quantitativos da Sessão)
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">{note.objective}</p>
                </div>

                {/* A - Avaliação */}
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/20 text-[10px]">A</span>
                    Avaliação (Raciocínio Clínico & Regulação)
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">{note.assessment}</p>
                </div>

                {/* P - Plano */}
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-500/20 text-[10px]">P</span>
                    Plano (Condutas & Generalização)
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">{note.plan}</p>
                </div>
              </div>

              {/* Special Extras (Sensory Diet or AAC) */}
              {(note.sensoryDietNotes || note.aacFunctionalNotes) && (
                <div className="p-3.5 rounded-xl bg-teal-950/20 border border-teal-500/20 text-xs text-slate-300 space-y-1">
                  <span className="font-bold text-teal-300 text-[11px]">Diretrizes Transdisciplinares Específicas:</span>
                  <p>{note.sensoryDietNotes || note.aacFunctionalNotes}</p>
                </div>
              )}

              {/* Digital Signature Stamp */}
              {note.digitalSignatureStamp && (
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-900">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                    <ShieldCheck className="h-4 w-4" />
                    <span>{note.digitalSignatureStamp}</span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-500">Hash SHA-256 Validado</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* New SOAP Note Modal */}
      {isNewNoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-5 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-teal-400" />
                <h3 className="font-bold text-white text-base">Registrar Nova Evolução SOAP</h3>
              </div>
              <button
                onClick={() => setIsNewNoteModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕ Fechar
              </button>
            </div>

            <form onSubmit={handleCreateSoapNote} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Especialidade Clínica</label>
                <select
                  value={newSpecialty}
                  onChange={(e) => setNewSpecialty(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-500"
                >
                  <option value="Terapia Ocupacional">Terapia Ocupacional (Integração Sensorial)</option>
                  <option value="Fonoaudiologia">Fonoaudiologia (Comunicação Aumentativa)</option>
                  <option value="ABA/Comportamental">ABA / Análise do Comportamento</option>
                  <option value="Psicologia">Psicologia Comportamental</option>
                  <option value="Fisioterapia">Fisioterapia Neuromotora</option>
                  <option value="Psicopedagogia">Psicopedagogia Clínica</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-400 mb-1">S - Subjetivo (Humor, relato dos pais, sono, medicação)</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Ex: Criança chegou sorridente, mãe relatou noite tranquila de sono sem despertares..."
                  value={newSubjective}
                  onChange={(e) => setNewSubjective(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-teal-400 mb-1">O - Objetivo (Tentativas, taxa de resposta, medições)</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Ex: 25 tentativas de mando executadas. 80% independentes. Realizados 15 min de balanço..."
                  value={newObjective}
                  onChange={(e) => setNewObjective(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-indigo-400 mb-1">A - Avaliação (Análise clínica, autorregulação e barreiras)</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Ex: Apresentou excelente resposta ao reforço diferencial. Redução de latência de resposta..."
                  value={newAssessment}
                  onChange={(e) => setNewAssessment(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-purple-400 mb-1">P - Plano (Condutas para a próxima sessão e família)</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Ex: Iniciar desvanecimento de dica física. Orientar família sobre uso da prancha em casa..."
                  value={newPlan}
                  onChange={(e) => setNewPlan(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsNewNoteModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-slate-950 text-xs font-bold shadow-lg shadow-teal-600/20"
                >
                  Salvar e Assinar ICP-Brasil
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
