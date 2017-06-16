import viewport from 'get-viewport-size';
import $ from 'jquery';

export default function initHeaderNav() {
  const burger = $('.header-nav-mobile__burger');
  const headerNavOverlay = $('.header-nav-overlay');
  const headerNavWrapper = $('.header-nav-wrapper');

  burger.on('click', (event) => {
    headerNavWrapper.toggleClass('header-nav-wrapper--mobile');
    headerNavOverlay.toggleClass('active');
  });

  $(window).on('resize', (event) => {
    if (viewport().width > 722) {
      headerNavWrapper.removeClass('header-nav-wrapper--mobile');
      headerNavOverlay.removeClass('active');
    }
  });

  for (let i = 0; i < $('.header-nav__element--with-dot').length; i++) {
    $(`.header-nav__element--${i + 1}s`).on('click', (event) => {
      $('.header-nav__element--with-dot').removeClass('header-nav__element--active');
      $(`.header-nav__element--${i + 1}s`).toggleClass('header-nav__element--active');
    });
  }

  $('.header-nav__element').hover(
    function () {
      $(this).addClass('header-nav__element--active-hover');
      setTimeout(() => {
        $(this).addClass('header-nav__element--active-pointer-events');
      });
    },
    function () {
      $(this).removeClass(
        'header-nav__element--active-hover header-nav__element--active-pointer-events',
      );
    },
  );
}