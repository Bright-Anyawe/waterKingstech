import { ChevronRight, Crown } from "lucide-react";
import Link from "next/link";
import { tickerMessages } from "@/data/offers";

function Messages({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {tickerMessages.map((message) => (
        <li key={message} className="flex items-center gap-3 pr-10 whitespace-nowrap">
          <Crown className="size-3.5 shrink-0 text-cyan" aria-hidden="true" />
          {message}
        </li>
      ))}
    </ul>
  );
}

/** Scrolling offers strip above the header. Pauses on hover; static with reduced motion. */
export function PromoTicker() {
  return (
    <section aria-label="Current offers" className="relative bg-navy text-[0.78rem] font-medium text-white">
      <div className="flex h-9 items-center">
        <div className="group relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_2rem,black_calc(100%-2rem),transparent)]">
          <div className="flex w-max animate-ticker group-hover:[animation-play-state:paused]">
            <Messages />
            <Messages hidden />
          </div>
        </div>
        <Link
          href="/deals"
          className="hidden h-full shrink-0 items-center gap-0.5 bg-orange px-4 font-bold text-ink transition-colors hover:bg-orange-strong sm:flex"
        >
          All deals
          <ChevronRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
