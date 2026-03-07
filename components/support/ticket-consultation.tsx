"use client"

import { FormEvent, useState } from "react"
import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import remarkGfm from "remark-gfm"
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  ExternalLink,
  FileText,
  Loader2,
  MessageSquare,
  Paperclip,
  RefreshCw,
  Search,
  Send,
  Tag,
  User,
  Users,
} from "lucide-react"

type TicketResponse = {
  key: string
  summary: string
  status: string
  statusCategory: string
  issueType: string
  priority: string
  projectKey: string
  projectName: string
  reporter: string
  assignee: string
  labels: string[]
  descriptionMarkdown: string
  attachments: Array<{
    id: string
    filename: string
    mimeType: string
    size: number | null
    contentUrl: string | null
  }>
  comments: Array<{
    id: string
    author: string
    createdAt: string
    bodyMarkdown: string
  }>
  createdAt: string
  updatedAt: string
  browseUrl: string
}

function normalizeTicketResponse(payload: any): TicketResponse {
  return {
    key: payload?.key ?? "Sin clave",
    summary: payload?.summary ?? "Sin resumen",
    status: payload?.status ?? "Sin estatus",
    statusCategory: payload?.statusCategory ?? "Sin categoria",
    issueType: payload?.issueType ?? "Sin tipo",
    priority: payload?.priority ?? "Sin prioridad",
    projectKey: payload?.projectKey ?? "",
    projectName: payload?.projectName ?? "Sin proyecto",
    reporter: payload?.reporter ?? "No disponible",
    assignee: payload?.assignee ?? "Sin asignar",
    labels: Array.isArray(payload?.labels) ? payload.labels : [],
    descriptionMarkdown: payload?.descriptionMarkdown ?? "Sin descripcion",
    attachments: Array.isArray(payload?.attachments) ? payload.attachments : [],
    comments: Array.isArray(payload?.comments) ? payload.comments : [],
    createdAt: payload?.createdAt ?? "No disponible",
    updatedAt: payload?.updatedAt ?? "No disponible",
    browseUrl: payload?.browseUrl ?? "#",
  }
}

type ActiveTab = "details" | "comments"

