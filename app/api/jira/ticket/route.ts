import { NextRequest, NextResponse } from "next/server"

const TICKET_KEY_REGEX = /^[A-Z][A-Z0-9]+-\d+$/

type JiraDocNode = {
  type?: string
  text?: string
  marks?: Array<{ type?: string; attrs?: { href?: string } }>
  attrs?: { level?: number }
  content?: JiraDocNode[]
}

type JiraComment = {
  id?: string
  created?: string
  author?: { displayName?: string }
  body?: JiraDocNode
}

type JiraHistory = {
  id?: string
  created?: string
  author?: { displayName?: string }
  items?: Array<{
    field?: string
    fromString?: string | null
    toString?: string | null
  }>
}

function formatJiraDate(value?: string): string {
  if (!value) {
    return "No disponible"
  }

  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) {
    return "No disponible"
  }

  return parsed.toLocaleString("es-MX", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function getJiraConfig() {
  const jiraBaseUrl = process.env.JIRA_BASE_URL?.trim()
  const jiraEmail = process.env.JIRA_EMAIL?.trim()
  const jiraApiToken = process.env.JIRA_API_TOKEN?.trim()

  if (!jiraBaseUrl || !jiraEmail || !jiraApiToken) {
    return null
  }

  const normalizedBaseUrl = jiraBaseUrl.replace(/\/$/, "")
  const authHeader = `Basic ${Buffer.from(`${jiraEmail}:${jiraApiToken}`).toString("base64")}`

  return {
    normalizedBaseUrl,
    authHeader,
  }
}

function applyMarks(text: string, marks?: JiraDocNode["marks"]): string {
  if (!marks?.length) {
    return text
  }

  return marks.reduce((current, mark) => {
    if (mark?.type === "strong") {
      return `**${current}**`
    }

    if (mark?.type === "em") {
      return `*${current}*`
    }

    if (mark?.type === "code") {
      return `\`${current.replace(/`/g, "\\`")}\``
    }

    if (mark?.type === "link" && mark?.attrs?.href) {
      return `[${current}](${mark.attrs.href})`
    }

    return current
  }, text)
}

function jiraDocToMarkdown(node?: JiraDocNode, depth = 0): string {
  if (!node) {
    return ""
  }

  if (node.type === "text") {
    return applyMarks(node.text ?? "", node.marks)
  }

  if (node.type === "hardBreak") {
    return "  \n"
  }

  const children = node.content ?? []

  if (node.type === "paragraph") {
    return `${children.map((child) => jiraDocToMarkdown(child, depth)).join("").trim()}\n\n`
  }

  if (node.type === "heading") {
    const level = Math.max(1, Math.min(6, node.attrs?.level ?? 2))
    const text = children.map((child) => jiraDocToMarkdown(child, depth)).join("").trim()
    return `${"#".repeat(level)} ${text}\n\n`
  }

  if (node.type === "listItem") {
    const body = children.map((child) => jiraDocToMarkdown(child, depth + 1)).join("").trim()
    const indent = "  ".repeat(Math.max(0, depth - 1))
    return `${indent}- ${body}\n`
  }

  if (node.type === "bulletList") {
    return `${children.map((child) => jiraDocToMarkdown(child, depth + 1)).join("")}\n`
  }

  if (node.type === "orderedList") {
    return `${children
      .map((child, index) => {
        const item = jiraDocToMarkdown(child, depth + 1).trim()
        const indent = "  ".repeat(depth)
        return `${indent}${index + 1}. ${item}`
      })
      .join("\n")}\n\n`
  }

  if (node.type === "codeBlock") {
    const code = children.map((child) => jiraDocToMarkdown(child, depth)).join("")
    return `\n\`\`\`\n${code}\n\`\`\`\n\n`
  }

  if (node.type === "rule") {
    return "\n---\n\n"
  }

  return children.map((child) => jiraDocToMarkdown(child, depth)).join("")
}

