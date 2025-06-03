import { cn } from '#/lib/utilities/cn';

export interface StrokeProps {
  className?: string;
}
const Stroke = ({ className }: StrokeProps) => {
  return <div className={cn('bg-pj-orange h-2 w-75', className)} />;
};

export default Stroke;
