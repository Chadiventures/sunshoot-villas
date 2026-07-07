import type { PageSlug } from '@/lib/contentBlockTypes'
import { translations, type Language } from '@/lib/translations'
import { SITE } from '@/lib/site'
import { getVillaNightlyPriceIdr } from '@/lib/pricing'
import { VILLAS } from '@/lib/villas'
import {
  BOOKING_PHOTOS,
  HERO_VIDEO,
  MAPS_EMBED,
  VILLA_IMAGES,
} from '@/lib/media'
import type { CmsImageFieldDef } from '@/lib/adminPanelHelpers'
import { getCmsDefaultsId } from '@/lib/cmsDefaultsId'

const en = translations.en

function homeVillaCardDefaults(): Record<string, string> {
  const out: Record<string, string> = {}
  for (const villa of VILLAS) {
    out[`cards.${villa.slug}.image`] = VILLA_IMAGES[villa.slug] ?? VILLA_IMAGES.mawar
    out[`cards.${villa.slug}.image.alt`] = villa.name
    out[`cards.${villa.slug}.title`] = villa.name
    out[`cards.${villa.slug}.description`] = villa.description
    out[`cards.${villa.slug}.price`] = String(getVillaNightlyPriceIdr(villa.slug))
  }
  return out
}

const CONTACT_HERO_IMAGE =
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80'
const CONTACT_IMAGE =
  'https://cf.bstatic.com/xdata/images/hotel/max1280x900/185354560.jpg?k=6a8de904dbd7d2121d6e233fd5a13746df529ac987d74da48410ae3357898cfa&o=&hp=1'
const BOOK_HERO_IMAGE =
  'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1920&q=80'
const STORY_IMAGE = BOOKING_PHOTOS[0]

export const FAQ_ITEM_IDS = [
  'guests',
  'airport',
  'pools',
  'checkin',
  'wifi',
  'payment',
  'pets',
  'cleaning',
  'pool-privacy',
  'connect-villas',
  'pool-cleaning',
  'ac',
  'beach-walk',
  'sandat-guests',
  'two-floors',
  'multiple-villas',
  'breakfast',
  'contact',
] as const

const FAQ_DEFAULTS: Record<string, string> = {
  'page.title': 'FAQ',
  'section.title': 'Frequently Asked Questions',
  'faq.guests.question': 'How many guests can stay in each villa?',
  'faq.guests.answer':
    'All four villas have 2 bedrooms and can comfortably accommodate 4 guests. Baby cribs are available free of charge on request, and extra beds can be arranged for Rp 150,000 per person per night.',
  'faq.airport.question': 'Is airport transfer included?',
  'faq.airport.answer':
    'Yes! We offer free airport transfer for all guests. Our friendly driver will be waiting for you when you land so you can start your Bali holiday stress free.',
  'faq.pools.question': 'Do the villas have private pools?',
  'faq.pools.answer':
    'Yes, every villa has its own private pool. Your pool is exclusively for your group during your stay.',
  'faq.checkin.question': 'What time is check-in and check-out?',
  'faq.checkin.answer':
    'Check-in is from 14:00. Check-out is by 11:00. If you need a different arrangement please contact Warren in advance and we will do our best to accommodate you.',
  'faq.wifi.question': 'Is WiFi available?',
  'faq.wifi.answer':
    'Yes, all villas have free high speed WiFi. Villa Anggrek has ultrafast 20Mbps fiber optic broadband, ideal for remote work or streaming.',
  'faq.payment.question': 'What payment methods do you accept?',
  'faq.payment.answer': 'We accept Visa, Mastercard and cash.',
  'faq.pets.question': 'Are pets allowed?',
  'faq.pets.answer': 'Unfortunately we do not allow pets at our villas.',
  'faq.cleaning.question': 'Is daily cleaning included?',
  'faq.cleaning.answer':
    'Yes, our team provides daily cleaning for all villas at no extra charge.',
  'faq.pool-privacy.question': 'Are the pools private? Can neighbours see in?',
  'faq.pool-privacy.answer':
    'Every villa has its own completely private pool. The pool areas are fully enclosed and no one can see in from outside. You can relax in and around your pool without any concerns.',
  'faq.connect-villas.question': 'Can Villa Mawar and Villa Anggrek be connected?',
  'faq.connect-villas.answer':
    'Yes! Villa Mawar and Villa Anggrek are located side by side and can be connected by opening a shared door between the pool areas. This makes them perfect for larger groups or families travelling together who want separate spaces but easy access to each other.',
  'faq.pool-cleaning.question': 'How often are the pools cleaned?',
  'faq.pool-cleaning.answer':
    'The pools are cleaned twice a week and always freshly cleaned before new guests check in.',
  'faq.ac.question': 'Do all bedrooms have air conditioning?',
  'faq.ac.answer': 'Yes, every bedroom in all four villas has its own air conditioning unit.',
  'faq.beach-walk.question': 'Is the beach within walking distance?',
  'faq.beach-walk.answer':
    'The beach is approximately a 20 minute walk from the villas. Restaurants and cafes are within easy walking distance, and there are 3 breakfast spots within 500 metres.',
  'faq.sandat-guests.question': 'How many guests can stay in Villa Sandat?',
  'faq.sandat-guests.answer':
    'Villa Sandat can comfortably accommodate up to 5 guests. It is our largest villa at 190 m2 and is ideal for families or groups of 4 to 5 people.',
  'faq.two-floors.question': 'Do all villas have two floors?',
  'faq.two-floors.answer':
    'Yes, the villas have two floors with one bedroom upstairs and one bedroom downstairs, giving guests extra privacy.',
  'faq.multiple-villas.question': 'Can two villas be booked for a larger group?',
  'faq.multiple-villas.answer':
    'Yes, we can accommodate larger groups by booking multiple villas. Villa Mawar and Villa Anggrek can be connected for groups of up to 10 guests. Contact Warren on WhatsApp to arrange this.',
  'faq.breakfast.question': 'Is breakfast included?',
  'faq.breakfast.answer':
    'Breakfast is not included but there are excellent breakfast spots within a short walk of the villas. Warren is happy to recommend his favourites.',
  'faq.contact.question': 'How do I contact Warren?',
  'faq.contact.answer': `The easiest way is via WhatsApp at ${SITE.phone}. Warren and Lianah are always available, even outside regular hours.`,
}

