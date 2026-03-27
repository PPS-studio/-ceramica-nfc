'use client'

import { useEffect, useState } from 'react'

const PREGUNTAS = [
  { id: 'nombre', texto: '¿Cómo te llamas?', tipo: 'texto', placeholder: 'Tu nombre...' },
  { id: 'personalidad', texto: '¿Cómo te describirías?', tipo: 'opciones', ops: ['Soñador y creativo', 'Práctico y resolutivo', 'Espiritual y reflexivo', 'Curioso y aventurero'] },
  { id: 'busqueda', texto: '¿Qué es lo que más buscas en la vida?', tipo: 'opciones', ops: ['Calma y equilibrio', 'Crecimiento personal', 'Conexión con los demás', 'Propósito y sentido'] },
  { id: 'momento', texto: '¿Qué frase describe mejor tu momento vital?', tipo: 'opciones', ops: ['Estoy construyendo algo nuevo', 'Estoy sanando y soltando', 'Estoy buscando mi camino', 'Estoy disfrutando lo que tengo'] },
  { id: 'tono', texto: '¿Qué tono de mensaje te resuena más?', tipo: 'opciones', ops: ['Poético y metafórico', 'Directo y claro', 'Filosófico y profundo', 'Cálido y cercano'] },
]

const MENSAJES: Record<string, string[]> = {
  'calma-sanando': [
    'Soltar también es una decisión. Y a veces, la más difícil.',
    'No todo necesita ser resuelto. Algunas cosas solo necesitan tiempo.',
    'La calma no es la ausencia de ruido. Es saber que el ruido no te define.',
    'Parar no es perder. A veces es la única forma de avanzar.',
    'Lo que ya no sirve ocupa espacio. Tú decides cuánto.',
    'No tienes que estar bien para seguir. Puedes seguir mientras sanas.',
    'El descanso no es premio. Es parte del proceso.',
    'Algunas cosas no se resuelven. Se superan.',
    'Hoy no tienes que tenerlo todo claro.',
    'Sanar en silencio también cuenta.',
    'No te compares con quien eras antes del golpe. Ese ya no es el punto.',
    'Lo que sueltas hoy deja espacio para algo mejor.',
    'No todo tiene solución. Pero todo tiene fin.',
    'La calma que buscas fuera ya existe dentro. Solo está enterrada.',
    'Tomarte tiempo no es rendirte.',
    'No tienes que justificar tu necesidad de parar.',
    'El cuerpo sabe antes que la mente. Escúchalo.',
    'No hay prisa en sanar. El proceso tiene su propio ritmo.',
    'A veces lo más productivo que puedes hacer es no hacer nada.',
    'No estás atascado. Estás procesando.',
    'Cada día que avanzas un poco, aunque no lo notes, es suficiente.',
    'La resistencia cansa más que el problema.',
    'Perdonar no es olvidar. Es dejar de cargar.',
    'No todo lo que pesa tiene que quedarse.',
    'El equilibrio no se encuentra. Se practica.',
    'Estar tranquilo no significa estar dormido.',
    'La paz no es un destino. Es una elección diaria.',
    'No tienes que resolver todo hoy.',
    'Respirar también es una estrategia.',
    'Lo que ya pasó no necesita más energía tuya.',
    'Sanar no es lineal. Los retrocesos también son parte.',
    'No tienes que demostrar nada mientras te recuperas.',
    'El tiempo que dedicas a cuidarte no es tiempo perdido.',
    'No hay versión correcta de cómo sanar.',
    'Confiar en el proceso también cuando el proceso duele.',
    'No necesitas tener todo bajo control para estar bien.',
    'Algunas heridas necesitan aire, no más vendas.',
    'Lo que te costó llegar hasta aquí también cuenta.',
    'No te exijas más de lo que puedes hoy.',
    'Descansar no te hace menos.',
    'La calma también se construye con pequeñas decisiones.',
    'No tienes que ser fuerte todo el tiempo.',
    'El movimiento hacia adelante no siempre se ve. Pero ocurre.',
    'Hoy con mantenerte es suficiente.',
    'No compares tu proceso con el de nadie.',
    'Cuidarte no es egoísmo. Es mantenimiento.',
    'El descanso intencional es diferente a la parálisis.',
    'No tienes que llegar a ningún lado hoy.',
    'La serenidad no es indiferencia. Es perspectiva.',
    'Permítete no saber cómo estás. A veces eso también pasa.',
    'No todo silencio es vacío. Algunos son necesarios.',
    'Lo que hoy parece enorme, mañana será manejable.',
    'No hay atajos en sanar. Pero sí hay apoyo.',
    'Cada pequeño paso en la dirección correcta suma.',
    'No tienes que entender todo para seguir.',
    'La pausa también es movimiento.',
    'No siempre hay lección en el dolor. A veces solo hay dolor.',
    'Darte permiso para estar mal es el primer paso para estar mejor.',
    'No tienes que tener ganas para empezar.',
    'El orden interno no llega solo. Se trabaja.',
    'No necesitas razones para cuidarte.',
    'Lo que sientes es válido aunque no lo entiendas.',
    'No toda calma es pasividad. Algunas son poder.',
  ],
  'calma-construyendo': [
    'Lo que construyes despacio, dura.',
    'La prisa es cara. La paciencia, rentable.',
    'No todo avance es visible. Sigue.',
    'Construir con calma no es ir lento. Es ir seguro.',
    'El ritmo también es una elección estratégica.',
    'Los mejores proyectos no se apresuran.',
    'La constancia tranquila gana a la intensidad errática.',
    'Un paso al día es 365 pasos al año.',
    'No hace falta correr si vas en la dirección correcta.',
    'La urgencia artificial destruye más de lo que construye.',
    'Lo que haces hoy con intención vale más que lo que haces mañana con prisa.',
    'No necesitas hacerlo todo a la vez.',
    'Construir bien requiere parar y revisar.',
    'La calidad de lo que haces depende de la calidad de tu estado.',
    'No todo lo urgente es importante.',
    'El mejor cimiento es el que no se ve pero aguanta todo.',
    'Construir sin prisa no significa construir sin propósito.',
    'La energía bien dirigida supera a la energía dispersa.',
    'No tienes que demostrar velocidad. Solo resultados.',
    'El proceso también es parte del producto.',
    'Construir en calma es un acto de confianza en ti mismo.',
    'No hay que hacer ruido para avanzar.',
    'Lo que construyes con foco deja huella.',
    'La claridad antes de la acción ahorra mucho después.',
    'No toda pausa es retraso. Algunas son necesarias.',
    'Hacer menos cosas, pero hacerlas bien.',
    'El silencio también es parte de construir.',
    'No midas el progreso solo en velocidad.',
    'La constancia sin prisa es imbatible.',
    'Lo que haces hoy con calma, mañana es base.',
    'Construir con intención es diferente a construir con ansiedad.',
    'No todo lo que se puede hacer hay que hacerlo ahora.',
    'El equilibrio entre avanzar y descansar es también habilidad.',
    'No necesitas más energía. Necesitas mejor dirección.',
    'Cada decisión tranquila es un ladrillo bien puesto.',
    'Lo que construyes en orden resiste más que lo que construyes en caos.',
    'No te midas con quien va más rápido. Mídete con quien va mejor.',
    'La paciencia aplicada es estrategia, no pasividad.',
    'Construir despacio también es respetarte.',
    'No necesitas hacerlo perfecto. Necesitas hacerlo bien.',
    'El foco sostenido construye más que los sprints intermitentes.',
    'No toda acción suma. Elige cuáles importan.',
    'Construir con calma genera menos errores y más solidez.',
    'No hay mérito en el agotamiento. Hay mérito en los resultados.',
    'La tranquilidad mientras construyes también es parte del resultado.',
    'No midas el valor de lo que haces por el esfuerzo que te costó.',
    'Construir bien es también saber cuándo parar.',
    'La claridad de propósito compensa la falta de velocidad.',
    'No tienes que hacer todo a la vez para llegar lejos.',
    'El trabajo bien hecho no necesita ser explicado.',
  ],
  'calma-buscando': [
    'A veces la respuesta no llega cuando la buscas. Llega cuando paras.',
    'No saber es incómodo. También es honesto.',
    'El camino no siempre se ve entero. Con ver el siguiente paso es suficiente.',
    'Buscar con calma es una ventaja, no una debilidad.',
    'La claridad no se fuerza. Se permite.',
    'No toda búsqueda necesita urgencia.',
    'La tranquilidad mientras buscas también es información.',
    'No tienes que encontrar todo hoy.',
    'Buscar despacio es buscar mejor.',
    'La respuesta correcta raramente llega bajo presión.',
    'No todo camino está señalizado. A veces hay que fiarse del instinto.',
    'Buscar con calma filtra lo que no es para ti.',
    'No necesitas certeza para dar el siguiente paso.',
    'La búsqueda tranquila tiene más claridad que la búsqueda ansiosa.',
    'No todo lo que buscas fuera está fuera.',
    'Parar a escuchar también es buscar.',
    'No tienes que tener todas las respuestas para seguir adelante.',
    'La calma en la búsqueda atrae lo correcto.',
    'No toda incertidumbre es amenaza. Algunas son oportunidad.',
    'Buscar sin prisa permite ver lo que la prisa oculta.',
    'No te exijas encontrar. Permítete explorar.',
    'La pausa en la búsqueda también revela.',
    'No todo silencio es vacío. Algunos son respuestas.',
    'Buscar con intención pero sin ansiedad es el punto medio.',
    'No necesitas el mapa completo para empezar a caminar.',
    'La calma mientras buscas también es confianza en ti.',
    'No toda pregunta necesita respuesta inmediata.',
    'Buscar desde la calma es buscar desde la fortaleza.',
    'No te pierdas en el camino intentando encontrar el destino.',
    'La dirección importa más que la certeza.',
    'No tienes que saber todo para decidir bien.',
    'Buscar con calma no es conformarse. Es ser estratégico.',
    'No toda búsqueda tiene fin claro. Y está bien.',
    'La tranquilidad en la incertidumbre es madurez.',
    'No necesitas apurarte para encontrar lo correcto.',
    'Buscar bien requiere también saber parar.',
    'No todo lo que no encuentras hoy está perdido.',
    'La calma es la mejor herramienta de búsqueda.',
    'No tienes que resolver la incertidumbre. Solo convivir con ella.',
    'Buscar desde la calma genera mejores preguntas.',
    'No toda respuesta llega cuando se pide.',
    'La búsqueda consciente es más efectiva que la búsqueda desesperada.',
    'No te angusties por no encontrar. Confía en el proceso.',
    'Buscar con paciencia es también una forma de respetarte.',
    'No todo lo que buscas llega en el momento que quieres.',
    'La calma en la búsqueda también atrae claridad.',
    'No tienes que forzar ninguna respuesta.',
    'Buscar tranquilo permite ver lo que la ansiedad ciega.',
    'No toda duda es señal de estar perdido.',
    'La búsqueda sin prisa llega más lejos.',
  ],
  'calma-disfrutando': [
    'Esto que tienes ahora es suficiente. ¿Lo estás viendo?',
    'Disfrutar también requiere atención.',
    'No todo tiene que ir a algún lado. Algunas cosas solo tienen que ser.',
    'Estar bien no necesita justificación.',
    'La gratitud silenciosa es la más real.',
    'No tienes que ganarte el descanso.',
    'Disfrutar el presente no es conformismo. Es inteligencia.',
    'No toda felicidad es ruidosa. Las mejores suelen ser silenciosas.',
    'Lo que tienes hoy costó llegar. Reconócelo.',
    'No necesitas más para estar bien si ya estás bien.',
    'Disfrutar sin culpa también es una habilidad.',
    'No todo momento tiene que ser productivo.',
    'La calma del que tiene suficiente es una de las mejores sensaciones.',
    'No tienes que justificar por qué estás bien.',
    'Disfrutar de lo que hay es también una forma de agradecer.',
    'No toda paz es aburrimiento. Algunas son logro.',
    'Lo ordinario bien vivido es extraordinario.',
    'No necesitas más cuando sabes apreciar lo que tienes.',
    'Disfrutar consciente es diferente a disfrutar por inercia.',
    'No todo tiene que cambiar para estar bien.',
    'La calma del que disfruta es contagiosa.',
    'No tienes que buscar más si ya encontraste algo bueno.',
    'Disfrutar el proceso también es parte del resultado.',
    'No toda satisfacción viene del logro. Algunas vienen del ser.',
    'Lo que tienes vale más de lo que crees.',
    'No necesitas compararte para saber que estás bien.',
    'Disfrutar sin prisa es un arte.',
    'No todo tiene que mejorarse. Algunas cosas solo tienen que vivirse.',
    'La gratitud activa lo que la queja bloquea.',
    'No tienes que esperar a algo grande para estar bien.',
    'Disfrutar lo pequeño es sabiduría, no conformismo.',
    'No toda calma es pasividad. Algunas son plenitud.',
    'Lo cotidiano bien vivido es lo que más recordarás.',
    'No necesitas validación para disfrutar de lo que tienes.',
    'Disfrutar es también una elección.',
    'No todo tiene que tener propósito para tener valor.',
    'La paz que sientes hoy es el resultado de decisiones pasadas.',
    'No tienes que merecerte el bienestar. Ya lo tienes.',
    'Disfrutar sin culpa es madurez emocional.',
    'No toda quietud es vacío. Algunas son plenitud.',
    'Lo que disfrutas hoy es también lo que te da energía para mañana.',
    'No necesitas más ruido para saber que estás vivo.',
    'Disfrutar de lo que hay es también estrategia.',
    'No todo lo bueno está en el futuro.',
    'La calma que sientes hoy es también un logro.',
    'No tienes que pedir permiso para estar bien.',
    'Disfrutar consciente multiplica la experiencia.',
    'No todo momento tranquilo hay que llenarlo.',
    'Lo que ya tienes también merece tu atención.',
    'No necesitas más para empezar a disfrutar. Puedes empezar ahora.',
  ],
  'crecimiento-construyendo': [
    'Cada decisión que tomas hoy es arquitectura de lo que serás.',
    'No esperes tener todo claro para empezar. La claridad viene con el movimiento.',
    'Lo que construyes importa. Aunque todavía no se vea.',
    'El crecimiento real no se anuncia. Se nota.',
    'Estás más avanzado de lo que crees. No pares.',
    'Construir y crecer al mismo tiempo es posible. Es lo más humano.',
    'No hay versión final de ti. Siempre hay siguiente nivel.',
    'Lo que hoy te cuesta mañana te define.',
    'No tienes que estar listo para empezar. Empezar es lo que te prepara.',
    'Cada error en lo que construyes es un dato, no un fracaso.',
    'Lo que construyes con propósito tiene más durabilidad.',
    'No te quedes en la planificación eterna. En algún punto hay que hacer.',
    'El crecimiento sin acción es solo teoría.',
    'No tienes que saber todo el camino. Solo el siguiente paso.',
    'Construir algo real requiere tolerar la incomodidad.',
    'No todo lo que construyes tiene que ser perfecto para ser válido.',
    'El progreso visible es lento. El invisible, constante.',
    'No necesitas permiso para construir lo que imaginas.',
    'Cada versión de lo que construyes es mejor que la anterior si aprendes.',
    'No te compares con quien ya llegó. Compárate con quien eras.',
    'Construir requiere también saber qué no construir.',
    'No toda acción construye. Elige bien cuáles haces.',
    'El crecimiento real incomoda antes de liberar.',
    'No tienes que construirlo solo. Pero sí tienes que liderarlo.',
    'Lo que construyes con consistencia supera a lo que construyes con intensidad.',
    'No todo lo que derrumba destruye. Algunas cosas se derrumban para mejorar.',
    'El crecimiento también requiere soltar versiones anteriores de ti.',
    'No tienes que tener todo bajo control para avanzar.',
    'Construir bien hoy es no tener que rehacer mañana.',
    'No toda crítica frena. Algunas aceleran.',
    'El crecimiento sin dirección es solo movimiento.',
    'No tienes que esperar a estar listo. Listo es un estado que nunca llega del todo.',
    'Construir algo nuevo siempre empieza con una decisión incómoda.',
    'El crecimiento real deja evidencia. Búscala.',
    'No tienes que tener el plan completo. Tienes que tener el siguiente paso.',
    'No todo esfuerzo produce crecimiento. El esfuerzo dirigido, sí.',
    'El crecimiento sostenido requiere hábitos más que motivación.',
    'No te midas por lo que aún no tienes. Mídete por lo que ya has construido.',
    'Construir algo que dure requiere paciencia estratégica.',
    'No toda incomodidad es señal de ir mal. A veces es señal de crecer.',
    'El crecimiento también requiere gestionar el miedo, no eliminarlo.',
    'No tienes que construir rápido. Tienes que construir bien.',
    'Cada vez que superas algo, tu techo sube.',
    'No toda resistencia es obstáculo. Algunas son entrenamiento.',
    'El crecimiento real no depende de las circunstancias.',
    'No tienes que hacer todo perfecto para crecer. Solo tienes que hacer.',
    'Construir con propósito claro es construir con ventaja.',
    'No todo lo que construyes tiene que gustar a todos.',
    'El crecimiento no espera al momento perfecto.',
    'No tienes que tener más recursos para empezar. Empieza con lo que tienes.',
  ],
  'crecimiento-sanando': [
    'Sanar no es volver a ser quien eras. Es convertirte en quien puedes ser.',
    'Lo que viviste también te enseñó algo. ¿Ya sabes qué?',
    'El crecimiento a veces duele. Eso no lo hace menos válido.',
    'No tienes que estar bien para avanzar. Puedes avanzar mientras sanas.',
    'Las grietas también son mapa. Muestran por dónde has pasado.',
    'Sanar y crecer no son caminos distintos. Son el mismo.',
    'No tienes que olvidar para seguir.',
    'Lo que superaste ya cambió quién eres.',
    'No hay crecimiento sin algún tipo de pérdida previa.',
    'Sanar también requiere decisión, no solo tiempo.',
    'No tienes que entender todo lo que viviste para crecer con ello.',
    'Lo que rompiste también te mostró de qué estás hecho.',
    'No todo dolor es en vano. Algunos construyen.',
    'Sanar con intención es diferente a sanar por inercia.',
    'No tienes que haber llegado a fondo para empezar a subir.',
    'Lo que hoy pesa, mañana puede ser fortaleza.',
    'No todo lo que perdiste era tuyo para quedarse.',
    'Sanar también es aprender a no repetir.',
    'No tienes que ser el mismo de antes. Puedes ser mejor.',
    'Lo que te costó también te dio perspectiva.',
    'No todo retroceso es fracaso. Algunos son reorganización.',
    'Sanar sin prisa es sanar de verdad.',
    'No tienes que demostrar nada mientras te reconstruyes.',
    'Lo que viviste no te define. Lo que haces con ello, sí.',
    'Sanar también es elegir qué llevar contigo y qué dejar.',
    'No tienes que ser fuerte todo el tiempo para crecer.',
    'Lo que aprendiste en los momentos difíciles no tiene precio.',
    'No todo crecimiento viene de los éxitos.',
    'Sanar también es reconocer el punto de partida sin juzgarlo.',
    'Lo que superaste ya es parte de tu ventaja.',
    'No todo lo que te rompió te destruyó.',
    'Sanar con propósito es convertir la experiencia en recurso.',
    'Lo que no te mató ya lo procesaste. O lo estás procesando.',
    'Sanar también requiere paciencia con uno mismo.',
    'No tienes que justificar tu proceso de recuperación.',
    'Lo que hoy parece cicatriz, mañana puede ser distintivo.',
    'Sanar también es recuperar la confianza en ti.',
    'No tienes que volver a ser quien eras. Puedes ser más.',
    'Lo que viviste también amplió tu capacidad de entender a otros.',
    'Sanar es también redefinir qué significa estar bien.',
    'Lo que te costó llegar hasta aquí también es mérito.',
    'Sanar también es soltar la versión de ti que ya no necesitas.',
    'No tienes que esperar a estar completamente bien para empezar a crecer.',
    'Lo que aprendiste sobre ti en los momentos difíciles vale mucho.',
    'No todo lo que se rompe queda roto para siempre.',
    'Sanar también es aprender a pedirte menos perfección.',
    'Lo que hoy sientes como limitación mañana puede ser profundidad.',
    'Sanar también requiere creer que hay algo al otro lado.',
    'No tienes que saber adónde vas para saber que estás avanzando.',
    'Lo que superaste cambió permanentemente quién eres.',
  ],
  'crecimiento-buscando': [
    'Buscar ya es moverse. Y moverse ya es crecer.',
    'La incomodidad de no saber es donde empieza todo lo bueno.',
    'No necesitas el destino para empezar. Necesitas dirección.',
    'Cada pregunta que te haces te acerca más a quien realmente eres.',
    'La duda no es el problema. La parálisis sí.',
    'Buscar con intención es ya crecer.',
    'No toda búsqueda termina donde esperabas. A veces termina mejor.',
    'El que busca ya tiene algo que muchos no tienen: movimiento.',
    'No tienes que encontrar todo para crecer. A veces basta con buscar bien.',
    'La búsqueda también te define.',
    'No toda incertidumbre es amenaza. Algunas son el inicio de algo grande.',
    'Buscar con honestidad es más valioso que encontrar con trampa.',
    'No tienes que saber exactamente qué buscas para avanzar.',
    'La búsqueda activa genera oportunidades que la pasividad no ve.',
    'No todo lo que no encuentras hoy está perdido.',
    'Buscar también es una forma de comprometerte contigo.',
    'La dirección importa más que la certeza sobre el destino.',
    'No tienes que estar seguro para buscar.',
    'Buscar bien requiere también saber qué no merece tu búsqueda.',
    'No toda pregunta sin respuesta es un fracaso.',
    'La búsqueda honesta siempre revela algo útil.',
    'Buscar activamente es diferente a esperar pasivamente.',
    'No toda búsqueda es lineal. Los rodeos también enseñan.',
    'La pregunta correcta vale más que la respuesta equivocada.',
    'Buscar también requiere tolerar la incertidumbre.',
    'No toda exploración termina en hallazgo. Pero siempre termina en aprendizaje.',
    'La búsqueda con propósito filtra lo que no sirve.',
    'Buscar desde la honestidad es buscar desde la fortaleza.',
    'La curiosidad activa es uno de los recursos más poderosos.',
    'Buscar también es una declaración de que crees que hay algo mejor.',
    'No toda duda te paraliza. Algunas te mueven.',
    'La búsqueda consciente genera crecimiento aunque no encuentres lo que buscas.',
    'No tienes que saber exactamente qué quieres para saber qué no quieres.',
    'Buscar con intención es también respetarte.',
    'La exploración sin miedo es una ventaja enorme.',
    'No tienes que estar perdido para buscar algo mejor.',
    'Buscar también es confiar en que hay algo que encontrar.',
    'La búsqueda también te entrena para cuando encuentres.',
    'Buscar activamente es diferente a estar insatisfecho.',
    'La exploración también requiere soltar lo que ya no sirve.',
    'Buscar con determinación es ya una forma de crecer.',
    'La incertidumbre de buscar es mejor que la certeza de no intentarlo.',
    'Buscar bien es también saber cuándo parar y evaluar.',
    'La búsqueda sin miedo abre puertas que el miedo mantiene cerradas.',
    'Buscar también te da información sobre ti.',
    'La exploración activa genera más oportunidades que la espera pasiva.',
    'No tienes que tener todo resuelto para seguir explorando.',
    'Buscar también es una forma de confiar en que hay algo que encontrar.',
    'No toda búsqueda es sobre encontrar. Algunas son sobre descartarse.',
    'La búsqueda de propósito también te revela quién quieres ser.',
  ],
  'crecimiento-disfrutando': [
    'Celebrar lo que ya tienes no frena el crecimiento. Lo alimenta.',
    'El progreso también se mide en lo que ya no te cuesta.',
    'Has llegado hasta aquí. Eso merece un segundo de reconocimiento.',
    'Crecer no siempre es ir a más. A veces es quedarse con lo esencial.',
    'El mejor punto de partida es saber dónde estás y que está bien.',
    'Disfrutar del camino no es conformismo. Es inteligencia.',
    'No todo crecimiento futuro requiere sacrificar el presente.',
    'Lo que ya lograste también es parte de quien eres.',
    'No tienes que esperar a llegar para disfrutar el avance.',
    'Celebrar los logros pequeños también es estrategia.',
    'No toda satisfacción tiene que esperar a lo grande.',
    'Disfrutar lo que ya eres también es crecer.',
    'No tienes que estar insatisfecho para seguir creciendo.',
    'Lo que disfrutas hoy también te da energía para mañana.',
    'No toda ambición requiere tensión constante.',
    'Disfrutar el proceso también forma parte del resultado.',
    'Lo que has conseguido también merece ser celebrado, no solo superado.',
    'No toda pausa en el crecimiento es retroceso. Algunas son consolidación.',
    'Disfrutar de lo que has construido no te hace menos ambicioso.',
    'Lo que ya eres es también un logro.',
    'No toda alegría tiene que venir del siguiente paso.',
    'Disfrutar consciente del presente también alimenta el futuro.',
    'No tienes que posponer la satisfacción siempre.',
    'Lo que tienes hoy fue lo que querías antes.',
    'No toda ambición requiere sacrificar el disfrute.',
    'Disfrutar también es reconocer el esfuerzo que costó llegar.',
    'No tienes que estar siempre buscando más para ser alguien que crece.',
    'Lo que ya conseguiste también define quién eres.',
    'No toda satisfacción es señal de conformismo.',
    'Disfrutar el camino también es respetar el proceso.',
    'Lo que celebras hoy te da energía para lo que construyes mañana.',
    'No toda alegría hay que ganarla. Algunas ya la tienes.',
    'Disfrutar sin culpa también es crecimiento.',
    'No tienes que sacrificar el presente en nombre del futuro.',
    'Lo que disfrutas en el proceso también es aprendizaje.',
    'Disfrutar también es una señal de que estás en el lugar correcto.',
    'Lo que tienes hoy es también el fruto de decisiones pasadas.',
    'Disfrutar de lo que has construido es también motivación.',
    'No tienes que estar siempre en tensión para crecer.',
    'Lo que celebras también refuerza lo que quieres repetir.',
    'Disfrutar el presente también es confiar en el futuro.',
    'No tienes que llegar a ningún lado especial para estar bien ahora.',
    'Lo que disfrutas hoy también es lo que recuerdas mañana.',
    'Disfrutar también requiere atención. No se da solo.',
    'No tienes que posponer la vida en nombre del crecimiento.',
    'Lo que ya eres ya vale. Lo que serás también.',
    'Disfrutar también es parte del crecimiento.',
    'No tienes que esperar a merecer el disfrute. Ya lo mereces.',
    'Lo que tienes ahora también es suficiente para estar bien.',
    'Disfrutar bien lo que hay también es una habilidad.',
  ],
  'conexion-construyendo': [
    'Lo que construyes con otros tiene más peso que lo que construyes solo.',
    'Las mejores ideas no viven en una sola cabeza.',
    'Construir relaciones también es estrategia.',
    'Lo que haces resuena en quienes te rodean. Úsalo bien.',
    'La colaboración no es debilidad. Es multiplicación.',
    'No todo se construye mejor solo.',
    'Las personas correctas aceleran lo que construyes.',
    'No toda ayuda recibida te hace menos.',
    'Construir con otros también te construye a ti.',
    'Las relaciones también son infraestructura.',
    'No tienes que hacerlo todo tú para que sea tuyo.',
    'Construir con las personas correctas cambia el resultado.',
    'No toda colaboración es perder control. Algunas es ganar potencia.',
    'Las conversaciones correctas también construyen.',
    'No tienes que ir solo para llegar lejos.',
    'Construir con otros requiere también saber ceder.',
    'No toda diferencia de opinión frena. Algunas mejoran lo que construyes.',
    'Las personas que suman también hay que cuidarlas.',
    'Construir relaciones sólidas es también construir futuro.',
    'No tienes que tener todo el conocimiento si tienes las personas correctas.',
    'Las conexiones correctas abren puertas que el esfuerzo solo no puede.',
    'Construir con confianza es construir más rápido.',
    'No tienes que demostrarte a ti mismo haciendo todo solo.',
    'Las mejores cosas que se construyen tienen más de una mente detrás.',
    'Construir con personas que te desafían es construir mejor.',
    'No tienes que proteger cada idea. Compartir también construye.',
    'Las relaciones también se construyen. No aparecen solas.',
    'Construir también es saber a quién llamar.',
    'Las personas que creen en lo que construyes también lo hacen crecer.',
    'No toda crítica de quien te rodea hay que ignorarla.',
    'Construir en comunidad genera más que construir en aislamiento.',
    'Las conexiones que cuidas también te cuidan.',
    'Construir con otros también te enseña sobre ti.',
    'Las personas correctas a tu lado cambian lo que es posible.',
    'No toda colaboración es igual. Elige bien con quién construyes.',
    'Construir relaciones también requiere inversión constante.',
    'Las conexiones que nutres también nutren lo que construyes.',
    'Construir con personas que complementan lo que no tienes es inteligencia.',
    'Las personas que aparecen en tu camino también son parte de lo que construyes.',
    'Construir también requiere saber a quién dejar entrar.',
    'Las mejores construcciones tienen historia de colaboración detrás.',
    'No toda soledad en el proceso es señal de que algo va mal.',
    'Lo que construyes con otros dura más que lo que construyes solo.',
    'Construir desde la confianza en otros también es construir desde la fortaleza.',
    'Las personas que comparten tu visión también aceleran lo que construyes.',
    'No toda dependencia de otros es debilidad. Algunas es sabiduría.',
    'Construir también es aprender a delegar bien.',
    'Las relaciones que construyes también son parte de tu legado.',
    'No todo equipo funciona. Pero el correcto cambia todo.',
    'Construir con intención también aplica a las relaciones que eliges.',
  ],
  'conexion-sanando': [
    'Dejarte ayudar también es un acto de valentía.',
    'No tienes que sanar en silencio.',
    'Las personas correctas no te juzgan por tus grietas.',
    'Compartir lo que pesa no es carga. Es confianza.',
    'La conexión real cura lo que el tiempo solo no puede.',
    'No toda vulnerabilidad es debilidad. Algunas son puentes.',
    'Sanar con apoyo es más rápido y más profundo.',
    'No tienes que proteger a todos de lo que sientes.',
    'Las personas que se quedan cuando estás mal son las que importan.',
    'Dejarte ver también es sanar.',
    'No tienes que tener todo resuelto antes de conectar.',
    'Las conversaciones honestas también sanan.',
    'No toda conexión es igual. Las correctas suman.',
    'Sanar también es aprender a recibir.',
    'No tienes que demostrar que estás bien para ser querido.',
    'Las relaciones que te permiten ser quien eres también sanan.',
    'Sanar con otros cambia la calidad del proceso.',
    'No tienes que ser fuerte delante de todos.',
    'Las conexiones que cuidas también te cuidan cuando lo necesitas.',
    'No toda apertura es riesgo. Algunas son liberación.',
    'Sanar también requiere dejarse querer.',
    'No tienes que cargar solo con todo para ser válido.',
    'Las personas que te ven en el proceso también forman parte de la sanación.',
    'Sanar con la mirada de alguien que cree en ti acelera el proceso.',
    'No tienes que estar bien para conectar. Puedes conectar mientras sanas.',
    'Las relaciones que sobreviven a los momentos difíciles son las reales.',
    'Sanar también es aprender qué personas te hacen bien.',
    'No tienes que justificar tu necesidad de apoyo.',
    'Las conversaciones que curan también son actos de amor.',
    'Sanar también es confiar en que hay personas que quieren ayudarte.',
    'Las relaciones sanas también se construyen desde la vulnerabilidad.',
    'Sanar en comunidad es más sostenible que sanar en solitario.',
    'Las personas que te ven sanar también crecen contigo.',
    'Sanar también es redescubrir que no estás solo.',
    'No tienes que resolver todo antes de pedir ayuda.',
    'Sanar también es aprender a confiar de nuevo.',
    'No tienes que cargar con todo para demostrar que puedes.',
    'Las personas correctas a tu lado hacen que el proceso duela menos.',
    'Sanar también es permitirte ser visto sin filtros.',
    'No tienes que estar entero para conectar con alguien.',
    'Las personas que te aceptan en proceso también son las que importan.',
    'Sanar también pasa por reconocer quién está contigo de verdad.',
    'No toda soledad en el proceso de sanar es necesaria.',
    'Sanar también es recuperar la confianza en que mereces apoyo.',
    'Las personas que se quedan cuando no tienes nada que dar también son reales.',
    'No toda ayuda llega como esperabas. A veces llega mejor.',
    'Sanar también es aprender a pedir lo que necesitas.',
    'Las conexiones que nutres también te nutren cuando lo necesitas.',
    'No toda conexión que buscas cuando estás mal es dependencia.',
    'Sanar también es descubrir que no tienes que hacerlo todo solo.',
  ],
  'conexion-buscando': [
    'A veces lo que buscas ya está en una conversación que aún no tuviste.',
    'Las personas que aparecen no siempre son casualidad.',
    'Buscar junto a otros es más rico que buscar en soledad.',
    'El otro a veces ve en ti lo que tú aún no ves.',
    'Preguntar también es una forma de conectar.',
    'No toda búsqueda necesita ser solitaria.',
    'Las personas correctas también te ayudan a encontrar lo que buscas.',
    'Buscar con otros multiplica las perspectivas.',
    'Las conversaciones correctas también revelan lo que buscas.',
    'No tienes que encontrar solo para que el hallazgo sea tuyo.',
    'Buscar también es estar abierto a lo que llega.',
    'Las personas con las que conectas también definen lo que encuentras.',
    'No tienes que buscar en soledad lo que otros también están buscando.',
    'Buscar conexión también es buscar crecimiento.',
    'Las relaciones que buscas también te están buscando.',
    'Buscar con apertura genera más que buscar con esquemas rígidos.',
    'Las personas que aparecen en tu búsqueda también son parte del hallazgo.',
    'No tienes que saber exactamente qué buscas para reconocerlo cuando llegue.',
    'Buscar también requiere estar dispuesto a ser encontrado.',
    'Las conversaciones inesperadas también revelan lo que buscas.',
    'No tienes que buscar lejos lo que puede estar cerca.',
    'Buscar con los demás también te muestra quién eres.',
    'Las personas correctas también aparecen cuando estás en movimiento.',
    'No tienes que estar solo en la búsqueda.',
    'Buscar con apertura a las personas también es buscar con inteligencia.',
    'No toda conexión se encuentra. Algunas se construyen.',
    'Las relaciones que buscas también se alimentan de lo que das.',
    'Buscar también es estar presente en los lugares correctos.',
    'Las personas que te encuentran cuando buscas también tienen algo que enseñarte.',
    'Buscar también implica estar dispuesto a que te sorprendan.',
    'Las personas que aparecen cuando buscas no siempre son las que buscabas.',
    'Buscar también es una forma de confiar en que hay algo que encontrar.',
    'No toda conexión que buscas está en los lugares que conoces.',
    'Buscar con otros también te hace más visible para lo que buscas.',
    'Las conversaciones que no planeas también son parte de la búsqueda.',
    'Buscar junto a otros también acelera lo que encuentras.',
    'Las personas que te rodean también son parte de lo que buscas.',
    'No tienes que buscar en silencio si hay alguien que puede ayudarte.',
    'Buscar también es confiar en que lo que encuentres valdrá la pena.',
    'Las conexiones que haces mientras buscas también son hallazgos.',
    'No toda búsqueda solitaria es la más efectiva.',
    'Buscar con otros también multiplica lo que puedes encontrar.',
    'Las conversaciones que buscas también te cambian.',
    'Buscar también implica estar dispuesto a cambiar lo que buscas.',
    'Las personas que conectan contigo cuando buscas también buscan algo.',
    'No tienes que tener todo claro para buscar conexión.',
    'Buscar con otros también te da perspectivas que solo no tendrías.',
    'Las personas que te acompañan en la búsqueda también son parte del hallazgo.',
    'No toda búsqueda de conexión necesita estrategia.',
    'Buscar también es declarar que crees que hay algo mejor.',
  ],
  'conexion-disfrutando': [
    'Los momentos con las personas correctas no se recuperan. Están ahora.',
    'La presencia es el regalo más escaso que puedes dar.',
    'Estar aquí, con quien importa, ya es suficiente.',
    'La alegría compartida no se divide. Se multiplica.',
    'Hoy, solo por esto, ya fue un buen día.',
    'No toda felicidad es solitaria. Las mejores suelen ser compartidas.',
    'Las personas que te hacen bien también merecen tu presencia real.',
    'Los momentos ordinarios con personas extraordinarias son los que más recuerdas.',
    'No toda celebración necesita ser grande.',
    'Disfrutar con otros también es un acto de generosidad.',
    'Las risas compartidas también son infraestructura de las relaciones.',
    'Disfrutar de las personas que tienes también es gratitud.',
    'No tienes que esperar a una ocasión especial para estar presente.',
    'Los momentos con quienes quieres también te definen.',
    'Disfrutar con otros también te recuerda quién eres.',
    'No tienes que planificar los mejores momentos. Algunos solo pasan.',
    'Las personas que te alegran también merecen saber que lo hacen.',
    'Disfrutar de las personas que tienes es también cuidarlas.',
    'No tienes que esperar a tener tiempo para estar presente.',
    'Los momentos de conexión real también recargan.',
    'Disfrutar con quien quieres también es una elección.',
    'Las conversaciones que te hacen bien también son combustible.',
    'Disfrutar del presente con quien importa es también futuro.',
    'Las personas con las que ríes también te cuidan sin que lo notes.',
    'Disfrutar de lo que tienes, con quien tienes, es suficiente.',
    'Los momentos de conexión real compensan muchos momentos difíciles.',
    'Disfrutar con otros también te recuerda que no estás solo.',
    'Las personas que disfrutas también merecen tu atención real.',
    'Disfrutar también es estar disponible para quienes quieres.',
    'Las conexiones que cuidas también son las que más disfrutas.',
    'Disfrutar de las personas que tienes también es invertir en ti.',
    'Los momentos sencillos con personas reales son los más valiosos.',
    'Disfrutar con quien quieres también es una forma de agradecerles.',
    'Los mejores momentos raramente se planifican. Se reconocen.',
    'Disfrutar juntos también construye.',
    'Las personas que te hacen sentir bien también merecen que se lo digas.',
    'Disfrutar también es elegir con quién pasas el tiempo.',
    'Las conexiones que celebras también se fortalecen.',
    'Disfrutar con otros también es una forma de cuidar esas relaciones.',
    'Las personas que te acompañan en los momentos buenos también importan.',
    'Disfrutar del presente con quien quieres también es una decisión.',
    'No tienes que ir a ningún lado especial para tener los mejores momentos.',
    'Las conexiones reales también se disfrutan en lo cotidiano.',
    'No toda alegría compartida necesita futuro para tener valor hoy.',
    'Disfrutar también es una señal de que estás en el lugar correcto.',
    'Los momentos con quienes quieres son los que más recuerdas.',
    'Disfrutar también requiere presencia real, no solo física.',
    'Las personas que están contigo en los momentos buenos también importan.',
    'No toda conexión que disfrutas necesita análisis.',
    'Disfrutar con otros también te da energía para lo que viene.',
  ],
  'proposito-construyendo': [
    'Lo que haces tiene sentido aunque todavía no veas el cuadro completo.',
    'Construir con propósito es diferente a construir con prisa.',
    'Cada acción pequeña con intención suma más de lo que parece.',
    'El propósito no se encuentra. Se construye, decisión a decisión.',
    'Lo que estás levantando va más allá de ti. Eso importa.',
    'No todo lo que construyes con propósito tiene éxito inmediato.',
    'El por qué detrás de lo que construyes también es parte del resultado.',
    'No tienes que ver el final para saber que vale la pena construir.',
    'Construir con sentido también atrae a las personas correctas.',
    'El propósito claro también actúa como filtro de lo que no merece tu energía.',
    'No tienes que explicarle a todos por qué construyes lo que construyes.',
    'Construir algo con sentido también te sostiene cuando es difícil.',
    'El propósito también se prueba en los momentos difíciles.',
    'No tienes que tener el propósito completamente definido para empezar.',
    'Construir desde el para qué es más sostenible que construir desde el qué.',
    'El sentido de lo que haces también afecta cómo lo haces.',
    'No tienes que convencer a todos de tu propósito para que sea válido.',
    'Construir con intención también genera más energía que construir por inercia.',
    'El propósito también se refina con el tiempo y la experiencia.',
    'Construir también es descubrir para qué sirve lo que estás construyendo.',
    'El sentido que le das a lo que construyes también lo hace más sólido.',
    'Construir con propósito también requiere revisar si el propósito sigue siendo tuyo.',
    'El propósito también se construye haciendo.',
    'Construir desde el sentido también genera más resistencia ante los obstáculos.',
    'El propósito también cambia. Y está bien.',
    'Construir con sentido también es construir con identidad.',
    'El para qué de lo que construyes también es parte de la estrategia.',
    'No tienes que justificar tu propósito ante nadie.',
    'Construir también es descubrir qué te importa realmente.',
    'El propósito sostenido también requiere revisiones periódicas.',
    'Construir con sentido también requiere coraje para no desviarte.',
    'El sentido de lo que construyes también define cómo lo construyes.',
    'No tienes que tener todo claro para saber que lo que haces importa.',
    'Construir con propósito es también construir con honestidad.',
    'No todo lo que construyes tiene que tener impacto masivo para tener sentido.',
    'El propósito claro hace más fácil decir que no a lo que no encaja.',
    'Construir con sentido también te da más energía para los días difíciles.',
    'El sentido también se encuentra en el proceso, no solo en el resultado.',
    'Construir con propósito también requiere honestidad sobre lo que realmente quieres.',
    'El propósito también se fortalece cada vez que actúas en coherencia con él.',
    'Construir con sentido también es más sostenible a largo plazo.',
    'El para qué también es lo que te sostiene cuando el cómo se complica.',
    'Construir con propósito claro también te hace más resiliente.',
    'No toda dificultad en el camino invalida el propósito.',
    'El propósito también requiere ser revisado cuando las circunstancias cambian.',
    'Construir con intención también genera más satisfacción en el proceso.',
    'El propósito también vive en cómo tratas lo que ya tienes.',
    'Construir también es una declaración de en qué crees.',
    'No toda construcción tiene sentido desde el inicio. Algunas lo van encontrando.',
    'El propósito también se expresa en lo que decides no construir.',
  ],
  'proposito-sanando': [
    'Lo que viviste no fue en vano si lo conviertes en dirección.',
    'Sanar también es descubrir qué es lo que realmente importa.',
    'Tu historia, con todo lo que tiene, es única. Úsala.',
    'Del dolor también nace la claridad sobre lo esencial.',
    'Volver a ti es el primer paso hacia cualquier propósito real.',
    'No tienes que haber tenido todo claro antes para encontrar propósito ahora.',
    'Sanar también revela para qué estás aquí.',
    'No toda herida bloquea el propósito. Algunas lo definen.',
    'Lo que superaste también es parte de tu capacidad única.',
    'Sanar también es recuperar la conexión con lo que te importa.',
    'No toda pérdida te aleja del propósito. Algunas te acercan.',
    'Lo que viviste también amplió tu capacidad de ayudar a otros.',
    'Sanar también es recuperar la energía para lo que importa.',
    'Lo que te costó llegar hasta aquí también es parte de tu propósito.',
    'Sanar también es descubrir que tienes algo que ofrecer.',
    'No toda herida bloquea. Algunas son el origen de tu mayor contribución.',
    'Lo que viviste también te dio perspectiva que otros no tienen.',
    'Sanar también es encontrar el para qué de lo que pasó.',
    'Lo que has superado también es evidencia de tu capacidad.',
    'Sanar también es recuperar la confianza en lo que puedes hacer.',
    'Lo que viviste también es parte de lo que te hace único.',
    'Lo que superaste también es la base de lo que puedes construir.',
    'Sanar también es recuperar el sentido de lo cotidiano.',
    'Lo que has pasado también ha construido quién eres hoy.',
    'Sanar también es recuperar la capacidad de imaginar lo que viene.',
    'Lo que viviste también puede ser la razón por la que algo que haces importa.',
    'Sanar también es descubrir que el dolor también puede tener dirección.',
    'Lo que has superado también es evidencia de que puedes superar lo que viene.',
    'Sanar con propósito es convertir la experiencia en recurso.',
    'Sanar también es recuperar la capacidad de confiar en el futuro.',
    'Lo que superaste cambió permanentemente quién eres.',
    'Sanar también pasa por reconocer el valor de lo que ya recorriste.',
    'Lo que viviste también puede ser combustible, no solo peso.',
    'Sanar también es aprender que mereces estar bien y hacer algo con ello.',
    'Lo que te costó también te enseñó lo que vale la pena.',
    'Sanar también es encontrar qué quieres proteger a partir de ahora.',
    'Lo que has superado también define lo que puedes ofrecer.',
    'Sanar también es redescubrir qué te mueve de verdad.',
    'No tienes que haber tenido un origen fácil para tener un destino significativo.',
    'Lo que viviste también amplió tu capacidad de entender lo esencial.',
    'Sanar también es recuperar las ganas de construir algo.',
    'No toda herida necesita explicación para generar propósito.',
    'Lo que viviste también te dio herramientas que otros no tienen.',
    'Sanar también es recuperar la confianza en tu propia voz.',
    'No toda experiencia difícil carece de sentido.',
    'Lo que has superado también define lo que ya no te asusta.',
    'Sanar también es aprender a ver tu historia sin vergüenza.',
    'No tienes que convertir todo el dolor en propósito. Pero puedes elegir.',
    'Lo que viviste también es parte de tu capacidad de entender a otros.',
    'Sanar también es recuperar la curiosidad por lo que viene.',
  ],
  'proposito-buscando': [
    'El propósito no siempre llega claro. A veces es solo una dirección.',
    'Buscar sentido ya es vivir con más profundidad que la mayoría.',
    'No tengas prisa. Las respuestas importantes no se apuran.',
    'La pregunta más importante no es adónde vas, sino por qué.',
    'Estás más cerca de lo que crees. Presta atención.',
    'No toda búsqueda de propósito termina en revelación. A veces termina en claridad gradual.',
    'Buscar el para qué también es honrarte.',
    'La búsqueda de sentido también te cambia mientras buscas.',
    'Buscar el propósito con honestidad es ya una forma de vivir con intención.',
    'La búsqueda de sentido también te muestra qué no es para ti.',
    'Buscar el para qué también requiere escucharte.',
    'La búsqueda de propósito también es una búsqueda de ti.',
    'No toda claridad de propósito llega antes de actuar. Algunas llega actuando.',
    'Buscar el sentido también requiere tolerar la incertidumbre.',
    'La búsqueda honesta de sentido también genera respeto propio.',
    'Buscar el para qué también es lo que diferencia una vida elegida de una vivida por inercia.',
    'La búsqueda de sentido también requiere soltar lo que no es tuyo.',
    'Buscar el para qué también implica revisar qué ya no tiene sentido.',
    'La búsqueda de propósito también te enseña sobre lo que valoras.',
    'Buscar también es descartar. Y descartar también es avanzar.',
    'No tienes que tener el propósito definitivo para vivir con más intención hoy.',
    'La búsqueda de sentido también requiere honestidad sobre qué te mueve realmente.',
    'Buscar el para qué también requiere paciencia con uno mismo.',
    'La búsqueda de sentido también es una forma de respetarte.',
    'Buscar el para qué también requiere estar dispuesto a cambiar.',
    'La búsqueda de sentido también genera energía cuando la encuentras.',
    'Buscar el para qué también te ayuda a tomar mejores decisiones.',
    'La búsqueda de propósito también es una declaración de que te importas.',
    'No toda búsqueda de sentido necesita un final claro para tener valor.',
    'Buscar el propósito también requiere soltar el que ya no encaja.',
    'La búsqueda de sentido también te hace más claro en lo que priorizas.',
    'No tienes que tener el propósito perfecto para empezar a actuar con sentido.',
    'Buscar también requiere saber qué no vale la pena buscar.',
    'La búsqueda de propósito también requiere revisar qué das por hecho.',
    'Buscar el para qué con honestidad también requiere valentía.',
    'La búsqueda consciente de sentido también te da más claridad en lo cotidiano.',
    'No tienes que saber el destino para saber qué dirección tiene más sentido.',
    'Buscar propósito también es buscar coherencia entre lo que haces y lo que valoras.',
    'La búsqueda de sentido también requiere tiempo sin ruido.',
    'Buscar el para qué también requiere escuchar lo que no te atreves a decirte.',
    'La búsqueda de propósito también te conecta con lo esencial.',
    'Buscar sentido también requiere confiar en que hay algo que encontrar.',
    'La búsqueda honesta de propósito también genera movimiento.',
    'Buscar el para qué también es lo más humano que puedes hacer.',
    'La búsqueda de propósito también te revela quién quieres ser.',
    'No toda duda sobre el propósito es señal de que vas mal.',
    'Buscar el para qué sin prisa es buscar con más profundidad.',
    'La búsqueda de sentido también requiere soltar las respuestas que ya no encajan.',
    'Buscar propósito también es una forma de comprometerte contigo.',
    'No toda incertidumbre sobre el propósito es vacío. Algunas es espacio.',
  ],
  'proposito-disfrutando': [
    'Vivir bien también es un propósito. No lo subestimes.',
    'El sentido a veces está en lo ordinario, no en lo extraordinario.',
    'Hacer bien las cosas pequeñas también cuenta.',
    'Tener claro lo que valoras y vivir acorde a ello. Eso es propósito.',
    'Hoy tienes todo lo que necesitas para vivir con intención.',
    'No toda vida con propósito es dramática. Algunas son tranquilas y plenas.',
    'Disfrutar de lo que tienes con intención también es propósito.',
    'El propósito también puede ser disfrutar plenamente lo que ya tienes.',
    'Disfrutar con consciencia también es vivir con propósito.',
    'El sentido también se encuentra en lo cotidiano bien vivido.',
    'Disfrutar de lo que construiste también es parte del propósito.',
    'El propósito también puede ser vivir bien y con plenitud.',
    'Disfrutar del presente con intención también es vivir con propósito.',
    'El propósito también se expresa en cómo disfrutas lo que tienes.',
    'Disfrutar de lo que eres y de lo que tienes también es intencional.',
    'El sentido también puede estar en la calidad de lo cotidiano.',
    'Disfrutar con consciencia también genera sentido.',
    'El propósito también puede ser simple y profundo a la vez.',
    'Disfrutar plenamente también es una forma de agradecer.',
    'El sentido también vive en los momentos que decides valorar.',
    'Disfrutar de lo que has construido también tiene sentido.',
    'El propósito también se expresa en la calidad de tu presencia.',
    'Disfrutar también es un acto de propósito cuando es consciente.',
    'El propósito también puede ser estar bien y hacer que otros estén bien.',
    'Disfrutar de lo que tienes con plena consciencia también es propósito.',
    'El sentido también está en elegir disfrutar lo que ya tienes.',
    'Disfrutar plenamente también es una forma de vivir con intención.',
    'El propósito también puede ser crear momentos de alegría y conexión.',
    'No toda vida con sentido es heroica. Algunas son simplemente plenas.',
    'Disfrutar también requiere atención. No se da solo.',
    'El propósito también vive en cómo tratas lo que ya tienes.',
    'Disfrutar bien lo que hay también es una habilidad.',
    'No toda vida con propósito necesita cambiar el mundo.',
    'El sentido también puede ser pequeño y cotidiano y completamente tuyo.',
    'Disfrutar de la vida que has construido también es honrarla.',
    'No tienes que buscar más propósito si ya vives con el tuyo.',
    'El propósito también se encuentra en elegir bien cómo disfrutas.',
    'Disfrutar también es una forma de decir que esto vale la pena.',
    'No toda vida con propósito requiere sacrificio constante.',
    'El sentido también está en lo que proteges y cuidas.',
    'Disfrutar consciente también es vivir alineado con lo que valoras.',
    'No tienes que estar siempre construyendo para vivir con sentido.',
    'El propósito también puede ser la calidad de tu presencia con otros.',
    'Disfrutar también es una señal de que estás en el lugar correcto.',
    'No toda ambición necesita sacrificar el disfrute.',
    'El propósito también vive en los momentos que eliges vivir plenamente.',
    'Disfrutar sin culpa también es coherencia con lo que valoras.',
    'No tienes que esperar a merecer el disfrute si ya vives con intención.',
    'El sentido también se construye en los momentos ordinarios.',
    'Disfrutar de lo que ya eres también es propósito.',
  ],
  'default': [
    'Tienes más claridad de la que crees. Solo necesitas parar un segundo.',
    'La siguiente decisión no tiene que ser perfecta. Solo tiene que ser tuya.',
    'Foco. No en todo. En lo que importa.',
    'Haz menos cosas, pero hazlas de verdad.',
    'La dirección importa más que la velocidad.',
    'No toda acción suma. Elige cuáles importan.',
    'El ruido no es señal de progreso.',
    'Parar a pensar también es avanzar.',
    'No tienes que tener todo claro para empezar.',
    'Lo que haces con constancia supera a lo que haces con intensidad.',
    'No toda urgencia es real.',
    'El foco es escaso. Úsalo bien.',
    'No tienes que responder a todo.',
    'Lo importante raramente grita. Suele susurrar.',
    'No toda opinión merece tu energía.',
    'El progreso lento también es progreso.',
    'No tienes que justificar cada decisión.',
    'Lo que no haces también define quién eres.',
    'No toda información es útil. Filtra.',
    'El tiempo que dedicas a lo que importa también se nota.',
  ],
}

