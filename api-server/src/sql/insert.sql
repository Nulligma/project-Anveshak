INSERT INTO users (user_email, user_mongo_id)
VALUES ('test@email.com', 'user_mongoId_1');
--
--categories
INSERT INTO categories (category_id, category_name)
VALUES (1, 'Person'),
    (2, 'Place'),
    (3, 'Object'),
    (4, 'Event');
--
--cards
INSERT INTO cards (card_mongo_id, category_id, card_name)
VALUES ('card_mongo_id_1', 1, 'Doland Trump'),
    ('card_mongo_id_2', 1, 'Osama'),
    ('card_mongo_id_3', 2, 'America'),
    ('card_mongo_id_4', 3, 'Gun'),
    ('card_mongo_id_5', 4, 'Christmast');
--
--deck
WITH x AS (
    select user_id
    from users
    where user_email = 'test@email.com'
)
INSERT INTO decks (user_id, deck_name, deck_details)
VALUES (
        (
            select user_id
            from x
        ),
        'America',
        'Cards releated to america'
    ),
    (
        (
            select user_id
            from x
        ),
        'Holidays',
        'Cards releated to holidays'
    );
--
--deck_cards
INSERT INTO deck_cards (deck_id, card_id)
VALUES (
        (
            select deck_id
            from decks
            where deck_name = 'America'
        ),
        (
            select card_id
            from cards
            where card_name = 'Doland Trump'
        )
    ),
    (
        (
            select deck_id
            from decks
            where deck_name = 'America'
        ),
        (
            select card_id
            from cards
            where card_name = 'America'
        )
    ),
    (
        (
            select deck_id
            from decks
            where deck_name = 'America'
        ),
        (
            select card_id
            from cards
            where card_name = 'Gun'
        )
    ),
    (
        (
            select deck_id
            from decks
            where deck_name = 'Holidays'
        ),
        (
            select card_id
            from cards
            where card_name = 'Christmast'
        )
    );
--
--articles
INSERT INTO articles (article_mongo_id, article_title)
VALUES (
        'article_mongo_id_1',
        'Donald kills Osama on Christmast with a gun'
    );
--
--slots
WITH x AS (
    select article_id
    from articles
    where article_mongo_id = 'article_mongo_id_1'
)
INSERT INTO slots (article_id, category_id, card_id)
VALUES (
        (
            select article_id
            from x
        ),
        1,
        (
            select card_id
            from cards
            where card_name = 'Doland Trump'
        )
    ),
    (
        (
            select article_id
            from x
        ),
        1,
        (
            select card_id
            from cards
            where card_name = 'Osama'
        )
    ),
    (
        (
            select article_id
            from x
        ),
        2,
        (
            select card_id
            from cards
            where card_name = 'America'
        )
    ),
    (
        (
            select article_id
            from x
        ),
        3,
        (
            select card_id
            from cards
            where card_name = 'Gun'
        )
    ),
    (
        (
            select article_id
            from x
        ),
        4,
        (
            select card_id
            from cards
            where card_name = 'Christmast'
        )
    );
--
--reviews
INSERT INTO reviews (user_id, article_id, rating, comment)
VALUES (
        (
            select user_id
            from users
            where user_email = 'test@email.com'
        ),
        (
            select article_id
            from articles
            where article_mongo_id = 'article_mongo_id_1'
        ),
        4,
        'Good job - 2'
    );