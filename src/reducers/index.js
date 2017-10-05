import { SET_CATEGORIES } from "../actions/index";
import combineReducers from "redux/es/combineReducers";

export function categories (categories = [], action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.categories;
    default:
      return categories;
  }
}

export default combineReducers({
  categories
});