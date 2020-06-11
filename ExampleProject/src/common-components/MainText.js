import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'
import { Colors } from '../theme';
export default (props = {}) => {
    return (
      <Text {...props} style={[styles.text, props.style,]}>
        {props.children}
      </Text>
    );
  };
const styles = StyleSheet.create({
    text: {
      color: Colors.text,
      fontFamily: 'Montserrat-Medium',
      fontSize: 16,
    },
  });
  