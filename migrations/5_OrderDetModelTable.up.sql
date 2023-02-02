

CREATE TABLE order_details (
     id            serial       not null unique,
    user_id         int  not null REFERENCES users(id),
    order_number int not null,
    product_id int not null ,
    product_price int not null,
    product_quantity int not null,
    order_date date not null,
    
    PRIMARY KEY (id, user_id,order_number)
    )