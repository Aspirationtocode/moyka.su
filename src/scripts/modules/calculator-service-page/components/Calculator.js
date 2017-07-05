import React, { Component } from 'react';
import AutoSelector from './AutoSelector';
import CarInfo from './CarInfo';
import FlexContainer from '../../ordinary-react-components/FlexContainer';

import auto from '../../../../data/calculator/auto';
import categories from '../../../../data/calculator/categories';

class Calculator extends Component {
  constructor() {
    super();
    this.handleMarkChange = this.handleMarkChange.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
    this.renderCarInfo = this.renderCarInfo.bind(this);
    this.state = {
      modelsDisabled: true,
      selectOptionsModels: [],
      currentCarMark: null,
      currentCarModel: null,
      currentCarDetails: null,
      modelPlaceholder: 'Выберите модель',
    };
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
        model: model,
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
      return <CarInfo group={group} category={category} price={10000} />;
    }
    return <CarInfo withoutData />;
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
      </div>
    );
  }
}

export default Calculator;
