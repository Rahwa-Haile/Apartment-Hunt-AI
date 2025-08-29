import { useEffect, useRef } from 'react';
import SideActionButtons from './SideActionButtons';
import ChatList from './ChatList';
import {
  TbLayoutSidebarRightCollapseFilled,
  TbLayoutSidebarLeftCollapseFilled,
} from 'react-icons/tb';

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const Sidebar = ({ isOpen, setIsOpen }: Props) => {
  const sideBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (
        isOpen &&
        sideBarRef.current &&
        !sideBarRef.current.contains(e.target as Node) &&
        window.innerWidth < 768
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`h-[calc(100vh-64px)] bg-gray-100 fixed left-0 bottom-0 transition-all duration-100 ease-in-out z-20 ${isOpen ? 'w-64' : 'w-12 sm:w-14 md:w-16'}`}
      ref={sideBarRef}
    >
      {/* top section */}
      <div
        className={`w-full h-16 text-2xl text-blue-500 flex items-center px-1 ${isOpen ? 'justify-end' : 'justify-center'}`}
      >
        <span className="cursor-ew-resize" onClick={handleToggle}>
          {isOpen ? (
            <TbLayoutSidebarLeftCollapseFilled />
          ) : (
            <TbLayoutSidebarRightCollapseFilled />
          )}
        </span>
      </div>

      {/* bottom section */}
      <div className="w-full flex flex-col items-center space-y-4 p-2 h-[calc(100vh-128px)] overflow-y-auto your-scroll-container">
        {/* icons section */}
        <SideActionButtons isOpen={isOpen} />
        {/* chat section */}
        {isOpen && <ChatList />}
      </div>
    </div>
  );
};

export default Sidebar;
