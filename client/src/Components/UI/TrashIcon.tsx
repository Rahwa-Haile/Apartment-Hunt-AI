import type React from 'react';
import { CiTrash } from 'react-icons/ci';

type Prop = {
  index: number;
  handleShowModal: (
    modalType: '' | 'delete' | 'search',
    index?: number
  ) => void;
};

const TrashIcon = ({ index, handleShowModal }: Prop) => {
  return (
    <div>
      <span
        className="opacity-0 group-hover:opacity-100 inline-block hover:shadow-lg hover:text-red-600 rounded-full transition-opacity duration-100 ease-in-out relative text-lg text-red-400 active:scale-95 active:shadow-md active:text-red-700"
        onClick={(e: React.MouseEvent<HTMLSpanElement>) => {
          e.stopPropagation();
          handleShowModal('delete', index);
        }}
      >
        <CiTrash />
      </span>
    </div>
  );
};

export default TrashIcon;
