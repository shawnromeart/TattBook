import {StyleSheet,Dimensions, Platform} from 'react-native'
import {theme4Default} from '../config'

const height = Dimensions.get("screen").height
export const DefaultStyles = StyleSheet.create({

    container:{
        backgroundColor: theme4Default.primaryColor,
        height: height,
    },
    primaryText:{
        color: theme4Default.PrimaryText,
    },
    textLinkColor:{
        color: theme4Default.LinksAndIndicatorColor
    },
    primaryBg:{
        backgroundColor: theme4Default.primaryColor,
    },
    safeArea:{
        backgroundColor: theme4Default.primaryColor,
        paddingTop: Platform.OS=="ios"?10:0
    },
    exprimaryBg:{
        backgroundColor: theme4Default.exprimaryColor,
    },
    activeTab:{
        backgroundColor: theme4Default.LinksAndIndicatorColor  
      },
    LinksAndIndicatorColor:{
        backgroundColor: theme4Default.LinksAndIndicatorColor  
    },
    Bookingtitle:{
        color: theme4Default.PrimaryText,
        backgroundColor: theme4Default.primaryColor,
        fontSize:18,
        textAlign: 'center',
        paddingVertical: 20,
    },
    calender_wrapper:{
        backgroundColor: theme4Default.exprimaryColor,
    },


        // AppointmentWale sare Styles

        AppointmentTitle:{
            color: theme4Default.PrimaryText,
            backgroundColor: theme4Default.exprimaryColor,
            fontSize:20,
            textAlign: 'center',
            paddingVertical: 12, 
        },
        ap_userName:{
            color: theme4Default.PrimaryText,
            fontSize:20,
            fontWeight: 'bold'
        },
        ap_textLabel12:{
            color: theme4Default.PrimaryText, 
            fontSize:12
        },
        ap_labelTextMt12:{
            color: theme4Default.PrimaryText, 
            fontSize:12,
            marginTop:12 
        },
    apmodalView: {
        width:'100%',
        height: height,
        // flex:1,
        backgroundColor: theme4Default.primaryColor,
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
            borderColor:theme4Default.PrimaryText,
            borderRadius: 4,
            paddingHorizontal:6,
            marginTop:20,
            backgroundColor: theme4Default.primaryColor,
        },
        inputText:{
            backgroundColor: theme4Default.exprimaryColor+'66',
            borderRadius: 4,
            borderBottomColor: theme4Default.PrimaryText,
            borderBottomWidth: 1,
            fontSize:16,
            color: theme4Default.PrimaryText
        }


})