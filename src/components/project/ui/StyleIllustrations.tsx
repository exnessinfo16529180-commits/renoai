// ─────────────────────────────────────────────────────────────────
// Style Illustrations — SVG room mood compositions
// Each illustration communicates the style through color story
// and spatial arrangement. Designed to be replaced with real
// interior photography by swapping the <img> inside StyleCard.
// ─────────────────────────────────────────────────────────────────

export function ModernRoom() {
  return (
    <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      {/* Room background / walls */}
      <rect width="280" height="180" fill="#EDE9E0"/>
      {/* Floor */}
      <polygon points="0,130 280,130 280,180 0,180" fill="#D4C8B4"/>
      {/* Floor planks */}
      {[0,1,2,3,4].map(i => (
        <line key={i} x1={i*56} y1="130" x2={i*56+20} y2="180" stroke="#C4B8A4" strokeWidth="1" opacity="0.6"/>
      ))}
      {/* Ceiling light bar */}
      <rect x="100" y="12" width="80" height="4" rx="2" fill="#C8C0B4"/>
      {/* Ceiling light glow */}
      <ellipse cx="140" cy="35" rx="60" ry="20" fill="rgba(255,250,240,0.3)"/>
      {/* Back wall art — thin black frame */}
      <rect x="104" y="38" width="72" height="50" rx="1" fill="#F0EBE0" stroke="#2C2C2C" strokeWidth="1.5"/>
      <line x1="140" y1="38" x2="140" y2="88" stroke="#2C2C2C" strokeWidth="0.5" opacity="0.3"/>
      {/* Sofa — low profile modern */}
      <rect x="40" y="100" width="160" height="36" rx="6" fill="#2A2A2A"/>
      <rect x="40" y="100" width="160" height="10" rx="4" fill="#383838"/>
      {/* Cushions */}
      <rect x="54" y="104" width="38" height="22" rx="4" fill="#4A4A4A"/>
      <rect x="98" y="104" width="38" height="22" rx="4" fill="#4A4A4A"/>
      <rect x="142" y="104" width="38" height="22" rx="4" fill="#4A4A4A"/>
      {/* Sofa legs */}
      <rect x="46" y="134" width="5" height="6" rx="1" fill="#1E1E1E"/>
      <rect x="190" y="134" width="5" height="6" rx="1" fill="#1E1E1E"/>
      {/* Coffee table — dark glass */}
      <rect x="90" y="122" width="100" height="8" rx="2" fill="rgba(30,50,60,0.7)" stroke="rgba(100,140,160,0.3)" strokeWidth="0.5"/>
      {/* Table legs */}
      <rect x="96" y="130" width="3" height="10" fill="#1A2530"/>
      <rect x="181" y="130" width="3" height="10" fill="#1A2530"/>
      {/* Floor lamp — arc */}
      <path d="M228 178 L228 80 Q228 50 200 45" stroke="#C4BEB8" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <circle cx="200" cy="45" r="8" fill="#E8E0D0" stroke="#C4BEB8" strokeWidth="1"/>
      {/* Small objects on table */}
      <rect x="118" y="118" width="12" height="4" rx="1" fill="#8B9BA8"/>
      <rect x="150" y="116" width="8" height="6" rx="1" fill="#C4B890"/>
      {/* Accent stripe at bottom */}
      <rect x="0" y="176" width="280" height="4" fill="#6B8CAE" opacity="0.5"/>
    </svg>
  );
}

