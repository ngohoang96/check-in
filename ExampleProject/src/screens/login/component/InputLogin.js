import React, {Component} from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';
import {Metrics} from '../../theme';

export default class InputLogin extends Component {
  shouldComponentUpdate({value: newValue}) {
    return newValue !== this.props.value;
  }
  render() {
    const {...inputProps} = this.props;
    return (
      <TextInput
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
    width: Metrics.appWidth - 120,
    paddingVertical: 10,
    borderRadius: 22,
    fontSize: 17,
    color: '#474548',
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    marginVertical: 8,
    paddingHorizontal: 20,
  },
});
