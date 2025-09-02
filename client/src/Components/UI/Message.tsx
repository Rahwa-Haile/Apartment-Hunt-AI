type Prop = {
  role: 'user' | 'assistant';
  content: string;
};

const Message = ({ role, content }: Prop) => {
  return (
    <div className={`w-full flex ${role == 'user' && 'justify-end'}`}>
      <div
        className={`w-fit break-words text-sm sm:text-lg ${role == 'user' ? 'max-w-[85%] sm:max-w-[80%] md:max-w-[75%] rounded-xl p-2 bg-blue-100' : 'max-w-full'}`}
      >
        {content}
      </div>
    </div>
  );
};

export default Message;
