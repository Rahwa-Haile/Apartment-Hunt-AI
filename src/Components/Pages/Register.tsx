import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../UI/Button';
import Input from '../UI/Input';
import { FcGoogle } from 'react-icons/fc';

const Signup = () => {
  type FormData = {
    name: string;
    email: string;
    password: string;
  };
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // TODO: send to backend API
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-3 sm:px-0">
      <div className="w-full max-w-md flex flex-col items-center bg-white p-8 rounded-2xl shadow-lg">
        <Button to={'/Apartment-Hunt-AI'} variant={'white'}>
          <span className="flex items-center space-x-3">
            <span className="text-2xl">
              <FcGoogle />
            </span>
            <span>Continue with Google</span>
          </span>
        </Button>
        <p className="text-md sm:text-lg md:text-xl m-5">OR</p>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <Input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {formData.email && (
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          )}

          <div className="w-full">
            <Button variant={'blue'}>Sign up</Button>
          </div>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{' '}
          <Link
            to="/Apartment-Hunt-AI"
            className="text-blue-600 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
