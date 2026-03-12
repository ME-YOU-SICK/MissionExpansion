import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'border border-white/15 bg-white/[0.10] text-white hover:bg-white/[0.16] active:scale-[0.99]',
        ghost: 'border border-white/10 bg-white/[0.03] text-white/80 hover:bg-white/[0.09] hover:text-white',
        success: 'border border-emerald-300/25 bg-emerald-300/14 text-emerald-100 hover:bg-emerald-300/20',
        danger: 'border border-rose-300/25 bg-rose-300/12 text-rose-100 hover:bg-rose-300/18'
      },
      size: {
        sm: 'h-9 px-3',
        md: 'h-11 px-4',
        lg: 'h-12 px-5'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
);

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { buttonVariants };
