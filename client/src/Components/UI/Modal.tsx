import { useState, useEffect, useRef } from 'react';
import Input from './Input';
import Button from './Button';

type Prop = {
  showModal: boolean;
  modalType: '' | 'delete' | 'search';
  toBeDeleted?: number | null;
  handleShowModal: (
    modalType: '' | 'delete' | 'search',
    index?: number
  ) => void;
};

const Modal = ({
  showModal,
  modalType,
  toBeDeleted,
  handleShowModal,
}: Prop) => {
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    const handleClick = (e: MouseEvent | TouchEvent) => {
      if (
        showModal &&
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      )
        handleShowModal(modalType);
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  });

  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleDeleteChat = () => {
    console.log(toBeDeleted + ' is deleted');
    handleShowModal(modalType);
  };
  const handleCancel = () => {
    handleShowModal(modalType);
  };
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50 p-4">
      <div
        className="max-w-xl w-full bg-white shadow cursor-pointer rounded-xl p-2"
        ref={modalRef}
      >
        {modalType == 'delete' && (
          <div className="w-full">
            {' '}
            <div className="border-b border-gray-200 w-full text-gray-500 p-3 flex items-center justify-center space-x-1">
              {`Are you sure you want to delete ${toBeDeleted}?`}
            </div>
            <div className="border-t border-gray-200 w-full text-red-500 p-3 flex items-center justify-center space-x-1">
              <Button variant="red" onClick={handleDeleteChat}>
                Delete
              </Button>
              <Button variant="white" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        )}
        {modalType == 'search' && (
          <div>
            <div className="w-full">
              <Input
                type={'text'}
                name={'search'}
                placeholder={'Search Chat'}
                value={searchValue}
                onChange={handleChange}
              />
            </div>
            <div className="w-full text-gray-500 p-3 flex flex-col space-y-1 overflow-y-auto your-scroll-container overflow-x-hidden max-h-64">
              {Array.from({ length: 20 }).map((_, index) => {
                return (
                  <Button variant="white" key={index}>
                    <div className="w-full flex flex-col">
                      <div className="w-full flex justify-start">
                        Hi {index}
                      </div>
                      <div className="w-full flex justify-start text-gray-400">
                        selected text
                      </div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
