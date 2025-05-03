'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';

type Country = {
  name: { common: string };
  flags: { svg: string };
  population: number;
  region: string;
  capital: string[];
  cca2: string;
};

export default function CountryCard({ country }: { country: Country }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const detailLink = isAuthenticated ? `/country/${country.cca2}` : '/login';

  return (
    <Link href={detailLink}>
      <div className="bg-white rounded shadow-md hover:shadow-lg transition p-4 cursor-pointer">
        <img src={country.flags.svg} alt={country.name.common} className="h-32 w-full object-cover rounded" />
        <h2 className="text-lg font-semibold mt-2">{country.name.common}</h2>
        <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> {country.region}</p>
        <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
      </div>
    </Link>
  );
}
