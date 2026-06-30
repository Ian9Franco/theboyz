"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Users, BookOpen, Lock, Unlock, Menu, X } from "lucide-react";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sagasList, setSagasList] = useState<any[]>([]);
  const [unlockAll, setUnlockAll] = useState(false);
  const [pilotsOpen, setPilotsOpen] = useState(false);
  const [mobilePilotsOpen, setMobilePilotsOpen] = useState(false);

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
    <header className="sticky top-0 z-50" style={{ background: "#001419", borderBottom: "3px solid #D7263D" }}>
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 group hover:opacity-90 transition-opacity">
          <img
            src="/logo_white.webp"
            alt="The Boyz Logo"
            className="h-10 w-auto object-contain block rounded-lg"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {/* Cómics Dropdown */}
          <div className="relative group">
            <button
              className="font-[var(--font-bangers)] text-xl tracking-wider text-white/80 hover:text-[#D7263D] transition-colors pb-1 border-b-2 border-transparent hover:border-[#D7263D] flex items-center gap-1"
            >
              Cómics
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="opacity-60 group-hover:opacity-100 transition-all group-hover:translate-y-0.5">
                <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            {/* Dropdown Wrapper (invisible bridge) */}
            <div className="absolute top-full left-0 pt-2 hidden group-hover:flex flex-col z-50">
              <div
                className="flex flex-col gap-4 p-4 min-w-[280px] max-w-[320px] max-h-[70vh] overflow-y-auto rounded-lg"
                style={{ background: "#003842", border: "2px solid #D7263D", boxShadow: "6px 6px 0 #D7263D" }}
              >
                {/* Official Sagas (Canon) */}
                {sagasList.filter(s => s.order >= 3).map((saga) => (
                  <div key={saga.id} className="flex flex-col gap-1 border-b border-white/10 last:border-0 pb-3 last:pb-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-[var(--font-bangers)] text-sm tracking-widest text-[#D7263D] uppercase">
                        {saga.title}
                      </p>
                    </div>
                    <div className="flex flex-col gap-0.5 pl-2">
                      {saga.chapters.map((ch: any) => (
                        <Link key={ch.id} href={`/chapters/${ch.id}`}
                          className="font-[var(--font-bangers)] text-base tracking-wider py-1 text-white hover:text-[#001419] hover:bg-[#D7263D] transition-all block px-2 rounded-sm">
                          <span className="text-[#D7263D] mr-2">#{ch.number}</span>{ch.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Pilot Sagas (Collapsible Section) */}
                {sagasList.some(s => s.order < 3) && (
                  <div className="flex flex-col pt-1">
                    <button
                      onClick={() => setPilotsOpen(!pilotsOpen)}
                      className="w-full flex items-center justify-between font-[var(--font-bangers)] text-sm tracking-widest text-white/50 hover:text-[#D7263D] py-2 border-t border-white/10 transition-colors cursor-pointer select-none"
                    >
                      <span className="flex items-center gap-1.5">
                        <span className="text-[10px] bg-white/10 text-white/60 px-1 border border-white/10">PILOTO</span>
                        CÓMICS ANTERIORES
                      </span>
                      <span className={`transition-transform duration-200 text-xs ${pilotsOpen ? "rotate-180 text-[#D7263D]" : ""}`}>
                        ▼
                      </span>
                    </button>

                    {pilotsOpen && (
                      <div className="flex flex-col gap-3 mt-2 pl-1 border-l-2 border-dashed border-white/10 animate-fadeIn">
                        {sagasList.filter(s => s.order < 3).map((saga) => (
                          <div key={saga.id} className="flex flex-col gap-1 pb-2 last:pb-0 border-b border-white/5 last:border-0">
                            <p className="font-[var(--font-bangers)] text-xs tracking-wider text-[#D7263D]/80 uppercase">
                              {saga.title}
                            </p>
                            <div className="flex flex-col gap-0.5 pl-1.5">
                              {saga.chapters.map((ch: any) => (
                                <Link key={ch.id} href={`/chapters/${ch.id}`}
                                  className="font-[var(--font-bangers)] text-sm tracking-wider py-0.5 text-white/80 hover:text-[#001419] hover:bg-[#D7263D] transition-all block px-1.5 rounded-sm">
                                  <span className="text-[#D7263D] mr-1.5 text-xs">#{ch.number}</span>{ch.title}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Lore Button */}
          <Link
            href="/lore"
            className="font-[var(--font-bangers)] text-xl tracking-wider text-white/80 hover:text-[#D7263D] transition-colors pb-1 border-b-2 border-transparent hover:border-[#D7263D] uppercase"
          >
            LORE
          </Link>

          {/* Personajes Button */}
          <Link
            href="/#pibes"
            className="font-[var(--font-bangers)] text-sm tracking-wider px-4 py-1.5 border-2 border-white/30 bg-white/5 hover:bg-white/15 hover:border-white/60 text-white/80 hover:text-white uppercase transition-all shadow-[2px_2px_0_rgba(0,0,0,0.5)] active:translate-y-0.5 active:translate-x-0.5 shrink-0 flex items-center gap-1.5"
          >
            <Users className="w-3.5 h-3.5" />
            PIBES
          </Link>

          {/* Leer Cómic Button */}
          <Link
            href="/#sagas"
            className="font-[var(--font-bangers)] text-sm tracking-wider px-4 py-1.5 border-2 border-[#D7263D] bg-[#D7263D] hover:bg-[#ff3b51] hover:border-[#ff3b51] text-white uppercase transition-all shadow-[2px_2px_0_#000] active:translate-y-0.5 active:translate-x-0.5 active:shadow-[1px_1px_0_#000] shrink-0 flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5" />
            LEER
          </Link>

          {/* Global Toggle Button */}
          <button
            onClick={toggleUnlockAll}
            className={`font-[var(--font-bangers)] text-sm tracking-wider px-4 py-1.5 border-2 uppercase transition-all shadow-[2px_2px_0_#000] active:translate-y-0.5 active:translate-x-0.5 active:shadow-[1px_1px_0_#000] cursor-pointer shrink-0 flex items-center gap-1.5 ${
              unlockAll
                ? "bg-[#D7263D] border-[#D7263D] text-white hover:bg-[#ff3b51]"
                : "bg-[#D7263D] border-[#D7263D] text-[#001419] hover:bg-[#ff3b51]"
            }`}
          >
            {unlockAll ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
            <span>{unlockAll ? "SPOILERS ON" : "SPOILERS"}</span>
          </button>
        </nav>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/#pibes"
            className="p-2 border border-white/20 bg-white/5 text-white/70 transition-all active:scale-95 shrink-0"
            title="Personajes"
          >
            <Users className="w-4 h-4" />
          </Link>
          <Link
            href="/#sagas"
            className="p-2 border border-[#D7263D] bg-[#D7263D] text-white transition-all shadow-[1px_1px_0_#000] active:scale-95 shrink-0"
            title="Leer Cómic"
          >
            <BookOpen className="w-4 h-4" />
          </Link>

          <button
            onClick={toggleUnlockAll}
            title={unlockAll ? "Ocultar spoilers" : "Mostrar spoilers"}
            className={`p-2 border transition-all shadow-[1px_1px_0_#000] active:scale-95 cursor-pointer shrink-0 ${
              unlockAll
                ? "bg-[#D7263D] border-[#D7263D] text-white"
                : "bg-[#D7263D] border-[#D7263D] text-black"
            }`}
          >
            {unlockAll ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
          </button>
          
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-white border border-white/20 hover:border-[#D7263D] hover:text-[#D7263D] transition-colors"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          style={{ background: "#003842", borderTop: "2px solid #D7263D", maxHeight: "calc(100vh - 64px)" }}
          className="md:hidden px-5 py-6 flex flex-col gap-5 overflow-y-auto"
        >
          <Link
            href="/#sagas"
            onClick={() => setMenuOpen(false)}
            className="w-full font-[var(--font-bangers)] text-lg text-center tracking-wider py-2.5 border-2 border-white bg-[#D7263D] hover:bg-[#ff3b51] text-white uppercase transition-all shadow-[3px_3px_0_#000] active:translate-y-0.5 active:translate-x-0.5 active:shadow-[2px_2px_0_#000] block"
          >
            Leer Cómic →
          </Link>

          <Link
            href="/lore"
            onClick={() => setMenuOpen(false)}
            className="w-full font-[var(--font-bangers)] text-lg text-center tracking-wider py-2.5 border-2 border-white/30 bg-transparent hover:bg-white/10 text-white uppercase transition-all shadow-[3px_3px_0_#000] active:translate-y-0.5 active:translate-x-0.5 active:shadow-[2px_2px_0_#000] block"
          >
            LORE
          </Link>

          {/* Button at the top of mobile menu */}
          <button
            onClick={toggleUnlockAll}
            className="w-full font-[var(--font-bangers)] text-lg tracking-wider py-2.5 border-2 border-black uppercase transition-all shadow-[3px_3px_0_#000] active:translate-y-0.5 active:translate-x-0.5 active:shadow-[2px_2px_0_#000] cursor-pointer"
            style={{
              backgroundColor: unlockAll ? "#6b7280" : "#D7263D",
              color: unlockAll ? "white" : "black"
            }}
          >
            {unlockAll ? "✕ Ocultar Spoilers" : "🔓 Desbloquear Todo"}
          </button>
          
          {/* Official Sagas on Mobile */}
          {sagasList.filter(s => s.order >= 3).map((saga) => (
            <div key={saga.id}>
              <p
                className="font-[var(--font-bangers)] text-2xl mb-2 tracking-widest"
                style={{ color: "#D7263D" }}
              >
                {saga.title}
              </p>
              {saga.chapters.map((ch: any) => (
                <Link key={ch.id} href={`/chapters/${ch.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="font-[var(--font-bangers)] text-xl tracking-wider pl-4 py-1.5 block text-white/70 hover:text-[#D7263D] hover:pl-6 transition-all border-l-2 border-white/10 hover:border-[#D7263D] mb-1">
                  <span className="text-[#D7263D] mr-2">#{ch.number}</span>{ch.title}
                </Link>
              ))}
            </div>
          ))}

          {/* Pilot Sagas on Mobile (Collapsible) */}
          {sagasList.some(s => s.order < 3) && (
            <div className="flex flex-col border-t border-white/10 pt-4">
              <button
                onClick={() => setMobilePilotsOpen(!mobilePilotsOpen)}
                className="w-full flex items-center justify-between font-[var(--font-bangers)] text-xl tracking-widest text-[#D7263D] py-2 cursor-pointer select-none"
              >
                <span className="flex items-center gap-2">
                  <span className="text-xs bg-white/10 text-white/60 px-1.5 py-0.5 border border-white/10">PILOTO</span>
                  CÓMICS ANTERIORES
                </span>
                <span className={`transition-transform duration-200 ${mobilePilotsOpen ? "rotate-180" : ""}`}>
                  ▼
                </span>
              </button>

              {mobilePilotsOpen && (
                <div className="flex flex-col gap-4 mt-3 pl-2 border-l-2 border-dashed border-white/10 animate-fadeIn">
                  {sagasList.filter(s => s.order < 3).map((saga) => (
                    <div key={saga.id}>
                      <p className="font-[var(--font-bangers)] text-lg mb-1.5 tracking-wider text-white/90">
                        {saga.title}
                      </p>
                      {saga.chapters.map((ch: any) => (
                        <Link key={ch.id} href={`/chapters/${ch.id}`}
                          onClick={() => setMenuOpen(false)}
                          className="font-[var(--font-bangers)] text-lg tracking-wider pl-3 py-1 block text-white/60 hover:text-[#D7263D] transition-all border-l border-white/10 mb-0.5">
                          <span className="text-[#D7263D] mr-1.5 text-sm">#{ch.number}</span>{ch.title}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  );
}


