import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { nombre, personalidad, busqueda, momento, tono } = await req.json()

  const prompt = `Eres el alma de una pieza de cerámica artesanal. Conoces bien a la persona que te toca:
- Nombre: ${nombre}
- Se describe como: ${personalidad}
- Busca en la vida: ${busqueda}
- Su momento vital: ${momento}
- Tono que le resuena: ${tono}

Genera UN SOLO mensaje breve (máximo 3 líneas) para ${nombre}.
Debe sentirse personal, íntimo, como si la cerámica le hablara directamente.
No uses el nombre al principio. No uses comillas. No expliques nada. Solo el mensaje.`

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }]
      })
    })

    const data = await res.json()
    const mensaje = data.content.map((b: any) => b.text || '').join('').trim()
    return NextResponse.json({ mensaje })
  } catch (e) {
    return NextResponse.json(
      { mensaje: 'Hoy, como cada día, llevas dentro todo lo que necesitas.' },
      { status: 500 }
    )
  }
}
