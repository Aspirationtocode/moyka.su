import $ from 'jquery';
import fastclick from 'fastclick';
import './static-init';
// index-page
import initHeaderNav from './modules/index-page/init-header-nav';
import initHeaderElements from './modules/index-page/init-header-elements';

// calculator-service-page
import initServicePage from './modules/calculator-service-page/';

// price-list-page
import initPriceListPage from './modules/price-list-page';

fastclick.attach(document.body);

const pageConformity = {
  'index-page': function () {},
  'calculator-service-page': function () {
    initServicePage();
  },
  'price-list': function () {
    initPriceListPage();
  },
};

const currentPageClass = $(document.body).attr('class');

initHeaderNav();
initHeaderElements();

if (pageConformity[currentPageClass]) {
  pageConformity[currentPageClass]();
}
