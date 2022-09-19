import jwt_decode from "jwt-decode";

export const createOrGetUser =  (response)=>{
    return jwt_decode(response.credential);
}