import {serverApiUrl} from '../Components/config'

import RNFetchBlob from 'rn-fetch-blob'

//api for deleting timig hours which will be displayed in profile about page
export const deleteHourSlot = (id,user_id,callback) => {
    RNFetchBlob.fetch(
      'POST',
      serverApiUrl + 'appointment.php',
      {
        Authorization: 'Bearer access-token',
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      [
        {name: 'temp_id', data: user_id},
        {name: 'b_id', data: id},
        {name: 'deleteSlot', data: 'true'},
      ],
    )
      .then((resp) => { 
        var tempMSG = JSON.parse(resp.data);
        callback(tempMSG);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  export const fetchSlot = (user_id,callback) => {
    
      fetch(serverApiUrl+'appointment.php', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fetchSlot: true,
            tattbook_user_id: user_id,
        })
    })
        .then((response) => response.json())
        .then(result => { 
            callback(result)
  
        })
        .catch((error) => {
            console.error(error);
        });
  }


//api for updating  bio of user which is displayed about timing hours in profile about section
 export const  updateBio = (about,user_id,callback) => { 
      RNFetchBlob.fetch(
        'POST',
        serverApiUrl+'appointment.php',
        {
          Authorization: 'Bearer access-token',
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        [
          {name: 'temp_id', data:  user_id},
          {name: 'about', data: about},
          {name: 'bioUpdate', data: 'true'},
        ],
      )
        .then((resp) => { 
          var tempMSG = JSON.parse(resp.data);

            callback(tempMSG);
        })
        .catch((err) => {
          console.log(err);
        });
  
  }

//api  to add hour slot 
  export const  AddSlot = (user_id,startTime,endTime,weekDay,callback) =>
  { 
          RNFetchBlob.fetch('POST', 
          serverApiUrl+'appointment.php', 
          {
              Authorization: "Bearer access-token",
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            }, [  
              { name:'temp_id', data: user_id }, 
              { name:'start', data: startTime }, 
              { name:'end', data: endTime },
              { name:'day', data: weekDay }, 
              { name:"addSlot", data:"true"},
            ]).then((resp) => {
              var tempMSG = JSON.parse(resp.data); 
                callback(tempMSG);
               
                  
            }).catch((err) => {
              console.log(err)
            })
 
     
  }