/*
::
::type ALIASING
::
*/
type HI = HTMLInputElement;
type HD = HTMLDivElement;

/*
::
::APPLICATION DOM ELEMENTS
::EVERYTHING FROM index.html file(in public folder).
::
*/

export const submitBtn = document.getElementById("submitBtn") as HI;
export const pageBody = document.getElementById("pageBody") as HTMLBodyElement;
export const modal = document.getElementById("modal")!;
export const modalContent = document.getElementById("modalContent")!;
export const title = document.getElementById("title") as HI;
export const blogIdInput = document.getElementById("blogIdInput") as HI;
export const body = document.getElementById("body") as HI;
export const category = document.getElementById("category") as HI;
export const errors = document.getElementById("errors") as HD;
export const blogs = document.getElementById("blogs")!;
export const footer = document.getElementById("footer")!;
export const searchBox = document.getElementById("searchBox")! as HD;
export const searchBoxInput = document.getElementById("searchBoxInput")! as HI;
export const notFound = document.getElementById("notFound")!;
export const found = document.getElementById("found")!;
export const preferences = document.getElementById("preferences")!;
export const preferencesColors = document.querySelectorAll(
  "#preferences .color"
)!;
export const preferenceIcon = document.getElementById("preferenceIcon")!;
