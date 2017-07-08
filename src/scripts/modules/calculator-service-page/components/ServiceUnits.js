import React, { Component } from 'react';
import entries from 'object.entries';

import ServiceUnitElement from './ServiceUnitElement';

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
    const header = entries(unit)[0][1];
    const services = entries(unit).slice(1).map((service, index) => {
      const [serviceTitle, servicePrice] = [service[0], service[1]];
      return (
        <ServiceUnitElement
          key={index}
          serviceTitle={serviceTitle}
          servicePrice={servicePrice}
          handleCheckboxChange={this.handleCheckboxChange}
        />
      );
    });
    return (
      <div className="service-unit" key={header}>
        <div className="service-unit__header">{header}</div>
        {services}
      </div>
    );
  }
  renderUnits() {
    const { group, priceList } = this.props;
    const currentPriceList = [];
    for (let [key, value] of entries(priceList)) {
      let currentUnit = {};
      currentUnit.header = key;
      for (let [innerKey, innerValue] of entries(value)) {
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
