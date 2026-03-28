import type { ReactNode } from "react";

type Variant = "rose" | "violet";

export function AuthPageChrome({
  children,
  variant = "rose",
}: {
  children: ReactNode;
  variant?: Variant;
}) {
  const gradient =
    variant === "violet"
      ? "from-violet-950/25 via-transparent to-rose-950/12"
      : "from-rose-950/20 via-transparent to-violet-950/15";

  return (
    <main
      className={`min-h-[100dvh] flex items-center justify-center px-4 py-20 bg-obsidian-DEFAULT relative overflow-hidden`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-b ${gradient} pointer-events-none`}
        aria-hidden
      />
      {children}
    </main>
  );
}
