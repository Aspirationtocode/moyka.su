import $ from 'jquery';
import fastclick from 'fastclick';
import './static-init';

// index-page
import initHeaderNav from './modules/index-page/init-header-nav';
import initHeaderElements from './modules/index-page/init-header-elements';

// service-calculator
import initServicePage from './modules/calculator-service-page/';

fastclick.attach(document.body);

const pageConformity = {
  'index-page': function initIndexPage() {
    initHeaderNav();
    initHeaderElements();
  },
  'calculator-service-page': function initCalculatorServicePage() {
    initHeaderNav();
    initHeaderElements();
    initServicePage();
  },
};

const currentPageClass = $(document.body).attr('class');

if (pageConformity[currentPageClass]) {
  pageConformity[currentPageClass]();
}
