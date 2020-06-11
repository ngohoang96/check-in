import React, {Component} from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {Metrics} from '../theme';
export default class Input extends Component {
  shouldComponentUpdate({value: newValue}) {
    return newValue !== this.props.value;
  }
  componentDidMount() {
    if (this.props.onRef != null) {
      this.props.onRef(this);
    }
  }

  render() {
    const {...inputProps} = this.props;
    return (
      <TextInput
        ref={(input) => (this.textInput = input)}
        style={styles.container}
        {...inputProps}
        placeholderTextColor="#474548"
      />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(206, 226, 216, 0.8)',
    width: Metrics.appWidth - 40,
    paddingVertical: 10,
    borderRadius: 10,
    fontSize: 17,
    color: '#474548',
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    marginVertical: 8,
    paddingHorizontal: 20,
  },
});
