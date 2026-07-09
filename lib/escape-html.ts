// Escapes user input before interpolating it into notification-email HTML
// (SECURITY-AUDIT.md #2 — prevents injected markup/phishing links in the inbox).
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
