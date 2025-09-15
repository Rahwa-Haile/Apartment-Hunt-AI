import { useState, useEffect, useRef, useCallback } from 'react';
import Messages from '../UI/Messages';

import Sidebar from '../UI/Sidebar';

const Chat = () => {
  type Message = {
    role: 'user' | 'assistant';
    content: string;
  };

  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textAreaElement = useRef<HTMLTextAreaElement>(null);
  const messagesElement = useRef<HTMLDivElement>(null);

  const resize = useCallback(() => {
    const textArea = textAreaElement.current;
    const messages = messagesElement.current;

    if (textArea) {
      textArea.style.height = 'auto';
      textArea.style.height = textArea.scrollHeight + 'px';
    }
    if (textArea && messages) {
      const navbarHeight = 64;
      let buttonHeight = 4;
      let edgePadding = 16;
      let elementsGap = 8;
      let textareaHeight = Math.min(textArea.scrollHeight, 100);
      let marginHeight = 9.33;

      if (window.innerWidth >= 640) {
        buttonHeight = input.trim() ? 36 : 0;
        edgePadding = 16;
        elementsGap = 12;
        textareaHeight = Math.min(textArea.scrollHeight, 150);
        marginHeight = 17.33;
      }
      if (window.innerWidth >= 768) {
        buttonHeight = input.trim() ? 36 : 0;
        edgePadding = 16;
        elementsGap = 16;
        textareaHeight = Math.min(textArea.scrollHeight, 150);
        marginHeight = 25.33;
      }

      messages.style.maxHeight = `calc(100vh - ${navbarHeight + buttonHeight + edgePadding + elementsGap + textareaHeight + marginHeight}px)`;
    }
  }, [input]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    resize();
  }, [messages, resize]);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // resize();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    resize();
  }, [input, windowWidth, resize]);

  const sendMessage = () => {
    setMessages((prev: Message[]) => [
      ...prev,
      { role: 'user', content: input },
    ]);
    setIsStreaming(true);
    getMessage(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      e.key === 'Enter' &&
      !e.shiftKey &&
      e.currentTarget.value.trim() &&
      !isStreaming
    ) {
      e.preventDefault();
      sendMessage();
    }
  };

  const streamMessage = async (
    input: string,
    onDelta: (text: string) => void
  ) => {
    const response = await fetch('https://apartment-hunt-ai.onrender.com/gpt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: 'user', content: input }),
    });

    if (!response.body) {
      throw new Error('no response body');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let chunk: string = '';
    let parts: string[] = [];
    let text: string = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      chunk = decoder.decode(value, { stream: true });
      parts = chunk.split('\n\n');
      for (const part of parts) {
        if (part.startsWith('data: ')) {
          text = part.slice(6);
          onDelta(text);
        }
      }
    }
  };

  const getMessage = async (input: string) => {
    try {
      let assistantMessage: string = '';
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: assistantMessage },
      ]);
      await streamMessage(input, (chunk) => {
        console.log(chunk);
        assistantMessage += chunk;
        setMessages((prev) => {
          const updated: Message[] = [...prev];
          updated[updated.length - 1].content = assistantMessage;
          return updated;
        });
      });
      setIsStreaming(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full flex justify-end">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div
        className={`flex flex-col h-screen justify-center items-center p-4 w-[calc(100%-48px)] sm:w-[calc(100%-56px)] md:w-[calc(100%-64px)] ${isOpen && 'pointer-events-none md:pointer-events-auto md:w-[calc(100%-256px)]'}`}
      >
        <div
          className={`w-full flex flex-col flex-1 items-center space-y-2 sm:space-y-3 md:space-y-4 ${messages.length == 0 ? 'justify-center' : 'justify-end'}`}
        >
          {messages.length > 0 && (
            <div
              className="flex flex-col-reverse overflow-y-auto your-scroll-container w-full items-center"
              ref={messagesElement}
            >
              <div ref={messagesEndRef} className="w-full h-10"></div>
              <Messages messages={messages} />
            </div>
          )}

          {messages.length == 0 && (
            <div className="max-w-full">
              <p className="text-2xl sm:text-3xl md:text-4xl whitespace-nowrap">
                Ready when you are...
              </p>
            </div>
          )}

          <div className="w-full flex justify-center items-center ">
            <div className="flex sm:flex-col rounded-xl border border-gray-300 p-1 sm:p-2 md:p-3 w-full max-w-3xl">
              <textarea
                name=""
                id=""
                rows={1}
                className="w-full text-sm sm:text-lg focus:outline-none resize-none max-h-[100px] sm:max-h-[150px] your-scroll-container"
                placeholder="Type anything..."
                ref={textAreaElement}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              ></textarea>

              <div className="flex items-end sm:justify-end">
                {input.trim() && !isStreaming && (
                  <button
                    className="text-xl sm:text-2xl text-white rounded-full bg-blue-500 aspect-square  h-8 sm:h-9"
                    onClick={sendMessage}
                  >
                    ↑
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
