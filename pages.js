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
  {
    title: 'Партнеры',
    filename: 'partners',
  },
  {
    title: 'Вакансии',
    filename: 'vacancies',
  },
  {
    title: 'Галерея',
    filename: 'galery',
  },
  {
    title: 'Скидки и акции',
    filename: 'discounts',
  },
  {
    title: 'Первое посещение',
    filename: 'first-visit',
  },
  {
    title: 'Клубная карта',
    filename: 'club-card',
  },
  {
    title: 'Накопления',
    filename: 'accumulations',
  },
  {
    title: 'Получить клубную карту',
    filename: 'get-club-card',
  },
  {
    title: 'Автоклубам',
    filename: 'autoclubs',
  },
];

const pages = pagesData.map((page) => {
  const { title, filename } = page;
  return new HtmlWebpackPlugin({
    title: `${title} | Мойка.su`,
    menuElements: templateData.menuElements,
    template: path.resolve(`src/views/${filename}.pug`),
    hash: true,
    filename: `${filename}.html`,
  });
});

module.exports = pages;
