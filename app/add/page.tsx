'use client';

import React from 'react';
import Link from 'next/link';
import { useProductContext } from '@/context/ProductContext';
import ProductForm from '@/components/ProductForm';
import { Product } from '@/types/product';

export default function AddProductPage() {
  const { addProduct } = useProductContext();

  const handleSubmit = (product: Product) => {
    addProduct(product);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Quay lại danh sách
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          ➕ Thêm Sản Phẩm Mới
        </h1>
        <p className="text-gray-600">
          Điền thông tin sản phẩm vào form bên dưới
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <ProductForm onSubmit={handleSubmit} />
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">
          💡 Lưu ý khi thêm sản phẩm:
        </h3>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>Tên sản phẩm phải có ít nhất 3 ký tự</li>
          <li>Giá và số lượng phải là số dương</li>
          <li>Chọn đúng danh mục cho sản phẩm</li>
          <li>Mô tả chi tiết giúp khách hàng hiểu rõ hơn về sản phẩm</li>
        </ul>
      </div>
    </div>
  );
}