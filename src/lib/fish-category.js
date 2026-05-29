const PREDATOR_VALUES = new Set(["predator", "Drapieżnik"])
const PEACEFUL_VALUES = new Set(["peaceful", "Ryba spokojnego żeru"])
const MARINE_VALUES = new Set(["marine", "Ryba morska"])
const SALMONID_VALUES = new Set(["salmonid", "Salmonid"])

export function getFishImageUrl(fish, size = "600x400") {
  if (fish?.image_url) {
    return fish.image_url
  }
  const [w, h] = size.split("x")
  return `https://placehold.co/${w}x${h}/e2e8f0/475569?text=${encodeURIComponent(fish?.name || "Ryba")}`
}

export function getFishCategoryBadge(fish) {
  const category = fish?.category

  if (PREDATOR_VALUES.has(category)) {
    return { label: "Drapieżnik", className: "bg-red-500/90 backdrop-blur text-white" }
  }
  if (MARINE_VALUES.has(category)) {
    return { label: "Morska", className: "bg-blue-500/90 backdrop-blur text-white" }
  }
  if (SALMONID_VALUES.has(category)) {
    return { label: "Salmonid", className: "bg-sky-500/90 backdrop-blur text-white" }
  }
  if (PEACEFUL_VALUES.has(category)) {
    return { label: "Spokojnego żeru", className: "bg-emerald-500/90 backdrop-blur text-white" }
  }

  return { label: "Spokojnego żeru", className: "bg-emerald-500/90 backdrop-blur text-white" }
}

export function getFishDetailCategoryBadge(fish) {
  const badge = getFishCategoryBadge(fish)
  if (badge.className.includes("red")) {
    return { label: badge.label, className: "bg-red-100 text-red-700" }
  }
  if (badge.className.includes("blue")) {
    return { label: badge.label, className: "bg-blue-100 text-blue-700" }
  }
  if (badge.className.includes("sky")) {
    return { label: badge.label, className: "bg-sky-100 text-sky-700" }
  }
  return { label: badge.label, className: "bg-emerald-100 text-emerald-700" }
}
