import type { PageSlug } from '@/lib/contentBlockTypes'
import { FACILITY_LABELS, VILLAS } from '@/lib/villas'
import { getCmsImageFields } from '@/lib/cmsDefaults'
import { fieldGroupsFromDefaults } from '@/lib/adminPanelHelpers'
import { getPageContentDefaults } from '@/lib/contentDefaults'

const HOME_VILLA_CARD_SLUGS = ['mawar', 'jepun', 'anggrek', 'sandat'] as const

export const ADMIN_PANEL_PAGE_SLUGS: PageSlug[] = [
  'home',
  'about',
  'contact',
  'book',
  'villas',
  'global',
  'families',
  'faq',
  'promos',
  'rates',
  'terms',
  'mawar',
  'jepun',
  'anggrek',
  'sandat',
]

export function isPageSlug(slug: string): slug is PageSlug {
  return (ADMIN_PANEL_PAGE_SLUGS as readonly string[]).includes(slug)
}

type SectionDef = {
  id: string
  title: string
  pageSlugs: PageSlug[]
}

export const SECTION_DEFS: SectionDef[] = [
  { id: 'home', title: 'Home page', pageSlugs: ['home'] },
  { id: 'about', title: 'About page', pageSlugs: ['about'] },
  { id: 'contact', title: 'Contact page', pageSlugs: ['contact'] },
  { id: 'book', title: 'Book page', pageSlugs: ['book'] },
  { id: 'villas', title: 'Villas overview', pageSlugs: ['villas'] },
  { id: 'global', title: 'Header & footer', pageSlugs: ['global'] },
  { id: 'families', title: 'Families page', pageSlugs: ['families'] },
  { id: 'faq', title: 'FAQ page', pageSlugs: ['faq'] },
  { id: 'promos', title: 'Promos page', pageSlugs: ['promos'] },
  { id: 'rates', title: 'Rates page', pageSlugs: ['rates'] },
  { id: 'terms', title: 'Terms page', pageSlugs: ['terms'] },
  { id: 'mawar', title: 'Villa Mawar', pageSlugs: ['mawar'] },
  { id: 'jepun', title: 'Villa Jepun', pageSlugs: ['jepun'] },
  { id: 'anggrek', title: 'Villa Anggrek', pageSlugs: ['anggrek'] },
  { id: 'sandat', title: 'Villa Sandat', pageSlugs: ['sandat'] },
]

export type AdminPanelTextField = {
  kind: 'text'
  pageSlug: PageSlug
  blockKey: string
  label: string
  multiline?: boolean
  charLimit?: number
}

export type AdminPanelImageField = {
  kind: 'image'
  pageSlug: PageSlug
  imageBlockKey: string
  altBlockKey: string
  label: string
  companionFields?: AdminPanelTextField[]
}

export type AdminPanelField = AdminPanelTextField | AdminPanelImageField

export type AdminPanelFieldGroup = {
  id: string
  label: string
  fields: AdminPanelField[]
}

export type AdminPanelSection = {
  id: string
  title: string
  fieldGroups: AdminPanelFieldGroup[]
}

const textField = (
  slug: PageSlug,
  blockKey: string,
  label: string,
  opts?: { multiline?: boolean; charLimit?: number },
): AdminPanelTextField => ({
  kind: 'text',
  pageSlug: slug,
  blockKey,
  label,
  ...opts,
})

const SEO_PAGE_SLUGS: PageSlug[] = [
  'home',
  'about',
  'contact',
  'book',
  'villas',
  'faq',
  'terms',
  'families',
  'promos',
  'rates',
  'mawar',
  'jepun',
  'anggrek',
  'sandat',
]

function seoFieldGroup(pageSlug: PageSlug): AdminPanelFieldGroup {
  return {
    id: 'seo',
    label: 'SEO',
    fields: [
      textField(pageSlug, 'seo.title', 'Page title (shown in browser tab)', { charLimit: 60 }),
      textField(pageSlug, 'seo.description', 'Meta description (shown in Google)', {
        multiline: true,
        charLimit: 160,
      }),
    ],
  }
}

