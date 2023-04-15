/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
const height = Dimensions.get('window').height;
export default function TabBar(props) {
  const {authStatus} = props;
  //import style from redux
  const styles = useSelector(state => state.user.themeStyle);

  //creating single generic  tab item structure
  const renderTabItem = (icon, label, fun) => {
    return (
      <TouchableWithoutFeedback onPress={fun}>
        <View
          style={{
            justifyContent: 'space-between',
            margin: 10,
            alignItems: 'center',
          }}>
          <Icon name={icon} size={20} style={styles.primaryText} />
          <Text style={styles.primaryText}>{label}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  return authStatus ? (
    <View
      style={[
        {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingBottom: 15,
        },
        styles.primaryBg,
      ]}>
      <View>
        {renderTabItem('home', 'Home', () => props.navigation.navigate('Home'))}
      </View>
      <View>
        {renderTabItem('list', 'Appointments', () =>
          props.navigation.navigate('Appointment'),
        )}
      </View>
      <View>
        {renderTabItem('dollar-sign', 'Deposits', () =>
          props.navigation.navigate('Deposit'),
        )}
      </View>
      <View>
        {renderTabItem('user', 'Profile', () =>
          props.navigation.navigate('Profile'),
        )}
      </View>
    </View>
  ) : null;
}

const styles = StyleSheet.create({});
