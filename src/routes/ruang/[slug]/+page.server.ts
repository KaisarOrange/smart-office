import { posts } from "$lib/data";

export function load({ params }) {
  return {
    posts: posts.filter((post) => post.ruang === params.slug),
  };
}