function globalDefaults(): Record<string, string> {
  return {
    'header.brand_name': 'Sun Shoot Villas',
    'header.nav.villas': en.navOurVillas,
    'header.nav.about': en.navAboutUs,
    'header.nav.contact': en.navContactUs,
    'header.book_button': en.navBookNow,
    'footer.brand_name': en.footerBrandName,
    'footer.tagline': en.footerTagline,
    'footer.quick_links_title': en.footerQuickLinksTitle,
    'footer.link.villas': en.navOurVillas,
    'footer.link.about': en.navAboutUs,
    'footer.link.contact': en.navContactUs,
    'footer.link.faq': en.footerLinkFaq,
    'footer.link.terms': en.footerLinkTerms,
    'footer.contact_title': en.footerContactTitle,
    'footer.phone': SITE.phone,
    'footer.email': SITE.email,
    'footer.address': en.footerAddress,
    'footer.copyright': en.footerCopyright,
    'footer.social.facebook.url': 'https://www.facebook.com/sunshootvillas/',
    'footer.social.instagram.url': '#',
    'footer.social.twitter.url': '#',
    'footer.social.x.url': '#',
    'footer.social.pinterest.url': '#',
    'footer.social.google.url': '#',
  }
}

function homeDefaults(): Record<string, string> {
  const d: Record<string, string> = {
    'hero.headline': en.heroHeadline,
    'hero.subheadline': en.heroSubheadline,
    'hero.subtext': en.heroSubheadline,
    'hero.cta_villas': en.navOurVillas,
    'hero.cta_book': en.navBookNow,
    'hero.video_url': HERO_VIDEO,
    'ratings.title': en.ratingsTrustTitle,
    'ratings.1.platform': 'Booking.com',
    'ratings.1.score': '8.5',
    'ratings.1.max': '10',
    'ratings.1.url':
      'https://www.booking.com/hotel/id/sun-shoot-villas-seminyak.html#tab-reviews',
    'ratings.2.platform': 'Agoda',
    'ratings.2.score': '9.4',
    'ratings.2.max': '10',
    'ratings.3.platform': 'Trip.com',
    'ratings.3.score': '8.9',
    'ratings.3.max': '10',
    'ratings.4.platform': 'Traveloka',
    'ratings.4.score': '8.3',
    'ratings.4.max': '10',
    'ratings.5.platform': 'Google',
    'ratings.5.score': '3.7',
    'ratings.5.max': '5',
    'villas.eyebrow': en.villaCardsEyebrow,
    'villas.title': en.villaCardsTitle,
    'villas.subtitle': en.villaCardsSubtitle,
    'villas.meta_mobile': en.villaCardsMetaMobile,
    'villas.meta_desktop': en.villaCardsMetaDesktop,
    'villas.view_button': en.villaCardViewVilla,
    'villas.book_button': en.villaCardBookNow,
    'villas.view_aria': en.villaCardViewAriaLabel,
    'seminyak.title': en.seminyakTitle,
    'seminyak.subtitle': en.seminyakSubtitle,
    'seminyak.body':
      "Seminyak is one of Bali's most sought-after destinations, known for its world-class restaurants, vibrant beach clubs, boutique shopping, and stunning sunsets. Staying in Seminyak puts you right in the middle of everything Bali has to offer.",
    'seminyak.video_url': HERO_VIDEO,
    'seminyak.travel_note': 'Estimated travel times by Gojek, Grab or scooter',
    'why_us.eyebrow': en.whyChooseUsTitle,
    'why_us.title': en.whyChooseUsHeadline,
    'why_us.1.title': en.whyChooseUsLocationTitle,
    'why_us.1.mobile_title': en.whyChooseUsLocationMobileTitle,
    'why_us.1.description': en.whyChooseUsLocationDescription,
    'why_us.2.title': en.whyChooseUsPoolTitle,
    'why_us.2.mobile_title': en.whyChooseUsPoolMobileTitle,
    'why_us.2.description': en.whyChooseUsPoolDescription,
    'why_us.3.title': en.whyChooseUsServiceTitle,
    'why_us.3.mobile_title': en.whyChooseUsServiceMobileTitle,
    'why_us.3.description': en.whyChooseUsServiceDescription,
    'why_us.4.title': en.whyChooseUsPickupTitle,
    'why_us.4.mobile_title': en.whyChooseUsPickupMobileTitle,
    'why_us.4.description': en.whyChooseUsPickupDescription,
    'map.eyebrow': 'Location',
    'map.title': en.findUsTitle,
    'map.address': SITE.address,
    'map.embed_url': MAPS_EMBED,
    'life_at.title': en.lifeAtTitle,
    'life_at.swipe_hint': en.lifeAtSwipeHint,
    'life_at.cta_title': en.lifeAtCtaTitle,
    'life_at.cta_subtext': en.lifeAtCtaSubtext,
    'life_at.cta_book': en.navBookNow,
    'life_at.cta_view_villas': en.homeCtaViewVillas,
    'life_at.cta_villas': en.homeCtaViewVillas,
    'partner.label': en.sunshootersPartnerLabel,
    'partner.title': en.sunshootersPartnerTitle,
    'partner.description': en.sunshootersPartnerDescription,
    'partner.note': en.sunshootersPartnerNote,
    'partner.logo': '/sunshooters-logo.png',
    'partner.logo.alt': en.sunshootersPartnerLogoAlt,
    'cta.title': en.homeCtaTitle,
    'cta.view_villas': en.homeCtaViewVillas,
    'cta.book_button': en.navBookNow,
    'cards.meta_mobile': en.villaCardsMetaMobile,
    'cards.meta_desktop': en.villaCardsMetaDesktop,
    'cards.view_button': en.villaCardViewVilla,
    'cards.book_button': en.villaCardBookNow,
    'cards.view_aria': en.villaCardViewAriaLabel,
    ...homeVillaCardDefaults(),
  }
  en.sunshootersPartnerBenefits.forEach((b, i) => {
    d[`partner.benefit.${i + 1}`] = b
  })
  const dests = [
    { name: 'Seminyak Beach', time: '~15 min' },
    { name: 'Kuta Beach', time: '~15 min' },
    { name: 'Canggu', time: '~20 min' },
    { name: 'Airport', time: '~20 min' },
    { name: 'Eat Street (Jl Kayu Aya)', time: '~10 min walk' },
    { name: 'Seminyak Square', time: '~10 min walk' },
    { name: 'Potato Head Beach Club', time: '~10 min' },
    { name: 'Mexicola', time: '~10 min' },
  ]
  dests.forEach((dest, i) => {
    d[`seminyak.dest.${i + 1}.name`] = dest.name
    d[`seminyak.dest.${i + 1}.time`] = dest.time
    d[`map.location.${i + 1}.name`] = dest.name
    d[`map.location.${i + 1}.time`] = dest.time
  })
  const galleryAlts = [
    'Sun Shoot Villas private pool',
    'Villa living area at Sun Shoot Villas',
    'Bedroom at Sun Shoot Villas Seminyak',
    'Pool area at Sun Shoot Villas',
    'Sun Shoot Villas garden villa',
  ]
  BOOKING_PHOTOS.forEach((url, i) => {
    d[`life_at.gallery.${i + 1}`] = url
    d[`life_at.gallery.${i + 1}.alt`] = galleryAlts[i] ?? `Gallery image ${i + 1}`
  })
  return d
}

