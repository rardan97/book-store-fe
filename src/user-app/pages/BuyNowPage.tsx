import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export interface Book {
  bookId: number;
  bookTitle: string;
  author: string;
  description: string;
  price: string;
  coverUrl: string;
  quantity: number;
}

interface Item {
  bookId: number;
  bookTitle: string;
  price: string; // asumsi harga string
  quantity: number;
}

const BuyNowPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);

 
  
  const handleProceedToCheckout = (book : Book) => {

    if (!book) return;
    const newCategory: Item = {
                        bookId:book.bookId,
                        bookTitle:book.bookTitle,
                        price:book.price,
                        quantity:book.quantity,
                    };

    navigate("/checkout", { state: { items: [newCategory] } });
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Set book from location.state
  useEffect(() => {
    const state = location.state as Book | undefined;
    if (state) {
      setBook(state);
    } else {
      navigate("/", { replace: true }); // Redirect to home if no book data
    }
  }, [location.state, navigate]);

  const handleQuantityChange = (amount: number) => {
    if (!book) return;

    const updatedQuantity = Math.max(book.quantity + amount, 1); // prevent < 1
    setBook({ ...book, quantity: updatedQuantity });
  };

 

  if (!book) return null;

  return (
    // <div className="min-h-screen bg-gradient-to-br py-12 px-6 flex justify-center">
    //  <div className="max-w-4xl py-10 px-4 flex justify-center">
    <div className="max-w-4xl mx-auto p-4 bg-gradient-to-br py-12 px-6 flex justify-center">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl p-6 sm:p-8 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-indigo-800 text-center">Detail Pembelian</h2>

        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={book.coverUrl}
            alt={book.bookTitle}
            className="w-full md:w-40 h-auto object-cover rounded-lg shadow-md"
          />
          <div className="flex-1 text-left space-y-2">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">{book.bookTitle}</h1>
            <p className="text-gray-600 text-sm sm:text-base">by {book.author}</p>
            <p className="text-gray-600 text-sm sm:text-base">{book.description}</p>
            <p className="text-indigo-700 text-lg font-semibold">
                    Rp {Number(book.price).toLocaleString()}
                  </p>
            {/* <p className="text-indigo-700 text-lg font-semibold">${book.price.toLocaleString()}</p> */}

            <div className="flex items-center gap-2 mt-3">
              <button
                className="px-3 py-1 bg-gray-600 text-white rounded"
                onClick={() => handleQuantityChange(-1)}
              >
                −
              </button>
              <span className="px-2 font-medium">{book.quantity}</span>
              <button
                className="px-3 py-1 bg-gray-600 text-white rounded"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-lg font-semibold border-t pt-4 text-gray-700">
          <span>Total</span>

          <span className="text-indigo-700 font-bold"> Rp {(Number(book.price) * book.quantity).toLocaleString()}</span>
        </div>

        <button
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
          onClick={() => handleProceedToCheckout(book)}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default BuyNowPage;