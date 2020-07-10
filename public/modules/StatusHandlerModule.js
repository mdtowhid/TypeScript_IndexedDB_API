var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as Modal from "./ModalModule.js";
/*
::
::ERROR HANDLER FOR ENTIRE APPLICATION
::
*/
export const errorHandler = (errors) => __awaiter(void 0, void 0, void 0, function* () {
    const errorClass = "error";
    Modal.modalOpenHandler();
    Modal.modalContentHandler(errors, errorClass);
    setTimeout(() => {
        Modal.modalCloseHandler();
    }, 3000);
});
/*
::
::SUCCESS HANDLER FOR ENTIRE APPLICATION
::
*/
export const successHandler = (successStatus) => __awaiter(void 0, void 0, void 0, function* () {
    const successClass = "success";
    Modal.modalOpenHandler();
    Modal.modalContentHandler(successStatus, successClass);
    setTimeout(() => {
        Modal.modalCloseHandler();
    }, 1300);
});
