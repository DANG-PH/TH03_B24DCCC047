'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useProductContext } from '@/context/ProductContext';
import ProductForm from '@/components/ProductForm';
import { Product } from '@/types/product';

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const { getProductById, updateProduct } = useProductContext();
  
  const productId = parseInt(params.id as string);
  const product = getProductById(productId);

  const handleSubmit = (updatedProduct: Product) => {
    updateProduct(updatedProduct);
  };

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Không tìm thấy sản phẩm
          </h2>
          <p className="text-gray-600 mb-6">
            Sản phẩm bạn muốn chỉnh sửa không tồn tại hoặc đã bị xóa.
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium"
          >
            ← Quay lại trang chủ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 flex items-center space-x-2 text-sm">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Danh sách
        </Link>
        <span className="text-gray-400">/</span>
        <Link
          href={`/products/${product.id}`}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Chi tiết
        </Link>
        <span className="text-gray-400">/</span>
        <span className="text-gray-600">Chỉnh sửa</span>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          ✏️ Chỉnh Sửa Sản Phẩm
        </h1>
        <p className="text-gray-600">
          Cập nhật thông tin cho: <span className="font-semibold">{product.ten}</span>
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <ProductForm 
          initialData={product}
          onSubmit={handleSubmit}
          isEdit={true}
        />
      </div>

      <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          📋 Thông tin hiện tại:
        </h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-gray-600">Mã SP:</span>
            <span className="ml-2 font-medium text-gray-900">#{product.id}</span>
          </div>
          <div>
            <span className="text-gray-600">Danh mục:</span>
            <span className="ml-2 font-medium text-gray-900">{product.danhMuc}</span>
          </div>
          <div>
            <span className="text-gray-600">Giá:</span>
            <span className="ml-2 font-medium text-gray-900">
              {product.gia.toLocaleString('vi-VN')}₫
            </span>
          </div>
          <div>
            <span className="text-gray-600">Số lượng:</span>
            <span className="ml-2 font-medium text-gray-900">{product.soLuong}</span>
          </div>
        </div>
      </div>
    </div>
  );
}