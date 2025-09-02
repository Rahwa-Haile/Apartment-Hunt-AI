import Button from './Button';
import TrashIcon from './TrashIcon';

type ButtonProps = {
  index: number;
  text: string;
  isSelected: boolean;
  onSelect: (index: number) => void;

  handleShowModal: (
    modalType: '' | 'delete' | 'search',
    index?: number
  ) => void;
};

const ChatButton = ({
  index,
  text,
  isSelected,
  onSelect,

  handleShowModal,
}: ButtonProps) => {
  return (
    <div className="w-full space-y-1">
      <Button
        variant={isSelected ? 'blue' : 'white'}
        onClick={() => onSelect(index)}
      >
        <div className="w-full h-full flex justify-between items-center text-sm">
          <span className="truncate max-w-[85%]">{text}</span>
          <TrashIcon index={index} handleShowModal={handleShowModal} />
        </div>
      </Button>
    </div>
  );
};

export default ChatButton;
