import $ from 'jquery';
import { goToElement } from '../../helpers';

export default function () {
  if (location.hash) {
    goToElement($('.main-header'));
  }
}
