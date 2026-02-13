import {
  FileText,
  Link2,
  LayoutDashboard,
  BarChart3,
  Code2,
  FileCode,
  Bell,
} from "lucide-react"

const modules = [
  {
    icon: FileText,
    key: "nexus-sales",
    name: (
      <>
        <span className="bg-gradient-to-r from-accent via-accent to-primary bg-clip-text text-transparent">
          Nexus
        </span>{" "}
        Sales
      </>
    ),
    features: [
      "Documentos en linea",
      "Cotizaciones, facturas, pedidos",
      "Sin estar en la misma red",
    ],
  },
  {
    icon: Link2,
    key: "nexus-x-wantsoft",
    name: (
      <>
        <span className="bg-gradient-to-r from-accent via-accent to-primary bg-clip-text text-transparent">
          Nexus
        </span>{" "}
        x WantSoft
      </>
    ),
    features: [
      "Conexion con Wansoft",
      "Replicacion de catalogos y documentos",
    ],
  },
  {
    icon: LayoutDashboard,
    key: "nexus-x-odessa",
    name: (
      <>
        <span className="bg-gradient-to-r from-accent via-accent to-primary bg-clip-text text-transparent">
          Nexus
        </span>{" "}
        x Odessa
      </>
    ),
    features: [
      "Generacion de layouts para Odessa",
    ],
  },
  {
    icon: BarChart3,
    key: "nexus-bi",
    name: (
      <>
        <span className="bg-gradient-to-r from-accent via-accent to-primary bg-clip-text text-transparent">
          Nexus
        </span>{" "}
        BI
      </>
    ),
    features: [
      "Reportes avanzados",
      "KPIs en tiempo real",
      "Decisiones rapidas",
    ],
  },
  {
    icon: Code2,
    key: "nexus-devs",
    name: (
      <>
        <span className="bg-gradient-to-r from-accent via-accent to-primary bg-clip-text text-transparent">
          Nexus
        </span>{" "}
        Devs
      </>
    ),
    features: [
      "APIs para Comercial, Contabilidad y Bancos",
      "Integracion con plataformas externas",
    ],
  },
  {
    icon: FileCode,
    key: "xml-connect",
    name: (
      <>
        <span className="bg-gradient-to-r from-accent via-accent to-primary bg-clip-text text-transparent">
          Nexus
        </span>{" "}
        Import
      </>
    ),
    features: [
      "Lectura automatica del ADD",
      "Creacion de documentos de compra desde XML",
    ],
  },
  {
    icon: Bell,
    key: "nexus-collect",
    name: (
      <>
        <span className="bg-gradient-to-r from-accent via-accent to-primary bg-clip-text text-transparent">
          Nexus
        </span>{" "}
        Collect
      </>
    ),
    features: [
      "Cobranza automatica",
      "Recordatorios de pago",
      "Envio de estado de cuenta",
      "Liga de estado de cuenta para el cliente",
    ],
  },
]

export function NexusModules() {
  return (
    <section className="relative px-6 py-32 bg-card/50">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Modulos
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Todo lo que{" "}
            <span className="bg-gradient-to-r from-accent via-accent to-primary bg-clip-text text-transparent">
              Nexus
            </span>{" "}
            incluye
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Cada modulo extiende CONTPAQi® en un area especifica de tu operacion.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((mod) => (
            <div
              key={mod.key}
              className="group rounded-2xl border border-border/50 bg-card p-6 transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent/20">
                <mod.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-foreground">{mod.name}</h3>
              <ul className="mt-4 flex flex-col gap-2">
                {mod.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
