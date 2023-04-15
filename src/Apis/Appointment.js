import { serverApiUrl, serverBaseUrl } from "../Components/config";
import RNFetchBlob from 'rn-fetch-blob';

//api to set appointment status to cancelled
export const cancelAppointment = (appointment_id,callback) => {
    fetch(serverApiUrl+'appointment.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cancelAppointment: true,
        appoint_id: appointment_id,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
          callback(result); 
      })
      .catch((error) => {
        console.error(error);
      });
}

//api to change status of appointment  requires appointment id and status
export const  processAppointmentRequest = (cur_appointment_id,status,callback) => {
  
    RNFetchBlob.fetch(
      'POST',
      serverApiUrl+'appointment.php',
      {
        Authorization: 'Bearer access-token',
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      [
        {name: 'processAppointmentRequest', data: 'true'},
        {name: 'appointment_idProcess', data: cur_appointment_id},
        {name: 'appoint_status', data: status},
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


//api to change appointment payment status  requires appointment id and status
export const processAppointmentPaymentRequest = (cur_appointment_id,status,callback) => { 
  
    RNFetchBlob.fetch(
      'POST',
      serverApiUrl+'appointment.php',
      {
        Authorization: 'Bearer access-token',
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      [
        {name: 'processAppointmentPaymentRequest', data: 'true'},
        {name: 'appointment_idProcess', data: cur_appointment_id},
        {name: 'appoint_status', data: status},
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
//fetch gallery of particular user
export const fetchGallery=(userName,callback)=>{

    fetch(serverApiUrl+'appointment.php', {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          fetchGallery: true,
          tattbook_user_name: userName,
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
//send appointment remainder to user
export const sendAppointmentReminder = (name,phone,date,time,email,shopName,temp_id,callback) => { 
    RNFetchBlob.fetch(
      'POST',
      serverApiUrl+'appointment.php',
      {
        Authorization: 'Bearer access-token',
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      [
        {name: 'sendReminder', data: 'true'},
        {name: 'name', data: name},
        {name: 'phone', data: phone},
        {name: 'date', data: date},
        {name: 'time', data: time},
        {name: 'email', data: ""+email},
        {name: 'shopName', data: ""+shopName},
        {name: 'temp_id', data: ""+temp_id},        
      ],
    )
      .then((resp) => {  
        // console.log(resp)
        var tempMSG = JSON.parse(resp);
        callback(tempMSG);
         
      })
      .catch((err) => {
        console.log(err);
      });
  };


//add appointment  for a client of user
export const bookAppointment = (name,phone,selectedStartDate,time,user_name,service,comment,email,serviceDuration,callback) => {
   
     
    fetch(serverApiUrl+'appointment.php', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            isAppointment: true,
            name: name,
            num: phone,
            date: selectedStartDate,
            time: time,
            temp_user: user_name,
            service: service,
            comment: comment,
            email: email.toLowerCase(),
            serviceDuration: serviceDuration
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

//add appointment  images
export const addAppointmentImages = (appointmentId,imageObj,callback) => {
   

    // var formData = new FormData();
    // formData.append("addAppointmentImage",appointmentId)
    // formData.append("image",image)
     
    // fetch(serverApiUrl+'appointmentImages.php', {
    //     method: 'POST',
    //     headers: {
    //         Accept: 'application/json', 
    //         'Content-Type': 'multipart/form-data',
    //     },
    //     body:  formData
    // })
    //     .then((response) => response.json())
    //     .then(result => { 
    //       console.log(result)
    //         callback(result)

    //     })
    //     .catch((error) => {
    //         console.error(error);
    //     });
        RNFetchBlob.fetch('POST', serverApiUrl+'appointmentImages.php', {
          Authorization: "Bearer access-token",
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        }, [
            imageObj,
            { name: 'addAppointmentImage',data:appointmentId+""}
          ]).then((resp) => {  
            var tempMSG = JSON.parse(resp.data); 
            callback(tempMSG);  
          }).catch((err) => {
            console.log(err)
          })
}
//fetch appointment  images
export const fetchAppointmentImages = (appointmentId,callback) => {
   
     
    var formData = new FormData();
    formData.append("fetchAppointmentImages",appointmentId)
 
    fetch(serverApiUrl+'appointmentImages.php', {
        method: 'POST',
        headers: {
            Accept: 'application/json', 
        },
        body: formData
    })
        .then((response) => response.json())
        .then(result => {  
            callback(result)

        })
        .catch((error) => {
            console.error(error);
        });
}

//api to update appointment  
export const updateAppointment = (appointment_id,name,phone,date,time,service,serviceDuration,comment,email,callback) => {
    
    fetch(serverApiUrl+'appointment.php', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            updateAppointment: appointment_id,
            name: name,
            num: phone,
            date: date,
            time: time, 
            service: service,
            serviceDuration:serviceDuration,
            comment: comment,
            email: email.toLowerCase()
        })
    })
        .then((response) =>response.json())
        .then(result => { 
             callback(result)

        })
        .catch((error) => {
            console.error(error);
        });
}

//api for fetching appointments  here username and user_id both will be passedto api
export const  fetch_user_appointments = (username,user_id,callback) => {
  
    fetch(serverApiUrl+'appointment.php', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type':'application/json' 
              },
              body: JSON.stringify({
                userAppointments: true,
                user_id:username,
                user_temp_id:user_id

              })
            })
            .then((response) => response.json())
            .then(result=>{  
                callback(result);
            })
            .catch((error) => {
               console.error(error);
            });
  }