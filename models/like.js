import {HTTP} from '../utils/http.js'
export class LikeModels extends HTTP{
  likeReq(behavior,artID,category){
    console.log(behavior);
    console.log(artID);
    let url = behavior === 'like'? 'like': 'like/cancel';
   
    this.request({
      url:url,
      method:'POST',
      data:{
        art_id:artID,
        type:category
      }
    })
  }
  getClassicLikeStatus(artID,category,sCallback){
    this.request({
      url:`classic/${category}/${artID}/favor`,
      success:sCallback
    })
  }
}