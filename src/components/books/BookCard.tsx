import React from 'react';
import { BookOpen, Download, ShoppingCart, Eye, Star } from 'lucide-react';
import { type Book } from '../../types/book';
import { formatCurrency } from '../../utils/format';
import { useLanguage } from '../../contexts/LanguageContext';

interface BookCardProps {
  book: Book;
  onBuy: (id: string) => void;
  onDownload: (id: string) => void;
  onPreview: (id: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onBuy, onDownload, onPreview }) => {
  const { t } = useLanguage();

  const getCoverColor = () => {
    const colors = [
      'bg-blue-100', 'bg-purple-100', 'bg-green-100', 
      'bg-red-100', 'bg-yellow-100', 'bg-indigo-100'
    ];
    return colors[book.id.charCodeAt(0) % colors.length];
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* Book Cover */}
      <div className={`${getCoverColor()} p-6 flex items-center justify-center`}>
        <BookOpen className="w-24 h-24 text-gray-700 opacity-50" />
      </div>

      {/* Book Info */}
      <div className="p-6">
        {/* Badge */}
        {book.includedInSubscription && (
          <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
            {t('includedInPlan')}
          </span>
        )}

        <h3 className="text-xl font-bold text-gray-900 mb-2">{book.title}</h3>
        <p className="text-gray-600 mb-3">By {book.author}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(book.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {book.rating} ({book.reviews} {t('reviews')})
          </span>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-600">
          <div>
            <span className="font-semibold">{t('pages')}:</span> {book.pages}
          </div>
          <div>
            <span className="font-semibold">{t('format')}:</span> {book.format.join('/')}
          </div>
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">{formatCurrency(book.price)}</span>
            {book.includedInSubscription && (
              <span className="text-sm text-green-600 ml-2">{t('freeWithSubscription')}</span>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onPreview(book.id)}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
              title={t('preview')}
            >
              <Eye className="w-5 h-5" />
            </button>
            {book.includedInSubscription ? (
              <button
                onClick={() => onDownload(book.id)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <Download className="w-4 h-4" />
                {t('downloadBook')}
              </button>
            ) : (
              <button
                onClick={() => onBuy(book.id)}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                <ShoppingCart className="w-4 h-4" />
                {t('buyBook')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;