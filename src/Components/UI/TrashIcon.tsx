import { CiTrash } from 'react-icons/ci';

type Prop = {
  index: number;
  onDelete: (index: number) => void;
};

const TrashIcon = ({ onDelete, index }: Prop) => {
  return (
    <div>
      <span
        className="opacity-0 group-hover:opacity-100 inline-block hover:shadow-lg hover:text-red-600 rounded-full transition-opacity duration-100 ease-in-out relative text-lg text-red-400 active:scale-95 active:shadow-md active:text-red-700"
        onClick={(e: React.MouseEvent<HTMLSpanElement>) => {
          e.stopPropagation();
          onDelete(index);
        }}
      >
        <CiTrash />
      </span>
      {/* {activeDropdownIndex == index && (
                        <div className="absolute w-24 bg-white shadow cursor-pointer rounded-xl p-2">
                          <div className="border-b border-gray-200 w-full text-gray-500 p-3 flex items-center justify-center space-x-1">
                            <span className="text-xl">
                              <CiEdit />
                            </span>
                            <span>Rename</span>
                          </div>
                          <div className="border-t border-gray-200 w-full text-red-500 p-3 flex items-center justify-center space-x-1">
                            <span className="text-xl">
                              <CiTrash />
                            </span>
                            <span>Delete</span>
                          </div>
                        </div>
                      )} */}
    </div>
  );
};

export default TrashIcon;
