import { hashtagService } from '~/entities/hashtag';

export interface Markdown {
  name: string;
  pattern: RegExp;
  classList: string[];
  withOptions: boolean;
  service?: {
    findMatching (match: string): Promise<string[]>
  }
}

export const markdownMap: Markdown[] = [
  {
    name: 'hashtag',
    pattern: /(#\w+)/,
    classList: ['text-indigo-500'],
    withOptions: true,
    service: hashtagService,
  },
] as const;

export const markdownPattern = new RegExp(
  markdownMap
    .map(el => el.pattern.source)
    .join('|')
);
