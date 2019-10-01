import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import MIcon from "react-native-vector-icons/MaterialIcons";
import HomeScreen from './Screen/HomeScreen';
import RestauranListScreen from "./Screen/Restaurant/RestauranListScreen";
import RestauranDetailScreen from "./Screen/Restaurant/RestaurantDetailScreen";
import SettingScreen from "./Screen/Setting/SettingScreen";
import EditProfileScreen from "./Screen/Setting/EditProfileScreen";
import LoginScreen from "./Screen/StartUp/LoginScreen";
import ForgotpwdScreen from "./Screen/StartUp/forgetPasswordScreen";
import { Color, Matrics } from "../src/Config";

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      // screen: HomeScreen, 
      screen: createStackNavigator({
        Home: { screen: HomeScreen },
      }),
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" size={30} color={tintColor} />
        ),
      },
    },
    Restaurant: {
      screen: createStackNavigator({
        Restaurant: { screen: RestauranListScreen },
        RestaurantDetail: { screen: RestauranDetailScreen },
      }),
      navigationOptions: {
        tabBarLabel: "Restaurants",
        tabBarIcon: ({ tintColor }) => (
          <MIcon name="restaurant-menu" size={30} color={tintColor} />
        ),
      },
    },
    Setting: {
      screen: createStackNavigator({
        Setting: { screen: SettingScreen },
        Editprofile: { screen: EditProfileScreen },
      }),
      navigationOptions: {
        tabBarLabel: "Setting",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="gear" size={30} color={tintColor} />
        ),
      },
    }
  },
  {
    tabBarPosition: "bottom",
    initialRouteName: "Home",
    tabBarOptions: {
      activeTintColor: Color.primary,
      inactiveTintColor: Color.white,
      showLabel: true,
      style: {
        backgroundColor: Color.tabBgColor,
        height: Matrics.ScaleValue(70)
      },
      labelStyle: {
        fontSize: Matrics.ScaleValue(16),
        marginBottom: Matrics.ScaleValue(5),
        padding: 0
      }
    }
  }
);

const AppNavigation = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null
    },
  },
  ForgotPassword: {
    screen: ForgotpwdScreen,
  },
  Tabhome: {
    screen: TabNavigator,
    navigationOptions: {
      header: null,
    }
  },
});



export default createAppContainer(AppNavigation);