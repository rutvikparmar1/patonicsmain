import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",

        /*
         * Brand actions. The logo green (#8DC63F) sits at ~2.1:1 behind white
         * text, so filled buttons use the deepened partner and keep the logo
         * green for the hover and focus ring instead.
         */
        brand:
          "group rounded-full bg-brand-green-deep font-semibold tracking-tight text-white shadow-soft transition-all duration-300 hover:bg-ink hover:shadow-glow focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2",
        brandOutline:
          "group rounded-full border border-ink/15 bg-background font-semibold tracking-tight text-ink transition-all duration-300 hover:border-brand-green-deep hover:bg-brand-green-soft focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2",
        /* For use on ink-coloured sections. */
        onInk:
          "group rounded-full bg-white font-semibold tracking-tight text-ink shadow-soft transition-all duration-300 hover:bg-brand-green hover:text-ink focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
        inkOutline:
          "group rounded-full border border-white/25 bg-white/5 font-semibold tracking-tight text-white backdrop-blur transition-all duration-300 hover:border-brand-green hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        xl: "h-12 px-7 text-[0.95rem]",
        "2xl": "h-14 px-9 text-[1rem]",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