export function ScandinavianRoom() {
  return (
    <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      {/* Wall */}
      <rect width="280" height="180" fill="#FAF8F4"/>
      {/* Floor — birch planks */}
      <polygon points="0,128 280,128 280,180 0,180" fill="#EAD8C0"/>
      {[0,1,2,3,4,5,6].map(i => (
        <rect key={i} x={i*42-4} y="128" width="40" height="52" fill="none" stroke="#D4C0A0" strokeWidth="0.8"/>
      ))}
      {/* Window — large Nordic style */}
      <rect x="170" y="20" width="90" height="100" rx="2" fill="#E8F4F8" stroke="#C8C0B4" strokeWidth="1.5"/>
      <line x1="215" y1="20" x2="215" y2="120" stroke="#C8C0B4" strokeWidth="1"/>
      <line x1="170" y1="70" x2="260" y2="70" stroke="#C8C0B4" strokeWidth="1"/>
      {/* Window light spill */}
      <polygon points="170,20 260,20 280,0 280,140 260,120 170,120" fill="rgba(232,244,248,0.15)"/>
      {/* Sofa — cream/natural linen */}
      <rect x="20" y="98" width="150" height="38" rx="8" fill="#EDE5D8"/>
      <rect x="20" y="98" width="150" height="12" rx="6" fill="#F5EDE0"/>
      {/* Sofa arm left */}
      <rect x="20" y="98" width="18" height="38" rx="6" fill="#EDE5D8"/>
      {/* Sofa arm right */}
      <rect x="152" y="98" width="18" height="38" rx="6" fill="#EDE5D8"/>
      {/* Cushions — sage + cream */}
      <rect x="44" y="106" width="30" height="20" rx="4" fill="#7A9E7E"/>
      <rect x="80" y="106" width="30" height="20" rx="4" fill="#F0E8DC"/>
      <rect x="116" y="106" width="30" height="20" rx="4" fill="#7A9E7E" opacity="0.7"/>
      {/* Throw blanket */}
      <path d="M20 125 Q50 118 80 125 Q110 132 140 125 L170 130 L170 136 L20 136Z" fill="#D4C0A8" opacity="0.6"/>
      {/* Coffee table — light birch */}
      <rect x="52" y="120" width="96" height="10" rx="3" fill="#D8C8B0" stroke="#C4B09A" strokeWidth="0.8"/>
      <rect x="60" y="130" width="6" height="12" rx="1" fill="#C8B8A0"/>
      <rect x="134" y="130" width="6" height="12" rx="1" fill="#C8B8A0"/>
      {/* Plant */}
      <rect x="8" y="108" width="10" height="20" rx="2" fill="#8B6914"/>
      <ellipse cx="13" cy="104" rx="10" ry="12" fill="#5A8A5A"/>
      <ellipse cx="7" cy="108" rx="7" ry="9" fill="#4A7A4A"/>
      <ellipse cx="19" cy="110" rx="6" ry="8" fill="#6A9A6A"/>
      {/* Small items on table */}
      <circle cx="96" cy="116" r="3" fill="#8B8680"/>
      <rect x="110" y="113" width="14" height="3" rx="1" fill="#C4B090"/>
      {/* Knit texture on wall decoration */}
      <circle cx="78" cy="40" r="20" fill="none" stroke="#E0D0C0" strokeWidth="1.5"/>
      <circle cx="78" cy="40" r="14" fill="none" stroke="#C8B8A8" strokeWidth="1"/>
      {/* Accent stripe */}
      <rect x="0" y="176" width="280" height="4" fill="#7A9E7E" opacity="0.5"/>
    </svg>
  );
}

