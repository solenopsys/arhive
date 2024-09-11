create table products
(
	name varchar(255) not null ,
	data jsonb not null,
    category_id integer not null,
    filter_id integer not null,
	primary key (name)
);

create table categories
(
    id integer not null,
    name varchar(255) not null,
    title text not null,
    primary key (id)
);

create table filters
(
    id integer not null,
    name varchar(255) not null,
	title text not null ,
    primary key (id)
);

create table fields
(
    id integer not null,
    label varchar(255) not null,
	sortable bool not null ,
    hidable bool not null ,
    dense bool not null ,
    primary key (id)
);

create table dictionaries
(
    id integer not null,
    type varchar(255) not null,
    name text not null,
    primary key (id,type)
);

select count(*),filter_id from products group by filter_id