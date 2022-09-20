import { AUTH, LOGOUT } from '../constants/actionTypes';

export default (state={authData: null}, action)=>{
    switch (action.type) {
        case AUTH:
            console.log( JSON.stringify(action?.data) )
            localStorage.setItem('profile' , JSON.stringify( action?.data ))
            return { ...state, authData: action?.data};
    
        case LOGOUT:
            localStorage.removeItem('profile');
            return { ...state, authData: null};
        default:
            return state;    
    }
}