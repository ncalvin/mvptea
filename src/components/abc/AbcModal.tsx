import React, { useState } from 'react';
import { ShieldAlert, Sparkles, Clock, Flame, Check, Mic, MicOff, Wand2, Lightbulb } from 'lucide-react';
import { ABCEvent, BehaviorFunction } from '../../types/aba';
import { COMMON_ANTECEDENTS, COMMON_BEHAVIORS, COMMON_CONSEQUENCES } from '../../utils/abaConstants';

interface AbcModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientId: string;
  onSaveAbcEvent: (event: ABCEvent) => void;
}

export const AbcModal: React.FC<AbcModalProps> = ({
  isOpen,
  onClose,
  patientId,
  onSaveAbcEvent,
}) => {
  const [antecedent, setAntecedent] = useState('');
  const [behavior, setBehavior] = useState('');
  const [consequence, setConsequence] = useState('');
  const [fn, setFn] = useState<BehaviorFunction>('Fuga/Esquiva');
  const [intensity, setIntensity] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [durationMinutes, setDurationMinutes] = useState(3);
  const [environment, setEnvironment] = useState('Sala de Terapia 02');
  const [speechRaw, setSpeechRaw] = useState('');
  const [isDictating, setIsDictating] = useState(false);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSimulateVoiceDictation = (sampleText: string, parsed: { ant: string; beh: string; csq: string; f: BehaviorFunction; dur: number; int: 1|2|3|4|5 }) => {
    setIsDictating(true);
    setSpeechRaw(sampleText);
    setTimeout(() => {
      setAntecedent(parsed.ant);
      setBehavior(parsed.beh);
      setConsequence(parsed.csq);
      setFn(parsed.f);
      setDurationMinutes(parsed.dur);
      setIntensity(parsed.int);
      setNotes('Transcrito e estruturado automaticamente via IA (Speech-to-Contingency).');
      setIsDictating(false);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!antecedent || !behavior || !consequence) return;

    const newEvent: ABCEvent = {
      id: `abc-${Date.now()}`,
      patientId,
      timestamp: new Date().toISOString(),
      timeString: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      antecedent,
      behavior,
      consequence,
      function: fn,
      intensity,
      durationMinutes,
      environment,
      therapistName: 'Terapeuta em Sessão (RBT)',
      speechToTextRaw: speechRaw || undefined,
      notes,
    };

    onSaveAbcEvent(newEvent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl rounded-2xl border border-rose-500/30 bg-slate-900 p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto scrollbar-thin">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">Registro Comportamental ABC em Tempo Real</h3>
              <p className="text-xs text-slate-400">Antecedente ➔ Comportamento ➔ Consequência</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white font-bold">
            ✕
          </button>
        </div>

        {/* AI Speech-to-Contingency Quick Dictation Bar */}
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-purple-950/40 via-indigo-950/40 to-slate-900 border border-purple-500/30 text-xs">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 font-bold text-purple-300">
              <Sparkles className="h-4 w-4 text-purple-400 animate-spin" />
              <span>Ditado por Voz com IA (Speech-to-Contingency)</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-900/60 text-purple-200 border border-purple-700 font-mono font-bold">
              v2.4 IA
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mb-2">
            Fale a ocorrência imediatamente após a crise e a IA estruturará os 3 campos e sugerirá a função presumida em 1 toque:
          </p>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={isDictating}
              onClick={() => handleSimulateVoiceDictation(
                '"Ele se jogou no chão e gritou por 3 minutos quando pedi para guardar o iPad; redirecionei para o painel de rotina."',
                {
                  ant: 'Retirada do iPad / Transição de atividade',
                  beh: 'Se jogou no chão e gritou de forma disruptiva por 3 minutos',
                  csq: 'Redirecionamento calmo para o painel de rotina visual com prancha de escolha',
                  f: 'Acesso a Tangível',
                  dur: 3,
                  int: 3,
                }
              )}
              className="px-2.5 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/40 font-medium text-[11px] flex items-center gap-1.5 transition-colors"
            >
              <Mic className="h-3.5 w-3.5 text-purple-300" />
              <span>"Pedir para guardar o iPad..."</span>
            </button>

            <button
              type="button"
              disabled={isDictating}
              onClick={() => handleSimulateVoiceDictation(
                '"Tentou morder o braço ao apresentar o cartão do elefante; fiz bloqueio com anteparo e forneci ajuda gestual."',
                {
                  ant: 'Apresentação de cartão novo de alta dificuldade (Tato / Elefante)',
                  beh: 'Tentativa de morder o próprio antebraço e esquivar da mesa',
                  csq: 'Bloqueio suave com almofada neutra e dica gestual imediata (Errorless)',
                  f: 'Fuga/Esquiva',
                  dur: 2,
                  int: 4,
                }
              )}
              className="px-2.5 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/40 font-medium text-[11px] flex items-center gap-1.5 transition-colors"
            >
              <Mic className="h-3.5 w-3.5 text-purple-300" />
              <span>"Morder ao ver cartão novo..."</span>
            </button>
          </div>

          {speechRaw && (
            <div className="mt-2 p-2 rounded-lg bg-slate-950/80 border border-purple-500/20 text-[11px] text-purple-200 italic font-mono">
              🎤 Áudio Transcrito: {speechRaw}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Antecedent */}
          <div>
            <label className="block text-slate-200 font-bold mb-1.5 flex items-center justify-between">
              <span>(A) Antecedente (Gatilho da Ocorrência)</span>
              <span className="text-[10px] text-indigo-400 font-normal">Selecione ou digite</span>
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {COMMON_ANTECEDENTS.slice(0, 4).map((ant) => (
                <button
                  type="button"
                  key={ant}
                  onClick={() => setAntecedent(ant)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                    antecedent === ant 
                      ? 'bg-indigo-600 text-white border-indigo-500' 
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {ant}
                </button>
              ))}
            </div>
            <input
              type="text"
              required
              placeholder="Descreva o antecedente exato..."
              value={antecedent}
              onChange={(e) => setAntecedent(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Behavior */}
          <div>
            <label className="block text-slate-200 font-bold mb-1.5 flex items-center justify-between">
              <span>(B) Comportamento (Topografia Objetiva)</span>
              <span className="text-[10px] text-rose-400 font-normal">Mensurável e observável</span>
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {COMMON_BEHAVIORS.slice(0, 4).map((beh) => (
                <button
                  type="button"
                  key={beh}
                  onClick={() => setBehavior(beh)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                    behavior === beh 
                      ? 'bg-rose-600 text-white border-rose-500' 
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {beh}
                </button>
              ))}
            </div>
            <input
              type="text"
              required
              placeholder="Descreva a topografia do comportamento..."
              value={behavior}
              onChange={(e) => setBehavior(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-rose-500"
            />
          </div>

          {/* Consequence */}
          <div>
            <label className="block text-slate-200 font-bold mb-1.5 flex items-center justify-between">
              <span>(C) Consequência (Manejo Imediato do Terapeuta)</span>
              <span className="text-[10px] text-emerald-400 font-normal">Reação do ambiente</span>
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {COMMON_CONSEQUENCES.slice(0, 4).map((csq) => (
                <button
                  type="button"
                  key={csq}
                  onClick={() => setConsequence(csq)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                    consequence === csq 
                      ? 'bg-emerald-600 text-white border-emerald-500' 
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {csq}
                </button>
              ))}
            </div>
            <input
              type="text"
              required
              placeholder="Descreva a consequência ambiental / ação..."
              value={consequence}
              onChange={(e) => setConsequence(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Function & Intensity Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
            <div>
              <label className="block text-slate-200 font-bold mb-1.5">
                Função Presumida do Comportamento
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {(['Fuga/Esquiva', 'Acesso a Tangível', 'Atenção Social', 'Sensorial/Automático'] as BehaviorFunction[]).map((f) => (
                  <button
                    type="button"
                    key={f}
                    onClick={() => setFn(f)}
                    className={`p-2 rounded-lg text-[11px] font-medium border text-center transition-colors ${
                      fn === f 
                        ? 'bg-indigo-600 text-white border-indigo-500 font-bold' 
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-slate-200 font-bold mb-1.5">
                Intensidade da Ocorrência (1 a 5)
              </label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <button
                    type="button"
                    key={lvl}
                    onClick={() => setIntensity(lvl as any)}
                    className={`flex-1 py-2 rounded-lg text-xs font-mono font-bold border transition-colors ${
                      intensity === lvl
                        ? 'bg-rose-600 text-white border-rose-500 scale-105'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>Leve</span>
                <span>Moderada</span>
                <span>Grave / Risco</span>
              </div>
            </div>
          </div>

          {/* Duration and Environment */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-200 font-bold mb-1">
                Duração (Minutos):
              </label>
              <input
                type="number"
                min="1"
                max="60"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(parseInt(e.target.value) || 1)}
                className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-200 font-bold mb-1">
                Ambiente / Sala:
              </label>
              <input
                type="text"
                value={environment}
                onChange={(e) => setEnvironment(e.target.value)}
                className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black shadow-lg shadow-rose-950/50 transition-all active:scale-95"
            >
              Salvar Registro ABC (&lt; 5s)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
