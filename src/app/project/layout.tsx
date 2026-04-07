export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "#081512",
        minHeight: "100dvh",
        color: "#F5F7F6",
        fontFamily:
          "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {children}
    </div>
  );
}
