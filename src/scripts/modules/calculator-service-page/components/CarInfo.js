import React, { Component } from 'react';

import { discounts } from '../../../../data';

const makeDiscount = (price, percent) => {
  if (percent) {
    return price - Math.round(price * percent / 100);
  }
  return price;
};

class CarInfoSale extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { discount, updateCurrentDiscount, active } = this.props;
    const classes = ['sale'];
    if (active) {
      classes.push('sale--active');
    }
    return (
      <div
        className={classes.join(' ')}
        onClick={() => {
          updateCurrentDiscount(-discount);
        }}
      >
        {discount}%
      </div>
    );
  }
}

class CarInfo extends Component {
  constructor(props) {
    super(props);
    this.handleUpdateCurrentDiscount = this.handleUpdateCurrentDiscount.bind(this);
    this.state = {
      currentDiscount: 0,
    };
  }
  handleUpdateCurrentDiscount(discount) {
    this.setState({
      currentDiscount: discount,
    });
  }
  render() {
    const { group, category, price, withoutData } = this.props;
    const { currentDiscount } = this.state;
    if (!withoutData) {
      return (
        <div className="car-info">
          <div className="car-info__category">Категория: {category}</div>
          <div className="car-info__group">Группа: {group}</div>
          <div className="car-info__price-wrapper">
            Итоговая цена:
            {' '}
            <span className="car-info__price">
              {makeDiscount(price, currentDiscount)} ₽
            </span>
          </div>
          <div className="car-info__discount-wrapper">
            Применить скидку: <button
              className="car-info__discount"
              onClick={() => {
                this.handleUpdateCurrentDiscount(0);
              }}
            >
              Сбросить скидку
            </button>
          </div>
          <div className="car-info-sales">
            {discounts.map((discount, index) => (
              <CarInfoSale
                discount={discount}
                key={index}
                active={currentDiscount === -discount}
                updateCurrentDiscount={this.handleUpdateCurrentDiscount}
              />
            ))}
          </div>
        </div>
      );
    }
    return null;
  }
}

export default CarInfo;
