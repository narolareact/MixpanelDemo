import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import FIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Firebase from '../../Config/firebase';
import { Color, Matrics } from '../../Config';
import { LoadWheel } from '../../Component/LoadWheel';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: "",
      loading: false
    };
  }
  static navigationOptions = ({ navigation }) => ({
    headerTitle: "Forgot Password",
    headerLeft: (
      <Icon
        name="arrowleft"
        size={20}
        style={{ marginLeft: Matrics.ScaleValue(10) }}
        onPress={() => navigation.goBack()}
      />
    )
  });

  onSendPress = () => {
    const { Email } = this.state;
    if (Email === '') {
      this.setState({ error: 'Please Enter The EmailId' });
    } else {
      this.setState({ loading: true });
      Firebase.auth()
        .sendPasswordResetEmail(Email)
        .then(() => {
          this.setState({ loading: false });
          Alert.alert("", "Please check your email...", [
            { text: "OK", onPress: () => console.log("ok") }
          ]);
        })
        .catch(e => {
          console.log("e-->", e);
          this.setState({ loading: false, error: e.message });
        });
    }
  };

  render() {
    return (
      <SafeAreaView style={Styles.container}>
        <View style={Styles.inputContainer}>
          <FIcon name="email" size={20} />
          <TextInput
            placeholder="Email"
            value={this.state.Email}
            onChangeText={text => this.setState({ Email: text, error: "" })}
            style={Styles.input}
          />
        </View>
        <Text style={Styles.errorText}>{this.state.error}</Text>
        <TouchableOpacity
          style={Styles.btnContainer}
          onPress={this.onSendPress}
        >
          <Text style={Styles.btnText}>Send</Text>
        </TouchableOpacity>
        <LoadWheel visible={this.state.loading} />
      </SafeAreaView>
    );
  }
}

const Styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    padding: Matrics.ScaleValue(10),
    borderWidth: 1,
    borderColor: Color.borderColor,
    flexDirection: "row",
    borderRadius: Matrics.ScaleValue(10),
    margin: Matrics.ScaleValue(10),
  },
  input: {
    marginLeft: Matrics.ScaleValue(10),
    width: "80%",
    padding: 0,
  },
  btnContainer: {
    backgroundColor: Color.Btncolor,
    marginHorizontal: Matrics.ScaleValue(20),
    paddingVertical: Matrics.ScaleValue(10),
    paddingHorizontal: Matrics.ScaleValue(80),
    borderRadius: 10,
    marginVertical: Matrics.ScaleValue(10)
  },
  btnText: {
    color: Color.White,
    fontSize: Matrics.ScaleValue(16),
    textAlign: "center",
  },
  errorText: {
    fontSize: Matrics.ScaleValue(20),
    textAlign: 'center',
    color: Color.RedColor
  }
};
