import React, { Component } from 'react';

import discounts from '../../../../data/calculator/discounts';

const CarInfoSale = ({ number }) => <div className="sale">{number}%</div>;

class CarInfo extends Component {
  render() {
    const { group, category, price, withoutData } = this.props;
    if (!withoutData) {
      return (
        <div className="car-info">
          <div className="car-info__category">Категория: {category}</div>
          <div className="car-info__group">Группа: {group}</div>
          <div className="car-info__price-wrapper">
            Итоговая цена: <span className="car-info__price">{price} ₽</span>
          </div>
          <div className="car-info__discount-wrapper">
            Применить скидку: <button className="car-info__discount">Сбросить скидку</button>
          </div>
          <div className="car-info-sales">
            {discounts.map((number, index) => {
              return <CarInfoSale number={number} key={index} />;
            })}
          </div>
        </div>
      );
    }
    return <div className="car-info">Введите марку и модель машины..</div>;
  }
}

export default CarInfo;
