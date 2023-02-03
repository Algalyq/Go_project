

CREATE TABLE products ( 
     id            serial       not null unique,
    product_id int not null unique REFERENCES order_details(id),
    card_id int not null unique,
    seller_id int not null REFERENCES seller(id),
    product_title varchar(255) not null,
    category_id int not null unique REFERENCES category(id),
    price int not null,
    quantity int not null,
    product_description varchar(255) not null,
    image1 bytea not null,
    image2 bytea not null,
    image3 bytea not null,
    created_at date not null,
    
    PRIMARY KEY (id,product_id,seller_id,category_id))
