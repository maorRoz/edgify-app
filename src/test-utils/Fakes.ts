import faker from 'faker';
import sample from 'lodash/sample';

export const Fakes = {
  number: (): number => faker.random.number(),
  boolean: (): boolean => faker.random.boolean(),
  string: (): string => faker.lorem.words(),
  numberOptional: (): number | undefined =>
    sample([faker.random.number(), undefined]),
  booleanOptional: (): boolean | undefined =>
    sample([faker.random.boolean(), undefined]),
  stringOptional: (): string | undefined =>
    sample([faker.lorem.words(), undefined])
};
