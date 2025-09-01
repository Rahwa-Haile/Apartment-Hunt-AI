import { CiSearch, CiEdit } from 'react-icons/ci';
import Button from './Button';
import type React from 'react';

type Prop = {
  isOpen: boolean;
  showModal: boolean;
  handleShowModal: (modalType: '' | 'delete' | 'search') => void;
};

const SideActionButtons = ({ isOpen, handleShowModal }: Prop) => {
  const actionButtons: {
    icon: React.ElementType;
    label: string;
    text: '' | 'search';
  }[] = [
    { icon: CiEdit, label: 'New Chat', text: '' },
    { icon: CiSearch, label: 'Search Chat', text: 'search' },
  ];

  const handleClick = (text: '' | 'search') => {
    console.log(text);
    if (text !== '') {
      handleShowModal(text);
    }
  };

  return (
    <div className="w-full space-y-1">
      {actionButtons.map(({ icon: Icon, label, text }, index) => {
        return (
          <Button key={index} variant={'white'}>
            <div
              className="w-full flex items-center justify-start space-x-2"
              onClick={() => handleClick(text)}
            >
              <span className="text-xl text-blue-500">
                <Icon />
              </span>
              {isOpen && <span>{label}</span>}
            </div>
          </Button>
        );
      })}
    </div>
  );
};

export default SideActionButtons;
