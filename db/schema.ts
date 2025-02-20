import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const blogTable = sqliteTable("blog_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  content: text().notNull(),
   
});
