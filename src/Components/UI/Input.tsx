import React from 'react';

type Props = {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ type, name, placeholder, value, onChange }: Props) => {
  return (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-xl focus:ring-1 focus:ring-blue-500 outline-none text-sm sm:text-md md:text-lg font-semibold py-1 px-2 sm:py-1.5 sm:px-3 md:py-2 md:px-4"
      />
    </div>
  );
};

export default Input;
