import { User } from '@prisma/client';
import { v4 as randomUUID } from 'uuid';

export type UserFixture = Partial<User>;

const defaultUserData: UserFixture = {
  // qwerty123
  password: '$2b$12$OlJC/EIqYHsI1wrl1dn5aeMzVkz3zCOyFwevMreht0/c6wz7858Vi',
};

export const DaniilUser: UserFixture = {
  ...defaultUserData,
  id: randomUUID(),
  email: `${randomUUID()}@nyashmyash99.ru`,
};

export const VikaUser: UserFixture = {
  ...defaultUserData,
  id: randomUUID(),
  email: `${randomUUID()}@lutrya.ru`,
};

export const usersFixture = [DaniilUser, VikaUser];
