export interface Markdown {
  name: string;
  pattern: RegExp;
  classList: string[];
  withOptions: boolean;
}

export const markdownMap: Markdown[] = [
  {
    name: 'hashtag',
    pattern: /(#\w+)/,
    classList: ['text-indigo-500'],
    withOptions: true,
  },
] as const;

export const markdownPattern = new RegExp(
  markdownMap
    .map(el => el.pattern.source)
    .join('|')
);