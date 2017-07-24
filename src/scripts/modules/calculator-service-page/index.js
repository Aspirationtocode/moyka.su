import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import Calculator from './components/Calculator';
import { goToElement } from '../../helpers';

function initCalculatorServicePage() {
  if (location.hash) {
    goToElement($('.main-header'), 400);
  }
}

export default function () {
  ReactDOM.render(<Calculator />, document.getElementById('calculator-service'));
  initCalculatorServicePage();
}
