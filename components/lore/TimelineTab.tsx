"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EyeOff, Lock } from "lucide-react";

const TIMELINE_EVENTS = [
  {
    phase: "Fase 1",
    title: "EL SILENCIO DEL DRAGÓN",
    saga: "Piloto: Hush",
    desc: "Tras escapar de un violento colapso cuántico del hotel, Sofi decide aislarse y viaja a Tokio buscando silenciar su abrumadora hipersensibilidad sensorial. Allí encuentra un refugio en el restaurante tradicional de Kenji. Quince días después, Kenji es asesinado por matones de la Yakuza (Clan Kurogane) debido a deudas impagas. Envuelta en una gélida ira, Sofi descuelga las katanas ancestrales de la familia de Kenji y se transforma en 'Hush', purgando a los asesinos en los callejones lluviosos de Tokio y cortando sus manos como advertencia muda.",
    details: "INFORME DE CAUSALIDAD: El nacimiento de 'Hush' ocurre en paralelo al desarrollo de la tecnología Vesperwing de Ian en Brooklyn, marcando el origen de dos justicieros urbanos en extremos opuestos del multiverso.",
    icon: "🐉",
  },
  {
    phase: "Fase 2",
    title: "DISTRITO NULO: EL DESPERTAR",
    saga: "Saga: Distrito Nulo",
    desc: "Meses después de regresar a Brooklyn, las secuelas biológicas de la infección cuántica se manifiestan en Nueva York. Uandi descubre su acumulación de energía cinética tras salvar a Ian de un andamio colapsado, doblando vigas de acero con sus hombros. En paralelo, Julián sufre su primer desfase de estática cian y magenta al ser emboscado por Vanguard en un callejón de Hell's Kitchen. La inestabilidad biológica desencadena una violenta sobrecarga en la base que destruye el living de Dumbo.",
    details: "INFORME DE CAUSALIDAD: Ian logra estabilizar a Uandi inyectando energía residual del Universo 5458 en su pecho, pero la reacción cuántica genera un clon de estática glitch independiente que deambula en las sombras del taller.",
    icon: "🏙️",
  },
  {
    phase: "Fase 3",
    title: "FUEGO PÚRPURA: LA EXPOSICIÓN",
    saga: "Saga: Fuego Púrpura",
    desc: "Mati oculta el incidente en la terminal de V.O.P.S. tras manifestar filamentos de plasma violeta en sus ojos y herir accidentalmente al Supercamionero. Phobos, una misteriosa silueta cuántica del multiverso, hackea las pantallas gigantes de Times Square exponiendo la mutación de Mati ante el público y Don Vanguard. Esto desata disturbios en la plaza, la detención de Mati y el despliegue militar completo del Comandante R.E.G.U.L.A.R. rodeando la base de Dumbo.",
    details: "INFORME DE CAUSALIDAD: Mientras el asedio táctico rodea la base, Phobos aprovecha la distracción para inyectar una metatoxina verde en Central Park. Gorgon arrasa con el parque y alza una inmensa columna de humo verde con la risa de Phobos.",
    icon: "🔮",
    isLocked: true,
  },
];

interface TimelineTabProps {
  unlockAll?: boolean;
}

