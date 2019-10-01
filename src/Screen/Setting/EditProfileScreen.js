/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  AsyncStorage,
  Modal,
  Alert,
  ScrollView,
} from 'react-native';
// import AsyncStorage from "@react-native-community/async-storage";
import ImagePicker from 'react-native-image-crop-picker';
import { Color, Matrics } from '../../Config';
import Icon from "react-native-vector-icons/AntDesign";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FIcon from "react-native-vector-icons/FontAwesome5";
import MaIcon from "react-native-vector-icons/MaterialIcons";
import { Avatar } from 'react-native-elements';
import Mixpanel from 'react-native-mixpanel';

export default class EditProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      imageUrl:
        'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      contactNo: '',
      modalVisible: false
    };
  }
  static navigationOptions = ({ navigation }) => ({
    headerTitle: "Profile",
    headerLeft: (
      <Icon
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

  componentDidMount() {
    const Users = AsyncStorage.getItem('Users').then(async data => {
      if (data !== '') {
        console.log('data-->', data);
        console.log('data-->', typeof data);
        const uData = data.trim();
        console.log('uData-->', uData);
        console.log('uData-->', typeof uData);
        const userData = JSON.parse(uData);
        console.log('userData-->', userData);
        console.log('userData-->', typeof userData);
        const firstName = userData.firstName;
        const lastName = userData.lastName;
        const email = userData.email;
        const address = userData.address;
        const image = userData.image;
        const contactNo = userData.contactNo;
        console.log('email-->', userData.email);
        await this.setState({
          firstName,
          lastName,
          email,
          address,
          imageUrl: image ? image : 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          contactNo,
        });
      }
    });
  }

  onSavePress = async () => {
    const UserData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      address: this.state.address,
      image: this.state.imageUrl,
      contactNo: this.state.contactNo
    };
    console.log('onsave-->', UserData);
    console.log('onsave-->', typeof UserData);
    await AsyncStorage.setItem("Users", JSON.stringify(UserData));
    Alert.alert('Employee Update Successfully!!!');
  };

  pickSingleWithCamera(cropping, mediaType = "photo") {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
      includeExif: true,
      mediaType,
    })
      .then(image => {
        console.log('received image', image);
        this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
            modalVisible: false
          },
          images: null
        });
        Mixpanel.set({"userProfilePic": image.path});
      })
      .catch(e => {
        setTimeout(() => {
          alert(e);
        }, 1000);
        this.setState({ modalVisible: false });
      });
  }

  pickSingle(cropit, circular = false, mediaType) {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: cropit,
      cropperCircleOverlay: circular,
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
    })
      .then(image => {
        console.log('received image', image);
        this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
          images: null,
          imageUrl: image.path,
          modalVisible: false,
        });
        console.log(typeof image.path, 'path');
        Mixpanel.set({"userProfilePic": image.path});
      })
      .catch(e => {
        console.log(e);
        setTimeout(() => {
          Alert.alert(e.message ? e.message : e);
        }, 1000);
        this.setState({ modalVisible: false });
      });
  }

  render() {
    return (
      <SafeAreaView style={Styles.container}>
        <View style={Styles.avtarContainer}>
          <Avatar
            source={{
              uri: this.state.imageUrl,
            }}
            size="large"
            showEditButton
            rounded
            onEditPress={() => { 
              this.setState({ modalVisible: true });
              // Mixpanel.trackWithProperties('ImageButton', {button_type: 'Edit Button', button_text: 'ImageUpload Button'});
            }}
          />
        </View>
        <ScrollView>
          <View
            style={[Styles.inputContainer, { marginTop: Matrics.ScaleValue(10) }]}
          >
            <FIcon name="user" size={20} style={{ alignSelf: "center" }} />
            <TextInput
              placeholder="FirstName"
              placeholderTextColor="black"
              value={this.state.firstName}
              onChangeText={text => {
                this.setState({ firstName: text });
              }}
              style={Styles.input}
            />
          </View>
          <View style={Styles.inputContainer}>
            <FIcon name="user" size={20} style={{ alignSelf: "center" }} />
            <TextInput
              placeholder="LastName"
              placeholderTextColor="black"
              value={this.state.lastName}
              onChangeText={text => {
                this.setState({ lastName: text });
              }}
              style={Styles.input}
            />
          </View>
          <View style={[Styles.inputContainer, { backgroundColor: '#EAE8E8' }]}>
            <MIcon name="email" size={20} style={{ alignSelf: "center" }} />
            <TextInput
              placeholder="Email"
              placeholderTextColor="black"
              editable={false}
              value={this.state.email}
              onChangeText={text => {
                this.setState({ email: text });
              }}
              style={Styles.input}
            />
          </View>
          <View style={Styles.inputContainer}>
            <MaIcon
              name="location-city"
              size={20}
              style={{ alignSelf: 'center' }}
            />
            <TextInput
              placeholder="Address"
              placeholderTextColor="black"
              value={this.state.address}
              onChangeText={text => {
                this.setState({ address: text });
              }}
              style={Styles.input}
            />
          </View>
          <View style={Styles.inputContainer}>
            <MaIcon
              name="contact-phone"
              size={20}
              style={{ alignSelf: "center" }}
            />
            <TextInput
              placeholder="Contact Number"
              placeholderTextColor="black"
              value={this.state.contactNo}
              onChangeText={text => {
                this.setState({ contactNo: text });
              }}
              style={Styles.input}
            />
          </View>
          <Text style={Styles.errorText}>{this.state.error}</Text>
          <TouchableOpacity
            style={Styles.btnContainer}
            onPress={this.onSavePress}
          >
            <Text style={Styles.btnText}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({ modalVisible: false });
          }}
        >
          <View style={Styles.modalContainer}>
            <View style={Styles.modalInnerContainer}>
              <Text style={Styles.modalMainText}>Select Image</Text>
              <TouchableOpacity
                style={Styles.modalBtn}
                onPress={() => this.pickSingleWithCamera(true)}
              >
                <Text style={Styles.modalText}>Take Photo...</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={Styles.modalBtn}
                onPress={() => this.pickSingle(true, true)}
              >
                <Text style={Styles.modalText}>Choose from Library...</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={Styles.modalBtn}
                onPress={() => this.setState({ modalVisible: false })}
              >
                <Text style={Styles.modalText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

const Styles = {
  container: {
    flex: 1,
    alignItems: "center",
  },
  headerTitleStyle: {
    alignSelf: "center",
    textAlign: "center",
    flex: 1,
    fontWeight: "normal",
    fontSize: Matrics.ScaleValue(18),
    color: "black"
  },
  avtarContainer: {
    marginTop: Matrics.ScaleValue(10),
  },
  inputContainer: {
    paddingHorizontal: Matrics.ScaleValue(10),
    padding: Platform.OS === "ios" ? Matrics.ScaleValue(10) : 0,
    borderWidth: 1,
    borderColor: Color.borderColor,
    flexDirection: "row",
    borderRadius: Matrics.ScaleValue(10),
    margin: Matrics.ScaleValue(10)
  },
  input: {
    marginLeft: Matrics.ScaleValue(10),
    width: "80%"
  },
  btnContainer: {
    backgroundColor: Color.Btncolor,
    marginHorizontal: Matrics.ScaleValue(20),
    paddingVertical: Matrics.ScaleValue(10),
    paddingHorizontal: Matrics.ScaleValue(120),
    borderRadius: 10,
    marginVertical: Matrics.ScaleValue(5),
  },
  btnText: {
    color: Color.White,
    fontSize: Matrics.ScaleValue(16),
    textAlign: "center"
  },
  errorText: {
    fontSize: Matrics.ScaleValue(20),
    textAlign: "center",
    color: Color.RedColor,
  },
  modalContainer: {
    // height: '50%',
    // marginTop: Matrics.ScaleValue(500),
    bottom: Matrics.ScaleValue(110),
    position: 'absolute',
    // marginHorizontal: Matrics.ScaleValue(15),
    // borderRadius: 10,
    // borderWidth: 1,
    alignSelf: 'center',
    width: '90%',
    // backgroundColor: '#2BDEAA',
  },
  modalInnerContainer: {
    backgroundColor: Color.ModalColor,
    borderRadius: 10,
  },
  modalMainText: {
    fontSize: Matrics.ScaleValue(22),
    textAlign: "center",
    fontWeight: 'bold',
    marginVertical: Matrics.ScaleValue(10),
  },
  modalText: {
    fontSize: Matrics.ScaleValue(20),
    textAlign: "center",
    color: Color.Primary,
    fontWeight: 'bold',
  },
  modalBtn: {
    borderColor: Color.ModalBorderColor,
    borderWidth: 2,
    margin: Matrics.ScaleValue(15),
    borderRadius: 10,
    paddingHorizontal: Matrics.ScaleValue(20),
    paddingVertical: Matrics.ScaleValue(10),
  },
};