function aboutDefaults(): Record<string, string> {
  const d: Record<string, string> = {
    intro: en.aboutStoryBody,
    body: en.aboutOurVillasBody,
    'hero.title': en.aboutHeroTitle,
    'hero.subtitle': en.aboutHeroSubtitle,
    'hero.video_url': HERO_VIDEO,
    'story.title': en.aboutStoryTitle,
    'story.body': en.aboutStoryBody,
    'story.image': STORY_IMAGE,
    'story.image.alt': en.aboutStoryImageAlt,
    'featured.title': en.aboutFeaturedTitle,
    'featured.score': '8.7 / 10',
    'featured.rating': '8.7 / 10',
    'featured.cta': en.aboutFeaturedReadArticle,
    'featured.read_article': en.aboutFeaturedReadArticle,
    'featured.article_url': 'https://thebaliguideline.com/experiences/sun-shoot-villas',
    'our_villas.title': en.aboutOurVillasTitle,
    'our_villas.body': en.aboutOurVillasBody,
    'location.title': en.aboutLocationTitle,
    'location.body': en.aboutLocationBody,
    'location.video_url': HERO_VIDEO,
    'host.title': en.aboutMeetHostTitle,
    'host.body': en.aboutMeetHostBody,
    'host.photo.placeholder_short': en.aboutMeetHostPhotoShort,
    'host.photo.placeholder_long': en.aboutMeetHostPhotoLong,
    'host.photo_short': en.aboutMeetHostPhotoShort,
    'host.photo_long': en.aboutMeetHostPhotoLong,
    'values.title': en.aboutValuesTitle,
    'values.1.title': en.aboutValuePersonalTitle,
    'values.1.description': en.aboutValuePersonalDescription,
    'values.2.title': en.aboutValueHomeTitle,
    'values.2.description': en.aboutValueHomeDescription,
    'values.3.title': en.aboutValueHonestTitle,
    'values.3.description': en.aboutValueHonestDescription,
    'cta.title': en.homeCtaTitle,
    'cta.view_villas': en.homeCtaViewVillas,
    'cta.book_button': en.navBookNow,
    'life_at.title': en.lifeAtTitle,
    'life_at.swipe_hint': en.lifeAtSwipeHint,
    'life_at.cta_title': en.lifeAtCtaTitle,
    'life_at.cta_subtext': en.lifeAtCtaSubtext,
    'life_at.cta_book': en.navBookNow,
    'life_at.cta_view_villas': en.homeCtaViewVillas,
    'life_at.cta_villas': en.homeCtaViewVillas,
  }
  const galleryAlts = [
    'Sun Shoot Villas private pool',
    'Villa living area at Sun Shoot Villas',
    'Bedroom at Sun Shoot Villas Seminyak',
    'Pool area at Sun Shoot Villas',
    'Sun Shoot Villas garden villa',
  ]
  BOOKING_PHOTOS.forEach((url, i) => {
    d[`life_at.gallery.${i + 1}`] = url
    d[`life_at.gallery.${i + 1}.alt`] = galleryAlts[i] ?? `Gallery image ${i + 1}`
  })
  return d
}

