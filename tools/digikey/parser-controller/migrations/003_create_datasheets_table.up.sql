CREATE TABLE datasheets
(
    id        SERIAL PRIMARY KEY,
    url       VARCHAR(1024) unique NOT NULL, -- unique string,
    change_at TIMESTAMP            NOT NULL DEFAULT NOW(),
    status    VARCHAR(16)          NOT NULL, -- one of: new, running, done, error
    file_name VARCHAR(1024),                 -- unique string,
    file_size int
);