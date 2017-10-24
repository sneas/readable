export function findPost(posts, id) {
  return posts.find(post => post.id === id);
}