function contactDefaults(): Record<string, string> {
  return {
    'hero.title': en.navContactUs,
    'hero.subtitle': en.contactHeroSubtitle,
    'hero.image': CONTACT_HERO_IMAGE,
    'hero.image.alt': en.contactImageAlt,
    'section.title': en.contactGetInTouch,
    'contact.phone_label': en.contactLabelPhone,
    'contact.email_label': en.contactLabelEmail,
    'contact.address_label': en.contactLabelAddress,
    'contact.whatsapp_label': en.contactLabelWhatsApp,
    'contact.phone': SITE.phone,
    'contact.email': SITE.email,
    'contact.address': SITE.address,
    'contact.whatsapp_button': en.contactChatWhatsApp,
    'contact.image': CONTACT_IMAGE,
    'contact.image.alt': en.contactImageAlt,
    'contact.image.caption': en.contactImageCaption,
    'form.title': en.formInquiryTitle,
    'form.subtitle': en.formInquirySubtitle,
    'form.submit': en.formSubmitWhatsApp,
    'form.label.name': en.formLabelName,
    'form.label.email': en.formLabelEmail,
    'form.label.phone': en.formLabelPhone,
    'form.label.villa': en.formLabelVilla,
    'form.label.arrival': en.formLabelArrivalDate,
    'form.label.departure': en.formLabelDepartureDate,
    'form.label.adults': en.formLabelAdults,
    'form.label.children': en.formLabelChildren,
    'form.label.message': en.formLabelMessage,
    'form.placeholder.message': en.formPlaceholderMessage,
  }
}

function bookDefaults(): Record<string, string> {
  return {
    'hero.eyebrow': en.bookPageEyebrow,
    'hero.title': en.bookPageTitle,
    'hero.subtitle': en.bookPageSubtitle,
    'hero.image': BOOK_HERO_IMAGE,
    'hero.image.alt': en.bookPageTitle,
    'submitted.message': en.bookSubmittedMessage,
    'form.title': en.bookDetailsTitle,
    'form.minimum_stay': en.bookMinimumStay,
    'form.airport_pickup': en.bookAirportPickupToggle,
    'form.submit': en.bookSubmitButton,
    'form.payment_note': en.bookPaymentNote,
    'form.payment_methods': en.bookPaymentMethodsLine,
    'summary.title': en.bookSummaryTitle,
    'summary.villa': en.bookSummaryVilla,
    'summary.arrival': en.bookSummaryArrival,
    'summary.departure': en.bookSummaryDeparture,
    'summary.nights': en.bookSummaryNights,
    'summary.guests': en.bookSummaryGuests,
    'summary.policies': en.bookSummaryPolicies,
    'summary.confirm_note': en.bookSummaryConfirmNote,
    'summary.payment_title': en.bookSummaryPaymentTitle,
    'summary.payment_text': en.bookSummaryPaymentText,
    'summary.price_label': en.bookSummaryPrice,
    'summary.total_label': en.priceTotal,
    'summary.per_night': en.pricePerNight,
    'trust.1.label': en.bookTrustSecure,
    'trust.2.label': en.bookTrustPersonalHost,
    'trust.3.label': en.bookTrustAirportPickup,
    'trust.4.label': en.bookTrustFlexibleDates,
  }
}

function villasDefaults(): Record<string, string> {
  return {
    'hero.title': en.navOurVillas,
    'hero.subtitle': en.villasPageHeroSubtitle,
    'hero.video_url': HERO_VIDEO,
    'cards.meta_mobile': en.villaCardsMetaMobile,
    'cards.meta_desktop': en.villaCardsMetaDesktop,
    'cards.view_button': en.villaCardViewVilla,
    'cards.book_button': en.villaCardBookNow,
    'cards.view_aria': en.villaCardViewAriaLabel,
    ...homeVillaCardDefaults(),
  }
}

