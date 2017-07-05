import React, { Component } from 'react';
import AutoSelector from './AutoSelector';
import FlexContainer from '../../ordinary-react-components/FlexContainer';

import auto from '../../../../data/calculator/auto';
class Calculator extends Component {
  constructor() {
    super();
    this.handleMarkChange = this.handleMarkChange.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
    this.state = {
      modelsDisabled: true,
      selectOptionsModels: [],
      currentCarMark: null,
      currentCarModel: null,
      currentCarDetails: null,
      modelPlaceholder: 'Выберите модель',
    };
  }
  handleMarkChange(value, currentModels) {
    const { state } = this;
    this.setState({
      modelsDisabled: false,
      selectOptionsModels: currentModels,
      currentCarMark: value,
      currentCarDetails: state.currentCarMark === value ? state.currentCarDetails : null,
      modelPlaceholder: state.currentCarMark === value ? state.currentCarModel : 'Выберите модель',
    });
  }
  handleModelChange(value) {
    const { state } = this;
    this.setState({
      currentCarModel: value,
      currentCarDetails: {
        mark: state.currentCarMark,
        model: value,
      },
      modelPlaceholder: value,
    });
  }
  render() {
    const { state } = this;
    const { currentCarDetails } = state;
    let details = 'Нет данных';
    if (currentCarDetails) {
      details = currentCarDetails.mark +
        '&' +
        currentCarDetails.model +
        ' Класс:' +
        auto[currentCarDetails.mark].models[currentCarDetails.model];
    }

    return (
      <div className="calculator">
        {details}
        <FlexContainer>
          <AutoSelector type="mark" selectData={auto} handleMarkChange={this.handleMarkChange} />
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
    );
  }
}

export default Calculator;
