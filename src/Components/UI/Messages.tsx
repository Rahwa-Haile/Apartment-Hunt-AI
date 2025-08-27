import Message from '../UI/Message';

type MessageType = {
  role: 'user' | 'assistant';
  content: string;
};

type Prop = {
  messages: MessageType[];
};

const Messages = ({ messages }: Prop) => {
  return (
    <div className="w-full max-w-3xl space-y-4 sm:space-y-5 md:space-y-6 py-4">
      {messages.map((msg: MessageType, index: number) => (
        <Message key={index} role={msg.role} content={msg.content} />
      ))}
    </div>
  );
};

export default Messages;
