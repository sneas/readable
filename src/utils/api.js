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
      .then(res => res.json()),

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

  deletePost: (postId) =>
    fetch(`${endpoint}/posts/${postId}`,
      {
        method: 'DELETE',
        headers,
      }).then(res => res.json()),

  voteForPost: (postId, weight) =>
    fetch(`${endpoint}/posts/${postId}`,
      {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({option: weight})
      }).then(res => res.json()),
}
