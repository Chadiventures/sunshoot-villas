import type { PageSlug } from '@/lib/contentBlockTypes'
import { VILLA_PAGE_SLUGS } from '@/lib/contentBlockTypes'
import type { Language } from '@/lib/translations'
import { translations } from '@/lib/translations'
import { getCmsDefaults } from '@/lib/cmsDefaults'
import { FACILITY_LABELS, getVillaBySlug } from '@/lib/villas'
import { getVillaLongDescription } from '@/lib/villa-descriptions'
import { getVillaNightlyPriceIdr } from '@/lib/pricing'
import { HERO_VIDEO, VILLA_IMAGES, getVillaGalleryImages } from '@/lib/media'
import { getVillaReviews } from '@/lib/villa-reviews'

const DISTANCE_NOTE =
  'Our villas are just a few hundred metres from Sunset Road. Seminyak Square and Eat Street are about a 10 minute walk away, and the beaches at Kuta, Legian and Seminyak are approximately 15 minutes by taxi or scooter.'

const HOUSE_RULES_DEFAULTS: { title: string; description: string }[] = [
  { title: 'Check-in', description: 'From 14:00' },
  { title: 'Check-out', description: 'By 11:00' },
  { title: 'No smoking indoors', description: 'Designated outdoor smoking area available' },
  { title: 'Quiet hours', description: '00:00 to 07:00' },
  { title: 'Pets not allowed', description: '' },
  { title: 'Children of all ages welcome', description: '' },
  { title: 'Baby crib', description: 'Free on request' },
  { title: 'Extra bed', description: 'Rp 150,000 per person per night on request' },
]

const HIGHLIGHTS_DEFAULTS = [
  { label: 'Private Pool', mobileLabel: 'Private Pool' },
  { label: 'Daily Cleaning', mobileLabel: 'Cleaning' },
  { label: 'Free Airport Transfer', mobileLabel: 'Airport Transfer' },
]

const INCLUDED_TAGS = [
  'Daily Cleaning',
  'Free WiFi',
  'Free Airport Transfer',
  'Baby Crib on Request',
]

const PAGE_SEO_DEFAULTS: Partial<Record<PageSlug, { title: string; description: string }>> = {
  home: {
    title: 'Sun Shoot Villas | Private Pool Villas in Seminyak, Bali',
    description:
      'Four private pool villas in the heart of Seminyak. Your private sanctuary with pool, daily cleaning and free airport transfer.',
  },
  about: {
    title: 'About Us | Sun Shoot Villas Seminyak',
    description:
      'Meet Warren and Lianah, your hosts at Sun Shoot Villas. Four private pool villas in Seminyak, Bali.',
  },
  contact: {
    title: 'Contact Us | Sun Shoot Villas Seminyak',
    description:
      'Get in touch with Sun Shoot Villas. Book your private pool villa in Seminyak, Bali directly.',
  },
  book: {
    title: 'Book Now | Sun Shoot Villas Seminyak',
    description: 'Book your private pool villa in Seminyak directly. Best rates guaranteed.',
  },
  villas: {
    title: 'Our Villas | Sun Shoot Villas Seminyak',
    description:
      'Choose from four private pool villas in Seminyak, Bali. Villa Mawar, Jepun, Anggrek and Sandat.',
  },
  faq: {
    title: 'FAQ | Sun Shoot Villas Seminyak',
    description:
      'Frequently asked questions about booking and staying at Sun Shoot Villas in Seminyak, Bali.',
  },
  terms: {
    title: 'Terms and Conditions | Sun Shoot Villas Seminyak',
    description: 'Booking and stay policies for Sun Shoot Villas Seminyak.',
  },
  families: {
    title: 'Families | Sun Shoot Villas Seminyak',
    description:
      'Family-friendly private pool villas in Seminyak with pool fencing, baby cots and child-safe layouts.',
  },
  promos: {
    title: 'Special Promotions | Sun Shoot Villas Seminyak',
    description: 'Exclusive deals and promotions when you book direct with Sun Shoot Villas.',
  },
  rates: {
    title: 'Published Rates | Sun Shoot Villas Seminyak',
    description:
      'Transparent villa rates for Sun Shoot Villas Seminyak. All rates include government taxes.',
  },
  mawar: {
    title: 'Villa Mawar | Sun Shoot Villas Seminyak',
    description:
      'Villa Mawar is a beautiful two-storey garden villa with private pool in Seminyak, Bali.',
  },
  jepun: {
    title: 'Villa Jepun | Sun Shoot Villas Seminyak',
    description:
      'Villa Jepun blends modern elegance with traditional Balinese architecture. Private pool in Seminyak.',
  },
  anggrek: {
    title: 'Villa Anggrek | Sun Shoot Villas Seminyak',
    description:
      'Villa Anggrek offers a spacious private pool experience in the heart of Seminyak, Bali.',
  },
  sandat: {
    title: 'Villa Sandat | Sun Shoot Villas Seminyak',
    description:
      'Villa Sandat is your private sanctuary with pool in Seminyak. Book direct for best rates.',
  },
}

