export type Application = {
  slug: string
  icon: string
  tags: string[]
}

export const applications: Application[] = [
  {
    slug: 'facade-systems',
    icon: '🏗️',
    tags: ['Ventilated', 'All climates', 'Paintable'],
  },
  {
    slug: 'fire-protection',
    icon: '🔥',
    tags: ['E 120', 'EI 90', 'EW 120'],
  },
  {
    slug: 'wet-rooms',
    icon: '🚿',
    tags: ['Mapei', 'Schönox'],
  },
  {
    slug: 'commercial-buildings',
    icon: '🏢',
    tags: ['Interior', 'Exterior'],
  },
  {
    slug: 'steel-frame',
    icon: '🏭',
    tags: ['Industrial', 'Heavy-duty'],
  },
  {
    slug: 'residential',
    icon: '🏠',
    tags: ['Residential', 'Timber frame'],
  },
]
