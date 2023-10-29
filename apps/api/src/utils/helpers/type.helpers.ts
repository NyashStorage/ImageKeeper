import { ClassConstructor, plainToClass } from 'class-transformer';

/**
 * Converts a regular object to a typed object by removing unnecessary fields.
 */
export async function castToEntity<T>(
  target: Promise<any> | any,
  Entity: ClassConstructor<T>,
): Promise<T> {
  return plainToClass(Entity, await target, {
    excludeExtraneousValues: true,
    strategy: 'exposeAll',
  });
}
