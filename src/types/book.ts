import type { BookCategory, BookFormat } from '.';

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  category: BookCategory;
  rating: number;
  reviews: number;
  pages: number;
  format: BookFormat[];
  includedInSubscription: boolean;
  coverImage?: string;
  createdAt: Date;
}

export interface BookFilters {
  category: string;
  search: string;
  sortBy: 'title' | 'price' | 'rating' | 'recent';
}