export function TimelineTab({ unlockAll = false }: TimelineTabProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isDecrypted, setIsDecrypted] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Initialize authorization state
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuthorized = sessionStorage.getItem("editor_authorized") === "true";
      const isSessionUnlocked = sessionStorage.getItem("timeline_phase_3_unlocked") === "true";
      if (isAuthorized || isSessionUnlocked) {
        setIsDecrypted(true);
      }
    }
  }, []);

  const handleDecrypt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsDecrypted(true);
        if (typeof window !== "undefined") {
          sessionStorage.setItem("timeline_phase_3_unlocked", "true");
        }
      } else {
        setErrorMsg("Firma de clave incorrecta. Acceso Denegado.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Error de conexión cuántica.");
    } finally {
      setLoading(false);
    }
  };

  const currentEvent = TIMELINE_EVENTS[selectedIdx];
  // Phase 3 is locked unless decrypted via editor password
  const isRedacted = currentEvent.isLocked && !isDecrypted;

  // Render variables based on redacted state
  const displayTitle = isRedacted ? "EXPEDIENTES CLASIFICADOS // ENCRIPTADO" : currentEvent.title;
  const displaySaga = isRedacted ? "SAGA POST-DISTRITO NULO" : currentEvent.saga;
  const displayDesc = isRedacted
    ? "ACCESO DENEGADO. El registro narrativo de este evento ha sido bloqueado preventivamente por el Departamento de Spoilers de V.O.P.S. al no estar oficialmente publicado aún. Los detalles confidenciales como la manifestación ocular de Mati (████████), la aparición de Phobos (██████) y el destino final del asedio a la base (████████████) se encuentran cifrados bajo firma cuántica."
    : currentEvent.desc;
  const displayDetails = isRedacted
    ? "CÓDIGO DE ERROR V.O.P.S. 403: Para forzar el descifrado y visualización de esta fase del timeline, ingrese la firma de acceso del editor en la consola inferior."
    : currentEvent.details;

  return (
    <motion.div
      key="timeline"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-8"
    >
      {/* Phase selector */}
      <div className="bg-[#0e0e16] border-4 border-white p-6 shadow-[5px_5px_0_#000] relative">
        <div className="absolute top-[-12px] left-6 bg-[#e8185a] border border-white px-2 py-0.5 text-[9px] font-[var(--font-bangers)] tracking-widest shadow-[2px_2px_0_#000] rotate-[-1deg]">
          CRONOLOGÍA MULTIVERSAL
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
          {TIMELINE_EVENTS.map((event, idx) => {
            const isSelected = selectedIdx === idx;
            const eventLocked = event.isLocked && !isDecrypted;
            return (
              <button
                key={idx}
                onClick={() => setSelectedIdx(idx)}
                style={{
                  backgroundColor: isSelected ? "#f5e642" : "#1a1a25",
                  color: isSelected ? "#0a0a0f" : "#ffffff",
                  boxShadow: isSelected ? "3px 3px 0 #e8185a" : "3px 3px 0 #000",
                  borderColor: isSelected ? "#ffffff" : "rgba(255,255,255,0.1)",
                }}
                className="p-4 border-2 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:scale-105 active:scale-95"
              >
                <span className="text-2xl mb-1">
                  {eventLocked ? "🔒" : event.icon}
                </span>
                <span className="font-[var(--font-bangers)] text-[10px] tracking-widest uppercase opacity-75">
                  {event.phase}
                </span>
                <span className="font-[var(--font-bangers)] text-xs tracking-wider uppercase leading-tight mt-0.5 truncate max-w-full">
                  {eventLocked ? "CLASIFICADO" : event.title.split(":")[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedIdx + "-" + isDecrypted}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
          className={`bg-[#0e0e16] border-2 p-6 sm:p-8 rounded relative shadow-[6px_6px_0_rgba(255,255,255,0.03)] flex flex-col md:flex-row gap-6 items-start transition-colors duration-300 ${
            isRedacted ? "border-rose-500/50 bg-[#160b0e]" : "border-white/10 bg-[#0e0e16]"
          }`}
        >
          <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-2xl sm:text-3xl shrink-0 border-2 ${
            isRedacted
              ? "bg-rose-500/10 border-rose-500 text-rose-500 animate-pulse"
              : "bg-[#f5e642]/10 border-[#f5e642] text-[#f5e642]"
          }`}>
            {isRedacted ? <Lock className="w-6 h-6 sm:w-8 sm:h-8" /> : currentEvent.icon}
          </div>
          <div className="flex-1 w-full">
            <span className={`font-[var(--font-bangers)] text-sm tracking-widest uppercase block ${
              isRedacted ? "text-rose-500" : "text-[#e8185a]"
            }`}>
              {currentEvent.phase} — {displaySaga}
            </span>
            <h3 className={`font-[var(--font-bangers)] text-2xl sm:text-3xl leading-none mt-1 mb-4 tracking-widest uppercase ${
              isRedacted ? "text-rose-400" : "text-[#f5e642]"
            }`}>
              {displayTitle}
            </h3>
            <p className={`font-sans text-sm sm:text-base leading-relaxed mb-4 whitespace-pre-line ${
              isRedacted ? "text-rose-200/60 font-mono text-xs select-none" : "text-gray-200"
            }`}>
              {displayDesc}
            </p>

            {isRedacted ? (
              <div className="p-4 border border-rose-500 bg-rose-950/30 text-rose-300/80 rounded mt-4">
                <strong className="block font-[var(--font-bangers)] text-xs tracking-wider uppercase mb-2 text-rose-400">
                  ⚡ TERMINAL DE DESCIFRADO DE V.O.P.S.
                </strong>
                <p className="font-mono text-xs mb-3 leading-relaxed">
                  Ingrese la contraseña de autorización del editor para descifrar esta firma cuántica temporal:
                </p>
                <form onSubmit={handleDecrypt} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="password"
                    placeholder="Contraseña del Editor..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="flex-1 bg-black/60 border border-rose-500/50 px-3 py-1.5 text-xs text-white font-mono rounded focus:outline-none focus:border-rose-400 placeholder-rose-700/55"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-rose-600 hover:bg-rose-500 text-white font-[var(--font-bangers)] text-xs px-4 py-1.5 border border-white/20 rounded cursor-pointer transition-colors shadow-[2px_2px_0_#000] active:translate-x-0.5 active:translate-y-0.5"
                  >
                    {loading ? "VALIDANDO..." : "DESCIFRAR"}
                  </button>
                </form>
                {errorMsg && (
                  <p className="text-rose-400 font-mono text-[10px] mt-2 animate-pulse">
                    ⚠ {errorMsg}
                  </p>
                )}
              </div>
            ) : (
              <div className="p-4 border-l-4 rounded-r-sm text-xs bg-black/45 border-[#10b981] text-gray-400">
                <strong className="block font-[var(--font-bangers)] text-[10px] tracking-wider uppercase mb-1 text-white">
                  INFORME DE CAUSALIDAD:
                </strong>
                {displayDetails}
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
