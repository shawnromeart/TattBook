import { serverApiUrl } from "../Components/config";
import RNFetchBlob from 'rn-fetch-blob'


//api to upload user gallery image to server one at a time
export const uploadImageToServer = (imageObj,user_id,callback) => { 
 


  // let images=[];
  //   imageFile.map(item=>{
  //     images.push( { name: 'image', filename:item.fileName, type: item.type, data: item.base64 } );
  //   })

  
    RNFetchBlob.fetch('POST', serverApiUrl+'appointment.php', {
      Authorization: "Bearer access-token",
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    }, [
        imageObj,
        { name: 'galleryImage',data:user_id}
      ]).then((resp) => { 
        var tempMSG = JSON.parse(resp.data); 
        callback(tempMSG);  
      }).catch((err) => {
        console.log(err)
      })

  }
 
//api to delete gallery Image saved in server with image id
export const deleteImage = (id,callback) => {  
    RNFetchBlob.fetch('POST', serverApiUrl+'appointment.php', {
      Authorization: "Bearer access-token",
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    }, [
        { name: 'delete_imageGallery',   data: "true"},     
        { name: 'image_idGallery',data:id}
      ]).then((resp) => { 
        var tempMSG = JSON.parse(resp.data); 
         callback(tempMSG);
            
      }).catch((err) => {
        console.log(err)
      })

  }