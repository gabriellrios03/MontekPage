import { FileText, ShoppingCart, Package, DollarSign, Database, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const products = [
  {
    icon: FileText,
    name: "CONTPAQi® Contabilidad",
    description: "Control total de tu contabilidad con herramientas avanzadas para cumplimiento fiscal.",
    features: [
      "Polizas automaticas",
      "Reportes fiscales",
      "Multiples empresas",
      "Integracion bancaria",
    ],
  },
  {
    icon: ShoppingCart,
    name: "CONTPAQi® Comercial",
    description: "Administra ventas, compras, inventarios y toda tu operación comercial en un solo lugar.",
    features: [
      "Facturacion electronica",
      "Control de inventarios",
      "Punto de venta",
      "CXC y CXP",
    ],
  },
  {
    icon: Package,
    name: "CONTPAQi® Produccion",
    description: "Optimiza procesos de manufactura con control total de costos y materiales.",
    features: [
      "Ordenes de produccion",
      "Control de materiales",
      "Costeo por producto",
      "Trazabilidad completa",
    ],
  },
  {
    icon: DollarSign,
    name: "CONTPAQi® Nominas",
    description: "Calculo preciso de nómina, timbrado y cumplimiento legal garantizado.",
    features: [
      "Timbrado CFDI",
      "Calculo automatico",
      "Reportes IMSS/INFONAVIT",
      "Dispersion bancaria",
    ],
  },
  {
    icon: Database,
    name: "CONTPAQi® Bancos",
    description: "Conciliación bancaria automatica y control total de tu flujo de efectivo.",
    features: [
      "Conciliacion automatica",
      "Control de cheques",
      "Flujo de efectivo",
      "Integracion bancaria",
    ],
  },
  {
    icon: Building2,
    name: "CONTPAQi® Adminpaq",
    description: "Suite integral para la administración completa de tu empresa.",
    features: [
      "Todo en uno",
      "Multiples usuarios",
      "Escalable",
      "Facil de usar",
    ],
  },
]

export function ContpaqiProducts() {
  return (
    <section className="relative px-6 py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Soluciones disponibles
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Productos CONTPAQi® para cada necesidad
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            Desde contabilidad hasta producción, tenemos la solución perfecta para tu empresa.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.name}
              className="flex flex-col rounded-2xl border border-border/50 bg-card p-8 transition-all hover:border-primary/30 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <product.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold text-foreground">{product.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
              
              <ul className="mt-6 flex flex-col gap-2">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2" asChild>
            <a
              href="https://calendar.notion.so/meet/gabriel-0be361p9j/ucflv4odk"
              target="_blank"
              rel="noopener noreferrer"
            >
              Solicitar cotizacion
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
