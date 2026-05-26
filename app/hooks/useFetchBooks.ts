import { useState, useEffect } from 'react';

// Vi definerer strukturen for en bog (TypeScript)
export interface Book {
  id: number;
  title: string;
  author: string;
  coverUrl: string;
}

export function useFetchBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Vi simulerer et asynkront netværkskald til et API
    const timer = setTimeout(() => {
      setBooks([
        { id: 1, title: 'Harry Potter & De Vises Sten', author: 'J.K. Rowling', coverUrl: '/covers/harrypotter.jpg' },
        { id: 2, title: 'Hobbitten', author: 'J.R.R. Tolkien', coverUrl: '/covers/thehobbit.png' },
        { id: 3, title: 'Baskervillehunden', author: 'A. Conan Doyle', coverUrl: '/covers/baskerville.png' },
        { id: 4, title: 'Da Vinci Mysteriet', author: 'Dan Brown', coverUrl: '/covers/davinci.png' },
        { id: 5, title: 'Alkemisten', author: 'Paulo Coelho', coverUrl: '' },
        { id: 6, title: '1984', author: 'George Orwell', coverUrl: '' },
        { id: 7, title: 'Eventyret om Ringen', author: 'J.R.R. Tolkien', coverUrl: '/covers/lotr.png' },
        { id: 8, title: 'Den Lille Prins', author: 'A. de Saint-Exupéry', coverUrl: '/covers/prins.png' },
        { id: 9, title: 'Frankenstein', author: 'Mary Shelley', coverUrl: '/covers/frankenstein.png' },
        { id: 10, title: 'Moby Dick', author: 'Herman Melville', coverUrl: '' }
      ]);
      setLoading(false);
    }, 1000); // 1,2 sekunders forsinkelse, så vi kan se loading-staten

    return () => clearTimeout(timer);
  }, []);

  return { books, loading };
}