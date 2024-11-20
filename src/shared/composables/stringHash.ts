import { computed } from 'vue';
import type { Ref , ComputedRef } from 'vue';

import stringHash from 'string-hash';

export function useStringHash (input: Ref<string>): ComputedRef<string> {
  return computed(() => String(stringHash(input.value)));
}
