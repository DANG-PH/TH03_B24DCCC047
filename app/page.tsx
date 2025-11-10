// src/app/page.tsx

'use client';

import React, { useState, useMemo } from 'react';
import { useProductContext } from '@/context/ProductContext';
import ProductList from '@/components/ProductList';
import SearchBar from '@/components/SearchBar';
import Filter from '@/components/Filter';
import Pagination from '@/components/Pagination';
import { DanhMuc } from '@/types/product';

const ITEMS_PER_PAGE = 6;

export default function HomePage() {
  const { state, deleteProduct } = useProductContext();
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DanhMuc | 'Tất cả'>('Tất cả');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    return state.products.filter(product => {
      const matchesSearch = product.ten
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === 'Tất cả' || 
        product.danhMuc === selectedCategory;

      const productPrice = product.gia;
      const min = minPrice ? parseFloat(minPrice) : 0;
      const max = maxPrice ? parseFloat(maxPrice) : Infinity;
      const matchesPrice = productPrice >= min && productPrice <= max;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [state.products, searchTerm, selectedCategory, minPrice, maxPrice]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, minPrice, maxPrice]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('Tất cả');
    setMinPrice('');
    setMaxPrice('');
    setCurrentPage(1);
  };

  const handleDelete = (id: number) => {
    deleteProduct(id);
    if (currentProducts.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          📦 Danh Sách Sản Phẩm
        </h1>
        <p className="text-gray-600">
          Quản lý và tìm kiếm sản phẩm của bạn
        </p>
      </div>

      <div className="mb-6">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="sticky top-4">
            <Filter
              selectedCategory={selectedCategory}
              minPrice={minPrice}
              maxPrice={maxPrice}
              onCategoryChange={setSelectedCategory}
              onMinPriceChange={setMinPrice}
              onMaxPriceChange={setMaxPrice}
              onResetFilters={handleResetFilters}
            />
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-gray-700">
              Hiển thị{' '}
              <span className="font-semibold text-blue-600">
                {filteredProducts.length}
              </span>{' '}
              sản phẩm
              {searchTerm && ` cho "${searchTerm}"`}
              {selectedCategory !== 'Tất cả' && ` trong danh mục "${selectedCategory}"`}
            </p>
          </div>

          <ProductList
            products={currentProducts}
            onDelete={handleDelete}
          />

          {/* Pagination */}
          {filteredProducts.length > 0 && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalProducts={filteredProducts.length}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}