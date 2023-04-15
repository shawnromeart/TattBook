import { serverApiUrl, serverBaseUrl } from "../Components/config";

import RNFetchBlob from 'rn-fetch-blob'

//api to save user details like name,role,about here we are again updating about 
//with all other details  we also have a dedicated api in about.js file for updating only about
//but as per the old structure we have to follow this
export const saveUserProfileDetail = (name,user_id,role,about,locality,city,state,phone,zipcode,callback) => {
       
    RNFetchBlob.fetch('POST', serverApiUrl+'appointment.php', {
        Authorization: "Bearer access-token",
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      }, [ 
        { name: 'userName', data: name },
        { name: 'temp_id', data: user_id },
        { name: 'role', data: role }, 
        {name: 'about', data: about},
        {name: 'locality', data: locality},
        {name: 'city', data: city},
        {name: 'state', data: state},
        {name: 'phone', data: phone+""},
        {name: 'zipcode', data: zipcode+""},

      ]).then((resp) => { 
        var tempMSG = JSON.parse(resp.data);
        callback(tempMSG);
         
      }).catch((err) => {
        console.log(err)
      }) 
}



//api for uploading and updating user profile pic 
export const updateUserProfilePic = (imageFile,user_id,callback) => {
    
    RNFetchBlob.fetch('POST', serverApiUrl+'appointment.php', {
      Authorization: "Bearer access-token",
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    }, [
      { name: 'image', filename: 'image.png', type: 'image/png', data: imageFile },
      { name: 'userPic', data: user_id }
    ]).then((resp) => {
      var tempMSG = JSON.parse(resp.data);
      callback(tempMSG);
    
    }).catch((err) => {
      console.log(err)
    })
  }


//api for updating user profile cover  photo
 export const updateUserCoverImage = (imageFile,user_id,callback) => {
     
    RNFetchBlob.fetch('POST', serverApiUrl+'appointment.php', {
      Authorization: "Bearer access-token",
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    }, [
      { name: 'image', filename: 'image.png', type: 'image/png', data: imageFile },
      { name: 'headerPic', data: user_id }
    ]).then((resp) => {
      var tempMSG = JSON.parse(resp.data);
      callback(tempMSG); 
    }).catch((err) => {
      console.log(err)
    })
  }



  //api to active user profile to pro account
  export const upgradeToPro = (code,user_id,callback)=>
  {
    RNFetchBlob.fetch('POST', serverApiUrl+'appointment.php', {
        Authorization: "Bearer access-token",
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      }, [
        { name: 'token_verification',   data: "true" },
        { name: 'user_id', data: user_id },
        { name: 'token', data: code },
      ]).then((resp) => { 
       
        var tempMSG = JSON.parse(resp.data); 
        callback(tempMSG)
      }).catch((err) => {
        console.log(err)
      })          
        
  }


//api for fetching user details 
export const  fetch_user_details = (user_id,callback) => {
   
  
    fetch(serverApiUrl+'appointment.php', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type':'application/json' 
              },
              body: JSON.stringify({
                userDetails: true, 
                user_id:user_id, 
              })
            })
            .then((response) => response.json())
            .then(result=>{  //run  
                callback(result);
            })
            .catch((error) => {
               console.error(error);
            });
  }



    
//api for fetching user details 
export const  updateUserBackgroundColor = (user_id,color,callback) => {
   
 
     
  RNFetchBlob.fetch('POST', serverApiUrl+'profile.php', {
    Authorization: "Bearer access-token",
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  }, [ 
    { name: 'updateUserBackgroundColor', data: user_id },
    { name: 'backgroundColor', data: color },
  ]).then((resp) => {  
    var tempMSG = JSON.parse(resp.data); 
    callback(tempMSG)
  }).catch((err) => {
    console.log(err)
  }) 
}


//api for fetching user details 
export const  updateUserFontColor = (user_id,color,callback) => {



  RNFetchBlob.fetch('POST', serverApiUrl+'profile.php', {
    Authorization: "Bearer access-token",
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  }, [ 
    { name: 'updateUserFontColor', data: user_id },
    { name: 'fontColor', data: color },
  ]).then((resp) => {  
    var tempMSG = JSON.parse(resp.data); 
    callback(tempMSG)
  }).catch((err) => {
    console.log(err)
  }) 
}

export const  updateUserFontFamily = (user_id,fontFamily,callback) => {



  RNFetchBlob.fetch('POST', serverApiUrl+'profile.php', {
    Authorization: "Bearer access-token",
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  }, [ 
    { name: 'updateUserFontFamily', data: user_id },
    { name: 'fontFamily', data: fontFamily },
  ]).then((resp) => {  
    var tempMSG = JSON.parse(resp.data); 
    callback(tempMSG)
  }).catch((err) => {
    console.log(err)
  }) 
}
 