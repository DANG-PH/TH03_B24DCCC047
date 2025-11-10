export type DanhMuc = 'Điện tử' | 'Quần áo' | 'Đồ ăn' | 'Sách' | 'Sưu tầm' | 'Phụ kiện' | 'Đồ chơi' | 'Đồ trang trí';

export interface Product {
  id: number;
  ten: string;
  danhMuc: DanhMuc;
  gia: number;
  soLuong: number;
  moTa: string;
  img_url:string;
}

export interface ProductFormData {
  ten: string;
  danhMuc: DanhMuc | '';
  gia: string;
  soLuong: string;
  moTa: string;
  img_url:string;
}

export interface FormErrors {
  ten?: string;
  danhMuc?: string;
  gia?: string;
  soLuong?: string;
  img_url?:string;
}

export interface FilterState {
  searchTerm: string;
  selectedCategory: DanhMuc | 'Tất cả';
  minPrice: string;
  maxPrice: string;
}

export type ProductAction =
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'DELETE_PRODUCT'; payload: number };

export interface ProductState {
  products: Product[];
}