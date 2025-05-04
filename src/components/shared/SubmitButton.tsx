import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface ButtonProps {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
}

const SubmitButton = ({ isLoading, className, children }: ButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className ?? 'flex justify-center items-center w-full '}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Loader2 className="animate-spin text-white text-2xl" />
          En Cours de Traitement
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