const PAGE_SEO_DEFAULTS_ID: Partial<Record<PageSlug, { title: string; description: string }>> = {
  home: {
    title: 'Sun Shoot Villas | Vila Kolam Renang Pribadi di Seminyak, Bali',
    description:
      'Empat vila kolam renang pribadi di jantung Seminyak. Tempat perlindungan pribadi Anda dengan kolam, pembersihan harian, dan antar jemput bandara gratis.',
  },
  about: {
    title: 'Tentang Kami | Sun Shoot Villas Seminyak',
    description:
      'Kenalan dengan Warren dan Lianah, tuan rumah Anda di Sun Shoot Villas. Empat vila kolam renang pribadi di Seminyak, Bali.',
  },
  contact: {
    title: 'Hubungi Kami | Sun Shoot Villas Seminyak',
    description:
      'Hubungi Sun Shoot Villas. Pesan vila kolam renang pribadi Anda di Seminyak, Bali secara langsung.',
  },
  book: {
    title: 'Pesan Sekarang | Sun Shoot Villas Seminyak',
    description: 'Pesan vila kolam renang pribadi Anda di Seminyak secara langsung. Harga terbaik dijamin.',
  },
  villas: {
    title: 'Vila Kami | Sun Shoot Villas Seminyak',
    description:
      'Pilih dari empat vila kolam renang pribadi di Seminyak, Bali. Villa Mawar, Jepun, Anggrek, dan Sandat.',
  },
  faq: {
    title: 'FAQ | Sun Shoot Villas Seminyak',
    description:
      'Pertanyaan yang sering diajukan tentang pemesanan dan menginap di Sun Shoot Villas Seminyak, Bali.',
  },
  terms: {
    title: 'Syarat dan Ketentuan | Sun Shoot Villas Seminyak',
    description: 'Kebijakan pemesanan dan menginap untuk Sun Shoot Villas Seminyak.',
  },
  families: {
    title: 'Keluarga | Sun Shoot Villas Seminyak',
    description:
      'Vila kolam renang pribadi ramah keluarga di Seminyak dengan pagar kolam, boks bayi, dan tata letak aman untuk anak.',
  },
  promos: {
    title: 'Promosi Khusus | Sun Shoot Villas Seminyak',
    description: 'Penawaran eksklusif saat Anda memesan langsung dengan Sun Shoot Villas.',
  },
  rates: {
    title: 'Tarif Resmi | Sun Shoot Villas Seminyak',
    description:
      'Tarif vila transparan untuk Sun Shoot Villas Seminyak. Semua tarif sudah termasuk pajak pemerintah.',
  },
  mawar: {
    title: 'Villa Mawar | Sun Shoot Villas Seminyak',
    description:
      'Villa Mawar adalah vila taman dua lantai yang indah dengan kolam renang pribadi di Seminyak, Bali.',
  },
  jepun: {
    title: 'Villa Jepun | Sun Shoot Villas Seminyak',
    description:
      'Villa Jepun memadukan keanggunan modern dengan arsitektur Bali tradisional. Kolam renang pribadi di Seminyak.',
  },
  anggrek: {
    title: 'Villa Anggrek | Sun Shoot Villas Seminyak',
    description:
      'Villa Anggrek menawarkan pengalaman kolam renang pribadi yang luas di jantung Seminyak, Bali.',
  },
  sandat: {
    title: 'Villa Sandat | Sun Shoot Villas Seminyak',
    description:
      'Villa Sandat adalah tempat perlindungan pribadi Anda dengan kolam di Seminyak. Pesan langsung untuk harga terbaik.',
  },
}

