import type { StoredImage, UserResponse } from 'ui';
import { randomInt } from 'ui';
import { v4 as randomUUID } from 'uuid';

export const MOCK_USER: UserResponse = {
  id: randomUUID(),
  email: 'contact@nyashmyash99.ru',
};

export const MOCK_IMAGE_URL = 'https://lipsum.app/random/160x90';

export const MOCK_IMAGES: StoredImage[] = [
  {
    id: randomUUID(),
    title: 'Test 1',
    url: MOCK_IMAGE_URL,
    ownerId: MOCK_USER.id,
    createdAt: Number(new Date()),
  },
  {
    id: randomUUID(),
    url: MOCK_IMAGE_URL,
    loadedBytes: randomInt(100000, 1000000),
    byteSize: randomInt(1000000, 3000000),
    createdAt: Number(new Date()),
  },
  {
    id: randomUUID(),
    url: MOCK_IMAGE_URL,
    loadedBytes: randomInt(100000, 1000000),
    byteSize: randomInt(1000000, 3000000),
    createdAt: Number(new Date()),
  },
  {
    id: randomUUID(),
    title: 'Test 2',
    url: MOCK_IMAGE_URL,
    ownerId: MOCK_USER.id,
    createdAt: Number(new Date()),
  },
  {
    id: randomUUID(),
    title: 'Test 3',
    url: MOCK_IMAGE_URL,
    ownerId: randomUUID(),
    createdAt: Number(new Date()),
  },
  {
    id: randomUUID(),
    title: 'Test 4',
    url: MOCK_IMAGE_URL,
    ownerId: randomUUID(),
    createdAt: Number(new Date()),
  },
  {
    id: randomUUID(),
    title: 'Test 5',
    url: MOCK_IMAGE_URL,
    ownerId: MOCK_USER.id,
    createdAt: 1696343221,
  },
  {
    id: randomUUID(),
    title: 'Test 6',
    url: MOCK_IMAGE_URL,
    ownerId: MOCK_USER.id,
    createdAt: 1696343221,
  },
  {
    id: randomUUID(),
    title: 'Test 7',
    url: MOCK_IMAGE_URL,
    ownerId: randomUUID(),
    createdAt: 1696343221,
  },
];
