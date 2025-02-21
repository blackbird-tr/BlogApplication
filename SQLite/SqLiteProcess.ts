import { drizzle } from "drizzle-orm/expo-sqlite";
import { blogTable } from "../db/schema";
import * as SQLite from "expo-sqlite";
import { eq } from "drizzle-orm";
 
const expo = SQLite.openDatabaseSync("db.db");
const db = drizzle(expo);
 
async function executeQuery<T>(query: Promise<T>, errorMessage: string): Promise<T> {
  try {
    return await query;
  } catch (error) {
    throw new Error(`${errorMessage}: ${error}`);
  }
}

export async function DeleteDatabase() {
  return executeQuery(db.delete(blogTable), "Database deletion failed");
}

export async function GetMyBlogs() {
  return executeQuery(db.select().from(blogTable), "Fetching blogs failed");
}

export async function AddMyBlog(name: string, content: string) {
  return executeQuery(
    db.insert(blogTable).values([{ name, content }]),
    "Insert failed"
  );
}

export async function UpdateMyBlog(id: number, name: string, content: string) {
  return executeQuery(
    db.update(blogTable).set({ name, content }).where(eq(blogTable.id, id)),
    "Update failed"
  );
}
export async function UpdateBlogDeployStatus(id: number, isDeploy: number) {
  return executeQuery(
    db.update(blogTable)
      .set({ isDeploy })
      .where(eq(blogTable.id, id)),
    "Update deploy status failed"
  );
}


export async function DeleteMyBlog(id: number) {
  return executeQuery(
    db.delete(blogTable).where(eq(blogTable.id, id)),
    "Delete failed"
  );
}
