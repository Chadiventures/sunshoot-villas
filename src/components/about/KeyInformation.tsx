"use client";

import { useState } from "react";

interface TabItem {
  name: string;
  description: string;
}

interface Tab {
  id: string;
  label: string;
  items: TabItem[];
}

const tabs: Tab[] = [
  {
    id: "general",
    label: "General",
    items: [
      {
        name: "Modern Tropical House",
        description:
          "The whole complex has five 500m2 villas with a 200m2 built-up area",
      },
      {
        name: "Spacious Pool and Chilling Area",
        description:
          "An 8x3 metre private pool next to a sun-deck with sun loungers and a shaded 2.20x2.20 metre gazebo",
      },
      {
        name: "Bluetooth Speakers",
        description:
          "High quality bluetooth speakers throughout the villa",
      },
      {
        name: "Entire House Free WiFi",
        description:
          "Strong internet signal that reaches beyond the villa walls. Walk to nearby restaurants without losing your connection",
      },
      {
        name: "Homegrown Organic Coffee",
        description:
          "Coffee sourced from our own plantation, offsetting the Co2 footprint of your stay",
      },
      {
        name: "Massage Beds",
        description:
          "On-call massage service with a trained specialist (paid directly to the therapist)",
      },
      {
        name: "Individual Carports",
        description: "Private parking for each villa",
      },
      {
        name: "Eco-Friendly Design",
        description:
          "Designed with an energy consultant to minimize the ecological footprint",
      },
    ],
  },
  {
    id: "location",
    label: "Location",
    items: [
      {
        name: "Where?",
        description:
          "Located in the centre of Seminyak's famous Eat Street",
      },
      {
        name: "Quiet Location",
        description:
          "Amazingly tranquil, just off the hustle and bustle of Seminyak's Eat Street",
      },
      {
        name: "Secluded and Private",
        description:
          "Down a private road, only 80m to the main road",
      },
      {
        name: "Surrounding Area",
        description:
          "Within a 10 minute radius of the top restaurants, lounges and bar venues in Bali",
      },
    ],
  },
  {
    id: "rooms",
    label: "Rooms",
    items: [
      {
        name: "3 Bedrooms",
        description: "All of which are master bedrooms",
      },
      {
        name: "King-Size Mattresses",
        description:
          "200x200 King-Size Natural Latex orthopedic mattresses",
      },
      {
        name: "Mattress Toppers",
        description: "5cm latex toppers for extra comfort",
      },
      {
        name: "Microfiber Blankets",
        description: "Microfiber duvet blankets for extra breathability",
      },
    ],
  },
  {
    id: "eating",
    label: "Eating",
    items: [
      {
        name: "Fully Equipped Kitchen",
        description: "With modern appliances",
      },
      {
        name: "Espresso Machine",
        description: "And juice extractor",
      },
      {
        name: "Free Grocery Shopping",
        description: "And cooking service during working hours",
      },
      {
        name: "Open Dining Area",
        description: "Seating up to 12 people",
      },
    ],
  },
  {
    id: "staff",
    label: "Staff",
    items: [
      {
        name: "Management",
        description:
          "The managing owner is onsite during your stay and leads the team to meet the expectations of each guest. Staff will meet and greet all guests upon arrival",
      },
      {
        name: "2 Villa Attendants",
        description:
          "Responsible for housekeeping duties, breakfast preparation and providing assistance and services around the villa and grounds",
      },
      {
        name: "Babysitter",
        description:
          "Some of the staff team are also trained as babysitters (extra charges apply)",
      },
      {
        name: "Security Guards",
        description:
          "To ensure the safety and security of guests and premises. The security team is assisted by a CCTV system monitoring the outer premises",
      },
      {
        name: "1 Gardener",
        description: "And daily pool service",
      },
    ],
  },
  {
    id: "kids",
    label: "Kids",
    items: [
      {
        name: "Babysitter",
        description: "Can be supplied on request",
      },
      {
        name: "Baby Cots and High Chairs",
        description: "Included for all infants",
      },
      {
        name: "Pool Fence",
        description: "Can be supplied on request",
      },
      {
        name: "Family Adventures",
        description: "Ask our team for recommendations",
      },
      {
        name: "Child-Friendly Layout",
        description: "One storey layout throughout",
      },
    ],
  },
];

function FeatureRow({
  item,
  index,
  isLast,
}: {
  item: TabItem;
  index: number;
  isLast: boolean;
}) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <div>
      <div
        className="key-info-row flex flex-col gap-4 py-8 md:flex-row md:items-center md:gap-10"
        style={{ paddingLeft: "20px", paddingRight: "20px" }}
      >
        <div className="md:w-[40%] md:shrink-0">
          <p
            className="mb-2 text-[#67bc6a]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.2em",
            }}
          >
            {number}
          </p>
          <h4
            className="text-[#1A1A1A]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.375rem, 4vw, 28px)",
              fontWeight: 400,
              lineHeight: 1.25,
            }}
          >
            {item.name}
          </h4>
        </div>
        <p
          className="text-[#6B6B6B] md:w-[60%]"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "14px",
            fontWeight: 300,
            lineHeight: 1.8,
          }}
        >
          {item.description}
        </p>
      </div>
      {!isLast && (
        <div
          style={{
            height: "1px",
            backgroundColor: "rgba(26, 26, 26, 0.08)",
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export default function KeyInformation() {
  const [activeTab, setActiveTab] = useState("general");
  const activeContent = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  return (
    <section className="bg-[#c1bab2]">
      <div className="px-6 pb-0 pt-12 text-center md:pt-16 lg:px-10 lg:pt-20">
        <p
          className="mb-3 text-[#67bc6a]"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
          }}
        >
          Key Information
        </p>
        <h2
          className="text-[#1A1A1A]"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 300,
            lineHeight: 1.2,
          }}
        >
          Everything You Need to Know
        </h2>

        <div className="key-info-tabs-scroll mt-10 flex w-full items-center px-6 md:flex-wrap md:justify-center md:px-0">
          {tabs.map((tab, index) => (
            <div key={tab.id} className="flex shrink-0 items-center">
              <button
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className="relative min-h-[44px] px-4 pb-3 pt-1 transition-colors duration-300 sm:px-5"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "11px",
                  fontWeight: 400,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color:
                    activeTab === tab.id
                      ? "#1A1A1A"
                      : "rgba(26, 26, 26, 0.5)",
                  background: "transparent",
                  border: "none",
                  borderBottom:
                    activeTab === tab.id
                      ? "2px solid #67bc6a"
                      : "2px solid transparent",
                }}
              >
                {tab.label}
              </button>
              {index < tabs.length - 1 && (
                <div
                  className="hidden h-4 w-px sm:block"
                  style={{ backgroundColor: "rgba(26, 26, 26, 0.1)" }}
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div
        key={activeTab}
        className="key-info-content relative h-auto overflow-visible bg-[#F7F3EE] px-6 py-10 md:px-10 md:py-12 lg:px-[80px] lg:py-[60px]"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <p
            className="absolute bottom-0 right-0 select-none"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(6rem, 18vw, 12rem)",
              fontWeight: 300,
              lineHeight: 0.85,
              color: "#1A1A1A",
              opacity: 0.03,
              transform: "translate(8%, 20%)",
            }}
          >
            {activeContent.label.toUpperCase()}
          </p>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          {activeContent.items.map((item, index) => (
            <FeatureRow
              key={item.name}
              item={item}
              index={index}
              isLast={index === activeContent.items.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
