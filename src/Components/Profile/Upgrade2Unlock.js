/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {assets4Light} from '../config';
import {useDispatch, useSelector} from 'react-redux';
import {upgradeToPro} from '../../Apis/Profile';
import SET_USER_PRO_STATUS from '../../Reducers/types';

export default function Upgrade2Unlock() {
  const styles = useSelector(state => state.user.themeStyle);
  // const [styles, setStyles] = useState(DarkModeStyles);
  const userDetails = useSelector(state => state.user.insDetails);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const [activationCode, setActivationCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const upgradeApiResult = response => {
    if (response.msg == 'success') {
      dispatch({type: SET_USER_PRO_STATUS, payload: {status: '1'}});
    } else {
      setShowErrorMessage(true);
    }
    setLoading(false);
  };
  const action4ActivateBtn = () => {
    if (!loading) {
      setLoading(true);
      upgradeToPro(activationCode, userDetails.temp_id, upgradeApiResult);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={assets4Light.auth.logo}
          style={Internalstyles.AuthLogo}
        />
        <Text style={[Internalstyles.h1, styles.primaryText]}>
          Upgrade To Unlock Profile
        </Text>

        {showErrorMessage && (
          <View style={Internalstyles.ErrorMsgWrapper}>
            <Text style={styles.primaryText}>
              Wrong or Used Activation Code
            </Text>
          </View>
        )}

        <View style={Internalstyles.FormMainWrapper}>
          <Text style={[styles.primaryText, Internalstyles.FormLabel]}>
            Enter Activation Code:
          </Text>
          <View style={[styles.apmFormWrapper, Internalstyles.FormWrapper]}>
            <TextInput
              style={{padding: 10}}
              onChangeText={text => setActivationCode(text)}
            />
          </View>

          <TouchableOpacity
            onPress={() => action4ActivateBtn()}
            style={[
              Internalstyles.activateBtnWrapper,
              styles.LinksAndIndicatorColor,
            ]}>
            {loading ? (
              <ActivityIndicator size="large" />
            ) : (
              <Text
                style={[Internalstyles.activateBtnText, styles.primaryText]}>
                Activate
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={Internalstyles.FooterWrapper}>
          <Text style={[Internalstyles.formInfoText, styles.primaryText]}>
            For More Information Visit:
          </Text>
          <Text style={styles.textLinkColor}>https://www.tattbooking.com/</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const Internalstyles = StyleSheet.create({
  AuthLogo: {
    marginTop: 50,
    width: '80%',
    height: 130,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  h1: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 20,
  },
  ErrorMsgWrapper: {
    backgroundColor: '#ff5252',
    marginHorizontal: 70,
    paddingVertical: 10,
    alignItems: 'center',
  },
  FormMainWrapper: {
    paddingHorizontal: 70,
    marginVertical: 70,
  },
  FormWrapper: {
    marginTop: 0,
  },
  FormLabel: {
    fontSize: 22,
  },
  activateBtnWrapper: {
    marginTop: 30,
    marginHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 8,
  },
  activateBtnText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  FooterWrapper: {
    marginTop: 60,
    alignItems: 'center',
  },
  formInfoText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});
