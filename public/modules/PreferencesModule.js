import * as Dom from "./DomModule.js";
import * as Modal from "./ModalModule.js";
let { preferencesColors, pageBody } = Dom;
/*
::
::PREFERNCE NAME CONST AS PREFRENCE FOR localStorage;
::PLEASE DON'T CHANGE HERE
::
*/
export const prefrenceName = "PREFERENCE";
/*
::
::SETTING UP INITAL USER PREFERENCE AS BG. WHITE
::
*/
export const setUserDefaultPreference = () => {
    const prevPreference = window.localStorage.getItem(prefrenceName);
    if (!prevPreference) {
        window.localStorage.setItem(prefrenceName, "white");
        pageBody.style.backgroundColor = "white";
    }
    else
        pageBody.style.backgroundColor = prevPreference;
};
/*
::
::PREFERNCE BY USER CLICkED ON index.html PAGE LEFT MENU
::
*/
export const setUserPreference = () => {
    if (preferencesColors.length > 0) {
        for (const color of preferencesColors) {
            /*
            ::
            ::addEventListener for each colors
            ::
            */
            color.addEventListener("click", (e) => {
                let colorClass = color.getAttribute("class").split(" ")[1];
                window.localStorage.setItem(prefrenceName, colorClass);
                Modal.modalOpenHandler();
                Modal.modalContentHandler(`Setting Background Color as <br><br><b>${colorClass.toUpperCase()}</b>`, "success");
                setTimeout(() => {
                    pageBody.style.backgroundColor = colorClass;
                    Modal.modalCloseHandler();
                }, 2000);
            });
        }
    }
};
