import React from 'react';
import ReactDOM from 'react-dom';
import PriceList from './components/PriceList';

export default function () {
  ReactDOM.render(<PriceList />, document.getElementById('price-list'));
}
