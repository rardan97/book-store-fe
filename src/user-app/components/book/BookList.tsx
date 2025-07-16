import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { getPublicListBooks } from "../../api/BookPublic";
import type { BooksPublic } from "../../interfaces/BooksPublic.interface";
import { useCart } from "../../context/CartProvider";
import { debounce } from "lodash";
import type { Books } from "../../../staff-app/interfaces/Book.interface";
import { useAuthUser } from "../../context/AuthProviderUser";



interface BooksPaymentList {
    bookId: number;
    bookTitle: string;
    author: string;
    description: string;
    price: string;
    quantity: number;
}



const BookList: React.FC = () => {

    const navigate = useNavigate();
    const hasFetched = useRef(false);
    const [books, setBooks] = useState<BooksPublic[]>([]);
    
    const getListAllBooks = useCallback(async (): Promise<void> => {
        
        try {
            const response = await getPublicListBooks(); 
            console.log("Success processing data");
            setBooks(response);
        } catch (error) {
            console.log("Failed processing data", error);
            throw error;
        }
    }, []);

    useEffect(() => {
        console.log(hasFetched);
        if (!hasFetched.current) {
            getListAllBooks();
            hasFetched.current = true; // Cegah request kedua
        }
    }, [getListAllBooks]);

    const { user } = useAuthUser(); // gunakan hook kamu
    const { addToCart } = useCart();

    const handleAddToCart = ((book: Books) => {
        if (!user) {
            navigate("/signin"); // arahkan ke halaman login
            return;
        }
        debouncedAddToCart(book); // jika sudah login, lanjutkan
    });

    const handleBuyDetail = ((book : Books) => {    
        const newBook: BooksPaymentList = {
            bookId: book.bookId,
            bookTitle: book.bookTitle,
            author: book.author,
            description: book.description,
            price: book.price,
            quantity: 1,
        };
        
        navigate("/buyNow", { state: newBook });
    });



    const debouncedAddToCart = debounce((book: Books) => {
        addToCart({
            bookId: book.bookId, 
            bookTitle: book.bookTitle, 
            price: book.price,
            quantity: 1 
        })
    }, 300);





    return (
        <section className="max-w-7xl mx-auto px-4 py-12 ">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Best Sellers</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {books.map((book) => (
            <div
                key={book.bookId}
                className="bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105 flex flex-col"
            >
                <img
                src=""
                alt={book.bookTitle}
                className="rounded-t-lg object-cover w-full h-64"
                loading="lazy"
                />
                <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{book.bookTitle}</h3>
                <p className="text-sm text-gray-600 mb-4">by {book.author}</p>
                <div className="mt-auto flex items-center justify-between">
                    <span className="text-xl font-bold text-indigo-600">${book.price}</span>
                </div>
                <div className="flex space-x-2 justify-center md:justify-start">
                  <button
                    className="bg-indigo-600 text-white px-4 py-1.5 rounded-md hover:bg-indigo-700 transition flex-1 md:flex-none text-sm"
                    aria-label={`Buy`}
                    onClick={() => handleBuyDetail(book)}
                  >
                    Buy Now
                  </button>
                  <button
                    className="bg-green-600 text-white px-4 py-1.5 rounded-md hover:bg-green-700 transition flex-1 md:flex-none text-sm"
                    aria-label={`Add to Cart`}
                    onClick={() => handleAddToCart(book)}
                  >
                    Add Cart
                  </button>
                </div>
                </div>
            </div>
            ))}
        </div>
        </section>
    );
};

export default BookList;