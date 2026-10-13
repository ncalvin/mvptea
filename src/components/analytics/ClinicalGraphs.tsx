import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  ReferenceLine, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';
import { 
  TrendingUp, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  Zap
} from 'lucide-react';
import { Patient } from '../../types/aba';
import { 
  MOCK_ACQUISITION_GRAPH_DATA, 
  MOCK_PROMPT_FADING_DATA 
} from '../../data/mockAbaData';

interface ClinicalGraphsProps {
  patient: Patient;
}

const ABC_FUNCTION_DATA = [
  { name: 'Fuga/Esquiva', value: 45, color: '#6366F1' },
  { name: 'Acesso a Tangível', value: 30, color: '#F59E0B' },
  { name: 'Atenção Social', value: 15, color: '#06B6D4' },
  { name: 'Sensorial/Automático', value: 10, color: '#EC4899' },
];

export const ClinicalGraphs: React.FC<ClinicalGraphsProps> = ({ patient }) => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [showWii, setShowWii] = useState<boolean>(true);

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6 max-w-7xl mx-auto w-full">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Tomada de Decisão Baseada em Evidências
            </span>
            <span className="text-[10px] bg-indigo-500/10 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/20 font-mono">
              WII & Linhas de Fase
            </span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight mt-1">
            Gráficos Comportamentais & Curvas de Aquisição
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Aprendiz: <strong className="text-slate-200">{patient.name}</strong> • Supervisor: <strong className="text-slate-200">{patient.responsibleBCBA}</strong> ({patient.responsibleCouncil})
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowWii(!showWii)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl border transition-colors ${
              showWii ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500/50' : 'bg-slate-900 text-slate-400 border-slate-800'
            }`}
          >
            <Zap className="h-3.5 w-3.5" />
            <span>Índice Ponderado (WII): {showWii ? 'Ligado' : 'Desligado'}</span>
          </button>

          <div className="flex items-center bg-slate-900 rounded-xl p-1 border border-slate-800">
            {(['7d', '30d', '90d'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1 text-xs rounded-lg font-semibold transition-all ${
                  timeRange === r
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {r === '7d' ? '7 Dias' : r === '30d' ? '30 Dias' : '3 Meses'}
              </button>
            ))}
          </div>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-colors shadow-sm"
          >
            <Download className="h-3.5 w-3.5 text-indigo-400" />
            <span>Exportar</span>
          </button>
        </div>
      </div>

      {/* Main Chart 1: Curva de Desempenho com Linha de Base vs. Intervenção */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 lg:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-white">
                Curva de Aquisição & Mudança de Fase (DTT)
              </h2>
              <span className="text-[11px] font-semibold bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Alvo: Tato 5M (Gato, Leão) & Mando
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Porcentagem de respostas independentes (% IND) e curva ponderada (WII) por sessão com linha vertical de transição de fase ABA.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
              <span className="text-slate-300 font-medium">Gato (% Ind)</span>
            </div>
            {showWii && (
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-indigo-400" />
                <span className="text-slate-300 font-medium">Gato (WII Ponderado)</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-teal-400" />
              <span className="text-slate-300 font-medium">Mando Frase</span>
            </div>
          </div>
        </div>

        {/* Recharts Line Chart */}
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MOCK_ACQUISITION_GRAPH_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="session" stroke="#64748b" fontSize={11} tickMargin={8} />
              <YAxis domain={[0, 100]} stroke="#64748b" fontSize={11} unit="%" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#090d16', 
                  borderColor: '#334155', 
                  borderRadius: '0.75rem',
                  color: '#f8fafc',
                  fontSize: '12px'
                }} 
              />
              <ReferenceLine 
                y={80} 
                stroke="#10b981" 
                strokeDasharray="4 4" 
                label={{ value: 'Critério de Domínio (80%)', fill: '#10b981', fontSize: 11, position: 'insideTopRight' }} 
              />
              <ReferenceLine 
                x="Sessão 2 (22/Set)" 
                stroke="#f59e0b" 
                strokeWidth={2} 
                strokeDasharray="6 6"
                label={{ value: 'Linha de Base ➔ Intervenção', fill: '#f59e0b', fontSize: 11, position: 'top' }} 
              />
              <Line 
                type="monotone" 
                dataKey="targetGato" 
                name="Tato Gato (% Ind)" 
                stroke="#10b981" 
                strokeWidth={3} 
                dot={{ r: 5, fill: '#10b981' }} 
                activeDot={{ r: 7 }} 
              />
              {showWii && (
                <Line 
                  type="monotone" 
                  dataKey="targetGatoWII" 
                  name="Tato Gato (WII Ponderado %)" 
                  stroke="#6366f1" 
                  strokeWidth={2.5} 
                  strokeDasharray="3 3"
                  dot={{ r: 4, fill: '#6366f1' }} 
                />
              )}
              <Line 
                type="monotone" 
                dataKey="targetMando" 
                name="Mando Frase (% Ind)" 
                stroke="#14b8a6" 
                strokeWidth={2.5} 
                dot={{ r: 4, fill: '#14b8a6' }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-4 border-t border-slate-800">
          <div className="flex items-start gap-3 rounded-xl bg-slate-950/60 p-3 border border-slate-800">
            <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-white">Critério Atingido: Tato Gato</div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Alcançou 88% na Sessão 7. WII atingiu 95%. Sonda de Manutenção D+7 agendada para 10/Out.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl bg-slate-950/60 p-3 border border-slate-800">
            <TrendingUp className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-white">Curva de WII Antecipatória</div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                O WII demonstrou progresso consistente desde a Sessão 3 mesmo antes do acerto estrito atingir 80%.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl bg-slate-950/60 p-3 border border-slate-800">
            <AlertCircle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-white">Atenção Supervisor: Tato Leão</div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Desempenho em 65%. Avaliar troca de exemplar ou aumento de reforçador primário.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Prompt Fading & ABC Behavior Function */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Prompt Fading Stacked Bar Chart (Col 7) */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/90 p-5 lg:p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-black text-white">
                Desvanecimento de Ajudas (Prompt Fading)
              </h2>
              <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-mono">
                Semanas 1 a 4
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-5">
              Demonstra a substituição gradual de ajudas físicas e modelos por respostas 100% autônomas.
            </p>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MOCK_PROMPT_FADING_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} unit="%" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#090d16', 
                      borderColor: '#334155', 
                      borderRadius: '0.75rem',
                      color: '#f8fafc',
                      fontSize: '12px'
                    }} 
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="ind" name="+ Independente" stackId="a" fill="#10b981" />
                  <Bar dataKey="gestural" name="Ajuda Gestual" stackId="a" fill="#06b6d4" />
                  <Bar dataKey="verbal" name="Ajuda Verbal" stackId="a" fill="#6366f1" />
                  <Bar dataKey="model" name="Dica Modelo" stackId="a" fill="#a855f7" />
                  <Bar dataKey="physical" name="Ajuda Física" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-emerald-400 flex items-center gap-2">
            <Sparkles className="h-4 w-4 shrink-0" />
            <span>Independência passou de 20% para 82% em 4 semanas de intervenção intensiva.</span>
          </div>
        </div>

        {/* Right: ABC Functional Distribution (Col 5) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/90 p-5 lg:p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-black text-white">
                Função do Comportamento (Análise ABC)
              </h2>
              <span className="text-[10px] bg-rose-500/10 text-rose-300 px-2 py-0.5 rounded-full border border-rose-500/20 font-bold">
                12 Eventos no Mês
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-3">
              Hipóteses funcionais baseadas no registro de antecedentes e consequências.
            </p>

            <div className="h-56 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ABC_FUNCTION_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {ABC_FUNCTION_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#090d16', 
                      borderColor: '#334155', 
                      borderRadius: '0.75rem',
                      color: '#f8fafc',
                      fontSize: '12px'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2 mt-2">
            {ABC_FUNCTION_DATA.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-300 font-medium">{item.name}</span>
                </div>
                <span className="font-mono font-bold text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
