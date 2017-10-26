export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_POSTS = 'SET_POSTS';
export const ADD_POST = 'ADD_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const UPDATE_ORDER_FIELD = 'UPDATE_ORDER_FIELD';
export const SET_COMMENTS = 'SET_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';

export function setCategories(categories) {
  return {
    categories,
    type: SET_CATEGORIES,
  }
}

export function setPosts(posts) {
  return {
    posts,
    type: SET_POSTS,
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

export function updateOrderField(field) {
  return {
    field,
    type: UPDATE_ORDER_FIELD,
  }
}

export function setComments(postId, comments = []) {
  return {
    postId,
    comments,
    type: SET_COMMENTS,
  }
}

export function addComment(postId, comment) {
  return {
    postId,
    comment,
    type: ADD_COMMENT,
  }
}

export function deleteComment(postId, commentId) {
  return {
    postId,
    commentId,
    type: DELETE_COMMENT,
  }
}

export function updateComment(postId, comment) {
  return {
    postId,
    comment,
    type: UPDATE_COMMENT,
  }
}
