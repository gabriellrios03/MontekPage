'use client'

import { useEffect, useMemo, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const ANNUAL_ADDITIONAL_USER_PRICE = 600
const MONTHLY_ADDITIONAL_USER_PRICE = 60
const ANNUAL_PRORATED_PER_MONTH = ANNUAL_ADDITIONAL_USER_PRICE / 12
const CORE_MONTHLY_PRICE = 1200
const CORE_ANNUAL_MONTHLY_RATE = 1000
const CORE_ANNUAL_TOTAL = CORE_ANNUAL_MONTHLY_RATE * 12

function getRemainingMonths(expirationDate: Date, currentDate: Date) {
  const today = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
  )
  const expiration = new Date(
    expirationDate.getFullYear(),
    expirationDate.getMonth(),
    expirationDate.getDate(),
  )

  if (expiration <= today) {
    return 0
  }

  let monthDifference =
    (expiration.getFullYear() - today.getFullYear()) * 12 +
    (expiration.getMonth() - today.getMonth())

  if (expiration.getDate() > today.getDate()) {
    monthDifference += 1
  }

  return Math.max(monthDifference, 1)
}

const NEXUS_MODULES = [
  { id: 'nexus-sales', label: 'Nexus Sales', description: 'Documentos en línea, cotizaciones, facturas y pedidos sin estar en la misma red' },
  { id: 'nexus-x-WanSoft', label: 'Nexus x WanSoft', description: 'Conexión con WanSoft y replicación de catálogos y documentos' },
  { id: 'nexus-x-odessa', label: 'Nexus x Odessa', description: 'Generación de layouts personalizados para Odessa' },
  { id: 'nexus-bi', label: 'Nexus BI', description: 'Reportes avanzados, KPIs en tiempo real y decisiones rápidas' },
  { id: 'nexus-devs', label: 'Nexus Devs', description: 'APIs para Comercial, Contabilidad y Bancos, e integración con plataformas externas' },
  { id: 'nexus-import', label: 'Nexus Import', description: 'Lectura automática del ADD y creación de documentos de compra desde XML' },
  { id: 'nexus-collect', label: 'Nexus Collect', description: 'Cobranza automática, recordatorios de pago y envío de estado de cuenta' },
]

