import {
  AddMyBlog,
  DeleteMyBlog,
  UpdateBlogDeployStatus,
  GetMyBlogs,
  UpdateMyBlog,
  DeleteDatabase,
} from "@/SQLite/SqLiteProcess";
import {
  GetFireBlogs,
  DeleteFireBlog,
  UpdateFireBlog,
  DeployBlog,
  CheckBlogExists,
} from "@/Firebase/FireStore/FireStoreBlog";

export async function getFireBlog() {
  const fetchedBlogs = await GetFireBlogs();
  return fetchedBlogs;
}
export async function getMyBlog() {
  const fetchedBlogs = await GetMyBlogs();
  return fetchedBlogs;
}
export async function addmyBlog(name: string, content: string) {
  try {
    await AddMyBlog(name, content);
  } catch (error) {
    alert("failed");
  }
}
export async function updateBlog(
  name: string,
  content: string,
  id: number,
  session: string
) {
  if (!session) return null;

  const blog = await CheckBlogExists(session, id);
  if (blog) {
    await UpdateFireBlog(blog, { name, content });
    await UpdateMyBlog(id, name, content);
  } else {
    await UpdateMyBlog(id, name, content);
  }
}

export async function deleteBlog(id: number, session: string) {
  if (!session) return null;

  const blog = await CheckBlogExists(session, id);
  if (blog) {
    await DeleteFireBlog(blog);
    await DeleteMyBlog(id);
  } else {
    await DeleteMyBlog(id);
  }
}
export async function deployBlog(
  id: number,
  name: string,
  content: string,
  session: string
) {
  if (!session) {
    console.log("Session bulunamadı!");
    console.log("1");
    return;
  }
  await DeployBlog(id, name, content, session);
  await UpdateBlogDeployStatus(id, 1);
  console.log("Blog başarıyla eklendi!");
  console.log("1");
}
export async function undeployBlog(id: number, session: string) {
  if (!session) return null;

  const blog = await CheckBlogExists(session, id);
  if (blog) {
    await DeleteFireBlog(blog);
    await UpdateBlogDeployStatus(id, 0);
  } else {
    throw Error("blog not found");
  }
}
