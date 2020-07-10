import * as Modal from "./ModalModule.js";
import { spinner } from "./SpinnerModule.js";

let { modalOpenHandler, modalCloseHandler, modalContentHandler } = Modal;
let firstTimeLoading = localStorage.getItem("firstTimeLoading");
let contents: string = ``;

/*
::
::INDEXED_DB CHECkER
::
*/

export const isExistIndexedDB = () => {
  /*
::
::THIS APPLICATION PROGRESS THROUGH BY THIS CHECk WHETHER INDEXED_DB EXIST
::
*/

  if (isExist() && !firstTimeLoading) {
    contents = `
      <div class="checking">
        <h2 id="checkingH2">CHECKING FOR BROWSER SUPPORT.</h2>
      </div>
      <div>${spinner}</div>
      <br>
    `;

    /*
    ::
    ::IF YOU DONT UNDERSTAND [modalOpenHandler, modalContentHandler, modalCloseHandler] MRTHODS
    :: PLEASE SEE THE ModalModule.ts Module file.
    ::
    */
    modalOpenHandler();
    modalContentHandler(contents, "success");

    setTimeout(() => {
      document.querySelector("#checkingH2")!.innerHTML = "INDEXED DB EXIST!";
      setTimeout(() => {
        //MODAL COLSER
        modalCloseHandler();
      }, 2000);
    }, 3000);
    localStorage.setItem("firstTimeLoading", "not");
  }

  /*
  ::
  ::if INDEXED DB DOESN'T EXIST
  ::
  */

  if (!isExist() && firstTimeLoading) {
    contents = `OOPS! INDEXED DB DOUSEN'T SUPPORT.`;
    modalContentHandler(contents, "error");
    setTimeout(() => {
      modalCloseHandler();
    }, 2000);
  }
};

/*
::
::RETURNS TRUE OR FALSE BASED ON CONDITION
::
*/
const isExist = () => (window.indexedDB ? true : false);
