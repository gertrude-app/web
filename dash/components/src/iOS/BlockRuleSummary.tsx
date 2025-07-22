import React from 'react';
import type { Props as BlockRuleEditorProps } from './BlockRuleEditor';
import GradientIcon from '../GradientIcon';

export type Props = Omit<BlockRuleEditorProps, `emit`>;

const BlockRuleSummary: React.FC<Props> = ({ type, primaryValue, condition }) => {
  const hasMore = condition !== `always`;
  const icon = type === `app` ? `phone` : `globe`;
  const typeLabel = type === `app` ? `App` : `URL`;

  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full shadow-sm border transition-colors select-none gap-2
        bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300"
      style={{ minWidth: 0 }}
    >
      <GradientIcon icon={icon} size="small" className="mr-0.5" />
      <span className="text-sm uppercase tracking-wide font-semibold text-slate-500 mr-1">
        {typeLabel}
      </span>
      <span className="truncate max-w-[10em] font-mono text-base text-slate-800">
        {primaryValue}
      </span>
      {hasMore && (
        <span className="ml-1 w-2 h-2 rounded-full bg-violet-400 inline-block" />
      )}
    </span>
  );
};

export default BlockRuleSummary;
