import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View , TextInput, Switch,TouchableOpacity,ActivityIndicator,ScrollView, Platform} from 'react-native'
import { DefaultStyles } from '../AppKaStyle/DefaultStyles'
import { DarkModeStyles } from '../AppKaStyle/DarkModeStyles'
import {assets4Dark, assets4Light,theme4Default} from '../config'
import { useSelector,useDispatch } from 'react-redux'
import DepositUpgrade2Unlock from './DepositUpgrade2Unlock'
import {updateDepositsStatus,updateDepositsDetail} from '../../Apis/Deposits';
import {SET_DEPOSIT_STATUS} from '../../Reducers/types'
import { SafeAreaView } from 'react-native-safe-area-context';


export default function Deposit(props) {
    const styles = useSelector((state)=>state.user.themeStyle);
    const themeColor = useSelector((state)=>state.user.themeColors);
    // const [styles, setStyles] = useState(DefaultStyles);
    // const [styles, setStyles] = useState(DarkModeStyles);
    const userDetails = useSelector((state)=>state.user.insDetails)
    const appMode = useSelector((state)=>state.user.appMode)
    let deposit = userDetails.deposits == '0'? false:true;
    // let amount = userDetails.amount == ''
    const [isEnabled, setIsEnabled] = useState(deposit);
    const [isDepositStatus, setDepositStatus] = useState(false)
    const [isShowError, setisShowError] = useState(false)
    const [error , setErrorMessage] = useState('')
    const [paypalEmail , changePayPal] = useState(userDetails.paypal_email)
    const [amount , changeAmount] = useState(userDetails.amount);
    const [saveLoader , setSaveLoader] = useState(false);
    const dispatch = useDispatch();

    const toggleSwitch = () => {
        
        if(paypalEmail == '' || amount == '') 
        {
            setisShowError(true);
        }
        else
        {
            setIsEnabled(previousState => !previousState)
        }
    };
    useEffect(() => {
        var status ;
        if(isEnabled)
        {
            status = 1;
        }
        else
        {
            status = 0;
        }
        updateDepositsStatus(status,paypalEmail,amount,userDetails.temp_id,(response)=>updateCallback(response,status));
    },[isEnabled])

    useEffect(() => {
        if(paypalEmail == '' || amount == '')
        {
            setisShowError(true);
            setIsEnabled(false);
        }
        else
        {
            setisShowError(false);
        }
    },[paypalEmail,amount])

    function updateCallback(response,status)
    {
        // console.log("helpp",response);
        if(response.msg == 'success')
        {
            dispatch({type:SET_DEPOSIT_STATUS,payload:{deposits:status}})
        }
    }
    function saveDepositDetails(){
        setisShowError(false);
        setSaveLoader(true);
        if(paypalEmail != '' || amount != '' )
        {
            var status ;
            if(isEnabled)
                status = 1;
            else
                status = 0;
            updateDepositsDetail(status,paypalEmail,""+amount,userDetails.temp_id,detailsUpdated)
        }
        else
        {
            setisShowError(true);
            setSaveLoader(false);
        }
    }
    function detailsUpdated(response) { 
        
        setSaveLoader(false);
    }
    
    return (
        (userDetails.pro=="0"&&(appMode=="0"||Platform.OS=="android"))?(
            <DepositUpgrade2Unlock/>
        ):( 

        <>
             
             <SafeAreaView edges={['top','left','right']}>
                <ScrollView style={styles.primaryBg}>
                    <View style={styles.container}> 
                            {isShowError &&
                                <View style={Internalstyles.ErrorMsgWrapper}>
                                    <Text style={styles.primaryText}>Fill all Fields</Text>
                                </View>
                            }

                            <Text style={[styles.primaryText, Internalstyles.titleText]}>
                                Deposits
                            </Text>

                            <View style={Internalstyles.switchWrapper}>
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={themeColor.PrimaryText}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                            </View>

                            <Text style={[styles.primaryText, Internalstyles.statusText]}>
                                Deposit Are Turned
                                {isEnabled?(" ON"):(" OFF")}
                            </Text>

                            <View style={Internalstyles.mainFormWrapper}>
                                {/* <View style={styles.apmFormWrapper}> */}
                                    <TextInput 
                                        placeholder="Paypal Email" 
                                        style={[styles.inputText,{padding:10,marginVertical:10}]} 
                                        onChangeText={(text)=>changePayPal(text)} 
                                        placeholderTextColor={themeColor.PrimaryText} 
                                        defaultValue={paypalEmail}
                                    />
                                {/* </View> */}
                                {/* <View style={styles.apmFormWrapper}> */}
                                    <TextInput 
                                        placeholder="Amount" 
                                        style={[styles.inputText,{padding:10,marginVertical:10}]} 
                                        onChangeText={(text)=>changeAmount(text)} 
                                        defaultValue={amount} 
                                        placeholderTextColor={themeColor.PrimaryText} 
                                    />
                                {/* </View> */}
                            </View>
                            {isEnabled?(
                                saveLoader?(
                                    <TouchableOpacity >
                                        <View style={[Internalstyles.ErrorMsgWrapper]}>
                                            <ActivityIndicator size="small"  color="#000000"/>
                                        </View>
                                    </TouchableOpacity>
                                ):(
                                    <TouchableOpacity  onPress={()=>saveDepositDetails()}>
                                        <View style={[Internalstyles.ErrorMsgWrapper,{backgroundColor:themeColor.PrimaryText}]}>
                                            <Text style={{color:themeColor.primaryColor}}>Save</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            ):(null)}

                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
        )
    )
}

const Internalstyles = StyleSheet.create({
    titleText:{
        fontSize:24,
        fontWeight:'bold',
        textAlign:'center',
        marginTop:60,
    },
    switchWrapper:{
        alignItems: 'center',
        marginTop:24,
    },
    mainFormWrapper:{
        marginTop:30,
        marginHorizontal:20,
    },
    statusText:{
        textAlign:'center',
        marginTop:20,
        fontSize:16,
    },
    ErrorMsgWrapper:{
        alignSelf: 'center',
        alignItems: 'center', 
        paddingHorizontal:14,
        paddingVertical:8,
        marginTop:60,
        borderRadius:5
    },

})
