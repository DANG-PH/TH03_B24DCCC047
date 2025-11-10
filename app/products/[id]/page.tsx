'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useProductContext } from '@/context/ProductContext';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { getProductById, deleteProduct } = useProductContext();
  
  const productId = parseInt(params.id as string);
  const product = getProductById(productId);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Không tìm thấy sản phẩm</h2>
          <p className="text-gray-600 mb-6">Sản phẩm bạn đang tìm không tồn tại hoặc đã bị xóa.</p>
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
      deleteProduct(product.id);
      router.push('/');
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
          ← Quay lại danh sách
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Hiển thị ảnh sản phẩm hoặc emoji nếu không có ảnh */}
          <div className="h-96 bg-gray-50 flex items-center justify-center">
            {product.img_url ? (
              <img
                src={product.img_url}
                alt={product.ten}
                className="object-contain h-full w-full"
              />
            ) : (
              <span className="text-9xl">{getCategoryIcon(product.danhMuc)}</span>
            )}
          </div>

          <div className="p-8 flex flex-col justify-between">
            <div>
              <span
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getCategoryColor(
                  product.danhMuc
                )}`}
              >
                {getCategoryIcon(product.danhMuc)} {product.danhMuc}
              </span>

              <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-4">
                {product.ten}
              </h1>

              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-1">Giá bán</p>
                <p className="text-4xl font-bold text-blue-600">
                  {product.gia.toLocaleString('vi-VN')}₫
                </p>
              </div>

              <div className="mb-6 flex items-center space-x-2">
                <p className="text-gray-600">Số lượng còn lại:</p>
                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                  {product.soLuong} sản phẩm
                </span>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Mô tả sản phẩm</h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.moTa || 'Chưa có mô tả cho sản phẩm này.'}
                </p>
              </div>

              <div className="text-sm text-gray-500">Mã sản phẩm: #{product.id}</div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <Link
                href={`/edit/${product.id}`}
                className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors text-center font-medium"
              >
                ✏️ Chỉnh sửa
              </Link>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                🗑️ Xóa sản phẩm
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Thông tin chi tiết</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="text-sm text-gray-600">Danh mục</p>
            <p className="text-lg font-semibold text-gray-900">{product.danhMuc}</p>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <p className="text-sm text-gray-600">Giá trị tồn kho</p>
            <p className="text-lg font-semibold text-gray-900">
              {(product.gia * product.soLuong).toLocaleString('vi-VN')}₫
            </p>
          </div>
          <div className="border-l-4 border-purple-500 pl-4">
            <p className="text-sm text-gray-600">Đơn giá</p>
            <p className="text-lg font-semibold text-gray-900">
              {product.gia.toLocaleString('vi-VN')}₫
            </p>
          </div>
          <div className="border-l-4 border-orange-500 pl-4">
            <p className="text-sm text-gray-600">Tồn kho</p>
            <p className="text-lg font-semibold text-gray-900">
              {product.soLuong} sản phẩm
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