const HISTORIAL_KEY = 'pepper_historial'
const MAX_HISTORIAL = 15

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

  // Cargar historial
  let historial: string[] = []
  try { historial = JSON.parse(localStorage.getItem(HISTORIAL_KEY) || '[]') } catch {}

  // Filtrar frases que no han salido recientemente
  const disponibles = lista.filter(f => !historial.includes(f))
  const pool = disponibles.length > 0 ? disponibles : lista

  // Elegir aleatoriamente del pool disponible
  const elegida = pool[Math.floor(Math.random() * pool.length)]

  // Guardar en historial
  historial.push(elegida)
  if (historial.length > MAX_HISTORIAL) historial = historial.slice(-MAX_HISTORIAL)
  try { localStorage.setItem(HISTORIAL_KEY, JSON.stringify(historial)) } catch {}

  return elegida
}

type Perfil = { nombre: string; personalidad: string; busqueda: string; momento: string; tono: string }
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
      return { ...prev, [id]: actual.includes(op) ? actual.filter(o => o !== op) : [...actual, op] }
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
      setMensaje(getMensaje(p.busqueda, p.momento))
      setPantalla('mensaje')
      setTimeout(() => setVisible(true), 100)
    }
  }

  const nuevoMensaje = () => {
    if (!perfil) return
    setVisible(false)
    setTimeout(() => { setMensaje(getMensaje(perfil.busqueda, perfil.momento)); setVisible(true) }, 400)
  }

  const resetear = () => {
    if (!confirm('¿Seguro que quieres empezar de nuevo?')) return
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(HISTORIAL_KEY)
    setPerfil(null); setPaso(0); setRespuestas({}); setNombreInput(''); setVisible(false)
    setPantalla('bienvenida')
  }

  const q = PREGUNTAS[paso]

  return (
    <main style={{ background: '#00000c', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: "'Inner Tight', sans-serif" }}>
      <div style={{ width: '100%', maxWidth: '420px', textAlign: 'center' }}>

        {/* BIENVENIDA */}
        {pantalla === 'bienvenida' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            {/* Logo SVG Pepper */}
            <svg viewBox="0 0 320 80" width="220" xmlns="http://www.w3.org/2000/svg">
              <text x="10" y="68" fontFamily="'Arial Black', sans-serif" fontWeight="900" fontSize="72" fill="#ed0000" letterSpacing="-2">PEPPER.</text>
            </svg>
            <p style={{ color: '#f2f0e6', fontSize: '0.9rem', lineHeight: '1.7', letterSpacing: '0.03em', fontFamily: "'Libre Baskerville', serif", opacity: 0.8 }}>
              Antes de hablarte,<br />quiero conocerte.
            </p>
            <button onClick={() => setPantalla('preguntas')} style={{
              background: '#ed0000', border: 'none', color: '#ffffff',
              padding: '0.85rem 2.5rem', fontSize: '0.7rem', letterSpacing: '0.25em',
              textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'Inner Tight', sans-serif",
              fontWeight: 700
            }}>
              Vamos
            </button>
          </div>
        )}

        {/* PREGUNTAS */}
        {pantalla === 'preguntas' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.75rem' }}>
            {/* Progreso */}
            <div style={{ display: 'flex', gap: '6px' }}>
              {PREGUNTAS.map((_, i) => (
                <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: i < paso ? '#ed0000' : '#333' }} />
              ))}
            </div>

            <p style={{ color: '#f2f0e6', fontSize: '1.4rem', fontFamily: "'Libre Baskerville', serif", fontWeight: 400, lineHeight: 1.5, minHeight: '60px' }}>
              {q.texto}
            </p>

            {q.tipo === 'texto' ? (
              <input autoFocus value={nombreInput}
                onChange={e => setNombreInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && siguiente()}
                placeholder={q.placeholder}
                style={{
                  width: '100%', background: 'none', border: 'none', borderBottom: '1px solid #ed0000',
                  color: '#f2f0e6', fontSize: '1.4rem', textAlign: 'center', padding: '0.5rem',
                  outline: 'none', fontFamily: "'Libre Baskerville', serif"
                }}
              />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', width: '100%' }}>
                {q.ops!.map(op => {
                  const sel = (respuestas[q.id] || []).includes(op)
                  return (
                    <button key={op} onClick={() => toggleOpcion(q.id, op)} style={{
                      background: sel ? '#ed0000' : 'transparent',
                      border: `1px solid ${sel ? '#ed0000' : '#333'}`,
                      color: sel ? '#ffffff' : '#f2f0e6',
                      padding: '0.75rem 1.25rem', fontSize: '0.8rem', letterSpacing: '0.05em',
                      textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s',
                      fontFamily: "'Inner Tight', sans-serif"
                    }}>
                      {op}
                    </button>
                  )
                })}
              </div>
            )}

            <button onClick={siguiente} style={{
              background: 'transparent', border: '1px solid #ed0000', color: '#ed0000',
              padding: '0.75rem 2.5rem', fontSize: '0.7rem', letterSpacing: '0.25em',
              textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'Inner Tight', sans-serif",
              fontWeight: 700, marginTop: '0.5rem'
            }}>
              Continuar
            </button>
          </div>
        )}

        {/* MENSAJE */}
        {pantalla === 'mensaje' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.75rem' }}>
            <svg viewBox="0 0 320 80" width="160" xmlns="http://www.w3.org/2000/svg">
              <text x="10" y="68" fontFamily="'Arial Black', sans-serif" fontWeight="900" fontSize="72" fill="#ed0000" letterSpacing="-2">PEPPER.</text>
            </svg>

            <p style={{ color: '#9d0000', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontFamily: "'Inner Tight', sans-serif" }}>
              {perfil?.nombre}
            </p>

            <p style={{
              color: '#f2f0e6', fontSize: '1.35rem', fontFamily: "'Libre Baskerville', serif",
              fontStyle: 'italic', lineHeight: 1.7, opacity: visible ? 1 : 0,
              transition: 'opacity 1.2s ease', minHeight: '80px'
            }}>
              {mensaje}
            </p>

            <div style={{ width: '32px', height: '1px', background: '#ed0000' }} />

            <button onClick={resetear} style={{
              background: 'none', border: 'none', color: '#333', fontSize: '0.65rem',
              letterSpacing: '0.1em', cursor: 'pointer', marginTop: '1rem',
              fontFamily: "'Inner Tight', sans-serif", textDecoration: 'underline'
            }}>
              Empezar de nuevo
            </button>
          </div>
        )}

      </div>
    </main>
  )
}
