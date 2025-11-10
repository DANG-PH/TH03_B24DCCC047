'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product, ProductFormData, FormErrors, DanhMuc } from '@/types/product';

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: Product) => void;
  isEdit?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ 
  initialData, 
  onSubmit, 
  isEdit = false 
}) => {
  const router = useRouter();
  
  const [formData, setFormData] = useState<ProductFormData>({
    ten: initialData?.ten || '',
    danhMuc: initialData?.danhMuc || '',
    gia: initialData?.gia.toString() || '',
    soLuong: initialData?.soLuong.toString() || '',
    moTa: initialData?.moTa || '',
    img_url: initialData?.img_url || '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories: DanhMuc[] = [
    'Điện tử', 'Quần áo', 'Đồ ăn', 'Sách', 
    'Sưu tầm', 'Phụ kiện', 'Đồ chơi', 'Đồ trang trí'
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.ten.trim()) newErrors.ten = 'Tên sản phẩm là bắt buộc';
    else if (formData.ten.trim().length < 3) newErrors.ten = 'Tên sản phẩm phải có ít nhất 3 ký tự';

    if (!formData.danhMuc) newErrors.danhMuc = 'Vui lòng chọn danh mục';

    if (!formData.gia) newErrors.gia = 'Giá sản phẩm là bắt buộc';
    else if (isNaN(parseFloat(formData.gia)) || parseFloat(formData.gia) <= 0)
      newErrors.gia = 'Giá phải là số dương';

    if (!formData.soLuong) newErrors.soLuong = 'Số lượng là bắt buộc';
    else if (isNaN(parseInt(formData.soLuong)) || parseInt(formData.soLuong) < 1)
      newErrors.soLuong = 'Số lượng phải là số nguyên dương';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const productData: Product = {
      id: initialData?.id || Date.now(),
      ten: formData.ten.trim(),
      danhMuc: formData.danhMuc as DanhMuc,
      gia: parseFloat(formData.gia),
      soLuong: parseInt(formData.soLuong),
      moTa: formData.moTa.trim(),
      img_url: formData.img_url.trim(),
    };

    onSubmit(productData);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/');
    }, 500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCancel = () => {
    if (window.confirm('Bạn có chắc chắn muốn hủy? Dữ liệu chưa lưu sẽ bị mất.')) {
      router.push('/');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Tên sản phẩm */}
      <div>
        <label htmlFor="ten" className="block text-sm font-medium text-gray-700 mb-2">
          Tên sản phẩm <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="ten"
          name="ten"
          value={formData.ten}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.ten ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Nhập tên sản phẩm"
        />
        {errors.ten && <p className="mt-1 text-sm text-red-600">{errors.ten}</p>}
      </div>

      {/* Danh mục */}
      <div>
        <label htmlFor="danhMuc" className="block text-sm font-medium text-gray-700 mb-2">
          Danh mục <span className="text-red-500">*</span>
        </label>
        <select
          id="danhMuc"
          name="danhMuc"
          value={formData.danhMuc}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.danhMuc ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">-- Chọn danh mục --</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.danhMuc && <p className="mt-1 text-sm text-red-600">{errors.danhMuc}</p>}
      </div>

      {/* Ảnh sản phẩm (URL) */}
      <div>
        <label htmlFor="img_url" className="block text-sm font-medium text-gray-700 mb-2">
          Ảnh sản phẩm (URL)
        </label>
        <input
          type="url"
          id="img_url"
          name="img_url"
          value={formData.img_url}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {formData.img_url && (
          <div className="mt-3">
            <img
              src={formData.img_url}
              alt="Xem trước ảnh"
              className="max-h-48 rounded-lg border border-gray-200 object-contain"
            />
          </div>
        )}
      </div>

      {/* Giá và Số lượng */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="gia" className="block text-sm font-medium text-gray-700 mb-2">
            Giá (VNĐ) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="gia"
            name="gia"
            value={formData.gia}
            onChange={handleChange}
            placeholder="0"
            min="0"
            step="1000"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.gia ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.gia && <p className="mt-1 text-sm text-red-600">{errors.gia}</p>}
        </div>

        <div>
          <label htmlFor="soLuong" className="block text-sm font-medium text-gray-700 mb-2">
            Số lượng <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="soLuong"
            name="soLuong"
            value={formData.soLuong}
            onChange={handleChange}
            placeholder="0"
            min="1"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.soLuong ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.soLuong && <p className="mt-1 text-sm text-red-600">{errors.soLuong}</p>}
        </div>
      </div>

      {/* Mô tả */}
      <div>
        <label htmlFor="moTa" className="block text-sm font-medium text-gray-700 mb-2">
          Mô tả sản phẩm
        </label>
        <textarea
          id="moTa"
          name="moTa"
          value={formData.moTa}
          onChange={handleChange}
          rows={4}
          placeholder="Nhập mô tả chi tiết về sản phẩm"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed font-medium transition-colors"
        >
          {isSubmitting ? 'Đang xử lý...' : isEdit ? '💾 Cập nhật' : '➕ Thêm mới'}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          disabled={isSubmitting}
          className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 disabled:cursor-not-allowed font-medium transition-colors"
        >
          ❌ Hủy
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
