import type { PageSlug } from '@/lib/contentBlockTypes'
import { getCmsDefaultsEn } from '@/lib/cmsDefaults'
import { SITE } from '@/lib/site'
import { translations } from '@/lib/translations'
import { VILLAS } from '@/lib/villas'

const id = translations.id

function globalIdOverrides(): Record<string, string> {
  return {
    'header.nav.villas': id.navOurVillas,
    'header.nav.about': id.navAboutUs,
    'header.nav.contact': id.navContactUs,
    'header.book_button': id.navBookNow,
    'footer.brand_name': id.footerBrandName,
    'footer.tagline': id.footerTagline,
    'footer.quick_links_title': id.footerQuickLinksTitle,
    'footer.link.villas': id.navOurVillas,
    'footer.link.about': id.navAboutUs,
    'footer.link.contact': id.navContactUs,
    'footer.link.faq': id.footerLinkFaq,
    'footer.link.terms': id.footerLinkTerms,
    'footer.contact_title': id.footerContactTitle,
    'footer.address': id.footerAddress,
    'footer.copyright': id.footerCopyright,
  }
}

function homeIdOverrides(): Record<string, string> {
  const out: Record<string, string> = {
    'hero.headline': id.heroHeadline,
    'hero.subheadline': id.heroSubheadline,
    'hero.subtext': id.heroSubheadline,
    'hero.cta_villas': id.navOurVillas,
    'hero.cta_book': id.navBookNow,
    'ratings.title': id.ratingsTrustTitle,
    'villas.eyebrow': id.villaCardsEyebrow,
    'villas.title': id.villaCardsTitle,
    'villas.subtitle': id.villaCardsSubtitle,
    'villas.meta_mobile': id.villaCardsMetaMobile,
    'villas.meta_desktop': id.villaCardsMetaDesktop,
    'villas.view_button': id.villaCardViewVilla,
    'villas.book_button': id.villaCardBookNow,
    'villas.view_aria': id.villaCardViewAriaLabel,
    'seminyak.title': id.seminyakTitle,
    'seminyak.subtitle': id.seminyakSubtitle,
    'seminyak.body':
      'Seminyak adalah salah satu destinasi paling diminati di Bali, terkenal dengan restoran kelas dunia, beach club yang hidup, belanja butik, dan sunset yang menakjubkan. Menginap di Seminyak menempatkan Anda tepat di tengah segala yang ditawarkan Bali.',
    'seminyak.travel_note': 'Perkiraan waktu tempuh dengan Gojek, Grab, atau skuter',
    'why_us.eyebrow': id.whyChooseUsTitle,
    'why_us.title': id.whyChooseUsHeadline,
    'why_us.1.title': id.whyChooseUsLocationTitle,
    'why_us.1.mobile_title': id.whyChooseUsLocationMobileTitle,
    'why_us.1.description': id.whyChooseUsLocationDescription,
    'why_us.2.title': id.whyChooseUsPoolTitle,
    'why_us.2.mobile_title': id.whyChooseUsPoolMobileTitle,
    'why_us.2.description': id.whyChooseUsPoolDescription,
    'why_us.3.title': id.whyChooseUsServiceTitle,
    'why_us.3.mobile_title': id.whyChooseUsServiceMobileTitle,
    'why_us.3.description': id.whyChooseUsServiceDescription,
    'why_us.4.title': id.whyChooseUsPickupTitle,
    'why_us.4.mobile_title': id.whyChooseUsPickupMobileTitle,
    'why_us.4.description': id.whyChooseUsPickupDescription,
    'map.eyebrow': 'Lokasi',
    'map.title': id.findUsTitle,
    'life_at.title': id.lifeAtTitle,
    'life_at.swipe_hint': id.lifeAtSwipeHint,
    'life_at.cta_title': id.lifeAtCtaTitle,
    'life_at.cta_subtext': id.lifeAtCtaSubtext,
    'life_at.cta_book': id.navBookNow,
    'life_at.cta_view_villas': id.homeCtaViewVillas,
    'life_at.cta_villas': id.homeCtaViewVillas,
    'partner.label': id.sunshootersPartnerLabel,
    'partner.title': id.sunshootersPartnerTitle,
    'partner.description': id.sunshootersPartnerDescription,
    'partner.note': id.sunshootersPartnerNote,
    'partner.logo.alt': id.sunshootersPartnerLogoAlt,
    'cta.title': id.homeCtaTitle,
    'cta.view_villas': id.homeCtaViewVillas,
    'cta.book_button': id.navBookNow,
    'cards.meta_mobile': id.villaCardsMetaMobile,
    'cards.meta_desktop': id.villaCardsMetaDesktop,
    'cards.view_button': id.villaCardViewVilla,
    'cards.book_button': id.villaCardBookNow,
    'cards.view_aria': id.villaCardViewAriaLabel,
  }
  id.sunshootersPartnerBenefits.forEach((b, i) => {
    out[`partner.benefit.${i + 1}`] = b
  })
  const dests = [
    { name: 'Pantai Seminyak', time: '~15 menit' },
    { name: 'Pantai Kuta', time: '~15 menit' },
    { name: 'Canggu', time: '~20 menit' },
    { name: 'Bandara', time: '~20 menit' },
    { name: 'Eat Street (Jl Kayu Aya)', time: '~10 menit jalan kaki' },
    { name: 'Seminyak Square', time: '~10 menit jalan kaki' },
    { name: 'Potato Head Beach Club', time: '~10 menit' },
    { name: 'Mexicola', time: '~10 menit' },
  ]
  dests.forEach((dest, i) => {
    out[`seminyak.dest.${i + 1}.name`] = dest.name
    out[`seminyak.dest.${i + 1}.time`] = dest.time
  })
  const galleryAlts = [
    'Kolam renang pribadi Sun Shoot Villas',
    'Ruang tamu vila di Sun Shoot Villas',
    'Kamar tidur di Sun Shoot Villas Seminyak',
    'Area kolam di Sun Shoot Villas',
    'Vila taman Sun Shoot Villas',
  ]
  galleryAlts.forEach((alt, i) => {
    out[`life_at.gallery.${i + 1}.alt`] = alt
  })
  const villaDescriptions: Record<string, string> = {
    mawar: id.villaMawarDescription,
    jepun: id.villaJepunDescription,
    anggrek: id.villaAnggrekDescription,
    sandat: id.villaSandatDescription,
  }
  for (const villa of VILLAS) {
    out[`cards.${villa.slug}.description`] =
      villaDescriptions[villa.slug as keyof typeof villaDescriptions] ?? villa.description
  }
  return out
}

