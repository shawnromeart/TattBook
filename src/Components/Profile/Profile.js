/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect, useRef} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  Platform,
  Modal,
} from 'react-native';
import {DefaultStyles} from '../AppKaStyle/DefaultStyles';
import {DarkModeStyles} from '../AppKaStyle/DarkModeStyles';
import {
  assets4Dark,
  commonColors,
  formatAppointmentTime,
  theme4Default,
  userProfileLink,
} from '../config';
import Feather from 'react-native-vector-icons/Feather';
import ProfileDetailsModal from './ProfileDetailsModal';
import AddHoursModal from './AddHoursModal';
import {useSelector, useDispatch} from 'react-redux';
import {fetchGallery} from '../../Apis/Appointment';
import {
  fetch_user_details,
  updateUserBackgroundColor,
  updateUserCoverImage,
  updateUserFontColor,
  updateUserFontFamily,
  updateUserProfilePic,
} from '../../Apis/Profile';
import {launchImageLibrary} from 'react-native-image-picker';
import {uploadImageToServer, deleteImage} from '../../Apis/Gallery';
import {SET_USER_IMAGES, SET_USER_SLOTS} from '../../Reducers/types';
import {deleteHourSlot, fetchSlot} from '../../Apis/About';
import ImageModal from 'react-native-image-modal';
import {SET_THEME_MODE} from '../../Reducers/types';
import Upgrade2Unlock from './Upgrade2Unlock';
import LoaderModal from '../Utils/LoaderModal';
import {SafeAreaView} from 'react-native-safe-area-context';
import useStateRef from 'react-usestateref';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

import Icon from 'react-native-vector-icons/Ionicons';
import ColorPicker from 'react-native-wheel-color-picker';
import Toast from 'react-native-simple-toast';
import Clipboard from '@react-native-clipboard/clipboard';

