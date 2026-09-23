import { unsplash } from "@/lib/images";
import type { Category, CategoryId, SubcategoryId } from "@/types";

export const categories: Category[] = [
  {
    id: "smartphones",
    label: "Smartphones",
    description: "The latest iPhone, Samsung and more.",
    image: {
      src: unsplash("1592750475338-74b7b21085ab", 1400),
      alt: "Graphite iPhone with triple camera on a dark background",
    },
    subcategories: [
      { id: "iphone", label: "iPhone" },
      { id: "samsung", label: "Samsung" },
      { id: "other-phones", label: "Other smartphones" },
    ],
  },
  {
    id: "laptops",
    label: "Laptops",
    description: "HP, Dell, Lenovo, MacBooks and more — for work, school and creativity.",
    image: {
      src: unsplash("1515803171005-2d5e90f7b4d3", 1400),
      alt: "Black MacBook Pro open on a dark desk",
    },
    subcategories: [
      { id: "windows", label: "Windows laptops" },
      { id: "macbook", label: "MacBooks" },
    ],
  },
  {
    id: "accessories",
    label: "Accessories",
    description: "Chargers, earbuds, cables, SSDs, pen drives, screens and more.",
    image: {
      src: unsplash("1609692814858-f7cd2f0afa4f", 1400),
      alt: "Smartphone, smartwatch and wireless earbuds on a wooden surface",
    },
    subcategories: [
      { id: "ssd", label: "SSDs" },
      { id: "pen-drives", label: "Pen drives" },
      { id: "screens", label: "Screens" },
      { id: "earbuds", label: "Earbuds" },
      { id: "chargers", label: "Chargers" },
      { id: "other-accessories", label: "Other accessories" },
    ],
  },
];

export function getCategory(id: CategoryId): Category {
  const category = categories.find((c) => c.id === id);
  if (!category) throw new Error(`Unknown category: ${id}`);
  return category;
}

export function getSubcategoryLabel(id: SubcategoryId): string {
  for (const category of categories) {
    const sub = category.subcategories.find((s) => s.id === id);
    if (sub) return sub.label;
  }
  return id;
}
