import { useState } from 'react';
import ChatButton from '../UI/ChatButton';
const ChatList = () => {
  const [isSelected, setIsSelected] = useState<number | null>(null);

  const handleDelete = (index: number) => {
    console.log('delete chat', index);
  };
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
            onDelete={() => handleDelete(index)}
          />
        );
      })}
    </div>
  );
};

export default ChatList;
