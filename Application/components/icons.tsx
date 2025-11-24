
import React from 'react';

export const RefreshIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 4v5h5M20 20v-5h-5M20 4l-3.5 3.5M4 20l3.5-3.5M15 4h5v5M4 9V4h5"
    />
  </svg>
);

export const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={className}
        viewBox="0 0 24 24" 
        fill="currentColor"
    >
        <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.75.75V8.5h3.5a.75.75 0 010 1.5H9.75V13.5a.75.75 0 01-1.5 0V10H4.75a.75.75 0 010-1.5H8.25V5.25A.75.75 0 019 4.5z" clipRule="evenodd" />
        <path d="M7.163 15.063a.75.75 0 01.326 1.325l-1.215.39a.75.75 0 01-.966-.966l.39-1.215a.75.75 0 011.325.326zM5.938 18.25a.75.75 0 011.06 0l.662.662a.75.75 0 010 1.061l-.662.662a.75.75 0 11-1.06-1.06l.661-.662-.661-.662a.75.75 0 010-1.06zM13.5 15.75a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3a.75.75 0 01.75-.75zM16.438 18.25a.75.75 0 011.06 0l.662.662a.75.75 0 010 1.061l-.662.662a.75.75 0 11-1.06-1.06l.661-.662-.661-.662a.75.75 0 010-1.06zM18.837 15.063a.75.75 0 011.325-.326l.39 1.215a.75.75 0 01-.966.966l-1.215-.39a.75.75 0 01-.326-1.325zM18 10.5a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3a.75.75 0 01.75-.75z" />
    </svg>
);
