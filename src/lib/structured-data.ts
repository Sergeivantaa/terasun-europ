import { SITE_URL, CONTACT, MANUFACTURER, PRODUCT } from './constants'

export function organizationSchema(locale = 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Terasun Europe',
    url: `${SITE_URL}/${locale}`,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/imgs/products/product1.jpeg`,
    },
    email: CONTACT.email,
    vatID: CONTACT.vat,
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT.address,
      postalCode: '01370',
      addressLocality: 'Vantaa',
      addressCountry: 'FI',
    },
    areaServed: {
      '@type': 'Continent',
      name: 'Europe',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: CONTACT.email,
      contactType: 'sales',
      availableLanguage: ['English', 'Finnish', 'German', 'French'],
      areaServed: 'Europe',
    },
    sameAs: [MANUFACTURER.website],
  }
}

export function webSiteSchema(locale = 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: 'Terasun Europe',
    url: `${SITE_URL}/${locale}`,
    inLanguage: locale,
    publisher: { '@id': `${SITE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/en/faq?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function productSchema(locale = 'en', description?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${SITE_URL}/${locale}/products#product`,
    name: PRODUCT.name,
    description: description ?? `CE-certified lightweight fiber cement board for European construction. ${PRODUCT.weightKgM2} kg/m² at ${PRODUCT.thickness} mm.`,
    brand: { '@type': 'Brand', name: 'Terasun' },
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
      url: `${SITE_URL}/${locale}/contact`,
    },
    hasCertification: [
      { '@type': 'Certification', name: `CE ${PRODUCT.ce}`, issuedBy: { '@type': 'Organization', name: 'Notified Body 1023' } },
      { '@type': 'Certification', name: `ETA ${PRODUCT.eta}`, issuedBy: { '@type': 'Organization', name: 'EOTA' } },
      { '@type': 'Certification', name: `EPD ${PRODUCT.epd}` },
    ],
    countryOfAssembly: 'CN',
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

export function localBusinessSchema(countryName: string, countrySlug: string, locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `Terasun Europe — ${countryName}`,
    url: `${SITE_URL}/${locale}/markets/${countrySlug}`,
    email: CONTACT.email,
    parentOrganization: { '@id': `${SITE_URL}/#organization` },
    areaServed: {
      '@type': 'Country',
      name: countryName,
    },
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
