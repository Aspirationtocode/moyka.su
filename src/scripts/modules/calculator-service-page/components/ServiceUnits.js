import React, { Component } from 'react';
import entries from 'object.entries';
import assign from 'object.assign';
import assignDeep from 'object-assign-deep';
import update from 'react-addons-update';

import ServiceUnitElement from './ServiceUnitElement';

import countableServices from '../../../../data/calculator/countable-services';

class ServiceUnits extends Component {
  constructor(props) {
    super(props);
    this.renderUnit = this.renderUnit.bind(this);
    this.renderUnits = this.renderUnits.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleCountChange = this.handleCountChange.bind(this);
    this.state = {
      countableServices,
    };
  }
  handleCountChange(serviceTitle, servicePrice, multiplier) {
    const { state, props } = this;
    const isPriceIncreases = state.countableServices[serviceTitle].multiplier < multiplier;
    this.setState({
      countableServices: assignDeep({}, state.countableServices, {
        [serviceTitle]: { multiplier },
      }),
    });
    if (state.countableServices[serviceTitle].checked) {
      props.handlePriceChange(isPriceIncreases ? servicePrice : -servicePrice, true);
    }
  }
  handleCheckboxChange(e, serviceTitle, servicePrice) {
    const { props, state } = this;
    const { checked } = e.target;
    if (state.countableServices[serviceTitle]) {
      this.setState({
        countableServices: assignDeep({}, state.countableServices, {
          [serviceTitle]: { checked },
        }),
      });
    }
    const value = checked ? servicePrice : -servicePrice;
    props.handlePriceChange(value, false);
  }
  renderUnit(unit) {
    const { handleCountChange } = this.props;
    const { state } = this;
    const header = entries(unit)[0][1];
    const services = entries(unit).slice(1).map((service, index) => {
      const [serviceTitle, servicePrice] = [service[0], service[1]];
      return (
        <ServiceUnitElement
          key={index}
          serviceTitle={serviceTitle}
          servicePrice={servicePrice}
          handleCheckboxChange={this.handleCheckboxChange}
          countableServices={state.countableServices}
          handleCountChange={this.handleCountChange}
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
