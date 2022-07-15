﻿USE [Tabloid]
GO

ALTER TABLE PostTag
   DROP CONSTRAINT FK_PostTag_Post;

ALTER TABLE PostTag
    ADD CONSTRAINT FK_PostTag_Post
    FOREIGN KEY (PostId)
    REFERENCES Post (Id)
    ON DELETE CASCADE;

ALTER TABLE Comment
    DROP CONSTRAINT FK_Comment_Post;

ALTER TABLE Comment
    ADD CONSTRAINT FK_Comment_Post
    FOREIGN KEY (PostId)
    REFERENCES Post (Id)
    ON DELETE CASCADE;

ALTER TABLE PostReaction
    DROP CONSTRAINT FK_PostReaction_Post;

ALTER TABLE PostReaction
    ADD CONSTRAINT FK_PostReaction_Post
    FOREIGN KEY (PostId)
    REFERENCES Post (Id)
    ON DELETE CASCADE;