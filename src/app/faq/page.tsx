import FooterFaq from "@/components/FooterFaq";

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-[#1A2E1A] pt-32">
      <div className="container-site pb-16">
        <h1
          className="mb-8 text-center text-white"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 300,
          }}
        >
          FAQ
        </h1>
        <FooterFaq />
      </div>
    </div>
  );
}
