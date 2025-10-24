import { APIRequestContext } from '@playwright/test';

interface Country {
  name: { common: string; official: string };
  region: string;
  subregion?: string;
  latlng?: number[];
  borders?: string[];
  area?: number;
  maps?: { googleMaps: string; openStreetMaps: string };
  independent: boolean;
  status: string;
  unMember: boolean;
  languages?: Record<string, string>; // Add languages property
}

export default class RestCountriesApi {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getAll(fields?: string[]): Promise<Country[]> {
    const url = fields ? `all?fields=${fields.join(',')}` : 'all';
    console.log('Requesting URL:', url);
    const response = await this.request.get(url);
    if (!response.ok()) {
      console.error(`API Error: ${response.status()} ${response.statusText()}`);
      console.error('Response:', await response.text());
      throw new Error(`API request failed with status ${response.status()}`);
    }
    return response.json();
  }

  async getByName(name: string, fields?: string[]): Promise<Country[]> {
    const encoded = encodeURIComponent(name);
    const url = fields ? `name/${encoded}?fields=${fields.join(',')}` : `name/${encoded}`;
    const response = await this.request.get(url);
    if (!response.ok()) {
      console.error(`API Error: ${response.status()} ${response.statusText()}`);
      console.error('Response:', await response.text());
      throw new Error(`API request failed with status ${response.status()}`);
    }
    return response.json();
  }
}
