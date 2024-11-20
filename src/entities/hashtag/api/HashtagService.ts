import type { CrudRepository } from '~/shared/api';
import type { Hashtag } from '../model';

class HashtagService {
  constructor (
    private readonly hashtagRepository: CrudRepository<Hashtag>
  ) {}

  findMatching (match: string = ''): Promise<Hashtag[]> {
    return this.hashtagRepository.read({
      startsWith: match,
    });
  }
}

export default HashtagService;
