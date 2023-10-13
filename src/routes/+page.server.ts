import { posts } from "$lib/data";

export const ssr = false;

export function load() {
  return {
    posts: posts.map((post) => ({
      ruang: post.ruang,
      content: post.content,
      title: post.title,
      img: post.img,
    })),
  };
}
