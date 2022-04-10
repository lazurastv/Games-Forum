INSERT INTO app_user (id, username, email, password, profile_picture_path, short_description, role, enabled, locked, last_used) VALUES (nextval('user_sequence'), 'a', 'a@user.com', '$2a$12$Sze0MTTDf1ySwSeQ6yllyeQZawfEC/iBddWcDPhHOGawKsAmAsGPq', 'path', 'description', 'ADMIN', TRUE, FALSE, '2014-07-02 06:14:00.742000000')
INSERT INTO app_user (id, username, email, password, profile_picture_path, short_description, role, enabled, locked, last_used) VALUES (nextval('user_sequence'), 'b', 'b@user.com', '$2a$12$Sze0MTTDf1ySwSeQ6yllyeQZawfEC/iBddWcDPhHOGawKsAmAsGPq', 'path', 'description', 'EDITOR', TRUE, FALSE, '2014-07-02 06:14:00.742000000')
INSERT INTO app_user (id, username, email, password, profile_picture_path, short_description, role, enabled, locked, last_used) VALUES (nextval('user_sequence'), 'c', 'c@user.com', '$2a$12$Sze0MTTDf1ySwSeQ6yllyeQZawfEC/iBddWcDPhHOGawKsAmAsGPq', 'path', 'description', 'EDITOR', FALSE, FALSE, '2014-07-02 06:14:00.742000000')
INSERT INTO app_user (id, username, email, password, profile_picture_path, short_description, role, enabled, locked, last_used) VALUES (nextval('user_sequence'), 'd', 'd@user.com', '$2a$12$Sze0MTTDf1ySwSeQ6yllyeQZawfEC/iBddWcDPhHOGawKsAmAsGPq', 'path', 'description', 'EDITOR', TRUE, TRUE, '2014-07-02 06:14:00.742000000')

INSERT INTO content (id, title, introduction, path, author_id, publish_date, dtype) VALUES (nextval('content_sequence'), 'Top 10 drzwi w grach', 'iiiiiiiiiiiiiiiii', '/blah/blah', 1, '2014-07-02 06:14:00.742000000', 'A')
INSERT INTO content (id, title, introduction, path, author_id, publish_date, dtype) VALUES (nextval('content_sequence'), 'Kraby w grach', 'iiiiiiiiiiiiiiiii', '/blah/blah', 1, '2014-07-02 06:14:00.742000000', 'A')
INSERT INTO content (id, title, introduction, path, author_id, publish_date, dtype) VALUES (nextval('content_sequence'), 'Czy Dying Light 2 spełniło oczekiwnia?', 'iiiiiiiiiiiii', '/blah/blah', 3, '2014-07-02 06:14:00.742000000', 'A')
INSERT INTO content (id, title, introduction, path, author_id, publish_date, dtype) VALUES (nextval('content_sequence'), 'Kiedy Wiedźmin 4?', 'iiiiiiiiiiiiiiiii', '/blah/blah', 2, '2014-07-02 06:14:00.742000000', 'A')
INSERT INTO content (id, title, introduction, path, author_id, publish_date, dtype) VALUES (nextval('content_sequence'), 'Dlaczego GTA 6 nigdy nie powstanie', 'iiiiiiiiiiiiiiiii', '/blah/blah', 4, '2014-07-02 06:14:00.742000000', 'A')

INSERT INTO likes (id, content_id, author_id, is_like) VALUES (nextval('like_sequence'), 1, 2, TRUE)
INSERT INTO likes (id, content_id, author_id, is_like) VALUES (nextval('like_sequence'), 1, 1, TRUE)
INSERT INTO likes (id, content_id, author_id, is_like) VALUES (nextval('like_sequence'), 1, 3, FALSE)
INSERT INTO likes (id, content_id, author_id, is_like) VALUES (nextval('like_sequence'), 2, 1, TRUE)
INSERT INTO likes (id, content_id, author_id, is_like) VALUES (nextval('like_sequence'), 3, 2, TRUE)
INSERT INTO likes (id, content_id, author_id, is_like) VALUES (nextval('like_sequence'), 4, 3, TRUE)

INSERT INTO comments (id, content_id, author_id, comment) VALUES (nextval('comment_sequence'), 1, 4, 'Animacje otwierania drzwi w RE Remaster UwU')
INSERT INTO comments (id, content_id, author_id, comment) VALUES (nextval('comment_sequence'), 1, 3, 'Czy autor tekstu zdał mature z polskiego?!?!')
INSERT INTO comments (id, content_id, author_id, comment) VALUES (nextval('comment_sequence'), 1, 2, 'Mógłbym godzinami otweriać i zamykać drzwi')
INSERT INTO comments (id, content_id, author_id, comment) VALUES (nextval('comment_sequence'), 2, 1, 'I''ll have 2 Number 9s, a number 9 large, number 6 with extra dip, number 7, 2 number 45s, one with cheese, and a large soda.')
INSERT INTO comments (id, content_id, author_id, comment) VALUES (nextval('comment_sequence'), 2, 3, 'Od san andreas to już nie to samo')
INSERT INTO comments (id, content_id, author_id, comment) VALUES (nextval('comment_sequence'), 3, 1, 'Kiedyś krab złamał mi palec')

-- INSERT INTO game (id, title, introduction, path, game_publish_date, developer, editor_score) VALUES (nextval('content_sequence'), 'GTA V', 'Taka gra, że się strzela i jeździ i parodiuje ameryke', '/blah/blah', '2013-09-17', 'Rockstar', 4.5)

-- INSERT INTO comments (id, content_id, author_id, content) VALUES (nextval('comment_sequence'), 6, 1, 'Kiedyś krab złamał mi palec')
