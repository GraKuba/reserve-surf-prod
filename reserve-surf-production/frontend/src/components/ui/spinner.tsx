import { LoaderCircleIcon, type LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SpinnerProps extends LucideProps {
  variant?: 'default' | 'primary' | 'secondary';
}

export const Spinner = ({ className, variant = 'default', size = 24, ...props }: SpinnerProps) => {
  const variantStyles = {
    default: 'text-foreground',
    primary: 'text-primary',
    secondary: 'text-secondary'
  };

  return (
    <LoaderCircleIcon 
      className={cn('animate-spin', variantStyles[variant], className)} 
      size={size}
      {...props} 
    />
  );
};