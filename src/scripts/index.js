import '../views/index.pug';
import '../styles/main.styl';
import $ from 'jquery';
import fastclick from 'fastclick';

// index-page
import initHeaderNav from './modules/index-page/init-header-nav';
import initHeaderElements from './modules/index-page/init-header-elements';

// service-calculator
import initServicePage from './modules/calculator-service-page/';

fastclick.attach(document.body);

const pageConformity = {
  'index-page': function () {
    initHeaderNav();
    initHeaderElements();
  },
  'calculator-service-page': function () {
    initHeaderNav();
    initHeaderElements();
    initServicePage();
  },
};

const currentPageClass = $(document.body).attr('class');

pageConformity[currentPageClass]();
