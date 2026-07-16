#!/usr/bin/env node
// Adds common + footer translations for the 8 largest EU market languages
const fs = require('fs')
const path = require('path')

const translations = {
  de: {
    common: {
      learnMore: 'Mehr erfahren',
      requestQuotation: 'Angebot anfragen',
      contactUs: 'Kontakt aufnehmen',
      downloadDocs: 'Dokumente herunterladen',
      notManufacturer: 'Terasun Europe ist nicht der Hersteller von Terasun-Produkten.',
      authRep: 'Autorisierter Europäischer Vertreter',
      backToTop: 'Nach oben',
    },
    footer: {
      desc: 'Autorisierter Europäischer Vertreter für Terasun TSM Faserzementplatten.',
      authLine: 'Autorisierter Europäischer Vertreter',
      notManufacturer: 'Terasun Europe ist nicht der Hersteller von Terasun-Produkten.',
      colProduct: 'Produkt',
      colDocs: 'Dokumentation',
      colCompany: 'Unternehmen',
      privacy: 'Datenschutzrichtlinie',
      cookies: 'Cookie-Richtlinie',
      terms: 'Nutzungsbedingungen',
      legal: '© 2025 Terasun Europe. Alle Rechte vorbehalten.',
      legalMfr: 'Produkte hergestellt von Zhejiang Terasun Air Duct Co., Ltd., China.',
    },
  },
  fr: {
    common: {
      learnMore: 'En savoir plus',
      requestQuotation: 'Demander un devis',
      contactUs: 'Nous contacter',
      downloadDocs: 'Télécharger les documents',
      notManufacturer: "Terasun Europe n'est pas le fabricant des produits Terasun.",
      authRep: 'Représentant européen autorisé',
      backToTop: 'Retour en haut',
    },
    footer: {
      desc: 'Représentant européen autorisé pour les panneaux de fibrociment Terasun TSM.',
      authLine: 'Représentant européen autorisé',
      notManufacturer: "Terasun Europe n'est pas le fabricant des produits Terasun.",
      colProduct: 'Produit',
      colDocs: 'Documentation',
      colCompany: 'Entreprise',
      privacy: 'Politique de confidentialité',
      cookies: 'Politique de cookies',
      terms: "Conditions d'utilisation",
      legal: '© 2025 Terasun Europe. Tous droits réservés.',
      legalMfr: 'Produits fabriqués par Zhejiang Terasun Air Duct Co., Ltd., Chine.',
    },
  },
  es: {
    common: {
      learnMore: 'Más información',
      requestQuotation: 'Solicitar presupuesto',
      contactUs: 'Contactar',
      downloadDocs: 'Descargar documentos',
      notManufacturer: 'Terasun Europe no es el fabricante de los productos Terasun.',
      authRep: 'Representante Europeo Autorizado',
      backToTop: 'Volver arriba',
    },
    footer: {
      desc: 'Representante Europeo Autorizado para los paneles de fibrocemento Terasun TSM.',
      authLine: 'Representante Europeo Autorizado',
      notManufacturer: 'Terasun Europe no es el fabricante de los productos Terasun.',
      colProduct: 'Producto',
      colDocs: 'Documentación',
      colCompany: 'Empresa',
      privacy: 'Política de privacidad',
      cookies: 'Política de cookies',
      terms: 'Condiciones de uso',
      legal: '© 2025 Terasun Europe. Todos los derechos reservados.',
      legalMfr: 'Productos fabricados por Zhejiang Terasun Air Duct Co., Ltd., China.',
    },
  },
  it: {
    common: {
      learnMore: 'Scopri di più',
      requestQuotation: 'Richiedi preventivo',
      contactUs: 'Contattaci',
      downloadDocs: 'Scarica documenti',
      notManufacturer: 'Terasun Europe non è il produttore dei prodotti Terasun.',
      authRep: 'Rappresentante Europeo Autorizzato',
      backToTop: 'Torna su',
    },
    footer: {
      desc: 'Rappresentante Europeo Autorizzato per i pannelli in fibrocemento Terasun TSM.',
      authLine: 'Rappresentante Europeo Autorizzato',
      notManufacturer: 'Terasun Europe non è il produttore dei prodotti Terasun.',
      colProduct: 'Prodotto',
      colDocs: 'Documentazione',
      colCompany: 'Azienda',
      privacy: 'Informativa sulla privacy',
      cookies: 'Informativa sui cookie',
      terms: 'Termini di utilizzo',
      legal: '© 2025 Terasun Europe. Tutti i diritti riservati.',
      legalMfr: 'Prodotti fabbricati da Zhejiang Terasun Air Duct Co., Ltd., Cina.',
    },
  },
  pl: {
    common: {
      learnMore: 'Dowiedz się więcej',
      requestQuotation: 'Zapytaj o ofertę',
      contactUs: 'Skontaktuj się',
      downloadDocs: 'Pobierz dokumenty',
      notManufacturer: 'Terasun Europe nie jest producentem produktów Terasun.',
      authRep: 'Autoryzowany Przedstawiciel Europejski',
      backToTop: 'Powrót na górę',
    },
    footer: {
      desc: 'Autoryzowany Przedstawiciel Europejski dla płyt cementowo-włóknistych Terasun TSM.',
      authLine: 'Autoryzowany Przedstawiciel Europejski',
      notManufacturer: 'Terasun Europe nie jest producentem produktów Terasun.',
      colProduct: 'Produkt',
      colDocs: 'Dokumentacja',
      colCompany: 'Firma',
      privacy: 'Polityka prywatności',
      cookies: 'Polityka cookies',
      terms: 'Warunki korzystania',
      legal: '© 2025 Terasun Europe. Wszelkie prawa zastrzeżone.',
      legalMfr: 'Produkty wyprodukowane przez Zhejiang Terasun Air Duct Co., Ltd., Chiny.',
    },
  },
  ru: {
    common: {
      learnMore: 'Подробнее',
      requestQuotation: 'Запрос КП',
      contactUs: 'Связаться с нами',
      downloadDocs: 'Скачать документы',
      notManufacturer: 'Terasun Europe не является производителем продукции Terasun.',
      authRep: 'Уполномоченный Европейский Представитель',
      backToTop: 'Наверх',
    },
    footer: {
      desc: 'Уполномоченный Европейский Представитель по фиброцементным плитам Terasun TSM.',
      authLine: 'Уполномоченный Европейский Представитель',
      notManufacturer: 'Terasun Europe не является производителем продукции Terasun.',
      colProduct: 'Продукт',
      colDocs: 'Документация',
      colCompany: 'Компания',
      privacy: 'Политика конфиденциальности',
      cookies: 'Политика cookies',
      terms: 'Условия использования',
      legal: '© 2025 Terasun Europe. Все права защищены.',
      legalMfr: 'Продукты произведены компанией Zhejiang Terasun Air Duct Co., Ltd., Китай.',
    },
  },
  pt: {
    common: {
      learnMore: 'Saiba mais',
      requestQuotation: 'Solicitar orçamento',
      contactUs: 'Contacte-nos',
      downloadDocs: 'Descarregar documentos',
      notManufacturer: 'A Terasun Europe não é fabricante dos produtos Terasun.',
      authRep: 'Representante Europeu Autorizado',
      backToTop: 'Voltar ao topo',
    },
    footer: {
      desc: 'Representante Europeu Autorizado para painéis de fibrocimento Terasun TSM.',
      authLine: 'Representante Europeu Autorizado',
      notManufacturer: 'A Terasun Europe não é fabricante dos produtos Terasun.',
      colProduct: 'Produto',
      colDocs: 'Documentação',
      colCompany: 'Empresa',
      privacy: 'Política de privacidade',
      cookies: 'Política de cookies',
      terms: 'Termos de utilização',
      legal: '© 2025 Terasun Europe. Todos os direitos reservados.',
      legalMfr: 'Produtos fabricados pela Zhejiang Terasun Air Duct Co., Ltd., China.',
    },
  },
  nl: {
    common: {
      learnMore: 'Meer informatie',
      requestQuotation: 'Offerte aanvragen',
      contactUs: 'Neem contact op',
      downloadDocs: 'Documenten downloaden',
      notManufacturer: 'Terasun Europe is niet de fabrikant van Terasun-producten.',
      authRep: 'Geautoriseerde Europese Vertegenwoordiger',
      backToTop: 'Terug naar boven',
    },
    footer: {
      desc: 'Geautoriseerde Europese Vertegenwoordiger voor Terasun TSM vezelcementplaten.',
      authLine: 'Geautoriseerde Europese Vertegenwoordiger',
      notManufacturer: 'Terasun Europe is niet de fabrikant van Terasun-producten.',
      colProduct: 'Product',
      colDocs: 'Documentatie',
      colCompany: 'Bedrijf',
      privacy: 'Privacybeleid',
      cookies: 'Cookiebeleid',
      terms: 'Gebruiksvoorwaarden',
      legal: '© 2025 Terasun Europe. Alle rechten voorbehouden.',
      legalMfr: 'Producten gemaakt door Zhejiang Terasun Air Duct Co., Ltd., China.',
    },
  },
  fi: {
    common: {
      learnMore: 'Lue lisää',
      requestQuotation: 'Pyydä tarjous',
      contactUs: 'Ota yhteyttä',
      downloadDocs: 'Lataa asiakirjat',
      notManufacturer: 'Terasun Europe ei ole Terasun-tuotteiden valmistaja.',
      authRep: 'Valtuutettu Eurooppalainen Edustaja',
      backToTop: 'Takaisin ylös',
    },
    footer: {
      desc: 'Valtuutettu Eurooppalainen Edustaja Terasun TSM -kuitusementtilevyille.',
      authLine: 'Valtuutettu Eurooppalainen Edustaja',
      notManufacturer: 'Terasun Europe ei ole Terasun-tuotteiden valmistaja.',
      colProduct: 'Tuote',
      colDocs: 'Dokumentaatio',
      colCompany: 'Yritys',
      privacy: 'Tietosuojakäytäntö',
      cookies: 'Evästekäytäntö',
      terms: 'Käyttöehdot',
      legal: '© 2025 Terasun Europe. Kaikki oikeudet pidätetään.',
      legalMfr: 'Tuotteet valmistaa Zhejiang Terasun Air Duct Co., Ltd., Kiina.',
    },
  },
  sv: {
    common: {
      learnMore: 'Läs mer',
      requestQuotation: 'Begär offert',
      contactUs: 'Kontakta oss',
      downloadDocs: 'Ladda ned dokument',
      notManufacturer: 'Terasun Europe är inte tillverkaren av Terasun-produkter.',
      authRep: 'Auktoriserad Europeisk Representant',
      backToTop: 'Tillbaka till toppen',
    },
    footer: {
      desc: 'Auktoriserad Europeisk Representant för Terasun TSM fibercementskivor.',
      authLine: 'Auktoriserad Europeisk Representant',
      notManufacturer: 'Terasun Europe är inte tillverkaren av Terasun-produkter.',
      colProduct: 'Produkt',
      colDocs: 'Dokumentation',
      colCompany: 'Företag',
      privacy: 'Integritetspolicy',
      cookies: 'Cookiepolicy',
      terms: 'Användarvillkor',
      legal: '© 2025 Terasun Europe. Alla rättigheter förbehållna.',
      legalMfr: 'Produkter tillverkade av Zhejiang Terasun Air Duct Co., Ltd., Kina.',
    },
  },
  da: {
    common: {
      learnMore: 'Læs mere',
      requestQuotation: 'Anmod om tilbud',
      contactUs: 'Kontakt os',
      downloadDocs: 'Download dokumenter',
      notManufacturer: 'Terasun Europe er ikke producenten af Terasun-produkter.',
      authRep: 'Autoriseret Europæisk Repræsentant',
      backToTop: 'Tilbage til toppen',
    },
    footer: {
      desc: 'Autoriseret Europæisk Repræsentant for Terasun TSM fibercementplader.',
      authLine: 'Autoriseret Europæisk Repræsentant',
      notManufacturer: 'Terasun Europe er ikke producenten af Terasun-produkter.',
      colProduct: 'Produkt',
      colDocs: 'Dokumentation',
      colCompany: 'Virksomhed',
      privacy: 'Privatlivspolitik',
      cookies: 'Cookiepolitik',
      terms: 'Brugsvilkår',
      legal: '© 2025 Terasun Europe. Alle rettigheder forbeholdes.',
      legalMfr: 'Produkter fremstillet af Zhejiang Terasun Air Duct Co., Ltd., Kina.',
    },
  },
  nb: {
    common: {
      learnMore: 'Les mer',
      requestQuotation: 'Be om tilbud',
      contactUs: 'Kontakt oss',
      downloadDocs: 'Last ned dokumenter',
      notManufacturer: 'Terasun Europe er ikke produsenten av Terasun-produkter.',
      authRep: 'Autorisert Europeisk Representant',
      backToTop: 'Tilbake til toppen',
    },
    footer: {
      desc: 'Autorisert Europeisk Representant for Terasun TSM fibersementplater.',
      authLine: 'Autorisert Europeisk Representant',
      notManufacturer: 'Terasun Europe er ikke produsenten av Terasun-produkter.',
      colProduct: 'Produkt',
      colDocs: 'Dokumentasjon',
      colCompany: 'Selskap',
      privacy: 'Personvernregler',
      cookies: 'Informasjonskapselpolicy',
      terms: 'Bruksvilkår',
      legal: '© 2025 Terasun Europe. Alle rettigheter forbeholdt.',
      legalMfr: 'Produkter produsert av Zhejiang Terasun Air Duct Co., Ltd., Kina.',
    },
  },
  cs: {
    common: {
      learnMore: 'Zjistit více',
      requestQuotation: 'Požádat o nabídku',
      contactUs: 'Kontaktujte nás',
      downloadDocs: 'Stáhnout dokumenty',
      notManufacturer: 'Terasun Europe není výrobcem produktů Terasun.',
      authRep: 'Oprávněný Evropský Zástupce',
      backToTop: 'Zpět nahoru',
    },
    footer: {
      desc: 'Oprávněný Evropský Zástupce pro vláknocementové desky Terasun TSM.',
      authLine: 'Oprávněný Evropský Zástupce',
      notManufacturer: 'Terasun Europe není výrobcem produktů Terasun.',
      colProduct: 'Produkt',
      colDocs: 'Dokumentace',
      colCompany: 'Společnost',
      privacy: 'Zásady ochrany osobních údajů',
      cookies: 'Zásady cookies',
      terms: 'Podmínky použití',
      legal: '© 2025 Terasun Europe. Všechna práva vyhrazena.',
      legalMfr: 'Výrobky vyráběné společností Zhejiang Terasun Air Duct Co., Ltd., Čína.',
    },
  },
}

const messagesDir = path.join(__dirname, '..', 'messages')
let updated = 0

for (const [locale, patches] of Object.entries(translations)) {
  const filePath = path.join(messagesDir, `${locale}.json`)
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP ${locale} — file not found`)
    continue
  }
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  for (const [ns, keys] of Object.entries(patches)) {
    if (!data[ns]) data[ns] = {}
    for (const [k, v] of Object.entries(keys)) {
      data[ns][k] = v
    }
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n')
  updated++
  console.log(`✓ ${locale}`)
}
console.log(`\nUpdated ${updated} locale files.`)
