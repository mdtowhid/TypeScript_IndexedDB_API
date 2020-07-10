import * as Dom from "./DomModule.js";
import * as Common from "./CommonModule.js";
import { Blog } from "../classes/Blog.js";

let { generateUniqueId } = Common;
let { blogIdInput, title, body, category, submitBtn } = Dom;

/*
::
::CREATE & return THE FORM DATA TO THE app.ts file WHILE SUBMITTING EVENT     OCCURS
::
*/

export const getFormData = async () => {
  return {
    id: +blogIdInput.value > 0 ? +blogIdInput.value : generateUniqueId(),
    title: title.value,
    body: body.value,
    category: category.value,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as Blog;
};

/*
::
::SET THE FORM FIELDS AS EMPTY
::
*/

export const setFormData = async () => {
  title.value = "";
  body.value = "";
  category.value = "none";
};

export const disabledSubmitButton = async () => (submitBtn.disabled = true);
