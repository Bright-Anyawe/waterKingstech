import { unsplash } from "@/lib/images";
import type { ImageAsset, RepairService } from "@/types";

/**
 * Repair & diagnostic services.
 * `turnaround` is only displayed when WaterKingsTech supplies it (e.g. "Same day").
 */
export const repairServices: RepairService[] = [
  {
    id: "screen-replacement",
    name: "Screen replacement",
    description: "Cracked, flickering or unresponsive display? Get the screen on your phone or laptop replaced.",
    icon: "screen",
    turnaround: null,
  },
  {
    id: "battery-replacement",
    name: "Battery replacement",
    description: "Battery draining too fast or not holding charge? Have a replacement battery fitted.",
    icon: "battery",
    turnaround: null,
  },
  {
    id: "ssd-upgrade",
    name: "SSD upgrades",
    description: "Make a slow laptop feel new again, or add storage, with a solid-state drive upgrade.",
    icon: "ssd",
    turnaround: null,
  },
  {
    id: "board-repair",
    name: "Board repair",
    description: "Board-level fault finding and repair for phones and laptops with deeper hardware problems.",
    icon: "board",
    turnaround: null,
  },
  {
    id: "phone-diagnostics",
    name: "Phone diagnostics",
    description: "Not sure what's wrong? Bring your phone in and get the fault properly identified.",
    icon: "phone-diagnostics",
    turnaround: null,
  },
  {
    id: "laptop-diagnostics",
    name: "Laptop diagnostics",
    description: "Slow, overheating or not starting up? Find out what's causing it before you spend.",
    icon: "laptop-diagnostics",
    turnaround: null,
  },
  {
    id: "quick-repairs",
    name: "Other quick repairs",
    description: "Something else not working? Tell us about the problem and we'll let you know how we can help.",
    icon: "quick-repair",
    turnaround: null,
  },
];

export const repairImage: ImageAsset = {
  src: unsplash("1550041473-d296a3a8a18a", 1400),
  alt: "Technician repairing the circuit board of a smartphone",
};
