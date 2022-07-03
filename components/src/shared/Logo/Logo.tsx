// TODO: add story

import React from 'react';

interface Props {
  className?: string;
  noText?: boolean;
}

const Logo: React.FC<Props> = ({ className, noText }) => {
  return (
    <div className={`flex items-center justify-start ${className}`}>
      <svg height="40" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2.95086 22.3525C0.216576 19.6194 0.216574 15.1883 2.95086 12.4552L12.4617 2.94862C15.196 0.215571 19.6292 0.215571 22.3635 2.94862L32.0667 12.6475C34.801 15.3806 34.801 19.8117 32.0667 22.5448L22.5558 32.0514C19.8215 34.7844 15.3884 34.7844 12.6541 32.0514L2.95086 22.3525Z"
          fill="white"
        />
        <path
          d="M8.17925 18.3251C6.97568 16.4726 7.50214 13.9958 9.35513 12.793L16.465 8.17786C18.318 6.97506 20.7958 7.50174 21.9994 9.35423L26.6158 16.4597C27.8194 18.3122 27.2929 20.789 25.4399 21.9918L18.33 26.6069C16.477 27.8097 13.9992 27.283 12.7957 25.4305L8.17925 18.3251Z"
          fill="#8B5CF6"
        />
      </svg>
      <h1 className={`text-white text-4xl font-lato ml-2 ${noText ? `hidden` : `block`}`}>
        Gertrude
      </h1>
    </div>
  );
};

export default Logo;
