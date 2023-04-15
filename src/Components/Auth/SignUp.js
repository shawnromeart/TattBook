import React, { useState, useEffect } from 'react';
import { ImageBackground,ScrollView, StyleSheet, Text, View, Image, TouchableOpacity,ActivityIndicator, TextInput,Keyboard } from 'react-native'
import { DefaultStyles } from '../AppKaStyle/DefaultStyles'
import { DarkModeStyles } from '../AppKaStyle/DarkModeStyles'
import {assets4Dark, assets4Light, theme4Default} from '../config'
import DeviceInfo from 'react-native-device-info';
import {signup,getTotalUserCount,validate_user,resetUserPassword} from '../../Apis/Auth';
import {fetch_user_details} from '../../Apis/Profile';
import {useDispatch, useSelector} from 'react-redux'
import { SET_USER_DETAILS, SET_AUTH_STATUS,SET_USER_ID,SET_USER_IMAGES,SET_USER_SLOTS,SET_APPOINTMENTS } from '../../Reducers/types';
import {fetch_user_appointments} from '../../Apis/Appointment'
import LoaderModal from '../Utils/LoaderModal'
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function SignUp(props) {

    const [styles, setStyles] = useState(DefaultStyles)
    const [macAddr, setmacAddr] = useState('E5:12:D8:E5:69:97');
    const [userId , setUserId] = useState();
    // const [styles, setStyles] = useState(DarkModeStyles)
    const [activeForm, setActiveForm] = useState("Login")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [viewMessage, showMessage] = useState(false);
    const [loginLoader, showloginLoader] = useState(false);
    const [signLoader, showsignLoader] = useState(false);
    const [showModal, setLoaderModalVisible] = useState(false);
    const themeColors = useSelector(state=>state.user.themeColors)
    const dispatch = useDispatch();
    useEffect(() => {
        DeviceInfo.getMacAddress().then((mac) => {
            // "E5:12:D8:E5:69:97" 
            setmacAddr(mac);
        })
    }, [])
    function uniqueUserId(response)
    {
    //    console.log(response);
       if(response.msg=='sucesss')
       { 
           let userid = (parseInt(response.userCount)+1)+""+new Date().getTime();
            setUserId(userid);
            showMessage(0);
            if(email == '' || password == '')
            {
                setMessage('Please Enter All Details!');
                showMessage(1);
            }
            else
            {
                signup(email,password,userid,'new',macAddr,(response)=>validateCallBack(response,"signup"))
            }
       }
    }
    function validateCallBack(response,mode)
    {
       
        if(response.msg == 'success')
        {
            setEmail('');
            setPassword('');
            dispatch({type:SET_AUTH_STATUS,payload:{authStatus:true}})
            fetch_user_details(response.user_id,userDetailsCallback)
            dispatch({type:SET_USER_DETAILS,payload:{insDetails:response.data}})
            dispatch({type:SET_USER_ID,payload:{user_id:response.user_id}})
            fetch_user_appointments(response.data.name,response.data.temp_id,appointmentsCallback)
            // dispatch({type:SET_USER_IMAGES,payload:{images:response.imgs}});
            // props.navigation.navigate('Home');
         
            AsyncStorage.setItem('user_details', JSON.stringify(response.data))     
        }
        else
        {
            if(mode == "signup")
            {
                setMessage('Error While Registering you , Email already registered!');
            }else
            {
                setMessage('Invalid Credentials!');
            }
            
            showMessage(true)
        }
        showsignLoader(false);
        showloginLoader(false);
    }
    function appointmentsCallback(response){
        
        dispatch({type:SET_APPOINTMENTS,payload:{appointments:response.result}});
    }
    function userDetailsCallback(response)
    {
        // console.log(response.data);
        // dispatch({type:SET_USER_DETAILS,payload:{insDetails:response.data}});
        dispatch({type:SET_USER_IMAGES,payload:{images:response.imgs}});
        dispatch({type:SET_USER_SLOTS,payload:{slots:response.slots}});
        
    }
    function signUpUser()
    {
        getTotalUserCount(uniqueUserId)
        showsignLoader(true);
        showMessage(false) 
    }

    function loginUser()
    {
        showloginLoader(true);
        showMessage(false);
        if(email == 'default' || password == 'default')
        {
            setMessage('Please Enter Valid Details!');
            showMessage(1);
        }
        else
        {
            validate_user(email,password,macAddr,(response)=>validateCallBack(response,"login"));
        }
    }
    function forgotPassword()
    {
        showMessage(0);
        if(email == '')
        {
            setMessage('Please Enter email first!');
            showMessage(1);
        }
        else
        {
            setLoaderModalVisible(true);
            resetUserPassword(email,forgotPasswordCallback);
        }
    }
    function forgotPasswordCallback(response){
         
        setLoaderModalVisible(false);
        if(response.msg == 'success')
        {
            alert("Mail sent successfully!")
        }
        else
        {
            alert("Invalid email!")
        }
    }
    
    return (
        <ScrollView style={styles.primaryBg} >
            <View style={styles.container}>
                <Image source={assets4Light.auth.logo} style={Internalstyles.AuthLogo} />
                {activeForm =="Login" ?(
                    <Text style={[Internalstyles.h1, styles.primaryText]}>Login</Text>
                ):(
                    <Text style={[Internalstyles.h1, styles.primaryText]}>Signup</Text>
                )}
                {viewMessage?(
                    <View style={[Internalstyles.footerTextWrapper]}>
                        <Text style={[styles.primaryText,{color:'red'}]}>{message}</Text>
                    </View>
                ):(null)}
                <View style={Internalstyles.FormMainWrapper}>
                    {/* <View style={styles.apmFormWrapper}> */}
                        <TextInput 
                            placeholder="Email *" 
                            value={email} 
                            style={[styles.inputText,{color:'black',padding:10,marginVertical:10}]} 
                            placeholderTextColor={'black'} 
                            onChangeText={(text)=>{setEmail(text)}}
                        />
                    {/* </View> */}
                    {/* <View style={styles.apmFormWrapper}> */}
                        <TextInput 
                            placeholder="Password *" 
                            value={password} 
                            style={[styles.inputText,{color:'black',padding:10,marginTop:10}]} 
                            placeholderTextColor={'black'} 
                            secureTextEntry={true} 
                            onChangeText={(text)=>{setPassword(text)}}
                        />
                    {/* </View> */}
                    {activeForm == "Login"?(

                        <>
                        <View style={[Internalstyles.forgotFooterWrapper,{marginBottom:20}]}>
                            <Text style={[styles.textLinkColor,{fontSize:18}]} onPress={() =>forgotPassword()}>Forgot password?</Text>
                        </View>
                        {loginLoader?(
                            <TouchableOpacity style={[Internalstyles.authBtnWrapper, styles.LinksAndIndicatorColor]} >
                                <ActivityIndicator size="small"  color={themeColors.primaryColor} />
                            </TouchableOpacity>
                        ):(
                            <TouchableOpacity style={[Internalstyles.authBtnWrapper, styles.LinksAndIndicatorColor]} onPress={()=>loginUser()}>
                                <Text style={[Internalstyles.authBtnText, {color:themeColors.primaryColor}]}>Login</Text>
                            </TouchableOpacity>
                        )}
                        <View style={{alignItems: 'center',justifyContent: 'center',marginVertical:5}}>
                            <Text style={[Internalstyles.authBtnText, {color:themeColors.LinksAndIndicatorColor}]}>or</Text>
                        </View>
                        <TouchableOpacity style={[Internalstyles.authBtnWrapper, {borderColor:themeColors.LinksAndIndicatorColor,borderWidth:1}]} onPress={() =>setActiveForm('Singup')}>
                                <Text style={[Internalstyles.authBtnText, {color:themeColors.LinksAndIndicatorColor}]}>Create a New Account</Text>
                        </TouchableOpacity>
                        
                        {/* <View style={[Internalstyles.footerTextWrapper]}>
                            <Text style={styles.primaryText}>Not a member? </Text>
                            <Text style={styles.textLinkColor} onPress={() =>setActiveForm('Singup')}>Signup</Text>
                        </View> */}

                       

                        </>

                    ):(

                        <View style={{marginTop:20,width:"100%"}}>
                        

                        {signLoader?(
                            <TouchableOpacity style={[Internalstyles.authBtnWrapper, styles.LinksAndIndicatorColor]} >
                                <ActivityIndicator size="small"  color={themeColors.primaryColor} />
                            </TouchableOpacity>
                        ):(
                            <TouchableOpacity style={[Internalstyles.authBtnWrapper, styles.LinksAndIndicatorColor]} onPress={()=>signUpUser()}>
                                <Text style={[Internalstyles.authBtnText, {color:themeColors.primaryColor}]}>Create Account</Text>
                            </TouchableOpacity>
                        )} 
                        <TouchableOpacity style={[Internalstyles.authBtnWrapper, {borderColor:themeColors.LinksAndIndicatorColor,borderWidth:1,marginTop:30}]} onPress={() =>setActiveForm('Login')}>
                                <Text style={[Internalstyles.authBtnText, {color:themeColors.LinksAndIndicatorColor}]}>Back To Login</Text>
                        </TouchableOpacity>

                        </View>

                    )}
                    
                    <LoaderModal showModal={showModal} setModalVisible={setLoaderModalVisible}/>
                
                </View>

            </View>
        </ScrollView>
    )
}

const Internalstyles = StyleSheet.create({
    AuthLogo:{
        marginTop:50,
        width:'80%',
        height:100,
        alignSelf: 'center',
        resizeMode:'contain'
        
        
        
        
    },
    h1:{
        fontSize:30,
        fontWeight:'bold',
        alignSelf: 'center',
        marginVertical:20,
    },
    FormMainWrapper:{
        paddingHorizontal:30,
    },
    authBtnWrapper:{
        marginTop:10,
        marginHorizontal:10,
        borderRadius:8,
        alignItems: 'center',
        paddingVertical:8,
    },
    authBtnText:{
        fontSize:20,
    },
    footerTextWrapper:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:30,
    },
    forgotFooterWrapper:{
        marginTop:20,
        
    }
})
