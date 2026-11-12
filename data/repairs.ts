import { unsplash } from "@/lib/images";
import type { ImageAsset, RepairService } from "@/types";

/**
 * Repair & diagnostic services.
 * `turnaround`: the estimated time, e.g. "Same day" or "1–2 days". It shows a
 * "to be confirmed" placeholder until WaterKingsTech supplies it.
 */
export const repairServices: RepairService[] = [
  {
    id: "screen-replacement",
    name: "Screen replacement",
    description: "Cracked, flickering or unresponsive display on your phone or laptop.",
    icon: "screen",
    turnaround: null,
  },
  {
    id: "battery-swap",
    name: "Battery swap",
    description: "Battery draining fast, swelling or not holding charge.",
    icon: "battery",
    turnaround: null,
  },
  {
    id: "ssd-upgrade",
    name: "SSD / HDD upgrade",
    description: "Make a slow laptop fast again with an SSD, or add more storage with an SSD or hard drive.",
    icon: "ssd",
    turnaround: null,
  },
  {
    id: "ram-upgrade",
    name: "RAM upgrade",
    description: "Laptop freezing with a few apps or tabs open? Add more memory so it keeps up.",
    icon: "ram",
    turnaround: null,
  },
  {
    id: "board-repair",
    name: "Board repair",
    description: "Board-level fault finding and repair for deeper hardware problems.",
    icon: "board",
    turnaround: null,
  },
  {
    id: "phone-diagnostics",
    name: "Phone diagnostics",
    description: "Not sure what's wrong? Get the fault properly identified first.",
    icon: "phone-diagnostics",
    turnaround: null,
  },
  {
    id: "laptop-diagnostics",
    name: "Laptop diagnostics",
    description: "Slow, overheating or not starting? Find the cause before you spend.",
    icon: "laptop-diagnostics",
    turnaround: null,
  },
  {
    id: "quick-repairs",
    name: "Other quick repairs",
    description: "Something else not working? Tell us the problem and we'll say how we can help.",
    icon: "quick-repair",
    turnaround: null,
  },
];

export const repairImage: ImageAsset = {
  src: unsplash("1550041473-d296a3a8a18a", 1400),
  alt: "Technician repairing the circuit board of a smartphone",
};
