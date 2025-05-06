'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import EDIDetailsModal from './EDIDetailsModal';

interface EDIDetailsButtonProps {
  details: {
    referenceIncoherence: string | null;
    codeEmballageBL: string | null;
    codeEmballageLivre: string | null;
    quantite: string | null;
    numEtiquette: string | null;
  };
}

const EDIDetailsButton: React.FC<EDIDetailsButtonProps> = ({ details }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
      >
        <Plus className="h-4 w-4" />
        <span>Détails</span>
      </button>

      <EDIDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        details={details}
      />
    </>
  );
};

export default EDIDetailsButton;
