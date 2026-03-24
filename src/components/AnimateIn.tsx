interface AnimateInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export default function AnimateIn({
  children,
  className = '',
}: AnimateInProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}
