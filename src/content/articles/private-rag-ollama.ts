import type { Article } from "../types";

const ragCode = `// rag/answer.ts — retrieve locally, generate locally, never leave the box.
import { embed, search } from "./store";
import { ollama } from "./ollama";

export async function answer(question: string) {
  const queryVec = await embed(question);          // local embeddings
  const chunks = await search(queryVec, { topK: 5 });

  const context = chunks.map((c) => c.text).join("\\n---\\n");
  return ollama.generate({
    model: "llama3:8b",
    prompt: \`Answer using only the context.\\n\\n\${context}\\n\\nQ: \${question}\`,
  });
}`;

const article: Article = {
  slug: "private-rag-ollama",
  en: {
    title: "Private RAG on your own hardware with Ollama & LLaMA 3",
    dek: "When data can't leave the building: a local retrieval pipeline that's good enough to ship, and an honest look at where the cloud still wins.",
    blocks: [
      { t: "p", text: "Some documents are never allowed near a third-party API — medical records, legal discovery, internal financials. For those, \"just call OpenAI\" is a non-starter. The good news is that a fully local retrieval-augmented-generation stack is genuinely shippable now. The honest news is that it costs you some quality, and you should know exactly where." },
      { t: "h2", text: "The whole pipeline runs on one machine" },
      { t: "p", text: "RAG has three moving parts, and all three have local options. **Embeddings** turn text into vectors — a small sentence-transformer runs fine on CPU. A **vector store** holds those vectors; for a single box, an embedded store like a local pgvector or even an in-memory index is plenty. And **generation** is a local model served by Ollama. Nothing crosses the network." },
      { t: "code", file: "rag/answer.ts", lang: "ts", code: ragCode },
      { t: "p", text: "That's the entire hot path: embed the question, pull the top-k relevant chunks, stuff them into the prompt, and let a local LLaMA 3 generate the answer. The chunks _are_ the grounding — the model isn't recalling facts, it's reading the few passages you handed it." },
      { t: "h2", text: "Where local genuinely wins" },
      {
        t: "ul",
        items: [
          "**Data never leaves.** This is the whole point. No DPA negotiation, no \"is this PII in a log somewhere\" anxiety, no per-token bill that scales with usage.",
          "**Cost is fixed.** Once the hardware is paid for, a thousand queries cost the same as ten. For high-volume internal tools, that flips the economics entirely.",
          "**Latency is predictable.** No rate limits, no noisy-neighbor slowdowns. A warm local model answers in a steady beat.",
        ],
      },
      { t: "h2", text: "Where the cloud still wins — be honest about it" },
      { t: "p", text: "An 8B local model is not a frontier model, and pretending otherwise burns trust. On genuinely hard reasoning — multi-step synthesis, subtle instructions, long-context coherence — a hosted frontier model is still meaningfully better. **Retrieval quality matters more than model size here**, but it doesn't erase the gap." },
      { t: "callout", text: "**Right-size the model to the task, not your pride.** Most internal RAG questions are \"find and summarize the relevant passage,\" which an 8B model handles well. Reserve the hard reasoning for the rare query that truly needs it — and if even one such query can't use the cloud, design around that constraint up front." },
      { t: "h2", text: "Make retrieval the thing you tune" },
      { t: "p", text: "The single biggest quality lever in a local stack isn't the model — it's what you put in front of it. Chunk documents thoughtfully (semantic boundaries beat fixed token windows), tune your top-k, and add a re-ranking pass if recall is noisy. A mediocre model with excellent retrieval beats a great model fed irrelevant context, every time." },
      { t: "quote", text: "Local RAG isn't about matching the cloud everywhere. It's about being good enough on the 90% of questions where keeping data in-house is non-negotiable." },
      { t: "p", text: "Start with the local pipeline, measure it against real questions from real users, and only reach for the cloud on the queries that demonstrably need it — assuming the data policy even allows it. For a surprising number of internal tools, it never has to." },
    ],
  },
  es: {
    title: "RAG privado en tu propio hardware con Ollama y LLaMA 3",
    dek: "Cuando los datos no pueden salir del edificio: un pipeline de recuperación local lo bastante bueno para lanzar, y una mirada honesta a dónde la nube sigue ganando.",
    blocks: [
      { t: "p", text: "Algunos documentos nunca pueden acercarse a una API de terceros — historiales médicos, evidencia legal, finanzas internas. Para esos, \"solo llama a OpenAI\" no es opción. La buena noticia es que un stack de RAG totalmente local ya es de verdad lanzable. La noticia honesta es que te cuesta algo de calidad, y deberías saber exactamente dónde." },
      { t: "h2", text: "Todo el pipeline corre en una sola máquina" },
      { t: "p", text: "RAG tiene tres partes móviles, y las tres tienen opciones locales. Los **embeddings** convierten texto en vectores — un sentence-transformer pequeño corre bien en CPU. Un **vector store** guarda esos vectores; para una sola máquina, un store embebido como pgvector local o incluso un índice en memoria sobra. Y la **generación** es un modelo local servido por Ollama. Nada cruza la red." },
      { t: "code", file: "rag/answer.ts", lang: "ts", code: ragCode },
      { t: "p", text: "Ese es todo el camino caliente: genera el embedding de la pregunta, trae los k fragmentos más relevantes, métela en el prompt y deja que un LLaMA 3 local genere la respuesta. Los fragmentos _son_ el anclaje — el modelo no recuerda hechos, lee los pocos pasajes que le entregaste." },
      { t: "h2", text: "Dónde lo local gana de verdad" },
      {
        t: "ul",
        items: [
          "**Los datos nunca salen.** Ese es todo el punto. Sin negociar un DPA, sin la ansiedad de \"¿hay PII en algún log?\", sin una factura por token que escala con el uso.",
          "**El costo es fijo.** Una vez pagado el hardware, mil consultas cuestan lo mismo que diez. Para herramientas internas de alto volumen, eso da vuelta la economía por completo.",
          "**La latencia es predecible.** Sin límites de tasa, sin ralentizaciones por vecinos ruidosos. Un modelo local caliente responde a un ritmo estable.",
        ],
      },
      { t: "h2", text: "Dónde la nube sigue ganando — sé honesto al respecto" },
      { t: "p", text: "Un modelo local de 8B no es un modelo de frontera, y fingir lo contrario quema confianza. En razonamiento genuinamente difícil — síntesis de varios pasos, instrucciones sutiles, coherencia en contexto largo — un modelo de frontera hospedado sigue siendo notablemente mejor. **La calidad de recuperación importa más que el tamaño del modelo aquí**, pero no borra la brecha." },
      { t: "callout", text: "**Ajusta el modelo a la tarea, no a tu orgullo.** La mayoría de las preguntas de RAG interno son \"encuentra y resume el pasaje relevante\", que un modelo de 8B maneja bien. Reserva el razonamiento difícil para la consulta rara que de verdad lo necesite — y si incluso una de esas consultas no puede usar la nube, diseña en torno a esa restricción desde el inicio." },
      { t: "h2", text: "Haz de la recuperación lo que afinas" },
      { t: "p", text: "La mayor palanca de calidad en un stack local no es el modelo — es lo que pones delante de él. Fragmenta los documentos con criterio (los límites semánticos le ganan a las ventanas de tokens fijas), afina tu top-k y añade un paso de re-ranking si el recall es ruidoso. Un modelo mediocre con recuperación excelente le gana a un gran modelo alimentado con contexto irrelevante, siempre." },
      { t: "quote", text: "El RAG local no se trata de igualar a la nube en todo. Se trata de ser lo bastante bueno en el 90% de las preguntas donde mantener los datos en casa es innegociable." },
      { t: "p", text: "Empieza con el pipeline local, mídelo contra preguntas reales de usuarios reales, y solo recurre a la nube en las consultas que demostrablemente lo necesiten — suponiendo que la política de datos siquiera lo permita. Para un número sorprendente de herramientas internas, nunca hace falta." },
    ],
  },
};

export default article;
