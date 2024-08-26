import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { pgCards, pgCategories } from "./cards.schema";
import { pgUsers } from "./users.schema";

//#region Articles
export const pgArticles = pgTable("articles", {
  articleId: uuid("article_id").notNull().primaryKey(),
  articleTitle: varchar("article_title", { length: 255 }).notNull(),
  articleMongoId: varchar("article_mongo_id", { length: 100 })
    .notNull()
    .unique(),
});
export const articleRelations = relations(pgArticles, ({ many }) => ({
  slots: many(pgSlots),
  reviews: many(pgReveiws),
}));
//#endregion

//#region Slots of cards for article creation
export const pgSlots = pgTable(
  "slots",
  {
    cardId: uuid("card_id")
      .notNull()
      .references(() => pgCards.cardId),
    categoryId: integer("category_id")
      .notNull()
      .references(() => pgCategories.categoryId),
    articleId: uuid("article_id")
      .notNull()
      .references(() => pgArticles.articleId),
  },
  (table) => {
    return {
      pk: primaryKey({
        columns: [table.cardId, table.categoryId, table.articleId],
      }),
    };
  }
);

export const slotRelations = relations(pgSlots, ({ one }) => ({
  card: one(pgCards, {
    fields: [pgSlots.cardId],
    references: [pgCards.cardId],
  }),
  category: one(pgCategories, {
    fields: [pgSlots.categoryId],
    references: [pgCategories.categoryId],
  }),
  article: one(pgArticles, {
    fields: [pgSlots.articleId],
    references: [pgArticles.articleId],
  }),
}));
//#endregion

//#region reviews of an article
export const pgReveiws = pgTable("reviews", {
  reviewId: serial("review_id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => pgUsers.userId),
  articleId: uuid("article_id")
    .notNull()
    .references(() => pgArticles.articleId),
  rating: integer("rating"),
  comment: text("comment"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const reviewRelations = relations(pgReveiws, ({ one }) => ({
  user: one(pgUsers, {
    fields: [pgReveiws.userId],
    references: [pgUsers.userId],
  }),
  article: one(pgArticles, {
    fields: [pgReveiws.articleId],
    references: [pgArticles.articleId],
  }),
}));
//#endregion
