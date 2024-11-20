import { computed } from 'vue';
import type { Ref , ComputedRef } from 'vue';

import { markdownMap, markdownPattern } from '../model';
import type { Markdown } from '../model';

export type MarkdownTextItem = {
  text: string;
  markdown: Markdown | null;
}

export function useMarkdown () {
  function transform (source: Ref<string>): ComputedRef<MarkdownTextItem[]> {
    return computed(() => (
      source.value
        ? source.value.split(markdownPattern)
          .filter(text => text !== undefined)
          .map(text => ({
            text,
            markdown: markdownMap.find(item => item.pattern.test(text)) ?? null,
          }))
        : []
    ));
  }

  return {
    transform,
  };
}

