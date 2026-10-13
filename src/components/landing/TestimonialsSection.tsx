import React from 'react';
import { 
  Star, 
  Quote, 
  ShieldCheck, 
  CheckCircle2, 
  Building2, 
  Sparkles 
} from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const TESTIMONIALS = [
    {
      name: 'Dra. Vanessa Albuquerque',
      role: 'Responsável Técnica & BCBA',
      clinic: 'Instituto Desenvolve TEA • São Paulo, SP',
      avatar: 'https://images.unsplash.com/photo-1594824813589-3837943ff27b?w=150&auto=format&fit=crop&q=80',
      stats: '45 Aprendizes • Economia de 32h/mês',
      content: '“A geração de laudos em 1 clique com os gráficos de WII e curvas cumulativas transformou nossa rotina. Antes nossos supervisores passavam sábados inteiros no Excel. Agora, com poucos cliques, temos o documento completo pronto para a família e para o convênio.”',
    },
    {
      name: 'Rodrigo M. Furtado',
      role: 'Diretor Administrativo & Faturamento',
      clinic: 'Clínica NeuroSaber • Belo Horizonte, MG',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      stats: '72 Aprendizes • 0% Glosas TISS',
      content: '“O Linter TISS e a assinatura digital no tablet zeraram 100% das nossas glosas de assiduidade com a Unimed e Bradesco. O investimento no SaaS ABA se pagou na primeira quinzena de implantação. É uma blindagem financeira indispensável.”',
    },
    {
      name: 'Dra. Camila Nogueira',
      role: 'Coordenadora Clínica & Fonoaudióloga (CRFa)',
      clinic: 'Espaço Conectar Neurodesenvolvimento • Curitiba, PR',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      stats: '30 Aprendizes • 100% Adesão nos Tablets',
      content: '“O maior medo de todo gestor é a equipe de aplicadores rejeitar o software e voltar para o papel. A regra do registro em menos de 1 segundo e o Quick Briefing foram decisivos. Nossos RBTs e ATs amam coletar no SaaS ABA!”',
    },
    {
      name: 'Dr. Lucas V. Antunes',
      role: 'Psicólogo Clínico (CRP) & Supervisor ABA',
      clinic: 'Clínica ABA & Vida • Rio de Janeiro, RJ',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      stats: 'Dossiês Periciais RN 539 Aprovados',
      content: '“Nas ações judiciais de cumprimento de liminar, os peritos elogiam a clareza dos nossos relatórios gerados no sistema. A fundamentação na RN 539/2022 e o histórico de tentativas provam a necessidade da carga horária sem cortes.”',
    },
  ];

  return (
    <section id="depoimentos" className="py-20 lg:py-28 relative bg-slate-950 border-b border-slate-900 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 border border-slate-800 px-3.5 py-1 text-xs font-semibold text-slate-300 mb-3">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>Casos de Sucesso Comprovados</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Quem Usa, Recomenda e Não Troca
          </h2>
          <p className="mt-3 text-base text-slate-400">
            Conheça as histórias reais de diretores, BCBAs e coordenadores que elevaram a governança clínica e financeira de suas clínicas.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {TESTIMONIALS.map((test, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6 hover:border-slate-700 transition-all hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Rating & Stats Strip */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-md bg-indigo-950 text-indigo-300 text-[11px] font-bold border border-indigo-800/40">
                    {test.stats}
                  </span>
                </div>

                {/* Content */}
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed italic">
                  {test.content}
                </p>
              </div>

              {/* Author Strip */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-slate-800/80">
                <img
                  src={test.avatar}
                  alt={test.name}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-indigo-500/30"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-white">{test.name}</h3>
                    <CheckCircle2 className="h-3.5 w-3.5 text-teal-400" />
                  </div>
                  <p className="text-xs text-indigo-300 font-medium">{test.role}</p>
                  <p className="text-[11px] text-slate-400">{test.clinic}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges Strip */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 max-w-4xl mx-auto flex flex-wrap items-center justify-around gap-6 text-center text-xs text-slate-400 font-medium">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            Em conformidade com a LGPD
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-teal-400" />
            Padrão TISS v04.01.00 ANS
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            Certificação ICP-Brasil & GOV.BR
          </span>
        </div>

      </div>
    </section>
  );
};
