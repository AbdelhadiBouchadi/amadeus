import { Button } from '@/components/ui/button';
import React from 'react';

interface EDIDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  details: {
    referenceIncoherence: string | null;
    codeEmballageBL: string | null;
    codeEmballageLivre: string | null;
    quantite: string | null;
    numEtiquette: string | null;
  };
}

const EDIDetailsModal: React.FC<EDIDetailsModalProps> = ({
  isOpen,
  onClose,
  details,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-greyed dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-semibold mb-4">Détails de l'incohérence</h3>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600">Référence spécifique</p>
            <p className="font-medium">
              {details.referenceIncoherence || 'Non spécifié'}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Code emballage BL/LCD</p>
            <p className="font-medium">
              {details.codeEmballageBL || 'Non spécifié'}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Code emballage livré</p>
            <p className="font-medium">
              {details.codeEmballageLivre || 'Non spécifié'}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Quantité</p>
            <p className="font-medium">{details.quantite || 'Non spécifié'}</p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Numéro d'étiquette</p>
            <p className="font-medium">
              {details.numEtiquette || 'Non spécifié'}
            </p>
          </div>
        </div>

        <Button variant="destructive" onClick={onClose} className="mt-6 w-full">
          Fermer
        </Button>
      </div>
    </div>
  );
};

export default EDIDetailsModal;
