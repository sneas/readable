import { SET_CATEGORIES, SET_POSTS, ADD_POST, UPDATE_POST, DELETE_POST } from "../actions/index";
import combineReducers from "redux/es/combineReducers";

export function categories (categories = [], action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.categories;
    default:
      return categories;
  }
}

export function posts (posts = [], action) {
  switch (action.type) {
    case SET_POSTS:
      return action.posts;
    case ADD_POST:
      return [
        ...posts,
        action.post
      ];
    case UPDATE_POST:
      return posts.map(post => post.id === action.post.id ? action.post : post);
    case DELETE_POST:
      return posts.filter(post => post.id !== action.post.id);
    default:
      return posts;
  }
}

export default combineReducers({
  categories,
  posts,
});
