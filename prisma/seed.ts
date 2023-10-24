import { PrismaClient } from '@prisma/client';

import * as data from './data.json';

const prisma = new PrismaClient();

async function main() {
  // await prisma.country.deleteMany();
  // await prisma.currency.deleteMany();
  // await prisma.language.deleteMany();

  const result = await Promise.all(
    data.map(async (country) => {
      const currencies = country?.currencies ?? [];
      const languages = country?.languages ?? [];

      return prisma.country.upsert({
        where: { alpha2Code: country.alpha2Code },
        update: {},
        create: {
          name: country.name,
          topLevelDomain: country.topLevelDomain,
          alpha2Code: country.alpha2Code,
          alpha3Code: country.alpha3Code,
          capital: country.capital,
          region: country.region,
          subregion: country.subregion,
          population: country.population,
          nativeName: country.nativeName,
          area: country.area,
          borders: country.borders,
          currencies: {
            create: currencies.map((currency) => ({
              code: currency?.code,
              name: currency?.name,
              symbol: currency?.symbol,
            })),
          },
          languages: {
            create: languages.map((language) => ({
              iso639_1: language?.iso639_1,
              iso639_2: language?.iso639_2,
              name: language.name,
              nativeName: language.nativeName,
            })),
          },

          flag: country.flag,
        },
      });
    }),
  );
  console.log('🚀 ~ file: seed.ts:53 ~ main ~ result:', result);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
