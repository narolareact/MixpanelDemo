/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { View } from "react-native";
var Spinner = require('react-native-spinkit');
import { Color, Matrics } from '../Config';

export const LoadWheel = ({ visible, text, onRequestClose }) => {
  return (
    <View
      style={{
        position: "absolute",
        justifyContent: "center",
        height: visible ? "100%" : 0,
        width: visible ? "100%" : 0,
        alignItems: "center"
      }}
    >
      <Spinner
        style={{ justifyContent: 'center', alignItems: 'center' }}
        isVisible={visible}
        size={40}
        type={'WanderingCubes'}
        color={Color.AppColor}
      />
    </View>
  );
};
