'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { MessageCircle } from 'lucide-react';
import CommentModal from './CommentModal';
import { motion } from 'framer-motion';

interface StatusBadgesProps {
  um: boolean;
  uc: boolean;
  ums: boolean;
  bl: boolean;
  aviexp: boolean;
  comment?: string;
  title: string;
}

const StatusBadges: React.FC<StatusBadgesProps> = ({
  um,
  uc,
  ums,
  bl,
  aviexp,
  comment,
  title,
}) => {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  const badgeVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: (index: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.05 * index,
        duration: 0.2,
        type: 'spring',
        stiffness: 200,
      },
    }),
  };

  return (
    <>
      <div className="flex flex-wrap gap-2 mt-1">
        {[
          { label: 'UM', active: um, variant: 'um' as const },
          { label: 'UC', active: uc, variant: 'uc' as const },
          { label: 'UMS', active: ums, variant: 'ums' as const },
          { label: 'BL', active: bl, variant: 'bl' as const },
          { label: 'AVIEXP', active: aviexp, variant: 'aviexp' as const },
        ].map((status, index) => (
          <motion.div
            key={status.label}
            variants={badgeVariants}
            initial="initial"
            animate="animate"
            custom={index}
          >
            <Badge
              variant={status.active ? status.variant : 'outline'}
              className={
                status.active
                  ? ''
                  : 'text-secondary-foreground/40 dark:text-gray-500 border-subMain dark:border-border'
              }
            >
              {status.label}
            </Badge>
          </motion.div>
        ))}

        {comment && (
          <motion.div
            variants={badgeVariants}
            initial="initial"
            animate="animate"
            custom={5}
          >
            <Badge
              variant="info"
              className="cursor-pointer"
              onClick={() => setIsCommentModalOpen(true)}
            >
              <MessageCircle className="h-3 w-3 mr-1" />
              Commentaire
            </Badge>
          </motion.div>
        )}
      </div>

      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        title={title}
        comment={comment || ''}
      />
    </>
  );
};

export default StatusBadges;
