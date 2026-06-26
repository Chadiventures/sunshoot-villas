export type Language = "en" | "id";

export const LANGUAGE_STORAGE_KEY = "sunshoot-language";

export const LANGUAGES: {
  code: Language;
  flag: string;
  name: string;
}[] = [
  { code: "en", flag: "\u{1F1EC}\u{1F1E7}", name: "English" },
  { code: "id", flag: "\u{1F1EE}\u{1F1E9}", name: "Bahasa Indonesia" },
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
  whyChooseUsTitle: string;
  seminyakTitle: string;
  seminyakSubtitle: string;
  findUsTitle: string;
  footerQuickLinksTitle: string;
  footerContactTitle: string;
  bookPageTitle: string;
  bookPageSubtitle: string;
  whatsAppButton: string;
  bannerText: string;
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
    whyChooseUsTitle: "Why Choose Us",
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
    whyChooseUsTitle: "Mengapa Memilih Kami",
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
    villaDescriptions: {
      mawar:
        "Terletak di dalam Kompleks Sunshoot Villas yang rimbun di Jl. Bidadari II E, Villa Mawar adalah vila taman dua lantai yang menakjubkan, hanya beberapa menit dari jantung Seminyak. Vila ini ideal untuk keluarga, pasangan yang bepergian bersama, atau kelompok kecil yang mencari retret pribadi di Bali.",
      jepun:
        "Terletak di jantung Seminyak, Villa Jepun memadukan keeleganan modern dengan arsitektur Bali tradisional. Sempurna untuk pasangan, bulan madu, atau keluarga kecil yang menginginkan pangkalan yang intim dan bergaya untuk liburan Bali mereka.",
      anggrek:
        "Villa Anggrek menawarkan nilai luar biasa tanpa mengorbankan kenyamanan atau gaya. Sempurna untuk pasangan dan keluarga dengan anak kecil. WiFi serat optik 20Mbps tersedia untuk tamu yang bekerja jarak jauh.",
      sandat:
        "Terletak di area Bidadari Seminyak yang terkenal, Villa Sandat adalah retret yang luas dan indah dengan semua yang Anda butuhkan untuk liburan Bali yang sempurna. Sunshoot Food and Drinks mengantarkan langsung ke pintu vila Anda.",
    },
  },
};
