/*
 * RULE: Every new key added to the en object MUST have a matching key added to the id
 * object in the same change. Never ship a new English string without its Indonesian
 * translation. If a component is created or edited with hardcoded text, it must use a
 * translation key from this file, not a literal string.
 */

export type Language = "en" | "id";

export const LANGUAGE_STORAGE_KEY = "sunshoot-language";

export const LANGUAGES: {
  code: Language;
  flag: string;
  displayLabel: string;
}[] = [
  { code: "en", flag: "\u{1F1EC}\u{1F1E7}", displayLabel: "GB English" },
  { code: "id", flag: "\u{1F1EE}\u{1F1E9}", displayLabel: "ID Bahasa Indonesia" },
];

export type VillaSlug = "mawar" | "jepun" | "anggrek" | "sandat";

export type Translations = {
  navOurVillas: string;
  navReviews: string;
  navAboutUs: string;
  navContactUs: string;
  navBookNow: string;
  heroHeadline: string;
  heroSubheadline: string;
  villaCardViewVilla: string;
  villaCardBookNow: string;
  villaCardsEyebrow: string;
  villaCardsTitle: string;
  villaCardsSubtitle: string;
  villaCardsMetaMobile: string;
  villaCardsMetaDesktop: string;
  villaCardViewAriaLabel: string;
  ratingsTrustTitle: string;
  whyChooseUsTitle: string;
  whyChooseUsHeadline: string;
  whyChooseUsLocationTitle: string;
  whyChooseUsLocationMobileTitle: string;
  whyChooseUsLocationDescription: string;
  whyChooseUsPoolTitle: string;
  whyChooseUsPoolMobileTitle: string;
  whyChooseUsPoolDescription: string;
  whyChooseUsServiceTitle: string;
  whyChooseUsServiceMobileTitle: string;
  whyChooseUsServiceDescription: string;
  whyChooseUsPickupTitle: string;
  whyChooseUsPickupMobileTitle: string;
  whyChooseUsPickupDescription: string;
  seminyakTitle: string;
  seminyakSubtitle: string;
  findUsTitle: string;
  footerQuickLinksTitle: string;
  footerContactTitle: string;
  footerBrandName: string;
  footerTagline: string;
  footerLinkFaq: string;
  footerLinkTerms: string;
  footerAddress: string;
  footerCopyright: string;
  villasPageHeroSubtitle: string;
  bookPageTitle: string;
  bookPageSubtitle: string;
  whatsAppButton: string;
  whatsappChatBubble: string;
  bannerText: string;
  topBannerText: string;
  homeCtaTitle: string;
  homeCtaViewVillas: string;
  lifeAtTitle: string;
  lifeAtSwipeHint: string;
  lifeAtCtaTitle: string;
  lifeAtCtaSubtext: string;
  sunshootersPartnerLabel: string;
  sunshootersPartnerTitle: string;
  sunshootersPartnerDescription: string;
  sunshootersPartnerBenefits: string[];
  sunshootersPartnerNote: string;
  sunshootersPartnerLogoAlt: string;
  villaMawarDescription: string;
  villaJepunDescription: string;
  villaAnggrekDescription: string;
  villaSandatDescription: string;
  villaHeroSubtext: string;
  fieldRequired: string;
  formLabelName: string;
  formLabelEmail: string;
  formLabelPhone: string;
  formLabelPhoneNumber: string;
  formLabelVilla: string;
  formLabelArrivalDate: string;
  formLabelDepartureDate: string;
  formLabelAdults: string;
  formLabelChildren: string;
  formLabelMessage: string;
  formLabelFullName: string;
  formLabelSpecialRequests: string;
  formLabelFlightNumber: string;
  formLabelSelectVilla: string;
  formPlaceholderMessage: string;
  formPlaceholderSpecialRequests: string;
  formPlaceholderFlightNumber: string;
  formPlaceholderCountryCode: string;
  formSelectVilla: string;
  formSelectChooseVilla: string;
  formSelectAnyVilla: string;
  formSelectAdults: string;
  formInquiryTitle: string;
  formInquirySubtitle: string;
  formSubmitWhatsApp: string;
  phoneSearchCountry: string;
  phoneNumberPlaceholder: string;
  phoneWhatsAppToggle: string;
  phoneCloseCountry: string;
  phoneSelectCountry: string;
  phoneCloseButton: string;
  phoneContactViaEmail: string;
  phoneCountryCustom: string;
  contactHeroSubtitle: string;
  contactGetInTouch: string;
  contactLabelPhone: string;
  contactLabelEmail: string;
  contactLabelAddress: string;
  contactLabelWhatsApp: string;
  contactChatWhatsApp: string;
  contactImageCaption: string;
  contactImageAlt: string;
  aboutHeroTitle: string;
  aboutHeroSubtitle: string;
  aboutStoryTitle: string;
  aboutStoryBody: string;
  aboutStoryImageAlt: string;
  aboutFeaturedTitle: string;
  aboutFeaturedReadArticle: string;
  aboutOurVillasTitle: string;
  aboutOurVillasBody: string;
  aboutLocationTitle: string;
  aboutLocationBody: string;
  aboutMeetHostTitle: string;
  aboutMeetHostBody: string;
  aboutMeetHostPhotoShort: string;
  aboutMeetHostPhotoLong: string;
  aboutValuesTitle: string;
  aboutValuePersonalTitle: string;
  aboutValuePersonalDescription: string;
  aboutValueHomeTitle: string;
  aboutValueHomeDescription: string;
  aboutValueHonestTitle: string;
  aboutValueHonestDescription: string;
  bookPageEyebrow: string;
  bookSubmittedMessage: string;
  bookDetailsTitle: string;
  bookMinimumStay: string;
  bookAirportPickupToggle: string;
  bookSubmitButton: string;
  bookPaymentNote: string;
  bookPaymentMethodsLine: string;
  bookSummaryTitle: string;
  bookSummaryVilla: string;
  bookSummaryArrival: string;
  bookSummaryDeparture: string;
  bookSummaryNights: string;
  bookSummaryGuests: string;
  bookSummaryPolicies: string;
  bookSummaryConfirmNote: string;
  bookSummaryPaymentTitle: string;
  bookSummaryPaymentText: string;
  bookTrustSecure: string;
  bookTrustPersonalHost: string;
  bookTrustAirportPickup: string;
  bookTrustFlexibleDates: string;
  bookGuestAdult: string;
  bookGuestAdults: string;
  bookGuestChild: string;
  bookGuestChildren: string;
  pricePerNight: string;
  priceFrom: string;
  priceTotal: string;
  priceSaveBadge: string;
  bookSummaryPrice: string;
  villaBookButton: string;
  bookModalClose: string;
};

