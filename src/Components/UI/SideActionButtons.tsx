import { CiSearch, CiEdit } from 'react-icons/ci';
import Button from './Button';

type Prop = {
  isOpen: boolean;
};

const SideActionButtons = ({ isOpen }: Prop) => {
  const actionButtons: { icon: React.ElementType; label: string }[] = [
    { icon: CiEdit, label: 'New Chat' },
    { icon: CiSearch, label: 'Search Chat' },
  ];

  return (
    <div className="w-full space-y-1">
      {actionButtons.map(({ icon: Icon, label }, index) => {
        return (
          <Button key={index} variant={'white'}>
            <div className="w-full flex items-center justify-start space-x-2">
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
