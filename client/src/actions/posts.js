import * as api from '../api';
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE_POST} from '../constants/actionTypes'

// Action Creators

export const getPosts = ()=> async(dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        dispatch({ type: FETCH_ALL, payload: data })
    } catch (error) {
        console.error(error)
    }
}

export const createPosts = (post)=> async(dispatch)=>{
    try {
        const { data } = await api.createPost(post)
        console.log( data );
        dispatch({ type: CREATE, payload: data })
    } catch (error) {
        console.error(error)
    }
}

export const updatePosts = (id, post)=> async(dispatch)=>{
    try {
        const { data } = await api.updatePost(id, post)
        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.error(error)
    }
}

export const deletePosts = (id)=> async(dispatch)=>{
    try {
        await api.deletePost(id);
        dispatch({type: DELETE, payload: id});
    } catch (error) {
        console.error(error)
    }
}

export const likePosts = (id)=> async(dispatch)=>{
    try {
        const { data } =  await api.likePost(id);
        dispatch({type: LIKE_POST, payload: data })
    } catch (error) {
        console.error(error)
    }
}