import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  AsyncStorage,
} from "react-native";
import { Color, Matrics,Images } from "../Config";

export default class HomeScreen extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Home',
    headerTitleStyle: { textAlign: 'center', flexGrow: 1, alignSelf: 'center' },
    headerStyle: { backgroundColor: Color.Primary }
  });

  componentDidMount() {
    const Users = AsyncStorage.getItem('Users').then(async data => {
      if (data !== '') {
        const uData = data.trim();
        const userData = JSON.parse(uData);
        console.log('userData-->', userData);
        const firstName = userData.firstName;
        const lastName = userData.lastName;
        await this.setState({
          firstName,
          lastName,
        });
      }
    });
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>
          {
            this.state.firstName !== '' && this.state.firstName !== undefined
            ? 'WEl-COME '+this.state.firstName.toLocaleUpperCase()+ ' ' +this.state.lastName.toLocaleUpperCase()
            : 'WEL-COME'
          }
          
        </Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: Color.White,
      alignItems: 'center',
      justifyContent: 'center'
  },
  text: {
    marginTop: Matrics.ScaleValue(10),
  },
});
