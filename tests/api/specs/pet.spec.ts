import { test, expect } from '../support/fixtures';
import { buildPet } from '../support/pet-factory';

/**
 * Endpoint under test: /pet (Swagger Petstore).
 * See ../../../TEST_DESIGN.md for rationale and the additional scenarios
 * that would be automated with more time.
 */
test.describe('Petstore API - /pet endpoint', () => {
  test('creates a new pet and can retrieve it', async ({ petClient }) => {
    // Build a fresh, random pet payload to submit.
    const newPet = buildPet();

    // Submit the pet and confirm the API accepted it.
    const createPetResponse = await petClient.create(newPet);
    expect(createPetResponse.status()).toBe(200);

    // Verify the POST response gives back what was submitted.
    const createdPet = await createPetResponse.json();
    expect(createdPet).toMatchObject({
      id: newPet.id,
      photoUrls: newPet.photoUrls,
      name: newPet.name,
      status: newPet.status,
    });

    // Verify the pet is retrievable via GET
    await expect
      .poll(async () => {
        const getPetResponse = await petClient.get(createdPet.id);
        return getPetResponse.status() === 200 ? await getPetResponse.json() : undefined;
      })
      .toMatchObject({
        id: newPet.id,
        photoUrls: newPet.photoUrls,
        name: newPet.name,
        status: newPet.status,
      });
  });

  // TODO
  // Negative scenario
  // Test: PUT /pet to change an existing pet's `status`, then GET to confirm it changed.
  // Rationale: Ensures that a Pet status can be updated.
  test.fixme('updates an existing pet\'s status (positive)', async () => {});

  // TODO
  // Negative scenario
  // Approach: GET /pet/{id} with an id that doesn't exist, expect 404.
  // Rationale: confirms the API fails safely instead of erroring.
  test.fixme('returns 404 for a pet id that does not exist (negative)', async () => {});

  // TODO
  // Negative scenario
  // Approach: POST /pet without the required `name` field.
  // Rationale: Ensures validation of the name field.
  test.fixme('rejects a pet created without the required name field', async () => {});
});
