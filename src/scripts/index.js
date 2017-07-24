import $ from 'jquery';
import fastclick from 'fastclick';
import './static-init';

// index-page
import initHeaderNav from './modules/index-page/init-header-nav';
import initHeaderElements from './modules/index-page/init-header-elements';
import initSectionSkills from './modules/index-page/init-section-skills';

// calculator-service-page
import initServicePage from './modules/calculator-service-page/';

// price-list-page
import initPriceListPage from './modules/price-list-page';

// contacts-page
import initContactsPage from './modules/contacts-page';

// main-init-scripts
fastclick.attach(document.body);

$(window).on('load', () => {
  $('body').css({
    visibility: 'visible',
  });
});

// page-conformity
const pageConformity = {
  'index-page': function () {},
  'calculator-service-page': function () {
    initServicePage();
  },
  'price-list-page': function () {
    initPriceListPage();
  },
  'contacts-page': function () {
    initContactsPage();
  },
};

// get body class on the page
const currentPageClass = $(document.body).attr('class');

// scripts for all pages
initHeaderNav();
initHeaderElements();

if (pageConformity[currentPageClass]) {
  pageConformity[currentPageClass]();
}
