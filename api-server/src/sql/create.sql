CREATE TABLE Users (
    user_id uuid primary key DEFAULT gen_random_uuid(),
    user_email VARCHAR(100) UNIQUE NOT NULL,
    user_mongo_id VARCHAR(100) UNIQUE NOT NULL
);
create TABLE Articles (
    article_id uuid primary key DEFAULT gen_random_uuid(),
    article_mongo_id VARCHAR(100) UNIQUE NOT NULL,
    article_title VARCHAR(255) not null
);
create table Categories (
    category_id serial primary key,
    category_name VARCHAR(30) not null
);
create table Cards(
    card_id uuid primary key DEFAULT gen_random_uuid(),
    card_mongo_id VARCHAR(100) UNIQUE NOT NULL,
    category_id INTEGER NOT NULL REFERENCES Categories(category_id),
    card_name VARCHAR(30) not null
);
create table Decks (
    deck_id uuid primary key DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES Users(user_id),
    deck_name VARCHAR(30) not null,
    deck_details TEXT
);
create table Deck_cards(
    deck_id uuid not null REFERENCES Decks(deck_id),
    card_id uuid not null REFERENCES Cards(card_id),
    primary key (deck_id, card_id)
);
CREATE TABLE Slots (
    card_id uuid NOT NULL REFERENCES Cards(card_id),
    category_id INTEGER NOT NULL REFERENCES Categories(category_id),
    article_id uuid NOT NULL REFERENCES Articles(article_id),
    primary key (card_id, article_id, category_id)
);
CREATE TABLE Reviews (
    review_id SERIAL PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES Users(user_id),
    article_id uuid NOT NULL REFERENCES Articles(article_id),
    rating INT CHECK (
        rating >= 1
        AND rating <= 5
    ),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
--Indexes
CREATE INDEX idx_users_email ON Users(user_email);