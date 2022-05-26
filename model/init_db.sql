SET
    foreign_key_checks = 0;

DROP TABLE IF EXISTS categories;

DROP TABLE IF EXISTS invoices;

DROP TABLE IF EXISTS invoice_items;

SET
    foreign_key_checks = 1;

CREATE TABLE categories (
    id INT NOT NULL AUTO_INCREMENT,
    cat_name varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE invoices (
    id INT NOT NULL AUTO_INCREMENT,
    nameFrom varchar(255) NOT NULL,
    emailFrom varchar(255) NOT NULL,
    nameTo varchar(255) NOT NULL,
    emailTo varchar(255) NOT NULL,
    invoiceDate DATE NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE invoice_items (
    id INT NOT NULL AUTO_INCREMENT,
    fk_invoiceID INT NOT NULL,
    fk_categoriesID INT NOT NULL,
    hour INT NOT NULL,
    rate INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (fk_invoiceID) REFERENCES invoices(id) ON DELETE CASCADE,
    FOREIGN KEY (fk_categoriesID) REFERENCES categories(id) ON DELETE CASCADE
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
    invoices (
        nameFrom,
        emailFrom,
        nameTo,
        emailTo,
        invoiceDate
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
    invoice_Items (fk_invoiceId, fk_categoriesId, hour, rate)
VALUES
    (1, 1, 0, 0);

INSERT INTO
    invoice_Items (fk_invoiceId, fk_categoriesId, hour, rate)
VALUES
    (1, 2, 3, 15);

INSERT INTO
    invoice_Items (fk_invoiceId, fk_categoriesId, hour, rate)
VALUES
    (1, 3, 3, 15);

INSERT INTO
    invoice_Items (fk_invoiceID, fk_categoriesId, hour, rate)
VALUES
    (1, 4, 3, 15);

INSERT INTO
    invoice_Items (fk_invoiceID, fk_categoriesID, hour, rate)
VALUES
    (1, 5, 3, 5);

INSERT INTO
    invoice_Items (fk_invoiceID, fk_categoriesID, hour, rate)
VALUES
    (1, 6, 3, 5);

INSERT INTO
    invoice_Items (fk_invoiceID, fk_categoriesId, hour, rate)
VALUES
    (1, 7, 3, 5);

INSERT INTO
    invoice_Items (fk_invoiceID, fk_categoriesId, hour, rate)
VALUES
    (1, 8, 3, 5);