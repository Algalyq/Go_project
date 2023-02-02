CREATE TABLE seller (
     id            serial       not null unique,
    full_name varchar(255) not null,
    user_name varchar(255) not null,
    user_password varchar(255) not null,
    mobile_number varchar(255) not null unique,
    email varchar(255) not null,
    card_number varchar(255) not null,
    
    PRIMARY KEY (id)
    )

