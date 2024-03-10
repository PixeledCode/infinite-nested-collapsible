import { type Item } from "./data";

export function filterItems(items: Item[], searchInput: string): Item[] {
  const lowerSearchInput = searchInput.toLowerCase();
  return structuredClone(items).filter((item) => {
    if (item.label.toLowerCase().includes(lowerSearchInput)) {
      return true;
    }

    if (item.children) {
      item.children = filterItems(item.children, searchInput);
      return item.children.length > 0;
    }

    return false;
  });
}
