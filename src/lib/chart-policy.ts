export const CHART_TYPE_DATA_MAP = {
  line: 'trend over time',
  area: 'trend over time with magnitude emphasis',
  bar: 'categorical comparison',
  radar: 'sparse multivariate comparison only',
  pie: 'genuine part-to-whole only',
  radial: 'genuine part-to-whole or one primary completion value only',
} as const

export const CHART_DATA_RULES = {
  source: 'computed selectors only',
  tooltip: 'show exact source values',
  animation: 'presentational only; never alter, estimate, or exaggerate values',
  ai: 'AI-estimated chart values are prohibited',
} as const

export type ChartType = keyof typeof CHART_TYPE_DATA_MAP

export function chartTypeFor(intent: (typeof CHART_TYPE_DATA_MAP)[ChartType]): ChartType {
  const entry = Object.entries(CHART_TYPE_DATA_MAP).find(([, value]) => value === intent)
  if (!entry) throw new Error(`No approved chart type for: ${intent}`)
  return entry[0] as ChartType
}
