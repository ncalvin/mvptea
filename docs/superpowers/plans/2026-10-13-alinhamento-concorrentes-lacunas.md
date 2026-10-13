# Alinhamento Estratégico com 8 Concorrentes e Solução de Lacunas de Mercado — Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expandir o SaaS ABA com uma suíte clínica e operacional enterprise alinhada com as 8 principais soluções do mercado brasileiro (NeoABA, ClinicABA, TEA360, Cliniconect, Sr. ABA/BPA, ComportaTudo, AkivaTEA e Blue Smiles), incorporando as 6 grandes lacunas de mercado identificadas: Centro de 6 Protocolos Padronizados, Agenda Multidisciplinar de Salas Sensoriais & Terapias em Bloco, Prontuário Multiprofissional SOAP, Portal da Família/Escola, Central Financeira de Repasses/Glosas RN 539 e Automação de Manutenção 10/20/30 dias.

**Architecture:** Módulos de domínio desacoplados em `src/components/` (`protocols/`, `schedule/`, `prontuario/`, `family/`, `financial/`) integrados ao orquestrador central reativo em `App.tsx` e `Navbar.tsx`. Os estados fluem unidirecionalmente, permitindo que sessões concluídas no coletor DTT alimentem o Prontuário SOAP, a folha de presença da Agenda, o extrato de repasse financeiro do terapeuta e a timeline da família.

**Tech Stack:** React 19, TypeScript 6.0, Vite 8, Tailwind CSS 4, Lucide React, Recharts, Canvas Confetti.

