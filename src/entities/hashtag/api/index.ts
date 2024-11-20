import HashtagRepository from './HashtagRepository';
import HashtagService from './HashtagService';

const hashtagRepository = new HashtagRepository();
const hashtagService = new HashtagService(hashtagRepository);

export {
  hashtagService
};
