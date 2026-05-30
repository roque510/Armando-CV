import type { Article } from "../types";

const inferCode = `// One source of truth: infer the type from the query, don't redeclare it.
import { Prisma } from "@prisma/client";

const gymWithMembers = Prisma.validator<Prisma.GymDefaultArgs>()({
  include: { members: true },
});

// This type updates itself when the schema or the query changes.
export type GymWithMembers = Prisma.GymGetPayload<typeof gymWithMembers>;

export async function getGym(id: string): Promise<GymWithMembers> {
  return db.gym.findUniqueOrThrow({ where: { id }, ...gymWithMembers });
}`;

const article: Article = {
  slug: "type-safe-end-to-end",
  en: {
    title: "Type-safe end to end: the Prisma + TypeScript patterns I trust",
    dek: "How I keep types flowing from the database to the button label — and catch the breakage at compile time, not in support tickets.",
    blocks: [
      { t: "p", text: "The dream of \"full-stack TypeScript\" is that a column rename in the database lights up red squiggles all the way to the React component that displayed it. The reality, for most codebases, is a pile of hand-written interfaces that drift out of sync the moment someone's in a hurry. The difference is a few patterns — none of them clever, all of them about having _one_ source of truth." },
      { t: "h2", text: "Infer types from queries — never redeclare them" },
      { t: "p", text: "The original sin is writing an `interface Gym` by hand to mirror a database table. Now you have two definitions of the same thing, and nothing forces them to agree. Prisma already knows the exact shape of every query, including its relations. Ask it for that type instead of re-typing it." },
      { t: "code", file: "data/gym.ts", lang: "ts", code: inferCode },
      { t: "p", text: "Add a relation to the query and `GymWithMembers` grows a field automatically. Remove a column from the schema and every consumer that read it turns red. You didn't maintain a type — you _derived_ one, and derivation can't drift." },
      { t: "callout", text: "**The rule: types flow in one direction — schema → query → component.** Anywhere you hand-write a type that _restates_ something the layer below already knows, you've created a place for the two to disagree. Infer instead." },
      { t: "h2", text: "Validate at the boundary, infer everywhere inside" },
      { t: "p", text: "The one place you _can't_ infer is where untrusted data enters — a request body, a form, a query param. There, parse with a schema validator (I use Zod) and let the validated result's type flow inward. You write the shape once, at the edge; the validator gives you both the runtime check and the static type from the same definition. Inside the boundary, everything is inferred from there." },
      { t: "h2", text: "Make impossible states unrepresentable" },
      { t: "p", text: "A `loading: boolean` next to a `data: T | null` and an `error: string | null` lets you express nonsense — loading _and_ errored, done _with_ no data. A discriminated union doesn't:" },
      {
        t: "ul",
        items: [
          "**Model state as a union, not a bag of flags.** `{ status: 'loading' } | { status: 'ok', data: T } | { status: 'error', message: string }` — now the compiler forces you to handle each case, and the impossible combinations literally can't be typed.",
          "**Prefer `unknown` over `any` at every boundary.** `any` silently switches off the type checker for everything it touches; `unknown` forces a narrowing step. The friction is the feature.",
          "**Let exhaustiveness checks catch new cases.** A `default: assertNever(x)` in a switch turns \"someone added an enum value and forgot a branch\" from a production bug into a compile error.",
        ],
      },
      { t: "h2", text: "Why this pays off" },
      { t: "p", text: "None of these patterns are about elegance for its own sake. They move a whole category of bug — the \"this field is suddenly undefined in production\" kind — from runtime, where a user finds it, to compile time, where _you_ find it before the commit lands. On a solo project that's the difference between shipping and firefighting." },
      { t: "quote", text: "Every hand-written type that restates the database is a future bug with a delay timer. Infer the type, and the timer never starts." },
    ],
  },
  es: {
    title: "Tipado de extremo a extremo: los patrones de Prisma + TypeScript en los que confío",
    dek: "Cómo mantengo los tipos fluyendo desde la base de datos hasta la etiqueta del botón — y atrapo los errores en tiempo de compilación, no en tickets de soporte.",
    blocks: [
      { t: "p", text: "El sueño del \"TypeScript full-stack\" es que renombrar una columna en la base de datos encienda subrayados rojos hasta el componente de React que la mostraba. La realidad, en la mayoría de las bases de código, es una pila de interfaces escritas a mano que se desincronizan en cuanto alguien va con prisa. La diferencia son unos pocos patrones — ninguno ingenioso, todos sobre tener _una_ sola fuente de verdad." },
      { t: "h2", text: "Infiere los tipos de las consultas — nunca los redeclares" },
      { t: "p", text: "El pecado original es escribir una `interface Gym` a mano para reflejar una tabla. Ahora tienes dos definiciones de lo mismo, y nada las obliga a coincidir. Prisma ya conoce la forma exacta de cada consulta, incluidas sus relaciones. Pídele ese tipo en vez de volver a escribirlo." },
      { t: "code", file: "data/gym.ts", lang: "ts", code: inferCode },
      { t: "p", text: "Añade una relación a la consulta y `GymWithMembers` gana un campo automáticamente. Quita una columna del esquema y cada consumidor que la leía se pone rojo. No mantuviste un tipo — lo _derivaste_, y una derivación no se puede desincronizar." },
      { t: "callout", text: "**La regla: los tipos fluyen en una dirección — esquema → consulta → componente.** Donde sea que escribas a mano un tipo que _repite_ algo que la capa de abajo ya sabe, has creado un lugar para que ambos discrepen. Mejor infiere." },
      { t: "h2", text: "Valida en el límite, infiere en todo el interior" },
      { t: "p", text: "El único lugar donde _no_ puedes inferir es donde entran datos no confiables — un body de petición, un formulario, un query param. Ahí, parsea con un validador de esquemas (yo uso Zod) y deja que el tipo del resultado validado fluya hacia adentro. Escribes la forma una vez, en el borde; el validador te da tanto la verificación en runtime como el tipo estático desde la misma definición. Dentro del límite, todo se infiere desde ahí." },
      { t: "h2", text: "Haz que los estados imposibles no se puedan representar" },
      { t: "p", text: "Un `loading: boolean` junto a un `data: T | null` y un `error: string | null` te deja expresar sinsentidos — cargando _y_ con error, listo _sin_ datos. Una unión discriminada no:" },
      {
        t: "ul",
        items: [
          "**Modela el estado como una unión, no como una bolsa de flags.** `{ status: 'loading' } | { status: 'ok', data: T } | { status: 'error', message: string }` — ahora el compilador te obliga a manejar cada caso, y las combinaciones imposibles literalmente no se pueden tipar.",
          "**Prefiere `unknown` sobre `any` en cada límite.** `any` apaga en silencio el verificador de tipos para todo lo que toca; `unknown` obliga a un paso de estrechamiento. La fricción es la función.",
          "**Deja que las verificaciones de exhaustividad atrapen casos nuevos.** Un `default: assertNever(x)` en un switch convierte \"alguien añadió un valor al enum y olvidó una rama\" de un bug en producción a un error de compilación.",
        ],
      },
      { t: "h2", text: "Por qué vale la pena" },
      { t: "p", text: "Ninguno de estos patrones busca elegancia por sí misma. Mueven toda una categoría de bug — el tipo \"este campo de repente es undefined en producción\" — desde el runtime, donde lo encuentra un usuario, al tiempo de compilación, donde lo encuentras _tú_ antes de que el commit aterrice. En un proyecto en solitario eso es la diferencia entre lanzar y apagar incendios." },
      { t: "quote", text: "Cada tipo escrito a mano que repite la base de datos es un bug futuro con temporizador. Infiere el tipo, y el temporizador nunca arranca." },
    ],
  },
};

export default article;
