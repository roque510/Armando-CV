import type { Article } from "../types";

const cacheCode = `// Semantic cache: reuse an answer if a close-enough prompt exists.
async function cachedComplete(prompt: string) {
  const embedding = await embed(prompt);
  const hit = await vectors.search(embedding, { threshold: 0.96 });
  if (hit) return hit.answer;          // $0 — served from cache

  const answer = await complete(prompt);
  await vectors.put(embedding, answer);
  return answer;
}`;

const routerCode = `type Tier = "local" | "small" | "frontier";

const MODELS: Record<Tier, string> = {
  local:    "llama3:8b",        // $0, runs on our box
  small:    "gpt-4o-mini",
  frontier: "gpt-4o",
};

async function route(task: Task): Promise<Tier> {
  if (task.kind === "classify" || task.kind === "extract") return "local";
  if (task.tokens < 800 && !task.needsReasoning) return "small";
  return "frontier";
}`;

const article: Article = {
  slug: "cutting-llm-costs",
  en: {
    title: "Cutting LLM costs 60% without dumbing your product down",
    dek: "The model bill is a feature, not a fixed cost. Here's the playbook I use to keep an AI feature cheap once real users show up — caching, routing, and right-sizing — with none of the quality cliff.",
    blocks: [
      { t: "p", text: "The demo was cheap. The launch was not. That's the story of almost every AI feature I've shipped — a slick prototype that costs cents, followed by a production bill that scales linearly with success. The good news: most of that spend is avoidable, and trimming it rarely means a worse product. After doing this across a couple of products, I land in roughly the same place: **about 60% lower cost for output users can't tell apart.**" },
      { t: "p", text: "There's no single trick. It's three habits, stacked." },
      { t: "h2", text: "1. Cache aggressively — most prompts repeat" },
      { t: "p", text: "The cheapest token is the one you never send. In real usage, a surprising share of requests are near-duplicates: the same FAQ phrased three ways, the same document summarized twice, the same system prompt with a tiny variable swapped. A cache keyed on the normalized prompt collapses all of that into one paid call." },
      { t: "p", text: "Start with an exact-match cache — it's trivial and it works more than you'd think. Then add a **semantic cache**: embed the incoming prompt, and if it's within a similarity threshold of something you've answered, serve the stored response." },
      { t: "code", file: "llm/cache.ts", lang: "ts", code: cacheCode },
      { t: "p", text: "One caution: a semantic cache is a quality knob, not just a cost knob. Set the threshold too loose and you'll serve a stale answer to a subtly different question. I keep it conservative (0.95–0.97 cosine) and exclude anything time-sensitive." },
      { t: "h2", text: "2. Route requests to the smallest model that can do the job" },
      { t: "p", text: "Not every request deserves your most expensive model. Classifying intent, extracting a field, formatting JSON, answering a simple lookup — a small or local model nails these for a fraction of the price. Reserve the frontier model for genuinely hard reasoning." },
      { t: "p", text: "The pattern is a cheap **router** in front of your models. A tiny classifier (often a small local model via Ollama) decides the tier, and only the hard tier hits the premium API." },
      { t: "code", file: "llm/router.ts", lang: "ts", code: routerCode },
      { t: "callout", text: "**Measure before you route.** Log per-task quality (a thumbs signal or an eval set) _before_ downgrading a model. The win is only real if the cheaper tier holds quality — otherwise you've traded dollars for support tickets." },
      { t: "h2", text: "3. Right-size context — you're paying per token, both ways" },
      { t: "p", text: 'The third lever is the prompt itself. Teams stuff entire documents into context "just in case," then pay for every token on input _and_ watch latency climb. Retrieval fixes this: pull the few chunks that actually matter and leave the rest on disk.' },
      {
        t: "ul",
        items: [
          "**Trim the system prompt.** Long instructions get paid for on every single call. Move stable rules into a fine-tune or a terse, well-tested preamble.",
          "**Retrieve, don't dump.** Top-k relevant chunks beat the whole document — cheaper and usually _more_ accurate, because the model isn't distracted.",
          '**Cap output.** Set `max_tokens` deliberately. "Be concise" in the prompt plus a hard ceiling saves more than people expect.',
        ],
      },
      { t: "quote", text: "The model bill is a product decision. Treat tokens like any other resource you'd profile and optimize — because at scale, that's exactly what they are." },
      { t: "h2", text: "Putting it together" },
      { t: "p", text: "Stacked, these compound. Caching removes the repeats. Routing makes the survivors cheaper. Right-sizing shrinks what's left. None of them touches the experience for the user — if anything, retrieval and tighter prompts make answers _sharper_. The 60% isn't a headline number I reverse-engineered; it's roughly where this lands once the three habits are in place and you've stopped paying frontier prices for refund-policy questions." },
      { t: "p", text: "If you're building an AI feature and the bill is starting to sting, start with caching — it's the fastest win — then add the router. You can ship both in an afternoon, and your finance team will notice by the end of the month." },
    ],
  },
  es: {
    title: "Reducir costos de LLM un 60% sin empeorar tu producto",
    dek: "La factura del modelo es una función, no un costo fijo. Esta es la guía que uso para mantener barata una función de IA cuando llegan usuarios reales — caché, enrutamiento y tamaño justo — sin ninguna caída de calidad.",
    blocks: [
      { t: "p", text: "La demo era barata. El lanzamiento no. Esa es la historia de casi todas las funciones de IA que he lanzado — un prototipo vistoso que cuesta centavos, seguido de una factura de producción que escala linealmente con el éxito. La buena noticia: la mayor parte de ese gasto es evitable, y recortarlo rara vez significa un peor producto. Tras hacer esto en un par de productos, suelo terminar en el mismo lugar: **alrededor de 60% menos de costo para una salida que los usuarios no distinguen.**" },
      { t: "p", text: "No hay un único truco. Son tres hábitos, apilados." },
      { t: "h2", text: "1. Usa caché con agresividad — la mayoría de los prompts se repiten" },
      { t: "p", text: "El token más barato es el que nunca envías. En el uso real, una porción sorprendente de las solicitudes son casi duplicadas: la misma pregunta frecuente formulada de tres maneras, el mismo documento resumido dos veces, el mismo system prompt con una variable mínima cambiada. Una caché basada en el prompt normalizado colapsa todo eso en una sola llamada pagada." },
      { t: "p", text: "Empieza con una caché de coincidencia exacta — es trivial y funciona más de lo que crees. Luego añade una **caché semántica**: genera el embedding del prompt entrante y, si está dentro de un umbral de similitud con algo que ya respondiste, sirve la respuesta guardada." },
      { t: "code", file: "llm/cache.ts", lang: "ts", code: cacheCode.replace("// Semantic cache: reuse an answer if a close-enough prompt exists.", "// Caché semántica: reutiliza una respuesta si existe un prompt parecido.").replace("// $0 — served from cache", "// $0 — servido desde caché") },
      { t: "p", text: "Una advertencia: una caché semántica es una perilla de calidad, no solo de costo. Si pones el umbral demasiado holgado servirás una respuesta obsoleta a una pregunta sutilmente distinta. Lo mantengo conservador (0,95–0,97 de coseno) y excluyo cualquier cosa sensible al tiempo." },
      { t: "h2", text: "2. Enruta las solicitudes al modelo más pequeño capaz de hacer el trabajo" },
      { t: "p", text: "No toda solicitud merece tu modelo más caro. Clasificar intención, extraer un campo, formatear JSON, responder una consulta simple — un modelo pequeño o local resuelve esto por una fracción del precio. Reserva el modelo de frontera para el razonamiento genuinamente difícil." },
      { t: "p", text: "El patrón es un **enrutador** barato frente a tus modelos. Un clasificador diminuto (a menudo un modelo local pequeño vía Ollama) decide el nivel, y solo el nivel difícil llega a la API premium." },
      { t: "code", file: "llm/router.ts", lang: "ts", code: routerCode.replace("// $0, runs on our box", "// $0, corre en nuestra máquina") },
      { t: "callout", text: "**Mide antes de enrutar.** Registra la calidad por tarea (una señal de pulgar o un set de evaluación) _antes_ de degradar un modelo. La ganancia solo es real si el nivel más barato mantiene la calidad — de lo contrario cambiaste dólares por tickets de soporte." },
      { t: "h2", text: "3. Ajusta el contexto al tamaño justo — pagas por token, en ambos sentidos" },
      { t: "p", text: 'La tercera palanca es el propio prompt. Los equipos meten documentos enteros en el contexto "por si acaso", y luego pagan por cada token de entrada _y_ ven crecer la latencia. La recuperación lo arregla: trae los pocos fragmentos que de verdad importan y deja el resto en disco.' },
      {
        t: "ul",
        items: [
          "**Recorta el system prompt.** Las instrucciones largas se pagan en cada llamada. Mueve las reglas estables a un fine-tune o a un preámbulo conciso y bien probado.",
          "**Recupera, no vacíes.** Los k fragmentos más relevantes le ganan al documento entero — más barato y normalmente _más_ preciso, porque el modelo no se distrae.",
          '**Limita la salida.** Define `max_tokens` con intención. "Sé conciso" en el prompt más un tope duro ahorra más de lo que la gente espera.',
        ],
      },
      { t: "quote", text: "La factura del modelo es una decisión de producto. Trata los tokens como cualquier otro recurso que perfilarías y optimizarías — porque a escala, es exactamente lo que son." },
      { t: "h2", text: "Juntándolo todo" },
      { t: "p", text: "Apilados, se potencian. La caché elimina las repeticiones. El enrutamiento abarata a los sobrevivientes. El tamaño justo encoge lo que queda. Ninguno toca la experiencia del usuario — si acaso, la recuperación y los prompts más ajustados hacen las respuestas _más nítidas_. El 60% no es un número de titular que ingenié al revés; es más o menos donde aterriza esto una vez que los tres hábitos están en su lugar y dejaste de pagar precios de frontera por preguntas sobre la política de reembolsos." },
      { t: "p", text: "Si estás construyendo una función de IA y la factura empieza a doler, empieza por la caché — es la victoria más rápida — y luego añade el enrutador. Puedes lanzar ambos en una tarde, y tu equipo de finanzas lo notará para fin de mes." },
    ],
  },
};

export default article;
