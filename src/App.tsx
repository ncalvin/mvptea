import React, { useState, useEffect } from 'react';
import { Navbar, MainAppTab } from './components/layout/Navbar';
import { ClinicOverviewDashboard } from './components/dashboard/ClinicOverviewDashboard';
import { LiveDttCollector } from './components/dtt/LiveDttCollector';
import { ClinicalGraphs } from './components/analytics/ClinicalGraphs';
import { PeiProgramManager } from './components/programs/PeiProgramManager';
import { AbcLogManager } from './components/abc/AbcLogManager';
import { AbcModal } from './components/abc/AbcModal';
import { AiCopilotModal } from './components/ai/AiCopilotModal';
import { AntiGlosaReportGenerator } from './components/reports/AntiGlosaReportGenerator';
import { ProtocolsManager } from './components/protocols/ProtocolsManager';
import { ScheduleManager } from './components/schedule/ScheduleManager';
import { ProntuarioSoapManager } from './components/prontuario/ProntuarioSoapManager';
import { FamilySchoolPortal } from './components/family/FamilySchoolPortal';
import { FinancialBillingManager } from './components/financial/FinancialBillingManager';
import { LandingPage } from './components/landing/LandingPage';
import { Patient, ProgramPEI, DTTTrial, ABCEvent } from './types/aba';
import { MOCK_PATIENTS, MOCK_ABC_EVENTS } from './data/mockAbaData';

