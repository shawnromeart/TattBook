import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image } from 'react-native'
import { DefaultStyles } from '../AppKaStyle/DefaultStyles'
import { DarkModeStyles } from '../AppKaStyle/DarkModeStyles'
import {assets4Dark, assets4Light, commonColors} from '../config'
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function Appointment() {

    const [styles, setStyles] = useState(DarkModeStyles)
    const [assets, setAssets] = useState(assets4Dark)
    

    const renderAppointmentCard=()=>{
        return(
            <View style={{flexDirection: 'row', marginTop:40}}>
                    
                <View style={{marginTop: -10}}>
                    <Image source={assets.booking.SilverCard1} style={{width: 190, height: 68}} />
                    <View style={{position: 'absolute',top: 4, left:8}}>
                        <Text style={styles.ap_userName}>Shivam</Text>
                        <Text style={styles.primaryText}>Tue Sept 21, 2021</Text>
                    </View>
                    <View style={{flexDirection: 'row',}}>
                        <View style={{marginRight:40}}>
                            <Icon name="checkmark" size={24} color={"grey"} />
                            <Text style={styles.ap_textLabel12}>Accept</Text>
                        </View>
                        <View>
                            <Icon name="close" size={24} color={"grey"} />
                            <Text style={styles.ap_textLabel12}>Reject</Text>
                        </View>
                    </View>
                </View>
                
                <View style={{marginLeft: -50, marginTop:20}}>
                    <Image source={assets.appointment.SliverCard1r} style={{width: 190, height: 66,}} />
                    <View style={{position: 'absolute',top: 4, right:8}}>
                    <View style={{flexDirection: 'row', width:115, justifyContent: 'space-between'}}>
                        <View>
                            <Text style={styles.ap_textLabel12}>Status</Text>
                            <Text style={styles.ap_labelTextMt12}>Time</Text>
                        </View>
                        <View>
                            <Text style={styles.ap_textLabel12}>Completed</Text>
                            <Text style={styles.ap_labelTextMt12}>03:01:00</Text>
                        </View>
                        
                    </View>
                    </View>
                </View>
                
            </View>
        )
    }


    const action4DarkMode=()=>{
        setStyles(DarkModeStyles)
        setAssets(assets4Dark)
        // alert('darkMode')
    }

    const action4DefaultMode=()=>{
        setStyles(DefaultStyles)
        setAssets(assets4Light)
        // alert('light mode')
    }


    return (
        <>
        
        <SafeAreaView edges={['top','left','right']}>
        <View style={styles.container}>
             <Text style={styles.AppointmentTitle}> Appointment</Text>

                <View style={{position: 'absolute', right: 4, top: 12,}}>
                     {styles == DarkModeStyles?(
                          <View style={{backgroundColor: commonColors.blueColor, padding:10}}>
                          <Text onPress={() =>action4DefaultMode()}>Default Mode</Text>
                      </View>
                     ):(
                        <View style={{backgroundColor: commonColors.blueColor, padding:10}}>
                        <Text onPress={() =>action4DarkMode()}>DarkMode</Text>
                    </View>
                     )}
                 </View>

            <ScrollView>
                <View style={{paddingHorizontal:12}}>
                    {renderAppointmentCard()}
                    {renderAppointmentCard()}
                    {renderAppointmentCard()}
                    {renderAppointmentCard()}
                    {renderAppointmentCard()}
                    {renderAppointmentCard()}
                    {renderAppointmentCard()}
                </View>
            </ScrollView>
        </View>
        </SafeAreaView>
        </>
    )
}
