import React from 'react';
import { 
  Terminal, Globe, Layout, ChevronRight, MessageSquare, 
  ShieldCheck, Zap, BarChart3, Search, ExternalLink, Mail
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

// Esto asegura que la página siempre traiga datos frescos de la base de datos
export const revalidate = 0;

export const dynamic = 'force-dynamic';

export default async function Portfolio() {
  // 1. Obtener datos de perfil desde Supabase
  const { data: perfil } = await supabase
    .from('perfil')
    .select('*')
    .eq('id', 1)
    .single();

  // 2. Obtener lista de proyectos (opcional para el siguiente paso)
  const { data: proyectos } = await supabase
    .from('proyectos')
    .select('*')
    .order('created_at', { ascending: false });

  // Variables dinámicas con valores por defecto por si la DB está vacía
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
            <div className="absolute top-[-10%] left-[20%] w-[400px] h-[400px] bg-blue-100/50 rounded-full blur-[120px]" />
            <div className="absolute bottom-[10%] right-[20%] w-[300px] h-[300px] bg-indigo-100/50 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 mb-6 bg-blue-50 border border-blue-100 rounded-full">
            <span className="text-blue-700 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              Disponible para nuevos proyectos
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tight leading-[0.9] mb-8 whitespace-pre-line">
            {heroText}
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
            Especialista en digitalizar empresas con sistemas a medida, optimizando tiempos y eliminando el desorden administrativo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#portafolio" className="w-full sm:w-auto bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:bg-slate-800 transition-all flex items-center justify-center group">
              Explorar Portafolio <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </header>

      {/* --- SECCIÓN PROCESO --- */}
      <section id="proceso" className="py-24 px-6 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto">
           <div className="text-left mb-16 max-w-xl">
              <h2 className="text-sm font-bold text-blue-600 uppercase mb-2">Metodología</h2>
              <p className="text-4xl font-bold text-slate-900 tracking-tighter">¿Cómo transformo tu negocio?</p>
           </div>
           <div className="grid md:grid-cols-4 gap-8">
              <Step number="01" title="Análisis" desc="Entiendo tu negocio y detecto dónde perdemos tiempo." />
              <Step number="02" title="Diseño UI" desc="Creamos la interfaz visual para tu aprobación." />
              <Step number="03" title="Desarrollo" desc="Construcción con Next.js y código limpio." />
              <Step number="04" title="Lanzamiento" desc="Puesta en marcha y soporte continuo." />
           </div>
        </div>
      </section>

      {/* --- PORTAFOLIO --- */}
      <section id="portafolio" className="py-24 px-6 bg-slate-50 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-xl mb-16">
            <h2 className="text-sm font-bold text-blue-600 uppercase mb-2">Casos de Éxito</h2>
            <p className="text-4xl font-bold text-slate-900 italic tracking-tighter">Proyectos con impacto real.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Si no hay proyectos en la DB, mostramos el estático por defecto */}
            {(!proyectos || proyectos.length === 0) ? (
              <div className="group bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
                <div className="aspect-video bg-blue-600 flex items-center justify-center overflow-hidden">
                  <Layout className="w-20 h-20 text-blue-200 opacity-40 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-10">
                  <div className="flex gap-3 mb-6">
                    <span className="bg-blue-50 text-blue-700 text-[10px] font-black px-3 py-1 rounded-full uppercase">Next.js 14</span>
                    <span className="bg-slate-50 text-slate-700 text-[10px] font-black px-3 py-1 rounded-full uppercase">Logística</span>
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Industrial Inventory Dashboard</h3>
                  <p className="text-slate-500 text-lg leading-relaxed mb-8">
                    Sistema de gestión de activos para empresas de ingeniería. Control de stock crítico.
                  </p>
                  <a href="#" className="inline-flex items-center text-blue-600 font-black text-sm group/link hover:underline">
                    VER PROYECTO EN VIVO <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                </div>
              </div>
            ) : (
              proyectos.map((pro) => (
                <div key={pro.id} className="group bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-xl">
                  <div className="aspect-video bg-slate-200 relative">
                    {pro.imagen_url && <img src={pro.imagen_url} alt={pro.titulo} className="object-cover w-full h-full" />}
                  </div>
                  <div className="p-10">
                    <h3 className="text-2xl font-black text-slate-900 mb-2">{pro.titulo}</h3>
                    <p className="text-slate-500 mb-6">{pro.descripcion}</p>
                    <a href={pro.link_live} target="_blank" className="text-blue-600 font-bold flex items-center gap-2">
                      Ver Online <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              ))
            )}

            <div className="bg-slate-100 rounded-[2.5rem] border-2 border-dashed border-slate-300 flex flex-col items-center justify-center p-12 text-center">
              <Globe className="w-12 h-12 text-slate-300 mb-4" />
              <h3 className="text-2xl font-bold text-slate-400 tracking-tight">Próximo Caso de Éxito</h3>
              <p className="text-slate-400 mt-2">¿Listo para digitalizar tu operación?</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICIOS --- */}
      <section id="soluciones" className="py-24 px-6 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-xl hover:border-blue-500 transition-all duration-500 group">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8">
                <BarChart3 className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-3xl font-bold mb-4 tracking-tight">Sistemas de Gestión</h3>
              <p className="text-slate-500 text-lg leading-relaxed">Dashboards personalizados que centralizan tu información y eliminan el caos administrativo.</p>
            </div>
            <div className="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-xl hover:border-blue-500 transition-all duration-500 group">
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-8">
                <Search className="w-8 h-8 text-green-600 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-3xl font-bold mb-4 tracking-tight">Webs de Conversión</h3>
              <p className="text-slate-500 text-lg leading-relaxed">Landing pages de alta velocidad diseñadas para transformar visitantes en clientes reales.</p>
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
                ¿Hablamos de <br /> tu proyecto?
              </h2>
              <p className="text-slate-400 text-lg">Soluciones digitales que escalan con tu negocio.</p>
            </div>
            <div className="flex flex-col gap-4 w-full md:w-auto">
              <a 
                href={waLink} 
                target="_blank"
                className="bg-green-500 hover:bg-green-400 text-white px-10 py-5 rounded-2xl font-black text-xl flex items-center justify-center transition-all hover:scale-105"
              >
                <MessageSquare className="mr-3 fill-white text-white" /> WHATSAPP
              </a>
              <a href={`mailto:${contactEmail}`} className="flex items-center justify-center text-slate-400 hover:text-white transition text-sm">
                <Mail className="w-4 h-4 mr-2" /> {contactEmail}
              </a>
            </div>
          </div>

          <div className="mt-20 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-slate-100 pt-10">
            <div className="text-xl font-black tracking-tighter text-blue-600">
              ROBERTO<span className="text-slate-900">.SOLUTIONS</span>
            </div>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
              © 2025 - LIMA, PERÚ.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Step({ number, title, desc }: { number: string, title: string, desc: string }) {
  return (
    <div className="relative p-8 bg-slate-50 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-lg transition-all">
      <span className="text-6xl font-black text-blue-100/50 absolute top-4 right-6 leading-none select-none">{number}</span>
      <h4 className="text-2xl font-bold text-slate-900 mb-3 relative z-10 tracking-tight">{title}</h4>
      <p className="text-slate-500 text-sm leading-relaxed relative z-10">{desc}</p>
    </div>
  );
}