import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center">
              <Image src="/images/logo-montek.png" alt="Montek" width={140} height={40} className="h-8 w-auto" />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Tecnologia que conecta tu operacion.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Soluciones</h4>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <Link href="/nexus" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  <span className="bg-gradient-to-r from-accent via-accent to-primary bg-clip-text text-transparent">
                    Nexus
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/#soluciones" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Integraciones
                </Link>
              </li>
              <li>
                <Link href="/#soluciones" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Desarrollo a la medida
                </Link>
              </li>
              <li>
                <Link href="/#soluciones" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {"BI & Reportes"}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Empresa</h4>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <Link href="/#nosotros" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/#respaldo" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Respaldo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Contacto</h4>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a
                  href="https://calendar.notion.so/meet/gabriel-0be361p9j/ucflv4odk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Agendar llamada
                </a>
              </li>
              <li>
                <a
                  href="https://appmontek.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Iniciar sesion
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            {"Montek. Todos los derechos reservados."}
          </p>
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Respaldado por</span>
            <Image
              src="/images/MTY.png"
              alt="MTY Consultores"
              width={160}
              height={48}
              className="h-10 w-auto"
            />
          </p>
        </div>
      </div>
    </footer>
  )
}
