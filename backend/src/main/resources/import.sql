INSERT INTO article (id, title, introduction, content_path, image_path) VALUES (nextval('article_sequence'), 'title1', 'iiiiiiiiiiiiiiiii', '/blah/blah', '/blah/blah');
INSERT INTO article (id, title, introduction, content_path, image_path) VALUES (nextval('article_sequence'), 'title2', 'iiiiiiiiiiiiiiiii', '/blah/blah', '/blah/blah');
INSERT INTO article (id, title, introduction, content_path, image_path) VALUES (nextval('article_sequence'), 'title3', 'iiiiiiiiiiiiiiiii', '/blah/blah', '/blah/blah');
INSERT INTO article (id, title, introduction, content_path, image_path) VALUES (nextval('article_sequence'), 'title4', 'iiiiiiiiiiiiiiiii', '/blah/blah', '/blah/blah');
INSERT INTO article (id, title, introduction, content_path, image_path) VALUES (nextval('article_sequence'), 'title5', 'iiiiiiiiiiiiiiiii', '/blah/blah', '/blah/blah');


INSERT INTO app_user (id, username, email, password, profile_picture_path, short_description, role, enabled, locked) VALUES (nextval('user_sequence'), 'a', 'a@user.com', '$2a$12$Sze0MTTDf1ySwSeQ6yllyeQZawfEC/iBddWcDPhHOGawKsAmAsGPq', 'path', 'description', 'ADMIN', TRUE, FALSE);
INSERT INTO app_user (id, username, email, password, profile_picture_path, short_description, role, enabled, locked) VALUES (nextval('user_sequence'), 'b', 'b@user.com', '$2a$12$Sze0MTTDf1ySwSeQ6yllyeQZawfEC/iBddWcDPhHOGawKsAmAsGPq', 'path', 'description', 'EDITOR', TRUE, FALSE);