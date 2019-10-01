/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
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

  async componentDidMount(){
    Mixpanel.sharedInstanceWithToken('a70648a33c94bbde520bf65b93d94129');
    const isLogin = await AsyncStorage.getItem('login');
    if (isLogin === 'true') {
      this.props.navigation.navigate("Tabhome");
    } else {
      this.props.navigation.navigate("Login");
    }
  }

  onLoginPress = () => {
    this.setState({ loading: true });
    const { Email, Password } = this.state;
    if (Email === "" && Password === "") {
      this.setState({ error: "Please Fill All The Value" });
    } else {
      Firebase.auth()
        .signInWithEmailAndPassword(Email, Password)
        .then(() => {
          console.log("then");
          this.onLoginSuccess('signIn');
        })
        .catch(() => {
          // console.log("catch");
          // this.onLoginFailed();
          Firebase.auth()
              .createUserWithEmailAndPassword(Email, Password)
              .then(() => this.onLoginSuccess('signUp'))
              .catch(() => this.onLoginFailed());
        });

      // Firebase.auth()
      //   .signInWithEmailAndPassword(Email, Password)
      //   .then(console.log("then"), this.onLoginSuccess)
      //   .catch(console.log("catch"), this.onLoginFailed);
      // .catch(() => {
      //   Firebase.auth()
      //     .createUserWithEmailAndPassword(Email, Password)
      //     .then(this.onLoginSuccess)
      //     .catch(this.onLoginFailed);
      // });
    }
  };

  async onLoginSuccess(type) {
    console.log("login success", type);
    await AsyncStorage.setItem("login", "true");
    const UserData = {
      firstName: "Test",
      lastName: "Test",
      email: this.state.Email,
      address: "Surat",
      image: "",
      contactNo: "5252525522"
    };
    console.log("login success", UserData);
    await AsyncStorage.setItem("Users", JSON.stringify(UserData));
    Mixpanel.track("SignIn")
    // if(type === 'signIn'){
    //   Mixpanel.identify(this.state.Email);
    // } else if(type === 'signUp'){
    //   Mixpanel.createAlias(this.state.Email);
    // }
    Mixpanel.createAlias(this.state.Email);
    Mixpanel.identify(this.state.Email);
    Mixpanel.trackWithProperties("Number Of Login Attempt", { 'Login Count': 1 });
    Mixpanel.increment("Login Count", 1);
    Mixpanel.set({"$email": this.state.Email, "userProfilePic" : ''});
    Mixpanel.trackWithProperties("LoginData", UserData);
    this.setState({
      Email: "",
      Password: "",
      loading: false,
      error: ""
    });
    console.log("login success nav");
    this.props.navigation.navigate("Tabhome");
  }

  onLoginFailed = () => {
    console.log("login Failed");
    this.setState({
      error: "Authentication Failed!!",
      loading: false
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.headerText}>User Login</Text>
          <View style={styles.inputContainer}>
            <FIcon name="email" size={20} style={{ alignSelf: "center" }} />
            <TextInput
              placeholder="Email"
              value={this.state.Email}
              onChangeText={text => this.setState({ Email: text })}
              // onChangeText={text => {
              //   this.setState({ UserName: text });
              // }}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} style={{ alignSelf: "center" }} />
            <TextInput
              placeholder="Password"
              value={this.state.Password}
              onChangeText={text => {
                this.setState({ Password: text });
              }}
              style={styles.input}
              secureTextEntry
            />
          </View>
          <Text style={styles.errorText}>{this.state.error}</Text>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={this.onLoginPress}
          >
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>
          <Text
            onPress={() => this.props.navigation.navigate("ForgotPassword")}
            style={styles.forgotText}
          >
            Forgot Password?
          </Text>
        </View>
        <LoadWheel visible={this.state.loading} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    backgroundColor: Color.loginBg,
    borderColor: Color.borderColor,
    borderRadius: 10,
    shadowColor: Color.borderColor,
    shadowOpacity: 0.54,
    shadowOffset: { width: 0, height: 2 },
    paddingVertical: Matrics.ScaleValue(20),
  },
  headerText: {
    fontSize: Matrics.ScaleValue(20),
    textAlign: "center",
    fontWeight: "bold",
    color: Color.AppColor,
    marginVertical: Matrics.ScaleValue(20)
  },
  errorText: {
    fontSize: Matrics.ScaleValue(20),
    textAlign: "center",
    color: Color.RedColor,
  },
  inputContainer: {
    paddingHorizontal: Matrics.ScaleValue(10),
    borderWidth: 1,
    borderColor: Color.borderColor,
    flexDirection: "row",
    borderRadius: Matrics.ScaleValue(10),
    margin: Matrics.ScaleValue(10),
    padding: Platform.OS === "ios" ? Matrics.ScaleValue(10) : 0
  },
  input: {
    marginLeft: Matrics.ScaleValue(10),
    width: "80%",
  },
  btnContainer: {
    backgroundColor: Color.Btncolor,
    marginHorizontal: Matrics.ScaleValue(20),
    padding: Matrics.ScaleValue(10),
    borderRadius: 10,
    marginVertical: Matrics.ScaleValue(10),
  },
  btnText: {
    color: Color.White,
    fontSize: Matrics.ScaleValue(16),
    textAlign: "center"
  },
  forgotText: {
    fontSize: Matrics.ScaleValue(16),
    textAlign: "center",
    color: Color.forgotColor,
    marginBottom: Matrics.ScaleValue(10)
  }
});
