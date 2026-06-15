"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type ModalField = {
  key: string;
  label: string;
  type?: "text" | "number" | "color";
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
};

interface EditorPromptModalProps {
  isOpen: boolean;
  title: string;
  fields: ModalField[];
  onSubmit: (values: Record<string, string>) => void;
  onCancel: () => void;
}

export function EditorPromptModal({ isOpen, title, fields, onSubmit, onCancel }: EditorPromptModalProps) {
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      const initial: Record<string, string> = {};
      fields.forEach(f => {
        initial[f.key] = f.defaultValue || "";
      });
      setValues(initial);
    }
  }, [isOpen, fields]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="bg-white border-4 border-[#0a0a0f] shadow-[8px_8px_0_#0a0a0f] max-w-md w-full p-6 flex flex-col gap-4"
          >
            <div className="flex justify-between items-center border-b-2 border-[#0a0a0f] pb-2">
              <h2 className="font-[var(--font-bangers)] text-2xl text-[#0a0a0f] tracking-wide">
                {title}
              </h2>
              <button type="button" onClick={onCancel} className="font-bold text-xl hover:text-rose-500 transition-colors">×</button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {fields.map((f) => (
                <div key={f.key} className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-zinc-700">{f.label}</label>
                  {f.type === "color" ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        required={f.required}
                        value={values[f.key] || "#0a0a0f"}
                        onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                        className="w-10 h-10 p-0 border-2 border-[#0a0a0f] cursor-pointer"
                      />
                      <input
                        type="text"
                        required={f.required}
                        value={values[f.key] || "#0a0a0f"}
                        onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                        className="flex-1 border-2 border-[#0a0a0f] p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e8185a] uppercase font-mono"
                      />
                    </div>
                  ) : (
                    <input
                      type={f.type || "text"}
                      required={f.required}
                      placeholder={f.placeholder}
                      value={values[f.key] || ""}
                      onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                      className="border-2 border-[#0a0a0f] p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e8185a]"
                      autoFocus={fields[0].key === f.key}
                    />
                  )}
                </div>
              ))}
              
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={onCancel}
                  className="flex-1 bg-zinc-200 text-[#0a0a0f] font-[var(--font-bangers)] text-xl py-2 px-4 border-2 border-[#0a0a0f] shadow-[3px_3px_0_#0a0a0f] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_#0a0a0f] transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#e8185a] text-white font-[var(--font-bangers)] text-xl py-2 px-4 border-2 border-[#0a0a0f] shadow-[3px_3px_0_#0a0a0f] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_#0a0a0f] transition-all"
                >
                  Aceptar
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
