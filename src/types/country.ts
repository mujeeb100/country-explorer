export interface Country {
    name: {
      common: string;
      official: string;
    };
    cca2: string;
    flags: {
      png: string;
      svg: string;
    };
    population: number;
    region: string;
    subregion: string;
    capital: string[];
  }
  