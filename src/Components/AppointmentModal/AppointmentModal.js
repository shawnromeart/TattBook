import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, Modal, StyleSheet,TouchableOpacity,ActivityIndicator, TextInput, TouchableWithoutFeedback, FlatList } from 'react-native'
import { DefaultStyles } from '../AppKaStyle/DefaultStyles'
import { DarkModeStyles } from '../AppKaStyle/DarkModeStyles'
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {bookAppointment,updateAppointment,fetch_user_appointments, addAppointmentImages} from '../../Apis/Appointment'
import {useDispatch, useSelector} from 'react-redux'
import { SET_APPOINTMENTS } from '../../Reducers/types';
import { commonColors, formatAppointmentTime } from '../config';
import moment from 'moment';
import Toast from 'react-native-simple-toast'; 
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import AppointmentImages from './AppointmentImages';
export default function AppointmentModal(props) {

    const { modalVisible,setModalVisible,detailModal, styles,selectedStartDate,temp_id,username,appointmentDetails,userDetails,dataToEdit} = props
    // const [modalVisible, setModalVisible] = useState(modalStatusbyProps);
    // const [styles, setStyles] = useState(DefaultStyles)
    const modalMargin = Platform.OS === 'ios' ? 34 : 0
    const dispatch = useDispatch()
    let time = props.dataToEdit ? props.appointmentDetails.time:'Time';
    let margin = props.dataToEdit ? 0:20;
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('time');
    const [showTime, setShowtime] = useState(false);
    const [showDate, setShowDate] = useState(false);
    const [selectedTime , setselectedTime] = useState(time);
    const [selectedDate , setselectedDate] = useState(selectedStartDate);
    const [name , setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email,setEmail] = useState('');
    const [service,setService] = useState('');
    const [duration,setDuration] = useState('');
    const [comment,setComment] = useState('');
    const [loader , setLoader] = useState(false);
    const [images,setImages] = useState([])
    const themeColors = useSelector(state=>state.user.themeColors)
    // 

 
    const onChange = (event, selectedDate) => {
        
        const currentDate = selectedDate || date;
        setShowtime(Platform.OS === 'ios');
        setDate(currentDate);
      };
    
      const showMode = (currentMode) => {
        setShowtime(true);
        setMode(currentMode);
      };

      useEffect(() => {
        if(dataToEdit)
        {
            setName(appointmentDetails.name);
            setPhone(appointmentDetails.m_number);
            setEmail(appointmentDetails.email);
            setService(appointmentDetails.service);
            setDuration(appointmentDetails.serviceDuration);
            setComment(appointmentDetails.comment)
        }
      },[dataToEdit])

      const handleConfirmDate= (date) => {
        setselectedDate(date);
        setShowDate(false);
    };

    const makeTwoDigits = (time) => {
        const timeArr = time.split(" ");
        const timeArr1 = timeArr[0].split(":");

        let timeString = ``;
        if (timeArr1[0].length === 2)
        {
            timeString = `${timeArr1[0]}`;
        }else
        {
            timeString = `0${timeArr1[0]}`; 
        }

        if(timeArr1[1].length==2)
        {
            timeString = `${timeString}:${timeArr1[1]}`;
        }else
        {
            timeString = `${timeString}:0${timeArr1[1]}`;
        }
        return `${timeString} ${timeArr[1]}`;
    }
    const handleConfirmTime= (date) => {
     
        // setselectedTime(date);
        // setselectedTime(makeTwoDigits(date.toString()));
        //setselectedTime(date.toLocaleTimeString('en-US'));
        
        var time = date.toLocaleTimeString()
        if(time.includes('am')||time.includes("AM")||time.includes("pm")||time.includes("PM"))
        {
            setselectedTime( moment(time, ["hh:mm:ss A"]).format("hh:mm A"))
    
        }else
        {
            setselectedTime( moment(time, ["HH:mm:ss"]).format("hh:mm A"))
    
        }
        
        setShowtime(false);
    };

    function bookApp(){
        setLoader(true)
        // export const bookAppointment = (name,phone,selectedStartDate,time,user_name,service,comment,email,serviceDuration,callback) => {
        if(name != '' || phone != '' || service !='' || selectedTime != 'Time')
            bookAppointment(name,phone,selectedDate,selectedTime,userDetails.name,service,comment,email,duration,bookingCallback)
        else
        {
            alert("Please fill details!");
            setLoader(false)
        }
            
    }

    function bookingCallback(response){
        
        if(response.msg == 'sucesss')
        {
            // setModalVisible(!modalVisible)
            if(images.length)
            {
                    let appointmentId = response.id
                    images.forEach((item,index)=>{

                        addAppointmentImages(appointmentId,{ name: 'image', filename:item.fileName, type: item.type, data: item.base64 },(response)=>{
                        
                            if(index == images.length-1)
                            {
                            fetch_user_appointments(userDetails.name,temp_id,appointmentsCallback)
                            }
                        })
                    })
            }else
            {
                fetch_user_appointments(userDetails.name,temp_id,appointmentsCallback)
            }
            
        }
        else
        {   
            alert("Please try again!");
            setLoader(false);
        }
        
    }
    function appointmentsCallback(response){
        // Toast.show("msg "+response.msg+" error "+ response.error+" rowCount "+response.rowCount+" name "+userDetails.name+" temp_id "+temp_id)
        
        dispatch({type:SET_APPOINTMENTS,payload:{appointments:response.result}});
        setLoader(false);
        setModalVisible(!modalVisible);
        detailModal(false)
        
    }
    function EditApp()
    { 
        setLoader(true);
        // appointment_id,name,phone,date,time,service,serviceDuration,comment,email,callback
        updateAppointment(appointmentDetails.id,name,phone,selectedDate,selectedTime,service,duration,comment,email,updateCallback);
    }
    function updateCallback(response) {
        
        if(response.msg == 'success')
        {

            if(images.length)
            {
                    let appointmentId = response.id
                    images.forEach((item,index)=>{ 
                        addAppointmentImages(appointmentId,{ name: 'image', filename:item.fileName, type: item.type, data: item.base64 },(response)=>{
                            
                            if(index == images.length-1)
                            {
                            fetch_user_appointments(username,temp_id,appointmentsCallback)
                            }
                        })
                    })
            }else
            {
                fetch_user_appointments(username,temp_id,appointmentsCallback)
            } 
        }
        else
        {
            alert("Please try again!");
            setLoader(false);
        }
    }
    const openGallery = () => {
        const options = {
            storageOptions: {
                path: 'images',
                mediaType: 'photo',
            },
        includeBase64: true,
        selectionLimit: 5
        };
        
        launchImageLibrary(options, response => {
            // console.log('Response = ', response.assets);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {  

                let  imgs = [...images,...response.assets]

                setImages(imgs.splice(0,5)) 
                }
            });
        };

    const removeImage = (index)=>
    {
        let imgs = [...images];
        imgs.splice(index,1)
        setImages(imgs)
    }
    return (
        <View>
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    // Alert.alert("Modal has been closed.");
                        detailModal(false)
                    }}
                >
                    <ScrollView style={[styles.apmodalView ,{marginTop:modalMargin}]}>
                        <View>
                            <View style={{alignItems: 'flex-end'}}>
                                <Icon name="close" size={24}  style={styles.primaryText} onPress={() => detailModal(false)} />
                            </View>
                            <Text style={[styles.primaryText,{fontSize: 20, textAlign: 'center'}]}>Appointment Details</Text>
                            <View style={{display: 'flex', flexDirection:'row',justifyContent: 'center'}}> 
                                <TouchableOpacity onPress={()=>setShowtime(true)} >
                                    <View style={{backgroundColor: themeColors.PrimaryText, padding:10, marginTop:12, width:100, alignSelf: 'center',borderRadius:5}}>
                                        <Text style={{paddingHorizontal:5,fontSize:16,textAlign:"center",color:themeColors.primaryColor}}>
                                            {selectedTime}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            {/* style={[styles.button,{ backgroundColor: '#f00'}]}  */}
                            

                            {/* <DateTimePickerModal
                                isVisible={showDate}
                                mode="date"
                                locale="en_GB" // Use "en_GB" here
                                date={new Date()}
                                onConfirm={handleConfirmDate}
                                onCancel={()=>{setShowDate(false)}}
                            /> */}
                            <DateTimePickerModal
                                isVisible={showTime}
                                mode="time"
                                // locale="en_GB" // Use "en_GB" here
                                date={new Date()}
                                onConfirm={handleConfirmTime}
                                onCancel={()=>{setShowtime(false)}}
                            />
                            {/* <View style={styles.apmFormWrapper}> */}
                                <TextInput 
                                placeholder="Name*" 
                                style={[styles.inputText,{padding:10,marginVertical:10}]}  
                                placeholderTextColor={themeColors.PrimaryText} 
                                defaultValue={name} 
                                onChangeText={(text)=>{setName(text)}} />
                            {/* </View> */}

                            {/* <View style={styles.apmFormWrapper}> */}
                                <TextInput 
                                    placeholder="Phone*" 
                                    style={[styles.inputText,{padding:10,marginVertical:10}]} 
                                    placeholderTextColor={themeColors.PrimaryText} 
                                    defaultValue={phone} 
                                    keyboardType='numeric' 
                                    onChangeText={(text)=>{setPhone(text)}} 
                                />
                            {/* </View> */}

                            {/* <View style={styles.apmFormWrapper}> */}
                                <TextInput 
                                placeholder="Email" 
                                style={[styles.inputText,{padding:10,marginVertical:10}]} 
                                placeholderTextColor={themeColors.PrimaryText} 
                                defaultValue={email} 
                                onChangeText={(text)=>{setEmail(text)}}/>
                            {/* </View> */}

                            {/* <View style={styles.apmFormWrapper}> */}
                                <TextInput 
                                placeholder="Tatto*" 
                                style={[styles.inputText,{padding:10,marginVertical:10}]} 
                                placeholderTextColor={themeColors.PrimaryText} 
                                defaultValue={service} 
                                onChangeText={(text)=>{setService(text)}}
                                />
                            {/* </View> */}

                            {/* <View style={styles.apmFormWrapper}> */}
                                {/* <TextInput 
                                placeholder="Service duration(Hrs)" 
                                style={[styles.inputText,{padding:10,marginVertical:10}]} 
                                placeholderTextColor={themeColors.PrimaryText} 
                                defaultValue={duration} 
                                keyboardType='numeric' 
                                onChangeText={(text)=>{setDuration(text)}}/> */}
                            {/* </View> */}

                            {/* <View style={styles.apmFormWrapper}> */}
                                <TextInput 
                                    placeholder="Comment" 
                                    style={[styles.inputText,{padding:10,marginVertical:10}]} 
                                    placeholderTextColor={themeColors.PrimaryText} 
                                    defaultValue={comment} 
                                    onChangeText={(text)=>{setComment(text)}}
                                />
                            {/* </View>  */}
                             <View>
                                <FlatList
                                    data={images} 
                                    renderItem={({item,index})=><AppointmentImages item={item} mode={"addImage"} index={index} removeImage={removeImage}/>} 
                                    keyExtractor={(item,index)=>index.toString()}
                                    numColumns={3}
                                    columnWrapperStyle={{justifyContent: 'space-between',margin:5}}
                                    showsHorizontalScrollIndicator={false}
                                        
                                    />
                             </View>

                            {images.length<5?(
                                <View style={{width: '100%', marginTop:20,marginBottom:10,}}>
                                    <TouchableWithoutFeedback onPress={()=>{openGallery()}}>
                                        <View style={{borderColor: themeColors.PrimaryText,borderWidth:1,padding:10,alignItems:"center",borderRadius:5}}>
                                            <Text style={{color:themeColors.PrimaryText,fontSize:16}}>Add Images</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            ):(null)}
                            <View style={{width:"100%"}}>  
                                {props.dataToEdit?(
                                    (loader?(
                                        <TouchableOpacity >
                                            <View style={{backgroundColor: themeColors.PrimaryText, padding:10, marginTop:20, marginBottom:68,alignItems:"center"}}>
                                                <ActivityIndicator size="large"   color={themeColors.primaryColor}/>
                                            </View>
                                        </TouchableOpacity>
                                    ):(
                                        <TouchableOpacity onPress={()=>{EditApp()}}>
                                        <View style={{backgroundColor: themeColors.PrimaryText, padding:10, marginTop:20, marginBottom:68,alignItems:"center",borderRadius:5}}>
                                            <Text style={{color:themeColors.primaryColor,fontSize:16}}>Edit Appointment</Text>
                                        </View>
                                        </TouchableOpacity>
                                    ))
                                ):(loader?(
                                    <TouchableOpacity >
                                        <View style={{backgroundColor: themeColors.PrimaryText, padding:10, marginTop:20, marginBottom:68,alignItems:"center"}}>
                                            <ActivityIndicator size="large"  color={themeColors.primaryColor}/>
                                        </View>
                                    </TouchableOpacity>
                                ):(
                                    <TouchableOpacity onPress={()=>{bookApp()}}>
                                        <View style={{width:"100%",backgroundColor: themeColors.PrimaryText, padding:10, marginTop:20, marginBottom:68,alignItems:"center",borderRadius:5}}>
                                            <Text style={{color:themeColors.primaryColor,fontSize:16}}>Book Appointment</Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            
                            
                        </View>
                        
                    </ScrollView>
                </Modal>
                    {/* <Text  onPress={() => setModalVisible(true)}>OpenModal</Text> */}

                   
                </View>
        </View>
    )
}

  