function appendSeoGroup(section: AdminPanelSection): AdminPanelSection {
  if (!SEO_PAGE_SLUGS.includes(section.id as PageSlug)) return section
  const pageSlug = section.id as PageSlug
  return {
    ...section,
    fieldGroups: [...section.fieldGroups, seoFieldGroup(pageSlug)],
  }
}

const villaFields = (slug: PageSlug): AdminPanelFieldGroup[] => {
  const reviewFields: AdminPanelTextField[] = []
  for (let i = 1; i <= 5; i++) {
    reviewFields.push(
      textField(slug, `reviews.${i}.text`, `Review ${i} text`, { multiline: true }),
      textField(slug, `reviews.${i}.name`, `Review ${i} name`),
      textField(slug, `reviews.${i}.country`, `Review ${i} country`),
      textField(slug, `reviews.${i}.platform`, `Review ${i} platform`),
    )
  }

  const ruleFields: AdminPanelTextField[] = []
  for (let i = 1; i <= 8; i++) {
    ruleFields.push(
      textField(slug, `rules.${i}.title`, `Rule ${i} title`),
      textField(slug, `rules.${i}.description`, `Rule ${i} description`, { multiline: true }),
    )
  }

  const highlightFields: AdminPanelTextField[] = []
  for (let i = 1; i <= 3; i++) {
    highlightFields.push(
      textField(slug, `highlights.${i}.label`, `Highlight ${i} label`),
      textField(slug, `highlights.${i}.mobile_label`, `Highlight ${i} mobile label`),
    )
  }

  const includedFields: AdminPanelTextField[] = []
  for (let i = 1; i <= 4; i++) {
    includedFields.push(textField(slug, `details.included.${i}`, `Included tag ${i}`))
  }

  const amenityFields: AdminPanelTextField[] = Object.entries(FACILITY_LABELS).map(
    ([key, label]) => textField(slug, `amenities.${key}`, label),
  )

  return [
    {
      id: 'hero',
      label: 'Hero',
      fields: [
        textField(slug, 'villa.name', 'Hero title'),
        textField(slug, 'hero.subtext', 'Hero subtext'),
        textField(slug, 'villa.price_idr', 'Price (IDR per night)'),
        textField(slug, 'hero.price_suffix', 'Price suffix'),
        textField(slug, 'hero.book_button', 'Book button label'),
        {
          kind: 'image',
          pageSlug: slug,
          imageBlockKey: 'villa.hero_image',
          altBlockKey: 'villa.hero_image.alt',
          label: 'Hero image',
        },
      ],
    },
    {
      id: 'intro',
      label: 'Intro',
      fields: [
        textField(slug, 'intro.welcome', 'Welcome eyebrow'),
        textField(slug, 'villa.description', 'Description', { multiline: true }),
        textField(slug, 'intro.location_note', 'Location note', { multiline: true }),
      ],
    },
    {
      id: 'details',
      label: 'Key details',
      fields: [
        textField(slug, 'details.location_label', 'Location card label'),
        textField(slug, 'details.location_value', 'Location card value'),
        textField(slug, 'details.size_label', 'Size card label'),
        textField(slug, 'details.size_value', 'Size card value'),
        textField(slug, 'details.bedrooms_bathrooms_label', 'Bedrooms card label'),
        textField(slug, 'details.bedrooms_bathrooms_value', 'Bedrooms card value'),
        textField(slug, 'villa.bedrooms', 'Bedrooms count'),
        textField(slug, 'villa.bathrooms', 'Bathrooms count'),
        textField(slug, 'villa.size_m2', 'Size (m²)'),
        textField(slug, 'details.pool_label', 'Pool card label'),
        textField(slug, 'details.pool_value', 'Pool card value'),
        textField(slug, 'details.checkin_label', 'Check-in card label'),
        textField(slug, 'details.checkin_value', 'Check-in card value'),
        textField(slug, 'details.transfer_label', 'Transfer card label'),
        textField(slug, 'details.transfer_value', 'Transfer card value'),
        textField(slug, 'details.included_heading', 'Included heading'),
        ...includedFields,
      ],
    },
    {
      id: 'highlights',
      label: 'Highlights strip',
      fields: highlightFields,
    },
    {
      id: 'video',
      label: 'Video',
      fields: [textField(slug, 'video.url', 'Promo video URL')],
    },
    {
      id: 'gallery',
      label: 'Gallery',
      fields: [
        textField(slug, 'gallery.title', 'Gallery heading'),
        textField(slug, 'gallery.swipe_hint', 'Gallery swipe hint'),
        textField(slug, 'villa.gallery_urls', 'Gallery image URLs (one per line)', {
          multiline: true,
        }),
      ],
    },
    {
      id: 'reviews',
      label: 'Reviews',
      fields: [
        textField(slug, 'reviews.title', 'Reviews heading'),
        textField(slug, 'reviews.subtitle', 'Reviews subtitle'),
        textField(slug, 'reviews.swipe_hint', 'Reviews swipe hint'),
        textField(slug, 'reviews.booking_prefix', 'Booking link prefix'),
        textField(slug, 'reviews.booking_brand', 'Booking link brand'),
        ...reviewFields,
      ],
    },
    {
      id: 'amenities',
      label: 'Amenities',
      fields: [
        textField(slug, 'amenities.title', 'Facilities heading'),
        textField(slug, 'amenities.subtitle', 'Facilities subtitle'),
        ...amenityFields,
      ],
    },
    {
      id: 'rules',
      label: 'House rules',
      fields: [textField(slug, 'rules.title', 'Rules heading'), ...ruleFields],
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp CTA',
      fields: [
        textField(slug, 'whatsapp.title', 'WhatsApp heading'),
        textField(slug, 'whatsapp.body', 'WhatsApp body', { multiline: true }),
        textField(slug, 'whatsapp.button', 'WhatsApp button'),
        textField(slug, 'whatsapp.message', 'WhatsApp prefill message', { multiline: true }),
      ],
    },
  ]
}

