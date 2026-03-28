import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-white/10 text-white/80 border border-white/10",
        rose: "bg-rose-500/15 text-rose-300 border border-rose-500/20",
        violet: "bg-violet-500/15 text-violet-300 border border-violet-500/20",
        gold: "bg-gold-DEFAULT/15 text-gold-light border border-gold-DEFAULT/20",
        success: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };