'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Country = {
  cca2: string;
  name: { common: string };
  flags: { svg: string };
  population: number;
  region: string;
  capital: string[];
};

type FavoritesContextType = {
  favorites: Country[];
  toggleFavorite: (country: Country) => void;
  isFavorite: (cca2: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Country[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('favoriteCountries');
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteCountries', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (country: Country) => {
    setFavorites((prev) => {
      const exists = prev.find((c) => c.cca2 === country.cca2);
      if (exists) return prev.filter((c) => c.cca2 !== country.cca2);
      return [...prev, country];
    });
  };

  const isFavorite = (cca2: string) => favorites.some((c) => c.cca2 === cca2);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within a FavoritesProvider');
  return context;
};
