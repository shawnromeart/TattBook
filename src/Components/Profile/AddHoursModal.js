/* eslint-disable no-alert */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import {AddSlot} from '../../Apis/About';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {fetch_user_details} from '../../Apis/Profile';
import {useDispatch, useSelector} from 'react-redux';
import {SET_USER_SLOTS} from '../../Reducers/types';
import moment from 'moment';

export default function ProfileDetailsModal(props) {
  // eslint-disable-next-line no-undef
  const modalMargin = Platform.OS === 'ios' ? 34 : 0;
  const dispatch = useDispatch();
  const {modalVisible4Hours, setModalVisible4Hours, styles} = props;
  const [openHours, setOpenHours] = useState('Select');
  const [closeHours, setCloseHours] = useState('Select');
  const [day, setDay] = useState('Mon');
  const [showLoader, setLoader] = useState(false);
  const [closeHoursVisible, setcloseHoursVisible] = useState(false);
  const [openHoursVisible, setopenHoursVisible] = useState(false);
  const themeColors = useSelector(state => state.user.themeColors);

  const handleConfirmClose = date => {
    setCloseHours(makeTwoDigits(moment(date).format('h:m a')));
    setcloseHoursVisible(false);
  };

  const handleConfirmOpen = date => {
    setOpenHours(makeTwoDigits(moment(date).format('h:m a')));

    setopenHoursVisible(false);
  };
  const makeTwoDigits = time => {
    const timeArr = time.split(' ');
    const timeArr1 = timeArr[0].split(':');

    let timeString = '';
    if (timeArr1[0].length === 2) {
      timeString = `${timeArr1[0]}`;
    } else {
      timeString = `0${timeArr1[0]}`;
    }

    if (timeArr1[1].length == 2) {
      timeString = `${timeString}:${timeArr1[1]}`;
    } else {
      timeString = `${timeString}:0${timeArr1[1]}`;
    }
    return `${timeString} ${timeArr[1]}`;
  };

  useEffect(() => {
    //   setModalVisible(true)
  });

  function addWorkingHours() {
    if (openHours != 'Select' || closeHours != 'Select') {
      setLoader(true);
      AddSlot(
        props.userDetails.temp_id,
        openHours,
        closeHours,
        day,
        SlotCallback,
      );
    } else {
      alert('Please Select the dates!');
    }
  }

  function SlotCallback(response) {
    if (response.msg == 'success') {
      fetch_user_details(props.userDetails.temp_id, SlotsCallback);
    }
  }

  function SlotsCallback(response) {
    // console.log(response)
    dispatch({type: SET_USER_SLOTS, payload: {slots: response.slots}});
    setLoader(false);
    setModalVisible4Hours(!modalVisible4Hours);
  }

  return (
    <View>
      <View style={{marginTop: 20}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible4Hours}
          onRequestClose={() => {
            // Alert.alert("Modal has been closed.");
            setModalVisible4Hours(!modalVisible4Hours);
          }}>
          <ScrollView style={{marginTop: modalMargin}}>
            <View style={styles.apmodalView}>
              <View style={{alignItems: 'flex-end'}}>
                <Icon
                  name="close"
                  size={24}
                  style={styles.primaryText}
                  onPress={() => setModalVisible4Hours(!modalVisible4Hours)}
                />
              </View>
              <Text
                style={[
                  styles.primaryText,
                  {fontSize: 20, textAlign: 'center'},
                ]}>
                Add Hours
              </Text>

              <View style={Internalstyles.formGroup}>
                <View style={Internalstyles.textLabelWrapper}>
                  <Text style={[styles.primaryText, Internalstyles.textLabel]}>
                    Week Day:
                  </Text>
                </View>
                <View>
                  <Picker
                    style={[{width: 150}, styles.inputText]}
                    onValueChange={(itemValue, itemPosition) =>
                      setDay(itemValue)
                    }
                    selectedValue={day}>
                    <Picker.Item label="Mon" value="Mon" />
                    <Picker.Item label="Tue" value="Tue" />
                    <Picker.Item label="Wed" value="Wed" />
                    <Picker.Item label="Thu" value="Thu" />
                    <Picker.Item label="Fri" value="Fri" />
                    <Picker.Item label="Sat" value="Sat" />
                    <Picker.Item label="Sun" value="Sun" />
                  </Picker>
                </View>
              </View>

              <View style={Internalstyles.formGroup}>
                <View style={[Internalstyles.textLabelWrapper]}>
                  <Text style={[styles.primaryText, Internalstyles.textLabel]}>
                    Opening Hours:
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    setopenHoursVisible(true);
                  }}>
                  <Text
                    style={[
                      {width: 150, paddingLeft: 14, paddingVertical: 15},
                      styles.inputText,
                    ]}>
                    {openHours}
                  </Text>
                  <DateTimePickerModal
                    isVisible={openHoursVisible}
                    mode="time"
                    // locale="en_GB" // Use "en_GB" here
                    date={new Date()}
                    onConfirm={handleConfirmOpen}
                    onCancel={() => {
                      setopenHoursVisible(false);
                    }}
                  />
                </TouchableOpacity>
              </View>

              <View style={Internalstyles.formGroup}>
                <View style={Internalstyles.textLabelWrapper}>
                  <Text style={[styles.primaryText, Internalstyles.textLabel]}>
                    Closing Hours:
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    setcloseHoursVisible(true);
                  }}>
                  <Text
                    style={[
                      {width: 150, paddingLeft: 14, paddingVertical: 15},
                      styles.inputText,
                    ]}>
                    {closeHours}
                  </Text>
                  <DateTimePickerModal
                    isVisible={closeHoursVisible}
                    mode="time"
                    // locale="en_GB" // Use "en_GB" here
                    date={new Date()}
                    onConfirm={handleConfirmClose}
                    onCancel={() => {
                      setcloseHoursVisible(false);
                    }}
                  />
                </TouchableOpacity>
              </View>

              {showLoader ? (
                <TouchableOpacity>
                  <View
                    style={{
                      backgroundColor: themeColors.PrimaryText,
                      padding: 10,
                      marginTop: 50,
                      marginBottom: 68,
                      width: '80%',
                      alignSelf: 'center',
                      alignItems: 'center',
                    }}>
                    <ActivityIndicator
                      size="small"
                      color={themeColors.primaryColor}
                    />
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => addWorkingHours()}>
                  <View
                    style={{
                      backgroundColor: themeColors.PrimaryText,
                      padding: 10,
                      marginTop: 50,
                      marginBottom: 68,
                      width: '80%',
                      alignSelf: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                    }}>
                    <Text style={{color: themeColors.primaryColor}}>Add</Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </Modal>
      </View>
    </View>
  );
}

const Internalstyles = StyleSheet.create({
  formGroup: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textLabelWrapper: {
    width: 170,
  },
  textLabel: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
