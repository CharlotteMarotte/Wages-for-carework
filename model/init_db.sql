DROP TABLE IF EXISTS Categories;

CREATE TABLE Categories (
    ID INT NOT NULL AUTO_INCREMENT,
    cat_name varchar(255) NOT NULL,
    PRIMARY KEY (ID)
);

DROP TABLE IF EXISTS Invoice;

CREATE TABLE Invoice (
    ID INT NOT NULL AUTO_INCREMENT,
    NameFrom varchar(255) NOT NULL,
    EmailFrom varchar(255) NOT NULL,
    NameTo varchar(255),
    EmailTo varchar(255),
    InvoiceDate DATE NOT NULL,
    PRIMARY KEY (ID)
);

DROP TABLE IF EXISTS Invoice_Items;

CREATE TABLE Invoice_Items (
    ID INT NOT NULL AUTO_INCREMENT,
    Fk_invoiceID INT NOT NULL,
    Fk_categoriesID INT NOT NULL,
    hour INT NOT NULL,
    rate INT NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (Fk_invoiceID) REFERENCES Invoice(ID) ON DELETE CASCADE,
    FOREIGN KEY (Fk_categoriesID) REFERENCES Categories(ID) ON DELETE CASCADE
);

-- ALTER TABLE
--     Invoice_Items
-- ADD
--     CONSTRAINT Invoice_Items_fk0 FOREIGN KEY (Fk_invoiceID) REFERENCES Invoice(ID);

-- ALTER TABLE
--     Invoice_Items
-- ADD
--     CONSTRAINT Invoice_Items_fk1 FOREIGN KEY (Fk_categoriesID) REFERENCES Categories(ID);

INSERT INTO
    Categories (cat_name)
VALUES
    ('Child care'),
    ('Cooking'),
    ('Cleaning'),
    ('Shopping'),
    ('Laundry'),
    ('Transport'),
    ('Care (other)'),
    ('Emotional Labor');
    ('Management');

INSERT INTO
    Invoice (
        NameFrom,
        EmailFrom,
        NameTo,
        EmailTo,
        InvoiceDate
    )
VALUES
    (
        'Silvia Federici',
        'Silvia.Federici@unimi.it',
        'Patriarchy',
        'info@patriarchy.com',
        '2022-05-24'
    );

INSERT INTO
    Invoice_Items (Fk_invoiceID, Fk_categoriesID, hour, rate)
VALUES
    (1, 1, 0, 0);

INSERT INTO
    Invoice_Items (Fk_invoiceID, Fk_categoriesID, hour, rate)
VALUES
    (1, 2, 3, 15);

INSERT INTO
    Invoice_Items (Fk_invoiceID, Fk_categoriesID, hour, rate)
VALUES
    (1, 3, 3, 15);

INSERT INTO
    Invoice_Items (Fk_invoiceID, Fk_categoriesID, hour, rate)
VALUES
    (1, 4, 3, 15);

INSERT INTO
    Invoice_Items (Fk_invoiceID, Fk_categoriesID, hour, rate)
VALUES
    (1, 5, 3, 5);

INSERT INTO
    Invoice_Items (Fk_invoiceID, Fk_categoriesID, hour, rate)
VALUES
    (1, 6, 3, 5);

INSERT INTO
    Invoice_Items (Fk_invoiceID, Fk_categoriesID, hour, rate)
VALUES
    (1, 7, 3, 5);

INSERT INTO
    Invoice_Items (Fk_invoiceID, Fk_categoriesID, hour, rate)
VALUES
    (1, 8, 3, 5);