import { GLOBAL_POLICIES } from "@/lib/site";

const policies = [
  { label: "Check-in", value: GLOBAL_POLICIES.checkIn },
  { label: "Check-out", value: GLOBAL_POLICIES.checkOut },
  { label: "Payment", value: GLOBAL_POLICIES.payment },
  { label: "Smoking", value: GLOBAL_POLICIES.smoking },
  { label: "Cancellation", value: GLOBAL_POLICIES.cancellation },
];

export default function VillaPolicies() {
  return (
    <div className="space-y-6">
      {policies.map((policy) => (
        <div key={policy.label}>
          <h4
            className="mb-2 text-[var(--brand-green)]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            {policy.label}
          </h4>
          <p
            className="text-[#6B6B6B]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "14px",
              fontWeight: 300,
              lineHeight: 1.7,
            }}
          >
            {policy.value}
          </p>
        </div>
      ))}
    </div>
  );
}
