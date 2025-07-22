import { PlusIcon } from '@heroicons/react/24/solid';
import { Button } from '@shared/components';
import React from 'react';
import type { Props as BlockRuleSummaryProps } from './BlockRuleSummary';
import EmptyState from '../EmptyState';
import { TrashBtn } from '../Forms';
import BlockRuleSummary from './BlockRuleSummary';

export type EditBlockRulesProps = {
  rules: Array<[UUID, BlockRuleSummaryProps]>;
  onDelete(id: UUID): unknown;
  onEdit(id: UUID): unknown;
  onAdd(): unknown;
  className?: string;
};

const EditBlockRules: React.FC<EditBlockRulesProps> = ({ rules, onAdd, className }) => (
  <div className={`flex flex-col gap-4 ${className ?? ``}`}>
    {rules.length === 0 ? (
      <EmptyState
        heading="No block rules"
        secondaryText="Let's make some"
        icon="globe"
        buttonText="Add block rule"
        action={onAdd}
      />
    ) : (
      <>
        <div className="flex flex-col gap-1">
          {rules.map(([id, rule], idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-2 px-2 py-1 rounded-lg group transition"
            >
              <BlockRuleSummary {...rule} />
              <TrashBtn onClick={() => {}} />
            </div>
          ))}
        </div>
        <Button
          type="button"
          onClick={onAdd}
          color="secondary"
          className="flex justify-center"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Block Rule
        </Button>
      </>
    )}
  </div>
);

export default EditBlockRules;
