import { Link } from 'react-router-dom';
import Button from '../UI/Button';

const Navbar = () => {
  return (
    <nav className="shadow fixed top-0 left-0 w-full bg-white">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <Link
            to="/Apartment-Hunt-AI"
            className="text-md sm:text-lg md:text-xl font-bold text-gray-500 hover: hover:scale-105 active:scale-90 hover:opacity-90 active:opacity-80 transition-all duration-200 ease-in-out"
          >
            AptHunt
            <span className="text-blue-500">AI</span>
          </Link>
          <div className="">
            <Button
              to={'/Apartment-Hunt-AI'}
              children={'Sign in'}
              variant={'blue'}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
