import type { CrudRepository } from '~/shared/api';
import type { Hashtag } from '../model';

import mockList from './mock.json';

type ReadOptions = Partial<{
  startsWith: string;
}>

class HashtagRepository implements CrudRepository<Hashtag>{
  read (options: ReadOptions): Promise<Hashtag[]> {
    return new Promise((resolve) => {
      const { startsWith } = options;

      const filtered = startsWith
        ? mockList.list.filter((hashtag) => hashtag.startsWith(startsWith))
        : mockList.list;

      setTimeout(() => {
        resolve(filtered);
      }, Math.floor(Math.random() * 300));
    });
  }
}

export default HashtagRepository;