export function TicketConsultation() {
  const [ticketKey, setTicketKey] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [ticket, setTicket] = useState<TicketResponse | null>(null)
  const [authorName, setAuthorName] = useState("")
  const [commentText, setCommentText] = useState("")
  const [commentLoading, setCommentLoading] = useState(false)
  const [commentFeedback, setCommentFeedback] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<ActiveTab>("details")
  const [showDescription, setShowDescription] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  async function fetchTicket(key: string) {
    const response = await fetch(`/api/jira/ticket?key=${encodeURIComponent(key)}`)
    const payload = await response.json()

    if (!response.ok) {
      throw new Error(payload?.error ?? "No se pudo consultar el ticket.")
    }

    return normalizeTicketResponse(payload)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const normalizedKey = ticketKey.trim().toUpperCase()
    if (!normalizedKey) {
      setError("Escribe una clave de ticket.")
      setTicket(null)
      return
    }

    setLoading(true)
    setError(null)
    setCommentFeedback(null)

    try {
      const normalizedTicket = await fetchTicket(normalizedKey)
      setTicket(normalizedTicket)
      setActiveTab("details")
    } catch (requestError) {
      setTicket(null)
      setError(
        requestError instanceof Error
          ? requestError.message
          : "No se pudo conectar con el servicio de Jira.",
      )
    } finally {
      setLoading(false)
    }
  }

  async function handleRefresh() {
    if (!ticket || refreshing) return

    setRefreshing(true)
    try {
      const refreshedTicket = await fetchTicket(ticket.key)
      setTicket(refreshedTicket)
    } catch {
      // Silent fail on refresh
    } finally {
      setRefreshing(false)
    }
  }

  async function handleCommentSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!ticket) {
      return
    }

    const normalizedName = authorName.trim()
    const normalizedComment = commentText.trim()

    if (!normalizedName) {
      setCommentFeedback("Escribe tu nombre.")
      return
    }

    if (!normalizedComment) {
      setCommentFeedback("Escribe tu comentario.")
      return
    }

    setCommentLoading(true)
    setCommentFeedback(null)

    try {
      const response = await fetch("/api/jira/ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: ticket.key,
          name: normalizedName,
          comment: normalizedComment,
        }),
      })

      const payload = await response.json()

      if (!response.ok) {
        setCommentFeedback(payload?.error ?? "No se pudo enviar el comentario.")
        return
      }

      setCommentText("")
      setCommentFeedback("Comentario enviado correctamente.")
      const refreshedTicket = await fetchTicket(ticket.key)
      setTicket(refreshedTicket)
    } catch {
      setCommentFeedback("No se pudo enviar el comentario en este momento.")
    } finally {
      setCommentLoading(false)
    }
  }

  function getStatusColor(statusCategory: string) {
    const category = statusCategory.toLowerCase()
    if (category.includes("done") || category.includes("complete") || category.includes("terminado")) {
      return "bg-emerald-500"
    }
    if (category.includes("progress") || category.includes("proceso")) {
      return "bg-sky-500"
    }
    return "bg-amber-500"
  }

  function getPriorityIcon(priority: string) {
    const p = priority.toLowerCase()
    if (p.includes("high") || p.includes("alta") || p.includes("critical") || p.includes("critica")) {
      return <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
    }
    if (p.includes("medium") || p.includes("media")) {
      return <span className="inline-block h-2 w-2 rounded-full bg-amber-500" />
    }
    return <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
  }

  return (
    <section className="relative w-full px-6 pb-24 sm:px-10">
      <div className="rounded-3xl border border-border bg-card/90 p-6 shadow-sm sm:p-8">
        <p className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
          Consultar Ticket
        </p>

        <h2 className="mt-4 text-2xl font-bold text-card-foreground sm:text-3xl">
          Revisa el estado de tu solicitud
        </h2>

        <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Ingresa la clave de tu ticket (por ejemplo: MTK-123) para consultar su
          informacion en Jira.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <label className="sr-only" htmlFor="ticket-key">
              Clave del ticket
            </label>
            <input
              id="ticket-key"
              name="ticket-key"
              value={ticketKey}
              onChange={(event) => setTicketKey(event.target.value)}
              placeholder="Ejemplo: MTK-123"
              className="h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Buscando...
              </>
            ) : (
              "Consultar"
            )}
          </button>
        </form>

        {error ? (
          <div className="mt-4 flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        ) : null}

        {ticket ? (
          <div className="mt-8 space-y-6">
            {/* Status Header Card */}
            <div className="overflow-hidden rounded-2xl border border-border bg-background">
              {/* Status Bar */}
              <div className={`h-1.5 ${getStatusColor(ticket.statusCategory)}`} />
              
              <div className="p-5 sm:p-6">
                {/* Header Row */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="shrink-0 rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-bold text-primary">
                        {ticket.key}
                      </span>
                      <StatusBadge status={ticket.status} category={ticket.statusCategory} />
                    </div>
                    <h3 className="mt-3 text-lg font-semibold leading-snug text-foreground sm:text-xl">
                      {ticket.summary}
                    </h3>
                  </div>
                  
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      onClick={handleRefresh}
                      disabled={refreshing}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition hover:border-primary/40 hover:text-foreground disabled:opacity-50"
                      title="Actualizar"
                    >
                      <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
                    </button>
                    <a
                      href={ticket.browseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-medium text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
                    >
                      <span className="hidden sm:inline">Abrir en Jira</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                {/* Quick Info Row */}
                <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-5">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span>{ticket.issueType}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {getPriorityIcon(ticket.priority)}
                    <span>{ticket.priority}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{ticket.assignee}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Actualizado: {ticket.updatedAt}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 rounded-xl border border-border bg-background/50 p-1">
              <button
                onClick={() => setActiveTab("details")}
                className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                  activeTab === "details"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  <FileText className="h-4 w-4" />
                  Detalles
                </span>
              </button>
              <button
                onClick={() => setActiveTab("comments")}
                className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                  activeTab === "comments"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Comentarios
                  {ticket.comments.length > 0 && (
                    <span className={`rounded-full px-2 py-0.5 text-xs ${
                      activeTab === "comments"
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-primary/10 text-primary"
                    }`}>
                      {ticket.comments.length}
                    </span>
                  )}
                </span>
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "details" ? (
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Content */}
                <div className="space-y-6 lg:col-span-2">
                  {/* Description */}
                  <div className="rounded-2xl border border-border bg-background p-5">
                    <button
                      onClick={() => setShowDescription(!showDescription)}
                      className="flex w-full items-center justify-between text-left"
                    >
                      <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        <FileText className="h-4 w-4" />
                        Descripcion
                      </h4>
                      {showDescription ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                    {showDescription && (
                      <div className="mt-4 max-h-[400px] overflow-y-auto rounded-xl border border-border bg-card/50 p-4">
                        <MarkdownContent content={ticket.descriptionMarkdown} />
                      </div>
                    )}
                  </div>

                  {/* Attachments */}
                  {ticket.attachments?.length > 0 && (
                    <div className="rounded-2xl border border-border bg-background p-5">
                      <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        <Paperclip className="h-4 w-4" />
                        Adjuntos ({ticket.attachments.length})
                      </h4>
                      <div className="mt-4 grid gap-2 sm:grid-cols-2">
                        {ticket.attachments.map((file) => (
                          <a
                            key={file.id || file.filename}
                            href={file.contentUrl ?? undefined}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition hover:border-primary/40 hover:shadow-sm"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                              <Paperclip className="h-5 w-5 text-primary" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium text-card-foreground group-hover:text-primary">
                                {file.filename}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {formatFileSize(file.size)}
                              </p>
                            </div>
                            <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Sidebar Info */}
                <div className="space-y-4">
                  <div className="rounded-2xl border border-border bg-background p-5">
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                      Informacion
                    </h4>
                    <dl className="mt-4 space-y-4">
                      <InfoRow icon={<CheckCircle2 className="h-4 w-4" />} label="Estatus" value={ticket.status} />
                      <InfoRow icon={<Tag className="h-4 w-4" />} label="Categoria" value={ticket.statusCategory} />
                      <InfoRow icon={<FileText className="h-4 w-4" />} label="Tipo" value={ticket.issueType} />
                      <InfoRow icon={getPriorityIcon(ticket.priority)} label="Prioridad" value={ticket.priority} />
                    </dl>
                  </div>

                  <div className="rounded-2xl border border-border bg-background p-5">
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                      Personas
                    </h4>
                    <dl className="mt-4 space-y-4">
                      <InfoRow icon={<User className="h-4 w-4" />} label="Reportado por" value={ticket.reporter} />
                      <InfoRow icon={<Users className="h-4 w-4" />} label="Asignado a" value={ticket.assignee} />
                    </dl>
                  </div>

                  <div className="rounded-2xl border border-border bg-background p-5">
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                      Fechas
                    </h4>
                    <dl className="mt-4 space-y-4">
                      <InfoRow icon={<Calendar className="h-4 w-4" />} label="Creado" value={ticket.createdAt} />
                      <InfoRow icon={<Clock className="h-4 w-4" />} label="Actualizado" value={ticket.updatedAt} />
                    </dl>
                  </div>

                  {ticket.labels?.length > 0 && (
                    <div className="rounded-2xl border border-border bg-background p-5">
                      <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        <Tag className="h-4 w-4" />
                        Etiquetas
                      </h4>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {ticket.labels.map((label) => (
                          <span
                            key={label}
                            className="rounded-full border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground"
                          >
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Comment Form */}
                <div className="rounded-2xl border border-border bg-background p-5">
                  <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    <Send className="h-4 w-4" />
                    Agregar comentario
                  </h4>
                  <form onSubmit={handleCommentSubmit} className="mt-4 space-y-4">
                    <div>
                      <label htmlFor="comment-name" className="mb-2 block text-sm font-medium text-foreground">
                        Tu nombre
                      </label>
                      <input
                        id="comment-name"
                        value={authorName}
                        onChange={(event) => setAuthorName(event.target.value)}
                        placeholder="Escribe tu nombre"
                        className="h-11 w-full rounded-xl border border-border bg-card px-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 sm:max-w-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="comment-text" className="mb-2 block text-sm font-medium text-foreground">
                        Mensaje
                      </label>
                      <textarea
                        id="comment-text"
                        value={commentText}
                        onChange={(event) => setCommentText(event.target.value)}
                        placeholder="Escribe tu comentario aqui..."
                        rows={4}
                        className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="submit"
                        disabled={commentLoading}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {commentLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            Enviar comentario
                          </>
                        )}
                      </button>
                      {commentFeedback && (
                        <p className={`text-sm ${commentFeedback.includes("correctamente") ? "text-emerald-600" : "text-muted-foreground"}`}>
                          {commentFeedback}
                        </p>
                      )}
                    </div>
                  </form>
                </div>

                {/* Comments List */}
                <div className="rounded-2xl border border-border bg-background p-5">
                  <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    <MessageSquare className="h-4 w-4" />
                    Historial de comentarios ({ticket.comments.length})
                  </h4>

                  {ticket.comments.length > 0 ? (
                    <div className="mt-4 space-y-4">
                      {ticket.comments.map((comment, index) => (
                        <article
                          key={comment.id || `${comment.author}-${comment.createdAt}`}
                          className={`relative rounded-xl border border-border bg-card p-4 ${
                            index === 0 ? "ring-1 ring-primary/20" : ""
                          }`}
                        >
                          {index === 0 && (
                            <span className="absolute -top-2.5 right-3 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase text-primary-foreground">
                              Mas reciente
                            </span>
                          )}
                          <div className="flex items-start gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                              {comment.author.charAt(0).toUpperCase()}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <p className="text-sm font-semibold text-card-foreground">
                                  {comment.author}
                                </p>
                                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  {comment.createdAt}
                                </p>
                              </div>
                              <MarkdownContent content={comment.bodyMarkdown} compact />
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-10 text-center">
                      <MessageSquare className="h-10 w-10 text-muted-foreground/50" />
                      <p className="mt-3 text-sm font-medium text-muted-foreground">
                        Este ticket no tiene comentarios todavia
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground/70">
                        Se el primero en agregar un comentario
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : null}

        <p className="mt-6 inline-flex items-center gap-2 text-xs text-muted-foreground">
          <AlertCircle className="h-3.5 w-3.5" />
          Consulta en tiempo real usando tu cuenta de Jira.
        </p>
      </div>
    </section>
  )
}

type InfoRowProps = {
  icon: React.ReactNode
  label: string
  value: string
}

function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-muted-foreground">{icon}</div>
      <div className="min-w-0 flex-1">
        <dt className="text-xs text-muted-foreground">{label}</dt>
        <dd className="mt-0.5 text-sm font-medium text-foreground">{value}</dd>
      </div>
    </div>
  )
}

type StatusBadgeProps = {
  status: string
  category: string
}

function StatusBadge({ status, category }: StatusBadgeProps) {
  const cat = category.toLowerCase()
  let colors = "border-amber-300/50 bg-amber-100 text-amber-900"
  
  if (cat.includes("done") || cat.includes("complete") || cat.includes("terminado")) {
    colors = "border-emerald-300/50 bg-emerald-100 text-emerald-900"
  } else if (cat.includes("progress") || cat.includes("proceso")) {
    colors = "border-sky-300/50 bg-sky-100 text-sky-900"
  }

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${colors}`}>
      <span className="relative flex h-2 w-2">
        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
          cat.includes("done") || cat.includes("complete") ? "bg-emerald-400" :
          cat.includes("progress") || cat.includes("proceso") ? "bg-sky-400" : "bg-amber-400"
        }`} />
        <span className={`relative inline-flex h-2 w-2 rounded-full ${
          cat.includes("done") || cat.includes("complete") ? "bg-emerald-500" :
          cat.includes("progress") || cat.includes("proceso") ? "bg-sky-500" : "bg-amber-500"
        }`} />
      </span>
      {status}
    </span>
  )
}

function formatFileSize(value: number | null): string {
  if (!value || value <= 0) {
    return "N/A"
  }

  const mb = value / (1024 * 1024)
  if (mb >= 1) {
    return `${mb.toFixed(2)} MB`
  }

  const kb = value / 1024
  return `${kb.toFixed(0)} KB`
}

type MarkdownContentProps = {
  content: string
  compact?: boolean
}

function MarkdownContent({ content, compact = false }: MarkdownContentProps) {
  return (
    <div
      className={`markdown-body mt-3 text-sm leading-relaxed text-foreground sm:text-[15px] [&_h1]:mt-5 [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:mt-4 [&_h2]:text-xl [&_h2]:font-bold [&_h3]:mt-3 [&_h3]:text-lg [&_h3]:font-semibold [&_p]:my-2 [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1 [&_blockquote]:my-3 [&_blockquote]:border-l-4 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:text-muted-foreground [&_hr]:my-4 [&_hr]:border-border ${compact ? "mt-2" : ""}`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          a: (props) => (
            <a
              {...props}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary underline decoration-primary/50 underline-offset-2"
            />
          ),
          pre: (props) => (
            <pre
              {...props}
              className="my-3 overflow-x-auto rounded-lg border border-slate-300 bg-slate-100 p-3 font-mono text-[13px] leading-6 text-slate-800"
            />
          ),
          code: ({ className, children, ...props }) => {
            const isBlock = Boolean(className)
            if (isBlock) {
              return (
                <code {...props} className={className}>
                  {children}
                </code>
              )
            }

            return (
              <code
                {...props}
                className="rounded border border-slate-300 bg-slate-100 px-1.5 py-0.5 font-mono text-[0.85em] text-slate-700"
              >
                {children}
              </code>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
