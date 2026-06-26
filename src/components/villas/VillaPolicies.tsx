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
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {policies.map((policy) => (
        <div key={policy.label}>
          <h4
            className="mb-2 text-[var(--sand)]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.6875rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            {policy.label}
          </h4>
          <p
            className="text-white/70"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.875rem",
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
