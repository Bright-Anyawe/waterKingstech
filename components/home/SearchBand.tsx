import Link from "next/link";
import { preload } from "react-dom";
import { WaveEdge } from "@/components/brand/WaveEdge";
import { HeroVideo } from "@/components/home/HeroVideo";
import { SearchBox } from "@/components/search/SearchBox";
import { heroMedia } from "@/data/hero";

const popular = [
  { label: "iPhone", href: "/shop/phones?type=iphone" },
  { label: "Samsung", href: "/shop/phones?type=samsung" },
  { label: "MacBook", href: "/shop/laptops?type=macbook" },
  { label: "HP EliteBook", href: "/shop/laptops?q=elitebook" },
  { label: "SSD", href: "/shop/accessories?type=ssd" },
  { label: "Screen repair", href: "/repairs" },
];

/** "What are you looking for?" — the coloured search band at the top of the home page. */
export function SearchBand() {
  preload(heroMedia.poster, { as: "image", fetchPriority: "high" });

  return (
    <section aria-labelledby="search-title" className="relative isolate overflow-hidden bg-royal-600 text-white">
      <HeroVideo />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-br from-royal-800/95 via-royal-600/90 to-royal-500/85" />

      <div className="container-x relative pt-9 pb-20 text-center sm:pt-14 sm:pb-28">
        <h1
          id="search-title"
          className="rise-in font-display text-[1.75rem] leading-tight font-extrabold tracking-[-0.02em] [--i:0] sm:text-4xl lg:text-[2.6rem]"
        >
          What are you looking for?
        </h1>
        <p className="rise-in mx-auto mt-2 max-w-xl text-balance text-[0.95rem] text-white/85 [--i:1] sm:text-base">
          UK used &amp; brand new phones, laptops and accessories — plus repairs, at Circle Mall, Accra.
        </p>

        <div className="rise-in mx-auto mt-6 max-w-3xl [--i:2] sm:mt-8">
          <SearchBox variant="hero" />
        </div>

        <ul aria-label="Popular searches" className="rise-in mx-auto mt-4 flex max-w-3xl flex-wrap justify-center gap-2 [--i:3]">
          {popular.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="inline-flex h-8 items-center rounded-full bg-white/12 px-3.5 text-[0.8rem] font-medium text-white ring-1 ring-white/25 transition-colors hover:bg-white hover:text-royal-700"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <WaveEdge className="absolute inset-x-0 -bottom-px h-12 w-full text-ice sm:h-16 lg:h-20" />
    </section>
  );
}
