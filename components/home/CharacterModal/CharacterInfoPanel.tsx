"use client";

import React, { useState, useEffect } from "react";
import { Zap, ZapOff } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { conceptArts } from "@/lib/characterData/conceptArts";
import { ImageLightbox } from "./ImageLightbox";
import { RadarChart } from "./RadarChart";

interface CharacterInfoPanelProps {
  char: any;
  isPowersMode: boolean;
  selectedImageId: string;
  unlockAll: boolean;
  handlePowersModeToggle: () => void;
}

function getTextColor(hexColor: string) {
  if (!hexColor) return "white";
  const color = hexColor.replace("#", "");
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 140 ? "#001419" : "white";
}

function getVibrantColor(hexColor: string) {
  if (!hexColor) return "#D7263D";
  const c = hexColor.toLowerCase();
  if (c === "#0d3a2b") return "#10b981"; // Ian: emerald green
  if (c === "#0a1128") return "#3b82f6"; // Julián: vibrant blue
  if (c === "#4c1d95") return "#a855f7"; // Mati: vibrant purple
  if (c === "#b91c1c") return "#D7263D"; // Uandi: vibrant red
  return hexColor;
}

function getDarkBgColor(hexColor: string) {
  if (!hexColor) return "#0f172a";
  const c = hexColor.toLowerCase();
  if (c === "#0d3a2b") return "#061410";
  if (c === "#D7263D") return "#121203";
  if (c === "#0a1128") return "#020512";
  if (c === "#4c1d95") return "#0d041c";
  if (c === "#b91c1c") return "#170303";
  if (c === "#f95700") return "#170802";
  if (c === "#06b6d4") return "#021214";
  return "#0f172a";
}

