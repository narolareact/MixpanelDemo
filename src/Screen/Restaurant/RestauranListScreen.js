import React, { Component } from 'react';
import { SafeAreaView, Text, FlatList, View, TouchableOpacity } from 'react-native';
import Mixpanel from 'react-native-mixpanel';
import { Color, Matrics } from "../../Config";
import { Avatar } from 'react-native-elements';
import { LoadWheel } from "../../Component/LoadWheel";

class Restaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      restaurantData: [],
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'RestaurantList',
    headerTitleStyle: { textAlign: 'center', flexGrow: 1, alignSelf: 'center' },
    headerStyle: { backgroundColor: Color.Primary }
  });

  componentWillMount(){
    const apiUrl =
      "https://tabrabbit.com/us/Mobile_WS/Consumer/Live/TabRabbitService.php?Service=GetAllRestaurant";
    const data = JSON.stringify({
      access_key: "gn5KJTmDB0A97aYql16P/A==\n",
      latitude: "21.2116105",
      limit: "50",
      longitude: "72.7730935",
      needSchedule: "1",
      secret_key: "4IxpurFKWYVNcRu+7YNOHgE9GCVnQXKrMDaq3eI9fuo=",
      startOffset: "0",
      timezone: "America/New_York",
      userId: "730"
    });
    return fetch(`${apiUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: data,
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log("res-->1", responseJson);
        this.setState({
          restaurantData: responseJson.restaurant,
          loading: false
        });
      })
      .catch(err =>  this.setState({ loading: false }));
  }
  
  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: "#9FF4CB",
          paddingVertical: Matrics.ScaleValue(10),
          marginBottom: Matrics.ScaleValue(10),
          // marginHorizontal: Matrics.ScaleValue(10),
          borderRadius: Matrics.ScaleValue(10),
        }}
        onPress={() => { 
          this.props.navigation.navigate('RestaurantDetail', {item} )
          Mixpanel.trackWithProperties("LastVisitedRestaurant", {'RestaurantName': item.name});
          Mixpanel.set({"Last Visited Resturant":  new Date().toISOString()});
          Mixpanel.setOnce({"First Visited Resturant": new Date().toISOString()});
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          {
            item.photo.length > 0
            ?
              <Avatar
                rounded
                source={{
                  uri:
                    `https://tabrabbit.com/us/uploads/restaurant_cover/${item.photo[0].picture}`,
                }}
                size="medium"
                containerStyle={{ marginLeft: Matrics.ScaleValue(5) }}
              />
            :
              <Avatar
                rounded
                icon={{name: 'restaurant', type: 'MaterialIcons'}}
                size="medium"
                containerStyle={{ marginLeft: Matrics.ScaleValue(5) }}
              />
          }
          <View style={{ marginLeft: Matrics.ScaleValue(10)}}>
            <Text style={{ fontSize: Matrics.ScaleValue(18),  }}>{item.name}</Text>
            <View style={{ flexDirection: 'row', }}>
              <Text style={{ fontSize: Matrics.ScaleValue(16), flexWrap: 'wrap', flex: 1 }} >{item.address}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            borderBottomColor: "#CD65BD",
            borderBottomWidth: 0.8,
            marginTop: Matrics.ScaleValue(5)
          }}
        />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <SafeAreaView style={Styles.container}>
        {this.state.restaurantData.length > 0 && (
          <FlatList
            data={this.state.restaurantData}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
        {!this.state.loading && this.state.restaurantData.length === 0 && (
          <Text style={{ textAlign: "center", fontSize: 16 }}>
            No Data Found
          </Text>
        )}
        <LoadWheel visible={this.state.loading} />
      </SafeAreaView>
    );
  }
}


export default Restaurant;

const Styles = {
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: Matrics.ScaleValue(20),
  }
};