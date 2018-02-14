export type City = 'London' | 'Amsterdam' | 'Warsaw' | 'Stockholm' | 'Paris' | 'Brussels' | 'Prague' | 'Moscow'| 'Madrid' | 'Geneva'
  | 'Budapest' | 'Kiev' | 'Lisbon' | 'Rome' | 'Athens' | 'Istanbul';

export const Cities: City[] = ['London', 'Amsterdam', 'Warsaw', 'Stockholm', 'Paris',
'Brussels', 'Prague', 'Moscow', 'Madrid', 'Geneva', 'Budapest', 'Kiev', 'Lisbon', 'Rome', 'Athens', 'Istanbul'];

type Currency = 'EUR' | 'USD';

type Transport = 'train' | 'bus' | 'car';

export interface Deal {
  transport: Transport;
  departure: City;
  arrival: City;
  duration: {
      h: string;
      m: string;
  };
  cost: number;
  discount: number;
  reference: string;
}

export interface Trips {
  currency: Currency;
  deals: Deal[];
}
