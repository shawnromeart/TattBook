import React from 'react'
import { View, Text, ScrollView ,FlatList} from 'react-native'
import { useSelector } from 'react-redux'
import { capitalizeFirstLetter, formatAppointmentTime } from '../config'

export default function AppointmentList(props) {

    const {styles,appointments } = props
    const themeColors =  useSelector(state=>state.user.themeColors)
    
    const renderAppointmentCards=(item,index)=>{
        var keys = Object.keys(item); 
      
        return(
            <View style={[styles.exprimaryBg,{flexDirection: 'row',marginBottom:10, paddingHorizontal:10,}]}>
                <View style={{width:'20%', }}>
                    <Text style={[styles.primaryText,{textAlign: 'center', paddingTop:12,}]}>{keys[0]}:00</Text>
                </View> 
                <View style={{flex:0.9,flexDirection:"column"}}>
                            
                    <FlatList 
                        data={item[keys[0]]}
                        renderItem={({item}) =>(renderSingleAppointment(item))}
                        keyExtractor={item => item.id} 
                    />
                      
                </View> 


                
            </View> 
        )
    }
    const renderSingleAppointment = (item)=>
    {


        var color = "";  
        switch (item.status)
        {
            case"pending":
                color = themeColors.yellowColor;
                break;
            case "complete":
                color = themeColors.greenColor;
                break;
            case "confirmed":
                color = themeColors.greenColor;
                break;
            case "cancelled":    
                color = themeColors.redColor;
                break;
        }
            return (
                <View style={{flexDirection: 'row', width:'80%', justifyContent:'space-between', paddingLeft:8, paddingVertical:4,borderLeftWidth:2,borderColor:color}}>
                    <View>
                        <Text style={styles.primaryText}>{capitalizeFirstLetter(item.name)}</Text>
                        <Text style={styles.primaryText}>{capitalizeFirstLetter(item.service)}</Text>
                    </View>
                    <View>
                        <Text style={styles.primaryText}>{item.time}</Text>
                        <Text style={styles.primaryText}>{capitalizeFirstLetter(item.status)}</Text>
                    </View>
                </View>
            )
    }
    return (
         
        <>
        <FlatList 
            data={appointments}
            renderItem={({item,index})=>renderAppointmentCards(item,index)}
            keyExtractor={(item,index)=>index.toString()}
            /> 
        </>
    )
}
