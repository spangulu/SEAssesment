import { test, expect } from '@playwright/test';
import RestCountriesApi from '../src/api/restCountriesApi';

test('Validate South African Sign Language (SASL) is an official language of South Africa', async ({ request }) => {
    const api = new RestCountriesApi(request);
    const fields = ['name', 'languages'];
    const countries = await api.getByName('South Africa', fields);
    expect(countries.length).toBeGreaterThan(0);
    const sa = countries[0];
    const languageValues = Object.values(sa.languages || {}).map(l => String(l).toLowerCase());
    // Acceptable variants for SASL
    const saslVariants = [
        'south african sign language',
        'sasl',
        'south african sign lang.',
        'sign language (south africa)'
    ];
    const found = languageValues.some(lang => saslVariants.some(variant => lang.includes(variant)));
    console.log('Languages for South Africa:', languageValues);
    if (!found) {
        console.warn('\nWARNING: South African Sign Language (SASL) is NOT listed as an official language for South Africa in the API response.');
    }
    expect(found, '\nWARNING: South African Sign Language (SASL) is NOT listed as an official language for South Africa in the API response.').toBe(true);
});
