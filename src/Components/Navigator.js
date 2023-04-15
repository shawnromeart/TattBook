import React, {useEffect, useState} from 'react';
import Appointment_oldWala from './Appointment/Appointment_oldWala';
import BookedAppointment from './Appointment/BookedAppointment';
import AppointmentModal from './AppointmentModal/AppointmentModal';
import SignUp from './Auth/SignUp';
import Booking from './Booking/Booking';
import Deposit from './Deposit/Deposit';
import DepositUpgrade2Unlock from './Deposit/DepositUpgrade2Unlock';
import Home from './Home/Home';
import Profile from './Profile/Profile';
import Upgrade2Unlock from './Profile/Upgrade2Unlock';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TabBar from './TabBar';
import {
  SET_APPOINTMENTS,
  SET_APP_MODE,
  SET_AUTH_STATUS,
  SET_THEME_MODE,
  SET_USER_DETAILS,
  SET_USER_IMAGES,
  SET_USER_SLOTS,
} from '../Reducers/types';
import {ActivityIndicator, View} from 'react-native';
import {fetch_user_appointments} from '../Apis/Appointment';
import SplashScreen from 'react-native-splash-screen';
import {fetch_user_details} from '../Apis/Profile';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import Toast from 'react-native-simple-toast';
const Tab = createBottomTabNavigator();
const checkAuth = async (
  setCheckingAut,
  setUserAuthStatus,
  setUserDetails,
  appointmentCallback,
) => {
  try {
    const value = await AsyncStorage.getItem('user_details');
    if (value !== null) {
      let data = JSON.parse(value);
      if (data.temp_id && data.name) {
        fetch_user_details(data.temp_id, response => {
          fetch_user_appointments(
            response.result.name,
            response.result.temp_id,
            response => appointmentCallback(response, data.name, data.temp_id),
          );
          setUserDetails(response.result, response.slots, response.imgs);
          setUserAuthStatus(true);
          //updating check auth progress variable  to false so that content can be rendered on screens
        });
      } else {
        setUserAuthStatus(false);
        //updating check auth progress variable  to false so that content can be rendered on screens
        setCheckingAut(false);
      }
    } else {
      setUserAuthStatus(false);
      //updating check auth progress variable  to false so that content can be rendered on screens
      setCheckingAut(false);
    }
  } catch (e) {
    // error reading value
  }
};
const getSavedThemeMode = async setSavedThemeMode => {
  try {
    const value = await AsyncStorage.getItem('userThemeMode');
    if (value !== null) {
      // value previously stored
      setSavedThemeMode(value);
    }
  } catch (e) {
    // error reading value
  }
};
function Navigator() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const authStatus = useSelector(state => state.user.authStatus);
  const dispatch = useDispatch();

  //function to update auth status  of user in redux
  const setUserAuthStatus = authStatus => {
    dispatch({type: SET_AUTH_STATUS, payload: {authStatus}});
  };

  //function to update user details  of user in redux
  const setUserDetails = (userDetails, slots, galleryImages) => {
    dispatch({type: SET_USER_DETAILS, payload: {insDetails: userDetails}});
    dispatch({type: SET_USER_IMAGES, payload: {images: galleryImages}});
    dispatch({type: SET_USER_SLOTS, payload: {slots: slots}});
  };

  //function to handle call back of appointments of user logged in app
  const appointmentCallback = (response, name, temp_id) => {
    if (response.msg == 'success') {
      dispatch({type: SET_APP_MODE, payload: {appMode: response.appMode}});
      dispatch({
        type: SET_APPOINTMENTS,
        payload: {appointments: response.result},
      });
    }
    setCheckingAuth(false);
    //  Toast.show("msg "+response.msg+" error "+ response.error+" rowCount "+response.rowCount+" name "+name+" temp_id "+temp_id)
  };

  //function to update user themeMode   in redux
  const setSavedThemeMode = themeMode => {
    dispatch({type: SET_THEME_MODE, payload: {themeMode}});
  };

  //use effec to check uer is logged in or not and if yes then fetch its appointment and update redux accordingly
  useEffect(() => {
    //passing all reedux update fucntion defined above here as parameters
    checkAuth(
      setCheckingAuth,
      setUserAuthStatus,
      setUserDetails,
      appointmentCallback,
    );
    //fetching user theme mode and saving it to redux
    getSavedThemeMode(setSavedThemeMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!checkingAuth) {
      //hididng splash screen   if all initial  process has been done
      SplashScreen.hide();
    }
  }, [checkingAuth]);

  return (
    // <SafeAreaView>
    <NavigationContainer>
      {checkingAuth ? (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <Tab.Navigator
          screenOptions={{headerShown: false}}
          tabBar={props => <TabBar {...props} authStatus={authStatus} />}>
          {authStatus ? (
            <>
              <Tab.Screen name="Home" component={Home} />
              {/* <Tab.Screen name="Booking" component={Booking} /> */}
              <Tab.Screen name="Appointment" component={BookedAppointment} />
              <Tab.Screen name="Profile" component={Profile} />
              <Tab.Screen name="Go Pro" component={DepositUpgrade2Unlock} />
              <Tab.Screen name="Deposit" component={Deposit} />
              {/* <Tab.Screen name="Appointment" component={Appointment_oldWala} /> */}
            </>
          ) : (
            <Tab.Screen name="Auth" component={SignUp} />
          )}
        </Tab.Navigator>
      )}
    </NavigationContainer>
    // {/* </SafeAreaView> */}
  );
}

export default Navigator;
