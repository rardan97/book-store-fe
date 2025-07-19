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
];

const CategoryBook: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Explore by Category</h2>

      {/* Desktop Grid */}
      <div className="hidden md:flex flex-wrap justify-center gap-8">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/category/${cat.name.toLowerCase()}`}
            className="bg-white w-40 h-45 rounded-lg shadow hover:shadow-lg hover:scale-105 transition-transform duration-300 p-4 flex flex-col items-center justify-center"
          >
            <img src={cat.iconUrl} alt={cat.name} className="w-16 h-16 rounded-full object-cover mb-3" />
            <span className="text-gray-700 font-medium">{cat.name}</span>
          </Link>
        ))}
      </div>

      {/* Mobile Grid */}
      <div className="grid grid-cols-2 gap-4 md:hidden justify-center">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/category/${cat.name.toLowerCase()}`}
            className="bg-white rounded-lg shadow hover:shadow-md hover:scale-105 transition-transform duration-300 p-4 h-36 flex flex-col items-center justify-center"
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