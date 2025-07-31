import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="shadow ">
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
            <Link
              to="/Apartment-Hunt-AI"
              type="button"
              className="bg-blue-500 hover:bg-blue-400 active:bg-blue-300 text-white text-sm sm:text-md md:text-lg font-semibold py-1 px-2 sm:py-1.5 sm:px-3 md:py-2 md:px-4 rounded shadow-md hover:shadow-lg active:shadow-inner transition-all duration-150 ease-in-out"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
