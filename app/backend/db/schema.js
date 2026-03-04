const { mysqlTable, varchar, decimal, text } = require("drizzle-orm/mysql-core");

const products = mysqlTable("products", {
  id: varchar("id", { length: 50 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  description: text("description"),
});

module.exports = { products };