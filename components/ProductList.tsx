'use client';

import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types/product';

interface ProductListProps {
  products: Product[];
  onDelete: (id: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onDelete }) => {
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <div className="text-6xl mb-4">📦</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Không tìm thấy sản phẩm
        </h3>
        <p className="text-gray-600">
          Không có sản phẩm nào phù hợp với bộ lọc của bạn.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ProductList;