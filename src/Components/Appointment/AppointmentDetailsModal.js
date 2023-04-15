import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, Modal, StyleSheet, TextInput,ActivityIndicator, FlatList,TouchableOpacity } from 'react-native'
import { DefaultStyles } from '../AppKaStyle/DefaultStyles'
import { DarkModeStyles } from '../AppKaStyle/DarkModeStyles'
import Icon from 'react-native-vector-icons/Ionicons';
// import DateTimePicker from '@react-native-community/datetimepicker';
import {processAppointmentRequest,fetch_user_appointments,sendAppointmentReminder, fetchAppointmentImages} from '../../Apis/Appointment'
import {useDispatch,useSelector} from 'react-redux';
import { SET_APPOINTMENTS } from '../../Reducers/types';
import AppointmentDetailModal from '../AppointmentModal/AppointmentModal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatAppointmentTime, theme4Default  } from '../config';
import AppointmentImages from '../AppointmentModal/AppointmentImages';


export default function AppointmentModal(props) {

    // const [styles, setStyles] = useState(DarkModeStyles)
    const modalMargin = Platform.OS === 'ios' ? 34 : 0
    const [ApmodalVisible, ApsetModalVisible] = useState(false);
    const { modalVisible,setModalVisible, styles } = props;
    const dispatch = useDispatch()
    const [status , setStatus] = useState(props.appointmentDetails.status);
    const [loader , setLoader] = useState(false);
    const [reminderLoader , setreminderLoader] =useState(false)
    const userDetails = useSelector((state)=>state.user.insDetails)
    const themeColors = useSelector((state)=>state.user.themeColors)
    const [imageLoader , setImageLoader] = useState(false)
    const [images,setImages] = useState([])
    // console.log(props.appointmentDetails)

    const renderInfoCardLabel=(textLabel, textValue)=>{
        return(
            <View style={Internalstyles.InfoWrapper}>
                <Text style={[styles.primaryText, Internalstyles.InfoText]}>{textLabel} : </Text>
                <Text style={[styles.primaryText, Internalstyles.InfoText]}>{textValue}</Text>
            </View>
        )
    }

    function EditAppoitmentStatus(status)
    {
        setLoader(true);
// export const  processAppointmentRequest = (cur_appointment_id,status,callback) => {
        processAppointmentRequest(props.appointmentDetails.id,status,statusUpdateCallback)
    }
    function statusUpdateCallback(response) {
        if(response.msg == 'success')
        {
            setStatus(response.status)
            fetch_user_appointments(userDetails.name,userDetails.temp_id,appointmentsCallback)
        }
        else
        {
            alert("Error Occured!");
            setLoader(false);
        }
        
    }
    function appointmentsCallback(response){
        
        dispatch({type:SET_APPOINTMENTS,payload:{appointments:response.result}});
        setLoader(false);
        setModalVisible(!modalVisible);
    }
    function sendReminder(){
        setreminderLoader(true);
        sendAppointmentReminder(props.appointmentDetails.name,props.appointmentDetails.m_number,props.appointmentDetails.date,props.appointmentDetails.time,props.appointmentDetails.email,userDetails.name,userDetails.temp_id,ReminderCallback
            )
    }
    function ReminderCallback(response)
    {
        ;
        setreminderLoader(false);

    }
    useEffect(() => {

        if(props.appointmentDetails.id)
        {
            setImageLoader(true);
            fetchAppointmentImages(props.appointmentDetails.id,(response)=>{

                if(response.status)
                {
                    setImages(response.data);
                }
                setImageLoader(false);
            })
        }
        
    },[props.appointmentDetails.id])
    return (
    <>
         
         <SafeAreaView edges={['top','left','right']}>
            <ScrollView >
                <View >
                    <View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                            // Alert.alert("Modal has been closed.");
                            setModalVisible(!modalVisible);
                            }}
                            style={{marginTop:20}}
                        >
                            <ScrollView style={[styles.primaryBg,styles.apmodalView,{marginTop:modalMargin}]}> 
                                <View>
                                    <View style={{alignItems: 'flex-end'}}>
                                        <Icon name="close" size={24}  style={styles.primaryText} onPress={() => setModalVisible(!modalVisible)} />
                                    </View>
                                
                                {status =="confirmed"?(
                                    <View style={[Internalstyles.StatusBtn, {backgroundColor: "#8bc34a"}]}>
                                        <Text style={styles.primaryText}>Confirmed</Text>
                                    </View>
                                    ):(
                                        <View style={[Internalstyles.StatusBtn, {backgroundColor: "#ffb74d"}]}>
                                            <Text style={styles.primaryText}>Pending</Text>
                                        </View>
                                    )}

                                    <Text style={[styles.primaryText,{fontSize: 20, fontWeight:'bold', textAlign: 'center', marginTop:20,}]}>Appointment Details</Text>

                                    <View style={Internalstyles.InfoMainWrapper}>
                                        {renderInfoCardLabel('Date', props.appointmentDetails.date)}
                                        {renderInfoCardLabel('Time', props.appointmentDetails.time)}
                                        {renderInfoCardLabel('Phone', props.appointmentDetails.m_number)}
                                        {renderInfoCardLabel('Email', props.appointmentDetails.email)}
                                        {renderInfoCardLabel('Tatto', props.appointmentDetails.service)}
                                        {/* {renderInfoCardLabel('Duration(Hrs)', props.appointmentDetails.serviceDuration)} */}
                                        {renderInfoCardLabel('Comment', props.appointmentDetails.comment)}
                                    </View>
                                    <View>

                                        {imageLoader?(
                                            <View style={{alignItems: 'center',justifyContent: 'center',flexDirection: 'row'}}>
                                                <ActivityIndicator size="large" color={themeColors.PrimaryText}/>
                                            </View>
                                        ):(<FlatList
                                            data={images} 
                                            renderItem={({item,index})=><AppointmentImages item={item} mode={"viewImage"} index={index} />} 
                                            keyExtractor={(item,index)=>index.toString()}
                                            numColumns={3}
                                            columnWrapperStyle={{justifyContent: 'space-between',margin:5}}
                                            showsHorizontalScrollIndicator={false}
                                                
                                            />  )}
                                    </View>
                                    
                                    {loader?(
                                        status =="confirmed"?(
                                            <TouchableOpacity >
                                                <View style={[Internalstyles.StatusBtnBottom, {backgroundColor: "#ffb74d"}]}>
                                                    <ActivityIndicator size="small"  color="#000000"/>
                                                </View>
                                            </TouchableOpacity>
                                        ):(
                                            <TouchableOpacity >
                                                <View style={[Internalstyles.StatusBtnBottom, {backgroundColor: "#8bc34a"}]}>
                                                    <ActivityIndicator size="small"  color="#000000"/>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    ):(
                                        status =="confirmed"?(
                                            <TouchableOpacity onPress={()=>EditAppoitmentStatus('confirmed')}>
                                                <View style={[Internalstyles.StatusBtnBottom, {backgroundColor: "#ffb74d"}]}>
                                                    <Text style={[styles.primaryText,{color:themeColors.primaryColor}]}>Mark Pending</Text>
                                                </View>
                                            </TouchableOpacity>
                                        ):(
                                            <TouchableOpacity onPress={()=>EditAppoitmentStatus('pending')}>
                                                <View style={[Internalstyles.StatusBtnBottom, {backgroundColor: "#8bc34a"}]}>
                                                    <Text style={[styles.primaryText,{color:themeColors.primaryColor}]}>Confirm Appointment</Text>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    )}
                                    
                                    {reminderLoader?(
                                        <TouchableOpacity >
                                            <View style={[Internalstyles.StatusBtnBottom, styles.LinksAndIndicatorColor,{backgroundColor:themeColors.PrimaryText}]}>
                                                <ActivityIndicator size="small"  color={themeColors.primaryColor}/>
                                            </View>
                                        </TouchableOpacity>
                                    ):(
                                        <TouchableOpacity onPress={()=>sendReminder()}>
                                            <View style={[Internalstyles.StatusBtnBottom, styles.LinksAndIndicatorColor,{backgroundColor:themeColors.PrimaryText}]}>
                                                <Text style={[styles.primaryText,{color:themeColors.primaryColor}]}>Send Reminder</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )}

                                    
                                    <TouchableOpacity onPress={()=>ApsetModalVisible(true)}>
                                        <View style={[Internalstyles.StatusBtnBottom, styles.LinksAndIndicatorColor,{backgroundColor:themeColors.PrimaryText}]}>
                                            <Text style={[styles.primaryText,{color:themeColors.primaryColor}]}>Edit Appointment</Text>
                                        </View>
                                    </TouchableOpacity>
                                        <View style={{height:40}}/>
                                </View>
                                <AppointmentDetailModal styles={styles} modalVisible={ApmodalVisible} setModalVisible={ApsetModalVisible} dataToEdit="true" selectedStartDate={props.appointmentDetails.date} appointmentDetails={props.appointmentDetails} username={userDetails.name} temp_id={userDetails.temp_id} detailModal={setModalVisible}/>
                            </ScrollView>
                        </Modal>
                            

                        
                        </View>
                    </View>
            </ScrollView>
        </SafeAreaView>
    </>
    )
}


const Internalstyles = StyleSheet.create({
    StatusBtn:{
        padding:10,
        marginTop:12,
        width:100,
        alignSelf: 'center',
        alignItems: 'center'
    },
    InfoMainWrapper:{
        paddingBottom:30,
    },
    InfoWrapper:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal:10,
        marginTop:15,
    },
    InfoText:{
        fontSize:18,
    },
    StatusBtnBottom:{
        marginTop:16,
        paddingVertical:12,
        alignSelf: 'center',
        alignItems: 'center',
        width:'90%',
    }
})

  


