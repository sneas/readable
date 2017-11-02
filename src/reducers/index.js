import { UPDATE_ORDER_FIELD, SET_COMMENTS, ADD_COMMENT,
  DELETE_COMMENT, UPDATE_COMMENT
} from "../actions/index";
import { RECEIVE_POSTS, ADD_POST, UPDATE_POST, DELETE_POST } from "../actions/posts";
import combineReducers from "redux/es/combineReducers";
import { RECEIVE_CATEGORIES } from "../actions/categories";

export function categories (categories = [], action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return action.categories;
    default:
      return categories;
  }
}

export function posts (posts = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      return action.posts;
    case ADD_POST:
      return {
        ...posts,
        [action.post.id]: action.post
      };
    case UPDATE_POST:
      return {
        ...posts,
        [action.post.id]: action.post
      };
    case DELETE_POST:
      let { [action.post.id]: deletedItem, ...rest } = posts;
      return rest;
    default:
      return posts;
  }
}

export function comments(comments = [], action) {
  switch (action.type) {
    case SET_COMMENTS:
      return [...action.comments, ...comments.filter(comment => action.postId !== comment.parentId)];
    case ADD_COMMENT:
      return [...comments, action.comment];
    case DELETE_COMMENT:
      return comments.filter(comment => comment.id !== action.id);
    case UPDATE_COMMENT:
      return comments.map(comment => comment.id === action.comment.id ? action.comment : comment);
    case DELETE_POST:
      return comments.filter(comment => comment.parentId !== action.post.id);
    default:
      return comments;
  }
}

export function orderField(field = 'voteScore', action) {
  switch (action.type) {
    case UPDATE_ORDER_FIELD:
      return action.field;
    default:
      return field;
  }
}

export function dataLoaded(isLoaded = {categories: false, posts: false}, action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return {
        ...isLoaded,
        categories: true,
      };
    case RECEIVE_POSTS:
      return {
        ...isLoaded,
        posts: true,
      };
    default:
      return isLoaded;
  }
}

export default combineReducers({
  categories,
  posts,
  comments,
  orderField,
  dataLoaded,
});
