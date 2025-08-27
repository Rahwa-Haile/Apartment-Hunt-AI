import React from 'react';
import { Link } from 'react-router-dom';

type Prop = {
  to?: string;
  children: React.ReactNode;
  variant: 'blue' | 'white';
};

const styleClasses: Record<string, string> = {
  base: 'w-full block flex justify-center text-sm sm:text-md md:text-lg font-semibold py-1 px-2 sm:py-1.5 sm:px-3 md:py-2 md:px-4 rounded-xl',
  blue: 'bg-blue-500 hover:bg-blue-400 active:bg-blue-300 text-white shadow-md active:shadow-inner transition-all duration-150 ease-in-out',
  white: 'text-gray-500 border border-gray-200 hover:bg-blue-100',
};

const Button = ({ to, children, variant }: Prop) => {
  return (
    <div className="w-full">
      {to ? (
        <Link
          to={to}
          className={`${styleClasses.base} ${styleClasses[variant]}`}
        >
          {children}
        </Link>
      ) : (
        <button className={`${styleClasses.base} ${styleClasses[variant]}`}>
          {children}
        </button>
      )}
    </div>
  );
};

export default Button;
