import { faker } from '@faker-js/faker';
import { Pet } from './pet-client';

export function buildPet(): Pet {
  return {
    id: faker.number.int({ min: 1, max: 2_147_483_647 }),
    name: faker.animal.dog(),
    photoUrls: [faker.image.url()],
    status: 'available',
  };
}
