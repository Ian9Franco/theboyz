"use client";

import React from "react";
import { motion } from "framer-motion";

interface StatRow {
  name: string;
  val: number;
}

interface RadarChartProps {
  stats: StatRow[];
  color: string;
  isDark?: boolean;
  size?: number;
}

export function RadarChart({ stats, color, isDark = true, size = 260 }: RadarChartProps) {
  const center = size / 2;
  const maxVal = 10;
  const r = size * 0.327; // max radius scaled proportionally (~85/260)
  const N = stats.length;

  if (N < 3) return null; // A radar chart needs at least 3 axes

  // Calculate coordinates for the axes and values
  const points = stats.map((stat, i) => {
    const angle = (i * 2 * Math.PI) / N - Math.PI / 2;
    const valueRatio = Math.max(0.1, Math.min(1.0, stat.val / maxVal)); // Min 10% value to keep shape visible
    const x = center + r * valueRatio * Math.cos(angle);
    const y = center + r * valueRatio * Math.sin(angle);
    const axisX = center + r * Math.cos(angle);
    const axisY = center + r * Math.sin(angle);
    
    // Position label slightly further out
    const labelDistance = r * 0.26; // ~22px at 260, scales down at 180
    const labelX = center + (r + labelDistance) * Math.cos(angle);
    const labelY = center + (r + labelDistance) * Math.sin(angle);

    return {
      name: stat.name,
      val: stat.val,
      x,
      y,
      axisX,
      axisY,
      labelX,
      labelY,
      angle,
    };
  });

  // Background concentric polygons (grid levels at 25%, 50%, 75%, 100%)
  const concentricLevels = [0.25, 0.5, 0.75, 1.0];
  const gridPolygons = concentricLevels.map((level) => {
    return points.map((p, i) => {
      const angle = (i * 2 * Math.PI) / N - Math.PI / 2;
      const x = center + r * level * Math.cos(angle);
      const y = center + r * level * Math.sin(angle);
      return `${x},${y}`;
    }).join(" ");
  });

  // Core stats polygon points path
  const polygonPointsPath = points.map(p => `${p.x},${p.y}`).join(" ");

  // Mode-based styles
  const gridStrokeColor = isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(10, 10, 15, 0.15)";
  const axisStrokeColor = isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(10, 10, 15, 0.12)";
  const mainLabelColor = isDark ? "fill-white" : "fill-[#0a0a0f]";
  const valueLabelColor = isDark ? "fill-gray-400" : "fill-zinc-500";
  const labelShadow = isDark ? "1px 1px 0 #000" : "none";

  return (
    <div className="flex flex-col items-center justify-center p-3 bg-transparent select-none w-full max-w-[300px] mx-auto relative">
      {/* Halftone / scanline background - only in dark mode */}
      {isDark && (
        <div 
          className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-25"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1.2px, transparent 1.2px)",
            backgroundSize: "8px 8px",
          }}
        />
      )}
      
      <svg width={size} height={size} className="overflow-visible relative z-10">
        {/* Concentric grid lines */}
        {gridPolygons.map((poly, idx) => (
          <polygon
            key={idx}
            points={poly}
            fill="none"
            stroke={gridStrokeColor}
            strokeWidth="1.2"
            strokeDasharray={idx === 3 ? "none" : "2,3"}
          />
        ))}

        {/* Axis line spikes */}
        {points.map((p, idx) => (
          <line
            key={idx}
            x1={center}
            y1={center}
            x2={p.axisX}
            y2={p.axisY}
            stroke={axisStrokeColor}
            strokeWidth="1"
          />
        ))}

        {/* The active data polygon */}
        <motion.polygon
          points={polygonPointsPath}
          fill={`${color}2d`}
          stroke={color}
          strokeWidth="2.5"
          initial={{ opacity: 0, scale: 0.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 14 }}
          style={{ filter: `drop-shadow(0 0 6px ${color}55)` }}
        />

        {/* Data vertices and labels */}
        {points.map((p, idx) => (
          <g key={idx}>
            <circle
              cx={p.x}
              cy={p.y}
              r="3.5"
              fill="#ffffff"
              stroke={color}
              strokeWidth="2"
            />
            {/* Axis Label */}
            <text
              x={p.labelX}
              y={p.labelY - 2}
              textAnchor="middle"
              alignmentBaseline="middle"
              className="font-[var(--font-bangers)] text-[9px] tracking-wider"
              style={{ fill: "currentColor", textShadow: labelShadow }}
              fill={isDark ? "#ffffff" : "#0a0a0f"}
            >
              {p.name.toUpperCase()}
            </text>
            {/* Value label */}
            <text
              x={p.labelX}
              y={p.labelY + 6}
              textAnchor="middle"
              alignmentBaseline="middle"
              className={`font-sans text-[8px] font-bold ${isDark ? "fill-gray-400" : "fill-zinc-500"}`}
            >
              {p.val}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
