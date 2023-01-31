CREATE TABLE orders(
     id            serial       not null unique,
    order_number         varchar(255) not null unique,
    user_id         int  not null ,
    username      varchar(255) not null ,
    full_name varchar(255) not null,
    flat_number int not null,
    street_name varchar(255) not null,
    area varchar(255) not null,
    city varchar(255) not null,
    zip_code int not null,
    order_date date not null,


)
CREATE TABLE order_details(
     id            serial       not null unique,
    user_id         int  not null,
    order_number int not null  ,
    product_id int not null ,
    product_price int not null,
    product_quantity int not null,
    order_date date not null,

)

CREATE TABLE products(
     id            serial       not null unique,
    product_id int not null unique,
    card_id int not null unique,
    seller_id int not null ,
    product_title varchar(255) not null,
    catalog_id int not null unique,
    price int not null,
    quantity int not null,
    product_description varchar(255) not null,
    image1 bytea,
    image2 bytea,
    image3 bytea,
    created_at date not null,


)
CREATE TABLE seller(
     id            serial       not null unique,
    full_name varchar(255) not null,
    user_name varchar(255) not null,
    user_password varchar(255) not null,
    mobile_number varchar(255) not null unique,
    email varchar(255) not null,
    card_number varchar(255) not null,
)
CREATE TABLE category(
     id            serial       not null unique,
    category_name varchar(255) not null,
)
CREATE TABLE comments(
     id            serial       not null unique,
    product_id int not null ,
    user_id int not null,
    comment_body varchar(255) not null,
    creation_date date not null,

)