export const translations: Record<Language, Translations> = {
  en: {
    navOurVillas: "Our Villas",
    navReviews: "Reviews",
    navAboutUs: "About Us",
    navContactUs: "Contact Us",
    navBookNow: "Book Now",
    heroHeadline: "Your Private Sanctuary in the Heart of Bali",
    heroSubheadline: "4 private pool villas in Seminyak",
    villaCardViewVilla: "View Villa",
    villaCardBookNow: "Book Now",
    villaCardsEyebrow: "Our Collection",
    villaCardsTitle: "Four Private Pool Villas",
    villaCardsSubtitle:
      "Each villa offers two bedrooms, a private pool, and the warmth of personal Balinese hospitality in Seminyak's Bidadari area.",
    villaCardsMetaMobile: "2 BR | Pool",
    villaCardsMetaDesktop: "2 Bedrooms | Private Pool",
    villaCardViewAriaLabel: "View",
    ratingsTrustTitle: "Trusted by guests worldwide",
    whyChooseUsTitle: "Why Choose Us",
    whyChooseUsHeadline: "The Sun Shoot Difference",
    whyChooseUsLocationTitle: "Prime Seminyak Location",
    whyChooseUsLocationMobileTitle: "Perfect Location",
    whyChooseUsLocationDescription:
      "Minutes from restaurants, supermarkets, salons and Seminyak Beach in the famous Bidadari area.",
    whyChooseUsPoolTitle: "Private Pool",
    whyChooseUsPoolMobileTitle: "Private Pool",
    whyChooseUsPoolDescription:
      "Every villa comes with its own private pool - your personal oasis steps from your living room.",
    whyChooseUsServiceTitle: "Personal Service",
    whyChooseUsServiceMobileTitle: "Outstanding Service",
    whyChooseUsServiceDescription:
      "Luxury without the corporate hotel feel - genuine Balinese warmth and attentive hospitality.",
    whyChooseUsPickupTitle: "Airport Pickup Included",
    whyChooseUsPickupMobileTitle: "Free Airport Transfer",
    whyChooseUsPickupDescription:
      "Start your holiday stress-free with complimentary airport pickup arranged for your arrival.",
    seminyakTitle: "Why Seminyak?",
    seminyakSubtitle: "Perfectly positioned in the heart of Bali",
    findUsTitle: "Find Us",
    footerQuickLinksTitle: "Quick Links",
    footerContactTitle: "Contact Us",
    footerBrandName: "Sun Shoot Villas",
    footerTagline: "Private pool villas in the heart of Seminyak, Bali.",
    footerLinkFaq: "FAQ",
    footerLinkTerms: "Terms & Conditions",
    footerAddress: "Jl. Bidadari II E, Seminyak",
    footerCopyright: "© 2026 Sun Shoot Villas Seminyak",
    villasPageHeroSubtitle: "Four private pool villas in the heart of Seminyak",
    bookPageTitle: "Book Your Villa",
    bookPageSubtitle:
      "Fill in your details and we will confirm availability within 24 hours",
    whatsAppButton: "Send Inquiry on WhatsApp",
    whatsappChatBubble: "Chat with us!",
    bannerText:
      "Limited availability for July 2026 - Enquire now to secure your villa!   |   4 private pool villas in the heart of Seminyak   |   Free airport pickup included   |   Personal service from host Warren   |   ",
    topBannerText:
      "BOOK DIRECT · PRIVATE POOL VILLAS IN SEMINYAK · PERSONAL BALINESE HOSPITALITY",
    homeCtaTitle: "Ready to Experience Seminyak?",
    homeCtaViewVillas: "View Our Villas",
    lifeAtTitle: "Life at Sun Shoot Villas",
    lifeAtSwipeHint: "Swipe to see more photos",
    lifeAtCtaTitle: "Ready to Book Your Bali Escape?",
    lifeAtCtaSubtext:
      "Secure your villa today and start planning the holiday you deserve.",
    sunshootersPartnerLabel: "Official Partner Villas",
    sunshootersPartnerTitle: "Sunshooters Villa Partner Program",
    sunshootersPartnerDescription:
      "As an official partner of the Sunshooters Villa Partner Program, our guests enjoy exclusive perks at Sunshooters Bar and Grill, located just steps away.",
    sunshootersPartnerBenefits: [
      "10% OFF all food and drinks",
      "Free welcome drink (juice, soda, tea or coffee)",
      "VIP priority seating, even on busy nights",
      "Priority villa delivery for breakfast, lunch and dinner",
      "English-speaking team and premium hospitality standards",
    ],
    sunshootersPartnerNote:
      "Simply mention your villa name when ordering or arriving.",
    sunshootersPartnerLogoAlt: "Sunshooters Villa Partner Program",
    villaMawarDescription:
      "Villa Mawar is a beautiful two-storey garden villa set within the lush Sunshoot Villas Complex. At 150 m2, this private villa offers a stunning private pool, 2 bathrooms with walk-in shower and bidet, and a fully equipped kitchen. The open plan living and dining area is flooded with natural light, creating a warm and welcoming space for families and groups. Connecting rooms are available on request.",
    villaJepunDescription:
      "Located in the heart of Seminyak, Villa Jepun blends modern elegance with traditional Balinese architecture. This 150 m2 private villa features a stunning private pool, 3 bathrooms with walk-in shower and bidet, and a fully equipped kitchen with stovetop, oven, refrigerator and kitchenware. The spacious living and dining area opens to pool views, making it perfect for couples, honeymooners or small families seeking a stylish and intimate Bali retreat.",
    villaAnggrekDescription:
      "The largest of the garden villas at 175 m2, Villa Anggrek is Bali's best kept secret for value and space. With 4 bathrooms including a luxurious bathtub, a private terrace with pool views, outdoor dining area, and lightning fast 20Mbps fiber WiFi, this villa is perfect for families, remote workers, and groups who want extra space without compromising on style.",
    villaSandatDescription:
      "The most spacious villa in the complex at 190 m2, Villa Sandat is a luxurious retreat in the famous Bidadari area of Seminyak. With 4 bathrooms, a private balcony, terrace, outdoor dining, and a stunning private pool, this villa is ideal for larger families or groups. The Sunshooter Bar nearby offers guests special discounts and is just steps away.",
    villaHeroSubtext: "2 Bedrooms | Private Pool | Seminyak, Bali",
    fieldRequired: "This field is required",
    formLabelName: "Name",
    formLabelEmail: "Email",
    formLabelPhone: "Phone",
    formLabelPhoneNumber: "Phone Number",
    formLabelVilla: "Villa",
    formLabelArrivalDate: "Arrival Date",
    formLabelDepartureDate: "Departure Date",
    formLabelAdults: "Adults",
    formLabelChildren: "Children",
    formLabelMessage: "Message",
    formLabelFullName: "Full Name",
    formLabelSpecialRequests: "Special Requests",
    formLabelFlightNumber: "Flight number",
    formLabelSelectVilla: "Select Villa",
    formPlaceholderMessage: "Any special requests or questions...",
    formPlaceholderSpecialRequests:
      "Early check-in, dietary needs, airport pickup details...",
    formPlaceholderFlightNumber: "e.g. QF123",
    formPlaceholderCountryCode: "Country code e.g. +47",
    formSelectVilla: "Select a villa",
    formSelectChooseVilla: "Choose a villa",
    formSelectAnyVilla: "Any villa",
    formSelectAdults: "Select",
    formInquiryTitle: "Send an Enquiry",
    formInquirySubtitle:
      "Complete the form and we'll open WhatsApp with your details ready to send.",
    formSubmitWhatsApp: "Send via WhatsApp",
    phoneSearchCountry: "Search country...",
    phoneNumberPlaceholder: "Phone number",
    phoneWhatsAppToggle: "I have WhatsApp on this number",
    phoneCloseCountry: "Close country selector",
    phoneSelectCountry: "Select country",
    phoneCloseButton: "Close",
    phoneContactViaEmail: "We will contact you via email",
    phoneCountryCustom: "Custom",
    contactHeroSubtitle: "We are always just a message away",
    contactGetInTouch: "Get in Touch",
    contactLabelPhone: "Phone",
    contactLabelEmail: "Email",
    contactLabelAddress: "Address",
    contactLabelWhatsApp: "WhatsApp",
    contactChatWhatsApp: "Chat on WhatsApp",
    contactImageCaption: "Jl. Bidadari II E, Seminyak, Bali",
    contactImageAlt: "Sun Shoot Villas Seminyak",
    aboutHeroTitle: "About Sun Shoot Villas",
    aboutHeroSubtitle: "A family of villas in the heart of Seminyak, Bali",
    aboutStoryTitle: "Our Story",
    aboutStoryBody:
      "Sun Shoot Villas Seminyak was born from a simple belief: that every guest deserves more than just a place to sleep. Nestled in the famous Bidadari area of Seminyak, our four private pool villas have been welcoming families, couples, and groups of friends from all over the world for years. We are not a hotel. We are a home away from home, and that difference matters to us deeply.",
    aboutStoryImageAlt: "Sun Shoot Villas Seminyak",
    aboutFeaturedTitle: "Featured in The Bali Guideline",
    aboutFeaturedReadArticle: "Read Article",
    aboutOurVillasTitle: "Our Villas",
    aboutOurVillasBody:
      "All four of our villas have their own private pool, because we know most guests value their privacy when relaxing. Every villa is cleaned daily by our friendly team. Over the past few years we have invested heavily in renovating and upgrading all our villas to give guests the best possible value for money. When you arrive, you will find a clean, fresh and beautifully maintained villa ready for your holiday.",
    aboutLocationTitle: "Location",
    aboutLocationBody:
      "Our villas are just a few hundred metres from Sunset Road, the main road connecting the airport to Seminyak. The airport is only 20 minutes away depending on traffic. Seminyak Square and the famous Eat Street (Jl Kayu Aya) are just a 10 minute walk. Restaurants like La Favella and Ultimo are within easy walking distance. More famous spots like KuDeTa, Potato Head and Mexicola are a short 10 minute taxi or Grab ride away. The beaches at Kuta, Legian and Seminyak are approximately 15 minutes by taxi or scooter.",
    aboutMeetHostTitle: "Meet Warren, Your Host",
    aboutMeetHostBody:
      "Warren is originally from Perth, Australia and has been living in Bali for over 9 years. Together with his wife Lianah, he manages the Sunshoot Villas complex with a small dedicated team. Warren speaks English and some Indonesian, Lianah speaks both Indonesian and English fluently, and the team can assist in other languages using online translation. Warren and Lianah are passionate about giving every guest personal attention and making sure your Bali holiday is everything you hoped for. They are always contactable via WhatsApp, even outside of regular hours, so you never have to worry if something comes up during your stay.",
    aboutMeetHostPhotoShort: "[ Photo ]",
    aboutMeetHostPhotoLong: "[ Your photo here ]",
    aboutValuesTitle: "What We Believe In",
    aboutValuePersonalTitle: "Personal Service",
    aboutValuePersonalDescription:
      "Every guest is treated like family. We remember your preferences, anticipate your needs, and are always available.",
    aboutValueHomeTitle: "Your Home in Bali",
    aboutValueHomeDescription:
      "Our villas are not just accommodation. They are your private sanctuary, designed for comfort, relaxation, and connection.",
    aboutValueHonestTitle: "Honest Hospitality",
    aboutValueHonestDescription:
      "No hidden fees, no surprises. Just genuine Balinese hospitality from a team that truly cares about your experience.",
    bookPageEyebrow: "Reservations",
    bookSubmittedMessage:
      "Thank you! Your booking request has been sent. Warren will be in touch within 24 hours.",
    bookDetailsTitle: "Booking Details",
    bookMinimumStay: "Minimum stay is 4 nights",
    bookAirportPickupToggle: "Add free airport pickup",
    bookSubmitButton: "Send Booking Request",
    bookPaymentNote:
      "Secure payment is handled via our booking system. You will receive payment instructions by email or WhatsApp after your booking is confirmed.",
    bookPaymentMethodsLine: "Visa | Mastercard | Cash",
    bookSummaryTitle: "Booking Summary",
    bookSummaryVilla: "Villa",
    bookSummaryArrival: "Arrival",
    bookSummaryDeparture: "Departure",
    bookSummaryNights: "Nights",
    bookSummaryGuests: "Guests",
    bookSummaryPolicies:
      "Check-in: {checkIn}. Check-out: By {checkOut}.",
    bookSummaryConfirmNote:
      "Our team will confirm availability and pricing via WhatsApp within 24 hours.",
    bookSummaryPaymentTitle: "Payment Methods",
    bookSummaryPaymentText: "We accept Visa, Mastercard and Cash.",
    bookTrustSecure: "Secure Booking",
    bookTrustPersonalHost: "Personal Host",
    bookTrustAirportPickup: "Free Airport Pickup",
    bookTrustFlexibleDates: "Flexible Dates",
    bookGuestAdult: "adult",
    bookGuestAdults: "adults",
    bookGuestChild: "child",
    bookGuestChildren: "children",
    pricePerNight: "per night",
    priceFrom: "From",
    priceTotal: "Total",
    priceSaveBadge: "Save {percent}%",
    bookSummaryPrice: "Price",
    villaBookButton: "Book {villaName}",
    bookModalClose: "Close booking form",
  },
  id: {
    navOurVillas: "Vila Kami",
    navReviews: "Ulasan",
    navAboutUs: "Tentang Kami",
    navContactUs: "Hubungi Kami",
    navBookNow: "Pesan Sekarang",
    heroHeadline: "Surga Pribadi Anda di Jantung Bali",
    heroSubheadline: "4 vila dengan kolam renang pribadi di Seminyak",
    villaCardViewVilla: "Lihat Vila",
    villaCardBookNow: "Pesan Sekarang",
    villaCardsEyebrow: "Koleksi Kami",
    villaCardsTitle: "Empat Vila dengan Kolam Renang Pribadi",
    villaCardsSubtitle:
      "Setiap vila menawarkan dua kamar tidur, kolam renang pribadi, dan kehangatan hospitality Bali yang personal di area Bidadari Seminyak.",
    villaCardsMetaMobile: "2 KT | Kolam",
    villaCardsMetaDesktop: "2 Kamar Tidur | Kolam Renang Pribadi",
    villaCardViewAriaLabel: "Lihat",
    ratingsTrustTitle: "Dipercaya tamu dari seluruh dunia",
    whyChooseUsTitle: "Mengapa Memilih Kami",
    whyChooseUsHeadline: "Perbedaan Sun Shoot",
    whyChooseUsLocationTitle: "Lokasi Seminyak Utama",
    whyChooseUsLocationMobileTitle: "Lokasi Sempurna",
    whyChooseUsLocationDescription:
      "Beberapa menit dari restoran, supermarket, salon, dan Pantai Seminyak di area Bidadari yang terkenal.",
    whyChooseUsPoolTitle: "Kolam Renang Pribadi",
    whyChooseUsPoolMobileTitle: "Kolam Renang Pribadi",
    whyChooseUsPoolDescription:
      "Setiap vila dilengkapi kolam renang pribadi - oasis pribadi Anda tepat di luar ruang tamu.",
    whyChooseUsServiceTitle: "Pelayanan Personal",
    whyChooseUsServiceMobileTitle: "Pelayanan Luar Biasa",
    whyChooseUsServiceDescription:
      "Kemewahan tanpa nuansa hotel korporat - kehangatan Bali yang tulus dan hospitality yang penuh perhatian.",
    whyChooseUsPickupTitle: "Antar Jemput Bandara Gratis",
    whyChooseUsPickupMobileTitle: "Transfer Bandara Gratis",
    whyChooseUsPickupDescription:
      "Mulai liburan Anda tanpa stres dengan antar jemput bandara gratis yang kami atur untuk kedatangan Anda.",
    seminyakTitle: "Mengapa Seminyak?",
    seminyakSubtitle: "Lokasi sempurna di jantung Bali",
    findUsTitle: "Temukan Kami",
    footerQuickLinksTitle: "Tautan Cepat",
    footerContactTitle: "Hubungi Kami",
    footerBrandName: "Sun Shoot Villas",
    footerTagline: "Vila dengan kolam renang pribadi di jantung Seminyak, Bali.",
    footerLinkFaq: "FAQ",
    footerLinkTerms: "Syarat & Ketentuan",
    footerAddress: "Jl. Bidadari II E, Seminyak",
    footerCopyright: "© 2026 Sun Shoot Villas Seminyak",
    villasPageHeroSubtitle: "Empat vila dengan kolam renang pribadi di jantung Seminyak",
    bookPageTitle: "Pesan Vila Anda",
    bookPageSubtitle:
      "Isi detail Anda dan kami akan mengkonfirmasi ketersediaan dalam 24 jam",
    whatsAppButton: "Kirim Pertanyaan via WhatsApp",
    whatsappChatBubble: "Chat dengan kami!",
    bannerText:
      "Ketersediaan terbatas untuk Juli 2026 - Hubungi kami sekarang!   |   4 vila dengan kolam renang pribadi di Seminyak   |   Antar jemput bandara gratis   |   Pelayanan personal dari tuan rumah Warren   |   ",
    topBannerText:
      "PESAN LANGSUNG · VILA DENGAN KOLAM RENANG PRIBADI DI SEMINYAK · HOSPITALITY BALI YANG PERSONAL",
    homeCtaTitle: "Siap Merasakan Seminyak?",
    homeCtaViewVillas: "Lihat Vila Kami",
    lifeAtTitle: "Kehidupan di Sun Shoot Villas",
    lifeAtSwipeHint: "Geser untuk melihat foto lainnya",
    lifeAtCtaTitle: "Siap Memesan Liburan Bali Anda?",
    lifeAtCtaSubtext:
      "Amankan vila Anda hari ini dan mulai rencanakan liburan yang Anda pantas dapatkan.",
    sunshootersPartnerLabel: "Vila Mitra Resmi",
    sunshootersPartnerTitle: "Program Mitra Vila Sunshooters",
    sunshootersPartnerDescription:
      "Sebagai mitra resmi Program Mitra Vila Sunshooters, tamu kami menikmati keuntungan eksklusif di Sunshooters Bar and Grill, yang berlokasi hanya beberapa langkah jauhnya.",
    sunshootersPartnerBenefits: [
      "Diskon 10% untuk semua makanan dan minuman",
      "Minuman sambutan gratis (jus, soda, teh, atau kopi)",
      "Prioritas tempat duduk VIP, bahkan di malam yang ramai",
      "Prioritas pengantaran ke vila untuk sarapan, makan siang, dan makan malam",
      "Tim berbahasa Inggris dan standar hospitality premium",
    ],
    sunshootersPartnerNote:
      "Cukup sebutkan nama vila Anda saat memesan atau tiba.",
    sunshootersPartnerLogoAlt: "Program Mitra Vila Sunshooters",
    villaMawarDescription:
      "Terletak di dalam Kompleks Sunshoot Villas yang rimbun di Jl. Bidadari II E, Villa Mawar adalah vila taman dua lantai yang menakjubkan, hanya beberapa menit dari jantung Seminyak. Vila ini ideal untuk keluarga, pasangan yang bepergian bersama, atau kelompok kecil yang mencari retret pribadi di Bali.",
    villaJepunDescription:
      "Terletak di jantung Seminyak, Villa Jepun memadukan keeleganan modern dengan arsitektur Bali tradisional. Sempurna untuk pasangan, bulan madu, atau keluarga kecil yang menginginkan pangkalan yang intim dan bergaya untuk liburan Bali mereka.",
    villaAnggrekDescription:
      "Villa Anggrek menawarkan nilai luar biasa tanpa mengorbankan kenyamanan atau gaya. Sempurna untuk pasangan dan keluarga dengan anak kecil. WiFi serat optik 20Mbps tersedia untuk tamu yang bekerja jarak jauh.",
    villaSandatDescription:
      "Terletak di area Bidadari Seminyak yang terkenal, Villa Sandat adalah retret yang luas dan indah dengan semua yang Anda butuhkan untuk liburan Bali yang sempurna. Sunshooter Bar mengantarkan langsung ke pintu vila Anda.",
    villaHeroSubtext: "2 Kamar Tidur | Kolam Renang Pribadi | Seminyak, Bali",
    fieldRequired: "Bidang ini wajib diisi",
    formLabelName: "Nama",
    formLabelEmail: "Email",
    formLabelPhone: "Telepon",
    formLabelPhoneNumber: "Nomor Telepon",
    formLabelVilla: "Vila",
    formLabelArrivalDate: "Tanggal Kedatangan",
    formLabelDepartureDate: "Tanggal Keberangkatan",
    formLabelAdults: "Dewasa",
    formLabelChildren: "Anak-anak",
    formLabelMessage: "Pesan",
    formLabelFullName: "Nama Lengkap",
    formLabelSpecialRequests: "Permintaan Khusus",
    formLabelFlightNumber: "Nomor penerbangan",
    formLabelSelectVilla: "Pilih Vila",
    formPlaceholderMessage: "Permintaan khusus atau pertanyaan...",
    formPlaceholderSpecialRequests:
      "Check-in lebih awal, kebutuhan diet, detail antar jemput bandara...",
    formPlaceholderFlightNumber: "mis. QF123",
    formPlaceholderCountryCode: "Kode negara mis. +62",
    formSelectVilla: "Pilih vila",
    formSelectChooseVilla: "Pilih vila",
    formSelectAnyVilla: "Vila mana saja",
    formSelectAdults: "Pilih",
    formInquiryTitle: "Kirim Pertanyaan",
    formInquirySubtitle:
      "Lengkapi formulir dan kami akan membuka WhatsApp dengan detail Anda siap dikirim.",
    formSubmitWhatsApp: "Kirim via WhatsApp",
    phoneSearchCountry: "Cari negara...",
    phoneNumberPlaceholder: "Nomor telepon",
    phoneWhatsAppToggle: "Saya punya WhatsApp di nomor ini",
    phoneCloseCountry: "Tutup pemilih negara",
    phoneSelectCountry: "Pilih negara",
    phoneCloseButton: "Tutup",
    phoneContactViaEmail: "Kami akan menghubungi Anda melalui email",
    phoneCountryCustom: "Kustom",
    contactHeroSubtitle: "Kami selalu siap menerima pesan Anda",
    contactGetInTouch: "Hubungi Kami",
    contactLabelPhone: "Telepon",
    contactLabelEmail: "Email",
    contactLabelAddress: "Alamat",
    contactLabelWhatsApp: "WhatsApp",
    contactChatWhatsApp: "Chat di WhatsApp",
    contactImageCaption: "Jl. Bidadari II E, Seminyak, Bali",
    contactImageAlt: "Sun Shoot Villas Seminyak",
    aboutHeroTitle: "Tentang Sun Shoot Villas",
    aboutHeroSubtitle: "Keluarga vila di jantung Seminyak, Bali",
    aboutStoryTitle: "Cerita Kami",
    aboutStoryBody:
      "Sun Shoot Villas Seminyak lahir dari keyakinan sederhana: setiap tamu layak mendapatkan lebih dari sekadar tempat tidur. Terletak di area Bidadari Seminyak yang terkenal, keempat vila kolam renang pribadi kami telah menyambut keluarga, pasangan, dan grup teman dari seluruh dunia selama bertahun-tahun. Kami bukan hotel. Kami adalah rumah jauh dari rumah, dan perbedaan itu sangat berarti bagi kami.",
    aboutStoryImageAlt: "Sun Shoot Villas Seminyak",
    aboutFeaturedTitle: "Ditampilkan di The Bali Guideline",
    aboutFeaturedReadArticle: "Baca Artikel",
    aboutOurVillasTitle: "Vila Kami",
    aboutOurVillasBody:
      "Keempat vila kami memiliki kolam renang pribadi masing-masing, karena kami tahu sebagian besar tamu menghargai privasi saat bersantai. Setiap vila dibersihkan setiap hari oleh tim kami yang ramah. Selama beberapa tahun terakhir kami telah berinvestasi besar untuk merenovasi dan meningkatkan semua vila agar tamu mendapatkan nilai terbaik untuk uang mereka. Saat Anda tiba, Anda akan menemukan vila yang bersih, segar, dan terawat dengan indah siap untuk liburan Anda.",
    aboutLocationTitle: "Lokasi",
    aboutLocationBody:
      "Vila kami hanya berjarak beberapa ratus meter dari Sunset Road, jalan utama yang menghubungkan bandara ke Seminyak. Bandara hanya 20 menit tergantung lalu lintas. Seminyak Square dan Eat Street yang terkenal (Jl Kayu Aya) hanya 10 menit berjalan kaki. Restoran seperti La Favella dan Ultimo berada dalam jarak berjalan kaki yang mudah. Tempat terkenal seperti KuDeTa, Potato Head, dan Mexicola hanya 10 menit dengan taksi atau Grab. Pantai di Kuta, Legian, dan Seminyak sekitar 15 menit dengan taksi atau skuter.",
    aboutMeetHostTitle: "Kenalan dengan Warren, Tuan Rumah Anda",
    aboutMeetHostBody:
      "Warren berasal dari Perth, Australia dan telah tinggal di Bali selama lebih dari 9 tahun. Bersama istrinya Lianah, ia mengelola kompleks Sunshoot Villas dengan tim kecil yang berdedikasi. Warren berbicara bahasa Inggris dan sedikit bahasa Indonesia, Lianah fasih berbahasa Indonesia dan Inggris, dan tim dapat membantu dalam bahasa lain menggunakan terjemahan online. Warren dan Lianah bersemangat memberikan perhatian personal kepada setiap tamu dan memastikan liburan Bali Anda sesuai harapan. Mereka selalu dapat dihubungi via WhatsApp, bahkan di luar jam reguler, sehingga Anda tidak perlu khawatir jika ada sesuatu yang muncul selama menginap.",
    aboutMeetHostPhotoShort: "[ Foto ]",
    aboutMeetHostPhotoLong: "[ Foto Anda di sini ]",
    aboutValuesTitle: "Apa yang Kami Percayai",
    aboutValuePersonalTitle: "Pelayanan Personal",
    aboutValuePersonalDescription:
      "Setiap tamu diperlakukan seperti keluarga. Kami mengingat preferensi Anda, mengantisipasi kebutuhan Anda, dan selalu tersedia.",
    aboutValueHomeTitle: "Rumah Anda di Bali",
    aboutValueHomeDescription:
      "Vila kami bukan sekadar akomodasi. Ini adalah tempat perlindungan pribadi Anda, dirancang untuk kenyamanan, relaksasi, dan koneksi.",
    aboutValueHonestTitle: "Hospitality yang Jujur",
    aboutValueHonestDescription:
      "Tanpa biaya tersembunyi, tanpa kejutan. Hanya hospitality Bali yang tulus dari tim yang benar-benar peduli pada pengalaman Anda.",
    bookPageEyebrow: "Reservasi",
    bookSubmittedMessage:
      "Terima kasih! Permintaan pemesanan Anda telah dikirim. Warren akan menghubungi Anda dalam 24 jam.",
    bookDetailsTitle: "Detail Pemesanan",
    bookMinimumStay: "Menginap minimum 4 malam",
    bookAirportPickupToggle: "Tambahkan antar jemput bandara gratis",
    bookSubmitButton: "Kirim Permintaan Pemesanan",
    bookPaymentNote:
      "Pembayaran aman ditangani melalui sistem pemesanan kami. Anda akan menerima instruksi pembayaran melalui email atau WhatsApp setelah pemesanan dikonfirmasi.",
    bookPaymentMethodsLine: "Visa | Mastercard | Tunai",
    bookSummaryTitle: "Ringkasan Pemesanan",
    bookSummaryVilla: "Vila",
    bookSummaryArrival: "Kedatangan",
    bookSummaryDeparture: "Keberangkatan",
    bookSummaryNights: "Malam",
    bookSummaryGuests: "Tamu",
    bookSummaryPolicies:
      "Check-in: {checkIn}. Check-out: Sebelum {checkOut}.",
    bookSummaryConfirmNote:
      "Tim kami akan mengkonfirmasi ketersediaan dan harga via WhatsApp dalam 24 jam.",
    bookSummaryPaymentTitle: "Metode Pembayaran",
    bookSummaryPaymentText: "Kami menerima Visa, Mastercard, dan Tunai.",
    bookTrustSecure: "Pemesanan Aman",
    bookTrustPersonalHost: "Tuan Rumah Personal",
    bookTrustAirportPickup: "Antar Jemput Bandara Gratis",
    bookTrustFlexibleDates: "Tanggal Fleksibel",
    bookGuestAdult: "dewasa",
    bookGuestAdults: "dewasa",
    bookGuestChild: "anak",
    bookGuestChildren: "anak",
    pricePerNight: "per malam",
    priceFrom: "Mulai dari",
    priceTotal: "Total",
    priceSaveBadge: "Hemat {percent}%",
    bookSummaryPrice: "Harga",
    villaBookButton: "Pesan {villaName}",
    bookModalClose: "Tutup formulir pemesanan",
  },
};
