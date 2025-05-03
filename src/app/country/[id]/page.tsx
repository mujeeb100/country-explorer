import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import Link from 'next/link';

type Country = {
  name: {
    common: string;
    nativeName?: { [key: string]: { common: string } };
  };
  flags: { svg: string };
  population: number;
  region: string;
  subregion: string;
  capital: string[];
  tld: string[];
  currencies?: { [key: string]: { name: string } };
  languages?: { [key: string]: string };
  borders?: string[];
};

interface CountryDetailProps {
    params: {
      id: string;
    };
  }

async function getCountryByCode(code: string): Promise<Country> {
  const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
  if (!res.ok) throw new Error('Country not found');
  const data = await res.json();
  return data[0];
}

async function getBorderCountries(codes: string[]): Promise<string[]> {
  if (!codes?.length) return [];
  const res = await fetch(`https://restcountries.com/v3.1/alpha?codes=${codes.join(',')}&fields=name`);
  const data = await res.json();
  return data.map((c: Country) => c.name.common);
}

export default async function CountryDetail({ params }: CountryDetailProps) {
    // const isAuthenticated = cookies().get('isAuthenticated')?.value; 
    const cookieStore = await cookies();
    const isAuthenticated = cookieStore.get('isAuthenticated')?.value;

  // 🚫 Protect Route 
  if (!isAuthenticated) {
    redirect('/login');
  }

  const country = await getCountryByCode(params.id);
  const borderCountryNames = await getBorderCountries(country.borders || []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Link href="/" className="text-blue-600 underline mb-4 inline-block">← Back to list</Link>

      <div className="flex flex-col md:flex-row gap-8 mt-4">
        <img src={country.flags.svg} alt={country.name.common} className="w-full md:w-1/2 rounded" />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{country.name.common}</h1>
          <p><strong>Native Name:</strong> {country.name.nativeName ? Object.values(country.name.nativeName)[0].common : 'N/A'}</p>
          <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
          <p><strong>Region:</strong> {country.region}</p>
          <p><strong>Sub Region:</strong> {country.subregion}</p>
          <p><strong>Capital:</strong> {country.capital?.join(', ') || 'N/A'}</p>
          <p><strong>Top Level Domain:</strong> {country.tld?.join(', ')}</p>
          <p><strong>Currency:</strong> {country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A'}</p>
          <p><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>

          {borderCountryNames.length > 0 && (
            <div className="mt-4">
              <strong>Border Countries:</strong>
              <div className="flex flex-wrap gap-2 mt-2">
                {borderCountryNames.map((name, index) => (
                  <Link key={index} href={`/country/${country.borders?.[index]}`}>
                    <span className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300">{name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
