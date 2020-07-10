var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { blogsStoreName, BlogDB } from "../modules/DbModule.js";
import * as Dom from "../modules/DomModule.js";
import * as Spinner from "../modules/SpinnerModule.js";
import { setFormData } from "../modules/FormHandleModule.js";
import { blogTemplateBuilder } from "../modules/TemplateBuilderModule.js";
let result;
let transaction;
let store;
let blogs = [];
/*
::
::BLOG class implementing IBlog interface
::
*/
export class Blog {
    /*
  ::
  ::CONSTRUNCTION INITIALIZATION
  ::
  */
    constructor(id, title, body, category, createdAt, updatedAt) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.category = category;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.getBlogs = () => __awaiter(this, void 0, void 0, function* () {
            yield this.allBlogs();
            Dom.blogs.innerHTML = Spinner.spinner;
            return new Promise((res, rej) => {
                setTimeout(() => (blogs ? res(blogs) : rej("Blogs Not Found")), 1000);
            });
        });
        this.allBlogs = () => __awaiter(this, void 0, void 0, function* () {
            /*
        ::
        ::BY INDEXED DB GOOLE DOCUMENTATIONS
        ::
        */
            const req = indexedDB.open(BlogDB);
            req.onsuccess = (e) => {
                result = e.target.result;
                transaction = result.transaction(blogsStoreName, "readwrite");
                store = transaction.objectStore(blogsStoreName);
                store.getAll().onsuccess = (e) => {
                    blogs = e.target.result;
                    sessionStorage.setItem("BLOGS", JSON.stringify(blogs));
                };
            };
        });
    }
    getBlog(id) { }
    postBlog(blog) {
        /*
    ::
    ::BY INDEXED DB GOOLE DOCUMENTATIONS
    ::
    */
        const req = indexedDB.open(BlogDB);
        req.onsuccess = function (e) {
            var db = e.target.result;
            var transaction = db.transaction(blogsStoreName, "readwrite");
            var store = transaction.objectStore(blogsStoreName);
            store.add(blog);
        };
    }
    putBlog(blog) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            ::
            ::BY INDEXED DB GOOLE DOCUMENTATIONS
            ::
            */
            const req = indexedDB.open(BlogDB);
            req.onsuccess = (e) => {
                const db = e.target.result;
                const transaction = db.transaction(blogsStoreName, "readwrite");
                const store = transaction.objectStore(blogsStoreName);
                store.put(blog);
            };
            yield blogTemplateBuilder();
            setFormData();
            Dom.submitBtn.disabled = true;
            Dom.submitBtn.value = "store";
        });
    }
}
/*
::
::BLOG CATEGORIES ARRAY
::
*/
Blog.blogCategories = [
    "History",
    "Education",
    "Social",
    "Life's",
    "Lorem",
    "Programing",
    "Typescript",
];
