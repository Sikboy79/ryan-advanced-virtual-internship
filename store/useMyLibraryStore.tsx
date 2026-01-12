import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Book {
  id: string;
  title: string;
  subTitle?: string;
  author: string;
  imageLink?: string;
  summary?: string;
  averageRating?: string;
  totalRating?: string;
}

interface LibraryState {
  savedBooks: Book[];
  finishedBooks: Book[];
  toggleBook: (book: Book) => void;
  isSaved: (id: string) => boolean;
  addFinishedBook: (book: Book) => void;
  removeFinishedBook: (id: string) => void;
}

export const useLibraryStore = create<LibraryState>()(
  persist(
    (set, get) => ({
      savedBooks: [],
      finishedBooks: [],

      toggleBook: (book) => {
        const exists = get().savedBooks.some((b) => b.id === book.id);
        set({
          savedBooks: exists
            ? get().savedBooks.filter((b) => b.id !== book.id)
            : [...get().savedBooks, book],
        });
      },

      isSaved: (id) => get().savedBooks.some((b) => b.id === id),

      addFinishedBook: (book) =>
        set((state) => {
          console.log("addFinishedBook called with:", book);
          const updatedSaved = state.savedBooks.filter((b) => b.id !== book.id);
          const updatedFinished = state.finishedBooks.some(
            (b) => b.id === book.id
          )
            ? state.finishedBooks
            : [...state.finishedBooks, book];
          console.log("updatedFinishedBooks:", updatedFinished);
          return {
            savedBooks: updatedSaved,
            finishedBooks: updatedFinished,
          };
        }),
      removeFinishedBook: (id: string) => {
        set((state) => ({
          finishedBooks: state.finishedBooks.filter((b) => b.id !== id),
        }));
      },
    }),
    {
      name: "library-storage",
    }
  )
);
