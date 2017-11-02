import { api } from "../utils/api";
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

export function setCategories(categories) {
  return {
    categories,
    type: RECEIVE_CATEGORIES,
  }
}

export function fetchCategories() {
  return dispatch => {
    api.fetchCategories().then(categories => {
      dispatch(setCategories(categories))
    });
  }
}
