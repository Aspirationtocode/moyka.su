import React, { Component } from 'react';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

class AutoSelector extends Component {
  constructor(props) {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      placeholderValue: props.type === 'mark' ? 'Выберите марку' : props.modelPlaceholder,
    };
  }
  handleChange(value) {
    const { props } = this;
    const currentValue = value.value;
    this.setState({
      placeholderValue: currentValue,
    });
    if (props.type === 'mark') {
      const currentModels = Object.keys(props.selectData[currentValue].models).map(option => {
        return {
          value: option,
          label: option,
        };
      });
      props.handleMarkChange(value.value, currentModels);
    }
    if (props.type === 'model') {
      props.handleModelChange(value.value);
    }
  }
  render() {
    const { state, props } = this;
    const { type, selectData, selectOptionsModels, modelsDisabled } = this.props;
    const selectOptions = Object.keys(selectData).map(option => {
      return {
        value: option,
        label: option,
      };
    });
    const options = type === 'mark' ? selectOptions : selectOptionsModels;
    const classes = ['auto-selector'];
    classes.push(`auto-selector--${type}`);
    return (
      <div className={classes.join(' ')}>
        <Select
          className="select-custom"
          noResultsText="Результатов нет"
          placeholder={props.type === 'mark' ? state.placeholderValue : props.modelPlaceholder}
          options={options}
          disabled={type === 'mark' ? false : modelsDisabled}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default AutoSelector;
