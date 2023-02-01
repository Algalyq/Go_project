
    


CREATE TABLE comments (
     id            serial       not null unique,
    product_id int not null ,
    user_id int not null,
    comment_body varchar(255) not null,
    creation_date date not null)
