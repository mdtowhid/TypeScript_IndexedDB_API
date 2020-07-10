import { Blog } from "../classes/Blog";
/*
::
::IBLOG INTERFACE
::
*/
export default interface IBlog {
  postBlog(blog: Blog): any;
  getBlog(id: number | string): any;
  getBlogs(): any;
  putBlog(blog: Blog): any;
}