function termsDefaults(): Record<string, string> {
  const d: Record<string, string> = {
    'hero.title': 'Terms and Conditions',
    'hero.subtitle': 'Booking and stay policies for Sun Shoot Villas Seminyak',
    'intro.body':
      'Please read these terms carefully before booking. By confirming a reservation at Sun Shoot Villas Seminyak, you agree to the conditions set out below.',
    'closing.body': 'Questions? Contact us or message Warren and Lianah on WhatsApp.',
    'closing.contact_link': 'Contact us',
    'closing.whatsapp_link': 'WhatsApp',
  }
  const sections = [
    {
      key: 'general',
      title: 'General',
      paragraphs: [
        'These terms and conditions apply to all bookings at Sun Shoot Villas Seminyak, located at Jalan Bidadari II E, 80361 Seminyak, Indonesia, operated by Warren and Lianah.',
        'Sun Shoot Villas offers private villa accommodation. Each booking rents an entire villa with its own private pool.',
      ],
    },
    {
      key: 'checkin',
      title: 'Check-in and Check-out',
      paragraphs: [
        'Check-in is from 14:00. Check-out is by 11:00.',
        'Guests must inform the property of their expected arrival time in advance.',
      ],
    },
    {
      key: 'cancellation',
      title: 'Cancellation and Prepayment',
      paragraphs: [
        'Cancellation and prepayment policies vary depending on the room or villa type and the rate selected at the time of booking.',
        'Guests must review and confirm the specific cancellation and prepayment conditions applicable to their reservation before completing a booking.',
      ],
    },
    {
      key: 'children',
      title: 'Children and Extra Beds',
      paragraphs: [
        'Children of all ages are welcome.',
        'Children aged 6 and older are charged at adult rates.',
        'An extra bed is available for IDR 150,000 per person per night, subject to availability.',
        'A baby crib is available free of charge on request, subject to availability.',
      ],
    },
    {
      key: 'payment',
      title: 'Accepted Payment Methods',
      paragraphs: ['We accept Visa, Mastercard, and cash.'],
    },
    {
      key: 'house_rules',
      title: 'House Rules',
      paragraphs: [
        'No parties or events are allowed.',
        'Quiet hours are from 00:00 to 07:00.',
        'Pets are not allowed.',
      ],
    },
    {
      key: 'pool',
      title: 'Pool',
      paragraphs: [
        'Each villa has a private pool available for guest use.',
        'The pool is open year round.',
        'The pool area is fenced for privacy and safety.',
      ],
    },
    {
      key: 'damage',
      title: 'Damage and Liability',
      paragraphs: [
        'Guests are responsible for any damage caused to the villa during their stay.',
        'The property reserves the right to charge guests for repair or replacement costs.',
      ],
    },
    {
      key: 'privacy',
      title: 'Privacy',
      paragraphs: [
        'Guest information collected during the booking and stay process is handled in accordance with applicable privacy laws.',
      ],
    },
    {
      key: 'contact',
      title: 'Contact',
      paragraphs: [
        'For questions about these terms and conditions or your booking, please contact Warren and Lianah via WhatsApp.',
      ],
    },
  ]
  for (const sec of sections) {
    d[`section.${sec.key}.title`] = sec.title
    sec.paragraphs.forEach((p, i) => {
      d[`section.${sec.key}.paragraph_${i + 1}`] = p
    })
  }
  return d
}

