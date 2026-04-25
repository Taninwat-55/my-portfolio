import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice-300 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-ice-400 text-charcoal-950 hover:bg-ice-300 shadow-[0_0_0_0_rgba(103,200,245,0)] hover:shadow-[0_0_28px_-4px_rgba(103,200,245,0.45)]",
        ghost:
          "bg-transparent text-zinc-200 border border-white/10 hover:border-ice-400/40 hover:text-ice-200 hover:bg-white/[0.03]",
        outline:
          "border border-ice-400/30 bg-transparent text-ice-200 hover:bg-ice-400/10 hover:border-ice-400/50",
        subtle:
          "bg-white/[0.04] text-zinc-200 border border-white/5 hover:bg-white/[0.07] hover:border-white/10",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-12 rounded-full px-7 text-sm",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
