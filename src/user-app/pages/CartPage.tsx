import React, { useEffect, useRef, useState } from 'react';
import { useCart } from '../context/CartProvider';

interface CartItem {
  bookId: number;
  bookTitle: string;
  price: string; // asumsi harga string, parse ke number saat hitung total
  quantity: number;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  const { cart, removeFromCart, updateQuantity } = useCart();
  const debounceTimeout = useRef<number | null>(null);

  // Sync cartItems dan hitung total awal setiap cart berubah
  useEffect(() => {
    setCartItems(cart);
    const initialTotal = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
    setTotal(initialTotal);
  }, [cart]);

  const handleQuantityChange = (id: number, amount: number) => {
    const newCartItems = cartItems.map((item) => {
      if (item.bookId === id) {
        const newQty = Math.max(item.quantity + amount, 1);
        return { ...item, quantity: newQty };
      }
      return item;
    });

    // Hitung perubahan total secara incremental
    const oldItem = cartItems.find((item) => item.bookId === id);
    const updatedItem = newCartItems.find((item) => item.bookId === id);

    if (oldItem && updatedItem) {
      const oldTotalItem = Number(oldItem.price) * oldItem.quantity;
      const newTotalItem = Number(updatedItem.price) * updatedItem.quantity;
      const diff = newTotalItem - oldTotalItem;
      setTotal((prev) => prev + diff);
    }

    setCartItems(newCartItems);

    // Debounce update ke backend
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = window.setTimeout(() => {
      updateQuantity(id, updatedItem?.quantity ?? 1);
    }, 500);
  };

  const handleRemove = (id: number) => {
    const removedItem = cartItems.find((item) => item.bookId === id);
    if (removedItem) {
      const itemTotal = Number(removedItem.price) * removedItem.quantity;
      setTotal((prev) => prev - itemTotal);
    }
    removeFromCart(id);
    setCartItems((prev) => prev.filter((item) => item.bookId !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.bookId}
                className="flex items-center justify-between bg-white shadow p-4 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src=""
                    alt={item.bookTitle}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h2 className="font-semibold">{item.bookTitle}</h2>
                    <p className="text-sm text-gray-600">
                      Rp {Number(item.price).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    className="px-2 py-1 text-white bg-gray-600 rounded"
                    onClick={() => handleQuantityChange(item.bookId, -1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="px-2 py-1 text-white bg-gray-600 rounded"
                    onClick={() => handleQuantityChange(item.bookId, 1)}
                  >
                    +
                  </button>
                  <button
                    className="ml-4 text-red-500 hover:underline"
                    onClick={() => handleRemove(item.bookId)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-right">
            <p className="text-lg font-bold">
              Total: Rp {total.toLocaleString()}
            </p>
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;