export default function VillaSectionDivider() {
  return (
    <div className="villa-section-divider" aria-hidden="true">
      <svg
        viewBox="0 0 1440 48"
        preserveAspectRatio="none"
        className="h-8 w-full md:h-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M0,24 C240,48 480,0 720,24 C960,48 1200,0 1440,24 L1440,48 L0,48 Z"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.35"
          d="M80,28 C200,8 320,38 480,22 C640,6 760,34 920,20 C1080,6 1200,32 1360,18"
        />
      </svg>
    </div>
  );
}
