# Especificação de Design: Alinhamento Estratégico com Concorrentes & Preenchimento de Lacunas de Mercado (SaaS ABA)

- **Data**: 2026-10-13
- **Status**: Validado e Aprovado
- **Escopo**: Arquitetural (Centro de Protocolos, Agenda Multidisciplinar de Salas Sensoriais, Prontuário SOAP Transdisciplinar, Portal Família/Escola, Gestão Financeira de Repasses/Glosas RN 539 e Automação de Manutenção 10/20/30d)

---

## 1. Visão Geral e Contexto de Mercado

O mercado brasileiro de clínicas especializadas em Transtorno do Espectro Autista (TEA) e intervenção baseada em Análise do Comportamento Aplicada (ABA) é atendido por diversas soluções fragmentadas:
1. **NeoABA**: Forte em VB-MAPP, ABLLS-R, DTT e faturamento TISS XML SP/SADT.
2. **ClinicABA**: Forte em PTABA, escala de dicas configurável e revisões periódicas.
3. **TEA360**: Prontuário multidisciplinar SOAP e triagem com escala M-CHAT-R/F.
4. **Cliniconect**: Protocolos múltiplos, Plano Terapêutico Singular (PTS), agenda por profissional/sala e repasse financeiro a terapeutas.
5. **Sr. ABA (BPA)**: Protocolo Socially Savvy, acompanhamento escolar (AT) e treino parental.
6. **ComportaTudo**: IA para relatórios de evolução e gráficos automáticos.
7. **AkivaTEA**: Metas do PICI integradas a protocolos, salas sensoriais e conformidade LGPD.
8. **Blue Smiles**: Protocolo Denver (ESDM), agendamento de terapias casadas no mesmo turno e aplicativo familiar com timeline.

### As 6 Lacunas Críticas Solucionadas nesta Arquitetura:
1. **Centro Multidisciplinar Unificado de Protocolos**: VB-MAPP, ABLLS-R, Denver ESDM, M-CHAT-R/F, CARS-2 e Socially Savvy integrados, com conversão em 1 clique das lacunas em alvos do PEI.
2. **Agenda Inteligente com Matriz de Salas Sensoriais & Agendamento em Bloco**: Prevenção ativa de choque de equipamentos sensoriais e organização da jornada da criança (ex: ABA + T.O. + Fono no mesmo turno).
3. **Prontuário Multidisciplinar SOAP com Metas Transdisciplinares Compartilhadas**: Alinhamento em tempo real entre Fonoaudiologia, Terapia Ocupacional, Psicologia e ABA.
4. **Portal da Família & Mediação Escolar**: Linha do tempo interativa de conquistas, diário de generalização domiciliar e diário de bordo do AT Escolar.
5. **Central Financeira, Repasse a Terapeutas & Gestor de Glosas RN 539/2022**: Extrato automatizado de repasses por profissional e contestação em 1 clique de glosas de planos de saúde com base na RN 539 da ANS.
6. **Motor de Manutenção Programada 10/20/30 Dias**: Progressão automática para manutenção e disparo de alertas de sondas de retenção para os aplicadores.

---

## 2. Arquitetura de Componentes e Estrutura de Arquivos

```
src/
├── types/
│   └── aba.ts                                 # Interfaces de Protocolos, SOAP, Salas, Agenda, Repasses, Glosas, Família
├── components/
│   ├── layout/
│   │   └── Navbar.tsx                         # Navegação com as novas abas integradas e contadores de alertas
│   ├── protocols/
│   │   └── ProtocolsManager.tsx               # Centro de Avaliações: VB-MAPP, ABLLS, Denver, M-CHAT, CARS, Socially Savvy
│   ├── schedule/
│   │   └── ScheduleManager.tsx                # Agenda Multidisciplinar: Salas Sensoriais, Terapias em Bloco, WhatsApp
│   ├── prontuario/
│   │   └── ProntuarioSoapManager.tsx          # Prontuário Multiprofissional SOAP & Metas Transdisciplinares Compartilhadas
│   ├── family/
│   │   └── FamilySchoolPortal.tsx             # Portal da Família (Timeline/Generalização) & Diário de Bordo do AT Escolar
│   ├── financial/
│   │   └── FinancialBillingManager.tsx        # Central Financeira: Repasse a Terapeutas, Glosas RN 539 & Pacientes Particulares
│   ├── dtt/
│   │   └── LiveDttCollector.tsx               # Atualizado com alertas de Sondas de Manutenção (10/20/30d)
│   ├── programs/
│   │   └── PeiProgramManager.tsx              # Atualizado para receber metas automáticas dos protocolos
│   └── landing/
│       ├── ComparisonSection.tsx              # Atualizado com o comparativo frente aos 8 concorrentes
│       └── FeatureDeepDiveSection.tsx         # Destaque dos novos módulos enterprise
├── data/
│   └── mockAbaData.ts                         # Mocks realistas com dados de protocolos, agenda, SOAP, repasses e glosas
└── App.tsx                                    # Orquestrador reativo e gerenciador de estado dos 6 módulos
```

---

## 3. Especificação Detalhada dos Subsistemas

