const values = require('object.values');
const cars = require('./auto.json');
const categories = require('./categories.json');
const priceList = require('./price-list.json');

const categoryNumber = cars['Alfa Romeo'].models['147'];

for (let key in priceList) {
  const value = values(priceList[key])[categoryNumber - 1];
  console.log(`${key}: ${value}`);
}
