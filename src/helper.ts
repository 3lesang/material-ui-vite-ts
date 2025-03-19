import { nanoid } from "nanoid";

export function generateSlug(text: string) {
  return text
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-");
}

export function generateSKU(): string {
  const uniqueId = nanoid(6);
  return uniqueId;
}
