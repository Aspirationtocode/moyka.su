import '../views/index.pug';
import '../styles/main.styl';
import $ from 'jquery';
import initHeaderNav from './modules/init-header-nav';

initHeaderNav();

const beforeCar = $('.header-cars__element--before');
const afterCar = $('.header-cars__element--after');
const headerLocation = $('.header-location');
const headerLogo = $('.header-logo');

animate(beforeCar, 1000);
animate(headerLocation, 1000);
animate(headerLogo, 1000);
animate(afterCar, 2000);

function animate(element, timeout) {
  if (timeout) {
    setTimeout(
      () => {
        element.addClass('animated');
      },
      timeout,
    );
  } else {
    element.addClass('animated');
  }
}
