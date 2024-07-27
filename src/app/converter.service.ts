import { Currency } from "./currency";

export default class ConverterService {
    _apiBace = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

    currencySlugs = ['USD', 'EUR', 'CAD']
  
    getResource = async (url: string) => {
        let res = await fetch(url);
  
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
  
        return await res.json();
    }
  
    getAllRates = async () => {
      const res = await this.getResource(`${this._apiBace}`);
  
      return res.filter((item: Currency) => (item['cc'] === 'USD') || item['cc'] === 'EUR' || item['cc'] === 'PLN');
    }
  }