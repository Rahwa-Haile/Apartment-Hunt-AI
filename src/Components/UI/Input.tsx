import { useEffect, useRef, useState } from 'react';

const Input = () => {
  type Message = {
    role: 'user' | 'assistant';
    content: string;
  };
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    console.log(messages);
    resizeTextArea();
  }, [messages]);

  const textAreaElement = useRef<HTMLTextAreaElement>(null);

  const resizeTextArea = () => {
    const textArea = textAreaElement.current;
    if (textArea) {
      textArea.style.height = 'auto';
      textArea.style.height = textArea.scrollHeight + 'px';
    }
  };

  const sendMessage = () => {
    setMessages((prev) => [...prev, { role: 'user', content: input }]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && e.target.value.trim()) {
      e.preventDefault();
      sendMessage();
    }
  };
  return (
    <div
      className={`w-full flex flex-col flex-1 items-center space-y-4 ${messages.length == 0 ? 'justify-center' : 'justify-end'}`}
    >
      <div className="max-w-full">
        {messages.length == 0 && (
          <p className="text-2xl sm:text-3xl md:text-4xl whitespace-nowrap">
            Ready when you are...
          </p>
        )}
      </div>

      <div className="w-full flex flex-col justify-center items-center">
        <div className="rounded-xl border border-gray-300 p-1 sm:p-2 md:p-3 w-full max-w-3xl">
          <textarea
            name=""
            id=""
            rows={1}
            className="w-full text-sm sm:text-lg focus:outline-none resize-none max-h-[150px] sm:max-h-[100px]"
            placeholder="Type anything..."
            ref={textAreaElement}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onInput={() => resizeTextArea()}
            onKeyDown={handleKeyDown}
          ></textarea>

          <div className="flex justify-end h-8 sm:h-9">
            {input.trim() && (
              <button
                className="text-xl sm:text-2xl text-white rounded-full bg-blue-500 aspect-square max-h-full"
                onClick={sendMessage}
              >
                ↑
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Input;
