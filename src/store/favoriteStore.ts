import { create } from 'zustand';
import { Country } from '../types/country';

interface FavoriteStore {
  favorites: Country[];
  addFavorite: (country: Country) => void;
  removeFavorite: (code: string) => void;
}

export const useFavoriteStore = create<FavoriteStore>((set) => ({
  favorites: [],
  addFavorite: (country) =>
    set((state) => ({
      favorites: [...state.favorites, country],
    })),
  removeFavorite: (code) =>
    set((state) => ({
      favorites: state.favorites.filter((c) => c.cca2 !== code),
    })),
}));
