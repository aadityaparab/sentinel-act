import type { Assessment, ChecklistItem } from "./types.js";

/** Flatten an assessment's obligations (incl. transparency) into a working checklist. */
export function checklist(a: Assessment): ChecklistItem[] {
  const seen = new Set<string>();
  const items: ChecklistItem[] = [];
  for (const ob of [...a.obligations, ...a.transparencyObligations]) {
    if (seen.has(ob.id)) continue;
    seen.add(ob.id);
    items.push({ id: ob.id, obligation: ob.title, article: ob.article, status: "todo" });
  }
  return items;
}
