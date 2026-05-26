// Illustrations symboliques du festival Evala
// Inspirées du document académique : N'Dah N'Dati & Abaï Bafei (2024)

// ─── Deux lutteurs (empoignades) ────────────────────────────────────────────
export function WrestlersDuo({
  className = "",
  opacity = 1,
}: { className?: string; opacity?: number }) {
  return (
    <svg
      viewBox="0 0 320 230"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Sol / poussière */}
      <ellipse cx="160" cy="215" rx="120" ry="10" fill="rgba(139,101,32,0.12)" />

      {/* ── Lutteur gauche (rouge) — penché vers la droite ── */}
      <g>
        {/* Tête */}
        <circle cx="82" cy="34" r="19" fill="#CE1126" />
        {/* Corps */}
        <path
          d="M68,53 C66,62 62,76 64,100 C66,114 70,124 72,128 L94,128 C96,124 98,114 98,100 C98,76 94,62 92,53 C90,50 86,48 82,48 C78,48 70,50 68,53Z"
          fill="#CE1126"
        />
        {/* Bras droit (vers l'avant / adversaire) */}
        <path d="M90,74 C100,70 115,67 132,72 C140,75 148,79 152,82"
          stroke="#CE1126" strokeWidth="13" strokeLinecap="round" />
        {/* Bras gauche (derrière) */}
        <path d="M70,74 C60,68 46,64 36,68"
          stroke="#CE1126" strokeWidth="11" strokeLinecap="round" />
        {/* Jambe droite (avant) */}
        <path d="M88,126 C94,140 96,158 92,185 C90,194 88,200 86,205"
          stroke="#CE1126" strokeWidth="14" strokeLinecap="round" />
        {/* Jambe gauche (arrière) */}
        <path d="M76,126 C68,140 56,158 44,178 C40,185 36,193 34,200"
          stroke="#CE1126" strokeWidth="14" strokeLinecap="round" />
      </g>

      {/* ── Lutteur droit (vert) — penché vers la gauche ── */}
      <g>
        {/* Tête */}
        <circle cx="238" cy="34" r="19" fill="#006A4E" />
        {/* Corps */}
        <path
          d="M224,53 C222,62 220,76 220,100 C220,114 224,124 226,128 L248,128 C250,124 252,114 252,100 C252,76 248,62 246,53 C244,50 240,48 238,48 C234,48 226,50 224,53Z"
          fill="#006A4E"
        />
        {/* Bras gauche (vers l'avant / adversaire) */}
        <path d="M230,74 C220,70 205,67 188,72 C180,75 172,79 168,82"
          stroke="#006A4E" strokeWidth="13" strokeLinecap="round" />
        {/* Bras droit (derrière) */}
        <path d="M250,74 C260,68 274,64 284,68"
          stroke="#006A4E" strokeWidth="11" strokeLinecap="round" />
        {/* Jambe gauche (avant) */}
        <path d="M232,126 C226,140 224,158 228,185 C230,194 232,200 234,205"
          stroke="#006A4E" strokeWidth="14" strokeLinecap="round" />
        {/* Jambe droite (arrière) */}
        <path d="M244,126 C252,140 264,158 276,178 C280,185 284,193 286,200"
          stroke="#006A4E" strokeWidth="14" strokeLinecap="round" />
      </g>

      {/* Point de contact des mains — or */}
      <circle cx="160" cy="80" r="12" fill="#FFCD00" opacity="0.9" />
      <circle cx="160" cy="80" r="6" fill="#8a6d00" opacity="0.7" />

      {/* Particules de poussière */}
      <circle cx="140" cy="195" r="3" fill="rgba(139,101,32,0.3)" />
      <circle cx="170" cy="205" r="2" fill="rgba(139,101,32,0.25)" />
      <circle cx="155" cy="208" r="4" fill="rgba(139,101,32,0.2)" />
      <circle cx="130" cy="202" r="2.5" fill="rgba(139,101,32,0.2)" />
      <circle cx="185" cy="198" r="3" fill="rgba(139,101,32,0.25)" />
    </svg>
  );
}

// ─── Likpaya — collier de fer de l'initié ───────────────────────────────────
export function Likpaya({
  className = "",
  color = "#2C1A0E",
  size = 80,
}: { className?: string; color?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Anneau principal */}
      <circle cx="50" cy="50" r="36" stroke={color} strokeWidth="11" fill="none" />
      {/* Renfort — cercle intérieur fin */}
      <circle cx="50" cy="50" r="28" stroke={color} strokeWidth="1.5" fill="none" opacity="0.3" />
      {/* Encoches traditionnelles (attaches du collier) */}
      <rect x="45" y="5" width="10" height="14" rx="3" fill={color} />
      <rect x="45" y="81" width="10" height="14" rx="3" fill={color} />
      <rect x="5" y="45" width="14" height="10" rx="3" fill={color} />
      <rect x="81" y="45" width="14" height="10" rx="3" fill={color} />
      {/* Points ornementaux */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 50 + 36 * Math.cos(rad);
        const cy = 50 + 36 * Math.sin(rad);
        return <circle key={i} cx={cx} cy={cy} r="2.5" fill="#8B6520" opacity="0.7" />;
      })}
    </svg>
  );
}

