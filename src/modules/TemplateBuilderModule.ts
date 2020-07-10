import { Blog } from "../classes/Blog.js";
import * as Dom from "../modules/DomModule.js";
import * as DB from "../modules/DbModule.js";
import * as Status from "../modules/StatusHandlerModule.js";

let categoryTemplate = ``;
let { blogIdInput, title, body, category, submitBtn } = Dom;

/*
::
::THE BLOG TEMPLATE BUILDER. BLOG_PARAM AREN'T MENDATORY HERE.
::
*/

export const blogTemplateBuilder = async (blogsParam?: Blog[]) => {
  const blog = new Blog(0, "", "", "", "", "");
  let blogs: Blog[] = [];
  let blogTemplate = "";

  /*
::
::CHECk IF blogsParam is [] or undefined
::
*/

  if (blogsParam === [] || typeof blogsParam === "undefined") {
    blogs = (await blog.getBlogs()) as Blog[];
  } else {
    blogs = blogsParam!;
  }

  /*
::
::IF THERE IS NO ANY BLOG IN INDEXED_db
::
*/
  if (blogs.length === 0 && blogsParam?.length == 0) {
    Dom.blogs.innerHTML = `
                            <div class="jumbotron">
                              <h3 class="display-4">Notice!</h3>
                              <p class="lead">
                                Please start this App by adding some BLOG.
                              </p>
                            </div>
                          `;

    return;
  }

  //SHOW AND HIDE SEARCH BOX BASED ON BLOGS
  //IF BLOGS LENGTH IS GREATER THAN 0 THAN
  //SEARCH BOX WILL APPEAR

  blogs.length > 0
    ? (Dom.searchBox.style.display = "block")
    : (Dom.searchBox.style.display = "none");

  for (const b of blogs) {
    blogTemplate += `
      <div id="${b.id}" class="blog row border shadow mb-3 p-3">
        <div class="col-md-3 blog-head">
          <h3>${b.title}</h3>
          <p><b>${b.category}</b></p>
        </div>

        <div class="col-md-6 blog-body">
          <p>${b.body}</p>
          <h6 class="text-muted">Created At</h6>
          <p>${b.createdAt?.toString().substring(0, 16)}</p>
        </div>

        <div class="col-md-3 blog-actions">
          <div class="row justify-content-around align-item-center">
            <button id="${
              b.id
            }" class="edit-blog-btn btn btn-sm btn-outline-success">
                Edit
            </button>
            <button b-d-id="${
              b.id
            }" class="delete-blog-btn btn btn-sm btn-outline-warning">
              Delete
            </button>
          </div>
        </div>
      </div>
    `;
  }

  /*
::
::SET THE BLOGS OBJECT IN blogs id in index.html page
::
*/

  Dom.blogs.innerHTML = blogTemplate;

  /*
::
::THIS TWO METHOD CALLED BY RUNTIME
::
*/
  setTimeout(() => {
    /*
  ::
  ::EDIT BUTTON FUNCTIOINALITIES FOR EACH EDIT BUTTONS
  ::
  */
    addEditEventListener();

    /*
  ::
  ::DELETE BUTTON FUNCTIOINALITIES FOR EACH DELETE BUTTONS
  ::
  */
    addDeleteEventListener();
  }, 100);
};

/*
::
::CATEGORY DROPDON BUILDER IN FORM IN index.html page
::
*/
export const categoryOptionBuilder = () => {
  for (let category of Blog.blogCategories) {
    categoryTemplate += `<option>${category}</option>`;
  }
  return categoryTemplate;
};

export const addDeleteEventListener = async () => {
  const deleteBtns = document.getElementsByClassName("delete-blog-btn");
  if (deleteBtns) {
    for (const dltBtn of deleteBtns) {
      dltBtn.addEventListener("click", async (e) => {
        if (confirm("Want to delet this blog?")) {
          const blogId = +dltBtn.getAttribute("b-d-id")!;
          const req = indexedDB.open(DB.BlogDB);
          req.onsuccess = (e: any) => {
            const db = e.target.result;
            const transaction = db.transaction(DB.blogsStoreName, "readwrite");
            const store = transaction.objectStore(DB.blogsStoreName);
            store.delete(blogId);
          };

          blogTemplateBuilder();
        }
      });
    }
  }
};

export const addEditEventListener = async () => {
  const editBtns = document.getElementsByClassName("edit-blog-btn");
  if (editBtns) {
    for (const editBtn of editBtns) {
      editBtn.addEventListener("click", async (e) => {
        const blogId = +editBtn.getAttribute("id")!;
        const blogs = JSON.parse(sessionStorage.getItem("BLOGS")!) as Blog[];
        const blog = blogs.find((b) => b.id === blogId) as Blog;
        if (blog) {
          blogIdInput.value = blog.id.toString();
          title.value = blog.title;
          body.value = blog.body;
          category.value = blog.category;
          submitBtn.value = "update";
          submitBtn.disabled = false;
        } else {
          await Status.errorHandler("Blog Not found");
        }
      });
    }
  }
};
