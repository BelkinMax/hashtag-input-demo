export interface CrudRepository<T> {
  read(options: Record<string, string | number>): Promise<T[]>;
}
