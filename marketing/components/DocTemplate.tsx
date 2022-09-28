import React from 'react';

interface Props {
  title: string;
  children: React.ReactNode;
}

const DocTemplate: React.FC<Props> = ({ title, children }) => (
  <div className="p-12 flex flex-col items-center">
    <div className="flex flex-col">
      <h1 className="text-4xl font-extrabold mb-8">{title}</h1>
      <div className="prose prose-stone prose-p:text-justify">{children}</div>
    </div>
  </div>
);

export default DocTemplate;
