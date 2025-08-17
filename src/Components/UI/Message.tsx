type Prop = {
  role: 'user' | 'assitant';
  content: string;
};

const Message = ({ message }: Prop) => {
  
  return (
    <div className={`w-full flex ${message.role == 'user' && 'justify-end'}`}>
      <div
        className={`w-fit break-words text-sm sm:text-lg ${message.role == 'user' ? 'max-w-[85%] sm:max-w-[80%] md:max-w-[75%] rounded-xl p-2 bg-blue-100' : 'max-w-full'}`}
      >
        {message.content}
      </div>
    </div>
  );
};

export default Message;
