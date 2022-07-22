SET
    foreign_key_checks = 0;

DROP TABLE IF EXISTS categories;

DROP TABLE IF EXISTS invoices;

DROP TABLE IF EXISTS invoice_items;

DROP TABLE IF EXISTS statistic_data;

DROP TABLE IF EXISTS users;

SET
    foreign_key_checks = 1;

CREATE TABLE categories (
    categoryID INT NOT NULL AUTO_INCREMENT,
    cat_name varchar(255) NOT NULL,
    PRIMARY KEY (categoryID)
);

CREATE TABLE statistic_data (
    statisticID INT NOT NULL AUTO_INCREMENT,
    amt_householdMem INT NOT NULL,
    amt_children0_6 INT NOT NULL,
    amt_children7_18 INT NOT NULL,
    amt_flatmates INT NOT NULL,
    amt_partners INT NOT NULL,
    otherCaringResp INT NOT NULL,
    partner_sexualOrient varchar(255) NOT NULL,
    partner_relStyle varchar(255) NOT NULL,
    employment_status varchar(255) NOT NULL,
    domesticHelp TINYINT NOT NULL,
    PRIMARY KEY (statisticID)
);

CREATE TABLE users (
    userID INT NOT NULL AUTO_INCREMENT,
    fk_statisticsID INT,
    username VARCHAR(30) NOT NULL UNIQUE,
    firstname varchar(255) NOT NULL,
    lastname varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password VARCHAR(200) NOT NULL,
    PRIMARY KEY (userID),
    FOREIGN KEY (fk_statisticsID) REFERENCES statistic_data(statisticID) ON DELETE CASCADE
);

CREATE TABLE invoices (
    invoiceID INT NOT NULL AUTO_INCREMENT,
    fk_userID INT NOT NULL,
    nameTo varchar(255) NOT NULL,
    emailTo varchar(255) NOT NULL,
    invoiceDate DATE NOT NULL,
    PRIMARY KEY (invoiceID),
    FOREIGN KEY (fk_userID) REFERENCES users(userID) ON DELETE CASCADE
);

CREATE TABLE invoice_items (
    invoiceItemID INT NOT NULL AUTO_INCREMENT,
    fk_invoiceID INT NOT NULL,
    fk_categoriesID INT NOT NULL,
    hour NUMERIC(10, 2) NOT NULL,
    rate NUMERIC(10, 2) NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    PRIMARY KEY (invoiceItemID),
    FOREIGN KEY (fk_invoiceID) REFERENCES invoices(invoiceID) ON DELETE CASCADE,
    FOREIGN KEY (fk_categoriesID) REFERENCES categories(categoryID) ON DELETE CASCADE
);

INSERT INTO
    categories (cat_name)
VALUES
    ('Child care'),
    ('Cooking'),
    ('Cleaning'),
    ('Shopping'),
    ('Laundry'),
    ('Transport'),
    ('Care (other)'),
    ('Emotional Labor'),
    ('Management');

INSERT INTO
    statistic_data (
        amt_householdMem,
        amt_children0_6,
        amt_children7_18,
        amt_flatmates,
        amt_partners,
        otherCaringResp,
        partner_sexualOrient,
        partner_relStyle,
        employment_status,
        domesticHelp
    )
VALUES
    (
        5,
        1,
        1,
        1,
        1,
        2,
        'Queer',
        'Monogamous',
        'Full-time wage job',
        0
    ),
    (
        5,
        1,
        1,
        1,
        1,
        2,
        'Hetero',
        'Polyamorous',
        'Part-time wage job',
        1
    ),
    (
        5,
        1,
        1,
        1,
        1,
        2,
        'Other',
        'None',
        'No wage job',
        0
    );

INSERT INTO
    users (
        fk_statisticsID,
        username,
        firstname,
        lastname,
        email,
        password
    )
VALUES
    (
        1,
        'user1',
        'Silvia',
        'Federici',
        'Silvia.Federici@unimi.it',
        '$2b$12$eFzMWbS9SogNtxkmo3J7aO8FQMFQSKbtpwLMIOVsF6GGKpTQdgq.W'
    ),
    (
        2,
        'user2',
        'Mariarosa',
        'Dalla Costa',
        'Mariarosa.Dalla-Costa@@unipd.it',
        '$2b$12$WZcGPyrkCvD5e8m0Qz/nFOdBryUcsp6uDlE2MDo/AjuBhPrQBCfI6'
    ),
    (
        3,
        'user3',
        'Selma',
        'James',
        'Selma.James@riseup.net',
        '$2b$12$tiAz4eaXlpU.CdltUVvw6udLA2BWsitk5zXM2XOm2IpAeAiFfMCdy'
    );

INSERT INTO
    invoices (
        fk_userID,
        nameTo,
        emailTo,
        invoiceDate
    )
VALUES
    (
        1,
        'Patriarchy',
        'info@patriarchy.com',
        '2022-05-24'
    ),
    (
        2,
        'Patriarcato',
        'info@patriarcato.it',
        '2022-07-22'
    ),
    (
        3,
        'Patriarchy',
        'info@patriarchy.uk',
        '2022-05-24'
    );

INSERT INTO
    invoice_Items (
        fk_invoiceId,
        fk_categoriesId,
        hour,
        rate,
        amount
    )
VALUES
    -- for categoryId 1 
    (1, 1, 0, 15, 0),
    (2, 1, 0, 15, 0),
    (3, 1, 0, 15, 0),
    -- for categoryId 2
    (1, 2, 3, 15, 45),
    (2, 2, 3, 15, 45),
    (3, 2, 3, 15, 45),
    -- for categoryId 3
    (1, 3, 3, 15, 45),
    (2, 3, 3, 15, 45),
    (3, 3, 3, 15, 45),
    -- for categoryId 4
    (1, 4, 3, 15, 45),
    (2, 4, 3, 15, 45),
    (3, 4, 3, 15, 45),
    -- for categoryId 5
    (1, 5, 3, 15, 45),
    (2, 5, 3, 15, 45),
    (3, 5, 3, 15, 45),
    -- for categoryId 6
    (1, 6, 3, 15, 45),
    (2, 6, 3, 15, 45),
    (3, 6, 3, 15, 45),
    -- for categoryId 7
    (1, 7, 3, 15, 45),
    (2, 7, 3, 15, 45),
    (3, 7, 3, 15, 45),
    -- for categoryId 8
    (1, 8, 3, 15, 45),
    (2, 8, 3, 15, 45),
    (3, 8, 3, 15, 45),
    -- for categoryId 9
    (1, 9, 10, 15, 150),
    (2, 9, 10, 15, 150),
    (3, 9, 10, 15, 150);