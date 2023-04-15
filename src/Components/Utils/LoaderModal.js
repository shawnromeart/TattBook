import React, { Component ,useState} from 'react';
import { View, Text,StyleSheet,ScrollView,TouchableOpacity,ActivityIndicator,Dimensions,Image,TouchableWithoutFeedback, Modal, TextInput, ImageBackground } from 'react-native';
import CardView from './CardView';

const width = Dimensions.get('window').width
const height = Dimensions.get('screen').height

export default function LoaderModal (props) 
{
    const {showModal,setModalVisible,isImageMode,totalUploadedImage,totalFailedUploadingImage,totalUploadingImage} = props;
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={showModal}
            onRequestClose={()=>setModalVisible(false)}>
                <TouchableWithoutFeedback >
                    <View style={{width: '100%', height: '100%',alignItems: 'center',justifyContent: 'center'}}>
                    {CardView(

                     
                        <View style={{flexDirection: 'column',alignItems: 'center',justifyContent: 'center'}}>
                            {isImageMode?<Text style={{textAlign: 'center'}}>Please Wait</Text>:null}
                            <ActivityIndicator size="large"  color="#fe4f5b" style={{marginTop:25}} />
                             {isImageMode?<Text  style={{marginBottom:10}}>Uploaded : {totalUploadedImage}/{totalUploadingImage}</Text>:null}
                             {totalFailedUploadingImage?<Text style={{marginBottom:10}}>Failed : {totalFailedUploadingImage}</Text>:null}

                         </View>
                     
                    )}
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        
    )
}

 