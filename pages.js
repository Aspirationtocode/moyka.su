const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const templateData = require('./src/data');

const pagesData = [
  {
    title: 'Услуги',
    filename: 'index',
  },
  {
    title: 'Калькулятор услуг',
    filename: 'calculator-service',
  },
  {
    title: 'О нас',
    filename: 'about-us',
  },
];

const pages = pagesData.map((page) => {
  const { title, filename } = page;
  return new HtmlWebpackPlugin({
    title,
    menuElements: templateData.menuElements,
    template: path.resolve(`src/views/${filename}.pug`),
    hash: true,
    filename: `${filename}.html`,
  });
});

module.exports = pages;
