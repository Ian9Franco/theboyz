"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sagasList, setSagasList] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/sagas")
      .then((r) => r.json())
      .then((d) => setSagasList(d))
      .catch(() => {});
  }, []);

  return (
    <header className="sticky top-0 z-50" style={{ background: "#0a0a0f", borderBottom: "3px solid #e8185a" }}>
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group hover:opacity-90 transition-opacity">
          <img
            src="/logo.png"
            alt="The Boyz Logo"
            className="h-10 w-auto object-contain block"
          />
          <span
            className="font-[var(--font-bungee)] text-3xl tracking-widest text-white leading-none hidden sm:block pt-1"
            style={{ textShadow: "3px 3px 0 #e8185a" }}
          >
            THE BOYZ
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {sagasList.map((saga) => (
            <div key={saga.id} className="relative group">
              <button
                className="font-[var(--font-bangers)] text-xl tracking-wider text-white/80 hover:text-[#f5e642] transition-colors pb-1 border-b-2 border-transparent hover:border-[#f5e642] flex items-center gap-1"
              >
                {saga.title}
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="opacity-60 group-hover:opacity-100 transition-all group-hover:translate-y-0.5">
                  <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              {/* Dropdown Wrapper (invisible bridge) */}
              <div className="absolute top-full right-0 pt-2 hidden group-hover:flex flex-col z-50">
                <div
                  className="flex flex-col gap-1 p-2 min-w-[260px]"
                  style={{ background: "#13131e", border: "2px solid #e8185a", boxShadow: "6px 6px 0 #e8185a" }}
                >
                  {saga.chapters.map((ch: any) => (
                    <Link key={ch.id} href={`/chapters/${ch.id}`}
                      className="font-[var(--font-bangers)] text-lg tracking-wider px-3 py-2 text-white hover:text-[#0a0a0f] hover:bg-[#f5e642] transition-all block">
                      <span className="text-[#e8185a] mr-2">#{ch.number}</span>{ch.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </nav>

        {/* Mobile burger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden font-[var(--font-bangers)] text-2xl text-white border-2 border-white/20 px-3 py-1 hover:border-[#e8185a] hover:text-[#e8185a] transition-colors"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{ background: "#13131e", borderTop: "2px solid #e8185a" }} className="md:hidden px-5 py-6 flex flex-col gap-5">
          {sagasList.map((saga) => (
            <div key={saga.id}>
              <p
                className="font-[var(--font-bangers)] text-2xl mb-2 tracking-widest"
                style={{ color: "#f5e642" }}
              >
                {saga.title}
              </p>
              {saga.chapters.map((ch: any) => (
                <Link key={ch.id} href={`/chapters/${ch.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="font-[var(--font-bangers)] text-xl tracking-wider pl-4 py-1.5 block text-white/70 hover:text-[#f5e642] hover:pl-6 transition-all border-l-2 border-white/10 hover:border-[#e8185a] mb-1">
                  <span className="text-[#e8185a] mr-2">#{ch.number}</span>{ch.title}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
