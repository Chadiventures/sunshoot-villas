"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const WHATSAPP_URL = "https://wa.me/6281239701978";

function WhatsAppIcon({
  size,
  className,
}: {
  size: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="white"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function FloatingWhatsAppButton() {
  const { t } = useLanguage();
  const [labelBounce, setLabelBounce] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLabelBounce(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        @keyframes wa-chat-label-bounce {
          0%, 100% { transform: translateY(0); }
          25% { transform: translateY(-8px); }
          45% { transform: translateY(0); }
          65% { transform: translateY(-4px); }
          80% { transform: translateY(0); }
        }
        .wa-chat-label-bounce {
          animation: wa-chat-label-bounce 0.7s ease-in-out;
        }
      `}</style>

      <div className="fixed right-6 bottom-6 z-40">
        <div className="flex items-center gap-2.5">
          <span
            className={`whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#1A2E1A] shadow-md md:px-3.5 md:py-2 md:text-[13px] ${labelBounce ? "wa-chat-label-bounce" : ""}`}
            style={{
              fontFamily: "var(--font-inter)",
              lineHeight: 1.2,
            }}
            aria-hidden="true"
          >
            {t.whatsappChatBubble}
          </span>

          <div className="group relative">
            <span
              className="pointer-events-none absolute right-0 bottom-full mb-3 hidden rounded-sm bg-[var(--dark)] px-3 py-2 text-white opacity-0 shadow-lg transition-opacity duration-300 ease-in-out group-hover:opacity-100 md:block"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.75rem",
                fontWeight: 400,
                whiteSpace: "nowrap",
              }}
              role="tooltip"
            >
              Chat with us on WhatsApp
            </span>

            <span className="wa-fab-pulse" aria-hidden="true" />

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with us on WhatsApp"
              className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform duration-300 ease-in-out hover:scale-110 md:h-14 md:w-14"
            >
              <WhatsAppIcon size={22} className="md:hidden" />
              <WhatsAppIcon size={26} className="hidden md:block" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
