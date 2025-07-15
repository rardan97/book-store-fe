import BookBestSellers from "../components/book/BookBestSellers";
// import BookCard from "../components/book/BookCard";
import BookFavorites from "../components/book/BookFavorites";
import BookList from "../components/book/BookList";
import CategoryBook from "../components/book/CategoryBook";
import HeroSection from "../components/book/HeroSection";


export default function Home() {
    return (
        <>
        <div>
            <HeroSection />
            <CategoryBook />
            <BookBestSellers />
            <BookFavorites />
            <BookList />
        </div>
        </>
    );
}
