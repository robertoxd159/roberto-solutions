'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Trash2, ExternalLink, Plus } from 'lucide-react';

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  // Estados
  const [perfil, setPerfil] = useState({ whatsapp: '', email_contacto: '', frase_hero: '' });
  const [proyectos, setProyectos] = useState<any[]>([]);
  const [nuevoProyecto, setNuevoProyecto] = useState({
    titulo: '',
    descripcion: '',
    imagen_url: '',
    link_live: ''
  });

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
    // Cargar Perfil
    const { data: pData } = await supabase.from('perfil').select('*').eq('id', 1).single();
    if (pData) setPerfil({ whatsapp: pData.whatsapp, email_contacto: pData.email_contacto, frase_hero: pData.frase_hero });
    
    // Cargar Proyectos
    const { data: prData } = await supabase.from('proyectos').select('*').order('created_at', { ascending: false });
    if (prData) setProyectos(prData);
    setLoading(false);
  };

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
      alert('Proyecto añadido');
    }
    setSaving(false);
  };

  const deleteProyecto = async (id: string) => {
    if (confirm('¿Borrar este proyecto?')) {
      await supabase.from('proyectos').delete().eq('id', id);
      fetchDatos();
    }
  };

  if (loading) return <div className="p-10 text-center font-bold text-slate-400 animate-pulse">CARGANDO...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-black text-slate-900 italic">ADMIN.PANEL</h1>
          <button onClick={() => supabase.auth.signOut().then(() => router.push('/admin/login'))} className="text-red-500 font-bold text-xs uppercase tracking-widest">Salir</button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* COLUMNA 1: PERFIL */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 h-fit">
            <h2 className="text-xl font-black mb-6 text-blue-600 flex items-center gap-2">CONTACTO</h2>
            <form onSubmit={handleUpdatePerfil} className="space-y-4">
              <input type="text" placeholder="WhatsApp" className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 ring-blue-500" value={perfil.whatsapp} onChange={e => setPerfil({...perfil, whatsapp: e.target.value})} />
              <input type="email" placeholder="Email" className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 ring-blue-500" value={perfil.email_contacto} onChange={e => setPerfil({...perfil, email_contacto: e.target.value})} />
              <textarea placeholder="Frase Hero" rows={3} className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 ring-blue-500" value={perfil.frase_hero} onChange={e => setPerfil({...perfil, frase_hero: e.target.value})} />
              <button disabled={saving} className="w-full bg-blue-600 text-white p-4 rounded-2xl font-bold hover:bg-slate-900 transition shadow-lg shadow-blue-100">Guardar Cambios</button>
            </form>
          </div>

          {/* COLUMNA 2: FORMULARIO PROYECTOS */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 h-fit">
            <h2 className="text-xl font-black mb-6 text-green-600 flex items-center gap-2">NUEVO PROYECTO</h2>
            <form onSubmit={handleAddProyecto} className="space-y-4">
              <input type="text" placeholder="Título del proyecto" required className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 ring-green-500" value={nuevoProyecto.titulo} onChange={e => setNuevoProyecto({...nuevoProyecto, titulo: e.target.value})} />
              <textarea placeholder="Descripción corta" required className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 ring-green-500" value={nuevoProyecto.descripcion} onChange={e => setNuevoProyecto({...nuevoProyecto, descripcion: e.target.value})} />
              <input type="text" placeholder="URL de la Imagen (Link)" className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 ring-green-500" value={nuevoProyecto.imagen_url} onChange={e => setNuevoProyecto({...nuevoProyecto, imagen_url: e.target.value})} />
              <input type="text" placeholder="URL del Proyecto (VIVO)" className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 ring-green-500" value={nuevoProyecto.link_live} onChange={e => setNuevoProyecto({...nuevoProyecto, link_live: e.target.value})} />
              <button disabled={saving} className="w-full bg-green-500 text-white p-4 rounded-2xl font-bold hover:bg-slate-900 transition shadow-lg shadow-green-100 flex items-center justify-center gap-2"><Plus size={18}/> Añadir Proyecto</button>
            </form>
          </div>

          {/* COLUMNA 3: LISTA DE PROYECTOS */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 h-fit lg:max-h-[70vh] overflow-y-auto">
            <h2 className="text-xl font-black mb-6 text-slate-400">TUS PROYECTOS ({proyectos.length})</h2>
            <div className="space-y-4">
              {proyectos.map((p) => (
                <div key={p.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center group">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{p.titulo}</h3>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Publicado</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => deleteProyecto(p.id)} className="p-2 text-slate-300 hover:text-red-500 transition"><Trash2 size={16}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}