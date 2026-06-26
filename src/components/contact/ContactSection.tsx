"use client";

import type { ReactNode } from "react";
import InquiryForm from "@/components/InquiryForm";
import { SITE } from "@/lib/site";

const iconProps = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#1A1A1A",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function LocationIcon() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <path d="M22 6l-10 7L2 6" />
    </svg>
  );
}

function LanguageIcon() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  );
}

const contactItems: {
  icon: ReactNode;
  label: string;
  value: ReactNode;
}[] = [
  {
    icon: <LocationIcon />,
    label: "Location",
    value: (
      <a
        href={`https://maps.google.com/?q=${SITE.mapsQuery}`}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-colors duration-300 hover:text-[var(--brand-green)]"
      >
        {SITE.address}
      </a>
    ),
  },
  {
    icon: <PhoneIcon />,
    label: "Phone",
    value: (
      <a
        href={`tel:${SITE.phoneRaw}`}
        className="transition-colors duration-300 hover:text-[var(--brand-green)]"
      >
        {SITE.phone}
      </a>
    ),
  },
  {
    icon: <WhatsAppIcon />,
    label: "WhatsApp",
    value: (
      <a
        href={`https://wa.me/${SITE.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-colors duration-300 hover:text-[var(--brand-green)]"
      >
        {SITE.phone}
      </a>
    ),
  },
  {
    icon: <EmailIcon />,
    label: "Email",
    value: (
      <a
        href={`mailto:${SITE.email}`}
        className="transition-colors duration-300 hover:text-[var(--brand-green)]"
      >
        {SITE.email}
      </a>
    ),
  },
  {
    icon: <LanguageIcon />,
    label: "Languages Spoken",
    value:
      "Warren speaks English and some Indonesian. Lianah speaks Indonesian and English. Other languages can be assisted via online translation.",
  },
];

const labelStyle = {
  fontFamily: "var(--font-inter)",
  fontSize: "10px",
  fontWeight: 500,
  letterSpacing: "0.2em",
  textTransform: "uppercase" as const,
  color: "var(--brand-green)",
};

const valueStyle = {
  fontFamily: "var(--font-inter)",
  fontSize: "14px",
  fontWeight: 300,
  lineHeight: 1.7,
  color: "#1A1A1A",
};

function ContactItem({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: ReactNode;
}) {
  return (
    <div>
      <div
        className="mb-5"
        style={{ height: "1px", backgroundColor: "var(--brand-green)", opacity: 0.35 }}
      />
      <div className="flex gap-4">
        <div className="shrink-0 pt-0.5">{icon}</div>
        <div>
          <p className="mb-1" style={labelStyle}>
            {label}
          </p>
          <div style={valueStyle}>{value}</div>
        </div>
      </div>
    </div>
  );
}

export default function ContactSection() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      <div className="bg-[var(--cream)] px-6 py-12 md:px-[60px] md:py-16 lg:py-[80px]">
        <h2
          className="mb-10 text-[#1A1A1A]"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "36px",
            fontWeight: 300,
            lineHeight: 1.2,
          }}
        >
          Reach Us Directly
        </h2>

        <div className="space-y-6">
          {contactItems.map((item, index) => (
            <ContactItem
              key={`${item.label}-${index}`}
              icon={item.icon}
              label={item.label}
              value={item.value}
            />
          ))}
        </div>
      </div>

      <div className="bg-[var(--beige)] px-6 py-12 md:px-[60px] md:py-16 lg:py-[80px]">
        <InquiryForm />
      </div>
    </section>
  );
}
