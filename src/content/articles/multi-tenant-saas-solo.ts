import type { Article } from "../types";

const article: Article = {
  slug: "multi-tenant-saas-solo",
  en: {
    title: "What I learned shipping a multi-tenant SaaS mostly solo",
    dek: "The architecture calls I'd make again, the ones I'd undo, and why \"boring\" infrastructure was the best decision I made while building Forzive.",
    blocks: [
      { t: "p", text: "Building a multi-tenant SaaS by yourself is a series of bets against your own future time. Every clever abstraction is a debt you pay down later, alone, usually at 11pm. After taking **Forzive** from an empty repo to gyms running their whole operation on it, here's what actually held up — and what I'd do differently." },
      { t: "h2", text: "Boring infrastructure was the best decision I made" },
      { t: "p", text: "The temptation, solo, is to reach for the shiniest stack so the work feels modern. I went the other way: **one Postgres database, one Next.js app, one deploy.** No microservices, no message queues I didn't need, no Kubernetes. When something broke, there was exactly one place to look." },
      { t: "p", text: "Multi-tenancy lives in the data layer, not the architecture. Every tenant is a row-scoped slice of the same database, and a single middleware resolves the tenant from the subdomain. That's it. The \"interesting\" version with a database per tenant would have buried me in migrations and connection management for zero early benefit." },
      { t: "callout", text: "**Solo means you are the on-call rotation.** Optimize for the 2am debugging session, not the architecture diagram. Every moving part is a part _you_ get paged for." },
      { t: "h2", text: "Enforce tenant isolation at the data layer, not by discipline" },
      { t: "p", text: "The scariest bug in multi-tenant software is a query that forgets its `WHERE tenantId = ?`. You cannot rely on remembering it on every call — at some point you won't. I scoped tenancy in one place: a query helper that refuses to run without a tenant context. If isolation is structural, a tired version of you can't leak data across gyms." },
      { t: "p", text: "Pair that with seed data that contains _two_ tenants from day one. Most cross-tenant leaks hide until a second tenant exists; if your dev database always has two, the bug surfaces while you're building, not after a customer reports it." },
      { t: "h2", text: "What I'd undo" },
      {
        t: "ul",
        items: [
          "**Premature settings.** I made things configurable that every tenant left on the default. Each toggle was UI, storage, and a branch in the logic — for nothing. Ship the opinion; add the setting when a customer asks twice.",
          "**Hand-rolled background jobs.** My first version of recurring billing was a cron script with home-grown locking. It mostly worked, which is the worst outcome — it failed rarely and silently. A real job runner from the start would have saved a month of mystery.",
          "**Skipping observability.** I added structured logging late. Before that, \"is it slow for everyone or one gym?\" was unanswerable. The first thing I'd install next time is per-tenant timing.",
        ],
      },
      { t: "h2", text: "The meta-lesson" },
      { t: "p", text: "Solo, your scarcest resource isn't compute or money — it's the version of you six months from now who has to understand this code. **Every decision is really a decision about that person's time.** Boring, structural, two-tenants-in-the-seed boring — that's what keeps them sane." },
      { t: "quote", text: "Build the system you can still operate on your worst day, not the one that looks best on a whiteboard." },
    ],
  },
  es: {
    title: "Lo que aprendí lanzando un SaaS multi-tenant casi en solitario",
    dek: "Las decisiones de arquitectura que volvería a tomar, las que desharía, y por qué la infraestructura \"aburrida\" fue la mejor decisión que tomé construyendo Forzive.",
    blocks: [
      { t: "p", text: "Construir un SaaS multi-tenant en solitario es una serie de apuestas contra tu propio tiempo futuro. Cada abstracción ingeniosa es una deuda que pagas después, solo, normalmente a las 11 de la noche. Tras llevar **Forzive** desde un repo vacío hasta gimnasios que operan todo su negocio sobre él, esto es lo que de verdad aguantó — y lo que haría distinto." },
      { t: "h2", text: "La infraestructura aburrida fue la mejor decisión que tomé" },
      { t: "p", text: "La tentación, en solitario, es buscar el stack más vistoso para que el trabajo se sienta moderno. Yo fui al revés: **una base de datos Postgres, una app Next.js, un despliegue.** Sin microservicios, sin colas de mensajes que no necesitaba, sin Kubernetes. Cuando algo se rompía, había exactamente un lugar donde mirar." },
      { t: "p", text: "La multi-tenancy vive en la capa de datos, no en la arquitectura. Cada tenant es una porción con alcance por fila de la misma base de datos, y un único middleware resuelve el tenant a partir del subdominio. Eso es todo. La versión \"interesante\" con una base de datos por tenant me habría enterrado en migraciones y gestión de conexiones sin ningún beneficio temprano." },
      { t: "callout", text: "**Solitario significa que tú eres la guardia de on-call.** Optimiza para la sesión de depuración de las 2am, no para el diagrama de arquitectura. Cada parte móvil es una parte por la que _a ti_ te llaman." },
      { t: "h2", text: "Aplica el aislamiento de tenants en la capa de datos, no por disciplina" },
      { t: "p", text: "El bug más aterrador en software multi-tenant es una consulta que olvida su `WHERE tenantId = ?`. No puedes confiar en recordarlo en cada llamada — en algún momento no lo harás. Acoté la tenancy en un solo lugar: un helper de consultas que se niega a ejecutarse sin un contexto de tenant. Si el aislamiento es estructural, una versión cansada de ti no puede filtrar datos entre gimnasios." },
      { t: "p", text: "Acompáñalo con datos de prueba que contengan _dos_ tenants desde el día uno. La mayoría de las fugas entre tenants se esconden hasta que existe un segundo tenant; si tu base de datos de desarrollo siempre tiene dos, el bug aparece mientras construyes, no después de que un cliente lo reporte." },
      { t: "h2", text: "Lo que desharía" },
      {
        t: "ul",
        items: [
          "**Ajustes prematuros.** Hice configurables cosas que todos los tenants dejaron en su valor por defecto. Cada interruptor era UI, almacenamiento y una rama en la lógica — para nada. Lanza la opinión; añade el ajuste cuando un cliente lo pida dos veces.",
          "**Jobs en segundo plano hechos a mano.** Mi primera versión del cobro recurrente era un script cron con bloqueo casero. Funcionaba casi siempre, que es el peor resultado — fallaba rara vez y en silencio. Un runner de jobs de verdad desde el inicio me habría ahorrado un mes de misterio.",
          "**Saltarme la observabilidad.** Añadí logging estructurado tarde. Antes de eso, \"¿está lento para todos o para un gimnasio?\" era incontestable. Lo primero que instalaría la próxima vez son tiempos por tenant.",
        ],
      },
      { t: "h2", text: "La meta-lección" },
      { t: "p", text: "En solitario, tu recurso más escaso no es el cómputo ni el dinero — es la versión de ti de dentro de seis meses que tiene que entender este código. **Cada decisión es en realidad una decisión sobre el tiempo de esa persona.** Aburrido, estructural, dos-tenants-en-los-datos aburrido — eso es lo que la mantiene cuerda." },
      { t: "quote", text: "Construye el sistema que aún puedas operar en tu peor día, no el que se ve mejor en una pizarra." },
    ],
  },
};

export default article;
