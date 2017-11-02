export const UPDATE_ORDER_FIELD = 'UPDATE_ORDER_FIELD';
export const SET_COMMENTS = 'SET_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';

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

export function addComment(comment) {
  return {
    comment,
    type: ADD_COMMENT,
  }
}

export function deleteComment(id) {
  return {
    id,
    type: DELETE_COMMENT,
  }
}

export function updateComment(comment) {
  return {
    comment,
    type: UPDATE_COMMENT,
  }
}
