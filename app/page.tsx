'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const PREGUNTAS = [
  {
    id: 'nombre',
    texto: '¿Cómo te llamas?',
    tipo: 'texto',
    placeholder: 'Tu nombre...',
  },
  {
    id: 'personalidad',
    texto: '¿Cómo te describirías?',
    tipo: 'opciones',
    ops: ['Soñador y creativo', 'Práctico y resolutivo', 'Espiritual y reflexivo', 'Curioso y aventurero'],
  },
  {
    id: 'busqueda',
    texto: '¿Qué es lo que más buscas en la vida?',
    tipo: 'opciones',
    ops: ['Calma y equilibrio', 'Crecimiento personal', 'Conexión con los demás', 'Propósito y sentido'],
  },
  {
    id: 'momento',
    texto: '¿Qué frase describe mejor tu momento vital?',
    tipo: 'opciones',
    ops: ['Estoy construyendo algo nuevo', 'Estoy sanando y soltando', 'Estoy buscando mi camino', 'Estoy disfrutando lo que tengo'],
  },
  {
    id: 'tono',
    texto: '¿Qué tono de mensaje te resuena más?',
    tipo: 'opciones',
    ops: ['Poético y metafórico', 'Directo y claro', 'Filosófico y profundo', 'Cálido y cercano'],
  },
]

type Perfil = {
  nombre: string
  personalidad: string
  busqueda: string
  momento: string
  tono: string
}

function getDeviceId() {
  let id = localStorage.getItem('device_id')
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem('device_id', id)
  }
  return id
}

