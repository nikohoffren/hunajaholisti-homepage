import React from "react";
import { Link } from "react-router-dom";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface ShoppingCartPageProps {
  cartItems: CartItem[];
  onQuantityChange: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

const ShoppingCartPage: React.FC<ShoppingCartPageProps> = ({
  cartItems,
  onQuantityChange,
  onRemoveItem,
}) => {
  const handleQuantityChange = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const quantity = parseInt(e.target.value, 10);
    onQuantityChange(id, quantity);
  };

  const handleRemoveItem = (id: number) => {
    onRemoveItem(id);
  };

  return (
    <>
      <div className="py-20"></div>
      <div className="container center mx-auto p-4">
        <h2 className="text-white text-3xl font-semibold mb-4">Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="border border-gray-300 rounded p-4"
              >
                <h2 className="text-xl font-semibold text-white">{item.name}</h2>
                <p className="text-xl text-gray-600 mb-2">${item.price}</p>
                <div className="flex items-center mb-4">
                  <label htmlFor={`quantity-${item.id}`} className="mr-2">
                    Quantity:
                  </label>
                  <input
                    id={`quantity-${item.id}`}
                    type="number"
                    min="1"
                    className="w-16 p-2 border border-gray-300 rounded"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, e)}
                  />
                </div>
                <button
                  className="text-red-500 hover:text-red-600"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="mt-4 text-right">
          <Link to="/checkout" className="text-blue-500 hover:text-blue-700 underline">
            Go to Checkout
          </Link>
        </div>
      </div>
    </>
  );
};

export default ShoppingCartPage;
