"use client";

import { useEffect, useRef } from "react";

type Props = {
  value?: string;
  onChange?: (html: string) => void;
};

export default function Editor({ value, onChange }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  /* ---------- Sync external value ---------- */
  useEffect(() => {
    if (ref.current && typeof value === "string") {
      // Avoid re-setting to prevent cursor jump
      if (ref.current.innerHTML !== value) {
        ref.current.innerHTML = value;
      }
    }
  }, [value]);

  /* ---------- Emit on content change ---------- */
  const emit = () => {
    if (!ref.current) return;
    onChange?.(ref.current.innerHTML);
  };

  /* ---------- Apply formatting ---------- */
  const applyCmd = (cmd: string, arg?: string) => {
    if (!ref.current) return;
    ref.current.focus(); // Focus the editable area so command applies
    document.execCommand(cmd, false, arg);
    emit();
  };

  return (
    <div className="space-y-3">
      {/* ---------- Toolbar ---------- */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-md border border-slate-300 bg-white px-3 py-1 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => applyCmd("bold")}
        >
          Bold
        </button>
        <button
          type="button"
          className="rounded-md border border-slate-300 bg-white px-3 py-1 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => applyCmd("italic")}
        >
          Italic
        </button>
        <button
          type="button"
          className="rounded-md border border-slate-300 bg-white px-3 py-1 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => applyCmd("insertUnorderedList")}
        >
          Bullets
        </button>
        <button
          type="button"
          className="rounded-md border border-slate-300 bg-white px-3 py-1 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => applyCmd("insertOrderedList")}
        >
          Numbers
        </button>
        <button
          type="button"
          className="rounded-md border border-slate-300 bg-white px-3 py-1 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => {
            const url = prompt("Enter URL");
            if (url) applyCmd("createLink", url);
          }}
        >
          Link
        </button>
        <button
          type="button"
          className="rounded-md border border-slate-300 bg-white px-3 py-1 text-sm font-medium text-slate-700 hover:bg-red-50 hover:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={() => applyCmd("removeFormat")}
        >
          Clear
        </button>
      </div>

      {/* ---------- Editable Area ---------- */}
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={emit}
        className="prose max-w-none dark:prose-invert min-h-[200px] rounded-md border border-slate-300 bg-white p-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>  
  );
}