import {Picker} from '@react-native-picker/picker';
export default function Profile() {
  const dispatch = useDispatch();
  const CHANGE_HEADER_IMAGE_MODE = 'CHANGE_HEADER_IMAGE_MODE';
  const CHANGE_USER_IMAGE_MODE = 'CHANGE_USER_IMAGE_MODE';
  const UPLOAD_GALLERY_IMAGE = 'UPLOAD_GALLERY_IMAGE';
  const styles = useSelector(state => state.user.themeStyle);
  const userDetails = useSelector(state => state.user.insDetails);
  const userAuthStatus = useSelector(state => state.user.authStatus);
  const appMode = useSelector(state => state.user.appMode);
  const userId = userDetails.temp_id;
  const [backgroundColor, setBackgroundColor] = useState(
    userDetails.page_backgroundColor,
  );
  const [fontColor, setFontColor] = useState(userDetails.fontColor);
  const [colorSaveLoader, setColorSaveLoader] = useState(false);
  const galleryImages = useSelector(state => state.user.images);
  const slots = useSelector(state => state.user.slots);
  // const [styles, setStyles] = useState(DarkModeStyles)
  const [activeTab, setActiveTab] = useState(2);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible4Hours, setModalVisible4Hours] = useState(false);
  const themeColors = useSelector(state => state.user.themeColors);
  const [userImages, setImages] = useState({});
  const [imageUri, setimageUri] = useState('');
  const [userImage, setUserImage] = useState({uri: userDetails.logo});
  const [userName, setName] = useState(userDetails.name);
  const [userAbout, setUserAbout] = useState(userDetails.about);
  const [headerImage, setHeaderImage] = useState({uri: userDetails.header});
  const [loadingUserImage, setLoadingUserImage] = useState(false);
  const [loadingHeaderImage, setLoadingHeaderImage] = useState(false);
  const [anyChanges, setChanges] = useState(0);
  const [galleryLoader, setGalleryLoader] = useState(false);
  const [showModal, setLoaderModalVisible] = useState(false);
  const [totalUploadingImage, setTotalUploadingImage, totalUploadingImageRef] =
    useStateRef(0);
  const [totalUploadedImage, setTotalUploadedImage, totalUploadedImageRef] =
    useStateRef(0);
  const [
    totalFailedUploadingImage,
    setTotalFailedUploadingImage,
    totalFailedUploadingImageRef,
  ] = useStateRef(0);
  const [imageMode, setImageMode] = useState(false);
  const [colorModalVisible, setColorModalVisible] = useState(false);
  const [colorPickerMode, setColorPickerMode] = useState('background');
  const [fontFamily, setFontFamily] = useState(userDetails.fontFamily);
  const fontFamilies = [
    {label: 'Afterglow', valueIOS: 'Afterglow'},
    {label: 'Bodar', valueIOS: 'BODAR'},
    {label: 'Bright Gesture Demo', valueIOS: 'Bright Gesture DEMO'},
    {label: 'Butler', valueIOS: 'Butler'},
    {label: 'Catalina Rayden', valueIOS: 'Catalina Rayden'},
    {label: 'Cinzel', valueIOS: 'Cinzel'},
    {label: 'Edition', valueIOS: 'Edition'},
    {label: 'Fraternite', valueIOS: 'Fraternite'},
    {label: 'Galorine', valueIOS: 'Galorine'},
    {label: 'Harmony', valueIOS: 'HARMONY'},
    {label: 'Love', valueIOS: 'Love'},
    {label: 'Made Sunflower', valueIOS: 'MADE Sunflower'},
    {label: 'Meiland Gorgeous', valueIOS: 'Meiland Gorgeous'},
    {label: 'Mermaid Swash Caps', valueIOS: 'Mermaid Swash Caps'},
    {label: 'Mermaid', valueIOS: 'Mermaid'},
    {label: 'Monea Alegante', valueIOS: 'Monea Alegante'},
    {label: 'New York', valueIOS: 'NewYork'},
    {label: 'NT JoseFine', valueIOS: 'NT JoseFine'},
    {label: 'NT Wagner', valueIOS: 'NT Wagner'},
    {label: 'Optimus Princeps', valueIOS: 'OptimusPrinceps'},
    {label: 'Otimus Princeps SemiBold', valueIOS: 'OtimusPrincepsSemiBold'},
    {label: 'Vogue', valueIOS: 'Vogue'},
    {
      label: 'Wastinger Display Free Personal',
      valueIOS: 'Wastinger Display Free Personal',
    },

    {label: 'African', valueIOS: 'African'},
    {label: 'Asteria Royalty', valueIOS: 'Asteria Royalty Demo'},
    {label: 'Automatic', valueIOS: 'Automatic'},
    {label: 'BARNEY POP', valueIOS: 'BARNEY POP'},
    {label: 'Bell and Lamb', valueIOS: 'Bell and Lamb - Personal Use'},
    {label: 'Boismen', valueIOS: 'Boismen'},
    {label: 'Break', valueIOS: 'Break'},
    {label: 'Broken', valueIOS: 'Broken'},
    {label: 'Corleone', valueIOS: 'Corleone'},
    {label: 'Draw me the Rainbow', valueIOS: 'Draw me the Rainbow'},
    {label: 'Fake Identity', valueIOS: 'Fake Identity'},
    {label: 'Harry P', valueIOS: 'Harry P'},
    {label: 'Jack Simba', valueIOS: 'Jack Simba - Personal Use'},
    {label: 'KG Red Hands', valueIOS: 'KG Red Hands'},
    {label: 'KG Second Chances Solid', valueIOS: 'KG Second Chances Solid'},
    {label: 'Masque', valueIOS: 'Masque'},
    {label: 'PaybAck', valueIOS: 'PaybAck'},
    {label: 'Riffic', valueIOS: 'Riffic Free'},
    {label: 'Sour Candy', valueIOS: 'Sour Candy'},
    {label: 'Speedway', valueIOS: 'Speedway'},
    {label: 'Stay and Shine', valueIOS: 'Stay and Shine'},
    {label: 'Sweet Pancakes', valueIOS: 'Sweet Pancakes'},
  ];
  useEffect(() => {
    if (userDetails.temp_id) {
      setUserImage({uri: userDetails.logo});
      setName(userDetails.name);
      setUserAbout(userDetails.about);
      setHeaderImage({uri: userDetails.header});
    }
  }, [userDetails]);
  // const [userId,setUserId] = useState();
  const action4DarkMode = () => {
    dispatch({type: SET_THEME_MODE, payload: {themeMode: 'DarkMode'}});
  };
  const copyToClipboard = string => {
    Clipboard.setString(string);
    Toast.show('Copied To Clipboard');
  };
  const openGallery = mode => {
    const options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
      selectionLimit: mode == UPLOAD_GALLERY_IMAGE ? 10 : 1,
    };

    launchImageLibrary(options, response => {
      // console.log('Response = ', response.assets);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // You can also display the image using data:
        // console.log(response.assets[0]);
        const source = {uri: response.assets[0].uri};
        if (mode == CHANGE_USER_IMAGE_MODE) {
          setUserImage(source);
          setLoadingUserImage(true);
          updateUserProfilePic(
            response.assets[0].base64,
            userId,
            updatUserImageCallback,
          );
        } else if (mode == CHANGE_HEADER_IMAGE_MODE) {
          setHeaderImage(source);
          setLoadingHeaderImage(true);
          updateUserCoverImage(
            response.assets[0].base64,
            userId,
            updatHeaderImageCallback,
          );
        } else if (mode == UPLOAD_GALLERY_IMAGE) {
          setLoaderModalVisible(true);
          // imageFile,user_id,
          // uploadImageToServer(response.assets,userDetails.name,galleryUploadCallback)
          setImageMode(true);
          setTotalUploadingImage(response.assets.length);

          response.assets.map(item => {
            uploadImageToServer(
              {
                name: 'image',
                filename: item.fileName,
                type: item.type,
                data: item.base64,
              },
              userDetails.name,
              galleryUploadCallback,
            );
          });
        }
      }
    });
  };
  function galleryUploadCallback(response) {
    if (response.msg == 'success') {
      setTotalUploadedImage(totalUploadedImageRef.current + 1);
    } else {
      // setLoaderModalVisible(false);
      setTotalFailedUploadingImage(totalFailedUploadingImageRef.current + 1);
    }

    if (
      totalUploadedImageRef.current + totalFailedUploadingImageRef.current >=
      totalUploadingImageRef.current
    ) {
      setTotalFailedUploadingImage(0);
      setTotalUploadedImage(0);
      fetchGallery(userDetails.name, galleryCallback);
      setImageMode(false);
    }
  }

  const deleteImageCallback = response => {
    if (response.msg == 'success') {
      fetchGallery(userDetails.name, galleryCallback);
    } else {
      setLoaderModalVisible(false);
      Toast.show('Unable to delete Image Please Try Again Later');
    }
  };
  function galleryCallback(response) {
    if (response.msg == 'success') {
      dispatch({type: SET_USER_IMAGES, payload: {images: response.images}});
    }
    setLoaderModalVisible(false);
  }
  function updatUserImageCallback(response) {
    setLoadingUserImage(false);
  }

  function updatHeaderImageCallback(response) {
    setLoadingHeaderImage(false);
  }
  const action4DefaultMode = () => {
    // setStyles(DefaultStyles)
    dispatch({type: SET_THEME_MODE, payload: {themeMode: 'default'}});
  };

  function rateUsRedirect(link) {
    copyToClipboard(link);
    Linking.openURL(link);
  }
  const renderOpeningTimeCard = (day, start, end, id) => {
    console.log('font ', fontFamily);
    return (
      <View style={Internalstyles.OpeningTimeWrapper}>
        <Text
          style={[
            styles.primaryText,
            {color: fontColor, fontFamily: fontFamily},
          ]}>
          {day}
        </Text>
        <Text
          style={[
            styles.primaryText,
            {color: fontColor, fontFamily: fontFamily},
          ]}>
          {start}
        </Text>
        <Text
          style={[
            styles.primaryText,
            {color: fontColor, fontFamily: fontFamily},
          ]}>
          -
        </Text>
        <Text
          style={[
            styles.primaryText,
            {color: fontColor, fontFamily: fontFamily},
          ]}>
          {end}
        </Text>
        <TouchableOpacity
          onPress={() =>
            createTwoButtonAlert('Slots', () => deleteSlot(id, deleteCallback))
          }
          style={Internalstyles.iconWrapper}>
          <Feather
            name="trash-2"
            size={18}
            style={[styles.textLinkColor, {color: 'white'}]}
          />
        </TouchableOpacity>
      </View>
    );
  };
  function deleteSlot(id, callback) {
    setLoaderModalVisible(true);
    deleteHourSlot(id, userId, callback);
    // createTwoButtonAlert('Slots',deleteHourSlot(id,userId,deleteCallback))
  }
  function deleteCallback(response) {
    if (response.msg == 'success') {
      fetchSlot(userId, SlotsCallback);
    }
  }
  function SlotsCallback(response) {
    setLoaderModalVisible(false);
    dispatch({type: SET_USER_SLOTS, payload: {slots: response.slots}});
  }
  const createTwoButtonAlert = (title, okFunction) => {
    Alert.alert(title, 'Do you want to delete?', [
      {
        text: 'Cancel',
        onPress: () => {
          console.log('Cancelled');
        },
        style: 'cancel',
      },
      {text: 'OK', onPress: () => okFunction()},
    ]);
  };
  function deleteImageCall(id, callback) {
    setLoaderModalVisible(true);
    // callback()
    deleteImage(id, callback);
  }
  function renderGalleryImages(item) {
    // console.log(item);
    return (
      <View style={[Internalstyles.GalleryWrapper]}>
        <ImageModal
          resizeMode="contain"
          imageBackgroundColor="#000000"
          style={Internalstyles.GalleryImg}
          source={{
            uri: item.image,
          }}
        />
        <TouchableOpacity
          onPress={() =>
            createTwoButtonAlert('Gallery', () =>
              deleteImageCall(item.id, deleteImageCallback),
            )
          }>
          <Image
            source={assets4Dark.profile.remove}
            style={{
              height: 30,
              width: 30,
              position: 'relative',
              top: -Internalstyles.GalleryImg.height - 15,
              left: -15,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
  // console.log(userDetails,"hellp");

  return userDetails.pro == '0' &&
    (appMode == '0' || Platform.OS == 'android') ? (
    <Upgrade2Unlock />
  ) : (
    <>
      <SafeAreaView edges={['top', 'left', 'right']}>
        <ScrollView
          style={[
            styles.primaryBg,
            {height: height, backgroundColor: backgroundColor},
          ]}>
          <View
            style={[
              styles.primaryBg,
              Internalstyles.container,
              {backgroundColor: backgroundColor},
            ]}>
            <Text style={styles.AppointmentTitle}> Profile</Text>

            <View style={{position: 'absolute', right: 4, top: 6}}>
              {styles == DarkModeStyles ? (
                <View
                  style={{
                    backgroundColor: themeColors.PrimaryText,
                    padding: 10,
                    borderRadius: 5,
                  }}>
                  <Text
                    onPress={() => action4DefaultMode()}
                    style={{color: themeColors.primaryColors}}>
                    Light
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    backgroundColor: themeColors.PrimaryText,
                    padding: 10,
                    borderRadius: 5,
                  }}>
                  <Text
                    onPress={() => action4DarkMode()}
                    style={{color: themeColors.primaryColor}}>
                    Dark
                  </Text>
                </View>
              )}
            </View>
            <View
              style={{
                position: 'absolute',
                left: 0,
                top: 6,
                marginHorizontal: 10,
              }}>
              {styles == DarkModeStyles ? (
                <View
                  style={{
                    backgroundColor: themeColors.PrimaryText,
                    padding: 10,
                    borderRadius: 5,
                  }}>
                  <Text
                    onPress={() => setColorModalVisible(true)}
                    style={{color: themeColors.primaryColors}}>
                    Change Colors
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    backgroundColor: themeColors.PrimaryText,
                    padding: 10,
                    borderRadius: 5,
                  }}>
                  <Text
                    onPress={() => setColorModalVisible(true)}
                    style={{color: themeColors.primaryColor}}>
                    Change Colors
                  </Text>
                </View>
              )}
            </View>

            {loadingHeaderImage ? (
              <ActivityIndicator style={Internalstyles.profileHeader} />
            ) : (
              <ImageBackground
                source={headerImage}
                style={Internalstyles.profileHeader}>
                <View
                  style={[
                    Internalstyles.iconWrapper,
                    Internalstyles.HeaderRightEditIcon,
                    {width: 70, marginTop: 110, marginRight: 10},
                  ]}>
                  <TouchableOpacity
                    onPress={() => openGallery(CHANGE_HEADER_IMAGE_MODE)}
                    style={{display: 'flex', flexDirection: 'row'}}>
                    <Feather
                      name="edit"
                      size={18}
                      style={[
                        styles.primaryText,
                        {color: 'white', paddingRight: 5},
                      ]}
                    />
                    <Text style={[styles.primaryText, {color: 'white'}]}>
                      Edit
                    </Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            )}
            <TouchableOpacity
              onPress={() => openGallery(CHANGE_USER_IMAGE_MODE)}>
              {loadingUserImage ? (
                <ActivityIndicator style={Internalstyles.profile} />
              ) : (
                <Image source={userImage} style={Internalstyles.profile} />
              )}
            </TouchableOpacity>

            <View style={Internalstyles.ProfileIdWrapper}>
              <Text
                style={[
                  Internalstyles.ProfileId,
                  styles.primaryText,
                  {color: fontColor, fontFamily: fontFamily},
                ]}>
                {userName}
              </Text>
              <View
                style={[
                  Internalstyles.iconWrapper,
                  Internalstyles.HeaderRightEditIcon,
                  {width: 70},
                ]}>
                <TouchableOpacity
                  onPress={() => setModalVisible(true)}
                  style={{display: 'flex', flexDirection: 'row'}}>
                  <Feather
                    name="edit"
                    size={18}
                    style={[
                      styles.primaryText,
                      {color: 'white', paddingRight: 5},
                    ]}
                  />
                  <Text style={[styles.primaryText, {color: 'white'}]}>
                    Edit
                  </Text>
                </TouchableOpacity>
              </View>
              {/* <View style={Internalstyles.iconWrapper}>
                                <Feather name="edit" size={18} style={[styles.primaryText,{color:"white"}]} onPress={() => setModalVisible(true)} />
                                </View> */}
            </View>
            {modalVisible ? (
              <ProfileDetailsModal
                styles={styles}
                modalVisible={modalVisible}
                userDetails={userDetails}
                setModalVisible={setModalVisible}
                setChanges={setChanges}
                anyChanges={anyChanges}
                setName={setName}
                setAbout={setUserAbout}
              />
            ) : null}

            {userDetails.phone ? (
              <View style={[Internalstyles.userProfileLinkWrapper]}>
                <Text
                  style={[
                    styles.primaryText,
                    {color: fontColor, fontFamily: fontFamily},
                  ]}>
                  {userDetails.phone}
                </Text>
              </View>
            ) : null}

            <View style={[Internalstyles.userProfileLinkWrapper]}>
              <TouchableOpacity
                onPress={() => rateUsRedirect(userDetails.link)}>
                <Text
                  style={[
                    styles.primaryText,
                    {color: fontColor, fontFamily: fontFamily},
                  ]}>
                  {userDetails.link}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={Internalstyles.TabsWrapper}>
              <View>
                <Text
                  style={[
                    styles.primaryText,
                    Internalstyles.TabsText,
                    {color: fontColor, fontFamily: fontFamily},
                  ]}
                  onPress={() => setActiveTab(1)}>
                  About
                </Text>
                {activeTab == 1 ? (
                  <View
                    style={[
                      Internalstyles.activeTabColor,
                      styles.activeTab,
                    ]}></View>
                ) : (
                  <View style={[Internalstyles.InactiveTabColor]}></View>
                )}
              </View>
              <View>
                <Text
                  style={[
                    styles.primaryText,
                    Internalstyles.TabsText,
                    {color: fontColor, fontFamily: fontFamily},
                  ]}
                  onPress={() => setActiveTab(2)}>
                  Gallery
                </Text>
                {activeTab == 2 ? (
                  <View
                    style={[
                      Internalstyles.activeTabColor,
                      styles.activeTab,
                    ]}></View>
                ) : (
                  <View style={[Internalstyles.InactiveTabColor]}></View>
                )}
              </View>
            </View>
            <View style={Internalstyles.TabsBodyWrapper}>
              {activeTab == 1 ? (
                <>
                  <View>
                    <View
                      style={[
                        Internalstyles.aboutIntroWrapper,
                        // {marginBottom: 5},
                      ]}>
                      <Text
                        style={[
                          {fontSize: 20},
                          styles.primaryText,
                          {color: fontColor, fontFamily: fontFamily},
                        ]}>
                        Address
                      </Text>

                      <View
                        style={[
                          Internalstyles.iconWrapper,
                          Internalstyles.HeaderRightEditIcon,
                          {width: 70},
                        ]}>
                        <TouchableOpacity
                          onPress={() => setModalVisible(true)}
                          style={{display: 'flex', flexDirection: 'row'}}>
                          <Feather
                            name="edit"
                            size={18}
                            style={[
                              styles.primaryText,
                              {color: 'white', paddingRight: 5},
                            ]}
                          />
                          <Text style={[styles.primaryText, {color: 'white'}]}>
                            Edit
                          </Text>
                        </TouchableOpacity>
                      </View>
                      {/* <View style={Internalstyles.iconWrapper}>
                                                    <Feather name="edit" size={18} style={[styles.primaryText,{color:"white"}]} onPress={() => setModalVisible(true)} />
                                                </View> */}
                    </View>
                    {userDetails.locality ||
                    userDetails.city ||
                    userDetails.state ||
                    userDetails.zipcode ? (
                      <Text
                        style={[
                          styles.primaryText,
                          Internalstyles.aboutText,
                          {
                            color: fontColor,
                            fontFamily: fontFamily,
                            paddingTop: 0,
                          },
                        ]}>
                        {userDetails.locality},{userDetails.city},
                        {userDetails.state},{userDetails.zipcode}
                      </Text>
                    ) : null}
                  </View>

                  <View style={[Internalstyles.aboutIntroWrapper]}>
                    <Text
                      style={[
                        {fontSize: 20},
                        styles.primaryText,
                        {color: fontColor, fontFamily: fontFamily},
                      ]}>
                      About Me
                    </Text>
                    <View
                      style={[
                        Internalstyles.iconWrapper,
                        Internalstyles.HeaderRightEditIcon,
                        {width: 70},
                      ]}>
                      <TouchableOpacity
                        onPress={() => setModalVisible(true)}
                        style={{display: 'flex', flexDirection: 'row'}}>
                        <Feather
                          name="edit"
                          size={18}
                          style={[
                            styles.primaryText,
                            {color: 'white', paddingRight: 5},
                          ]}
                        />
                        <Text style={[styles.primaryText, {color: 'white'}]}>
                          Edit
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {/* <View style={Internalstyles.iconWrapper}>
                                                <Feather name="edit" size={18} style={[styles.primaryText,{color:"white"}]} onPress={() => setModalVisible(true)} />
                                            </View> */}
                  </View>
                  <Text
                    style={[
                      styles.primaryText,
                      Internalstyles.aboutText,
                      {color: fontColor, fontFamily: fontFamily, padding: 0},
                    ]}>
                    {userAbout}
                  </Text>
                  <View
                    style={[
                      Internalstyles.aboutIntroWrapper,
                      Internalstyles.HoursWrapper,
                    ]}>
                    <Text
                      style={[
                        Internalstyles.HoursText,
                        styles.primaryText,
                        {fontSize: 20},
                        {color: fontColor, fontFamily: fontFamily},
                      ]}>
                      Hours
                    </Text>
                    <View
                      style={[
                        Internalstyles.iconWrapper,
                        Internalstyles.HeaderRightEditIcon,
                        {width: 70},
                      ]}>
                      <TouchableOpacity
                        onPress={() => setModalVisible4Hours(true)}
                        style={{display: 'flex', flexDirection: 'row'}}>
                        <Feather
                          name="edit"
                          size={18}
                          style={[
                            styles.primaryText,
                            {color: 'white', paddingRight: 5},
                          ]}
                        />
                        <Text style={[styles.primaryText, {color: 'white'}]}>
                          Edit
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {/* <View>
                                                <TouchableOpacity style={[Internalstyles.AddHoursBtn, styles.LinksAndIndicatorColor,{backgroundColor:themeColors.PrimaryText}]}>
                                                    <Text style={[styles.primaryText,{color:themeColors.primaryColor}]} onPress={() => setModalVisible4Hours(true)}>Add Hours</Text>
                                                </TouchableOpacity>
                                            </View> */}
                  </View>
                  <View style={{paddingBottom: 20}}>
                    {slots &&
                      slots.map(key =>
                        renderOpeningTimeCard(
                          key.day,
                          key.start,
                          key.end,
                          key.id,
                        ),
                      )}
                  </View>
                  {/* {renderOpeningTimeCard()} */}
                </>
              ) : (
                <>
                  {/* {galleryImages && galleryImages.map((key)=>(
                                                <View style={[Internalstyles.GalleryWrapper]}>
                                                    <Image source={{uri:key.image}} style={Internalstyles.GalleryImg} />
                                                    <ImageModal
                                                        resizeMode="contain"
                                                        imageBackgroundColor="#000000"
                                                        style={{
                                                        width: 250,
                                                        height: 250,
                                                        }}
                                                        source={{
                                                        uri: key.image,
                                                        }}
                                                    />
                                                </View>
                                            ))} */}
                  <View style={[Internalstyles.GalleryWrapper]}>
                    <FlatList
                      data={[...galleryImages, {id: 'add-image', last: true}]}
                      renderItem={({item}) => {
                        if (!item.last) {
                          return renderGalleryImages(item);
                        } else {
                          return (
                            <View style={[Internalstyles.GalleryWrapper]}>
                              {
                                <TouchableOpacity
                                  onPress={() => {
                                    openGallery(UPLOAD_GALLERY_IMAGE);
                                  }}
                                  style={{width: '25%', height: 'auto'}}>
                                  <Image
                                    source={assets4Dark.profile.addImage}
                                    style={Internalstyles.GalleryImg}
                                  />
                                </TouchableOpacity>
                              }
                            </View>
                          );
                        }
                      }}
                      keyExtractor={item => item.id.toString()}
                      numColumns={3}
                      columnWrapperStyle={{
                        justifyContent: 'space-around',
                        margin: 5,
                      }}
                      showsHorizontalScrollIndicator={false}
                    />
                    galleryLoader ? (
                    <View style={[Internalstyles.GalleryWrapper]}>
                      <ActivityIndicator style={Internalstyles.profile} />
                    </View>
                    ) : null
                  </View>
                </>
              )}
            </View>
            {/* </ScrollView> */}

            {modalVisible4Hours ? (
              <AddHoursModal
                styles={styles}
                modalVisible4Hours={modalVisible4Hours}
                setModalVisible4Hours={setModalVisible4Hours}
                setChanges={setChanges}
                anyChanges={anyChanges}
                userDetails={userDetails}
              />
            ) : null}

            <View style={{height: 100}} />
          </View>
        </ScrollView>
        <LoaderModal
          isImageMode={imageMode}
          totalFailedUploadingImage={totalFailedUploadingImage}
          totalUploadingImage={totalUploadingImage}
          totalUploadedImage={totalUploadedImage}
          setModalVisible={setLoaderModalVisible}
          showModal={showModal}
        />

        <Modal
          animationType="fade"
          transparent={false}
          visible={colorModalVisible}
          onRequestClose={() => {
            // Alert.alert("Modal has been closed.");
            // setColorModalVisible(!colorModalVisible);
          }}>
          <View style={[styles.apmodalView, {paddingTop: 30}]}>
            <View style={{alignItems: 'flex-end'}}>
              <Icon
                name="close"
                size={24}
                style={styles.primaryText}
                onPress={() => setColorModalVisible(false)}
              />
            </View>
            <Text
              style={[
                {fontSize: 20, textAlign: 'center', marginBottom: 20},
                styles.primaryText,
              ]}>
              Choose{' '}
              {colorPickerMode == 'background'
                ? 'Background Color'
                : 'Font Color'}
            </Text>

            {colorPickerMode == 'background' ? (
              <View style={{height: 300}}>
                <ColorPicker
                  color={backgroundColor || '#000'}
                  swatchesOnly={false}
                  onColorChange={color => {
                    setBackgroundColor(color);
                  }}
                  thumbSize={30}
                  sliderSize={20}
                  noSnap={true}
                  row={false}
                  swatchesLast={true}
                  swatches={true}
                  discrete={false}
                />
              </View>
            ) : colorPickerMode == 'font' ? (
              <View style={{height: 400, flexDirection: 'column'}}>
                <View style={{height: 300}}>
                  <ColorPicker
                    color={fontColor || '#fff'}
                    swatchesOnly={false}
                    onColorChange={color => {
                      setFontColor(color);
                    }}
                    thumbSize={30}
                    sliderSize={20}
                    noSnap={true}
                    row={false}
                    swatchesLast={true}
                    swatches={true}
                    discrete={false}
                  />
                </View>
                <View style={{marginVertical: 20}}>
                  <Text style={{color: 'white', alignSelf: 'center'}}>
                    Choose Font{' '}
                  </Text>
                  <Picker
                    onValueChange={value => {
                      setFontFamily(value);
                    }}
                    selectedValue={fontFamily}
                    style={{color: 'white', height: 40}}
                    itemStyle={{fontFamily: fontFamily}}>
                    {fontFamilies.map(item => {
                      let fontName = '';
                      if (Platform.OS == 'ios') {
                        fontName = item.valueIOS;
                      } else {
                        fontName = item.label;
                      }

                      return (
                        <Picker.Item
                          label={item.label}
                          value={fontName}
                          key={item.label}
                        />
                      );
                    })}
                  </Picker>
                </View>
              </View>
            ) : null}

            <TouchableOpacity
              style={{
                alignSelf: 'center',
                backgroundColor: commonColors.LinksAndIndicatorColor,
                paddingVertical: 10,
                paddingHorizontal: 24,
                marginTop: 20,
              }}
              onPress={() => {
                if (!colorSaveLoader) {
                  setColorSaveLoader(true);
                  if (colorPickerMode == 'font') {
                    updateUserFontColor(
                      userDetails.temp_id,
                      fontColor,
                      response => {
                        setColorSaveLoader(false);
                        setColorModalVisible(false);
                      },
                    );
                    updateUserFontFamily(
                      userDetails.temp_id,
                      fontFamily,
                      response => {
                        console.log(response, ' font');
                      },
                    );
                  } else {
                    updateUserBackgroundColor(
                      userDetails.temp_id,
                      backgroundColor,
                      response => {
                        setColorSaveLoader(false);
                        setColorModalVisible(false);
                      },
                    );
                  }
                }
              }}>
              {colorSaveLoader ? (
                <ActivityIndicator
                  size="large"
                  color={themeColors.primaryColor}
                />
              ) : (
                <Text style={{color: 'white'}}>Save Changes</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                alignSelf: 'center',
                backgroundColor: commonColors.LinksAndIndicatorColor,
                paddingVertical: 10,
                paddingHorizontal: 24,
                marginTop: 20,
              }}
              onPress={() => {
                if (colorPickerMode == 'font') {
                  setColorPickerMode('background');
                } else {
                  setColorPickerMode('font');
                }
              }}>
              <Text style={{color: 'white'}}>
                Choose{' '}
                {colorPickerMode == 'font' ? 'Background Color' : 'Font Color'}
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
}

