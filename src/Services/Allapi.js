import { BASE_URL } from "./baseUrl";
import { commonApi } from "./commonApi";


export const userRegisterApi=async(body)=>{
    return await commonApi ('POST',`${BASE_URL}/user/register`,body,"")
}

// login
export const loginApi=async(body)=>{
    return await commonApi('POST',`${BASE_URL}/user/login`,body,"")

}

// update profile

export const updateprofile=async(body,headers,id)=>{
    return await commonApi('PUT',`${BASE_URL}/user/update-profile/${id}`,body,headers)
}

// add recipe
export const addRecipeApi=async(body,headers)=>{
    return await commonApi('POST',`${BASE_URL}/user/add-recipe`,body,headers)
}

// get userRecipe
export const userRecipeApi =async(headers,id)=>{
    return await commonApi('GET',`${BASE_URL}/user/get-user-recipes/${id}`,"",headers)
}

//   delete product
export const deleteRecipieApi = async (headers, id) => {
    return await commonApi('DELETE', `${BASE_URL}/user/delete-recipe/${id}`, {}, headers);
  };

//   update product
export const updateRecipeApi = async (body,header,id) => {
    return await commonApi('PUT',`${BASE_URL}/user/update-recipe/${id}`,body,header);
  };

//   // get all recipies

export const getAllRecipesApi =async()=>{
    return await commonApi('GET',`${BASE_URL}/user/get-all-Recipe`,"",{})

}

export const getAllUserssApi =async()=>{
    return await commonApi('GET',`${BASE_URL}/user/get-all-users`,"",{})

}
// single product
export const singleRecipeApi=async(id)=>{
    return await commonApi('GET',`${BASE_URL}/user/single-recipe/${id}`,"",{})
}
// get single user
export const getUserApi=async(userId)=>{
return await commonApi ('GET',`${BASE_URL}/user/get-User/${userId}`,"",{})
}

//  add comment
export const addcommentApi=async(body,headers,id)=>{
    return await commonApi ('POST',`${BASE_URL}/users/add-comment/${id}`,body,headers)
}

// get comments
export const getCommentsApi =async(headers,_id)=>{
    return await commonApi('GET',`${BASE_URL}/user/get-recipies-comments/${_id}`,"",headers)
}

// add like
export const addLikeApi=async(body,headers,_id)=>{
    return await commonApi('POST',`${BASE_URL}/user/add-like/${_id}`,body,headers)
}

// delete comment
export const deleteCommentApi = async (headers, _id) => {
    return await commonApi('DELETE', `${BASE_URL}/user/delete-comment/${_id}`, {}, headers);
  };

// remove like
export const removeLikeApi = async (body,headers, _id) => {
    return await commonApi('DELETE', `${BASE_URL}/user/remove-like/${_id}`, body, headers);
  };

  // get likes
export const getLikesApi =async(headers,_id)=>{
    return await commonApi('GET',`${BASE_URL}/user/get-recipies-likes/${_id}`,"",headers)
}