function aboutIdOverrides(): Record<string, string> {
  return {
    intro: id.aboutStoryBody,
    body: id.aboutOurVillasBody,
    'hero.title': id.aboutHeroTitle,
    'hero.subtitle': id.aboutHeroSubtitle,
    'story.title': id.aboutStoryTitle,
    'story.body': id.aboutStoryBody,
    'story.image.alt': id.aboutStoryImageAlt,
    'featured.title': id.aboutFeaturedTitle,
    'featured.cta': id.aboutFeaturedReadArticle,
    'featured.read_article': id.aboutFeaturedReadArticle,
    'our_villas.title': id.aboutOurVillasTitle,
    'our_villas.body': id.aboutOurVillasBody,
    'location.title': id.aboutLocationTitle,
    'location.body': id.aboutLocationBody,
    'host.title': id.aboutMeetHostTitle,
    'host.body': id.aboutMeetHostBody,
    'host.photo.placeholder_short': id.aboutMeetHostPhotoShort,
    'host.photo.placeholder_long': id.aboutMeetHostPhotoLong,
    'host.photo_short': id.aboutMeetHostPhotoShort,
    'host.photo_long': id.aboutMeetHostPhotoLong,
    'values.title': id.aboutValuesTitle,
    'values.1.title': id.aboutValuePersonalTitle,
    'values.1.description': id.aboutValuePersonalDescription,
    'values.2.title': id.aboutValueHomeTitle,
    'values.2.description': id.aboutValueHomeDescription,
    'values.3.title': id.aboutValueHonestTitle,
    'values.3.description': id.aboutValueHonestDescription,
    'cta.title': id.homeCtaTitle,
    'cta.view_villas': id.homeCtaViewVillas,
    'cta.book_button': id.navBookNow,
    'life_at.title': id.lifeAtTitle,
    'life_at.swipe_hint': id.lifeAtSwipeHint,
    'life_at.cta_title': id.lifeAtCtaTitle,
    'life_at.cta_subtext': id.lifeAtCtaSubtext,
    'life_at.cta_book': id.navBookNow,
    'life_at.cta_view_villas': id.homeCtaViewVillas,
    'life_at.cta_villas': id.homeCtaViewVillas,
  }
}

