import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default:
          "border-border bg-sand-200 text-ink-700",
        ice:
          "border-clay-400/30 bg-clay-100/50 text-clay-600",
        outline:
          "border-border text-ink-700",
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
