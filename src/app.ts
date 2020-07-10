import { Blog } from "./classes/Blog.js";
import * as Dom from "./modules/DomModule.js";
import * as Installer from "./modules/InstallerModule.js";
import * as TemplateBuilder from "./modules/TemplateBuilderModule.js";
import * as Validators from "./modules/ValidatorsModule.js";
import * as FormHandler from "./modules/FormHandleModule.js";
import * as StatusHandler from "./modules/StatusHandlerModule.js";
import * as Footer from "./modules/FooterModule.js";
import * as Search from "./modules/SearchModule.js";
import * as Preferences from "./modules/PreferencesModule.js";

let {
  title,
  body,
  category,
  submitBtn,
  modal,
  footer,
  searchBoxInput,
  found,
  notFound,
  preferences,
  preferenceIcon,
} = Dom;
let { getFormData, setFormData, disabledSubmitButton } = FormHandler;
let { categoryOptionBuilder, blogTemplateBuilder } = TemplateBuilder;
let { formValidator } = Validators;
let { errorHandler } = StatusHandler;

/* 
::
::creating instance of Blog class
::
*/
const blog = new Blog(0, "", "", "", "", "");

/*
::
::Validate each form fields...
::
*/

title.addEventListener("change", () => formValidator(title));
body.addEventListener("change", () => formValidator(body));
category.addEventListener("change", () => formValidator(category));

/*
::
::POST the form data/blog
::
*/
submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const btnText = submitBtn.value;
  let formData = await getFormData();
  try {
    if (btnText === "store") {
      await blog.postBlog(formData);
    } else {
      blog.putBlog(formData);
    }
    await blogTemplateBuilder();
    await setFormData();
    await disabledSubmitButton();
  } catch (error) {
    errorHandler(error);
  }
});

/*
::
::SET the PAGE/APP initial functionalities
::
*/

window.addEventListener("load", async (e) => {
  /*
::
::CHECK WHEATHER IndexedDB EXIST on USER COMPUTER.
::
*/
  Installer.isExistIndexedDB();

  /*
::
::Set User Default Preference
::
*/
  Preferences.setUserDefaultPreference();
  /*
::
::SET Preference by USER CLICKED.
::
*/
  Preferences.setUserPreference();

  /*
::
::Build category Options by calling categoryOptionBuilder method
::##Form DROPDOWN
*/

  category.innerHTML += categoryOptionBuilder();

  try {
    /*
    ::
    ::CALL Blog Template Builder method. press ctrl+clicK to navigate
    ::
    */
    blogTemplateBuilder();
  } catch (error) {
    //if any error. [ERROR Handler]
    errorHandler(error);
  }

  /* 
::
::Set FOOTER for entire application from FooterModule
::
*/

  footer.innerHTML = Footer.footer();
});

/* 
::
:: closing popup window/(MODAL) by clicKing on it...
::
*/
modal.addEventListener("click", (e) => modal.classList.remove("active"));

/*
::
::SEARCH functionalities
::
*/

searchBoxInput.addEventListener("keyup", (e) => {
  let queryString = searchBoxInput.value;
  if (queryString.length > 3) {
    const blogs: Blog[] = Search.searchBlog(queryString.toLowerCase());
    if (blogs.length > 0) {
      found.innerHTML = `
        <hr>
        <h4 class="alert alert-success">
          found <span>${blogs.length} blogs.</span>
        </h4>
      `;
      blogTemplateBuilder(blogs);
      notFound.innerHTML = ``;
    } else {
      found.innerHTML = "";
      notFound.innerHTML = `
                            <hr>
                            <div class="alert alert-danger">
                              <p class="font-weight-bold m-0">
                                Blog not found with Query: ${queryString.toUpperCase()}
                              </p>
                            </div>`;
    }
  }
  if (queryString === "") {
    found.innerHTML = "";
    notFound.innerHTML = "";
    blogTemplateBuilder();
  }
});

/*
::
::TOGGLE preferences BY CLICKING preferenceIcon
::
*/
preferenceIcon.addEventListener("click", () => {
  preferences.classList.toggle("active");
});
