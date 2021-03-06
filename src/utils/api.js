import { normalize } from "./normalize";
const endpoint = "http://localhost:3001"

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const api = {
  fetchCategories: () =>
    fetch(`${endpoint}/categories`, { headers })
      .then(res => res.json())
      .then(data => data.categories),

  fetchPosts: () =>
    fetch(`${endpoint}/posts`, { headers })
      .then(res => res.json())
      .then(posts => normalize(posts)),

  fetchPost: (postId) =>
    fetch(`${endpoint}/posts/${postId}`, { headers })
      .then(res => res.json()),

  createPost: (post) =>
    fetch(`${endpoint}/posts`,
      {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
      }).then(res => res.json()),

  updatePost: (post) =>
    fetch(`${endpoint}/posts/${post.id}`,
      {
        method: 'PUT',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
      }).then(res => res.json()),

  deletePost: (id) =>
    fetch(`${endpoint}/posts/${id}`,
      {
        method: 'DELETE',
        headers,
      }).then(res => res.json()),

  voteForPost: (postId, option) =>
    fetch(`${endpoint}/posts/${postId}`,
      {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({option: option})
      }).then(res => res.json()),

  getAllComments: (postId) =>
    fetch(`${endpoint}/posts/${postId}/comments`, { headers })
      .then(res => res.json()),

  createComment: (comment) =>
    fetch(`${endpoint}/comments`,
      {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
      }).then(res => res.json()),

  deleteComment: (id) =>
    fetch(`${endpoint}/comments/${id}`,
      {
        method: 'DELETE',
        headers,
      }).then(res => res.json()),

  updateComment: (comment) =>
    fetch(`${endpoint}/comments/${comment.id}`,
      {
        method: 'PUT',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
      }).then(res => res.json()),

  voteForComment: (commentId, option) =>
    fetch(`${endpoint}/comments/${commentId}`,
      {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({option: option})
      }).then(res => res.json()),
}
