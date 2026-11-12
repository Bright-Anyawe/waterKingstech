import {
  BatteryCharging,
  Clock,
  Cpu,
  HardDrive,
  LaptopMinimal,
  type LucideIcon,
  MemoryStick,
  Smartphone,
  Stethoscope,
  Wrench,
} from "lucide-react";
import { Pending } from "@/components/ui/Pending";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { repairServices } from "@/data/repairs";
import { cn } from "@/lib/cn";
import { repairMessage, whatsappHref } from "@/lib/contact-links";
import { inSentence } from "@/lib/format";
import type { RepairIcon } from "@/types";

export const repairIcons: Record<RepairIcon, LucideIcon> = {
  screen: Smartphone,
  battery: BatteryCharging,
  ssd: HardDrive,
  ram: MemoryStick,
  board: Cpu,
  "phone-diagnostics": Stethoscope,
  "laptop-diagnostics": LaptopMinimal,
  "quick-repair": Wrench,
};

/** Repair services as a scannable price-list style table: service · turnaround · ask. */
export function RepairList({ limit, className }: { limit?: number; className?: string }) {
  const services = limit ? repairServices.slice(0, limit) : repairServices;

  return (
    <div className={cn("overflow-hidden rounded-xl border border-ice-200 bg-white", className)}>
      <div className="hidden grid-cols-[1fr_11rem_10rem] gap-4 border-b border-ice-200 bg-ice-100 px-5 py-2.5 text-[0.75rem] font-semibold text-ink-muted sm:grid">
        <span>Service</span>
        <span>Estimated turnaround</span>
        <span className="sr-only">Ask</span>
      </div>
      <ul className="divide-y divide-ice-200">
        {services.map((service) => {
          const Icon = repairIcons[service.icon];
          return (
            <li
              key={service.id}
              className="grid grid-cols-[auto_1fr] items-center gap-x-3.5 gap-y-2.5 px-4 py-4 sm:grid-cols-[auto_1fr_11rem_10rem] sm:gap-x-4 sm:px-5"
            >
              <span className="row-span-2 flex size-11 items-center justify-center self-start rounded-xl bg-royal-50 text-royal-600 sm:row-span-1 sm:self-center">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h3 className="font-semibold text-ink">{service.name}</h3>
                <p className="mt-0.5 text-[0.85rem] text-ink-muted">{service.description}</p>
              </div>
              <p className="col-start-2 flex items-center gap-1.5 text-sm sm:col-start-auto">
                <Clock className="size-4 shrink-0 text-royal-600" aria-hidden="true" />
                <span className="sr-only">Estimated turnaround: </span>
                {service.turnaround ? (
                  <span className="font-semibold text-ink">{service.turnaround}</span>
                ) : (
                  <Pending>To be confirmed</Pending>
                )}
              </p>
              <a
                href={whatsappHref(repairMessage(service))}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ask about ${inSentence(service.name)} on WhatsApp`}
                className="col-start-2 inline-flex h-9 w-fit items-center gap-1.5 rounded-lg border border-whatsapp/50 bg-whatsapp/10 px-3 text-[0.8rem] font-bold text-gift transition-colors hover:bg-whatsapp hover:text-whatsapp-ink sm:col-start-auto sm:justify-self-end"
              >
                <WhatsAppIcon className="size-4" />
                Ask on WhatsApp
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
