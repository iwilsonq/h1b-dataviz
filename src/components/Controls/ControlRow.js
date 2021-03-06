import React, { Component } from 'react';
import _ from 'lodash';

import Toggle from './Toggle';

class ControlRow extends Component {
  componentWillMount() {
    let toggles = this.props.toggleNames,
      toggleValues = _.zipObject(
        toggles,
        toggles.map(name => name === this.props.picked)
      );

    this.setState({ toggleValues });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.picked !== nextProps.picked) {
      this.makePick(nextProps.picked, true); 
    }
  }

  makePick = (picked, newState) => {
    let toggleValues = this.state.toggleValues;
    toggleValues = _.mapValues(
      toggleValues,
      (value, key) => newState && key == picked // eslint-disable-line 
    );

    // if newState is false, we want to reset
    this.props.updateDataFilter(picked, !newState);
    this.setState({ toggleValues });
  }

  _addToggle = name => {
    let key = `toggle-${name}`,
      label = name;

    if (this.props.capitalize) {
      label = label.toUpperCase();
    }

    return (
      <Toggle 
        key={key}
        label={label}
        name={name}
        value={this.state.toggleValues[name]}
        onClick={this.makePick}
      />
    )
  }
  
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          {this.props.toggleNames.map(name => this._addToggle(name))}
        </div>
      </div>
    );
  }
}

export default ControlRow;