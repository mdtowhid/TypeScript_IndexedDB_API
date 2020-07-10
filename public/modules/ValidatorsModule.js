import * as Dom from "./DomModule.js";
export let errorText = "";
export let hasError = false;
export const errorClass = "form-error";
/*
::
::FORM FIELDS SELECTOR. FROM DomModule.ts file.
::
*/
let { title, body, category, errors, submitBtn } = Dom;
/*
::
::THE FORM VALIDATOR FUNCTION FOR OUR APPLICATION
::
*/
export const formValidator = (element) => {
    let targetElemnt = element === null || element === void 0
        ? void 0
        : element.getAttribute("id");
    errorText = "";
    if (title.value.length < 5 && targetElemnt === "title") {
        errorText += `<p class="${errorClass}">
                    Blog title must be grater than five characters
                </p>`;
        addValidationError();
        return false;
    }
    else if (body.value.length < 10 && targetElemnt === "body") {
        errorText += `<p class="${errorClass}">
                        Blog descriptioin must be grater than ten characters
                    </p>`;
        addValidationError();
        return false;
    }
    else if (category.value === "none" && targetElemnt === "categories") {
        errorText += `
                <p class="${errorClass}">Please select blog category.</p>
                        `;
        addValidationError();
        return false;
    }
    else {
        errors.innerHTML = "";
    }
    if (title.value.length > 5 &&
        body.value.length > 10 &&
        category.value !== "none") {
        submitBtn.disabled = false;
        return true;
    }
};
/*
::
::VISUAL ERROR SETTER FUNCTION FOR USER
::
*/
const addValidationError = () => {
    errors.innerHTML = errorText;
    submitBtn.disabled = true;
};
