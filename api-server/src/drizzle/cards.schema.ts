import { relations, type InferSelectModel } from "drizzle-orm";
import { integer, pgTable, serial, uuid, varchar } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { pgSlots } from "./articles.schema";

export const pgCards = pgTable("cards", {
  cardId: uuid("card_id").notNull().primaryKey(),
  categoryId: integer("category_id")
    .notNull()
    .references(() => pgCategories.categoryId),
  cardName: varchar("card_name", { length: 30 }).notNull(),
  cardMongoId: varchar("card_mongo_id", { length: 100 }).notNull().unique(),
});

export const cardRelation = relations(pgCards, ({ one, many }) => ({
  slots: many(pgSlots),
  cards: one(pgCategories, {
    fields: [pgCards.categoryId],
    references: [pgCategories.categoryId],
  }),
}));

//#region Categories of cards and slots
export const pgCategories = pgTable("categories", {
  categoryId: serial("category_id").primaryKey(),
  categoryName: varchar("category_name", { length: 30 }).notNull(),
});

export const categoryRelations = relations(pgCategories, ({ many }) => ({
  cards: many(pgCards),
  slots: many(pgSlots),
}));
//#endregion
