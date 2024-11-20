import '../../src/app/assets/main.css';
import './commands';

import { mount as mountVue } from 'cypress/vue';

Cypress.Commands.addAll({
  mount: mountVue,
});
