'use client';

import { useFavorites } from '@/context/FavoritesContext';
import Link from 'next/link';

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();

  if (favorites.length === 0) return <p className="p-6">No favorites added yet.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Favorite Countries</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {favorites.map((country) => (
          <Link
            key={country.cca2}
            href={`/country/${country.cca2}`}
            className="block border rounded p-4 hover:shadow"
          >
            <img src={country.flags.svg} alt={country.name.common} className="w-full h-40 object-cover rounded mb-3" />
            <h3 className="text-xl font-semibold">{country.name.common}</h3>
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite(country);
              }}
              className="text-red-500 font-bold mt-2"
            >
              Remove Favorite
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}