function contactIdOverrides(): Record<string, string> {
  return {
    'hero.title': id.navContactUs,
    'hero.subtitle': id.contactHeroSubtitle,
    'hero.image.alt': id.contactImageAlt,
    'section.title': id.contactGetInTouch,
    'contact.phone_label': id.contactLabelPhone,
    'contact.email_label': id.contactLabelEmail,
    'contact.address_label': id.contactLabelAddress,
    'contact.whatsapp_label': id.contactLabelWhatsApp,
    'contact.whatsapp_button': id.contactChatWhatsApp,
    'contact.image.alt': id.contactImageAlt,
    'contact.image.caption': id.contactImageCaption,
    'form.title': id.formInquiryTitle,
    'form.subtitle': id.formInquirySubtitle,
    'form.submit': id.formSubmitWhatsApp,
    'form.label.name': id.formLabelName,
    'form.label.email': id.formLabelEmail,
    'form.label.phone': id.formLabelPhone,
    'form.label.villa': id.formLabelVilla,
    'form.label.arrival': id.formLabelArrivalDate,
    'form.label.departure': id.formLabelDepartureDate,
    'form.label.adults': id.formLabelAdults,
    'form.label.children': id.formLabelChildren,
    'form.label.message': id.formLabelMessage,
    'form.placeholder.message': id.formPlaceholderMessage,
  }
}

function bookIdOverrides(): Record<string, string> {
  return {
    'hero.eyebrow': id.bookPageEyebrow,
    'hero.title': id.bookPageTitle,
    'hero.subtitle': id.bookPageSubtitle,
    'hero.image.alt': id.bookPageTitle,
    'submitted.message': id.bookSubmittedMessage,
    'form.title': id.bookDetailsTitle,
    'form.minimum_stay': id.bookMinimumStay,
    'form.airport_pickup': id.bookAirportPickupToggle,
    'form.submit': id.bookSubmitButton,
    'form.payment_note': id.bookPaymentNote,
    'form.payment_methods': id.bookPaymentMethodsLine,
    'summary.title': id.bookSummaryTitle,
    'summary.villa': id.bookSummaryVilla,
    'summary.arrival': id.bookSummaryArrival,
    'summary.departure': id.bookSummaryDeparture,
    'summary.nights': id.bookSummaryNights,
    'summary.guests': id.bookSummaryGuests,
    'summary.policies': id.bookSummaryPolicies,
    'summary.confirm_note': id.bookSummaryConfirmNote,
    'summary.payment_title': id.bookSummaryPaymentTitle,
    'summary.payment_text': id.bookSummaryPaymentText,
    'summary.price_label': id.bookSummaryPrice,
    'summary.total_label': id.priceTotal,
    'summary.per_night': id.pricePerNight,
    'trust.1.label': id.bookTrustSecure,
    'trust.2.label': id.bookTrustPersonalHost,
    'trust.3.label': id.bookTrustAirportPickup,
    'trust.4.label': id.bookTrustFlexibleDates,
  }
}

