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
  bookPageTitle: string;
  bookPageSubtitle: string;
  whatsAppButton: string;
  bannerText: string;
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
  villaDescriptions: Record<VillaSlug, string>;
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
    bookPageTitle: "Book Your Villa",
    bookPageSubtitle:
      "Fill in your details and we will confirm availability within 24 hours",
    whatsAppButton: "Send Inquiry on WhatsApp",
    bannerText:
      "Limited availability for July 2026 - Enquire now to secure your villa!   |   4 private pool villas in the heart of Seminyak   |   Free airport pickup included   |   Personal service from host Warren   |   ",
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
    villaDescriptions: {
      mawar: "",
      jepun: "",
      anggrek: "",
      sandat: "",
    },
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
    bookPageTitle: "Pesan Vila Anda",
    bookPageSubtitle:
      "Isi detail Anda dan kami akan mengkonfirmasi ketersediaan dalam 24 jam",
    whatsAppButton: "Kirim Pertanyaan via WhatsApp",
    bannerText:
      "Ketersediaan terbatas untuk Juli 2026 - Hubungi kami sekarang!   |   4 vila dengan kolam renang pribadi di Seminyak   |   Antar jemput bandara gratis   |   Pelayanan personal dari tuan rumah Warren   |   ",
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
    villaDescriptions: {
      mawar:
        "Terletak di dalam Kompleks Sunshoot Villas yang rimbun di Jl. Bidadari II E, Villa Mawar adalah vila taman dua lantai yang menakjubkan, hanya beberapa menit dari jantung Seminyak. Vila ini ideal untuk keluarga, pasangan yang bepergian bersama, atau kelompok kecil yang mencari retret pribadi di Bali.",
      jepun:
        "Terletak di jantung Seminyak, Villa Jepun memadukan keeleganan modern dengan arsitektur Bali tradisional. Sempurna untuk pasangan, bulan madu, atau keluarga kecil yang menginginkan pangkalan yang intim dan bergaya untuk liburan Bali mereka.",
      anggrek:
        "Villa Anggrek menawarkan nilai luar biasa tanpa mengorbankan kenyamanan atau gaya. Sempurna untuk pasangan dan keluarga dengan anak kecil. WiFi serat optik 20Mbps tersedia untuk tamu yang bekerja jarak jauh.",
      sandat:
        "Terletak di area Bidadari Seminyak yang terkenal, Villa Sandat adalah retret yang luas dan indah dengan semua yang Anda butuhkan untuk liburan Bali yang sempurna. Sunshooter Bar mengantarkan langsung ke pintu vila Anda.",
    },
  },
};
