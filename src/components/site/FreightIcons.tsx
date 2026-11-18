/**
 * Freight silhouettes drawn for this page rather than taken from an icon set,
 * so they carry the weight the section needs at ~56px tall and share a single
 * 120x56 frame. `currentColor` carries the body; the brand accents are fixed.
 */

type Props = { className?: string };

export function ContainerTruckIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 120 56" fill="none" className={className} aria-hidden>
      {/* Container */}
      <rect x="4" y="9" width="68" height="27" rx="1.5" fill="currentColor" />
      {/* Corrugation */}
      <g fill="#fff" opacity="0.17">
        {[13, 21, 29, 37, 45, 53, 61].map((x) => (
          <rect key={x} x={x} y="12" width="2" height="21" />
        ))}
      </g>
      {/* Door end */}
      <rect x="4" y="9" width="5.5" height="27" rx="1.5" fill="var(--brand-green)" />
      {/* Chassis */}
      <rect x="4" y="36" width="100" height="3.2" rx="1.2" fill="currentColor" />
      {/* Cab with sloped screen */}
      <path d="M76 36V17h15l12 10.5V36Z" fill="currentColor" />
      <path d="M80 21h9l7 6H80Z" fill="#fff" opacity="0.82" />
      {/* Wheels */}
      <g fill="currentColor">
        {[20, 34, 94].map((cx) => (
          <circle key={cx} cx={cx} cy="44" r="7.5" />
        ))}
      </g>
      <g fill="#fff">
        {[20, 34, 94].map((cx) => (
          <circle key={cx} cx={cx} cy="44" r="3" />
        ))}
      </g>
      {/* Road */}
      <rect x="2" y="52.5" width="116" height="2" rx="1" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

export function ContainerShipIcon({ className }: Props) {
  // Three tiers of boxes, deliberately uneven the way a loaded deck actually is.
  const tiers = [
    { y: 25, boxes: [16, 26, 36, 46, 56, 66, 76] },
    { y: 18, boxes: [22, 32, 42, 52, 62, 72] },
    { y: 11, boxes: [32, 42, 52] },
  ];
  const accent = ["var(--brand-green)", "var(--brand-blue)"];

  return (
    <svg viewBox="0 0 120 56" fill="none" className={className} aria-hidden>
      {tiers.map((t, ti) =>
        t.boxes.map((x, bi) => (
          <rect
            key={`${ti}-${x}`}
            x={x}
            y={t.y}
            width="9"
            height="6.4"
            rx="0.8"
            fill={(ti + bi) % 4 === 0 ? accent[(ti + bi) % 2] : "currentColor"}
            opacity={(ti + bi) % 4 === 0 ? 1 : 0.88}
          />
        )),
      )}
      {/* Bridge */}
      <path d="M90 31.4V14h11v17.4Z" fill="currentColor" />
      <rect x="92.5" y="17" width="6" height="3.4" rx="0.6" fill="#fff" opacity="0.82" />
      {/* Hull, bow to the right */}
      <path d="M6 31.4h106l-10 13.6H15Z" fill="currentColor" />
      <rect x="6" y="31.4" width="106" height="2.6" fill="#fff" opacity="0.2" />
      {/* Water */}
      <g stroke="currentColor" strokeLinecap="round" opacity="0.28">
        <path d="M3 49.5h114" strokeWidth="2.2" />
        <path d="M14 54h34" strokeWidth="2" />
        <path d="M60 54h46" strokeWidth="2" />
      </g>
    </svg>
  );
}

export function CargoPlaneIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 120 56" fill="none" className={className} aria-hidden>
      {/* Tail fin and tailplane */}
      <path d="M15 27 20 6h7.5l4.5 21Z" fill="currentColor" />
      <path d="M13 28h17l-4.5 7.5H14Z" fill="currentColor" opacity="0.75" />
      {/* Fuselage, nose to the right */}
      <path
        d="M11 28.5c0-1.2 1-2.2 2.3-2.2h72c9 0 17.6 1.7 25.6 5l3.8 1.6c1.7.7 1.7 2.5 0 3.2l-4.2 1.6c-6.6 2.4-13.6 3.6-20.8 3.6H24c-7.2 0-13-5.2-13-11.6Z"
        fill="currentColor"
      />
      {/* Cabin windows */}
      <g fill="#fff" opacity="0.6">
        {[40, 48, 56, 64, 72, 80].map((cx) => (
          <circle key={cx} cx={cx} cy="31" r="1.5" />
        ))}
      </g>
      {/* Wing and engines */}
      <path d="M45 37h28l-12 13H33Z" fill="currentColor" opacity="0.6" />
      <rect x="50" y="37.5" width="16" height="7" rx="3.5" fill="var(--gold-deep)" />
      <rect x="68" y="38.5" width="12" height="5.5" rx="2.75" fill="var(--gold)" />
      {/* Motion */}
      <g stroke="currentColor" strokeLinecap="round" opacity="0.25">
        <path d="M2 22h14" strokeWidth="2" />
        <path d="M5 46h16" strokeWidth="2" />
      </g>
    </svg>
  );
}
