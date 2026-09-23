import {
  ArrowUpRight,
  BatteryCharging,
  Clock,
  Cpu,
  HardDrive,
  LaptopMinimal,
  type LucideIcon,
  Smartphone,
  Stethoscope,
  Wrench,
} from "lucide-react";
import { repairMessage, whatsappHref } from "@/lib/contact-links";
import { cn } from "@/lib/cn";
import type { RepairIcon, RepairService } from "@/types";

const icons: Record<RepairIcon, LucideIcon> = {
  screen: Smartphone,
  battery: BatteryCharging,
  ssd: HardDrive,
  board: Cpu,
  "phone-diagnostics": Stethoscope,
  "laptop-diagnostics": LaptopMinimal,
  "quick-repair": Wrench,
};

/** Compact row on phones; stacked card (or wide row) from `sm` up. */
export function RepairCard({ service, wide = false }: { service: RepairService; wide?: boolean }) {
  const Icon = icons[service.icon];

  return (
    <article
      className={cn(
        "group relative flex h-full gap-4 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5 transition-[background-color,border-color,transform] duration-500 ease-[var(--ease-premium)] hover:-translate-y-1 hover:border-tide-400/30 hover:bg-white/[0.05] sm:p-6",
        wide ? "sm:items-center sm:gap-6" : "sm:flex-col sm:gap-5",
      )}
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-tide-400/20 bg-tide-400/10 text-tide-300 transition-colors duration-500 group-hover:bg-tide-400/20 sm:size-12">
        <Icon className="size-5 sm:size-5.5" aria-hidden="true" />
      </span>

      <div className={cn("flex min-w-0 flex-1 flex-col", wide && "sm:flex-row sm:items-center sm:justify-between sm:gap-6")}>
        <div>
          <h3 className="text-base font-semibold tracking-[-0.02em] text-white sm:text-lg">{service.name}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-300 sm:mt-2">{service.description}</p>
          {service.turnaround ? (
            <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-ink-200">
              <Clock className="size-3.5 text-tide-300" aria-hidden="true" />
              Estimated turnaround: {service.turnaround}
            </p>
          ) : null}
        </div>

        <a
          href={whatsappHref(repairMessage(service))}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ask about ${service.name.toLowerCase()} on WhatsApp`}
          className={cn(
            "mt-3 inline-flex items-center gap-1.5 self-start text-sm font-medium whitespace-nowrap text-tide-300 transition-colors hover:text-white sm:mt-auto sm:pt-6",
            wide && "sm:mt-0 sm:self-center sm:pt-0",
          )}
        >
          Ask on WhatsApp
          <ArrowUpRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
          {/* Stretch the link over the whole card for a larger touch target */}
          <span className="absolute inset-0 rounded-3xl" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
