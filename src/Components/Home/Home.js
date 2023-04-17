import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image,Alert, ActivityIndicator,Dimensions } from 'react-native'
import { DefaultStyles } from '../AppKaStyle/DefaultStyles'
import { DarkModeStyles } from '../AppKaStyle/DarkModeStyles'
import {assets4Dark, assets4Light, commonColors, theme4Default,} from '../config'
import Icon from 'react-native-vector-icons/Ionicons';
import CalendarPicker from 'react-native-calendar-picker'
import AppointmentModal from '../AppointmentModal/AppointmentModal';
import AppointmentList from './AppointmentList';

import { useDispatch } from 'react-redux'
import {SET_THEME_MODE} from '../../Reducers/types'
import {useSelector} from 'react-redux'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-simple-toast'; 
const height = Dimensions.get('window').height;
export default function Home(props) {

    const userDetails = useSelector((state)=>state.user.insDetails)
    const appointments = useSelector((state)=>state.user.appointments)
    const styles = useSelector((state)=>state.user.themeStyle);
    const themeColors = useSelector((state)=>state.user.themeColors);
    // const styles = useSelector((state)=>state.user.styles);
    // const [styles, setStyles] = useState(DarkModeStyles)
    // const [assets, setAssets] = useState(assets4Dark)
    const [selectedStartDate,setSelectedStartDate] = useState(new Date())
    // const [showAppointmentModal,setShowAppointmentModal] = useState(null)
    const [showSimmer, setShowSimmer] = useState(true)
    const [modalVisible, setModalVisible] = useState(false);
    
    const [selectedAppointments ,setSelectedAppointments] = useState({});
    const [allApointmentDates,setAllApointmentDates] = useState([]);
    const dispatch = useDispatch()

    const onDateChangeAction=(date)=> {
       

        if(selectedStartDate && (date.toString()==selectedStartDate.toString()))
        {
            var curDATE = new Date();
            curDATE.setDate(curDATE.getDate()-1)

            if(date< curDATE)
            {
                Alert.alert(
                    'Alert',
                    `Can't Book Appointment for a Past Date`,
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') }
                    ],
                        { cancelable: true }
                );
            }else
            {
                // this.openBookingModal();
                setModalVisible(true)
            } 
        }    
        else
        {

            if(!(date<curDATE))
            {
                Toast.show('Press Again To Book Appointment', Toast.LONG);
            }
            
        }

        setSelectedStartDate(date) 
            
      }

      useEffect(() => {
        
          if(appointments)
          {
            setSelectedAppointments(makeApointmentStructure(selectedStartDate))

            let appoint_date = [];
            appointments.map(item=>{   
                appoint_date.push(item.date)
             });
             setAllApointmentDates(appoint_date)
          }
        
      },[appointments,selectedStartDate])

    const  makeApointmentStructure = (date) => { 

        var d  = new Date(date); 
        var new_date_string = d.getFullYear()+"-"+(makeTwoDigits(d.getMonth()+1))+"-"+makeTwoDigits(d.getDate()) 
         
        var today_appointments =  appointments.filter((item)=>{
             return item.date==new_date_string; 
         }) 
         var arr={}; 
         var temp_arr = [];
         today_appointments.map((item)=>{  
             
             var hour  = item.time.split(":")[0];
             if(!arr[hour])
             {
                
                 if(Object.keys(arr).length)
                 {
                     temp_arr.push(arr);
                     arr={};
                 }
                 
                 arr[hour] =[];     
             } 
             arr[hour].push({...item,element:"appoint"}); 
             return arr;
         })
         if(Object.keys(arr).length)
         {
             temp_arr.push(arr);
             arr={};
         }
        
        return temp_arr;
    }
    const makeTwoDigits = (time) => {
        const timeString = `${time}`;
        if (timeString.length === 2) return time
        return `0${time}`
    }

      useEffect(() => {
        setTimeout(()=>{
            setShowSimmer(false)
        },0.1)

      }, [])

      
    



    const action4DarkMode=()=>{
        // setStyles(DarkModeStyles)
        // setAssets(assets4Dark)
        dispatch({ type: SET_THEME_MODE, payload: { themeMode: "DarkMode" } })
        // alert('darkMode')
        setShowSimmer(true)
        setTimeout(()=>{
            setShowSimmer(false)
        },0.1)
    }

    const action4DefaultMode=()=>{
        // setStyles(DefaultStyles)
        // setAssets(assets4Light)
        dispatch({ type: SET_THEME_MODE, payload: { themeMode: "default" } })
        // alert('light mode')
        setShowSimmer(true)
        setTimeout(()=>{
            setShowSimmer(false)
        },0.1)
    }

    const customDatesStylesCallback = date => { 
        var d = new Date(date);
        var formatted_date = d.getFullYear()+"-"+(makeTwoDigits(d.getMonth()+1))+"-"+makeTwoDigits(d.getDate()); 
        // console.log(formatted_date)
        // console.log(this.props.appointment)
        if(allApointmentDates&&allApointmentDates.includes(formatted_date))
        {
            return {
                style:{
                  backgroundColor: 'grey',
                },
                textStyle: {
                  color: 'white',
                  fontWeight: 'bold',
                }
              };
        }
        
      }

    
    return (
    <>
 
        <SafeAreaView edges={['top','left','right']}>
 
            <ScrollView style={[styles.primaryBg,{height:height}]} contentContainerStyle={styles.primaryBg}>
                <View style={styles.container}>
                    <Text style={styles.AppointmentTitle}> Booking</Text>
                    <View style={{position: 'absolute', right: 4, top: 6,}}>
                        {styles == DarkModeStyles?(
                            <View style={{backgroundColor: themeColors.PrimaryText, padding:10,borderRadius:5}}>
                            <Text onPress={() =>action4DefaultMode()} style={{color:themeColors.primaryColor}}>Light</Text>
                        </View>
                        ):(
                            <View style={{backgroundColor: themeColors.PrimaryText, padding:10,borderRadius:5}}>
                            <Text onPress={() =>action4DarkMode()} style={{color:themeColors.primaryColor}}>Dark</Text>
                        </View>
                        )}
                    </View> 
                    <Text style={styles.Bookingtitle}> Select a date for Appointment</Text>

                    <View style={styles.calender_wrapper}>
                        {showSimmer?(
                            <View style={{height:300 , alignItems: 'center',justifyContent: 'center'}}>

                                <ActivityIndicator size="large" />
                            </View>
                        ):(
                        <CalendarPicker 
                            onDateChange={onDateChangeAction}
                            todayBackgroundColor={'green'}
                            textStyle={styles.primaryText}
                            selectedDayTextColor={'white'}
                            selectedDayColor={'red'}
                            monthTextColor = {'blue'}
                            height={700}
                            customDatesStyles={customDatesStylesCallback}
                            />
                        )} 
                    </View>


                    <View style={{ padding:10, width:100,   alignSelf: 'center'}}>
                     
                    </View>

                
                    <AppointmentList styles={styles} appointments={selectedAppointments}  />
        

                {modalVisible?(
                    <AppointmentModal 
                            styles={styles}     
                            detailModal={setModalVisible} 
                            setModalVisible={setModalVisible} 
                            dataFromHome="true" 
                            selectedStartDate={selectedStartDate} 
                            userDetails={userDetails} 
                            appointmentDetails={{}}
                    
                    />
                ):(null)}



                    {/* <ScrollView>
                        <View style={{paddingHorizontal:12}}>
                            {renderAppointmentCard()}
                            {renderAppointmentCard()}
                            {renderAppointmentCard()}
                            {renderAppointmentCard()}
                            {renderAppointmentCard()}
                            {renderAppointmentCard()}
                            {renderAppointmentCard()}
                        </View>
                    </ScrollView> */}
                </View>
            </ScrollView>
        </SafeAreaView>
    </>
    )
}
