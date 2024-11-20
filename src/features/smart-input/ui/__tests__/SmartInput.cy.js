import { ref } from 'vue';

import SmartInput from '../SmartInput.vue';

describe('SmartInput', () => {
  it('renders', () => {
    const userMessage = ref('Hello #everyone!');

    cy.mount(SmartInput, {
      props: {
        modelValue: userMessage,
      },
    });
  });
});
