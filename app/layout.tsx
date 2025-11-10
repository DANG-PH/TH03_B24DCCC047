import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ProductProvider } from '@/context/ProductContext';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin', 'vietnamese'] });

export const metadata: Metadata = {
  title: 'Quản Lý Sản Phẩm',
  description: 'Ứng dụng quản lý danh sách sản phẩm với đầy đủ tính năng CRUD',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <ProductProvider>
          <div className="min-h-screen bg-gray-50">
            {/* Navigation Bar */}
            <nav className="bg-white shadow-md">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex">
                    <Link 
                      href="/" 
                      className="flex items-center px-2 text-xl font-bold text-blue-600 hover:text-blue-800"
                    >
                      📦 Quản Lý Sản Phẩm
                    </Link>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Link
                      href="/"
                      className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium"
                    >
                      Trang Chủ
                    </Link>
                    <Link
                      href="/add"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                    >
                      + Thêm Sản Phẩm
                    </Link>
                  </div>
                </div>
              </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t mt-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <p className="text-center text-gray-600">
                  © 2025 Quản Lý Sản Phẩm. All rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </ProductProvider>
      </body>
    </html>
  );
}