import React, { Component } from 'react';

import 'rc-checkbox/assets/index.css';
import ReactCheckbox from 'rc-checkbox';
import NumberInput from 'react-numeric-input';

import { checkOnCountAbility } from '../../../helpers';

class ServiceUnitElement extends Component {
  render() {
    const { props } = this;
    const { serviceTitle, servicePrice } = props;
    return (
      <div className="service-unit-element">
        <div className="service-unit-left-part">
          <ReactCheckbox
            onChange={(e) => {
              props.handleCheckboxChange(e, servicePrice);
            }}
            className="service-unit-element__checkbox"
          />
          <div className="service-unit-element__text">{serviceTitle}</div>
        </div>
        <div className="service-unit-right-part">
          {checkOnCountAbility(serviceTitle) &&
            <NumberInput
              value={1}
              className="service-unit__number-input"
              style={{ input: { width: '50px' } }}
              min={1}
              max={4}
            />}
          <div className="service-unit-element__price">{servicePrice} ₽</div>
        </div>
      </div>
    );
  }
}

export default ServiceUnitElement;