// ─── Ahouyé — rocher sacré ──────────────────────────────────────────────────
export function Ahouye({
  className = "",
  opacity = 1,
}: { className?: string; opacity?: number }) {
  return (
    <svg
      viewBox="0 0 220 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Rocher principal */}
      <path
        d="M15,140 Q25,65 72,32 Q105,10 138,26 Q168,42 182,88 Q190,112 196,140Z"
        fill="#8B6520"
        opacity="0.75"
      />
      {/* Reflet (côté éclairé) */}
      <path
        d="M72,32 Q105,10 138,26 Q118,16 100,20 Q82,26 72,32Z"
        fill="rgba(255,255,255,0.18)"
      />
      {/* Ombre au bas */}
      <path
        d="M15,140 Q100,125 196,140Z"
        fill="rgba(0,0,0,0.12)"
      />
      {/* Rayons sacrés (aura spirituelle) */}
      <line x1="105" y1="2" x2="105" y2="26" stroke="#FFCD00" strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
      <line x1="128" y1="5" x2="122" y2="28" stroke="#FFCD00" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <line x1="82" y1="5" x2="88" y2="28" stroke="#FFCD00" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <line x1="148" y1="14" x2="140" y2="34" stroke="#FFCD00" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      <line x1="62" y1="14" x2="70" y2="34" stroke="#FFCD00" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      {/* Étoile sacrée au sommet */}
      <circle cx="105" cy="0" r="3" fill="#FFCD00" opacity="0.6" />
    </svg>
  );
}

// ─── Chien Kabyè — symbole de force et d'endurance ─────────────────────────
export function KabyeDog({
  className = "",
  color = "#2C1A0E",
  opacity = 1,
}: { className?: string; color?: string; opacity?: number }) {
  return (
    <svg
      viewBox="0 0 180 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Corps */}
      <ellipse cx="88" cy="74" rx="48" ry="30" fill={color} />
      {/* Tête */}
      <circle cx="128" cy="52" r="24" fill={color} />
      {/* Museau */}
      <ellipse cx="144" cy="60" rx="14" ry="10" fill={color} />
      {/* Nez */}
      <ellipse cx="154" cy="58" rx="5" ry="3.5" fill="rgba(0,0,0,0.5)" />
      {/* Oreille dressée */}
      <path d="M120,30 Q112,10 104,14 Q116,26 120,30Z" fill={color} />
      {/* Queue relevée */}
      <path d="M40,62 Q22,42 30,30 Q34,34 30,46 Q38,52 40,62Z" fill={color} />
      {/* Pattes */}
      <rect x="62" y="98" width="14" height="24" rx="7" fill={color} />
      <rect x="80" y="100" width="14" height="22" rx="7" fill={color} />
      <rect x="100" y="100" width="14" height="22" rx="7" fill={color} />
      <rect x="116" y="98" width="14" height="24" rx="7" fill={color} />
      {/* Œil */}
      <circle cx="134" cy="47" r="4" fill="white" opacity="0.9" />
      <circle cx="135" cy="47" r="2" fill="rgba(0,0,0,0.8)" />
    </svg>
  );
}

// ─── Balai du Tchotcho — bâton cérémoniel du grand prêtre ──────────────────
export function TchotchoBroom({
  className = "",
  color = "#8B6520",
  size = 80,
}: { className?: string; color?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 60 160"
      width={size * 0.4}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Manche */}
      <rect x="27" y="0" width="6" height="100" rx="3" fill={color} />
      {/* Lien traditionnel */}
      <rect x="24" y="92" width="12" height="8" rx="2" fill="#CE1126" opacity="0.8" />
      {/* Soies / fibres végétales */}
      {[-20,-14,-8,-2,4,10,16,22].map((offset, i) => (
        <path
          key={i}
          d={`M30,100 Q${30 + offset},125 ${30 + offset * 1.3},158`}
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity={0.6 + (i % 3) * 0.1}
        />
      ))}
      {/* Ornement en haut du manche */}
      <circle cx="30" cy="6" r="5" fill={color} opacity="0.8" />
      <circle cx="30" cy="6" r="2.5" fill="#FFCD00" opacity="0.7" />
    </svg>
  );
}

// ─── Motif géométrique Kabyè ────────────────────────────────────────────────
export function KabyeGeometric({
  className = "",
  size = 60,
  color = "#CE1126",
}: { className?: string; size?: number; color?: string }) {
  return (
    <svg
      viewBox="0 0 60 60"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Losange central */}
      <polygon points="30,5 55,30 30,55 5,30" stroke={color} strokeWidth="2" fill="none" opacity="0.7" />
      {/* Losange intérieur */}
      <polygon points="30,16 44,30 30,44 16,30" stroke={color} strokeWidth="1.5" fill="none" opacity="0.4" />
      {/* Points aux coins */}
      <circle cx="30" cy="5" r="2.5" fill={color} opacity="0.7" />
      <circle cx="55" cy="30" r="2.5" fill={color} opacity="0.7" />
      <circle cx="30" cy="55" r="2.5" fill={color} opacity="0.7" />
      <circle cx="5" cy="30" r="2.5" fill={color} opacity="0.7" />
      {/* Croix centrale */}
      <line x1="30" y1="22" x2="30" y2="38" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <line x1="22" y1="30" x2="38" y2="30" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.6" />
    </svg>
  );
}