function familiesDefaults(): Record<string, string> {
  const d: Record<string, string> = {
    'hero.eyebrow': 'For Families',
    'hero.title': 'Where Every Child Feels at Home',
    'hero.subtitle':
      "Sahana Villas is proud to be one of Seminyak's most family-friendly private villa destinations",
    'breadcrumb.home': 'Home',
    'breadcrumb.current': 'Families',
    'merged.quote':
      'We designed every corner of Sahana with your children in mind. Because the best family holidays leave everyone smiling.',
    'merged.body_1':
      'We have designed the villas to be enjoyed just as much by the children as by the adults. Our central Seminyak location makes getting around easy, whether it is a trip to the beach or popping out for an ice cream.',
    'merged.body_2':
      'We know that travelling with young children requires extra thought and care, and our team is ready to help with everything from pool fencing to bedtime stories.',
    'features.eyebrow': 'Everything You Need',
    'features.title': 'Made for Families, Loved by All',
    'features.1.title': 'Pool Fencing',
    'features.1.bullet_1':
      'Custom-built temporary pool fences installed before your arrival on request',
    'features.1.bullet_2': 'All fences feature a gate with a safety lock',
    'features.1.bullet_3':
      'Please advise during the booking process if you would like a fence for your stay',
    'features.1.bullet_4': 'Available for all villas at no extra charge',
    'features.2.title': 'Baby Cots and Car Seats',
    'features.2.bullet_1':
      'Luxury wooden baby cots with quality mattress and mosquito net included',
    'features.2.bullet_2': 'One cot per villa available free of charge',
    'features.2.bullet_3': 'Extra cribs available on request (small charge applies)',
    'features.2.bullet_4': 'High chairs always included in the baby package',
    'features.2.bullet_5': 'Car seat available for airport transfers and tours',
    'features.2.bullet_6': 'Booster seat available on request',
    'features.3.title': 'Kids Food Menu',
    'features.menu.title': 'Our Little Ones Menu',
    'features.menu.item_1.text': 'Pasta Napoletana or Classic Bolognese',
    'features.menu.item_2.text': 'Pasta Carbonara (spaghetti, fusilli or penne)',
    'features.menu.item_3.text': 'Chicken Nuggets with rice or steamed vegetables',
    'features.menu.item_4.text': 'French Fries with tomato sauce',
    'features.menu.item_5.text':
      'Fried Rice or Noodles with chicken (not too many hidden broccolis!)',
    'features.menu.note': 'Our kitchen team is happy to accommodate special requests',
    'features.4.title': 'Large Lawn Area',
    'features.4.bullet_1':
      'One of the most iconic features of Sahana Villas, rarely found in central Seminyak',
    'features.4.bullet_2': 'Large enough to kick a ball and enjoy a game of chase',
    'features.4.bullet_3':
      'Surrounded by tropical gardens for a safe natural play environment',
    'features.4.bullet_4':
      'Perfect for morning yoga or afternoon games while kids play nearby',
    'features.5.title': 'Child-Friendly Layout',
    'features.5.bullet_1': 'Entire villa is on one level with minimal steps throughout',
    'features.5.bullet_2': 'Designed from the ground up with family safety in mind',
    'features.5.bullet_3': 'No low-lying water features throughout the property',
    'features.5.bullet_4': 'Built to the highest safety standards',
    'features.6.title': 'Babysitting Service',
    'features.6.bullet_1': 'Our staff love kids and are happy to help during working hours',
    'features.6.bullet_2':
      'Evening babysitting available at IDR 50,000 per hour, arranged directly with the team',
    'features.6.bullet_3':
      'Full-time external babysitter available on request with advance notice',
    'features.6.bullet_4': 'Please arrange babysitting directly with our team on arrival',
    'features.7.title': 'Security',
    'features.7.bullet_1': 'Night security staff on duty daily monitoring all entries and exits',
    'features.7.bullet_2': 'CCTV throughout the entire compound',
    'features.7.bullet_3':
      'Optional 24/7 security available on request (please advise before arrival)',
    'features.7.bullet_4': "Your family's safety is our number one priority",
    'features.8.title': 'Sun Sail',
    'features.8.bullet_1':
      'A sun sail over the pool available on request to protect little ones from the Bali sun',
    'features.8.bullet_2':
      'Allows you to enjoy the pool all day without worrying about sun exposure',
    'features.8.bullet_3': 'Please advise before arrival if you would like the sail erected',
    'carousel.slide_1.image': '/baby-fence-pool.png',
    'carousel.slide_1.image.alt': 'Pool fencing at Sahana Villas',
    'carousel.slide_1.eyebrow': 'Pool Safety',
    'carousel.slide_1.title': "Your Children's Safety Comes First",
    'carousel.slide_1.text':
      'We know that not having a pool fence can be a worry when travelling with young children. Our custom-built temporary pool fences feature a gate with a safety lock and can be installed before your arrival. Simply let us know during the booking process and we will take care of everything.',
    'carousel.slide_1.button_label': 'Request Pool Fencing',
    'carousel.slide_1.button_href': '/book',
    'carousel.slide_2.image': '/baby-proof-area.png',
    'carousel.slide_2.image.alt': 'Child-friendly villa layout',
    'carousel.slide_2.eyebrow': 'Child-Friendly Design',
    'carousel.slide_2.title': 'Built Safe from the Ground Up',
    'carousel.slide_2.text':
      'Sahana Villas was designed from the start with families in mind. The entire villa is on one level with minimal steps, no low-lying water features, and built to the highest safety standards so your little ones can explore freely.',
    'carousel.slide_2.button_label': 'Learn More',
    'carousel.slide_2.button_href': '/about',
    'carousel.slide_3.image': '/baby-sail-pool.png',
    'carousel.slide_3.image.alt': 'Sun sail over the pool',
    'carousel.slide_3.eyebrow': 'Sun Protection',
    'carousel.slide_3.title': 'Enjoy the Pool All Day Long',
    'carousel.slide_3.text':
      'The Bali sun can burn quickly. Our sun sail over the pool is available on request, allowing your family to enjoy the water all day without worrying about sun exposure. Just let us know before arrival and we will have it ready for you.',
    'carousel.slide_3.button_label': 'Request Sun Sail',
    'carousel.slide_3.button_href': '/book',
    'carousel.slide_4.image': '/bedtime-story.png',
    'carousel.slide_4.image.alt': 'Bedtime story at Sahana Villas',
    'carousel.slide_4.eyebrow': 'Evening Routine',
    'carousel.slide_4.title': 'A Bedtime Story to End the Day',
    'carousel.slide_4.text':
      'Every evening our staff are happy to read a bedtime story to your little ones, helping them wind down after a full day of Bali adventures. It is one of those small touches that our youngest guests always remember.',
    'carousel.slide_4.button_label': 'Meet Our Team',
    'carousel.slide_4.button_href': '/about',
    'carousel.slide_5.image': '/baby-sitter-image.png',
    'carousel.slide_5.image.alt': 'Babysitting at Sahana Villas',
    'carousel.slide_5.eyebrow': 'Babysitting',
    'carousel.slide_5.title': 'A Trusted Pair of Hands',
    'carousel.slide_5.text':
      'Our staff love children and are happy to help during working hours. For evening babysitting a small charge of IDR 50,000 per hour applies. For full-time babysitting we can arrange outside help with advance notice. Simply speak to our team on arrival.',
    'carousel.slide_5.button_label': 'Contact Us',
    'carousel.slide_5.button_href': '/contact',
    'location.title': 'The Perfect Family Base in Seminyak',
    'location.item_1.text':
      '15 min walk to Seminyak Beach and KuDeTa, perfect for building sandcastles and watching the sunset',
    'location.item_2.text':
      'Surrounded by cafes and restaurants with kids menus, ice cream and fresh juice bars',
    'location.item_3.text':
      'Easy access to family-friendly activities, from water parks to cultural experiences',
    'cta.title': 'Ready to Plan Your Family Holiday?',
    'cta.primary': 'Check Availability',
    'cta.secondary': 'Contact Us',
    'cta.note': 'Our team is happy to answer any questions about travelling with children',
  }
  return d
}

