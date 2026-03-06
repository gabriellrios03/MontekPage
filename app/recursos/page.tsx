import type { Metadata } from "next"
import { Download, Palette, Type, SwatchBook } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Recursos Nexus | Montek",
  description:
    "Guia visual y centro de recursos de Nexus: gradiente, tipografias, colores y materiales descargables.",
}

const brandResources = [
  {
    title: "Logo Nexus",
    description: "Logotipo en formato SVG.",
    href: "/Recursos/nexus_logo.svg",
  },
  {
    title: "Kit de redes sociales",
    description: "Plantillas base para publicaciones y stories alineadas al branding de Nexus.",
    href: "",
  },
  {
    title: "Presentacion comercial",
    description: "Presentacion comercial.",
    href: "/Recursos/Nexus.pdf",
  },
  {
    title: "Screenshots de producto",
    description: "Capturas oficiales para propuestas, una por modulo y por flujo.",
    href: "",
  },
]

export default function RecursosPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background pt-28">
        <section className="px-6 pb-12 pt-10">
          <div className="mx-auto max-w-7xl">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">Recursos</span>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Centro de recursos de{" "}
              <span className="bg-gradient-to-r from-accent via-accent to-primary bg-clip-text text-transparent">
                Nexus
              </span>
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
              Esta pagina concentra los lineamientos visuales y los materiales oficiales de Nexus para que todo
              contenido mantenga consistencia de marca.
            </p>
          </div>
        </section>

        <section className="px-6 py-12">
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
            <article className="rounded-2xl border border-border/50 bg-card p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Palette className="h-5 w-5" />
              </div>
              <h2 className="mt-4 font-display text-xl font-semibold text-foreground">Degradado oficial</h2>
              <p className="mt-2 text-sm text-muted-foreground">Usar en titulos, palabras clave y acentos visuales.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                RGB: de <span className="font-medium text-foreground">rgb(13, 162, 231)</span> a{" "}
                <span className="font-medium text-foreground">rgb(107, 38, 217)</span>
              </p>
              <div className="mt-4 h-14 rounded-xl bg-gradient-to-r from-accent via-accent to-primary" />
              <code className="mt-4 block rounded-md bg-secondary px-3 py-2 text-xs text-secondary-foreground">
                bg-gradient-to-r from-accent via-accent to-primary
              </code>
            </article>

            <article className="rounded-2xl border border-border/50 bg-card p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Type className="h-5 w-5" />
              </div>
              <h2 className="mt-4 font-display text-xl font-semibold text-foreground">Tipografias</h2>
              <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                <p>
                  <span className="font-semibold text-foreground">Titulares:</span> Space Grotesk (`font-display`)
                </p>
                <p>
                  <span className="font-semibold text-foreground">Texto general:</span> Inter (`font-sans`)
                </p>
              </div>
              <p className="mt-4 font-display text-lg text-foreground">Ejemplo de titulo en Space Grotesk</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Ejemplo de parrafo en Inter para mantener legibilidad en cuerpos de texto.
              </p>
            </article>

            <article className="rounded-2xl border border-border/50 bg-card p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <SwatchBook className="h-5 w-5" />
              </div>
              <h2 className="mt-4 font-display text-xl font-semibold text-foreground">Colores base</h2>
              <p className="mt-2 text-sm text-muted-foreground">Tokens definidos en el sistema actual de Nexus.</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li><span className="font-semibold text-foreground">Accent:</span> hsl(199 89% 48%)</li>
                <li><span className="font-semibold text-foreground">Primary:</span> hsl(263 70% 50%)</li>
                <li><span className="font-semibold text-foreground">Foreground:</span> hsl(222 47% 11%)</li>
                <li><span className="font-semibold text-foreground">Background:</span> hsl(0 0% 100%)</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="px-6 pb-24 pt-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6">
              <h2 className="font-display text-3xl font-bold tracking-tight text-foreground">Descargas</h2>
              <p className="mt-2 text-muted-foreground">
                Aqui puedes publicar las rutas de descarga de los materiales que ya preparaste.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {brandResources.map((resource) => (
                <article key={resource.title} className="rounded-2xl border border-border/50 bg-card p-5">
                  <h3 className="font-display text-xl font-semibold text-foreground">{resource.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{resource.description}</p>
                  {resource.href ? (
                    <a
                      href={resource.href}
                      download
                      className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      <Download className="h-4 w-4" />
                      Descargar
                    </a>
                  ) : (
                    <span className="mt-4 inline-flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-muted-foreground">
                      <Download className="h-4 w-4" />
                      Proximamente
                    </span>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
