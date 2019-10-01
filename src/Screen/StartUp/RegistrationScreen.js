import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  AsyncStorage,
  Platform
} from "react-native";
// import AsyncStorage from "@react-native-community/async-storage";
import Mixpanel from 'react-native-mixpanel';
import Icon from "react-native-vector-icons/FontAwesome5";
import FIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Firebase from "../../Config/firebase";
import { Color, Matrics } from "../../Config";
import { LoadWheel } from "../../Component/LoadWheel";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: "",
      Password: "",
      error: "",
      loading: false,
    };
  }
}