"use client";

import { useEffect, useState } from "react";

function getWeatherEmoji(code: number): string {
  if (code === 0) return "☀️";
  if (code <= 3) return "⛅";
  if (code <= 48) return "🌫️";
  if (code <= 57) return "🌦️";
  if (code <= 67) return "🌧️";
  if (code <= 77) return "❄️";
  if (code <= 82) return "🌧️";
  if (code <= 86) return "🌨️";
  return "⛈️";
}

interface WeatherData {
  temperature: number;
  weatherCode: number;
}

export default function Hero() {
  const [time, setTime] = useState("");
  const [dayDate, setDayDate] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Makassar",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      );
      setDayDate(
        now.toLocaleDateString("en-US", {
          timeZone: "Asia/Makassar",
          weekday: "long",
          month: "long",
          day: "numeric",
        }),
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=-8.6853&longitude=115.1633&current=temperature_2m,weathercode&timezone=Asia%2FMakassar",
        );
        const data = await res.json();
        setWeather({
          temperature: Math.round(data.current.temperature_2m),
          weatherCode: data.current.weathercode,
        });
      } catch {
        setWeather(null);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative flex h-screen min-h-[500px] items-center justify-center overflow-hidden md:min-h-[600px]"
      style={{ marginTop: "-80px" }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ willChange: "transform" }}
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.55) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <p
          className="mb-4 text-[#67bc6a]"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
          }}
        >
          Seminyak, Bali
        </p>

        <h1
          className="mb-6 text-white"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(36px, 8vw, 90px)",
            fontWeight: 300,
            lineHeight: 1.15,
          }}
        >
          Your Private Oasis <em>Awaits</em>
        </h1>

        <p
          className="mb-10 text-white/85"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "16px",
            fontWeight: 300,
            letterSpacing: "0.02em",
          }}
        >
          3-Bedroom Luxury Villas with Private Pool
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            id="book"
            href="#book"
            className="btn-alive inline-block min-h-[44px] border border-[#67bc6a] bg-[#67bc6a] px-10 py-3.5 text-white transition-all duration-300 hover:bg-[#5aaa5d]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Check Availability
          </a>
          <a
            href="https://maps.app.goo.gl/YVMeVAbNe2cC8hh38"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              fontFamily: "var(--font-inter)",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "white",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.6)",
              padding: "14px 40px",
              borderRadius: "2px",
              textDecoration: "none",
              transition: "border-color 0.2s, color 0.2s",
            }}
          >
            Virtual Tour
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 w-full max-w-xs -translate-x-1/2 text-center text-white md:bottom-10 md:right-10 md:left-auto md:w-auto md:max-w-none md:translate-x-0 md:text-right">
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "clamp(20px, 5vw, 28px)",
            fontWeight: 300,
            letterSpacing: "0.05em",
          }}
        >
          {time || "--:--"}
        </p>
        <p
          className="mt-1 text-white/70"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "12px",
            fontWeight: 300,
            letterSpacing: "0.05em",
          }}
        >
          {dayDate}
        </p>
        {weather && (
          <p
            className="mt-2 text-white/80"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "14px",
              fontWeight: 400,
            }}
          >
            {getWeatherEmoji(weather.weatherCode)} {weather.temperature}°C
          </p>
        )}
      </div>

      <div className="absolute bottom-10 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <div
          className="scroll-indicator-line h-10 w-px bg-white/50"
          style={{ transformOrigin: "top" }}
        />
      </div>
    </section>
  );
}
