"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sagasList, setSagasList] = useState<any[]>([]);
  const [unlockAll, setUnlockAll] = useState(false);

  useEffect(() => {
    const loadSagas = () => {
      fetch("/api/sagas")
        .then((r) => r.json())
        .then((d) => setSagasList(d))
        .catch(() => {});
    };
    loadSagas();

    const val = localStorage.getItem("unlock-all") === "true";
    setUnlockAll(val);

    const checkUnlock = () => {
      setUnlockAll(localStorage.getItem("unlock-all") === "true");
    };
    window.addEventListener("unlockAllChanged", checkUnlock);
    window.addEventListener("previewStateChanged", loadSagas);
    return () => {
      window.removeEventListener("unlockAllChanged", checkUnlock);
      window.removeEventListener("previewStateChanged", loadSagas);
    };
  }, []);

  const toggleUnlockAll = () => {
    const nextVal = !unlockAll;
    localStorage.setItem("unlock-all", nextVal ? "true" : "false");
    setUnlockAll(nextVal);
    window.dispatchEvent(new Event("unlockAllChanged"));
  };

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
          {/* Cómics Dropdown */}
          <div className="relative group">
            <button
              className="font-[var(--font-bangers)] text-xl tracking-wider text-white/80 hover:text-[#f5e642] transition-colors pb-1 border-b-2 border-transparent hover:border-[#f5e642] flex items-center gap-1"
            >
              Cómics
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="opacity-60 group-hover:opacity-100 transition-all group-hover:translate-y-0.5">
                <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            {/* Dropdown Wrapper (invisible bridge) */}
            <div className="absolute top-full left-0 pt-2 hidden group-hover:flex flex-col z-50">
              <div
                className="flex flex-col gap-4 p-4 min-w-[280px] max-w-[320px] max-h-[70vh] overflow-y-auto"
                style={{ background: "#13131e", border: "2px solid #e8185a", boxShadow: "6px 6px 0 #e8185a" }}
              >
                {sagasList.map((saga) => {
                  const isClassic = saga.order < 3;
                  return (
                    <div key={saga.id} className="flex flex-col gap-1 border-b border-white/10 last:border-0 pb-3 last:pb-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-[var(--font-bangers)] text-sm tracking-widest text-[#f5e642] uppercase">
                          {saga.title}
                        </p>
                        {isClassic && (
                          <span 
                            className="font-[var(--font-bangers)] text-[9px] tracking-wider bg-white/10 text-white/50 px-1 border border-white/10 select-none"
                            style={{ transform: "rotate(-1deg)" }}
                          >
                            Piloto
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col gap-0.5 pl-2">
                        {saga.chapters.map((ch: any) => (
                          <Link key={ch.id} href={`/chapters/${ch.id}`}
                            className="font-[var(--font-bangers)] text-base tracking-wider py-1 text-white hover:text-[#0a0a0f] hover:bg-[#f5e642] transition-all block px-2 rounded-sm">
                            <span className="text-[#e8185a] mr-2">#{ch.number}</span>{ch.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Lore Dropdown */}
          <div className="relative group">
            <button
              className="font-[var(--font-bangers)] text-xl tracking-wider text-white/80 hover:text-[#f5e642] transition-colors pb-1 border-b-2 border-transparent hover:border-[#f5e642] flex items-center gap-1"
            >
              Universo
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="opacity-60 group-hover:opacity-100 transition-all group-hover:translate-y-0.5">
                <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <div className="absolute top-full right-0 pt-2 hidden group-hover:flex flex-col z-50">
              <div
                className="flex flex-col gap-1 p-2 min-w-[260px]"
                style={{ background: "#13131e", border: "2px solid #e8185a", boxShadow: "6px 6px 0 #e8185a" }}
              >
                <Link href="/lore"
                  className="font-[var(--font-bangers)] text-lg tracking-wider px-3 py-2 text-white hover:text-[#0a0a0f] hover:bg-[#f5e642] transition-all block">
                  <span className="text-[#e8185a] mr-2">✦</span>Historia y Poderes
                </Link>
              </div>
            </div>
          </div>

          {/* Leer Cómic Button */}
          <Link
            href="/#sagas"
            className="font-[var(--font-bangers)] text-sm tracking-wider px-3.5 py-1.5 border-2 border-white bg-[#e8185a] hover:bg-[#c8134d] text-white uppercase transition-all shadow-[2px_2px_0_#000] active:translate-y-0.5 active:translate-x-0.5 active:shadow-[1px_1px_0_#000] shrink-0"
          >
            Leer Cómic →
          </Link>

          {/* Global Toggle Button */}
          <button
            onClick={toggleUnlockAll}
            className={`font-[var(--font-bangers)] text-sm tracking-wider px-3.5 py-1.5 border-2 border-black uppercase transition-all shadow-[2px_2px_0_#000] active:translate-y-0.5 active:translate-x-0.5 active:shadow-[1px_1px_0_#000] cursor-pointer shrink-0 ${
              unlockAll 
                ? "bg-[#6b7280] hover:bg-[#4b5563] text-white" 
                : "bg-[#f5e642] hover:bg-[#eab308] text-black"
            }`}
          >
            {unlockAll ? "✕ Ocultar Spoilers" : "🔓 Desbloquear Todo"}
          </button>
        </nav>

        {/* Mobile Actions (Spoiler Toggle + Leer + Hamburger) */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            href="/#sagas"
            className="font-[var(--font-bangers)] text-[11px] tracking-wider px-2.5 py-1 border-2 border-white bg-[#e8185a] text-white uppercase transition-all shadow-[2px_2px_0_#000] active:translate-y-0.5 active:translate-x-0.5 active:shadow-[1px_1px_0_#000] shrink-0"
          >
            Leer
          </Link>

          <button
            onClick={toggleUnlockAll}
            className={`font-[var(--font-bangers)] text-[11px] tracking-wider px-2.5 py-1 border-2 border-black uppercase transition-all shadow-[2px_2px_0_#000] active:translate-y-0.5 active:translate-x-0.5 active:shadow-[1px_1px_0_#000] cursor-pointer ${
              unlockAll 
                ? "bg-[#6b7280] text-white" 
                : "bg-[#f5e642] text-black"
            }`}
          >
            {unlockAll ? "✕ Spoilers" : "🔓 Desbloquear"}
          </button>
          
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="font-[var(--font-bangers)] text-2xl text-white border-2 border-white/20 px-3 py-1 hover:border-[#e8185a] hover:text-[#e8185a] transition-colors"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{ background: "#13131e", borderTop: "2px solid #e8185a" }} className="md:hidden px-5 py-6 flex flex-col gap-5">
          {/* Leer Cómic Button on Mobile Dropdown */}
          <Link
            href="/#sagas"
            onClick={() => setMenuOpen(false)}
            className="w-full font-[var(--font-bangers)] text-lg text-center tracking-wider py-2.5 border-2 border-white bg-[#e8185a] hover:bg-[#c8134d] text-white uppercase transition-all shadow-[3px_3px_0_#000] active:translate-y-0.5 active:translate-x-0.5 active:shadow-[2px_2px_0_#000] block"
          >
            Leer Cómic →
          </Link>

          {/* Button at the top of mobile menu */}
          <button
            onClick={toggleUnlockAll}
            className={`w-full font-[var(--font-bangers)] text-lg tracking-wider py-2.5 border-2 border-black uppercase transition-all shadow-[3px_3px_0_#000] active:translate-y-0.5 active:translate-x-0.5 active:shadow-[2px_2px_0_#000] cursor-pointer ${
              unlockAll 
                ? "bg-[#6b7280] text-white" 
                : "bg-[#f5e642] text-black"
            }`}
          >
            {unlockAll ? "✕ Ocultar Spoilers" : "🔓 Desbloquear Todo"}
          </button>
          
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

          <div key="lore-mobile">
            <p
              className="font-[var(--font-bangers)] text-2xl mb-2 tracking-widest"
              style={{ color: "#f5e642" }}
            >
              Universo
            </p>
            <Link href="/lore"
              onClick={() => setMenuOpen(false)}
              className="font-[var(--font-bangers)] text-xl tracking-wider pl-4 py-1.5 block text-white/70 hover:text-[#f5e642] hover:pl-6 transition-all border-l-2 border-white/10 hover:border-[#e8185a] mb-1">
              <span className="text-[#e8185a] mr-2">✦</span>Historia y Poderes
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
