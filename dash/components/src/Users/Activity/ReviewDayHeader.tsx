import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  date: Date;
  numItems: number;
  numDeleted: number;
}

const ReviewDayHeader: React.FC<Props> = ({ date, numItems, numDeleted }) => {
  return (
    <header className="flex items-center justify-between py-4 px-6 border-b-2 bg-white">
      <div className="flex items-center text-md sm:text-l">
        <Link
          to="../"
          className="flex items-center mr-4 text-gray-400 antialiased hover:text-gray-600 transition duration-75"
        >
          <i className="fa fa-chevron-left mr-2" aria-hidden /> Back
        </Link>
        <h1 className="font-medium text-gray-800">{date.toLocaleDateString()}</h1>
      </div>
      {numItems > 0 && (
        <div className="text-gray-700 self-end sm:self-center flex items-center space-x-0.5 sm:space-x-1">
          <span className="font-bold sm:text-lg">{numDeleted}</span>
          <span className="hidden sm:inline">out of</span>
          <span className="sm:hidden">/</span>
          <span className="font-bold sm:text-lg">{numDeleted + numItems}</span>
          <span className="hidden sm:inline">items reviewed</span>
        </div>
      )}
    </header>
  );
};

export default ReviewDayHeader;
