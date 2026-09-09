import { test as base } from '@playwright/test';
import { createPetClient, PetClient } from './pet-client';

export const test = base.extend<{ petClient: PetClient }>({
  petClient: async ({ request }, use) => {
    await use(createPetClient(request));
  },
});

export { expect } from '@playwright/test';
