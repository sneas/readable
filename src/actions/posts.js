import { api } from "../utils/api";
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const ADD_POST = 'ADD_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';

export function setPosts(posts) {
  return {
    posts,
    type: RECEIVE_POSTS,
  }
}

export function fetchPosts() {
  return dispatch => {
    api.fetchPosts().then(posts => {
      dispatch(setPosts(posts))
    })
  }
}

export function addPost(post) {
  return {
    post,
    type: ADD_POST,
  }
}

export function updatePost(post) {
  return {
    post,
    type: UPDATE_POST,
  }
}

export function deletePost(post) {
  return {
    post,
    type: DELETE_POST,
  }
}
