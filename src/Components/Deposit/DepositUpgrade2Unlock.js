import React, { useState, useEffect} from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { DefaultStyles } from '../AppKaStyle/DefaultStyles'
import { DarkModeStyles } from '../AppKaStyle/DarkModeStyles'
import {assets4Dark, assets4Light} from '../config'
import { useSelector } from 'react-redux'

export default function DepositUpgrade2Unlock() {

    const styles = useSelector((state)=>state.user.themeStyle);
    // const [styles, setStyles] = useState(DarkModeStyles);


    return (
        <View style={styles.container}>
            <Image source={assets4Light.auth.logo} style={Internalstyles.AuthLogo} />
              {/* <Text style={[styles.primaryText, Internalstyles.imageFooterTitle]}>Appointment Booking</Text> */}

              <Text style={[styles.primaryText, Internalstyles.mainTitle]}>
                  Visit Profile Section To Upgrade
              </Text>

              <View style={Internalstyles.FooterWrapper}>
                  <Text style={[Internalstyles.formInfoText, styles.primaryText]}>For More Information Visit:</Text>
                  <Text style={styles.textLinkColor}>https://www.tattbooking.com/</Text>
              </View>
        </View>
    )
}

const Internalstyles = StyleSheet.create({
    AuthLogo:{
        marginTop:50,
        width:'80%',
        height:130,
        alignSelf: 'center',
    },

    mainTitle:{
        fontSize:20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop:20,
    },
    FooterWrapper:{
        marginTop:20,
        alignItems: 'center',
    },
    formInfoText:{
        fontSize:17,
        fontWeight: 'bold',
    }
})
