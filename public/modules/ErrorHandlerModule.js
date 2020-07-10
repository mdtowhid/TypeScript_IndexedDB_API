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
export const errorHandler = (errors) => __awaiter(void 0, void 0, void 0, function* () {
    const errorClass = "error";
    Modal.modelOpenHandler();
    Modal.modelContentHandler(errors, errorClass);
    setTimeout(() => {
        Modal.modelCloseHandler();
    }, 1000);
});
