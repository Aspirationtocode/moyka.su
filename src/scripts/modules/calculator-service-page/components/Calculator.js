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
