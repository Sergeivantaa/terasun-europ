export type Application = {
  slug: string
  icon: string
  tags: string[]
}

export const applications: Application[] = [
  // Original slugs (kept for backwards compatibility)
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
  // SEO-optimised slugs (new pages targeting specific search queries)
  {
    slug: 'cement-board-ventilated-facades',
    icon: '🏗️',
    tags: ['Ventilated', 'All climates', 'Paintable'],
  },
  {
    slug: 'cement-board-exterior-plaster',
    icon: '🧱',
    tags: ['Render carrier', 'Exterior', 'Mineral render'],
  },
  {
    slug: 'cement-board-wet-rooms',
    icon: '🚿',
    tags: ['Moisture resistant', 'Tile backer', 'Waterproof system'],
  },
  {
    slug: 'cement-board-bathrooms',
    icon: '🛁',
    tags: ['Shower walls', 'Bathroom substrate', 'Tile backing'],
  },
  {
    slug: 'fire-rated-cement-board-wall-system',
    icon: '🔥',
    tags: ['E 120', 'EI 90', 'EW 120'],
  },
  {
    slug: 'cement-board-steel-frame-construction',
    icon: '⚙️',
    tags: ['Steel frame', '400 mm studs', '600 mm studs'],
  },
  {
    slug: 'cement-board-modular-construction',
    icon: '📦',
    tags: ['Modular', 'Prefabricated', 'Offsite'],
  },
  {
    slug: 'cement-board-prefabricated-buildings',
    icon: '🏭',
    tags: ['Prefabricated', 'Offsite', 'Volumetric'],
  },
  {
    slug: 'cement-board-interior-walls',
    icon: '🏠',
    tags: ['Interior', 'Partition', 'Drywall alternative'],
  },
  {
    slug: 'cement-board-exterior-walls',
    icon: '🌧️',
    tags: ['Exterior', 'Weather resistant', 'Sheathing'],
  },
  {
    slug: 'cement-board-renovation',
    icon: '🔨',
    tags: ['Renovation', 'Retrofit', 'Refurbishment'],
  },
]
