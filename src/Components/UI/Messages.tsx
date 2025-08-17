import Message from '../UI/Message';

type Prop = {
  role: 'user' | 'assistant';
  content: string;
};

const Messages = ({ messages }: Prop[]) => {
  
  return (
    <div className="w-full max-w-3xl space-y-4 sm:space-y-5 md:space-y-6 py-4">
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
     
    </div>
  );
};

export default Messages;
