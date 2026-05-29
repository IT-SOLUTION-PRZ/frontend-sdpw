import { jsPDF } from "jspdf"

function removeAccents(str) {
  if (!str) return ""
  if (typeof str !== "string") return String(str)
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l")
    .replace(/Ł/g, "L")
}

export function downloadFavoritesPdf(favorites) {
  if (!favorites?.length) {
    return
  }

  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 20
  const maxY = pageHeight - 20

  const title = "RAPORT ULUBIONYCH ZESTAWOW"
  doc.setFont("helvetica", "bold")
  doc.setFontSize(20)
  doc.text(title, margin, 22)

  doc.setLineWidth(0.5)
  doc.line(margin, 28, pageWidth - margin, 28)

  doc.setFont("helvetica", "normal")
  doc.setFontSize(11)
  doc.text(
    removeAccents(`Liczba zestawow: ${favorites.length}`),
    margin,
    36,
  )

  let y = 48

  favorites.forEach((fav, index) => {
    if (y > maxY - 40) {
      doc.addPage()
      y = margin
    }

    if (index > 0) {
      doc.setLineWidth(0.15)
      doc.line(margin, y, pageWidth - margin, y)
      y += 10
    }

    doc.setFont("helvetica", "bold")
    doc.setFontSize(13)
    doc.text(removeAccents(`${index + 1}. ${fav.name || "Bez nazwy"}`), margin, y)
    y += 9

    doc.setFont("helvetica", "normal")
    doc.setFontSize(11)

    const lines = [
      `Ryba: ${fav.fish || "-"}`,
      `Przyneta: ${fav.bait || "-"}`,
      fav.producer ? `Producent: ${fav.producer}` : null,
      `Zbiornik: ${fav.water || "-"}`,
      `Pora roku: ${fav.season || "-"}`,
    ].filter(Boolean)

    lines.forEach((line) => {
      doc.text(removeAccents(line), margin + 4, y)
      y += 7
    })

    if (fav.bait_description) {
      const desc = doc.splitTextToSize(
        removeAccents(`Opis: ${fav.bait_description}`),
        pageWidth - margin * 2,
      )
      doc.text(desc, margin + 4, y)
      y += desc.length * 6 + 2
    }

    if (fav.usage_tips) {
      const tips = doc.splitTextToSize(
        removeAccents(`Wskazowki: ${fav.usage_tips}`),
        pageWidth - margin * 2,
      )
      doc.text(tips, margin + 4, y)
      y += tips.length * 6 + 2
    }

    y += 6
  })

  doc.save("raport-ulubione.pdf")
}
