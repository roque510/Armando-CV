import type { Article } from "../types";

const mwCode = `// middleware.ts — resolve the tenant from the host on every request.
import { NextRequest, NextResponse } from "next/server";

const ROOT = "forzive.com";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  const sub = host.replace(\`.\${ROOT}\`, "");

  // No subdomain (or "www") → marketing site, untouched.
  if (host === ROOT || sub === "www") return NextResponse.next();

  // Pass the tenant down as a header — the app never reads it from the URL.
  const res = NextResponse.next();
  res.headers.set("x-tenant", sub);
  return res;
}`;

const article: Article = {
  slug: "subdomains-nextjs",
  en: {
    title: "Multi-tenant subdomains in Next.js 14 without losing your mind",
    dek: "Middleware, wildcard DNS, and the data model that keeps tenant isolation honest. A field guide from production.",
    blocks: [
      { t: "p", text: "Subdomain-per-tenant looks like a branding feature and turns out to be an architecture decision. `acme.yourapp.com` and `globex.yourapp.com` need to feel like separate products while running on one codebase and one deploy. Here's the setup that's been carrying Forzive in production." },
      { t: "h2", text: "Wildcard DNS first" },
      { t: "p", text: "Before any code, point a wildcard `*.yourapp.com` record at your host and provision a wildcard TLS certificate. Cloudflare does both for free, and it's the piece people forget — without it, every new tenant means a manual DNS entry, which kills self-serve onboarding. With it, a new subdomain just works the instant a tenant signs up." },
      { t: "h2", text: "Resolve the tenant in middleware" },
      { t: "p", text: "Middleware runs before every request, which makes it the one honest place to figure out _who_ is asking. Parse the host, strip the root domain, and hand the remaining label down to the app as a header. Crucially, the app reads tenancy from that header — never from the URL — so the rest of your code doesn't care how the tenant was resolved." },
      { t: "code", file: "middleware.ts", lang: "ts", code: mwCode },
      { t: "callout", text: "**Treat `www` and the apex as the marketing site.** It's an easy edge case to miss: without the guard, `www.yourapp.com` becomes a tenant named \"www\" and your landing page 404s." },
      { t: "h2", text: "The data model is where isolation actually happens" },
      { t: "p", text: "The subdomain is just a lookup key. Real isolation lives in the database: every tenant-owned table carries a `tenantId`, and every query is scoped to the tenant resolved in middleware. I funnel all of this through a single data helper so no individual query can forget the scope — isolation is structural, not a thing I have to remember on call number four hundred." },
      { t: "p", text: "Resolve the tenant record once per request (cache it), and from then on the rest of your handlers take a tenant context as input. They never see a host string, never parse a subdomain. That separation is what keeps the system understandable as it grows." },
      { t: "h2", text: "Gotchas that cost me an evening each" },
      {
        t: "ul",
        items: [
          "**Local development.** `localhost` has no subdomains. Use `tenant.localhost:3000` (modern browsers route it) or a tool like `lvh.me`, and make the root configurable so the same middleware works in dev and prod.",
          "**Cookies across subdomains.** Decide deliberately: set the cookie `Domain` to the apex if tenants should share a session, or scope it per-subdomain if they shouldn't. The default behavior is rarely the one you want.",
          "**Caching.** Any CDN or `fetch` cache must include the tenant in its key, or one gym will be served another gym's page. The header-based approach makes this explicit — add `x-tenant` to the cache key and move on.",
        ],
      },
      { t: "p", text: "Get the wildcard DNS, the middleware resolution, and the scoped data layer right, and multi-tenant subdomains stop being scary. The whole thing is maybe 50 lines of infrastructure code — the discipline is in keeping tenancy in those few places and nowhere else." },
    ],
  },
  es: {
    title: "Subdominios multi-tenant en Next.js 14 sin volverte loco",
    dek: "Middleware, DNS comodín y el modelo de datos que mantiene honesto el aislamiento de tenants. Una guía de campo desde producción.",
    blocks: [
      { t: "p", text: "Un subdominio por tenant parece una función de marca y resulta ser una decisión de arquitectura. `acme.tuapp.com` y `globex.tuapp.com` deben sentirse como productos separados mientras corren sobre una base de código y un despliegue. Esta es la configuración que sostiene a Forzive en producción." },
      { t: "h2", text: "Primero el DNS comodín" },
      { t: "p", text: "Antes de cualquier código, apunta un registro comodín `*.tuapp.com` a tu host y provisiona un certificado TLS comodín. Cloudflare hace ambas cosas gratis, y es la pieza que la gente olvida — sin ella, cada tenant nuevo significa una entrada de DNS manual, lo que mata el alta self-serve. Con ella, un subdominio nuevo simplemente funciona en el instante en que un tenant se registra." },
      { t: "h2", text: "Resuelve el tenant en el middleware" },
      { t: "p", text: "El middleware corre antes de cada petición, lo que lo convierte en el único lugar honesto para averiguar _quién_ pregunta. Parsea el host, quita el dominio raíz y pasa la etiqueta restante a la app como un header. Lo clave: la app lee la tenancy de ese header — nunca de la URL — para que el resto de tu código no le importe cómo se resolvió el tenant." },
      { t: "code", file: "middleware.ts", lang: "ts", code: mwCode },
      { t: "callout", text: "**Trata `www` y el dominio raíz como el sitio de marketing.** Es un caso límite fácil de olvidar: sin la guarda, `www.tuapp.com` se convierte en un tenant llamado \"www\" y tu landing da 404." },
      { t: "h2", text: "El modelo de datos es donde de verdad ocurre el aislamiento" },
      { t: "p", text: "El subdominio es solo una clave de búsqueda. El aislamiento real vive en la base de datos: cada tabla propiedad de un tenant lleva un `tenantId`, y cada consulta tiene alcance al tenant resuelto en el middleware. Canalizo todo esto por un único helper de datos para que ninguna consulta individual pueda olvidar el alcance — el aislamiento es estructural, no algo que deba recordar en la llamada número cuatrocientos." },
      { t: "p", text: "Resuelve el registro del tenant una vez por petición (cachéalo), y de ahí en adelante el resto de tus handlers reciben un contexto de tenant como entrada. Nunca ven una cadena de host, nunca parsean un subdominio. Esa separación es lo que mantiene el sistema comprensible mientras crece." },
      { t: "h2", text: "Trampas que me costaron una tarde cada una" },
      {
        t: "ul",
        items: [
          "**Desarrollo local.** `localhost` no tiene subdominios. Usa `tenant.localhost:3000` (los navegadores modernos lo enrutan) o una herramienta como `lvh.me`, y haz el dominio raíz configurable para que el mismo middleware funcione en dev y prod.",
          "**Cookies entre subdominios.** Decide con intención: pon el `Domain` de la cookie al dominio raíz si los tenants deben compartir sesión, o acótala por subdominio si no deben. El comportamiento por defecto rara vez es el que quieres.",
          "**Caché.** Cualquier CDN o caché de `fetch` debe incluir el tenant en su clave, o a un gimnasio se le servirá la página de otro. El enfoque basado en header lo hace explícito — añade `x-tenant` a la clave de caché y listo.",
        ],
      },
      { t: "p", text: "Acierta con el DNS comodín, la resolución en el middleware y la capa de datos con alcance, y los subdominios multi-tenant dejan de dar miedo. Todo el asunto son quizá 50 líneas de código de infraestructura — la disciplina está en mantener la tenancy en esos pocos lugares y en ningún otro." },
    ],
  },
};

export default article;
