SET
    foreign_key_checks = 0;

DROP TABLE IF EXISTS categories;

DROP TABLE IF EXISTS invoices;

DROP TABLE IF EXISTS invoice_items;

DROP TABLE IF EXISTS statistic_data;

SET
    foreign_key_checks = 1;

CREATE TABLE categories (
    id INT NOT NULL AUTO_INCREMENT,
    cat_name varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE statistic_data (
    id INT NOT NULL AUTO_INCREMENT,
    amt_householdMem INT NOT NULL,
    amt_children0_6 INT NOT NULL,
    amt_children7_18 INT NOT NULL,
    amt_flatmates INT NOT NULL,
    amt_partners INT NOT NULL,
    otherCaringResp INT NOT NULL,
    partner_sexualOrient varchar(255) NOT NULL,
    partner_relStyle varchar(255) NOT NULL,
    employment_status varchar(255) NOT NULL,
    domesticHelp BINARY NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE invoices (
    id INT NOT NULL AUTO_INCREMENT,
    nameFrom varchar(255) NOT NULL,
    emailFrom varchar(255) NOT NULL,
    nameTo varchar(255) NOT NULL,
    emailTo varchar(255) NOT NULL,
    invoiceDate DATE NOT NULL,
    PRIMARY KEY (id));

CREATE TABLE invoice_items (
    id INT NOT NULL AUTO_INCREMENT,
    fk_invoiceID INT NOT NULL,
    fk_categoriesID INT NOT NULL,
    hour NUMERIC(10, 2) NOT NULL,
    rate NUMERIC(10, 2)  NOT NULL,
    amount NUMERIC(10, 2 )NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (fk_invoiceID) REFERENCES invoices(id) ON DELETE CASCADE,
    FOREIGN KEY (fk_categoriesID) REFERENCES categories(id) ON DELETE CASCADE
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
        FALSE
    );

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
    invoice_Items (
        fk_invoiceId,
        fk_categoriesId,
        hour,
        rate,
        amount
    )
VALUES
    (1, 1, 0, 15, 0);

INSERT INTO
    invoice_Items (
        fk_invoiceId,
        fk_categoriesId,
        hour,
        rate,
        amount
    )
VALUES
    (1, 2, 3, 15, 45);

INSERT INTO
    invoice_Items (
        fk_invoiceId,
        fk_categoriesId,
        hour,
        rate,
        amount
    )
VALUES
    (1, 3, 3, 15, 45);

INSERT INTO
    invoice_Items (
        fk_invoiceID,
        fk_categoriesId,
        hour,
        rate,
        amount
    )
VALUES
    (1, 4, 3, 15, 45);

INSERT INTO
    invoice_Items (
        fk_invoiceID,
        fk_categoriesID,
        hour,
        rate,
        amount
    )
VALUES
    (1, 5, 3, 15, 45);

INSERT INTO
    invoice_Items (
        fk_invoiceID,
        fk_categoriesID,
        hour,
        rate,
        amount
    )
VALUES
    (1, 6, 3, 15, 45);

INSERT INTO
    invoice_Items (
        fk_invoiceID,
        fk_categoriesId,
        hour,
        rate,
        amount
    )
VALUES
    (1, 7, 3, 15, 45);

INSERT INTO
    invoice_Items (
        fk_invoiceID,
        fk_categoriesId,
        hour,
        rate,
        amount
    )
VALUES
    (1, 8, 3, 15, 45);

INSERT INTO
    invoice_Items (
        fk_invoiceID,
        fk_categoriesId,
        hour,
        rate,
        amount
    )
VALUES
    (1, 9, 10, 15, 150);