import { SITE_URL, CONTACT, MANUFACTURER, PRODUCT } from './constants'

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Terasun Europe',
    url: SITE_URL,
    logo: `${SITE_URL}/imgs/products/product1.jpeg`,
    email: CONTACT.email,
    telephone: CONTACT.phone,
    vatID: CONTACT.vat,
    address: {
      '@type': 'PostalAddress',
      postalCode: '01370',
      addressLocality: 'Vantaa',
      addressCountry: 'FI',
    },
    areaServed: 'Europe',
    contactPoint: {
      '@type': 'ContactPoint',
      email: CONTACT.email,
      telephone: CONTACT.phone,
      contactType: 'customer support',
      areaServed: 'Europe',
    },
  }
}

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Terasun Europe',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/en/faq?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function productSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: PRODUCT.name,
    description: `CE-certified lightweight fiber cement board for European construction. ${PRODUCT.weightKgM2} kg/m² at ${PRODUCT.thickness} mm.`,
    brand: {
      '@type': 'Brand',
      name: 'Terasun',
    },
    manufacturer: {
      '@type': 'Organization',
      name: MANUFACTURER.name,
      address: { '@type': 'PostalAddress', addressCountry: 'CN' },
      url: MANUFACTURER.website,
    },
    offers: {
      '@type': 'Offer',
      seller: { '@type': 'Organization', name: 'Terasun Europe' },
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      areaServed: 'Europe',
    },
    hasCertification: [
      { '@type': 'Certification', name: `CE ${PRODUCT.ce}` },
      { '@type': 'Certification', name: `ETA ${PRODUCT.eta}` },
      { '@type': 'Certification', name: `EPD ${PRODUCT.epd}` },
    ],
  }
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  }
}

export function localBusinessSchema(country: string, locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `Terasun Europe — ${country}`,
    url: `${SITE_URL}/${locale}/markets/${country.toLowerCase().replace(/\s+/g, '-')}`,
    email: CONTACT.email,
    telephone: CONTACT.phone,
    areaServed: country,
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