function villasIdOverrides(): Record<string, string> {
  const villaDescriptions: Record<string, string> = {
    mawar: id.villaMawarDescription,
    jepun: id.villaJepunDescription,
    anggrek: id.villaAnggrekDescription,
    sandat: id.villaSandatDescription,
  }
  const out: Record<string, string> = {
    'hero.title': id.navOurVillas,
    'hero.subtitle': id.villasPageHeroSubtitle,
    'cards.meta_mobile': id.villaCardsMetaMobile,
    'cards.meta_desktop': id.villaCardsMetaDesktop,
    'cards.view_button': id.villaCardViewVilla,
    'cards.book_button': id.villaCardBookNow,
    'cards.view_aria': id.villaCardViewAriaLabel,
  }
  for (const villa of VILLAS) {
    out[`cards.${villa.slug}.description`] =
      villaDescriptions[villa.slug as keyof typeof villaDescriptions] ?? villa.description
  }
  return out
}

function faqIdOverrides(): Record<string, string> {
  return {
    'page.title': 'FAQ',
    'section.title': 'Pertanyaan yang Sering Diajukan',
    'faq.guests.question': 'Berapa banyak tamu yang dapat menginap di setiap vila?',
    'faq.guests.answer':
      'Keempat vila memiliki 2 kamar tidur dan dapat menampung 4 tamu dengan nyaman. Boks bayi tersedia gratis atas permintaan, dan tempat tidur tambahan dapat diatur dengan biaya Rp 150.000 per orang per malam.',
    'faq.airport.question': 'Apakah antar jemput bandara termasuk?',
    'faq.airport.answer':
      'Ya! Kami menawarkan antar jemput bandara gratis untuk semua tamu. Sopir ramah kami akan menunggu Anda saat mendarat agar liburan Bali Anda dimulai tanpa stres.',
    'faq.pools.question': 'Apakah vila memiliki kolam renang pribadi?',
    'faq.pools.answer':
      'Ya, setiap vila memiliki kolam renang pribadi sendiri. Kolam Anda eksklusif untuk grup Anda selama menginap.',
    'faq.checkin.question': 'Jam berapa check-in dan check-out?',
    'faq.checkin.answer':
      'Check-in mulai pukul 14:00. Check-out paling lambat pukul 11:00. Jika Anda membutuhkan pengaturan berbeda, hubungi Warren terlebih dahulu dan kami akan berusaha membantu.',
    'faq.wifi.question': 'Apakah WiFi tersedia?',
    'faq.wifi.answer':
      'Ya, semua vila memiliki WiFi gratis berkecepatan tinggi. Villa Anggrek memiliki broadband fiber optik 20Mbps, ideal untuk kerja jarak jauh atau streaming.',
    'faq.payment.question': 'Metode pembayaran apa yang diterima?',
    'faq.payment.answer': 'Kami menerima Visa, Mastercard, dan tunai.',
    'faq.pets.question': 'Apakah hewan peliharaan diperbolehkan?',
    'faq.pets.answer': 'Sayangnya kami tidak mengizinkan hewan peliharaan di vila kami.',
    'faq.cleaning.question': 'Apakah pembersihan harian termasuk?',
    'faq.cleaning.answer':
      'Ya, tim kami menyediakan pembersihan harian untuk semua vila tanpa biaya tambahan.',
    'faq.pool-privacy.question': 'Apakah kolam renang pribadi? Bisakah tetangga melihat?',
    'faq.pool-privacy.answer':
      'Setiap vila memiliki kolam renang yang sepenuhnya pribadi. Area kolam tertutup rapat dan tidak ada yang bisa melihat dari luar. Anda dapat bersantai di sekitar kolam tanpa khawatir.',
    'faq.connect-villas.question': 'Bisakah Villa Mawar dan Villa Anggrek disambungkan?',
    'faq.connect-villas.answer':
      'Ya! Villa Mawar dan Villa Anggrek bersebelahan dan dapat disambungkan dengan membuka pintu bersama di area kolam. Ini sempurna untuk grup besar atau keluarga yang ingin ruang terpisah tetapi akses mudah satu sama lain.',
    'faq.pool-cleaning.question': 'Seberapa sering kolam dibersihkan?',
    'faq.pool-cleaning.answer':
      'Kolam dibersihkan dua kali seminggu dan selalu dibersihkan sebelum tamu baru check-in.',
    'faq.ac.question': 'Apakah semua kamar tidur ber-AC?',
    'faq.ac.answer': 'Ya, setiap kamar tidur di keempat vila memiliki unit AC sendiri.',
    'faq.beach-walk.question': 'Apakah pantai bisa dijangkau dengan berjalan kaki?',
    'faq.beach-walk.answer':
      'Pantai sekitar 20 menit berjalan kaki dari vila. Restoran dan kafe mudah dijangkau, dan ada 3 tempat sarapan dalam radius 500 meter.',
    'faq.sandat-guests.question': 'Berapa tamu yang dapat menginap di Villa Sandat?',
    'faq.sandat-guests.answer':
      'Villa Sandat dapat menampung hingga 5 tamu dengan nyaman. Ini vila terbesar kami seluas 190 m2, ideal untuk keluarga atau grup 4–5 orang.',
    'faq.two-floors.question': 'Apakah semua vila memiliki dua lantai?',
    'faq.two-floors.answer':
      'Ya, vila memiliki dua lantai dengan satu kamar tidur di atas dan satu di bawah, memberikan privasi ekstra bagi tamu.',
    'faq.multiple-villas.question': 'Bisakah dua vila dipesan untuk grup besar?',
    'faq.multiple-villas.answer':
      'Ya, kami dapat menampung grup besar dengan memesan beberapa vila. Villa Mawar dan Villa Anggrek dapat disambungkan untuk hingga 10 tamu. Hubungi Warren via WhatsApp untuk mengaturnya.',
    'faq.breakfast.question': 'Apakah sarapan termasuk?',
    'faq.breakfast.answer':
      'Sarapan tidak termasuk, tetapi ada tempat sarapan yang sangat baik dalam jarak berjalan kaki singkat. Warren dengan senang hati merekomendasikan favoritnya.',
    'faq.contact.question': 'Bagaimana cara menghubungi Warren?',
    'faq.contact.answer': `Cara termudah adalah via WhatsApp di ${SITE.phone}. Warren dan Lianah selalu tersedia, bahkan di luar jam reguler.`,
  }
}

