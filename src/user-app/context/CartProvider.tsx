import React, { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { useAuthUser } from "./AuthProviderUser";
import { addCart, clearCart, getCart, removeCart, updateCartQty } from "../api/Cart";

interface CartItem {
    bookId: number;
    bookTitle: string;
    price: string;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (productId: number) => void;
    clearFromCart: () => void;
    updateQuantity: (bookId: number, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user } = useAuthUser();
    const userId = user?.userId;
    const [cart, setCart] = useState<CartItem[]>([]);


    const fetchCart = useCallback(async () => {
        const token = localStorage.getItem("user_accessToken");
        if (!token || !userId) return;

        try {
            const result = await getCart(token, userId);
            setCart(result);
        } catch (error) {
            console.error("Fetch cart error", error);
        }
    }, [userId]);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);


    const addToCart = async (item: CartItem) => {
        const token = localStorage.getItem("user_accessToken");
        if (!token || !userId) return;
        try {
            await addCart(token, userId, item);
            fetchCart();
        } catch (error) {
            console.error("Add to cart error", error);
        }
    };

    const removeFromCart = async (bookId: number) => {
        const token = localStorage.getItem("user_accessToken");
         if (!token || !userId) return;
        try {
            await removeCart(token, userId, bookId);
            fetchCart();
        } catch (error) {
            console.error("Remove cart error", error);
        }
    };

    const clearFromCart = async () => {
        const token = localStorage.getItem("user_accessToken");
         if (!token || !userId) return;
        try {
            await clearCart(token, userId);
            setCart([]);
        } catch (error) {
            console.error("Clear cart error", error);
        }
    };

      // Fungsi baru untuk update quantity
  const updateQuantity = async (bookId: number, quantity: number) => {
    const token = localStorage.getItem("user_accessToken");
    if (!token || !userId) return;

     const prevCart = [...cart];

    // Update state lokal dulu supaya UI responsif
     setCart(prevCart.map(item => item.bookId === bookId ? { ...item, quantity } : item));

    try {
      await updateCartQty(token, userId, bookId, quantity); // pastikan API ini ada
      // Bisa panggil fetchCart() lagi kalau perlu sinkronisasi
    //    fetchCart();
    } catch (error) {
      console.error("Update quantity error", error);
      // Opsional: rollback state atau tampilkan notifikasi error
      setCart(prevCart);
    }
  };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearFromCart, updateQuantity}}>
            {children}
        </CartContext.Provider>
    );
};

// Hook custom untuk akses cart
export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};