function promosDefaults(): Record<string, string> {
  return {
    'hero.eyebrow': 'Exclusive Deals',
    'hero.title': 'Special Promotions 2026',
    'hero.subtitle': 'Book direct and save. All promotions valid throughout 2026.',
    'breadcrumb.home': 'Home',
    'breadcrumb.current': 'Promotions',
    'intro.body':
      'Book direct with Sahana Villas and enjoy exclusive packages tailored for international guests. All promotions are valid throughout 2026 while availability lasts.',
    'promo.usd.visual_title': 'SAHANA EXPERIENCE VIP LEVEL',
    'promo.usd.visual_subtitle': '(USD DEAL)',
    'promo.usd.heading': 'USD Exclusive Package',
    'promo.usd.bullet_1': 'Complimentary airport transfer',
    'promo.usd.bullet_2': 'Daily breakfast for two',
    'promo.usd.bullet_3': 'Late checkout subject to availability',
    'promo.usd.button': 'Book Now',
    'promo.aud.visual_title': 'SAHANA SPECIAL LIMITED-TIME OFFER',
    'promo.aud.visual_subtitle': '(AUD PROMO)',
    'promo.aud.heading': 'AUD Special Offer',
    'promo.aud.description': 'Exclusive rates for Australian guests booking direct.',
    'promo.aud.bullet_1': 'Best direct rate guarantee',
    'promo.aud.bullet_2': 'Flexible date changes',
    'promo.aud.button': 'Book Now',
    'promo.sgd.visual_title': 'SAHANA SINGAPORE GUEST OFFER',
    'promo.sgd.visual_subtitle': '(SGD PROMO)',
    'promo.sgd.heading': 'SGD Guest Package',
    'promo.sgd.bullet_1': 'Welcome drink on arrival',
    'promo.sgd.bullet_2': 'Priority villa assignment',
    'promo.sgd.bullet_3': 'Partner restaurant discounts',
    'promo.sgd.button': 'Book Now',
    'promo.idr.visual_title': 'SAHANA LOCAL RATE',
    'promo.idr.visual_subtitle': '(IDR PROMO)',
    'promo.idr.heading': 'IDR Direct Booking Deal',
    'promo.idr.bullet_1': 'Local payment options',
    'promo.idr.bullet_2': 'Free airport pickup',
    'promo.idr.bullet_3': 'Daily housekeeping included',
    'promo.idr.button': 'Book Now',
    'cta.title': 'Ready to Claim Your Deal?',
    'cta.button': 'Send a Booking Enquiry',
    'cta.note': 'Or WhatsApp us directly on',
    'cta.whatsapp': '+62 811 388 2070',
  }
}