export function MinimalRoom() {
  return (
    <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      {/* Pure white walls */}
      <rect width="280" height="180" fill="#FAFAFA"/>
      {/* Floor — barely visible line */}
      <line x1="0" y1="138" x2="280" y2="138" stroke="#E8E8E8" strokeWidth="1"/>
      <polygon points="0,138 280,138 280,180 0,180" fill="#F2F0EE"/>
      {/* Single window — full height slot */}
      <rect x="220" y="0" width="40" height="138" fill="#EDF4F8" stroke="#E0E0E0" strokeWidth="0.5"/>
      {/* Minimal chair — Bauhaus style */}
      <rect x="90" y="95" width="50" height="5" rx="1" fill="#1A1A1A"/>
      {/* Chair back */}
      <rect x="115" y="68" width="4" height="30" rx="1" fill="#1A1A1A"/>
      <rect x="90" y="68" width="4" height="30" rx="1" fill="#1A1A1A"/>
      <rect x="90" y="68" width="29" height="4" rx="1" fill="#1A1A1A"/>
      {/* Chair legs */}
      <rect x="90" y="100" width="3" height="18" fill="#1A1A1A"/>
      <rect x="137" y="100" width="3" height="18" fill="#1A1A1A"/>
      {/* Chair seat */}
      <rect x="90" y="88" width="50" height="10" rx="1" fill="#2C2C2C"/>
      {/* Single side table */}
      <rect x="160" y="105" width="36" height="4" rx="1" fill="#E0DDD8"/>
      <rect x="164" y="109" width="3" height="16" fill="#D0CDC8"/>
      <rect x="189" y="109" width="3" height="16" fill="#D0CDC8"/>
      {/* Object on table — single ceramic vase */}
      <ellipse cx="178" cy="104" rx="6" ry="3" fill="#D0CDC8"/>
      <rect x="174" y="90" width="8" height="14" rx="4" fill="#D0CDC8"/>
      {/* Large wall art — single thin line piece */}
      <rect x="50" y="25" width="100" height="70" rx="1" fill="none" stroke="#E0E0E0" strokeWidth="0.8"/>
      <line x1="100" y1="40" x2="100" y2="80" stroke="#D0D0D0" strokeWidth="0.6"/>
      {/* Accent stripe — minimal */}
      <rect x="0" y="177" width="280" height="3" fill="#1A1A1A" opacity="0.06"/>
    </svg>
  );
}

export function LoftRoom() {
  return (
    <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      {/* Dark walls */}
      <rect width="280" height="180" fill="#1A1410"/>
      {/* Exposed brick pattern on back wall */}
      {Array.from({ length: 8 }, (_, row) =>
        Array.from({ length: 12 }, (_, col) => {
          const x = col * 24 + (row % 2 === 0 ? 0 : 12);
          const y = row * 14 + 10;
          return (
            <rect
              key={`${row}-${col}`}
              x={x}
              y={y}
              width="22"
              height="12"
              rx="0.5"
              fill={row % 3 === 0 ? "#6B3B2A" : row % 3 === 1 ? "#7A4535" : "#5A3020"}
              stroke="#1A1410"
              strokeWidth="1"
            />
          );
        })
      )}
      {/* Dark overlay on brick */}
      <rect x="0" y="0" width="280" height="120" fill="rgba(15,10,8,0.55)"/>
      {/* Concrete floor */}
      <polygon points="0,122 280,122 280,180 0,180" fill="#2A2520"/>
      {/* Floor texture lines */}
      {[0,1,2,3].map(i => (
        <line key={i} x1="0" y1={130+i*12} x2="280" y2={130+i*12} stroke="rgba(60,50,40,0.5)" strokeWidth="0.8"/>
      ))}
      {/* Industrial shelf — black metal */}
      <rect x="0" y="42" width="80" height="4" rx="0" fill="#2A2520" stroke="#3A3530" strokeWidth="0.5"/>
      <rect x="8" y="42" width="3" height="20" fill="#2A2520"/>
      <rect x="60" y="42" width="3" height="20" fill="#2A2520"/>
      {/* Items on shelf */}
      <rect x="14" y="30" width="8" height="12" rx="1" fill="#3A3020"/>
      <rect x="25" y="33" width="6" height="9" rx="1" fill="#4A3A28"/>
      <rect x="34" y="28" width="10" height="14" rx="1" fill="#2A2018"/>
      {/* Dark leather sofa */}
      <rect x="30" y="100" width="170" height="30" rx="6" fill="#1A1510"/>
      <rect x="30" y="100" width="170" height="10" rx="5" fill="#252015"/>
      {/* Sofa arms */}
      <rect x="30" y="100" width="16" height="30" rx="5" fill="#1A1510"/>
      <rect x="184" y="100" width="16" height="30" rx="5" fill="#1A1510"/>
      {/* Cushions — dark leather */}
      <rect x="52" y="107" width="36" height="16" rx="3" fill="#201A14"/>
      <rect x="94" y="107" width="36" height="16" rx="3" fill="#201A14"/>
      <rect x="136" y="107" width="36" height="16" rx="3" fill="#201A14"/>
      {/* Metal coffee table */}
      <rect x="78" y="116" width="94" height="5" rx="0" fill="#2E2E2E" stroke="#3E3E3E" strokeWidth="0.5"/>
      <rect x="84" y="121" width="4" height="14" fill="#282828"/>
      <rect x="162" y="121" width="4" height="14" fill="#282828"/>
      {/* Edison bulb hanging light */}
      <line x1="140" y1="0" x2="140" y2="38" stroke="#3A3028" strokeWidth="1.5"/>
      <ellipse cx="140" cy="42" rx="10" ry="7" fill="#3A2A10" stroke="#5A4020" strokeWidth="0.8"/>
      <ellipse cx="140" cy="42" rx="5" ry="3" fill="#FFB830" opacity="0.6"/>
      {/* Edison bulb glow */}
      <radialGradient id="edisonGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFB830" stopOpacity="0.25"/>
        <stop offset="100%" stopColor="#FFB830" stopOpacity="0"/>
      </radialGradient>
      <ellipse cx="140" cy="55" rx="50" ry="30" fill="url(#edisonGlow)"/>
      {/* Pipes on ceiling */}
      <line x1="0" y1="5" x2="280" y2="5" stroke="#2E2E2E" strokeWidth="5" strokeLinecap="round"/>
      <line x1="0" y1="5" x2="280" y2="5" stroke="#252520" strokeWidth="3"/>
      {/* Accent stripe */}
      <rect x="0" y="176" width="280" height="4" fill="#D4845A" opacity="0.6"/>
    </svg>
  );
}

