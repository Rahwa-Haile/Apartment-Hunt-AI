import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Prop = {
  role: 'user' | 'assistant';
  content: string;
};

const Message = ({ role, content }: Prop) => {
  const isUser = role === 'user';

  return (
    <div className={`w-full flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`
          w-fit break-words text-sm sm:text-lg
          ${
            isUser
              ? 'max-w-[85%] sm:max-w-[80%] md:max-w-[75%] rounded-xl p-2 bg-blue-100'
              : 'max-w-full rounded-xl p-2 bg-gray-100'
          }
        `}
      >
        {isUser ? (
          content
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => <p className="mb-1">{children}</p>,
              ul: ({ children }) => (
                <ul className="list-disc ml-5 mb-1">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal ml-5 mb-1">{children}</ol>
              ),
              li: ({ children }) => <li className="mb-0.5">{children}</li>,
            }}
          >
            {content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
};

export default Message;
