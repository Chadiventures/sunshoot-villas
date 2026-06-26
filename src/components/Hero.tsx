"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SITE } from "@/lib/site";

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
        poster="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1920&q=80"
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
          className="mb-4 text-[var(--brand-green-light)]"
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
          {SITE.tagline.split(" ").slice(0, 3).join(" ")}{" "}
          <em>{SITE.tagline.split(" ").slice(3).join(" ")}</em>
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
          Four private pool villas in the Bidadari area of Seminyak
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="btn-alive inline-block min-h-[44px] border border-[var(--brand-green)] bg-[var(--brand-green)] px-10 py-3.5 text-white transition-all duration-300 hover:bg-[var(--brand-green-hover)]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Enquire Now
          </Link>
          <Link
            href="/villas"
            className="inline-block min-h-[44px] border border-white/60 px-10 py-3.5 text-white transition-all duration-300 hover:border-white"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            View Villas
          </Link>
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
    </section>
  );
}
