import axios from 'axios';

const url = 'http://localhost:5000/posts';

export const fetchPosts = ()=> axios.get(url);
export const createPost = (newPosrt)=>axios.post(url, newPosrt);
export const updatePost = ( id, updatedPost )=>axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id)=>axios.delete(`${url}/${id}`);