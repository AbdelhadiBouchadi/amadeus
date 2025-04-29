import { Button } from '@/components/ui/button';
import { BiLoaderCircle } from 'react-icons/bi';

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
      className={className ?? 'flex justify-center items-center gap-2 w-full '}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <BiLoaderCircle className="animate-spin text-white text-2xl" />
          En Cours de Traitement
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