### 3.1. Centro de Protocolos Integrado (`ProtocolsManager`)
- **Protocolos Suportados**:
  1. **VB-MAPP**: Marcos Níveis 1, 2 e 3 (Mando, Tato, Ecoico, Intraverbal, Imitação, etc.) com matriz visual de pontuação (0, 0.5, 1) e totalizador por nível.
  2. **ABLLS-R**: 25 áreas de A a Z com grelha visual de habilidades.
  3. **Denver (ESDM)**: Checklist de 4 níveis de intervenção precoce com foco em comunicação receptiva/expressiva e jogo social.
  4. **M-CHAT-R/F**: Triagem rápida de 20 perguntas com classificação automática de risco (Baixo, Moderado, Alto) e conduta terapêutica.
  5. **CARS-2**: Escala clínica de 15 itens para pontuação de gravidade do autismo.
  6. **Socially Savvy**: Avaliação de 7 domínios de habilidades sociais e interação entre pares.
- **Integração com PEI**:
  - Função `handleGeneratePeiGoalsFromProtocol(protocolId, weakItems)`: insere imediatamente novos programas com alvos em aquisição no PEI do paciente ativo.

### 3.2. Agenda Multidisciplinar & Salas Sensoriais (`ScheduleManager`)
- **Salas Físicas Mapeadas**:
  - *Sala de Integração Sensorial* (balanços vestibulares, piscina de bolinhas, tirolesa, esteira proprioceptiva).
  - *Salas de DTT 1 e 2* (mesas de treino individualizado e reforçadores tangíveis).
  - *Sala Denver / NET* (área lúdica naturalística).
  - *Sala de Fonoaudiologia & CAA*.
  - *Sala de AVDs / Habilidades Sociais*.
- **Agendamento em Bloco**:
  - Criação de sequências contínuas de sessões (ex: 14h ABA $\rightarrow$ 15h T.O. $\rightarrow$ 16h Fonoaudiologia) para otimização do deslocamento familiar e coerência terapêutica.
- **Validação de Conflitos**:
  - Checagem automática que impede a reserva simultânea da mesma sala sensorial ou do mesmo terapeuta.
- **Ações Rápidas**:
  - Início direto da coleta DTT a partir do card da sessão, envio de lembrete WhatsApp e check-in de presença.

### 3.3. Prontuário Multidisciplinar SOAP (`ProntuarioSoapManager`)
- **Estrutura SOAP**:
  - **S (Subjetivo)**: Relato de transição de entrada, nível de alerta da criança, sono e dieta alimentar do dia.
  - **O (Objetivo)**: Quantitativo de tentativas DTT/NET, porcentagem de independência, duração e intensidade de crises.
  - **A (Avaliação)**: Raciocínio clínico sobre a eficácia das intervenções, modulação sensorial e acomodações necessárias.
  - **P (Plano)**: Modificações de estratégias para a próxima sessão e tarefas de generalização.
- **Transdisciplinaridade**:
  - Filtro por especialidade (Fono, T.O., Psico, ABA, Fisio) e painel unificado de *Metas Transdisciplinares Compartilhadas*.

### 3.4. Portal da Família & Mediação Escolar (`FamilySchoolPortal`)
- **Portal dos Pais ("BlueFamily / Comunidade")**:
  - Feed cronológico (*Timeline*) com marcos alcançados, reforçadores em alta e orientações de treino parental.
  - *Diário de Generalização Domiciliar*: registro rápido pelos pais de respostas espontâneas em casa.
- **Módulo do AT Escolar**:
  - Registro estruturado da rotina pedagógica: tempo de engajamento em sala de aula, brincadeiras com pares no recreio e registros de adaptação curricular.

### 3.5. Central Financeira, Repasse e Gestão de Glosas (`FinancialBillingManager`)
- **Repasse Automatizado**:
  - Extrato por profissional com valor por hora/sessão, quantidade de atendimentos validados e total líquido a repassar.
- **Gestor Ativo de Glosas & Recurso RN 539/2022 da ANS**:
  - Painel com guias faturadas, valores aprovados e glosas de operadoras de planos de saúde.
  - Botão de geração de minuta de *Recurso de Glosa* com fundamentação na RN 539/2022 (vedação de limitação de sessões), unindo automaticamente folha de presença assinada e gráficos de evolução.
- **Controle de Pacotes Particulares**:
  - Termômetro de consumo de horas (burn-rate) e emissão de cobrança PIX.

### 3.6. Motor de Manutenção Programada (10/20/30 Dias)
- Ao atingir $\ge 80\%$ de independência em 3 sessões consecutivas no `LiveDttCollector`, o exemplar é arquivado em maestria e entram na fila as sondas de retenção (D+10, D+20, D+30).
- Destaque visual no coletor para que o aplicador saiba exatamente quando testar o alvo em manutenção.

---

## 4. Estratégia de Teste e Validação

1. **Compilação e Verificação Estática**:
   - `npm run build` (`tsc -b && vite build`) garantindo 100% de conformidade com TypeScript sem erros de tipos.
2. **Validação de Fluxos Reativos**:
   - Criar uma meta a partir do Centro de Protocolos $\rightarrow$ verificar presença no PEI $\rightarrow$ executar tentativas no Coletor DTT $\rightarrow$ verificar atualização no Prontuário SOAP e no Repasse Financeiro.
3. **Verificação de Acessibilidade & Modo Baixo Estímulo**:
   - Testar o comportamento das novas telas sob o `lowSensoryMode` (paleta suave e sem ruídos visuais).