function ratesDefaults(): Record<string, string> {
  const d: Record<string, string> = {
    'hero.eyebrow': 'Transparency First',
    'hero.title': 'Published Rates',
    'hero.subtitle': 'All rates include government taxes and charges',
    'breadcrumb.home': 'Home',
    'breadcrumb.current': 'Rates',
    'seasons.1.name': 'Low Season',
    'seasons.1.usd': '$500',
    'seasons.1.idr': '8,700,000 IDR',
    'seasons.1.nights': 'Minimum 2 nights',
    'seasons.2.name': 'High Season',
    'seasons.2.usd': '$550',
    'seasons.2.idr': '9,500,000 IDR',
    'seasons.2.nights': 'Minimum 4 nights',
    'seasons.3.name': 'Peak Season',
    'seasons.3.usd': '$575',
    'seasons.3.idr': '9,217,480 IDR',
    'seasons.3.nights': 'Minimum 7 nights',
    'pricing.note':
      'USD prices are indicative. All transactions are processed in IDR at the prevailing exchange rate.',
    'season_dates.title': 'Season Dates',
    'season_dates.1.label': 'High season',
    'season_dates.1.detail':
      'Chinese New Year, Easter, June 28th to September 8th inclusive',
    'season_dates.2.label': 'Peak season',
    'season_dates.2.detail': 'December 20th 2025 to January 10th 2026',
    'season_dates.3.label': 'Low season',
    'season_dates.3.detail': 'Remaining time of the year',
    'season_dates.4.label': 'Chinese New Year',
    'season_dates.4.detail': 'February 14th to 20th 2026',
    'season_dates.5.label': 'Easter',
    'season_dates.5.detail': 'March 28th to April 8th 2026 inclusive',
    'included.eyebrow': 'Included',
    'included.title': 'What Is Included',
    'notes.title': 'Please Note',
    'notes.terms_link': 'View our full Terms and Conditions',
    'cta.button': 'Send a Booking Enquiry',
    'cta.note': 'Or WhatsApp us directly on',
    'cta.whatsapp': '+62 811 388 2070',
  }
  const included = [
    'Airport Transfer in a Private Vehicle',
    'Bathroom Amenities',
    'Daily Continental Breakfast',
    'Welcome Drink and Chill Towels',
    'HiFi Sound System',
    'Internet WiFi',
    'Full Staff',
    'Home Grown Organic Free Flow Coffee',
    '1 Baby Cot and High Chair',
    'Free Flow Mineral Water',
    'On-Call Manager',
    '24 Hours Security',
  ]
  included.forEach((label, i) => {
    d[`included.item_${i + 1}.label`] = label
  })
  const notes = [
    'All villa rates including discounted rates include government taxes and charges',
    'For stays with rates of less than USD 350 per night, the Sahana breakfast and airport transfers are not included. The team is happy to shop and prepare for you at your cost',
    'Check in time: from 15:00 onwards',
    'Check out time: 11:00',
    'A regular direct booking includes 1 free airport transfer each way. For additional airport transfers a charge of USD 35 applies each way, with a nighttime surcharge of USD 10 for arrivals after 21:00',
    'Unused airport services are not refundable or re-routable',
  ]
  notes.forEach((note, i) => {
    d[`notes.item_${i + 1}`] = note
  })
  return d
}

export function getCmsDefaultsEn(pageSlug: PageSlug): Record<string, string> {
  switch (pageSlug) {
    case 'global':
      return globalDefaults()
    case 'home':
      return homeDefaults()
    case 'about':
      return aboutDefaults()
    case 'contact':
      return contactDefaults()
    case 'book':
      return bookDefaults()
    case 'villas':
      return villasDefaults()
    case 'faq':
      return FAQ_DEFAULTS
    case 'terms':
      return termsDefaults()
    case 'families':
      return familiesDefaults()
    case 'promos':
      return promosDefaults()
    case 'rates':
      return ratesDefaults()
    default:
      if (
        pageSlug === 'mawar' ||
        pageSlug === 'jepun' ||
        pageSlug === 'anggrek' ||
        pageSlug === 'sandat'
      ) {
        return {}
      }
      return {}
  }
}

export function getCmsImageFields(pageSlug: PageSlug): CmsImageFieldDef[] {
  switch (pageSlug) {
    case 'about':
      return [
        { imageBlockKey: 'story.image', altBlockKey: 'story.image.alt', label: 'Story image' },
        ...BOOKING_PHOTOS.map((_, i) => ({
          imageBlockKey: `life_at.gallery.${i + 1}`,
          altBlockKey: `life_at.gallery.${i + 1}.alt`,
          label: `Life at gallery ${i + 1}`,
        })),
      ]
    case 'contact':
      return [
        { imageBlockKey: 'hero.image', altBlockKey: 'hero.image.alt', label: 'Hero image' },
        { imageBlockKey: 'contact.image', altBlockKey: 'contact.image.alt', label: 'Contact image' },
      ]
    case 'book':
      return [{ imageBlockKey: 'hero.image', altBlockKey: 'hero.image.alt', label: 'Hero image' }]
    case 'home':
      return [
        { imageBlockKey: 'partner.logo', altBlockKey: 'partner.logo.alt', label: 'Partner logo' },
        ...BOOKING_PHOTOS.map((_, i) => ({
          imageBlockKey: `life_at.gallery.${i + 1}`,
          altBlockKey: `life_at.gallery.${i + 1}.alt`,
          label: `Life at gallery ${i + 1}`,
        })),
      ]
    case 'villas':
      return (['mawar', 'jepun', 'anggrek', 'sandat'] as const).map((slug) => ({
        imageBlockKey: `cards.${slug}.image`,
        altBlockKey: `cards.${slug}.image.alt`,
        label: `Villa ${slug} card image`,
      }))
    default:
      return []
  }
}

export function getCmsDefaults(pageSlug: PageSlug, lang: Language = 'en'): Record<string, string> {
  return lang === 'id' ? getCmsDefaultsId(pageSlug) : getCmsDefaultsEn(pageSlug)
}