export function NeoclassicRoom() {
  return (
    <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      {/* Warm cream walls */}
      <rect width="280" height="180" fill="#F5F0E8"/>
      {/* Crown molding */}
      <rect x="0" y="0" width="280" height="8" fill="#EDE8DC"/>
      <rect x="0" y="7" width="280" height="2" fill="#D8D0C4"/>
      {/* Floor — herringbone pattern suggestion */}
      <polygon points="0,132 280,132 280,180 0,180" fill="#DDD0BC"/>
      {[0,1,2,3,4].map(i => (
        <g key={i}>
          <line x1={i*56} y1="132" x2={i*56+28} y2="180" stroke="#C8B8A4" strokeWidth="0.8" opacity="0.7"/>
          <line x1={i*56+28} y1="132" x2={i*56} y2="180" stroke="#C8B8A4" strokeWidth="0.8" opacity="0.7"/>
        </g>
      ))}
      {/* Arch frame on back wall */}
      <path d="M80 130 L80 55 Q80 22 140 22 Q200 22 200 55 L200 130 Z" fill="none" stroke="#C4B5A0" strokeWidth="2"/>
      <path d="M86 130 L86 57 Q86 30 140 30 Q194 30 194 57 L194 130 Z" fill="rgba(232,220,200,0.3)" stroke="#D0C0A8" strokeWidth="0.8"/>
      {/* Classic sofa — curved back */}
      <path d="M25 130 Q25 95 55 92 L225 92 Q255 95 255 130 Z" fill="#D4C4A8"/>
      <path d="M25 105 Q25 92 55 90 L225 90 Q255 92 255 105 Z" fill="#E0D0B8"/>
      {/* Sofa curved arms */}
      <path d="M25 90 Q20 90 18 100 Q18 120 25 130 L40 130 L40 90 Z" fill="#C8B898"/>
      <path d="M255 90 Q260 90 262 100 Q262 120 255 130 L240 130 L240 90 Z" fill="#C8B898"/>
      {/* Cushions — silk-look */}
      <rect x="52" y="98" width="40" height="22" rx="6" fill="#B8A888"/>
      <rect x="100" y="98" width="40" height="22" rx="6" fill="#C4B898"/>
      <rect x="148" y="98" width="40" height="22" rx="6" fill="#B8A888"/>
      {/* Sofa legs — carved */}
      <path d="M40 130 Q38 136 40 142 L44 142 Q46 136 44 130 Z" fill="#A89070"/>
      <path d="M236 130 Q234 136 236 142 L240 142 Q242 136 240 130 Z" fill="#A89070"/>
      {/* Pendant chandelier */}
      <line x1="140" y1="8" x2="140" y2="28" stroke="#C8A87A" strokeWidth="1.5"/>
      <ellipse cx="140" cy="31" rx="18" ry="5" fill="none" stroke="#C8A87A" strokeWidth="1.2"/>
      {[0,1,2,3,4,5].map(i => {
        const angle = (i * Math.PI * 2) / 6;
        const x = 140 + Math.cos(angle) * 15;
        const y = 31 + Math.sin(angle) * 4;
        return <circle key={i} cx={x} cy={y} r="2" fill="#C8A87A"/>;
      })}
      <ellipse cx="140" cy="35" rx="8" ry="3" fill="#FFD88080" opacity="0.5"/>
      {/* Side table */}
      <rect x="230" y="110" width="30" height="5" rx="1" fill="#C0A880" stroke="#B09878" strokeWidth="0.5"/>
      <path d="M234 115 Q232 125 234 132 L238 132 Q240 125 238 115 Z" fill="#B09878"/>
      <path d="M256 115 Q258 125 256 132 L252 132 Q250 125 252 115 Z" fill="#B09878"/>
      {/* Vase on table */}
      <rect x="240" y="100" width="10" height="10" rx="5" fill="#C4B090"/>
      <rect x="243" y="95" width="4" height="5" rx="2" fill="#C4B090"/>
      {/* Accent stripe */}
      <rect x="0" y="176" width="280" height="4" fill="#C8A96E" opacity="0.5"/>
    </svg>
  );
}

