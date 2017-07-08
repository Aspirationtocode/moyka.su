import React, { Component } from 'react';
import AutoSelector from './AutoSelector';
import CarInfo from './CarInfo';
import ServiceUnits from './ServiceUnits';
import FlexContainer from '../../ordinary-react-components/FlexContainer';

import auto from '../../../../data/calculator/auto';
import categories from '../../../../data/calculator/categories';
import priceList from '../../../../data/calculator/price-list';

class Calculator extends Component {
  constructor() {
    super();
    this.handleMarkChange = this.handleMarkChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
    this.renderCarInfo = this.renderCarInfo.bind(this);
    this.renderPriceList = this.renderPriceList.bind(this);
    this.renderServiceUnits = this.renderServiceUnits.bind(this);
    this.state = {
      modelsDisabled: true,
      selectOptionsModels: [],
      currentCarMark: null,
      currentCarModel: null,
      currentCarDetails: null,
      modelPlaceholder: 'Выберите модель',
      currentPrice: 0,
    };
  }
  handlePriceChange(value, isCountable) {
    const { state } = this;
    if (isCountable) {
      this.setState({
        currentPrice: state.currentPrice + value,
      });
    } else {
      this.setState({
        currentPrice: state.currentPrice + value,
      });
    }
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
    this.setState({
      currentCarModel: model,
      currentCarDetails: {
        mark: state.currentCarMark,
        model,
      },
      modelPlaceholder: model,
    });
  }
  renderCarInfo() {
    const { state } = this;
    if (state.currentCarDetails) {
      const { mark, model } = state.currentCarDetails;
      const group = auto[mark].models[model];
      const category = categories[group].category;
      return <CarInfo group={group} category={category} price={state.currentPrice} />;
    }
    return <CarInfo withoutData />;
  }
  renderPriceList() {
    const { state } = this;
    if (state.currentCarDetails) {
      const { mark, model } = state.currentCarDetails;
      const group = auto[mark].models[model];
      const currentPriceList = {};
      for (let key in priceList) {
        currentPriceList[key] = priceList[key][group];
      }
    }
  }
  renderServiceUnits() {
    const { state } = this;
    if (state.currentCarDetails) {
      const { mark, model } = state.currentCarDetails;
      const group = auto[mark].models[model];
      return (
        <ServiceUnits
          group={group}
          priceList={priceList}
          handlePriceChange={this.handlePriceChange}
        />
      );
    }
  }
  render() {
    const { state } = this;
    return (
      <div className="calculator">
        <div className="calculator-data">
          <div className="calculator-data__input">
            <FlexContainer>
              <AutoSelector
                type="mark"
                selectData={auto}
                handleMarkChange={this.handleMarkChange}
              />
              <AutoSelector
                type="model"
                selectData={auto}
                selectOptionsModels={state.selectOptionsModels}
                modelsDisabled={state.modelsDisabled}
                handleModelChange={this.handleModelChange}
                modelPlaceholder={state.modelPlaceholder}
              />
            </FlexContainer>
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
