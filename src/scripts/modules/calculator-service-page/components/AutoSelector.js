import React, { Component } from 'react';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

const fromStringsToObjects = array => array.map(element => ({ value: element, label: element }));

class AutoSelector extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.isMark = props.type === 'mark';
    this.state = {
      markPlaceholder: 'Выберите марку',
    };
  }
  handleChange(value) {
    const { props } = this;
    const currentValue = value.value;
    this.setState({
      markPlaceholder: currentValue,
    });
    if (this.isMark) {
      const currentModels = fromStringsToObjects(
        Object.keys(props.selectData[currentValue].models),
      );
      props.handleMarkChange(value.value, currentModels);
    } else {
      props.handleModelChange(value.value);
    }
  }
  render() {
    const { state } = this;
    const { type, selectData, selectOptionsModels, modelsDisabled, modelPlaceholder } = this.props;
    const selectOptionsMarks = fromStringsToObjects(Object.keys(selectData));
    const options = this.isMark ? selectOptionsMarks : selectOptionsModels;
    const classes = ['auto-selector'];
    classes.push(`auto-selector--${type}`);
    return (
      <div className={classes.join(' ')}>
        <Select
          className="select-custom"
          noResultsText="Результатов нет"
          placeholder={this.isMark ? state.markPlaceholder : modelPlaceholder}
          options={options}
          disabled={this.isMark ? false : modelsDisabled}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default AutoSelector;
