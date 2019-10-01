/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  AsyncStorage,
  View
} from "react-native";
import { Color, Matrics } from "../../Config";
import Mixpanel from 'react-native-mixpanel';
import Icon from "react-native-vector-icons/SimpleLineIcons";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Firebase from "../../Config/firebase";

export default class Setting extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Settings',
    headerTitleStyle: { textAlign: 'center', flexGrow: 1, alignSelf: 'center' },
    headerStyle: { backgroundColor: Color.Primary }
  });

  async onLogout() {
    await Firebase.auth().signOut();
    AsyncStorage.clear();
    // Mixpanel.reset();
    this.props.navigation.navigate("Login");
  }

  render() {
    return (
      <SafeAreaView style={Styles.container}>
        <TouchableOpacity
          style={Styles.innerContainer}
          onPress={() => {
            this.props.navigation.navigate("Editprofile");
          }}
        >
          <Text style={Styles.maintext}>EditProfile</Text>
          <Icon size={20} name="arrow-right-circle" style={Styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={Styles.innerContainer}
          onPress={() => this.onLogout()}
        >
          <Text style={Styles.maintext}>Logout</Text>
          <MIcon
            size={20}
            name="logout"
            style={[Styles.icon, { color: 'red' }]}
          />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const Styles = {
  container: {
    flex: 1,
  },
  innerContainer: {
    flexDirection: 'row',
    borderBottomColor: Color.borderColor,
    borderBottomWidth: 0.9,
    padding: Matrics.ScaleValue(15),
    justifyContent: 'space-between',
    marginHorizontal: Matrics.ScaleValue(10)
  },
  maintext: {
    fontSize: Matrics.ScaleValue(18),
  },
  icon: {
    marginRight: Matrics.ScaleValue(10),
  }
};
