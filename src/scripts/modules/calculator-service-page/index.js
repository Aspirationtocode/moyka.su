import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Calculator from './components/Calculator';

export default function () {
  ReactDOM.render(<Calculator />, document.getElementById('calculator-service'));
}
