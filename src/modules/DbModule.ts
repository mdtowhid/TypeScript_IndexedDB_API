/*
::
::PLEASE FOLLOW GOOGLE DOCUMNETATION FOR THIS PAGE FOR BETTER UNDERSTANDING
::SETTING UP APPLICATION STORAGE
::SEARCH FOR PWA WITH INDEXED_DB
::
*/
export const BlogDB: string = "BlogsDB";
export const blogsStoreName: string = "Blogs";

const dbOpenRequest = indexedDB.open(BlogDB);
let db: any = null;

/*
::
::CREATING THE DATABASE & TABLES
::
*/

dbOpenRequest.onupgradeneeded = async () => {
  db = await dbOpenRequest.result;
  await db.createObjectStore("Blogs", { keyPath: "id" });
  console.log("db upgraded");
};
