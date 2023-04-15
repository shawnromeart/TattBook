import React, { Component,useState } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { DefaultStyles } from '../AppKaStyle/DefaultStyles'
import { DarkModeStyles } from '../AppKaStyle/DarkModeStyles'
import CalendarPicker from 'react-native-calendar-picker'
import {assets4Dark} from '../config'


export default function Booking (props) {


    // constructor(props) {
    //     super(props);
    //     this.state = {
    //       selectedStartDate: null,
    //       styles : DarkModeStyles,
    //       // styles : DefaultStyles,
    //     };
    //     this.onDateChange = this.onDateChange.bind(this);
    //   }
    const [date,changeDate] = useState();
    const [styles,changestyle] = useState(DarkModeStyles);
    const [selectedStartDate,changeStartDate] = useState(null);

 
      // function onDateChange(date) {
      //   this.setState({
      //     selectedStartDate: date,
      //   });
      // }


      renderAppointmentCard=(name, age)=>{
        return(
          <View style={{flexDirection: 'row', marginBottom:26}}>
              <View style={{marginTop: -10}}>
                <Image source={assets4Dark.booking.SilverCard1} style={{width: 190, height: 66}} />
                <View style={{position: 'absolute',top: 4, left:8}}>
                  <Text style={{color: 'white', fontSize:20, fontWeight: 'bold'}}>{name}</Text>
                  <Text style={{color: 'white'}}>Age: {age} yrs</Text>
                </View>
              </View>
              <View style={{marginLeft:-10}}>
                <View style={{flexDirection: 'row', marginLeft: -10}}>
                  <View>
                    <Image source={assets4Dark.booking.SilverCard2} style={{width: 80, height: 30,}} />
                    <Text style={{color: 'white', fontSize:12, position: 'absolute', right: 25,top:6}}>Arm</Text>
                  </View>
                  <View>
                    <Image source={assets4Dark.booking.SilverCard3} style={{width: 90, height: 30, marginLeft: -13,}} />
                    <Text style={{color: 'white', fontSize:12, position: 'absolute', right: 14,top:6}}>Red Skull</Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row', marginLeft: -42, marginTop: 10}}>
                  <View>
                    <Image source={assets4Dark.booking.SilverCard4} style={{width: 80, height: 30}} />
                    <Text style={{color: 'white', fontSize:12, position: 'absolute', right: 25,top:6}}>Back</Text>
                  </View>
                  <View>
                    <Image source={assets4Dark.booking.SilverCard5} style={{width: 120, height: 30, marginLeft:-13}} />
                    <Text style={{color: 'white', fontSize:12, position: 'absolute', right: 25,top:6}}>Butterfly</Text>
                  </View>
                </View>
              </View>
          </View>
        )
      }


    


    // const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';


        return (
            <View style={styles.container}>
                <Text style={styles.Bookingtitle}> Select a date for Appointment</Text>

                <View style={styles.calender_wrapper}>
                    <CalendarPicker onDateChange={(date)=>changeStartDate(date)} 
                        todayBackgroundColor={'red'}
                        textStyle={{color: '#f1effe'}}
                        selectedDayTextColor={'white'}
                        selectedDayColor={'red'}
                            /> 
                </View>

              <ScrollView>
              <View style={{marginTop:30, paddingHorizontal:12}}>
                  
                    {renderAppointmentCard('Shivam Kumar', '21')}
                    {renderAppointmentCard('Shiv Kumar', '18')}
                    {renderAppointmentCard('Ram Kumar', '19')}
                    {renderAppointmentCard('Raj Kumar', '20')}
                    {renderAppointmentCard('Payal Kumari', '22')}
                    {renderAppointmentCard('Shivani', '21')}

              </View>
              </ScrollView>

            </View>
        )
}


