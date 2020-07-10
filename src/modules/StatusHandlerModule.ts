import * as Modal from "./ModalModule.js";

/*
::
::ERROR HANDLER FOR ENTIRE APPLICATION
::
*/
export const errorHandler = async (errors: string) => {
  const errorClass = "error";
  Modal.modalOpenHandler();
  Modal.modalContentHandler(errors, errorClass);

  setTimeout(() => {
    Modal.modalCloseHandler();
  }, 3000);
};

/*
::
::SUCCESS HANDLER FOR ENTIRE APPLICATION
::
*/

export const successHandler = async (successStatus: string) => {
  const successClass = "success";
  Modal.modalOpenHandler();
  Modal.modalContentHandler(successStatus, successClass);

  setTimeout(() => {
    Modal.modalCloseHandler();
  }, 1300);
};
