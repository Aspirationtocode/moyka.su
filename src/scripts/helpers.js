import arrayFrom from 'array-from';
import $ from 'jquery';

export const animate = (timeout, ...elements) => {
  arrayFrom(elements).forEach((element) => {
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
  });
};

export const checkOnCountAbility = string => string.slice(-6) === '(1 шт)';

export const goToElement = (element, animationDuration = 300) => {
  $('html, body').animate(
    {
      scrollTop: element.offset().top,
    },
    animationDuration,
  );
};

export const getHashText = hash => location.hash.slice(1);
