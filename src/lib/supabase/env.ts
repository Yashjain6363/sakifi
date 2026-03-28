export function isValidSupabaseEnv(url: string, key: string): boolean {
  const u = url.trim().toLowerCase();
  const k = key.trim().toLowerCase();
  if (!u || !k) return false;
  if (u.includes("paste_") || k.includes("paste_")) return false;
  if (k === "your-anon-key" || u.includes("your-project")) return false;
  try {
    const parsed = new URL(u);
    if (!parsed.protocol.startsWith("http")) return false;
    if (parsed.hostname === "your-project.supabase.co") return false;
  } catch {
    return false;
  }
  return true;
}
