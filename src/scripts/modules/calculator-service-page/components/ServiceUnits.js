import React, { Component } from 'react';
import PropTypes from 'prop-types';
import entries from 'object.entries';
import assignDeep from 'object-assign-deep';

import ServiceUnitElement from './ServiceUnitElement';

class ServiceUnits extends Component {
  constructor(props) {
    super(props);
    this.renderUnit = this.renderUnit.bind(this);
    this.renderUnits = this.renderUnits.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleCountChange = this.handleCountChange.bind(this);
    this.state = {
      countableServices: props.countableServices,
    };
  }
  handleCountChange(serviceTitle, servicePrice, multiplier) {
    const { state, props } = this;
    const isPriceIncreases = state.countableServices[serviceTitle].multiplier < multiplier;
    const newCountableServices = assignDeep({}, state.countableServices, {
      [serviceTitle]: { multiplier },
    });
    this.setState({
      countableServices: newCountableServices,
    });
    props.handleCountableServicesChange(newCountableServices);
    if (state.countableServices[serviceTitle].checked) {
      props.handlePriceChange(isPriceIncreases ? servicePrice : -servicePrice);
    }
  }
  handleCheckboxChange(e, serviceTitle, servicePrice) {
    const { props, state } = this;
    const { checked } = e.target;
    props.handleServiceSelect(serviceTitle, checked);
    if (state.countableServices[serviceTitle]) {
      const newCountableServices = assignDeep({}, state.countableServices, {
        [serviceTitle]: { checked },
      });
      props.handleCountableServicesChange(newCountableServices);
      this.setState({
        countableServices: newCountableServices,
      });
    }
    const value = checked ? servicePrice : -servicePrice;
    props.handlePriceChange(value);
  }
  renderUnit(unit) {
    const { state, props } = this;
    const header = entries(unit)[0][1];
    const services = entries(unit).slice(1).map((service, index) => {
      const [serviceTitle, servicePrice] = [service[0], service[1]];
      return (
        <ServiceUnitElement
          selectedServices={props.selectedServices}
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
    for (const [key, value] of entries(priceList)) {
      const currentUnit = {};
      currentUnit.header = key;
      for (const [innerKey, innerValue] of entries(value)) {
        currentUnit[innerKey] = innerValue[group - 1];
      }
      currentPriceList.push(this.renderUnit(currentUnit));
    }
    return currentPriceList;
  }
  render() {
    return (
      <div className="service-units">
        {this.renderUnits()}
      </div>
    );
  }
}

ServiceUnits.propTypes = {
  group: PropTypes.number.isRequired,
  priceList: PropTypes.object.isRequired,
  handlePriceChange: PropTypes.func.isRequired,
};

export default ServiceUnits;
