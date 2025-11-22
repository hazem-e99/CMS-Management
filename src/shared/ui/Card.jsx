import { cn } from '../lib/cn';

export function Card({ children, className, padding = true, ...props }) {
  return (
    <div
      className={cn(
        'card bg-white dark:bg-gray-800 rounded-lg shadow-sm',
        'border border-gray-200 dark:border-gray-700',
        padding && 'p-6',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }) {
  return (
    <div className={cn('mb-4', className)}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className }) {
  return (
    <h3 className={cn('text-lg font-semibold text-gray-900 dark:text-gray-100', className)}>
      {children}
    </h3>
  );
}

export function CardContent({ children, className }) {
  return (
    <div className={cn('text-gray-700 dark:text-gray-300', className)}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className }) {
  return (
    <div className={cn('mt-4 flex items-center gap-2', className)}>
      {children}
    </div>
  );
}
