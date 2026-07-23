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

