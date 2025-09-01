import { useState } from 'react';
import ChatButton from './ChatButton';

type Prop = {
  handleShowModal: (
    modalType: '' | 'delete' | 'search',
    index?: number
  ) => void;
};
const ChatList = ({ handleShowModal }: Prop) => {
  const [isSelected, setIsSelected] = useState<number | null>(null);

  // const handleDelete = (index: number) => {
  //   console.log('delete chat', index);
  // };
  const handleSelect = (index: number) => {
    setIsSelected(index);
  };
  return (
    <div className="w-full">
      <p className="text-md m-2">Chats</p>
      {Array.from({ length: 15 }).map((_, index) => {
        return (
          <ChatButton
            key={index}
            text={
              'HIIIIIIIIjhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh'
            }
            index={index}
            isSelected={isSelected === index}
            onSelect={() => handleSelect(index)}
            handleShowModal={handleShowModal}
          />
        );
      })}
    </div>
  );
};

export default ChatList;
