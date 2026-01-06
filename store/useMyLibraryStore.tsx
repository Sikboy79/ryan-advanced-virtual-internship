import { create } from "zustand";

export interface Book {
  id: string;
  title: string;
  subTitle: string;
  author: string;
  imageLink: string;
  summary: string;
  averageRating: string;
  totalRating: string;
}

interface LibraryState {
  savedBooks: Book[];
  toggleBook: (book: Book) => void;
  isSaved: (id: string) => boolean;
}

export const useLibraryStore = create<LibraryState>((set, get) => ({
  savedBooks: [],

  toggleBook: (book) => {
    const exists = get().savedBooks.some(b => b.id === book.id);

    set({
      savedBooks: exists
        ? get().savedBooks.filter(b => b.id !== book.id)
        : [...get().savedBooks, book],
    });
  },

  isSaved: (id) => {
    return get().savedBooks.some(b => b.id === id);
  },
}));