export function App() {
  const [viewMode, setViewMode] = useState<'landing' | 'app'>('landing');
  const [patients, setPatients] = useState<Patient[]>(MOCK_PATIENTS);
  const [activePatient, setActivePatient] = useState<Patient>(MOCK_PATIENTS[0]);
  const [currentTab, setCurrentTab] = useState<MainAppTab>('dashboard');
  const [userRole, setUserRole] = useState<'BCBA' | 'RBT' | 'Gestor'>('BCBA');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [lowSensoryMode, setLowSensoryMode] = useState<boolean>(false);

  // Live Session State
  const [isSessionActive, setIsSessionActive] = useState<boolean>(false);
  const [sessionTimeSeconds, setSessionTimeSeconds] = useState<number>(0);
  const [recentTrials, setRecentTrials] = useState<DTTTrial[]>([]);
  const [abcEvents, setAbcEvents] = useState<ABCEvent[]>(MOCK_ABC_EVENTS);
  const [isAbcModalOpen, setIsAbcModalOpen] = useState<boolean>(false);
  const [isAiCopilotOpen, setIsAiCopilotOpen] = useState<boolean>(false);

  // Active Session Timer
  useEffect(() => {
    let interval: any = null;
    if (isSessionActive) {
      interval = setInterval(() => {
        setSessionTimeSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSessionActive]);

  // Keep activePatient reference synced with patients list
  const currentPatient = patients.find((p) => p.id === activePatient.id) || patients[0];

  const handleToggleSession = () => {
    setIsSessionActive(!isSessionActive);
  };

  const handleRecordTrial = (newTrial: DTTTrial) => {
    setRecentTrials((prev) => [...prev, newTrial]);

    // Auto-start session timer on first trial if not running
    if (!isSessionActive) {
      setIsSessionActive(true);
    }

    // Update patient exemplar stats in state
    setPatients((prevPatients) =>
      prevPatients.map((p) => {
        if (p.id !== currentPatient.id) return p;

        const updatedPrograms = p.programs.map((prog) => {
          if (prog.id !== newTrial.programId) return prog;

          const updatedExemplars = prog.exemplars.map((ex) => {
            if (ex.id !== newTrial.exemplarId) return ex;

            const newTrialsCount = ex.trialsCount + 1;
            const newSuccessRate = Math.round(
              ((ex.successRate * ex.trialsCount) + (newTrial.isIndependent ? 100 : 0)) / newTrialsCount
            );

            return {
              ...ex,
              trialsCount: newTrialsCount,
              successRate: newSuccessRate,
              lastTrainedDate: new Date().toISOString().split('T')[0],
            };
          });

          return {
            ...prog,
            exemplars: updatedExemplars,
          };
        });

        return {
          ...p,
          programs: updatedPrograms,
        };
      })
    );
  };

  const handleUndoTrial = (trialId: string) => {
    setRecentTrials((prev) => prev.filter((t) => t.id !== trialId));
  };

  const handleSaveAbcEvent = (newEvent: ABCEvent) => {
    setAbcEvents((prev) => [newEvent, ...prev]);
  };

  const handleAddProgram = (newProgram: ProgramPEI) => {
    setPatients((prevPatients) =>
      prevPatients.map((p) => {
        if (p.id !== currentPatient.id) return p;
        return {
          ...p,
          programs: [newProgram, ...p.programs],
          acquisitionTargetsCount: p.acquisitionTargetsCount + 1,
        };
      })
    );
  };

  if (viewMode === 'landing') {
    return (
      <LandingPage
        onOpenLiveApp={() => setViewMode('app')}
      />
    );
  }

  return (
    <div className={`min-h-screen flex flex-col ${lowSensoryMode ? 'bg-slate-900 text-slate-200' : 'bg-slate-950 text-slate-100'}`}>
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        patients={patients}
        activePatient={currentPatient}
        setActivePatient={setActivePatient}
        userRole={userRole}
        setUserRole={setUserRole}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        lowSensoryMode={lowSensoryMode}
        setLowSensoryMode={setLowSensoryMode}
        sessionTimeSeconds={sessionTimeSeconds}
        isSessionActive={isSessionActive}
        onToggleSession={handleToggleSession}
        onGoToLanding={() => setViewMode('landing')}
        onOpenAiCopilot={() => setIsAiCopilotOpen(true)}
      />

      {/* Main Tab Content */}
      <main className="flex-1 pb-16">
        {currentTab === 'dashboard' && (
          <ClinicOverviewDashboard
            patients={patients}
            onSelectPatient={(pat) => {
              setActivePatient(pat);
              setCurrentTab('pei');
            }}
            onGoToLiveDtt={(pat) => {
              setActivePatient(pat);
              setCurrentTab('live-dtt');
              if (!isSessionActive) setIsSessionActive(true);
            }}
            onGoToReports={() => setCurrentTab('reports')}
          />
        )}

        {currentTab === 'live-dtt' && (
          <LiveDttCollector
            patient={currentPatient}
            onRecordTrial={handleRecordTrial}
            onOpenAbcModal={() => setIsAbcModalOpen(true)}
            recentTrials={recentTrials}
            onUndoTrial={handleUndoTrial}
            isSessionActive={isSessionActive}
            onToggleSession={handleToggleSession}
          />
        )}

        {currentTab === 'protocols' && (
          <ProtocolsManager
            patient={currentPatient}
            onAddProgramToPei={handleAddProgram}
            lowSensoryMode={lowSensoryMode}
          />
        )}

        {currentTab === 'schedule' && (
          <ScheduleManager
            patients={patients}
            activePatient={currentPatient}
            onSelectPatient={setActivePatient}
            onGoToLiveDtt={(pat) => {
              setActivePatient(pat);
              setCurrentTab('live-dtt');
              if (!isSessionActive) setIsSessionActive(true);
            }}
            onGoToSoap={(pat) => {
              setActivePatient(pat);
              setCurrentTab('soap');
            }}
            lowSensoryMode={lowSensoryMode}
          />
        )}

        {currentTab === 'soap' && (
          <ProntuarioSoapManager
            patient={currentPatient}
            lowSensoryMode={lowSensoryMode}
          />
        )}

        {currentTab === 'family' && (
          <FamilySchoolPortal
            patient={currentPatient}
            lowSensoryMode={lowSensoryMode}
          />
        )}

        {currentTab === 'financial' && (
          <FinancialBillingManager
            patient={currentPatient}
            lowSensoryMode={lowSensoryMode}
          />
        )}

        {currentTab === 'graphs' && (
          <ClinicalGraphs patient={currentPatient} />
        )}

        {currentTab === 'pei' && (
          <PeiProgramManager
            patient={currentPatient}
            onAddProgram={handleAddProgram}
            onGoToProtocols={() => setCurrentTab('protocols')}
          />
        )}

        {currentTab === 'abc' && (
          <AbcLogManager
            patient={currentPatient}
            abcEvents={abcEvents.filter((e) => e.patientId === currentPatient.id)}
            onOpenNewAbcModal={() => setIsAbcModalOpen(true)}
          />
        )}

        {currentTab === 'reports' && (
          <AntiGlosaReportGenerator patient={currentPatient} />
        )}
      </main>

      {/* Global Quick ABC Event Modal */}
      <AbcModal
        isOpen={isAbcModalOpen}
        onClose={() => setIsAbcModalOpen(false)}
        patientId={currentPatient.id}
        onSaveAbcEvent={handleSaveAbcEvent}
      />

      {/* In-App AI Clinical Copilot Modal */}
      <AiCopilotModal
        isOpen={isAiCopilotOpen}
        onClose={() => setIsAiCopilotOpen(false)}
        patient={currentPatient}
      />
    </div>
  );
}

export default App;
