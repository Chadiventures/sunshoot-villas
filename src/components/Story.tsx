"use client";

const VIDEO_SRC =
  "https://videos.pexels.com/video-files/1093662/1093662-hd_1920_1080_30fps.mp4";

export default function Story() {
  return (
    <section
      id="families"
      className="relative w-full overflow-hidden"
      style={{ minHeight: "400px" }}
    >
      <video
        src={VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedData={() => {
          console.log("Story video loaded successfully");
        }}
        onError={(e) => {
          console.error("Story video failed to load:", VIDEO_SRC, e);
        }}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          willChange: "transform",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(28, 46, 32, 0.70)",
        }}
      />

      <div
        className="relative z-10 mx-auto max-w-4xl px-6 py-[60px] text-center md:px-12 md:py-[100px]"
      >
        <span
          className="block text-[#67bc6a] select-none"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "120px",
            fontWeight: 300,
            lineHeight: 0.8,
          }}
          aria-hidden="true"
        >
          &ldquo;
        </span>

        <blockquote
          className="my-6 text-white"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(28px, 5vw, 42px)",
            fontWeight: 300,
            fontStyle: "italic",
            lineHeight: 1.4,
          }}
        >
          Not a hotel. Not a resort. Simply your home in Bali.
        </blockquote>

        <span
          className="block text-[#67bc6a] select-none"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "120px",
            fontWeight: 300,
            lineHeight: 0.8,
          }}
          aria-hidden="true"
        >
          &rdquo;
        </span>
      </div>
    </section>
  );
}
