CREATE TABLE pages
(
    id             SERIAL PRIMARY KEY,
    payload        json      NOT NULL,
    change_at      TIMESTAMP NOT NULL DEFAULT NOW(),
    job_id         INTEGER REFERENCES jobs (id),
    start_position int,
    end_position   int,
    payload_size   int
);