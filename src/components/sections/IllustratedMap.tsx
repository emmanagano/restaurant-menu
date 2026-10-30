// TODO(content): placeholder illustration. Swap in a Leaflet/OpenStreetMap map pinned to a public
// landmark once lat/lng are chosen (that needs a new dependency, so it needs approval first).
export function IllustratedMap({ label }: { label: string }) {
  return (
    <svg
      role="img"
      aria-label={label}
      viewBox="0 0 400 240"
      className="w-full rounded-card border-2 border-line bg-surface text-ink"
    >
      <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.35">
        <path d="M0 70 C 120 60, 200 110, 400 90" />
        <path d="M0 170 C 100 150, 220 190, 400 160" />
        <path d="M90 0 C 100 90, 70 150, 100 240" />
        <path d="M270 0 C 260 80, 300 160, 280 240" />
      </g>
      <g className="fill-leaf" opacity="0.25">
        <rect x="120" y="110" width="40" height="26" rx="4" />
        <rect x="300" y="40" width="50" height="30" rx="4" />
        <rect x="20" y="190" width="50" height="30" rx="4" />
      </g>
      <g className="fill-ember-dark">
        <path d="M200 70 c-14 0-24 10-24 23 0 17 24 42 24 42s24-25 24-42c0-13-10-23-24-23Z" />
        <circle cx="200" cy="93" r="8" className="fill-canvas" />
      </g>
    </svg>
  );
}