export default function Home() {
  const [pantalla, setPantalla] = useState<'bienvenida' | 'preguntas' | 'generando' | 'mensaje'>('bienvenida')
  const [paso, setPaso] = useState(0)
  const [respuestas, setRespuestas] = useState<Record<string, string[]>>({})
  const [nombreInput, setNombreInput] = useState('')
  const [perfil, setPerfil] = useState<Perfil | null>(null)
  const [mensaje, setMensaje] = useState('')
  const [cargando, setCargando] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const init = async () => {
      const deviceId = getDeviceId()
      const { data } = await supabase
        .from('perfiles')
        .select('*')
        .eq('device_id', deviceId)
        .single()
      if (data) {
        setPerfil(data)
        setPantalla('generando')
        await generarMensaje(data)
      }
    }
    init()
  }, [])

  const generarMensaje = async (p: Perfil) => {
    setPantalla('generando')
    setCargando(true)
    setVisible(false)
    try {
      const res = await fetch('/api/mensaje', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(p),
      })
      const data = await res.json()
      setMensaje(data.mensaje)
    } catch {
      setMensaje('Hoy, como cada día, llevas dentro todo lo que necesitas.')
    }
    setCargando(false)
    setPantalla('mensaje')
    setTimeout(() => setVisible(true), 100)
  }

  const toggleOpcion = (id: string, op: string) => {
    setRespuestas(prev => {
      const actual = prev[id] || []
      return {
        ...prev,
        [id]: actual.includes(op) ? actual.filter(o => o !== op) : [...actual, op],
      }
    })
  }

  const siguiente = async () => {
    const q = PREGUNTAS[paso]
    if (q.tipo === 'texto' && !nombreInput.trim()) return
    if (q.tipo === 'opciones' && !(respuestas[q.id]?.length)) return

    if (paso < PREGUNTAS.length - 1) {
      setPaso(p => p + 1)
    } else {
      // Guardar perfil
      const deviceId = getDeviceId()
      const p: Perfil = {
        nombre: nombreInput,
        personalidad: (respuestas['personalidad'] || []).join(', '),
        busqueda: (respuestas['busqueda'] || []).join(', '),
        momento: (respuestas['momento'] || []).join(', '),
        tono: (respuestas['tono'] || []).join(', '),
      }
      await supabase.from('perfiles').upsert({ device_id: deviceId, ...p })
      setPerfil(p)
      await generarMensaje(p)
    }
  }

  const resetear = async () => {
    if (!confirm('¿Seguro que quieres empezar de nuevo?')) return
    const deviceId = getDeviceId()
    await supabase.from('perfiles').delete().eq('device_id', deviceId)
    localStorage.removeItem('device_id')
    setPerfil(null)
    setPaso(0)
    setRespuestas({})
    setNombreInput('')
    setPantalla('bienvenida')
  }

  const q = PREGUNTAS[paso]

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f5f0ea] px-6 py-10">
      <div className="w-full max-w-md text-center">

        {/* BIENVENIDA */}
        {pantalla === 'bienvenida' && (
          <div className="flex flex-col items-center gap-6">
            <div className="text-5xl animate-bounce">🏺</div>
            <h1 className="font-serif-custom text-4xl font-light text-[#3a3028]">Bienvenido</h1>
            <p className="text-sm text-[#9a8878] leading-relaxed tracking-wide">
              Esta cerámica quiere conocerte.<br />
              Responde unas preguntas y<br />
              te hablará solo a ti.
            </p>
            <button onClick={() => setPantalla('preguntas')}
              className="mt-2 border border-[#c4ad98] text-[#7a6a5a] px-8 py-3 rounded-full text-xs tracking-widest uppercase hover:bg-[#c4ad98] hover:text-[#f5f0ea] transition-all">
              Comenzar
            </button>
          </div>
        )}

        {/* PREGUNTAS */}
        {pantalla === 'preguntas' && (
          <div className="flex flex-col items-center gap-6">
            {/* Progreso */}
            <div className="flex gap-2">
              {PREGUNTAS.map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full transition-all ${i < paso ? 'bg-[#c4ad98]' : 'bg-[#e0d5ca]'}`} />
              ))}
            </div>

            <p className="font-serif-custom text-2xl font-light text-[#3a3028] leading-relaxed min-h-[60px]">
              {q.texto}
            </p>

            {q.tipo === 'texto' ? (
              <input
                autoFocus
                value={nombreInput}
                onChange={e => setNombreInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && siguiente()}
                placeholder={q.placeholder}
                className="w-full border-b border-[#c4ad98] bg-transparent font-serif-custom text-2xl text-[#3a3028] text-center pb-2 outline-none placeholder-[#c4ad98]"
              />
            ) : (
              <div className="flex flex-col gap-3 w-full">
                {q.ops!.map(op => (
                  <button key={op}
                    onClick={() => toggleOpcion(q.id, op)}
                    className={`border px-6 py-3 rounded-full text-sm tracking-wide text-left transition-all ${
                      (respuestas[q.id] || []).includes(op)
                        ? 'bg-[#c4ad98] border-[#c4ad98] text-[#f5f0ea]'
                        : 'border-[#d9cec5] text-[#5a4a3a] hover:bg-[#e8ddd5]'
                    }`}>
                    {op}
                  </button>
                ))}
              </div>
            )}

            <button onClick={siguiente}
              className="border border-[#c4ad98] text-[#7a6a5a] px-8 py-3 rounded-full text-xs tracking-widest uppercase hover:bg-[#c4ad98] hover:text-[#f5f0ea] transition-all">
              Continuar
            </button>
          </div>
        )}

        {/* GENERANDO */}
        {pantalla === 'generando' && (
          <div className="flex flex-col items-center gap-6">
            <div className="text-5xl">🏺</div>
            <p className="text-sm text-[#9a8878] tracking-wide">La cerámica te está escuchando…</p>
            <div className="flex gap-2">
              {[0,1,2].map(i => (
                <div key={i} className="w-2 h-2 rounded-full bg-[#c4ad98] animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
          </div>
        )}

        {/* MENSAJE */}
        {pantalla === 'mensaje' && (
          <div className="flex flex-col items-center gap-6">
            <div className="text-5xl">🏺</div>
            <p className="text-xs tracking-widest text-[#9a8878] uppercase">Para {perfil?.nombre}</p>
            <p className={`font-serif-custom text-2xl font-light italic text-[#3a3028] leading-relaxed transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
              {mensaje}
            </p>
            <div className="w-10 h-px bg-[#c4ad98]" />
            <button onClick={() => perfil && generarMensaje(perfil)} disabled={cargando}
              className="border border-[#c4ad98] text-[#7a6a5a] px-8 py-3 rounded-full text-xs tracking-widest uppercase hover:bg-[#c4ad98] hover:text-[#f5f0ea] transition-all disabled:opacity-40">
              Otro mensaje
            </button>
            <p className="text-xs text-[#c4ad98] tracking-wide mt-4">Tu cerámica te habla cuando lo necesitas</p>
            <button onClick={resetear} className="text-xs text-[#c4ad98] underline bg-none border-none cursor-pointer">
              Empezar de nuevo
            </button>
          </div>
        )}

      </div>
    </main>
  )
}
