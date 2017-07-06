import React, { Component } from 'react';
import 'rc-checkbox/assets/index.css';
import ReactCheckbox from 'rc-checkbox';
import NumberInput from 'react-numeric-input';
import { checkOnCountAbility } from '../../../helpers';

class ServiceUnits extends Component {
  constructor(props) {
    super(props);
    this.renderUnit = this.renderUnit.bind(this);
    this.renderUnits = this.renderUnits.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }
  handleCheckboxChange(e, price) {
    const { props } = this;
    const { checked } = e.target;
    const value = checked ? price : -price;
    props.handlePriceChange(value);
  }
  renderUnit(unit) {
    const { handleCountChange } = this.props;
    const header = Object.entries(unit)[0][1];
    const services = Object.entries(unit).slice(1).map((service, index) => {
      const [serviceTitle, servicePrice] = [service[0], service[1]];
      return (
        <div className="service-unit-element" key={index}>
          <div className="service-unit-left-part">
            <ReactCheckbox
              onChange={(e) => {
                this.handleCheckboxChange(e, servicePrice);
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
    });
    return (
      <div className="service-unit">
        <div className="service-unit__header">{header}</div>
        {services}
      </div>
    );
  }
  renderUnits() {
    const { group, priceList } = this.props;
    const currentPriceList = [];
    for (let [key, value] of Object.entries(priceList)) {
      let currentUnit = {};
      currentUnit.header = key;
      for (let [innerKey, innerValue] of Object.entries(value)) {
        currentUnit[innerKey] = innerValue[group];
      }
      currentPriceList.push(this.renderUnit(currentUnit));
    }
    return currentPriceList;
  }
  render() {
    const { props } = this;
    return (
      <div className="service-units">
        {this.renderUnits()}
      </div>
    );
  }
}

export default ServiceUnits;
