import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

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
              props.handleCheckboxChange(
                e,
                serviceTitle,
                checkOnCountAbility(serviceTitle)
                  ? props.countableServices[serviceTitle].multiplier * servicePrice
                  : servicePrice,
              );
            }}
            className="service-unit-element__checkbox"
          />
          <div className="service-unit-element__text">{serviceTitle}</div>
        </div>
        <div className="service-unit-right-part">
          {checkOnCountAbility(serviceTitle) &&
            <NumberInput
              value={props.countableServices[serviceTitle].multiplier}
              className="service-unit__number-input"
              style={{ input: { width: '50px' } }}
              min={1}
              max={100}
              onChange={(multiplier) => {
                props.handleCountChange(serviceTitle, servicePrice, multiplier);
              }}
            />}
          <div className="service-unit-element__price">
            {checkOnCountAbility(serviceTitle)
              ? servicePrice * props.countableServices[serviceTitle].multiplier
              : servicePrice}
            {' '}
            ₽
          </div>
        </div>
      </div>
    );
  }
}

export default ServiceUnitElement;