**Spec:** [docs/superpowers/specs/2026-10-13-alinhamento-concorrentes-lacunas-design.md](file:///Users/calvin/source/SaaSABA/docs/superpowers/specs/2026-10-13-alinhamento-concorrentes-lacunas-design.md)

## Global Constraints

- Tipagem TypeScript estrita sem suppressions (`any` desnecessário ou `@ts-ignore`).
- Manter o padrão Local-First e latência de coleta sub-segundo no coletor DTT.
- Compatibilidade com o modo baixo estímulo sensorial (`lowSensoryMode`).
- Todas as novas telas devem ser totalmente responsivas (desktop, tablet e mobile).
- `npm run build` (`tsc -b && vite build`) deve passar limpo sem nenhum erro.

## Review Focus

- **Conflito de Salas Sensoriais na Agenda**: Duas marcações de salas exclusivas (ex: Sala de Integração Sensorial) no mesmo horário devem alertar colisão de recurso imediatamente.
- **Conversão de Lacunas do Protocolo para o PEI**: A geração de metas a partir de um protocolo não pode duplicar alvos idênticos já em aquisição no PEI do paciente.
- **Transição Automática de Manutenção (10/20/30d)**: Exemplares com 80% em 3 sessões consecutivas devem agendar sondas em D+10, D+20 e D+30 e não mais aparecer como alvos de ensino primário.
- **Cálculo de Repasse a Terapeutas**: O extrato financeiro deve computar apenas sessões com status 'Concluído' ou presenças confirmadas.
- **Geração de Minuta de Recurso de Glosa**: O documento gerado deve citar textualmente a RN 539/2022 da ANS e consolidar a carga horária prescrita vs. realizada.

---

### Task 1: Definições de Tipos TypeScript & Mocks de Dados

**Files:**
- Modify: `src/types/aba.ts`
- Modify: `src/data/mockAbaData.ts`

**Interfaces:**
- Produces: `AssessmentProtocol`, `ProtocolScoreItem`, `RoomScheduleItem`, `SensoryRoom`, `MultidisciplinarySoapNote`, `TherapistPayable`, `ClaimGlosa`, `FamilyMilestonePost`, `HomeGeneralizationLog`, `SchoolAtLogEntry`, `MaintenanceProbeSchedule`.

- [ ] **Step 1: Expandir `src/types/aba.ts` com as interfaces dos 6 subsistemas**
  Adicionar tipos para:
  - Protocolos (`VB-MAPP`, `ABLLS-R`, `Denver-ESDM`, `M-CHAT-R/F`, `CARS-2`, `Socially-Savvy`).
  - Agenda & Salas Sensoriais (Salas, Agendamento em Bloco, status da sessão).
  - Prontuário Multidisciplinar SOAP (Subjetivo, Objetivo, Avaliação, Plano, especialidade).
  - Portal da Família & AT Escolar (Linha do tempo, generalização em casa, inclusão escolar).
  - Financeiro (Repasse a terapeutas, glosas com fundamentação RN 539, pacotes particulares).
  - Manutenção 10/20/30 dias (status de sonda, datas programadas).

- [ ] **Step 2: Expandir `src/data/mockAbaData.ts` com dados realistas**
  Criar mocks completos para:
  - Avaliações iniciais de VB-MAPP, Denver e M-CHAT-R/F.
  - Grade de agendamento semanal com salas sensoriais mapeadas e blocos casados.
  - Notas SOAP pré-preenchidas de Fonoaudiologia, Terapia Ocupacional e ABA.
  - Linha do tempo dos pais com conquistas e registros de generalização domiciliar.
  - Diário de bordo do mediador escolar (AT).
  - Tabela de repasses a terapeutas e faturas de convênio com glosas registradas.

- [ ] **Step 3: Validar compilação dos tipos**
  Run: `npm run build`
  Expected: PASS

- [ ] **Step 4: Commit**
  ```bash
  git add src/types/aba.ts src/data/mockAbaData.ts
  git commit -m "feat(types): expand domain models and mock data for multi-domain aba suite"
  ```

---

### Task 2: Centro de Protocolos Padronizados & Integração com PEI

**Files:**
- Create: `src/components/protocols/ProtocolsManager.tsx`
- Modify: `src/components/programs/PeiProgramManager.tsx`

**Interfaces:**
- Consumes: `AssessmentProtocol`, `Patient`, `ProgramPEI` de `src/types/aba.ts`.
- Produces: `ProtocolsManager` React component com suporte a 6 protocolos e callback `onAddProgramToPei`.

- [ ] **Step 1: Criar `ProtocolsManager.tsx`**
  - Implementar seletor interativo com as 6 avaliações:
    1. **VB-MAPP**: Grid visual de marcos Níveis 1, 2 e 3 com preenchimento colorido e radar de domínios.
    2. **ABLLS-R**: Grade de áreas de A a Z com escala de pontuação de 0 a 4.
    3. **Denver (ESDM)**: Checklist de 4 níveis de intervenção precoce.
    4. **M-CHAT-R/F**: Triagem rápida com 20 perguntas, contador automático de falhas e classificação de risco (Baixo/Moderado/Alto).
    5. **CARS-2**: Escala de sintomas com pontuação de severidade.
    6. **Socially Savvy**: 7 domínios de habilidades sociais em grupo.
  - Implementar visualizador de radar/barras de proficiência por protocolo.
  - Implementar o botão *"Converter Lacunas em Metas do PEI"* que extrai itens com pontuação deficitária e dispara a criação de novos programas terapêuticos.

- [ ] **Step 2: Conectar com `PeiProgramManager.tsx`**
  - Exibir botão de acesso rápido *"Importar Alvos de Avaliação Padronizada (VB-MAPP / Denver / ABLLS)"* no topo do PEI.

- [ ] **Step 3: Validar compilação**
  Run: `npm run build`
  Expected: PASS

- [ ] **Step 4: Commit**
  ```bash
  git add src/components/protocols/ProtocolsManager.tsx src/components/programs/PeiProgramManager.tsx
  git commit -m "feat(protocols): add standardized assessment center with 6 protocols and 1-click pei bridge"
  ```

---

### Task 3: Agenda Multidisciplinar Inteligente com Gestão de Salas Sensoriais

**Files:**
- Create: `src/components/schedule/ScheduleManager.tsx`

**Interfaces:**
- Consumes: `RoomScheduleItem`, `SensoryRoom`, `Patient`, `ClinicalSession` de `src/types/aba.ts`.
- Produces: `ScheduleManager` React component com matriz Horário × Profissional e Horário × Sala Sensorial, filtro de especialidade e agendamento em bloco.

- [ ] **Step 1: Criar `ScheduleManager.tsx`**
  - Mapear as 5 salas físicas:
    - *Sala de Integração Sensorial* (recursos suspensos e proprioceptivos).
    - *Salas DTT Individual 1 e 2*.
    - *Sala Denver / NET*.
    - *Sala de Fonoaudiologia & Comunicação Aumentativa*.
    - *Sala de Treino de AVDs e Habilidades Sociais*.
  - Visualização em Matriz:
    - Alternador de visão: **Por Profissional** vs. **Por Sala Sensorial** vs. **Visão Geral do Dia**.
  - Recurso de **Agendamento em Bloco ("Terapias Casadas")**:
    - Suporte a marcação combinada (ex: ABA + T.O. Sensorial + Fono no mesmo turno).
  - Detecção Ativa de Choque de Horários e Salas:
    - Alerta visual caso haja sobreposição de equipamento sensorial.
  - Ações no card da sessão:
    - Botão *"Iniciar DTT"* (leva diretamente para o coletor da sessão).
    - Botão *"Evolução SOAP"* (abre prontuário da especialidade).
    - Botão *"Lembrete WhatsApp"* e confirmação de presença.

- [ ] **Step 2: Validar compilação**
  Run: `npm run build`
  Expected: PASS

- [ ] **Step 3: Commit**
  ```bash
  git add src/components/schedule/ScheduleManager.tsx
  git commit -m "feat(schedule): add multidisciplinary schedule with sensory room matrix and block booking"
  ```

---

### Task 4: Prontuário Multidisciplinar SOAP & Metas Transdisciplinares

**Files:**
- Create: `src/components/prontuario/ProntuarioSoapManager.tsx`

**Interfaces:**
- Consumes: `MultidisciplinarySoapNote`, `Patient`, `ProgramPEI` de `src/types/aba.ts`.
- Produces: `ProntuarioSoapManager` React component com filtragem por especialidade, formulário estruturado SOAP e metas transdisciplinares compartilhadas.

- [ ] **Step 1: Criar `ProntuarioSoapManager.tsx`**
  - Estrutura de registro clínico SOAP:
    - **S (Subjetivo)**: Estado emocional de chegada, relato da família, sono/alimentação.
    - **O (Objetivo)**: Tentativas executadas, % de independência, duração de comportamentos desafiadores.
    - **A (Avaliação)**: Raciocínio clínico do especialista, modulação sensorial e acomodações.
    - **P (Plano)**: Orientações para a próxima sessão e generalização para cuidadores.
  - Filtro por especialidade da equipe: Fonoaudiologia, Terapia Ocupacional, Psicologia, Fisioterapia e ABA.
  - Painel de **Metas Transdisciplinares Compartilhadas**:
    - Seção visual demonstrando como a Fono, a T.O. e a ABA trabalham os mesmos objetivos (ex: PECS/CAA em todas as terapias).
  - Botão de exportação e emissão de laudo de evolução assinado (padrão ICP-Brasil / PAdES).

- [ ] **Step 2: Validar compilação**
  Run: `npm run build`
  Expected: PASS

- [ ] **Step 3: Commit**
  ```bash
  git add src/components/prontuario/ProntuarioSoapManager.tsx
  git commit -m "feat(prontuario): add multidisciplinary soap notes and transdisciplinary shared goals"
  ```

---

### Task 5: Portal da Família/Comunidade & Diário do AT Escolar

**Files:**
- Create: `src/components/family/FamilySchoolPortal.tsx`

**Interfaces:**
- Consumes: `FamilyMilestonePost`, `HomeGeneralizationLog`, `SchoolAtLogEntry`, `Patient` de `src/types/aba.ts`.
- Produces: `FamilySchoolPortal` React component com aba Família e aba Escola.

- [ ] **Step 1: Criar `FamilySchoolPortal.tsx`**
  - **Módulo Família ("BlueFamily / Comunidade")**:
    - Timeline interativa de conquistas desbloqueadas pela criança.
    - Formulário rápido de *Diário de Generalização Domiciliar* para os pais registrarem comportamentos aprendidos executados em casa com o reforçador aplicado.
    - Dicas práticas e orientações de Treino Parental elaboradas pelo supervisor BCBA.
  - **Módulo Acompanhante Terapêutico (AT) Escolar**:
    - Registro de mediação pedagógica (tempo de permanência na carteira, adaptação de provas).
    - Registro de socialização no recreio (brincadeiras espontâneas com pares).
    - Mapeamento de sobrecargas sensoriais no ambiente escolar (sirene, refeitório).

- [ ] **Step 2: Validar compilação**
  Run: `npm run build`
  Expected: PASS

- [ ] **Step 3: Commit**
  ```bash
  git add src/components/family/FamilySchoolPortal.tsx
  git commit -m "feat(family-school): add family achievements timeline and school at inclusion journal"
  ```

---

### Task 6: Central Financeira, Repasse a Terapeutas & Gestor de Glosas RN 539

**Files:**
- Create: `src/components/financial/FinancialBillingManager.tsx`

**Interfaces:**
- Consumes: `TherapistPayable`, `ClaimGlosa`, `Patient` de `src/types/aba.ts`.
- Produces: `FinancialBillingManager` React component com extrato de repasses, gestão de glosas e controle de pacotes.

- [ ] **Step 1: Criar `FinancialBillingManager.tsx`**
  - **Painel Automatizado de Repasse a Terapeutas**:
    - Tabela de horas e sessões realizadas por terapeuta (RBT, Fono, TO, Psicólogo).
    - Cálculo de honorários por hora/sessão e geração de extrato de pagamento.
  - **Gestor Ativo de Glosas & Recurso RN 539/2022 da ANS**:
    - Tabela de faturas de planos de saúde (Unimed, Bradesco, Amil, SulAmérica).
    - Identificação dos motivos de glosa e botão *"Gerar Minuta de Recurso de Glosa (RN 539)"*, que monta o dossiê pericial citando a jurisprudência que proíbe limitação de sessões.
  - **Controle de Pacotes Particulares**:
    - Monitor de consumo de horas (burn-rate), saldo restante no mês e botão de emissão de cobrança PIX.

- [ ] **Step 2: Validar compilação**
  Run: `npm run build`
  Expected: PASS

- [ ] **Step 3: Commit**
  ```bash
  git add src/components/financial/FinancialBillingManager.tsx
  git commit -m "feat(financial): add therapist payment reconciliation and rn 539 claim glosa management"
  ```

---

### Task 7: Motor Automático de Manutenção em 10/20/30 Dias

**Files:**
- Modify: `src/components/dtt/LiveDttCollector.tsx`
- Modify: `src/components/programs/PeiProgramManager.tsx`

**Interfaces:**
- Consumes: `MaintenanceProbeSchedule`, `TargetExemplar` de `src/types/aba.ts`.
- Produces: Alertas visuais de sondas de retenção (D+10, D+20, D+30) no coletor DTT e promoção automática de alvos no PEI.

- [ ] **Step 1: Implementar lógica de promoção e agenda de sondas no `LiveDttCollector.tsx`**
  - Quando um exemplar atinge $\ge 80\%$ de acerto independente em 3 sessões consecutivas:
    - O alvo é promovido para `mastered`.
    - São agendadas automaticamente 3 sondas de manutenção: D+10, D+20 e D+30.
  - Adicionar card de alerta no topo do coletor quando houver sonda agendada para a data corrente:
    *"🎯 Alvo em Manutenção (Sonda D+10): Testar retenção sem dica!"*.

- [ ] **Step 2: Exibir status de manutenção no `PeiProgramManager.tsx`**
  - Tag visual *"Em Manutenção (Sonda 10/20/30d)"* nos alvos dominados com indicador de próxima revisão.

- [ ] **Step 3: Validar compilação**
  Run: `npm run build`
  Expected: PASS

- [ ] **Step 4: Commit**
  ```bash
  git add src/components/dtt/LiveDttCollector.tsx src/components/programs/PeiProgramManager.tsx
  git commit -m "feat(maintenance): implement automatic 10/20/30 day retention probe engine"
  ```

---

### Task 8: Orquestração Central, Navegação e Atualização da Landing Page

**Files:**
- Modify: `src/components/layout/Navbar.tsx`
- Modify: `src/App.tsx`
- Modify: `src/components/landing/ComparisonSection.tsx`
- Modify: `src/components/landing/FeatureDeepDiveSection.tsx`

**Interfaces:**
- Consumes: Todos os componentes criados nas Tasks 1 a 7.
- Produces: Aplicação completa com abas funcionais no menu superior e landing page com tabela comparativa destacando a superioridade frente às 8 soluções.

- [ ] **Step 1: Atualizar `Navbar.tsx`**
  - Adicionar as novas abas de navegação:
    - `protocols`: "Centro de Protocolos (VB-MAPP/Denver)"
    - `schedule`: "Agenda & Salas Sensoriais"
    - `soap`: "Prontuário SOAP Multiprofissional"
    - `family`: "Portal Família & AT Escolar"
    - `financial`: "Financeiro & Glosas RN 539"
  - Organizar menu com visual limpo e badges informativos.

- [ ] **Step 2: Integrar os novos módulos no `App.tsx`**
  - Conectar os estados reativos entre `LiveDttCollector`, `ScheduleManager`, `ProntuarioSoapManager`, `FinancialBillingManager`, `FamilySchoolPortal` e `ProtocolsManager`.
  - Garantir persistência e transição de abas suave.

- [ ] **Step 3: Atualizar a Landing Page comercial**
  - Em `ComparisonSection.tsx`, incluir o quadro comparativo com as 8 soluções (NeoABA, ClinicABA, TEA360, Cliniconect, Sr. ABA, ComportaTudo, AkivaTEA e Blue Smiles), evidenciando os diferenciais exclusivos do SaaS ABA nas 6 lacunas.
  - Em `FeatureDeepDiveSection.tsx`, adicionar os cards interativos dos novos recursos.

- [ ] **Step 4: Validar compilação global**
  Run: `npm run build`
  Expected: PASS

- [ ] **Step 5: Commit**
  ```bash
  git add src/components/layout/Navbar.tsx src/App.tsx src/components/landing/ComparisonSection.tsx src/components/landing/FeatureDeepDiveSection.tsx
  git commit -m "feat(orchestration): integrate all multi-domain tabs and update competitive landing showcase"
  ```

---

### Task 9: Verificação Rigorosa e Teste Integrado de Ponta a Ponta

**Files:**
- Test: Verificação de build de produção e integridade de todos os fluxos.

- [ ] **Step 1: Executar `npm run build`**
  Verificar se a compilação do TypeScript e empacotamento do Vite ocorrem sem advertências ou erros.

- [ ] **Step 2: Validar com linter**
  Run: `npm run lint`
  Expected: PASS

- [ ] **Step 3: Testar os 6 fluxos integrados**
  - Testar abertura e cálculo de pontuação no VB-MAPP e M-CHAT.
  - Testar conversão de lacuna do protocolo em meta do PEI.
  - Testar visualização por Salas Sensoriais e Agendamento em Bloco na Agenda.
  - Testar inserção de nota SOAP transdisciplinar.
  - Testar registro de generalização domiciliar e diário de bordo do AT escolar.
  - Testar extrato de repasse a terapeutas e geração de minuta de recurso de glosa RN 539.
  - Testar alternância para o modo baixo estímulo (`lowSensoryMode`).

- [ ] **Step 4: Commit final**
  ```bash
  git commit --allow-empty -m "chore(release): complete enterprise alignment with top 8 aba market solutions"
  ```
