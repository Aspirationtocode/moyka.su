import viewport from 'get-viewport-size';
import $ from 'jquery';
import hazTouch from 'haz-touch';

export default function initHeaderNav() {
  const burger = $('.header-nav-mobile__burger');
  const headerNavOverlay = $('.header-nav-overlay');
  const headerNavWrapper = $('.header-nav-wrapper');

  burger.on('click', function () {
    headerNavWrapper.toggleClass('header-nav-wrapper--mobile');
    headerNavOverlay.toggleClass('active');
    $(this).toggleClass('header-nav-mobile__burger--close');
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

  if (!hazTouch) {
    $('.header-nav__element').hover(
      function () {
        $(this).addClass('header-nav__element--active-hover');
        setTimeout(
          () => {
            $(this).addClass('header-nav__element--active-pointer-events');
          },
          1,
        );
      },
      function () {
        $(this).removeClass(
          'header-nav__element--active-hover header-nav__element--active-pointer-events',
        );
      },
    );
  } else {
    $('.header-nav__element').on('click', function () {
      $('.header-nav__element').removeClass(
        'header-nav__element--active-hover header-nav__element--active-pointer-events',
      );
      $(this).addClass('header-nav__element--active-hover');
      setTimeout(
        () => {
          $(this).addClass('header-nav__element--active-pointer-events');
        },
        1,
      );
    });
  }

  $(document).click((event) => {
    if (!$(event.target).closest('.header-nav').length) {
      if ($('.header-nav').is(':visible')) {
        $('.header-nav__element').removeClass(
          'header-nav__element--active-hover header-nav__element--active-pointer-events',
        );
      }
    }
  });

  $('.header-nav').hover(
    () => {
      $('.header-logo').addClass('opacitied');
    },
    () => {
      $('.header-logo').removeClass('opacitied');
    },
  );
}
