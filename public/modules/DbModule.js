var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/*
::
::PLEASE FOLLOW GOOGLE DOCUMNETATION FOR THIS PAGE FOR BETTER UNDERSTANDING
::SETTING UP APPLICATION STORAGE
::SEARCH FOR PWA WITH INDEXED_DB
::
*/
export const BlogDB = "BlogsDB";
export const blogsStoreName = "Blogs";
const dbOpenRequest = indexedDB.open(BlogDB);
let db = null;
/*
::
::CREATING THE DATABASE & TABLES
::
*/
dbOpenRequest.onupgradeneeded = () => __awaiter(void 0, void 0, void 0, function* () {
    db = yield dbOpenRequest.result;
    yield db.createObjectStore("Blogs", { keyPath: "id" });
    console.log("db upgraded");
});
