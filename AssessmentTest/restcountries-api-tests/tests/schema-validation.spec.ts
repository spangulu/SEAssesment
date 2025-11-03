import { test, expect } from "@playwright/test";
import Ajv from "ajv";
import schema from "../schema/restcountries_schema.json" assert { type: "json" };
import RestCountriesApi from "../src/api/restCountriesApi";

// Field groups (max 10 fields each)
const fieldGroups = [
  ['name','flags','region','area','population','languages','capital','cca2','cca3','altSpellings'],
  ['capitalInfo','car','coatOfArms','continents','flag','idd','landlocked','latlng','maps','startOfWeek'],
  ['status','timezones','translations','unMember']
];

test.describe('Schema validation grouped by fields', () => {

  for (const fields of fieldGroups) {
    test(`Validate API response schema for fields: ${fields.join(', ')}`, async ({ request }) => {
      const api = new RestCountriesApi(request);
      const ajv = new Ajv({
        allErrors: true,
        verbose: true,
        strictSchema: false,
        validateSchema: false
      });

      // Dynamically extract property definitions
      const mainDef = schema.definitions && Object.values(schema.definitions)[0];
      function findPropertyDef(field: string) {
        if (mainDef && (mainDef as any).properties && (mainDef as any).properties[field]) {
          return (mainDef as any).properties[field];
        }
        return { type: 'any' };
      }

      // Build partial schema for current field group
      const partialSchema = {
        type: 'object',
        required: fields,
        properties: Object.fromEntries(fields.map(f => [f, findPropertyDef(f)])),
        definitions: schema.definitions
      } as const;

      const validate = ajv.compile(partialSchema);
      const countries = await api.getAll(fields);

      let allValid = true;
      let failedCount = 0;
      const failedCountries: { index: number; name?: string; errors: any[] }[] = [];

      // Validate each country entry
      countries.forEach((country, idx) => {
        const valid = validate(country);
        if (!valid) {
          allValid = false;
          failedCount++;
          failedCountries.push({
            index: idx,
            name: (country as any).name?.common ?? "Unknown",
            errors: validate.errors || []
          });
        }
      });

      // Pretty report output in console and Playwright HTML report
      if (allValid) {
        console.log(`[PASSED] All ${countries.length} countries conform to schema for fields: [${fields.join(', ')}]`);
        test.info().annotations.push({
          type: 'Schema Result',
          description: `PASSED - All ${countries.length} countries valid for fields: [${fields.join(', ')}]`
        });
      } else {
        console.warn(`[FAILED] ${failedCount} countries failed schema validation for fields: [${fields.join(', ')}]`);
        failedCountries.slice(0, 5).forEach(c => {
          console.warn(`  - ${c.name} (index ${c.index}) - ${c.errors.length} errors`);
        });
        if (failedCountries.length > 5) {
          console.warn(`  ...and ${failedCountries.length - 5} more failures not shown.`);
        }

        test.info().annotations.push({
          type: 'Schema Result',
          description: `FAILED - ${failedCount} invalid responses for fields: [${fields.join(', ')}]`
        });
      }

      // Final assertion
      expect(allValid, ` ${failedCount} countries failed schema validation for fields: [${fields.join(', ')}]`).toBe(true);
    });
  }
});