"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StepWrapper from "@/components/project/ui/StepWrapper";
import { useProjectStore } from "@/lib/project-store";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function StepUpload() {
  const { uploadedFile, update, setStep } = useProjectStore();
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      update({
        uploadedFile: { name: file.name, type: file.type, size: file.size },
      });
    },
    [update]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const clear = () => update({ uploadedFile: null });

  return (
    <StepWrapper
      title="Загрузите планировку"
      subtitle="Фото комнаты, план квартиры или PDF — подойдёт любой формат"
      cta={
        uploadedFile
          ? { label: "Продолжить", onClick: () => setStep(4) }
          : null
      }
      secondary={
        uploadedFile
          ? { label: "Пропустить этот шаг", onClick: () => setStep(4) }
          : undefined
      }
    >
      <AnimatePresence mode="wait">
        {!uploadedFile ? (
          <motion.div
            key="upload-zone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Drop zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              onClick={() => inputRef.current?.click()}
              style={{
                borderRadius: 20,
                border: dragging
                  ? "1.5px dashed rgba(200,155,60,0.8)"
                  : "1.5px dashed rgba(30,74,62,0.6)",
                background: dragging
                  ? "rgba(200,155,60,0.05)"
                  : "rgba(13,36,32,0.4)",
                padding: "48px 24px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
                cursor: "pointer",
                transition: "all 0.2s ease",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <motion.div
                animate={dragging ? { scale: 1.1 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 16,
                  background: dragging
                    ? "rgba(200,155,60,0.15)"
                    : "rgba(30,74,62,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path
                    d="M14 18V8M14 8L10 12M14 8L18 12"
                    stroke={dragging ? "#C89B3C" : "#9BA8A3"}
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 20h16"
                    stroke={dragging ? "#C89B3C" : "#9BA8A3"}
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.div>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: 15, fontWeight: 600, color: "#C8D4CF", margin: 0 }}>
                  {dragging ? "Отпустите файл" : "Нажмите или перетащите файл"}
                </p>
                <p style={{ fontSize: 13, color: "#9BA8A3", margin: "4px 0 0" }}>
                  PNG, JPG, PDF — до 50 МБ
                </p>
              </div>
            </div>

            <input
              ref={inputRef}
              type="file"
              accept="image/*,.pdf"
              style={{ display: "none" }}
              onChange={onInputChange}
            />

            {/* Mobile-friendly buttons */}
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button
                onClick={() => {
                  if (inputRef.current) {
                    inputRef.current.accept = "image/*";
                    inputRef.current.capture = "environment";
                    inputRef.current.click();
                  }
                }}
                style={mobileBtn}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M15 4.5H3A1.5 1.5 0 001.5 6v8A1.5 1.5 0 003 15.5h12a1.5 1.5 0 001.5-1.5V6A1.5 1.5 0 0015 4.5z" stroke="#9BA8A3" strokeWidth="1.3"/>
                  <circle cx="9" cy="10" r="2.2" stroke="#9BA8A3" strokeWidth="1.3"/>
                  <path d="M6.5 4.5L7.5 3h3l1 1.5" stroke="#9BA8A3" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Камера
              </button>
              <button onClick={() => inputRef.current?.click()} style={mobileBtn}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="2" y="2" width="6" height="6" rx="1" stroke="#9BA8A3" strokeWidth="1.3"/>
                  <rect x="10" y="2" width="6" height="6" rx="1" stroke="#9BA8A3" strokeWidth="1.3"/>
                  <rect x="2" y="10" width="6" height="6" rx="1" stroke="#9BA8A3" strokeWidth="1.3"/>
                  <rect x="10" y="10" width="6" height="6" rx="1" stroke="#9BA8A3" strokeWidth="1.3"/>
                </svg>
                Галерея
              </button>
              <button
                onClick={() => {
                  if (inputRef.current) {
                    inputRef.current.accept = ".pdf";
                    inputRef.current.click();
                  }
                }}
                style={mobileBtn}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M10 2H4a1 1 0 00-1 1v12a1 1 0 001 1h10a1 1 0 001-1V6l-5-4z" stroke="#9BA8A3" strokeWidth="1.3"/>
                  <path d="M10 2v4h4" stroke="#9BA8A3" strokeWidth="1.3" strokeLinecap="round"/>
                  <path d="M6 10h6M6 13h4" stroke="#9BA8A3" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                PDF
              </button>
            </div>

            {/* Skip option */}
            <button
              onClick={() => setStep(4)}
              style={{
                marginTop: 20,
                width: "100%",
                background: "transparent",
                border: "none",
                fontSize: 13,
                color: "#9BA8A3",
                cursor: "pointer",
                textDecoration: "underline",
                textDecorationColor: "rgba(155,168,163,0.4)",
                padding: "8px 0",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              Пропустить — продолжить без файла
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="file-preview"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.28 }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "18px 20px",
                borderRadius: 18,
                background: "rgba(45,143,90,0.08)",
                border: "1.5px solid rgba(45,143,90,0.35)",
              }}
            >
              {/* File icon */}
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: "rgba(45,143,90,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path
                    d="M4 4C4 3.45 4.45 3 5 3h8.5L18 7.5V19c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1V4z"
                    stroke="#2D8F5A"
                    strokeWidth="1.4"
                  />
                  <path d="M13 3v4.5H18" stroke="#2D8F5A" strokeWidth="1.4" strokeLinecap="round"/>
                  <path d="M7 13.5L9.5 16L15 10.5" stroke="#2D8F5A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <div style={{ flex: 1, overflow: "hidden" }}>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#F5F7F6",
                    margin: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {uploadedFile.name}
                </p>
                <p style={{ fontSize: 12, color: "#9BA8A3", margin: "3px 0 0" }}>
                  {formatBytes(uploadedFile.size)}
                </p>
              </div>

              {/* Remove */}
              <button
                onClick={clear}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: "rgba(30,74,62,0.3)",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  flexShrink: 0,
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 2L12 12M12 2L2 12" stroke="#9BA8A3" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <p
              style={{
                fontSize: 13,
                color: "#2D8F5A",
                textAlign: "center",
                marginTop: 14,
              }}
            >
              Файл загружен. Готовы к анализу!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </StepWrapper>
  );
}

const mobileBtn: React.CSSProperties = {
  flex: 1,
  height: 44,
  borderRadius: 12,
  border: "1px solid rgba(30,74,62,0.4)",
  background: "rgba(13,36,32,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
  fontSize: 13,
  color: "#9BA8A3",
  cursor: "pointer",
  WebkitTapHighlightColor: "transparent",
};