function withSeoDefaults(
  pageSlug: PageSlug,
  defaults: Record<string, string>,
  locale: Language = 'en',
): Record<string, string> {
  const seo =
    locale === 'id'
      ? PAGE_SEO_DEFAULTS_ID[pageSlug] ?? PAGE_SEO_DEFAULTS[pageSlug]
      : PAGE_SEO_DEFAULTS[pageSlug]
  if (!seo) return defaults
  return {
    ...defaults,
    'seo.title': seo.title,
    'seo.description': seo.description,
  }
}

const DISTANCE_NOTE_ID =
  'Vila kami hanya berjarak beberapa ratus meter dari Sunset Road. Seminyak Square dan Eat Street sekitar 10 menit berjalan kaki, dan pantai di Kuta, Legian, dan Seminyak sekitar 15 menit dengan taksi atau skuter.'

const HOUSE_RULES_DEFAULTS_ID: { title: string; description: string }[] = [
  { title: 'Check-in', description: 'Mulai pukul 14:00' },
  { title: 'Check-out', description: 'Paling lambat pukul 11:00' },
  { title: 'Dilarang merokok di dalam', description: 'Area merokok luar ruangan tersedia' },
  { title: 'Jam tenang', description: '00:00 hingga 07:00' },
  { title: 'Hewan peliharaan tidak diperbolehkan', description: '' },
  { title: 'Anak-anak dari segala usia dipersilakan', description: '' },
  { title: 'Boks bayi', description: 'Gratis atas permintaan' },
  { title: 'Tempat tidur tambahan', description: 'Rp 150.000 per orang per malam atas permintaan' },
]

const HIGHLIGHTS_DEFAULTS_ID = [
  { label: 'Kolam Renang Pribadi', mobileLabel: 'Kolam Pribadi' },
  { label: 'Pembersihan Harian', mobileLabel: 'Kebersihan' },
  { label: 'Antar Jemput Bandara Gratis', mobileLabel: 'Transfer Bandara' },
]

const INCLUDED_TAGS_ID = [
  'Pembersihan Harian',
  'WiFi Gratis',
  'Antar Jemput Bandara Gratis',
  'Boks Bayi atas Permintaan',
]

function sharedVillaUiDefaults(locale: Language = 'en'): Record<string, string> {
  const id = translations.id
  const isId = locale === 'id'
  const out: Record<string, string> = {
    'hero.subtext': isId
      ? '2 Kamar Tidur | Kolam Renang Pribadi | Seminyak, Bali'
      : '2 Bedrooms | Private Pool | Seminyak, Bali',
    'hero.book_button': isId ? 'Pesan {villaName}' : 'Book {villaName}',
    'hero.price_suffix': isId ? 'per malam' : 'per night',
    'intro.welcome': isId ? 'Selamat Datang' : 'Welcome',
    'intro.location_note': isId ? DISTANCE_NOTE_ID : DISTANCE_NOTE,
    'gallery.title': isId ? 'Galeri Vila' : 'Villa Gallery',
    'gallery.swipe_hint': isId
      ? 'Geser ke kiri atau kanan untuk melihat foto'
      : 'Swipe left or right to browse photos',
    'reviews.title': isId ? 'Apa Kata Tamu Kami' : 'What Our Guests Say',
    'reviews.subtitle': isId
      ? 'Ulasan dari Google, TripAdvisor, dan Facebook'
      : 'Reviews from Google, TripAdvisor and Facebook',
    'reviews.swipe_hint': isId ? 'Geser untuk membaca ulasan lainnya' : 'Swipe to read more reviews',
    'reviews.booking_prefix': isId ? 'Baca semua ulasan di' : 'Read all reviews on',
    'reviews.booking_brand': 'booking.com',
    'amenities.title': isId ? 'Fasilitas Vila' : 'Villa Facilities',
    'amenities.subtitle': isId ? 'Apa yang termasuk' : 'What is included',
    'rules.title': isId ? 'Perlu Diketahui' : 'Good to Know',
    'whatsapp.body': isId
      ? 'Kirim pesan kepada kami via WhatsApp dan kami akan membalas dalam beberapa jam.'
      : 'Send us a message on WhatsApp and we will get back to you within a few hours.',
    'whatsapp.button': isId ? 'Kirim Pertanyaan via WhatsApp' : 'Send Inquiry on WhatsApp',
    'video.url': HERO_VIDEO,
    'details.location_label': isId ? 'Lokasi, Seminyak Bali' : 'Location, Seminyak Bali',
    'details.location_value': 'Jl. Bidadari II E, Seminyak',
    'details.size_label': isId ? 'Luas' : 'Size',
    'details.bedrooms_bathrooms_label': isId ? 'Kamar Tidur & Kamar Mandi' : 'Bedrooms & Bathrooms',
    'details.pool_label': isId ? 'Kolam' : 'Pool',
    'details.pool_value': isId ? 'Pribadi' : 'Private',
    'details.checkin_label': isId ? 'Check-in & Check-out' : 'Check-in & Check-out',
    'details.checkin_value': '14:00 / 11:00',
    'details.transfer_label': isId ? 'Antar Jemput Bandara' : 'Airport Transfer',
    'details.transfer_value': isId ? 'Gratis' : 'Free',
    'details.included_heading': isId ? 'Termasuk' : 'Included',
  }

  const highlights = isId ? HIGHLIGHTS_DEFAULTS_ID : HIGHLIGHTS_DEFAULTS
  highlights.forEach((item, i) => {
    const n = i + 1
    out[`highlights.${n}.label`] = item.label
    out[`highlights.${n}.mobile_label`] = item.mobileLabel
  })

  const includedTags = isId ? INCLUDED_TAGS_ID : INCLUDED_TAGS
  includedTags.forEach((label, i) => {
    out[`details.included.${i + 1}`] = label
  })

  const houseRules = isId ? HOUSE_RULES_DEFAULTS_ID : HOUSE_RULES_DEFAULTS
  houseRules.forEach((rule, i) => {
    const n = i + 1
    out[`rules.${n}.title`] = rule.title
    out[`rules.${n}.description`] = rule.description
  })

  for (const [key, label] of Object.entries(FACILITY_LABELS)) {
    out[`amenities.${key}`] = label
  }

  return out
}

