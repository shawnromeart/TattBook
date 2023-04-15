/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {DefaultStyles} from '../AppKaStyle/DefaultStyles';
import {DarkModeStyles} from '../AppKaStyle/DarkModeStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import {saveUserProfileDetail} from '../../Apis/Profile';
import {
  fetch_user_details,
  updateUserCoverImage,
  updateUserProfilePic,
} from '../../Apis/Profile';
import {useDispatch, useSelector} from 'react-redux';
import {SET_USER_DETAILS} from '../../Reducers/types';
import {commonColors} from '../config';

const width = Dimensions.get('screen').width;
export default function ProfileDetailsModal(props) {
  // eslint-disable-next-line no-undef
  const modalMargin = Platform.OS === 'ios' ? 34 : 0;
  const dispatch = useDispatch();
  const {modalVisible, setModalVisible, styles} = props;
  const [name, setName] = useState(props.userDetails.name);
  const [about, setAbout] = useState(props.userDetails.about);
  const [role, setRole] = useState(props.userDetails.role);
  const [state, setState] = useState(props.userDetails.state);
  const [city, setCity] = useState(props.userDetails.city);
  const [locality, setLocality] = useState(props.userDetails.locality);
  const [phone, setPhone] = useState(props.userDetails.phone);
  const [zipcode, setZipcode] = useState(props.userDetails.zipcode);
  const [userId, setUserId] = useState(props.userDetails.temp_id);
  const [saveLoader, setLoader] = useState(false);
  const themeColors = useSelector(themeState => themeState.user.themeColors);
  // console.log(props)
  function saveUserDetails() {
    setLoader(true);
    // name,user_id,role,about,callback
    saveUserProfileDetail(
      name,
      userId,
      role,
      about,
      locality,
      city,
      state,
      phone,
      zipcode,
      detailsCallback,
    );
  }
  function detailsCallback(response) {
    if (response.msg == 'success') {
      props.setName(name);
      props.setAbout(about);
      fetch_user_details(userId, userDetailsCallback);
    } else {
      alert(response.msg);
    }
  }
  function userDetailsCallback(response) {
    dispatch({type: SET_USER_DETAILS, payload: {insDetails: response.result}});
    setLoader(false);
    setModalVisible(!modalVisible);
  }
  // console.log("user",props.userDetails,"details");
  return (
    <View>
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            // Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}>
          <ScrollView style={{marginTop: modalMargin}}>
            <View style={styles.apmodalView}>
              <View style={{alignItems: 'flex-end'}}>
                <Icon
                  name="close"
                  size={24}
                  style={styles.primaryText}
                  onPress={() => setModalVisible(!modalVisible)}
                />
              </View>
              <Text
                style={[
                  styles.primaryText,
                  {fontSize: 20, textAlign: 'center'},
                ]}>
                Profile Details
              </Text>

              {/* <View style={styles.apmFormWrapper}> */}
              <Text style={[styles.primaryText, {fontSize: 20, marginTop: 15}]}>
                Name
              </Text>
              <TextInput
                defaultValue={name}
                placeholder="Name"
                style={[styles.inputText, {padding: 10, marginVertical: 10}]}
                placeholderTextColor={themeColors.PrimaryText}
                onChangeText={text => {
                  setName(text);
                }}
              />
              {/* </View> */}

              {/* <View style={styles.apmFormWrapper}> */}
              <Text style={[styles.primaryText, {fontSize: 20, marginTop: 5}]}>
                About Me
              </Text>
              <TextInput
                defaultValue={about}
                placeholder="About Me"
                style={[
                  styles.inputText,
                  {
                    // height: styles.inputText.fontSize * 7,
                    // height: styles.inputText.height * 3,
                    padding: 10,
                    marginVertical: 10,
                  },
                ]}
                placeholderTextColor={themeColors.PrimaryText}
                onChangeText={text => {
                  setAbout(text);
                }}
                multiline={true}
              />
              {/* </View> */}

              {/* <View style={styles.apmFormWrapper}> */}
              <Text style={[styles.primaryText, {fontSize: 20, marginTop: 5}]}>
                Role/Specialty
              </Text>
              <TextInput
                placeholder="Role/Specialty"
                defaultValue={role}
                style={[styles.inputText, {padding: 10, marginVertical: 10}]}
                placeholderTextColor={themeColors.PrimaryText}
                onChangeText={text => {
                  setRole(text);
                }}
              />
              {/* </View> */}
              {/* <View style={styles.apmFormWrapper}> */}
              <Text style={[styles.primaryText, {fontSize: 20, marginTop: 5}]}>
                Phone #
              </Text>
              <TextInput
                placeholder="Enter Phone number"
                keyboardType="numeric"
                defaultValue={phone}
                style={[styles.inputText, {padding: 10, marginVertical: 10}]}
                placeholderTextColor={themeColors.PrimaryText}
                onChangeText={text => {
                  setPhone(text);
                }}
              />
              {/* </View> */}
              {/* <View style={styles.apmFormWrapper}> */}
              <Text style={[styles.primaryText, {fontSize: 20, marginTop: 5}]}>
                Address
              </Text>
              <TextInput
                placeholder="Address"
                defaultValue={locality}
                style={[styles.inputText, {padding: 10, marginVertical: 10}]}
                placeholderTextColor={themeColors.PrimaryText}
                onChangeText={text => {
                  setLocality(text);
                }}
              />
              {/* </View> */}
              {/* <View style={styles.apmFormWrapper}> */}
              <Text style={[styles.primaryText, {fontSize: 20, marginTop: 5}]}>
                City
              </Text>
              <TextInput
                placeholder="City"
                defaultValue={city}
                style={[styles.inputText, {padding: 10, marginVertical: 10}]}
                placeholderTextColor={themeColors.PrimaryText}
                onChangeText={text => {
                  setCity(text);
                }}
              />
              {/* </View> */}
              {/* <View style={styles.apmFormWrapper}> */}
              <Text style={[styles.primaryText, {fontSize: 20, marginTop: 5}]}>
                State
              </Text>
              <TextInput
                placeholder="State"
                defaultValue={state}
                style={[styles.inputText, {padding: 10, marginVertical: 10}]}
                placeholderTextColor={themeColors.PrimaryText}
                onChangeText={text => {
                  setState(text);
                }}
              />
              {/* </View> */}
              {/* <View style={styles.apmFormWrapper}> */}
              <Text style={[styles.primaryText, {fontSize: 20, marginTop: 5}]}>
                Zip Code
              </Text>
              <TextInput
                placeholder="Zip Code"
                defaultValue={zipcode}
                style={[styles.inputText, {padding: 10, marginVertical: 10}]}
                placeholderTextColor={themeColors.PrimaryText}
                onChangeText={text => {
                  setZipcode(text);
                }}
              />
              {/* </View> */}

              <View
                style={{
                  width: width - 20,
                  justifyContent: 'center',
                  flexDirection: 'row',
                  marginTop: 20,
                  marginBottom: 68,
                }}>
                {saveLoader ? (
                  <TouchableOpacity>
                    <View
                      style={{
                        backgroundColor: themeColors.PrimaryText,
                        paddingVertical: 8,
                        width: width - 30,
                        alignItems: 'center',
                        borderRadius: 5,
                      }}>
                      <ActivityIndicator
                        size="large"
                        color={themeColors.primaryColor}
                      />
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => saveUserDetails()}>
                    <View
                      style={{
                        backgroundColor: themeColors.PrimaryText,
                        paddingVertical: 13,
                        width: width - 30,
                        alignItems: 'center',
                        borderRadius: 5,
                      }}>
                      <Text
                        style={{
                          color: themeColors.primaryColor,
                          fontSize: 16,
                          alignSelf: 'center',
                        }}>
                        Save
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </ScrollView>
        </Modal>
        {/* <Text  onPress={() => setModalVisible(true)}>OpenModal</Text> */}
      </View>
    </View>
  );
}
