import { APIRequestContext, APIResponse } from '@playwright/test';

export interface Pet {
  id: number;
  name: string;
  photoUrls: string[];
  status: string;
}

export interface PetClient {
  create(pet: Pet): Promise<APIResponse>;
  get(id: number): Promise<APIResponse>;
}

export function createPetClient(request: APIRequestContext): PetClient {
  return {
    create: (pet) => request.post('pet', { data: pet }),
    get: (id) => request.get(`pet/${id}`),
  };
}
