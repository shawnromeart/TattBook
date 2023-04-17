//server configuration

import moment from 'moment';

export const serverBaseUrl = 'https://www.tattbooking.com/'; //server domain url will used as base for apis connections and  image full path resolution
export const serverApiUrl = serverBaseUrl + 'tattey_app/appapis/'; //server api url will used as base for apis connections

export const userProfileLink = 'https://www.tattbooking.com/@';

//default theme colors
export const theme4Default = {
  primaryColor: '#ffffff',
  exprimaryColor: '#dfdfdf',
  whiteColor: '#f1effe',
  PrimaryText: '#000000',
  LinksAndIndicatorColor: '#000',
  redColor: '#ff0000',
  orangeColor: '#ff7000',
  blueColor: '#000',
  yellowColor: '#f9e206',
  greenColor: '#17e82e',
};

//dark theme colors
export const theme4DarkMode = {
  primaryColor: '#000000',
  exprimaryColor: '#333333',
  whiteColor: '#ffffff',
  PrimaryText: '#ffffff',

  LinksAndIndicatorColor: '#000',
  redColor: '#ff0000',
  orangeColor: '#ff7000',
  blueColor: '#fff',
  yellowColor: '#f9e206',
  greenColor: '#17e82e',
};

export const commonColors = {
  LinksAndIndicatorColor: '#000',
  redColor: '#ff0000',
  orangeColor: '#ff7000',
  blueColor: '#000',
  yellowColor: '#f9e206',
  greenColor: '#17e82e',
};

//dark theme assets
export const assets4Dark = {
  booking: {
    SilverCard1: require('../Assets/SilverCard1.png'),
    SilverCard2: require('../Assets/SilverCard2.png'),
    SilverCard3: require('../Assets/SilverCard3.png'),
    SilverCard4: require('../Assets/SilverCard4.png'),
    SilverCard5: require('../Assets/SilverCard5.png'),
  },
  appointment: {
    SliverCard1r: require('../Assets/SliverCard1r.png'),
  },
  profile: {
    bg: require('../Assets/profileHeaderBg.jpg'),
    defaultProfile: require('../Assets/defaultProfile.jpg'),
    addImage: require('../Assets/addImage.jpg'),
    remove: require('../Assets/remove.png'),
  },
};

//light theme assets
export const assets4Light = {
  booking: {
    SilverCard1: require('../Assets/SilverCard1w.png'),
    SilverCard2: require('../Assets/SilverCard2.png'),
    SilverCard3: require('../Assets/SilverCard3.png'),
    SilverCard4: require('../Assets/SilverCard4.png'),
    SilverCard5: require('../Assets/SilverCard5.png'),
  },
  appointment: {
    SliverCard1r: require('../Assets/SilverCard1rw.png'),
  },
  auth: {
    logo: require('../Assets/logoBorder.png'),
  },
};

export const capitalizeFirstLetter = str => {
  if (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return str;
  //
};

export const formatAppointmentTime = time => {
  // return moment(time,"hh:mm:ss").format("hh:mm A")
  return time;
};
