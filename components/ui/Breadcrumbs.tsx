import Link from "next/link";

export type Crumb = { label: string; href?: string };

/** Pill breadcrumbs, as on marketplace listing pages. The last crumb is the current page. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="no-scrollbar -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <ol className="flex w-max items-center gap-1.5 text-[0.8rem]">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className="rounded-full border border-ice-200 bg-white px-3 py-1 text-ink-soft transition-colors hover:border-royal-200 hover:text-royal-700"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className="rounded-full bg-white/70 px-3 py-1 font-medium text-ink">
                  {item.label}
                </span>
              )}
              {!last ? (
                <span aria-hidden="true" className="text-ice-300">
                  /
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
