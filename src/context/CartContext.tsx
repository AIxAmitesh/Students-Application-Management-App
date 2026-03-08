import React, { createContext, useContext, useState, useEffect } from 'react';
import { Course } from '../types';

interface CartItem extends Course {
  addedAt: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (course: Course) => void;
  removeFromCart: (courseId: number) => void;
  clearCart: () => void;
  isInCart: (courseId: number) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('application_cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to load cart from storage", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('application_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (course: Course) => {
    if (!items.some(item => item.id === course.id)) {
      setItems(prev => [...prev, { ...course, addedAt: new Date().toISOString() }]);
    }
  };

  const removeFromCart = (courseId: number) => {
    setItems(prev => prev.filter(item => item.id !== courseId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const isInCart = (courseId: number) => {
    return items.some(item => item.id === courseId);
  };

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, isInCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
