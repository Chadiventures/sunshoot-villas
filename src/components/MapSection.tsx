import { MAPS_EMBED } from "@/lib/media";
import { SITE } from "@/lib/site";

export default function MapSection() {
  return (
    <section className="bg-[var(--bg)] py-20 md:py-28">
      <div className="container-site">
        <div className="mb-10 text-center">
          <p className="section-eyebrow mb-3">Location</p>
          <h2 className="section-heading">Find Us</h2>
          <p
            className="mx-auto mt-4 max-w-xl text-[var(--text-muted)]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "1rem",
              fontWeight: 300,
              lineHeight: 1.7,
            }}
          >
            {SITE.address}
          </p>
        </div>

        <div className="mx-auto max-w-4xl overflow-hidden rounded-sm shadow-md">
          <iframe
            title="Sun Shoot Villas Seminyak location"
            src={MAPS_EMBED}
            width="100%"
            height="450"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
