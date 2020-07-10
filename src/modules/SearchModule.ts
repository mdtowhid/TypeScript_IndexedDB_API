import { Blog } from "../classes/Blog.js";

/*
::
::BLOG SEARCH METHODS. RETURN BLOGS BASED ON SEARCH QUERIS IN REALTIME
::
*/
export const searchBlog = (queryString: string) => {
  let blogs: Blog[] = JSON.parse(window.sessionStorage.getItem("BLOGS")!);

  return blogs.filter(
    (b) =>
      b.title.toLocaleLowerCase().includes(queryString) ||
      b.body.toLowerCase().includes(queryString) ||
      b.category.toLowerCase().includes(queryString),
    []
  );
};
