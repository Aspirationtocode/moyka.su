import $ from 'jquery';
import { animate } from '../helpers';
export default function initHeaderElements() {
  const beforeCar = $('.header-cars__element--before');
  const afterCar = $('.header-cars__element--after');
  const headerLocation = $('.header-location');
  const headerLogo = $('.header-logo');
  const headerAppear = $('.header__appear');
  const headerLocationButton = $('.header-location__button');
  const headerLocationMap = $('.header-location__map');
  animate(800, headerAppear);
  animate(1000, beforeCar, headerLocation, headerLogo);
  animate(2000, afterCar);
  headerLocationButton.on('click', () => {
    headerLocationButton.text(
      headerLocationMap.hasClass('active') ? 'Показать на карте' : 'Свернуть карту',
    );
    headerLocationMap.toggleClass('active');
  });
}
