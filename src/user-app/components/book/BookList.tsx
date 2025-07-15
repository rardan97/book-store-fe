import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { getPublicListBooks } from "../../api/BookPublic";
import type { BooksPublic } from "../../interfaces/BooksPublic.interface";


// interface Book {
//   id: number;
//   title: string;
//   author: string;
//   price: string;
//   coverUrl: string;
// }

// const bestSellers: Book[] = [
//   {
//     id: 1,
//     title: "The Midnight Library",
//     author: "Matt Haig",
//     price: "$14.99",
//     coverUrl: "https://source.unsplash.com/200x300/?book,library",
//   },
//   {
//     id: 2,
//     title: "Atomic Habits",
//     author: "James Clear",
//     price: "$19.99",
//     coverUrl: "https://source.unsplash.com/200x300/?book,habits",
//   },
//   {
//     id: 3,
//     title: "Where the Crawdads Sing",
//     author: "Delia Owens",
//     price: "$16.99",
//     coverUrl: "https://source.unsplash.com/200x300/?book,nature",
//   },
//   {
//     id: 4,
//     title: "Becoming",
//     author: "Michelle Obama",
//     price: "$22.99",
//     coverUrl: "https://source.unsplash.com/200x300/?book,biography",
//   },
//   {
//     id: 5,
//     title: "Becoming",
//     author: "Michelle Obama",
//     price: "$22.99",
//     coverUrl: "https://source.unsplash.com/200x300/?book,biography",
//   },
//   {
//     id: 6,
//     title: "Becoming",
//     author: "Michelle Obama",
//     price: "$22.99",
//     coverUrl: "https://source.unsplash.com/200x300/?book,biography",
//   },
//   {
//     id: 7,
//     title: "Becoming",
//     author: "Michelle Obama",
//     price: "$22.99",
//     coverUrl: "https://source.unsplash.com/200x300/?book,biography",
//   },
//   {
//     id: 8,
//     title: "Becoming",
//     author: "Michelle Obama",
//     price: "$22.99",
//     coverUrl: "https://source.unsplash.com/200x300/?book,biography",
//   },
// ];



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
                    <button
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                    aria-label={`Buy ${book.bookTitle}`}
                    onClick={() => navigate("/buynow", { state: book })}
                    >
                    Buy Now
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