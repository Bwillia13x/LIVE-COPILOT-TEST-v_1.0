// src/utils/escapeHtml.ts
export function escapeHtml(unsafe: string): string {
  if (unsafe === null || unsafe === undefined) return '';
  return unsafe
       .replace(/&/g, "&amp;")
       .replace(/</g, "&lt;")
       .replace(/>/g, "&gt;")
       .replace(/"/g, "&quot;")
       .replace(/'/g, "&#039;");
}
