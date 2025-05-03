'use client';

import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { EDISubcategory, SubcategoryDetail } from '@/types';
import { Pencil, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface SubcategoryDetailItemProps {
  subcategoryName: string;
  detail: SubcategoryDetail;
  onChange: (updatedDetail: SubcategoryDetail) => void;
}

const SubcategoryDetailItem: React.FC<SubcategoryDetailItemProps> = ({
  subcategoryName,
  detail,
  onChange,
}) => {
  const [isEditingComment, setIsEditingComment] = useState(false);
  const [tempComment, setTempComment] = useState(detail.comment || '');

  const isIncoherencePaletteEDI =
    detail.subcategory === EDISubcategory.INCOHERENCE_CONSTITUTION_PALETTE_EDI;

  const handleFlagChange = (flag: keyof SubcategoryDetail, value: boolean) => {
    onChange({
      ...detail,
      [flag]: value,
    });
  };

  const handleSaveComment = () => {
    onChange({
      ...detail,
      comment: tempComment,
    });
    setIsEditingComment(false);
  };

  const handleCancelEdit = () => {
    setTempComment(detail.comment || '');
    setIsEditingComment(false);
  };

  const handleTextFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof SubcategoryDetail
  ) => {
    onChange({
      ...detail,
      [field]: e.target.value,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border border-subMain dark:border-border rounded-lg p-4 mb-4 transition-all hover:shadow-sm"
    >
      <h4 className="font-medium text-base mb-3 text-main">
        {subcategoryName}
      </h4>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-4">
        {[
          { key: 'um', label: 'UM' },
          { key: 'uc', label: 'UC' },
          { key: 'ums', label: 'UMS' },
          { key: 'bl', label: 'BL' },
          { key: 'aviexp', label: 'AVIEXP' },
        ].map((flag) => (
          <div key={flag.key} className="flex items-center space-x-2">
            <Checkbox
              checked={detail[flag.key as keyof SubcategoryDetail] as boolean}
              onCheckedChange={(checked) =>
                handleFlagChange(
                  flag.key as keyof SubcategoryDetail,
                  checked === true
                )
              }
              className="data-[state=checked]:bg-main"
            />
            <label className="text-sm font-medium">{flag.label}</label>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {isIncoherencePaletteEDI && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 space-y-4 border-t pt-4"
          >
            <h4 className="font-medium text-sm mb-3">
              Détails d'incohérence palette EDI
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`${detail.subcategory}-referenceIncoherence`}>
                  Référence
                </Label>
                <Input
                  id={`${detail.subcategory}-referenceIncoherence`}
                  value={detail.referenceIncoherence || ''}
                  onChange={(e) =>
                    handleTextFieldChange(e, 'referenceIncoherence')
                  }
                  placeholder="Entrez la référence"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${detail.subcategory}-codeEmballageBL`}>
                  Code emballage BL/LCD
                </Label>
                <Input
                  id={`${detail.subcategory}-codeEmballageBL`}
                  value={detail.codeEmballageBL || ''}
                  onChange={(e) => handleTextFieldChange(e, 'codeEmballageBL')}
                  placeholder="Code emballage BL/LCD"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${detail.subcategory}-codeEmballageLivre`}>
                  Code emballage livré
                </Label>
                <Input
                  id={`${detail.subcategory}-codeEmballageLivre`}
                  value={detail.codeEmballageLivre || ''}
                  onChange={(e) =>
                    handleTextFieldChange(e, 'codeEmballageLivre')
                  }
                  placeholder="Code emballage livré"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${detail.subcategory}-quantite`}>
                  Quantité
                </Label>
                <Input
                  id={`${detail.subcategory}-quantite`}
                  value={detail.quantite || ''}
                  onChange={(e) => handleTextFieldChange(e, 'quantite')}
                  placeholder="Quantité"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor={`${detail.subcategory}-numEtiquette`}>
                  Numéro d'étiquette
                </Label>
                <Input
                  id={`${detail.subcategory}-numEtiquette`}
                  value={detail.numEtiquette || ''}
                  onChange={(e) => handleTextFieldChange(e, 'numEtiquette')}
                  placeholder="Numéro d'étiquette"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-2">
        {isEditingComment ? (
          <div className="space-y-2">
            <Textarea
              value={tempComment}
              onChange={(e) => setTempComment(e.target.value)}
              placeholder="Ajouter un commentaire pour cette sous-catégorie..."
              className="min-h-[80px] text-sm"
            />
            <div className="flex space-x-2">
              <Button
                size="sm"
                onClick={handleSaveComment}
                className="bg-green-600 hover:bg-green-700"
              >
                <Check className="w-4 h-4 mr-1" /> Enregistrer
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                <X className="w-4 h-4 mr-1" /> Annuler
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Commentaire</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsEditingComment(true)}
                className="text-main hover:text-main/80"
              >
                <Pencil className="w-4 h-4" />
              </Button>
            </div>
            {detail.comment ? (
              <p className="text-sm mt-1 text-gray-600 dark:text-gray-300 border-l-2 border-main pl-2">
                {detail.comment}
              </p>
            ) : (
              <p className="text-sm mt-1 italic text-gray-400">
                Aucun commentaire
              </p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SubcategoryDetailItem;