export function LuxuryRoom() {
  return (
    <svg viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      {/* Deep navy background */}
      <rect width="280" height="180" fill="#08081A"/>
      {/* Subtle wall texture gradient */}
      <rect x="0" y="0" width="280" height="180" fill="url(#luxWall)"/>
      <defs>
        <radialGradient id="luxWall" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#12123A" stopOpacity="1"/>
          <stop offset="100%" stopColor="#05050F" stopOpacity="1"/>
        </radialGradient>
        <linearGradient id="marbleFloor" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0EEE8"/>
          <stop offset="40%" stopColor="#E0D8D0"/>
          <stop offset="60%" stopColor="#F0EEE8"/>
          <stop offset="100%" stopColor="#D8D0C8"/>
        </linearGradient>
      </defs>
      {/* Marble floor */}
      <polygon points="0,128 280,128 280,180 0,180" fill="url(#marbleFloor)"/>
      {/* Marble veining */}
      <path d="M20 135 Q80 128 120 140 Q160 150 220 132 Q250 125 280 138" stroke="rgba(200,190,180,0.5)" strokeWidth="0.8" fill="none"/>
      <path d="M0 155 Q60 148 100 160 Q150 168 200 152 Q240 142 280 158" stroke="rgba(200,190,180,0.4)" strokeWidth="0.6" fill="none"/>
      {/* Gold panel molding on walls */}
      <rect x="10" y="10" width="260" height="115" rx="2" fill="none" stroke="#C8A84B" strokeWidth="0.8" opacity="0.4"/>
      <rect x="16" y="16" width="248" height="103" rx="1" fill="none" stroke="#C8A84B" strokeWidth="0.4" opacity="0.25"/>
      {/* Tall drape curtains */}
      <path d="M0 0 Q15 50 8 128 L0 128 Z" fill="#1A1830" stroke="#2A2840" strokeWidth="0.5"/>
      <path d="M280 0 Q265 50 272 128 L280 128 Z" fill="#1A1830" stroke="#2A2840" strokeWidth="0.5"/>
      {/* Curtain sheen */}
      <path d="M4 0 Q12 50 6 128" stroke="rgba(200,180,240,0.1)" strokeWidth="2" fill="none"/>
      <path d="M276 0 Q268 50 274 128" stroke="rgba(200,180,240,0.1)" strokeWidth="2" fill="none"/>
      {/* Ornate mirror */}
      <ellipse cx="140" cy="55" rx="36" ry="40" fill="#0C0C22" stroke="#C8A84B" strokeWidth="1.5"/>
      <ellipse cx="140" cy="55" rx="30" ry="34" fill="#0A0A1E" stroke="#C8A84B" strokeWidth="0.5" opacity="0.5"/>
      {/* Mirror reflection shimmer */}
      <ellipse cx="130" cy="45" rx="8" ry="12" fill="rgba(200,170,100,0.06)"/>
      {/* Plush dark sofa */}
      <rect x="24" y="102" width="186" height="32" rx="8" fill="#10102A"/>
      <rect x="24" y="102" width="186" height="12" rx="6" fill="#14143A"/>
      {/* Sofa arms */}
      <rect x="24" y="102" width="18" height="32" rx="7" fill="#10102A"/>
      <rect x="192" y="102" width="18" height="32" rx="7" fill="#10102A"/>
      {/* Silk cushions */}
      <rect x="48" y="110" width="36" height="16" rx="5" fill="#1E1E44"/>
      <rect x="90" y="110" width="36" height="16" rx="5" fill="#C8A84B" opacity="0.3"/>
      <rect x="132" y="110" width="36" height="16" rx="5" fill="#1E1E44"/>
      {/* Gold cushion trim lines */}
      <rect x="48" y="110" width="36" height="16" rx="5" fill="none" stroke="#C8A84B" strokeWidth="0.5" opacity="0.5"/>
      <rect x="132" y="110" width="36" height="16" rx="5" fill="none" stroke="#C8A84B" strokeWidth="0.5" opacity="0.5"/>
      {/* Gold coffee table */}
      <rect x="78" y="116" width="98" height="6" rx="1" fill="#C8A84B" opacity="0.7"/>
      <rect x="84" y="122" width="4" height="14" fill="#A88830"/>
      <rect x="166" y="122" width="4" height="14" fill="#A88830"/>
      {/* Chandelier */}
      <line x1="140" y1="0" x2="140" y2="20" stroke="#C8A84B" strokeWidth="1"/>
      <ellipse cx="140" cy="22" rx="22" ry="5" fill="none" stroke="#C8A84B" strokeWidth="1.2"/>
      {[0,1,2,3,4,5,6,7].map(i => {
        const a = (i * Math.PI * 2) / 8;
        const x = 140 + Math.cos(a) * 18;
        const y = 22 + Math.sin(a) * 4;
        return <line key={i} x1={x} y1={y} x2={x} y2={y+8} stroke="#C8A84B" strokeWidth="0.8"/>;
      })}
      {/* Chandelier glow */}
      <radialGradient id="chandGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFD060" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#FFD060" stopOpacity="0"/>
      </radialGradient>
      <ellipse cx="140" cy="40" rx="70" ry="35" fill="url(#chandGlow)"/>
      {/* Accent stripe */}
      <rect x="0" y="176" width="280" height="4" fill="#C8A84B" opacity="0.7"/>
    </svg>
  );
}
