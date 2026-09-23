import { business } from "@/data/business";

/** Exact pin or embed link if supplied; otherwise the shop's address (Circle Mall, Tip Toe Lane). */
function embedSrc(): string {
  const { mapEmbedUrl, coordinates, mapQuery } = business.location;
  if (mapEmbedUrl) return mapEmbedUrl;
  if (coordinates) return `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}&z=17&output=embed`;
  return `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=17&output=embed`;
}

/** Embedded Google Map, lazy-loaded so it never slows down the first paint. */
export function GoogleMap({ className }: { className?: string }) {
  return (
    <div className={className}>
      <iframe
        src={embedSrc()}
        title={`Map showing the location of ${business.name}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="size-full border-0"
      />
    </div>
  );
}
