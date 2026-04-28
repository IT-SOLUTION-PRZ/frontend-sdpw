/** Formatuje odpowiedź błędu z Django REST Framework na jeden string dla UI. */
export const formatApiError = (payload) => {
  if (!payload || typeof payload !== "object") {
    return "Wystąpił nieoczekiwany błąd."
  }

  if (typeof payload.detail === "string") {
    return payload.detail
  }

  if (Array.isArray(payload.detail)) {
    return payload.detail.map(String).join(" ")
  }

  const parts = []
  for (const [key, val] of Object.entries(payload)) {
    if (key === "non_field_errors" && Array.isArray(val)) {
      parts.push(...val.map(String))
      continue
    }
    if (Array.isArray(val)) {
      parts.push(...val.map((v) => `${key}: ${v}`))
      continue
    }
    if (typeof val === "string") {
      parts.push(`${key}: ${val}`)
    }
  }

  return parts.length > 0 ? parts.join(" ") : "Wystąpił błąd walidacji."
}
