var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as Dom from "./DomModule.js";
import * as Common from "./CommonModule.js";
let { generateUniqueId } = Common;
let { blogIdInput, title, body, category, submitBtn } = Dom;
/*
::
::CREATE & return THE FORM DATA TO THE app.ts file WHILE SUBMITTING EVENT     OCCURS
::
*/
export const getFormData = () => __awaiter(void 0, void 0, void 0, function* () {
    return {
        id: +blogIdInput.value > 0 ? +blogIdInput.value : generateUniqueId(),
        title: title.value,
        body: body.value,
        category: category.value,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
});
/*
::
::SET THE FORM FIELDS AS EMPTY
::
*/
export const setFormData = () => __awaiter(void 0, void 0, void 0, function* () {
    title.value = "";
    body.value = "";
    category.value = "none";
});
export const disabledSubmitButton = () => __awaiter(void 0, void 0, void 0, function* () { return (submitBtn.disabled = true); });
