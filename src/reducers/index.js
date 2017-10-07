import { SET_CATEGORIES, SET_POSTS } from "../actions/index";
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
    default:
      return posts;
  }
}

export default combineReducers({
  categories,
  posts,
});