'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product, ProductAction, ProductState } from '@/types/product';
import { initialProducts } from '@/data/initialProducts';

interface ProductContextType {
  state: ProductState;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
  getProductById: (id: number) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const productReducer = (state: ProductState, action: ProductAction): ProductState => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload]
      };
    
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id ? action.payload : product
        )
      };
    
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload)
      };
    
    default:
      return state;
  }
};

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(productReducer, {
    products: initialProducts
  });

  const addProduct = (product: Product) => {
    dispatch({ type: 'ADD_PRODUCT', payload: product });
  };

  const updateProduct = (product: Product) => {
    dispatch({ type: 'UPDATE_PRODUCT', payload: product });
  };

  const deleteProduct = (id: number) => {
    dispatch({ type: 'DELETE_PRODUCT', payload: id });
  };

  const getProductById = (id: number): Product | undefined => {
    return state.products.find(product => product.id === id);
  };

  return (
    <ProductContext.Provider
      value={{
        state,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within ProductProvider');
  }
  return context;
};