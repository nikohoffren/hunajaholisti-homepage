import React from 'react';
import { Link } from 'react-router-dom';

const ShoppingCartIcon: React.FC = () => {
  return (
    <Link to="/cart" className="flex items-center space-x-1 text-gray-600 hover:text-gray-800">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 21h6m1-10h4l2-2v-4l-2-2h-3M5 15h2"
        />
      </svg>
      <span></span>
    </Link>
  );
};

export default ShoppingCartIcon;
