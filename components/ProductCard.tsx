'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  onDelete: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete }) => {
  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      'Điện tử': '📱',
      'Quần áo': '👕',
      'Đồ ăn': '🍔',
      'Sách': '📚',
      'Sưu tầm': '🏆',
      'Phụ kiện': '🎧',
      'Đồ chơi': '🧸',
      'Đồ trang trí': '🕯️',
    };
    return icons[category] || '📦';
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Điện tử': 'bg-blue-100 text-blue-800',
      'Quần áo': 'bg-purple-100 text-purple-800',
      'Đồ ăn': 'bg-orange-100 text-orange-800',
      'Sách': 'bg-green-100 text-green-800',
      'Sưu tầm': 'bg-yellow-100 text-yellow-800',
      'Phụ kiện': 'bg-pink-100 text-pink-800',
      'Đồ chơi': 'bg-teal-100 text-teal-800',
      'Đồ trang trí': 'bg-rose-100 text-rose-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const handleDelete = () => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${product.ten}"?`)) {
      onDelete(product.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Product Image */}
      <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
        {product.img_url ? (
          <img
            src={product.img_url}
            alt={product.ten}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <span className="text-6xl">{getCategoryIcon(product.danhMuc)}</span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5">
        {/* Category Badge */}
        <div className="mb-3">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(
              product.danhMuc
            )}`}
          >
            {getCategoryIcon(product.danhMuc)} {product.danhMuc}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
          {product.ten}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[2.5rem]">
          {product.moTa}
        </p>

        {/* Price and Quantity */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-2xl font-bold text-blue-600">
              {product.gia.toLocaleString('vi-VN')}₫
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Còn lại</p>
            <p className="text-lg font-semibold text-gray-800">
              {product.soLuong} sp
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Link
            href={`/products/${product.id}`}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center font-medium"
          >
            Chi tiết
          </Link>
          <Link
            href={`/edit/${product.id}`}
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-center font-medium"
          >
            Sửa SP
          </Link>
          <button
            onClick={handleDelete}
            className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;