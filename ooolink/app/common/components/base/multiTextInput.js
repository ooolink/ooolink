/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
import React,{
  Component,
  TextInput,
} from 'react-native';

export default class Input extends Component {
  constructor() {
    super();
    this.state = {
      height: 35,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    const { defaultHeight } = this.props;

    if (defaultHeight) {
      this.setState({
        height: defaultHeight,
      });
    }
  }

  handleChange(event) {
    if (this.state.height !== event.nativeEvent.contentSize.height) {
      this.setState({
        height: Math.max(this.props.defaultHeight, event.nativeEvent.contentSize.height),
      });
    }

    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }

  resetInputText() {
    this.refs.input.setNativeProps({ text: '' });
    this.setState({
      height: this.props.defaultHeight,
    });
  }

  render() {
    return (
      <TextInput
        ref="input"
        multiline
        {...this.props}
        style={[{ height: this.state.height }, this.props.style]}
        onChange={this.handleChange}
      />);
  }
}

Input.propTypes = {
  style: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.array,
    React.PropTypes.object
  ]),
  onChange: React.PropTypes.func,
  defaultHeight: React.PropTypes.number,
};