import type { Category } from "./Category.interface";

export interface Books {
    bookId: number;
    bookTitle: string;
    author: string;
    description: string;
    price: string;
    stock: number;
    category: Category;
}

export interface AddBooksDto {
    bookTitle: string;
    author: string;
    description: string;
    price: string;
    stock: number;
    categoryId: string;
}


export interface EditBookDto{
    bookId: number;
    bookTitle: string;
    author: string;
    description: string;
    price: string;
    stock: number;
    categoryId: string;
}