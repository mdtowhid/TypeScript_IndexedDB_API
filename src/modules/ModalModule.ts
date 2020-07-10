import * as DomModule from "./DomModule.js";
let { modal, modalContent } = DomModule;

/*
::
::add an active class to open MODAL
::
*/
export const modalOpenHandler = () => modal.classList.add("active");

/*
::
::remove active class to close MODAL
::
*/
export const modalCloseHandler = () => modal.classList.remove("active");

/*
::
::active class toggler / SEARCh for toogler for better understanding.
::
*/
export const modalToggleHandler = () => modal.classList.toggle("active");

/*
::
::VERY IMPORTANT METHOD FOR THIS PROJECT
::contents are totally dynamic and must be required by it's caller
:: classes parameter isn't mendatory by default error as classes value
*/

export const modalContentHandler = (contents: string, classes?: string) => {
  if (classes === "success") {
    modalContent.classList.add("success");
    modalContent.innerHTML = contents;
  } else {
    modalContent.classList.add("error");
    modalContent.innerHTML = contents;
  }
};
