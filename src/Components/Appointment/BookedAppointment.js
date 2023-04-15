import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,FlatList, TouchableWithoutFeedback,Alert,ScrollView,Dimensions } from 'react-native'
import { DefaultStyles } from '../AppKaStyle/DefaultStyles'
import { DarkModeStyles } from '../AppKaStyle/DarkModeStyles'
import Icon from 'react-native-vector-icons/Ionicons';
import AppointmentDetailsModal from './AppointmentDetailsModal'
import {useDispatch, useSelector} from 'react-redux';
import { SET_APPOINTMENTS } from '../../Reducers/types';
import {cancelAppointment} from '../../Apis/Appointment';
import LoaderModal from '../Utils/LoaderModal'
import { SafeAreaView } from 'react-native-safe-area-context';
import { capitalizeFirstLetter, commonColors, formatAppointmentTime, theme4Default  } from '../config';
import {SET_THEME_MODE} from '../../Reducers/types'
// import moment from 'moment';

const height = Dimensions.get('window').height
export default function BookedAppointment(props) {
    const styles = useSelector((state)=>state.user.themeStyle);
    const themeColors = useSelector((state)=>state.user.themeColors);
    // const [styles, setStyles] = useState(DarkModeStyles)
    const [modalVisible, setModalVisible] = useState(false);
    const [appointmentDetails, setAppoitmentDetails] = useState({});
    const [color, setColor] = useState();
    const appointments = useSelector((state)=>state.user.appointments)
    const userDetails = useSelector((state)=>state.user.insDetails)
    const [cancelLoader , setCancelLoader] = useState(false);

    const [loaderModal,setLoaderModalVisible] = useState(false);
    // console.log(appointments)
    const dispatch = useDispatch()

    const action4DarkMode=()=>{
        // setStyles(DarkModeStyles)
        dispatch({ type: SET_THEME_MODE, payload: { themeMode: "DarkMode" } })
    }

    const action4DefaultMode=()=>{
        // setStyles(DefaultStyles)
        dispatch({ type: SET_THEME_MODE, payload: { themeMode: "default" } })
    }

    function showDetails(item,color)
    {
        setAppoitmentDetails(item);
        setColor(color)
        setModalVisible(true)
    }
    function deleteAppointment(item,index) 
    {
        setLoaderModalVisible(true);
        cancelAppointment(item.id,cancelCallback);
        let appointments_arr = [...appointments]
        appointments_arr.splice(index, 1);
        dispatch({type:SET_APPOINTMENTS,payload:{appointments:appointments_arr}})
        

    }
    const createTwoButtonAlert = (okFunction) =>{
        Alert.alert(
        "Appointments",
        "Do you want to delete?",
        [
            {
            text: "Cancel",
            onPress: ()=>{console.log("Cancelled")},
            style: "cancel"
            },
            { text: "OK", onPress: () => okFunction(), }
        ]
        );
        
    }
    function cancelCallback(response)
    {
        
        setLoaderModalVisible(false);
    }
    const renderBookedCard=(item,index)=>{
        
        var color;
        switch(item.status) 
        {
            case 'confirmed':
                color='#8bc34a';
                break;

            case 'pending':
                color='#ffb74d';
                break;
        }
        
        return(
            <>
            <TouchableWithoutFeedback onPress={() => showDetails(item,color)}>
            <View style={[Internalstyles.CarWrapper, {backgroundColor: color}]}>
                <View style={{alignItems: 'flex-end'}}>
                    <Icon name="close" size={24} style={styles.primaryText} 
                    //onPress={()=>deleteAppointment(item,index) }
                    onPress={()=>createTwoButtonAlert(()=>deleteAppointment(item,index))}
                    />
                </View>
                <Text style={[Internalstyles.userName, styles.primaryText]}>{capitalizeFirstLetter(item.name)}</Text>
                <View style={Internalstyles.cardDataWrapper}>
                    <View>
                        <Text style={styles.primaryText}>Date: {item.date}</Text>
                        <Text style={styles.primaryText}>Time: {item.time}</Text>
                    </View>
                    <View>
                        <Text style={styles.primaryText}>Status :{capitalizeFirstLetter(item.status)}</Text>
                    </View>
                </View>
            </View>
            </TouchableWithoutFeedback>

                

            </>
        )
    }

    return (
        <>
          
          <SafeAreaView edges={['top','left','right']}>
        <ScrollView style={[styles.primaryBg,{height:height}]}>
            <View style={[styles.primaryBg, Internalstyles.container]}>

            <Text style={styles.AppointmentTitle}> Booked Appointments</Text>

                    <View style={{position: 'absolute', right: 4, top: 6}}>
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
                    
                    <FlatList
                        data={appointments} 
                        renderItem={({item,index})=>renderBookedCard(item,index)} 
                        keyExtractor={(item)=>item.id.toString()}
                        showsHorizontalScrollIndicator={false}
                        nestedScrollEnabled 
                        />
                    {/* {renderBookedCard('Shivam Kumar','Mon 27 2021', '12:31:00', 'Pending', '#ffb74d')}
                    {renderBookedCard('Shivam ','Sun 26 2021', '20:02:00', 'Confirmed', '#8bc34a')} */}

                    <LoaderModal showModal={loaderModal} setModalVisible={setLoaderModalVisible}/>
                    {modalVisible?(
                        <AppointmentDetailsModal styles={styles}  modalVisible={modalVisible} setModalVisible={setModalVisible} appointmentDetails={appointmentDetails} color={color}/>
                    ):(null)}
                    <View style={{height:100}}/>
            </View>
            </ScrollView>
        </SafeAreaView>


        </>
    )
}


// Status Color from https://www.behance.net/gallery/28103125/Payments-Status-UI-design-for-finance-app?tracking_source=project_owner_other_projects

const Internalstyles = StyleSheet.create({
    container:{
        flex: 1, 
    },
    CarWrapper:{
        marginHorizontal:30,
        marginTop:10,
        paddingHorizontal:12,
        paddingVertical:5,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 12
    },
    Confirmed:{
        backgroundColor: "#8bc34a"
    }, 
    Pending:{
        backgroundColor: "#ffb74d"
    },
    Failed:{
        backgroundColor: "#ff5252"
    },

    userName:{
        fontSize:20,
        textAlign:'center',
        paddingBottom:5,
    },
    cardDataWrapper:{
        flexDirection: 'row',
        justifyContent:'space-between',
        marginTop:5,
    }
})