export function NexusQuote() {
  const [plan, setPlan] = useState<'mensual' | 'anual'>('mensual')
  const [operationType, setOperationType] = useState<
    'nuevo' | 'incremento-usuarios'
  >('nuevo')
  const [clientName, setClientName] = useState('')
  const [sellerName, setSellerName] = useState('')
  const [selectedModule, setSelectedModule] = useState('nexus-sales')
  const [additionalUsers, setAdditionalUsers] = useState(1)
  const [expirationDate, setExpirationDate] = useState('')
  const [showResult, setShowResult] = useState(false)

  const calculation = useMemo(() => {
    const users = Number.isFinite(additionalUsers) && additionalUsers > 0 ? additionalUsers : 0
    const chargeableAdditionalUsers =
      operationType === 'incremento-usuarios' ? users : Math.max(users - 1, 0)
    const includesCore = operationType === 'nuevo'

    if (plan === 'mensual') {
      const additionalUsersMonthlyTotal =
        chargeableAdditionalUsers * MONTHLY_ADDITIONAL_USER_PRICE
      const coreMonthlyTotal = includesCore ? CORE_MONTHLY_PRICE : 0

      return {
        includesCore,
        users,
        chargeableAdditionalUsers,
        coreMonthlyTotal,
        additionalUsersMonthlyTotal,
        monthlyTotal: coreMonthlyTotal + additionalUsersMonthlyTotal,
      }
    }

    if (!expirationDate && operationType === 'incremento-usuarios') {
      return {
        includesCore,
        users,
        chargeableAdditionalUsers,
        remainingMonths: null,
        coreAnnualTotal: null,
        additionalUsersAnnualTotal: null,
        annualTotal: null,
        coreProratedTotal: null,
        additionalUsersProratedTotal: null,
        proratedTotal: null,
      }
    }

    const parsedDate = new Date(`${expirationDate}T00:00:00`)

    if (Number.isNaN(parsedDate.getTime()) && operationType === 'incremento-usuarios') {
      return {
        includesCore,
        users,
        chargeableAdditionalUsers,
        remainingMonths: null,
        coreAnnualTotal: null,
        additionalUsersAnnualTotal: null,
        annualTotal: null,
        coreProratedTotal: null,
        additionalUsersProratedTotal: null,
        proratedTotal: null,
      }
    }

    const coreAnnualTotal = includesCore ? CORE_ANNUAL_TOTAL : 0
    const additionalUsersAnnualTotal =
      chargeableAdditionalUsers * ANNUAL_ADDITIONAL_USER_PRICE
    const annualTotal = coreAnnualTotal + additionalUsersAnnualTotal

    const remainingMonths = parsedDate
      ? getRemainingMonths(parsedDate, new Date())
      : null
    const coreProratedTotal =
      remainingMonths !== null && includesCore
        ? remainingMonths * CORE_ANNUAL_MONTHLY_RATE
        : null
    const additionalUsersProratedTotal =
      remainingMonths !== null
        ? chargeableAdditionalUsers * remainingMonths * ANNUAL_PRORATED_PER_MONTH
        : null
    const proratedTotal =
      coreProratedTotal !== null && additionalUsersProratedTotal !== null
        ? coreProratedTotal + additionalUsersProratedTotal
        : null

    return {
      includesCore,
      users,
      chargeableAdditionalUsers,
      remainingMonths,
      coreAnnualTotal,
      additionalUsersAnnualTotal,
      annualTotal,
      coreProratedTotal,
      additionalUsersProratedTotal,
      proratedTotal,
    }
  }, [plan, operationType, additionalUsers, expirationDate, selectedModule])

  useEffect(() => {
    setShowResult(false)
  }, [plan, operationType, additionalUsers, expirationDate, selectedModule])

  const requiresExpiration = plan === 'anual' && operationType === 'incremento-usuarios'
  const parsedExpiration = expirationDate ? new Date(`${expirationDate}T00:00:00`) : null
  const hasValidExpiration =
    !requiresExpiration ||
    (parsedExpiration !== null && !Number.isNaN(parsedExpiration.getTime()))

  return (
    <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl border border-accent/20 bg-gradient-to-br from-accent/5 via-background to-primary/5 p-1 print:mt-0 print:max-w-full print:rounded-none print:border-none print:bg-white print:p-0">
      <div className="rounded-[1.25rem] border border-border/60 bg-background/90 p-6 backdrop-blur md:p-8 print:rounded-none print:border-none print:bg-white print:p-0">
        <div className="mb-6 print:hidden">
          <h3 className="font-display text-2xl font-bold text-foreground">
            Cotizador de Nexus
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Mensual: $60 por usuario adicional al mes. Anual: $600 por usuario adicional al ano.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 print:hidden">
          <div className="space-y-2">
            <Label htmlFor="nexus-client">Nombre del cliente</Label>
            <Input
              id="nexus-client"
              type="text"
              placeholder="Ej: Empresa XYZ"
              value={clientName}
              onChange={(event) => setClientName(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nexus-seller">Nombre del vendedor</Label>
            <Input
              id="nexus-seller"
              type="text"
              placeholder="Tu nombre"
              value={sellerName}
              onChange={(event) => setSellerName(event.target.value)}
            />
          </div>
        </div>

        <div className="mt-5 space-y-2 print:hidden">
          <Label htmlFor="nexus-module">Módulo de interés principal</Label>
          <Select value={selectedModule} onValueChange={setSelectedModule}>
            <SelectTrigger id="nexus-module">
              <SelectValue placeholder="Selecciona un módulo" />
            </SelectTrigger>
            <SelectContent>
              {NEXUS_MODULES.map((module) => (
                <SelectItem key={module.id} value={module.id}>
                  {module.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-3 print:hidden">
          <div className="space-y-2">
            <Label htmlFor="nexus-operation">Tipo de cotizacion</Label>
            <Select
              value={operationType}
              onValueChange={(value: 'nuevo' | 'incremento-usuarios') =>
                setOperationType(value)
              }
            >
              <SelectTrigger id="nexus-operation">
                <SelectValue placeholder="Selecciona una opcion" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nuevo">Nuevo</SelectItem>
                <SelectItem value="incremento-usuarios">Incremento de usuarios</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nexus-plan">Plan</Label>
            <Select value={plan} onValueChange={(value: 'mensual' | 'anual') => setPlan(value)}>
              <SelectTrigger id="nexus-plan">
                <SelectValue placeholder="Selecciona un plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mensual">Mensual</SelectItem>
                <SelectItem value="anual">Anual</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nexus-users">
              {operationType === 'incremento-usuarios'
                ? 'Usuarios a incrementar'
                : 'Usuarios a cotizar'}
            </Label>
            <Input
              id="nexus-users"
              type="number"
              min={1}
              value={additionalUsers}
              onChange={(event) => setAdditionalUsers(Number(event.target.value))}
            />
          </div>
        </div>


        {requiresExpiration && (
          <div className="mt-5 space-y-2 print:hidden">
            <Label htmlFor="nexus-expiration">Fecha de vencimiento</Label>
            <Input
              id="nexus-expiration"
              type="date"
              value={expirationDate}
              onChange={(event) => setExpirationDate(event.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              El prorrateo usa $50 por mes por usuario adicional (600 / 12).
            </p>
          </div>
        )}

        <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between print:hidden">
          <div className="text-sm text-muted-foreground">
            Genera la cotizacion para ver el desglose y el total.
            {!hasValidExpiration && (
              <span className="ml-2 text-accent">Ingresa la fecha de vencimiento.</span>
            )}
          </div>
          <Button
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
            onClick={() => {
              setShowResult(true)
            }}
            disabled={!hasValidExpiration}
          >
            Generar cotizacion
          </Button>
        </div>

        {showResult && (
          <div className="mt-8 space-y-6 print:mt-0 print:space-y-0">
            <div className="flex gap-3 mb-4 print:hidden">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.print()}
                className="gap-2"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4.586a2 2 0 00-.586-1.414l-3.828-3.828A2 2 0 0015.172 2H5a2 2 0 00-2 2v12a2 2 0 002 2h2m.5-12.5V7a.5.5 0 01.5-.5h.5a.5.5 0 01.5.5v.5M9 10h6M9 14h6" />
                </svg>
                Imprimir / PDF
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowResult(false)
                  setPlan('mensual')
                  setOperationType('nuevo')
                  setAdditionalUsers(1)
                  setExpirationDate('')
                  setClientName('')
                  setSellerName('')
                  setSelectedModule('nexus-sales')
                }}
                className="gap-2"
              >
                Nueva cotizacion
              </Button>
            </div>
            <div className="overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/5 via-background to-primary/5 shadow-lg print:border-foreground/20 print:bg-white print:shadow-none" id="quote-card">
              <div className="rounded-3xl border border-border/40 bg-background/95 backdrop-blur p-8 md:p-10 print:border print:border-gray-300 print:bg-white print:p-8 print:backdrop-blur-none">
                <div className="mb-8 border-b border-border/40 pb-8 print:border-b print:border-gray-300">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="font-display text-2xl font-bold text-foreground print:text-black">MONTEK TECHNOLOGY</h2>
                      <p className="mt-1 text-xs text-muted-foreground print:text-gray-600">RFC: MTE250814884</p>
                      <p className="mt-2 text-sm text-muted-foreground print:text-gray-600">Nexus - Cotizacion Oficial</p>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-lg font-bold bg-gradient-to-r from-accent via-accent to-primary bg-clip-text text-transparent print:text-primary print:bg-none">
                        NX-{Math.random().toString(36).slice(2, 7).toUpperCase()}
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground print:text-gray-600">
                        {new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 mb-8">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground print:text-gray-700">Cliente</p>
                    <p className="mt-2 text-lg font-semibold text-foreground print:text-black">{clientName || 'Cliente'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground print:text-gray-700">Vendedor</p>
                    <p className="mt-2 text-lg font-semibold text-foreground print:text-black">{sellerName || 'Vendedor'}</p>
                  </div>
                </div>

                <div className="rounded-lg bg-blue-50 border border-blue-200 p-4 mb-8 print:bg-blue-50 print:border-blue-300">
                  <p className="text-sm font-semibold text-blue-900 print:text-blue-900">Cotización para cliente final</p>
                  <p className="text-xs text-blue-800 mt-1 print:text-blue-800">Válida hasta: {new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>

                <div className="rounded-xl border border-accent/20 bg-accent/5 p-6 mb-8 print:border print:border-gray-300 print:bg-gray-50 print:p-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground print:text-gray-700">Interés principal</p>
                      <p className="mt-2 font-semibold text-foreground print:text-black">
                        {NEXUS_MODULES.find(m => m.id === selectedModule)?.label}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground print:text-gray-600">
                        {NEXUS_MODULES.find(m => m.id === selectedModule)?.description}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground print:text-gray-700">Tipo</p>
                      <p className="mt-2 font-semibold text-foreground print:text-black">
                        {operationType === 'nuevo' ? 'Nuevo' : 'Incremento de usuarios'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground print:text-gray-700">Plan</p>
                      <p className="mt-2 font-semibold text-foreground print:text-black">{plan === 'mensual' ? 'Mensual' : 'Anual'}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground print:text-gray-700">Usuarios</p>
                      <p className="mt-2 font-semibold text-foreground print:text-black">{calculation.users}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 border-t border-border/40 pt-6 print:border-t print:border-gray-300">
                  {plan === 'mensual' ? (
                    <>
                      {calculation.includesCore && (
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground print:text-gray-700">Licencia core mensual</span>
                          <span className="font-semibold text-foreground print:text-black">
                            ${calculation.coreMonthlyTotal?.toLocaleString('es-MX')} MXN
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground print:text-gray-700">Usuarios adicionales mensual</span>
                        <span className="font-semibold text-foreground print:text-black">
                          ${calculation.additionalUsersMonthlyTotal?.toLocaleString('es-MX')} MXN
                        </span>
                      </div>
                      <div className="flex justify-between items-center border-t border-border/40 pt-4 print:border-t print:border-gray-300">
                        <span className="font-semibold text-foreground print:text-black">Total mensual</span>
                        <span className="font-display text-2xl font-bold bg-gradient-to-r from-accent via-accent to-primary bg-clip-text text-transparent print:text-primary print:bg-none">
                          ${calculation.monthlyTotal?.toLocaleString('es-MX')} MXN
                        </span>
                      </div>
                    </>
                  ) : operationType === 'nuevo' ? (
                    <>
                      {calculation.includesCore && (
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground print:text-gray-700">Licencia core anual</span>
                          <span className="font-semibold text-foreground print:text-black">
                            ${calculation.coreAnnualTotal?.toLocaleString('es-MX')} MXN
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground print:text-gray-700">Usuarios adicionales anual</span>
                        <span className="font-semibold text-foreground print:text-black">
                          ${calculation.additionalUsersAnnualTotal?.toLocaleString('es-MX')} MXN
                        </span>
                      </div>
                      <div className="flex justify-between items-center border-t border-border/40 pt-4 print:border-t print:border-gray-300">
                        <span className="font-semibold text-foreground print:text-black">Total anual</span>
                        <span className="font-display text-2xl font-bold bg-gradient-to-r from-accent via-accent to-primary bg-clip-text text-transparent print:text-primary print:bg-none">
                          ${calculation.annualTotal?.toLocaleString('es-MX')} MXN
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground print:text-gray-700">Meses restantes</span>
                        <span className="font-semibold text-foreground print:text-black">{calculation.remainingMonths ?? '-'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground print:text-gray-700">Usuarios adicionales prorrateados</span>
                        <span className="font-semibold text-foreground print:text-black">
                          ${calculation.additionalUsersProratedTotal?.toLocaleString('es-MX')} MXN
                        </span>
                      </div>
                      <div className="flex justify-between items-center border-t border-border/40 pt-4 print:border-t print:border-gray-300">
                        <span className="font-semibold text-foreground print:text-black">Cobro prorrateado</span>
                        <span className="font-display text-2xl font-bold bg-gradient-to-r from-accent via-accent to-primary bg-clip-text text-transparent print:text-primary print:bg-none">
                          ${calculation.proratedTotal?.toLocaleString('es-MX')} MXN
                        </span>
                      </div>
                    </>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 print:border print:border-gray-300 print:bg-gray-50">
                    <p className="text-xs text-amber-900 leading-relaxed print:text-gray-700">
                      <span className="font-semibold">Importante:</span> Los precios mostrados son antes de impuestos (IVA, ISR, etc). Estos serán aplicados según la legislación fiscal correspondiente.
                    </p>
                  </div>
                  <div className="rounded-lg border border-accent/20 bg-accent/5 p-4 print:border print:border-gray-300 print:bg-gray-50">
                    <p className="text-xs text-muted-foreground leading-relaxed print:text-gray-700">
                      <span className="font-semibold text-foreground print:text-black">Nota:</span> Estos precios son publicos y deben ser respetados por cualquier distribuidor. Si ves una promocion o irregularidad reportalo al{' '}
                      <span className="font-semibold text-accent print:text-foreground print:underline">+52 81 1008 9607</span>.
                    </p>
                  </div>
                  <div className="rounded-lg border border-green-200 bg-green-50 p-4 print:border print:border-gray-300 print:bg-gray-50">
                    <p className="text-xs text-green-900 leading-relaxed print:text-gray-700">
                      <span className="font-semibold">Acceso completo a Nexus:</span> El cliente tendrá acceso a todos los módulos de Nexus. Para más información sobre todas las funcionalidades, visita{' '}
                      <a href="https://montek.com.mx/nexus" target="_blank" rel="noopener noreferrer" className="font-semibold text-green-700 underline hover:text-green-900 print:text-foreground print:no-underline">montek.com.mx/nexus</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}