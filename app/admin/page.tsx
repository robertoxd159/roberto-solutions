'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Trash2, Plus, MessageSquare, Star, Briefcase, User } from 'lucide-react';

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  // Estados de datos
  const [perfil, setPerfil] = useState({ whatsapp: '', email_contacto: '', frase_hero: '' });
  const [proyectos, setProyectos] = useState<any[]>([]);
  const [testimonios, setTestimonios] = useState<any[]>([]);

  // Estados de nuevos registros
  const [nuevoProyecto, setNuevoProyecto] = useState({ titulo: '', descripcion: '', imagen_url: '', link_live: '' });
  const [nuevoTestimonio, setNuevoTestimonio] = useState({ nombre: '', cargo: '', comentario: '', estrellas: 5 });

  useEffect(() => {
    const initAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/admin/login'); return; }
      setUser(user);
      fetchDatos();
    };
    initAdmin();
  }, [router]);

  const fetchDatos = async () => {
    setLoading(true);
    const { data: pData } = await supabase.from('perfil').select('*').eq('id', 1).single();
    if (pData) setPerfil({ whatsapp: pData.whatsapp, email_contacto: pData.email_contacto, frase_hero: pData.frase_hero });
    
    const { data: prData } = await supabase.from('proyectos').select('*').order('created_at', { ascending: false });
    if (prData) setProyectos(prData);

    const { data: tData } = await supabase.from('testimonios').select('*').order('created_at', { ascending: false });
    if (tData) setTestimonios(tData);

    setLoading(false);
  };

  // --- MANEJADORES ---
  const handleUpdatePerfil = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await supabase.from('perfil').update(perfil).eq('id', 1);
    alert('Perfil actualizado');
    setSaving(false);
  };

  const handleAddProyecto = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from('proyectos').insert([nuevoProyecto]);
    if (!error) {
      setNuevoProyecto({ titulo: '', descripcion: '', imagen_url: '', link_live: '' });
      fetchDatos();
    }
    setSaving(false);
  };

  const handleAddTestimonio = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from('testimonios').insert([nuevoTestimonio]);
    if (!error) {
      setNuevoTestimonio({ nombre: '', cargo: '', comentario: '', estrellas: 5 });
      fetchDatos();
    }
    setSaving(false);
  };

  const deleteItem = async (tabla: string, id: string) => {
    if (confirm(`¿Seguro que quieres borrar este registro de ${tabla}?`)) {
      await supabase.from(tabla).delete().eq('id', id);
      fetchDatos();
    }
  };

  if (loading) return <div className="p-10 text-center font-bold text-slate-400 animate-pulse">SINCRONIZANDO PANEL...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10">
      <div className="max-w-[1400px] mx-auto">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10 bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tighter">ROBERTO.ADMIN</h1>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Panel de Control General</p>
          </div>
          <button onClick={() => supabase.auth.signOut().then(() => router.push('/admin/login'))} className="bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 px-6 py-2 rounded-xl text-xs font-bold transition-colors">CERRAR SESIÓN</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* COLUMNA 1: CONFIGURACIÓN GENERAL */}
          <div className="space-y-8">
            <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <h2 className="text-lg font-black mb-6 flex items-center gap-2 text-blue-600 uppercase"><User size={18}/> Perfil & Contacto</h2>
              <form onSubmit={handleUpdatePerfil} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 ml-2">WHATSAPP (CON CÓDIGO PAÍS)</label>
                  <input type="text" className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 ring-blue-500 transition-all" value={perfil.whatsapp} onChange={e => setPerfil({...perfil, whatsapp: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 ml-2">EMAIL PÚBLICO</label>
                  <input type="email" className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 ring-blue-500 transition-all" value={perfil.email_contacto} onChange={e => setPerfil({...perfil, email_contacto: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 ml-2">FRASE HERO (H1)</label>
                  <textarea rows={3} className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 ring-blue-500 transition-all" value={perfil.frase_hero} onChange={e => setPerfil({...perfil, frase_hero: e.target.value})} />
                </div>
                <button disabled={saving} className="w-full bg-blue-600 text-white p-4 rounded-2xl font-bold hover:bg-slate-900 transition shadow-lg shadow-blue-100">Actualizar Web</button>
              </form>
            </section>
          </div>

          {/* COLUMNA 2: PROYECTOS */}
          <div className="space-y-8">
            <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <h2 className="text-lg font-black mb-6 flex items-center gap-2 text-indigo-600 uppercase"><Briefcase size={18}/> Gestionar Proyectos</h2>
              <form onSubmit={handleAddProyecto} className="space-y-3 mb-8">
                <input placeholder="Título" required className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 ring-indigo-500" value={nuevoProyecto.titulo} onChange={e => setNuevoProyecto({...nuevoProyecto, titulo: e.target.value})} />
                <textarea placeholder="Descripción" required className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 ring-indigo-500" value={nuevoProyecto.descripcion} onChange={e => setNuevoProyecto({...nuevoProyecto, descripcion: e.target.value})} />
                <input placeholder="URL Imagen" className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 ring-indigo-500" value={nuevoProyecto.imagen_url} onChange={e => setNuevoProyecto({...nuevoProyecto, imagen_url: e.target.value})} />
                <input placeholder="URL Link Live" className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 ring-indigo-500" value={nuevoProyecto.link_live} onChange={e => setNuevoProyecto({...nuevoProyecto, link_live: e.target.value})} />
                <button disabled={saving} className="w-full bg-indigo-600 text-white p-4 rounded-2xl font-bold flex items-center justify-center gap-2"><Plus size={18}/> Añadir Proyecto</button>
              </form>

              <div className="space-y-3 overflow-y-auto max-h-[300px] pr-2">
                {proyectos.map(p => (
                  <div key={p.id} className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center border border-slate-100 group">
                    <span className="font-bold text-sm text-slate-700 truncate mr-4">{p.titulo}</span>
                    <button onClick={() => deleteItem('proyectos', p.id)} className="text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* COLUMNA 3: TESTIMONIOS */}
          <div className="space-y-8">
            <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <h2 className="text-lg font-black mb-6 flex items-center gap-2 text-emerald-600 uppercase"><MessageSquare size={18}/> Testimonios</h2>
              <form onSubmit={handleAddTestimonio} className="space-y-3 mb-8">
                <input placeholder="Nombre del Cliente" required className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 ring-emerald-500" value={nuevoTestimonio.nombre} onChange={e => setNuevoTestimonio({...nuevoTestimonio, nombre: e.target.value})} />
                <input placeholder="Cargo / Empresa" className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 ring-emerald-500" value={nuevoTestimonio.cargo} onChange={e => setNuevoTestimonio({...nuevoTestimonio, cargo: e.target.value})} />
                <textarea placeholder="¿Qué dijo de ti?" required className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 ring-emerald-500" value={nuevoTestimonio.comentario} onChange={e => setNuevoTestimonio({...nuevoTestimonio, comentario: e.target.value})} />
                <div className="flex items-center gap-4 p-2">
                  <span className="text-[10px] font-black text-slate-400">ESTRELLAS:</span>
                  <select className="bg-slate-50 border-none rounded-lg font-bold text-emerald-600 outline-none" value={nuevoTestimonio.estrellas} onChange={e => setNuevoTestimonio({...nuevoTestimonio, estrellas: parseInt(e.target.value)})}>
                    <option value="5">5 ★</option>
                    <option value="4">4 ★</option>
                  </select>
                </div>
                <button disabled={saving} className="w-full bg-emerald-600 text-white p-4 rounded-2xl font-bold flex items-center justify-center gap-2"><Plus size={18}/> Publicar Reseña</button>
              </form>

              <div className="space-y-3 overflow-y-auto max-h-[300px] pr-2">
                {testimonios.map(t => (
                  <div key={t.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-sm text-slate-800">{t.nombre}</span>
                      <button onClick={() => deleteItem('testimonios', t.id)} className="text-slate-300 hover:text-red-500"><Trash2 size={14}/></button>
                    </div>
                    <p className="text-[10px] text-slate-400 uppercase font-black">{t.cargo}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
}
