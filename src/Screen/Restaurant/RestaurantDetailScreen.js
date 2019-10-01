
import React, {Component} from 'react';
import { Text, View, ActivityIndicator, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MyIcon from 'react-native-vector-icons/Entypo';
import EIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AIcon from "react-native-vector-icons/AntDesign";
import { Image } from 'react-native-elements';
import { Color, Images, Matrics } from '../../Config';


class RestaurantDetailScreen extends Component {

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const item = navigation.getParam('item');
    console.log('item-->', item);
    this.state = {
      itemId: item ? item.id : '',
      itemName: item ? item.name :'',
      itemAdd: item ? item.address :'',
      itemImage: item 
              ? item.photo 
                ? item.photo.length > 0
                  ? `https://tabrabbit.com/us/uploads/restaurant_cover/${item.photo[0].picture}`
                  : ''
                : ''
              :'',
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: (<Text>Detail</Text>),
    headerLeft: (
      <AIcon
        name="arrowleft"
        size={20}
        style={{ marginLeft: Matrics.ScaleValue(10) }}
        onPress={() => navigation.goBack()}
      />
    ),
    headerRight: <View />,
    headerTitleStyle: { textAlign: 'center', flexGrow: 1, alignSelf: 'center' },
    headerStyle: { backgroundColor: Color.Primary }
  });

  render(){
    return(
      <View style={styles.mainContainer}>
        <ScrollView>
          <View style={styles.bottomContainer}>
            { 
              this.state.itemImage !== ''
              ?
                <Image 
                  style={styles.img}
                  source={{uri: this.state.itemImage}}
                  PlaceholderContent={<ActivityIndicator />}
                />
              :
                <Image 
                  style={styles.img}
                  source={Images.noImage}
                  PlaceholderContent={<ActivityIndicator />}
                />
            }
            <Text style={styles.maintxt}>{this.state.itemName}</Text>
            <View style={styles.container}>
              <MyIcon name="location-pin" size={30} color='#4D4C4B' style={styles.icon}/>
                <Text  style={[styles.text, { flex: 1, flexWrap: 'wrap' }]}>{this.state.itemAdd}</Text>
            </View>
            <View style={styles.container}>
              <Icon name="clock-o" size={25} color='#4D4C4B' style={styles.icon} />
              <Text style={styles.text}>6.00pm - 11:30pm</Text>
            </View>
            <View style={styles.container}>
              <Icon name="user" size={25} color='#4D4C4B' style={styles.icon} />
              <Text style={styles.text}>Michel Hendreson</Text>
            </View>
            <View style={styles.container}>
              <Icon name="phone" size={25} color='#4D4C4B' style={styles.icon} />
              <Text style={styles.text}>0044 2154 02144</Text>
            </View>
            <View style={styles.container}>
              <EIcon name="earth" size={25} color='#4D4C4B' style={styles.icon} />
              <Text style={styles.text}>www.royalrestaurantuk.com</Text>
            </View>
            <View style={styles.container}>
              <Icon name="map-pin" size={25} color='#4D4C4B' style={styles.icon} />
              <Text style={styles.text}>Route / Map</Text>
            </View>
            <View style={styles.container}>
              <Icon name="share-alt" color='#4D4C4B' size={25} style={styles.icon} />
              <View style={{ flexDirection: 'row', flex: 4, marginLeft: Matrics.ScaleValue(5) }}>
                <MyIcon name="facebook-with-circle" color="#1B46F7" size={40} style={styles.socialicon} />
                <MyIcon name="twitter-with-circle" color="#1BA4F7" size={40} style={styles.socialicon} />
                <MyIcon name="mail-with-circle" color="#9C9EA0" size={40} style={styles.socialicon} />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default RestaurantDetailScreen;

const styles = {
  bottomContainer: {
    flex: 1,
    backgroundColor: Color.bgColor,
    alignItems: 'center',
  },
  maintxt: {
    fontSize: Matrics.ScaleValue(28),
    fontWeight: '500',
    color: Color.fontColor,
  },
  img: {
    height: Matrics.ScaleValue(100),
    width: Matrics.ScaleValue(100),
    margin: Matrics.ScaleValue(10),
    borderRadius: Matrics.ScaleValue(10),
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal:  Matrics.ScaleValue(40),
    padding:  Matrics.ScaleValue(5),
    marginBottom:  Matrics.ScaleValue(10),
  },
  icon: {
    width: Matrics.ScaleValue(30),
    alignSelf: 'center',
  },
  socialicon: {
    marginHorizontal: Matrics.ScaleValue(5),
  },
  text:{
    flex: 4,
    marginLeft: Matrics.ScaleValue(15),
    fontSize: Matrics.ScaleValue(20),
    marginVertical: Matrics.ScaleValue(5),
    color: Color.fontColor,
  },
};