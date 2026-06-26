"use client";

import { useEffect, useState } from "react";
import { VILLAS } from "@/lib/villas";
import type { VillaContentStore, VillaContentEntry } from "@/lib/villa-content";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [content, setContent] = useState<VillaContentStore>({});
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const fetchContent = async () => {
    const res = await fetch("/api/admin/content");
    if (res.ok) {
      const data = await res.json();
      setContent(data);
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setPassword("");
      await fetchContent();
    } else {
      setLoginError("Incorrect password. Please try again.");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
    setContent({});
  };

  const updateVilla = (
    slug: string,
    field: keyof VillaContentEntry,
    value: string | string[],
  ) => {
    setContent((prev) => ({
      ...prev,
      [slug]: {
        ...prev[slug],
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveMessage("");
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    setSaving(false);
    if (res.ok) {
      setSaveMessage("Changes saved successfully.");
    } else {
      setSaveMessage("Failed to save. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[var(--cream)]">
        <p style={{ fontFamily: "var(--font-inter)", color: "var(--muted)" }}>
          Loading...
        </p>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[var(--cream)] px-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-[3px] bg-white p-8 shadow-lg"
        >
          <h1
            className="mb-2 text-[var(--dark-green)]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "1.75rem",
              fontWeight: 300,
            }}
          >
            Admin Login
          </h1>
          <p
            className="mb-6 text-[var(--muted)]"
            style={{ fontFamily: "var(--font-inter)", fontSize: "13px" }}
          >
            Sun Shoot Villas content management
          </p>
          <label
            htmlFor="password"
            className="mb-2 block text-[var(--brand-green)]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 w-full border-b border-[#1A1A1A]/20 bg-transparent py-2 outline-none"
            style={{ fontFamily: "var(--font-inter)", fontSize: "14px" }}
            required
          />
          {loginError && (
            <p className="mb-4 text-sm text-red-600">{loginError}</p>
          )}
          <button
            type="submit"
            className="w-full bg-[var(--brand-green)] py-3 text-white"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Sign In
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-[var(--cream)] px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1
              className="text-[var(--dark-green)]"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "2rem",
                fontWeight: 300,
              }}
            >
              Villa Content Editor
            </h1>
            <p
              className="text-[var(--muted)]"
              style={{ fontFamily: "var(--font-inter)", fontSize: "13px" }}
            >
              Edit descriptions, images and pricing for each villa
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="border border-[var(--brand-green)] px-4 py-2 text-[var(--brand-green)]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Log Out
          </button>
        </div>

        <div className="space-y-8">
          {VILLAS.map((villa) => {
            const entry = content[villa.slug] ?? {
              description: "",
              heroImage: "",
              galleryImages: [],
              pricing: "",
            };
            return (
              <div
                key={villa.slug}
                className="rounded-[3px] bg-white p-6 shadow-sm"
              >
                <h2
                  className="mb-4 text-[var(--dark-green)]"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "1.5rem",
                    fontWeight: 400,
                  }}
                >
                  {villa.name}
                </h2>

                <div className="space-y-4">
                  <div>
                    <label
                      className="mb-1 block text-[var(--brand-green)]"
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "10px",
                        fontWeight: 500,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                      }}
                    >
                      Description
                    </label>
                    <textarea
                      rows={4}
                      value={entry.description}
                      onChange={(e) =>
                        updateVilla(villa.slug, "description", e.target.value)
                      }
                      className="w-full border border-[#1A1A1A]/10 p-3"
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "14px",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      className="mb-1 block text-[var(--brand-green)]"
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "10px",
                        fontWeight: 500,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                      }}
                    >
                      Hero Image URL
                    </label>
                    <input
                      type="url"
                      value={entry.heroImage}
                      onChange={(e) =>
                        updateVilla(villa.slug, "heroImage", e.target.value)
                      }
                      className="w-full border border-[#1A1A1A]/10 p-3"
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "14px",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      className="mb-1 block text-[var(--brand-green)]"
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "10px",
                        fontWeight: 500,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                      }}
                    >
                      Gallery Image URLs (one per line)
                    </label>
                    <textarea
                      rows={3}
                      value={entry.galleryImages.join("\n")}
                      onChange={(e) =>
                        updateVilla(
                          villa.slug,
                          "galleryImages",
                          e.target.value
                            .split("\n")
                            .map((s) => s.trim())
                            .filter(Boolean),
                        )
                      }
                      className="w-full border border-[#1A1A1A]/10 p-3"
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "14px",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      className="mb-1 block text-[var(--brand-green)]"
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "10px",
                        fontWeight: 500,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                      }}
                    >
                      Pricing Info
                    </label>
                    <input
                      type="text"
                      value={entry.pricing}
                      onChange={(e) =>
                        updateVilla(villa.slug, "pricing", e.target.value)
                      }
                      className="w-full border border-[#1A1A1A]/10 p-3"
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "14px",
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-[var(--brand-green)] px-8 py-3 text-white disabled:opacity-50"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            {saving ? "Saving..." : "Save All Changes"}
          </button>
          {saveMessage && (
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "13px",
                color: saveMessage.includes("success")
                  ? "var(--brand-green)"
                  : "#c44",
              }}
            >
              {saveMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
