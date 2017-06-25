import arrayFrom from 'array-from';

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