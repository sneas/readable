import { SET_CATEGORIES, SET_POSTS, ADD_POST, UPDATE_POST, DELETE_POST, UPDATE_ORDER_FIELD, SET_COMMENTS, ADD_COMMENT,
  DELETE_COMMENT, UPDATE_COMMENT
} from "../actions/index";
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
      return posts.map(post => post.id === action.post.id ? {...post, ...action.post} : post);
    case DELETE_POST:
      return posts.filter(post => post.id !== action.post.id);
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

export default combineReducers({
  categories,
  posts,
  comments,
  orderField
});
