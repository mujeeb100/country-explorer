// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useFavorites } from '@/context/FavoritesContext';

type Country = {
  name: { common: string };
  flags: { svg: string };
  population: number;
  region: string;
  capital: string[];
  cca2: string;
};

export default function HomePage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');
  const { toggleFavorite, isFavorite } = useFavorites();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch('https://restcountries.com/v3.1/all');
        if (!res.ok) throw new Error('Failed to fetch countries');
        const data = await res.json();
        setCountries(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
        }
      }
    };
  
    fetchCountries();
  }, []);

  useEffect(() => {
    let filtered = countries;

    if (search) {
      filtered = filtered.filter((c) =>
        c.name.common.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (region) {
      filtered = filtered.filter((c) => c.region === region);
    }

    setFilteredCountries(filtered);
  }, [search, region, countries]);

  return (
    <div className="p-6">
  {error ? (
    <p className="text-red-500 text-center">{error}</p>
  ) : (
    <>
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by country name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full md:w-1/2"
        />

        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="p-2 border rounded w-full md:w-1/4"
        >
          <option value="">All Regions</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredCountries?.map((country) => (
          <Link
            key={country.cca2}
            href={`/country/${country.cca2}`}
            className="block border rounded p-4 hover:shadow"
          >
            <button
              onClick={(e) => {
                e.preventDefault(); // prevent Link navigation
                toggleFavorite(country);
              }}
              className="text-red-500 font-bold mb-2"
            >
              {isFavorite(country.cca2)
                ? '★ Remove Favorite'
                : '☆ Add to Favorites'}
            </button>
            <img
              src={country.flags.svg}
              alt={country.name.common}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <h3 className="text-xl font-semibold">{country.name.common}</h3>
            <p>
              <strong>Population:</strong>{' '}
              {country.population.toLocaleString()}
            </p>
            <p>
              <strong>Region:</strong> {country.region}
            </p>
            <p>
              <strong>Capital:</strong>{' '}
              {country.capital?.join(', ') || 'N/A'}
            </p>
          </Link>
        ))}
      </div>
    </>
  )}
</div>
  )}