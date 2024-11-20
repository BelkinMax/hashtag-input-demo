import SmartInput from '../SmartInput.vue';

describe('SmartInput', () => {
  beforeEach(() => {
    cy.mount(SmartInput, {
      props: {
        modelValue: '',
      },
    });
  });

  it('regular text', () => {
    cy.get('[contenteditable]')
      .type('Hello everyone! What do you think about this?');

    cy.findByText('Hello everyone! What do you think about this?');
  });

  it('text with hashtags', () => {
    cy.get('[contenteditable]')
      .type('Hello #everyone! What do you #think about #this?');

    cy.findByText('Hello');
    cy.findByText('#everyone');
    cy.findByText('! What do you');
    cy.findByText('#think');
    cy.findByText('about');
    cy.findByText('#this');
    cy.findByText('?');
  });
});
