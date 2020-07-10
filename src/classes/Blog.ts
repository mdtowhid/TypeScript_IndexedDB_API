import IBlog from "../interfaces/Blog.js";
import { blogsStoreName, BlogDB } from "../modules/DbModule.js";
import * as Dom from "../modules/DomModule.js";
import * as Spinner from "../modules/SpinnerModule.js";
import { setFormData } from "../modules/FormHandleModule.js";
import { blogTemplateBuilder } from "../modules/TemplateBuilderModule.js";

let result: any;
let transaction: any;
let store: any;
let blogs: any = [];

/*
::
::BLOG class implementing IBlog interface
::
*/

export class Blog implements IBlog {
  /*
::
::CONSTRUNCTION INITIALIZATION
::
*/
  constructor(
    public id: number | string,
    public title: string,
    public body: string,
    public category: string,
    public createdAt?: string | Date,
    public updatedAt?: string | Date
  ) {}

  getBlogs = async () => {
    await this.allBlogs();
    Dom.blogs.innerHTML = Spinner.spinner;
    return new Promise((res, rej) => {
      setTimeout(() => (blogs ? res(blogs) : rej("Blogs Not Found")), 1000);
    });
  };

  private allBlogs = async () => {
    /*
::
::BY INDEXED DB GOOLE DOCUMENTATIONS
::
*/
    const req = indexedDB.open(BlogDB);
    req.onsuccess = (e: any) => {
      result = e.target.result;
      transaction = result.transaction(blogsStoreName, "readwrite");
      store = transaction.objectStore(blogsStoreName);
      store.getAll().onsuccess = (e: any) => {
        blogs = e.target.result;
        sessionStorage.setItem("BLOGS", JSON.stringify(blogs));
      };
    };
  };

  getBlog(id: number) {}

  postBlog(blog: Blog) {
    /*
::
::BY INDEXED DB GOOLE DOCUMENTATIONS
::
*/
    const req = indexedDB.open(BlogDB);
    req.onsuccess = function (e: any) {
      var db = e.target.result;
      var transaction = db.transaction(blogsStoreName, "readwrite");
      var store = transaction.objectStore(blogsStoreName);
      store.add(blog);
    };
  }

  async putBlog(blog: Blog) {
    /*
    ::
    ::BY INDEXED DB GOOLE DOCUMENTATIONS
    ::
    */
    const req = indexedDB.open(BlogDB);
    req.onsuccess = (e: any) => {
      const db = e.target.result;
      const transaction = db.transaction(blogsStoreName, "readwrite");
      const store = transaction.objectStore(blogsStoreName);
      store.put(blog);
    };
    await blogTemplateBuilder();
    setFormData();
    Dom.submitBtn.disabled = true;
    Dom.submitBtn.value = "store";
  }

  /*
::
::BLOG CATEGORIES ARRAY
::
*/

  static blogCategories = [
    "History",
    "Education",
    "Social",
    "Life's",
    "Lorem",
    "Programing",
    "Typescript",
  ];
}
