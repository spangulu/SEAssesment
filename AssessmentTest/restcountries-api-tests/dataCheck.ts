// // fetchRecognizedCountries.ts
// import fetch from "node-fetch";

// (async () => {
//   try {
//     const url = "https://restcountries.com/v3.1/all?fields=name,unMember";
//     const response = await fetch(url);

//     if (!response.ok) {
//       throw new Error(`HTTP Error: ${response.status}`);
//     }

//     const countries = await response.json();

//     // ✅ Filter: UN Members (193) + Observers (Palestine, Holy See)
//     const officialCountries = countries.filter(
//       (c: any) => c.unMember === true || ["Palestine", "Holy See"].includes(c.name.common)
//     );

//     // Sort alphabetically
//     const sortedCountries = officialCountries.sort((a: any, b: any) =>
//       a.name.common.localeCompare(b.name.common)
//     );

//     console.log("🌍 Recognized Countries (UN + Observers):\n");

//     sortedCountries.forEach((country: any, index: number) => {
//       console.log(`${index + 1}. ${country.name.common}`);
//     });

//     console.log(`\n✅ Total recognized countries (incl. observers): ${officialCountries.length}`);
//   } catch (error) {
//     console.error("❌ Error fetching data:", error);
//   }
// })();


// fetchSouthAfricaLanguages.ts
import fetch from "node-fetch";

(async () => {
  try {
    const url = "https://restcountries.com/v3.1/name/south%20africa?fields=name,languages";
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    const southAfrica = data[0];

    console.log(`Country: ${southAfrica.name.common}\n`);
    console.log("Official Languages:");

    const languages = southAfrica.languages
      ? Object.values(southAfrica.languages)
      : ["No official languages found"];

    languages.forEach((lang: any, i: number) => console.log(`${i + 1}. ${lang}`));

    console.log(`\n Total official languages listed: ${languages.length}`);
  } catch (error) {
    console.error(" Error fetching data:", error);
  }
})();



