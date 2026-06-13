"use client";

import React from "react";
import { Zap, ZapOff } from "lucide-react";

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
  return yiq >= 140 ? "#0a0a0f" : "white";
}

function getVibrantColor(hexColor: string) {
  if (!hexColor) return "#f5e642";
  const c = hexColor.toLowerCase();
  if (c === "#0d3a2b") return "#10b981"; // Ian: emerald green
  if (c === "#0a1128") return "#3b82f6"; // Julián: vibrant blue
  if (c === "#4c1d95") return "#a855f7"; // Mati: vibrant purple
  if (c === "#b91c1c") return "#ef4444"; // Uandi: vibrant red
  return hexColor;
}

function getDarkBgColor(hexColor: string) {
  if (!hexColor) return "#0f172a";
  const c = hexColor.toLowerCase();
  if (c === "#0d3a2b") return "#061410";
  if (c === "#f5e642") return "#121203";
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
  const isPibe =
    char.category === "pibes" ||
    ["ian", "jaz", "julian", "mati", "uandi", "volvo", "sofi"].includes(char.id);

  const isLocked = char.incognito && !unlockAll;
  const accent = isLocked ? "#6b7280" : char.color;
  const vibrantAccent = getVibrantColor(accent);
  const darkBg = getDarkBgColor(accent);

  const isArchorLocked = selectedImageId === "archor" && !unlockAll;
  const stats = isArchorLocked
    ? char.stats
    : isPowersMode
    ? char.powers?.stats
    : char.stats;

  const activeVariantData =
    isPowersMode && selectedImageId !== "default" && selectedImageId !== "ficha"
      ? char.powers?.variantData?.[selectedImageId]
      : null;

  const variantContent = {
    habilidades: isArchorLocked
      ? [
          "Contenido Clasificado: Este registro contiene información sobre la fase final clasificada del multiverso.",
          "Clasificado: Acceso restringido por la Iniciativa Vesperwing.",
          "???",
        ]
      : activeVariantData?.habilidades ?? char.powers?.habilidades,
    significa: isArchorLocked
      ? "Información encriptada para evitar paradojas temporales. El destino final de Ian permanece oculto."
      : activeVariantData?.significa ?? char.powers?.significa,
    crisis: isArchorLocked
      ? "Alerta de Spoiler: Los datos tácticos han sido bloqueados voluntariamente."
      : activeVariantData?.crisis ?? char.powers?.crisis,
    variantLabel: isArchorLocked ? "???" : activeVariantData?.label ?? null,
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
        color: isPowersMode ? "#f8fafc" : "#0a0a0f",
      }}
      className="flex-1 flex flex-col p-5 sm:p-8 gap-4 sm:gap-6 overflow-y-auto transition-colors duration-400"
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
          <p className="font-[var(--font-marker)] text-base text-[#e8185a] uppercase tracking-wider">Próximamente</p>
          <p className="font-sans text-sm text-gray-500 max-w-xs leading-snug">
            {char.hint ?? "Seguí leyendo para desbloquear este personaje."}
          </p>
        </div>
      ) : (
        <>
          {/* ── name + role tag ── */}
          <div className="flex flex-col gap-1 pr-8 flex-shrink-0">
            <span
              className="tag text-[10px] font-[var(--font-bangers)] tracking-wider px-2 py-0.5 border-2 border-black self-start"
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
              className="font-[var(--font-bangers)] text-4xl sm:text-5xl leading-none tracking-widest flex flex-wrap items-baseline gap-x-2"
              style={{ textShadow: isPowersMode ? `2px 2px 0 ${darkBg}, 4px 4px 0 ${vibrantAccent}` : `2px 2px 0 ${accent}` }}
            >
              <span>{char.name.toUpperCase()}</span>
              {isPibe && isPowersMode && char.powers?.role && (
                <span
                  style={{ color: vibrantAccent }}
                  className="text-xl sm:text-2xl font-[var(--font-marker)] tracking-normal normal-case block sm:inline"
                >
                  {variantContent.variantLabel
                    ? variantContent.variantLabel.toUpperCase()
                    : `AKA: ${char.powers.role.split(" / ")[0].toUpperCase()}`}
                </span>
              )}
            </h2>
          </div>

          {/* ── profile / habilidades ── */}
          <div
            style={{ borderColor: isPowersMode ? `${vibrantAccent}33` : "#0a0a0f" }}
            className="border-t-2 pt-2 flex flex-col gap-1 flex-shrink-0"
          >
            <h4 className="font-[var(--font-bangers)] text-xs tracking-wider">
              {isPowersMode ? "HABILIDADES:" : "PERFIL:"}
            </h4>
            <ul className="font-sans text-xs leading-relaxed flex flex-col gap-1 pl-3 list-disc list-outside">
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
              style={{ borderColor: "#0a0a0f" }}
            >
              <h4 className="font-[var(--font-bangers)] text-xs tracking-wider">HABILIDADES ESPECIALES:</h4>
              <ul className="font-sans text-xs leading-relaxed flex flex-col gap-1 pl-3 list-disc list-outside">
                {char.powers.habilidades.map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* ── significa banner ── */}
          {((isPowersMode && variantContent.significa) || (!isPibe && char.powers?.significa)) && (
            <div
              className="p-3 border-2 relative bg-[#13131e] mt-2 mb-1 flex-shrink-0"
              style={{
                borderColor: isPowersMode ? vibrantAccent : accent,
                boxShadow: isPowersMode ? `3px 3px 0 ${vibrantAccent}` : `3px 3px 0 ${accent}`,
              }}
            >
              <span
                className="font-[var(--font-marker)] text-[10px] uppercase absolute -top-3 left-3 rotate-[-1deg] border border-[#0a0a0f] px-2 py-0.5"
                style={{
                  backgroundColor: isPowersMode ? vibrantAccent : accent,
                  color: getTextColor(isPowersMode ? vibrantAccent : accent),
                }}
              >
                {isPowersMode && variantContent.variantLabel ? variantContent.variantLabel.toUpperCase() : "SIGNIFICA:"}
              </span>
              <p className="font-sans text-[11px] leading-snug text-white mt-1">
                {isPowersMode ? variantContent.significa : char.powers?.significa}
              </p>
            </div>
          )}

          {/* ── crisis ── */}
          <div
            className="border-2 p-3 relative overflow-hidden flex flex-col gap-1.5 flex-shrink-0 transition-all duration-300"
            style={{
              backgroundColor: isPowersMode ? "#111827" : "#fffbeb",
              borderColor: isPowersMode ? vibrantAccent : "#0a0a0f",
              boxShadow: isPowersMode ? `3px 3px 0 ${vibrantAccent}` : "3px 3px 0 #000",
            }}
          >
            <div
              className="self-start font-[var(--font-bangers)] text-[11px] tracking-wider px-2 py-0.5 border-2 uppercase"
              style={{
                backgroundColor: isPowersMode ? vibrantAccent : "#e8185a",
                color: isPowersMode ? getTextColor(vibrantAccent) : "white",
                borderColor: isPowersMode ? vibrantAccent : "#0a0a0f",
              }}
            >
              {isPowersMode ? "Ficha Táctica" : "En Crisis"}
            </div>
            <p className="font-sans text-xs sm:text-sm leading-snug">
              {isPowersMode ? variantContent.crisis : char.powers?.crisis || char.crisis}
            </p>
          </div>

          {/* ── stats ── */}
          <div
            style={{ borderColor: isPowersMode ? `${vibrantAccent}33` : "#f1f5f9" }}
            className="border-t pt-2 flex flex-col gap-1.5 flex-shrink-0"
          >
            <h4 className="font-[var(--font-bangers)] text-xs tracking-wider">
              {isLocation ? "MÉTRICAS:" : isPowersMode ? "MÉTRICAS:" : "STATS:"}
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
              {statRows.map((s, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="w-14 text-[9px] font-[var(--font-bangers)] uppercase tracking-wider truncate shrink-0">
                    {s.name}
                  </span>
                  <div className="flex-1 h-2.5 bg-gray-200 border border-black overflow-hidden flex">
                    {Array.from({ length: 10 }).map((_, idx) => (
                      <div
                        key={idx}
                        className="h-full flex-1 border-r border-black last:border-0 transition-all duration-400"
                        style={{ backgroundColor: idx < s.val ? (isPowersMode ? vibrantAccent : accent) : "transparent" }}
                      />
                    ))}
                  </div>
                  <span className="font-[var(--font-bangers)] text-[9px] w-6 text-right shrink-0">{s.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Detalles toggle button (only for Pibes) ── */}
          {isPibe && (
            <div className="pt-2 mt-auto pb-2 sm:pb-0 flex-shrink-0">
              <button
                onClick={handlePowersModeToggle}
                style={{
                  backgroundColor: isPowersMode ? darkBg : accent,
                  color: isPowersMode ? vibrantAccent : getTextColor(accent),
                  borderColor: isPowersMode ? vibrantAccent : "#0a0a0f",
                  boxShadow: isPowersMode ? `3px 3px 0 ${vibrantAccent}` : "3px 3px 0 #000",
                }}
                className="w-full py-3 sm:py-2 border-3 font-[var(--font-bangers)] text-sm sm:text-base tracking-wider uppercase active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_#000] transition-all flex items-center justify-center gap-2 hover:brightness-105 active:brightness-95"
              >
                {isPowersMode ? (
                  <>
                    <ZapOff className="w-5 h-5 shrink-0" />
                    <span>VISTA GENERAL</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 shrink-0 fill-current" />
                    <span>DETALLES</span>
                  </>
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
