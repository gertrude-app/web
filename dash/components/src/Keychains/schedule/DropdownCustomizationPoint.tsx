import React, { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface DropdownCustomizationPointProps {
  text: React.ReactNode;
  children: React.ReactNode;
  isTouchDevice: boolean;
}

const DropdownCustomizationPoint: React.FC<DropdownCustomizationPointProps> = ({
  text,
  children,
  isTouchDevice,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  function handleClickOutside(event: MouseEvent): void {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener(`mousedown`, handleClickOutside);
    return () => document.removeEventListener(`mousedown`, handleClickOutside);
  });

  return (
    <div className="relative flex justify-center">
      <div
        ref={dropdownRef}
        onClick={(e) => e.stopPropagation()}
        className={cx(
          `absolute bg-white shadow-md px-4 py-3 rounded-lg top-8 flex flex-col w-max z-20 transition-[opacity,transform] duration-200`,
          !open && `opacity-0 -translate-y-4 pointer-events-none scale-y-90`,
        )}
      >
        {children}
      </div>
      <button
        className={cx(
          `font-medium flex items-center group py-0.5 rounded-lg active:scale-90 active:bg-slate-300 transition-[transform,background-color,margin,padding,box-shadow] duration-200 relative`,
          open
            ? `px-2 bg-white shadow-md pointer-events-none`
            : isTouchDevice
              ? `px-2 bg-slate-200/60`
              : `px-2 bg-slate-200/60 hover:bg-slate-200 min-[672px]:px-[3px] min-[672px]:hover:px-2 min-[672px]:bg-transparent min-[672px]:hover:bg-slate-200`,

          open && !isTouchDevice && `md:mx-4`,
        )}
        onClick={() => setOpen(!open)}
      >
        <span className="text-slate-700">{text}</span>
        <ChevronDownIcon
          className={cx(
            `shrink-0 transition-[width,margin-left,filter,transform] text-slate-400 duration-200`,
            open
              ? `w-4 ml-2 -rotate-180`
              : isTouchDevice
                ? `w-4 ml-2`
                : `w-4 ml-2 min-[672px]:w-0 min-[672px]:ml-0 min-[672px]:group-hover:w-4 min-[672px]:group-hover:ml-2`,
          )}
          strokeWidth={2.5}
        />
      </button>
    </div>
  );
};

export default DropdownCustomizationPoint;
