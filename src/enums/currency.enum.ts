export enum Currency {
  USD = 'USD', // United States Dollar
  EUR = 'EUR', // Euro
  GBP = 'GBP', // British Pound Sterling
  JPY = 'JPY', // Japanese Yen
  AUD = 'AUD', // Australian Dollar
  CAD = 'CAD', // Canadian Dollar
  CHF = 'CHF', // Swiss Franc
  CNY = 'CNY', // Chinese Yuan Renminbi
  INR = 'INR', // Indian Rupee
  RUB = 'RUB'  // Russian Ruble
}

export const CurrencySymbols: Record<Currency, string> = {
  [Currency.USD]: '$',
  [Currency.EUR]: '€',
  [Currency.GBP]: '£',
  [Currency.JPY]: '¥',
  [Currency.AUD]: 'A$',
  [Currency.CAD]: 'C$',
  [Currency.CHF]: 'CHF',
  [Currency.CNY]: '¥',
  [Currency.INR]: '₹',
  [Currency.RUB]: '₽'
};

export const CurrencyNames: Record<Currency, string> = {
  [Currency.USD]: 'US Dollar',
  [Currency.EUR]: 'Euro',
  [Currency.GBP]: 'British Pound',
  [Currency.JPY]: 'Japanese Yen',
  [Currency.AUD]: 'Australian Dollar',
  [Currency.CAD]: 'Canadian Dollar',
  [Currency.CHF]: 'Swiss Franc',
  [Currency.CNY]: 'Chinese Yuan',
  [Currency.INR]: 'Indian Rupee',
  [Currency.RUB]: 'Russian Ruble'
};