import React from 'react';
import { 
  Globe, Layout, ChevronRight, MessageSquare, 
  BarChart3, Search, ExternalLink, Mail, Star
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

// Forzamos que la página no use caché para ver cambios al instante y optimizar SEO
export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function Portfolio() {
  // 1. Traer datos de Perfil
  const { data: perfil } = await supabase
    .from('perfil')
    .select('*')
    .eq('id', 1)
    .single();

  // 2. Traer Proyectos
  const { data: proyectos } = await supabase
    .from('proyectos')
    .select('*')
    .order('created_at', { ascending: false });

  // 3. Traer Testimonios
  const { data: testimonios } = await supabase
    .from('testimonios')
    .select('*')
    .order('created_at', { ascending: false });

  // Variables dinámicas
  const whatsappNumber = perfil?.whatsapp || '51923481905';
  const contactEmail = perfil?.email_contacto || 'forever03045@gmail.com';
  const heroText = perfil?.frase_hero || 'Software que resuelve problemas.';
  const waLink = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}`;

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen scroll-smooth selection:bg-blue-100 selection:text-blue-700">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="text-xl font-black tracking-tighter bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
            ROBERTO<span className="text-slate-900">.SOLUTIONS</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-semibold text-slate-600">
            <a href="#soluciones" className="hover:text-blue-600 transition">Servicios</a>
            <a href="#proceso" className="hover:text-blue-600 transition">Metodología</a>
            <a href="#portafolio" className="hover:text-blue-600 transition">Portafolio</a>
          </div>
          <a href={waLink} target="_blank" className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:scale-105 transition-all">
            Cotizar Proyecto
          </a>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative pt-40 pb-20 px-6 overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
            <div className="absolute top-[-10%] left-[20%] w-[400px] h-[400px] bg-blue-100/50 rounded-full blur-[120px]" />
            <div className="absolute bottom-[10%] right-[20%] w-[300px] h-[300px] bg-indigo-100/50 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-5xl mx-auto text-center">
          {/* BADGE MEJORADO: Se corrigió el diseño que se veía mal */}
          <div className="inline-flex items-center gap-3 px-4 py-2 mb-8 bg-white border border-slate-200 rounded-full shadow-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-slate-600 text-xs font-bold uppercase tracking-[0.1em]">
              Disponible para proyectos en <span className="text-blue-600">Perú</span>
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tight leading-[0.9] mb-8 whitespace-pre-line italic">
            {heroText}
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Desarrollador de Software en Lima. Especialista en digitalizar empresas con sistemas a medida y optimización de procesos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#portafolio" className="w-full sm:w-auto bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:bg-slate-800 transition-all flex items-center justify-center group">
              Ver Proyectos <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href={waLink} target="_blank" className="w-full sm:w-auto bg-white text-slate-900 border border-slate-200 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center">
              Contacto Directo
            </a>
          </div>
        </div>
      </header>

      {/* --- PROCESO --- */}
      <section id="proceso" className="py-24 px-6 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto">
           <div className="text-left mb-16 max-w-xl">
              <h2 className="text-sm font-bold text-blue-600 uppercase mb-2 tracking-[0.2em]">Metodología</h2>
              <p className="text-4xl font-bold text-slate-900 tracking-tighter italic">¿Cómo transformo tu negocio?</p>
           </div>
           <div className="grid md:grid-cols-4 gap-8">
              <Step number="01" title="Análisis" desc="Entiendo tus procesos y detecto fallas administrativas." />
              <Step number="02" title="Diseño UI" desc="Interfaz visual intuitiva y de alto impacto." />
              <Step number="03" title="Desarrollo" desc="Código profesional escalable y seguro." />
              <Step number="04" title="Soporte" desc="Puesta en marcha y acompañamiento constante." />
           </div>
        </div>
      </section>

      {/* --- PORTAFOLIO --- */}
      <section id="portafolio" className="py-24 px-6 bg-slate-50 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-xl mb-16">
            <h2 className="text-sm font-bold text-blue-600 uppercase mb-2 tracking-[0.2em]">Casos de Éxito</h2>
            <p className="text-4xl font-bold text-slate-900 italic tracking-tighter">Sistemas implementados en Perú.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {proyectos?.map((pro) => (
              <div key={pro.id} className="group bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-xl hover:shadow-2xl transition-all">
                <div className="aspect-video bg-slate-200 relative overflow-hidden">
                  {pro.imagen_url ? (
                    <img 
                      src={pro.imagen_url} 
                      alt={`Sistema desarrollado por Roberto: ${pro.titulo}`} 
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-600">
                      <Layout className="text-white/20 w-20 h-20" />
                    </div>
                  )}
                </div>
                <div className="p-10">
                  <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">{pro.titulo}</h3>
                  <p className="text-slate-500 text-lg leading-relaxed mb-8">{pro.descripcion}</p>
                  <a href={pro.link_live} target="_blank" className="inline-flex items-center text-blue-600 font-black text-sm hover:underline">
                    VER PROYECTO EN VIVO <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIOS --- */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-blue-600 uppercase mb-2 tracking-[0.2em]">Confianza</h2>
            <p className="text-4xl font-bold text-slate-900 tracking-tighter italic">Clientes satisfechos</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonios?.map((t) => (
              <div key={t.id} className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col justify-between hover:shadow-lg transition-shadow">
                <div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(t.estrellas)].map((_, i) => (
                      <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-lg italic leading-relaxed mb-8">"{t.comentario}"</p>
                </div>
                <div>
                  <p className="font-black text-slate-900">{t.nombre}</p>
                  <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">{t.cargo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SOLUCIONES / SERVICIOS --- */}
      <section id="soluciones" className="py-24 px-6 bg-slate-50 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-xl hover:border-blue-500 transition-all group">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8">
                <BarChart3 className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-3xl font-bold mb-4 tracking-tight">Software de Gestión</h3>
              <p className="text-slate-500 text-lg leading-relaxed">Centralizamos tus inventarios y finanzas en dashboards inteligentes diseñados para el mercado peruano.</p>
            </div>
            <div className="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-xl hover:border-blue-500 transition-all group">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-8">
                <Globe className="w-8 h-8 text-indigo-600 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-3xl font-bold mb-4 tracking-tight">E-commerce y Web Pro</h3>
              <p className="text-slate-500 text-lg leading-relaxed">Páginas web optimizadas para SEO en Lima, asegurando que tus clientes te encuentren primero.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-white border-t border-slate-200 pt-24 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl">
            <div className="text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter leading-none">
                ¿Listo para <br /> escalar tu empresa?
              </h2>
              <p className="text-slate-400 text-lg">Hablemos sobre tu próximo sistema digital.</p>
            </div>
            <div className="flex flex-col gap-4 w-full md:w-auto">
              <a href={waLink} target="_blank" className="bg-green-500 hover:bg-green-400 text-white px-10 py-5 rounded-2xl font-black text-xl flex items-center justify-center transition-all hover:scale-105">
                <MessageSquare className="mr-3 fill-white text-white" /> WHATSAPP
              </a>
              <a href={`mailto:${contactEmail}`} className="flex items-center justify-center text-slate-400 hover:text-white transition text-sm">
                <Mail className="w-4 h-4 mr-2" /> {contactEmail}
              </a>
            </div>
          </div>
          <div className="mt-20 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-slate-100 pt-10 text-center">
            <div className="text-xl font-black tracking-tighter text-blue-600 uppercase italic">ROBERTO.SOLUTIONS</div>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">© 2025 - Lima, Perú.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Step({ number, title, desc }: { number: string, title: string, desc: string }) {
  return (
    <div className="relative p-8 bg-slate-50 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-lg transition-all group">
      <span className="text-6xl font-black text-slate-200/40 absolute top-4 right-6 leading-none select-none group-hover:text-blue-100/50 transition-colors">{number}</span>
      <h4 className="text-2xl font-bold text-slate-900 mb-3 relative z-10 tracking-tight">{title}</h4>
      <p className="text-slate-500 text-sm leading-relaxed relative z-10">{desc}</p>
    </div>
  );
}
