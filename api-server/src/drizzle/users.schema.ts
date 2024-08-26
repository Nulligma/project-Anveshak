import { relations, type InferSelectModel } from "drizzle-orm";
import {
  pgTable,
  text,
  uuid,
  varchar,
  primaryKey,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { pgCards } from "./cards.schema";
import { pgReveiws } from "./articles.schema";

//#region Users
export const pgUsers = pgTable(
  "users",
  {
    userId: uuid("user_id").notNull().primaryKey(),
    userEmail: varchar("user_email", { length: 100 }).notNull().unique(),
    userMongoId: varchar("user_mongo_id", { length: 100 }).notNull().unique(),
  },
  (table) => {
    return {
      emailIdx: uniqueIndex("email_idx").on(table.userEmail),
    };
  }
);

export const userRelations = relations(pgUsers, ({ many }) => ({
  decks: many(pgDecks),
  reviews: many(pgReveiws),
}));

export const selectUserSchema = createSelectSchema(pgUsers, {
  userEmail: (schema) =>
    schema.userEmail.email().regex(/^([\w.%-]+@[a-z0-9.-]+\.[a-z]{2,6})*$/i),
});

export const verifyUserSchema = z.object({
  query: selectUserSchema.pick({
    userEmail: true,
  }),
});

export type User = InferSelectModel<typeof pgUsers>;
//#endregion

//#region User Decks
export const pgDecks = pgTable("Deck", {
  deckId: uuid("deck_id").notNull().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => pgUsers.userId),
  deckName: varchar("deck_name", { length: 30 }).notNull(),
  deckDetails: text("deck_details"),
});

export const deckRelations = relations(pgDecks, ({ one, many }) => ({
  deckCards: many(pgDeckCards),
  user: one(pgUsers, {
    fields: [pgDecks.userId],
    references: [pgUsers.userId],
  }),
}));
//#endregion

//#region Cards in deck
export const pgDeckCards = pgTable(
  "Deck_cards",
  {
    deckId: uuid("deck_id")
      .notNull()
      .references(() => pgDecks.deckId),
    cardId: uuid("deck_id")
      .notNull()
      .references(() => pgCards.cardId),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.deckId, table.cardId] }),
    };
  }
);
export const deckCardsRelations = relations(pgDeckCards, ({ one }) => ({
  deck: one(pgDecks, {
    fields: [pgDeckCards.deckId],
    references: [pgDecks.deckId],
  }),
  cards: one(pgCards, {
    fields: [pgDeckCards.cardId],
    references: [pgCards.cardId],
  }),
}));
//#endregion
