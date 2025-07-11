import cx from 'classnames';
import React from 'react';
import type { Key as KeyType } from '@dash/types';
import Key from './KeyListKey';

type Props = {
  keys: KeyType[];
  editKey(id: UUID): unknown;
  deleteKey(id: UUID): unknown;
  viewMode: `list` | `table`;
};

const KeyList: React.FC<Props> = ({ keys, editKey, deleteKey, viewMode }) => (
  <div className="bg-slate-100 border border-slate-200 rounded-t-none border-t-0 rounded-3xl p-6 lg:p-8 flex flex-col">
    <div className={cx(viewMode === `table` && `xl:hidden`)}>
      {keys.map((key) => (
        <Key
          key={key.id}
          record={key}
          onClick={() => editKey(key.id)}
          onDelete={() => deleteKey(key.id)}
          type="list"
        />
      ))}
    </div>
    <div
      className={cx(
        viewMode === `table` && `xl:grid`,
        `hidden gap-2 [grid-template-columns:14%_26%_22%_20%_10%_3%]`,
      )}
    >
      <TableHeading>Key type</TableHeading>
      <TableHeading>Key target</TableHeading>
      <TableHeading>Key scope</TableHeading>
      <TableHeading>Comment</TableHeading>
      <div />
      <div />
      {keys.map((key) => (
        <Key
          key={key.id}
          record={key}
          onClick={() => editKey(key.id)}
          onDelete={() => deleteKey(key.id)}
          type="table"
        />
      ))}
    </div>
  </div>
);

export default KeyList;

interface TableHeadingProps {
  children: React.ReactNode;
  className?: string;
}

const TableHeading: React.FC<TableHeadingProps> = ({ children }) => (
  <div
    className={cx(`p-4 bg-white text-left rounded-lg border-[0.5px] border-slate-200`)}
  >
    <h4 className="font-bold text-slate-900">{children}</h4>
  </div>
);
