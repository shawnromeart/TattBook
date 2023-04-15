import React from 'react'
import { Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import ImageModal from 'react-native-image-modal'
import { assets4Dark } from '../config'

function AppointmentImages({mode,item,index,removeImage}) {

    const removeImageHandler = ()=>{
        if(mode==="addImage")
        {
            removeImage(index);
        }
    }
    
return (
    <View style={[Internalstyles.GalleryWrapper]}>

        {mode=="addImage"?(<TouchableOpacity onPress={()=>{removeImageHandler()}}>
            <Image source={assets4Dark.profile.remove} style={{height:20,width:20,position:'relative',top:0,right:0}} />
        </TouchableOpacity>):(null)}
        <ImageModal
            resizeMode="contain"
            imageBackgroundColor="#000000"
            style={Internalstyles.GalleryImg}
            source={{
                uri: item.uri||item.img,
            }}
        /> 
    </View>
)
}

const Internalstyles = StyleSheet.create({
  
    
  
    GalleryWrapper:{
        marginTop:16,
    },
    GalleryImg:{
        width:90,
        height:90
    },
    OpeningTimeWrapper:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop:14,
    }
})

export default AppointmentImages