const VILLA_SECTIONS: AdminPanelSection[] = SECTION_DEFS.filter((def) =>
  ['mawar', 'jepun', 'anggrek', 'sandat'].includes(def.id),
).map((def) => ({
  id: def.id,
  title: def.title,
  fieldGroups: villaFields(def.pageSlugs[0]!),
}))

function homeVillaCardGroups(): AdminPanelFieldGroup[] {
  return HOME_VILLA_CARD_SLUGS.map((slug) => {
    const villa = VILLAS.find((v) => v.slug === slug)
    const label = villa?.name ?? `Villa ${slug.charAt(0).toUpperCase()}${slug.slice(1)}`
    return {
      id: `card-${slug}`,
      label,
      fields: [
        {
          kind: 'image',
          pageSlug: 'home',
          imageBlockKey: `cards.${slug}.image`,
          altBlockKey: `cards.${slug}.image.alt`,
          label: 'Card image',
        },
        textField('home', `cards.${slug}.title`, 'Title'),
        textField('home', `cards.${slug}.description`, 'Description', { multiline: true }),
        textField('home', `cards.${slug}.price`, 'Price (IDR per night, displayed as USD on English site)'),
      ],
    }
  })
}

function homeSection(): AdminPanelSection {
  const allDefaults = getPageContentDefaults('home')
  const defaultsWithoutCards: Record<string, string> = {}
  for (const [key, value] of Object.entries(allDefaults)) {
    if (!key.startsWith('cards.')) defaultsWithoutCards[key] = value
  }

  const baseGroups = fieldGroupsFromDefaults('home', defaultsWithoutCards, getCmsImageFields('home'))
  const cardGroups = homeVillaCardGroups()
  const villasIndex = baseGroups.findIndex((group) => group.id === 'villas')
  const fieldGroups =
    villasIndex >= 0
      ? [
          ...baseGroups.slice(0, villasIndex + 1),
          ...cardGroups,
          ...baseGroups.slice(villasIndex + 1),
        ]
      : [...baseGroups, ...cardGroups]

  return {
    id: 'home',
    title: 'Home page',
    fieldGroups,
  }
}

