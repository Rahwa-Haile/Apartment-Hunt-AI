import Navbar from '../Layout/Navbar';
import Input from '../UI/Input';

const Chat = () => {
  return (
    <div className="flex flex-col h-screen w-full justify-center items-center p-2 sm:p-4">
      <Navbar />
      <Input />
    </div>
  );
};

export default Chat;
