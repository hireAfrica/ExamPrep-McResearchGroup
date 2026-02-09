import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Navbar from '../components/common/Navbar';
import BookCard from '../components/books/BookCard';
import BookFilters from '../components/books/BookFilter';
import SubscriptionBanner from '../components/books/SubscriptionBanner';
import type { Book } from '../types/book';
import { BOOK_CATEGORIES } from '../utils/constants';

const BooksPage: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock books data
  const books: Book[] = [
    {
      id: '1',
      title: 'Mathematics Fundamentals',
      author: 'Dr. Robert Chen',
      description: 'Comprehensive guide to mathematics fundamentals',
      price: 24.99,
      category: 'mathematics',
      rating: 4.8,
      reviews: 124,
      pages: 320,
      format: ['PDF', 'EPUB'],
      includedInSubscription: true,
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      title: 'Physics Complete Guide',
      author: 'Prof. Sarah Johnson',
      description: 'Complete physics guide for exam preparation',
      price: 29.99,
      category: 'physics',
      rating: 4.9,
      reviews: 89,
      pages: 450,
      format: ['PDF'],
      includedInSubscription: false,
      createdAt: new Date('2024-02-20')
    },
    {
      id: '3',
      title: 'Chemistry Mastery',
      author: 'Dr. Michael Brown',
      description: 'Master chemistry concepts with this comprehensive guide',
      price: 19.99,
      category: 'chemistry',
      rating: 4.6,
      reviews: 156,
      pages: 280,
      format: ['PDF', 'EPUB', 'MOBI'],
      includedInSubscription: true,
      createdAt: new Date('2024-03-10')
    },
    {
      id: '4',
      title: 'Biology Essentials',
      author: 'Dr. Emma Wilson',
      description: 'Essential biology concepts for exam success',
      price: 22.99,
      category: 'biology',
      rating: 4.7,
      reviews: 98,
      pages: 350,
      format: ['PDF'],
      includedInSubscription: false,
      createdAt: new Date('2024-01-25')
    },
    {
      id: '5',
      title: 'Advanced Calculus',
      author: 'Prof. James Miller',
      description: 'Advanced calculus topics and problem-solving techniques',
      price: 34.99,
      category: 'mathematics',
      rating: 4.9,
      reviews: 67,
      pages: 520,
      format: ['PDF', 'EPUB'],
      includedInSubscription: true,
      createdAt: new Date('2024-02-15')
    },
    {
      id: '6',
      title: 'Organic Chemistry',
      author: 'Dr. Lisa Taylor',
      description: 'Complete guide to organic chemistry principles',
      price: 27.99,
      category: 'chemistry',
      rating: 4.5,
      reviews: 112,
      pages: 380,
      format: ['PDF'],
      includedInSubscription: false,
      createdAt: new Date('2024-03-05')
    }
  ];

  const filteredBooks = books.filter(book => {
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBuyBook = (bookId: string) => {
    alert(`Buy book ${bookId} - This would integrate with Stripe in production`);
  };

  const handleDownloadBook = (bookId: string) => {
    alert(`Download book ${bookId} - This would trigger file download`);
  };

  const handlePreviewBook = (bookId: string) => {
    alert(`Preview book ${bookId} - This would open book preview`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('books')}</h1>
          <p className="text-gray-600">Access our comprehensive library of educational books</p>
        </div>

        {/* Filters */}
        <BookFilters
          selectedCategory={selectedCategory}
          searchTerm={searchTerm}
          onCategoryChange={setSelectedCategory}
          onSearchChange={setSearchTerm}
        />

        {/* Books Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredBooks.length}</span> books
            {selectedCategory !== 'all' && ` in ${BOOK_CATEGORIES.find(c => c.id === selectedCategory)?.name}`}
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map(book => (
            <BookCard
              key={book.id}
              book={book}
              onBuy={handleBuyBook}
              onDownload={handleDownloadBook}
              onPreview={handlePreviewBook}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No books found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms</p>
          </div>
        )}

        <SubscriptionBanner />
      </div>
    </div>
  );
};

export default BooksPage;