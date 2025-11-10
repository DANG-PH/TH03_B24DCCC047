'use client';

import React from 'react';
import { DanhMuc } from '@/types/product';

interface FilterProps {
  selectedCategory: DanhMuc | 'Tất cả';
  minPrice: string;
  maxPrice: string;
  onCategoryChange: (category: DanhMuc | 'Tất cả') => void;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onResetFilters: () => void;
}

const Filter: React.FC<FilterProps> = ({
  selectedCategory,
  minPrice,
  maxPrice,
  onCategoryChange,
  onMinPriceChange,
  onMaxPriceChange,
  onResetFilters
}) => {
  const categories: Array<DanhMuc | 'Tất cả'> = [
    'Tất cả',
    'Điện tử',
    'Quần áo',
    'Đồ ăn',
    'Sách',
    'Sưu tầm',
    'Phụ kiện',
    'Đồ chơi',
    'Đồ trang trí'
  ];

  const formatCurrency = (value: string) => {
    const number = value.replace(/\D/g, '');
    return number ? parseInt(number).toLocaleString('vi-VN') : '';
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    onMinPriceChange(value);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    onMaxPriceChange(value);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">🔍 Bộ Lọc</h3>
        <button
          onClick={onResetFilters}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Đặt lại
        </button>
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Danh mục
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value as DanhMuc | 'Tất cả')}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Khoảng giá (VNĐ)
        </label>
        <div className="space-y-3">
          <div>
            <input
              type="text"
              value={formatCurrency(minPrice)}
              onChange={handleMinPriceChange}
              placeholder="Giá tối thiểu"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>
          <div className="flex items-center justify-center">
            <span className="text-gray-500">—</span>
          </div>
          <div>
            <input
              type="text"
              value={formatCurrency(maxPrice)}
              onChange={handleMaxPriceChange}
              placeholder="Giá tối đa"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;