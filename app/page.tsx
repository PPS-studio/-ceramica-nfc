'use client'

import { useEffect, useState } from 'react'

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

const MENSAJES: Record<string, string[]> = {
  // Calma + Sanando
  'calma-sanando': [
    'El río no lucha contra sus orillas. Fluye, y al fluir, encuentra su camino.',
    'Soltar no es rendirse. Es confiar en que lo que viene es mejor que lo que fue.',
    'La calma no se encuentra. Se construye, ladrillo a ladrillo, día a día.',
    'Hay valentía en dejar ir. Hay sabiduría en descansar.',
    'No todo necesita ser resuelto hoy. Respira. El tiempo también sana.',
  ],
  // Calma + Construyendo
  'calma-construyendo': [
    'Los cimientos más sólidos se ponen en silencio, sin prisa.',
    'Construir despacio es construir para siempre.',
    'La paciencia es la herramienta más poderosa que tienes.',
    'Cada pequeño paso cuenta. No subestimes lo que estás levantando.',
    'La calma es tu superpoder mientras construyes tu mundo.',
  ],
  // Calma + Buscando
  'calma-buscando': [
    'A veces el camino aparece cuando dejas de correr.',
    'No necesitas todas las respuestas hoy. Camina y confía.',
    'La búsqueda tranquila encuentra lo que la urgencia nunca halla.',
    'Dentro del silencio viven las respuestas que más necesitas.',
    'Buscar con calma es ya haber encontrado algo esencial.',
  ],
  // Calma + Disfrutando
  'calma-disfrutando': [
    'Esto que tienes, este momento, es suficiente y es tuyo.',
    'La gratitud silenciosa es la forma más profunda de alegría.',
    'Quedarse quieto y mirar lo que hay. Eso también es sabiduría.',
    'No siempre hay que ir a por más. A veces, esto es todo.',
    'El presente es el único lugar donde vive la paz real.',
  ],
  // Crecimiento + Construyendo
  'crecimiento-construyendo': [
    'Cada versión tuya fue necesaria para llegar a esta.',
    'No hay atajos al crecimiento real. Pero el camino vale cada paso.',
    'Lo que estás construyendo hoy te sorprenderá mañana.',
    'Crecer duele a veces. Pero también es la sensación más viva que existe.',
    'Eres la suma de todo lo que has decidido ser. Y aún no has terminado.',
  ],
  // Crecimiento + Sanando
  'crecimiento-sanando': [
    'Sanar también es crecer. No son caminos distintos.',
    'Las grietas son por donde entra la luz nueva.',
    'Lo que sueltas hoy deja espacio para lo que mereces mañana.',
    'Eres más fuerte de lo que crees, y más sabio de lo que imaginas.',
    'El proceso de sanar es también el proceso de convertirte en quien serás.',
  ],
  // Crecimiento + Buscando
  'crecimiento-buscando': [
    'Buscar es ya una forma de crecer. No lo olvides.',
    'La incertidumbre no es el enemigo. Es el terreno donde crece todo lo nuevo.',
    'No necesitas saber el destino para empezar a caminar.',
    'Cada pregunta que te haces te acerca más a quien realmente eres.',
    'El que busca ya está en movimiento. Y el movimiento es vida.',
  ],
  // Crecimiento + Disfrutando
  'crecimiento-disfrutando': [
    'Disfrutar de lo que tienes no frena tu crecimiento. Lo alimenta.',
    'La alegría también es un maestro. Escúchala.',
    'Celebrar el camino recorrido es parte del viaje.',
    'Has llegado hasta aquí. Eso merece ser reconocido.',
    'El crecimiento más bonito es el que se disfruta mientras ocurre.',
  ],
  // Conexión + Construyendo
  'conexion-construyendo': [
    'Lo que construyes con otros dura más que lo que construyes solo.',
    'Las mejores historias siempre tienen más de un personaje.',
    'Tender puentes es también una forma de edificar.',
    'Lo que haces resuena en quienes te rodean. No lo subestimes.',
    'Construir desde el amor a los demás es construir sobre roca.',
  ],
  // Conexión + Sanando
  'conexion-sanando': [
    'Dejarte querer también es parte de sanar.',
    'No tienes que sanar solo. Hay manos que quieren ayudarte.',
    'La conexión real cura lo que el tiempo no puede.',
    'Abrirte a otros es un acto de valentía y de amor propio.',
    'Las heridas compartidas pesan la mitad.',
  ],
  // Conexión + Buscando
  'conexion-buscando': [
    'A veces lo que buscas ya está en alguien que conoces.',
    'Los encuentros no son casuales. Presta atención a quien aparece.',
    'Buscar junto a otros es más rico que buscar en soledad.',
    'La conexión con los demás también te muestra quién eres tú.',
    'El otro es a veces el espejo que necesitabas.',
  ],
  // Conexión + Disfrutando
  'conexion-disfrutando': [
    'La alegría compartida es la alegría multiplicada.',
    'Los momentos con los que quieres son los que recordarás.',
    'Estar presente con alguien es el mayor regalo que puedes dar.',
    'El amor cotidiano es el más real y el más valioso.',
    'Hoy, solo por estar cerca de quienes quieres, ya ganaste.',
  ],
  // Propósito + Construyendo
  'proposito-construyendo': [
    'Cada ladrillo que pones tiene sentido aunque no veas el edificio aún.',
    'Construir con propósito es dejar huella en el mundo.',
    'Lo que haces importa. Más de lo que crees.',
    'El propósito no se encuentra. Se construye, acción a acción.',
    'Estás edificando algo que va más allá de ti. Eso es extraordinario.',
  ],
  // Propósito + Sanando
  'proposito-sanando': [
    'Sanar es también encontrar tu propósito más auténtico.',
    'Lo que viviste no fue en vano. De ello nace tu fuerza.',
    'Tu historia, con todo lo que tiene, es única y valiosa.',
    'Del dolor también nace la claridad sobre lo que realmente importa.',
    'Sanar es volver a ti. Y tú tienes mucho que ofrecer.',
  ],
  // Propósito + Buscando
  'proposito-buscando': [
    'El propósito no siempre llega como una revelación. A veces es un susurro.',
    'Buscar el sentido es ya vivir con profundidad.',
    'No tengas prisa. El propósito se revela a quienes prestan atención.',
    'La pregunta más importante no es adónde vas, sino por qué.',
    'Estás en el camino correcto. Aunque no lo parezca aún.',
  ],
  // Propósito + Disfrutando
  'proposito-disfrutando': [
    'Disfrutar de lo que tienes es también cumplir tu propósito.',
    'La vida con sentido no siempre es dramática. A veces es esto: paz y gratitud.',
    'Hacer bien las cosas pequeñas también es un propósito.',
    'El sentido de la vida está a menudo en los momentos ordinarios.',
    'Hoy tienes todo lo que necesitas para vivir con propósito.',
  ],
  // Default
  'default': [
    'Llevas dentro todo lo que necesitas. Siempre lo has tenido.',
    'Hoy es un buen día para ser tú.',
    'No busques fuera lo que ya vive dentro.',
    'Confía en el proceso. Todo llega en su momento.',
    'Eres suficiente. Exactamente como eres.',
  ],
}

