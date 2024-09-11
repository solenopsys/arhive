CREATE TABLE jobs
(
    id         SERIAL PRIMARY KEY,
    url        VARCHAR(1024) NOT NULL,
    change_at  TIMESTAMP     NOT NULL DEFAULT NOW(),
    status     VARCHAR(16)   NOT NULL DEFAULT 'new',
    components BIGINT        NOT NULL DEFAULT 0,
    type       VARCHAR(16)   NOT NULL DEFAULT 'unknown'
);