export async function GET(request: NextRequest) {
  const ticketKey = request.nextUrl.searchParams.get("key")?.trim().toUpperCase()

  if (!ticketKey || !TICKET_KEY_REGEX.test(ticketKey)) {
    return NextResponse.json(
      {
        error:
          "La clave del ticket no es valida. Usa un formato como MTK-123.",
      },
      { status: 400 },
    )
  }

  const config = getJiraConfig()

  if (!config) {
    return NextResponse.json(
      {
        error:
          "Faltan variables de entorno de Jira. Configura JIRA_BASE_URL, JIRA_EMAIL y JIRA_API_TOKEN.",
      },
      { status: 500 },
    )
  }

  const { normalizedBaseUrl, authHeader } = config
  const jiraIssueUrl = `${normalizedBaseUrl}/rest/api/3/issue/${encodeURIComponent(ticketKey)}?fields=summary,status,priority,issuetype,reporter,assignee,created,updated,project,labels,description,attachment,comment&expand=renderedFields,changelog`

  const jiraResponse = await fetch(jiraIssueUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: authHeader,
    },
    cache: "no-store",
  })

  if (jiraResponse.status === 401) {
    return NextResponse.json(
      {
        error:
          "Jira rechazo las credenciales. Verifica JIRA_EMAIL y JIRA_API_TOKEN.",
      },
      { status: 401 },
    )
  }

  if (jiraResponse.status === 403) {
    return NextResponse.json(
      {
        error:
          "Tu cuenta no tiene permisos para consultar este ticket en Jira.",
      },
      { status: 403 },
    )
  }

  if (jiraResponse.status === 404) {
    const body = await jiraResponse.text()
    const likelyPermissionIssue =
      body.toLowerCase().includes("permission") ||
      body.toLowerCase().includes("does not exist or you do not have")

    return NextResponse.json(
      {
        error: likelyPermissionIssue
          ? `Jira no permite ver ${ticketKey} con estas credenciales (o no existe).`
          : `No se encontro el ticket ${ticketKey}.`,
      },
      { status: 404 },
    )
  }

  if (!jiraResponse.ok) {
    const body = await jiraResponse.text()

    return NextResponse.json(
      {
        error: "No se pudo consultar Jira en este momento.",
        details: body.slice(0, 300),
      },
      { status: 502 },
    )
  }

  const issue = await jiraResponse.json()
  const fields = issue?.fields ?? {}
  const descriptionMarkdown = jiraDocToMarkdown(fields?.description).trim()

  const attachments = Array.isArray(fields?.attachment)
    ? fields.attachment.map((attachment: any) => ({
        id: attachment?.id ?? "",
        filename: attachment?.filename ?? "Adjunto",
        mimeType: attachment?.mimeType ?? "application/octet-stream",
        size: typeof attachment?.size === "number" ? attachment.size : null,
        contentUrl: attachment?.content ?? null,
      }))
    : []

  const comments: Array<{
    id: string
    author: string
    createdAt: string
    bodyMarkdown: string
  }> = Array.isArray(fields?.comment?.comments)
    ? fields.comment.comments.map((comment: JiraComment) => ({
        id: comment?.id ?? "",
        author: comment?.author?.displayName ?? "Usuario",
        createdAt: formatJiraDate(comment?.created),
        bodyMarkdown: jiraDocToMarkdown(comment?.body).trim() || "Sin contenido",
      }))
    : []

  const history: Array<{
    id: string
    author: string
    createdAt: string
    changes: string[]
  }> = Array.isArray(issue?.changelog?.histories)
    ? issue.changelog.histories.map((entry: JiraHistory) => ({
        id: entry?.id ?? "",
        author: entry?.author?.displayName ?? "Usuario",
        createdAt: formatJiraDate(entry?.created),
        changes: Array.isArray(entry?.items)
          ? entry.items.map((change) => {
              const from = change?.fromString?.trim() || "vacio"
              const to = change?.toString?.trim() || "vacio"
              const field = change?.field?.trim() || "Campo"
              return `${field}: ${from} -> ${to}`
            })
          : [],
      }))
    : []

  return NextResponse.json({
    key: issue?.key ?? ticketKey,
    summary: fields?.summary ?? "Sin resumen",
    status: fields?.status?.name ?? "Sin estatus",
    statusCategory: fields?.status?.statusCategory?.name ?? "Sin categoria",
    issueType: fields?.issuetype?.name ?? "Sin tipo",
    priority: fields?.priority?.name ?? "Sin prioridad",
    projectKey: fields?.project?.key ?? "",
    projectName: fields?.project?.name ?? "Sin proyecto",
    reporter: fields?.reporter?.displayName ?? "No disponible",
    assignee: fields?.assignee?.displayName ?? "Sin asignar",
    labels: Array.isArray(fields?.labels) ? fields.labels : [],
    descriptionMarkdown: descriptionMarkdown || "Sin descripcion",
    attachments,
    comments,
    history,
    createdAt: formatJiraDate(fields?.created),
    updatedAt: formatJiraDate(fields?.updated),
    browseUrl: `${normalizedBaseUrl}/browse/${issue?.key ?? ticketKey}`,
  })
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  const ticketKey = body?.key?.toString().trim().toUpperCase()
  const name = body?.name?.toString().trim()
  const comment = body?.comment?.toString().trim()

  if (!ticketKey || !TICKET_KEY_REGEX.test(ticketKey)) {
    return NextResponse.json(
      { error: "La clave del ticket no es valida." },
      { status: 400 },
    )
  }

  if (!name) {
    return NextResponse.json(
      { error: "El nombre es obligatorio." },
      { status: 400 },
    )
  }

  if (!comment) {
    return NextResponse.json(
      { error: "El comentario es obligatorio." },
      { status: 400 },
    )
  }

  const config = getJiraConfig()
  if (!config) {
    return NextResponse.json(
      {
        error:
          "Faltan variables de entorno de Jira. Configura JIRA_BASE_URL, JIRA_EMAIL y JIRA_API_TOKEN.",
      },
      { status: 500 },
    )
  }

  const { normalizedBaseUrl, authHeader } = config
  const jiraCommentUrl = `${normalizedBaseUrl}/rest/api/3/issue/${encodeURIComponent(ticketKey)}/comment`
  const message = `${name}: ${comment}`

  const jiraResponse = await fetch(jiraCommentUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: authHeader,
    },
    body: JSON.stringify({
      body: {
        type: "doc",
        version: 1,
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: message,
              },
            ],
          },
        ],
      },
    }),
    cache: "no-store",
  })

  if (!jiraResponse.ok) {
    const details = await jiraResponse.text()
    return NextResponse.json(
      {
        error: "No se pudo crear el comentario en Jira.",
        details: details.slice(0, 300),
      },
      { status: 502 },
    )
  }

  return NextResponse.json({ success: true })
}