export function getVillaContentDefaults(slug: string, locale: Language = 'en'): Record<string, string> {
  const villa = getVillaBySlug(slug)
  const t = translations[locale]
  const villaDescKey = `villa${slug.charAt(0).toUpperCase()}${slug.slice(1)}Description` as keyof typeof t
  const longDescription =
    locale === 'id' && typeof t[villaDescKey] === 'string'
      ? (t[villaDescKey] as string)
      : getVillaLongDescription(slug)
  const name = villa?.name ?? `Villa ${slug}`
  const description = longDescription || villa?.description || ''
  const stats = villa?.stats

  const defaults: Record<string, string> = {
    ...sharedVillaUiDefaults(locale),
    'villa.name': name,
    'villa.description': description,
    'villa.price_idr': String(getVillaNightlyPriceIdr(slug)),
    'villa.bedrooms': String(stats?.bedroomCount ?? 2),
    'villa.bathrooms': String(stats?.bathroomCount ?? 2),
    'villa.size_m2': String(stats?.sizeM2 ?? 150),
    'villa.hero_image': VILLA_IMAGES[slug] ?? VILLA_IMAGES.mawar,
    'villa.hero_image.alt': name,
    'villa.gallery_urls': getVillaGalleryImages(slug).join('\n'),
    'details.size_value': `${stats?.sizeM2 ?? 150} m2`,
    'details.bedrooms_bathrooms_value': `${stats?.bedroomCount ?? 2} Bed / ${stats?.bathroomCount ?? 2} Bath`,
    'whatsapp.title':
      locale === 'id' ? `Tertarik dengan ${name}?` : `Interested in ${name}?`,
    'whatsapp.message':
      locale === 'id'
        ? `Halo! Saya tertarik dengan ${name}. Bisakah Anda mengirimkan informasi lebih lanjut tentang ketersediaan dan harga?`
        : `Hi! I am interested in ${name}. Could you please send me more information about availability and pricing?`,
  }

  const reviews = getVillaReviews(slug)
  reviews.forEach((review, i) => {
    const n = i + 1
    defaults[`reviews.${n}.text`] = review.text
    defaults[`reviews.${n}.name`] = review.name
    defaults[`reviews.${n}.country`] = review.country
    defaults[`reviews.${n}.platform`] = review.platform
  })

  return defaults
}

export function getPageContentDefaults(
  pageSlug: PageSlug,
  locale: Language = 'en',
): Record<string, string> {
  if ((VILLA_PAGE_SLUGS as readonly string[]).includes(pageSlug)) {
    return withSeoDefaults(pageSlug, getVillaContentDefaults(pageSlug, locale), locale)
  }
  return withSeoDefaults(pageSlug, getCmsDefaults(pageSlug, locale), locale)
}
