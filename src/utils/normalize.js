// normalizr could be used but it's too heavy for such a trivial task
export function normalize(array) {
  return array.reduce((acc, item) => ({
    ...acc,
    [item.id]: item
  }), {});
}
