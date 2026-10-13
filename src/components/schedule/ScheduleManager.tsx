import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  UserCheck, 
  AlertCircle, 
  Plus, 
  Share2, 
  MessageSquare, 
  CheckCircle, 
  Filter, 
  Layers, 
  Zap, 
  Building2, 
  ArrowRight,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { 
  Patient, 
  RoomScheduleItem, 
  SensoryRoom 
} from '../../types/aba';
import { 
  MOCK_SCHEDULE_ITEMS, 
  MOCK_SENSORY_ROOMS 
} from '../../data/mockAbaData';

interface ScheduleManagerProps {
  patients: Patient[];
  activePatient: Patient;
  onSelectPatient: (patient: Patient) => void;
  onGoToLiveDtt: (patient: Patient) => void;
  onGoToSoap: (patient: Patient) => void;
  lowSensoryMode?: boolean;
}

export const ScheduleManager: React.FC<ScheduleManagerProps> = ({
  patients,
  activePatient,
  onSelectPatient,
  onGoToLiveDtt,
  onGoToSoap,
  lowSensoryMode = false,
}) => {
  const [scheduleItems, setScheduleItems] = useState<RoomScheduleItem[]>(MOCK_SCHEDULE_ITEMS);
  const [rooms] = useState<SensoryRoom[]>(MOCK_SENSORY_ROOMS);
  const [viewMode, setViewMode] = useState<'rooms' | 'therapists' | 'blocks'>('rooms');
  const [selectedRoomFilter, setSelectedRoomFilter] = useState<string>('all');
  const [notificationToast, setNotificationToast] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-13');

  const showToast = (msg: string) => {
    setNotificationToast(msg);
    setTimeout(() => setNotificationToast(null), 4000);
  };

  const handleToggleCheckin = (itemId: string) => {
    setScheduleItems((prev) =>
      prev.map((item) => {
        if (item.id !== itemId) return item;
        const nextStatus = item.status === 'completed' ? 'scheduled' : 'completed';
        showToast(
          nextStatus === 'completed'
            ? `Presença confirmada para ${item.patientName}. Horário validado para faturamento e repasse!`
            : `Presença desmarcada para ${item.patientName}.`
        );
        return { ...item, status: nextStatus };
      })
    );
  };

  const handleSendWhatsAppReminder = (item: RoomScheduleItem) => {
    setScheduleItems((prev) =>
      prev.map((it) => (it.id === item.id ? { ...it, whatsappReminderSent: true } : it))
    );
    showToast(`Lembrete oficial enviado via WhatsApp para a família de ${item.patientName}!`);
  };

  const filteredItems = scheduleItems.filter((item) => {
    const matchesRoom = selectedRoomFilter === 'all' || item.roomId === selectedRoomFilter;
    const matchesDate = item.date === selectedDate;
    return matchesRoom && matchesDate;
  });

  // Conflict Detection: check if any room has >1 session overlapping at the same time
  const detectedConflicts: { roomName: string; time: string; count: number }[] = [];
  const roomTimeMap: { [key: string]: number } = {};
  filteredItems.forEach((it) => {
    const key = `${it.roomId}_${it.startTime}`;
    roomTimeMap[key] = (roomTimeMap[key] || 0) + 1;
    if (roomTimeMap[key] > 1) {
      detectedConflicts.push({ roomName: it.roomName, time: it.startTime, count: roomTimeMap[key] });
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Toast Notification */}
      {notificationToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-indigo-900 border border-indigo-400 text-white text-xs font-semibold shadow-2xl animate-fade-in">
          <Sparkles className="h-4 w-4 text-teal-300" />
          <span>{notificationToast}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 shadow-lg shadow-indigo-500/10">
            <Building2 className="h-7 w-7 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white tracking-tight">Agenda Multidisciplinar & Salas Sensoriais</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                OTIMIZAÇÃO EM BLOCO
              </span>
            </div>
            <p className="text-sm text-slate-400 mt-1">
              Organização de salas de integração sensorial, salas DTT e agendamento de terapias casadas (ABA + T.O. + Fono) sem conflito de recursos.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start lg:self-auto">
          <div className="flex items-center bg-slate-900 rounded-xl p-1 border border-slate-800">
            <button
              onClick={() => setViewMode('rooms')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                viewMode === 'rooms'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Por Sala Sensorial
            </button>
            <button
              onClick={() => setViewMode('therapists')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                viewMode === 'therapists'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Por Profissional
            </button>
            <button
              onClick={() => setViewMode('blocks')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                viewMode === 'blocks'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Terapias em Bloco
            </button>
          </div>
        </div>
      </div>

      {/* Conflict Warning if detected */}
      {detectedConflicts.length > 0 && (
        <div className="p-4 rounded-xl bg-rose-950/70 border border-rose-500/40 text-rose-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-rose-400 shrink-0" />
            <div>
              <p className="font-bold text-xs text-rose-100">Alerta de Conflito de Sala Sensorial!</p>
              <p className="text-[11px] text-rose-300">
                Sobreposição detectada na <strong>{detectedConflicts[0].roomName}</strong> às <strong>{detectedConflicts[0].time}</strong>. O sistema impede a reserva simultânea de equipamentos de integração sensorial.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-rose-900 border border-rose-500/40 text-rose-200">
            Ação Requerida
          </span>
        </div>
      )}

      {/* Filter and Date Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
            <CalendarIcon className="h-4 w-4 text-indigo-400" />
            <span>Data:</span>
          </div>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-1.5 bg-slate-950 rounded-lg border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={() => setSelectedDate('2026-10-13')}
            className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300 underline"
          >
            Hoje
          </button>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <span className="text-xs font-semibold text-slate-400">Filtrar Sala:</span>
          <select
            value={selectedRoomFilter}
            onChange={(e) => setSelectedRoomFilter(e.target.value)}
            className="px-3 py-1.5 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">Todas as Salas ({rooms.length})</option>
            {rooms.map((r) => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* VIEW 1: By Sensory Rooms Matrix */}
      {viewMode === 'rooms' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms
            .filter((r) => selectedRoomFilter === 'all' || r.id === selectedRoomFilter)
            .map((room) => {
              const roomSessions = filteredItems.filter((it) => it.roomId === room.id);
              return (
                <div
                  key={room.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-4 shadow-sm hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                    <div>
                      <h3 className="font-bold text-sm text-white">{room.name}</h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">Capacidade: {room.capacity} paciente(s)</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      roomSessions.length > 0 
                        ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                        : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {roomSessions.length > 0 ? `${roomSessions.length} agendado(s)` : 'Livre'}
                    </span>
                  </div>

                  {/* Equipment Chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {room.equipment.map((eq, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800/80">
                        {eq}
                      </span>
                    ))}
                  </div>

                  {/* Sessions in this Room */}
                  <div className="space-y-3 pt-2">
                    {roomSessions.length === 0 ? (
                      <p className="text-xs text-slate-500 italic py-4 text-center">Nenhuma sessão agendada nesta sala para hoje.</p>
                    ) : (
                      roomSessions.map((session) => {
                        const pat = patients.find((p) => p.id === session.patientId) || activePatient;
                        const isCompleted = session.status === 'completed';
                        return (
                          <div
                            key={session.id}
                            className={`p-3.5 rounded-xl border transition-all space-y-2.5 ${
                              isCompleted
                                ? 'bg-slate-950/80 border-emerald-500/30'
                                : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-400">
                                <Clock className="h-3.5 w-3.5" />
                                <span>{session.startTime} - {session.endTime}</span>
                              </div>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                isCompleted
                                  ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                                  : 'bg-slate-800 text-slate-400'
                              }`}>
                                {isCompleted ? 'Presença Confirmada' : 'Agendado'}
                              </span>
                            </div>

                            <div>
                              <p className="text-xs font-bold text-white">{session.patientName}</p>
                              <p className="text-[11px] text-slate-400">{session.therapistName} ({session.therapistRole})</p>
                              {session.notes && (
                                <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{session.notes}</p>
                              )}
                            </div>

                            {/* Quick Action Buttons */}
                            <div className="flex items-center gap-2 pt-1 border-t border-slate-900">
                              <button
                                onClick={() => {
                                  onSelectPatient(pat);
                                  onGoToLiveDtt(pat);
                                }}
                                className="flex-1 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold transition-all flex items-center justify-center gap-1"
                                title="Abrir Coletor DTT para esta sessão"
                              >
                                <Zap className="h-3 w-3" />
                                <span>Coletor DTT</span>
                              </button>

                              <button
                                onClick={() => {
                                  onSelectPatient(pat);
                                  onGoToSoap(pat);
                                }}
                                className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold transition-all"
                                title="Evoluir Prontuário SOAP"
                              >
                                SOAP
                              </button>

                              <button
                                onClick={() => handleSendWhatsAppReminder(session)}
                                className={`p-1.5 rounded-lg border transition-all ${
                                  session.whatsappReminderSent
                                    ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                                }`}
                                title="Enviar lembrete via WhatsApp"
                              >
                                <MessageSquare className="h-3.5 w-3.5" />
                              </button>

                              <button
                                onClick={() => handleToggleCheckin(session.id)}
                                className={`p-1.5 rounded-lg border transition-all ${
                                  isCompleted
                                    ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-emerald-400'
                                }`}
                                title="Confirmar Presença do Paciente"
                              >
                                <CheckCircle className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {/* VIEW 2: By Therapists */}
      {viewMode === 'therapists' && (
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-base">Visão por Profissional da Equipe Multidisciplinar</h3>
            <div className="divide-y divide-slate-800">
              {['Lucas Mendonça (RBT)', 'Carla Dias (CREFITO 3-44120)', 'Camila Ramos (CRFa 2-19230)', 'Felipe Andrade (Psicólogo / CRP 06/15890)'].map((therapist) => {
                const sessions = filteredItems.filter((it) => it.therapistName.includes(therapist.split(' ')[0]));
                return (
                  <div key={therapist} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm text-white">{therapist}</h4>
                      <p className="text-xs text-slate-400">{sessions.length} atendimento(s) hoje</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {sessions.length === 0 ? (
                        <span className="text-xs text-slate-500 italic">Disponível para agendamento</span>
                      ) : (
                        sessions.map((s) => (
                          <div
                            key={s.id}
                            className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center gap-2"
                          >
                            <span className="font-bold text-indigo-400">{s.startTime}</span>
                            <span className="text-slate-200">{s.patientName.split(' ')[0]}</span>
                            <span className="text-[10px] text-slate-400">({s.roomName})</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: Terapias em Bloco ("Jornada do Aprendiz") */}
      {viewMode === 'blocks' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-950/40 via-slate-900 to-slate-900 border border-teal-500/30 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-teal-400" />
              <h3 className="font-bold text-white text-base">Agendamento em Bloco (Terapias Casadas)</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
              Crianças no espectro realizam de 10 a 20h semanais integrando múltiplas especialidades. O modo em bloco orquestra a sequência contínua (ex: ABA ➔ T.O. ➔ Fono) para que os pais realizem todo o tratamento no mesmo turno sem deslocamento desnecessário e sem choque de salas sensoriais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {patients.map((pat) => {
              const patSessions = filteredItems.filter((s) => s.patientId === pat.id);
              if (patSessions.length === 0) return null;
              return (
                <div key={pat.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-3">
                      <img src={pat.avatar} alt={pat.name} className="h-10 w-10 rounded-full object-cover ring-1 ring-indigo-500" />
                      <div>
                        <h4 className="font-bold text-sm text-white">{pat.name}</h4>
                        <p className="text-[11px] text-slate-400">{pat.insurancePlan}</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/10 text-teal-300 border border-teal-500/30">
                      Bloco {patSessions.length} Horas
                    </span>
                  </div>

                  {/* Flow Sequence */}
                  <div className="space-y-3 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-800">
                    {patSessions.map((session, idx) => (
                      <div key={session.id} className="relative flex items-start gap-4 pl-8">
                        <div className="absolute left-2 top-1.5 h-3 w-3 rounded-full bg-teal-400 ring-4 ring-slate-950" />
                        <div className="flex-1 p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                          <div>
                            <span className="text-xs font-bold text-indigo-400">{session.startTime} - {session.endTime}</span>
                            <p className="text-xs font-bold text-white mt-0.5">{session.therapistRole}</p>
                            <p className="text-[11px] text-slate-400">{session.therapistName} • {session.roomName}</p>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            session.status === 'completed'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-slate-800 text-slate-400'
                          }`}>
                            {session.status === 'completed' ? 'Realizada' : 'Pendente'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