function termsIdOverrides(): Record<string, string> {
  return {
    'hero.title': 'Syarat dan Ketentuan',
    'hero.subtitle': 'Kebijakan pemesanan dan menginap di Sun Shoot Villas Seminyak',
    'intro.body':
      'Harap baca syarat ini dengan saksama sebelum memesan. Dengan mengonfirmasi reservasi di Sun Shoot Villas Seminyak, Anda menyetujui ketentuan di bawah ini.',
    'closing.body': 'Ada pertanyaan? Hubungi kami atau kirim pesan ke Warren dan Lianah via WhatsApp.',
    'closing.contact_link': 'Hubungi kami',
    'closing.whatsapp_link': 'WhatsApp',
    'section.general.title': 'Umum',
    'section.general.paragraph_1':
      'Syarat dan ketentuan ini berlaku untuk semua pemesanan di Sun Shoot Villas Seminyak, Jalan Bidadari II E, 80361 Seminyak, Indonesia, yang dioperasikan oleh Warren dan Lianah.',
    'section.general.paragraph_2':
      'Sun Shoot Villas menawarkan akomodasi vila pribadi. Setiap pemesanan menyewa seluruh vila dengan kolam renang pribadi.',
    'section.checkin.title': 'Check-in dan Check-out',
    'section.checkin.paragraph_1': 'Check-in mulai pukul 14:00. Check-out paling lambat pukul 11:00.',
    'section.checkin.paragraph_2':
      'Tamu harus memberi tahu properti waktu kedatangan yang diharapkan sebelumnya.',
    'section.cancellation.title': 'Pembatalan dan Prabayar',
    'section.cancellation.paragraph_1':
      'Kebijakan pembatalan dan prabayar bervariasi tergantung jenis kamar atau vila dan tarif yang dipilih saat pemesanan.',
    'section.cancellation.paragraph_2':
      'Tamu harus meninjau dan mengonfirmasi ketentuan pembatalan dan prabayar yang berlaku sebelum menyelesaikan pemesanan.',
    'section.children.title': 'Anak-anak dan Tempat Tidur Tambahan',
    'section.children.paragraph_1': 'Anak-anak dari segala usia dipersilakan.',
    'section.children.paragraph_2': 'Anak berusia 6 tahun ke atas dikenakan tarif dewasa.',
    'section.children.paragraph_3':
      'Tempat tidur tambahan tersedia dengan biaya IDR 150.000 per orang per malam, tergantung ketersediaan.',
    'section.children.paragraph_4':
      'Boks bayi tersedia gratis atas permintaan, tergantung ketersediaan.',
    'section.payment.title': 'Metode Pembayaran yang Diterima',
    'section.payment.paragraph_1': 'Kami menerima Visa, Mastercard, dan tunai.',
    'section.house_rules.title': 'Peraturan Rumah',
    'section.house_rules.paragraph_1': 'Pesta atau acara tidak diperbolehkan.',
    'section.house_rules.paragraph_2': 'Jam tenang dari pukul 00:00 hingga 07:00.',
    'section.house_rules.paragraph_3': 'Hewan peliharaan tidak diperbolehkan.',
    'section.pool.title': 'Kolam Renang',
    'section.pool.paragraph_1':
      'Setiap vila memiliki kolam renang pribadi yang dapat digunakan tamu.',
    'section.pool.paragraph_2': 'Kolam buka sepanjang tahun.',
    'section.pool.paragraph_3':
      'Area kolam dipagari untuk privasi dan keamanan.',
    'section.damage.title': 'Kerusakan dan Tanggung Jawab',
    'section.damage.paragraph_1':
      'Tamu bertanggung jawab atas kerusakan yang disebabkan pada vila selama menginap.',
    'section.damage.paragraph_2':
      'Properti berhak menagih tamu untuk biaya perbaikan atau penggantian.',
    'section.privacy.title': 'Privasi',
    'section.privacy.paragraph_1':
      'Informasi tamu yang dikumpulkan selama proses pemesanan dan menginap ditangani sesuai hukum privasi yang berlaku.',
    'section.contact.title': 'Kontak',
    'section.contact.paragraph_1':
      'Untuk pertanyaan tentang syarat ini atau pemesanan Anda, hubungi Warren dan Lianah via WhatsApp.',
  }
}

const PAGE_ID_OVERRIDES: Partial<Record<PageSlug, () => Record<string, string>>> = {
  global: globalIdOverrides,
  home: homeIdOverrides,
  about: aboutIdOverrides,
  contact: contactIdOverrides,
  book: bookIdOverrides,
  villas: villasIdOverrides,
  faq: faqIdOverrides,
  terms: termsIdOverrides,
}

export function getCmsDefaultsId(pageSlug: PageSlug): Record<string, string> {
  const base = getCmsDefaultsEn(pageSlug)
  const overrides = PAGE_ID_OVERRIDES[pageSlug]?.() ?? {}
  return { ...base, ...overrides }
}
