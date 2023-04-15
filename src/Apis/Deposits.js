import { serverApiUrl } from "../Components/config";
import RNFetchBlob from 'rn-fetch-blob';

//api to updateDepositsStatus of user here developer need to send 0 or 1  for diabling or enabling deposits accordingly
//this api will be used for updating status for enabling depostis all details should be there in database to taken with status update api
export const updateDepositsStatus = (depositsStatus,paypalEmail,amount,user,callback) => {
   
    RNFetchBlob.fetch('POST', serverApiUrl+'appointment.php', {
      Authorization: "Bearer access-token",
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    }, [
        { name: 'updateDepositsStatus', data:depositsStatus.toString() },     
        { name: 'paypalEmail',data:paypalEmail},
        { name: 'amount',data:""+amount},
        { name: 'temp_user',data:""+user}
      ]).then((resp) => { 
      
        var tempMSG = JSON.parse(resp.data); 
        callback(tempMSG);
      }).catch((err) => {
        console.log(err)
      })

  }

//api for updating deposits details developer again need to send 0 or 1  for diabling or enabling deposits accordingly
//this api will be used for updating details after enabling status to 1
 export const  updateDepositsDetail = (depositsStatus,paypalEmail,amount,user,callback) => {
  
    
    RNFetchBlob.fetch('POST', serverApiUrl+'appointment.php', {
      Authorization: "Bearer access-token",
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    }, [
        { name: 'updateDepositsDetail', data: ""+depositsStatus },     
        { name: 'paypalEmail',data:paypalEmail.toLowerCase()},
        { name: 'amount',data:""+amount},
        { name: 'temp_user',data:""+user}
      ]).then((resp) => {  
        var tempMSG = JSON.parse(resp.data); 
        callback(tempMSG);
      }).catch((err) => {
        console.log(err)
      })

  }