"use client";

import { MAPS_EMBED } from "@/lib/media";
import { useContext } from "react";
import { AdminEditableText } from "@/components/admin/AdminEditableText";
import { AdminCoreContext, useAdminContent } from "@/hooks/useAdminContent";
import { getPageContentDefaults } from "@/lib/contentDefaults";

const HOME_DEFAULTS = getPageContentDefaults("home");

export default function MapSection() {
  const core = useContext(AdminCoreContext);
  const { getText } = useAdminContent();
  void core?.contentRevision;

  return (
    <section className="bg-[var(--bg)] py-20 md:py-28">
      <div className="container-site">
        <div className="mb-10 text-center">
          <p className="section-eyebrow mb-3">
            <AdminEditableText blockKey="map.eyebrow" fallback={HOME_DEFAULTS["map.eyebrow"]} as="span" />
          </p>
          <h2 className="section-heading">
            <AdminEditableText blockKey="map.title" fallback={HOME_DEFAULTS["map.title"]} as="span" />
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl text-[var(--text-muted)]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "1rem",
              fontWeight: 300,
              lineHeight: 1.7,
            }}
          >
            <AdminEditableText blockKey="map.address" fallback={HOME_DEFAULTS["map.address"]} as="span" />
          </p>
        </div>

        <div className="mx-auto max-w-4xl overflow-hidden rounded-sm shadow-md">
          <iframe
            title="Sun Shoot Villas Seminyak location"
            src={getText("map.embed_url") || HOME_DEFAULTS["map.embed_url"] || MAPS_EMBED}
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
