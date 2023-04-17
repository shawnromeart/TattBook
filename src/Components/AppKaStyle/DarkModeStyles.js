import {StyleSheet,Dimensions, Platform} from 'react-native'
import {theme4DarkMode} from '../config'
const height = Dimensions.get("screen").height
export const DarkModeStyles = StyleSheet.create({
    container:{
        backgroundColor: theme4DarkMode.primaryColor,
        height: height,
    },
    primaryText:{
        color: theme4DarkMode.PrimaryText,
        
    },
    textLinkColor:{
        color: theme4DarkMode.LinksAndIndicatorColor
    },
    primaryBg:{
        backgroundColor: theme4DarkMode.primaryColor,
    },
    safeArea:{
        backgroundColor: theme4DarkMode.primaryColor,
        paddingTop: Platform.OS=="ios"?10:0
    },
    exprimaryBg:{
        backgroundColor: theme4DarkMode.exprimaryColor,
    },
    activeTab:{
      backgroundColor: theme4DarkMode.LinksAndIndicatorColor  
    },
    LinksAndIndicatorColor:{
        backgroundColor: theme4DarkMode.LinksAndIndicatorColor  
      },

    Bookingtitle:{
        color: theme4DarkMode.whiteColor,
        backgroundColor: theme4DarkMode.primaryColor,
        fontSize:18,
        textAlign: 'center',
        paddingVertical: 20,
    },
    calender_wrapper:{
        backgroundColor: theme4DarkMode.exprimaryColor,
    },

    // AppointmentWale sare Styles

    AppointmentTitle:{
        color: theme4DarkMode.whiteColor,
        backgroundColor: theme4DarkMode.exprimaryColor,
        fontSize:20,
        textAlign: 'center',
        paddingVertical: 12, 
    },
    ap_userName:{
        color: theme4DarkMode.PrimaryText,
        fontSize:20,
        fontWeight: 'bold'
    },
    ap_textLabel12:{
        color: theme4DarkMode.PrimaryText, 
        fontSize:12
    },
    ap_labelTextMt12:{
        color: theme4DarkMode.PrimaryText, 
        fontSize:12,
        marginTop:12 
    },
    apmodalView: {
        flex:1,
        width:'100%',
        height: height,
        backgroundColor: theme4DarkMode.exprimaryColor,
        paddingHorizontal:12,
        paddingVertical:20,
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      apmFormWrapper:{
        borderWidth: 1,
        borderColor:theme4DarkMode.primaryColor,
        borderRadius: 4,
        paddingHorizontal:6,
        marginTop:20,
        backgroundColor: theme4DarkMode.whiteColor
    },

    inputText:{
        backgroundColor: theme4DarkMode.whiteColor+'66',
        borderRadius: 4,
        borderBottomColor: theme4DarkMode.whiteColor,
        borderBottomWidth: 1,
        color: theme4DarkMode.PrimaryText,
        fontSize:16
    }


})


