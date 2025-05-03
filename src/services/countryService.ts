import axios from 'axios';
import { Country } from '../types/country';

const BASE_URL = 'https://restcountries.com/v3.1';

export const getAllCountries = async (): Promise<Country[]> => {
  const response = await axios.get(`${BASE_URL}/all`);
  return response.data;
};

export const getCountryByName = async (name: string): Promise<Country[]> => {
  const response = await axios.get(`${BASE_URL}/name/${name}`);
  return response.data;
};
