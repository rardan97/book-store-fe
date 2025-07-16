import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";




const BuyNowPage: React.FC = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit");


  const location = useLocation();
    const book = location.state as {
    id: number;
    title: string;
    author: string;
    price: number;
    coverUrl: string;
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Terima kasih, ${name}! Pembelian berhasil.`);
    // Simpan transaksi atau redirect jika perlu
  };

    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br  py-12 px-6 flex justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl w-full space-y-8">
        <h2 className="text-3xl font-bold text-indigo-800 text-center">Checkout</h2>

        {/* Book Preview */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src={book.coverUrl}
            alt={book.title}
            className="w-40 h-60 object-cover rounded-lg shadow-md"
          />
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-gray-800">{book.title}</h3>
            <p className="text-gray-600 mb-2">by {book.author}</p>
            {/* <p className="text-xl font-semibold text-indigo-700">${book.price.toFixed(2)}</p> */}
          </div>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Shipping Address</label>
            <textarea
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your full address"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="credit">Credit Card</option>
              <option value="bank">Bank Transfer</option>
              <option value="cod">Cash on Delivery</option>
            </select>
          </div>

          <div className="flex items-center justify-between text-gray-700 font-semibold text-lg">
            <span>Total</span>
            {/* <span className="text-indigo-700 font-bold">${book.price.toFixed(2)}</span> */}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-3 rounded-lg transition shadow-lg"
          >
            Confirm Purchase
          </button>
        </form>
      </div>
    </div>
  );
};

export default BuyNowPage;