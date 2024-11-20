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

  it('select with keyboard', () => {
    cy.get('[contenteditable]')
      .type('And what about #b');

    cy.findByTestId('options-list');
    cy.findByTestId('option-item-0');

    cy.get('[contenteditable]')
      .type('{enter}?');

    cy.findByText('And what about');
    cy.findByText('#brain');
    cy.findByText('?');

    cy.get('[contenteditable]')
      .type('{leftArrow}' + '{backspace}'.repeat(4));

    cy.findByTestId('options-list');
    cy.findByTestId('option-item-2');

    cy.get('[contenteditable]')
      .type('{downArrow}'.repeat(3) + '{enter}');

    cy.findByText('And what about');
    cy.findByText('#biopsy');
    cy.findByText('?');

    cy.findByTestId('options-list')
      .should('not.be.visible');
  });
});
