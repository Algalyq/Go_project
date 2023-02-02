CREATE TABLE orders (
     id            serial       not null unique,
    order_number         varchar(255) not null unique,
    user_id         int  not null REFERENCES users (id),
    username      varchar(255) not null ,
    full_name varchar(255) not null,
    flat_number int not null,
    street_name varchar(255) not null,
    area varchar(255) not null,
    city varchar(255) not null,
    zip_code int not null,
    order_date date not null,
    
    PRIMARY KEY (id,order_number,user_id)
    )