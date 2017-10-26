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
    case SET_COMMENTS:
      return posts.map(post => post.id === action.postId ? {...post, comments: action.comments} : post);
    case ADD_COMMENT:
      return posts.map(post => post.id === action.postId
        ? {...post, comments: [...post.comments, action.comment]}
        : post
      );
    case DELETE_COMMENT:
      return posts.map(post => post.id === action.postId
        ? {...post, comments: post.comments.filter(comment => comment.id !== action.commentId)}
        : post
      );
    case UPDATE_COMMENT:
      return posts.map(post => post.id === action.postId
        ? {...post, comments: post.comments.map(comment => comment.id === action.comment.id ? action.comment : comment)}
        : post
      );
    default:
      return posts;
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
  orderField
});
