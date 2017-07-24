import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import PriceList from './components/PriceList';

import { goToElement, getHashText } from '../../helpers';

function initStuff() {
  $('.services-nav-element').on('click', function () {
    const currentSection = $(this).attr('class').split(' ')[1].slice(22);
    const sectionToGo = $(`.table--${currentSection}`);
    goToElement(sectionToGo);
  });

  if (location.hash) {
    const sectionToGo = $(`.table--${getHashText()}`);
    goToElement(sectionToGo);
  }
  $('.header-nav-dropdown__link').on('click', () => {
    const sectionToGo = $(`.table--${getHashText()}`);
    goToElement(sectionToGo);
  });
}

export default function () {
  ReactDOM.render(<PriceList />, document.getElementById('price-list'));
  initStuff();
}