function getMensaje(busqueda: string, momento: string): string {
  const b = busqueda.toLowerCase()
  const m = momento.toLowerCase()

  let bKey = 'default'
  if (b.includes('calma')) bKey = 'calma'
  else if (b.includes('crecimiento')) bKey = 'crecimiento'
  else if (b.includes('conexi')) bKey = 'conexion'
  else if (b.includes('prop')) bKey = 'proposito'

  let mKey = 'construyendo'
  if (m.includes('sanando')) mKey = 'sanando'
  else if (m.includes('buscando')) mKey = 'buscando'
  else if (m.includes('disfrutando')) mKey = 'disfrutando'

  const key = `${bKey}-${mKey}`
  const lista = MENSAJES[key] || MENSAJES['default']
  return lista[Math.floor(Math.random() * lista.length)]
}

type Perfil = {
  nombre: string
  personalidad: string
  busqueda: string
  momento: string
  tono: string
}

const STORAGE_KEY = 'ceramica_perfil'

export default function Home() {
  const [pantalla, setPantalla] = useState<'bienvenida' | 'preguntas' | 'mensaje'>('bienvenida')
  const [paso, setPaso] = useState(0)
  const [respuestas, setRespuestas] = useState<Record<string, string[]>>({})
  const [nombreInput, setNombreInput] = useState('')
  const [perfil, setPerfil] = useState<Perfil | null>(null)
  const [mensaje, setMensaje] = useState('')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const guardado = localStorage.getItem(STORAGE_KEY)
    if (guardado) {
      const p = JSON.parse(guardado) as Perfil
      setPerfil(p)
      setMensaje(getMensaje(p.busqueda, p.momento))
      setPantalla('mensaje')
      setTimeout(() => setVisible(true), 100)
    }
  }, [])

  const toggleOpcion = (id: string, op: string) => {
    setRespuestas(prev => {
      const actual = prev[id] || []
      return {
        ...prev,
        [id]: actual.includes(op) ? actual.filter(o => o !== op) : [...actual, op],
      }
    })
  }

  const siguiente = () => {
    const q = PREGUNTAS[paso]
    if (q.tipo === 'texto' && !nombreInput.trim()) return
    if (q.tipo === 'opciones' && !(respuestas[q.id]?.length)) return

    if (paso < PREGUNTAS.length - 1) {
      setPaso(p => p + 1)
    } else {
      const p: Perfil = {
        nombre: nombreInput,
        personalidad: (respuestas['personalidad'] || []).join(', '),
        busqueda: (respuestas['busqueda'] || []).join(', '),
        momento: (respuestas['momento'] || []).join(', '),
        tono: (respuestas['tono'] || []).join(', '),
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(p))
      setPerfil(p)
      const msg = getMensaje(p.busqueda, p.momento)
      setMensaje(msg)
      setPantalla('mensaje')
      setTimeout(() => setVisible(true), 100)
    }
  }

  const nuevoMensaje = () => {
    if (!perfil) return
    setVisible(false)
    setTimeout(() => {
      setMensaje(getMensaje(perfil.busqueda, perfil.momento))
      setVisible(true)
    }, 400)
  }

  const resetear = () => {
    if (!confirm('¿Seguro que quieres empezar de nuevo?')) return
    localStorage.removeItem(STORAGE_KEY)
    setPerfil(null)
    setPaso(0)
    setRespuestas({})
    setNombreInput('')
    setVisible(false)
    setPantalla('bienvenida')
  }

  const q = PREGUNTAS[paso]

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f5f0ea] px-6 py-10">
      <div className="w-full max-w-md text-center">

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

        {pantalla === 'preguntas' && (
          <div className="flex flex-col items-center gap-6">
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

        {pantalla === 'mensaje' && (
          <div className="flex flex-col items-center gap-6">
            <div className="text-5xl">🏺</div>
            <p className="text-xs tracking-widest text-[#9a8878] uppercase">Para {perfil?.nombre}</p>
            <p className={`font-serif-custom text-2xl font-light italic text-[#3a3028] leading-relaxed transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
              {mensaje}
            </p>
            <div className="w-10 h-px bg-[#c4ad98]" />
            <button onClick={nuevoMensaje}
              className="border border-[#c4ad98] text-[#7a6a5a] px-8 py-3 rounded-full text-xs tracking-widest uppercase hover:bg-[#c4ad98] hover:text-[#f5f0ea] transition-all">
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
