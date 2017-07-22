import React, { Component } from 'react';
import includes from 'array-includes';
import AutoSelector from './AutoSelector';
import CarInfo from './CarInfo';
import ServiceUnits from './ServiceUnits';

import { auto, categories, priceList, countableServices } from '../../../../data';

class Calculator extends Component {
  constructor() {
    super();
    this.handleMarkChange = this.handleMarkChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
    this.renderCarInfo = this.renderCarInfo.bind(this);
    this.renderPriceList = this.renderPriceList.bind(this);
    this.renderServiceUnits = this.renderServiceUnits.bind(this);
    this.handleServiceSelect = this.handleServiceSelect.bind(this);
    this.handleCountableServicesChange = this.handleCountableServicesChange.bind(this);
    this.state = {
      modelsDisabled: true,
      selectOptionsModels: [],
      currentCarMark: null,
      currentCarModel: null,
      currentCarDetails: null,
      currentGroup: null,
      modelPlaceholder: 'Выберите модель',
      selectedServices: [],
      currentPrice: 0,
      countableServices,
    };
  }
  handleCountableServicesChange(newCountableServices) {
    this.setState({ countableServices: newCountableServices });
  }
  handleServiceSelect(serviceTitle, checked) {
    const { state } = this;
    if (checked) {
      this.setState({
        selectedServices: [...state.selectedServices, serviceTitle],
      });
    } else {
      const newSelectedServices = state.selectedServices.filter(
        service => service !== serviceTitle,
      );
      this.setState({
        selectedServices: newSelectedServices,
      });
    }
  }
  handlePriceChange(value) {
    const { state } = this;
    this.setState({
      currentPrice: state.currentPrice + value,
    });
  }
  handleMarkChange(mark, currentModels) {
    const { state } = this;
    const isCurrentCarMarkEqualValue = state.currentCarMark === mark;
    this.setState({
      modelsDisabled: false,
      selectOptionsModels: currentModels,
      currentCarMark: mark,
      currentCarDetails: isCurrentCarMarkEqualValue ? state.currentCarDetails : null,
      modelPlaceholder: isCurrentCarMarkEqualValue ? state.currentCarModel : 'Выберите модель',
    });
  }
  handleModelChange(model) {
    const { state } = this;
    const currentGroup = auto[state.currentCarMark].models[model];
    let currentPrice = 0;
    for (const key in priceList) {
      const currentSection = priceList[key];
      for (const innerKey in currentSection) {
        if (includes(state.selectedServices, innerKey)) {
          let currentMultiplier = 1;
          if (state.countableServices[innerKey]) {
            currentMultiplier = state.countableServices[innerKey].multiplier
              ? state.countableServices[innerKey].multiplier
              : 1;
          }
          currentPrice += currentSection[innerKey][currentGroup - 1] * currentMultiplier;
        }
      }
    }
    this.setState({
      currentCarModel: model,
      currentCarDetails: {
        mark: state.currentCarMark,
        model,
      },
      modelPlaceholder: model,
      currentGroup,
      currentPrice,
    });
  }
  renderCarInfo() {
    const { state } = this;
    if (state.currentCarDetails) {
      const group = state.currentGroup;
      const category = categories[group].category;
      return <CarInfo group={group} category={category} price={state.currentPrice} />;
    }
    return null;
  }
  renderPriceList() {
    const { state } = this;
    if (state.currentCarDetails) {
      const group = state.currentGroup;
      const currentPriceList = {};
      for (const key in priceList) {
        currentPriceList[key] = priceList[key][group];
      }
    }
  }
  renderServiceUnits() {
    const { state } = this;
    if (state.currentCarDetails) {
      const group = state.currentGroup;
      return (
        <ServiceUnits
          selectedServices={state.selectedServices}
          countableServices={state.countableServices}
          group={group}
          priceList={priceList}
          handlePriceChange={this.handlePriceChange}
          handleServiceSelect={this.handleServiceSelect}
          handleCountableServicesChange={this.handleCountableServicesChange}
        />
      );
    }
    return null;
  }
  render() {
    const { state } = this;
    return (
      <div className="calculator">
        <div className="calculator-data">
          <div className="calculator-data__input">
            <AutoSelector type="mark" selectData={auto} handleMarkChange={this.handleMarkChange} />
            <AutoSelector
              type="model"
              selectData={auto}
              selectOptionsModels={state.selectOptionsModels}
              modelsDisabled={state.modelsDisabled}
              handleModelChange={this.handleModelChange}
              modelPlaceholder={state.modelPlaceholder}
            />
          </div>
          <div className="calculator-data__output">
            {this.renderCarInfo()}
          </div>
        </div>
        {this.renderServiceUnits()}
      </div>
    );
  }
}

export default Calculator;