export function CharacterInfoPanel({
  char,
  isPowersMode,
  selectedImageId,
  unlockAll,
  handlePowersModeToggle,
}: CharacterInfoPanelProps) {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [showAlts, setShowAlts] = useState(false);

  useEffect(() => {
    setShowAlts(false);
  }, [char.id]);

  const isPibe =
    char.category === "pibes" ||
    ["ian", "jaz", "julian", "mati", "uandi", "volvo", "sofi"].includes(char.id);

  const isLocked = char.incognito && !unlockAll;
  const accent = isLocked ? "#6b7280" : char.color;
  const vibrantAccent = getVibrantColor(accent);
  const darkBg = getDarkBgColor(accent);

  const stats = isPowersMode
    ? char.powers?.stats
    : char.stats;

  // Resolve active variant details dynamically by filename matching
  let activeVariantData = null;
  if (isPowersMode && char.powers?.variantData) {
    let selectedImageSrc = "";
    if (selectedImageId === "portada" || selectedImageId === "default") {
      selectedImageSrc = char.portadaImages?.[0] || "";
    } else if (selectedImageId === "ficha") {
      selectedImageSrc = char.fichaImages?.[0] || "";
    } else if (selectedImageId.startsWith("portada_alt_")) {
      const idx = parseInt(selectedImageId.replace("portada_alt_", ""), 10);
      selectedImageSrc = char.portadaImages?.[idx] || "";
    } else if (selectedImageId.startsWith("ficha_alt_")) {
      const idx = parseInt(selectedImageId.replace("ficha_alt_", ""), 10);
      selectedImageSrc = char.fichaImages?.[idx] || "";
    }

    if (selectedImageSrc) {
      const filename = selectedImageSrc.split("/").pop()?.toLowerCase() || "";
      const cleanName = filename.replace(/\.[^/.]+$/, ""); // remove extension

      const keys = Object.keys(char.powers.variantData);
      let matchedKey: string | null = null;

      // Normalization mappings
      const normalizedFilename = cleanName
        .replace("mark-3", "mk3")
        .replace("mark-l", "mkl")
        .replace("mark-iii", "mk3")
        .replace("mark-lxxxv", "mkl")
        .replace("_", "")
        .replace("-", "");

      for (const key of keys) {
        const normalizedKey = key.toLowerCase().replace("_", "").replace("-", "");
        if (normalizedFilename.includes(normalizedKey) || normalizedKey.includes(normalizedFilename)) {
          matchedKey = key;
          break;
        }
      }

      if (!matchedKey) {
        if (cleanName.includes("alt")) matchedKey = "alt";
        else if (cleanName.includes("combat") || cleanName.includes("overlord")) matchedKey = "combat";
      }

      if (matchedKey) {
        activeVariantData = char.powers.variantData[matchedKey];
      }
    }
  }

  const variantContent = {
    habilidades: activeVariantData?.habilidades ?? char.powers?.habilidades,
    significa: activeVariantData?.significa ?? char.powers?.significa,
    crisis: activeVariantData?.crisis ?? char.powers?.crisis,
    variantLabel: activeVariantData?.label ?? null,
  };

  const isLocation = char.category === "locaciones";
  const statRows = isLocation
    ? [
        { name: "Recursos", val: stats?.fuerza ?? 0 },
        { name: "Tecnología", val: stats?.inteligencia ?? 0 },
        { name: "Confort", val: stats?.carisma ?? 0 },
        { name: "Sigilo", val: stats?.suerte ?? 0 },
        { name: "Defensas", val: stats?.combate ?? 0 },
        { name: "Blindaje", val: stats?.defensa ?? 0 },
        {
          name: char.especialLabel || "Especial",
          val: isPowersMode
            ? char.powers?.stats?.especialVal ?? 0
            : char.stats?.especialVal ?? 0,
        },
      ]
    : [
        { name: "Fuerza", val: stats?.fuerza ?? 0 },
        { name: "Intel.", val: stats?.inteligencia ?? 0 },
        { name: "Carisma", val: stats?.carisma ?? 0 },
        { name: "Suerte", val: stats?.suerte ?? 0 },
        { name: "Combate", val: stats?.combate ?? 0 },
        { name: "Defensa", val: stats?.defensa ?? 0 },
        {
          name: char.especialLabel || "Especial",
          val: isPowersMode
            ? char.powers?.stats?.especialVal ?? 0
            : char.stats?.especialVal ?? 0,
        },
      ];

  return (
    <div
      style={{
        backgroundColor: isPowersMode ? darkBg : "#ffffff",
        color: isPowersMode ? "#f8fafc" : "#001419",
      }}
      className="flex-1 flex flex-col p-4 sm:p-5 gap-2 sm:gap-3 overflow-y-auto transition-colors duration-400"
    >
      {isLocked ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-3 flex-shrink-0">
          <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center border-2 border-black">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h3 className="font-[var(--font-bangers)] text-3xl tracking-wider">PERSONAJE BLOQUEADO</h3>
          <p className="font-[var(--font-marker)] text-base text-[#D7263D] uppercase tracking-wider">Próximamente</p>
          <p className="font-sans text-sm text-gray-500 max-w-xs leading-snug">
            {char.hint ?? "Seguí leyendo para desbloquear este personaje."}
          </p>
        </div>
      ) : (
        <>
          {/* ── name + role tag + detalles button ── */}
          <div className="flex items-start justify-between gap-2 pr-8 flex-shrink-0">
            <div className="flex flex-col gap-0.5 min-w-0">
              <span
                className="tag text-[9px] font-[var(--font-bangers)] tracking-wider px-2 py-0.5 border-2 border-black self-start"
                style={{
                  background: isPowersMode ? vibrantAccent : accent,
                  color: getTextColor(isPowersMode ? vibrantAccent : accent),
                }}
              >
                {isPibe
                  ? isPowersMode
                    ? variantContent.variantLabel
                      ? `${char.powers?.role?.split(" / ")[0]} — ${variantContent.variantLabel}`
                      : char.powers?.role
                    : char.role
                  : char.role}
              </span>
              <h2
                className="font-[var(--font-bangers)] text-3xl sm:text-4xl leading-none tracking-widest flex flex-wrap items-baseline gap-x-2"
                style={{ textShadow: isPowersMode ? `2px 2px 0 ${darkBg}, 4px 4px 0 ${vibrantAccent}` : `2px 2px 0 ${accent}` }}
              >
                <span>{char.name.toUpperCase()}</span>
                {isPibe && isPowersMode && char.powers?.role && (
                  <span
                    style={{ color: vibrantAccent }}
                    className="text-base sm:text-lg font-[var(--font-marker)] tracking-normal normal-case block sm:inline"
                  >
                    {variantContent.variantLabel
                      ? variantContent.variantLabel.toUpperCase()
                      : `AKA: ${char.powers.role.split(" / ")[0].toUpperCase()}`}
                  </span>
                )}
              </h2>
            </div>

            {/* Inline DETALLES toggle (only for Pibes) */}
            {isPibe && (
              <button
                onClick={handlePowersModeToggle}
                title={isPowersMode ? "Vista General" : "Detalles"}
                style={{
                  backgroundColor: isPowersMode ? vibrantAccent : accent,
                  color: isPowersMode ? getTextColor(vibrantAccent) : getTextColor(accent),
                  borderColor: isPowersMode ? vibrantAccent : "#001419",
                  boxShadow: isPowersMode ? `2px 2px 0 ${darkBg}` : "2px 2px 0 #000",
                }}
                className="shrink-0 mt-1 px-3 py-1.5 border-2 font-[var(--font-bangers)] text-xs tracking-wider uppercase active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5 hover:brightness-110"
              >
                {isPowersMode ? (
                  <><ZapOff className="w-3.5 h-3.5" /><span>BASE</span></>
                ) : (
                  <><Zap className="w-3.5 h-3.5 fill-current" /><span>DETALLES</span></>
                )}
              </button>
            )}
          </div>

          {/* ── profile / habilidades ── */}
          <div
            style={{ borderColor: isPowersMode ? `${vibrantAccent}33` : "#001419" }}
            className="border-t-2 pt-1.5 flex flex-col gap-0.5 flex-shrink-0"
          >
            <h4 className="font-[var(--font-bangers)] text-[10px] tracking-wider">
              {isPowersMode ? "HABILIDADES:" : "PERFIL:"}
            </h4>
            <ul className="font-sans text-[11px] leading-snug flex flex-col gap-0.5 pl-3 list-disc list-outside">
              {(isPowersMode ? variantContent.habilidades : char.perfil)
                ?.map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
            </ul>
          </div>

          {/* ── abilities / habilidades (for non-pibes) ── */}
          {!isPibe && char.powers?.habilidades && (
            <div
              className="border-t-2 pt-2 flex flex-col gap-1 flex-shrink-0"
              style={{ borderColor: "#001419" }}
            >
              <h4 className="font-[var(--font-bangers)] text-xs tracking-wider">HABILIDADES ESPECIALES:</h4>
              <ul className="font-sans text-xs leading-relaxed flex flex-col gap-1 pl-3 list-disc list-outside">
                {char.powers.habilidades.map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* ── extras ── */}
          {char.extras && Object.keys(char.extras).length > 0 && (
            <div
              className="border-t-2 pt-2 flex flex-col gap-1 flex-shrink-0"
              style={{ borderColor: isPowersMode ? `${vibrantAccent}33` : "#001419" }}
            >
              <h4 className="font-[var(--font-bangers)] text-xs tracking-wider">EXTRAS:</h4>
              <div className="flex flex-col gap-1 pl-1">
                {Object.entries(char.extras).map(([key, val]) => (
                  <div key={key} className="text-xs font-sans leading-relaxed">
                    <strong className="font-[var(--font-bangers)] tracking-wider uppercase text-[10px] mr-1" style={{ color: isPowersMode ? vibrantAccent : accent }}>
                      {key}:
                    </strong>
                    <span>{val as string}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── significa banner ── */}
          {((isPowersMode && variantContent.significa) || (!isPibe && char.powers?.significa)) && (
            <div
              className="p-2 border-2 relative bg-[#003842] flex-shrink-0"
              style={{
                borderColor: isPowersMode ? vibrantAccent : accent,
                boxShadow: isPowersMode ? `2px 2px 0 ${vibrantAccent}` : `2px 2px 0 ${accent}`,
              }}
            >
              <span
                className="font-[var(--font-marker)] text-[9px] uppercase absolute -top-2.5 left-3 rotate-[-1deg] border border-[#001419] px-1.5 py-0"
                style={{
                  backgroundColor: isPowersMode ? vibrantAccent : accent,
                  color: getTextColor(isPowersMode ? vibrantAccent : accent),
                }}
              >
                {isPowersMode && variantContent.variantLabel ? variantContent.variantLabel.toUpperCase() : "SIGNIFICA:"}
              </span>
              <p className="font-sans text-[10px] leading-snug text-white mt-0.5">
                {isPowersMode ? variantContent.significa : char.powers?.significa}
              </p>
            </div>
          )}

          {/* ── crisis + stats en fila ── */}
          <div className="flex gap-2 flex-shrink-0 items-stretch">
            {/* Crisis box */}
            <div
              className="flex-1 border-2 p-2.5 relative flex flex-col gap-1 transition-all duration-300 min-w-0"
              style={{
                backgroundColor: isPowersMode ? "#111827" : "#fffbeb",
                borderColor: isPowersMode ? vibrantAccent : "#001419",
                boxShadow: isPowersMode ? `2px 2px 0 ${vibrantAccent}` : "2px 2px 0 #000",
              }}
            >
              <div
                className="self-start font-[var(--font-bangers)] text-[10px] tracking-wider px-1.5 py-0.5 border-2 uppercase"
                style={{
                  backgroundColor: isPowersMode ? vibrantAccent : "#D7263D",
                  color: isPowersMode ? getTextColor(vibrantAccent) : "white",
                  borderColor: isPowersMode ? vibrantAccent : "#001419",
                }}
              >
                {isPowersMode ? "Ficha Táctica" : "En Crisis"}
              </div>
              <p className="font-sans text-[11px] leading-snug">
                {isPowersMode ? variantContent.crisis : char.powers?.crisis || char.crisis}
              </p>
            </div>

            {/* Stats radar */}
            <div
              style={{ borderColor: isPowersMode ? `${vibrantAccent}33` : "#e2e8f0" }}
              className="flex flex-col gap-0.5 flex-shrink-0 border-t-0"
            >
              <h4 className="font-[var(--font-bangers)] text-[10px] tracking-wider text-center">
                {isLocation ? "MÉTRICAS" : "STATS"}
              </h4>
              <RadarChart stats={statRows} color={isPowersMode ? vibrantAccent : accent} isDark={isPowersMode} size={180} />
            </div>
          </div>

          {/* ── Concept Arts section (for Pibes and any other characters in both views) ── */}
          {(conceptArts[char.id] || []).length > 0 && (() => {
            const charConcepts = conceptArts[char.id] || [];
            const hasAlts = charConcepts.some((c) => c.isAlt);
            const altCount = charConcepts.filter((c) => c.isAlt).length;
            const visibleConcepts = showAlts ? charConcepts : charConcepts.filter((c) => !c.isAlt);

            return (
              <div
                style={{ borderColor: isPowersMode ? `${vibrantAccent}33` : "#e2e8f0" }}
                className="border-t pt-4 flex flex-col gap-3 flex-shrink-0 animate-fade-in"
              >
                <div className="flex items-center justify-between">
                  <h4 className={`font-[var(--font-bangers)] text-xs tracking-wider ${isPowersMode ? "text-white" : "text-[#001419]"}`}>
                    CONCEPT ARTS & GALERÍA:
                  </h4>
                  {hasAlts && (
                    <button
                      onClick={() => setShowAlts(!showAlts)}
                      style={{
                        backgroundColor: showAlts ? (isPowersMode ? vibrantAccent : accent) : (isPowersMode ? "#1f2937" : "#f1f5f9"),
                        color: showAlts ? getTextColor(isPowersMode ? vibrantAccent : accent) : (isPowersMode ? "#ffffff" : "#0f172a"),
                        borderColor: showAlts ? (isPowersMode ? vibrantAccent : accent) : "#001419",
                        boxShadow: "2.5px 2.5px 0 #000",
                      }}
                      className="px-2.5 py-0.5 border-2 font-[var(--font-bangers)] text-[10px] tracking-wider uppercase transition-all hover:scale-105 active:scale-95 flex items-center gap-1 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_#000] cursor-pointer"
                    >
                      <span>OLD</span>
                      <span className="text-[8px] opacity-75">({altCount})</span>
                    </button>
                  )}
                </div>
                {visibleConcepts.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {visibleConcepts.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => setLightboxImage(item.path)}
                        style={{
                          borderColor: item.isAlt ? (isPowersMode ? `${vibrantAccent}55` : `${accent}55`) : (isPowersMode ? "rgba(255,255,255,0.1)" : "rgba(10,10,15,0.1)"),
                        }}
                        className="group relative aspect-[3/4] border-2 bg-slate-100 dark:bg-black/40 rounded overflow-hidden cursor-pointer hover:scale-[1.03] transition-all duration-300 animate-fade-in"
                      >
                        {/* Image */}
                        <img
                          src={item.path}
                          alt={item.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        
                        {/* Badge */}
                        {item.isAlt && (
                          <span
                            style={{
                              backgroundColor: vibrantAccent,
                              color: getTextColor(vibrantAccent),
                            }}
                            className="absolute top-1 right-1 text-[7px] sm:text-[8px] font-[var(--font-bangers)] tracking-wide px-1 py-0.5 border border-black shadow-[1px_1px_0_#000]"
                          >
                            ALT
                          </span>
                        )}

                        {/* Gradient Overlay & Name */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                          <span className="font-[var(--font-bangers)] text-[9px] sm:text-[10px] tracking-wider text-white leading-tight uppercase">
                            {item.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={`text-center py-4 border-2 border-dashed rounded ${isPowersMode ? "border-gray-700/50" : "border-gray-300"}`}>
                    <span className={`font-[var(--font-marker)] text-xs uppercase ${isPowersMode ? "text-gray-400" : "text-gray-500"}`}>Sin diseños base</span>
                  </div>
                )}
              </div>
            );
          })()}

          {/* Spacer to push concept arts down naturally */}
          <div className="flex-1" />
        </>
      )}

      <AnimatePresence>
        {lightboxImage && (
          <ImageLightbox
            src={lightboxImage}
            alt="Concept Art"
            onClose={() => setLightboxImage(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