function cmsSection(id: PageSlug, title: string): AdminPanelSection {
  const defaults = getPageContentDefaults(id)
  return {
    id,
    title,
    fieldGroups: fieldGroupsFromDefaults(id, defaults, getCmsImageFields(id)),
  }
}

const CMS_PAGE_SECTIONS: AdminPanelSection[] = SECTION_DEFS.filter(
  (def) => !['mawar', 'jepun', 'anggrek', 'sandat'].includes(def.id),
).map((def) =>
  def.id === 'home' ? homeSection() : cmsSection(def.id as PageSlug, def.title),
)

const SECTIONS: AdminPanelSection[] = [...CMS_PAGE_SECTIONS, ...VILLA_SECTIONS].map(appendSeoGroup)

const BLOCK_LABELS: Record<string, string> = {
  'villa.name': 'Hero title',
  'villa.description': 'Description',
  'villa.price_idr': 'Price (IDR)',
  'villa.bedrooms': 'Bedrooms',
  'villa.bathrooms': 'Bathrooms',
  'villa.size_m2': 'Size (m²)',
  'villa.hero_image': 'Hero image',
  'villa.hero_image.alt': 'Hero alt text',
  'villa.gallery_urls': 'Gallery URLs',
  'hero.subtext': 'Hero subtext',
  'hero.book_button': 'Book button',
  'hero.price_suffix': 'Price suffix',
  'intro.welcome': 'Welcome eyebrow',
  'intro.location_note': 'Location note',
  'gallery.title': 'Gallery heading',
  'gallery.swipe_hint': 'Gallery swipe hint',
  'reviews.title': 'Reviews heading',
  'reviews.subtitle': 'Reviews subtitle',
  'amenities.title': 'Facilities heading',
  'amenities.subtitle': 'Facilities subtitle',
  'rules.title': 'Rules heading',
  'whatsapp.title': 'WhatsApp heading',
  'whatsapp.body': 'WhatsApp body',
  'whatsapp.button': 'WhatsApp button',
  'whatsapp.message': 'WhatsApp message',
  'video.url': 'Promo video URL',
  'hero.headline': 'Home hero headline',
  intro: 'About intro',
  body: 'About body',
  'seo.title': 'Page title (shown in browser tab)',
  'seo.description': 'Meta description (shown in Google)',
}

export function adminBlockLabel(blockKey: string): string {
  return BLOCK_LABELS[blockKey] ?? blockKey
}

export function getAdminPanelSectionForRoute(pageSlug: PageSlug | null): AdminPanelSection | null {
  if (!pageSlug) return null
  return SECTIONS.find((s) => s.id === pageSlug) ?? null
}

export function sectionPageSlugs(section: AdminPanelSection): PageSlug[] {
  const slugs = new Set<PageSlug>()
  for (const group of section.fieldGroups) {
    for (const field of group.fields) {
      slugs.add(field.pageSlug)
      if (field.kind === 'image' && field.companionFields) {
        for (const c of field.companionFields) slugs.add(c.pageSlug)
      }
    }
  }
  return [...slugs]
}

export function panelFieldDomId(pageSlug: PageSlug, blockKey: string): string {
  return `admin-panel-${pageSlug}-${blockKey.replace(/\./g, '-')}`
}
