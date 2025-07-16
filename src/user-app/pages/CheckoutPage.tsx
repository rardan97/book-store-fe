import { useLocation } from "react-router-dom";

interface Item {
  bookId: number;
  bookTitle: string;
  price: string; // asumsi harga string
  quantity: number;
}

const CheckoutPage: React.FC = () => {
  const location = useLocation();
  const { items } = location.state as { items: Item[] };

  // Hitung total harga
  const totalPrice = items.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  return (
    // <div className="min-h-screen bg-gradient-to-br flex flex-col items-center py-12 px-6">
    <div className="max-w-4xl mx-auto p-4 bg-gradient-to-br py-12 px-6 flex justify-center">
      <div className="bg-white shadow-lg rounded-xl max-w-3xl w-full p-8">
        <h1 className="text-4xl font-extrabold text-indigo-900 mb-8 text-center">
          Checkout
        </h1>

        <div className="space-y-6">
          {items.map((item) => (
            <div
              key={item.bookId}
              className="flex items-center justify-between bg-indigo-50 rounded-lg p-4 shadow-sm"
            >
              <div>
                <h2 className="font-semibold text-indigo-800 text-lg">
                  {item.bookTitle}
                </h2>
                <p className="text-indigo-600">Quantity: {item.quantity}</p>
              </div>
              <div className="text-indigo-900 font-bold text-lg">
                Rp {(Number(item.price) * item.quantity).toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-indigo-300 pt-6 flex justify-between items-center">
          <span className="text-xl font-semibold text-indigo-900">Total:</span>
          <span className="text-2xl font-extrabold text-indigo-900">
            Rp {totalPrice.toLocaleString()}
          </span>
        </div>

        <button
          type="button"
          className="mt-10 w-full bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-4 rounded-lg shadow-lg transition duration-300"
          onClick={() => alert("Pembayaran berhasil! Terima kasih.")}
        >
          Confirm Purchase
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;