/**
 * The wave from the logo, used as the edge between bands (search band, page
 * banners, footer). It takes its colour from `currentColor`.
 */
export function WaveEdge({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true" className={className}>
      <path
        d="M0 90V58C90 34 170 26 260 40s150 46 250 46 170-52 290-60 200 34 300 44 170-12 240-34 60-24 100-14V90Z"
        fill="currentColor"
        opacity="0.5"
      />
      <path
        d="M0 90V66c120-28 230-34 340-12s190 34 300 30 200-46 330-50 220 30 300 38 110-6 170-18V90Z"
        fill="currentColor"
      />
    </svg>
  );
}