const Internalstyles = StyleSheet.create({
  container: {
    flex: 1,
    // height:height
  },
  profileHeader: {
    width: '100%',
    height: 150,
  },
  HeaderRightEditIcon: {
    alignSelf: 'flex-end',
    marginTop: 2,
    paddingRight: 4,
  },
  profile: {
    marginTop: -60,
    alignSelf: 'center',
    width: 120,
    height: 120,
  },
  ProfileIdWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  ProfileId: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
  },
  userProfileLinkWrapper: {
    alignItems: 'center',
    marginTop: 10,
  },
  TabsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  TabsText: {
    fontSize: 20,
  },
  activeTabColor: {
    marginTop: 2,
    borderRadius: 4,
    height: 4,
    width: '100%',
  },
  InactiveTabColor: {
    marginTop: 2,
    borderRadius: 4,
    height: 4,
    width: '100%',
    backgroundColor: 'grey',
  },
  TabsBodyWrapper: {
    paddingHorizontal: 10,
    marginTop: 5,
  },
  aboutIntroWrapper: {
    backgroundColor: '#cecece33',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
    position: 'relative',
    left: -10,
    width: width,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  aboutText: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 5,
    paddingLeft: 15,
    marginVertical: 10,
  },
  HoursWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  HoursText: {
    fontSize: 18,
  },
  AddHoursBtn: {
    paddingHorizontal: 6,
    paddingVertical: 5,
    borderRadius: 4,
  },
  GalleryWrapper: {
    marginTop: 16,
  },
  GalleryImg: {
    width: 90,
    height: 90,
  },
  OpeningTimeWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 14,
  },
  iconWrapper: {
    height: 30,
    width: 30,
    borderRadius: 50,
    backgroundColor: 'black',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
