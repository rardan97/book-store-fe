import React from "react";
import { Link } from "react-router-dom";

interface Category {
  id: number;
  name: string;
  iconUrl: string;
}

const categories: Category[] = [
  { id: 1, name: "Fiction", iconUrl: "https://source.unsplash.com/80x80/?fiction,book" },
  { id: 2, name: "Science", iconUrl: "https://source.unsplash.com/80x80/?science,book" },
  { id: 3, name: "History", iconUrl: "https://source.unsplash.com/80x80/?history,book" },
  { id: 4, name: "Fantasy", iconUrl: "https://source.unsplash.com/80x80/?fantasy,book" },
  { id: 5, name: "Romance", iconUrl: "https://source.unsplash.com/80x80/?romance,book" },
  { id: 6, name: "Mystery", iconUrl: "https://source.unsplash.com/80x80/?mystery,book" },
  { id: 7, name: "Biography", iconUrl: "https://source.unsplash.com/80x80/?biography,book" },
];

const CategoryBook: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Explore by Category</h2>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-4 lg:grid-cols-6 gap-6">
            {categories.map((cat) => (
            <Link
                key={cat.id}
                to={`/category/${cat.name.toLowerCase()}`}
                className="flex flex-col items-center text-center bg-white p-4 rounded-lg shadow hover:shadow-lg hover:scale-105 transition transform duration-300"
            >
                <img src={cat.iconUrl} alt={cat.name} className="w-16 h-16 rounded-full object-cover mb-3" />
                <span className="text-gray-700 font-medium">{cat.name}</span>
            </Link>
            ))}
        </div>

        {/* Mobile Scroll */}
        <div className="md:hidden flex space-x-4 overflow-x-auto mt-4 pb-2 scrollbar-thin scrollbar-thumb-gray-300">
            {categories.map((cat) => (
            <Link
                key={cat.id}
                to={`/category/${cat.name.toLowerCase()}`}
                className="flex-none w-28 flex flex-col items-center text-center bg-white p-3 rounded-lg shadow hover:shadow-md hover:scale-105 transition transform duration-300"
            >
                <img src={cat.iconUrl} alt={cat.name} className="w-14 h-14 rounded-full object-cover mb-2" />
                <span className="text-sm text-gray-700 font-medium">{cat.name}</span>
            </Link>
            ))}
        </div>
    </section>
  );
};

export default CategoryBook;
