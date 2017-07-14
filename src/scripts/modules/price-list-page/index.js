import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import PriceList from './components/PriceList';

function goToSection(section) {
  $('html, body').animate(
    {
      scrollTop: section.offset().top,
    },
    300,
  );
}

function initStuff() {
  $('.services-nav-element').on('click', function () {
    const currentSection = $(this).attr('class').split(' ')[1].slice(22);
    const sectionToGo = $(`.table--${currentSection}`);
    goToSection(sectionToGo);
  });

  if (location.hash) {
    const sectionToGo = $(`.table--${location.hash.slice(1)}`);
    goToSection(sectionToGo);
  }
  $('.header-nav-dropdown__link').on('click', () => {
    const sectionToGo = $(`.table--${location.hash.slice(1)}`);
    goToSection(sectionToGo);
  });
}

export default function () {
  ReactDOM.render(<PriceList />, document.getElementById('price-list'));
  initStuff();
}
